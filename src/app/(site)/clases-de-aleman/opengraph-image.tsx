import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clases de Alemán Online — Preparación Goethe-Zertifikat | WeLearn';
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
          background: '#060a12',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glows */}
        <div style={{ position: 'absolute', top: -80, left: '25%', width: 500, height: 400, borderRadius: '50%', background: '#1a2ecc', opacity: 0.1, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 100, width: 300, height: 300, borderRadius: '50%', background: '#FFCB00', opacity: 0.06, filter: 'blur(80px)' }} />

        {/* Flag + label */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, alignItems: 'center' }}>
          <div style={{ fontSize: 36 }}>🇩🇪</div>
          <div style={{ background: 'rgba(79,111,255,0.12)', border: '1px solid rgba(79,111,255,0.25)', color: '#7b93ff', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
            ALEMÁN ONLINE · PREPARACIÓN GOETHE-ZERTIFIKAT
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 62, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Aprende alemán<br />
          <span style={{ color: '#4f6fff' }}>de verdad.</span>
        </div>

        {/* Goethe level badges */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {['A1', 'A2', 'B1', 'B2', 'C1'].map(level => (
            <div key={level} style={{
              background: 'rgba(26,46,204,0.15)',
              border: '1px solid rgba(79,111,255,0.3)',
              borderRadius: 10,
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#7b93ff' }}>{level}</span>
            </div>
          ))}
          <div style={{
            background: 'rgba(26,46,204,0.15)',
            border: '1px solid rgba(79,111,255,0.3)',
            borderRadius: 10,
            padding: '10px 18px',
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#7b93ff' }}>Goethe-Zertifikat</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)' }}>
            Clase diagnóstico gratis · Tutor especializado · 100% online
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1a2ecc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
