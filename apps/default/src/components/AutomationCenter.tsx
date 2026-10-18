import * as React from 'react';
import { Zap, Play, Pause, CheckCircle, Clock, BarChart3, Activity } from 'lucide-react';

export const AutomationCenter: React.FC = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-800">Automation Center</h2>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Automations</p>
              <p className="text-2xl font-bold text-purple-600">3</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">96%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Runs</p>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Time</p>
              <p className="text-2xl font-bold text-slate-800">4.7s</p>
            </div>
            <Clock className="w-8 h-8 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Automation Rules */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Auto AI Description - Links</h4>
                <p className="text-sm text-slate-600">Generates descriptions for new links automatically</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
              <button className="p-2 text-slate-600 hover:text-slate-800 rounded-lg">
                <Pause className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Success Rate:</span>
              <span className="ml-2 text-green-600">95%</span>
            </div>
            <div>
              <span className="text-slate-500">Total Runs:</span>
              <span className="ml-2 text-slate-700">12</span>
            </div>
            <div>
              <span className="text-slate-500">Avg Time:</span>
              <span className="ml-2 text-slate-700">4.2s</span>
            </div>
            <div>
              <span className="text-slate-500">Last Run:</span>
              <span className="ml-2 text-slate-700">2 min ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Auto AI Description - Files</h4>
                <p className="text-sm text-slate-600">Generates descriptions for uploaded files automatically</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
              <button className="p-2 text-slate-600 hover:text-slate-800 rounded-lg">
                <Pause className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Success Rate:</span>
              <span className="ml-2 text-green-600">100%</span>
            </div>
            <div>
              <span className="text-slate-500">Total Runs:</span>
              <span className="ml-2 text-slate-700">8</span>
            </div>
            <div>
              <span className="text-slate-500">Avg Time:</span>
              <span className="ml-2 text-slate-700">3.8s</span>
            </div>
            <div>
              <span className="text-slate-500">Last Run:</span>
              <span className="ml-2 text-slate-700">5 min ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Manual File Processing</h4>
                <p className="text-sm text-slate-600">Form-based workflow for manual file uploads</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
              <button className="p-2 text-slate-600 hover:text-slate-800 rounded-lg">
                <Pause className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Success Rate:</span>
              <span className="ml-2 text-green-600">100%</span>
            </div>
            <div>
              <span className="text-slate-500">Total Runs:</span>
              <span className="ml-2 text-slate-700">5</span>
            </div>
            <div>
              <span className="text-slate-500">Avg Time:</span>
              <span className="ml-2 text-slate-700">6.1s</span>
            </div>
            <div>
              <span className="text-slate-500">Last Run:</span>
              <span className="ml-2 text-slate-700">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-800 mb-3">🤖 Automated AI Processing</h3>
        <p className="text-sm text-purple-700 mb-4">
          Your knowledge base is continuously monitored by AI automations that ensure every source 
          has a professional description and is properly categorized.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
          <div>
            <h4 className="font-medium mb-2">✨ What's Automated:</h4>
            <ul className="space-y-1">
              <li>• AI description generation</li>
              <li>• Content categorization</li>
              <li>• Keyword extraction</li>
              <li>• Quality scoring</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">⚡ Benefits:</h4>
            <ul className="space-y-1">
              <li>• Zero manual work required</li>
              <li>• Consistent quality standards</li>
              <li>• Immediate processing</li>
              <li>• Complete coverage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};