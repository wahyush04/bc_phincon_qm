import express from "express";
import TransactionController from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/categories", TransactionController.getAllCategory);
router.get("/products", TransactionController.getAllProduct);
router.get("/user/cart/:userId", TransactionController.getUserCart);
router.post("/user/cart/:userId", TransactionController.addCart);
router.delete("/user/cart/:cartId", TransactionController.deleteCart);

export default router;
