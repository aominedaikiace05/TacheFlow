import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import CalendarView from './pages/CalendarView';
import GradesPage from './pages/GradesPage';
import ProfilePage from './pages/ProfilePage';

// Dark mode context
export const ThemeContext = createContext();

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  return user ? <Navigate to="/dashboard" /> : children;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('darkMode', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <AuthProvider>
        <Router>
          <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/task/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
              <Route path="/grades" element={<ProtectedRoute><GradesPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}

export default App;
