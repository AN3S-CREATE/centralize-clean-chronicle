import * as React from 'react';
import { Trash2, Search, AlertTriangle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

export const CleanupCenter: React.FC = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trash2 className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-slate-800">Cleanup Center</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          <Search className="w-4 h-4" />
          <span>Scan for Duplicates</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Files Scanned</p>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            <Search className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Duplicates Found</p>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Space Saved</p>
              <p className="text-2xl font-bold text-green-600">0 MB</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Last Scan</p>
              <p className="text-2xl font-bold text-slate-600">Never</p>
            </div>
            <Clock className="w-8 h-8 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Cleanup Status */}
      <div className="text-center py-12 text-slate-500">
        <Trash2 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium mb-2">No Cleanup Needed</h3>
        <p className="mb-6">Your knowledge base is clean and optimized. Run a scan to check for duplicates.</p>
        
        <div className="flex items-center justify-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Search className="w-5 h-5" />
            <span>Start Duplicate Scan</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh Status</span>
          </button>
        </div>
      </div>

      {/* Cleanup Process Info */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="font-semibold text-orange-800 mb-3">🧹 Automated Cleanup Process</h3>
        <p className="text-sm text-orange-700 mb-4">
          The cleanup system identifies duplicate files and obsolete content to optimize your knowledge base storage and organization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
          <div>
            <h4 className="font-medium mb-2">What Gets Scanned:</h4>
            <ul className="space-y-1">
              <li>• Exact duplicate files</li>
              <li>• Near-duplicate content</li>
              <li>• Obsolete versions</li>
              <li>• Broken references</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Safety Features:</h4>
            <ul className="space-y-1">
              <li>• 30-day quarantine period</li>
              <li>• Manual review required</li>
              <li>• Backup before deletion</li>
              <li>• Restore capability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};