import { useRef, useEffect } from 'react'

const PARTICLE_COUNT = 60
const TRAIL_COUNT = 15
const DRIFT_SPEED = 0.5
const DRIFT_WANDER = 0.04
const PULL_RADIUS = 150
const PULL_STRENGTH = 0.02
const RETURN_FORCE = 0.001
const DAMPING = 0.94

const ORBS = [
  { rx: 0.15, ry: 0.3, size: 160, r: 20, g: 184, b: 166, opacity: 0.10, speed: 0.08 },
  { rx: 0.8, ry: 0.6, size: 240, r: 245, g: 158, b: 11, opacity: 0.08, speed: 0.05 },
  { rx: 0.5, ry: 0.85, size: 140, r: 20, g: 184, b: 166, opacity: 0.08, speed: 0.06 },
]

export default function useParticleCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const particles = []
    const trail = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.08,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        angle: Math.random() * Math.PI * 2,
      })
    }

    for (let i = 0; i < TRAIL_COUNT; i++) {
      trail.push({ x: -1000, y: -1000, opacity: 0 })
    }

    const orbState = ORBS.map((o) => ({
      ...o,
      x: o.rx * window.innerWidth,
      y: o.ry * window.innerHeight,
      phase: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      for (const p of particles) {
        p.baseX = Math.random() * canvas.width
        p.baseY = Math.random() * canvas.height
      }
      for (const o of orbState) {
        o.x = o.rx * canvas.width
        o.y = o.ry * canvas.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleTouchMove = (e) => {
      const touch = e.touches[0]
      mouseRef.current = { x: touch.clientX, y: touch.clientY }
    }
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      /* glow orbs - slow drift */
      for (const o of orbState) {
        o.phase += o.speed * 0.01
        o.x += Math.sin(o.phase) * 0.15
        o.y += Math.cos(o.phase * 0.7) * 0.1

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.size)
        grad.addColorStop(0, `rgba(${o.r}, ${o.g}, ${o.b}, ${o.opacity})`)
        grad.addColorStop(1, `rgba(${o.r}, ${o.g}, ${o.b}, 0)`)
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      /* trail dots */
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35
        trail[i].opacity = trail[i - 1].opacity * 0.7
      }
      trail[0].x += (mx - trail[0].x) * 0.5
      trail[0].y += (my - trail[0].y) * 0.5
      trail[0].opacity = 1

      for (const t of trail) {
        if (t.opacity < 0.01) continue
        ctx.beginPath()
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20, 184, 166, ${t.opacity * 0.4})`
        ctx.fill()
      }

      /* particles */
      for (const p of particles) {
        p.angle += (Math.random() - 0.5) * DRIFT_WANDER * 2
        p.vx += Math.cos(p.angle) * DRIFT_SPEED * 0.2
        p.vy += Math.sin(p.angle) * DRIFT_SPEED * 0.2

        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < PULL_RADIUS) {
          const force = (1 - dist / PULL_RADIUS) * PULL_STRENGTH
          p.vx += dx * force
          p.vy += dy * force
        }

        p.vx += (p.baseX - p.x) * RETURN_FORCE
        p.vy += (p.baseY - p.y) * RETURN_FORCE

        p.vx *= DAMPING
        p.vy *= DAMPING

        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20, 184, 166, ${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return canvasRef
}
