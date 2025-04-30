/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductAPI from "../../services/api/product.api";
import { ProductFormType, ProductStateType } from "../../types/product.type";

export const getAllProducts = createAsyncThunk("products/getAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await ProductAPI.getAll();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createProduct = createAsyncThunk("products/createProduct", async (productData: ProductFormType, { rejectWithValue }) => {
  try {
    console.log("wahyu ust -->", productData);
    const response = await ProductAPI.create(productData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (productData: ProductFormType, { rejectWithValue }) => {
  try {
    const response = await ProductAPI.update(productData.id, productData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId: string, { rejectWithValue }) => {
  try {
    const response = await ProductAPI.delete(productId);
    return response; 
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const initialState: ProductStateType = {
  products: [],
  product: null,
  loading: false,
  error: null,
  message: null,
  status: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("wahyu pst success--> ", action.payload);
        state.loading = false;
        state.products = action.payload.data;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log("wahyu --> ", "API Rejected")
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.data);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload.message);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
