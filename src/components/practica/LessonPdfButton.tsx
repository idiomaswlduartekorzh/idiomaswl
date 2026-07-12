'use client'

import { useCallback, useState } from 'react'
import type { GrammarTopic } from '@/data/practica/grammar-types'
import { generateTopicPdf } from '@/lib/generateTopicPdf'

// Botón "Descargar PDF": genera y descarga en UN CLIC un PDF membretado con la
// marca WeLearn (logo + colores + encabezado y pie), armado desde los datos del
// tema. jsPDF se carga de forma diferida (solo al pulsar), así no pesa el bundle.
export default function LessonPdfButton({
  topic, levelLabel, skillLabel, url, color,
}: {
  topic: GrammarTopic
  levelLabel: string
  skillLabel: string
  url: string
  color: string
}) {
  const [busy, setBusy] = useState(false)

  const onClick = useCallback(async () => {
    if (busy) return
    setBusy(true)
    try {
      await generateTopicPdf(topic, { levelLabel, skillLabel, url })
    } catch (err) {
      console.error('No se pudo generar el PDF', err)
    } finally {
      setBusy(false)
    }
  }, [busy, topic, levelLabel, skillLabel, url])

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="no-print"
      aria-label="Descargar esta lección en PDF"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.55rem 1rem', borderRadius: 10, cursor: busy ? 'wait' : 'pointer',
        border: `1.5px solid ${color}44`, background: `${color}0d`,
        color, fontWeight: 700, fontSize: '0.86rem', fontFamily: 'inherit',
        opacity: busy ? 0.6 : 1,
      }}
    >
      <span aria-hidden>⬇️</span> {busy ? 'Generando…' : 'Descargar PDF'}
    </button>
  )
}
