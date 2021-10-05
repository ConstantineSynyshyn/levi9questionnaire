import { NextApiRequest, NextApiResponse } from "next"

import { handleFinalizeQuiz } from "@services/RequestManager/handleQuizTimer"

const finalizeQuizHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      return handleFinalizeQuiz(req, res)
    } catch {
      return res.status(400).json({
        status: "error",
      })
    }
  } else {
    return res.status(400).json({
      status: "error",
    })
  }
}

export default finalizeQuizHandler
