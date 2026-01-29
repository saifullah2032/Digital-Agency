import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, FileText, Mail, Bell, TrendingUp, AlertCircle } from 'lucide-react';
import { adminDashboardAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await adminDashboardAPI.getStats();
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1E40AF] border-t-[#EA580C] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Return empty state if no stats data
  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  const overview = stats?.overview || {};
  const projectStatus = stats?.projectStatus || [];
  const clientProjectStatus = stats?.clientProjectStatus || [];
  const contactsTrend = stats?.contactsTrend || [];
  const subscribersTrend = stats?.subscribersTrend || [];
  const topClients = stats?.topClients || [];

  const COLORS = ['#1E40AF', '#EA580C', '#10B981', '#F59E0B', '#EF4444'];

  // Format status data for pie chart
  const formatStatusData = (data, label) => {
    return data
      .filter((item) => item._id) // Filter out null/undefined ids
      .map((item) => {
        const id = item._id || 'Unknown';
        let name = '';
        
        if (id === 'in-progress') {
          name = 'In Progress';
        } else if (id === 'Unknown') {
          name = 'Unknown';
        } else {
          name = id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ');
        }
        
        return {
          name,
          value: item.count || 0,
        };
      });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Overview of your business metrics and performance</p>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FileText className="text-blue-600" size={32} />}
          title="Total Projects"
          value={overview.totalProjects}
          subtitle={`${overview.clientProjects} active projects`}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<Users className="text-green-600" size={32} />}
          title="Total Clients"
          value={overview.totalClients}
          subtitle={overview.topClients ? `${overview.topClients.length} testimonials` : 'No testimonials'}
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<Mail className="text-orange-600" size={32} />}
          title="Contact Inquiries"
          value={overview.totalContacts}
          subtitle={`${overview.recentContacts} this week`}
          bgColor="bg-orange-50"
        />
        <StatCard
          icon={<Bell className="text-purple-600" size={32} />}
          title="Subscribers"
          value={overview.totalSubscribers}
          subtitle={`${overview.recentSubscribers} new this week`}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Project Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio Projects</h2>
          {projectStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formatStatusData(projectStatus, 'Project Status')}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatStatusData(projectStatus, 'Project Status').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No project data available
            </div>
          )}
        </div>

        {/* Client Projects Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Client Projects Status</h2>
          {clientProjectStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formatStatusData(clientProjectStatus, 'Client Project Status')}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatStatusData(clientProjectStatus, 'Client Project Status').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No project data available
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contacts Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Inquiries Trend (30 Days)</h2>
          {contactsTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={contactsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#EA580C"
                  strokeWidth={2}
                  dot={{ fill: '#EA580C', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Subscribers Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subscribers Trend (30 Days)</h2>
          {subscribersTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subscribersTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1E40AF"
                  strokeWidth={2}
                  dot={{ fill: '#1E40AF', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Rated Clients</h2>
        {topClients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Client Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Testimonial</th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((client, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900 font-medium">{client.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{client.company || 'N/A'}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < client.rating ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600 truncate max-w-xs">
                      {client.testimonial}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No client testimonials available</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Communication Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-gray-600 text-sm">Total Messages</p>
            <p className="text-3xl font-bold text-gray-900">{overview.totalMessages}</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <p className="text-gray-600 text-sm">Unread Messages</p>
            <p className="text-3xl font-bold text-red-600">{overview.unreadMessages}</p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <p className="text-gray-600 text-sm">Shared Files</p>
            <p className="text-3xl font-bold text-gray-900">{overview.totalFiles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, subtitle, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <p className="text-gray-600 font-medium mb-2">{title}</p>
        <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
      </div>
      <div className="ml-4 opacity-20">{icon}</div>
    </div>
  </div>
);

export default AdminDashboard;
