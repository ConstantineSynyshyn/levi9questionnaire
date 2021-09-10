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
  options: Answer[];
}

export type QuestionWithOptionsList = ReadonlyArray<QuestionWithOptions>;

export enum QuestionCategory {
  JAVASCRIPT = 'JavaScript',
  HTML = 'HTML',
  CSS = 'CSS',
  ENGLISH = 'ENGLISH',
}
