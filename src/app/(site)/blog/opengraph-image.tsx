import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog de Idiomas — IELTS, TOEFL, Coreano y más | WeLearn';
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
        {/* Glows */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 460, height: 460, borderRadius: '50%', background: '#1a2ecc', opacity: 0.1, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: 100, width: 360, height: 360, borderRadius: '50%', background: '#c8202e', opacity: 0.09, filter: 'blur(80px)' }} />

        {/* Label */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.04em' }}>
            BLOG · RECURSOS GRATUITOS
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', flex: 1 }}>
          Aprende un idioma
          <br />
          <span style={{ color: '#6b8cff' }}>con guías reales</span>.
        </div>

        {/* Article previews */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          {[
            { cat: 'IELTS',    title: 'Cómo sacar Band 7',  color: '#1a2ecc' },
            { cat: 'Coreano',  title: 'Aprender desde cero', color: '#c8202e' },
            { cat: 'TOEFL',    title: 'Guía completa iBT',   color: '#1a6e3c' },
          ].map(p => (
            <div key={p.cat} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: p.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{p.cat}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.35 }}>{p.title}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)' }}>
            17 artículos · IELTS · TOEFL · ICFES · Coreano
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
