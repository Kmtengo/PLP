import React, { useState } from 'react';
import { 
  FileText, Download, Filter, Search, Calendar,
  TrendingUp, DollarSign, Shield, BarChart3,
  Clock, CheckCircle, AlertCircle, FileSpreadsheet
} from 'lucide-react';
import { reportsData } from '../data/mockData';

const ReportCard = ({ report }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'draft': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-ksb-green mr-2" />
          <h3 className="font-semibold text-gray-800">{report.title}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusColor(report.status)}`}>
          {getStatusIcon(report.status)}
          <span className="ml-1">{report.status}</span>
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Generated on {report.date}</p>
      <div className="flex items-center justify-between">
        <button className="text-ksb-green hover:text-ksb-light-green text-sm font-medium">
          View Report
        </button>
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="w-4 h-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FileSpreadsheet className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CategorySection = ({ category }) => {
  const getCategoryIcon = (name) => {
    if (name.includes('Operational')) return <BarChart3 className="w-5 h-5" />;
    if (name.includes('Financial')) return <DollarSign className="w-5 h-5" />;
    if (name.includes('Compliance')) return <Shield className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        {getCategoryIcon(category.name)}
        <h2 className="text-xl font-bold text-gray-800 ml-2">{category.name}</h2>
        <span className="ml-3 text-sm text-gray-500">({category.reports.length} reports)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <button className="btn-primary">
          Generate Custom Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Reports</p>
              <p className="text-2xl font-bold">{reportsData.categories.reduce((acc, cat) => acc + cat.reports.length, 0)}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Ready Reports</p>
              <p className="text-2xl font-bold">
                {reportsData.categories.reduce((acc, cat) => 
                  acc + cat.reports.filter(r => r.status === 'ready').length, 0
                )}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="card bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Processing</p>
              <p className="text-2xl font-bold">
                {reportsData.categories.reduce((acc, cat) => 
                  acc + cat.reports.filter(r => r.status === 'processing').length, 0
                )}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Categories</p>
              <p className="text-2xl font-bold">{reportsData.categories.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksb-green focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksb-green focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="operational">Operational</option>
              <option value="financial">Financial</option>
              <option value="compliance">Compliance</option>
            </select>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksb-green focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <button className="flex items-center text-ksb-green hover:text-ksb-light-green font-medium">
            <Filter className="w-5 h-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div>
        {reportsData.categories.map((category, index) => (
          <CategorySection key={index} category={category} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card mt-8">
        <h3 className="font-bold text-gray-800 mb-4">Recent Report Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Monthly Production Summary generated</p>
                <p className="text-xs text-gray-500">2 hours ago by System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Revenue Analysis Q4 2023 viewed</p>
                <p className="text-xs text-gray-500">5 hours ago by John Mwangi</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Compliance Report draft updated</p>
                <p className="text-xs text-gray-500">1 day ago by Sarah Wanjiru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;