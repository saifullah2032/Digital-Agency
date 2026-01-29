import { useState } from 'react';
import AdminDashboardOverview from './AdminDashboardOverview';
import ProjectForm from './ProjectForm';
import ClientForm from './ClientForm';
import InquiriesTable from './InquiriesTable';
import SubscribersList from './SubscribersList';
import TeamMembersPage from './TeamMembersPage';

const AdminDashboard = ({ activeTab: activeTabProp }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const activeTab = activeTabProp || 'dashboard';

  const handleProjectAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleClientAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-auto md:pt-0 pt-16">
      <div className="p-6 md:p-8">
        {/* Content */}
        <div>
          {activeTab === 'dashboard' && (
            <AdminDashboardOverview />
          )}

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

           {activeTab === 'team-members' && (
             <TeamMembersPage refreshTrigger={refreshTrigger} />
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
