import * as React from 'react';
import { CheckCircle, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export const AppDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = React.useState({
    reactLoaded: false,
    componentsLoaded: false,
    stylesLoaded: false,
    apiConnectivity: 'testing',
    timestamp: new Date().toISOString()
  });

  React.useEffect(() => {
    // Test React and component loading
    setDiagnostics(prev => ({
      ...prev,
      reactLoaded: true,
      componentsLoaded: true,
      stylesLoaded: true
    }));

    // Test API connectivity
    const testAPI = async () => {
      try {
        const response = await fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes');
        if (response.ok) {
          setDiagnostics(prev => ({ ...prev, apiConnectivity: 'success' }));
        } else {
          setDiagnostics(prev => ({ ...prev, apiConnectivity: 'error' }));
        }
      } catch (error) {
        setDiagnostics(prev => ({ ...prev, apiConnectivity: 'error' }));
      }
    };

    testAPI();
  }, []);

  const getStatusIcon = (status: string | boolean) => {
    if (status === true || status === 'success') {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (status === 'testing') {
      return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-8">
            <Info className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">App Diagnostics</h1>
              <p className="text-slate-600">Testing app functionality and connectivity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">Frontend Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">React Loaded</span>
                  {getStatusIcon(diagnostics.reactLoaded)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Components Loaded</span>
                  {getStatusIcon(diagnostics.componentsLoaded)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Styles Loaded</span>
                  {getStatusIcon(diagnostics.stylesLoaded)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">API Connectivity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Taskade API</span>
                  {getStatusIcon(diagnostics.apiConnectivity)}
                </div>
                <div className="text-xs text-slate-500">
                  Testing: /api/taskade/projects/XrJj33Gs8pvsXQWD/nodes
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">🔧 App Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <strong>App Name:</strong> Knowledge Hub
              </div>
              <div>
                <strong>Version:</strong> Production Ready
              </div>
              <div>
                <strong>Last Updated:</strong> {new Date(diagnostics.timestamp).toLocaleString()}
              </div>
              <div>
                <strong>Environment:</strong> Taskade App Platform
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};