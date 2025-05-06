import { Model, DataTypes, Sequelize } from "sequelize";
import { TransactionDetailModel } from "src/types/transaction.detail.type";
import { v4 as uuidv4 } from "uuid";


export default (sequelize: Sequelize) => {
    class TransactionDetail extends Model<TransactionDetailModel> {
        static associate(models: any) {
            // Transaction belongs to a User (cashier)
            TransactionDetail.belongsTo(models.Transaction, {
                foreignKey: "transactionId",
                as: "transaction",
            });

            // Optionally: you might add hasMany(TransactionDetail) here
        }
    }

    TransactionDetail.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: uuidv4,
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
        },
        {
            sequelize,
            modelName: "TransactionDetail",
            tableName: "transaction_details",
        }
    );

    return TransactionDetail;
};
