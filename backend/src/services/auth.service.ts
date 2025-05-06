import db from "../models/index.js";
import { UserModel } from "../types/user.type.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// Only fields that exist in your schema
type RegisterUser = Pick<UserModel, "name" | "username" | "email" | "password" | "role">;

class AuthService {
    async login(email: string, _password: string) {
        try {
            const user = await db.User.findOne({ where: { email } });
            return user;
        } catch (error: any) {
            throw new Error("Failed to login: " + error.message);
        }
    }

    async register(data: RegisterUser) {
        try {
            // Ensure unique username/email check if needed
            const existingUser = await db.User.findOne({ where: { email: data.email } });
            if (existingUser) {
                throw new Error("Email already registered.");
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = await db.User.create({
                ...data,
                id: uuidv4(),
                password: hashedPassword,
            });
            return newUser;
        } catch (error: any) {
            throw new Error("Failed to register: " + error.message);
        }
    }
}

export default new AuthService();
