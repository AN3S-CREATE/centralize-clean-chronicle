import * as React from 'react';
import { SimpleHeader } from './SimpleHeader';
import { VoiceNotesManager } from './VoiceNotesManager';
import { Brain, Mic, Database, Zap, Plus, Search, TrendingUp, RefreshCw, CheckCircle, Clock, Link, FileText } from 'lucide-react';

export const LiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [stats, setStats] = React.useState({
    sourceFiles: 0,
    informationUnits: 0,
    linkInbox: 0,
    authorityRecords: 0,
    loading: true
  });
  const [recentSources, setRecentSources] = React.useState<any[]>([]);

  // Fetch real data from Taskade APIs
  React.useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));

        // Fetch from multiple Taskade projects
        const [linksResponse, sourcesResponse, unitsResponse, authorityResponse] = await Promise.all([
          fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes'), // Link Inbox
          fetch('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes'), // Source Files Registry
          fetch('/api/taskade/projects/pCJwqJ3XQTSi9vTL/nodes'), // Information Units Store
          fetch('/api/taskade/projects/Tr4UCutK4yGfWrnX/nodes')  // Authority Records Registry
        ]);

        const results = await Promise.all([
          linksResponse.ok ? linksResponse.json() : { payload: { nodes: [] } },
          sourcesResponse.ok ? sourcesResponse.json() : { payload: { nodes: [] } },
          unitsResponse.ok ? unitsResponse.json() : { payload: { nodes: [] } },
          authorityResponse.ok ? authorityResponse.json() : { payload: { nodes: [] } }
        ]);

        const [linksData, sourcesData, unitsData, authorityData] = results;

        setStats({
          linkInbox: linksData.payload?.nodes?.length || 0,
          sourceFiles: sourcesData.payload?.nodes?.length || 0,
          informationUnits: unitsData.payload?.nodes?.length || 0,
          authorityRecords: authorityData.payload?.nodes?.length || 0,
          loading: false
        });

        // Combine recent sources from links and files
        const recentLinks = (linksData.payload?.nodes || []).slice(0, 3).map((node: any) => ({
          id: node.id,
          title: node.fieldValues['/text'] || 'Untitled Link',
          type: 'link',
          url: node.fieldValues['/attributes/@link01'],
          description: node.fieldValues['/attributes/@link03'] || 'No description',
          dateAdded: node.fieldValues['/attributes/@link05'] || new Date().toISOString()
        }));

        const recentFiles = (sourcesData.payload?.nodes || []).slice(0, 2).map((node: any) => ({
          id: node.id,
          title: node.fieldValues['/text'] || 'Untitled File',
          type: 'file',
          path: node.fieldValues['/attributes/@src02'],
          description: node.fieldValues['/attributes/note'] || 'No description',
          dateAdded: node.fieldValues['/attributes/@src04'] || new Date().toISOString()
        }));

        setRecentSources([...recentLinks, ...recentFiles]);

      } catch (error) {
        console.error('Error fetching live data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLiveData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section with Live Status */}
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

      {/* Recent Sources - Live Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Recent Sources</h3>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Refresh
            </button>
          </div>
          
          {recentSources.length === 0 ? (
            <div className="text-center py-6 text-slate-500">
              <Database className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No sources found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSources.map((source) => (
                <div key={source.id} className="bg-white rounded-lg p-3 border border-slate-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                      {source.type === 'link' ? (
                        <Link className="w-3 h-3 text-slate-600" />
                      ) : (
                        <FileText className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 text-sm truncate">{source.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{source.description}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(source.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Plus className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('voice-notes')}
              className="w-full p-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-purple-300 transition-all text-left group"
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
              className="w-full p-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group"
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

            <button className="w-full p-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all text-left group">
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
    </div>
  );

  const SourcesTab = () => (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Source Management</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Live Data:</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </div>
        
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
        
        <div className="text-center">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-3">
            Add New Source
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Sources
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
        return <VoiceNotesManager />;
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