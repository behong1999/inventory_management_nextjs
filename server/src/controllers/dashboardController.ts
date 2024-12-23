import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: 'desc',
      },
    });

    const saleSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    // Query raw data and then modify to the desired format
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: 'desc',
        },
      }
    );

    // To avoid JSON serialization failure, always convert BigInt to string when working with Next.js
    const expenseByCategory = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json({
      popularProducts,
      saleSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving dashboard metrics' });
  }
};
