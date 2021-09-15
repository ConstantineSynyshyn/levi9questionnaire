import { NextApiRequest, NextApiResponse } from 'next'

import handleQuestionUpload from '@services/RequestManager/handleQuestionUpload';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return req.method === "POST"
    ? handleQuestionUpload(req, res)
    : res.status(404).end();
};

export default handler;
