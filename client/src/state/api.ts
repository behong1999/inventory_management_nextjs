import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategoryId: string;
  category: string;
  amount: string;
  date: string;
}
export interface DashboardMetrics {
  popularProducts: Product[];
  saleSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics', 'Products', 'Users', 'Expenses'], // used to configure caching and invalidation of cached data
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      // If the "DashboardMetrics" tag is invalidated,
      // RTK Query will refetch this query's data.
      providesTags: ['DashboardMetrics'],
    }),
    getProducts: builder.query<Product[], string | void>({
      query: (search) => ({
        url: '/products',
        params: search ? { search } : {},
      }),

      providesTags: ['Products'],
    }),
    addProduct: builder.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'], // Refetching Data Automatically when a Mutation is Successful
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    getExpensesByCategory: builder.query<ExpenseByCategorySummary[], void>({
      query: () => '/expenses',
      providesTags: ['Expenses'],
    }),
  }),
});

// Hooks
export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
