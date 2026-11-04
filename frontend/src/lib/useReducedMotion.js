import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function read() {
  try {
    return Boolean(window.matchMedia?.(QUERY).matches)
  } catch {
    return false
  }
}

// Own hook (not framer-motion's) so the value is read per render and tests can toggle it.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(read)
  useEffect(() => {
    const mql = window.matchMedia?.(QUERY)
    if (!mql?.addEventListener) return
    const onChange = () => setReduced(read())
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
}
