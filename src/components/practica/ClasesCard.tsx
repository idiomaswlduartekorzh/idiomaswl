// ─── Puente de Práctica a las clases ─────────────────────────────────────────
//
// Por qué existe
// ──────────────
// Medido el 13 de agosto de 2026: de 60 páginas de Práctica, NINGUNA enlazaba a
// clases, a precios ni a nada que se venda. El único camino a comprar era el
// botón flotante de WhatsApp, que no dice de qué idioma va.
//
// Y ahí cae el 57 % de las impresiones del sitio en Google. Es decir: más de la
// mitad de la gente que llega desde el buscador aterriza en un callejón.
//
// El efecto lateral se vio en el informe de indexación: `/clases-de-ruso` y
// `/clases-de-japones` estaban en «descubierta pero sin rastrear» — Google nunca
// las había visitado. Tenían un solo enlace interno en todo el sitio, desde
// `/clases-de-idiomas`, porque el menú de escritorio concentra a propósito el
// enlazado en ese superhub (ver el comentario en `SiteNav.tsx`) y porque son los
// dos únicos idiomas sin un solo artículo de blog que los apoye.
//
// Esta tarjeta va DEBAJO de la lista de niveles, no encima: lo gratis es la
// promesa de la página y no se le pisa. Quien ha bajado hasta el final ya
// practicó, y ese es el momento honesto para ofrecerle un profesor.

import Link from 'next/link';

const COLOR = '#1a4fcc';

/** Los ocho idiomas, con el nombre tal y como se lee y su página de clases. */
const IDIOMAS: Record<string, { nombre: string; href: string }> = {
  ingles:    { nombre: 'inglés',    href: '/clases-de-ingles' },
  frances:   { nombre: 'francés',   href: '/clases-de-frances' },
  aleman:    { nombre: 'alemán',    href: '/clases-de-aleman' },
  italiano:  { nombre: 'italiano',  href: '/clases-de-italiano' },
  portugues: { nombre: 'portugués', href: '/clases-de-portugues' },
  ruso:      { nombre: 'ruso',      href: '/clases-de-ruso' },
  japones:   { nombre: 'japonés',   href: '/clases-de-japones' },
  coreano:   { nombre: 'coreano',   href: '/clases-de-coreano' },
};

export default function ClasesCard({ lang }: { lang: string }) {
  const idioma = IDIOMAS[lang];
  if (!idioma) return null;

  return (
    <Link
      href={idioma.href}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginTop: '0.75rem' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '1.2rem 1.5rem',
          border: `1.5px solid ${COLOR}3d`,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${COLOR}0d 0%, transparent 100%)`,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 14,
            flexShrink: 0,
            background: COLOR,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}
        >
          👋
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>
            ¿Y si alguien te corrige?
          </span>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            Todo lo de arriba es gratis y seguirá siéndolo. Cuando quieras que un profesor te
            escuche hablar y te corrija lo que escribes, aquí están las clases de {idioma.nombre}.
          </p>
          <p
            style={{
              margin: '0.4rem 0 0',
              fontSize: '0.73rem',
              color: COLOR,
              fontFamily: 'var(--mono)',
              fontWeight: 700,
            }}
          >
            Clase de diagnóstico gratis
          </p>
        </div>
        <span style={{ fontSize: '1.2rem', color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
      </div>
    </Link>
  );
}
