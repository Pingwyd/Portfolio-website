import { useState, useEffect, useCallback, useRef } from 'react'

export default function useTruncation() {
  const ref = useRef(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const check = useCallback(() => {
    const el = ref.current
    if (!el) return

    const clampedHeight = el.clientHeight

    el.style.webkitLineClamp = 'none'
    el.style.webkitBoxOrient = 'unset'
    el.style.display = 'block'
    el.style.overflow = 'visible'
    el.style.height = 'auto'

    const fullHeight = el.scrollHeight

    el.style.webkitLineClamp = ''
    el.style.webkitBoxOrient = ''
    el.style.display = ''
    el.style.overflow = ''
    el.style.height = ''

    setIsTruncated(fullHeight > clampedHeight + 4)
  }, [])

  useEffect(() => {
    check()
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(check, 180)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [check])

  return { ref, isTruncated }
}
