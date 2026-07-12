'use client'

import { useCallback } from 'react'

// Botón "Descargar PDF": abre el diálogo de impresión del navegador con una
// vista limpia (solo la lección), donde el usuario elige "Guardar como PDF".
// Es la vía sin dependencias: no añade librerías ni peso al bundle.
// El recorte de la página para impresión lo hace el CSS @media print de la
// propia página (imprime solo el bloque #printable).
export default function LessonPdfButton({ color }: { color: string }) {
  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') window.print()
  }, [])

  return (
    <button
      type="button"
      onClick={onClick}
      className="no-print"
      aria-label="Descargar esta lección en PDF"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.55rem 1rem', borderRadius: 10, cursor: 'pointer',
        border: `1.5px solid ${color}44`, background: `${color}0d`,
        color, fontWeight: 700, fontSize: '0.86rem', fontFamily: 'inherit',
      }}
    >
      <span aria-hidden>⬇️</span> Descargar PDF
    </button>
  )
}
