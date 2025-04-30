import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: hashedPassword,
        teleohone: "081234567890",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Jane Smith",
        username: "janesmith",
        email: "jane@example.com",
        password: hashedPassword,
        teleohone: "082345678901",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        password: hashedPassword,
        teleohone: "083456789012",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bob Williams",
        username: "bobw",
        email: "bob@example.com",
        password: hashedPassword,
        teleohone: "084567890123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Charlie Brown",
        username: "charlieb",
        email: "charlie@example.com",
        password: hashedPassword,
        teleohone: "085678901234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {
      username: ["johndoe", "janesmith", "alicej", "bobw", "charlieb"],
    });
  },
};
