import * as React from 'react';
import { 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Database, 
  Brain, 
  Zap, 
  Shield,
  Users,
  BarChart3,
  Clock,
  TrendingUp
} from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const systemComponents = [
    {
      name: 'Source Files Registry',
      status: 'operational',
      description: 'Tracking and managing all ingested files',
      lastUpdated: '2 minutes ago',
      icon: Database
    },
    {
      name: 'Information Units Store',
      status: 'operational',
      description: 'Processing and categorizing content units',
      lastUpdated: '5 minutes ago',
      icon: Brain
    },
    {
      name: 'Authority Records Registry',
      status: 'operational',
      description: 'Managing canonical data references',
      lastUpdated: '10 minutes ago',
      icon: Shield
    },
    {
      name: 'AI Processing Pipeline',
      status: 'operational',
      description: 'Ready for content analysis',
      lastUpdated: '1 minute ago',
      icon: Brain
    },
    {
      name: 'Automation Workflows',
      status: 'operational',
      description: 'All 3 automations active and monitoring',
      lastUpdated: '3 minutes ago',
      icon: Zap
    },
    {
      name: 'Link Processing',
      status: 'operational',
      description: 'Automated URL content extraction',
      lastUpdated: '3 minutes ago',
      icon: Database
    }
  ];

  const aiTeams = [
    {
      name: 'Team A: Ingestion & Parsing',
      agents: ['File Ingestor', 'Chunker & Unitizer'],
      status: 'active',
      description: 'Monitors Drive Inbox and processes raw content'
    },
    {
      name: 'Team B: Tagging & Entity Extraction',
      agents: ['Metadata Tagger', 'Date & Timeline Extractor'],
      status: 'active',
      description: 'Extracts entities, topics, and temporal information'
    },
    {
      name: 'Team C: Deduplication & Canonicalization',
      agents: ['Exact Duplicate Finder', 'Near-Duplicate Resolver', 'Canonical Selector'],
      status: 'ready',
      description: 'Identifies and resolves duplicate content'
    },
    {
      name: 'Team D: Categorization & Privacy',
      agents: ['Prof/Personal Classifier'],
      status: 'active',
      description: 'Separates professional from personal content'
    }
  ];

  const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
      case 'operational':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-slate-800">System Health</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemComponents.map((component, index) => {
            const IconComponent = component.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                    <h3 className="font-semibold text-slate-800 text-sm">{component.name}</h3>
                  </div>
                  <StatusIcon status={component.status} />
                </div>
                <p className="text-xs text-slate-600 mb-2">{component.description}</p>
                <p className="text-xs text-slate-500">Updated {component.lastUpdated}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Teams Overview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">AI Teams & Agents</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {aiTeams.map((team, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 text-sm">{team.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  team.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {team.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2">{team.description}</p>
              <div className="flex flex-wrap gap-1">
                {team.agents.map((agent, agentIndex) => (
                  <span key={agentIndex} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-slate-800">Performance Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">4.7s</p>
            <p className="text-sm text-slate-600">Avg Processing Time</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">96%</p>
            <p className="text-sm text-slate-600">Success Rate</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">25</p>
            <p className="text-sm text-slate-600">Total Automations Run</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">100%</p>
            <p className="text-sm text-slate-600">System Uptime</p>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-800">System Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-800 mb-3">🏗️ Architecture:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Projects:</strong> 5 active data stores</li>
              <li>• <strong>Automations:</strong> 3 AI-powered workflows</li>
              <li>• <strong>AI Teams:</strong> 8 specialized agent teams</li>
              <li>• <strong>Processing:</strong> Real-time content analysis</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-800 mb-3">⚡ Capabilities:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>AI Description Generation:</strong> Automatic</li>
              <li>• <strong>Content Categorization:</strong> Professional/Personal</li>
              <li>• <strong>Duplicate Detection:</strong> Advanced algorithms</li>
              <li>• <strong>Authority Management:</strong> Canonical data control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};