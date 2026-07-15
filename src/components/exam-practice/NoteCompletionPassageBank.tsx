import NoteCompletionEngine from '@/components/exam-practice/NoteCompletionEngine';
import type { NoteCompletionPassage } from '@/data/practica-exams/seo-catalog';

export default function NoteCompletionPassageBank({
  passages,
  accent = '#0f766e',
  eyebrow = 'Banco Note Completion',
  title = 'Pasajes para completar notas con palabras exactas',
  intro,
}: {
  passages: NoteCompletionPassage[];
  accent?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const blankCount = passages.reduce(
    (sum, passage) => sum + passage.noteGroups.reduce((groupSum, group) => groupSum + group.items.length, 0),
    0
  );

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
          {blankCount} blanks
        </span>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {passages.map((passage, index) => (
          <section key={passage.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)', borderLeft: `4px solid ${accent}` }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                Set {index + 1} · {passage.wordLimit} · {passage.noteGroups.length} note groups
              </p>
              <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.08rem' }}>{passage.title}</h3>
            </article>

            <NoteCompletionEngine passage={passage} accent={accent} />
          </section>
        ))}
      </div>
    </section>
  );
}
