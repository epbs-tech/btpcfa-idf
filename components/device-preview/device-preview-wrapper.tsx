// components/device-preview/device-preview-wrapper.tsx
'use client'
import React from 'react'
import { useDevicePreview } from './device-preview-provider'
import { DeviceFrame } from './device-frame'
import { DevicePreviewToggle } from './device-preview-toggle'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DevicePreviewWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const { currentDevice, setCurrentDevice, isPreviewMode, setIsPreviewMode } = useDevicePreview()

  return (
    <div className={cn('relative', className)}>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="shadow-lg bg-white/95 backdrop-blur-sm"
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" /> Exit Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </>
          )}
        </Button>

        {isPreviewMode && (
          <DevicePreviewToggle
            currentDevice={currentDevice}
            onDeviceChange={setCurrentDevice}
            className="shadow-lg bg-white/95 backdrop-blur-sm"
          />
        )}
      </div>

      {isPreviewMode ? <DeviceFrame device={currentDevice}>{children}</DeviceFrame> : <div className="w-full">{children}</div>}
    </div>
  )
}
