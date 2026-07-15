import type { Metadata } from 'next';
import Link from 'next/link';
import OfficialStrategyCard from '@/components/exam-practice/OfficialStrategyCard';
import QuestionTypeReviewSourceBlock from '@/components/exam-practice/QuestionTypeReviewSourceBlock';
import { AlertTriangle, MessageSquareQuote, SearchCheck } from 'lucide-react';
import ObjectivePracticeSetBank from '@/components/exam-practice/ObjectivePracticeSetBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_YNNG_PRACTICE_SETS,
  IELTS_READING_TYPES,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'yes-no-not-given')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#7c3aed';
const IELTS_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';

export const metadata: Metadata = {
  title: 'IELTS Yes/No/Not Given: writer views y ejercicios',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'IELTS Yes/No/Not Given: writer views y ejercicios',
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
          { name: 'Yes/No/Not Given', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Yes/No/Not Given</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Tipo de pregunta oficial
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                IELTS Yes/No/Not Given
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                En el formato oficial de IELTS Reading, este tipo se llama identifying writer&apos;s views/claims. No pregunta si una frase es un hecho verdadero: pregunta si coincide con la postura del autor, la contradice o no se puede comprobar.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'YES', text: 'La afirmación coincide con la opinión o claim del autor.', color: '#059669' },
                { label: 'NO', text: 'La afirmación contradice la postura del autor.', color: '#dc2626' },
                { label: 'NOT GIVEN', text: 'El texto no revela esa postura exacta.', color: '#d97706' },
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
            official="IELTS Academic Reading usa Yes/No/Not Given para identificar si una afirmación coincide con las views o claims del escritor, las contradice o no se puede comprobar."
            strategy="WeLearn no lo trata como hechos tipo True/False: primero buscamos verbos de opinión, juicio, recomendación o evaluación y luego comparamos la postura exacta."
          />

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <MessageSquareQuote size={18} />,
                title: 'Encuentra la postura',
                text: 'Busca señales como in my view, the strongest argument, should, may do more, the real test o this does not mean.',
              },
              {
                icon: <SearchCheck size={18} />,
                title: 'Compara el claim',
                text: 'La opción correcta suele parafrasear una valoración del autor, no copiar palabras del texto.',
              },
              {
                icon: <AlertTriangle size={18} />,
                title: 'Separa No de Not Given',
                text: 'La opción NO exige contradicción de postura. Not Given aparece cuando el tema existe, pero la postura exacta no.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo resolver Yes/No/Not Given</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Marca en la afirmación el verbo mental: believes, argues, thinks, prefers, recommends, says.',
                'Encuentra en el texto la frase donde el autor evalúa, limita, recomienda o contrasta una idea.',
                'Pregunta si la afirmación mantiene la misma postura, la invierte o añade una postura no expresada.',
                'Si solo puedes justificar la respuesta con sentido común o conocimiento externo, marca Not Given.',
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
            sets={IELTS_YNNG_PRACTICE_SETS}
            accent={ACCENT}
            answers={['YES', 'NO', 'NOT GIVEN']}
            eyebrow="Banco Yes/No/Not Given"
            title="Tres pasajes para evaluar writer views and claims"
            intro="Practica con textos originales de WeLearn. El foco es decidir si la afirmación coincide con la postura del autor, la contradice o añade una opinión no expresada."
            resultTip="Si fallaste varias, revisa si confundiste una postura contraria con información ausente. En YNNG, la opción NO necesita choque claro con la opinión del autor."
          />

          <section style={{ marginTop: '1.4rem', display: 'grid', gap: '1rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Sigue entrenando</p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[
                  { href: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given', label: 'Comparar con TFNG' },
                  { href: '/practica/ielts/reading/habilidades/inferencia', label: 'Entrenar inferencia' },
                  { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Entrenar paráfrasis' },
                  { href: '/practica/ielts/reading/habilidades/gestion-del-tiempo', label: 'Gestión del tiempo' },
                ].map((item) => (
                  <Link key={item.href} className="btn btn-ghost btn-sm" href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
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
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
