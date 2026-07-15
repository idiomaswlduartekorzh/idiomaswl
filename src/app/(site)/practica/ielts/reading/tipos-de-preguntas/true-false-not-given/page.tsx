import type { Metadata } from 'next';
import Link from 'next/link';
import OfficialStrategyCard from '@/components/exam-practice/OfficialStrategyCard';
import QuestionTypeReviewSourceBlock from '@/components/exam-practice/QuestionTypeReviewSourceBlock';
import { AlertTriangle, CheckCircle2, SearchCheck } from 'lucide-react';
import ObjectivePracticeSetBank from '@/components/exam-practice/ObjectivePracticeSetBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_READING_TYPES,
  IELTS_TFNG_PRACTICE_SETS,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'true-false-not-given')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#0369a1';
const IELTS_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';

export const metadata: Metadata = {
  title: 'IELTS True/False/Not Given: explicación y ejercicios',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'IELTS True/False/Not Given: explicación y ejercicios',
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
          { name: 'True/False/Not Given', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>True/False/Not Given</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Tipo de pregunta
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                IELTS True/False/Not Given
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                Este tipo de pregunta mide si puedes distinguir tres estados de evidencia: el texto confirma una idea, la contradice o simplemente no permite verificarla. La trampa no es el inglés difícil; la trampa es asumir.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'TRUE', text: 'El texto confirma la afirmación aunque use paráfrasis.', color: '#059669' },
                { label: 'FALSE', text: 'El texto contradice la afirmación con evidencia directa.', color: '#dc2626' },
                { label: 'NOT GIVEN', text: 'El texto no da suficiente información para decidir.', color: '#d97706' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '0.65rem', alignItems: 'center' }}>
                  <span style={{ border: `1px solid ${item.color}55`, background: `${item.color}12`, color: item.color, borderRadius: 10, padding: '0.45rem 0.55rem', fontFamily: 'var(--mono)', fontWeight: 900, textAlign: 'center', fontSize: '0.78rem' }}>
                    {item.label}
                  </span>
                  <span style={{ color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.88rem' }}>{item.text}</span>
                </div>
              ))}
            </aside>
          </div>

          <OfficialStrategyCard
            accent={ACCENT}
            official="IELTS Academic Reading usa True/False/Not Given para identificar si una afirmación coincide con información del texto, la contradice o no puede comprobarse."
            strategy="WeLearn lo convierte en una prueba de evidencia exacta: sujeto, verbo, cantidad, comparación y palabras absolutas antes de decidir."
          />

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <SearchCheck size={18} />,
                title: 'Busca la zona del texto',
                text: 'No respondas con memoria general. Localiza la oración o párrafo que habla del mismo tema.',
              },
              {
                icon: <CheckCircle2 size={18} />,
                title: 'Compara alcance',
                text: 'Palabras como all, every, always, only, immediately y never suelen cambiar el alcance de la idea.',
              },
              {
                icon: <AlertTriangle size={18} />,
                title: 'No inventes el puente',
                text: 'Si el texto menciona un tema relacionado pero no responde la afirmación exacta, marca Not Given.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo resolver True/False/Not Given</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Subraya el sujeto, verbo, cantidad, comparación y palabra absoluta de la afirmación.',
                'Encuentra la zona del texto por tema, no por palabra exacta. IELTS suele usar paráfrasis.',
                'Pregunta: el texto dice lo mismo, dice lo contrario o no decide esa información exacta.',
                'Si necesitas conocimiento externo para justificar tu respuesta, probablemente es Not Given.',
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

          <ObjectivePracticeSetBank
            sets={IELTS_TFNG_PRACTICE_SETS}
            accent={ACCENT}
            eyebrow="Banco True/False/Not Given"
            title="Tres pasajes para entrenar evidencia exacta"
            intro="Practica con sets originales de WeLearn. El objetivo no es adivinar: es decidir si hay equivalencia, contradicción directa o falta de información suficiente."
            resultTip="Revisa si tus errores vienen de palabras absolutas, cambios de tiempo, comparaciones o información relacionada que no responde la afirmación exacta."
          />

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
