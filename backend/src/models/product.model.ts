import { Model, DataTypes, Sequelize } from "sequelize";
import { ProductModel } from "../types/product.type.js";
import { v4 as uuidv4 } from "uuid";

export default (sequelize: Sequelize) => {
    class Product extends Model<ProductModel> {
        static associate(models: any) {}
    }

    Product.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                defaultValue: uuidv4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
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
            modelName: "Product",
            tableName: "products",
        }
    );

    return Product;
};
