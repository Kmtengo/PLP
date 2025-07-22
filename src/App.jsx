import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PortalLayout from './components/PortalLayout';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Portal Pages
import Today from './pages/Today';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';
import AIInterface from './pages/AIInterface';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Portal Routes */}
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            }
          >
            <Route path="today" element={<Today />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="reports" element={<Reports />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ai" element={<AIInterface />} />
            <Route index element={<Navigate to="today" replace />} />
          </Route>
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;