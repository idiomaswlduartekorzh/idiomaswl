type SourceItem = {
  label: string;
  href?: string;
  note: string;
};

export default function QuestionTypeReviewSourceBlock({
  accent,
  questionTypeName,
  sources,
  reviewedFocus,
}: {
  accent: string;
  questionTypeName: string;
  sources: SourceItem[];
  reviewedFocus: string[];
}) {
  return (
    <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 8, marginTop: '1.2rem', borderTop: `3px solid ${accent}` }}>
      <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Revisión y fuentes</p>
      <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.18rem', letterSpacing: 0 }}>
        Cómo revisamos este tipo de pregunta: {questionTypeName}
      </h2>
      <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
        Este material fue preparado por el equipo académico de WeLearn y revisado en julio de 2026 para confirmar que la ruta corresponde a un tipo de pregunta de IELTS Reading y que el método explicado es una estrategia pedagógica propia.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '0.75rem' }}>
        <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--bg-2)' }}>
          <h3 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '0.98rem' }}>Criterios de revisión</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
            {reviewedFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--bg-2)' }}>
          <h3 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '0.98rem' }}>Fuentes usadas</h3>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {sources.map((source) => (
              <p key={source.label} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--ink)' }}>
                  {source.href ? (
                    <a href={source.href} style={{ color: accent, fontWeight: 900 }}>
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                  :
                </strong>{' '}
                {source.note}
              </p>
            ))}
          </div>
        </article>
      </div>

      <p style={{ margin: '0.85rem 0 0', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.86rem' }}>
        Alcance: los ejercicios son originales de WeLearn y sirven para practicar este formato; no son preguntas oficiales de IELTS ni prometen una banda específica por sí solos.
      </p>
    </section>
  );
}
