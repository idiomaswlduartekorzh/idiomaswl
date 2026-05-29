import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Simulacros de IELTS, TOEFL, ICFES y más | WeLearn';
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
        <div style={{ position: 'absolute', top: -80, left: '30%', width: 500, height: 400, borderRadius: '50%', background: '#1a2ecc', opacity: 0.1, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 380, height: 380, borderRadius: '50%', background: '#c8202e', opacity: 0.1, filter: 'blur(80px)' }} />

        {/* Label */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
            SIMULACROS · PRÁCTICA REAL
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', flex: 1 }}>
          Practica con{' '}
          <span style={{ color: '#6b8cff' }}>exámenes reales</span>.
        </div>

        {/* Exam grid */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {[
            { name: 'IELTS',      color: '#c8202e' },
            { name: 'TOEFL iBT',  color: '#1a6e3c' },
            { name: 'ICFES',      color: '#0f7c3e' },
            { name: 'Goethe',     color: '#1a2ecc' },
            { name: 'DELF',       color: '#1a2ecc' },
            { name: 'CILS',       color: '#b45309' },
          ].map(exam => (
            <div key={exam.name} style={{
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: 10,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: exam.color }}>{exam.name}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)' }}>
            7 certificaciones · Feedback con IA · 100% online
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
