import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, MapPin, Activity,
  BarChart3, PieChart, Map, Filter
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardData } from '../data/mockData';

const KPICard = ({ kpi }) => {
  const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = kpi.trend === 'up' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600">{kpi.title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {kpi.value.toLocaleString()}
            <span className="text-sm font-normal text-gray-600 ml-1">{kpi.unit}</span>
          </p>
        </div>
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{kpi.change}%</span>
        </div>
      </div>
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={kpi.sparkline.map((value, index) => ({ value, index }))}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={kpi.trend === 'up' ? '#10b981' : '#ef4444'} 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const COLORS = ['#2D5016', '#4A7C28', '#F7DC6F', '#8B4513'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksb-green focus:border-transparent"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn-primary">
            Export Dashboard
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardData.kpis.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Production Trends */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Production Trends
            </h2>
            <button className="text-gray-500 hover:text-gray-700">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.productionTrends.labels.map((month, index) => ({
                month,
                2023: dashboardData.productionTrends.datasets[0].data[index],
                2024: dashboardData.productionTrends.datasets[1].data[index]
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="2023" stroke="#8B4513" strokeWidth={2} />
                <Line type="monotone" dataKey="2024" stroke="#2D5016" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Regional Distribution
            </h2>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ksb-green focus:border-transparent"
            >
              <option value="all">All Metrics</option>
              <option value="production">Production</option>
              <option value="farmers">Farmers</option>
              <option value="compliance">Compliance</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={dashboardData.regionalData.map(region => ({
                    name: region.region,
                    value: region.production
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Regional Performance Table */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Map className="w-5 h-5 mr-2" />
          Regional Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Region</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Production (Tons)</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Active Farmers</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Compliance Rate</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.regionalData.map((region, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{region.region}</td>
                  <td className="py-3 px-4 text-right">{region.production.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{region.farmers.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{region.compliance}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      region.compliance >= 95 ? 'bg-green-100 text-green-800' :
                      region.compliance >= 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {region.compliance >= 95 ? 'Excellent' :
                       region.compliance >= 90 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4">Top Performing Mills</h3>
          <div className="space-y-3">
            {['Mumias Sugar Mill', 'Nzoia Sugar Mill', 'West Kenya Sugar'].map((mill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{mill}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-ksb-green h-2 rounded-full" 
                      style={{ width: `${85 - index * 5}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{85 - index * 5}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4">Compliance Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">License Renewals</span>
              <span className="text-sm font-medium text-green-600">98% Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Quality Standards</span>
              <span className="text-sm font-medium text-yellow-600">92% Compliant</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Environmental Regulations</span>
              <span className="text-sm font-medium text-green-600">96% Compliant</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Safety Standards</span>
              <span className="text-sm font-medium text-red-600">88% Compliant</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-ksb-green">156</p>
              <p className="text-xs text-gray-600">New Farmers This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">23</p>
              <p className="text-xs text-gray-600">Pending Licenses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">7</p>
              <p className="text-xs text-gray-600">Mills Under Review</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">KES 2.4M</p>
              <p className="text-xs text-gray-600">Daily Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;