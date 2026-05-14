'use client';

interface Props { onComplete?: () => void }

export default function Completion({ onComplete }: Props) {
  return (
    <section style={{ padding: '32px 28px', minHeight: 360 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>
        Etapa 11 · Cierre
      </div>
      <h2 style={{ fontSize: 28, letterSpacing: '-0.02em', margin: '10px 0 8px', fontWeight: 600 }}>
        ¡Día 1 completado!
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 540 }}>
        Pendiente de portar. Aquí irá el resumen del día y el teaser del día siguiente.
      </p>
      <button onClick={onComplete} className="btn btn-sm" style={{ marginTop: 24 }}>
        Terminar
      </button>
    </section>
  );
}
