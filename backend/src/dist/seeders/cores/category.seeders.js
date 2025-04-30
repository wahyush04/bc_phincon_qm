import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        const categories = [
            {
                id: uuidv4(),
                title: "Electronics",
                description: "Electronic devices and gadgets",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                title: "Clothing",
                description: "Apparel and fashion items",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                title: "Books",
                description: "All genres of books and novels",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                title: "Furniture",
                description: "Home and office furniture",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                title: "Groceries",
                description: "Daily essentials and grocery items",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await queryInterface.bulkInsert("categories", categories, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("categories", {});
    },
};
