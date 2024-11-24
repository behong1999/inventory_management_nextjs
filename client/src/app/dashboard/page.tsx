"use client";
import React from 'react';
import CardPopularProducts from './CardPopularProducts';
import CardSalesSummary from './CardSalesSummary';
import CardPurchaseSummary from './CardPurchaseSummary';

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows'>
      <CardPopularProducts />
      <CardSalesSummary />
      {/* This section takes 2 columns if screen size is larger than 768px (md) */}
      <CardPurchaseSummary />
      <div className='row-span-3 bg-gray-500' />
      <div className='md:row-span-1 xl:row-span-2 bg-gray-500' />
      <div className='md:row-span-1 xl:row-span-2 bg-gray-500' />
      <div className='md:row-span-1 xl:row-span-2 bg-gray-500' />
    </div>
  );
};

export default Dashboard;
