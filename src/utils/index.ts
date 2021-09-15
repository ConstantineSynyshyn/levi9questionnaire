import {
  QUESTION_AMOUNT_PER_CATEGORY,
  QuestionCategory,
  TaskCategory,
} from "@constants/configuration";

export const getQuizSize = (): number =>
  Object.values(QUESTION_AMOUNT_PER_CATEGORY).reduce((sum, count) => sum + count, 0);
