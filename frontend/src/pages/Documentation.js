import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Target,
  Layers,
  Users,
  CheckSquare,
  Database,
  Server,
  Globe,
  Code2,
  Calendar,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Terminal,
  GitBranch,
  Lock,
  Filter
} from 'lucide-react';
import './Documentation.css';

/* Small collapsible API-endpoint component */
const Endpoint = ({ method, path, description, auth, body, response }) => {
  const [open, setOpen] = useState(false);
  const methodColor = {
    GET: '#48bb78', POST: '#667eea', PUT: '#f6ad55', DELETE: '#f56565'
  };
  return (
    <div className="endpoint-card">
      <button className="endpoint-header" onClick={() => setOpen(!open)}>
        <span className="endpoint-method" style={{ background: methodColor[method] }}>
          {method}
        </span>
        <code className="endpoint-path">{path}</code>
        <span className="endpoint-desc">{description}</span>
        <span className="endpoint-toggle">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="endpoint-body">
          {auth && <p className="endpoint-auth"><Lock size={13} /> Requires Bearer token</p>}
          {body && (
            <div className="endpoint-section">
              <span className="endpoint-section-label">Request body</span>
              <pre>{JSON.stringify(body, null, 2)}</pre>
            </div>
          )}
          <div className="endpoint-section">
            <span className="endpoint-section-label">Response</span>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const Documentation = () => {
  const objectives = [
    {
      title: 'Task Management Solution',
      description:
        'Provide students with a focused, distraction-free tool to create, organise, and track their academic tasks with clear due-date awareness.',
      icon: <Target size={20} />
    },
    {
      title: 'MERN Stack Demonstration',
      description:
        'Build a complete full-stack application using React, Express, Node.js, and MongoDB to demonstrate production-grade web development skills.',
      icon: <Code2 size={20} />
    },
    {
      title: 'User Experience First',
      description:
        'Design an interface that feels effortless — with live feedback, colour-coded urgency, smooth animations, and zero friction for common actions.',
      icon: <Smartphone size={20} />
    },
    {
      title: 'Secure by Default',
      description:
        'Implement industry-standard authentication: bcrypt password hashing, JWT session tokens, CORS protection, and secrets via environment variables.',
      icon: <Shield size={20} />
    }
  ];

  const architecture = [
    {
      layer: 'Frontend (React)',
      technologies: ['React 18', 'React Router v6', 'Context API', 'CSS3 Grid/Flex', 'Lucide Icons'],
      description: 'SPA served from Create React App. Routes: /, /login, /register, /dashboard, /project-portfolio, /portfolio, /documentation.',
      icon: <Globe size={24} />
    },
    {
      layer: 'Backend (Node / Express)',
      technologies: ['Node.js', 'Express.js', 'JWT', 'bcryptjs', 'CORS', 'dotenv'],
      description: 'RESTful API running on port 5000. Auth middleware validates Bearer tokens on protected routes. All errors return consistent JSON.',
      icon: <Server size={24} />
    },
    {
      layer: 'Database (MongoDB)',
      technologies: ['MongoDB Atlas', 'Mongoose ODM', 'Schema validation', 'Indexed queries'],
      description: 'Two collections — Users and Tasks — connected via userId foreign key. Mongoose schemas enforce validation before every write.',
      icon: <Database size={24} />
    }
  ];

  const features = [
    {
      feature: 'User Authentication',
      description: 'Registration and login with email + password. Passwords hashed with bcrypt (salt rounds 10). JWTs expire after 7 days.',
      implementation: 'POST /api/auth/register and POST /api/auth/login endpoints; token stored in localStorage via AuthContext.',
      status: 'Completed'
    },
    {
      feature: 'Task CRUD',
      description: 'Create tasks with a title, optional description, and due date. Edit any field inline. Delete with confirmation. Toggle status in one click.',
      implementation: 'Express router at /api/tasks. All routes protected by auth middleware. Data persisted to MongoDB via Mongoose.',
      status: 'Completed'
    },
    {
      feature: 'Live Dashboard Analytics',
      description: 'Stat cards for total, pending, completed, and overdue tasks update instantly when any task is created, edited, or deleted.',
      implementation: 'Counts derived client-side from the tasks array in Dashboard.js — no extra API calls needed.',
      status: 'Completed'
    },
    {
      feature: 'Due-Date Intelligence',
      description: 'Each task badge is automatically coloured: Overdue (red), Today (amber), Tomorrow (blue), Within 7 days (purple), or Normal (grey).',
      implementation: 'getDueDateStatus() utility in TaskCard.js compares task.dueDate to new Date() at render time.',
      status: 'Completed'
    },
    {
      feature: 'One-Click Task Filtering',
      description: 'Pill buttons on the dashboard filter the visible task grid by All / Pending / Completed / Overdue without a page reload.',
      implementation: 'Client-side filter applied to the tasks array via React state; no extra API call required.',
      status: 'Completed'
    },
    {
      feature: 'Responsive Design',
      description: 'Every page adapts from a 320 px mobile screen to a 4 K desktop monitor using CSS Grid, Flexbox, and media query breakpoints.',
      implementation: 'Breakpoints at 480 px, 640 px, 768 px, and 968 px across all CSS modules. Inter font via Google Fonts.',
      status: 'Completed'
    }
  ];

  const technicalSpecs = [
    {
      category: 'Frontend Architecture',
      details: [
        'React 18 with functional components and hooks (useState, useEffect, useContext)',
        'React Router v6 for client-side routing with protected / public route wrappers',
        'AuthContext (Context API) for global auth state — user object and JWT token',
        'Axios-style fetch calls via api.js service layer with Bearer token injection',
        'CSS modules per component; global design tokens in index.css',
        'Inter (Google Fonts) for typography; Lucide React for icons'
      ]
    },
    {
      category: 'Backend Architecture',
      details: [
        'Node.js 18+ runtime; Express 4 web framework',
        'RESTful API design — nouns as resources, HTTP verbs as actions',
        'auth.js middleware validates JWT on every protected route',
        'Centralised error handling with consistent { message } JSON responses',
        'CORS configured to allow requests from http://localhost:3000',
        'Environment variables via dotenv (.env not committed to version control)'
      ]
    },
    {
      category: 'Database Design',
      details: [
        'MongoDB Atlas (cloud) or local MongoDB for development',
        'User schema: name, email (unique, indexed), password (hashed), createdAt',
        'Task schema: title, description, dueDate, status (pending/completed), userId (ref)',
        'Mongoose schema validation rejects invalid data before any DB write',
        'userId index on Tasks collection for fast per-user queries'
      ]
    },
    {
      category: 'Security',
      details: [
        'Passwords hashed with bcrypt (10 salt rounds) — plaintext never stored',
        'JWTs signed with a secret from process.env.JWT_SECRET; 7-day expiry',
        'All task routes gated by auth middleware — users can only see their own tasks',
        'Input sanitised by Mongoose schema validators before DB write',
        'Sensitive config (DB URI, JWT secret) in .env, excluded via .gitignore',
        'CORS restricted to the known frontend origin'
      ]
    }
  ];

  const developmentProcess = [
    {
      phase: 'Planning & Design',
      duration: 'Week 1',
      activities: [
        'Defined user stories and feature scope',
        'Designed component hierarchy and data flow',
        'Created MongoDB schema and API contract',
        'Sketched UI wireframes for all five screens'
      ]
    },
    {
      phase: 'Backend Development',
      duration: 'Week 2',
      activities: [
        'Scaffolded Express server and folder structure',
        'Implemented User model, register, and login endpoints',
        'Built Task model and full CRUD API with auth middleware',
        'Tested all endpoints in Postman'
      ]
    },
    {
      phase: 'Frontend Development',
      duration: 'Week 3',
      activities: [
        'Set up Create React App and routing structure',
        'Built AuthContext, Login, and Register pages',
        'Implemented Dashboard, TaskCard, and TaskForm components',
        'Connected frontend to backend via api.js service layer'
      ]
    },
    {
      phase: 'Polish & Documentation',
      duration: 'Week 4',
      activities: [
        'Redesigned all CSS with the modern Inter design system',
        'Added due-date intelligence, filter buttons, and animations',
        'Built ProjectPortfolio, DeveloperPortfolio, and Documentation pages',
        'Wrote README and in-app documentation'
      ]
    }
  ];

  const apiEndpoints = [
    {
      method: 'POST',
      path: '/api/auth/register',
      description: 'Create a new account',
      auth: false,
      body: { name: 'Jane Student', email: 'jane@uni.edu', password: 'secret123' },
      response: { token: 'eyJhbGciOiJIUzI1NiIs…', user: { id: '64a1…', name: 'Jane Student', email: 'jane@uni.edu' } }
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'Sign in and receive a JWT',
      auth: false,
      body: { email: 'jane@uni.edu', password: 'secret123' },
      response: { token: 'eyJhbGciOiJIUzI1NiIs…', user: { id: '64a1…', name: 'Jane Student', email: 'jane@uni.edu' } }
    },
    {
      method: 'GET',
      path: '/api/tasks',
      description: 'List all tasks for the authenticated user',
      auth: true,
      body: null,
      response: [{ _id: '64b2…', title: 'Read chapter 5', status: 'pending', dueDate: '2025-06-20' }]
    },
    {
      method: 'POST',
      path: '/api/tasks',
      description: 'Create a new task',
      auth: true,
      body: { title: 'Read chapter 5', description: 'Focus on section 5.3', dueDate: '2025-06-20' },
      response: { _id: '64b2…', title: 'Read chapter 5', status: 'pending', dueDate: '2025-06-20', userId: '64a1…' }
    },
    {
      method: 'PUT',
      path: '/api/tasks/:id',
      description: 'Update title, description, due date, or status',
      auth: true,
      body: { status: 'completed' },
      response: { _id: '64b2…', title: 'Read chapter 5', status: 'completed', dueDate: '2025-06-20' }
    },
    {
      method: 'DELETE',
      path: '/api/tasks/:id',
      description: 'Permanently delete a task',
      auth: true,
      body: null,
      response: { message: 'Task deleted successfully' }
    }
  ];

  return (
    <div className="documentation">

      {/* ── Header ── */}
      <section className="doc-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <div className="doc-badge">
                <GitBranch size={13} />
                Project Report · 2024
              </div>
              <h1>
                <FileText size={38} />
                TâcheFlow Documentation
              </h1>
              <p className="subtitle">
                Full technical report covering objectives, architecture, feature implementation,
                API reference, and project outcomes for the TâcheFlow task management application.
              </p>
              <div className="doc-meta">
                <div className="meta-item">
                  <Calendar size={15} />
                  <span>Developed: 2024</span>
                </div>
                <div className="meta-item">
                  <Users size={15} />
                  <span>Developer: John Lloyd Patosa</span>
                </div>
                <div className="meta-item">
                  <CheckSquare size={15} />
                  <span>Status: Completed</span>
                </div>
              </div>
            </div>
            <div className="header-actions">
              <Link to="/project-portfolio" className="btn btn-primary">
                Live Demo
                <ArrowRight size={17} />
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                About Developer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="toc-section">
        <div className="container">
          <div className="toc-card">
            <h2>Table of Contents</h2>
            <div className="toc-grid">
              {[
                { href: '#objectives',  icon: <Target size={17} />,      label: '1. Project Objectives' },
                { href: '#architecture',icon: <Layers size={17} />,      label: '2. System Architecture' },
                { href: '#features',    icon: <CheckSquare size={17} />, label: '3. Features & Implementation' },
                { href: '#technical',   icon: <Code2 size={17} />,       label: '4. Technical Specifications' },
                { href: '#api',         icon: <Terminal size={17} />,    label: '5. API Reference' },
                { href: '#development', icon: <Calendar size={17} />,    label: '6. Development Timeline' },
                { href: '#conclusion',  icon: <BarChart3 size={17} />,   label: '7. Conclusion & Results' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="toc-item">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. Objectives ── */}
      <section id="objectives" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Project Objectives</h2>
            <p>The four core goals that guided every design and implementation decision</p>
          </div>
          <div className="objectives-grid">
            {objectives.map((o, i) => (
              <div key={i} className="objective-card">
                <div className="objective-icon">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Architecture ── */}
      <section id="architecture" className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>System Architecture</h2>
            <p>Three-tier MERN architecture — client, server, and database each with a single responsibility</p>
          </div>
          <div className="architecture-diagram">
            {architecture.map((layer, i) => (
              <div key={i} className="architecture-layer">
                <div className="layer-icon">{layer.icon}</div>
                <h3>{layer.layer}</h3>
                <p>{layer.description}</p>
                <div className="tech-list">
                  {layer.technologies.map((t, j) => (
                    <span key={j} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Features ── */}
      <section id="features" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Features & Implementation</h2>
            <p>Every shipped feature with a description of how it was built</p>
          </div>
          <div className="features-list">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-header">
                  <h3>{f.feature}</h3>
                  <span className="status-badge">✓ {f.status}</span>
                </div>
                <p className="feature-description">{f.description}</p>
                <div className="implementation-details">
                  <strong>Implementation:</strong> {f.implementation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Technical Specs ── */}
      <section id="technical" className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Technical Specifications</h2>
            <p>A deeper look at the decisions behind the architecture</p>
          </div>
          <div className="tech-specs-grid">
            {technicalSpecs.map((spec, i) => (
              <div key={i} className="tech-spec-card">
                <h3>{spec.category}</h3>
                <ul>
                  {spec.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. API Reference ── */}
      <section id="api" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>API Reference</h2>
            <p>All REST endpoints — click any row to expand request/response details</p>
          </div>
          <div className="api-section">
            <div className="api-group">
              <h3 className="api-group-label">
                <Lock size={16} /> Authentication
              </h3>
              {apiEndpoints.filter(e => e.path.startsWith('/api/auth')).map((e, i) => (
                <Endpoint key={i} {...e} />
              ))}
            </div>
            <div className="api-group">
              <h3 className="api-group-label">
                <CheckSquare size={16} /> Tasks
              </h3>
              {apiEndpoints.filter(e => e.path.startsWith('/api/tasks')).map((e, i) => (
                <Endpoint key={i} {...e} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Timeline ── */}
      <section id="development" className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Development Timeline</h2>
            <p>Four weeks from blank repository to finished product</p>
          </div>
          <div className="timeline">
            {developmentProcess.map((phase, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker">{i + 1}</div>
                <div className="timeline-content">
                  <h3>{phase.phase}</h3>
                  <p className="duration">{phase.duration}</p>
                  <ul className="activities">
                    {phase.activities.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Conclusion ── */}
      <section id="conclusion" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Conclusion & Results</h2>
            <p>What was achieved, what was learned, and what comes next</p>
          </div>
          <div className="conclusion-content">
            <div className="achievements">
              <h3>Project Achievements</h3>
              <ul>
                <li>Delivered a complete, production-quality MERN stack application from scratch</li>
                <li>Implemented secure JWT authentication with bcrypt password hashing</li>
                <li>Built a responsive, professional UI that works across all device sizes</li>
                <li>Shipped all six planned features within the four-week timeline</li>
                <li>Created supplementary portfolio, developer profile, and documentation pages</li>
              </ul>
            </div>
            <div className="lessons-learned">
              <h3>Key Lessons Learned</h3>
              <ul>
                <li>Planning the API contract before writing frontend code saves hours of rework</li>
                <li>Context API is enough for small apps — avoid premature Redux complexity</li>
                <li>CSS custom properties and a consistent design token set pay off immediately</li>
                <li>bcrypt and JWT are straightforward to implement — there's no excuse for weak auth</li>
                <li>Good component naming and folder structure matters more than clever abstractions</li>
              </ul>
            </div>
            <div className="future-enhancements">
              <h3>Future Enhancements</h3>
              <ul>
                <li>Email reminders when a task deadline is approaching</li>
                <li>Drag-and-drop task reordering with priority levels</li>
                <li>Team workspaces for group projects and shared task boards</li>
                <li>Google / GitHub OAuth login as an alternative to email + password</li>
                <li>React Native mobile app sharing the same backend API</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="doc-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Explore TâcheFlow</h2>
            <p>
              Create a free account and try the application, or browse the project showcase
              for screenshots and a detailed tech-stack breakdown.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Try the App
                <Zap size={19} />
              </Link>
              <Link to="/project-portfolio" className="btn btn-outline btn-large">
                Project Showcase
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Documentation;
