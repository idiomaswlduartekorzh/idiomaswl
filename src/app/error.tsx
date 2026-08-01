'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to the console in development; swap for an error-reporting service in prod
    console.error('[GlobalError]', error);
  }, [error]);

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
      <p
        style={{
          fontSize: 48,
          margin: 0,
        }}
        aria-hidden="true"
      >
        ⚠️
      </p>

      <h1
        style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          margin: 0,
          letterSpacing: '-0.02em',
        }}
      >
        Algo salió mal
      </h1>

      <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 440, margin: 0, lineHeight: 1.6 }}>
        Ocurrió un error inesperado. Puedes intentar recargar la página o
        volver al inicio.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <pre
          style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--line-soft)',
            borderRadius: 8,
            padding: '1rem',
            fontSize: 12,
            color: 'var(--accent)',
            maxWidth: 560,
            width: '100%',
            textAlign: 'left',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {error.message}
          {error.digest ? `\nDigest: ${error.digest}` : ''}
        </pre>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
        <button
          onClick={reset}
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
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ↺ Intentar de nuevo
        </button>
        <a
          href="/"
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
          ← Ir al inicio
        </a>
      </div>
    </div>
  );
}
