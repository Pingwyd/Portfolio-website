import { useEffect } from 'react'

export default function useScrollReveal() {
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
}
