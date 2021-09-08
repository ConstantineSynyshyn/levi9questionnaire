import { Question } from "../../types/question";
export interface Props {
  question: Question;
  onAnswerSet: (id: string) => void;
}
