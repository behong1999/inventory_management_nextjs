import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  productId: string;
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

export interface ExpenseByCategory {
  expenseByCategorySummaryId: string;
  category: string;
  amount: number;
  date: string;
}
export interface DashboardMetrics {
  popularProducts: Product[];
  saleSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategory: ExpenseByCategory[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics'], // used to configure caching and invalidation of cached data
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      // If the "DashboardMetrics" tag is invalidated,
      // RTK Query will refetch this query's data.
      providesTags: ['DashboardMetrics'],
    }),
  }),
});

// Hooks
export const { useGetDashboardMetricsQuery } = api;