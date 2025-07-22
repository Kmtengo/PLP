import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Users, 
  MapPin,
  Clock,
  Award,
  MessageSquare,
  BarChart3,
  Sun,
  CloudRain
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'orange' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, color }) => {
  const colors = {
    green: 'bg-green-50 border-green-200 text-green-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    red: 'bg-red-50 border-red-200 text-red-700'
  };

  const trendIcon = trend === 'up' ? <TrendingUp size={16} /> : trend === 'down' ? <TrendingDown size={16} /> : null;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <div className={`rounded-lg border-2 p-6 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${trendColor}`}>
          {trendIcon}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

const Today: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, Dr. Munyua</h1>
            <p className="text-green-100 mb-4">Here's your AI-powered briefing for today</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{currentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{currentDate}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Sun size={20} />
              <span className="text-lg font-semibold">26°C</span>
            </div>
            <p className="text-green-100 text-sm">Nairobi</p>
          </div>
        </div>
      </div>

      {/* AI Morning Briefing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <BarChart3 className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Morning Briefing</h2>
            <p className="text-sm text-gray-500">Generated at 6:00 AM • Priority: High</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 font-medium mb-2">Key Insight:</p>
            <p className="text-blue-700 text-sm">Sugar production in Western region shows 15% increase this month. Mumias Sugar Factory has resumed operations with 85% capacity utilization.</p>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-yellow-800 font-medium mb-2">Action Required:</p>
            <p className="text-yellow-700 text-sm">License renewal deadline approaching for 23 mills. Compliance team recommends priority review for Nyanza region facilities.</p>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <p className="text-green-800 font-medium mb-2">Opportunity:</p>
            <p className="text-green-700 text-sm">Market prices favorable for export. Recommend engaging with 5 top-performing mills for increased production targets.</p>
          </div>
        </div>
      </div>

      {/* Smart Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Production Pulse"
          value="2,847 MT"
          change="+12.5%"
          trend="up"
          icon={<TrendingUp className="text-green-600" size={24} />}
          color="green"
        />
        
        <MetricCard
          title="Financial Health"
          value="KSh 89.2M"
          change="+8.3%"
          trend="up"
          icon={<DollarSign className="text-blue-600" size={24} />}
          color="blue"
        />
        
        <MetricCard
          title="Compliance Radar"
          value="94.2%"
          change="-2.1%"
          trend="down"
          icon={<Award className="text-orange-600" size={24} />}
          color="orange"
        />
        
        <MetricCard
          title="Active Stakeholders"
          value="1,247"
          change="+15"
          trend="up"
          icon={<Users className="text-green-600" size={24} />}
          color="green"
        />
      </div>

      {/* AI Recommendations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="mr-2 text-purple-600" size={20} />
            AI Recommendations
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="text-red-500 mt-1" size={16} />
              <div>
                <p className="font-medium text-gray-900 text-sm">Visit Mumias Region</p>
                <p className="text-gray-600 text-xs mt-1">15% production drop detected. Recommend field inspection within 7 days.</p>
                <button className="text-green-600 text-xs font-medium mt-2 hover:text-green-700">
                  Schedule Visit →
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <AlertTriangle className="text-yellow-500 mt-1" size={16} />
              <div>
                <p className="font-medium text-gray-900 text-sm">Policy Review Required</p>
                <p className="text-gray-600 text-xs mt-1">23% increase in compliance violations. Review regulatory framework.</p>
                <button className="text-green-600 text-xs font-medium mt-2 hover:text-green-700">
                  View Details →
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <CloudRain className="text-blue-500 mt-1" size={16} />
              <div>
                <p className="font-medium text-gray-900 text-sm">Weather Alert</p>
                <p className="text-gray-600 text-xs mt-1">Drought conditions expected. Prepare mitigation for Western region.</p>
                <button className="text-green-600 text-xs font-medium mt-2 hover:text-green-700">
                  View Forecast →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule & Market Intelligence */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="mr-2 text-blue-600" size={20} />
              Today's Schedule
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Board Meeting</p>
                  <p className="text-gray-600 text-xs">10:00 AM - 12:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Field Officers Call</p>
                  <p className="text-gray-600 text-xs">2:00 PM - 3:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Stakeholder Review</p>
                  <p className="text-gray-600 text-xs">4:00 PM - 5:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Intelligence */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-green-600" size={20} />
              Market Intelligence
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Local Sugar Price</span>
                <span className="text-sm font-bold text-green-600">KSh 145/kg ↑</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Export Price</span>
                <span className="text-sm font-bold text-blue-600">$680/MT ↑</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Import Volume</span>
                <span className="text-sm font-bold text-orange-600">12,500 MT ↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;