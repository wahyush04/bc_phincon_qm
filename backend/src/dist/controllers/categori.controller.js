import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
class CategoryController extends AbstractModel {
    async getAll(req, res) {
        try {
            const categories = await db.Category.findAll({
                attributes: ["id", "name", "description", "createdAt", "updatedAt"],
            });
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
    async getById(req, res) {
        try {
            const category = await db.Category.findByPk(req.params.id, {
                attributes: ["id", "name", "description", "createdAt", "updatedAt"],
            });
            if (!category) {
                res.json({
                    message: "Category not found",
                    status: "error",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Category fetched successfully",
                data: category,
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
            const category = await db.Category.create({
                ...req.body,
                id,
            });
            res.json({
                status: "success",
                message: "Category created successfully",
                data: {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                },
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
            const [updated] = await db.Category.update(req.body, { where: { id } });
            if (!updated) {
                res.json({
                    status: "error",
                    message: "Category not found or no changes applied",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Category updated successfully",
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
            const deleted = await db.Category.destroy({ where: { id } });
            if (!deleted) {
                res.json({
                    status: "error",
                    message: "Category not found",
                });
                return;
            }
            res.json({
                status: "success",
                message: "Category deleted successfully",
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
export default new CategoryController();
