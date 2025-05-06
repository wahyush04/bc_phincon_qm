import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        const [users] = await queryInterface.sequelize.query(`SELECT id FROM users LIMIT 5;`);
        const cashierIds = users.map((user) => user.id);
        const transactions = [];
        for (let i = 0; i < 10; i++) {
            transactions.push({
                id: uuidv4(),
                totalPrice: Math.floor(Math.random() * 500000) + 10000,
                cashierId: cashierIds[Math.floor(Math.random() * cashierIds.length)],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert("transactions", transactions, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("transactions", {});
    },
};
