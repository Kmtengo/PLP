import { format, subDays, addDays } from 'date-fns';

// Mock data for the Today page
export const todayData = {
  briefing: {
    generatedAt: format(new Date(), 'MMMM d, yyyy - h:mm a'),
    summary: "Sugar production shows strong performance with 15% increase over last quarter. Western region requires attention due to drought conditions. Compliance rates have improved by 8% following new enforcement measures.",
    highlights: [
      "Record production at Mumias Sugar Mill - 2,500 tons processed yesterday",
      "3 new farmer cooperatives registered in Kisumu County",
      "Pending review: 12 sugar import licenses awaiting approval",
      "Weather alert: Expected rainfall in Busia region next week"
    ]
  },
  
  metrics: {
    production: {
      current: 45832,
      previous: 40832,
      trend: 'up',
      percentage: 12.2,
      unit: 'tons',
      period: 'Last 24h'
    },
    revenue: {
      current: 2450000,
      previous: 2100000,
      trend: 'up',
      percentage: 16.7,
      unit: 'KES',
      period: 'Last 7 days'
    },
    farmers: {
      current: 125432,
      previous: 124850,
      trend: 'up',
      percentage: 0.5,
      unit: 'active',
      period: 'Total'
    },
    compliance: {
      current: 94.5,
      previous: 86.3,
      trend: 'up',
      percentage: 9.5,
      unit: '%',
      period: 'This month'
    }
  },
  
  alerts: [
    {
      id: 1,
      type: 'critical',
      title: 'License Expiry Alert',
      message: '23 miller licenses expiring within 30 days',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Production Drop - Nzoia Mill',
      message: 'Production decreased by 25% compared to last week',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Policy Implementation',
      message: 'Sugar import regulation policy takes effect next Monday',
      time: '1 day ago'
    }
  ],
  
  recommendations: [
    {
      id: 1,
      priority: 'high',
      title: 'Visit Mumias Region',
      description: '15% production drop detected - field inspection recommended',
      action: 'Schedule Visit'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'Review Compliance Reports',
      description: '23% increase in violations in Western region',
      action: 'View Reports'
    },
    {
      id: 3,
      priority: 'low',
      title: 'Drought Mitigation Planning',
      description: 'Prepare contingency plans for affected regions',
      action: 'Create Plan'
    }
  ],
  
  upcomingMeetings: [
    {
      id: 1,
      title: 'Board Review Meeting',
      time: '10:00 AM',
      date: format(new Date(), 'MMM d'),
      attendees: 8
    },
    {
      id: 2,
      title: 'Miller Association Conference',
      time: '2:00 PM',
      date: format(addDays(new Date(), 1), 'MMM d'),
      attendees: 25
    }
  ],
  
  marketPrices: {
    sugar: {
      retail: 145.50,
      wholesale: 132.00,
      trend: 'up',
      change: 2.3
    },
    molasses: {
      price: 45.00,
      trend: 'down',
      change: -1.5
    }
  }
};

// Mock data for chat messages
export const chatData = {
  conversations: [
    {
      id: 1,
      name: 'Regional Managers',
      lastMessage: 'Production report submitted for review',
      time: '10 min ago',
      unread: 3,
      type: 'group'
    },
    {
      id: 2,
      name: 'Sarah Wanjiru',
      role: 'Field Officer - Kisumu',
      lastMessage: 'Farmer registration drive completed successfully',
      time: '1 hour ago',
      unread: 0,
      type: 'direct'
    },
    {
      id: 3,
      name: 'Mill Representatives',
      lastMessage: 'Monthly compliance certificates ready',
      time: '3 hours ago',
      unread: 5,
      type: 'group'
    }
  ],
  
  messages: [
    {
      id: 1,
      sender: 'Sarah Wanjiru',
      content: 'Good morning! The farmer registration drive in Kisumu has been completed.',
      time: '9:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Excellent work! How many new farmers were registered?',
      time: '9:35 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Wanjiru',
      content: 'We registered 156 new farmers across 5 cooperatives. Full report attached.',
      time: '9:38 AM',
      isOwn: false,
      attachment: 'Farmer_Registration_Report_Kisumu.pdf'
    }
  ]
};

