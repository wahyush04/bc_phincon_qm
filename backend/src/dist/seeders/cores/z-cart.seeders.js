import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        // Fetch all user IDs
        const users = await queryInterface.sequelize.query(`SELECT id FROM users;`);
        // Fetch all product IDs
        const products = await queryInterface.sequelize.query(`SELECT id FROM products;`);
        // Ensure users and products exist
        if (!users || users.length === 0) {
            throw new Error("No users found. Seed users before seeding carts.");
        }
        if (!products || products.length === 0) {
            throw new Error("No products found. Seed products before seeding carts.");
        }
        // Generate 15 cart items
        const carts = Array.from({ length: 15 }).map(() => {
            // Get random product and user
            const randomNumberUsers = Math.floor(Math.random() * users.length);
            const randomNumberProducts = Math.floor(Math.random() * products.length);
            const getRandomUserId = () => users[randomNumberUsers][0].id;
            const getRandomProductId = () => products[randomNumberProducts][0].id;
            console.log(getRandomUserId(), getRandomProductId());
            // Get random qty
            const qty = Math.floor(Math.random() * 5) + 1;
            // Get the selected product's price
            const productPrice = products[randomNumberProducts][0].price;
            console.log(qty, productPrice);
            return {
                id: uuidv4(),
                userId: getRandomUserId(),
                productId: getRandomProductId(),
                qty,
                totalPrice: Number(qty * Number(productPrice)),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
        await queryInterface.bulkInsert("carts", carts, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("carts", {});
    },
};
