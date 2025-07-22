import React, { useState } from 'react';
import { Send, Mic, MicOff, Download, BarChart3, Map, Table } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface QueryTemplate {
  id: string;
  title: string;
  query: string;
  category: 'production' | 'compliance' | 'financial' | 'general';
}

interface AIResponse {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  type: 'text' | 'chart' | 'table' | 'map';
  data?: any;
}

const AIInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [responses, setResponses] = useState<AIResponse[]>([
    {
      id: '1',
      query: 'Show me sugar production by county for the last quarter',
      response: 'Here\'s the sugar production data by county for Q4 2023. Western region leads with 45% of total production, followed by Nyanza at 30%.',
      timestamp: '10:30 AM',
      type: 'chart',
      data: [
        { name: 'Western', production: 15420, target: 14000 },
        { name: 'Nyanza', production: 10280, target: 12000 },
        { name: 'Coast', production: 5140, target: 6000 },
        { name: 'Central', production: 3420, target: 4000 }
      ]
    },
    {
      id: '2',
      query: 'Which farmers are at risk of license revocation?',
      response: 'Based on compliance data, 23 farmers across 4 counties are at risk of license revocation. The main issues are late permit renewals and quality standard violations.',
      timestamp: '10:25 AM',
      type: 'text'
    }
  ]);

  const queryTemplates: QueryTemplate[] = [
    {
      id: '1',
      title: 'Production Overview',
      query: 'Show me sugar production by county for the last quarter',
      category: 'production'
    },
    {
      id: '2',
      title: 'License Status',
      query: 'Which farmers are at risk of license revocation?',
      category: 'compliance'
    },
    {
      id: '3',
      title: 'Revenue Analysis',
      query: 'Compare this season\'s revenue with last year',
      category: 'financial'
    },
    {
      id: '4',
      title: 'Mill Compliance',
      query: 'What\'s the compliance status of all active mills?',
      category: 'compliance'
    },
    {
      id: '5',
      title: 'Market Trends',
      query: 'Analyze current sugar market trends and pricing',
      category: 'financial'
    },
    {
      id: '6',
      title: 'Regional Performance',
      query: 'Which region has the best production efficiency?',
      category: 'production'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Simulate AI processing
    const newResponse: AIResponse = {
      id: Date.now().toString(),
      query: query,
      response: generateAIResponse(query),
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: determineResponseType(query)
    };

    setResponses([newResponse, ...responses]);
    setQuery('');
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('production')) {
      return 'Based on current data, total sugar production this month is 24,847 MT, which represents a 12.5% increase from last month. Western region continues to lead production with Mumias factory operating at 85% capacity.';
    }
    
    if (lowerQuery.includes('compliance')) {
      return 'Current compliance rate stands at 94.2%. There are 23 pending license renewals and 5 mills requiring immediate attention for regulatory violations. I recommend prioritizing Nyanza region facilities.';
    }
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('financial')) {
      return 'Revenue performance shows positive growth with KSh 1.2B generated this quarter, representing an 18.4% increase year-over-year. Levy collection efficiency is at 96.2%.';
    }
    
    return 'I understand your query about the sugar sector. Based on the latest data analysis, I can provide insights across production, compliance, financial performance, and operational metrics. Would you like me to elaborate on any specific aspect?';
  };

  const determineResponseType = (query: string): 'text' | 'chart' | 'table' | 'map' => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || lowerQuery.includes('show')) {
      return 'chart';
    }
    
    if (lowerQuery.includes('table') || lowerQuery.includes('list')) {
      return 'table';
    }
    
    if (lowerQuery.includes('map') || lowerQuery.includes('location')) {
      return 'map';
    }
    
    return 'text';
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop speech recognition
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'production': return 'bg-green-100 text-green-800 border-green-300';
      case 'compliance': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'financial': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderResponse = (response: AIResponse) => {
    switch (response.type) {
      case 'chart':
        return (
          <div className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={response.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="production" fill="#10B981" name="Production (MT)" />
                  <Bar dataKey="target" fill="#E5E7EB" name="Target (MT)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
                <Download size={14} />
                <span>Export Chart</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                <Table size={14} />
                <span>View Data</span>
              </button>
            </div>
          </div>
        );
      
      case 'table':
        return (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Region</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Production</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Target</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-2 text-sm">Western</td><td className="px-4 py-2 text-sm">15,420 MT</td><td className="px-4 py-2 text-sm">14,000 MT</td><td className="px-4 py-2 text-sm text-green-600">Above Target</td></tr>
                <tr><td className="px-4 py-2 text-sm">Nyanza</td><td className="px-4 py-2 text-sm">10,280 MT</td><td className="px-4 py-2 text-sm">12,000 MT</td><td className="px-4 py-2 text-sm text-red-600">Below Target</td></tr>
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant</h1>
          <p className="text-gray-600">Ask questions about sugar sector data and get intelligent insights</p>
          
          {/* Context Indicators */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Production Data: Live</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Financial Data: Updated</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Compliance: Real-time</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {responses.map((response) => (
            <div key={response.id} className="space-y-4">
              {/* User Query */}
              <div className="flex justify-end">
                <div className="max-w-2xl bg-green-600 text-white rounded-lg p-4">
                  <p className="text-sm">{response.query}</p>
                  <p className="text-xs opacity-75 mt-2">{response.timestamp}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      AI
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{response.response}</p>
                      {renderResponse(response)}
                      
                      {/* Follow-up suggestions */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button 
                          onClick={() => setQuery('Tell me more about this data')}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm hover:bg-purple-100 transition-colors"
                        >
                          Tell me more
                        </button>
                        <button 
                          onClick={() => setQuery('Show regional breakdown')}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm hover:bg-purple-100 transition-colors"
                        >
                          Regional breakdown
                        </button>
                        <button 
                          onClick={() => setQuery('Export this data')}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm hover:bg-purple-100 transition-colors"
                        >
                          Export data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {responses.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AI Assistant</h3>
              <p className="text-gray-600 mb-6">Ask me anything about sugar sector data, production metrics, compliance status, or financial performance.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {queryTemplates.slice(0, 6).map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setQuery(template.query)}
                    className="p-4 text-left bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{template.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{template.query}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything about the sugar sector..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                  isListening ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!query.trim()}
              className={`p-3 rounded-lg transition-colors ${
                query.trim()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </form>
          
          {isListening && (
            <div className="mt-3 flex items-center space-x-2 text-red-600">
              <div className="animate-pulse w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-sm">Listening... Speak your question</span>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Query Templates */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Templates</h3>
        
        <div className="space-y-3">
          {queryTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setQuery(template.query)}
              className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 text-sm">{template.title}</h4>
                <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(template.category)}`}>
                  {template.category}
                </span>
              </div>
              <p className="text-gray-600 text-xs">{template.query}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">AI Capabilities</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <BarChart3 size={16} className="text-green-600" />
              <span>Generate charts and visualizations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Table size={16} className="text-blue-600" />
              <span>Create data tables</span>
            </div>
            <div className="flex items-center space-x-2">
              <Map size={16} className="text-orange-600" />
              <span>Location-based insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic size={16} className="text-purple-600" />
              <span>Voice input support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterface;