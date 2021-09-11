import { getIsValidEmail, getIsValidPassword } from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400);
  }

  const data = req.body;

  const { email, password } = data;

  const isValidEmail = getIsValidEmail(email);
  const isValidPassword = getIsValidPassword(password);

  if (!isValidPassword || !isValidEmail) {
    return res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: result });
  client.close();
}

export default handler;
