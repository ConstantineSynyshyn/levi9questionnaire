import { getQuizQuestionInfo } from "@services/QuestionManager/manageQuiz"
import { NextApiRequest, NextApiResponse } from "next"

import { finalizeQuiz } from "@db/entities/User/User"
import ServiceError from "@utils/serviceError"

export const handleQuizTimer = async (email: string) => {
  const result = await getQuizQuestionInfo(email)
  return result
}

export const handleFinalizeQuiz = async (email: string) => {
  try {
    await finalizeQuiz(email)
  } catch (error) {}
  throw new ServiceError("Could'nt end quiz!")
}
