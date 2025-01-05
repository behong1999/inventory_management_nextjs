import { LucideIcon } from 'lucide-react';
import React, { Fragment, JSX } from 'react';

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  icon: LucideIcon;
};

type StatCardProps = {
  title: string;
  icon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({ title, icon, details, dateRange }: StatCardProps) => {
  const formatPercentage = (percentage: number) => {
    const sign = percentage > 0 ? '+' : '';
    return `${sign}${percentage.toFixed()}%`;
  };
  const getPercentageColor = (percentage: number) => {
    return percentage > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className='bg-white md:row-span-2 xl:row-span-3 shadow-md rounded-2xl flex flex-col justify-between'>
      {/* HEADER */}
      <div>
        <div className='flex justify-between items-center mb-2 px-7 pt-4'>
          <h2 className='text-lg font-semibold '>{title}</h2>
          <span className='text-xs text-gray-400'>{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className='flex mb-6 xl:mb-2 items-center justify-around gap-4 px-5'>
        <div className='rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]'>
          {icon}
        </div>
        <div className='flex-1'>
          {details.map((detail, index) => (
            <Fragment key={index}>
              <div className='flex items-center justify-between my-4'>
                <span className='text-gray-500'>{detail.title}</span>
                <span className='font-bold text-gray-800'>{detail.amount}</span>
                <div className='flex items-center'>
                  <detail.icon
                    className={`w-4 h-4 mr-1 ${getPercentageColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium  ${getPercentageColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index !== details.length - 1 && <hr />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
