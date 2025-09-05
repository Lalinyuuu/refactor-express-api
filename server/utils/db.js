import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'practice-mongo';

export const client = new MongoClient(uri, {
  ignoreUndefined: true,
  useUnifiedTopology: true,
});

let _db = null;

export async function connectToDatabase() {
  if (_db) return _db;
  await client.connect();
  _db = client.db(dbName);
  console.log(`[db] Connected to MongoDB: ${dbName}`);
  return _db;
}

export function getDB() {
  if (!_db) throw new Error('Database not initialized. Call connectToDatabase() first.');
  return _db;
}