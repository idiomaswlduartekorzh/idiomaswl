import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clases de Idiomas Online en Colombia — Inglés, Coreano, Francés, Alemán, Italiano, Portugués | WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#050a14', fontFamily: 'system-ui, sans-serif', padding: '64px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '20%', width: 600, height: 400, borderRadius: '50%', background: '#60a5fa', opacity: 0.08, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 400, height: 300, borderRadius: '50%', background: '#34d399', opacity: 0.06, filter: 'blur(80px)' }} />

        <div style={{ display: 'flex', gap: 10, marginBottom: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          {['🇬🇧', '🇰🇷', '🇫🇷', '🇩🇪', '🇮🇹', '🇧🇷'].map(flag => (
            <span key={flag} style={{ fontSize: 32 }}>{flag}</span>
          ))}
          <div style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999, marginLeft: 8 }}>
            IDIOMAS WELEARN · COLOMBIA
          </div>
        </div>

        <div style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Clases de idiomas<br />
          <span style={{ color: '#60a5fa' }}>online. 1:1. En serio.</span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {['Inglés', 'Coreano', 'Francés', 'Alemán', 'Italiano', 'Portugués'].map(lang => (
            <div key={lang} style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: 10, padding: '10px 18px' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#93c5fd' }}>{lang}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>IELTS · TOEFL · Goethe · DELF · CILS · Celpe-Bras · TOPIK · Primera clase gratis</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1a4fcc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
