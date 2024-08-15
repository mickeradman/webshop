import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { productApi } from '../../api/productApi';

import type { Product } from '../../types/types';

type ProductState = {
  products: Product[];
  total: number;
};

const initialState: ProductState = {
  products: [],
  total: 0,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.fetchProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
      }
    );
  },
});

export const selectProductsState = (state: RootState) => state.products;
export const selectProducts = (state: RootState) => state.products.products;

export default productSlice.reducer;
