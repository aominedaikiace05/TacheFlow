import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../App';
import api from '../services/api';
import {
  LogOut, CheckSquare, LayoutDashboard, Calendar, Award,
  User, Bell, Moon, Sun, Search, X, Menu
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const res = await api.get('/tasks');
          setTasks(res.data.tasks);
          generateNotifications(res.data.tasks);
        } catch (e) {}
      };
      fetchTasks();
    }
  }, [user, location.pathname]);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const generateNotifications = (taskList) => {
    const now = new Date();
    const notifs = [];

    const overdue = taskList.filter(t => t.status === 'pending' && new Date(t.dueDate) < now);
    overdue.forEach(t => {
      notifs.push({ text: `"${t.title}" is overdue`, type: 'danger', taskId: t._id });
    });

    const today = taskList.filter(t => {
      const d = new Date(t.dueDate);
      return t.status === 'pending' && d.toDateString() === now.toDateString();
    });
    today.forEach(t => {
      notifs.push({ text: `"${t.title}" is due today`, type: 'warning', taskId: t._id });
    });

    const tomorrow = taskList.filter(t => {
      const d = new Date(t.dueDate);
      const tom = new Date(now); tom.setDate(tom.getDate() + 1);
      return t.status === 'pending' && d.toDateString() === tom.toDateString();
    });
    tomorrow.forEach(t => {
      notifs.push({ text: `"${t.title}" is due tomorrow`, type: 'info', taskId: t._id });
    });

    const turnedIn = taskList.filter(t => t.turnedIn);
    turnedIn.forEach(t => {
      notifs.push({ text: `"${t.title}" turned in`, type: 'success', taskId: t._id });
    });

    setNotifications(notifs);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchResults([]); return; }
    const results = tasks.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.subject && t.subject.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(results.slice(0, 5));
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
    { to: '/grades', icon: <Award size={18} />, label: 'Grades' },
    { to: '/profile', icon: <User size={18} />, label: 'Profile' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <CheckSquare size={24} />
          <span>TâcheFlow</span>
        </Link>

        {/* Icons always visible in top bar on mobile */}
        {user && (
          <div className="navbar-top-actions">
            {/* Search */}
            <div className="nav-search-wrapper">
              <button className="nav-icon-btn" onClick={() => setShowSearch(!showSearch)} title="Search">
                <Search size={18} />
              </button>
              {showSearch && (
                <div className="search-dropdown">
                  <div className="search-input-wrap">
                    <Search size={16} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      placeholder="Search tasks..."
                      autoFocus
                    />
                    <button onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults([]); }}><X size={16} /></button>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="search-results">
                      {searchResults.map(t => (
                        <div key={t._id} className="search-result-item" onClick={() => { navigate(`/task/${t._id}`); setShowSearch(false); }}>
                          <span className="sr-title">{t.title}</span>
                          {t.subject && <span className="sr-subject">{t.subject}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="nav-notif-wrapper">
              <button className="nav-icon-btn" onClick={() => setShowNotifs(!showNotifs)} title="Notifications">
                <Bell size={18} />
                {notifications.length > 0 && <span className="notif-badge">{notifications.length}</span>}
              </button>
              {showNotifs && (
                <div className="notif-dropdown">
                  <div className="notif-header">Notifications</div>
                  {notifications.length === 0 ? (
                    <div className="notif-empty">All caught up! 🎉</div>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} className={`notif-item notif-${n.type}`} onClick={() => { navigate(`/task/${n.taskId}`); setShowNotifs(false); }} style={{ cursor: 'pointer' }}>{n.text}</div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Dark mode */}
            <button className="nav-icon-btn" onClick={toggleDarkMode} title={darkMode ? 'Light mode' : 'Dark mode'}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile hamburger button */}
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}

        <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {user && (
            <>
              <div className="navbar-nav">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}>
                    {link.icon} <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Desktop-only actions (hidden on mobile since they're in top bar) */}
              <div className="navbar-actions desktop-only">
                {/* Search */}
                <div className="nav-search-wrapper">
                  <button className="nav-icon-btn" onClick={() => setShowSearch(!showSearch)} title="Search">
                    <Search size={18} />
                  </button>
                </div>

                {/* Notifications */}
                <div className="nav-notif-wrapper">
                  <button className="nav-icon-btn" onClick={() => setShowNotifs(!showNotifs)} title="Notifications">
                    <Bell size={18} />
                    {notifications.length > 0 && <span className="notif-badge">{notifications.length}</span>}
                  </button>
                </div>

                {/* Dark mode */}
                <button className="nav-icon-btn" onClick={toggleDarkMode} title={darkMode ? 'Light mode' : 'Dark mode'}>
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Logout */}
              <div className="navbar-user">
                <button onClick={handleLogout} className="btn btn-secondary navbar-btn">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </>
          )}

          {!user && (
            <div className="navbar-auth">
              <Link to="/login" className="btn btn-secondary navbar-btn">Login</Link>
              <Link to="/register" className="btn btn-primary navbar-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
