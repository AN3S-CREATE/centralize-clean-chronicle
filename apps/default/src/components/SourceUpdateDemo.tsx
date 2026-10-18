import * as React from 'react';
import { Database, CheckCircle, ArrowRight, RefreshCw, Eye, ExternalLink } from 'lucide-react';

interface SourceRecord {
  id: string;
  title: string;
  type: 'link' | 'file';
  url?: string;
  description: string;
  projectId: string;
  projectName: string;
}

export const SourceUpdateDemo: React.FC = () => {
  const [beforeSources, setBeforeSources] = React.useState<SourceRecord[]>([]);
  const [afterSources, setAfterSources] = React.useState<SourceRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchSourceData = async () => {
    try {
      const sources: SourceRecord[] = [];

      // Fetch from Link Inbox
      const linksResponse = await fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes');
      if (linksResponse.ok) {
        const linksData = await linksResponse.json();
        const linkSources = linksData.payload?.nodes?.map((node: any) => ({
          id: node.id,
          title: node.fieldValues['/text'] || 'Untitled Link',
          type: 'link' as const,
          url: node.fieldValues['/attributes/@link01'],
          description: node.fieldValues['/attributes/@link03'] || '',
          projectId: 'XrJj33Gs8pvsXQWD',
          projectName: 'Link Inbox'
        })) || [];
        
        sources.push(...linkSources);
      }

      // Fetch from Source Files Registry
      const filesResponse = await fetch('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes');
      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        const fileSources = filesData.payload?.nodes?.map((node: any) => ({
          id: node.id,
          title: node.fieldValues['/text'] || 'Untitled File',
          type: 'file' as const,
          url: node.fieldValues['/attributes/@src02'],
          description: node.fieldValues['/attributes/note'] || '',
          projectId: 'KtB2PkoCLznXqe3v',
          projectName: 'Source Files Registry'
        })) || [];
        
        sources.push(...fileSources);
      }

      return sources;
    } catch (error) {
      console.error('Error fetching source data:', error);
      return [];
    }
  };

  React.useEffect(() => {
    const loadInitialData = async () => {
      const sources = await fetchSourceData();
      setBeforeSources(sources);
      setAfterSources(sources);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const refreshData = async () => {
    setRefreshing(true);
    const sources = await fetchSourceData();
    setAfterSources(sources);
    setRefreshing(false);
  };

  const getDescriptionStatus = (description: string) => {
    if (!description || description.trim() === '') {
      return { status: 'empty', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    } else if (description.length < 50) {
      return { status: 'short', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    } else {
      return { status: 'complete', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Source Records - Before & After AI</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-200 rounded-lg h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Live Source Records - AI Updates</h2>
        </div>
        <button
          onClick={refreshData}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Before AI Generation */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <span>📋 Initial State</span>
            <span className="text-sm text-slate-500">(Before AI)</span>
          </h3>
          
          <div className="space-y-4">
            {beforeSources.map((source) => {
              const status = getDescriptionStatus(source.description);
              return (
                <div key={`before-${source.id}`} className={`rounded-lg p-4 border ${status.bg} ${status.border}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800 text-sm">{source.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${status.color} bg-white`}>
                      {source.type}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-600 mb-2">{source.projectName}</p>
                  
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-700">Description:</span>
                    {source.description ? (
                      <p className="text-xs text-slate-600 mt-1 bg-white rounded p-2 border">
                        {source.description}
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 mt-1 italic">
                        ⚠️ No description available
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${status.color} font-medium`}>
                      {status.status === 'empty' ? 'Missing Description' : 
                       status.status === 'short' ? 'Short Description' : 'Complete Description'}
                    </span>
                    {source.url && (
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <ArrowRight className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">AI Processing</span>
          </div>
        </div>

        {/* After AI Generation */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <span>🤖 Updated State</span>
            <span className="text-sm text-slate-500">(After AI)</span>
          </h3>
          
          <div className="space-y-4">
            {afterSources.map((source) => {
              const status = getDescriptionStatus(source.description);
              const beforeSource = beforeSources.find(b => b.id === source.id);
              const wasUpdated = beforeSource && beforeSource.description !== source.description;
              
              return (
                <div key={`after-${source.id}`} className={`rounded-lg p-4 border ${status.bg} ${status.border} ${wasUpdated ? 'ring-2 ring-green-300' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800 text-sm">{source.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${status.color} bg-white`}>
                        {source.type}
                      </span>
                      {wasUpdated && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-600 mb-2">{source.projectName}</p>
                  
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-700">Description:</span>
                    {source.description ? (
                      <p className="text-xs text-slate-600 mt-1 bg-white rounded p-2 border">
                        {source.description}
                        {wasUpdated && (
                          <span className="block text-green-600 font-medium mt-1">
                            ✨ AI Generated
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 mt-1 italic">
                        ⚠️ No description available
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${status.color} font-medium`}>
                      {status.status === 'empty' ? 'Missing Description' : 
                       status.status === 'short' ? 'Short Description' : 'Complete Description'}
                    </span>
                    {source.url && (
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">🔄 How AI Updates Work:</h4>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="flex items-start space-x-2">
            <span className="font-medium">1.</span>
            <span>AI analyzes the source content (title, URL, available text)</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium">2.</span>
            <span>Generates professional 2-3 sentence description</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium">3.</span>
            <span>Automatically updates the source record in the Taskade project</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium">4.</span>
            <span>Changes are immediately visible in your knowledge base</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded border border-blue-200">
          <p className="text-sm text-slate-700">
            <strong>Try it:</strong> Go to the "AI Test Live" tab, click "Test Generate" on any source, 
            then come back here and click "Refresh Data" to see the live updates!
          </p>
        </div>
      </div>
    </div>
  );
};