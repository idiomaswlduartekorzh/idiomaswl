import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenCheck, CheckCircle2, Lightbulb, Scale, XCircle } from 'lucide-react';
import InferencePracticeEngine from '@/components/exam-practice/InferencePracticeEngine';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_INFERENCE_PRACTICE_SETS,
  IELTS_READING_SKILLS,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'inferencia')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#7c3aed';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

export const metadata: Metadata = {
  title: 'Inferencia IELTS Reading: evidencia antes de concluir',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'Inferencia IELTS Reading: evidencia antes de concluir',
    description: ROUTE.description,
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name={ROUTE.title}
        url={URL}
        description={ROUTE.description}
        teaches={ROUTE.teaches}
        isPartOf={{ name: 'Habilidades IELTS Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading/habilidades` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Habilidades', url: `${PRACTICE_BASE_URL}/practica/ielts/reading/habilidades` },
          { name: 'Inferencia', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading/habilidades" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Habilidades</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Inferencia</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Habilidad
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Inferencia: concluye solo lo que la evidencia permite
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                En IELTS Reading, una inferencia correcta no es una opinión inteligente ni una suposición cultural. Es una conclusión moderada que puedes defender con palabras del pasaje.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Base', value: 'evidencia', sub: 'pistas del texto' },
                { label: 'Tono', value: 'moderado', sub: 'sin exagerar' },
                { label: 'Evita', value: 'afuera', sub: 'conocimiento externo' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
                  <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800 }}>{item.label}</span>
                  <strong style={{ color: ACCENT, fontFamily: 'var(--mono)', fontSize: '1.05rem', textAlign: 'right' }}>
                    {item.value}
                    <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.66rem', fontWeight: 700 }}>{item.sub}</span>
                  </strong>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> infiere cuando el texto sugiere una idea sin decirla literalmente. La respuesta correcta debe ser defendible con evidencia cercana y no debe añadir datos que el pasaje no autoriza.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading dura 60 minutos e incluye tipos de pregunta como Multiple Choice, Matching Headings, Yes/No/Not Given y True/False/Not Given. La inferencia aparece dentro de esas decisiones, pero no es una categoría oficial independiente del examen.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos inferencia como control de evidencia: ubicar una zona del texto, reconocer la relación lógica y elegir la conclusión más moderada que el pasaje permite.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es de habilidad, no de tipo de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <BookOpenCheck size={18} />,
                title: 'Pistas textuales',
                text: 'Busca contraste, causa, consecuencia, cambio de tono, ejemplos repetidos o una decisión del autor.',
              },
              {
                icon: <Scale size={18} />,
                title: 'Conclusión proporcional',
                text: 'La inferencia debe tener el mismo alcance que la evidencia: probable no significa seguro; some no significa all.',
              },
              {
                icon: <Lightbulb size={18} />,
                title: 'No inventes contexto',
                text: 'Si necesitas conocimiento externo para defender una opción, esa opción no pertenece a la respuesta.',
              },
            ].map((item) => (
              <article key={item.title} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: ACCENT, alignItems: 'center', marginBottom: '0.35rem' }}>
                  {item.icon}
                  <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>{item.title}</h2>
                </div>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58, fontSize: '0.9rem' }}>{item.text}</p>
              </article>
            ))}
          </section>

          <section className="wl-card" style={{ padding: '1.2rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Método WeLearn</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Prueba de inferencia en 4 pasos</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Localiza la zona del texto con scanning antes de evaluar opciones.',
                'Subraya la relación lógica: causa, contraste, consecuencia, propósito o cambio.',
                'Formula una conclusión corta con tus propias palabras.',
                'Elimina opciones extremas, literales pero incompletas, o externas al pasaje.',
              ].map((item, index) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #059669' }}>
              <div style={{ display: 'flex', gap: '0.45rem', color: '#047857', alignItems: 'center', marginBottom: '0.35rem' }}>
                <CheckCircle2 size={18} />
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Inferencia fuerte</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                El texto dice que la asistencia a talleres creció y que el préstamo de novelas no. Puedes inferir que el crecimiento vino de servicios no tradicionales.
              </p>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #dc2626' }}>
              <div style={{ display: 'flex', gap: '0.45rem', color: '#b91c1c', alignItems: 'center', marginBottom: '0.35rem' }}>
                <XCircle size={18} />
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Inferencia débil</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                El texto menciona talleres, entonces la biblioteca abandonó completamente los libros. Esa conclusión usa una palabra real, pero exagera el alcance.
              </p>
            </article>
          </section>

          <InferencePracticeEngine practices={IELTS_INFERENCE_PRACTICE_SETS} accent={ACCENT} />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del ejercicio de inferencia</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {IELTS_INFERENCE_PRACTICE_SETS.flatMap((practiceSet) => practiceSet.questions).map((question, index) => (
                <article key={question.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Inferencia {index + 1} · evidencia: {question.evidenceFocus}
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    Respuesta correcta: {String.fromCharCode(65 + question.answer)}
                  </h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> “{question.evidence}”. {question.explanation}
                  </p>
                  <div style={{ display: 'grid', gap: '0.35rem' }}>
                    {question.traps.map((trap) => (
                      <p key={trap} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {trap}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica independiente</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Repite la prueba de evidencia</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Toma una pregunta y localiza primero la zona del texto; no mires las opciones como si fueran opiniones aisladas.',
                'Escribe una conclusión de una línea usando lenguaje moderado: probably, likely, suggests, may indicate.',
                'Subraya qué palabra del texto sostiene esa conclusión y qué palabra limita su alcance.',
                'Elimina opciones que agregan datos externos, convierten posibilidad en certeza o usan absolutos como always, never, only y completely.',
                'Antes de elegir, di en voz baja: esta opción se puede defender con esta frase exacta del pasaje.',
              ].map((item, index) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Checklist de dominio</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Sabes inferir cuando puedes...</h2>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {[
                'explicar qué frase del texto sostiene tu conclusión',
                'separar una deducción válida de una opinión externa',
                'evitar opciones con always, never, only o completely si el texto no es absoluto',
                'mantener la inferencia dentro del alcance del pasaje',
                'defender por qué las opciones trampa exageran, contradicen o inventan información',
              ].map((item) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.55rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  <CheckCircle2 size={18} style={{ color: ACCENT, marginTop: 2 }} />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '1.4rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {ROUTE.faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Dónde aplicar inferencia</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Conecta esta habilidad con tipos de pregunta oficiales</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Inferencia no reemplaza los tipos oficiales de IELTS Reading. Úsala como soporte cuando una pregunta te pide intención, idea implícita, alcance o función de un párrafo.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-ghost btn-sm">
                Ubicar evidencia con scanning
              </Link>
              <Link href="/practica/ielts/reading/habilidades/parafrasis" className="btn btn-ghost btn-sm">
                Revisar paráfrasis
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/multiple-choice" className="btn btn-sm">
                Practicar Multiple Choice
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/matching-headings" className="btn btn-ghost btn-sm">
                Practicar Matching Headings
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/true-false-not-given" className="btn btn-ghost btn-sm">
                Practicar True/False/Not Given
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given" className="btn btn-ghost btn-sm">
                Practicar Yes/No/Not Given
              </Link>
              <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
                Volver a IELTS Reading
              </Link>
            </div>
          </section>

          <SkillReviewSourceBlock
            accent={ACCENT}
            skillName="inferencia"
            reviewedFocus={[
              'separación entre inferencia como habilidad y tipos oficiales de pregunta',
              'uso de evidencia textual antes de aceptar una conclusión',
              'control de opciones extremas, conocimiento externo y trampas de alcance',
            ]}
            sources={[
              {
                label: 'IELTS Academic test format and sections',
                href: IELTS_ACADEMIC_URL,
                note: 'fuente oficial usada para situar la habilidad dentro de IELTS Academic Reading.',
              },
              {
                label: 'Syllogism',
                note: 'material interno usado como referencia de razonamiento lógico y conclusiones sostenidas por evidencia.',
              },
              {
                label: 'Banco WeLearn de inferencia',
                note: 'pasajes originales creados para entrenar conclusiones moderadas, evidencia y eliminación de distractores.',
              },
            ]}
          />

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              Nota de formato: inferencia es una habilidad de lectura de WeLearn, no una categoría oficial independiente del IELTS. Para tipos de pregunta oficiales, usa la ruta de IELTS Reading por tipo.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
