import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/product.slice";

export const store = configureStore({
    reducer: {
        products: productReducer,
    },
});
