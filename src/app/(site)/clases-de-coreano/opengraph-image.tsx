import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clases de Coreano Online — TOPIK, K-dramas, Hangeul | WeLearn';
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
        <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: '#c8202e', opacity: 0.13, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 400, height: 400, borderRadius: '50%', background: '#ff6b6b', opacity: 0.07, filter: 'blur(80px)' }} />

        {/* Top tag */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          {['한국어', 'TOPIK I & II', '100% Online'].map(tag => (
            <div key={tag} style={{ background: 'rgba(200,32,46,0.15)', border: '1px solid rgba(200,32,46,0.35)', color: '#ff8a8a', fontSize: 14, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Headline */}
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 860, flex: 1 }}>
          Aprende coreano{' '}
          <span style={{ color: '#ff6b6b' }}>de verdad</span>.
          <br />
          <span style={{ fontSize: 36, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            Desde cero hasta TOPIK II.
          </span>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)' }}>
            Método de 17 pasos · K-dramas · Cultura
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
