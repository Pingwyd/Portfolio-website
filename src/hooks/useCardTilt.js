import { useRef, useEffect } from 'react'

export default function useCardTilt() {
  const cardsRef = useRef([])

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const attached = []
    const cards = document.querySelectorAll('.project-card')
    cards.forEach((card) => {
      const handleEnter = () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
      }
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
      attached.push({ card, handleEnter, handleMove, handleLeave })
    })
    cardsRef.current = attached

    return () => {
      cardsRef.current.forEach(({ card, handleEnter, handleMove, handleLeave }) => {
        card.removeEventListener('mouseenter', handleEnter)
        card.removeEventListener('mousemove', handleMove)
        card.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])
}
