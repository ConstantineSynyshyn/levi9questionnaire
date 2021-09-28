import {
  getQuizQuestionInfo,
} from "@services/QuestionManager/manageQuiz";
import { NextApiRequest, NextApiResponse } from "next";

import { finalizeQuiz } from "@db/entities/User/User";
import { getUserEmail } from '@services/utils';

export const handleQuizTimer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const email = await getUserEmail(req);
  if (!email) {
    return res.status(401).json({
      message: 'authorisation required',
    });
  }
  const result = await getQuizQuestionInfo(email);
  return res.status(200).json(result);
};

export const handleFinalizeQuiz = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const email = await getUserEmail(req);
  if (!email) {
    return res.status(401).json({
      message: 'authorisation required',
    });
  }
  await finalizeQuiz(email);
  return res.status(200).json({ result: 'done' });
};
