# Kenya Sugar Board (KSB) Executive Portal

A comprehensive web application for top-level KSB executives to manage and monitor the sugar sector with AI-powered insights, real-time analytics, and streamlined operations.

## Features

### Authentication
- Secure login and signup pages
- Session management with local storage
- Protected routes for authenticated users

### Executive Portal Pages

1. **Today Page** - AI-powered daily briefing with:
   - Personalized morning insights
   - Key performance metrics
   - Critical alerts and recommendations
   - Upcoming meetings
   - Market prices

2. **Chat Page** - Real-time messaging with:
   - Group and direct conversations
   - File attachments support
   - Online status indicators
   - Message history

3. **Calendar Page** - Schedule management with:
   - Monthly calendar view
   - Event creation and management
   - Task tracking
   - Meeting scheduling

4. **Reports Page** - Comprehensive reporting with:
   - Operational, Financial, and Compliance reports
   - Report filtering and search
   - Export capabilities
   - Recent activity tracking

5. **Dashboard Page** - Visual analytics with:
   - KPI cards with trends
   - Production charts
   - Regional performance metrics
   - Compliance overview

6. **AI Interface Page** - Interactive AI assistant with:
   - Natural language queries
   - Voice input support
   - Pre-built query templates
   - Visual responses with charts and tables

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ksb-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Default Login Credentials

Use these credentials to access the executive portal:

```
Email: executive@ksb.go.ke
Password: KSB2024exec!
```

## Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Project Structure

```
ksb-platform/
├── public/
│   └── ksb-logo.svg
├── src/
│   ├── components/
│   │   ├── PortalLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Today.jsx
│   │   ├── Chat.jsx
│   │   ├── Calendar.jsx
│   │   ├── Reports.jsx
│   │   ├── Dashboard.jsx
│   │   └── AIInterface.jsx
│   ├── utils/
│   │   ├── auth.js
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Development

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## License

This project is proprietary to the Kenya Sugar Board.

## Support

For support and inquiries, please contact the KSB IT Department.
