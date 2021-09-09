import { Question, QuestionWithOptions } from "../../types/question";
export interface Props {
  question: QuestionWithOptions | Question;
  onAnswerSet: (id: string) => void;
}
