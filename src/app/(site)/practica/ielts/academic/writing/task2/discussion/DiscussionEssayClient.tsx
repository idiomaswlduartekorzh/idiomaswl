'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type StructureOption = {
  id: string;
  text: string;
  strong: boolean;
  explanation: string;
};

type PlanOption = {
  id: string;
  text: string;
  useful: boolean;
  explanation: string;
};

const PROMPT =
  'Some people believe that children should begin learning a foreign language at primary school. Others think language learning should start later, when students are more mature. Discuss both views and give your own opinion.';

const STRUCTURE_OPTIONS: StructureOption[] = [
  {
    id: 'balanced',
    text: 'Intro with both views and your opinion → Body 1: early learning view → Body 2: later learning view + why you find one side stronger → Conclusion with your opinion.',
    strong: true,
    explanation:
      'Fuerte. Desarrolla ambas posturas y conserva tu opinión propia, que es obligatoria en este prompt.',
  },
  {
    id: 'opinion',
    text: 'Intro with a strong personal thesis → Body 1 and Body 2 both defend only your view → Conclusion repeats your view.',
    strong: false,
    explanation:
      'Eso funciona para opinion essay, pero aquí falta discutir la postura contraria con suficiente desarrollo.',
  },
  {
    id: 'neutral',
    text: 'Intro neutral → Body 1: view A → Body 2: view B → Conclusion: both sides have advantages and there is no clear answer.',
    strong: false,
    explanation:
      'Incompleto. “Give your own opinion” exige que tomes posición; no basta con presentar ambas partes.',
  },
];

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'view-a',
    text: 'Body 1: explain that young children absorb pronunciation and basic patterns more naturally.',
    useful: true,
    explanation:
      'Útil. Desarrolla la primera postura con una razón específica y relevante.',
  },
  {
    id: 'view-b',
    text: 'Body 2: explain that older students may learn faster because they understand grammar and study goals better.',
    useful: true,
    explanation:
      'Útil. Da fuerza real a la segunda postura, evitando un ensayo desequilibrado.',
  },
  {
    id: 'own-opinion',
    text: 'State that early exposure is preferable if lessons are playful rather than exam-focused.',
    useful: true,
    explanation:
      'Fuerte. Tu opinión aparece con condición clara y conecta las dos posturas.',
  },
  {
    id: 'ignore-side',
    text: 'Mention the later-learning view in one sentence because you disagree with it.',
    useful: false,
    explanation:
      'Riesgoso. En discussion essay debes discutir ambos puntos de vista, incluso si no estás de acuerdo.',
  },
  {
    id: 'solutions',
    text: 'Focus mainly on how governments can train more language teachers.',
    useful: false,
    explanation:
      'Fuera de foco. El prompt pide discutir dos views y dar opinión, no proponer soluciones.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'People disagree about whether children should start learning a foreign language in primary school or wait until they are older. While later learning can be more efficient in some academic respects, I believe early exposure is generally more beneficial if it is taught in an age-appropriate way.',
    note: 'Presenta ambas posturas y anuncia una opinión propia matizada.',
  },
  {
    label: 'Cuerpo 1',
    text: 'Those who support early language learning argue that young children can acquire sounds and basic patterns more naturally. At primary-school age, students are often less self-conscious about speaking, so songs, games and simple conversations can build confidence before formal grammar becomes necessary.',
    note: 'Desarrolla la primera view sin convertirla todavía en tu opinión final.',
  },
  {
    label: 'Cuerpo 2',
    text: 'On the other hand, some people believe older students are better prepared for language study because they have stronger literacy skills and clearer academic goals. This is a reasonable point, especially if language classes are grammar-heavy. However, I find the early-start argument more convincing when teaching is playful, because it creates familiarity and motivation before exam pressure appears.',
    note: 'Explica la segunda view y luego evalúa cuál lado pesa más.',
  },
  {
    label: 'Conclusión',
    text: 'In conclusion, both positions have merit, but I believe foreign-language learning should begin in primary school as long as the lessons are communicative and enjoyable rather than overly formal.',
    note: 'Cierra con opinión clara, no con neutralidad.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/opinion', label: 'Opinion essay' },
  { href: '/practica/ielts/academic/writing/task2/tipo-ensayo', label: 'Tipo de ensayo' },
  { href: '/practica/ielts/academic/writing/task2/introduccion', label: 'Introducción' },
  { href: '/practica/ielts/academic/writing/task2/parrafos-cuerpo', label: 'Párrafos cuerpo' },
  { href: '/practica/ielts/academic/writing/task2/linking-language', label: 'Linking language' },
  { href: '/practica/ielts/academic/writing/task2/conclusion', label: 'Conclusión' },
  { href: '/practica/ielts/academic/writing/task2/tarea-completa', label: 'Tarea completa' },
];

