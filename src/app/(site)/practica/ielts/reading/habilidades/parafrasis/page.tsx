import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightLeft, CheckCircle2, FileText, ListChecks, ShieldCheck, XCircle } from 'lucide-react';
import ParaphrasePracticeEngine from '@/components/exam-practice/ParaphrasePracticeEngine';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_PARAPHRASE_PRACTICE_SETS,
  IELTS_READING_SKILLS,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'parafrasis')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#0f766e';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

export const metadata: Metadata = {
  title: 'Paráfrasis IELTS Reading: reconoce la misma idea',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'Paráfrasis IELTS Reading: reconoce la misma idea',
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
          { name: 'Paráfrasis', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Paráfrasis</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Habilidad
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Paráfrasis: reconoce la misma idea con otra forma
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                IELTS casi nunca copia el texto palabra por palabra. Cambia verbos, sustantivos, orden, conectores y grado de certeza. Tu trabajo es decidir si el significado se conserva o si cambió algo esencial.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Misma idea', value: 'equivalencia', sub: 'no traducción literal' },
                { label: 'Controla', value: 'alcance', sub: 'some, all, may, will' },
                { label: 'Evita', value: 'trampas', sub: 'causa o tiempo invertido' },
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
              <strong>Respuesta directa:</strong> una paráfrasis correcta conserva el significado aunque cambie las palabras. Si cambia cantidad, certeza, causa, tiempo, comparación o condición, ya no es equivalente.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading dura 60 minutos y usa tipos de pregunta oficiales como Multiple Choice, Matching Information, Summary Completion, Sentence Completion y True/False/Not Given. Paráfrasis no es un tipo de pregunta independiente.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> usamos paráfrasis como filtro de equivalencia para comprobar si pregunta, opción y evidencia dicen la misma idea con otra forma.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es de habilidad, no de tipo de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <ArrowRightLeft size={18} />,
                title: 'Cambio de forma',
                text: 'Reduce can be lower; after can become once; because can become since. Cambia la superficie, no la relación.',
              },
              {
                icon: <ShieldCheck size={18} />,
                title: 'Alcance intacto',
                text: 'Some no es all. May no es will. Reduced no es eliminated. IELTS castiga esas exageraciones pequeñas.',
              },
              {
                icon: <FileText size={18} />,
                title: 'Encaje gramatical',
                text: 'En completion tasks, la palabra correcta debe conservar sentido y también encajar en la frase.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Prueba de equivalencia en 5 filtros</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Identifica la idea base: quién hizo qué, cuándo y por qué.',
                'Marca palabras de alcance: some, several, most, all, only, every.',
                'Marca certeza: may, can, likely, usually, will, must.',
                'Comprueba causa, contraste, condición y secuencia.',
                'Elige la opción que cambia forma sin cambiar la relación lógica.',
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
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Paráfrasis fuerte</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                The system reduced waiting times → The system shortened queues. Cambia el vocabulario, pero mantiene resultado y grado.
              </p>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #dc2626' }}>
              <div style={{ display: 'flex', gap: '0.45rem', color: '#b91c1c', alignItems: 'center', marginBottom: '0.35rem' }}>
                <XCircle size={18} />
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Paráfrasis rota</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                The system reduced waiting times → The system eliminated all waiting. Suena parecido, pero cambia el alcance.
              </p>
            </article>
          </section>

          <ParaphrasePracticeEngine practices={IELTS_PARAPHRASE_PRACTICE_SETS} accent={ACCENT} />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del ejercicio de paráfrasis</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {IELTS_PARAPHRASE_PRACTICE_SETS.flatMap((practiceSet) => practiceSet.items).map((item, index) => (
                <article key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Paráfrasis {index + 1} · foco: {item.focus}
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    Respuesta correcta: {String.fromCharCode(65 + item.answer)}
                  </h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {item.explanation}
                  </p>
                  <div style={{ display: 'grid', gap: '0.35rem' }}>
                    {item.traps.map((trap) => (
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Repite el filtro de equivalencia</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Toma una pregunta IELTS y separa la idea base: sujeto, acción, resultado y condición.',
                'Marca palabras de alcance y certeza en la pregunta: all, some, may, usually, only, must.',
                'Busca en el texto una frase equivalente, no necesariamente la misma palabra.',
                'Antes de elegir, pregunta qué cambió: cantidad, causa, tiempo, comparación, condición o intensidad.',
                'Escribe una línea justificando por qué la opción conserva la idea o por qué la rompe.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Sabes reconocer paráfrasis cuando puedes...</h2>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {[
                'decir qué palabra o estructura cambió sin perder significado',
                'detectar cuando una opción exagera el alcance del texto',
                'separar sinónimo real de palabra cercana pero imprecisa',
                'mantener causa, contraste, condición y tiempo en la misma dirección',
                'explicar por qué una opción con vocabulario del texto puede ser falsa',
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
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Dónde aplicar paráfrasis</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Conecta esta habilidad con tipos de pregunta oficiales</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Paráfrasis sostiene casi todo IELTS Reading, pero no reemplaza los tipos oficiales. Úsala para encontrar equivalencias entre pregunta, opción y evidencia.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/reading/habilidades/skimming" className="btn btn-ghost btn-sm">
                Volver a skimming
              </Link>
              <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-ghost btn-sm">
                Practicar scanning
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/summary-completion" className="btn btn-sm">
                Practicar Summary Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/sentence-completion" className="btn btn-ghost btn-sm">
                Practicar Sentence Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/true-false-not-given" className="btn btn-ghost btn-sm">
                Practicar True/False/Not Given
              </Link>
              <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
                Volver a IELTS Reading
              </Link>
            </div>
          </section>

          <SkillReviewSourceBlock
            accent={ACCENT}
            skillName="paráfrasis"
            reviewedFocus={[
              'separación entre paráfrasis como habilidad y tipos oficiales de pregunta',
              'control de equivalencia en alcance, certeza, causa, tiempo y contraste',
              'explicaciones que muestran por qué una opción cercana puede no ser equivalente',
            ]}
            sources={[
              {
                label: 'IELTS Academic test format and sections',
                href: IELTS_ACADEMIC_URL,
                note: 'fuente oficial usada para mantener la página dentro del formato IELTS Academic Reading.',
              },
              {
                label: 'Banco WeLearn de paráfrasis',
                note: 'ejercicios originales creados para entrenar equivalencia semántica y trampas de alcance.',
              },
              {
                label: 'Rutas oficiales relacionadas',
                note: 'la habilidad se conecta con Multiple Choice, Matching Information, Completion y True/False/Not Given.',
              },
            ]}
          />

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              Nota de formato: paráfrasis es una habilidad de lectura de WeLearn, no una categoría oficial independiente del IELTS. Para tipos de pregunta oficiales, usa la ruta de IELTS Reading por tipo.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
