import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clases de Inglés en Bucaramanga — IELTS, TOEFL, ICFES | WeLearn';
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
        <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: '#1a2ecc', opacity: 0.13, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 400, height: 400, borderRadius: '50%', background: '#c8202e', opacity: 0.1, filter: 'blur(80px)' }} />

        {/* Location badge + exam badges */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: '#1a2ecc', color: '#fff', fontSize: 14, fontWeight: 800, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            📍 Bucaramanga
          </div>
          {['IELTS', 'TOEFL iBT', 'ICFES'].map(exam => (
            <div key={exam} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 14, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
              {exam}
            </div>
          ))}
        </div>

        {/* Headline */}
        <div style={{ fontSize: 54, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 900, flex: 1 }}>
          Academia de inglés{' '}
          <span style={{ color: '#6b8cff' }}>en Bucaramanga</span>
          <br />
          y toda Colombia.
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)' }}>
            Paquetes de horas · Clases 1:1 · Diagnóstico gratis
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
