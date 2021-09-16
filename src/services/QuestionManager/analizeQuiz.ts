import {
  InitialUseQuestion,
  UserAnswers,
  UserAnswer,
  User,
} from "@db/entities/User/types";
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

export const getAnswerMap = (answers: UserAnswers = []): AnswerMapType =>
  answers.reduce(
    (map, answer) => ({
      ...map,
      [answer.id]: answer,
    }),
    {}
  );

export const isAnswerCorrect = (
  initialQuestionOptions: InitialUseQuestion["options"],
  userOptions: UserAnswer["answer"]
): boolean => {
  const answer = Array.isArray(userOptions) ? userOptions : [userOptions];
  const res = answer.filter((item) =>
    initialQuestionOptions.some(
      ({ text, isCorrect }) => isCorrect && item === text
    )
  );
  return res.length === answer.length;
};
