import express from "express";

import { getAllUsers } from "../controllers/userController";

import authMiddleware from "../middleware/authMiddleware";

import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);

export default router;
