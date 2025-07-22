import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Factory, Users, MapPin, Award, AlertTriangle, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample data for charts
  const productionData = [
    { name: 'Jan', production: 2400, target: 2800 },
    { name: 'Feb', production: 1398, target: 2800 },
    { name: 'Mar', production: 9800, target: 2800 },
    { name: 'Apr', production: 3908, target: 2800 },
    { name: 'May', production: 4800, target: 2800 },
    { name: 'Jun', production: 3800, target: 2800 },
    { name: 'Jul', production: 4300, target: 2800 },
  ];

  const regionData = [
    { name: 'Western', value: 45, color: '#10B981' },
    { name: 'Nyanza', value: 30, color: '#3B82F6' },
    { name: 'Coast', value: 15, color: '#F59E0B' },
    { name: 'Central', value: 10, color: '#EF4444' },
  ];

  const complianceData = [
    { name: 'Jan', compliance: 95 },
    { name: 'Feb', compliance: 92 },
    { name: 'Mar', compliance: 88 },
    { name: 'Apr', compliance: 94 },
    { name: 'May', compliance: 96 },
    { name: 'Jun', compliance: 94 },
  ];

  const stakeholderLocations = [
    { id: 1, name: 'Mumias Sugar Factory', type: 'mill', status: 'active', lat: -0.3347, lng: 34.4877, production: 850 },
    { id: 2, name: 'Nzoia Sugar Factory', type: 'mill', status: 'active', lat: 0.7167, lng: 34.7167, production: 620 },
    { id: 3, name: 'Western Farmers Coop', type: 'farmer', status: 'active', lat: -0.4167, lng: 34.5167, members: 1200 },
    { id: 4, name: 'Coast Sugar Dealers', type: 'dealer', status: 'pending', lat: -4.0435, lng: 39.6682, volume: 450 },
    { id: 5, name: 'Kibos Sugar Factory', type: 'mill', status: 'maintenance', lat: -0.0917, lng: 34.7833, production: 0 },
  ];

  const kpiCards = [
    {
      title: 'Total Production',
      value: '24,847 MT',
      change: '+12.5%',
      trend: 'up',
      icon: Factory,
      color: 'green'
    },
    {
      title: 'Active Mills',
      value: '18',
      change: '+2',
      trend: 'up',
      icon: Factory,
      color: 'blue'
    },
    {
      title: 'Registered Farmers',
      value: '12,847',
      change: '+234',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Compliance Rate',
      value: '94.2%',
      change: '-1.8%',
      trend: 'down',
      icon: Award,
      color: 'orange'
    },
    {
      title: 'Revenue Generated',
      value: 'KSh 1.2B',
      change: '+18.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Pending Issues',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600">Real-time insights and sector performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Customize View
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                kpi.color === 'green' ? 'bg-green-100 text-green-600' :
                kpi.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                kpi.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-red-100 text-red-600'
              }`}>
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={16} className={kpi.trend === 'down' ? 'rotate-180' : ''} />
                <span className="ml-1">{kpi.change}</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-sm text-gray-600">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="production" fill="#10B981" name="Actual Production" />
              <Bar dataKey="target" fill="#E5E7EB" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compliance & Map Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="compliance" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stakeholder Map */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stakeholder Locations</h3>
          <div className="h-80 bg-gray-100 rounded-lg relative overflow-hidden">
            {/* Simplified map representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
              <div className="p-4 h-full">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {stakeholderLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        location.status === 'active' ? 'bg-green-50 border-green-200' :
                        location.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}
                      title={location.name}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin size={16} className={
                          location.status === 'active' ? 'text-green-600' :
                          location.status === 'pending' ? 'text-yellow-600' :
                          'text-red-600'
                        } />
                        <span className="text-sm font-medium truncate">{location.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {location.type === 'mill' && `${location.production} MT/month`}
                        {location.type === 'farmer' && `${location.members} members`}
                        {location.type === 'dealer' && `${location.volume} MT capacity`}
                      </div>
                      <div className={`text-xs font-medium mt-1 ${
                        location.status === 'active' ? 'text-green-600' :
                        location.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Issues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Benchmarking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Benchmarking</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Factory className="text-blue-600" size={24} />
            </div>
            <h4 className="font-medium text-gray-900">Industry Standard</h4>
            <p className="text-2xl font-bold text-blue-600">2,500 MT</p>
            <p className="text-sm text-gray-600">Monthly Target</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <h4 className="font-medium text-gray-900">Current Performance</h4>
            <p className="text-2xl font-bold text-green-600">2,847 MT</p>
            <p className="text-sm text-gray-600">+13.9% above target</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="text-orange-600" size={24} />
            </div>
            <h4 className="font-medium text-gray-900">Efficiency Score</h4>
            <p className="text-2xl font-bold text-orange-600">87.2%</p>
            <p className="text-sm text-gray-600">Sector average: 82%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;