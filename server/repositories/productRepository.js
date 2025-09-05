import { ObjectId } from 'mongodb';
import { getDB } from '../utils/db.js';

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    const err = new Error('Invalid product id format');
    err.status = 400;
    throw err;
  }
}

export async function findAll(query) {
  const db = getDB();
  return db.collection('products').find(query).limit(10).toArray();
}
export async function findById(id) {
  const db = getDB();
  return db.collection('products').findOne({ _id: toObjectId(id) });
}
export async function create(productData) {
  const db = getDB();
  const r = await db.collection('products').insertOne(productData);
  return { insertedId: r.insertedId };
}
export async function update(id, productData) {
  const db = getDB();
  await db.collection('products').updateOne({ _id: toObjectId(id) }, { $set: productData });
  return true;
}
export async function remove(id) {
  const db = getDB();
  const r = await db.collection('products').deleteOne({ _id: toObjectId(id) });
  return r.deletedCount === 1;
}