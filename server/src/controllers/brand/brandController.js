import {
  createNewBrand,
  listAllBrand,
  viewCurrentBrand,
  updateBrandData,
  deleteBrandData,
} from "../../services/brandService.js";

export const createBrand = async (req, res, next) => {
  try {
    const brand = await createNewBrand(req.body);

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  } catch (err) {
    next(err);
  }
};

export const listBrand = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    let brands;

    if (categoryId) {
      brands = await listBrandsByCategory(categoryId);
    } else {
      brands = await listAllBrand();
    }

    res.json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (err) {
    next(err);
  }
};

export const viewBrand = async (req, res, next) => {
  try {
    const brand = await viewCurrentBrand(req.params.id);

    res.json({
      success: true,
      data: brand,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const brand = await updateBrandData(req.params.id, req.body);

    res.json({
      success: true,
      data: brand,
      message: "Brand updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    await deleteBrandData(req.params.id);

    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
