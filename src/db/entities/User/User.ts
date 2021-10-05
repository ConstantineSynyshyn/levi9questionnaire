import { connectToDatabase } from "@db/connection/mongodb"

import ServiceError from "@utils/serviceError"
import { QuestionWithOptionsList } from "../../../types/question"
import { User, UserAnswers, Users } from "./types"
import { prepareInitialQuestion } from "./utils"

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
  delete user._id
  return user
}

export const storeAnswers = async (
  email: string,
  answers: UserAnswers,
  isFinalQuestion: boolean = true
) => {
  const dataSet = isFinalQuestion ? { $set: { quizEndTime: Date.now() } } : {}
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
  const { db } = await connectToDatabase()
  await db
    .collection("users")
    .updateOne({ email }, { $set: { quizEndTime: Date.now() } })
}

export const getUserList = async (): Promise<Users> => {
  const { db } = await connectToDatabase()
  const list = await db
    .collection("users")
    .find({})
    .sort({ email: -1 })
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
  const { db } = await connectToDatabase()
  const user = await db.collection("users").findOneAndUpdate(filter, update, {
    returnOriginal: false,
    upsert: true,
    new: true,
  })

  return user ? user.value : null
}
