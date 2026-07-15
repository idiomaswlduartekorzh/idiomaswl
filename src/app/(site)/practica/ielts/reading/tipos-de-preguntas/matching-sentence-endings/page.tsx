import type { Metadata } from 'next';
import Link from 'next/link';
import OfficialStrategyCard from '@/components/exam-practice/OfficialStrategyCard';
import QuestionTypeReviewSourceBlock from '@/components/exam-practice/QuestionTypeReviewSourceBlock';
import { CheckCheck, Link2, SearchCheck } from 'lucide-react';
import MatchingSentenceEndingsPassageBank from '@/components/exam-practice/MatchingSentenceEndingsPassageBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES,
  IELTS_READING_TYPES,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'matching-sentence-endings')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#b45309';
const IELTS_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';

export const metadata: Metadata = {
  title: 'IELTS Matching Sentence Endings: ejercicios',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'IELTS Matching Sentence Endings: ejercicios',
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
          { name: 'Matching Sentence Endings', url: URL },
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Matching Sentence Endings</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Tipo de pregunta oficial
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                IELTS Matching Sentence Endings
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                En este tipo oficial de IELTS Reading recibes inicios de oración y una lista de finales posibles. Tu respuesta debe completar una oración lógica, gramatical y fiel al pasaje.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Meta', value: 'completar', sub: 'inicio + final' },
                { label: 'Clave', value: 'lógica', sub: 'causa, contraste, resultado' },
                { label: 'Riesgo', value: 'gramática', sub: 'suena bien ≠ evidencia' },
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

          <OfficialStrategyCard
            accent={ACCENT}
            official="IELTS Academic Reading incluye Matching Sentence Endings para elegir finales dados que completan inicios de oración según el pasaje."
            strategy="WeLearn lo diferencia de Sentence Completion: primero filtras por gramática y lógica, luego confirmas con evidencia textual para no elegir un final que solo suena natural."
          />

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <Link2 size={18} />,
                title: 'Une la estructura',
                text: 'Revisa si el final encaja con el inicio: because, by, if, when, although y only when cambian la lógica.',
              },
              {
                icon: <SearchCheck size={18} />,
                title: 'Busca evidencia',
                text: 'Después del encaje gramatical, localiza la idea en el texto y confirma que no sea una exageración.',
              },
              {
                icon: <CheckCheck size={18} />,
                title: 'Elimina finales posibles',
                text: 'Un final puede sonar natural y aun así contradecir el texto o responder otra oración.',
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo resolver Matching Sentence Endings</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Lee solo los inicios y predice qué tipo de final necesitan: causa, resultado, condición, contraste o método.',
                'Descarta finales que no encajan gramaticalmente antes de volver al texto.',
                'Busca en el pasaje la zona donde aparece la misma idea en paráfrasis.',
                'Confirma que el final no cambie alcance con palabras absolutas como all, always, only o immediately.',
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

          <MatchingSentenceEndingsPassageBank
            passages={IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES}
            accent={ACCENT}
            eyebrow="Banco Matching Sentence Endings"
            title="Tres pasajes para completar inicios de oración"
            intro="Practica con textos originales de WeLearn. Primero filtra por gramática; después confirma la relación lógica con evidencia del pasaje."
          />

          <section style={{ marginTop: '1.4rem', display: 'grid', gap: '1rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Sigue entrenando</p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[
                  { href: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion', label: 'Comparar con Sentence Completion' },
                  { href: '/practica/ielts/reading/tipos-de-preguntas/summary-completion', label: 'Comparar con Summary Completion' },
                  { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Entrenar paráfrasis' },
                  { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Límite de palabras' },
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
