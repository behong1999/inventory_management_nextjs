import { useGetDashboardMetricsQuery } from '@/state/api';
import { TrendingDown, TrendingUp } from 'lucide-react';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {};

const CardPurchaseSummary = (props: Props) => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const [chartHeight, setChartHeight] = useState(200);

  useEffect(() => {
    const updateChartHeight = () => {
      // For screens larger than 768px{chartHeight}
      if (window.innerWidth > 768) {
        setChartHeight(100);
      } else setChartHeight(200);
    };

    // Set initial height
    updateChartHeight();

    // Add event listener for resizing
    window.addEventListener('resize', updateChartHeight);
    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  const purchaseData = dashboardMetrics?.purchaseSummary.slice() || [];
  const sortedPurchaseData = purchaseData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const lastDataPoint = sortedPurchaseData[purchaseData.length - 1] || null;

  return (
    <div className='flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl'>
      {isLoading ? (
        <div className='m-5'>Loading...</div>
      ) : (
        <>
          {/* ========================== HEADER ========================== */}
          <div>
            <h2 className='text-lg font-semibold mb-2 px-7 pt-5'>
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* ========================== BODY ========================== */}
          <div className={'xl:overflow-hidden'}>
            {/* BODY HEADER */}
            <div className='mb-4 mt-5 xl:mt-2 px-7'>
              <p className='text-xs text-gray-400'>Purchased</p>
              <div className='flex items-center'>
                <p className='text-2xl font-bold'>
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format('$0.00a') // abbreviated format
                    : '0'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm flex ml-3
                    ${
                      lastDataPoint.changePercentage! > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                   `}
                  >
                    {lastDataPoint.changePercentage! > 0 ? (
                      <TrendingUp className='w-4 h-4 mr-1' />
                    ) : (
                      <TrendingDown className='w-4 h-4 mr-1' />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHART */}
            <ResponsiveContainer
              width='100%'
              height={chartHeight}
              className='px-7'
            >
              <AreaChart
                data={sortedPurchaseData}
                margin={{ top: 0, right: 0, left: -50, bottom: 0 }}
              >
                <XAxis dataKey='date' tick={false} axisLine={false} />
                <YAxis tick={false} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString('en')}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }}
                />
                <Area
                  type='linear'
                  dataKey='totalPurchased'
                  stroke='#786ab7'
                  fill='#786ab7'
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
