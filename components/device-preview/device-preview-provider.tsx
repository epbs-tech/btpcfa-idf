// components/device-preview/device-preview-provider.tsx
'use client'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

export type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface DevicePreviewContextType {
  currentDevice: DeviceType
  setCurrentDevice: (d: DeviceType) => void
  isPreviewMode: boolean
  setIsPreviewMode: (v: boolean) => void
}

const DevicePreviewContext = createContext<DevicePreviewContextType | undefined>(undefined)

export function useDevicePreview() {
  const ctx = useContext(DevicePreviewContext)
  if (!ctx) throw new Error('useDevicePreview must be used within DevicePreviewProvider')
  return ctx
}

/** Device pixel sizes used for emulation (logical CSS pixels) */
export const DEVICE_SIZES: Record<DeviceType, { width: number; height: number }> = {
  desktop: { width: 1200, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
}

export function DevicePreviewProvider({
  children,
  defaultDevice = 'desktop',
}: {
  children: React.ReactNode
  defaultDevice?: DeviceType
}) {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(defaultDevice)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <DevicePreviewContext.Provider
      value={{ currentDevice, setCurrentDevice, isPreviewMode, setIsPreviewMode }}
    >
      {children}
    </DevicePreviewContext.Provider>
  )
}
