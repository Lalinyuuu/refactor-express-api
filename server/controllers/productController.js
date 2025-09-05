import * as ProductService from '../services/productService.js';

function pickProductInput(body = {}) {
  const { name, price, image, description, category } = body;
  const dto = {};
  if (name !== undefined) dto.name = name;
  if (price !== undefined) dto.price = price;
  if (image !== undefined) dto.image = image;
  if (description !== undefined) dto.description = description;
  if (category !== undefined) dto.category = category;
  return dto;
}

export async function getAllProducts(req, res) {
  try {
    const { keywords, category } = req.query;
    const products = await ProductService.getAllProducts(keywords, category);
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(error.status || 500).json({ message: `${error.message || error}` });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await ProductService.getProductById(req.params.id);
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(error.status || 500).json({ message: `${error.message || error}` });
  }
}

export async function createProduct(req, res) {
  try {
    const insertedId = await ProductService.createProduct(pickProductInput(req.body));
    return res.status(200).json({
      message: `Product Id ${insertedId} has been created successfully`,
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: `${error.message || error}` });
  }
}

export async function updateProduct(req, res) {
  try {
    await ProductService.updateProduct(req.params.id, pickProductInput(req.body));
    return res.status(200).json({
      message: `Movie record ${req.params.id} has been updated successfully`,
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: `${error.message || error}` });
  }
}

export async function deleteProduct(req, res) {
  try {
    await ProductService.deleteProduct(req.params.id);
    return res.status(200).json({
      message: `Movie record ${req.params.id} has been deleted successfully`,
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: `${error.message || error}` });
  }
}