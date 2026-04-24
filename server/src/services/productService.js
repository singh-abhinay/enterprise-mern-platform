import Product from "../models/Product.js";
import mongoose from "mongoose";

export const createNewProduct = async (data) => {
  const {
    name,
    price,
    description,
    category,
    shortDescription,
    brand,
    images,
    stock,
    sku,
  } = data;

  if (!name || !price || !description) {
    const error = new Error("Name, price, description are required");
    error.status = 400;
    throw error;
  }

  if (price <= 0) {
    const error = new Error("Price must be greater than 0");
    error.status = 400;
    throw error;
  }

  if (category && !mongoose.Types.ObjectId.isValid(category)) {
    const error = new Error("Invalid category ID format");
    error.status = 400;
    throw error;
  }

  if (sku) {
    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
      const error = new Error("SKU already exists");
      error.status = 400;
      throw error;
    }
  }

  const product = await Product.create({
    name,
    price,
    description,
    category: category || null,
    shortDescription:
      shortDescription || (description ? description.substring(0, 300) : ""),
    brand: brand || null,
    images: images || [],
    stock: stock || 0,
    sku: sku || undefined,
  });

  return await Product.findById(product._id).populate(
    "category",
    "name description slug",
  );
};

export const listAllProduct = async () => {
  const products = await Product.find({ isDeleted: false })
    .populate("category", "name description slug")
    .sort({ createdAt: -1 });
  return products;
};

export const viewCurrentProduct = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid product ID format");
    error.status = 400;
    throw error;
  }

  const product = await Product.findById(id).populate(
    "category",
    "name description slug",
  );

  if (!product || product.isDeleted) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return product;
};

export const updateProduct = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid product ID format");
    error.status = 400;
    throw error;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true },
  ).populate("category", "name description slug");

  if (!product || product.isDeleted) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return product;
};

export const deleteProduct = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid product ID format");
    error.status = 400;
    throw error;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return product;
};

export const listProductsByCategory = async (categoryId) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    const error = new Error("Invalid category ID format");
    error.status = 400;
    throw error;
  }

  const products = await Product.find({
    category: categoryId,
    isDeleted: false,
  })
    .populate("category", "name description slug")
    .sort({ createdAt: -1 });

  return products;
};
