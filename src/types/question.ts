import { QuestionCategory, TaskCategory } from "@constants/configuration";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  id: string;
  data?: string;
}

export interface QuestionWithOptions extends Question {
  options: ReadonlyArray<Answer>;
  category: QuestionCategory;
  taskType: TaskCategory;
  difficultyLevel: number;
}

export type QuestionWithOptionsList = ReadonlyArray<QuestionWithOptions>;

export interface UserQuestionView
  extends Pick<QuestionWithOptions, "questionText" | "data" | "taskType"> {
  qId: number; // not required and in fact it is numeric position(internalQuestionId)
  options: ReadonlyArray<string>; // just answers because we make snapshot of generated quiz on user level, so we can just compare content
}

export interface QuizQuestionInfoType {
  nextQuestion?: UserQuestionView;
  total: number;
  passed: number;
  startedAt: number;
  passedAt?: number;
}