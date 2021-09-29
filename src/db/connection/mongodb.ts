import { MongoClient } from 'mongodb'

// @TODO should be typed properly, typing HAVE to be improves
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(uri!, opts as any);
  await client.connect();
  let db = client.db(dbName);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}