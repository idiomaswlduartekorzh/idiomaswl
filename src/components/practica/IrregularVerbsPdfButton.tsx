import { IRREGULAR_VERBS_REFERENCE_PDF } from '@/data/practica/recursos/verbos-irregulares-100'

// Descarga estable del PDF editorial que también aparece en la biblioteca del
// tema. La tabla HTML permanece rastreable y el enlace funciona sin fabricar
// un segundo archivo distinto en el navegador.
export default function IrregularVerbsPdfButton({ color }: { color: string }) {
  const tone = /^#[0-9a-fA-F]{6}$/.test(color) ? color : '#14215c'

  return (
    <a
      href={IRREGULAR_VERBS_REFERENCE_PDF}
      download
      aria-label="Descargar la tabla completa de 100 verbos irregulares en PDF"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.48rem 0.8rem',
        borderRadius: 10, border: `1.5px solid ${tone}44`, background: `${tone}0d`,
        color: tone, fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none',
      }}
    >
      <span aria-hidden="true">↓</span>
      Descargar tabla completa · 100 verbos
    </a>
  )
}
