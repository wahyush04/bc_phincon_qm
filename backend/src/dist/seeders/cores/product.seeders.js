import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        // Fetch all category IDs
        const categories = await queryInterface.sequelize.query(`SELECT id FROM categories;`, {
            type: "SELECT",
        });
        // If no categories found, don't proceed
        if (!categories || categories.length === 0) {
            throw new Error("No categories found. Seed categories before seeding products.");
        }
        // Helper to get random categoryId
        const getRandomCategoryId = () => categories[Math.floor(Math.random() * categories.length)].id;
        const products = [
            {
                id: uuidv4(),
                name: "Smartphone 1",
                price: 299.99,
                categoryId: getRandomCategoryId(),
                stock: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: "Smartphone 2",
                price: 399.99,
                categoryId: getRandomCategoryId(),
                stock: 150,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: "Smartphone 3",
                price: 499.99,
                categoryId: getRandomCategoryId(),
                stock: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: "Smartphone 4",
                price: 599.99,
                categoryId: getRandomCategoryId(),
                stock: 120,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: "Smartphone 5",
                price: 699.99,
                categoryId: getRandomCategoryId(),
                stock: 80,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await queryInterface.bulkInsert("products", products, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", {});
    },
};
