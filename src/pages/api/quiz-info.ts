import { NextApiRequest, NextApiResponse } from "next"

import { handleQuizTimer } from "@services/RequestManager/handleQuizTimer"
import { getUserEmail } from "@services/utils"

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
    return handleQuizTimer(email)
  } catch {
    return res.status(400).json({
      status: "error",
    })
  }
}

export default handler
