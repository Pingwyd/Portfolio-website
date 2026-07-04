import { useState } from 'react'
import { Mail, ExternalLink, Globe, Menu, X, ArrowRight } from 'lucide-react'
import useParticleCanvas from './hooks/useParticleCanvas'
import useActiveSection from './hooks/useActiveSection'
import useClickRipple from './hooks/useClickRipple'
import useCardTilt from './hooks/useCardTilt'
import useScrollReveal from './hooks/useScrollReveal'
import { projects, skills } from './data'
import './App.css'

function App() {
  const canvasRef = useParticleCanvas()
  const activeSection = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)

  useClickRipple()
  useCardTilt()
  useScrollReveal()

  const scrollTo = (id) => {
    setMenuOpen(false)
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

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas"></canvas>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <a href="#hero" className="nav-logo">Olaoye Prosper</a>
          <button
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} color="#e0e0e8" /> : <Menu size={22} color="#e0e0e8" />}
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills') }} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            <li><a href="https://github.com/Pingwyd" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub</a></li>
          </ul>
        </div>
      </nav>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-card">
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
              <a
                key={i}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
                aria-label={`View ${p.title} on GitHub`}
              >
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
                  <span className="project-view-hint">
                    {p.private ? 'View Profile' : 'View on GitHub'}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </a>
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
                <Mail size={18} />
                prosperolaoye0@gmail.com
              </a>
              <a href="https://github.com/Pingwyd" target="_blank" rel="noopener noreferrer" className="contact-btn">
                <ExternalLink size={18} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/prosper-olaoye-1184b630b/" target="_blank" rel="noopener noreferrer" className="contact-btn">
                <Globe size={18} />
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
