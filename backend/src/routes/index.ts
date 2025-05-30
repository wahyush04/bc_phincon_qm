import express from "express";
import productRouter from "./product.route.js";
import transactionRouterOld from "./transaction.old.route.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import AuthController from "../controllers/auth.controller.js";
import categoryRouter from "./category.route.js";
import transactionRouter from "./transaction.route.js";
import transactionDetailRouter from "./transaction.detail.route.js";
import transactionOldRouter from "./transaction.old.route.js";

const router = express.Router();

router.use("/transactions-old", transactionOldRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/transactions", transactionRouter);
router.use("/transactions-detail", transactionDetailRouter);

router.post("/login", loginValidator, AuthController.login);
router.post("/register", registerValidator, AuthController.register);

export default router;
