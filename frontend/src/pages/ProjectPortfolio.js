import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Calendar,
  BarChart3,
  User,
  Database,
  Server,
  Shield,
  Smartphone,
  ArrowRight,
  Code,
  Zap,
  Lock,
  Bell,
  Filter,
  Layout,
  GitBranch,
  Globe
} from 'lucide-react';
import './ProjectPortfolio.css';

/* ─── Inline SVG mockups ─── */
const DashboardMockup = () => (
  <div className="mockup-preview">
    <div className="mp-topbar">
      <span className="mp-logo">⬛ TâcheFlow</span>
      <div className="mp-nav">
        <span className="mp-nav-item active">Dashboard</span>
        <span className="mp-nav-item">Project</span>
        <span className="mp-nav-item">Docs</span>
      </div>
    </div>
    <div className="mp-body">
      <div className="mp-welcome">
        <span className="mp-welcome-title">Good morning, Student 👋</span>
        <span className="mp-welcome-sub">You have 4 tasks due this week</span>
      </div>
      <div className="mp-stats-row">
        <div className="mp-stat purple"><span className="mp-stat-num">12</span><span className="mp-stat-lbl">Total</span></div>
        <div className="mp-stat orange"><span className="mp-stat-num">4</span><span className="mp-stat-lbl">Pending</span></div>
        <div className="mp-stat green"><span className="mp-stat-num">8</span><span className="mp-stat-lbl">Done</span></div>
      </div>
      <div className="mp-filters">
        <span className="mp-filter-btn active">All</span>
        <span className="mp-filter-btn">Pending</span>
        <span className="mp-filter-btn">Completed</span>
        <span className="mp-filter-btn">Overdue</span>
      </div>
      <div className="mp-tasks">
        <div className="mp-task done"><span className="mp-dot green"></span><span className="mp-task-title">Complete React Project</span><span className="mp-badge green">Done</span></div>
        <div className="mp-task"><span className="mp-dot orange"></span><span className="mp-task-title">Study for Midterm Exam</span><span className="mp-badge orange">Today</span></div>
        <div className="mp-task"><span className="mp-dot red"></span><span className="mp-task-title">Submit Lab Report</span><span className="mp-badge red">Overdue</span></div>
      </div>
    </div>
  </div>
);

