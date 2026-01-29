import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AdminDashboard activeTab={activeTab} />
    </div>
  );
};

export default AdminPage;
