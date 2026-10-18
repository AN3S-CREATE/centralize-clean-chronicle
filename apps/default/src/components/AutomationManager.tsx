import * as React from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  BarChart3,
  RefreshCw,
  Plus,
  Eye,
  Brain,
  FileText,
  Link
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  totalRuns: number;
  successRate: number;
  avgProcessingTime: number;
}

interface AutomationLog {
  id: string;
  ruleId: string;
  ruleName: string;
  timestamp: string;
  status: 'success' | 'failed' | 'processing';
  sourceTitle: string;
  processingTime: number;
  description?: string;
}

export const AutomationManager: React.FC = () => {
  const [automationRules, setAutomationRules] = React.useState<AutomationRule[]>([
    {
      id: '01K40SC9ZXHNRF59ZF8HF2MYSA',
      name: 'Auto AI Description - Links',
      description: 'Automatically generates AI descriptions when new links are added to the Link Inbox',
      trigger: 'New task added to Link Inbox',
      status: 'active',
      lastRun: '2 minutes ago',
      totalRuns: 12,
      successRate: 95,
      avgProcessingTime: 4.2
    },
    {
      id: '01K40SE2YF4KKC2VDZV45JHZB3',
      name: 'Auto AI Description - Files',
      description: 'Automatically generates AI descriptions when new files are added to the Source Registry',
      trigger: 'New task added to Source Files Registry',
      status: 'active',
      lastRun: '5 minutes ago',
      totalRuns: 8,
      successRate: 100,
      avgProcessingTime: 3.8
    },
    {
      id: '01K3ZCMENZC5E5DGTF000E8JZK',
      name: 'Manual File Processing',
      description: 'Form-based file processing workflow for manual uploads',
      trigger: 'Manual form submission',
      status: 'active',
      lastRun: '1 hour ago',
      totalRuns: 5,
      successRate: 100,
      avgProcessingTime: 6.1
    }
  ]);

  const [automationLogs, setAutomationLogs] = React.useState<AutomationLog[]>([
    {
      id: '1',
      ruleId: '01K40SC9ZXHNRF59ZF8HF2MYSA',
      ruleName: 'Auto AI Description - Links',
      timestamp: '2 minutes ago',
      status: 'success',
      sourceTitle: 'Machine Learning in Healthcare: Revolutionary Applications',
      processingTime: 4.1,
      description: 'Comprehensive exploration of machine learning applications revolutionizing healthcare delivery...'
    },
    {
      id: '2',
      ruleId: '01K40SC9ZXHNRF59ZF8HF2MYSA',
      ruleName: 'Auto AI Description - Links',
      timestamp: '5 minutes ago',
      status: 'success',
      sourceTitle: 'Digital Transformation Strategy Guide 2024',
      processingTime: 3.9,
      description: 'Strategic guide to digital transformation initiatives covering organizational change management...'
    },
    {
      id: '3',
      ruleId: '01K40SE2YF4KKC2VDZV45JHZB3',
      ruleName: 'Auto AI Description - Files',
      timestamp: '8 minutes ago',
      status: 'processing',
      sourceTitle: 'Business Strategy Presentation Q1 2024.pptx',
      processingTime: 0
    }
  ]);

  const [stats, setStats] = React.useState({
    totalAutomations: 3,
    activeAutomations: 3,
    totalRuns: 25,
    successRate: 96,
    avgProcessingTime: 4.7
  });

  const toggleAutomationStatus = (id: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-800">Automation Manager</h2>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create Automation</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Automations</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalAutomations}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeAutomations}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Runs</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalRuns}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.successRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Time</p>
                <p className="text-2xl font-bold text-slate-800">{stats.avgProcessingTime}s</p>
              </div>
              <Clock className="w-8 h-8 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Automation Rules */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Active Automation Rules</h3>
          <button className="flex items-center space-x-2 px-3 py-1 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="space-y-4">
          {automationRules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    {rule.name.includes('Links') ? (
                      <Link className="w-5 h-5 text-purple-600" />
                    ) : rule.name.includes('Files') ? (
                      <FileText className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Brain className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{rule.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{rule.description}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      <strong>Trigger:</strong> {rule.trigger}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(rule.status)}`}>
                    {rule.status}
                  </span>
                  <button
                    onClick={() => toggleAutomationStatus(rule.id)}
                    className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Last Run:</span>
                  <span className="ml-2 text-slate-700">{rule.lastRun}</span>
                </div>
                <div>
                  <span className="text-slate-500">Total Runs:</span>
                  <span className="ml-2 text-slate-700">{rule.totalRuns}</span>
                </div>
                <div>
                  <span className="text-slate-500">Success Rate:</span>
                  <span className="ml-2 text-green-600">{rule.successRate}%</span>
                </div>
                <div>
                  <span className="text-slate-500">Avg Time:</span>
                  <span className="ml-2 text-slate-700">{rule.avgProcessingTime}s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Recent Automation Activity</h3>
          <button className="flex items-center space-x-2 px-3 py-1 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
            <Eye className="w-4 h-4" />
            <span>View All</span>
          </button>
        </div>

        <div className="space-y-3">
          {automationLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-slate-800">{log.ruleName}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{log.sourceTitle}</p>
                    {log.description && (
                      <p className="text-xs text-slate-500 bg-slate-50 rounded p-2 border">
                        {log.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right text-xs text-slate-500">
                  <div>{log.timestamp}</div>
                  {log.processingTime > 0 && (
                    <div className="mt-1">{log.processingTime}s</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-purple-800">Automated AI Description System</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-800 mb-3">🔄 How It Works:</h4>
            <ul className="text-sm text-purple-700 space-y-2">
              <li>• <strong>Automatic Triggers:</strong> Detects new sources without descriptions</li>
              <li>• <strong>AI Analysis:</strong> Generates professional descriptions using Taskade AI</li>
              <li>• <strong>Real-time Updates:</strong> Immediately updates source records</li>
              <li>• <strong>Quality Assurance:</strong> Tracks success rates and processing times</li>
              <li>• <strong>Continuous Monitoring:</strong> Logs all activities for review</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-800 mb-3">✨ Benefits:</h4>
            <ul className="text-sm text-purple-700 space-y-2">
              <li>• <strong>Zero Manual Work:</strong> Descriptions generated automatically</li>
              <li>• <strong>Consistent Quality:</strong> Professional, standardized descriptions</li>
              <li>• <strong>Immediate Processing:</strong> New sources processed within seconds</li>
              <li>• <strong>Complete Coverage:</strong> No source left without description</li>
              <li>• <strong>Scalable System:</strong> Handles unlimited sources efficiently</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
          <p className="text-sm text-slate-700">
            <strong>🚀 System Status:</strong> All automation rules are active and monitoring your projects. 
            New sources added to Link Inbox or Source Files Registry will automatically receive AI-generated descriptions 
            within 5-10 seconds of being added.
          </p>
        </div>
      </div>
    </div>
  );
};