import express from "express";
import {
  createProduct,
  listProduct,
  viewProduct,
} from "../controllers/product/productController.js";
import { validateProduct } from "../middleware/validateProduct.js";

const router = express.Router();

router.post("/", validateProduct, createProduct);
router.get("/", listProduct);
router.get("/:id", viewProduct);

export default router;
