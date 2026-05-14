'use client';

interface Props { onComplete?: () => void }

export default function SmartReview({ onComplete }: Props) {
  return (
    <section style={{ padding: '32px 28px', minHeight: 360 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>
        Etapa 10 · Smart Review
      </div>
      <h2 style={{ fontSize: 28, letterSpacing: '-0.02em', margin: '10px 0 8px', fontWeight: 600 }}>
        Repaso inteligente
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 540 }}>
        Pendiente de portar. Aquí irá el bloque de repaso espaciado.
      </p>
      <button onClick={onComplete} className="btn btn-sm" style={{ marginTop: 24 }}>
        Continuar →
      </button>
    </section>
  );
}
