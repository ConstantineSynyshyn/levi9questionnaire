import { UserQuestionView } from "../../types/question";
import { InitialUseQuestion } from "@db/entities/User/types"

export interface QuizQuestionInfoType {
  nextQuestion: UserQuestionView,
  total: number,
  passed: number,
  startedAt: number,
}

export interface QuizResultMapItem {
  question: InitialUseQuestion
  isCorrect: boolean
  userAnswer: string | null
}

export interface QuizAnaliseInfo {
  value: number
  answerFullMap: QuizResultMapItem[]
}