# KSB Executive Portal

A comprehensive web application for the Kenya Sugar Board (KSB) Executive Portal featuring AI-powered insights, real-time dashboards, and streamlined sugar sector management.

## Features

### Authentication
- **Login Page**: Secure login with demo credentials
- **Signup Page**: User registration with role selection
- **Protected Routes**: Authentication-based access control

### Portal Pages
- **Today Page**: AI-powered daily briefings with smart cards and executive insights
- **Chat Page**: Smart messaging with stakeholder groups and AI assistance
- **Calendar Page**: AI-recommended scheduling and event management
- **Dashboard Page**: Real-time KPIs, charts, and stakeholder location mapping
- **Reports Page**: Categorized reports with filtering and download capabilities
- **AI Interface Page**: Natural language queries with visual responses

## Demo Credentials

Use these credentials to access the portal:
- **Email**: executive@ksb.go.ke
- **Password**: ksb2024

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: React Context API

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout with sidebar navigation
│   ├── Logo.tsx        # KSB logo component
│   └── ProtectedRoute.tsx # Route protection wrapper
├── context/            # React Context providers
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Main application pages
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Registration page
│   ├── Today.tsx       # AI-powered dashboard
│   ├── Chat.tsx        # Messaging interface
│   ├── Calendar.tsx    # Event scheduling
│   ├── Dashboard.tsx   # Executive dashboard
│   ├── Reports.tsx     # Report management
│   └── AIInterface.tsx # AI chat interface
├── types/              # TypeScript type definitions
│   └── auth.ts         # Authentication types
└── App.tsx             # Main application component
```

## Key Features

### AI-Powered Insights
- Morning briefings with personalized recommendations
- Natural language query interface
- Predictive analytics and trend analysis
- Smart scheduling optimization

### Executive Dashboard
- Real-time production metrics
- Financial performance indicators
- Compliance monitoring
- Stakeholder location mapping

### Smart Communication
- Categorized messaging groups
- AI-assisted responses
- Priority-based message routing
- Integrated voice support

### Comprehensive Reporting
- Operational, financial, compliance, and KPI reports
- Advanced filtering and search capabilities
- Export functionality
- Real-time report generation

## Sugar Sector Management

The platform provides comprehensive tools for managing Kenya's sugar sector:

- **Production Monitoring**: Real-time tracking of sugar mill operations
- **Compliance Management**: License tracking and regulatory oversight
- **Financial Analysis**: Revenue monitoring and performance metrics
- **Stakeholder Coordination**: Communication tools for farmers, mills, and dealers

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is developed for the Kenya Sugar Board and is not open source.

## Support

For technical support or questions about the platform, contact the KSB IT department.
