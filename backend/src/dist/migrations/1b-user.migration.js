import { DataTypes } from "sequelize";
import { v4 as UUIDV4 } from "uuid";
export default {
    up: async (queryInterface) => {
        await queryInterface.createTable("users", {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4(),
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("admin", "cashier"),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("users");
    },
};
