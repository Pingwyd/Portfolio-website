import { useEffect, useRef, useCallback, useState } from 'react'
import './App.css'

const projects = [
  {
    title: "Loyalty Card App",
    badge: "Client Work",
    badgeClass: "badge-client",
    meta: "May 2026 – Present",
    description:
      "Full-stack loyalty card system with QR-based check-ins and real-time WebSocket updates. Role-based dashboards (Owner, Staff, Customer) with dark glassmorphism UI, staff scanner with camera selection, audit trail, JWT auth, RBAC, rate limiting with lockout, and self-scan prevention.",
    skills: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Jinja2", "Bootstrap 5", "WebSockets", "JWT"],
    github: "https://github.com/",
    private: true,
  },

  {
    title: "Hospitality Unit Bot",
    badge: "Freelance Project",
    badgeClass: "badge-freelance",
    meta: "Oct 2025 – Nov 2025",
    description:
      "Built a Telegram bot to streamline and optimize posting activities for the protocol subunit in the Hospitality Unit. Integrated auto-scheduled posting that saved time and ensured proper participation, increasing user engagement by ~45% in pilot testing.",
    skills: ["Python", "SQLite", "Telegram Bot API", "GitHub Copilot"],
    github: "https://github.com/Pingwyd/Hospi-bot",
  },

  {    
    title: "Car Park Allocation System",
    badge: "Team Member",
    badgeClass: "badge-team",
    meta: "Ota, Ogun State · July 2025",
    description:
      "Developed an information system to automatically allocate parking spaces to workers using QR codes with embedded employee information. Tracks Employee ID, Name, Department, check-in/check-out times. Worked on database integration (defining schema, tables, relationships) and QR code development.",
    skills: ["Python", "SQLite", "Flask", "QRcode", "OpenCV", "pyzbar", "Pillow"],
    github: "https://github.com/Pingwyd/Car-park-Allocation-System",
  },

  { 
    title: "Nudge",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "March 2026 – Present",
    description:
      "Cross-platform desktop productivity app built with Python and PyQt6 using a 3-layer architecture. Features persistent reminders, system tray integration, task groups with drag-and-drop, theming system (dark/light/OLED), auto-update pipeline via GitHub Releases, and CI/CD with GitHub Actions.",
    skills: ["Python", "PyQt6", "GitHub Actions", "CI/CD", "PyInstaller"],
    github: "https://github.com/Pingwyd/Nudge",
  },

  {
    title: "Employee Management System",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "Oct 2025 – Nov 2025",
    description:
      "Built a RESTful Employee Management System with 3-layer architecture (Controller, Service, Repository) handling HR operations across Admin, Manager, and Employee roles. Secured with JWT authentication, RBAC, and BCrypt password encryption. Implemented email verification with OTP dispatch via SMTP.",
    skills: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "JWT", "BCrypt", "SMTP"],
    github: "https://github.com/Pingwyd/EmployeeManagementSystem",
  },
  {
    title: "Farm Labor Connect",
    badge: "Hackathon",
    badgeClass: "badge-group",
    meta: "2025",
    description:
      "Handled backend for a web app connecting farmers with agricultural workers using Flask and SQLAlchemy. Implemented RBAC (Admin, Farmer, Laborer), 2FA, BCrypt hashing, CSRF protection, XSS sanitization, encrypted document storage, and Interswitch payment API integration.",
    skills: ["Flask", "SQLAlchemy", "PostgreSQL", "2FA", "BCrypt", "CSRF", "Fernet", "Interswitch API"],
    github: "https://github.com/Pingwyd/Farm-Labor-Connect",
  },
  
  
]

