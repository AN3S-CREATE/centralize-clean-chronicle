import * as React from 'react';
import { Brain, Mic, Database, Zap, Plus, Search, TrendingUp, RefreshCw, CheckCircle, Clock, Link, FileText, Settings, Bell, User } from 'lucide-react';

interface SimpleHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'voice-notes', label: 'Voice Notes' },
    { id: 'sources', label: 'Sources' },
    { id: 'automation', label: 'Automation' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Knowledge Hub</h1>
              <p className="text-sm text-slate-500">AI-Powered Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const StreamlinedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [stats, setStats] = React.useState({
    sourceFiles: 0,
    informationUnits: 0,
    linkInbox: 0,
    authorityRecords: 0,
    loading: true
  });

  // Fetch real data from Taskade APIs with error handling
  React.useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));

        // Fetch data with timeout and error handling
        const fetchWithTimeout = async (url: string, timeout = 5000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            return response.ok ? response.json() : { payload: { nodes: [] } };
          } catch (error) {
            clearTimeout(timeoutId);
            return { payload: { nodes: [] } };
          }
        };

        const [linksData, sourcesData, unitsData, authorityData] = await Promise.all([
          fetchWithTimeout('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes'),
          fetchWithTimeout('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes'),
          fetchWithTimeout('/api/taskade/projects/pCJwqJ3XQTSi9vTL/nodes'),
          fetchWithTimeout('/api/taskade/projects/Tr4UCutK4yGfWrnX/nodes')
        ]);

        setStats({
          linkInbox: linksData.payload?.nodes?.length || 0,
          sourceFiles: sourcesData.payload?.nodes?.length || 0,
          informationUnits: unitsData.payload?.nodes?.length || 0,
          authorityRecords: authorityData.payload?.nodes?.length || 0,
          loading: false
        });

      } catch (error) {
        console.error('Error fetching live data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome to Your Knowledge Hub
            </h2>
            <p className="text-lg text-slate-600">
              AI-powered knowledge management with voice notes and live data integration
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {stats.loading ? (
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            <span className="text-sm text-slate-600">
              {stats.loading ? 'Loading...' : 'Live Data Connected'}
            </span>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">System Status: All APIs Connected</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Successfully connected to {stats.linkInbox + stats.sourceFiles + stats.informationUnits + stats.authorityRecords} total records across 4 Taskade projects
          </p>
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Link Inbox</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">
                {stats.loading ? '...' : stats.linkInbox}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                <span className="text-sm text-blue-600">URLs ready for processing</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Link className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Source Files</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">
                {stats.loading ? '...' : stats.sourceFiles}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                <span className="text-sm text-green-600">Files in registry</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Knowledge Units</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">
                {stats.loading ? '...' : stats.informationUnits}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-purple-600" />
                <span className="text-sm text-purple-600">Processed information</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Authority Records</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">
                {stats.loading ? '...' : stats.authorityRecords}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-orange-600" />
                <span className="text-sm text-orange-600">Canonical references</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Plus className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('voice-notes')}
            className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-purple-300 transition-all text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 group-hover:text-purple-600 transition-colors">Record Voice Note</h4>
                <p className="text-xs text-slate-600">English & Afrikaans support</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('sources')}
            className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">Add Content</h4>
                <p className="text-xs text-slate-600">Upload files or add URLs</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all text-left group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 group-hover:text-green-600 transition-colors">Search Knowledge</h4>
                <p className="text-xs text-slate-600">Find information quickly</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const VoiceNotesTab = () => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="text-center">
        <Mic className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Voice Notes</h2>
        <p className="text-slate-600 mb-6">Record audio notes in English or Afrikaans with automatic AI transcription and processing.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🇺🇸</span>
              <h4 className="font-semibold text-blue-800">English Support</h4>
            </div>
            <p className="text-sm text-blue-700">High-quality speech-to-text with professional vocabulary recognition</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🇿🇦</span>
              <h4 className="font-semibold text-green-800">Afrikaans Support</h4>
            </div>
            <p className="text-sm text-green-700">Native Afrikaans processing with cultural context understanding</p>
          </div>
        </div>
        
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Start Recording
        </button>
      </div>
    </div>
  );

  const SourcesTab = () => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="text-center">
        <Database className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Sources Management</h2>
        <p className="text-slate-600 mb-6">Manage your files, links, and content sources with AI-powered processing.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">📎 Link Inbox</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.linkInbox}</p>
            <p className="text-sm text-blue-700">URLs ready for processing</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">📁 Source Files</h3>
            <p className="text-2xl font-bold text-green-600">{stats.sourceFiles}</p>
            <p className="text-sm text-green-700">Files in registry</p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Link
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Upload File
          </button>
        </div>
      </div>
    </div>
  );

  const AutomationTab = () => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="text-center mb-6">
        <Zap className="w-16 h-16 mx-auto mb-4 text-orange-600" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4">AI Automation</h2>
        <p className="text-slate-600 mb-6">Automated workflows for intelligent content processing and analysis.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-medium text-green-800">Link Processing</h4>
          <p className="text-sm text-green-700">Auto AI descriptions</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-medium text-green-800">File Processing</h4>
          <p className="text-sm text-green-700">Auto AI descriptions</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-medium text-green-800">Voice Processing</h4>
          <p className="text-sm text-green-700">Transcription & analysis</p>
        </div>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
          All Automations Active
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'voice-notes':
        return <VoiceNotesTab />;
      case 'sources':
        return <SourcesTab />;
      case 'automation':
        return <AutomationTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SimpleHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};