import express from "express";
import authRoutes from "./auth.js";
import productRoutes from "./product.js";
import categoryRoutes from "./category.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

export default router;
