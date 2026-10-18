import * as React from 'react';
import { Brain, Calendar, Tag, User, ExternalLink } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  category: 'professional' | 'personal';
  subcategories: string[];
  date: string;
  entities: string[];
  preview: string;
  confidence: number;
}

export const KnowledgeBasePreview: React.FC = () => {
  const [knowledgeItems, setKnowledgeItems] = React.useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch knowledge base items
  React.useEffect(() => {
    const fetchKnowledgeItems = async () => {
      try {
        const response = await fetch('/api/taskade/projects/pCJwqJ3XQTSi9vTL/nodes');
        if (response.ok) {
          const data = await response.json();
          const items = data.payload?.nodes?.map((node: any) => ({
            id: node.id,
            title: node.fieldValues['/text'] || 'Untitled',
            category: node.fieldValues['/attributes/@inf14'] || 'professional',
            subcategories: node.fieldValues['/attributes/@inf15']?.split(',') || [],
            date: node.fieldValues['/attributes/@inf07'] || new Date().toISOString(),
            entities: node.fieldValues['/attributes/@inf04']?.split(',') || [],
            preview: node.fieldValues['/attributes/@inf03']?.substring(0, 150) + '...' || '',
            confidence: node.fieldValues['/attributes/@inf10'] || 0.8
          })) || [];
          setKnowledgeItems(items);
        }
      } catch (error) {
        console.error('Error fetching knowledge items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeItems();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Knowledge Base Preview</h2>
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
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Knowledge Base Preview</h2>
        </div>
        <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          <span>View All</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {knowledgeItems.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <Brain className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">No Knowledge Items Yet</h3>
          <p>Start adding files and links to build your knowledge base.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {knowledgeItems.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.category === 'professional' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {Math.round(item.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{item.preview}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  {item.entities.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{item.entities.slice(0, 2).join(', ')}</span>
                    </div>
                  )}
                </div>
                {item.subcategories.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.subcategories[0]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};