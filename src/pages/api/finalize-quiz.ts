import { NextApiRequest, NextApiResponse } from "next"

import { handleFinalizeQuiz } from "@services/RequestManager/handleQuizTimer"
import { getUserEmail } from "@services/utils"

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const finalizeQuizHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(501).json({ message: "Not implemented" })
  }

  try {
    const email = await getUserEmail(req)
    if (email) {
      await handleFinalizeQuiz(email)
      return res.status(200).json({ meessage: "success" })
    }
  } catch {
    return res.status(400).json({
      status: "error",
    })
  }
}

export default finalizeQuizHandler
