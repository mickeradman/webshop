import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchProducts } from './ProductThunks';
import type { Product } from '../../types/types';

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

let initialProductState: ProductState;

try {
  const persistedState = localStorage.getItem('productsState');

  initialProductState = persistedState
    ? JSON.parse(persistedState)
    : initialState;
} catch (error) {
  console.error('Misslyckades med att parsa bevarat tillstånd:', error);
  initialProductState = initialState;
}

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'Misslyckades att hämta produkter.';
        }
      });
  },
});

export const { resetError } = productSlice.actions;

export const selectProductsState = (state: RootState) => state.products;

export const selectVisibleProducts = createSelector(
  [selectProductsState],
  (productsState) => {
    return productsState.products;
  }
);

export const selectProducts = (state: RootState) => state.products.products;

export default productSlice.reducer;
