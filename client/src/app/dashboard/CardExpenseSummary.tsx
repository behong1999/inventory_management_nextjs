import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from '@/state/api';
import { useMediaQuery } from '@mui/material';
import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const colors = ['#00C49F', '#0088FE', '#FFBB28'];

type ExpenseSums = {
  [category: string]: number; // new Map<string, number>() in JavaScript
};

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const isMobile = useMediaQuery('(max-width:768px)');
  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];
  // console.log(expenseByCategorySummary);

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  // NOTE: Sum the amounts for each category
  // E.g. {"Office Expenses": 48, "Professional Expenses": 78, "Salaries Expenses": 63}
  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + ' Expenses';
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    },
    {} // initial value
  );

  // NOTE: Convert for Pie Chart
  // E.g. [{"name": "Office Expenses", "value": 48},
  //      {"name": "Professional Expenses", "value": 78},
  //      {"name": "Salaries Expenses", "value": 63}]
  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({ name, value })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category) => acc + category.value,
    0
  );

  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className='row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between'>
      {isLoading ? (
        <div className='m-5'>Loading...</div>
      ) : (
        <>
          {/* ========================== HEADER ========================== */}
          <div>
            <h2 className='text-lg font-semibold mb-2 px-7 pt-5'>
              Expense Summary
            </h2>
            <hr />
          </div>
          {/* ========================== BODY ========================== */}
          <div className={'xl:flex justify-between pr-7'}>
            {/* CHART */}
            {/* NOTE: flex-basis value set on the first flex item, 
            causing it to grow or shrink to fill the available space */}
            <div className='relative basis-3/5'>
              <ResponsiveContainer width='100%' height={isMobile ? 120 : 100}>
                <PieChart className='mt-5 md:mt-0'>
                  <Pie
                    data={expenseCategories}
                    innerRadius={isMobile ? 50 : 38}
                    outerRadius={isMobile ? 60 : 48}
                    fill='#8884d8'
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                  >
                    {expenseCategories.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                <span className='font-bold text-xl'>
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>
            {/* LEGENDS */}
            <ul className='flex flex-col justify-around items-center xl:items-start py-5 gap-3'>
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className='flex items-center text-xs'
                >
                  <span
                    className='mr-2 w-3 h-3 rounded-full'
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          {/* FOOTER */}
          <div>
            <hr />
            {expenseSummary && (
              <div className='flex justify-between items-center px-7 mt-2 mb-4'>
                <div className='pt-2'>
                  <p className='text-sm'>
                    Average:{' '}
                    <span className='font-semibold'>
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className='flex items-center mt-2'>
                  <TrendingUp className='mr-2 text-green-500' />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
