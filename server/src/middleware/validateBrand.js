import mongoose from "mongoose";

export const validateBrand = (req, res, next) => {
  const { name, description, logo, website, isActive, isDeleted } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Name is required");
  }

  if (!description) {
    errors.push("Description is required");
  }

  if (!isActive) {
    errors.push("Brand status is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};
