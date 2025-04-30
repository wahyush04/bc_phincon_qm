import { Model, DataTypes, Sequelize } from "sequelize";
import { CartModel } from "../types/cart.type.js";
import { v4 as uuidv4 } from "uuid";

export default (sequelize: Sequelize) => {
    class Cart extends Model<CartModel> {
        static associate(models: any) {
            Cart.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });

            Cart.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "product",
            });
        }
    }

    Cart.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: uuidv4,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalPrice: {
                type: DataTypes.FLOAT,
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
        },
        {
            sequelize,
            modelName: "Cart",
            tableName: "carts",
        }
    );

    return Cart;
};
