import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
export default (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                foreignKey: "categoryId",
                as: "products",
            });
        }
    }
    Category.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: uuidv4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: "Category",
        tableName: "categories",
    });
    return Category;
};
