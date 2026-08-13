import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Brain, CheckCircle2, SearchCheck, Target } from 'lucide-react';
import { CourseSchema, QuizSchema } from '@/components/practica/EducationSchema';
import {
  ICFES_SYNONYMS_INFERENCE_QUESTIONS,
  ICFES_SYNONYMS_INFERENCE_SUMMARY,
} from '@/data/icfes-synonyms-inference';
import IcfesSynonymsInferenceClient from './IcfesSynonymsInferenceClient';

const URL = 'https://www.idiomaswl.com/practica/icfes-saber-11/sinonimos-inferencia';
const ICFES_COLOR = '#dc2626';
const SMART_COLOR = '#0f3d8c';

export const metadata: Metadata = {
  title: 'Ejercicios ICFES Inglés: Sinónimos e Inferencia | Saber 11',
  description:
    'Sinónimos, vocabulario en contexto, paráfrasis e inferencia para el inglés del ICFES Saber 11. Ejercicios gratis con pistas y explicación inmediata.',
  keywords: [
    'ejercicios ICFES ingles',
    'sinonimos ICFES ingles',
    'inferencia ICFES ingles',
    'practicar ICFES Saber 11 ingles',
    'preguntas tipo ICFES ingles',
    'vocabulario en contexto ICFES',
  ],
  openGraph: {
    title: 'Ejercicios ICFES Inglés: Sinónimos e Inferencia',
    description:
      'Banco interactivo de preguntas tipo ICFES Saber 11 para entrenar sinónimos, paráfrasis e inferencia con retroalimentación inmediata.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

function JsonLd({ value }: { value: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }}
    />
  );
}

const faq = [
  {
    question: '¿Esta práctica sirve para el ICFES Saber 11 de inglés?',
    answer:
      'Sí. Está diseñada para entrenar habilidades frecuentes del componente de inglés: reconocer sinónimos, interpretar vocabulario en contexto, elegir paráfrasis correctas e inferir información apoyada por pistas del texto.',
  },
  {
    question: '¿Qué diferencia hay entre sinónimo e inferencia en el ICFES?',
    answer:
      'En una pregunta de sinónimos debes conservar el significado de una palabra o frase dentro de la oración. En una pregunta de inferencia debes elegir una conclusión probable que no siempre está escrita literalmente, pero sí está apoyada por evidencia del texto.',
  },
  {
    question: '¿Cómo mejorar en vocabulario en contexto para el ICFES?',
    answer:
      'Lee la oración completa, identifica si la palabra tiene carga positiva, negativa o neutra, busca pistas de causa, contraste o resultado, y elimina opciones que contradigan el contexto aunque parezcan del mismo tema.',
  },
  {
    question: '¿La práctica es gratis?',
    answer:
      'Sí. Puedes practicar sinónimos, paráfrasis e inferencia de forma gratuita y luego continuar con cuadernillos divulgados por el ICFES dentro de Idiomas WeLearn.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Práctica', item: 'https://www.idiomaswl.com/practica' },
    { '@type': 'ListItem', position: 2, name: 'ICFES Saber 11', item: 'https://www.idiomaswl.com/practica/icfes-saber-11' },
    { '@type': 'ListItem', position: 3, name: 'Sinónimos e inferencia', item: URL },
  ],
};

