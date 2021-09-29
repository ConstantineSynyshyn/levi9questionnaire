import {
  QUESTION_AMOUNT_PER_CATEGORY,
  QuestionCategory,
  TaskCategory,
} from "@constants/configuration";
import { loadRandomQuestionByCategory } from "@db/entities/Question";
import { getUserByEmail, storeUserQuestions } from "@db/entities/User";
import { InitialUseQuestion } from "@db/entities/User/types";
import {
  UserQuestionView,
  QuizQuestionInfoType,
  QuestionWithOptionsList,
} from "../../types/question";
import { finalizeQuiz } from "@db/entities/User/User";
import { getQuizEndTime } from "@utils/index";

/**
 * Once candidate press 'start quiz'(or call endpoint directly), logic behind
 * will randomly create questions list based on amounts for each category from QUESTION_AMOUNT_PER_CATEGORY
 * But i happens only in case if user doesnt have filled value for 'quizStartTime' or 'initialQuestions'
 * which might mean that quiz have been already started
 *
 * @TODO
 * P.S. Again, now it is for FE only, for having different technologies we can add one more layer around
 * and put that  data in DB, to be able configure that via admin
 */
export const initializeQuiz = async (userEmail: string) => {
  const user = await getUserByEmail(userEmail);
  if (user?.quizStartTime || user?.initialQuestions) {
    return;
  }
  const questions = await getQuestions();
  const shuffledQuestions = mixUpList(questions);
  await storeUserQuestions(userEmail, shuffledQuestions);
  return true; // for now it is enough until we decide how to load questions
};

/**
 * Prepare quiz question based on category amount map.
 * Now, solution based on map which is relevant for FE
 * Example:
 * export const QUESTION_AMOUNT_PER_CATEGORY = {
 *  [QuestionCategory.JAVASCRIPT]: 10,
 *  [QuestionCategory.HTML]: 5,
 *  [QuestionCategory.CSS]: 5,
 *  [QuestionCategory.GIT]: 3,
 * };
 * The main category(as a fallback) we use JAVASCRIPT. We need it for cases
 * if there are no enough questions for other categories, we just fill all remains amount with JS question
 */
export const getQuestions = async (): Promise<QuestionWithOptionsList> => {
  const amountsMap = Object.entries(QUESTION_AMOUNT_PER_CATEGORY);
  const totalAmount = amountsMap.reduce((sum, [_, amount]) => sum + amount, 0);
  let specificQuestionList: QuestionWithOptionsList = [];
  for (const item of amountsMap) {
    const [category, amount] = item;
    if (category === QuestionCategory.JAVASCRIPT) {
      continue;
    }
    const categoryQuestions = await loadRandomQuestionByCategory(
      category as QuestionCategory,
      amount
    );
    specificQuestionList = [...specificQuestionList, ...categoryQuestions];
  }
  const jsQuestions = await loadRandomQuestionByCategory(
    QuestionCategory.JAVASCRIPT,
    totalAmount - specificQuestionList.length
  );
  const list = [...specificQuestionList, ...jsQuestions];

  return Promise.resolve(list);
};

/**
 * Shuffle questions list
 *
 * @TODO shuffle logic might be a bit complicated and stable
 */
export const mixUpList = (
  questions: QuestionWithOptionsList
): QuestionWithOptionsList => [...questions].sort(() => Math.random() - 0.5);

/**
 * Load question which is next to last answered question.
 * This function is used for loading of next question via api call
 */
export const getCurrentQuestion = async (
  userEmail: string
): Promise<{
  currentQuestion: InitialUseQuestion | undefined;
  total: number;
}> => {
  const user = await getUserByEmail(userEmail);
  const passedQuestionsAmount = user.userAnswers?.length || 0;
  return Promise.resolve({
    currentQuestion: user.initialQuestions[passedQuestionsAmount],
    total: user.initialQuestions.length,
  });
};

/**
 * Load quiz information which is required to show quiz interface(current question + timer).
 *
 * - If quiz haven't been started yet - no question itself. all numeric values - zero
 * - If quiz in progress (time between 'start' and 'end' + not all questions answered) - question + timing info
 * - If quiz finalized(no 'quizEndTime' but calculated that time is gone) - update DB and  response with end time, no question quiz finalized
 * - If quiz finalized correctly - the same data as previously
 */
export const getQuizQuestionInfo = async (
  userEmail: string
): Promise<QuizQuestionInfoType> => {
  const user = await getUserByEmail(userEmail);
  if (!user?.initialQuestions || user?.initialQuestions?.length < 0) {
    const result = {
      total: 0,
      startedAt: 0,
      passedAt: 0,
    };
    return Promise.resolve(result);
  }
  const finalizedQuiz = await doFinalizeQuiz(
    userEmail,
    user.quizStartTime,
    user.initialQuestions.length
  );
  if (finalizedQuiz) {
    return Promise.resolve(finalizedQuiz);
  }
  const passedQuestionsAmount = user.userAnswers?.length || 0;
  const nextQuestion = user.initialQuestions[passedQuestionsAmount];
  if (!nextQuestion) {
    // @TODO quizEndTime is suppose to filed, so even dont check
    const result = {
      total: user.initialQuestions.length,
      passed: passedQuestionsAmount,
      startedAt: user.quizStartTime,
      passedAt: user.quizEndTime,
    };
    return Promise.resolve(result);
  }
  const questionRepresentation = prepareQuestionForUser(nextQuestion);
  const result = {
    nextQuestion: questionRepresentation,
    total: user.initialQuestions.length,
    passed: passedQuestionsAmount,
    startedAt: user.quizStartTime,
  };
  return Promise.resolve(result);
};

/**
 * Keep only  information which is required for rendering of 'Question' interface
 */
export const prepareQuestionForUser = (
  question: InitialUseQuestion
): UserQuestionView => {
  const {
    internalQuestionId,
    data,
    options,
    questionText,
    taskType = TaskCategory.QUIZ,
  } = question;
  // @ts-ignore
  const answers: UserQuestionView["options"] = options.reduce(
    // @ts-ignore
    (acc, option) => [...acc, option.text],
    []
  );
  return {
    questionText,
    data,
    taskType,
    options: answers,
    qId: internalQuestionId,
  };
};

/**
 * Check and finalize quiz if time is gone
 */
export const doFinalizeQuiz = async (
  userEmail: string,
  startedAt: number,
  quizSize: number
): Promise<QuizQuestionInfoType | null> => {
  const endTime = getQuizEndTime(startedAt, quizSize);
  if (endTime < Date.now()) {
    await finalizeQuiz(userEmail);
    const result = {
      total: quizSize,
      startedAt: startedAt,
      passedAt: Date.now(),
    };
    return Promise.resolve(result);
  }
  return Promise.resolve(null);
};

export default initializeQuiz;
