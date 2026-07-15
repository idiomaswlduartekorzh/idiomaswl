import ObjectivePracticeEngine from '@/components/exam-practice/ObjectivePracticeEngine';
import type { ObjectivePracticeSet, ObjectiveQuestion } from '@/data/practica-exams/seo-catalog';

type ObjectiveAnswer = ObjectiveQuestion['answer'];

export default function ObjectivePracticeSetBank({
  sets,
  accent = '#0369a1',
  answers,
  eyebrow = 'Banco de práctica',
  title = 'Más pasajes con respuestas explicadas',
  intro,
  resultTip,
}: {
  sets: ObjectivePracticeSet[];
  accent?: string;
  answers?: readonly ObjectiveAnswer[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  resultTip?: string;
}) {
  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 8, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>{eyebrow}</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>{title}</h2>
          {intro && (
            <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
              {intro}
            </p>
          )}
        </div>
        <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.76rem', textTransform: 'uppercase' }}>
          {sets.reduce((sum, set) => sum + set.questions.length, 0)} statements
        </span>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {sets.map((set, index) => (
          <section key={set.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)', borderLeft: `4px solid ${accent}` }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                Set {index + 1} · {set.timeTarget}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.08rem' }}>{set.title}</h3>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {set.instructions}
              </p>
              <h4 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{set.passageTitle}</h4>
              <div style={{ color: 'var(--ink-2)', lineHeight: 1.78, whiteSpace: 'pre-line', fontSize: '0.94rem' }}>
                {set.passage}
              </div>
            </article>

            <ObjectivePracticeEngine
              questions={set.questions}
              accent={accent}
              answers={answers}
              resultTip={resultTip}
            />
          </section>
        ))}
      </div>
    </section>
  );
}
