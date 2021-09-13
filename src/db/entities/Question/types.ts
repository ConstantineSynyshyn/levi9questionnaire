import { QuestionCategory } from '../../../types/question';

export interface ImportQuestionType {
  text: string;
  options: ReadonlyArray<string>;
  data?: string;
  difficultyLevel?: number;
  category?: QuestionCategory
}

export type ImportQuestionTypeFile = ReadonlyArray<ImportQuestionType>;
