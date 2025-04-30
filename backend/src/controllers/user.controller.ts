import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

class UserController extends AbstractModel {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await db.User.findAll({
                attributes: ["id", "name", "username", "email", "telephone", "createdAt", "updatedAt"],
            });
            res.json({
                status: "success",
                message: "Users fetched successfully",
                data: users,
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
            const user = await db.User.findByPk(req.params.id, {
                attributes: ["id", "name", "username", "email", "teleohone", "createdAt", "updatedAt"],
            });
            if (!user) {
                res.json({
                    message: "User not found",
                    status: "error",
                });
                return;
            }
            res.json({
                status: "success",
                message: "User fetched successfully",
                data: user,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const id = req.body.id || uuidv4();
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = await db.User.create({
                ...req.body,
                id,
                password: hashedPassword,
            });

            res.json({
                status: "success",
                message: "User created successfully",
                data: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    teleohone: user.teleohone,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const payload = { ...req.body };

            if (payload.password) {
                payload.password = await bcrypt.hash(payload.password, 10);
            }

            const [updated] = await db.User.update(payload, { where: { id } });

            if (!updated) {
                res.json({
                    status: "error",
                    message: "User not found or no changes applied",
                });
                return;
            }

            res.json({
                status: "success",
                message: "User updated successfully",
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
            const deleted = await db.User.destroy({ where: { id } });

            if (!deleted) {
                res.json({
                    status: "error",
                    message: "User not found",
                });
                return;
            }

            res.json({
                status: "success",
                message: "User deleted successfully",
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

export default new UserController();
