'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import type { ToeflWritingRevisionDrill } from '@/data/practica-exams/seo-catalog';

type Faq = {
  question: string;
  answer: string;
};

type TaskId = 'sentence' | 'email' | 'discussion';
type Level = 'needs-work' | 'developing' | 'strong';

type Criterion = {
  id: string;
  label: string;
  question: string;
  needsWork: string;
  developing: string;
  strong: string;
};

type TaskRubric = {
  id: TaskId;
  label: string;
  officialTask: string;
  purpose: string;
  criteria: Criterion[];
  commonErrors: string[];
  rewriteMove: string;
};

const ACCENT = '#1a4fcc';
const ETS_WRITING_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html';

const RUBRICS: TaskRubric[] = [
  {
    id: 'sentence',
    label: 'Build a Sentence',
    officialTask: 'Build a Sentence',
    purpose:
      'La tarea evalúa si puedes organizar palabras o frases para formar una oración o pregunta completa, gramatical y lógica.',
    criteria: [
      {
        id: 'complete',
        label: 'Oración completa',
        question: '¿La respuesta tiene sujeto, verbo principal y sentido completo?',
        needsWork: 'Falta una parte esencial o queda una cláusula incompleta.',
        developing: 'La idea se entiende, pero la estructura principal todavía es torpe.',
        strong: 'La oración se sostiene sola y comunica una idea completa.',
      },
      {
        id: 'logic',
        label: 'Relación lógica',
        question: '¿El conector expresa bien causa, contraste, condición o resultado?',
        needsWork: 'El conector promete una relación que la segunda parte no cumple.',
        developing: 'La relación se entiende, pero podría ser más natural o precisa.',
        strong: 'La relación lógica es clara y natural desde la primera lectura.',
      },
      {
        id: 'accuracy',
        label: 'Precisión gramatical',
        question: '¿La oración evita errores de acuerdo, tiempo verbal y puntuación?',
        needsWork: 'Los errores dificultan entender la oración.',
        developing: 'Hay pequeños errores, pero el mensaje principal se conserva.',
        strong: 'La gramática y puntuación ayudan a que la idea fluya.',
      },
    ],
    commonErrors: [
      'Dejar una cláusula dependiente sola: because..., if..., although...',
      'Cambiar el sujeto a mitad de la oración sin necesidad.',
      'Usar coma donde se necesita punto o punto y coma.',
    ],
    rewriteMove:
      'Subraya el verbo principal. Si no puedes encontrarlo, reconstruye la oración desde sujeto + verbo + complemento antes de añadir conectores.',
  },
  {
    id: 'email',
    label: 'Write an Email',
    officialTask: 'Write an Email',
    purpose:
      'La tarea evalúa si puedes escribir un email claro, enfocado en la situación y adecuado para el destinatario.',
    criteria: [
      {
        id: 'purpose',
        label: 'Propósito claro',
        question: '¿El lector entiende por qué escribes desde el inicio?',
        needsWork: 'El email tarda demasiado en revelar el motivo o suena ambiguo.',
        developing: 'El motivo aparece, pero podría ser más directo.',
        strong: 'La primera parte del email deja claro el propósito.',
      },
      {
        id: 'coverage',
        label: 'Puntos completos',
        question: '¿Respondes todos los puntos de la situación?',
        needsWork: 'Falta una acción importante del prompt.',
        developing: 'Cubre los puntos, pero alguno queda poco desarrollado.',
        strong: 'Cada punto del prompt recibe una respuesta concreta.',
      },
      {
        id: 'tone',
        label: 'Tono y convenciones',
        question: '¿El tono coincide con profesor, compañero, oficina o destinatario?',
        needsWork: 'El tono es demasiado informal, brusco o exagerado.',
        developing: 'El tono funciona, aunque algunas frases suenan poco naturales.',
        strong: 'El registro, saludo, cierre y cortesía son adecuados.',
      },
    ],
    commonErrors: [
      'Escribir un mensaje correcto pero sin acción final.',
      'Usar el mismo tono para profesor, amigo y oficina administrativa.',
      'Responder solo una parte de la situación.',
    ],
    rewriteMove:
      'Antes de revisar gramática, marca los verbos de acción: explain, apologize, request, suggest, confirm. Si falta uno, el email está incompleto.',
  },
  {
    id: 'discussion',
    label: 'Academic Discussion',
    officialTask: 'Write for an Academic Discussion',
    purpose:
      'La tarea evalúa si puedes contribuir a una discusión de clase con postura, desarrollo, conexión con otras ideas y tono académico.',
    criteria: [
      {
        id: 'position',
        label: 'Postura visible',
        question: '¿Tu primera oración responde la pregunta?',
        needsWork: 'La respuesta rodea el tema, pero no toma posición clara.',
        developing: 'Hay postura, aunque aparece tarde o con lenguaje débil.',
        strong: 'La postura aparece rápido y guía todo el párrafo.',
      },
      {
        id: 'development',
        label: 'Desarrollo de idea',
        question: '¿Explicas una razón con ejemplo o consecuencia?',
        needsWork: 'La respuesta lista opiniones sin explicar.',
        developing: 'Hay razón, pero el ejemplo o consecuencia queda corto.',
        strong: 'Una idea central se desarrolla con lógica y detalle suficiente.',
      },
      {
        id: 'connection',
        label: 'Conexión académica',
        question: '¿Tu respuesta conversa con el prompt o con otros puntos de vista?',
        needsWork: 'Suena como opinión aislada y no como discusión de clase.',
        developing: 'Menciona otra idea, pero la conexión es superficial.',
        strong: 'Matiza, responde o amplía una idea de la discusión con tono académico.',
      },
    ],
    commonErrors: [
      'Repetir el prompt sin aportar una idea propia.',
      'Dar tres razones sin desarrollar ninguna.',
      'Usar ejemplos personales que no conectan con la pregunta.',
    ],
    rewriteMove:
      'Reduce tu respuesta a una fórmula: postura + razón + ejemplo + regreso a la pregunta. Si una parte falta, reescribe antes de agregar vocabulario.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/toefl/writing', label: 'TOEFL Writing hub' },
  { href: '/practica/toefl/writing/model-answers', label: 'Model answers' },
  { href: '/practica/toefl/writing/build-a-sentence', label: 'Build a Sentence' },
  { href: '/practica/toefl/writing/write-an-email', label: 'Write an Email' },
  { href: '/practica/toefl/writing/academic-discussion', label: 'Academic Discussion' },
  { href: '/practica/toefl/writing/integrated-writing', label: 'Integrated Writing legacy' },
];