// Mock data for calendar
export const calendarData = {
  events: [
    {
      id: 1,
      title: 'Board Meeting',
      date: new Date(),
      time: '10:00 AM - 12:00 PM',
      type: 'meeting',
      location: 'KSB Headquarters',
      attendees: ['CEO', 'CFO', 'Directors']
    },
    {
      id: 2,
      title: 'Field Visit - Mumias',
      date: addDays(new Date(), 2),
      time: '9:00 AM - 5:00 PM',
      type: 'visit',
      location: 'Mumias Sugar Mill',
      notes: 'Quarterly inspection and farmer meeting'
    },
    {
      id: 3,
      title: 'Policy Review Deadline',
      date: addDays(new Date(), 5),
      time: 'All Day',
      type: 'deadline',
      priority: 'high'
    }
  ],
  
  tasks: [
    {
      id: 1,
      title: 'Review Q3 Production Reports',
      dueDate: addDays(new Date(), 1),
      priority: 'high',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Approve Import Licenses',
      dueDate: addDays(new Date(), 3),
      priority: 'medium',
      status: 'in-progress'
    }
  ]
};

// Mock data for reports
export const reportsData = {
  categories: [
    {
      name: 'Operational Reports',
      reports: [
        { id: 1, title: 'Monthly Production Summary', date: '2024-01-15', status: 'ready' },
        { id: 2, title: 'Mill Efficiency Analysis', date: '2024-01-10', status: 'ready' },
        { id: 3, title: 'Supply Chain Performance', date: '2024-01-08', status: 'processing' }
      ]
    },
    {
      name: 'Financial Reports',
      reports: [
        { id: 4, title: 'Revenue Analysis Q4 2023', date: '2024-01-05', status: 'ready' },
        { id: 5, title: 'Levy Collection Report', date: '2024-01-12', status: 'ready' },
        { id: 6, title: 'Cost-Benefit Analysis', date: '2024-01-14', status: 'draft' }
      ]
    },
    {
      name: 'Compliance Reports',
      reports: [
        { id: 7, title: 'License Renewal Status', date: '2024-01-13', status: 'ready' },
        { id: 8, title: 'Violation Trends Analysis', date: '2024-01-11', status: 'ready' }
      ]
    }
  ]
};

// Mock data for dashboard
export const dashboardData = {
  kpis: [
    {
      title: 'Total Production',
      value: 245832,
      unit: 'Tons',
      change: 12.5,
      trend: 'up',
      sparkline: [20, 35, 40, 25, 50, 45, 60, 55, 70, 65, 80, 75]
    },
    {
      title: 'Active Mills',
      value: 48,
      unit: 'Mills',
      change: 2.1,
      trend: 'up',
      sparkline: [45, 46, 45, 47, 46, 48, 47, 48, 48, 47, 48, 48]
    },
    {
      title: 'Registered Farmers',
      value: 125432,
      unit: 'Farmers',
      change: 5.3,
      trend: 'up',
      sparkline: [110000, 112000, 115000, 118000, 120000, 122000, 123000, 124000, 125000, 125432]
    },
    {
      title: 'Compliance Rate',
      value: 94.5,
      unit: '%',
      change: 8.2,
      trend: 'up',
      sparkline: [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 94.5]
    }
  ],
  
  regionalData: [
    { region: 'Western', production: 85000, farmers: 45000, compliance: 92 },
    { region: 'Nyanza', production: 65000, farmers: 35000, compliance: 95 },
    { region: 'Rift Valley', production: 55000, farmers: 28000, compliance: 93 },
    { region: 'Coast', production: 40832, farmers: 17432, compliance: 96 }
  ],
  
  productionTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2023',
        data: [180000, 185000, 190000, 195000, 200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000]
      },
      {
        label: '2024',
        data: [235000, 240000, 245832, null, null, null, null, null, null, null, null, null]
      }
    ]
  }
};