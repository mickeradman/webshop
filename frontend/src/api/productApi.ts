import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../utils/constants';
import type { Product } from '../types/types';

type FetchProductsParams = {
  page: number;
  viewLimit: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};

type FetchProductsResponse = {
  products: Product[];
  total: number;
  success: boolean;
  message?: string;
};

type UpdateProductParams = {
  productId: string;
  updateFields: Partial<Omit<Product, '_id'>>;
};

type UpdateProductResponse = {
  success: boolean;
  product?: Product;
  message?: string;
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<FetchProductsResponse, FetchProductsParams>({
      query: ({ page, viewLimit, minPrice, maxPrice, search }) => ({
        url: '/users/products',
        params: { page, viewLimit, minPrice, maxPrice, search },
      }),
      keepUnusedDataFor: 60 * 60, // 60 * 60 sekunder (1 timme)
    }),
    updateProduct: builder.mutation<
      UpdateProductResponse,
      UpdateProductParams
    >({
      query: ({ productId, updateFields }) => ({
        url: `/admin/products/${productId}`,
        method: 'PUT',
        body: updateFields,
      }),
    }),
  }),
});

export const { useFetchProductsQuery, useUpdateProductMutation } = productApi;
