import {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

export const createCategoryHandler = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await listCategories();

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id);

    res.json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategoryHandler = async (req, res, next) => {
  try {
    const category = await updateCategory(req.params.id, req.body);

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryHandler = async (req, res, next) => {
  try {
    await deleteCategory(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
