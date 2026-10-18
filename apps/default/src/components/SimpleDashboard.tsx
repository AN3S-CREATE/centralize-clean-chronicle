import * as React from 'react';
import { SimpleHeader } from './SimpleHeader';
import { Brain, Mic, Database, Zap, Plus, Search, TrendingUp } from 'lucide-react';

export const SimpleDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Welcome to Your Knowledge Hub
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Centralize, organize, and intelligently manage your professional knowledge with AI-powered automation.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Voice Notes</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                <span className="text-sm text-green-600">Ready to record</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Mic className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">AI Processing</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">3</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                <span className="text-sm text-blue-600">Active workflows</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Knowledge Base</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                <span className="text-sm text-green-600">Ready to build</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Automations</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">3</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1 text-orange-600" />
                <span className="text-sm text-orange-600">All active</span>
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
          <button className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Record Voice Note</h4>
                <p className="text-sm text-slate-600 mt-1">Record in English or Afrikaans</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Add Content</h4>
                <p className="text-sm text-slate-600 mt-1">Upload files or add URLs</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Search Knowledge</h4>
                <p className="text-sm text-slate-600 mt-1">Find information quickly</p>
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
        <p className="text-slate-600 mb-6">Record audio notes in English or Afrikaans with automatic AI transcription.</p>
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
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Sources</h2>
        <p className="text-slate-600 mb-6">Manage your files, links, and content sources.</p>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Add Source
        </button>
      </div>
    </div>
  );

  const AutomationTab = () => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="text-center">
        <Zap className="w-16 h-16 mx-auto mb-4 text-orange-600" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Automation</h2>
        <p className="text-slate-600 mb-6">AI-powered workflows for automatic content processing.</p>
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
          3 Active Workflows
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