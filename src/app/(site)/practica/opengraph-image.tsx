import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Práctica de Coreano — Lector Hangul interactivo | WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TOOLS = [
  { icon: '한', label: 'Lector Hangul',      color: 'var(--wl-on-panel-alert, #c8202e)' },
  { icon: 'ㅂ',  label: 'Reglas Batchim',    color: 'var(--wl-on-panel-alert, #c8202e)' },
  { icon: '📖', label: 'Textos A1–B1',       color: 'var(--wl-on-panel-alert, #8b1c1c)' },
  { icon: '🎙', label: 'Pronunciación',       color: 'var(--wl-on-panel-alert, #c8202e)' },
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
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glows */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 400, height: 400, borderRadius: '50%', background: '#c8202e', opacity: 0.08, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: 80, width: 320, height: 320, borderRadius: '50%', background: '#1a2ecc', opacity: 0.07, filter: 'blur(80px)' }} />

        {/* Label */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(200,32,46,0.15)', border: '1px solid rgba(200,32,46,0.3)', color: 'var(--wl-on-panel-alert, #f87171)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.04em' }}>
            PRÁCTICA INTERACTIVA · COREANO
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Practica coreano
          <span style={{ color: 'var(--wl-on-panel-alert, #f87171)' }}>en tiempo real.</span>
        </div>

        {/* Tool pills */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          {TOOLS.map(t => (
            <div key={t.label} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <div style={{ fontSize: 22, lineHeight: 1 }}>{t.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>{t.label}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)' }}>
            Hangul interactivo · Batchim · Lectura guiada
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
