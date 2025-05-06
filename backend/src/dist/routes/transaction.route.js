import express from "express";
import TransactionController from "../controllers/transaction.controller.js";
const router = express.Router();
router.get("/", TransactionController.getAll);
router.get("/:id", TransactionController.getById);
router.post("/", TransactionController.create);
router.put("/:id", TransactionController.update);
router.delete("/:id", TransactionController.delete);
export default router;
