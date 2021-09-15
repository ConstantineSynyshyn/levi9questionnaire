import { Question, QuestionWithOptions } from "../../types/question";

export interface Props {
  questionsData: Question[] | QuestionWithOptions[];
  timeForResponse?: number;
}

export type HandleSubmit = () => void;

export type HandleChange = (value: string | ReadonlyArray<string>) => void;
