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

export const htmlDecode = (input: string) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export const getTimeLeftString = (leftTimeConfig: LeftTimeType): string => {
  const list = [];
  const { seconds, minutes, hours } = leftTimeConfig;
  if (hours) {
    list.push(`${hours} h`);
  }
  if (minutes) {
    list.push(`${minutes} m`);
  }
  if (minutes || seconds) {
    list.push(`${seconds} s`);
  }
  return list.join(" ");
};
