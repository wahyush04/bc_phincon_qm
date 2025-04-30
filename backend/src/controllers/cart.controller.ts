import { Request, Response } from "express";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

class CartController {
    // Get all cart items for a specific user
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const cartItems = await db.Cart.findAll({
                where: { userId },
                attributes: ["id", "qty", "totalPrice", "createdAt", "updatedAt"],
                include: [
                    {
                        model: db.Product,
                        as: "product",
                        attributes: ["id", "name", "price", "stock"],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["id", "name", "username", "email"],
                    },
                ],
            });
            res.json({
                status: "success",
                message: "Cart items fetched successfully",
                data: cartItems,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    // Get a specific cart item for a user
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const cartItemId = req.params.id;
            const cartItem = await db.Cart.findOne({
                where: { id: cartItemId, userId },
                attributes: ["id", "qty", "totalPrice", "createdAt", "updatedAt"],
                include: [
                    {
                        model: db.Product,
                        as: "product",
                        attributes: ["id", "name", "price", "stock"],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["id", "name", "username", "email"],
                    },
                ],
            });
            if (!cartItem) {
                res.json({
                    status: "error",
                    message: "Cart item not found",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Cart item fetched successfully",
                data: cartItem,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    // Add a product to the cart
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId, qty, totalPrice } = req.body;
            const cartItem = await db.Cart.create({
                userId,
                productId,
                qty,
                totalPrice,
                id: uuidv4(),
            });

            res.json({
                status: "success",
                message: "Product added to cart successfully",
                data: cartItem,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    // Update a cart item (e.g., change qty or totalPrice)
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { qty, totalPrice } = req.body;

            const [updated] = await db.Cart.update({ qty, totalPrice }, { where: { id } });

            if (!updated) {
                res.json({
                    status: "error",
                    message: "Cart item not found or no changes applied",
                });
                return;
            }

            res.json({
                status: "success",
                message: "Cart item updated successfully",
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    // Remove a product from the cart
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const deleted = await db.Cart.destroy({ where: { id } });

            if (!deleted) {
                res.json({
                    status: "error",
                    message: "Cart item not found",
                });
                return;
            }

            res.json({
                status: "success",
                message: "Product removed from cart successfully",
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

export default new CartController();
