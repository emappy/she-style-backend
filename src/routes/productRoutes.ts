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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get single product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Product created successfully
 */

router.post("/", authMiddleware, adminMiddleware, createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

export default router;
