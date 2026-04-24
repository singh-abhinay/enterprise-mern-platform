import mongoose from "mongoose";

export const validateProduct = (req, res, next) => {
  const { name, price, description, category } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Name is required");
  }

  if (!price) {
    errors.push("Price is required");
  } else if (price <= 0) {
    errors.push("Price must be greater than 0");
  }

  if (!description) {
    errors.push("Description is required");
  }

  if (category && !mongoose.Types.ObjectId.isValid(category)) {
    errors.push("Invalid category ID format");
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
