import * as React from 'react';
import { FileText, Database, Brain, Trash2, TrendingUp, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-slate-600';
  
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 mr-1 ${changeColor}`} />
            <span className={`text-sm ${changeColor}`}>{change}</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export const StatsCards: React.FC = () => {
  const [stats, setStats] = React.useState({
    sourceFiles: 0,
    informationUnits: 0,
    processedFiles: 0,
    duplicatesFound: 0
  });

  // Fetch stats from APIs
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch source files with error handling
        try {
          const sourceResponse = await fetch('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes');
          if (sourceResponse.ok) {
            const sourceData = await sourceResponse.json();
            const sourceCount = sourceData?.payload?.nodes?.length || 0;
            setStats(prev => ({ ...prev, sourceFiles: sourceCount }));
          }
        } catch (error) {
          console.warn('Failed to fetch source files:', error);
        }

        // Fetch information units with error handling
        try {
          const unitsResponse = await fetch('/api/taskade/projects/pCJwqJ3XQTSi9vTL/nodes');
          if (unitsResponse.ok) {
            const unitsData = await unitsResponse.json();
            const unitsCount = unitsData?.payload?.nodes?.length || 0;
            setStats(prev => ({ ...prev, informationUnits: unitsCount }));
          }
        } catch (error) {
          console.warn('Failed to fetch information units:', error);
        }

        // Fetch cleanup pipeline with error handling
        try {
          const cleanupResponse = await fetch('/api/taskade/projects/oHJrMVc1gNqcS54z/nodes');
          if (cleanupResponse.ok) {
            const cleanupData = await cleanupResponse.json();
            const cleanupCount = cleanupData?.payload?.nodes?.length || 0;
            setStats(prev => ({ ...prev, duplicatesFound: cleanupCount }));
          }
        } catch (error) {
          console.warn('Failed to fetch cleanup data:', error);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Source Files"
        value={stats.sourceFiles.toString()}
        change="+12% this week"
        changeType="positive"
        icon={FileText}
        color="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <StatCard
        title="Information Units"
        value={stats.informationUnits.toString()}
        change="+8% this week"
        changeType="positive"
        icon={Database}
        color="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        title="Processed Files"
        value={stats.processedFiles.toString()}
        change="Processing..."
        changeType="neutral"
        icon={Brain}
        color="bg-gradient-to-br from-purple-500 to-purple-600"
      />
      <StatCard
        title="Duplicates Found"
        value={stats.duplicatesFound.toString()}
        change="Ready for cleanup"
        changeType="neutral"
        icon={Trash2}
        color="bg-gradient-to-br from-orange-500 to-orange-600"
      />
    </div>
  );
};