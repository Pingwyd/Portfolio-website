import { useEffect } from 'react'

export default function useClickRipple() {
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
}