const TaskFormMockup = () => (
  <div className="mockup-preview">
    <div className="mp-topbar">
      <span className="mp-logo">⬛ TâcheFlow</span>
    </div>
    <div className="mp-body">
      <div className="mp-modal-overlay">
        <div className="mp-modal">
          <div className="mp-modal-header">
            <span>Create New Task</span>
            <span className="mp-close">✕</span>
          </div>
          <div className="mp-field">
            <label>Task Title</label>
            <div className="mp-input filled">Prepare presentation slides</div>
          </div>
          <div className="mp-field">
            <label>Description</label>
            <div className="mp-textarea">Cover chapters 4–6, include diagrams…</div>
          </div>
          <div className="mp-field">
            <label>Due Date</label>
            <div className="mp-input">2025-06-15</div>
          </div>
          <div className="mp-modal-actions">
            <span className="mp-btn-sec">Cancel</span>
            <span className="mp-btn-pri">Save Task</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AuthMockup = () => (
  <div className="mockup-preview auth-mockup">
    <div className="mp-auth-bg">
      <div className="mp-auth-card">
        <div className="mp-auth-icon">⬛</div>
        <div className="mp-auth-title">Welcome back</div>
        <div className="mp-auth-sub">Sign in to TâcheFlow</div>
        <div className="mp-auth-field">
          <label>Email</label>
          <div className="mp-input">student@university.edu</div>
        </div>
        <div className="mp-auth-field">
          <label>Password</label>
          <div className="mp-input">••••••••••</div>
        </div>
        <div className="mp-btn-pri full">Sign In</div>
        <div className="mp-auth-link">Don't have an account? <span>Register</span></div>
      </div>
    </div>
  </div>
);

const ProjectPortfolio = () => {
  const features = [
    {
      icon: <CheckSquare size={24} />,
      title: 'Smart Task Management',
      description:
        'Create, edit, and delete tasks with a title, description, and due date. One-click status toggling between pending and completed.'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Due Date Intelligence',
      description:
        'Colour-coded badges automatically classify tasks as Overdue, Today, Tomorrow, Soon, or Normal so priority is always obvious.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Live Progress Analytics',
      description:
        'Dashboard stat cards update in real time, showing total tasks, pending count, completed count, and overdue alerts.'
    },
    {
      icon: <Filter size={24} />,
      title: 'One-Click Filtering',
      description:
        'Filter your task list by All, Pending, Completed, or Overdue with animated pill buttons — no page reload needed.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Secure Authentication',
      description:
        'JWT-based login and registration with bcrypt password hashing. Tokens persist across sessions so you stay logged in.'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Fully Responsive',
      description:
        'Fluid layouts built with CSS Grid and Flexbox look great on any screen size — from a 4-inch phone to a 4K monitor.'
    }
  ];

  const techStack = [
    {
      category: 'Frontend',
      icon: <Code size={20} />,
      technologies: ['React 18', 'React Router v6', 'Context API', 'CSS3 (Grid & Flexbox)', 'Lucide Icons']
    },
    {
      category: 'Backend',
      icon: <Server size={20} />,
      technologies: ['Node.js', 'Express.js', 'JWT (jsonwebtoken)', 'bcryptjs', 'CORS middleware']
    },
    {
      category: 'Database',
      icon: <Database size={20} />,
      technologies: ['MongoDB', 'Mongoose ODM', 'Schema validation', 'Indexed queries']
    },
    {
      category: 'Tooling',
      icon: <Zap size={20} />,
      technologies: ['Git & GitHub', 'npm workspaces', 'Postman', 'VS Code', 'React Hot Toast']
    }
  ];

  const screenshots = [
    {
      title: 'Dashboard',
      description:
        'Live stat cards, colour-coded filters, and a responsive task grid — everything at a glance.',
      mockup: <DashboardMockup />
    },
    {
      title: 'Task Form',
      description:
        'Smooth modal overlay with blurred backdrop for creating and editing tasks without leaving the page.',
      mockup: <TaskFormMockup />
    },
    {
      title: 'Authentication',
      description:
        'Clean, minimal login and registration pages with gradient backgrounds and form validation.',
      mockup: <AuthMockup />
    }
  ];

  return (
    <div className="project-portfolio">
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <GitBranch size={14} />
                Full-Stack Web Application
              </div>
              <h1 className="hero-title">
                <CheckSquare size={44} className="hero-icon" />
                TâcheFlow
              </h1>
              <p className="hero-subtitle">Smart Task Management for Students</p>
              <p className="hero-description">
                A production-quality task manager built end-to-end with React and Node.js.
                TâcheFlow gives students a clean, fast way to track their academic workload
                with intelligent due-date awareness and a dashboard that shows progress at a glance.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-large">
                  Try TâcheFlow Free
                  <ArrowRight size={20} />
                </Link>
                <Link to="/documentation" className="btn btn-outline btn-large">
                  Read the Docs
                </Link>
              </div>
            </div>

            <div className="hero-image">
              <div className="app-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-title">TâcheFlow · Dashboard</div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-stats">
                    <div className="stat-card"><h3>12</h3><p>Active Tasks</p></div>
                    <div className="stat-card"><h3>8</h3><p>Completed</p></div>
                    <div className="stat-card"><h3>67%</h3><p>Progress</p></div>
                  </div>
                  <div className="mockup-tasks">
                    <div className="task-item"><span className="task-dot completed"></span><span>Complete React Project</span></div>
                    <div className="task-item"><span className="task-dot pending"></span><span>Study for Midterm Exam</span></div>
                    <div className="task-item"><span className="task-dot overdue"></span><span>Submit Lab Report</span></div>
                    <div className="task-item"><span className="task-dot pending"></span><span>Review lecture notes</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Everything a student needs to stay on top of their workload</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <h2>Technology Stack</h2>
            <p>Built with the MERN stack — the same tech used in production at scale</p>
          </div>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div key={i} className="tech-card">
                <div className="tech-header">
                  <div className="tech-icon">{t.icon}</div>
                  <h3>{t.category}</h3>
                </div>
                <ul className="tech-list">
                  {t.technologies.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section className="screenshots-section">
        <div className="container">
          <div className="section-header">
            <h2>Application Preview</h2>
            <p>A walkthrough of TâcheFlow's three core screens</p>
          </div>
          <div className="screenshots-grid">
            {screenshots.map((s, i) => (
              <div key={i} className="screenshot-card">
                <div className="screenshot-image">{s.mockup}</div>
                <div className="screenshot-content">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><div className="stat-number">MERN</div><div className="stat-label">Full-Stack Architecture</div></div>
            <div className="stat-item"><div className="stat-number">15+</div><div className="stat-label">React Components</div></div>
            <div className="stat-item"><div className="stat-number">8</div><div className="stat-label">REST API Endpoints</div></div>
            <div className="stat-item"><div className="stat-number">100%</div><div className="stat-label">Responsive Design</div></div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Organised?</h2>
            <p>
              Create a free account and start managing your academic tasks in under a minute.
              No credit card, no setup — just log in and go.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Start Using TâcheFlow
                <ArrowRight size={20} />
              </Link>
              <Link to="/portfolio" className="btn btn-outline btn-large">
                About the Developer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPortfolio;
