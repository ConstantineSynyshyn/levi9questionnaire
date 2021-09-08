interface Answer {
  id: string;
  text: string;
}

export interface Question {
  questionText: string;
  id?: string;
}

export interface QuestionWithOptions extends Question {
  options: Answer[];
}
