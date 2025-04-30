export interface ProductType {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    data: any;
  }
  
  export interface ProductStateType {
    products: ProductType[];
    product: ProductType | null;
    loading: boolean;
    error: any;
    message: string | null;
    status: string | null;
  }
  
  export type ProductFormType = ProductType;
  