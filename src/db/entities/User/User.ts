import { connectToDatabase } from "@db/connection/mongodb"

import { QuestionWithOptionsList } from "../../../types/question"
import { convertStringedDirectionToMongo } from "../utils"
import { User, UserAnswers, Users } from "./types"
import {
  prepareInitialQuestion,
  getQuizScoreParams,
} from "./utils"

// @TODO for now it is hardcoded until
export const storeUserQuestions = async (
  email: string,
  questions: QuestionWithOptionsList
) => {
  const { db } = await connectToDatabase()
  const initialQuestions = prepareInitialQuestion(questions)
  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        initialQuestions: initialQuestions,
        quizStartTime: Date.now(),
        userAnswers: [],
      },
    }
  )
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const { db } = await connectToDatabase()
  const user = await db.collection("users").findOne({ email })
  delete user?._id
  return user
}

export const storeAnswers = async (
  email: string,
  answers: UserAnswers,
  isFinalQuestion: boolean = true
) => {
  let dataSet = {}
  if (isFinalQuestion) {
    const currentUser = await getUserByEmail(email)
    dataSet = currentUser?.email
      ? { $set: getQuizScoreParams(currentUser) }
      : dataSet
  }
  const { db } = await connectToDatabase()
  await db.collection("users").updateOne(
    { email },
    {
      $push: {
        userAnswers: {
          $each: answers,
        },
      },
      ...dataSet,
    }
  )
}

export const finalizeQuiz = async (email: string) => {
  const currentUser = await getUserByEmail(email)
  if (!email || !currentUser?.email) {
    return
  }
  const { db } = await connectToDatabase()
  await db
    .collection("users")
    .updateOne({ email }, { $set: getQuizScoreParams(currentUser) })
}

export const getUserList = async (
  sortBy: string = "email",
  dir?: string,
  limit: number = 100,
  offset?: number
): Promise<Users> => {
  const direction = convertStringedDirectionToMongo(dir)
  const { db } = await connectToDatabase()
  const list = await db
    .collection("users")
    .aggregate([
      {
        $project: {
          _id : true,
          email : true,
          quizStartTime : true,
          quizEndTime : true,
          isConfirmed : true,
          quizScore : true,
          quizTime : true,
          [sortBy]: { $ifNull: [ "$" + sortBy, 0 ] }
        }
      }
      ,
      {$sort: { [sortBy]: direction }}
    ])
    .skip(offset)
    .limit(limit)
    .toArray()
  return list
}

export const userAutoRegistration = async (email: string, hash: string) => {
  const { db } = await connectToDatabase()
  await db.collection("users").insertOne({
    hash,
    email,
    isAdmin: false,
    isConfirmed: false,
  })
}

export const userUpdateRegistrationData = async (
  email: string,
  hash: string
) => {
  const { db } = await connectToDatabase()
  await db.collection("users").findOneAndUpdate(
    { email, isAdmin: false },
    { $set: { hash, isAdmin: false, isConfirmed: false } },
    {
      new: true,
    }
  )
}

export const confirmUserEmail = async (hash: string): Promise<User | null> => {
  const { db } = await connectToDatabase()
  const filter = {
    hash,
    isAdmin: false,
  }
  const update = {
    $set: {
      isConfirmed: true,
      hash: "",
    },
  }
  const user = await db.collection("users").findOneAndUpdate(filter, update, {
    returnOriginal: false,
  })
  return user ? user.value : null
}

export const getCollectionSize = async () => {
  const { db } = await connectToDatabase()
  return db.collection("users").count()
}
