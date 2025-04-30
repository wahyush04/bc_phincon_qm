import express from "express";
import productRouter from "./product.route.js";
import transactionRouter from "./transaction.route.js";
const router = express.Router();

router.use("/products", productRouter);
router.use("/", transactionRouter);

export default router;
