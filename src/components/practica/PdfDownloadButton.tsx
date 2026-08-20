'use client'

import { useCallback, useState } from 'react'

/**
 * Botón «Descargar PDF» — el mismo para gramática, lectura, vocabulario e
 * historias. Recibe la función que fabrica el PDF, no los datos: así jsPDF y el
 * generador se cargan solo cuando alguien pulsa, y no pesan en la carga inicial
 * de ninguna página.
 *
 * Hoy la descarga es libre y de un clic, por decisión de producto. Cuando haya
 * suscripción, el candado va aquí: es el único sitio por el que pasan todas las
 * descargas del sitio.
 */
// Azul de marca. Vive aquí, y no en quien llama, porque varias de las carpetas
// que usan el botón están vigiladas por el guardián de colores del prebuild:
// un hex suelto ahí rompe el build. Además, `color` se concatena con la opacidad
// (`${color}44`), así que tiene que ser un hexadecimal literal — una
// `var(--token)` produciría `var(--token)44`, que no es un color.
const AZUL_WELEARN = '#14215c'

export default function PdfDownloadButton({
  generate,
  color = AZUL_WELEARN,
  label = 'Descargar PDF',
  compact = false,
}: {
  generate: () => Promise<void>
  color?: string
  label?: string
  compact?: boolean
}) {
  const [state, setState] = useState<'idle' | 'busy' | 'error'>('idle')

  // El color se concatena con la opacidad (`${tono}44`), así que solo sirve un
  // hexadecimal. Varias secciones guardan su acento como `var(--token)`, y
  // concatenarlo produce `var(--token)44`, que el navegador descarta en
  // silencio: el botón se queda sin borde y sin fondo, y nadie se entera.
  const tono = /^#[0-9a-fA-F]{6}$/.test(color) ? color : AZUL_WELEARN

  const onClick = useCallback(async () => {
    if (state === 'busy') return
    setState('busy')
    try {
      await generate()
      setState('idle')
    } catch (err) {
      // Un fallo silencioso deja al usuario pulsando un botón que no hace nada.
      console.error('No se pudo generar el PDF', err)
      setState('error')
    }
  }, [generate, state])

  const texto = state === 'busy' ? 'Generando…' : state === 'error' ? 'No se pudo generar' : label

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'busy'}
      className="no-print"
      aria-label={`${label} — material de Idiomas WeLearn`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: compact ? '0.4rem 0.75rem' : '0.55rem 1rem',
        borderRadius: 10,
        cursor: state === 'busy' ? 'wait' : 'pointer',
        border: `1.5px solid ${state === 'error' ? '#c8202e' : `${tono}44`}`,
        background: state === 'error' ? 'rgba(200,32,46,0.06)' : `${tono}0d`,
        color: state === 'error' ? '#c8202e' : tono,
        fontWeight: 700,
        fontSize: compact ? '0.8rem' : '0.86rem',
        fontFamily: 'inherit',
        opacity: state === 'busy' ? 0.65 : 1,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {texto}
    </button>
  )
}
