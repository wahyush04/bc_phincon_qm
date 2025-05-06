import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const [transactions] = await queryInterface.sequelize.query(
            `SELECT id FROM transactions;`
        );
        const [products] = await queryInterface.sequelize.query(
            `SELECT id, name, price, categoryId, stock FROM products;`
        );

        const transactionsId = (transactions as any[]).map((t: any) => t.id);
        const transactionDetails = [];

        for (let i = 0; i < 10; i++) {
            const productCount = Math.floor(Math.random() * 3) + 1;
            const selectedProducts = [];

            for (let j = 0; j < productCount; j++) {
                const product = products[Math.floor(Math.random() * products.length)];
                selectedProducts.push(product);
            }

            transactionDetails.push({
                id: uuidv4(),
                transactionId: transactionsId[Math.floor(Math.random() * transactionsId.length)],
                products: JSON.stringify(selectedProducts),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert("transaction_details", transactionDetails, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("transaction_details", {});
    },
};