export default function Page() {
  return (
    <>
      <CourseSchema
        name="Práctica ICFES Inglés: Sinónimos e Inferencia"
        url={URL}
        description="Entrenamiento gratuito para resolver preguntas de sinónimos, vocabulario en contexto, paráfrasis e inferencia del componente de inglés ICFES Saber 11."
        educationalLevel="Saber 11"
        teaches="Sinónimos, inferencia, vocabulario en contexto y paráfrasis en inglés ICFES"
        inLanguage="es-CO"
      />
      <QuizSchema
        name="Ejercicios ICFES Inglés: Sinónimos e Inferencia"
        url={URL}
        description="Banco de preguntas tipo ICFES Saber 11 con pistas, explicación inmediata y repaso de errores."
      />
      <JsonLd value={faqSchema} />
      <JsonLd value={breadcrumbSchema} />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1080 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/icfes-saber-11" style={{ color: 'var(--muted)', textDecoration: 'none' }}>ICFES Saber 11</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Sinónimos e inferencia</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.4rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />ICFES Inglés · Saber 11
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.045em', lineHeight: 1.02, margin: '0 0 0.8rem', color: 'var(--ink)' }}>
                Ejercicios ICFES de inglés: sinónimos e inferencia
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, margin: 0, maxWidth: 720 }}>
                Practica vocabulario en contexto, sustitución de palabras, paráfrasis e inferencias con preguntas tipo ICFES. La meta es entrenar la habilidad que Google no puede estudiar por ti: leer pistas y elegir la opción que conserva el sentido exacto.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.65rem', alignContent: 'center' }}>
              {[
                { label: 'preguntas', value: ICFES_SYNONYMS_INFERENCE_SUMMARY.total, color: ICFES_COLOR },
                { label: 'de vocabulario', value: ICFES_SYNONYMS_INFERENCE_SUMMARY.synonymLike, color: SMART_COLOR },
                { label: 'de inferencia', value: ICFES_SYNONYMS_INFERENCE_SUMMARY.inference, color: '#059669' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)' }}>
                  <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                  <strong style={{ color: item.color, fontSize: '1.35rem', fontFamily: 'var(--mono)' }}>{item.value}</strong>
                </div>
              ))}
            </aside>
          </div>

          <IcfesSynonymsInferenceClient />

          <section style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.8rem' }}>
            {[
              {
                icon: <SearchCheck size={19} />,
                title: 'Sinónimos en contexto',
                text: 'No basta con saber la traducción: debes conservar el sentido que la palabra tiene dentro de la oración.',
              },
              {
                icon: <BookOpenCheck size={19} />,
                title: 'Paráfrasis',
                text: 'Entrena a reconocer la misma información expresada con otras palabras, una habilidad clave en preguntas tipo Saber 11.',
              },
              {
                icon: <Brain size={19} />,
                title: 'Inferencia',
                text: 'Aprende a elegir conclusiones probables basadas en evidencia textual, sin caer en opciones extremas o inventadas.',
              },
            ].map((item) => (
              <article key={item.title} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: ICFES_COLOR, marginBottom: '0.45rem' }}>
                  {item.icon}
                  <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem', letterSpacing: '-0.01em' }}>{item.title}</h2>
                </div>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58, fontSize: '0.88rem' }}>{item.text}</p>
              </article>
            ))}
          </section>

          <section className="wl-card" style={{ marginTop: '1rem', padding: '1.25rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
              Método de resolución
            </p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.35rem', letterSpacing: '-0.03em' }}>
              Cómo responder preguntas de sinónimos e inferencia en ICFES inglés
            </h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Lee la oración completa antes de mirar opciones. La pista suele estar después de conectores como so, but, because o after.',
                'Decide la función de la palabra: persona, acción, cualidad, tiempo, causa o actitud. Eso reduce distractores rápido.',
                'Elimina opciones absolutas si el texto es equilibrado. En inferencia, palabras como always, never y only suelen exagerar.',
                'Comprueba que la opción correcta no agregue información nueva. Una paráfrasis buena conserva el sentido, no inventa detalles.',
              ].map((item, idx) => (
                <div key={item} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.7rem', alignItems: 'start' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ICFES_COLOR}12`, border: `1px solid ${ICFES_COLOR}30`, color: ICFES_COLOR, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {idx + 1}
                  </span>
                  <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.58, fontSize: '0.92rem' }}>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '1.5rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
              Preguntas frecuentes
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {faq.map((item) => (
                <article key={item.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', fontSize: '1rem', color: 'var(--ink)' }}>{item.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.8rem' }}>
            {[
              {
                title: 'Ruta ICFES Inteligente',
                text: 'Diagnóstico, niveles y refuerzo por habilidad para el componente de inglés.',
                href: '/practica/icfes-saber-11',
                icon: <Target size={18} />,
              },
              {
                title: 'Cuadernillos divulgados por el ICFES',
                text: 'Practica con cuadernillos publicados por ICFES y revisión automática.',
                href: '/practica/icfes-saber-11/examenes',
                icon: <CheckCircle2 size={18} />,
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="wl-card" style={{ padding: '1rem', borderRadius: 14, textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: SMART_COLOR, marginBottom: '0.45rem' }}>
                  {item.icon}
                  <strong style={{ color: 'var(--ink)' }}>{item.title}</strong>
                </div>
                <p style={{ margin: '0 0 0.7rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{item.text}</p>
                <span style={{ color: ICFES_COLOR, fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Continuar <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </section>

          <div style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.55 }}>
            Banco actual: {ICFES_SYNONYMS_INFERENCE_QUESTIONS.length} preguntas propias de práctica académica, inspiradas en habilidades recurrentes del componente de inglés Saber 11.
          </div>
        </div>
      </section>
    </>
  );
}
