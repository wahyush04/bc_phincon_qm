import { Request, Response } from "express";
import db from "../models/index.js";
import CommonModel from "../abstracts/transaction.model.abstract.js";
import { v4 as uuidv4 } from "uuid";

class TransactionController extends CommonModel {
    async getAllCategory(req: Request, res: Response): Promise<any> {
        try {
            const categories = await db.Category.findAll();
            res.json({
                status: "success",
                message: "Categories fetched successfully",
                data: categories,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getAllProduct(req: Request, res: Response): Promise<any> {
        try {
            const products = await db.Product.findAll({
                include: {
                    model: db.Category,
                    as: "category",
                    attributes: ["id", "title"],
                },
            });
            res.json({
                status: "success",
                message: "Products fetched successfully",
                data: products,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getUserCart(req: Request, res: Response): Promise<any> {
        try {
            const { userId } = req.params;
    
            const user = await db.User.findByPk(userId, {
                include: [
                    {
                        model: db.Cart,
                        as: "carts",
                        include: [
                            {
                                model: db.Product,
                                as: "product",
                                attributes: ["id", "name", "price"],
                            },
                        ],
                    },
                ],
                attributes: ["id", "name", "email"],
            });
    
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            }
    
            // Calculate total price
            const carts = user.carts.map((cart: any) => {
                const totalPrice = cart.qty * cart.product.price;
                return {
                    ...cart.toJSON(),
                    product: cart.product,
                    totalPrice,
                };
            });
    
            res.json({
                status: "success",
                message: "Cart fetched successfully",
                data: carts,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    
    async addCart(req: Request, res: Response): Promise<any> {
        try {
            const { userId } = req.params;
            const { productId, qty } = req.body;

            const cartItem = await db.Cart.create({
                id: uuidv4(),
                userId,
                productId,
                qty,
                totalPrice: qty * (await db.Product.findByPk(productId)).price
            });

            res.json({
                status: "success",
                message: "Cart item added successfully",
                data: cartItem,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async deleteCart(req: Request, res: Response): Promise<any> {
        try {
            const { cartId } = req.params;
            const deleted = await db.Cart.destroy({ where: { id: cartId } });
    
            if (deleted) {
                return res.json({
                    status: "success",
                    message: "Cart item deleted successfully",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    message: "Cart item not found",
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    
}

export default new TransactionController();
