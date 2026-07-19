'use client'

import Link from 'next/link'
import type { TutorLocale } from '@/lib/reading/types'

export function LocaleSwitchLink({ href, locale, children }: { href: string; locale: TutorLocale; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={() => window.localStorage.setItem('wl-reading-locale', locale)}
    >
      {children}
    </Link>
  )
}

