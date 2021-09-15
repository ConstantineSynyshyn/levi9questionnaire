import { QuestionCategory, TaskCategory } from '@constants/configuration';

export interface ImportQuestionType {
  text: string;
  options: ReadonlyArray<string>;
  data?: string;
  difficultyLevel?: number;
  category?: QuestionCategory;
  taskType: TaskCategory;
}

export type ImportQuestionTypeFile = ReadonlyArray<ImportQuestionType>;
