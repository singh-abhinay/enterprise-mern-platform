import express from "express";
import {
  createProduct,
  listProduct,
  viewProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product/productController.js";
import { validateProduct } from "../middleware/validateProduct.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, validateProduct, createProduct);

router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  validateProduct,
  updateProduct,
);

router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);
router.get("/", listProduct);
router.get("/:id", viewProduct);

export default router;
