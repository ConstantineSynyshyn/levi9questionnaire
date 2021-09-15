import { MongoClient } from "mongodb";

// @deprecated move/use connectToDatabase from @db/connection. It have to be single place with that logic
export async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }
  const uri = process.env.MONGODB_URI;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  const client = await MongoClient.connect(uri, options);

  return client;
}