const skills = [
  "Python", "Flask", "FastAPI", "Spring Boot", "Java",
  "PostgreSQL", "SQLite", "SQLAlchemy", "JPA",
  "JWT", "RBAC", "BCrypt", "WebSockets",
  "REST APIs", "CI/CD", "GitHub Actions",
  "PyQt6", "OpenCV", "Docker", "Git",
]

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const heroCardRef = useRef(null)
  const shineRef = useRef(null)
  const sectionsRef = useRef([])
  const cardsRef = useRef([])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80
    const startY = window.pageYOffset
    const diff = y - startY
    const duration = 1000
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      window.scrollTo(0, startY + diff * ease)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  /* ---- Mouse-follow glass shine ---- */
  const handleMouseMove = useCallback((e) => {
    const card = heroCardRef.current
    const shine = shineRef.current
    if (!card || !shine) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    shine.style.opacity = '1'
    shine.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(255,255,255,0.07) 0%, transparent 100%)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (shineRef.current) shineRef.current.style.opacity = '0'
  }, [])

  /* ---- Scroll-reveal with IntersectionObserver ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = document.querySelectorAll('.reveal')
    targets.forEach((t) => observer.observe(t))
    return () => targets.forEach((t) => observer.unobserve(t))
  }, [])

  /* ---- Active section tracking ---- */
  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.15, rootMargin: '-72px 0px -20% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* ---- Click ripple ---- */
  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('.btn, .contact-btn, .nav-cta')
      if (!btn) return
      const ripple = document.createElement('span')
      ripple.className = 'click-ripple'
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      btn.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  /* ---- Tilt on project cards ---- */
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')
    cards.forEach((card) => {
      const handleEnter = () => { card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)' }
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`
      }
      const handleLeave = () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
      }
      card.addEventListener('mouseenter', handleEnter)
      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
      cardsRef.current.push({ card, handleEnter, handleMove, handleLeave })
    })
    return () => {
      cardsRef.current.forEach(({ card, handleEnter, handleMove, handleLeave }) => {
        card.removeEventListener('mouseenter', handleEnter)
        card.removeEventListener('mousemove', handleMove)
        card.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <a href="#hero" className="nav-logo">Olaoye Prosper</a>
          <ul className="nav-links">
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills') }} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            <li><a href="https://github.com/Pingwyd" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="container">
          <div
            className="hero-card"
            ref={heroCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="glass-shine" ref={shineRef}></div>
            <div className="hero-text">
              <p className="hero-greeting">Hello, I'm</p>
              <h1>
                Olaoye Prosper<br />
                <span className="accent">Software Engineer</span>
              </h1>
              <p className="tagline">
                Building efficient, secure systems, from parking allocation
                tools to real-time loyalty platforms and cross-platform
                productivity apps.
              </p>
              <div className="hero-actions">
                <button className="btn btn-orange" onClick={() => scrollTo('projects')}>
                  View Projects
                </button>
                <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
                  Contact Me
                </button>
              </div>
              <div className="skills-bar">
                <p className="skills-bar-label">Tech Stack</p>
                <div className="skill-pills">
                  {skills.slice(0, 8).map((s, i) => (
                    <span key={s} className="skill-pill" style={{ animationDelay: `${i * 0.05}s` }}>{s}</span>
                  ))}
                  <span className="skill-pill-more" style={{ animationDelay: '0.4s' }} onClick={() => scrollTo('skills')}>+{skills.length - 8}</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hero-visual">
              <div className="hero-globe">
                <span className="globe-letter">P</span>
                <div className="globe-ring"></div>
                <div className="globe-ring"></div>
                <div className="globe-dot"></div>
                <div className="globe-dot"></div>
                <div className="globe-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects">
        <div className="container">
          <p className="section-eyebrow reveal">Work</p>
          <h2 className="section-heading reveal">Featured Projects</h2>
          <p className="section-desc reveal">
            Real-world applications I've built, from hackathon prototypes
            to production-ready systems.
          </p>
          <div className="projects-list">
            {projects.map((p, i) => (
              <div key={i} className="project-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="project-left">
                  <div className="project-top">
                    <span className="project-title">{p.title}</span>
                    <span className={`project-badge ${p.badgeClass}`}>{p.badge}</span>
                  </div>
                  <p className="project-meta">{p.meta}</p>
                  <p className="project-desc">{p.description}</p>
                  <div className="project-stack">
                    {p.skills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="project-right">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    {p.private ? 'Private' : 'Source →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


        {/* Skills */}
      <section id="skills" className="skills-section">
        <div className="container">
          <p className="section-eyebrow reveal">Tech Stack</p>
          <h2 className="section-heading reveal">Skills & Tools</h2>
          <p className="section-desc reveal">
            Technologies I work with across backend, frontend, databases, and DevOps.
          </p>
          <div className="skills-grid reveal">
            {skills.map((s, i) => (
              <div key={s} className="skill-card" style={{ animationDelay: `${i * 0.04}s` }}>
                <span className="skill-name">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-inner reveal">
            <h2 className="contact-heading">Let's Connect</h2>
            <p className="contact-sub">
              I'm open to discussing new projects, opportunities, or
              just chatting about tech.
            </p>
            <div className="contact-links">
              <a href="mailto:prosperolaoye0@gmail.com" className="contact-btn">
                <svg viewBox="0 0 24 24"><path d="M2 4h20v16H2V4zm0 0l10 7 10-7"/></svg>
                prosperolaoye0@gmail.com
              </a>
              <a href="https://github.com/Pingwyd" target="_blank" rel="noopener noreferrer" className="contact-btn">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/prosper-olaoye-1184b630b/" target="_blank" rel="noopener noreferrer" className="contact-btn">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Prosper</p>
        </div>
      </footer>
    </>
  )
}

export default App
