import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
export default (sequelize) => {
    class Transaction extends Model {
        static associate(models) {
            // Transaction belongs to a User (cashier)
            Transaction.belongsTo(models.User, {
                foreignKey: "cashierId",
                as: "cashier",
            });
        }
    }
    Transaction.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4,
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
    }, {
        sequelize,
        modelName: "Transaction",
        tableName: "transactions",
    });
    return Transaction;
};
