'use client'; // To provide store for state management on the client side allowing realtime updates

import Navbar from '@/app/(components)/Navbar';
import Sidebar from '@/app/(components)/Sidebar';
import React, { useEffect } from 'react';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      // refers to the root element of the HTML document -> html tag
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  });

  return (
    <div
      className={`${
        isDarkMode ? 'dark' : 'light'
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-6 px-9 bg-gray-50  ${
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
