export interface ProductModel {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
