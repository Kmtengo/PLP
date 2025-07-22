import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Bot, Calendar as CalendarIcon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'meeting' | 'visit' | 'review' | 'deadline' | 'ai-suggestion';
  priority: 'high' | 'medium' | 'low';
  location?: string;
  attendees?: string[];
  description?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Sample events
  const events: Event[] = [
    {
      id: '1',
      title: 'Board Meeting',
      start: '10:00',
      end: '12:00',
      type: 'meeting',
      priority: 'high',
      location: 'KSB Headquarters',
      attendees: ['Dr. Sarah Wanjiku', 'John Kimani', 'Mary Ndungu'],
      description: 'Quarterly review and strategic planning session'
    },
    {
      id: '2',
      title: 'Field Officers Call',
      start: '14:00',
      end: '15:00',
      type: 'meeting',
      priority: 'medium',
      location: 'Virtual',
      attendees: ['Regional Officers'],
      description: 'Weekly coordination and updates'
    },
    {
      id: '3',
      title: 'Mumias Factory Visit',
      start: '09:00',
      end: '16:00',
      type: 'visit',
      priority: 'high',
      location: 'Mumias Sugar Factory',
      attendees: ['Factory Manager', 'Quality Team'],
      description: 'Production review and compliance check'
    },
    {
      id: '4',
      title: 'AI Recommendation: Policy Review',
      start: '11:00',
      end: '12:00',
      type: 'ai-suggestion',
      priority: 'medium',
      description: 'AI suggests reviewing compliance policies based on recent violations'
    },
    {
      id: '5',
      title: 'License Renewal Deadline',
      start: '23:59',
      end: '23:59',
      type: 'deadline',
      priority: 'high',
      description: 'Final deadline for 23 mill license renewals'
    }
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const getEventColor = (event: Event) => {
    if (event.type === 'ai-suggestion') return 'bg-purple-100 border-purple-300 text-purple-800';
    if (event.priority === 'high') return 'bg-red-100 border-red-300 text-red-800';
    if (event.priority === 'medium') return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-green-100 border-green-300 text-green-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users size={16} />;
      case 'visit': return <MapPin size={16} />;
      case 'deadline': return <Clock size={16} />;
      case 'ai-suggestion': return <Bot size={16} />;
      default: return <CalendarIcon size={16} />;
    }
  };

  const todaysEvents = events.filter(event => {
    // Simple filter for today's events (in a real app, you'd compare dates properly)
    return true; // For demo purposes, show all events
  });

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentDate.getMonth() && 
                     today.getFullYear() === currentDate.getFullYear();
      
      const dayEvents = events.slice(0, Math.floor(Math.random() * 3)); // Random events for demo

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-green-50 border-green-300' : 'bg-white'
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-green-700' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded border ${getEventColor(event)} truncate`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Calendar */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 min-w-[140px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus size={16} />
              <span>New Event</span>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bot className="mr-2 text-purple-600" size={20} />
            AI Scheduling Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Optimal Meeting Time</h4>
              <p className="text-sm text-purple-700 mb-3">
                Best time for stakeholder meeting: Tuesday 2:00-4:00 PM
              </p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                Schedule Meeting →
              </button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Travel Optimization</h4>
              <p className="text-sm text-blue-700 mb-3">
                Combine Mumias and Nzoia visits to save 4 hours travel time
              </p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Optimize Route →
              </button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Deadline Alert</h4>
              <p className="text-sm text-green-700 mb-3">
                Schedule license review prep 3 days before deadline
              </p>
              <button className="text-green-600 text-sm font-medium hover:text-green-700">
                Set Reminder →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Today's Schedule */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        
        <div className="space-y-4">
          {todaysEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border-l-4 ${
                event.type === 'ai-suggestion' ? 'border-purple-400 bg-purple-50' :
                event.priority === 'high' ? 'border-red-400 bg-red-50' :
                event.priority === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                'border-green-400 bg-green-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(event.type)}
                  <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                </div>
                {event.type === 'ai-suggestion' && (
                  <Bot className="text-purple-600 flex-shrink-0" size={16} />
                )}
              </div>
              
              <div className="space-y-1 text-xs text-gray-600">
                {event.start !== event.end && (
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{event.start} - {event.end}</span>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {event.attendees && (
                  <div className="flex items-center space-x-1">
                    <Users size={12} />
                    <span>{event.attendees.length} attendees</span>
                  </div>
                )}
              </div>
              
              {event.description && (
                <p className="text-xs text-gray-600 mt-2">{event.description}</p>
              )}
              
              {event.type === 'ai-suggestion' && (
                <div className="mt-3 flex space-x-2">
                  <button className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                    Accept
                  </button>
                  <button className="px-2 py-1 border border-purple-300 text-purple-600 text-xs rounded hover:bg-purple-50">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Schedule Mill Visit
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Book Meeting Room
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Set Compliance Reminder
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Plan Field Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;