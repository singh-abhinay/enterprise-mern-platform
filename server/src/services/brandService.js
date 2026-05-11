import Brand from "../models/Brand.js";
import mongoose from "mongoose";

export const createNewBrand = async (data) => {
  const { name, description, logo, website, isActive, isDeleted } = data;

  if (!name || !description) {
    const error = new Error("Name and description are required");
    error.status = 400;
    throw error;
  }

  const brand = await Brand.create({
    name,
    description,
    logo,
    website,
    isActive,
    isDeleted,
  });

  return brand;
};

export const listAllBrand = async () => {
  return await Brand.find({
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

export const viewCurrentBrand = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid brand ID format");
    error.status = 400;
    throw error;
  }

  const brand = await Brand.findById(id);

  if (!brand || brand.isDeleted) {
    const error = new Error("Brand not found");
    error.status = 404;
    throw error;
  }

  return brand;
};

export const updateBrandData = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid brand ID format");
    error.status = 400;
    throw error;
  }

  const brand = await Brand.findByIdAndUpdate(
    id,
    { ...data },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!brand || brand.isDeleted) {
    const error = new Error("Brand not found");
    error.status = 404;
    throw error;
  }

  return brand;
};

export const deleteBrandData = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid brand ID format");
    error.status = 400;
    throw error;
  }

  const brand = await Brand.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  if (!brand) {
    const error = new Error("Brand not found");
    error.status = 404;
    throw error;
  }

  return brand;
};
