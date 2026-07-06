'use client'

/**
 * Dev-only visual preview of the SPRINT 1 ICFES flow components.
 * Lives outside /dashboard so it is not auth-gated by middleware.
 * Uses a stub userId so the UI renders without a live Supabase session.
 */
import { useState } from 'react'
import { OnboardingFlow } from '@/components/icfes/OnboardingFlow'
import { DiagnosticTest } from '@/components/icfes/DiagnosticTest'

const DEMO_QUESTIONS = [
  {
    id: '1',
    question_number: 1,
    question_text:
      'What does "enact" mean in: "The government enacted strict legislation"?',
    skill: 'vocabulary_context',
    difficulty: 2 as const,
    option_a: 'Cancel',
    option_b: 'Approve and put into law',
    option_c: 'Ignore',
    option_d: 'Study',
    correct_answer: 'B',
    explanation_es:
      '"Enact" significa promulgar o convertir en ley. Es un verbo común en textos legislativos.',
  },
  {
    id: '2',
    question_number: 2,
    question_text:
      'Which word can best replace "ambiguous" in: "The message was ambiguous"?',
    skill: 'vocabulary_context',
    difficulty: 2 as const,
    option_a: 'Clear',
    option_b: 'Confusing or unclear',
    option_c: 'Loud',
    option_d: 'Old',
    correct_answer: 'B',
    explanation_es:
      '"Ambiguous" significa que tiene más de un significado o es confuso.',
  },
]

export default function IcfesPreviewPage() {
  const [view, setView] = useState<'onboarding' | 'diagnostic'>('onboarding')

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
          questions={DEMO_QUESTIONS}
          onComplete={() => setView('onboarding')}
        />
      )}
    </div>
  )
}
