import express from "express";

import { getAllUsers } from "../controllers/userController";

import authMiddleware from "../middleware/authMiddleware";

import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */

router.get("/", authMiddleware, adminMiddleware, getAllUsers);

export default router;
