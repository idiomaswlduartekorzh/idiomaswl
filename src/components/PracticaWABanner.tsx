const WA = '573005004253';

interface Props {
  idioma: string;
  color: string;
  msg: string;
}

export function PracticaWABanner({ idioma, color, msg }: Props) {
  const href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  return (
    <section className="wl-section" style={{ paddingTop: 0 }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem 2rem',
          borderRadius: 18,
          background: `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)`,
          border: `1.5px solid ${color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{ margin: '0 0 0.2rem', fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>
              ¿Aprendes más rápido con un tutor?
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
              Agenda tu clase de diagnóstico gratis de {idioma} con un tutor de WeLearn — sin costo, sin compromiso.
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#25D366',
              color: '#fff',
              padding: '0.7rem 1.4rem',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Hablar con un tutor →
          </a>
        </div>
      </div>
    </section>
  );
}
