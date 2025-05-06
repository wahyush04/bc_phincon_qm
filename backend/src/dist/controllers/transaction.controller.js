import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
class TransactionController extends AbstractModel {
    async getAll(req, res) {
        try {
            const transactions = await db.Transaction.findAll({
                attributes: ["id", "totalPrice", "createdAt"],
                include: [
                    {
                        model: db.User,
                        as: "cashier",
                        attributes: ["id", "username", "email"],
                    }
                ],
            });
            res.json({
                status: "success",
                message: "Transactions fetched successfully",
                data: transactions,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async getById(req, res) {
        try {
            const transaction = await db.Transaction.findByPk(req.params.id, {
                attributes: ["id", "totalPrice", "createdAt"],
                include: [
                    {
                        model: db.User,
                        as: "cashier",
                        attributes: ["id", "username", "email"],
                    }
                ],
            });
            if (!transaction) {
                res.json({
                    status: "error",
                    message: "Transaction not found",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Transaction fetched successfully",
                data: transaction,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async create(req, res) {
        try {
            const id = req.body.id || uuidv4();
            const transaction = await db.Transaction.create({
                ...req.body,
                id,
            });
            res.json({
                status: "success",
                message: "Transaction created successfully",
                data: transaction,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await db.Transaction.update(req.body, { where: { id } });
            if (!updated) {
                res.json({
                    status: "error",
                    message: "Transaction not found or no changes applied",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Transaction updated successfully",
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await db.Transaction.destroy({ where: { id } });
            if (!deleted) {
                res.json({
                    status: "error",
                    message: "Transaction not found",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Transaction deleted successfully",
                data: id,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
}
export default new TransactionController();
