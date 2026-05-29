import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Miembro Fundador WeLearn — Acceso Vitalicio al Método Coreano';
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
        {/* Glow — gold tone */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: '#c8a020', opacity: 0.14, filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: 0, width: 400, height: 400, borderRadius: '50%', background: '#c8202e', opacity: 0.1, filter: 'blur(80px)' }} />

        {/* Top badge */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(200,160,32,0.15)', border: '1px solid rgba(200,160,32,0.4)', color: '#fbbf24', fontSize: 14, fontWeight: 800, padding: '5px 18px', borderRadius: 999, letterSpacing: '0.06em' }}>
            ★ OFERTA FUNDADORES
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, padding: '5px 14px', borderRadius: 999 }}>
            Solo 50 cupos
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 54, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 880, flex: 1 }}>
          Acceso{' '}
          <span style={{ color: '#fbbf24' }}>vitalicio</span>
          {' '}al método completo de coreano.
          <br />
          <span style={{ fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
            Precio especial de por vida. Solo para los primeros 50.
          </span>
        </div>

        {/* Perks */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
          {['17 pasos del método', 'Clases en vivo', 'Comunidad privada', 'Precio fijo para siempre'].map(perk => (
            <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#fbbf24', fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{perk}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)' }}>
            한국어 · WeLearn Academy
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
