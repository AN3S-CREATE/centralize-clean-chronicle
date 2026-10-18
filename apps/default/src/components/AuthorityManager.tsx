import * as React from 'react';
import { Shield, Plus, Edit, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export const AuthorityManager: React.FC = () => {
  const [authorityRecords, setAuthorityRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAuthorityRecords = async () => {
      try {
        const response = await fetch('/api/taskade/projects/Tr4UCutK4yGfWrnX/nodes');
        if (response.ok) {
          const data = await response.json();
          const records = data.payload?.nodes?.map((node: any) => ({
            id: node.id,
            fieldName: node.fieldValues['/attributes/@auth01'] || node.fieldValues['/text'] || 'Unknown Field',
            canonicalValue: node.fieldValues['/attributes/@auth02'] || '',
            aliases: node.fieldValues['/attributes/@auth03'] || '',
            lastUpdated: node.fieldValues['/attributes/@auth04'] || new Date().toISOString(),
            updatedBy: node.fieldValues['/attributes/@auth05'] || 'System',
            status: node.fieldValues['/attributes/@auth06'] || 'pending'
          })) || [];
          setAuthorityRecords(records);
        }
      } catch (error) {
        console.error('Error fetching authority records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorityRecords();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'deprecated':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'deprecated':
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
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">Authority Records Registry</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {authorityRecords.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Shield className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">No Authority Records</h3>
          <p>Create canonical records to maintain consistent data across your knowledge base.</p>
          <button className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto">
            <Plus className="w-4 h-4" />
            <span>Create First Record</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorityRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">{record.fieldName}</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(record.status)}
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Canonical Value</p>
                  <p className="text-sm text-slate-700 mt-1">{record.canonicalValue || 'Not set'}</p>
                </div>
                
                {record.aliases && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Aliases</p>
                    <p className="text-sm text-slate-700 mt-1">{record.aliases}</p>
                  </div>
                )}
                
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Updated by {record.updatedBy}</span>
                    <span>{new Date(record.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-end">
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Panel */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-3">🛡️ Authority Records</h3>
        <p className="text-sm text-blue-700 mb-4">
          Authority records maintain canonical values for key fields across your knowledge base, 
          ensuring consistency and enabling automatic data normalization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-medium mb-2">Common Use Cases:</h4>
            <ul className="space-y-1">
              <li>• LinkedIn profile URLs</li>
              <li>• Job titles and positions</li>
              <li>• Company names</li>
              <li>• Email addresses</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Benefits:</h4>
            <ul className="space-y-1">
              <li>• Consistent data across sources</li>
              <li>• Automatic normalization</li>
              <li>• Alias management</li>
              <li>• Change propagation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};