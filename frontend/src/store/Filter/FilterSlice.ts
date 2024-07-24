import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchProducts } from '../Product/ProductThunks';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  search: string;
  page: number;
  viewLimit: number;
  total: number;
  totalPages: number;
}

const initialState: FilterState = {
  minPrice: 0,
  maxPrice: 25000,
  search: '',
  page: 1,
  viewLimit: 10,
  total: 0,
  totalPages: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setViewLimit: (state, action: PayloadAction<number>) => {
      state.viewLimit = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.totalPages = Math.ceil(action.payload.total / state.viewLimit);
    });
  },
});

export const {
  setMinPrice,
  setMaxPrice,
  setSearch,
  setPage,
  setViewLimit,
  setTotal,
  setTotalPages,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
