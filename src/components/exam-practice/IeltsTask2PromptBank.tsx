import Link from 'next/link';
import type { IeltsTask2Prompt } from '@/data/practica-exams/seo-catalog';

const typeAccent: Record<IeltsTask2Prompt['essayType'], string> = {
  Opinion: '#0f3d8c',
  Discussion: '#7c3aed',
  'Advantages and disadvantages': '#0f766e',
  'Problem-solution': '#be123c',
  'Direct question': '#b45309',
};

export default function IeltsTask2PromptBank({
  prompts,
  eyebrow = 'Banco de prompts Task 2',
  title = '10 prompts originales para planear ensayos IELTS Task 2',
  intro,
}: {
  prompts: IeltsTask2Prompt[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const introText =
    intro ??
    'este banco separa tipos de práctica para que entrenes identificación del prompt, tesis, plan, lenguaje útil y autocheck antes de escribir.';

  return (
    <section style={{ marginTop: '2rem' }}>
      <div className="wl-card" style={{ padding: '1.25rem', borderRadius: 16, marginBottom: '1rem', borderLeft: '4px solid #0f3d8c' }}>
        <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>{eyebrow}</p>
        <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.35rem', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          {title}
        </h2>
        <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68 }}>
          <strong>Formato oficial:</strong> IELTS Academic Writing Task 2 pide escribir un ensayo de al menos 250 palabras en respuesta a una pregunta. <strong>Estrategia WeLearn:</strong> {introText}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '1rem' }}>
        {prompts.map((prompt) => {
          const accent = typeAccent[prompt.essayType];
          return (
            <article key={prompt.id} className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, borderTop: `3px solid ${accent}`, display: 'grid', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'start', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {prompt.essayType}
                  </p>
                  <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.32 }}>
                    Prompt {prompt.id.split('-').slice(-2).join(' ')}
                  </h3>
                </div>
                <Link href={prompt.route} className="btn btn-ghost btn-sm" style={{ fontSize: '0.76rem' }}>
                  Practicar tipo
                </Link>
              </div>

              <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.62, fontSize: '0.92rem' }}>
                {prompt.prompt}
              </p>

              <div style={{ display: 'grid', gap: '0.65rem' }}>
                <div style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)' }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.86rem' }}>Objetivo de práctica</strong>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                    {prompt.target}
                  </p>
                </div>
                <div style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)' }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.86rem' }}>Tesis o movimiento clave</strong>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                    {prompt.thesisMove}
                  </p>
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '0.86rem', marginBottom: '0.35rem' }}>Plan de 4 pasos</strong>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                  {prompt.plan.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '0.86rem', marginBottom: '0.35rem' }}>Lenguaje útil</strong>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {prompt.usefulLanguage.map((phrase) => (
                    <span key={phrase} style={{ border: `1px solid ${accent}33`, background: `${accent}10`, color: accent, borderRadius: 999, padding: '0.22rem 0.55rem', fontSize: '0.74rem', fontWeight: 800 }}>
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ border: `1px solid ${accent}33`, background: `${accent}0d`, borderRadius: 12, padding: '0.8rem' }}>
                <strong style={{ color: 'var(--ink)', fontSize: '0.86rem' }}>Trampa común</strong>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                  {prompt.commonTrap}
                </p>
              </div>

              <details>
                <summary style={{ cursor: 'pointer', color: accent, fontWeight: 900, fontSize: '0.86rem' }}>
                  Checklist de revisión
                </summary>
                <ul style={{ margin: '0.55rem 0 0', paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                  {prompt.selfCheck.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
