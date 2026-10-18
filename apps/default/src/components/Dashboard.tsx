import * as React from 'react';
import { 
  Database, 
  FileText, 
  Link, 
  Settings, 
  BarChart3, 
  Brain, 
  Shield, 
  Trash2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  User,
  Calendar,
  TrendingUp,
  Cog,
  TestTube,
  Wand2,
  Sparkles,
  Eye,
  Target,
  Zap
} from 'lucide-react';
import { Header } from './Header';
import { StatsCards } from './StatsCards';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import { KnowledgeBasePreview } from './KnowledgeBasePreview';
import { ProcessingQueue } from './ProcessingQueue';
import { SystemOverview } from './SystemOverview';
import { TestLinkProcessing } from './TestLinkProcessing';
import { AIDescriptionGenerator } from './AIDescriptionGenerator';
import { AIGenerationTest } from './AIGenerationTest';
import { SourceUpdateDemo } from './SourceUpdateDemo';
import { WorkflowGuide } from './WorkflowGuide';
import { AutomationManager } from './AutomationManager';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('automation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 bg-white/70 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20 overflow-x-auto">
            {[
              { id: 'automation', label: 'Automation', icon: Zap },
              { id: 'workflow-guide', label: 'Workflow Guide', icon: Target },
              { id: 'ai-test', label: 'AI Test Live', icon: Sparkles },
              { id: 'source-updates', label: 'Before & After', icon: Eye },
              { id: 'ai-descriptions', label: 'AI Descriptions', icon: Wand2 },
              { id: 'test', label: 'Test Link Processing', icon: TestTube },
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'knowledge', label: 'Knowledge Base', icon: Brain },
              { id: 'sources', label: 'Sources', icon: Database },
              { id: 'processing', label: 'Processing', icon: RefreshCw },
              { id: 'cleanup', label: 'Cleanup', icon: Trash2 },
              { id: 'authority', label: 'Authority Records', icon: Shield },
              { id: 'system', label: 'System', icon: Cog },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'automation' && <AutomationManager />}
        {activeTab === 'workflow-guide' && <WorkflowGuide />}
        {activeTab === 'ai-test' && <AIGenerationTest />}
        {activeTab === 'source-updates' && <SourceUpdateDemo />}
        {activeTab === 'ai-descriptions' && <AIDescriptionGenerator />}
        {activeTab === 'test' && <TestLinkProcessing />}

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <QuickActions />
              <RecentActivity />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <KnowledgeBasePreview />
              </div>
              <div>
                <ProcessingQueue />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Professional Knowledge Base</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
            <div className="text-center py-12 text-slate-500">
              <Brain className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">Knowledge Base Building</h3>
              <p>Your professional knowledge base will appear here as content is processed and categorized.</p>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Source Files Registry</h2>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Source</span>
              </button>
            </div>
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">No Sources Yet</h3>
              <p>Start by adding files or URLs to begin building your knowledge base.</p>
            </div>
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Processing Pipeline</h2>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Run Pipeline</span>
              </button>
            </div>
            <div className="text-center py-12 text-slate-500">
              <RefreshCw className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">Pipeline Ready</h3>
              <p>The AI processing pipeline is ready to analyze and categorize your content.</p>
            </div>
          </div>
        )}

        {activeTab === 'cleanup' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Trash2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Drive Cleanup Pipeline</h2>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <Search className="w-4 h-4" />
                <span>Scan for Duplicates</span>
              </button>
            </div>
            <div className="text-center py-12 text-slate-500">
              <Trash2 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">Cleanup Ready</h3>
              <p>Run duplicate detection to identify files that can be safely archived or removed.</p>
            </div>
          </div>
        )}

        {activeTab === 'authority' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Authority Records Registry</h2>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">LinkedIn URL</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">https://linkedin.com/in/andries-liebenberg</p>
                <p className="text-xs text-slate-500">Canonical reference for professional profile</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">Current Title</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">Professional Title</p>
                <p className="text-xs text-slate-500">Needs verification and update</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">Primary Email</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">andries@example.com</p>
                <p className="text-xs text-slate-500">Requires confirmation</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && <SystemOverview />}
      </div>
    </div>
  );
};