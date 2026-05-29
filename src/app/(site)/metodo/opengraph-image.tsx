import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'El Método WeLearn — 11 etapas para interiorizar un idioma';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STAGES = [
  'Activación', 'Adquisición', 'Reconocimiento', 'Escucha', 'Contexto',
  'Patrón', 'Explicación', 'Producción', 'Interacción', 'Smart Review', 'Cierre',
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
          padding: '56px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glows */}
        <div style={{ position: 'absolute', top: -80, left: -40, width: 420, height: 420, borderRadius: '50%', background: '#c8202e', opacity: 0.09, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 360, height: 360, borderRadius: '50%', background: '#1a2ecc', opacity: 0.09, filter: 'blur(80px)' }} />

        {/* Badge */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.04em' }}>
            METODOLOGÍA PEDAGÓGICA · WELEARN
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 60, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 32 }}>
          11 etapas que cambian<br />
          <span style={{ color: '#f87171' }}>cómo aprendes idiomas.</span>
        </div>

        {/* Stage pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1, alignContent: 'flex-start' }}>
          {STAGES.map((stage, i) => (
            <div key={stage} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              padding: '6px 14px',
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#c8202e', minWidth: 16 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{stage}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 28 }}>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>
            Diseñado por Dra. Zhanna Korzh, PhD Filología
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
