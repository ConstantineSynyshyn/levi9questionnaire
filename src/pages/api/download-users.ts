import { NextApiRequest, NextApiResponse } from "next"

import { getUsers, getUserByEmail } from "@db/entities/User"
import { getUserEmail } from "@services/utils"

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = await getUserEmail(req)
  const user = email ? await getUserByEmail(email) : null
  if (req.method === "GET" && user?.isAdmin) {
    try {
      const users = await getUsers()
      const result = [...users].map((userItem) => {
        const {
          email,
          quizScore = null,
          quizTime = null,
          quizStartTime = null,
          quizEndTime = null,
          isConfirmed,
        } = userItem
        return {
          email,
          quizScore,
          quizTime,
          quizStartTime,
          quizEndTime,
          isConfirmed,
        }
      })
      return res.status(200).json(result)
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

export default handler
