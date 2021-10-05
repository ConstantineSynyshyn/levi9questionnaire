import { QuestionCategory } from "../../../constants/configuration"
import { QuestionWithOptionsList } from "../../../types/question"
import { ImportQuestionTypeFile } from "./types"
import { mapImportFileWithQuestionScheme } from "./utils"
import { connectToDatabase } from "../../connection/mongodb"
import ServiceError from "@utils/serviceError"

// initial question import based on agreed json form ImportQuestionType
const createQuestionsByInputFile = async (
  list: ImportQuestionTypeFile
): Promise<QuestionWithOptionsList | never> => {
  try {
    const data = mapImportFileWithQuestionScheme(list)
    const { db } = await connectToDatabase()
    const { insertedCount } = await db.collection("questions").insertMany(data)

    if (insertedCount > 0) {
      return data
    }

    throw new Error()
  } catch {
    throw new ServiceError("Couldn't create questions")
  }
}

const loadQuizQuestions = async (size: number = 20) => {
  try {
    const { db } = await connectToDatabase()
    const data = await db
      .collection("questions")
      .find({})
      .sort({ metacritic: -1 })
      .limit(size)
      .toArray()
    return data
  } catch {
    throw new ServiceError("Couldn't load quiz questions")
  }
}

const loadRandomQuestionByCategory = async (
  category: QuestionCategory,
  size = 0
): Promise<QuestionWithOptionsList | never> => {
  try {
    const { db } = await connectToDatabase()
    const data = await db
      .collection("questions")
      .aggregate([{ $match: { category } }, { $sample: { size } }])
      .project({
        questionText: 1,
        id: 1,
        data: 1,
        options: 1,
        category: 1,
        difficultyLevel: 1,
      })
      .toArray()
    return data
  } catch {
    throw new ServiceError("Couldn't load random question by category")
  }
}

export {
  createQuestionsByInputFile,
  loadQuizQuestions,
  loadRandomQuestionByCategory,
}
