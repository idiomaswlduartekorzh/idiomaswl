'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CheckCircle2, ExternalLink, RotateCcw, XCircle } from 'lucide-react';
import type { IeltsReadingMixedQuestionTypeSet } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C'];

export default function IeltsReadingMixedQuestionTypeEngine({
  sets,
  accent = '#0369a1',
  language = 'es',
}: {
  sets: IeltsReadingMixedQuestionTypeSet[];
  accent?: string;
  language?: 'es' | 'en';
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const tasks = useMemo(() => sets.flatMap((set) => set.tasks), [sets]);
  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => tasks.filter((task) => answers[task.id] === task.answer).length,
    [answers, tasks]
  );

  function reset() {
    setAnswers({});
  }

  const isEnglish = language === 'en';

  function supportSkill(questionType: string) {
    if (/Heading/i.test(questionType)) return 'skimming and main-idea control';
    if (/Completion|Short-answer|Diagram/i.test(questionType)) return 'scanning and word-limit control';
    if (/True|Yes|Multiple/i.test(questionType)) return 'scope, paraphrase and evidence';
    return 'scanning and category matching';
  }

  return (
    <section
      className="wl-card"
      data-reading-mixed-engine
      style={{ padding: '1rem', borderRadius: 8, borderTop: `4px solid ${accent}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>{isEnglish ? 'Mixed practice' : 'Práctica mixta'}</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>
            {isEnglish ? 'Mixed IELTS Reading question-type bank' : 'Banco mixto de tipos IELTS Reading'}
          </h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            {isEnglish
              ? 'Identify the task format first, then answer from textual evidence. This bank trains transfer between formats; it does not replace the focused lesson for each one.'
              : 'Decide primero qué formato oficial estás viendo; luego responde con evidencia. Este banco entrena transferencia entre tipos, no reemplaza la página dedicada de cada formato.'}
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} aria-hidden="true" />
          {isEnglish ? 'Reset' : 'Reiniciar'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Sets', value: String(sets.length), sub: isEnglish ? 'short original passages' : 'pasajes cortos originales' },
          { label: isEnglish ? 'Tasks' : 'Tareas', value: String(tasks.length), sub: isEnglish ? 'mixed IELTS formats' : 'formatos IELTS mezclados' },
          { label: isEnglish ? 'Goal' : 'Meta', value: isEnglish ? 'format + evidence' : 'tipo + evidencia', sub: isEnglish ? 'not only a final answer' : 'no solo respuesta final' },
        ].map((item) => (
          <article key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <h3 style={{ margin: '0 0 0.3rem', color: 'var(--ink)', fontSize: '0.92rem' }}>{item.value}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.84rem' }}>{item.sub}</p>
          </article>
        ))}
      </div>

      <div
        role="progressbar"
        aria-label={isEnglish ? 'Mixed practice progress' : 'Progreso de práctica mixta'}
        aria-valuemin={0}
        aria-valuemax={tasks.length}
        aria-valuenow={answeredCount}
        style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.round((answeredCount / tasks.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {sets.map((set, setIndex) => (
          <section key={set.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)', borderLeft: `4px solid ${accent}` }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                {isEnglish
                  ? `Set ${setIndex + 1} · ${set.tasks.length} questions · ${set.timeTarget.match(/(\d+)\s*min/)?.[1] ?? '7'} minutes`
                  : `Set ${setIndex + 1} · ${set.timeTarget}`}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.05rem' }}>
                {isEnglish ? `Mixed set ${setIndex + 1}: ${set.passageTitle}` : set.title}
              </h3>
              <p style={{ margin: '0 0 0.7rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {isEnglish
                  ? 'Read the short passage, identify the IELTS Reading task format and choose the option supported by the text.'
                  : set.instructions}
              </p>
              <h4 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{set.passageTitle}</h4>
              <div style={{ display: 'grid', gap: '0.65rem' }}>
                {set.passage.map((paragraph) => {
                  const setReviewed = set.tasks.every((task) => answers[task.id] !== undefined);
                  return (
                    <section
                      key={paragraph.id}
                      data-passage-paragraph={paragraph.id}
                      data-function-revealed={setReviewed}
                      style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.8rem', background: 'var(--bg-2)' }}
                    >
                      <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                        {paragraph.label}{setReviewed && !isEnglish ? ` · ${paragraph.function}` : ''}
                      </p>
                      <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68, fontSize: '0.92rem' }}>{paragraph.text}</p>
                    </section>
                  );
                })}
              </div>
            </article>

            {set.tasks.map((task, taskIndex) => {
              const selected = answers[task.id];
              const locked = selected !== undefined;
              const isCorrectSelection = selected === task.answer;

              return (
                <article
                  key={task.id}
                  className="wl-card"
                  data-mixed-task={task.id}
                  data-question-type-revealed={locked}
                  style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                    <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                      Set {setIndex + 1} · {isEnglish ? 'Question' : 'Pregunta'} {taskIndex + 1}
                    </span>
                    <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                      {locked ? task.questionType : (isEnglish ? 'Task type to identify' : 'Formato por identificar')}
                    </span>
                  </div>

                  {isEnglish ? (
                    <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{task.prompt}</h3>
                  ) : (
                    <>
                      <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Prompt:</strong> {task.prompt}
                      </p>
                      <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{task.question}</h3>
                    </>
                  )}

                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {task.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === task.answer;
                      const isSelected = selected === optionIndex;
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
                          onClick={() => setAnswers((current) => ({ ...current, [task.id]: optionIndex }))}
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
                          <span style={{ fontFamily: 'var(--mono)', fontWeight: 900, color: locked && isCorrect ? '#047857' : accent }}>
                            {LETTERS[optionIndex]}.
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {locked && (
                    <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.65rem' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '24px 1fr',
                          gap: '0.55rem',
                          alignItems: 'start',
                          color: isCorrectSelection ? '#047857' : '#b91c1c',
                          background: isCorrectSelection ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                          borderRadius: 8,
                          padding: '0.7rem',
                          fontSize: '0.88rem',
                          lineHeight: 1.55,
                        }}
                      >
                        {isCorrectSelection ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        <span>
                          <strong>
                            {isEnglish
                              ? (isCorrectSelection ? 'Correct.' : `Best answer: ${LETTERS[task.answer]}.`)
                              : (isCorrectSelection ? 'Correcto.' : `Mejor opción: ${LETTERS[task.answer]}.`)}
                          </strong>{' '}
                          {isEnglish ? 'Compare the selected option with the quoted evidence below.' : task.explanation}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>{isEnglish ? 'Evidence' : 'Evidencia'}:</strong> “{task.evidence}”.
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>{isEnglish ? 'Trap check' : 'Trampa'}:</strong>{' '}
                        {isEnglish ? 'Check scope, passage location and the exact task instruction before choosing.' : task.trap}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>{isEnglish ? 'Support skill' : 'Habilidad de apoyo'}:</strong>{' '}
                        {isEnglish ? supportSkill(task.questionType) : task.linkedSkill}
                      </p>
                      <Link className="btn btn-ghost btn-sm" href={task.route} style={{ justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        {isEnglish ? 'Practise' : 'Practicar'} {task.questionType}
                        <ExternalLink size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>

      {answeredCount === tasks.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
            {isEnglish ? 'Result' : 'Resultado'}: {correctCount}/{tasks.length} {isEnglish ? 'correct decisions' : 'decisiones correctas'}
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            {isEnglish
              ? 'If you misidentified the format, return to its focused route. If you recognised the format but missed the answer, train evidence location, paraphrase or word-limit control.'
              : 'Si fallaste al reconocer el formato, vuelve a la ruta dedicada del tipo de pregunta. Si reconociste el formato pero fallaste la respuesta, entrena evidencia, paráfrasis o límite de palabras.'}
          </p>
        </div>
      )}
    </section>
  );
}
