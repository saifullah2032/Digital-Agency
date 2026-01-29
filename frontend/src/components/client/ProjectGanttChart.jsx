import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const ProjectGanttChart = ({ project }) => {
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  // Transform milestones into Gantt chart data
  const ganttData = useMemo(() => {
    if (!project?.milestones || project.milestones.length === 0) {
      return [];
    }

    const startDate = new Date(project.startDate);
    const projectDuration = project.estimatedEndDate 
      ? Math.ceil((new Date(project.estimatedEndDate) - startDate) / (1000 * 60 * 60 * 24))
      : 90;

    return project.milestones.map((milestone, index) => {
      const milestoneStart = new Date(milestone.startDate);
      const milestoneEnd = new Date(milestone.endDate);
      
      const daysFromStart = Math.ceil((milestoneStart - startDate) / (1000 * 60 * 60 * 24));
      const duration = Math.ceil((milestoneEnd - milestoneStart) / (1000 * 60 * 60 * 24));
      const isCompleted = milestone.completed;

      return {
        id: milestone._id,
        name: milestone.title,
        start: Math.max(0, daysFromStart),
        duration: Math.max(1, duration),
        completed: isCompleted ? duration : 0,
        remaining: !isCompleted ? duration : 0,
        status: milestone.status || 'pending',
        description: milestone.description,
        endDate: milestone.endDate,
      };
    });
  }, [project]);

  const calculateProgress = () => {
    if (!project?.milestones || project.milestones.length === 0) return 0;
    const completed = project.milestones.filter(m => m.completed).length;
    return Math.round((completed / project.milestones.length) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#3b82f6';
      case 'pending':
        return '#f59e0b';
      case 'delayed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0];
    const milestone = ganttData.find(m => m.name === data.payload.name);

    if (!milestone) return null;

    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg text-sm">
        <p className="font-semibold text-gray-900">{milestone.name}</p>
        <p className="text-gray-600">
          Duration: {milestone.duration} days
        </p>
        <p className="text-gray-600">
          Status: <span className="font-medium capitalize">{milestone.status}</span>
        </p>
        {milestone.description && (
          <p className="text-gray-600 mt-2 text-xs">{milestone.description}</p>
        )}
        <p className="text-gray-600 mt-1 text-xs">
          End: {new Date(milestone.endDate).toLocaleDateString()}
        </p>
      </div>
    );
  };

  if (!ganttData || ganttData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No milestones defined yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Project Progress</h3>
          <span className="text-lg font-bold text-blue-600">{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 overflow-x-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
        <ResponsiveContainer width="100%" height={Math.max(300, ganttData.length * 60)}>
          <BarChart
            data={ganttData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={190} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Completed milestones (stacked) */}
            <Bar
              dataKey="completed"
              stackId="a"
              fill="#10b981"
              name="Completed"
              radius={[0, 8, 8, 0]}
            >
              {ganttData.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={entry.completed > 0 ? '#10b981' : 'transparent'}
                />
              ))}
            </Bar>

            {/* Remaining milestone time */}
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="#dbeafe"
              name="Remaining"
              radius={[0, 8, 8, 0]}
            >
              {ganttData.map((entry) => {
                let color = '#dbeafe';
                if (entry.status === 'delayed') {
                  color = '#fecaca';
                } else if (entry.status === 'in-progress') {
                  color = '#93c5fd';
                } else if (entry.status === 'pending') {
                  color = '#fcd34d';
                }
                return <Cell key={`cell-${entry.id}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Milestone Details */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Milestones</h3>
        <div className="space-y-3">
          {project.milestones?.map((milestone) => (
            <div
              key={milestone._id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              onMouseEnter={() => setHoveredMilestone(milestone._id)}
              onMouseLeave={() => setHoveredMilestone(null)}
            >
              {/* Status icon */}
              <div className="flex-shrink-0 mt-1">
                {milestone.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              {/* Milestone info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {milestone.title}
                </h4>
                {milestone.description && (
                  <p className="text-sm text-gray-600 truncate">
                    {milestone.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(milestone.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })} - {new Date(milestone.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded capitalize">
                    {milestone.status || 'pending'}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {milestone.completed ? '✓' : '○'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-xs text-green-600 font-semibold mb-1">COMPLETED</p>
          <p className="text-2xl font-bold text-green-700">
            {project.milestones?.filter(m => m.completed).length || 0}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold mb-1">IN PROGRESS</p>
          <p className="text-2xl font-bold text-blue-700">
            {project.milestones?.filter(m => !m.completed && m.status === 'in-progress').length || 0}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-xs text-yellow-600 font-semibold mb-1">PENDING</p>
          <p className="text-2xl font-bold text-yellow-700">
            {project.milestones?.filter(m => !m.completed && m.status !== 'in-progress').length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectGanttChart;
