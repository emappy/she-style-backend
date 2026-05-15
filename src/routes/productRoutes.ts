import express from "express";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";

import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

export default router;
