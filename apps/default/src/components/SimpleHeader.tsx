import * as React from 'react';
import { Brain, User, Settings, Bell, ChevronDown } from 'lucide-react';

interface SimpleHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({ activeTab, onTabChange }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

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
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Knowledge Hub</h1>
              <p className="text-sm text-slate-500">AI-Powered Management</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
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

          {/* Mobile Navigation */}
          <div className="md:hidden relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <span>{tabs.find(t => t.id === activeTab)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 ${
                      activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden sm:flex items-center space-x-3">
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