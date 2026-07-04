import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Idiomas WeLearn — Links';
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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #0a0e1e 0%, #10142c 55%, #0a0e1e 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 40, left: -20, display: 'flex', flexDirection: 'column', gap: 10, transform: 'rotate(-38deg)' }}>
          <div style={{ width: 60, height: 20, borderRadius: 999, background: '#1a2ecc', opacity: 0.6 }} />
          <div style={{ width: 60, height: 20, borderRadius: 999, background: '#1a2ecc', opacity: 0.6 }} />
          <div style={{ width: 60, height: 20, borderRadius: 999, background: '#1a2ecc', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'absolute', top: 40, right: -20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, transform: 'rotate(-38deg)' }}>
          <div style={{ width: 60, height: 20, borderRadius: 999, background: '#e8192c', opacity: 0.6 }} />
          <div style={{ width: 60, height: 20, borderRadius: 999, background: '#e8192c', opacity: 0.6 }} />
          <div style={{ width: 60, height: 20, borderRadius: 999, background: '#e8192c', opacity: 0.6 }} />
        </div>

        <div style={{ width: 120, height: 120, borderRadius: 30, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 800, color: '#1a2ecc', marginBottom: 28, fontStyle: 'italic' }}>
          W
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Idiomas WeLearn</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: '#e8192c', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 14 }}>
          THE POWER OF COMMUNICATION
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', marginTop: 22 }}>idiomaswl.com/links</div>
      </div>
    ),
    { ...size }
  );
}
