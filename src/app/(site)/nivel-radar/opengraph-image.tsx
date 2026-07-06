import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nivel Radar — ¿Cuál es tu nivel real de inglés? | WeLearn';
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
          background: '#0a0e1a',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: '#c8202e', opacity: 0.16, filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -60, width: 420, height: 420, borderRadius: '50%', background: '#22c55e', opacity: 0.1, filter: 'blur(100px)' }} />

        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(200,32,46,0.2)', border: '1px solid rgba(200,32,46,0.4)', color: '#f87171', fontSize: 14, fontWeight: 800, padding: '5px 18px', borderRadius: 999, letterSpacing: '0.06em' }}>
            📡 NIVEL RADAR
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, padding: '5px 14px', borderRadius: 999 }}>
            90 segundos · Gratis
          </div>
        </div>

        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 900, flex: 1 }}>
          ¿Cuál es tu{' '}
          <span style={{ color: '#c8202e' }}>nivel real</span>
          {' '}de inglés?
          <br />
          <span style={{ fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
            No tu diploma. Lo que tu cerebro procesa de verdad.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)' }}>
            6 preguntas · Resultado instantáneo
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
