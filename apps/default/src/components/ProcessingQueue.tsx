import * as React from 'react';
import { RefreshCw, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface QueueItem {
  id: string;
  name: string;
  type: 'file' | 'link';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  timestamp: string;
}

const StatusIcon: React.FC<{ status: QueueItem['status'] }> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case 'processing':
      return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'failed':
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4 text-slate-400" />;
  }
};

export const ProcessingQueue: React.FC = () => {
  const [queueItems, setQueueItems] = React.useState<QueueItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch processing queue items
  React.useEffect(() => {
    const fetchQueueItems = async () => {
      try {
        // Fetch from Link Inbox
        const linksResponse = await fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes');
        if (linksResponse.ok) {
          const linksData = await linksResponse.json();
          const linkItems = linksData.payload?.nodes?.map((node: any) => ({
            id: node.id,
            name: node.fieldValues['/text'] || 'Untitled Link',
            type: 'link' as const,
            status: node.fieldValues['/attributes/@link04'] || 'pending',
            timestamp: node.fieldValues['/attributes/@link05'] || new Date().toISOString()
          })) || [];
          
          setQueueItems(linkItems);
        }

        // Fetch from Source Files Registry
        const sourcesResponse = await fetch('/api/taskade/projects/KtB2PkoCLznXqe3v/nodes');
        if (sourcesResponse.ok) {
          const sourcesData = await sourcesResponse.json();
          const sourceItems = sourcesData.payload?.nodes?.map((node: any) => ({
            id: node.id,
            name: node.fieldValues['/text'] || 'Untitled File',
            type: 'file' as const,
            status: node.fieldValues['/attributes/@src07'] || 'pending',
            timestamp: node.fieldValues['/attributes/@src04'] || new Date().toISOString()
          })) || [];
          
          setQueueItems(prev => [...prev, ...sourceItems]);
        }
      } catch (error) {
        console.error('Error fetching queue items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueueItems();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchQueueItems, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <RefreshCw className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Processing Queue</h2>
        </div>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-200 rounded-lg h-16"></div>
          ))}
        </div>
      </div>
    );
  }

  const sortedItems = queueItems.sort((a, b) => {
    const statusOrder = { processing: 0, pending: 1, failed: 2, completed: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Processing Queue</h2>
        </div>
        <span className="text-sm text-slate-500">
          {queueItems.filter(item => item.status === 'pending' || item.status === 'processing').length} active
        </span>
      </div>

      {sortedItems.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">Queue Empty</h3>
          <p>No items currently in the processing queue.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedItems.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-800 truncate">{item.name}</h3>
                  <StatusIcon status={item.status} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500 capitalize">{item.type}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {item.status === 'processing' && item.progress && (
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedItems.length > 5 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View All ({sortedItems.length} items)
          </button>
        </div>
      )}
    </div>
  );
};