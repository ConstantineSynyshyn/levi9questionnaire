interface Answer {
  id: string;
  text: string;
}

export interface Question {
  questionText: string;
  options: Answer[];
  id?: string;
}

export type Questions = Question[];