const LEVEL_LABELS: Record<Level, string> = {
  'needs-work': 'Necesita trabajo',
  developing: 'En desarrollo',
  strong: 'Fuerte',
};

export default function ToeflWritingRubricaClient({
  faqs,
  revisionDrills,
}: {
  faqs: Faq[];
  revisionDrills: ToeflWritingRevisionDrill[];
}) {
  const [selectedId, setSelectedId] = useState<TaskId>('discussion');
  const [ratings, setRatings] = useState<Record<string, Level>>({});
  const [revisionAnswers, setRevisionAnswers] = useState<Record<string, number>>({});

  const selected = useMemo(
    () => RUBRICS.find((rubric) => rubric.id === selectedId) ?? RUBRICS[0],
    [selectedId],
  );

  const score = selected.criteria.reduce((sum, criterion) => {
    const rating = ratings[criterion.id];
    if (rating === 'strong') return sum + 2;
    if (rating === 'developing') return sum + 1;
    return sum;
  }, 0);

  const maxScore = selected.criteria.length * 2;

  function setRating(id: string, level: Level) {
    setRatings((current) => ({ ...current, [id]: level }));
  }

  return (
    <main className="wl-section">
      <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 940, minWidth: 0, overflowX: 'clip' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
          <span>/</span>
          <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Rúbrica</span>
        </nav>

        <p className="eyebrow" style={{ margin: '0 0 0.55rem' }}>
          <span className="ink-line" />TOEFL iBT Writing
        </p>
        <h1 style={{ fontSize: '2rem', lineHeight: 1.08, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', overflowWrap: 'anywhere' }}>
          TOEFL Writing rúbrica y checklist de evaluación
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 780 }}>
          Evalúa tus respuestas de Build a Sentence, Write an Email y Academic Discussion con una rúbrica pedagógica alineada al formato actual de TOEFL Writing.
        </p>

        <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 8, marginBottom: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS presenta tres tipos actuales de Writing: Build a Sentence, Write an Email y Write for an Academic Discussion. La página oficial describe que la sección mide comunicación clara, organización, gramática, vocabulario y escritura con propósito.
          </p>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> convertimos esas habilidades en criterios prácticos para revisar tus respuestas. Esto no es una rúbrica oficial ni una promesa de puntaje.
          </p>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
            Fuente oficial revisada: <a href={ETS_WRITING_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Writing Section</a>. Integrated Writing se mantiene como legacy/síntesis complementaria.
          </p>
        </section>

        <section aria-labelledby="task-rubric-heading">
          <h2 id="task-rubric-heading" style={{ fontSize: '1.3rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Rúbrica por tarea actual
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {RUBRICS.map((rubric) => (
              <button
                key={rubric.id}
                type="button"
                className={rubric.id === selectedId ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                onClick={() => {
                  setSelectedId(rubric.id);
                  setRatings({});
                }}
                style={{ fontSize: '0.82rem' }}
              >
                {rubric.label}
              </button>
            ))}
          </div>

          <article className="wl-card" style={{ padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {selected.officialTask}
            </p>
            <h3 style={{ margin: '0 0 0.55rem', fontSize: '1.12rem', color: 'var(--ink)' }}>{selected.label}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>{selected.purpose}</p>
          </article>

          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {selected.criteria.map((criterion) => (
              <article key={criterion.id} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem', color: 'var(--ink)' }}>{criterion.label}</h3>
                <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{criterion.question}</p>
                <div style={{ display: 'grid', gap: '0.65rem', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
                  {(['needs-work', 'developing', 'strong'] as Level[]).map((level) => {
                    const active = ratings[criterion.id] === level;
                    const text = level === 'needs-work' ? criterion.needsWork : level === 'developing' ? criterion.developing : criterion.strong;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setRating(criterion.id, level)}
                        style={{
                          textAlign: 'left',
                          borderRadius: 8,
                          border: active ? `2px solid ${ACCENT}` : '1px solid var(--line-soft)',
                          background: active ? `${ACCENT}0f` : 'var(--bg-2)',
                          color: 'var(--ink)',
                          padding: '0.8rem',
                          cursor: 'pointer',
                          minHeight: 112,
                        }}
                      >
                        <strong style={{ display: 'block', marginBottom: '0.35rem', color: active ? ACCENT : 'var(--ink)' }}>{LEVEL_LABELS[level]}</strong>
                        <span style={{ display: 'block', color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.83rem' }}>{text}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 8, marginTop: '1rem', background: `${ACCENT}0d` }}>
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--ink)', fontSize: '1rem' }}>Autoevaluación WeLearn</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontWeight: 900, fontSize: '1rem' }}>
              Resultado de revisión: {score} de {maxScore}
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
              Este número no es un puntaje oficial. Úsalo como termómetro: si una tarea queda por debajo de {maxScore - 1}, reescribe antes de seguir acumulando prompts.
            </p>
          </section>
        </section>

        <section aria-labelledby="revision-drills-heading" style={{ marginTop: '1.45rem' }}>
          <h2 id="revision-drills-heading" style={{ fontSize: '1.3rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            TOEFL Writing revision drills por tarea
          </h2>
          <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            Lee una respuesta débil, identifica el problema principal y elige el mejor movimiento de reescritura. Son ejercicios WeLearn de revisión, no calificaciones oficiales.
          </p>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {revisionDrills.map((drill, index) => {
              const selectedAnswer = revisionAnswers[drill.id];
              const locked = selectedAnswer !== undefined;
              const correct = selectedAnswer === drill.answer;

              return (
                <article key={drill.id} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Revision drill {index + 1} · {drill.taskType} · {drill.focus}
                  </p>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1rem', color: 'var(--ink)' }}>{drill.title}</h3>
                  <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Prompt:</strong> {drill.prompt}
                  </p>
                  <p style={{ margin: '0 0 0.75rem', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
                    <strong>Respuesta débil:</strong> {drill.flawedResponse}
                  </p>
                  <p style={{ margin: '0 0 0.7rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.9rem' }}>{drill.question}</p>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {drill.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === drill.answer;
                      const isSelected = selectedAnswer === optionIndex;
                      let border = '1px solid var(--line-soft)';
                      let background = 'var(--bg-2)';
                      let color = 'var(--ink)';

                      if (locked && isCorrect) {
                        border = '1px solid #059669';
                        background = 'rgba(5,150,105,0.1)';
                        color = '#047857';
                      }

                      if (locked && isSelected && !isCorrect) {
                        border = '1px solid #dc2626';
                        background = 'rgba(220,38,38,0.1)';
                        color = '#b91c1c';
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={locked}
                          onClick={() => setRevisionAnswers((current) => ({ ...current, [drill.id]: optionIndex }))}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '28px 1fr',
                            gap: '0.6rem',
                            alignItems: 'start',
                            textAlign: 'left',
                            border,
                            background,
                            color,
                            borderRadius: 8,
                            padding: '0.65rem 0.75rem',
                            font: 'inherit',
                            lineHeight: 1.45,
                            cursor: locked ? 'default' : 'pointer',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--mono)', fontWeight: 900, color: locked && isCorrect ? '#047857' : ACCENT }}>
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {locked && (
                    <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.55rem', border: `1px solid ${correct ? 'rgba(5,150,105,0.35)' : 'rgba(220,38,38,0.28)'}`, borderRadius: 8, padding: '0.8rem', background: correct ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.06)' }}>
                      <p style={{ margin: 0, color: correct ? '#047857' : '#b91c1c', lineHeight: 1.55, fontSize: '0.88rem' }}>
                        <strong>{correct ? 'Correcto.' : `Mejor opción: ${String.fromCharCode(65 + drill.answer)}.`}</strong> {drill.explanation}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> {drill.evidence}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {drill.trap}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Reescritura sugerida:</strong> {drill.rewriteAction}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="wl-card" style={{ padding: '1rem', borderRadius: 8, marginTop: '1rem' }}>
          <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Clave SSR</p>
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.18rem', letterSpacing: 0 }}>Respuestas explicadas de revision drills</h2>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {revisionDrills.map((drill, index) => (
              <article key={`${drill.id}-key`} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.8rem', background: 'var(--bg-2)' }}>
                <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Revision drill {index + 1} · {drill.taskType}
                </p>
                <p style={{ margin: '0 0 0.4rem', color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                  <strong>Mejor opción: {String.fromCharCode(65 + drill.answer)}.</strong> {drill.explanation}
                </p>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                  <strong style={{ color: 'var(--ink)' }}>Reescritura sugerida:</strong> {drill.rewriteAction}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="errors-heading" style={{ marginTop: '1.45rem' }}>
          <h2 id="errors-heading" style={{ fontSize: '1.3rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Errores frecuentes y movimiento de reescritura
          </h2>
          <div className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
            <ul style={{ margin: '0 0 0.9rem', paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.88rem' }}>
              {selected.commonErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              <strong>Movimiento de mejora:</strong> {selected.rewriteMove}
            </p>
          </div>
        </section>

        <section aria-labelledby="links-heading" style={{ marginTop: '1.5rem' }}>
          <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Sigue practicando TOEFL Writing
          </h2>
          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
            {INTERNAL_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq-heading" style={{ marginTop: '1.5rem' }}>
          <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Preguntas frecuentes
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {faqs.map((faq) => (
              <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', color: 'var(--ink)' }}>{faq.question}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
