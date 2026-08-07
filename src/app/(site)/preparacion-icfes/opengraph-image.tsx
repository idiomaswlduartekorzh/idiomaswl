import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Preparación ICFES Inglés — Sube tu puntaje con WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0d0d14',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: '#0f7c3e', opacity: 0.18, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 400, height: 400, borderRadius: '50%', background: '#22c55e', opacity: 0.07, filter: 'blur(80px)' }} />

        {/* Badges */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          {['ICFES', 'Módulo de inglés', 'Pre A1 → B1'].map(tag => (
            <div key={tag} style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: 14, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Headline */}
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 880, flex: 1 }}>
          Sube tu puntaje de inglés{' '}
          <span style={{ color: '#4ade80' }}>en el ICFES</span>.
          <br />
          <span style={{ fontSize: 34, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>
            Clases enfocadas en lo que sí entra al examen.
          </span>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
          {[
            { n: '55', label: 'preguntas en 2026-2' },
            { n: '8 sem', label: 'plan intensivo' },
            { n: '100%', label: 'online Colombia' },
          ].map(stat => (
            <div key={stat.n} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#4ade80' }}>{stat.n}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)' }}>
            Bucaramanga · Para toda Colombia
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#c8202e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
