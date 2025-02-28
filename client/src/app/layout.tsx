import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DashboardWrapper from '@/app/dashboardWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InvStock',
  // description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='./logo.png' />
      </head>

      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
