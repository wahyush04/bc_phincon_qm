import { DataTypes } from "sequelize";
export default {
    async up(queryInterface) {
        await queryInterface.createTable("transaction_details", {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            transactionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "transactions",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            products: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("transaction_details");
    },
};
