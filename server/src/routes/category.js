import express from "express";
import {
  createCategoryHandler,
  getCategories,
  getCategory,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategoryHandler);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;
