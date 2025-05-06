import express from "express";
import TransactionDetailController from "../controllers/transaction.detail.controller.js";

const router = express.Router();

router.get("/", TransactionDetailController.getAll);
router.get("/:id", TransactionDetailController.getById);
router.post("/", TransactionDetailController.create);
router.put("/:id", TransactionDetailController.update);
router.delete("/:id", TransactionDetailController.delete);

export default router;
