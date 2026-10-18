import * as React from 'react';
import { 
  Database, 
  Brain, 
  RefreshCw, 
  Shield, 
  Trash2, 
  FileText, 
  Link, 
  Users, 
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface SystemStatus {
  component: string;
  status: 'operational' | 'warning' | 'error';
  description: string;
  lastUpdated: string;
}

export const SystemOverview: React.FC = () => {
  const systemComponents: SystemStatus[] = [
    {
      component: 'Source Files Registry',
      status: 'operational',
      description: 'Tracking and managing all ingested files',
      lastUpdated: '2 minutes ago'
    },
    {
      component: 'Information Units Store',
      status: 'operational',
      description: 'Processing and categorizing content units',
      lastUpdated: '5 minutes ago'
    },
    {
      component: 'Authority Records Registry',
      status: 'warning',
      description: 'Some records need verification',
      lastUpdated: '10 minutes ago'
    },
    {
      component: 'AI Processing Pipeline',
      status: 'operational',
      description: 'Ready for content analysis',
      lastUpdated: '1 minute ago'
    },
    {
      component: 'Drive Cleanup Pipeline',
      status: 'operational',
      description: 'Monitoring for duplicates',
      lastUpdated: '15 minutes ago'
    },
    {
      component: 'Link Processing',
      status: 'operational',
      description: 'Automated URL content extraction',
      lastUpdated: '3 minutes ago'
    }
  ];

  const StatusIcon: React.FC<{ status: SystemStatus['status'] }> = ({ status }) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

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
    },
    {
      name: 'Team E: Structure & Document Building',
      agents: ['Professional Compiler', 'Personal Chronicle Builder'],
      status: 'ready',
      description: 'Builds structured knowledge documents'
    },
    {
      name: 'Team F: Change Propagation',
      agents: ['Authority Registry Manager'],
      status: 'active',
      description: 'Manages canonical fields and propagates changes'
    },
    {
      name: 'Team G: Cleanup & Drive Janitor',
      agents: ['Drive Duplicate Auditor', 'Quarantine Manager'],
      status: 'ready',
      description: 'Maintains Drive cleanliness and manages quarantine'
    },
    {
      name: 'Team H: QA, Monitoring & Reporting',
      agents: ['QA & Consistency Checker', 'Weekly Digest & Alerts'],
      status: 'active',
      description: 'Ensures quality and provides system insights'
    }
  ];

  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">System Health</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemComponents.map((component, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800 text-sm">{component.component}</h3>
                <StatusIcon status={component.status} />
              </div>
              <p className="text-xs text-slate-600 mb-2">{component.description}</p>
              <p className="text-xs text-slate-500">Updated {component.lastUpdated}</p>
            </div>
          ))}
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

      {/* Architecture Overview */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Data Architecture</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Source Storage</h3>
            <p className="text-sm text-slate-600">Google Drive, URLs, and manual uploads</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">AI Processing</h3>
            <p className="text-sm text-slate-600">Automated analysis and categorization</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Knowledge Base</h3>
            <p className="text-sm text-slate-600">Structured, searchable information</p>
          </div>
        </div>
      </div>

      {/* Folder Structure */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Google Drive Structure</h2>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm">
          <div className="space-y-1">
            <div className="text-slate-800 font-semibold">/AndriesHub/</div>
            <div className="ml-4 text-slate-600">├── /Inbox <span className="text-slate-500">(new files)</span></div>
            <div className="ml-4 text-slate-600">├── /Processed <span className="text-slate-500">(locked after indexing)</span></div>
            <div className="ml-4 text-slate-600">├── /Quarantine <span className="text-slate-500">(safe hold before deletion)</span></div>
            <div className="ml-4 text-slate-600">├── /Archive <span className="text-slate-500">(kept but out of active pipelines)</span></div>
            <div className="ml-4 text-slate-600">├── /Personal <span className="text-slate-500">(segregated after classification)</span></div>
            <div className="ml-4 text-slate-600">└── /Professional <span className="text-slate-500">(segregated after classification)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};