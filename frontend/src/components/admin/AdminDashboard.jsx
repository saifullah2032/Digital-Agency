import { useState } from 'react';
import ProjectForm from '../components/admin/ProjectForm';
import ClientForm from '../components/admin/ClientForm';
import InquiriesTable from '../components/admin/InquiriesTable';
import SubscribersList from '../components/admin/SubscribersList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProjectAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleClientAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-auto md:pt-0 pt-16">
      <div className="p-6 md:p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'clients', label: 'Clients' },
            { id: 'inquiries', label: 'Inquiries' },
            { id: 'subscribers', label: 'Subscribers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#1E40AF] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'projects' && (
            <ProjectForm onProjectAdded={handleProjectAdded} />
          )}

          {activeTab === 'clients' && (
            <ClientForm onClientAdded={handleClientAdded} />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesTable refreshTrigger={refreshTrigger} />
          )}

          {activeTab === 'subscribers' && (
            <SubscribersList refreshTrigger={refreshTrigger} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
