import { getQuizQuestionInfo } from "@services/QuestionManager/manageQuiz"
import { finalizeQuiz } from "@db/entities/User/User"

export const handleQuizTimer = async (email: string) => {
  const result = await getQuizQuestionInfo(email)
  return result
}

export const handleFinalizeQuiz = async (email: string) => {
  await finalizeQuiz(email)
}
