import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clases de Italiano Online — Preparación CILS y CELI | WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#030d08', fontFamily: 'system-ui, sans-serif', padding: '64px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '25%', width: 500, height: 400, borderRadius: '50%', background: '#009246', opacity: 0.1, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 320, height: 320, borderRadius: '50%', background: '#ce2b37', opacity: 0.06, filter: 'blur(80px)' }} />

        <div style={{ display: 'flex', gap: 12, marginBottom: 32, alignItems: 'center' }}>
          <div style={{ fontSize: 36 }}>🇮🇹</div>
          <div style={{ background: 'rgba(0,146,70,0.12)', border: '1px solid rgba(77,222,150,0.25)', color: '#4dde96', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
            ITALIANO ONLINE · PREPARACIÓN CILS Y CELI
          </div>
        </div>

        <div style={{ fontSize: 62, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', flex: 1 }}>
          Aprende italiano<br />
          <span style={{ color: '#4dde96' }}>de verdad.</span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {['A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
            <div key={level} style={{ background: 'rgba(0,146,70,0.15)', border: '1px solid rgba(77,222,150,0.3)', borderRadius: 10, padding: '10px 18px' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#4dde96' }}>{level}</span>
            </div>
          ))}
          <div style={{ background: 'rgba(0,146,70,0.15)', border: '1px solid rgba(77,222,150,0.3)', borderRadius: 10, padding: '10px 18px' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#4dde96' }}>CILS · CELI</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)' }}>Clase diagnóstico gratis · Ciudadanía italiana · 100% online</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#009246', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
