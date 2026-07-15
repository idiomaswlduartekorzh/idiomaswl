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
  'In many countries, people are spending less time cooking at home and more time eating prepared food. Why is this happening, and do you think this is a positive or negative development?';

const STRUCTURE_OPTIONS: Option[] = [
  {
    id: 'two-part',
    text: 'Intro: answer both questions briefly -> Body 1: why this is happening -> Body 2: positive or negative development with reasons -> Conclusion: repeat both answers.',
    strong: true,
    explanation:
      'Correcto. La estructura sigue las dos preguntas exactas: causa primero, evaluación después.',
  },
  {
    id: 'opinion-only',
    text: 'Intro: say prepared food is negative -> Body 1 and 2: health risks -> Conclusion: people should cook more.',
    strong: false,
    explanation:
      'Incompleto. Puede tener buena opinión, pero no responde claramente por qué está pasando.',
  },
  {
    id: 'causes-list',
    text: 'Intro: prepared food is popular -> Body 1: work, advertising and apps -> Body 2: more causes -> Conclusion: the trend will continue.',
    strong: false,
    explanation:
      'También falla. Responde la primera pregunta, pero ignora la evaluación positive or negative.',
  },
];

const ANSWER_OPTIONS: Option[] = [
  {
    id: 'cause-work',
    text: 'Why: longer working hours and commuting leave many adults with little time or energy to cook.',
    strong: true,
    explanation:
      'Fuerte. Es una causa clara y se puede conectar con cambios sociales actuales.',
  },
  {
    id: 'cause-delivery',
    text: 'Why: delivery apps and supermarkets have made prepared meals cheaper and easier to access.',
    strong: true,
    explanation:
      'Fuerte. Añade una causa distinta: disponibilidad y conveniencia.',
  },
  {
    id: 'evaluation-negative',
    text: 'Evaluation: it is mostly negative because frequent prepared food can reduce nutrition quality and weaken cooking skills.',
    strong: true,
    explanation:
      'Útil porque responde directamente la segunda pregunta con razones desarrollables.',
  },
  {
    id: 'generic-positive',
    text: 'Evaluation: it is positive because modern life is modern and people like modern things.',
    strong: false,
    explanation:
      'Demasiado vacío. IELTS necesita razón concreta, no repetición de la idea general.',
  },
  {
    id: 'off-topic',
    text: 'Focus on whether restaurants should pay more taxes.',
    strong: false,
    explanation:
      'Fuera de foco. El prompt pregunta causa y evaluación de hábitos alimentarios, no política tributaria.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'In many societies, home cooking is being replaced by ready-made meals and takeaway food. This is mainly happening because people have less free time and more convenient food options, and I believe the trend is mostly negative despite some practical benefits.',
    note: 'Responde las dos preguntas desde el inicio: causa y evaluación.',
  },
  {
    label: 'Cuerpo 1',
    text: 'The first reason is pressure on people’s daily schedules. Many adults work long hours, commute across large cities and still have family responsibilities at night, so cooking from basic ingredients can feel unrealistic. Prepared food is also easier to obtain than in the past. Delivery apps, supermarket meals and fast-food chains allow people to buy dinner in minutes, which makes cooking seem less necessary.',
    note: 'Contesta “why is this happening?” con dos causas desarrolladas.',
  },
  {
    label: 'Cuerpo 2',
    text: 'Although prepared food can save time, I see this change as largely negative. People who depend on it may consume more salt, sugar and processed ingredients, which can damage long-term health. In addition, if families rarely cook, younger people may not learn basic food skills or understand nutrition. The convenience is real, but the cost to health and independence is more serious.',
    note: 'Contesta “positive or negative?” con posición clara y razones.',
  },
  {
    label: 'Conclusión',
    text: 'In conclusion, people are cooking less because modern schedules are demanding and prepared meals are extremely accessible. However, I believe this is mainly a negative development because it can harm health and weaken everyday cooking habits.',
    note: 'Cierra retomando ambas respuestas, no solo la opinión.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/opinion', label: 'Opinion essay' },
  { href: '/practica/ielts/academic/writing/task2/discussion', label: 'Discussion essay' },
  { href: '/practica/ielts/academic/writing/task2/advantages-disadvantages', label: 'Advantages/disadvantages' },
  { href: '/practica/ielts/academic/writing/task2/problem-solution', label: 'Problem-solution' },
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

export default function DirectQuestionClient({ faqs }: { faqs: Faq[] }) {
  const [structureId, setStructureId] = useState<string | null>(null);
  const [structureRevealed, setStructureRevealed] = useState(false);
  const [answerIds, setAnswerIds] = useState<Set<string>>(new Set());
  const [answersRevealed, setAnswersRevealed] = useState(false);

  const answerScore = useMemo(
    () => [...answerIds].filter((id) => ANSWER_OPTIONS.find((option) => option.id === id)?.strong).length,
    [answerIds],
  );

  function toggleAnswer(id: string) {
    if (answersRevealed) return;
    setAnswerIds((current) => {
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Direct question</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 2
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Direct-question essays en IELTS Writing Task 2
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a responder two-part questions sin dejar una parte invisible, mezclada o débil.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para detectar las dos preguntas y planear cada párrafo, además de un modelo comentado.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Writing Task 2 pide un ensayo académico de al menos 250 palabras. Direct-question es una familia pedagógica para prompts que formulan dos preguntas explícitas.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos una regla simple: cada pregunta del prompt debe tener una respuesta visible en introducción, desarrollo y conclusión.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para direct-question
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Subraya las preguntas', 'No leas el prompt como un tema general: detecta exactamente qué se pregunta.'],
                ['2', 'Responde en una línea', 'Antes de escribir, formula una respuesta corta para cada pregunta.'],
                ['3', 'Asigna párrafos', 'Usa Body 1 para la primera pregunta y Body 2 para la segunda cuando sea posible.'],
                ['4', 'Cierra ambas partes', 'La conclusión debe recordar las dos respuestas, no solo la opinión final.'],
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
              Ejercicio guiado: responder ambas preguntas
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

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona respuestas útiles</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige las ideas que responden directamente una de las dos preguntas del prompt.
            </p>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {ANSWER_OPTIONS.map((option) => (
                <OptionCard
                  key={option.id}
                  selected={answerIds.has(option.id)}
                  revealed={answersRevealed}
                  positive={option.strong}
                  text={option.text}
                  explanation={option.explanation}
                  onClick={() => toggleAnswer(option.id)}
                />
              ))}
            </div>
            {!answersRevealed ? (
              <button className="btn btn-sm" type="button" disabled={answerIds.size === 0} onClick={() => setAnswersRevealed(true)} style={{ opacity: answerIds.size ? 1 : 0.5, marginBottom: '1rem' }}>
                Revisar respuestas
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Resultado: {answerScore} de {ANSWER_OPTIONS.filter((option) => option.strong).length} respuestas fuertes seleccionadas.
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
