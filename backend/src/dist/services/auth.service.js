import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
class AuthService {
    async login(email, _password) {
        try {
            const user = await db.User.findOne({ where: { email } });
            return user;
        }
        catch (error) {
            throw new Error("Failed to login: " + error.message);
        }
    }
    async register(data) {
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
        }
        catch (error) {
            throw new Error("Failed to register: " + error.message);
        }
    }
}
export default new AuthService();
