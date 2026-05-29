import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Idiomas WeLearn — Aprende un idioma, en serio';
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
          background: 'linear-gradient(135deg, #0d0d14 0%, #14215c 60%, #1a2ecc 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(200,32,46,0.15)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(26,46,204,0.2)',
            filter: 'blur(60px)',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: '#c8202e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              W
            </div>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Idiomas WeLearn
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.04em',
              maxWidth: 900,
            }}
          >
            Aprende un idioma,{' '}
            <span style={{ color: '#ff6b7a' }}>en serio.</span>
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Coreano · Inglés · Francés · Alemán · Italiano · Portugués
          </div>

          {/* URL */}
          <div
            style={{
              marginTop: 12,
              fontSize: 18,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
            }}
          >
            idiomaswl.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
