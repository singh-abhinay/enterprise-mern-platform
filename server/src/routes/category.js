import express from "express";
import {
  createCategoryHandler,
  getCategories,
  getCategory,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/categoryController.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createCategoryHandler);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", authenticate, authorizeAdmin, updateCategoryHandler);
router.delete("/:id", authenticate, authorizeAdmin, deleteCategoryHandler);

export default router;
