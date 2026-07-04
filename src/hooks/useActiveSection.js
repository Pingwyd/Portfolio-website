import { useState, useEffect } from 'react'

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'contact']
    const navHeight = 72

    const handleScroll = () => {
      let current = 'hero'
      let bestScore = -Infinity
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = rect.top
        const bottom = rect.bottom
        if (bottom < navHeight) continue
        const visibleTop = Math.max(top, navHeight)
        const visibleBottom = Math.min(bottom, window.innerHeight)
        const visible = Math.max(0, visibleBottom - visibleTop)
        const score = visible / rect.height
        if (score > bestScore) {
          bestScore = score
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}
