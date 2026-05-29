import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Idiomas WeLearn — Aprende un idioma, en serio.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LANGS = [
  { name: 'Coreano',    glyph: '한', color: '#c8202e' },
  { name: 'Inglés',     glyph: 'EN', color: '#1a4fcc' },
  { name: 'Francés',    glyph: 'FR', color: '#1a4fcc' },
  { name: 'Alemán',     glyph: 'DE', color: '#d97706' },
  { name: 'Italiano',   glyph: 'IT', color: '#16a34a' },
  { name: 'Portugués',  glyph: 'PT', color: '#15803d' },
];

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
          padding: '60px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glows */}
        <div style={{ position: 'absolute', top: -80, right: 60, width: 440, height: 440, borderRadius: '50%', background: '#c8202e', opacity: 0.08, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: 80, width: 340, height: 340, borderRadius: '50%', background: '#1a4fcc', opacity: 0.09, filter: 'blur(80px)' }} />

        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#c8202e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 800 }}>W</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Idiomas WeLearn</span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 62, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Aprende un idioma,
          <br />
          <span style={{ color: '#f87171' }}>en serio.</span>
        </div>

        {/* Language grid */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {LANGS.map(l => (
            <div key={l.name} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: l.color }}>{l.glyph}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{l.name}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>
            Método de 11 etapas · Simulacros IELTS, TOEFL, ICFES · Desde Bucaramanga
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>idiomaswl.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
