'use client'

/**
 * Dev-only visual preview of the ICFES flow components.
 * Lives outside /dashboard so it is not auth-gated by middleware.
 * Uses a stub userId so the UI renders without a live Supabase session.
 */
import { useState } from 'react'
import { notFound } from 'next/navigation'
import { OnboardingFlow } from '@/components/icfes/OnboardingFlow'
import { DiagnosticTest } from '@/components/icfes/DiagnosticTest'
import { VocabularyEngine } from '@/components/icfes/VocabularyEngine'
import { ICFES_DIAGNOSTIC_QUESTIONS } from '@/data/icfes-diagnostic-questions'
import { ICFES_VOCABULARY } from '@/data/icfes-vocabulary'
import { newProgress } from '@/lib/icfes/srs'
import type { VocabularyCard } from '@/lib/types/icfes'

type View = 'onboarding' | 'diagnostic' | 'vocabulary'

const VIEWS: View[] = ['onboarding', 'diagnostic', 'vocabulary']

// A small stub session for the vocabulary drill (all new cards).
const PREVIEW_CARDS: VocabularyCard[] = ICFES_VOCABULARY.slice(0, 6).map((w) => ({
  word: w,
  progress: newProgress(w.id),
}))

export default function IcfesPreviewPage() {
  const [view, setView] = useState<View>('onboarding')

  // Dev-only harness — never expose on the public production site.
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <div>
      <div className="fixed top-3 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/80 p-1 backdrop-blur">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              view === v ? 'bg-white text-black' : 'text-white'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === 'onboarding' && (
        <OnboardingFlow userId="preview-user" onComplete={() => setView('diagnostic')} />
      )}
      {view === 'diagnostic' && (
        <DiagnosticTest
          userId="preview-user"
          questions={ICFES_DIAGNOSTIC_QUESTIONS}
          onComplete={() => setView('vocabulary')}
        />
      )}
      {view === 'vocabulary' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-16 dark:from-slate-950 dark:to-slate-900">
          <VocabularyEngine
            userId="preview-user"
            cards={PREVIEW_CARDS}
            onFinish={() => setView('onboarding')}
          />
        </div>
      )}
    </div>
  )
}
