// hooks/use-is-mobile.ts
'use client'
import { useEffect, useState } from 'react'

/**
 * Returns true when viewport matches mobile breakpoint.
 * Uses CSS breakpoint of max-width: 767px (adjust if your Tailwind config differs).
 * This hook is responsive to the matchMedia shim above.
 */

export function useIsMobile(breakpointPx = 767) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches
    } catch {
      return window.innerWidth <= breakpointPx
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    let mql: MediaQueryList | null = null
    try {
      mql = window.matchMedia(`(max-width: ${breakpointPx}px)`)
      const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
      // modern
      if (mql.addEventListener) mql.addEventListener('change', listener as any)
      // legacy
      else (mql as any).addListener(listener)
      // set initial
      setIsMobile(mql.matches)
      return () => {
        if (!mql) return
        if (mql.removeEventListener) mql.removeEventListener('change', listener as any)
        else (mql as any).removeListener(listener)
      }
    } catch {
      // fallback to resize event
      const onResize = () => setIsMobile(window.innerWidth <= breakpointPx)
      window.addEventListener('resize', onResize)
      onResize()
      return () => window.removeEventListener('resize', onResize)
    }
  }, [breakpointPx])

  return isMobile
}
