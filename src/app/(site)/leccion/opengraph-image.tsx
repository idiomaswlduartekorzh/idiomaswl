import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lecciones WeLearn — 11 etapas diarias para aprender idiomas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STAGES = [
  { n: '01', label: 'Activación',    color: '#c8202e' },
  { n: '02', label: 'Adquisición',   color: '#d97706' },
  { n: '03', label: 'Reconocimiento', color: '#16a34a' },
  { n: '04', label: 'Escucha',       color: '#1a4fcc' },
  { n: '05', label: 'Contexto',      color: '#7c3aed' },
  { n: '06', label: 'Patrón',        color: '#0f7c3e' },
  { n: '07', label: 'Explicación',   color: '#c8202e' },
  { n: '08', label: 'Producción',    color: '#d97706' },
  { n: '09', label: 'Interacción',   color: '#1a4fcc' },
  { n: '10', label: 'Smart Review',  color: '#16a34a' },
  { n: '11', label: 'Cierre',        color: '#7c3aed' },
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
        {/* Glow */}
        <div style={{ position: 'absolute', bottom: -60, right: -40, width: 400, height: 400, borderRadius: '50%', background: '#7c3aed', opacity: 0.1, filter: 'blur(80px)' }} />

        {/* Badge */}
        <div style={{ display: 'flex', marginBottom: 28 }}>
          <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999, letterSpacing: '0.05em' }}>
            LECCIONES DIARIAS · MÉTODO WELEARN
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 32 }}>
          Cada día, 11 etapas.<br />
          <span style={{ color: '#a78bfa' }}>El idioma se interioriza solo.</span>
        </div>

        {/* Stage row */}
        <div style={{ display: 'flex', gap: 6, flex: 1, alignItems: 'flex-start', flexWrap: 'wrap', alignContent: 'flex-start' }}>
          {STAGES.map(st => (
            <div key={st.n} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '5px 11px',
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: st.color }}>{st.n}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{st.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 20 }}>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>Coreano · Inglés · Francés · Alemán · Italiano · Portugués</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#c8202e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 800 }}>W</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
