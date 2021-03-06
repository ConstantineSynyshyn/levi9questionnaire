import { QuestionCategory, CURRENT_COURSE } from "../../../constants/configuration"
import { QuestionWithOptionsList } from "../../../types/question"
import { ImportQuestionTypeFile } from "./types"
import { mapImportFileWithQuestionScheme } from "./utils"
import { connectToDatabase } from "../../connection/mongodb"

// initial question import based on agreed json form ImportQuestionType
const createQuestionsByInputFile = async (
  list: ImportQuestionTypeFile
): Promise<QuestionWithOptionsList | null> => {
  const data = mapImportFileWithQuestionScheme(list)
  const { db } = await connectToDatabase()
  const { insertedCount } = await db.collection("questions").insertMany(data)

  if (insertedCount > 0) {
    return data
  }

  return null
}

const loadQuizQuestions = async (size: number = 20) => {
  const { db } = await connectToDatabase()
  const data = await db
    .collection("questions")
    .find({})
    .sort({ metacritic: -1 })
    .limit(size)
    .toArray()
  return data
}

const loadRandomQuestionByCategory = async (
  category: QuestionCategory,
  size = 0
): Promise<QuestionWithOptionsList | never> => {
  const { db } = await connectToDatabase()
  const courseName = CURRENT_COURSE;
  const data = await db
    .collection("questions")
    .aggregate([{ $match: { category, courseName } }, { $sample: { size } }])
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
}

export {
  createQuestionsByInputFile,
  loadQuizQuestions,
  loadRandomQuestionByCategory,
}
