import {
  UserAnswers,
  UserAnswer,
  User,
} from "@db/entities/User/types";
import {
  getAnswerMap,
  isAnswerCorrect,
} from "@db/entities/User/utils";
import { QuizAnaliseInfo } from "./types";

type AnswerMapType = { [key: string]: UserAnswer };

export const getQuizAnalise = (
  initialQuestions: User["initialQuestions"] = [],
  answers: UserAnswers = []
): QuizAnaliseInfo | null => {
  if (answers && answers.length === 0) {
    return null;
  }
  const answerMapList: AnswerMapType = getAnswerMap(answers);
  let value = 0;
  const answerMap = initialQuestions.reduce((newMap, question) => {
    const { questionText, options, id, difficultyLevel } = question;
    const isCorrect = isAnswerCorrect(options, answerMapList[id]?.answer);
    value = value + (isCorrect ? (difficultyLevel || 1) : 0);
    return {
      ...newMap,
      [questionText]: isCorrect,
    };
  }, {});
  return {
    value,
    answerMap,
  }
};
