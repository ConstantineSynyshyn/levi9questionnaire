import {
  getQuizQuestionInfo,
} from "@services/QuestionManager/manageQuiz";
import { NextApiRequest, NextApiResponse } from "next";

import { finalizeQuiz } from "@db/entities/User/User";

export const handleQuizTimer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const result = await getQuizQuestionInfo();
  return res.status(200).json(result);
};

export const handleFinalizeQuiz = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await finalizeQuiz();
  return res.status(200).json({ result: 'done' });
};
