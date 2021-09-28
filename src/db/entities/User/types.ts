import { QuestionWithOptions } from "../../../types/question";

export interface InitialUseQuestion extends QuestionWithOptions {
  internalQuestionId: number;
}

export type InitialUseQuestions = ReadonlyArray<InitialUseQuestion>;

export interface UserAnswer extends Pick<QuestionWithOptions, 'id'> {
  internalQuestionId: number;
  answer: string | ReadonlyArray<string>;
}

export type UserAnswers = ReadonlyArray<UserAnswer>;

export interface User {
  email: string;
  password: string;
  initialQuestions: InitialUseQuestions;
  quizStartTime: number;
  quizEndTime?: number;
  userAnswers: UserAnswers;
  isConfirmed: boolean;
  isAdmin?: boolean;
}

export type Users = ReadonlyArray<User>;
