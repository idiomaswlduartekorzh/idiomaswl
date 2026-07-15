import type { ToeflWritingTimedReviewSet } from '@/data/practica-exams/seo-catalog';

export default function ToeflWritingTimedReviewEngine({
  sets,
  accent = '#1a4fcc',
}: {
  sets: ToeflWritingTimedReviewSet[];
  accent?: string;
}) {
  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 8, borderTop: `4px solid ${accent}` }}>
      <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica cronometrada</p>
      <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>Timed mixed-writing review sets</h2>
      <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
        Estos sets son estrategia WeLearn: mezclan Build a Sentence, Write an Email y Write for an Academic Discussion para practicar cambio de formato, control de tiempo y revisión. No son una cuarta tarea oficial, e Integrated Writing sigue separado como síntesis/legacy.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Sets', value: String(sets.length), sub: 'rondas originales' },
          { label: 'Mix oficial', value: '3 tareas', sub: 'sin Integrated como principal' },
          { label: 'Uso', value: 'review', sub: 'después de practicar por tarea' },
        ].map((item) => (
          <article key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <h3 style={{ margin: '0 0 0.3rem', color: 'var(--ink)', fontSize: '0.92rem' }}>{item.value}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.84rem' }}>{item.sub}</p>
          </article>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {sets.map((set, index) => (
          <details
            key={set.id}
            open={index === 0}
            style={{
              border: '1px solid var(--line-soft)',
              borderRadius: 8,
              background: 'var(--bg)',
              overflow: 'hidden',
            }}
          >
            <summary style={{ cursor: 'pointer', padding: '0.9rem 1rem', color: 'var(--ink)', fontWeight: 900, lineHeight: 1.45 }}>
              {set.title} · {set.timeLimitMinutes} minutes
            </summary>

            <div style={{ padding: '0 1rem 1rem', display: 'grid', gap: '0.85rem' }}>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Meta:</strong> {set.goal}
              </p>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Instrucciones:</strong> {set.instructions}
              </p>

              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {set.officialTaskMix.map((taskType) => (
                  <span
                    key={taskType}
                    style={{
                      border: `1px solid ${accent}33`,
                      borderRadius: 8,
                      background: `${accent}10`,
                      color: accent,
                      padding: '0.28rem 0.45rem',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                    }}
                  >
                    {taskType}
                  </span>
                ))}
              </div>

              <div style={{ display: 'grid', gap: '0.55rem' }}>
                <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>Time checkpoints</h3>
                {set.checkpoints.map((checkpoint) => (
                  <label
                    key={`${set.id}-${checkpoint.minute}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '22px 1fr',
                      gap: '0.55rem',
                      alignItems: 'start',
                      color: 'var(--muted)',
                      lineHeight: 1.55,
                      fontSize: '0.88rem',
                    }}
                  >
                    <input type="checkbox" style={{ marginTop: '0.25rem', accentColor: accent }} />
                    <span>
                      <strong style={{ color: 'var(--ink)' }}>{checkpoint.minute}:</strong> {checkpoint.action}{' '}
                      <span style={{ color: 'var(--muted)' }}>{checkpoint.reason}</span>
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>Prompts y revisión</h3>
                {set.tasks.map((task) => (
                  <article key={task.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--bg-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.45rem' }}>
                      <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                        {task.taskType}
                      </span>
                      <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>{task.timeTarget}</span>
                    </div>
                    <p style={{ margin: '0 0 0.55rem', color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.92rem' }}>{task.prompt}</p>
                    <p style={{ margin: '0 0 0.4rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Pregunta de revisión:</strong> {task.reviewQuestion}
                    </p>
                    <p style={{ margin: '0 0 0.4rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Movimiento esperado:</strong> {task.expectedMove}
                    </p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Trampa común:</strong> {task.commonTrap}
                    </p>
                  </article>
                ))}
              </div>

              <div style={{ display: 'grid', gap: '0.45rem' }}>
                <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>Debrief</h3>
                {set.debrief.map((item) => (
                  <label key={item} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: '0.55rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                    <input type="checkbox" style={{ marginTop: '0.25rem', accentColor: accent }} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
