import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  Globe,
  Github,
  Cpu,
  Wrench,
  Users,
  Heart,
  Layers,
  CheckCircle,
  Star
} from 'lucide-react';
import './DeveloperPortfolio.css';

const DeveloperPortfolio = () => {

  const skillGroups = [
    {
      category: 'Hardware & Embedded',
      icon: <Cpu size={18} />,
      items: ['VHDL & FPGA Design', 'PCB Layout & Soldering', 'Arduino / ESP32', 'NodeMCU / IoT Systems', 'Embedded C']
    },
    {
      category: 'Software Development',
      icon: <Code2 size={18} />,
      items: ['React.js', 'Node.js / Express.js', 'JavaScript (ES6+)', 'MongoDB & Mongoose', 'REST API Design']
    },
    {
      category: 'Tools & Practices',
      icon: <Wrench size={18} />,
      items: ['Debugging & Troubleshooting', 'Git & GitHub', 'Postman', 'VS Code', 'Broadcast Systems']
    },
    {
      category: 'Languages',
      icon: <Globe size={18} />,
      items: ['English', 'Filipino', 'Basic French']
    }
  ];

  const experience = [
    {
      company: 'TechBridge Innovations',
      role: 'Embedded Systems Intern',
      location: 'Philippines',
      period: '2024',
      description: 'Designed and deployed IoT automation systems using NodeMCU. Developed embedded C applications for real-world hardware control and sensor integration.',
      highlights: ['Built IoT home automation systems using NodeMCU', 'Developed embedded C applications for hardware control', 'Debugged and tested firmware on real devices']
    },
    {
      company: 'Fréquence TV',
      role: 'Broadcast Technician',
      location: 'Geneva, Switzerland',
      period: '2022 – 2023',
      description: 'Maintained professional broadcast equipment and provided live production support for scheduled and event-based television broadcasts.',
      highlights: ['Maintained broadcast transmission systems', 'Supported live production setups and scheduling', 'Handled troubleshooting under time-critical conditions']
    },
    {
      company: 'Fust',
      role: 'Electronics Sales Associate',
      location: 'Geneva, Switzerland',
      period: '2021 – 2022',
      description: 'Assisted customers in selecting consumer electronics and explained technical specifications in accessible terms.',
      highlights: ['Advised customers on electronics purchases', 'Explained technical features clearly to non-technical users', 'Maintained product knowledge across multiple categories']
    }
  ];

  const education = [
    {
      degree: 'BS Computer Engineering',
      institution: 'Lyceum of the Philippines University – Davao',
      period: '2023 – 2027',
      description: 'Currently pursuing a Bachelor of Science in Computer Engineering with focus on embedded systems, FPGA design, and software development. TâcheFlow is a capstone-level project demonstrating full-stack web development skills.'
    },
    {
      degree: 'Electronics Studies',
      institution: 'CFPT École d\'Électronique, Geneva',
      period: '2021 – 2023',
      description: 'Formal electronics education in Geneva covering circuit design, PCB layout, broadcast systems, and practical hardware troubleshooting. Gained international industry experience across three companies.'
    }
  ];

  const certificates = [
    {
      title: 'Embedded Systems Training',
      description: 'Microcontroller programming and IoT systems. Gained practical experience in real-world embedded applications and debugging.',
      icon: <Cpu size={20} />
    },
    {
      title: 'PCB Design & Electronics Workshop',
      description: 'Hands-on training in PCB layout, soldering, and circuit design. Improved skills in designing efficient and reliable electronic circuits.',
      icon: <Wrench size={20} />
    },
    {
      title: 'Arduino & ESP32 Development',
      description: 'Developed embedded projects using Arduino and ESP32 platforms. Strengthened knowledge in IoT development and hardware integration.',
      icon: <Code2 size={20} />
    },
    {
      title: 'Broadcast Systems Technical',
      description: 'Training in broadcast equipment maintenance and live production support. Learned proper handling and troubleshooting of professional broadcast systems.',
      icon: <Star size={20} />
    }
  ];

  const projects = [
    {
      title: 'TâcheFlow',
      description: 'A full-stack task management web application built with React, Node.js, Express, and MongoDB. Features JWT authentication, real-time dashboard analytics, intelligent due-date colour-coding, and a fully responsive design system.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'CSS3'],
      features: ['Secure JWT authentication', 'Full CRUD task management', 'Live progress dashboard', 'Due-date intelligence', 'Fully responsive UI'],
      status: 'Completed',
      demoLink: '/dashboard',
      accent: '#667eea'
    },
    {
      title: 'IoT Home Automation',
      description: 'NodeMCU-based smart home system enabling remote monitoring and control of household devices via Wi-Fi. Developed during embedded systems internship.',
      technologies: ['NodeMCU', 'Embedded C', 'IoT', 'Wi-Fi', 'Arduino IDE'],
      features: ['Remote device control', 'Real-time sensor monitoring', 'Wi-Fi connectivity', 'Low-power design', 'Modular architecture'],
      status: 'Completed',
      demoLink: null,
      accent: '#48bb78'
    },
    {
      title: 'Vendo Storage Machine',
      description: 'Co-founded and contributed to the design and development of an automated vending storage system — combining hardware design, embedded control logic, and a physical prototype.',
      technologies: ['Arduino', 'PCB Design', 'Embedded C', 'Electronics', 'Mechanical Design'],
      features: ['Automated dispensing logic', 'PCB design & fabrication', 'Physical prototype built', 'Co-founded project', 'End-to-end engineering'],
      status: 'Completed',
      demoLink: null,
      accent: '#f6ad55'
    }
  ];

  const hobbies = [
    { label: 'Basketball', emoji: '🏀' },
    { label: 'Computer Games', emoji: '🎮' },
    { label: 'Reading Books', emoji: '📚' },
    { label: 'Music', emoji: '🎵' },
    { label: 'Physical Fitness', emoji: '💪' }
  ];

  return (
    <div className="developer-portfolio">

      {/* ── Hero ── */}
      <section className="developer-hero">
        <div className="container">
          <div className="hero-content">

            {/* Left: Photo + contact */}
            <div className="profile-section">
              <div className="profile-image">
                <img
                  src={process.env.PUBLIC_URL + '/profile.jpg.jpg'}
                  alt="John Lloyd Patosa"
                  onError={e => {
                    // Try without double extension
                    if (e.target.src.includes('.jpg.jpg')) {
                      e.target.src = process.env.PUBLIC_URL + '/profile.jpg';
                    } else {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="profile-fallback" style={{ display: 'none' }}>
                  <span>JLP</span>
                </div>
              </div>

              <div className="profile-info">
                <h1>John Lloyd Patosa</h1>
                <p className="title">Computer Engineering Student</p>
                <p className="subtitle-role">Embedded Systems · Full-Stack Dev</p>

                <div className="contact-info">
                  <a href="tel:+639764953989" className="contact-item">
                    <Phone size={14} />
                    <span>+63 976 495 3989</span>
                  </a>
                  <a href="mailto:johnlloydpatosa@yahoo.com" className="contact-item">
                    <Mail size={14} />
                    <span>johnlloydpatosa@yahoo.com</span>
                  </a>
                  <div className="contact-item">
                    <MapPin size={14} />
                    <span>Indangan, Davao City</span>
                  </div>
                  <a href="https://linkedin.com/in/johnlloyd" target="_blank" rel="noreferrer" className="contact-item">
                    <Linkedin size={14} />
                    <span>linkedin.com/in/johnlloyd</span>
                  </a>
                </div>

                <div className="hobbies-row">
                  {hobbies.map((h, i) => (
                    <span key={i} className="hobby-tag">{h.emoji} {h.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Intro */}
            <div className="intro-section">
              <div className="intro-badge">
                <Heart size={13} />
                Open to Engineering Opportunities
              </div>
              <h2>Hi, I'm John Lloyd.</h2>
              <p className="intro-objective">
                Motivated Computer Engineering student skilled in embedded systems, electronics,
                and software development — seeking opportunities to build innovative engineering solutions.
              </p>
              <p>
                My background bridges two worlds: hands-on hardware work (FPGA, PCB design, IoT systems,
                broadcast equipment) and modern software development (React, Node.js, MongoDB). I studied
                electronics formally at <strong>CFPT Geneva</strong> and gained real industry experience
                across three companies in Switzerland before returning to pursue my degree at
                <strong> LPU Davao</strong>.
              </p>
              <p>
                <strong>TâcheFlow</strong> is my first full-stack web project — a complete MERN stack
                application I designed and built from scratch to demonstrate my software development skills.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  <Briefcase size={17} />
                  See My Projects
                </a>
                <Link to="/project-portfolio" className="btn btn-outline">
                  <ExternalLink size={17} />
                  TâcheFlow Demo
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2>Technical Skills</h2>
            <p>From circuit boards to React components — hardware and software combined</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((g, i) => (
              <div key={i} className="skill-category">
                <h3>
                  {g.icon}
                  {g.category}
                </h3>
                <div className="skills-list">
                  {g.items.map((s, j) => (
                    <span key={j} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2>Work Experience</h2>
            <p>Real-world industry roles across embedded systems, broadcast, and retail tech</p>
          </div>
          <div className="experience-timeline">
            {experience.map((e, i) => (
              <div key={i} className="experience-item">
                <div className="experience-icon">
                  <Briefcase size={20} />
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <div>
                      <h3>{e.role}</h3>
                      <p className="company">{e.company}</p>
                    </div>
                    <div className="experience-meta">
                      <span className="exp-period">{e.period}</span>
                      <span className="exp-location">
                        <MapPin size={12} /> {e.location}
                      </span>
                    </div>
                  </div>
                  <p className="exp-description">{e.description}</p>
                  <ul className="exp-highlights">
                    {e.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2>Projects</h2>
            <p>Hardware, IoT, and web — built and shipped</p>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="project-card" style={{ '--accent': p.accent }}>
                <div className="project-banner" style={{ background: `linear-gradient(135deg, ${p.accent} 0%, #1a202c 100%)` }}>
                  <div className="project-banner-content">
                    <Code2 size={40} opacity={0.25} color="white" />
                    <span className="project-banner-name">{p.title}</span>
                  </div>
                  {p.demoLink && (
                    <div className="project-overlay">
                      <div className="project-links">
                        <Link to={p.demoLink} className="project-link">
                          <Globe size={17} /> Live Demo
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3>{p.title}</h3>
                    <span className="status completed">{p.status}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="project-technologies">
                    {p.technologies.map((t, j) => (
                      <span key={j} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-features">
                    <h4>Highlights</h4>
                    <ul>
                      {p.features.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="education-section">
        <div className="container">
          <div className="section-header">
            <h2>Education</h2>
            <p>Academic foundations in the Philippines and Switzerland</p>
          </div>
          <div className="education-timeline">
            {education.map((e, i) => (
              <div key={i} className="education-item">
                <div className="education-icon">
                  <BookOpen size={22} />
                </div>
                <div className="education-content">
                  <h3>{e.degree}</h3>
                  <p className="institution">{e.institution}</p>
                  <p className="period">{e.period}</p>
                  <p className="description">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificates ── */}
      <section className="achievements-section">
        <div className="container">
          <div className="section-header">
            <h2>Certificates</h2>
            <p>Formal recognition of hands-on training and professional development</p>
          </div>
          <div className="achievements-grid">
            {certificates.map((c, i) => (
              <div key={i} className="achievement-card">
                <div className="achievement-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <h2>Get in Touch</h2>
            <p>
              Whether it's an engineering role, a freelance project, or just a conversation
              about embedded systems or web dev — I'd love to hear from you.
            </p>

            <div className="contact-methods">
              <a href="tel:+639764953989" className="contact-method">
                <Phone size={22} />
                <div>
                  <h3>Phone</h3>
                  <p>+63 976 495 3989</p>
                </div>
              </a>
              <a href="mailto:johnlloydpatosa@yahoo.com" className="contact-method">
                <Mail size={22} />
                <div>
                  <h3>Email</h3>
                  <p>johnlloydpatosa@yahoo.com</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/johnlloyd" target="_blank" rel="noreferrer" className="contact-method">
                <Linkedin size={22} />
                <div>
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/johnlloyd</p>
                </div>
              </a>
              <div className="contact-method location-card">
                <MapPin size={22} />
                <div>
                  <h3>Location</h3>
                  <p>Indangan, Davao City</p>
                </div>
              </div>
            </div>

            <div className="contact-cta">
              <Link to="/project-portfolio" className="btn btn-primary">
                View TâcheFlow
                <ExternalLink size={17} />
              </Link>
              <Link to="/documentation" className="btn btn-outline">
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DeveloperPortfolio;
