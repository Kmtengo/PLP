import React, { useState } from 'react';
import { 
  Send, Mic, MicOff, Bot, User, Sparkles, 
  BarChart3, FileText, TrendingUp, AlertCircle,
  Loader2, Copy, Download, RefreshCw
} from 'lucide-react';

const prebuiltQueries = [
  {
    category: 'Production',
    queries: [
      'Show me sugar production by county for the last quarter',
      'What is the current production capacity utilization?',
      'Compare this season\'s production with last year',
      'Which mills are underperforming this month?'
    ]
  },
  {
    category: 'Compliance',
    queries: [
      'Which farmers are at risk of license revocation?',
      'What\'s the compliance status of all active mills?',
      'Show me pending license renewals',
      'List all compliance violations this month'
    ]
  },
  {
    category: 'Financial',
    queries: [
      'What\'s the revenue trend for the past 6 months?',
      'Show me levy collection efficiency by region',
      'Compare revenue vs budget for Q1',
      'What are the top revenue-generating mills?'
    ]
  },
  {
    category: 'Predictive',
    queries: [
      'Predict next month\'s sugar production',
      'What\'s the drought risk for Western region?',
      'Forecast revenue for the next quarter',
      'Identify farmers likely to default on payments'
    ]
  }
];

const MessageBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start max-w-3xl ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-ksb-green' : 'bg-gradient-to-r from-purple-500 to-pink-500'
          } text-white`}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>
        <div className={`${isUser ? 'bg-ksb-green text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-3`}>
          <p className="text-sm">{message.text}</p>
          {message.chart && (
            <div className="mt-3 bg-white rounded-lg p-4">
              <img src="/api/placeholder/400/200" alt="Chart" className="w-full" />
            </div>
          )}
          {message.table && (
            <div className="mt-3 bg-white rounded-lg p-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Region</th>
                    <th className="text-right py-2 px-3">Production</th>
                    <th className="text-right py-2 px-3">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Western</td>
                    <td className="text-right py-2 px-3">85,000</td>
                    <td className="text-right py-2 px-3 text-green-600">+12%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Nyanza</td>
                    <td className="text-right py-2 px-3">65,000</td>
                    <td className="text-right py-2 px-3 text-green-600">+8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {!isUser && (
            <div className="flex items-center space-x-2 mt-3 text-xs opacity-70">
              <button className="hover:opacity-100">
                <Copy className="w-3 h-3" />
              </button>
              <button className="hover:opacity-100">
                <Download className="w-3 h-3" />
              </button>
              <button className="hover:opacity-100">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AIInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you analyze sugar production data, check compliance status, generate reports, and provide predictive insights. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "Based on your query, here's the sugar production data by county for Q4 2023:",
        isUser: false,
        timestamp: new Date(),
        table: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would go here
  };

  const handleQueryClick = (query) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mr-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AI Assistant</h1>
                <p className="text-sm text-gray-600">Powered by Advanced Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-sm text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isUser={message.isUser} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t px-6 py-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about sugar production, compliance, or analytics..."
                className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ksb-green"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isListening ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-ksb-green text-white p-3 rounded-lg hover:bg-ksb-light-green transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar with Prebuilt Queries */}
      <div className="w-80 bg-white border-l p-6 overflow-y-auto">
        <h2 className="font-bold text-gray-800 mb-4">Quick Queries</h2>
        <div className="space-y-6">
          {prebuiltQueries.map((category, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                {category.category === 'Production' && <BarChart3 className="w-4 h-4 mr-2" />}
                {category.category === 'Compliance' && <AlertCircle className="w-4 h-4 mr-2" />}
                {category.category === 'Financial' && <TrendingUp className="w-4 h-4 mr-2" />}
                {category.category === 'Predictive' && <Sparkles className="w-4 h-4 mr-2" />}
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.queries.map((query, qIndex) => (
                  <button
                    key={qIndex}
                    onClick={() => handleQueryClick(query)}
                    className="w-full text-left text-sm p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Pro Tip</h3>
          <p className="text-sm text-blue-700">
            You can ask follow-up questions to dive deeper into any analysis. Try asking "Why?" or "Show me more details" after receiving a response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInterface;