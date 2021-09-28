import { connectToDatabase } from "@db/connection/mongodb";
import { QuestionWithOptionsList } from "@types/question";
import { User, UserAnswers, Users } from "./types";
import { prepareInitialQuestion } from "./utils";

// @TODO for now it is hardcoded until
export const storeUserQuestions = async (
  email: string,
  questions: QuestionWithOptionsList
) => {
  const { db } = await connectToDatabase();
  const initialQuestions = prepareInitialQuestion(questions);
  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        initialQuestions: initialQuestions,
        quizStartTime: Date.now(),
        userAnswers: [],
      },
    }
  );
};

export const getUserByEmail = async (
  email: string,
): Promise<User> => {
  const { db } = await connectToDatabase();
  const data = await db.collection("users").findOne({ email });

  return Promise.resolve(JSON.parse(JSON.stringify(data)));
};

export const storeAnswers = async (
  email: string,
  answers: UserAnswers,
  isFinalQuestion: boolean = true
) => {
  const dataSet = isFinalQuestion ? { $set: { quizEndTime: Date.now() } } : {};
  const { db } = await connectToDatabase();
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
  );
};

export const finalizeQuiz = async (email: string) => {
  const { db } = await connectToDatabase();
  await db.collection("users").updateOne(
    { email },
    { $set: { quizEndTime: Date.now() } }
  );
};

export const getUserList = async (): Promise<Users> => {
  const { db } = await connectToDatabase();
  const list = await db
    .collection("users")
    .find({})
    .sort({ email: -1 })
    .toArray();

  return Promise.resolve(JSON.parse(JSON.stringify(list)));
};
