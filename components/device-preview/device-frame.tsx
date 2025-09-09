// components/device-preview/device-frame.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import type { DeviceType } from './device-preview-provider'
import { DEVICE_SIZES } from './device-preview-provider'

interface DeviceFrameProps {
  device: DeviceType
  children: React.ReactNode
  className?: string
}

/**
 * Renders children inside an iframe (same-origin) and proxies matchMedia/innerWidth to that iframe.
 * This makes CSS media queries and JS matchMedia behave as if the viewport had the requested device size.
 */
export function DeviceFrame({ device, children, className }: DeviceFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const mountRef = useRef<HTMLElement | null>(null)
  const [ready, setReady] = useState(false)

  const size = DEVICE_SIZES[device]
  const containerStyle: React.CSSProperties = {
    width: size.width,
    height: size.height,
    maxWidth: '95vw',
    maxHeight: '90vh',
  }

  // Create blank srcdoc -> then copy styles and create mount node
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const onLoad = () => {
      try {
        const doc = iframe.contentDocument!
        const head = doc.head
        // Copy all <link rel="stylesheet"> and <style> tags (tailwind/next css)
        Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach((n) =>
          head.appendChild(n.cloneNode(true))
        )
        // copy viewport meta if present
        const meta = document.head.querySelector('meta[name="viewport"]')
        if (meta) head.appendChild(meta.cloneNode(true))
        // mount point
        mountRef.current = doc.createElement('div')
        doc.body.style.margin = '0'
        doc.body.appendChild(mountRef.current)
        setReady(true)
      } catch (e) {
        // fail silently
        console.error('DeviceFrame iframe setup error', e)
      }
    }

    iframe.addEventListener('load', onLoad)
    // trigger load
    iframe.srcdoc = '<!doctype html><html><head></head><body></body></html>'

    return () => {
      iframe.removeEventListener('load', onLoad)
    }
  }, [])

  // Proxy parent matchMedia / innerWidth/innerHeight to iframe window once ready.
  useEffect(() => {
    if (!ready || !iframeRef.current) return
    const iframeWin = iframeRef.current.contentWindow!
    const origMatchMedia = (window as any).matchMedia
    const origInnerWidthDesc = Object.getOwnPropertyDescriptor(window, 'innerWidth')
    const origInnerHeightDesc = Object.getOwnPropertyDescriptor(window, 'innerHeight')

    // Proxy matchMedia to iframe's matchMedia
    try {
      ;(window as any).matchMedia = (q: string) => iframeWin.matchMedia(q)
    } catch (e) {
      // ignore if environment forbids
    }

    // Proxy innerWidth/innerHeight to iframe client size
    try {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        get: () => iframeRef.current!.clientWidth,
      })
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        get: () => iframeRef.current!.clientHeight,
      })
    } catch (e) {}

    // dispatch an initial resize so hooks update
    window.dispatchEvent(new Event('resize'))

    return () => {
      // restore originals
      try {
        (window as any).matchMedia = origMatchMedia
      } catch (e) {}
      try {
        if (origInnerWidthDesc) Object.defineProperty(window, 'innerWidth', origInnerWidthDesc)
        if (origInnerHeightDesc) Object.defineProperty(window, 'innerHeight', origInnerHeightDesc)
      } catch (e) {}
      window.dispatchEvent(new Event('resize'))
    }
  }, [ready])

  // When 'device' changes, resize iframe and notify both windows
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    iframe.style.width = `${size.width}px`
    iframe.style.height = `${size.height}px`
    // dispatch resize inside iframe and parent
    try {
      iframe.contentWindow?.dispatchEvent(new Event('resize'))
    } catch {}
    window.dispatchEvent(new Event('resize'))
  }, [device])

  return (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div
        className={cn(
          'relative bg-white border shadow-2xl transition-all duration-300 ease-in-out overflow-hidden rounded-lg',
          className
        )}
        style={containerStyle}
      >
        <iframe
          ref={iframeRef}
          title={`device-preview-${device}`}
          style={{ width: '100%', height: '100%', border: '0', display: 'block' }}
        />
        {ready && mountRef.current && createPortal(children, mountRef.current)}
      </div>
    </div>
  )
}
