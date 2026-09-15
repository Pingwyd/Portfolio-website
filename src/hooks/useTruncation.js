import { useState, useEffect, useCallback, useRef } from 'react'

export default function useTruncation() {
  const ref = useRef(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const check = useCallback(() => {
    const el = ref.current
    if (!el) return

    const clampedHeight = el.clientHeight

    const clone = el.cloneNode(true)
    clone.style.position = 'absolute'
    clone.style.visibility = 'hidden'
    clone.style.height = 'auto'
    clone.style.maxHeight = 'none'
    clone.style.display = 'block'
    clone.style.webkitLineClamp = 'unset'
    clone.style.webkitBoxOrient = ''
    clone.style.overflow = 'visible'
    clone.style.width = el.clientWidth + 'px'
    el.parentNode.appendChild(clone)

    const fullHeight = clone.scrollHeight
    el.parentNode.removeChild(clone)

    setIsTruncated(fullHeight > clampedHeight + 4)
  }, [])

  useEffect(() => {
    const timer = setTimeout(check, 60)
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(check, 180)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [check])

  return { ref, isTruncated }
}
