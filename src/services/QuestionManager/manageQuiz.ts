import {
  QUESTION_AMOUNT_PER_CATEGORY,
  QuestionCategory,
  TaskCategory,
} from "@constants/configuration";
import { loadRandomQuestionByCategory } from "@db/entities/Question";
import { getCurrentUser, storeUserQuestions } from "@db/entities/User";
import { InitialUseQuestion } from "@db/entities/User/types";
import {
  UserQuestionView,
  QuizQuestionInfoType,
  QuestionWithOptionsList,
  QuestionWithOptions,
} from "@types/question";

export const initializeQuiz = async () => {
  const user = await getCurrentUser("");
  if (user.quizStartTime && user.initialQuestions) {
    return;
  }
  const questions = await getQuestions();
  const shuffledQuestions = mixUpList(questions);
  await storeUserQuestions("", shuffledQuestions);
  return true; // for now it is enough until we decide how to load questions
};

// prepare quiz question based on category amount map
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

// shuffle list
// @TODO shuffle logic might be a bit complicated and stable
export const mixUpList = (
  questions: QuestionWithOptionsList
): QuestionWithOptionsList => [...questions].sort(() => Math.random() - 0.5);

export const getCurrentQuestion = async (): Promise<{
  currentQuestion: InitialUseQuestion | undefined
  total: number
}> => {
  const user = await getCurrentUser("");
  const passedQuestionsAmount = user.userAnswers?.length || 0;
  return Promise.resolve({
    currentQuestion: user.initialQuestions[passedQuestionsAmount],
    total: user.initialQuestions.length,
  });
};

export const getQuizQuestionInfo = async (): Promise<QuizQuestionInfoType> => {
  const user = await getCurrentUser("");
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

export default initializeQuiz;
