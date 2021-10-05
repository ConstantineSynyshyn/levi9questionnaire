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
  try {
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
  } catch {
    throw new ServiceError("Couldn't store questions for user")
  }
}

export const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const { db } = await connectToDatabase()
    const data = await db.collection("users").findOne({ email })

    return data
  } catch {
    throw new ServiceError("Couldn't get user by email")
  }
}

export const storeAnswers = async (
  email: string,
  answers: UserAnswers,
  isFinalQuestion: boolean = true
) => {
  try {
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
  } catch {
    throw new ServiceError("Couldn't store answers")
  }
}

export const finalizeQuiz = async (email: string) => {
  try {
    const { db } = await connectToDatabase()
    await db
      .collection("users")
      .updateOne({ email }, { $set: { quizEndTime: Date.now() } })
  } catch {
    throw new ServiceError("Couldn't finalize quiz")
  }
}

export const getUserList = async (): Promise<Users> => {
  try {
    const { db } = await connectToDatabase()
    const list = await db
      .collection("users")
      .find({})
      .sort({ email: -1 })
      .toArray()

    return list
  } catch {
    throw new ServiceError("Couldn't get user list")
  }
}

export const userAutoRegistration = async (email: string, hash: string) => {
  try {
    const { db } = await connectToDatabase()
    await db.collection("users").insertOne({
      hash,
      email,
      isAdmin: false,
      isConfirmed: false,
    })
  } catch (error) {
    throw new ServiceError("Couldn't create user record in db")
  }
}

export const userUpdateRegistrationData = async (
  email: string,
  hash: string
) => {
  try {
    const { db } = await connectToDatabase()
    await db.collection("users").findOneAndUpdate(
      { email, isAdmin: false },
      { $set: { hash, isAdmin: false, isConfirmed: false } },
      {
        new: true,
      }
    )
  } catch {
    throw new ServiceError("Couldn't update user's record in db")
  }
}

export const confirmUserEmail = async (hash: string): Promise<User> => {
  try {
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
  } catch {
    throw new ServiceError("Couldn't confirm email")
  }
}
