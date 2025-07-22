import React, { useState } from 'react';
import { FileText, Download, Eye, Filter, Search, Calendar, TrendingUp } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  category: 'operational' | 'financial' | 'compliance' | 'kpi';
  date: string;
  size: string;
  downloads: number;
  status: 'ready' | 'generating' | 'error';
}

const Reports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Production Summary',
      description: 'Comprehensive production metrics across all regions',
      category: 'operational',
      date: '2024-01-15',
      size: '2.4 MB',
      downloads: 127,
      status: 'ready'
    },
    {
      id: '2',
      title: 'Q4 Financial Performance',
      description: 'Revenue analysis and financial health indicators',
      category: 'financial',
      date: '2024-01-10',
      size: '1.8 MB',
      downloads: 89,
      status: 'ready'
    },
    {
      id: '3',
      title: 'Compliance Violations Report',
      description: 'Detailed analysis of regulatory compliance issues',
      category: 'compliance',
      date: '2024-01-08',
      size: '3.2 MB',
      downloads: 156,
      status: 'ready'
    },
    {
      id: '4',
      title: 'KPI Achievement Dashboard',
      description: 'Strategic objectives performance metrics',
      category: 'kpi',
      date: '2024-01-05',
      size: '1.2 MB',
      downloads: 203,
      status: 'ready'
    },
    {
      id: '5',
      title: 'Sugar Mill Efficiency Analysis',
      description: 'Operational efficiency across all sugar mills',
      category: 'operational',
      date: '2024-01-03',
      size: '4.1 MB',
      downloads: 78,
      status: 'ready'
    },
    {
      id: '6',
      title: 'Real-time Market Intelligence',
      description: 'Current market trends and pricing analysis',
      category: 'financial',
      date: '2024-01-16',
      size: 'Generating...',
      downloads: 0,
      status: 'generating'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Reports', color: 'gray' },
    { id: 'operational', name: 'Operational', color: 'blue' },
    { id: 'financial', name: 'Financial', color: 'green' },
    { id: 'compliance', name: 'Compliance', color: 'orange' },
    { id: 'kpi', name: 'KPI Reports', color: 'purple' }
  ];

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(c => c.id === category);
    const color = categoryObj?.color || 'gray';
    
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'green': return 'bg-green-100 text-green-800 border-green-300';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600';
      case 'generating': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Access and download sector performance reports</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <FileText size={16} />
          <span>Generate Custom Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? `${getCategoryColor(category.id)} border`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">653</p>
              <p className="text-sm text-gray-600">Total Downloads</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12%</p>
              <p className="text-sm text-gray-600">Monthly Growth</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Filter className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{filteredReports.length}</p>
              <p className="text-sm text-gray-600">Filtered Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(report.category)}`}>
                      {categories.find(c => c.id === report.category)?.name}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📅 {formatDate(report.date)}</span>
                    <span>📦 {report.size}</span>
                    <span>⬇️ {report.downloads} downloads</span>
                    <span className={`font-medium ${getStatusColor(report.status)}`}>
                      {report.status === 'ready' ? '✅ Ready' : 
                       report.status === 'generating' ? '⏳ Generating' : '❌ Error'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    report.status === 'ready' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={report.status !== 'ready'}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                
                <button 
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                    report.status === 'ready'
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={report.status !== 'ready'}
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {report.status === 'generating' && (
              <div className="bg-yellow-50 border-t border-yellow-200 px-6 py-3">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                  <span className="text-sm">Generating report... This may take a few minutes.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search criteria or filters.' 
              : 'No reports are available at the moment.'}
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Report Categories Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Operational Reports</h4>
            <p className="text-sm text-blue-700">Production efficiency, supply chain performance, quality control summaries</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Financial Reports</h4>
            <p className="text-sm text-green-700">Revenue performance, levy collection, cost-benefit analysis</p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">Compliance Reports</h4>
            <p className="text-sm text-orange-700">License status, violation analysis, policy compliance rates</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">KPI Reports</h4>
            <p className="text-sm text-purple-700">Strategic objectives, performance benchmarking, efficiency scores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;