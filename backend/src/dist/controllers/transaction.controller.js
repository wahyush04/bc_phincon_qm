import db from "../models/index.js";
import CommonModel from "../abstracts/transaction.model.abstract.js";
import { v4 as uuidv4 } from "uuid";
class TransactionController extends CommonModel {
    async getAllCategory(req, res) {
        try {
            const categories = await db.Category.findAll();
            res.json({
                status: "success",
                message: "Categories fetched successfully",
                data: categories,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async getAllProduct(req, res) {
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
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async getUserCart(req, res) {
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
                                as: "product", // make sure Cart belongsTo Product with alias 'product'
                                attributes: ["id", "name", "price"],
                            },
                        ],
                    },
                ],
                attributes: ["id", "name", "email"], // optional
            });
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            }
            // Calculate total price
            const carts = user.carts.map((cart) => {
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
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async addCart(req, res) {
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
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async deleteCart(req, res) {
        try {
            const { cartId } = req.params;
            const deleted = await db.Cart.destroy({ where: { id: cartId } });
            if (deleted) {
                return res.json({
                    status: "success",
                    message: "Cart item deleted successfully",
                });
            }
            else {
                return res.status(404).json({
                    status: "error",
                    message: "Cart item not found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}
export default new TransactionController();
