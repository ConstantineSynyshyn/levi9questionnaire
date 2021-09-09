import { Question, QuestionWithOptions } from "../../types/question";

export interface Props {
  questionsData: Question[] | QuestionWithOptions[];
  timeForResponse?: number;
}
