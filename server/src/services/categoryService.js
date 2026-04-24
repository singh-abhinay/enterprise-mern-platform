import Category from "../models/Category.js";

export const createCategory = async (data) => {
  const { name, description, image } = data;

  if (!name || !description) {
    const error = new Error("Name and description are required");
    error.status = 400;
    throw error;
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    const error = new Error("Category already exists");
    error.status = 400;
    throw error;
  }

  const category = await Category.create({
    name,
    description,
    image: image || null,
  });

  return category;
};

export const listCategories = async () => {
  const categories = await Category.find({ isDeleted: false }).sort({
    name: 1,
  });
  return categories;
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category || category.isDeleted) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  return category;
};

export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true },
  );

  if (!category || category.isDeleted) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  return category;
};
