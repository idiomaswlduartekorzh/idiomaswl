'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  PRESENCE_HEARTBEAT_SECONDS,
  shouldTrackPresencePath,
} from '@/lib/presence'

export default function PresenceTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!enabled || !shouldTrackPresencePath(pathname)) return

    const heartbeat = () => {
      if (document.visibilityState !== 'visible') return
      void fetch('/api/presence/heartbeat', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, webdriver: navigator.webdriver === true }),
        cache: 'no-store',
        keepalive: true,
      }).catch(() => undefined)
    }

    heartbeat()
    const interval = window.setInterval(heartbeat, PRESENCE_HEARTBEAT_SECONDS * 1000)
    document.addEventListener('visibilitychange', heartbeat)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', heartbeat)
    }
  }, [enabled, pathname])

  return null
}
