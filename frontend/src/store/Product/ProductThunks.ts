import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppDispatch } from '../useAppDispatch';
import { API_URL } from '../../utils/constants';
import { setTotal, setTotalPages } from '../Filter/FilterSlice';

type FetchProductsParams = {
  page: number;
  viewLimit: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      const { page, viewLimit, minPrice, maxPrice, search } = params;
      const response = await axios.get(`${API_URL}/users/products`, {
        params: {
          page,
          viewLimit,
          minPrice,
          maxPrice,
          search,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || 'Ett fel inträffade när data skulle hämtas.'
        );
      }
      return rejectWithValue('Ett okänt fel inträffade.');
    }
  }
);
