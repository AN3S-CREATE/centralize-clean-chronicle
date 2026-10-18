import * as React from 'react';
import { CheckCircle, AlertTriangle, RefreshCw, Database, Link, FileText } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'testing' | 'success' | 'error';
  message: string;
  data?: any;
}

export const AppTester: React.FC = () => {
  const [tests, setTests] = React.useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = React.useState(false);

  const apiEndpoints = [
    {
      name: 'Link Inbox',
      url: '/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes',
      icon: Link
    },
    {
      name: 'Source Files Registry',
      url: '/api/taskade/projects/KtB2PkoCLznXqe3v/nodes',
      icon: FileText
    },
    {
      name: 'Information Units Store',
      url: '/api/taskade/projects/pCJwqJ3XQTSi9vTL/nodes',
      icon: Database
    },
    {
      name: 'Authority Records Registry',
      url: '/api/taskade/projects/Tr4UCutK4yGfWrnX/nodes',
      icon: Database
    },
    {
      name: 'Drive Cleanup Pipeline',
      url: '/api/taskade/projects/oHJrMVc1gNqcS54z/nodes',
      icon: Database
    }
  ];

  const runTests = async () => {
    setIsRunning(true);
    setTests([]);

    for (const endpoint of apiEndpoints) {
      // Add test with testing status
      setTests(prev => [...prev, {
        name: endpoint.name,
        status: 'testing',
        message: 'Testing API connection...'
      }]);

      try {
        const response = await fetch(endpoint.url);
        const data = await response.json();

        if (response.ok) {
          setTests(prev => prev.map(test => 
            test.name === endpoint.name 
              ? {
                  ...test,
                  status: 'success',
                  message: `✅ Connected successfully. Found ${data.payload?.nodes?.length || 0} items.`,
                  data: data.payload?.nodes?.length || 0
                }
              : test
          ));
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        setTests(prev => prev.map(test => 
          test.name === endpoint.name 
            ? {
                ...test,
                status: 'error',
                message: `❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            : test
        ));
      }

      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <RefreshCw className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'testing':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">App Functionality Test</h2>
        </div>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Testing...' : 'Run Tests'}</span>
        </button>
      </div>

      {tests.length === 0 && !isRunning && (
        <div className="text-center py-8 text-slate-500">
          <Database className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">Ready to Test</h3>
          <p>Click "Run Tests" to verify all API connections and app functionality.</p>
        </div>
      )}

      {tests.length > 0 && (
        <div className="space-y-4">
          {tests.map((test, index) => {
            const endpoint = apiEndpoints.find(e => e.name === test.name);
            const IconComponent = endpoint?.icon || Database;
            
            return (
              <div key={index} className={`rounded-lg p-4 border ${getStatusColor(test.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-slate-600" />
                    <div>
                      <h3 className="font-semibold text-slate-800">{test.name}</h3>
                      <p className="text-sm text-slate-600">{test.message}</p>
                    </div>
                  </div>
                  {getStatusIcon(test.status)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {tests.length > 0 && !isRunning && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{tests.length}</p>
              <p className="text-sm text-slate-600">Total Tests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {tests.filter(t => t.status === 'success').length}
              </p>
              <p className="text-sm text-slate-600">Passed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {tests.filter(t => t.status === 'error').length}
              </p>
              <p className="text-sm text-slate-600">Failed</p>
            </div>
          </div>
        </div>
      )}

      {/* Test Results Summary */}
      {tests.length > 0 && !isRunning && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">🧪 Test Results Summary:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            {tests.filter(t => t.status === 'success').length === tests.length ? (
              <div>✅ <strong>All systems operational!</strong> The app is fully functional and all API connections are working correctly.</div>
            ) : (
              <div>⚠️ <strong>Some issues detected.</strong> Check the failed tests above for details.</div>
            )}
            <div>📊 <strong>Data Summary:</strong> {tests.reduce((sum, test) => sum + (test.data || 0), 0)} total items across all projects</div>
            <div>🔗 <strong>API Endpoints:</strong> All major Taskade project APIs tested</div>
          </div>
        </div>
      )}
    </div>
  );
};