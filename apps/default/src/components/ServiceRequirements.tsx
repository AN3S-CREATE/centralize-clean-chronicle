import * as React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  Shield, 
  Zap,
  Database,
  Brain,
  Link,
  FileText,
  Settings
} from 'lucide-react';

export const ServiceRequirements: React.FC = () => {
  const requiredServices = [
    {
      name: 'Google Drive',
      status: 'required',
      description: 'For file storage and monitoring the /AndriesHub/ folder structure',
      setup: 'Connect your Google Drive account to Taskade',
      cost: 'Free (with existing Google account)',
      icon: Database,
      priority: 'high'
    }
  ];

  const includedServices = [
    {
      name: 'Taskade AI',
      status: 'included',
      description: 'Built-in AI for content analysis and description generation',
      setup: 'Already available in your Taskade workspace',
      cost: 'Included with Taskade subscription',
      icon: Brain,
      priority: 'high'
    },
    {
      name: 'Taskade Projects',
      status: 'included',
      description: 'Data storage for all knowledge base content and metadata',
      setup: 'Automatically created within your Taskade space',
      cost: 'Included with Taskade subscription',
      icon: Database,
      priority: 'high'
    },
    {
      name: 'Taskade Automations',
      status: 'included',
      description: 'Workflow automation for AI processing and content management',
      setup: 'Pre-configured automation workflows',
      cost: 'Included with Taskade subscription',
      icon: Zap,
      priority: 'high'
    },
    {
      name: 'Web Content Extraction',
      status: 'included',
      description: 'Built-in website content extraction for URL processing',
      setup: 'Available through Taskade automation pieces',
      cost: 'Included with Taskade subscription',
      icon: Link,
      priority: 'medium'
    }
  ];

  const optionalServices = [
    {
      name: 'Dropbox (Future)',
      status: 'optional',
      description: 'Additional cloud storage option for file monitoring',
      setup: 'Can be added later if needed',
      cost: 'Optional - only if you want multi-cloud support',
      icon: FileText,
      priority: 'low'
    },
    {
      name: 'OneDrive (Future)',
      status: 'optional',
      description: 'Microsoft cloud storage integration',
      setup: 'Can be added later if needed',
      cost: 'Optional - only if you want multi-cloud support',
      icon: FileText,
      priority: 'low'
    }
  ];

  const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
      case 'required':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'included':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'optional':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'included':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'optional':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-slate-800">Service Requirements</h2>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Minimal External Dependencies</h3>
          </div>
          <p className="text-sm text-green-700">
            The Knowledge Hub is designed to work entirely within the Taskade ecosystem with only 
            <strong> Google Drive integration</strong> required for file monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">1</p>
            <p className="text-sm text-slate-600">Required Service</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">4</p>
            <p className="text-sm text-slate-600">Included Services</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-slate-600">Additional Costs</p>
          </div>
        </div>
      </div>

      {/* Required Services */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-bold text-slate-800 mb-4">🔴 Required External Services</h3>
        
        <div className="space-y-4">
          {requiredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className={`rounded-lg p-4 border ${getStatusColor(service.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6 text-orange-600" />
                    <div>
                      <h4 className="font-semibold text-slate-800">{service.name}</h4>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>
                  </div>
                  <StatusIcon status={service.status} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Setup: </span>
                    <span className="text-slate-600">{service.setup}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Cost: </span>
                    <span className="text-slate-600">{service.cost}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Included Services */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-bold text-slate-800 mb-4">✅ Included with Taskade</h3>
        
        <div className="space-y-4">
          {includedServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className={`rounded-lg p-4 border ${getStatusColor(service.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-slate-800">{service.name}</h4>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>
                  </div>
                  <StatusIcon status={service.status} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Setup: </span>
                    <span className="text-slate-600">{service.setup}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Cost: </span>
                    <span className="text-slate-600">{service.cost}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-800">Quick Setup Guide</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-blue-800">Connect Google Drive</h4>
              <p className="text-sm text-blue-700">Link your Google Drive account to Taskade for file monitoring</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-blue-800">Create Folder Structure</h4>
              <p className="text-sm text-blue-700">Set up the /AndriesHub/ folder structure in your Google Drive</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-green-800">You're Ready!</h4>
              <p className="text-sm text-green-700">All other services are included with Taskade - no additional setup needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-bold text-slate-800 mb-4">💰 Cost Breakdown</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="font-medium text-green-800">Taskade Subscription</span>
            <span className="text-green-600">Already paying</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="font-medium text-green-800">Google Drive (15GB free)</span>
            <span className="text-green-600">Free</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="font-medium text-blue-800">Additional Google Storage (if needed)</span>
            <span className="text-blue-600">$1.99/month for 100GB</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 font-bold">
            <span className="text-slate-800">Total Additional Cost</span>
            <span className="text-green-600">$0 (unless you need more storage)</span>
          </div>
        </div>
      </div>
    </div>
  );
};