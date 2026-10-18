import * as React from 'react';
import { Plus, Link, Upload, RefreshCw, Search, Settings } from 'lucide-react';
import { AddLinkModal } from './AddLinkModal';
import { FileUploadModal } from './FileUploadModal';

interface ActionButtonProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 text-left group"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};

export const QuickActions: React.FC = () => {
  const [showAddLink, setShowAddLink] = React.useState(false);
  const [showFileUpload, setShowFileUpload] = React.useState(false);

  const actions = [
    {
      title: 'Add Link',
      description: 'Submit a URL for processing and knowledge extraction',
      icon: Link,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      onClick: () => setShowAddLink(true)
    },
    {
      title: 'Upload File',
      description: 'Upload documents, PDFs, or other files to process',
      icon: Upload,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      onClick: () => setShowFileUpload(true)
    },
    {
      title: 'Run Processing',
      description: 'Execute the AI pipeline to analyze pending content',
      icon: RefreshCw,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      onClick: () => console.log('Run processing')
    },
    {
      title: 'Search Knowledge',
      description: 'Search through your processed knowledge base',
      icon: Search,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      onClick: () => console.log('Search knowledge')
    },
    {
      title: 'Update Authority',
      description: 'Manage canonical records and authority data',
      icon: Settings,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      onClick: () => console.log('Update authority')
    }
  ];

  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Plus className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
        </div>
        
        <div className="space-y-3">
          {actions.map((action, index) => (
            <ActionButton key={index} {...action} />
          ))}
        </div>
      </div>

      <AddLinkModal 
        isOpen={showAddLink} 
        onClose={() => setShowAddLink(false)} 
      />
      
      <FileUploadModal 
        isOpen={showFileUpload} 
        onClose={() => setShowFileUpload(false)} 
      />
    </>
  );
};