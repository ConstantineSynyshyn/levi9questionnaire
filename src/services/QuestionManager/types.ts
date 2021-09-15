import { UserQuestionView } from "@types/question";

export interface QuizQuestionInfoType {
  nextQuestion: UserQuestionView,
  total: number,
  passed: number,
  startedAt: number,
}
