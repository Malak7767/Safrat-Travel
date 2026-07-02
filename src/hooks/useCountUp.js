import { useState, useEffect, useRef } from 'react'

/**
 * useCountUp — counts from 0 to `target` on mount
 * @param {number} target   — final value
 * @param {number} duration — ms (default 1400)
 * @param {number} delay    — ms before starting (default 0)
 */
export function useCountUp(target, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let timeout
    let raf

    timeout = setTimeout(() => {
      let startTime = null

      function step(ts) {
        if (!startTime) startTime = ts
        const progress = Math.min((ts - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
        setValue(Math.round(ease * target))
        if (progress < 1) {
          raf = requestAnimationFrame(step)
        } else {
          setValue(target)
        }
      }

      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return value
}