import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenCheck, ListChecks, LocateFixed, SearchCheck } from 'lucide-react';
import ScanningPracticeEngine from '@/components/exam-practice/ScanningPracticeEngine';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import SkimScanTransferEngine from '@/components/exam-practice/SkimScanTransferEngine';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_READING_SKILLS,
  IELTS_SCANNING_PRACTICE,
  IELTS_SKIM_SCAN_TRANSFER_SETS,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'scanning')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#0369a1';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

export const metadata: Metadata = {
  title: 'Scanning IELTS Reading: localiza evidencia rápido',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'Scanning IELTS Reading: localiza evidencia rápido',
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
          { name: 'Scanning', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Scanning</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Habilidad
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Scanning: localiza evidencia sin releer todo el pasaje
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                Scanning es buscar una señal específica dentro del texto: un nombre, fecha, cifra, término técnico o paráfrasis. En IELTS te ayuda a encontrar la zona de evidencia antes de decidir la respuesta.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Busca', value: 'señales', sub: 'nombres, fechas, cifras' },
                { label: 'Lee', value: 'alrededor', sub: 'una oración antes/después' },
                { label: 'Evita', value: 'saltos', sub: 'sin evidencia exacta' },
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
              <strong>Respuesta directa:</strong> usa scanning cuando ya sabes qué buscar. Convierte la pregunta en una señal visible, muévete rápido por el pasaje y detente solo cuando encuentres una coincidencia exacta o una paráfrasis probable.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading dura 60 minutos y usa tipos de pregunta oficiales como Matching Information, Sentence Completion, Diagram Labeling y Short Answer. Scanning no es un tipo de pregunta oficial.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> usamos scanning como habilidad para convertir preguntas en señales, ubicar la zona de evidencia y leer alrededor antes de responder.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es de habilidad, no de tipo de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <LocateFixed size={18} />,
                title: 'Señales visibles',
                text: 'Fechas, nombres, cifras, mayúsculas y términos técnicos son puntos de entrada rápidos.',
              },
              {
                icon: <SearchCheck size={18} />,
                title: 'Paráfrasis',
                text: 'Si la palabra exacta no aparece, busca una idea equivalente: reduce puede ser lower, limitar puede ser control.',
              },
              {
                icon: <BookOpenCheck size={18} />,
                title: 'Lectura localizada',
                text: 'Cuando encuentres la zona, lee una oración alrededor para evitar respuestas fuera de contexto.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>El método de 4 señales</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Convierte la pregunta en una señal: número, nombre, lugar, causa, frecuencia o palabra límite.',
                'Escanea visualmente el párrafo probable; no pronuncies ni traduzcas cada palabra.',
                'Cuando encuentres una coincidencia, lee la oración completa y una oración alrededor.',
                'Comprueba que la respuesta encaje con la pregunta exacta y con el límite de palabras si existe.',
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
                Leer todo el pasaje desde el inicio cada vez que una pregunta pide un dato específico.
              </p>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #059669' }}>
              <h2 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '1.05rem' }}>Versión fuerte</h2>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Usar la pregunta como detector, encontrar la zona exacta y confirmar la respuesta con evidencia cercana.
              </p>
            </article>
          </section>

          <ScanningPracticeEngine practice={IELTS_SCANNING_PRACTICE} accent={ACCENT} />

          <section style={{ marginTop: '1.2rem' }}>
            <SkimScanTransferEngine practices={IELTS_SKIM_SCAN_TRANSFER_SETS} accent={ACCENT} />
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del ejercicio de scanning</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {IELTS_SCANNING_PRACTICE.targets.map((target, index) => (
                <article key={target.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Target {index + 1} · scan for: {target.scanFor}
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    Respuesta: {target.answer}
                  </h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> “{target.evidence}”.
                  </p>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {target.explanation}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {target.trap}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica independiente</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Repite el patrón sin revelar evidencia</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Toma 6 preguntas de un pasaje y subraya en cada pregunta la señal principal: nombre, fecha, número, lugar, causa o límite.',
                'Antes de leer, predice qué forma tendrá la respuesta: una palabra, un número, un nombre propio o una frase corta.',
                'Escanea solo por la señal o su paráfrasis; cuando la encuentres, lee una oración antes y una después.',
                'Escribe la evidencia exacta que justifica tu respuesta. Si no puedes citarla, todavía no tienes respuesta.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Sabes hacer scanning cuando puedes...</h2>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {[
                'convertir una pregunta en una señal concreta antes de mirar el texto',
                'distinguir números que responden cosas diferentes',
                'buscar paráfrasis cuando la palabra exacta no aparece',
                'leer alrededor de la coincidencia antes de escribir la respuesta',
                'evitar una opción que aparece cerca pero responde otra pregunta',
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
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Dónde aplicar scanning</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Pásalo a tipos de pregunta con respuesta localizada</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Scanning transfiere mejor a preguntas donde la respuesta está en una zona concreta del texto. Empieza con Matching Information, Sentence Completion y Diagram Labeling.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/reading/habilidades/skimming" className="btn btn-sm">
                Volver a skimming
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/matching-information" className="btn btn-sm">
                Practicar Matching Information
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/sentence-completion" className="btn btn-ghost btn-sm">
                Practicar Sentence Completion
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/diagram-labeling" className="btn btn-ghost btn-sm">
                Practicar Diagram Labeling
              </Link>
              <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
                Volver a IELTS Reading
              </Link>
            </div>
          </section>

          <SkillReviewSourceBlock
            accent={ACCENT}
            skillName="scanning"
            reviewedFocus={[
              'separación clara entre habilidad WeLearn y tipos oficiales con evidencia localizada',
              'transferencia a Matching Information, Sentence Completion, Diagram Labeling y Short Answer',
              'ejercicios originales con señal, evidencia, explicación y trampa común',
            ]}
            sources={[
              {
                label: 'IELTS Academic test format and sections',
                href: IELTS_ACADEMIC_URL,
                note: 'fuente oficial usada para mantener scanning como estrategia de lectura, no como categoría oficial independiente.',
              },
              {
                label: 'Skimming and scanning',
                note: 'material interno usado para convertir el flujo de búsqueda de señales en práctica indexable.',
              },
              {
                label: 'Banco WeLearn de transferencia',
                note: 'pasajes originales creados para entrenar cuándo empezar con skimming y cuándo empezar con scanning.',
              },
            ]}
          />

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              Nota de formato: scanning es una estrategia de lectura de WeLearn, no un tipo de pregunta oficial del IELTS. Para tipos de pregunta oficiales, usa la ruta de IELTS Reading por tipo.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
