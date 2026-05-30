import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clases de Portugués Online — Preparación Celpe-Bras | WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#020a04', fontFamily: 'system-ui, sans-serif', padding: '64px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '20%', width: 500, height: 400, borderRadius: '50%', background: '#166534', opacity: 0.12, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 300, height: 300, borderRadius: '50%', background: '#FFDF00', opacity: 0.05, filter: 'blur(80px)' }} />

        <div style={{ display: 'flex', gap: 12, marginBottom: 32, alignItems: 'center' }}>
          <div style={{ fontSize: 36 }}>🇧🇷</div>
          <div style={{ background: 'rgba(22,101,52,0.15)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
            PORTUGUÉS ONLINE · PREPARACIÓN CELPE-BRAS
          </div>
        </div>

        <div style={{ fontSize: 62, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Aprende portugués<br />
          <span style={{ color: '#4ade80' }}>de verdad.</span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {['Intermediário', 'Inter. Superior', 'Avançado', 'Superior'].map(level => (
            <div key={level} style={{ background: 'rgba(22,101,52,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 10, padding: '10px 18px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{level}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)' }}>Clase diagnóstico gratis · Celpe-Bras · 100% online</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
