import {
  createNewProduct,
  listAllProduct,
  viewCurrentProduct,
  listProductsByCategory,
  updateProductData,
  deleteProductData,
} from "../../services/productService.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await createNewProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const listProduct = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    let products;

    if (categoryId) {
      products = await listProductsByCategory(categoryId);
    } else {
      products = await listAllProduct();
    }

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

export const viewProduct = async (req, res, next) => {
  try {
    const product = await viewCurrentProduct(req.params.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await updateProductData(req.params.id, req.body);

    res.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await deleteProductData(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
