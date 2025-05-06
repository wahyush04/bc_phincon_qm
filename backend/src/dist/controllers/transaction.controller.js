import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
class TransactionController {
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
    async getTotalByDate(req, res) {
        try {
            const { date } = req.query; // expected format: 'YYYY-MM-DD'
            console.log("wahyu --> ", date);
            if (!date) {
                res.status(400).json({
                    status: "error",
                    message: "Query parameter 'date' is required in 'YYYY-MM-DD' format",
                });
                return;
            }
            const [totalResult, totalTransactions] = await Promise.all([
                db.Transaction.findAll({
                    attributes: [
                        [db.sequelize.fn("SUM", db.sequelize.col("totalPrice")), "totalPrice"]
                    ],
                    where: db.sequelize.where(db.sequelize.fn("DATE", db.sequelize.col("createdAt")), date)
                }),
                db.Transaction.count({
                    where: db.sequelize.where(db.sequelize.fn("DATE", db.sequelize.col("createdAt")), date)
                })
            ]);
            console;
            res.json({
                status: "success",
                message: `Total transactions on ${date} fetched successfully`,
                data: {
                    totalPrice: totalResult[0].totalPrice,
                    totalTransactions,
                },
            });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}
export default new TransactionController();
