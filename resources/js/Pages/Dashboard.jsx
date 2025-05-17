import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      {/* Your dashboard content here */}
    </div>
  );
};

Dashboard.layout = page => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
