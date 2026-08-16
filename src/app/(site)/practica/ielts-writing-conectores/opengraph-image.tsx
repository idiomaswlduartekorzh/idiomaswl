import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Conectores IELTS Writing Task 1 — Práctica Interactiva | WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TAGS = [
  '📝 7 oraciones reales',
  '🔗 13 conectores',
  '⚠️ Trampas ocultas',
  '📊 Feedback Band 6–7',
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
          background: '#0a1628',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -80, right: -80, width: 480, height: 480, borderRadius: '50%', background: '#0f3d8c', opacity: 0.18, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: 60, width: 300, height: 300, borderRadius: '50%', background: '#1a2ecc', opacity: 0.1, filter: 'blur(80px)' }} />

        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(15,61,140,0.3)', border: '1px solid rgba(99,140,255,0.4)', color: '#93b4ff', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.04em' }}>
            IELTS WRITING TASK 1 · PRÁCTICA INTERACTIVA
          </div>
        </div>

        <div style={{ fontSize: 54, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Práctica de
          <br />
          <span style={{ color: 'var(--wl-on-panel-link, #5b8cff)' }}>Conectores IELTS</span>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          {TAGS.map(tag => (
            <div key={tag} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '12px 16px',
              fontSize: 13,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
            }}>
              {tag}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)' }}>
            Ordena oraciones · Elige conectores · Feedback Band 6–7
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#0f3d8c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
