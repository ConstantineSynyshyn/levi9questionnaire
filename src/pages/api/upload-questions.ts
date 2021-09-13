import { NextApiRequest, NextApiResponse } from 'next'

import handleQuestionUpload from '../../services/handleQuestionUpload'

export const config = {
  api: {
    bodyParser: false
  }
};


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.method === "POST"
    ? handleQuestionUpload(req, res)
    : res.status(404).end();
};

export default handler;
