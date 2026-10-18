import * as React from 'react';
import { Brain, Search, Filter, Plus, FileText, Calendar, Tag, User, ExternalLink } from 'lucide-react';

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

export const KnowledgeBaseManager: React.FC = () => {
  const [knowledgeItems, setKnowledgeItems] = React.useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

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

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">Knowledge Base</h2>
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
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">Knowledge Base</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Content</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="all">All Categories</option>
          <option value="professional">Professional</option>
          <option value="personal">Personal</option>
        </select>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Knowledge Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          {knowledgeItems.length === 0 ? (
            <>
              <Brain className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">No Knowledge Items Yet</h3>
              <p>Start adding files and links to build your knowledge base.</p>
            </>
          ) : (
            <>
              <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">No Results Found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-800 text-lg line-clamp-1">{item.title}</h3>
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
              
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{item.preview}</p>
              
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
                <div className="flex items-center space-x-2">
                  {item.subcategories.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{item.subcategories[0]}</span>
                    </div>
                  )}
                  <button className="text-blue-600 hover:text-blue-700">
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {knowledgeItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{knowledgeItems.length}</p>
              <p className="text-sm text-slate-600">Total Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {knowledgeItems.filter(item => item.category === 'professional').length}
              </p>
              <p className="text-sm text-slate-600">Professional</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {knowledgeItems.filter(item => item.category === 'personal').length}
              </p>
              <p className="text-sm text-slate-600">Personal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(knowledgeItems.reduce((acc, item) => acc + item.confidence, 0) / knowledgeItems.length * 100)}%
              </p>
              <p className="text-sm text-slate-600">Avg Confidence</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};