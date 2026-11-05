'use client'

import { useState } from 'react'
import { WritingFeedbackReview } from '@/components/writing/WritingFeedbackReview'

export function StudentAssignmentWritingField({ title, instructions }: { title: string; instructions: string }) {
  const [text, setText] = useState('')
  const assignment = {
    title,
    language: 'Inferir del borrador y de la consigna',
    level: 'No especificado; adaptar la complejidad a la respuesta',
    prompt: `${title}\n\n${instructions}`.trim(),
    objectives: ['Cumplir la consigna y comunicar las ideas con claridad'],
    focus: ['Gramática y vocabulario adecuados al texto'],
  }

  return <>
    <textarea
      aria-label={`Respuesta para ${title}`}
      name="submissionText"
      rows={4}
      maxLength={12_000}
      placeholder="Escribe aquí tu respuesta, observaciones o el texto solicitado"
      value={text}
      onChange={(event) => setText(event.target.value)}
    />
    <WritingFeedbackReview text={text} assignment={assignment} />
  </>
}
