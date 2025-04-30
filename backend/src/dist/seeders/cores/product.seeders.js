import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        let products = [
            {
                id: uuidv4(),
                name: "Smartphone 1",
                price: 299.99,
                category: "Electronics",
                stock: 100,
            },
            {
                id: uuidv4(),
                name: "Smartphone 2",
                price: 399.99,
                category: "Electronics",
                stock: 150,
            },
            {
                id: uuidv4(),
                name: "Smartphone 3",
                price: 499.99,
                category: "Electronics",
                stock: 200,
            },
            {
                id: uuidv4(),
                name: "Smartphone 4",
                price: 599.99,
                category: "Electronics",
                stock: 120,
            },
            {
                id: uuidv4(),
                name: "Smartphone 5",
                price: 699.99,
                category: "Electronics",
                stock: 80,
            },
        ];
        await queryInterface.bulkInsert("products", products, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", {});
    },
};
