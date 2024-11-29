'use client';
import React from 'react';
import CardPopularProducts from './CardPopularProducts';
import CardSalesSummary from './CardSalesSummary';
import CardPurchaseSummary from './CardPurchaseSummary';
import CardExpenseSummary from './CardExpenseSummary';
import StatCard from './StatCard';
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows'>
      <CardPopularProducts />
      <CardSalesSummary />
      {/* This section takes 2 columns if screen size is larger than 768px (md) */}
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title='Customer & Expenses'
        icon={<Package className='text-blue-600 w-6 h-6'></Package>}
        dateRange='01 - 31 October 2024'
        details={[
          {
            title: 'Customers Growth',
            amount: '175.00',
            changePercentage: 131,
            icon: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            icon: TrendingDown,
          },
        ]}
      />
      <StatCard
        title='Dues & Pending Orders'
        icon={<CheckCircle className='text-blue-600 w-6 h-6' />}
        dateRange='01 - 31 October 2024'
        details={[
          {
            title: 'Dues',
            amount: '250.00',
            changePercentage: 131,
            icon: TrendingUp,
          },
          {
            title: 'Pending Orders',
            amount: '147.00',
            changePercentage: -56,
            icon: TrendingDown,
          },
        ]}
      />
      <StatCard
        title='Sales & Discount'
        icon={<Tag className='text-blue-600 w-6 h-6' />}
        dateRange='01 - 31 October 2024'
        details={[
          {
            title: 'Sales',
            amount: '1000.00',
            changePercentage: 20,
            icon: TrendingUp,
          },
          {
            title: 'Discount',
            amount: '200.00',
            changePercentage: -10,
            icon: TrendingDown,
          },
        ]}
      />
      <div className='md:row-span-1 xl:row-span-2 bg-gray-500' />
      <div className='md:row-span-1 xl:row-span-2 bg-gray-500' />
    </div>
  );
};

export default Dashboard;
