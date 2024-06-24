import AdminDashboardHeader from '@/app/(board)/_components/header';
import React from 'react';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboardHeader />
      {children}
    </div>
  );
};

export default AdminDashboardLayout;
