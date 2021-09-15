import { NextApiRequest, NextApiResponse } from 'next'

import handleQuestionAnswer from '@services/RequestManager/handleQuestionAnswer';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      return handleQuestionAnswer(req, res);
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
