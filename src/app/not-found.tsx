import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o fue movida.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        gap: '1.5rem',
      }}
    >
      {/* Big 404 */}
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(5rem, 20vw, 10rem)',
          fontWeight: 700,
          color: 'var(--line-soft)',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          margin: 0,
          letterSpacing: '-0.02em',
        }}
      >
        Página no encontrada
      </h1>

      <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 400, margin: 0, lineHeight: 1.6 }}>
        La dirección que escribiste no existe o fue movida. Revisa el enlace
        o vuelve al inicio.
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
        <Link
          href="/home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4em',
            padding: '0.65rem 1.4rem',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
          }}
        >
          ← Ir al inicio
        </Link>
        <Link
          href="/leccion"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4em',
            padding: '0.65rem 1.4rem',
            background: 'var(--bg-2)',
            color: 'var(--ink)',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            border: '1px solid var(--line-soft)',
          }}
        >
          Ver lecciones
        </Link>
      </div>

      {/* Quick links */}
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>
        También puedes ir a{' '}
        <Link href="/examenes" style={{ color: 'var(--accent)', fontWeight: 500 }}>Exámenes</Link>
        {' '}o{' '}
        <Link href="/practica" style={{ color: 'var(--accent)', fontWeight: 500 }}>Práctica</Link>
        .
      </p>
    </div>
  );
}
