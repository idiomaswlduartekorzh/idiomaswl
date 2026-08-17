import { ImageResponse } from 'next/og'

/**
 * Imagen para redes de toda la sección de herramientas.
 *
 * Se hereda hacia `transcripcion-fonetica/**`, así que una sola cubre la sección entera.
 * Sin ella, compartir la herramienta enseñaba la imagen genérica del sitio, que es la
 * misma que sale al compartir la portada.
 *
 * Los colores van escritos: esto se genera en el servidor y no ve el CSS del sitio, así
 * que aquí no hay tokens que pedir prestados.
 */

export const runtime = 'edge'
export const alt = 'Herramientas gratuitas — Transcripción fonética | Idiomas WeLearn'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0f1420',
          padding: '64px 72px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#f2b65a',
            }}
          >
            Idiomas WeLearn · Gratis
          </div>
          <div style={{ display: 'flex', fontSize: 78, color: '#f4f7fb', lineHeight: 1.05 }}>
            Transcripción fonética
          </div>
        </div>

        {/* La muestra en AFI: dice qué hace la herramienta sin una sola palabra de más. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            borderLeft: '5px solid #f2b65a',
            paddingLeft: 28,
          }}
        >
          <div style={{ display: 'flex', fontSize: 40, color: '#8fa3bd' }}>
            The teacher asked her students
          </div>
          <div style={{ display: 'flex', fontSize: 46, color: '#f4f7fb' }}>
            ðə ˈtiːtʃər ɑːskt hə ˈstjuːdənts
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#8fa3bd' }}>
          Británico y americano · Sin registro · idiomaswl.com
        </div>
      </div>
    ),
    size,
  )
}
