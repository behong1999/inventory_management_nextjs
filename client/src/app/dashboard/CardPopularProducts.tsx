import { useGetDashboardMetricsQuery } from '@/state/api';
import { ShoppingBag } from 'lucide-react';
import React from 'react';
import Rating from '../(components)/Rating';
import Image from 'next/image';

const CardPopularProducts = () => {
  // Read more about Query Hook Return Values: https://redux-toolkit.js.org/rtk-query/usage/queries
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  // console.log(dashboardMetrics);

  return (
    <div className='row-span-3 xl:row-span-6 bg-white shadow-lg rounded-2xl pb-16'>
      {isLoading ? (
        <div className='m-5'>Loading...</div>
      ) : (
        <>
          <h3 className='text-lg font-semibold px-7 pt-5 pb-2'>
            Popular Products
          </h3>
          <hr />
          <div className='overflow-auto h-full'>
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                className='flex justify-between items-center px-5 py-7 border-b-2'
                key={product.productId}
              >
                <div className='flex items-center gap-3'>
                  {/* Get Random image from S3 */}
                  <Image
                    src={`https://s3-inventorymanagement-practice.s3.us-east-1.amazonaws.com/product${
                      Math.floor(Math.random() * 3) + 1
                    }.png`}
                    alt={product.name}
                    width={60}
                    height={48}
                    className='rounded-lg w-14 h-14'
                  />
                  <div className='flex flex-col justify-between gap-1'>
                    <div className='font-bold text-gray-700'>
                      {product.name}
                    </div>
                    <div className='flex text-sm items-center'>
                      <span className='font-bold text-blue-500'>
                        {product.price}
                      </span>
                      <span className='mx-2'>|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>
                <div className='text-xs flex items-center'>
                  <button className='p-2 rounded-full bg-blue-200 text-blue-600 mr-2'>
                    <ShoppingBag className='w-4 h-4 ' />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
