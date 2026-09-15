import { useState, useEffect, useCallback, useRef } from 'react'
import { Mail, ExternalLink, Globe, Menu, X, ArrowRight } from 'lucide-react'
import useParticleCanvas from './hooks/useParticleCanvas'
import useActiveSection from './hooks/useActiveSection'
import useClickRipple from './hooks/useClickRipple'
import useCardTilt from './hooks/useCardTilt'
import useScrollReveal from './hooks/useScrollReveal'
import useTruncation from './hooks/useTruncation'
import { projects, skillCategories, process } from './data'
import './App.css'

function TruncatedDesc({ text, index, openTooltip, setOpenTooltip }) {
  const { ref, isTruncated } = useTruncation(50)
  const tooltipRef = useRef(null)
  const isOpen = openTooltip === index

  const close = useCallback(() => {
    setOpenTooltip((prev) => (prev === index ? null : prev))
  }, [index, setOpenTooltip])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    const onClick = (e) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target) &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('touchstart', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('touchstart', onClick)
    }
  }, [isOpen, close, ref])

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isTruncated) return
    setOpenTooltip((prev) => (prev === index ? null : index))
  }

  return (
    <div className="desc-tooltip-anchor">
      <p
        ref={ref}
        className={`project-desc${isTruncated ? ' truncated' : ''}`}
        onClick={toggle}
        role={isTruncated ? 'button' : undefined}
        tabIndex={isTruncated ? 0 : undefined}
        onKeyDown={isTruncated ? (e) => { if (e.key === 'Enter' || e.key === ' ') toggle(e) } : undefined}
      >
        {text}
      </p>
      {isTruncated && (
        <div
          ref={tooltipRef}
          className={`desc-tooltip${isOpen ? ' open' : ''}`}
          role="tooltip"
        >
          <button className="desc-tooltip-close" onClick={close} aria-label="Close tooltip">
            <X size={14} />
          </button>
          {text}
        </div>
      )}
    </div>
  )
}

function App() {
  const canvasRef = useParticleCanvas()
  const activeSection = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openTooltip, setOpenTooltip] = useState(null)

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
          <a href="#hero" className="nav-logo">Prosper</a>
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
            <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process') }} className={activeSection === 'process' ? 'active' : ''}>Process</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            <li><a href="https://github.com/Pingwyd" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub</a></li>
          </ul>
        </div>
      </nav>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="container">
          <p className="hero-eyebrow">Software Engineer</p>
          <h1 className="hero-headline">
            Building secure,<br />
            efficient systems.
          </h1>
          <p className="hero-sub">
            From real-time loyalty platforms to cross-platform desktop apps,
            I craft backend-heavy systems that are production-ready from day one.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section projects">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-number">01</span>
            <div>
              <p className="section-eyebrow">Work</p>
              <h2 className="section-heading">Featured Projects</h2>
            </div>
          </div>
          <p className="section-desc reveal">
            Real-world applications I've built, from hackathon prototypes
            to production-ready systems.
          </p>
          <div className="projects-list">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
                aria-label={`View ${p.title}`}
              >
                <div className="project-content">
                  <div className="project-top">
                    <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
                    <span className="project-title">{p.title}</span>
                    <span className={`project-badge ${p.badgeClass}`}>{p.badge}</span>
                  </div>
                  <p className="project-meta">{p.meta}</p>
                  <TruncatedDesc
                    text={p.description}
                    index={i}
                    openTooltip={openTooltip}
                    setOpenTooltip={setOpenTooltip}
                  />
                  <div className="project-stack">
                    {p.skills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <span className="project-view-hint">
                    {p.private ? 'View Profile' : 'View'}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-number">02</span>
            <div>
              <p className="section-eyebrow">Tech Stack</p>
              <h2 className="section-heading">Skills & Tools</h2>
            </div>
          </div>
          <div className="skills-categories">
            {skillCategories.map((cat, ci) => (
              <div key={cat.label} className="skill-category reveal" style={{ transitionDelay: `${ci * 0.1}s` }}>
                <h3 className="skill-category-label">{cat.label}</h3>
                <div className="skill-category-grid">
                  {cat.skills.map((s, si) => (
                    <div key={s} className="skill-card" style={{ animationDelay: `${si * 0.03}s` }}>
                      <span className="skill-name">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section process-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-number">03</span>
            <div>
              <p className="section-eyebrow">How I Work</p>
              <h2 className="section-heading">Process</h2>
            </div>
          </div>
          <div className="process-grid">
            {process.map((p, i) => (
              <div key={p.step} className="process-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="process-step">{p.step}</span>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-number">04</span>
            <div>
              <p className="section-eyebrow">Get in Touch</p>
              <h2 className="section-heading">Contact</h2>
            </div>
          </div>
          <div className="contact-inner reveal">
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
