import { getIsValidEmail, getIsValidPassword } from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

import { getUserByEmail } from "@db/entities/User";
import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from '@db/connection/mongodb';

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

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    res.status(422).json({ message: "User already exists!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    isAdmin: false,
  });

  res.status(201).json({ message: result });
}

export default handler;
