import * as React from 'react';
import { 
  FileText, 
  Database, 
  Brain, 
  Trash2, 
  TrendingUp, 
  Clock,
  Plus,
  Link,
  Upload,
  RefreshCw,
  Search,
  Wand2,
  CheckCircle,
  BarChart3,
  Mic
} from 'lucide-react';

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

interface ActionButtonProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 text-left group"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};

export const ProductionOverview: React.FC = () => {
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
        // Fetch source files
        const sourceResponse = await fetch('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes');
        if (sourceResponse.ok) {
          const sourceData = await sourceResponse.json();
          setStats(prev => ({ ...prev, sourceFiles: sourceData.payload?.nodes?.length || 0 }));
        }

        // Fetch information units
        const unitsResponse = await fetch('/api/taskade/projects/pCJwqJ3XQTSi9vTL/nodes');
        if (unitsResponse.ok) {
          const unitsData = await unitsResponse.json();
          setStats(prev => ({ ...prev, informationUnits: unitsData.payload?.nodes?.length || 0 }));
        }

        // Fetch cleanup pipeline
        const cleanupResponse = await fetch('/api/taskade/projects/oHJrMVc1gNqcS54z/nodes');
        if (cleanupResponse.ok) {
          const cleanupData = await cleanupResponse.json();
          setStats(prev => ({ ...prev, duplicatesFound: cleanupData.payload?.nodes?.length || 0 }));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Record Voice Note',
      description: 'Record audio notes in English or Afrikaans with automatic transcription',
      icon: Mic,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      onClick: () => console.log('Record voice note')
    },
    {
      title: 'Add Link',
      description: 'Submit a URL for AI-powered content analysis and knowledge extraction',
      icon: Link,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      onClick: () => console.log('Add link')
    },
    {
      title: 'Upload File',
      description: 'Upload documents, PDFs, or other files for automated processing',
      icon: Upload,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      onClick: () => console.log('Upload file')
    },
    {
      title: 'Generate Descriptions',
      description: 'Use AI to automatically generate descriptions for sources missing them',
      icon: Wand2,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      onClick: () => console.log('Generate descriptions')
    },
    {
      title: 'Search Knowledge',
      description: 'Search through your processed knowledge base with advanced filters',
      icon: Search,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      onClick: () => console.log('Search knowledge')
    },
    {
      title: 'Run Cleanup',
      description: 'Scan for duplicate files and optimize your knowledge base storage',
      icon: Trash2,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      onClick: () => console.log('Run cleanup')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Welcome to Your Knowledge Hub
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Centralize, organize, and intelligently manage your professional knowledge with AI-powered 
            automation. Transform scattered information into a searchable, structured knowledge base with 
            support for voice notes in English and Afrikaans.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Source Files"
          value={stats.sourceFiles.toString()}
          change="Ready for processing"
          changeType="neutral"
          icon={FileText}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Information Units"
          value={stats.informationUnits.toString()}
          change="Processed and categorized"
          changeType="positive"
          icon={Database}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="AI Automations"
          value="3"
          change="Active and monitoring"
          changeType="positive"
          icon={Brain}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="System Health"
          value="100%"
          change="All systems operational"
          changeType="positive"
          icon={CheckCircle}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <Plus className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
          </div>
          
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <ActionButton key={index} {...action} />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-slate-800">System Status</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">AI Processing Pipeline</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Voice Transcription</span>
              </div>
              <span className="text-sm text-green-600">EN/AF Ready</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Automation Workflows</span>
              </div>
              <span className="text-sm text-green-600">Active (3)</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Knowledge Base</span>
              </div>
              <span className="text-sm text-green-600">Ready</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Last AI Processing</span>
              </div>
              <span className="text-sm text-blue-600">2 min ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-800">Getting Started</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">1. Record Voice Notes</h4>
            <p className="text-sm text-blue-700">Record audio in English or Afrikaans with automatic transcription</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">2. Add Sources</h4>
            <p className="text-sm text-blue-700">Upload files or add URLs to begin building your knowledge base</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">3. AI Processing</h4>
            <p className="text-sm text-blue-700">Let AI automatically analyze, categorize, and generate descriptions</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">4. Search & Discover</h4>
            <p className="text-sm text-blue-700">Find information quickly with intelligent search and filtering</p>
          </div>
        </div>
      </div>

      {/* Language Support Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Mic className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-purple-800">🎤 Voice Note Support</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🇺🇸</span>
              <h4 className="font-semibold text-purple-800">English Support</h4>
            </div>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• High-quality speech-to-text transcription</li>
              <li>• Professional vocabulary recognition</li>
              <li>• Automatic punctuation and formatting</li>
              <li>• Business and technical terminology support</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🇿🇦</span>
              <h4 className="font-semibold text-purple-800">Afrikaans Support</h4>
            </div>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Native Afrikaans language processing</li>
              <li>• Cultural context understanding</li>
              <li>• Proper noun and place name recognition</li>
              <li>• Business terminology in Afrikaans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};