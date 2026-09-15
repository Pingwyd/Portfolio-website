import { useState, useEffect, useCallback, useRef } from 'react'

export default function useTruncation(threshold = 50) {
  const ref = useRef(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const check = useCallback(() => {
    const el = ref.current
    if (!el) return
    setIsTruncated(el.scrollHeight > el.clientHeight + threshold)
  }, [threshold])

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
