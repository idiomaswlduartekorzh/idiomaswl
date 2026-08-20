'use client'

import PdfDownloadButton from '@/components/practica/PdfDownloadButton'

// Envoltorio de cliente: IrregularVerbsReference es un server component (su
// tabla tiene que ser rastreable por Google), así que no puede pasar una
// función al botón. Este trozo mínimo es lo único que corre en el navegador.
export default function IrregularVerbsPdfButton({ color }: { color: string }) {
  return (
    <PdfDownloadButton
      color={color}
      compact
      label="Descargar la lista en PDF"
      generate={async () => {
        const { generateVerbsResourcePdf } = await import('@/lib/pdf/generateVerbsResourcePdf')
        await generateVerbsResourcePdf()
      }}
    />
  )
}
