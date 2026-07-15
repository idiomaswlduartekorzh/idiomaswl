import type { Metadata } from 'next';
import Link from 'next/link';
import QuestionTypeReviewSourceBlock from '@/components/exam-practice/QuestionTypeReviewSourceBlock';
import { ArrowDownUp, GitBranch, ScanSearch } from 'lucide-react';
import FlowChartCompletionPassageBank from '@/components/exam-practice/FlowChartCompletionPassageBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_FLOW_CHART_COMPLETION_PASSAGES,
  IELTS_READING_TYPES,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'flow-chart-completion')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#c2410c';
const IELTS_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';

export const metadata: Metadata = {
  title: 'IELTS Reading Flow-chart Completion: ejercicios y método',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'IELTS Reading Flow-chart Completion: ejercicios y método',
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
        isPartOf={{ name: 'Tipos de preguntas IELTS Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading/tipos-de-preguntas` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Tipos de preguntas', url: `${PRACTICE_BASE_URL}/practica/ielts/reading/tipos-de-preguntas` },
          { name: 'Flow-chart Completion', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading/tipos-de-preguntas" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Tipos de preguntas</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Flow-chart Completion</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Tipo de pregunta oficial
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                IELTS Reading Flow-chart Completion
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                Flow-chart Completion convierte un proceso del pasaje en pasos conectados. Para resolverlo, no basta con encontrar palabras sueltas: debes seguir la secuencia, reconocer acciones y copiar las palabras exactas que completan cada etapa.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Formato', value: 'flujo', sub: 'pasos conectados' },
                { label: 'Lectura', value: 'orden', sub: 'secuencia lógica' },
                { label: 'Respuesta', value: 'exacta', sub: 'del pasaje' },
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

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', borderLeft: `4px solid ${ACCENT}` }}>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Formato oficial vs estrategia WeLearn</p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68 }}>
              <strong>Formato oficial:</strong> IELTS Academic Reading incluye Flow-chart Completion como tipo de pregunta. Debes completar pasos de un proceso con palabras del texto y respetar el límite. <strong>Estrategia WeLearn:</strong> tratamos el flow chart como una ruta: paso anterior, acción central, resultado y siguiente paso.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <GitBranch size={18} />,
                title: 'Sigue el proceso',
                text: 'Lee todos los pasos antes de buscar. El orden del flujo reduce el área del pasaje que debes revisar.',
              },
              {
                icon: <ArrowDownUp size={18} />,
                title: 'Identifica relaciones',
                text: 'Busca conectores de secuencia, resultado, condición o propósito: after, then, before, because, so.',
              },
              {
                icon: <ScanSearch size={18} />,
                title: 'Copia con límite',
                text: 'Aunque entiendas el proceso, la respuesta debe usar palabras del pasaje y encajar en el paso.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo resolver Flow-chart Completion</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Lee la instrucción y marca el límite de palabras.',
                'Mira el flujo completo para entender el inicio, las transformaciones y el resultado.',
                'Predice si cada espacio necesita material, acción, objeto, condición o producto final.',
                'Busca el párrafo del proceso y copia la frase mínima que completa el paso.',
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

          <FlowChartCompletionPassageBank
            passages={IELTS_FLOW_CHART_COMPLETION_PASSAGES}
            accent={ACCENT}
            eyebrow="Banco Flow-chart Completion"
            title="Tres procesos para completar siguiendo la secuencia"
            intro="Practica con textos originales de WeLearn. Cada set entrena lectura de procesos, conectores de secuencia, prediccion de categoria, copia exacta y revision del limite de palabras."
          />

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Siguiente práctica</p>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {[
                { href: '/practica/ielts/reading/tipos-de-preguntas/table-completion', label: 'Table Completion' },
                { href: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling', label: 'Diagram Labeling' },
                { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Límite de palabras' },
                { href: '/practica/ielts/reading/habilidades/scanning', label: 'Scanning' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="btn btn-ghost btn-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '1.4rem' }}>
            <QuestionTypeReviewSourceBlock
              accent={ACCENT}
              questionTypeName={ROUTE.title}
              sources={[
                {
                  label: 'IELTS Academic sample test questions',
                  href: IELTS_SAMPLE_URL,
                  note: 'lista oficial de preguntas de muestra de IELTS Academic Reading usada para confirmar que esta ruta corresponde a un tipo de pregunta oficial.',
                },
                {
                  label: 'Banco original WeLearn',
                  note: 'pasajes, preguntas, distractores y explicaciones creados para practica pedagogica, sin copiar preguntas oficiales.',
                },
              ]}
              reviewedFocus={[
                'alineacion con tipos de pregunta oficiales de IELTS Reading',
                'separacion entre formato oficial y metodo WeLearn',
                'respuesta explicada con evidencia, alcance o trampa',
              ]}
            />

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
        </div>
      </section>
    </>
  );
}
