import * as React from 'react';
import { ProductionHeader } from './ProductionHeader';
import { ProductionOverview } from './ProductionOverview';
import { KnowledgeBaseManager } from './KnowledgeBaseManager';
import { SourceManager } from './SourceManager';
import { AutomationManager } from './AutomationManager';
import { AuthorityManager } from './AuthorityManager';
import { CleanupCenter } from './CleanupCenter';
import { SystemStatus } from './SystemStatus';
import { ServiceRequirements } from './ServiceRequirements';
import { DriveIntegrationStatus } from './DriveIntegrationStatus';
import { VoiceNoteManager } from './VoiceNoteManager';
import { AppTester } from './AppTester';

export const ProductionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const handleTabChange = React.useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ProductionHeader activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content */}
        {activeTab === 'overview' && <ProductionOverview />}
        {activeTab === 'knowledge' && <KnowledgeBaseManager />}
        {activeTab === 'sources' && <SourceManager />}
        {activeTab === 'voice-notes' && <VoiceNoteManager />}
        {activeTab === 'automation' && <AutomationManager />}
        {activeTab === 'authority' && <AuthorityManager />}
        {activeTab === 'cleanup' && <CleanupCenter />}
        {activeTab === 'system' && <SystemStatus />}
        {activeTab === 'requirements' && <ServiceRequirements />}
        {activeTab === 'drive-integration' && <DriveIntegrationStatus />}
        {activeTab === 'app-test' && <AppTester />}
      </div>
    </div>
  );
};