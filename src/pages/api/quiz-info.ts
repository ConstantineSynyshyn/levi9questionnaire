import { NextApiRequest, NextApiResponse } from "next"

import { handleQuizTimer } from "@services/RequestManager/handleQuizTimer"
import { getUserEmail } from "@services/utils"

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(501).json({ status: "Not implemented" })
  }

  try {
    const email = await getUserEmail(req)

    if (!email) {
      return res.status(401).json({
        message: "authorisation required",
      })
    }
    const result = handleQuizTimer(email)
    return res.status(200).json(result)
  } catch {
    return res.status(400).json({
      status: "error",
    })
  }
}

export default handler
