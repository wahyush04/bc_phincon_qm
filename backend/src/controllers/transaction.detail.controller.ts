import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

class TransactionDetailController extends AbstractModel {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            // const [transactionDetails] = await db.sequelize.query(`
            //     SELECT 
            //         td.id AS id,
            //         td.transactionId,
            //         td.products,
            //         td.createdAt,
            //         t.id AS \`transaction.id\`,
            //         t.totalPrice AS \`transaction.totalPrice\`,
            //         t.createdAt AS \`transaction.createdAt\`
            //     FROM \`transaction_details\` td
            //     JOIN \`Transactions\` t ON t.id = td.transactionId
            // `);

            const transactionDetails = await db.TransactionDetail.findAll({
                attributes: ["id", "transactionId", "products", "createdAt"],
                include: [
                    {
                        model: db.Transaction,
                        as: "transaction",
                        attributes: ["id", "totalPrice", "createdAt"],
                    },
                ],
            });
            

            res.json({
                status: "success",
                message: "Transaction details fetched successfully",
                data: transactionDetails,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const detail = await db.TransactionDetail.findByPk(req.params.id, {
                attributes: ["id", "transactionId", "products", "createdAt"],
                include: [
                    {
                        model: db.Transaction,
                        as: "transaction",
                        attributes: ["id", "totalPrice", "createdAt"],
                    },
                ],
            });

            if (!detail) {
                res.json({
                    status: "error",
                    message: "Transaction detail not found",
                });
                return;
            }

            res.json({
                status: "success",
                message: "Transaction detail fetched successfully",
                data: detail,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const t = await db.sequelize.transaction(); // begin transaction
        try {
            const id = req.body.id || uuidv4();
            const productsJson = typeof req.body.products === 'string'
                ? JSON.parse(req.body.products)
                : req.body.products;
    
            // Decrease stock for each product
            for (const item of productsJson) {
                const product = await db.Product.findByPk(item.id, { transaction: t });
    
                if (!product) {
                    throw new Error(`Product with id ${item.id} not found`);
                }
    
                if (product.stock < item.quantity) {
                    throw new Error(`Not enough stock for product ${item.id}`);
                }
    
                await product.decrement('stock', { by: item.quantity, transaction: t });
            }
    
            // Create transaction detail
            const detail = await db.TransactionDetail.create({
                ...req.body,
                id,
                products: JSON.stringify(productsJson), // ensure it's saved as JSON string
            }, { transaction: t });
    
            await t.commit(); // commit transaction
    
            res.json({
                status: "success",
                message: "Transaction detail created and stock updated successfully"
            });
        } catch (error: any) {
            await t.rollback();
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const [updated] = await db.TransactionDetail.update(req.body, {
                where: { id },
            });

            if (!updated) {
                res.json({
                    status: "error",
                    message: "Transaction detail not found or no changes applied",
                });
                return;
            }

            res.json({
                status: "success",
                message: "Transaction detail updated successfully",
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await db.TransactionDetail.destroy({ where: { id } });

            if (!deleted) {
                res.json({
                    status: "error",
                    message: "Transaction detail not found",
                });
                return;
            }

            res.json({
                status: "success",
                message: "Transaction detail deleted successfully",
                data: id,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new TransactionDetailController();
