import * as React from 'react';
import { 
  Database, 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  ExternalLink,
  Download,
  Upload,
  Sync,
  Settings,
  Play,
  Folder,
  Shield
} from 'lucide-react';
import { GoogleDriveSetup } from './GoogleDriveSetup';

export const DriveIntegrationStatus: React.FC = () => {
  const [activeView, setActiveView] = React.useState<'overview' | 'setup' | 'documents'>('overview');
  const [driveStatus, setDriveStatus] = React.useState({
    connected: false,
    folderStructure: false,
    syncEnabled: false,
    lastSync: null as string | null,
    masterDocuments: 0,
    totalFiles: 0,
    processedFiles: 0
  });

  const driveFeatures = [
    {
      name: 'Google Drive Connection',
      status: driveStatus.connected ? 'connected' : 'pending',
      description: 'Link your Google Drive account for file storage and monitoring',
      action: 'Connect Drive Account',
      icon: Shield
    },
    {
      name: 'Folder Structure Setup',
      status: driveStatus.folderStructure ? 'ready' : 'pending',
      description: 'Create /AndriesHub/ folder structure for organized file management',
      action: 'Create Folders',
      icon: Folder
    },
    {
      name: 'Master Document Generation',
      status: 'available',
      description: 'Generate comprehensive documents from your knowledge base data',
      action: 'Generate Master Doc',
      icon: FileText
    },
    {
      name: 'Auto-Sync to Drive',
      status: driveStatus.syncEnabled ? 'active' : 'available',
      description: 'Automatically sync knowledge base updates to Google Drive documents',
      action: 'Enable Auto-Sync',
      icon: Sync
    }
  ];

  const masterDocumentTypes = [
    {
      id: 'professional-knowledge',
      title: 'Professional Knowledge Compilation',
      description: 'Comprehensive document containing all professional content, organized by topics and categories',
      icon: FileText,
      estimatedPages: 45,
      lastGenerated: null,
      status: 'ready'
    },
    {
      id: 'source-catalog',
      title: 'Complete Source Catalog',
      description: 'Detailed catalog of all sources with descriptions, metadata, and categorization',
      icon: Database,
      estimatedPages: 12,
      lastGenerated: null,
      status: 'ready'
    },
    {
      id: 'authority-records',
      title: 'Authority Records Reference',
      description: 'Canonical data reference guide with all authority records and aliases',
      icon: Shield,
      estimatedPages: 8,
      lastGenerated: null,
      status: 'ready'
    }
  ];

  const generateMasterDocument = async (documentType: string) => {
    console.log(`Generating ${documentType} master document...`);
    
    // In a real implementation, this would:
    // 1. Fetch all relevant data from Taskade projects
    // 2. Use AI to compile and format the document
    // 3. Create the document in Google Drive
    // 4. Update the status and metadata
    
    // Simulate document generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update the document status
    const updatedTypes = masterDocumentTypes.map(type => 
      type.id === documentType 
        ? { ...type, lastGenerated: new Date().toISOString(), status: 'generated' }
        : type
    );
    
    setDriveStatus(prev => ({ ...prev, masterDocuments: prev.masterDocuments + 1 }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'ready':
      case 'active':
      case 'generated':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'available':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <RefreshCw className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'ready':
      case 'active':
      case 'generated':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'available':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (activeView === 'setup') {
    return <GoogleDriveSetup />;
  }

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20">
        <nav className="flex space-x-2">
          {[
            { id: 'overview', label: 'Integration Overview', icon: Database },
            { id: 'setup', label: 'Setup & Configuration', icon: Settings },
            { id: 'documents', label: 'Master Documents', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeView === 'overview' && (
        <>
          {/* Current Architecture */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-800">Data Storage Architecture</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current: Taskade Storage */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Current: Taskade Projects</h3>
                </div>
                <div className="space-y-2 text-sm text-green-700">
                  <div>• <strong>Link Inbox:</strong> URLs and web content metadata</div>
                  <div>• <strong>Source Registry:</strong> File references and descriptions</div>
                  <div>• <strong>Knowledge Units:</strong> Processed information chunks</div>
                  <div>• <strong>Authority Records:</strong> Canonical data references</div>
                  <div>• <strong>Real-time Updates:</strong> Instant AI processing and storage</div>
                </div>
              </div>

              {/* Planned: Google Drive Integration */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Google Drive Integration</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• <strong>File Storage:</strong> Raw documents and media files</div>
                  <div>• <strong>Master Documents:</strong> Compiled knowledge base exports</div>
                  <div>• <strong>Folder Structure:</strong> Organized /AndriesHub/ hierarchy</div>
                  <div>• <strong>Auto-Sync:</strong> Scheduled document generation</div>
                  <div>• <strong>Backup & Archive:</strong> Long-term storage solution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Drive Integration Features */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-800">Integration Features</h2>
              </div>
              <button
                onClick={() => setActiveView('setup')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Start Setup</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {driveFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className={`rounded-lg p-4 border ${getStatusColor(feature.status)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{feature.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(feature.status)}
                        <button className="flex items-center space-x-2 px-3 py-1 bg-white text-slate-700 rounded border hover:bg-slate-50 transition-colors">
                          <span className="text-sm">{feature.action}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{driveStatus.totalFiles}</p>
              <p className="text-sm text-slate-600">Total Files in Drive</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{driveStatus.processedFiles}</p>
              <p className="text-sm text-slate-600">Processed Files</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{driveStatus.masterDocuments}</p>
              <p className="text-sm text-slate-600">Master Documents</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sync className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {driveStatus.lastSync ? 'Active' : 'Pending'}
              </p>
              <p className="text-sm text-slate-600">Sync Status</p>
            </div>
          </div>
        </>
      )}

      {activeView === 'documents' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-800">Master Document Generation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {masterDocumentTypes.map((docType) => {
              const IconComponent = docType.icon;
              return (
                <div key={docType.id} className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{docType.title}</h3>
                      <p className="text-xs text-slate-500">~{docType.estimatedPages} pages</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">{docType.description}</p>
                  
                  {docType.lastGenerated ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Generated successfully</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Last updated: {new Date(docType.lastGenerated).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                          View in Drive
                        </button>
                        <button 
                          onClick={() => generateMasterDocument(docType.id)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          Regenerate
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => generateMasterDocument(docType.id)}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Generate Document
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Generation Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">📄 Document Generation Process:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• <strong>Data Collection:</strong> Gathers all relevant information from Taskade projects</div>
              <div>• <strong>AI Compilation:</strong> Uses advanced AI to organize and format content professionally</div>
              <div>• <strong>Document Creation:</strong> Generates formatted documents directly in Google Drive</div>
              <div>• <strong>Auto-Update:</strong> Keeps documents current with knowledge base changes</div>
              <div>• <strong>Version Control:</strong> Maintains document history and change tracking</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};