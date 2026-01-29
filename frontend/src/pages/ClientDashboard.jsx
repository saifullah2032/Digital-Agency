import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, FolderKanban, MessageSquare, FileText, User, Clock, CheckCircle, AlertCircle, Download, Eye, Activity, TrendingUp, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clientPortalAPI } from '../services/api';
import ActivityTimeline from '../components/client/ActivityTimeline';
import ProjectGanttChart from '../components/client/ProjectGanttChart';
import toast from 'react-hot-toast';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all client data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        if (!user?.email) return;

        // Fetch all data in parallel
        const [statsRes, projectsRes, messagesRes, filesRes] = await Promise.all([
          clientPortalAPI.getStats(user.email),
          clientPortalAPI.getProjects(user.email),
          clientPortalAPI.getMessages(user.email),
          clientPortalAPI.getFiles(user.email),
        ]);

        setStats(statsRes.data.data);
        setProjects(projectsRes.data.data || []);
        setMessages(messagesRes.data.data || []);
        setFiles(filesRes.data.data || []);
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user?.email]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await clientPortalAPI.markAsRead(messageId);
      setMessages(messages.map(m => m._id === messageId ? { ...m, read: true } : m));
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-purple-100 text-purple-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-300 border-t-secondary-200 dark:border-t-secondary-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-12 h-12 rounded-full border-2 border-primary-200 dark:border-primary-300"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.displayName}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-200 dark:bg-primary-300 text-white dark:text-gray-900 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-400 transition-colors font-medium"
            >
              <Home size={18} />
              Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-secondary-200 dark:bg-secondary-300 text-white dark:text-gray-900 rounded-lg hover:bg-secondary-300 dark:hover:bg-secondary-400 transition-colors font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.displayName?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your project dashboard and updates
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow border-l-4 border-primary-200 dark:border-primary-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <FolderKanban className="text-primary-200 dark:text-primary-300" size={24} />
                </div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeProjects}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 font-medium">Active Projects</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow border-l-4 border-green-600 dark:border-green-500">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <MessageSquare className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.unreadMessages}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 font-medium">Unread Messages</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow border-l-4 border-secondary-200 dark:border-secondary-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                  <FileText className="text-secondary-200 dark:text-secondary-300" size={24} />
                </div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalFiles}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 font-medium">Shared Files</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow border-l-4 border-purple-600 dark:border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <User className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.teamMembers}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 font-medium">Team Members</h3>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 transition-colors">
          <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: AlertCircle },
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'timeline', label: 'Timeline', icon: TrendingUp },
              { id: 'activities', label: 'Activities', icon: Activity },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'files', label: 'Files', icon: FileText },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-primary-200 dark:bg-primary-300 text-white dark:text-gray-900'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div>
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.slice(0, 5).map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-start gap-4 p-4 rounded-lg ${
                          message.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-600'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full mt-2 ${message.read ? 'bg-gray-400' : 'bg-blue-600'}`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{message.subject}</h4>
                          <p className="text-gray-600 text-sm mt-1">{message.message.substring(0, 100)}...</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">From: {message.senderName}</span>
                            <span className="text-xs text-gray-400">{formatDate(message.createdAt)}</span>
                          </div>
                        </div>
                        {!message.read && (
                          <button
                            onClick={() => markMessageAsRead(message._id)}
                            className="text-[#1E40AF] hover:text-[#EA580C] transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Projects</h3>
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderKanban size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No projects assigned yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{project.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span className="text-sm font-bold text-primary-200 dark:text-primary-300">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-200 dark:from-primary-300 to-secondary-200 dark:to-secondary-300 h-2 rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock size={16} />
                            <span>Started: {formatDate(project.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <CheckCircle size={16} />
                            <span>Due: {formatDate(project.estimatedCompletion)}</span>
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies?.map((tech, idx) => (
                            <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Team Members */}
                        {project.team?.length > 0 && (
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Team</h5>
                            <div className="flex flex-wrap gap-4">
                              {project.team.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Milestones */}
                        {project.milestones?.length > 0 && (
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Milestones</h5>
                            <div className="space-y-2">
                              {project.milestones.map((milestone, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                                    milestone.completed ? 'bg-green-600 border-green-600' : 'border-gray-300 dark:border-gray-600'
                                  }`}>
                                    {milestone.completed && <CheckCircle size={16} className="text-white" />}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium ${milestone.completed ? 'text-gray-500 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                                      {milestone.title}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{milestone.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Timelines</h3>
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp size={64} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No projects to display</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {projects.map((project) => (
                      <div key={project._id} className="space-y-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                        </div>
                        <ProjectGanttChart project={project} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activities' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Feed</h3>
                <ActivityTimeline clientEmail={user?.email} />
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Messages ({messages.length})</h3>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`border rounded-lg p-4 ${message.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-300'}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className={`font-semibold ${message.read ? 'text-gray-900' : 'text-[#1E40AF]'}`}>
                              {message.subject}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">From: {message.senderName}</p>
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{message.message}</p>
                        {!message.read && (
                          <button
                            onClick={() => markMessageAsRead(message._id)}
                            className="text-[#1E40AF] text-sm font-medium hover:text-[#EA580C] transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'files' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Files ({files.length})</h3>
                {files.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No files shared yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{file.fileName}</h4>
                            <p className="text-sm text-gray-600 mt-1">{file.description || 'No description'}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                              <span>Size: {formatFileSize(file.fileSize)}</span>
                              <span>Type: {file.fileType.split('/')[1].toUpperCase()}</span>
                              <span>Uploaded by: {file.uploadedByName}</span>
                              <span>{formatDate(file.createdAt)}</span>
                            </div>
                          </div>
                          <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors ml-4"
                          >
                            <Download size={18} />
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
