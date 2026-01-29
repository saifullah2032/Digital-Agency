import { useState, useEffect } from 'react';
import { activityAPI } from '../../services/api';
import { MessageSquare, FileUp, FileX, CheckCircle, Users, Zap, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ActivityTimeline = ({ clientEmail, projectId = null }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, [clientEmail, projectId, page]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      let response;
      
      if (projectId) {
        response = await activityAPI.getProjectActivities(projectId, clientEmail);
      } else {
        response = await activityAPI.getClientActivities(clientEmail, 20, page);
      }
      
      if (response.data.success) {
        if (projectId) {
          setActivities(response.data.data);
        } else {
          if (page === 1) {
            setActivities(response.data.data.activities);
          } else {
            setActivities(prev => [...prev, ...response.data.data.activities]);
          }
          setHasMore(response.data.data.pagination.page < response.data.data.pagination.pages);
        }
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'file_upload':
        return <FileUp className="w-5 h-5 text-green-500" />;
      case 'file_delete':
        return <FileX className="w-5 h-5 text-red-500" />;
      case 'status_change':
        return <CheckCircle className="w-5 h-5 text-yellow-500" />;
      case 'milestone_update':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'team_update':
        return <Users className="w-5 h-5 text-indigo-500" />;
      case 'comment':
        return <Zap className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityBadgeColor = (type) => {
    switch (type) {
      case 'message':
        return 'bg-blue-100 text-blue-800';
      case 'file_upload':
        return 'bg-green-100 text-green-800';
      case 'file_delete':
        return 'bg-red-100 text-red-800';
      case 'status_change':
        return 'bg-yellow-100 text-yellow-800';
      case 'milestone_update':
        return 'bg-purple-100 text-purple-800';
      case 'team_update':
        return 'bg-indigo-100 text-indigo-800';
      case 'comment':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const formatTypeLabel = (type) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading && activities.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="mt-2 text-gray-500">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No activities yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>

        {/* Activities */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity._id} className="relative pl-16">
              {/* Timeline dot */}
              <div className="absolute left-0 w-9 h-9 bg-white border-4 border-blue-400 rounded-full flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>

              {/* Activity card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 truncate">{activity.title}</h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getActivityBadgeColor(activity.type)}`}>
                        {formatTypeLabel(activity.type)}
                      </span>
                    </div>

                    {activity.description && (
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    )}

                    {/* Metadata */}
                    <div className="mt-3 text-xs text-gray-500 space-y-1">
                      {activity.metadata?.oldStatus && activity.metadata?.newStatus && (
                        <p>
                          Status: <span className="font-medium">{activity.metadata.oldStatus}</span> → 
                          <span className="font-medium ml-1">{activity.metadata.newStatus}</span>
                        </p>
                      )}
                      {activity.metadata?.fileName && (
                        <p>File: <span className="font-medium">{activity.metadata.fileName}</span></p>
                      )}
                      {activity.metadata?.milestoneTitle && (
                        <p>Milestone: <span className="font-medium">{activity.metadata.milestoneTitle}</span></p>
                      )}
                      {activity.projectName && (
                        <p>Project: <span className="font-medium">{activity.projectName}</span></p>
                      )}
                    </div>
                  </div>

                  {/* Date and actor */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-medium text-gray-900">{formatDate(activity.createdAt)}</p>
                    {activity.actor && activity.actor !== 'System' && (
                      <p className="text-xs text-gray-500 mt-1">{activity.actor}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load more button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Load More Activities
          </button>
        </div>
      )}

      {loading && activities.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="animate-spin">
            <AlertCircle className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
