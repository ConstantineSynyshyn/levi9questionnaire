import { NextApiRequest, NextApiResponse } from "next";

import { handleRequestAuthLink } from "@services/RequestManager/handleAutoRegistration";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400);
  }
  const { email } = req?.body || {};
  const result: any = await handleRequestAuthLink(email);
  if (result?.success) {
    return res.status(200).json({ success: true });
  }
  return res.status(400).json(result);
}

export default handler;
