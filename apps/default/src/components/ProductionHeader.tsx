import * as React from 'react';
import { 
  Brain, 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  ChevronDown,
  BarChart3,
  Database,
  Zap,
  Shield,
  Trash2,
  TrendingUp,
  Info,
  FileText,
  Mic,
  TestTube
} from 'lucide-react';

interface ProductionHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProductionHeader: React.FC<ProductionHeaderProps> = ({ activeTab, onTabChange }) => {
  const [navigationDropdownOpen, setNavigationDropdownOpen] = React.useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'knowledge', label: 'Knowledge Base', icon: Brain },
    { id: 'sources', label: 'Sources', icon: Database },
    { id: 'voice-notes', label: 'Voice Notes', icon: Mic },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'authority', label: 'Authority Records', icon: Shield },
    { id: 'cleanup', label: 'Cleanup', icon: Trash2 },
  ];

  const systemItems = [
    { id: 'app-test', label: 'App Functionality Test', icon: TestTube },
    { id: 'drive-integration', label: 'Drive Integration', icon: FileText },
    { id: 'system', label: 'System Status', icon: TrendingUp },
    { id: 'requirements', label: 'Setup Requirements', icon: Info },
  ];

  const handleNavigationClick = React.useCallback((tabId: string) => {
    onTabChange(tabId);
    setNavigationDropdownOpen(false);
  }, [onTabChange]);

  const getCurrentTabLabel = React.useCallback(() => {
    const allItems = [...navigationItems, ...systemItems];
    const currentItem = allItems.find(item => item.id === activeTab);
    return currentItem?.label || 'Overview';
  }, [activeTab, navigationItems, systemItems]);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Knowledge Hub</h1>
                <p className="text-sm text-slate-500">AI-Powered Knowledge Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Dropdown */}
          <div className="flex items-center space-x-4">
            {/* Main Navigation Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNavigationDropdownOpen(!navigationDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="font-medium">{getCurrentTabLabel()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${navigationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {navigationDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">
                      Main Navigation
                    </div>
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigationClick(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                            activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-slate-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.id === 'voice-notes' && (
                            <span className="ml-auto px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                              New
                            </span>
                          )}
                        </button>
                      );
                    })}
                    
                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-t border-b border-slate-200 mt-2">
                      System & Testing
                    </div>
                    {systemItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigationClick(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                            activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-slate-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.id === 'app-test' && (
                            <span className="ml-auto px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Test
                            </span>
                          )}
                          {item.id === 'drive-integration' && (
                            <span className="ml-auto px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                              Setup
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* User Actions */}
            <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-800">Administrator</p>
                <p className="text-xs text-slate-500">Knowledge Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};