import { DataTypes } from "sequelize";
export default {
    async up(queryInterface) {
        await queryInterface.createTable("transactions", {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            totalPrice: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            cashierId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
        await queryInterface.dropTable("transactions");
    },
};
