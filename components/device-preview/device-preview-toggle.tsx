// components/device-preview/device-preview-toggle.tsx
'use client'
import React from 'react'
import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DeviceType } from './device-preview-provider'

interface Props {
  currentDevice: DeviceType
  onDeviceChange: (device: DeviceType) => void
  className?: string
}

export function DevicePreviewToggle({ currentDevice, onDeviceChange, className }: Props) {
  const devices = [
    { type: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { type: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { type: 'mobile' as const, icon: Smartphone, label: 'Mobile' },
  ]

  return (
    <div className={cn('flex items-center space-x-1 p-1 bg-muted rounded-lg', className)}>
      {devices.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant={currentDevice === type ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onDeviceChange(type)}
          className={cn('flex items-center space-x-2 transition-all', currentDevice === type && 'shadow-sm')}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  )
}
