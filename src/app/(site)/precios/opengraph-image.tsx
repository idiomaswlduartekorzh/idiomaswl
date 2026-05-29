import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Planes y Precios — Clases de idiomas con WeLearn';
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
        {/* Glow */}
        <div style={{ position: 'absolute', top: -80, left: '50%', width: 600, height: 400, borderRadius: '50%', background: '#14215c', opacity: 0.5, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 400, height: 400, borderRadius: '50%', background: '#c8202e', opacity: 0.1, filter: 'blur(80px)' }} />

        {/* Label */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
            PLANES · CLASES EN VIVO
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 760, flex: 1 }}>
          Clases de idiomas
          <br />
          <span style={{ color: '#6b8cff' }}>a tu medida</span>.
        </div>

        {/* Plan cards */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 28 }}>
          {[
            { name: 'Clase de prueba', tag: 'GRATIS', desc: 'Diagnóstico + 1 clase', highlight: false },
            { name: 'Plan Intensivo',  tag: 'POPULAR', desc: 'Paquetes por horas',   highlight: true  },
            { name: 'Plan IELTS',      tag: 'EXAMEN',  desc: 'Preparación guiada',  highlight: false },
          ].map(plan => (
            <div key={plan.name} style={{
              flex: 1,
              background: plan.highlight ? 'rgba(200,32,46,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${plan.highlight ? 'rgba(200,32,46,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 14,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: plan.highlight ? '#ff8a8a' : 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{plan.tag}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{plan.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)' }}>
            Inglés · Coreano · IELTS · TOEFL · ICFES
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
