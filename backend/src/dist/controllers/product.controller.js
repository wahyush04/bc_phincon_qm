import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
class ProductController extends AbstractModel {
    async getAll(req, res) {
        try {
            const products = await db.Product.findAll({
                attributes: ["id", "name", "price", "stock"],
                include: {
                    model: db.Category,
                    as: "category",
                    attributes: ["id", "name", "description"],
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
    async getById(req, res) {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                attributes: ["id", "name", "price", "stock"],
                include: {
                    model: db.Category,
                    as: "category",
                    attributes: ["id", "name", "description"],
                },
            });
            if (!product) {
                res.json({
                    message: "Product not found",
                    status: "error",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Product fetched successfully",
                data: product,
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
            const product = await db.Product.create({
                ...req.body,
                id,
            });
            res.json({
                status: "success",
                message: "Product created successfully",
                data: product,
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await db.Product.update(req.body, { where: { id } });
            if (!updated) {
                res.json({
                    status: "error",
                    message: "Product not found or no changes applied",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Product updated successfully",
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
            const deleted = await db.Product.destroy({ where: { id } });
            if (!deleted) {
                res.json({
                    status: "error",
                    message: "Product not found",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Product deleted successfully",
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
export default new ProductController();
