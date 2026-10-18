import * as React from 'react';
import { Clock, FileText, Link, Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'file_added' | 'link_processed' | 'ai_analysis' | 'duplicate_found';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'failed';
}

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'file_added':
      return <FileText className="w-4 h-4" />;
    case 'link_processed':
      return <Link className="w-4 h-4" />;
    case 'ai_analysis':
      return <Brain className="w-4 h-4" />;
    case 'duplicate_found':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const StatusIcon: React.FC<{ status: ActivityItem['status'] }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'processing':
      return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
    case 'failed':
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4 text-slate-400" />;
  }
};

export const RecentActivity: React.FC = () => {
  const [activities, setActivities] = React.useState<ActivityItem[]>([
    {
      id: '1',
      type: 'link_processed',
      title: 'LinkedIn Article Processed',
      description: 'Sample LinkedIn Article has been analyzed and categorized',
      timestamp: '2 minutes ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'ai_analysis',
      title: 'AI Analysis Started',
      description: 'Processing pipeline initiated for new content',
      timestamp: '5 minutes ago',
      status: 'processing'
    },
    {
      id: '3',
      type: 'file_added',
      title: 'Authority Record Updated',
      description: 'LinkedIn URL canonical reference established',
      timestamp: '10 minutes ago',
      status: 'completed'
    }
  ]);

  // Fetch recent activity from APIs
  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        // Fetch recent links
        const linksResponse = await fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes');
        if (linksResponse.ok) {
          const linksData = await linksResponse.json();
          // Process and add to activities
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ActivityIcon type={activity.type} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 truncate">{activity.title}</h3>
                <StatusIcon status={activity.status} />
              </div>
              <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
              <p className="text-xs text-slate-500 mt-2">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};