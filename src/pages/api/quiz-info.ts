import { NextApiRequest, NextApiResponse } from 'next'

import { handleQuizTimer } from '@services/RequestManager/handleQuizTimer';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      return handleQuizTimer(req, res);
    } catch (e) {
      console.log('handleQuizTimer', handleQuizTimer);
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
