import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenCheck, Eye, ListChecks, SearchCheck } from 'lucide-react';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import SkimScanTransferEngine from '@/components/exam-practice/SkimScanTransferEngine';
import SkimmingPracticeEngine from '@/components/exam-practice/SkimmingPracticeEngine';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_READING_SKILLS,
  IELTS_SKIM_SCAN_TRANSFER_SETS,
  IELTS_SKIMMING_PRACTICE,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'skimming')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#0369a1';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

export const metadata: Metadata = {
  title: 'Skimming IELTS Reading: método de 45 segundos y ejercicios',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'Skimming IELTS Reading: método de 45 segundos',
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
          { name: 'Skimming', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Skimming</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Habilidad
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Skimming: encuentra la idea principal sin leer cada palabra
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                Skimming es una lectura rápida para crear un mapa del pasaje: tema, función de cada párrafo y cambios de dirección. En IELTS no reemplaza la evidencia, pero evita que busques respuestas a ciegas.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Meta', value: '30-60 s', sub: 'orientación inicial' },
                { label: 'Sirve para', value: 'mapear', sub: 'tema y función' },
                { label: 'No es', value: 'respuesta', sub: 'requiere evidencia' },
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
              <strong>Respuesta directa:</strong> usa skimming al inicio del pasaje para leer título, primeras oraciones, conectores y palabras repetidas. Tu producto final no es una respuesta: es un mapa breve que te dice dónde volver cuando una pregunta pida detalle, inferencia o idea principal.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading tiene 60 minutos y textos académicos con tipos de pregunta como Matching Headings, Matching Information, Summary Completion y Sentence Completion. Skimming no aparece como tipo de pregunta oficial.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> usamos skimming como habilidad previa: crear un mapa del pasaje para decidir dónde aplicar scanning, lectura detallada o inferencia.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es de habilidad, no de tipo de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <Eye size={18} />,
                title: 'Reconocer el tema',
                text: 'Identifica de qué trata el texto antes de entrar a detalles, fechas o vocabulario difícil.',
              },
              {
                icon: <BookOpenCheck size={18} />,
                title: 'Mapear párrafos',
                text: 'Asigna una función breve: definición, contraste, problema, evidencia, limitación o solución.',
              },
              {
                icon: <SearchCheck size={18} />,
                title: 'Leer con intención',
                text: 'Vuelve al párrafo correcto para scanning o close reading cuando la pregunta lo exija.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>El método de 45 segundos</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Lee el título y cualquier subtítulo para predecir campo semántico y propósito.',
                'Lee la primera oración de cada párrafo; suele presentar la idea principal o el giro argumentativo.',
                'Detecta palabras repetidas y conectores como however, therefore, in contrast o for example.',
                'Resume cada párrafo en 3 a 5 palabras: problema inicial, nuevo hallazgo, limitación, solución posible.',
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
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #dc2626' }}>
              <h2 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '1.05rem' }}>Versión débil</h2>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Leer cada palabra, traducir mentalmente y detenerse en vocabulario desconocido antes de conocer el propósito del texto.
              </p>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #059669' }}>
              <h2 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '1.05rem' }}>Versión fuerte</h2>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Obtener primero el mapa general y volver después al párrafo correcto para leer con precisión, evidencia y límite de tiempo.
              </p>
            </article>
          </section>

          <SkimmingPracticeEngine practice={IELTS_SKIMMING_PRACTICE} accent={ACCENT} />

          <section style={{ marginTop: '1.2rem' }}>
            <SkimScanTransferEngine practices={IELTS_SKIM_SCAN_TRANSFER_SETS} accent={ACCENT} />
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del ejercicio de skimming</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <article style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                  Resumen global: opción {String.fromCharCode(65 + IELTS_SKIMMING_PRACTICE.summaryQuestion.answer)}
                </h3>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                  {IELTS_SKIMMING_PRACTICE.summaryQuestion.explanation}
                </p>
              </article>
              {IELTS_SKIMMING_PRACTICE.paragraphMap.map((item) => (
                <article key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    {item.label}: {item.options[item.answer]}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {item.explanation}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica independiente</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Repite el patrón sin ayuda</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Abre cualquier pasaje IELTS y dedica 45 segundos a título, primeras oraciones y conectores.',
                'Escribe una etiqueta de 3 a 5 palabras para cada párrafo: definición, problema, contraste, evidencia, límite o solución.',
                'Antes de responder preguntas, predice qué párrafo servirá para Matching Headings, Matching Information o Summary Completion.',
                'Después de resolver, marca si tu mapa te llevó al párrafo correcto o si leíste demasiado sin dirección.',
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
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Errores comunes</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: 0 }}>Trampas que dañan el skimming</h2>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {[
                {
                  trap: 'Elegir una opción porque repite una palabra del texto.',
                  fix: 'Skimming busca función global; una palabra repetida puede ser detalle, ejemplo o contraste.',
                },
                {
                  trap: 'Leer todas las cifras y nombres antes de saber el tema.',
                  fix: 'Guarda los datos para scanning. Primero decide qué hace cada párrafo.',
                },
                {
                  trap: 'Confundir el primer ejemplo con la idea principal.',
                  fix: 'Busca conectores y cambios de dirección: however, for example, therefore, in contrast.',
                },
              ].map((item) => (
                <article key={item.trap} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {item.trap}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Corrección:</strong> {item.fix}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Checklist de dominio</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Sabes hacer skimming cuando puedes...</h2>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {[
                'decir el tema del pasaje sin traducir cada línea',
                'nombrar la función de cada párrafo en pocas palabras',
                'reconocer conectores de contraste, causa y ejemplo',
                'volver al párrafo correcto cuando una pregunta pide evidencia',
                'evitar elegir una respuesta solo porque repite vocabulario del texto',
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
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Siguiente paso</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Después de skimming, practica scanning</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Scanning usa el mapa que acabas de construir para localizar nombres, fechas, cifras, sinónimos y frases equivalentes. Aplica skimming en Matching Headings y Summary Completion; luego usa scanning para preguntas con evidencia localizada.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-sm">
                Seguir con scanning
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/matching-headings" className="btn btn-sm">
                Practicar Matching Headings
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/matching-information" className="btn btn-ghost btn-sm">
                Practicar Matching Information
              </Link>
              <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
                Volver a IELTS Reading
              </Link>
            </div>
          </section>

          <SkillReviewSourceBlock
            accent={ACCENT}
            skillName="skimming"
            reviewedFocus={[
              'separación clara entre habilidad WeLearn y tipo oficial de pregunta',
              'transferencia a Matching Headings, Summary Completion y búsqueda posterior de evidencia',
              'ejercicios originales con explicación, trampa y siguiente paso',
            ]}
            sources={[
              {
                label: 'IELTS Academic test format and sections',
                href: IELTS_ACADEMIC_URL,
                note: 'fuente oficial usada para ubicar esta página como habilidad de preparación, no como tipo oficial de pregunta.',
              },
              {
                label: 'idiomaswl_ielts_skimming_preview.html',
                note: 'referencia interna usada para convertir el flujo de skimming en una página indexable y práctica.',
              },
              {
                label: 'Skimming exercise / Skimming and scanning',
                note: 'materiales internos usados como base pedagógica para el patrón de mapa general y transferencia a scanning.',
              },
            ]}
          />

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              Nota de formato: skimming es una estrategia de lectura de WeLearn, no un tipo de pregunta oficial del IELTS. Para tipos de pregunta oficiales, usa la ruta de IELTS Reading por tipo.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
