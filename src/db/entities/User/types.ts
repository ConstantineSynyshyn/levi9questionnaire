import { QuestionWithOptions, Profile } from "../../../types";

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
  hash?: string;
  initialQuestions: InitialUseQuestions;
  quizStartTime: number;
  quizEndTime?: number;
  userAnswers: UserAnswers;
  isConfirmed: boolean;
  isAdmin?: boolean;
  details?: Profile;
}

export type Users = ReadonlyArray<User>;
