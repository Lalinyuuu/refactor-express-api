import * as Repo from '../repositories/productRepository.js';

const now = () => new Date();

function buildQuery({ keywords, category }) {
  const query = {};
  if (keywords) query.name = new RegExp(String(keywords), 'i');
  if (category) query.category = new RegExp(String(category), 'i');
  return query;
}

export async function getAllProducts(keywords, category) {
  return Repo.findAll(buildQuery({ keywords, category }));
}
export async function getProductById(id) {
  return Repo.findById(id);
}
export async function createProduct(input) {
  const doc = { ...input, created_at: now() };
  const { insertedId } = await Repo.create(doc);
  return insertedId;
}
export async function updateProduct(id, input) {
  const doc = { ...input, modified_at: now() };
  await Repo.update(id, doc);
  return true;
}
export async function deleteProduct(id) {
  return Repo.remove(id);
}