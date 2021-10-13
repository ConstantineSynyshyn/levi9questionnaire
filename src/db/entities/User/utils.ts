import { TaskCategory } from "@constants/configuration"
import { QuestionWithOptionsList } from "../../../types/question"
import { InitialUseQuestion, InitialUseQuestions, UserAnswers,
  UserAnswer,
  User, } from "./types"

import { getQuizSize, getQuizTime } from '@utils/index'

type AnswerMapType = { [key: string]: UserAnswer };

export const prepareInitialQuestion = (
  questions: QuestionWithOptionsList
): InitialUseQuestions =>
  [...questions].reduce((list: InitialUseQuestions, item, index) => {
    const {
      category,
      difficultyLevel,
      id,
      options,
      questionText,
      data,
      taskType = TaskCategory.QUIZ,
    } = item
    return [
      ...list,
      {
        category,
        difficultyLevel,
        id,
        questionText,
        data,
        taskType,
        options,
        internalQuestionId: index + 1,
      },
    ]
  }, [])

export const getQuizScoreParams = (
  user: User
): Pick<User, 'quizScore' | 'quizTime' | 'quizEndTime'> => {
  const quizScore = getQuizScore(user.initialQuestions, user.userAnswers)
  const quizEndTime = Date.now()
  const quizTime = user?.quizStartTime
    ? (quizEndTime - user?.quizStartTime)
    : getQuizTime(getQuizSize())
  return {
    quizScore,
    quizTime,
    quizEndTime,
  }
}

export const getQuizScore = (
  initialQuestions: User["initialQuestions"] = [],
  answers: UserAnswers = []
): number => {
  if (answers && answers.length === 0) {
    return 0
  }
  const answerMapList: AnswerMapType = getAnswerMap(answers)
  return initialQuestions.reduce((value, question) => {
    const { options, id, difficultyLevel } = question
    const isCorrect = isAnswerCorrect(options, answerMapList[id]?.answer)
    return value + (isCorrect ? (difficultyLevel || 1) : 0)
  }, 0)
}

export const getAnswerMap = (answers: UserAnswers = []): AnswerMapType =>
  answers.reduce(
    (map, answer) => ({
      ...map,
      [answer.id]: answer,
    }),
    {}
  )

export const isAnswerCorrect = (
  initialQuestionOptions: InitialUseQuestion["options"],
  userOptions: UserAnswer["answer"]
): boolean => {
  const answer = Array.isArray(userOptions) ? userOptions : [userOptions];
  const res = answer.filter((item) =>
    initialQuestionOptions.some(
      ({ text, isCorrect }) => isCorrect && item === text
    )
  );
  return res.length === answer.length;
}