function OptionCard({
  selected,
  revealed,
  positive,
  text,
  explanation,
  onClick,
}: {
  selected: boolean;
  revealed: boolean;
  positive: boolean;
  text: string;
  explanation: string;
  onClick: () => void;
}) {
  let border = selected ? '2px solid #0f3d8c' : '1px solid var(--line-soft)';
  let background = selected ? 'rgba(15,61,140,0.06)' : 'var(--bg-2)';

  if (revealed && selected && positive) {
    border = '2px solid rgba(4,120,87,0.55)';
    background = 'rgba(4,120,87,0.08)';
  } else if (revealed && selected && !positive) {
    border = '2px solid rgba(185,28,28,0.45)';
    background = 'rgba(185,28,28,0.06)';
  } else if (revealed && !selected && positive) {
    border = '1.5px solid rgba(180,83,9,0.45)';
    background = 'rgba(180,83,9,0.06)';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={revealed}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '0.9rem 1rem',
        borderRadius: 8,
        border,
        background,
        color: 'var(--ink)',
        cursor: revealed ? 'default' : 'pointer',
      }}
    >
      <span style={{ display: 'block', fontSize: '0.9rem', lineHeight: 1.55 }}>{text}</span>
      {revealed && (
        <span style={{ display: 'block', marginTop: '0.55rem', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
          <strong style={{ color: positive ? '#047857' : '#991b1b' }}>{positive ? 'Respuesta fuerte: ' : 'Cuidado: '}</strong>
          {explanation}
        </span>
      )}
    </button>
  );
}

export default function DiscussionEssayClient({ faqs }: { faqs: Faq[] }) {
  const [structureId, setStructureId] = useState<string | null>(null);
  const [structureRevealed, setStructureRevealed] = useState(false);
  const [planIds, setPlanIds] = useState<Set<string>>(new Set());
  const [planRevealed, setPlanRevealed] = useState(false);

  const planScore = useMemo(
    () => [...planIds].filter((id) => PLAN_OPTIONS.find((plan) => plan.id === id)?.useful).length,
    [planIds],
  );

  function togglePlan(id: string) {
    if (planRevealed) return;
    setPlanIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
              Task 2
            </Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Discussion essay</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 2
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Discussion essay en IELTS Writing Task 2
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Practica prompts de “discuss both views and give your own opinion” con balance real, desarrollo de ambas posturas y una opinión propia clara.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Writing Task 2 pide un ensayo de al menos 250 palabras en respuesta a una pregunta. La etiqueta discussion essay es una clasificación pedagógica para prompts que piden discutir dos puntos de vista.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> practicamos discussion essays por separado porque debes cumplir tres tareas: explicar view A, explicar view B y dar tu opinión.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para discussion essay
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Detecta la instrucción', 'Busca discuss both views and give your own opinion. Esa frase cambia la estructura.'],
                ['2', 'Separa las posturas', 'Define qué argumento pertenece a view A y cuál a view B antes de escribir.'],
                ['3', 'Desarrolla con equilibrio', 'Cada postura necesita razón, explicación y ejemplo o consecuencia.'],
                ['4', 'Evalúa al final', 'Tu opinión debe cerrar la comparación, no desaparecer en una conclusión neutra.'],
              ].map(([step, title, copy]) => (
                <article key={step} className="wl-card" style={{ padding: '0.95rem', borderRadius: 8 }}>
                  <span style={{ display: 'inline-flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'rgba(15,61,140,0.09)', color: '#0f3d8c', fontWeight: 800, fontFamily: 'var(--mono)', marginBottom: '0.55rem' }}>
                    {step}
                  </span>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem' }}>{title}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="practice-heading">
            <h2 id="practice-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '1.5rem 0 0.45rem' }}>
              Ejercicio guiado: estructura y balance
            </h2>
            <div className="wl-card" style={{ padding: '1rem', borderRadius: 8, margin: '0.8rem 0 1rem', background: 'rgba(15,61,140,0.05)' }}>
              <p style={{ margin: '0 0 0.4rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Practice prompt
              </p>
              <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.95rem' }}>{PROMPT}</p>
            </div>

            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.05rem' }}>Paso 1: escoge la mejor estructura</h3>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {STRUCTURE_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  selected={structureId === option.id}
                  revealed={structureRevealed}
                  positive={option.strong}
                  text={option.text}
                  explanation={option.explanation}
                  onClick={() => setStructureId(option.id)}
                />
              ))}
            </div>
            {!structureRevealed && (
              <button className="btn btn-sm" type="button" disabled={!structureId} onClick={() => setStructureRevealed(true)} style={{ opacity: structureId ? 1 : 0.5, marginBottom: '1.25rem' }}>
                Revisar estructura
              </button>
            )}

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona decisiones de desarrollo fuertes</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige las decisiones que cumplen la instrucción completa: ambas posturas y opinión propia.
            </p>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {PLAN_OPTIONS.map((plan) => (
                <OptionCard
                  key={plan.id}
                  selected={planIds.has(plan.id)}
                  revealed={planRevealed}
                  positive={plan.useful}
                  text={plan.text}
                  explanation={plan.explanation}
                  onClick={() => togglePlan(plan.id)}
                />
              ))}
            </div>
            {!planRevealed ? (
              <button className="btn btn-sm" type="button" disabled={planIds.size === 0} onClick={() => setPlanRevealed(true)} style={{ opacity: planIds.size ? 1 : 0.5, marginBottom: '1rem' }}>
                Revisar plan
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Resultado: {planScore} de {PLAN_OPTIONS.filter((plan) => plan.useful).length} decisiones fuertes seleccionadas.
                </p>
              </div>
            )}
          </section>

          <section aria-labelledby="model-heading" style={{ marginTop: '1.5rem' }}>
            <h2 id="model-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.8rem' }}>
              Modelo Band 7 explicado
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {MODEL_ANSWER.map((part) => (
                <article key={part.label} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.95rem', color: '#0f3d8c' }}>{part.label}</h3>
                  <p style={{ margin: '0 0 0.6rem', color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.92rem' }}>{part.text}</p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.82rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Por qué funciona:</strong> {part.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="links-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Sigue practicando Task 2
            </h2>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {INTERNAL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Preguntas frecuentes
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.96rem' }}>{faq.question}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
