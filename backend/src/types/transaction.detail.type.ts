import { ProductModel } from "./product.type";

export interface TransactionDetailModel {
    id: string;
    transactionId: string;
    products: ProductModel[];
    createdAt: Date;
    updatedAt: Date;
}
