import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenCheck, CheckCircle2, Clock, Layers3, Route, SearchCheck } from 'lucide-react';
import IeltsReadingMixedQuestionTypeEngine from '@/components/exam-practice/IeltsReadingMixedQuestionTypeEngine';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_READING_MIXED_QUESTION_TYPE_SETS,
  IELTS_READING_SKILLS,
  IELTS_READING_TYPES,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const URL = `${PRACTICE_BASE_URL}/practica/ielts/reading/tipos-de-preguntas`;
const ACCENT = '#0369a1';

export const metadata: Metadata = {
  title: 'Tipos de preguntas IELTS Reading: guía completa y ejercicios',
  description:
    'Guía completa de los 14 tipos oficiales de preguntas IELTS Academic Reading, con rutas canónicas, estrategia WeLearn, ejercicios y enlaces de práctica.',
  keywords: [
    'tipos de preguntas IELTS reading',
    'IELTS reading question types',
    'IELTS reading ejercicios',
    'IELTS true false not given',
    'IELTS matching headings',
  ],
  openGraph: {
    title: 'Tipos de preguntas IELTS Reading: guía completa y ejercicios',
    description: 'Índice canónico de los 14 tipos oficiales de preguntas IELTS Academic Reading con ejercicios por ruta.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

const OFFICIAL_GROUPS = [
  {
    title: 'Evidencia, postura y opción múltiple',
    description: 'Para entrenar precisión: decidir si el texto confirma, contradice, omite o justifica una respuesta.',
    slugs: ['true-false-not-given', 'yes-no-not-given', 'multiple-choice', 'short-answer'],
  },
  {
    title: 'Matching tasks',
    description: 'Para emparejar párrafos, ideas, personas, categorías o finales de oración sin caer en palabras repetidas.',
    slugs: ['matching-headings', 'matching-information', 'matching-features', 'matching-sentence-endings'],
  },
  {
    title: 'Completion tasks',
    description: 'Para completar frases, resúmenes, notas y tablas respetando límite de palabras y gramática.',
    slugs: ['sentence-completion', 'summary-completion', 'note-completion', 'table-completion'],
  },
  {
    title: 'Procesos, diagramas y secuencias',
    description: 'Para leer pasos, partes, etiquetas y relaciones de proceso con scanning dirigido.',
    slugs: ['flow-chart-completion', 'diagram-labeling'],
  },
];

const FAQS = [
  {
    question: '¿Cuántos tipos de preguntas hay en IELTS Academic Reading?',
    answer:
      'IELTS lista 14 tipos frecuentes de tareas para Academic Reading. En esta página los separamos por rutas de práctica para que puedas entrenar cada formato de forma aislada.',
  },
  {
    question: '¿Skimming y scanning son tipos oficiales de pregunta?',
    answer:
      'No. Skimming y scanning son habilidades de lectura. Por eso en Idiomas WeLearn viven en /habilidades y se enlazan como apoyo a los tipos oficiales.',
  },
  {
    question: '¿Debo practicar por tipo de pregunta o hacer simulacros completos?',
    answer:
      'Primero conviene practicar por tipo para entender trampas y método. Después mezcla tipos y termina con simulacros para transferir precisión a condiciones reales de examen.',
  },
];

function bySlug(slug: string) {
  return IELTS_READING_TYPES.find((item) => item.slug === slug);
}

export default function Page() {
  const published = IELTS_READING_TYPES.filter((item) => item.status === 'published');
  const publishedSkills = IELTS_READING_SKILLS.filter((item) => item.status === 'published');

  return (
    <>
      <CourseSchema
        name="Tipos de preguntas IELTS Reading"
        description="Ruta de práctica por tipo de pregunta para IELTS Academic Reading, con estrategia, explicación y ejercicios."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS Reading question types, skimming, scanning, inference, paraphrase"
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name="Tipos de preguntas IELTS Reading"
        url={URL}
        description="Índice educativo para estudiar los 14 tipos oficiales de pregunta del IELTS Academic Reading con ejercicios dedicados."
        teaches={['IELTS Reading', 'question types', 'official task types', 'reading strategies']}
        isPartOf={{ name: 'Práctica IELTS Academic', url: `${PRACTICE_BASE_URL}/practica/ielts` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Tipos de preguntas', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Reading</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Tipos de preguntas</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Academic Reading
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.15rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                Tipos de preguntas IELTS Reading
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
                IELTS Academic Reading usa varios formatos oficiales de pregunta. Aquí tienes el mapa completo de 14 tipos con rutas canónicas, explicación, ejercicios originales y respuestas justificadas para estudiar sin depender solo de simulacros.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <CheckCircle2 size={18} />, label: '14/14 live', text: 'Todos los tipos oficiales de IELTS Academic Reading tienen página y práctica.' },
                { icon: <SearchCheck size={18} />, label: 'Evidencia', text: 'Cada respuesta debe poder subrayarse o justificarse en el texto.' },
                { icon: <Layers3 size={18} />, label: 'Separación', text: 'Tipos oficiales y habilidades WeLearn están enlazados, pero no mezclados.' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', alignItems: 'start' }}>
                  <span style={{ color: ACCENT }}>{item.icon}</span>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>{item.label}:</strong> {item.text}
                  </p>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1.2rem', borderLeft: `4px solid ${ACCENT}` }}>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Formato oficial vs estrategia WeLearn</p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68 }}>
              <strong>Formato oficial:</strong> esta página agrupa los tipos de tarea que IELTS enumera para Academic Reading, como multiple choice, matching, completion, diagram labeling y short-answer questions. <strong>Estrategia WeLearn:</strong> añadimos habilidades de apoyo como skimming, scanning, paráfrasis y límite de palabras para estudiar cada formato con método.
            </p>
            <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              Fuente oficial:{' '}
              <a href="https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test" style={{ color: ACCENT, fontWeight: 800 }}>
                IELTS Academic sample test questions
              </a>
              , sección Academic Reading.
            </p>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
              <div>
                <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Mapa oficial completo</p>
                <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>14 tipos de preguntas IELTS Reading</h2>
              </div>
              <span style={{ fontFamily: 'var(--mono)', color: ACCENT, fontSize: '0.78rem', fontWeight: 900 }}>
                {published.length}/14 rutas live
              </span>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {OFFICIAL_GROUPS.map((group) => (
                <section key={group.title} className="wl-card" style={{ padding: '1rem', borderRadius: 16 }}>
                  <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', marginBottom: '0.45rem', color: ACCENT }}>
                    <Route size={18} />
                    <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.08rem' }}>{group.title}</h3>
                  </div>
                  <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{group.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem' }}>
                    {group.slugs.map((slug) => {
                      const type = bySlug(slug);
                      if (!type) return null;
                      return (
                        <Link key={type.slug} href={type.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                          <article className="wl-card" style={{ padding: '0.9rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', alignItems: 'start', marginBottom: '0.45rem' }}>
                              <h4 style={{ margin: 0, color: 'var(--ink)', fontSize: '0.96rem', letterSpacing: '-0.01em' }}>{type.title.replace('IELTS Reading ', '')}</h4>
                              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 900, color: ACCENT }}>LIVE</span>
                            </div>
                            <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>{type.description}</p>
                            <p style={{ margin: 0, color: ACCENT, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 900 }}>
                              {type.teaches.filter((item) => item !== 'IELTS Reading').slice(0, 3).join(' · ')}
                            </p>
                          </article>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Habilidades de apoyo</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              No son tipos oficiales, pero desbloquean el examen
            </h2>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {publishedSkills.map((skill) => (
                <Link key={skill.slug} href={skill.path} className="btn btn-ghost btn-sm">
                  {skill.title.replace('IELTS Reading ', '')}
                </Link>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Cómo usar esta ruta</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Primero precisión, después velocidad
            </h2>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {[
                'Empieza por el tipo de pregunta que más te confunde y completa una sesión sin mirar el tiempo.',
                'Lee la explicación de cada error y clasifícalo: vocabulario, alcance, inferencia, ubicación o distracción por palabra repetida.',
                'Repite el mismo tipo con un texto nuevo. Cuando superes 80% de precisión, mezcla tipos de preguntas.',
                'Termina la semana con un simulacro IELTS Academic para medir transferencia a examen completo.',
              ].map((step, index) => (
                <p key={step} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </p>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '1.2rem' }}>
            <IeltsReadingMixedQuestionTypeEngine sets={IELTS_READING_MIXED_QUESTION_TYPE_SETS} accent={ACCENT} />
          </section>

          {published.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <Link href={published[0].path} className="btn btn-sm">Empezar con True/False/Not Given</Link>
            </div>
          )}

          <section style={{ marginTop: '1.4rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {FAQS.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
