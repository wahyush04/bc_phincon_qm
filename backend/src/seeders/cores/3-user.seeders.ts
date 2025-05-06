import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// Helper to get random role
const getRandomRole = () => (Math.random() < 0.5 ? "admin" : "cashier");

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
        role: getRandomRole(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Jane Smith",
        username: "janesmith",
        email: "jane@example.com",
        password: hashedPassword,
        role: getRandomRole(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        password: hashedPassword,
        role: getRandomRole(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bob Williams",
        username: "bobw",
        email: "bob@example.com",
        password: hashedPassword,
        role: getRandomRole(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Charlie Brown",
        username: "charlieb",
        email: "charlie@example.com",
        password: hashedPassword,
        role: getRandomRole(),
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
