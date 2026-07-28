import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Aprende el idioma que tu meta necesita — Idiomas WeLearn.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const WORDS = ['nivel', 'práctica', 'feedback', 'meta'];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f7f8fc',
          color: '#0b1c5e',
          fontFamily: 'Arial, sans-serif',
          padding: '56px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -60,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #dce3ff, rgba(247,248,252,0))',
          }}
        />

        <div style={{ width: '64%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 72 }}>
            <div
              style={{
                width: 45,
                height: 45,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                background: '#1a2ecc',
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              W
            </div>
            <span style={{ fontSize: 20, fontWeight: 700 }}>Idiomas WeLearn</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 68,
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: '-0.05em',
            }}
          >
            Aprende el idioma
            <span style={{ color: '#1a2ecc' }}>que tu meta necesita.</span>
          </div>

          <div style={{ display: 'flex', marginTop: 'auto', color: '#667099', fontSize: 17 }}>
            Clases · práctica · preparación de exámenes · Bucaramanga y online
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '36%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 230,
              height: 230,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              background: '#1a2ecc',
              fontSize: 44,
              fontWeight: 900,
              boxShadow: '0 0 0 22px rgba(26,46,204,.08)',
            }}
          >
            TU META
          </div>
          {WORDS.map((word, index) => {
            const positions = [
              { top: 54, left: -10, rotate: -5 },
              { top: 122, right: -24, rotate: 4 },
              { bottom: 80, left: -25, rotate: 3 },
              { bottom: 24, right: 8, rotate: -4 },
            ];
            const { rotate, ...position } = positions[index];
            return (
              <div
                key={word}
                style={{
                  position: 'absolute',
                  padding: '9px 14px',
                  border: '1px solid rgba(11,28,94,.16)',
                  borderRadius: 7,
                  background: '#fff',
                  fontSize: 17,
                  fontWeight: 700,
                  boxShadow: '0 10px 30px rgba(11,28,94,.12)',
                  ...position,
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                {word}
              </div>
            );
          })}
          <div
            style={{
              position: 'absolute',
              width: 440,
              height: 3,
              background: '#df2233',
              transform: 'rotate(-28deg)',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
