import * as React from 'react';
import { Database, Plus, FileText, Link, Upload, Search, Filter, RefreshCw } from 'lucide-react';

export const SourceManager: React.FC = () => {
  const [sources, setSources] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSources = async () => {
      try {
        const allSources = [];

        // Fetch from Link Inbox
        const linksResponse = await fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes');
        if (linksResponse.ok) {
          const linksData = await linksResponse.json();
          const linkSources = linksData.payload?.nodes?.map((node: any) => ({
            id: node.id,
            title: node.fieldValues['/text'] || 'Untitled Link',
            type: 'link',
            url: node.fieldValues['/attributes/@link01'],
            description: node.fieldValues['/attributes/@link03'] || '',
            status: node.fieldValues['/attributes/@link04'] || 'pending',
            dateAdded: node.fieldValues['/attributes/@link05'] || new Date().toISOString(),
            addedBy: node.fieldValues['/attributes/@link06'] || 'Unknown'
          })) || [];
          allSources.push(...linkSources);
        }

        // Fetch from Source Files Registry
        const filesResponse = await fetch('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes');
        if (filesResponse.ok) {
          const filesData = await filesResponse.json();
          const fileSources = filesData.payload?.nodes?.map((node: any) => ({
            id: node.id,
            title: node.fieldValues['/text'] || 'Untitled File',
            type: 'file',
            path: node.fieldValues['/attributes/@src02'],
            description: node.fieldValues['/attributes/note'] || '',
            status: node.fieldValues['/attributes/@src07'] || 'pending',
            dateAdded: node.fieldValues['/attributes/@src04'] || new Date().toISOString(),
            addedBy: node.fieldValues['/attributes/@src06'] || 'Unknown'
          })) || [];
          allSources.push(...fileSources);
        }

        setSources(allSources);
      } catch (error) {
        console.error('Error fetching sources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-200 rounded-lg h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">Source Manager</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search sources..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
          <option value="all">All Types</option>
          <option value="link">Links</option>
          <option value="file">Files</option>
        </select>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Sources List */}
      {sources.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Database className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">No Sources Yet</h3>
          <p>Start by adding files or URLs to begin building your knowledge base.</p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Your First Source</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.id} className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {source.type === 'link' ? (
                      <Link className="w-4 h-4 text-slate-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{source.title}</h3>
                    {source.url && (
                      <p className="text-xs text-slate-500 mt-1 break-all">{source.url}</p>
                    )}
                    {source.path && (
                      <p className="text-xs text-slate-500 mt-1">{source.path}</p>
                    )}
                  </div>
                </div>
                
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(source.status)}`}>
                  {source.status}
                </span>
              </div>

              {source.description && (
                <p className="text-sm text-slate-600 mb-3 bg-slate-50 rounded p-2">
                  {source.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-4">
                  <span>Added: {new Date(source.dateAdded).toLocaleDateString()}</span>
                  <span>By: {source.addedBy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  <button className="text-red-600 hover:text-red-700">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{sources.length}</p>
              <p className="text-sm text-slate-600">Total Sources</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {sources.filter(s => s.type === 'link').length}
              </p>
              <p className="text-sm text-slate-600">Links</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {sources.filter(s => s.type === 'file').length}
              </p>
              <p className="text-sm text-slate-600">Files</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {sources.filter(s => s.status === 'completed').length}
              </p>
              <p className="text-sm text-slate-600">Processed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};