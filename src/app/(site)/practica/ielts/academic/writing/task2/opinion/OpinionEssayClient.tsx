'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type ThesisOption = {
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
  'Some people believe that university students should choose subjects that lead directly to employment. Others think students should be free to study whatever they are interested in. To what extent do you agree or disagree?';

const THESIS_OPTIONS: ThesisOption[] = [
  {
    id: 'clear',
    text: 'I largely agree that students should have freedom of choice, although universities should also help them understand the employment consequences of their decisions.',
    strong: true,
    explanation:
      'Fuerte. Toma una posición clara, admite un matiz y anuncia una línea argumentativa defendible.',
  },
  {
    id: 'balanced',
    text: 'There are advantages and disadvantages to both views, and this essay will discuss them before reaching a conclusion.',
    strong: false,
    explanation:
      'Débil para opinion essay. Suena como discussion essay y no responde claramente "to what extent do you agree".',
  },
  {
    id: 'vague',
    text: 'I think this is an important issue because education and employment are both relevant in modern society.',
    strong: false,
    explanation:
      'Demasiado vaga. No dice si estás de acuerdo, en desacuerdo o parcialmente de acuerdo.',
  },
];

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'body1',
    text: 'Body 1: argue that interest-driven study improves motivation, depth of learning and long-term performance.',
    useful: true,
    explanation:
      'Útil. Desarrolla directamente la postura de libertad académica y permite ejemplos concretos.',
  },
  {
    id: 'body2',
    text: 'Body 2: acknowledge employability concerns, then argue that guidance is better than forcing students into job-linked degrees.',
    useful: true,
    explanation:
      'Fuerte. Refuta un contraargumento sin perder la postura principal.',
  },
  {
    id: 'example',
    text: 'Use an example of students choosing design, research or education because interest can become professional expertise.',
    useful: true,
    explanation:
      'Útil. Un ejemplo específico sostiene el argumento sin depender de estadísticas inventadas.',
  },
  {
    id: 'both-sides',
    text: 'Write one body paragraph for employment-focused degrees and another for personal-interest degrees, with no clear winner.',
    useful: false,
    explanation:
      'Riesgoso. Esa estructura pertenece más a discussion essay y diluye la tesis.',
  },
  {
    id: 'solutions',
    text: 'Propose government scholarships and university career fairs as the main focus of the essay.',
    useful: false,
    explanation:
      'No responde la pregunta central. El prompt pide tu grado de acuerdo, no soluciones.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'Many people argue that university courses should be chosen mainly for their employment value, while others defend students’ right to follow their interests. I largely agree with the latter view, although I believe universities should provide strong career guidance so that students make informed choices.',
    note: 'La tesis responde "to what extent" con una posición clara y un matiz controlado.',
  },
  {
    label: 'Cuerpo 1',
    text: 'The main reason students should be free to choose their subjects is that genuine interest often leads to deeper learning. When learners care about a field, they are more likely to read widely, persist through difficulty and develop original ideas. For example, a student who studies environmental design out of personal interest may eventually build highly practical skills for sustainable architecture.',
    note: 'Topic sentence claro, explicación y ejemplo conectado con la postura.',
  },
  {
    label: 'Cuerpo 2',
    text: 'Admittedly, employment prospects matter, especially because higher education is expensive. However, forcing students into courses only because they seem profitable can produce disengaged graduates with weak long-term performance. A better approach is for universities to offer career counselling, labour-market information and internships while still allowing students to choose their academic direction.',
    note: 'Reconoce el contraargumento y lo refuta sin convertirse en discussion essay.',
  },
  {
    label: 'Conclusión',
    text: 'In conclusion, I mostly agree that students should study subjects that genuinely interest them, provided they receive realistic guidance about career outcomes. Personal motivation and employability should work together, but choice should remain central.',
    note: 'Reafirma la postura y mantiene el mismo matiz de la introducción.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
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

export default function OpinionEssayClient({ faqs }: { faqs: Faq[] }) {
  const [thesisId, setThesisId] = useState<string | null>(null);
  const [thesisRevealed, setThesisRevealed] = useState(false);
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Opinion essay</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 2
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Opinion essay en IELTS Writing Task 2
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a responder preguntas agree/disagree y to what extent con una tesis clara, argumentos sostenidos y un contraargumento controlado.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Writing Task 2 pide escribir un ensayo de al menos 250 palabras en respuesta a una pregunta. La etiqueta opinion essay es una forma pedagógica de clasificar prompts agree/disagree.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> practicamos opinion essays por separado porque el error más costoso es escribir una discusión neutral cuando la pregunta exige una postura personal.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para opinion essay
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Detecta la instrucción', 'Busca agree/disagree, to what extent o una afirmación que debas evaluar.'],
                ['2', 'Toma posición', 'Elige fully agree, partly agree o disagree y mantenlo durante todo el ensayo.'],
                ['3', 'Planifica dos razones', 'Cada body paragraph debe defender la tesis, no cambiar de tipo de ensayo.'],
                ['4', 'Controla el contraargumento', 'Puedes reconocer otra postura, pero úsala para fortalecer la tuya.'],
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
              Ejercicio guiado: tesis y plan
            </h2>
            <div className="wl-card" style={{ padding: '1rem', borderRadius: 8, margin: '0.8rem 0 1rem', background: 'rgba(15,61,140,0.05)' }}>
              <p style={{ margin: '0 0 0.4rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Practice prompt
              </p>
              <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.95rem' }}>{PROMPT}</p>
            </div>

            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.05rem' }}>Paso 1: escoge la mejor tesis</h3>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {THESIS_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  selected={thesisId === option.id}
                  revealed={thesisRevealed}
                  positive={option.strong}
                  text={option.text}
                  explanation={option.explanation}
                  onClick={() => setThesisId(option.id)}
                />
              ))}
            </div>
            {!thesisRevealed && (
              <button className="btn btn-sm" type="button" disabled={!thesisId} onClick={() => setThesisRevealed(true)} style={{ opacity: thesisId ? 1 : 0.5, marginBottom: '1.25rem' }}>
                Revisar tesis
              </button>
            )}

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona decisiones de planificación fuertes</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige las decisiones que producirían una respuesta coherente de opinion essay.
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
