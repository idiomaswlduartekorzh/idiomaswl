'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type Option = {
  id: string;
  text: string;
  strong: boolean;
  explanation: string;
};

const PROMPT =
  'In many cities, young people are finding it increasingly difficult to buy their first home. What problems does this cause, and what solutions can governments and communities offer?';

const STRUCTURE_OPTIONS: Option[] = [
  {
    id: 'matched',
    text: 'Intro: paraphrase and answer both parts → Body 1: two problems caused by unaffordable housing → Body 2: two realistic solutions linked to those problems → Conclusion: summarise problem-solution link.',
    strong: true,
    explanation:
      'Correcto. El prompt pide problems and solutions, así que la estructura debe cubrir ambos elementos con conexión clara.',
  },
  {
    id: 'causes-only',
    text: 'Intro: housing is expensive → Body 1: why prices are rising → Body 2: why salaries are low → Conclusion: governments should help.',
    strong: false,
    explanation:
      'Cuidado. Causes pueden ayudar, pero el prompt pregunta problems caused and solutions. Esta estructura no responde la segunda mitad con suficiente fuerza.',
  },
  {
    id: 'solutions-list',
    text: 'Intro: many young people cannot buy homes → Body 1: build houses, reduce taxes, control rent → Body 2: give loans, offer advice, improve transport → Conclusion: several solutions exist.',
    strong: false,
    explanation:
      'Parece útil, pero se vuelve una lista. Falta explicar los problemas y conectar cada solución con un efecto concreto.',
  },
];

const DEVELOPMENT_OPTIONS: Option[] = [
  {
    id: 'problem-delay',
    text: 'Problem: young adults may delay forming families or living independently because housing consumes too much income.',
    strong: true,
    explanation:
      'Fuerte. Es un problema social específico y fácil de desarrollar con consecuencia.',
  },
  {
    id: 'problem-inequality',
    text: 'Problem: wealth gaps widen because people with family support can buy property while others remain renters.',
    strong: true,
    explanation:
      'Fuerte. Muestra impacto más amplio, no solo incomodidad personal.',
  },
  {
    id: 'solution-affordable',
    text: 'Solution: local governments can require new developments to include affordable units for first-time buyers.',
    strong: true,
    explanation:
      'Útil porque ataca directamente la falta de acceso a vivienda, no solo sus síntomas.',
  },
  {
    id: 'solution-education',
    text: 'Solution: schools should teach young people how to save money.',
    strong: false,
    explanation:
      'Débil si se presenta sola. Financial education puede ayudar, pero no resuelve precios altos ni oferta limitada.',
  },
  {
    id: 'solution-generic',
    text: 'Solution: the government should do something quickly because the situation is bad.',
    strong: false,
    explanation:
      'Demasiado general. IELTS premia ideas desarrolladas, no intenciones vagas.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'In many urban areas, buying a first home has become unrealistic for a growing number of young adults. This creates both personal and social problems, and it requires policies that increase affordable housing rather than simply encouraging people to save more.',
    note: 'Presenta el tema y responde ambas partes: problemas y soluciones.',
  },
  {
    label: 'Cuerpo 1',
    text: 'One major problem is that young people may have to postpone independent adult life. If rent and deposits consume most of their income, they may continue living with parents, delay starting families or avoid moving to cities where better jobs are available. A second problem is inequality. Those who receive financial help from relatives can enter the property market earlier, while others remain renters and miss the chance to build long-term security.',
    note: 'Desarrolla dos problemas concretos con consecuencias, no solo etiquetas.',
  },
  {
    label: 'Cuerpo 2',
    text: 'The most practical solution is to expand the supply of affordable homes. Local governments could require large housing projects to reserve a percentage of units for first-time buyers at controlled prices. Communities can also support cooperative housing projects, where residents share ownership costs and reduce the need for large deposits. These measures address the core issue: access to housing, not merely personal budgeting.',
    note: 'Las soluciones están conectadas con el problema central y son realistas.',
  },
  {
    label: 'Conclusión',
    text: 'In conclusion, expensive housing can delay independence and deepen inequality among young adults. Governments and communities should therefore focus on increasing affordable supply and creating ownership models that lower the initial cost of buying a home.',
    note: 'Cierra retomando problemas y soluciones de manera equilibrada.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/opinion', label: 'Opinion essay' },
  { href: '/practica/ielts/academic/writing/task2/discussion', label: 'Discussion essay' },
  { href: '/practica/ielts/academic/writing/task2/advantages-disadvantages', label: 'Advantages/disadvantages' },
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

export default function ProblemSolutionClient({ faqs }: { faqs: Faq[] }) {
  const [structureId, setStructureId] = useState<string | null>(null);
  const [structureRevealed, setStructureRevealed] = useState(false);
  const [developmentIds, setDevelopmentIds] = useState<Set<string>>(new Set());
  const [developmentRevealed, setDevelopmentRevealed] = useState(false);

  const developmentScore = useMemo(
    () => [...developmentIds].filter((id) => DEVELOPMENT_OPTIONS.find((option) => option.id === id)?.strong).length,
    [developmentIds],
  );

  function toggleDevelopment(id: string) {
    if (developmentRevealed) return;
    setDevelopmentIds((current) => {
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Problem-solution</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 2
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Problem-solution essays en IELTS Writing Task 2
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a responder prompts que piden problemas, causas, soluciones o medidas sin convertir el ensayo en una lista vaga.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para diagnóstico y solución, más un modelo comentado de Task 2.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Writing Task 2 pide un ensayo académico de al menos 250 palabras. Problem-solution no es una sección oficial separada; es una familia común de preguntas dentro de Task 2.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos el enlace problema-solución: cada problema debe tener consecuencia clara y cada solución debe atacar una causa o consecuencia específica.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para problem-solution
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Detecta la demanda', 'Problems and solutions pide dos bloques; causes and solutions pide explicar origen y respuesta.'],
                ['2', 'Define el problema real', 'Evita palabras grandes sin precisión. Di quién se afecta y cómo.'],
                ['3', 'Propón solución viable', 'Una solución fuerte tiene actor, acción y efecto esperado.'],
                ['4', 'Conecta cada parte', 'La solución debe responder al problema, no sonar como una recomendación genérica.'],
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
              Ejercicio guiado: diagnóstico y solución
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

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona ideas desarrollables</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige las ideas que serían útiles para un ensayo porque son específicas y conectan problema con solución.
            </p>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {DEVELOPMENT_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  selected={developmentIds.has(option.id)}
                  revealed={developmentRevealed}
                  positive={option.strong}
                  text={option.text}
                  explanation={option.explanation}
                  onClick={() => toggleDevelopment(option.id)}
                />
              ))}
            </div>
            {!developmentRevealed ? (
              <button className="btn btn-sm" type="button" disabled={developmentIds.size === 0} onClick={() => setDevelopmentRevealed(true)} style={{ opacity: developmentIds.size ? 1 : 0.5, marginBottom: '1rem' }}>
                Revisar ideas
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Resultado: {developmentScore} de {DEVELOPMENT_OPTIONS.filter((option) => option.strong).length} ideas fuertes seleccionadas.
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
