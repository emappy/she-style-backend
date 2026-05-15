import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController";

import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, adminMiddleware, getAllOrders);

router.get("/my-orders", authMiddleware, getMyOrders);

export default router;
