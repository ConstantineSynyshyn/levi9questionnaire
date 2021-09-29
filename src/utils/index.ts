import {
  DEFAULT_TIME_TO_RESPOND,
  QUESTION_AMOUNT_PER_CATEGORY,
} from "@constants/configuration";
import { LeftTimeType } from '../types';

export const getQuizSize = (): number =>
  Object.values(QUESTION_AMOUNT_PER_CATEGORY).reduce((sum, count) => sum + count, 0);

export const getQuizTime = (quizSize: number): number =>
  (quizSize * DEFAULT_TIME_TO_RESPOND * 1000);

export const getQuizEndTime = (startTime: number, quizSize: number): number =>
  (startTime + getQuizTime(quizSize));

export const getTimeObject = (endTime: number): LeftTimeType => {
  if (endTime <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return {
    hours: Math.floor((endTime / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((endTime / 1000 / 60) % 60),
    seconds: Math.floor((endTime / 1000) % 60)
  };
};
