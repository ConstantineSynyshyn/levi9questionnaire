import { UserAnswers, UserAnswer, User } from "@db/entities/User/types"
import { getAnswerMap, isAnswerCorrect } from "@db/entities/User/utils"
import { QuizAnaliseInfo } from "./types"

type AnswerMapType = { [key: string]: UserAnswer }

export const getQuizAnalise = (
  initialQuestions: User["initialQuestions"] = [],
  answers: UserAnswers = []
): QuizAnaliseInfo | null => {
  if (answers && answers.length === 0) {
    return null
  }
  const answerMapList: AnswerMapType = getAnswerMap(answers)
  let value = 0
  // @ts-ignore
  const answerFullMap = initialQuestions.reduce((newMap, question) => {
    const { options, id, difficultyLevel } = question
    const isCorrect = answerMapList[id]?.answer
      ? isAnswerCorrect(options, answerMapList[id]?.answer)
      : false
    value = value + (isCorrect ? difficultyLevel || 1 : 0)
    return [
      ...newMap,
      {
        question,
        isCorrect,
        userAnswer: answerMapList[id]?.answer || null,
      },
    ]
  }, [])
  return {
    value,
    answerFullMap,
  }
}
