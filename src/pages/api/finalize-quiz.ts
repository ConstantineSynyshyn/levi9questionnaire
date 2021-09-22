import { NextApiRequest, NextApiResponse } from 'next'

import { handleFinalizeQuiz } from '@services/RequestManager/handleQuizTimer';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      return handleFinalizeQuiz(req, res);
    } catch {
      return res.status(400).json({
        status: "error",
      });
    }
  } else {
    return res.status(400).json({
      status: "error",
    });
  }
};

export default handler;
