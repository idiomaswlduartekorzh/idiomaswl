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
  'In many countries, more people are choosing to work remotely rather than travelling to an office every day. Do the advantages of this development outweigh the disadvantages?';

const STRUCTURE_OPTIONS: StructureOption[] = [
  {
    id: 'outweigh',
    text: 'Intro: say advantages outweigh disadvantages → Body 1: main advantages → Body 2: disadvantages, then explain why they are less serious → Conclusion: reaffirm your evaluation.',
    strong: true,
    explanation:
      'Correcto. La palabra outweigh exige evaluación: no basta con listar pros y contras.',
  },
  {
    id: 'neutral',
    text: 'Intro neutral → Body 1: advantages → Body 2: disadvantages → Conclusion: both sides are important and it depends.',
    strong: false,
    explanation:
      'Insuficiente para “outweigh”. Esa conclusión no responde cuál lado pesa más.',
  },
  {
    id: 'opinion-only',
    text: 'Intro with strong agreement → Body 1 and Body 2 both discuss only benefits of remote work → Conclusion repeats the benefits.',
    strong: false,
    explanation:
      'También falla. Aunque debes evaluar, el prompt sigue pidiendo considerar disadvantages.',
  },
];

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'adv-flexibility',
    text: 'Advantage: remote work saves commuting time and gives employees more control over their schedule.',
    useful: true,
    explanation:
      'Útil. Es una ventaja clara y fácil de desarrollar con consecuencia concreta.',
  },
  {
    id: 'adv-access',
    text: 'Advantage: companies can hire talent outside one city, which can improve productivity and inclusion.',
    useful: true,
    explanation:
      'Fuerte. Añade una segunda ventaja distinta, no solo otra versión de convenience.',
  },
  {
    id: 'dis-isolation',
    text: 'Disadvantage: workers may feel isolated, but this can be reduced with hybrid schedules and intentional team meetings.',
    useful: true,
    explanation:
      'Fuerte para outweigh. Reconoce un problema y explica por qué no supera las ventajas.',
  },
  {
    id: 'ignore-disadvantages',
    text: 'Skip disadvantages because the question asks whether advantages outweigh them.',
    useful: false,
    explanation:
      'Incorrecto. Outweigh significa comparar ambos lados, no ignorar el lado débil.',
  },
  {
    id: 'unrelated',
    text: 'Focus mainly on whether governments should regulate internet prices.',
    useful: false,
    explanation:
      'Fuera de foco. El prompt trata el trabajo remoto, no política de telecomunicaciones.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'Remote work has become increasingly common, replacing daily office attendance for many employees. Although this trend can reduce face-to-face collaboration, I believe its advantages outweigh its disadvantages because it saves time and expands access to work.',
    note: 'Responde directamente “outweigh” y anuncia la evaluación principal.',
  },
  {
    label: 'Cuerpo 1',
    text: 'The most significant benefit is the reduction in commuting time. Employees who no longer spend hours travelling can use that time for focused work, family responsibilities or rest, which may improve both productivity and wellbeing. Remote work also allows companies to hire skilled people who live far from major cities, making employment more inclusive and giving businesses access to a wider talent pool.',
    note: 'Desarrolla dos ventajas distintas con consecuencias claras.',
  },
  {
    label: 'Cuerpo 2',
    text: 'Admittedly, remote work can make communication slower and may leave some workers feeling isolated. However, these problems can often be managed through hybrid schedules, regular team meetings and clear communication systems. Compared with the daily loss of time and money caused by commuting, these disadvantages are serious but less damaging overall.',
    note: 'Reconoce disadvantages y explica por qué pesan menos.',
  },
  {
    label: 'Conclusión',
    text: 'In conclusion, while remote work does create challenges for collaboration and social connection, its benefits in terms of time, flexibility and access to employment are greater. For this reason, I believe the advantages outweigh the disadvantages.',
    note: 'Cierra con la misma evaluación de la introducción.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/opinion', label: 'Opinion essay' },
  { href: '/practica/ielts/academic/writing/task2/discussion', label: 'Discussion essay' },
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

export default function AdvantagesDisadvantagesClient({ faqs }: { faqs: Faq[] }) {
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Advantages and disadvantages</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 2
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Advantages and disadvantages en IELTS Writing Task 2
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a responder prompts de ventajas y desventajas, especialmente cuando la pregunta exige decidir si las ventajas outweigh las desventajas.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para estructura y planificación, más un modelo comentado de Task 2.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Writing Task 2 pide un ensayo de al menos 250 palabras. Advantages-disadvantages es una categoría pedagógica para prompts que piden evaluar beneficios y problemas.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> distinguimos entre listar ventajas/desventajas y responder outweigh, porque en el segundo caso necesitas una evaluación explícita.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para advantages-disadvantages
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Lee la instrucción exacta', 'Do the advantages outweigh...? exige evaluación; What are the advantages and disadvantages? exige balance.'],
                ['2', 'Lista ambos lados', 'Anota dos ventajas y dos desventajas antes de decidir el peso relativo.'],
                ['3', 'Elige tu evaluación', 'Si hay outweigh, decide si un lado pesa más y dilo desde la introducción.'],
                ['4', 'Compara consecuencias', 'No cuentes puntos: compara impacto, alcance y posibilidad de solución.'],
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
              Ejercicio guiado: estructura y evaluación
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
              Elige las decisiones que comparan beneficios y problemas sin perder la evaluación principal.
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
