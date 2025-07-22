import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, AlertCircle, AlertTriangle, 
  Info, Calendar, DollarSign, Users, CheckCircle,
  ArrowRight, Clock, MapPin, Star
} from 'lucide-react';
import { todayData } from '../data/mockData';

const MetricCard = ({ title, value, unit, trend, percentage, period }) => {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <div className="card hover:scale-105 transition-transform">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <span className="text-xs text-gray-500">{period}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {typeof value === 'number' ? value.toLocaleString() : value}
            <span className="text-sm font-normal text-gray-600 ml-1">{unit}</span>
          </p>
          <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            <span>{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertCard = ({ alert }) => {
  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getAlertStyles(alert.type)}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getAlertIcon(alert.type)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{alert.title}</h4>
          <p className="text-sm mt-1">{alert.message}</p>
          <p className="text-xs mt-2 opacity-75">{alert.time}</p>
        </div>
      </div>
    </div>
  );
};

const RecommendationCard = ({ recommendation }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="card flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(recommendation.priority)}`}>
            {recommendation.priority.toUpperCase()}
          </span>
          <Star className="w-4 h-4 text-yellow-500 ml-2" />
        </div>
        <h4 className="font-semibold text-gray-800">{recommendation.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
      </div>
      <button className="ml-4 px-4 py-2 bg-ksb-green text-white rounded-lg hover:bg-ksb-light-green transition-colors text-sm">
        {recommendation.action}
      </button>
    </div>
  );
};

const Today = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const { briefing, metrics, alerts, recommendations, upcomingMeetings, marketPrices } = todayData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Good Morning, John</h1>
        <p className="text-gray-600 mt-2">Here's your AI-powered daily briefing for {briefing.generatedAt}</p>
      </div>

      {/* AI Morning Briefing */}
      <div className="card bg-gradient-to-r from-ksb-green to-ksb-light-green text-white mb-8">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Star className="w-6 h-6 mr-2" />
            AI Morning Briefing
          </h2>
          <span className="text-sm opacity-75">Generated at 6:00 AM</span>
        </div>
        <p className="mb-4 leading-relaxed">{briefing.summary}</p>
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Key Highlights:</h3>
          {briefing.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Key Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Sugar Production"
            value={metrics.production.current}
            unit={metrics.production.unit}
            trend={metrics.production.trend}
            percentage={metrics.production.percentage}
            period={metrics.production.period}
          />
          <MetricCard
            title="Revenue"
            value={metrics.revenue.current}
            unit={metrics.revenue.unit}
            trend={metrics.revenue.trend}
            percentage={metrics.revenue.percentage}
            period={metrics.revenue.period}
          />
          <MetricCard
            title="Active Farmers"
            value={metrics.farmers.current}
            unit={metrics.farmers.unit}
            trend={metrics.farmers.trend}
            percentage={metrics.farmers.percentage}
            period={metrics.farmers.period}
          />
          <MetricCard
            title="Compliance Rate"
            value={metrics.compliance.current}
            unit={metrics.compliance.unit}
            trend={metrics.compliance.trend}
            percentage={metrics.compliance.percentage}
            period={metrics.compliance.period}
          />
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Critical Alerts */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Critical Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">AI Recommendations</h2>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Meetings */}
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Meetings
          </h3>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{meeting.title}</p>
                  <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {meeting.attendees}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Prices */}
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Market Prices
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600">Sugar Prices (per kg)</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Retail</span>
                  <div className="flex items-center">
                    <span className="font-semibold">KES {marketPrices.sugar.retail}</span>
                    <span className={`ml-2 text-xs flex items-center ${marketPrices.sugar.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {marketPrices.sugar.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(marketPrices.sugar.change)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wholesale</span>
                  <span className="font-semibold">KES {marketPrices.sugar.wholesale}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600">Molasses (per ton)</h4>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm">Current Price</span>
                <div className="flex items-center">
                  <span className="font-semibold">KES {marketPrices.molasses.price}k</span>
                  <span className={`ml-2 text-xs flex items-center ${marketPrices.molasses.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {marketPrices.molasses.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(marketPrices.molasses.change)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">View Full Production Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">Schedule Field Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">Review Pending Licenses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;