import { UserQuestionView } from "@types/question";

export interface QuizQuestionInfoType {
  nextQuestion: UserQuestionView,
  total: number,
  passed: number,
  startedAt: number,
}

export interface QuizAnaliseInfo {
  value: number;
  answerMap: { [key: string]: boolean };
}