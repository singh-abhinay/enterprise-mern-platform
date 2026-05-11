import express from "express";
import {
  createBrand,
  listBrand,
  viewBrand,
  deleteBrand,
  updateBrand,
} from "../controllers/brand/brandController.js";
import { validateBrand } from "../middleware/validateBrand.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, validateBrand, createBrand);

router.put("/:id", authenticate, authorizeAdmin, validateBrand, updateBrand);

router.delete("/:id", authenticate, authorizeAdmin, deleteBrand);
router.get("/", listBrand);
router.get("/:id", viewBrand);

export default router;
