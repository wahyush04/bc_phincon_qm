export interface CartModel {
    id: string;
    userId: string;
    productId: string;
    qty: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
