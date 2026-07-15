import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, FileCheck2, ListChecks, PenLine, Ruler, XCircle } from 'lucide-react';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import WordLimitPracticeEngine from '@/components/exam-practice/WordLimitPracticeEngine';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_READING_SKILLS,
  IELTS_WORD_LIMIT_PRACTICE_SETS,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'limite-de-palabras')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#b45309';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

export const metadata: Metadata = {
  title: 'Límite de palabras IELTS Reading: respuestas exactas',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'Límite de palabras IELTS Reading: respuestas exactas',
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
          { name: 'Límite de palabras', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Límite de palabras</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Habilidad
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Límite de palabras: responde exacto, no largo
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                En IELTS Reading, una respuesta puede tener la idea correcta y aun así fallar si excede la instrucción. Esta habilidad entrena precisión: copiar solo lo necesario y hacer que la frase final funcione.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Lee', value: 'instrucción', sub: 'NO MORE THAN...' },
                { label: 'Copia', value: 'mínimo', sub: 'sin palabras extra' },
                { label: 'Verifica', value: 'gramática', sub: 'la frase completa' },
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
              <strong>Respuesta directa:</strong> si la instrucción dice NO MORE THAN TWO WORDS, tres palabras fallan aunque sean correctas. Copia del texto solo la parte que completa la frase y respeta el límite exacto.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading dura 60 minutos y puede incluir tareas como Summary Completion, Sentence Completion, Note Completion, Table Completion, Flow-chart Completion, Diagram Labeling y Short-answer Questions. En esas tareas, la instrucción puede limitar cuántas palabras o números puedes escribir.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos límite de palabras como una habilidad transversal: leer la instrucción, ubicar evidencia, copiar la unidad mínima y comprobar que la frase final funcione.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es de habilidad, no de tipo de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <Ruler size={18} />,
                title: 'Cuenta antes de escribir',
                text: 'No esperes al final. Identifica si necesitas una palabra, dos palabras o una palabra y un número.',
              },
              {
                icon: <PenLine size={18} />,
                title: 'Completa la frase',
                text: 'La respuesta debe sonar natural dentro del gap. No copies una frase larga si el enunciado ya trae parte de ella.',
              },
              {
                icon: <FileCheck2 size={18} />,
                title: 'Usa palabras del texto',
                text: 'En completion tasks, normalmente debes tomar la respuesta del pasaje, no inventar un sinónimo propio.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Control de respuesta en 5 pasos</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Lee la instrucción completa antes del primer gap.',
                'Subraya si permite words, numbers o words and/or a number.',
                'Localiza la frase del pasaje con scanning y paráfrasis.',
                'Copia la menor unidad que completa el sentido.',
                'Relee la oración final y cuenta las palabras antes de pasar al siguiente gap.',
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
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Respuesta fuerte</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Gap: Rooftop gardens are useful where ground-level ____ is limited. Respuesta: green space. Dos palabras, exactas y gramaticales.
              </p>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #dc2626' }}>
              <div style={{ display: 'flex', gap: '0.45rem', color: '#b91c1c', alignItems: 'center', marginBottom: '0.35rem' }}>
                <XCircle size={18} />
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Respuesta rota</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Escribir ground-level green space copia más contexto del necesario y rompe el límite de palabras.
              </p>
            </article>
          </section>

          <WordLimitPracticeEngine practices={IELTS_WORD_LIMIT_PRACTICE_SETS} accent={ACCENT} />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del ejercicio de límite de palabras</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {IELTS_WORD_LIMIT_PRACTICE_SETS.flatMap((practiceSet) => practiceSet.questions).map((question, index) => (
                <article key={question.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Gap {index + 1} · máximo dos palabras
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    Respuesta correcta: {question.answer}
                  </h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {question.explanation}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {question.trap}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica independiente</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Repite el control antes de mirar la clave</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Antes de responder, copia la instrucción exacta: ONE WORD, TWO WORDS, A NUMBER o WORDS AND/OR A NUMBER.',
                'Mira las palabras antes y después del espacio para decidir si falta sustantivo, número, adjetivo o frase nominal.',
                'Ubica la frase del pasaje con scanning y confirma que no estás copiando contexto innecesario.',
                'Escribe la unidad mínima que completa la oración y elimina palabras que ya aparecen en el enunciado.',
                'Cuenta la respuesta final y relee la oración completa como si fuera una sola frase.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Sabes controlar el límite cuando puedes...</h2>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {[
                'leer y aplicar la instrucción antes de responder',
                'copiar solo la unidad mínima que completa el gap',
                'evitar repetir palabras que ya aparecen antes o después del espacio',
                'contar compuestos, números y frases antes de escribir en la hoja final',
                'explicar por qué una respuesta larga puede ser incorrecta aunque contenga la idea correcta',
              ].map((item) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.55rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  <ListChecks size={18} style={{ color: ACCENT, marginTop: 2 }} />
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
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Dónde aplicar límite de palabras</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Conecta esta habilidad con tipos de pregunta oficiales</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Esta habilidad no reemplaza los tipos oficiales. Te prepara para responder con precisión en tareas donde IELTS exige copiar una cantidad exacta de palabras.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-ghost btn-sm">
                Practicar scanning
              </Link>
              <Link href="/practica/ielts/reading/habilidades/parafrasis" className="btn btn-ghost btn-sm">
                Practicar paráfrasis
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/sentence-completion" className="btn btn-sm">
                Practicar Sentence Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/summary-completion" className="btn btn-ghost btn-sm">
                Practicar Summary Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/note-completion" className="btn btn-ghost btn-sm">
                Practicar Note Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/table-completion" className="btn btn-ghost btn-sm">
                Practicar Table Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/diagram-labeling" className="btn btn-ghost btn-sm">
                Practicar Diagram Labeling
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/short-answer" className="btn btn-ghost btn-sm">
                Practicar Short-answer
              </Link>
              <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
                Volver a IELTS Reading
              </Link>
            </div>
          </section>

          <SkillReviewSourceBlock
            accent={ACCENT}
            skillName="límite de palabras"
            reviewedFocus={[
              'separación entre límite de palabras como habilidad y completion tasks oficiales',
              'respuestas copiables del texto con ajuste gramatical en el espacio',
              'control de conteo, artículos, compuestos, números y respuestas demasiado largas',
            ]}
            sources={[
              {
                label: 'IELTS Academic test format and sections',
                href: IELTS_ACADEMIC_URL,
                note: 'fuente oficial usada para situar las tareas de Reading dentro del formato académico.',
              },
              {
                label: 'Banco WeLearn de completion',
                note: 'pasajes originales creados para practicar respuestas exactas y límites de palabras.',
              },
              {
                label: 'Rutas oficiales relacionadas',
                note: 'la habilidad se conecta con Sentence, Summary, Note, Table, Diagram Labeling y Short Answer.',
              },
            ]}
          />

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              Nota de formato: límite de palabras es una habilidad de lectura de WeLearn, no una categoría oficial independiente del IELTS. Para tipos de pregunta oficiales, usa la ruta de IELTS Reading por tipo.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
