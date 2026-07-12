'use client'

import { useCallback, useState } from 'react'
import { generateVerbsResourcePdf } from '@/lib/generateVerbsResourcePdf'

// Descarga en un clic el PDF de referencia de los 100 verbos irregulares.
// jsPDF se carga de forma diferida (solo al pulsar), igual que LessonPdfButton.
export default function VerbsResourcePdfButton({ color, large = false }: { color: string; large?: boolean }) {
  const [busy, setBusy] = useState(false)

  const onClick = useCallback(async () => {
    if (busy) return
    setBusy(true)
    try {
      await generateVerbsResourcePdf()
    } catch (err) {
      console.error('No se pudo generar el PDF', err)
    } finally {
      setBusy(false)
    }
  }, [busy])

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-label="Descargar la lista de 100 verbos irregulares en PDF"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
        padding: large ? '0.85rem 1.6rem' : '0.55rem 1rem',
        borderRadius: 12, cursor: busy ? 'wait' : 'pointer', border: 'none',
        background: color, color: '#fff', fontWeight: 800,
        fontSize: large ? '1rem' : '0.86rem', fontFamily: 'inherit',
        opacity: busy ? 0.7 : 1, boxShadow: `0 8px 24px ${color}33`,
      }}
    >
      <span aria-hidden>⬇️</span> {busy ? 'Generando…' : 'Descargar PDF gratis'}
    </button>
  )
}
