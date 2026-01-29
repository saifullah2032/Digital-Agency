import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
