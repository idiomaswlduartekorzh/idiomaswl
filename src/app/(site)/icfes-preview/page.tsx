'use client'

/**
 * Dev-only visual preview of the SPRINT 1 ICFES flow components.
 * Lives outside /dashboard so it is not auth-gated by middleware.
 * Uses a stub userId so the UI renders without a live Supabase session.
 */
import { useState } from 'react'
import { notFound } from 'next/navigation'
import { OnboardingFlow } from '@/components/icfes/OnboardingFlow'
import { DiagnosticTest } from '@/components/icfes/DiagnosticTest'
import { ICFES_DIAGNOSTIC_QUESTIONS } from '@/data/icfes-diagnostic-questions'

export default function IcfesPreviewPage() {
  const [view, setView] = useState<'onboarding' | 'diagnostic'>('onboarding')

  // Dev-only harness — never expose on the public production site.
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <div>
      <div className="fixed top-3 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/80 p-1 backdrop-blur">
        <button
          onClick={() => setView('onboarding')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            view === 'onboarding' ? 'bg-white text-black' : 'text-white'
          }`}
        >
          Onboarding
        </button>
        <button
          onClick={() => setView('diagnostic')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            view === 'diagnostic' ? 'bg-white text-black' : 'text-white'
          }`}
        >
          Diagnostic
        </button>
      </div>

      {view === 'onboarding' && (
        <OnboardingFlow userId="preview-user" onComplete={() => setView('diagnostic')} />
      )}
      {view === 'diagnostic' && (
        <DiagnosticTest
          userId="preview-user"
          questions={ICFES_DIAGNOSTIC_QUESTIONS}
          onComplete={() => setView('onboarding')}
        />
      )}
    </div>
  )
}
