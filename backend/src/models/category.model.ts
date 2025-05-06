import { Model, DataTypes, Sequelize } from "sequelize";
import { CategoryModel } from "src/types/category.type";
import { v4 as uuidv4 } from "uuid";

export default (sequelize: Sequelize) => {
    class Category extends Model<CategoryModel> {
        static associate(models: any) {
            Category.hasMany(models.Product, {
                foreignKey: "categoryId",
                as: "products",
            });
        }
    }

    Category.init(
        {
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
        },
        {
            sequelize,
            modelName: "Category",
            tableName: "categories",
        }
    );

    return Category;
};
