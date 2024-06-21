import React from 'react';
import Header from './_components/header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
