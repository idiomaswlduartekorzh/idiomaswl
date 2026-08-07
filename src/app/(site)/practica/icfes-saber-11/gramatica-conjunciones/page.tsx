import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  GraduationCap,
  ListChecks,
  Target,
} from 'lucide-react';
import { CourseSchema, QuizSchema } from '@/components/practica/EducationSchema';
import {
  ICFES_GRAMMAR_CONJUNCTION_QUESTIONS,
  ICFES_GRAMMAR_CONJUNCTION_SUMMARY,
} from '@/data/icfes-grammar-conjunctions';
import IcfesGrammarConjunctionsClient from './IcfesGrammarConjunctionsClient';

const URL = 'https://www.idiomaswl.com/practica/icfes-saber-11/gramatica-conjunciones';
const ICFES_COLOR = '#dc2626';
const SMART_COLOR = '#0f3d8c';
const TEACHER_COLOR = '#047857';
const QUESTION_TOTAL = ICFES_GRAMMAR_CONJUNCTION_SUMMARY.total;

export const metadata: Metadata = {
  title: 'Práctica ICFES Saber 11 Inglés: Gramática y Conectores',
  description:
    `Práctica ICFES Saber 11 de inglés gratis: ${QUESTION_TOTAL} ejercicios adaptativos de gramática, conectores, conjunciones y cloze con explicación inmediata.`,
  keywords: [
    'practica ICFES',
    'práctica ICFES',
    'practica ICFES Saber 11',
    'ejercicios ICFES',
    'ejercicios ICFES ingles',
    'ICFES ingles gratis',
    'ejercicios ICFES ingles gramatica',
    'practica ICFES ingles',
    'conjunciones ICFES ingles',
    'conectores ICFES ingles',
    'cloze ICFES ingles',
    'preguntas tipo ICFES ingles gramatica',
    'practicar Saber 11 ingles',
    'gramatica ingles ICFES Saber 11',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Práctica ICFES Saber 11 Inglés: Gramática y Conectores',
    description:
      `Practica ICFES de inglés gratis con ${QUESTION_TOTAL} preguntas adaptativas, explicación inmediata, cloze y guía para clase.`,
    url: URL,
    type: 'website',
    locale: 'es_CO',
    siteName: 'Idiomas WeLearn',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Práctica ICFES Saber 11 Inglés gratis',
    description: `${QUESTION_TOTAL} ejercicios adaptativos de gramática, conectores y cloze para preparar el componente de inglés del ICFES.`,
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
    question: '¿Dónde practicar ICFES Saber 11 de inglés gratis?',
    answer:
      'Puedes practicar ICFES Saber 11 de inglés en esta página con ejercicios gratis de gramática, conectores, conjunciones y cloze. La práctica entrega explicación inmediata y repaso de errores.',
  },
  {
    question: '¿Qué incluye esta práctica ICFES de inglés?',
    answer:
      `Incluye ${QUESTION_TOTAL} preguntas adaptativas tipo práctica ICFES sobre uso del inglés en contexto: concordancia sujeto-verbo, tiempos verbales, artículos, preposiciones, pronombres, cuantificadores, modales, conectores y cloze.`,
  },
  {
    question: '¿Qué gramática sale con frecuencia en ICFES inglés?',
    answer:
      'Aparecen patrones de uso del inglés en contexto: tiempos verbales, concordancia sujeto-verbo, artículos, preposiciones, pronombres, cuantificadores, comparativos, modales, conectores y selección de palabras en textos con espacios.',
  },
  {
    question: '¿Cómo son las preguntas de conjunciones en Saber 11?',
    answer:
      'Normalmente debes elegir el conector que mantiene la relación lógica entre dos ideas: causa con because, contraste con although o however, resultado con so o therefore, condición con if o unless, y adición con and.',
  },
  {
    question: '¿Esta práctica sirve para estudiar con profesor?',
    answer:
      'Sí. Cada pregunta incluye una explicación para el estudiante y una intervención docente con pregunta guía y mini drill para usar en clase individual o grupal.',
  },
  {
    question: '¿Los ejercicios son preguntas oficiales del ICFES?',
    answer:
      'No. Son preguntas propias de práctica académica para preparar el componente de inglés. Están inspiradas en formatos recurrentes de Saber 11, especialmente selección de palabra en contexto y cloze.',
  },
  {
    question: '¿Puedo guardar esta página para practicar ICFES después?',
    answer:
      'Sí. Puedes volver a esta práctica desde la URL principal de gramática y conectores ICFES, o entrar desde el hub de práctica ICFES Saber 11 de Idiomas WeLearn.',
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
    { '@type': 'ListItem', position: 3, name: 'Gramática y conjunciones', item: URL },
  ],
};

const learningResourceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Práctica ICFES Saber 11 Inglés: Gramática y Conectores',
  url: URL,
  description:
    `Banco gratuito de práctica ICFES Saber 11 de inglés para resolver ${QUESTION_TOTAL} ejercicios adaptativos de gramática, conectores, conjunciones y cloze.`,
  learningResourceType: ['Practice problem', 'Quiz'],
  educationalLevel: 'Saber 11',
  inLanguage: 'es-CO',
  educationalUse: ['practice', 'self assessment', 'test preparation'],
  interactivityType: 'active',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: ['student', 'teacher'],
  },
  about: [
    { '@type': 'Thing', name: 'Práctica ICFES' },
    { '@type': 'Thing', name: 'Saber 11 Inglés' },
    { '@type': 'Thing', name: 'Gramática en inglés' },
    { '@type': 'Thing', name: 'Conectores y conjunciones' },
  ],
  keywords:
    'práctica ICFES, practica ICFES, ejercicios ICFES inglés, Saber 11 inglés, gramática ICFES, conectores ICFES, cloze ICFES',
  teaches: [
    'Gramática para ICFES inglés',
    'Conjunciones y conectores en inglés',
    'Cloze tipo Saber 11',
    'Uso del inglés en contexto',
  ],
  isAccessibleForFree: true,
  provider: { '@type': 'Organization', name: 'Idiomas WeLearn', sameAs: 'https://www.idiomaswl.com' },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Práctica ICFES Saber 11 Inglés: Gramática y Conectores',
  url: URL,
  description:
    `Página canónica e indexable para practicar ICFES Saber 11 de inglés con ${QUESTION_TOTAL} ejercicios gratis, banco adaptativo y explicaciones por respuesta.`,
  inLanguage: 'es-CO',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Idiomas WeLearn',
    url: 'https://www.idiomaswl.com',
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://www.idiomaswl.com/images/welearn-logo.png',
  },
  about: [
    'práctica ICFES',
    'ICFES Saber 11 inglés',
    'ejercicios ICFES inglés',
    'gramática y conectores',
  ],
  mainEntity: {
    '@type': 'Quiz',
    name: 'Práctica ICFES de inglés: gramática, conectores y cloze',
    url: URL,
    educationalUse: 'test preparation',
    isAccessibleForFree: true,
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Módulos de práctica ICFES inglés',
  itemListElement: [
    'Concordancia sujeto-verbo',
    'Tiempos verbales',
    'Artículos y determinantes',
    'Preposiciones',
    'Pronombres y cuantificadores',
    'Comparativos y modales',
    'Conectores y conjunciones',
    'Cloze tipo Saber 11',
  ].map((name, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
  })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo usar esta práctica ICFES de inglés',
  description:
    'Método breve para practicar el componente de inglés del ICFES Saber 11 con ejercicios adaptativos y repaso de errores.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Empieza con 12 preguntas',
      text: 'Inicia una sesión mixta para detectar si el error principal está en gramática, conectores o cloze.',
    },
    {
      '@type': 'HowToStep',
      name: 'Lee la explicación',
      text: 'Después de responder, revisa la regla breve y la estrategia ICFES antes de continuar.',
    },
    {
      '@type': 'HowToStep',
      name: 'Repasa errores',
      text: 'Al final, usa el reporte para repetir las preguntas falladas y reforzar la habilidad más débil.',
    },
  ],
};

export default function Page() {
  return (
    <>
      <CourseSchema
        name="Práctica ICFES Inglés: Gramática y Conjunciones"
        url={URL}
        description="Entrenamiento gratuito para resolver preguntas de gramática, conectores, conjunciones y cloze del componente de inglés ICFES Saber 11."
        educationalLevel="Saber 11"
        teaches="Gramática, conjunciones, conectores, cloze y uso del inglés en contexto para ICFES"
        inLanguage="es-CO"
      />
      <QuizSchema
        name="Ejercicios ICFES Inglés: Gramática y Conjunciones"
        url={URL}
        description="Banco de preguntas tipo ICFES Saber 11 con adaptación por error, explicación inmediata y modo docente."
      />
      <JsonLd value={faqSchema} />
      <JsonLd value={breadcrumbSchema} />
      <JsonLd value={learningResourceSchema} />
      <JsonLd value={webPageSchema} />
      <JsonLd value={itemListSchema} />
      <JsonLd value={howToSchema} />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1080 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/icfes-saber-11" style={{ color: 'var(--muted)', textDecoration: 'none' }}>ICFES Saber 11</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Práctica ICFES inglés</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.4rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />ICFES Inglés · Saber 11
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.045em', lineHeight: 1.02, margin: '0 0 0.8rem', color: 'var(--ink)' }}>
                Práctica ICFES Saber 11 de inglés: gramática y conectores
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, margin: 0, maxWidth: 730 }}>
                Practica ICFES de inglés gratis con ejercicios adaptativos de gramática, conjunciones, conectores y cloze. Entrena los errores que más bajan precisión: elegir el tiempo verbal correcto, reconocer el sujeto real, completar artículos y preposiciones, y escoger conectores que mantengan la lógica del texto.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.65rem', alignContent: 'center' }}>
              {[
                { label: 'preguntas', value: ICFES_GRAMMAR_CONJUNCTION_SUMMARY.total, color: ICFES_COLOR },
                { label: 'gramática base', value: ICFES_GRAMMAR_CONJUNCTION_SUMMARY.grammarCore, color: SMART_COLOR },
                { label: 'conectores + cloze', value: ICFES_GRAMMAR_CONJUNCTION_SUMMARY.connectors + ICFES_GRAMMAR_CONJUNCTION_SUMMARY.cloze, color: TEACHER_COLOR },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)' }}>
                  <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                  <strong style={{ color: item.color, fontSize: '1.35rem', fontFamily: 'var(--mono)' }}>{item.value}</strong>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ marginBottom: '1rem', padding: '1rem', borderRadius: 16, borderLeft: `4px solid ${SMART_COLOR}` }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>
              Respuesta rápida
            </p>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              ¿Qué es esta práctica ICFES de inglés?
            </h2>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65, fontSize: '0.95rem' }}>
              Es una práctica ICFES Saber 11 de inglés, gratis y online, con {ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.length} preguntas adaptativas para mejorar gramática, conectores, conjunciones y cloze. Puedes usarla solo para estudiar o con profesor gracias a la explicación inmediata, el repaso de errores y el modo docente.
            </p>
          </section>

          <IcfesGrammarConjunctionsClient />

          <section style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 245px), 1fr))', gap: '0.8rem' }}>
            {[
              {
                icon: <BookOpenCheck size={19} />,
                title: 'Práctica ICFES online',
                text: 'Resuelve preguntas tipo práctica Saber 11 de inglés desde el navegador, sin registro obligatorio y con feedback inmediato.',
              },
              {
                icon: <Brain size={19} />,
                title: 'Conectores con lógica',
                text: 'El estudiante practica causa, contraste, resultado, condición y adición leyendo la oración anterior y posterior.',
              },
              {
                icon: <GraduationCap size={19} />,
                title: 'Acompañamiento docente',
                text: 'Cada error entrega una pregunta guía y un mini drill para convertir la corrección en una intervención de clase.',
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
              Patrones frecuentes
            </p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.35rem', letterSpacing: '-0.03em' }}>
              Qué se entrena en esta práctica ICFES de inglés
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.75rem' }}>
              {[
                'Concordancia sujeto-verbo: he studies, they study, each has, information is.',
                'Tiempos verbales en contexto: past simple, present perfect, passive voice y conditional.',
                'Artículos y cuantificadores: a, an, the, no article, any, enough, a few, more.',
                'Preposiciones frecuentes: good at, interested in, depend on, at 8:00, arrive at.',
                'Conjunciones y conectores: because, although, however, so, therefore, unless.',
                'Cloze textual: elegir una palabra que haga funcionar la oración y el párrafo completo.',
              ].map((item, idx) => (
                <div key={item} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.7rem', alignItems: 'start', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ICFES_COLOR}12`, border: `1px solid ${ICFES_COLOR}30`, color: ICFES_COLOR, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {idx + 1}
                  </span>
                  <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.9rem' }}>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ marginTop: '1rem', padding: '1.25rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
              Para búsquedas de práctica ICFES
            </p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.35rem', letterSpacing: '-0.03em' }}>
              Practicar ICFES no es solo hacer simulacros
            </h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.93rem' }}>
              Muchos estudiantes buscan simulacros ICFES, pero en inglés también necesitan entrenamiento específico de uso del idioma. Esta página se enfoca en las microdecisiones que aparecen en preguntas de selección de palabra: sujeto, verbo, tiempo, cantidad, preposición y relación lógica entre ideas.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.75rem' }}>
              {[
                { label: 'Para estudiantes', text: 'Practica rápido antes de clase, repasa errores y fortalece el componente de inglés.' },
                { label: 'Para profesores', text: 'Usa el modo docente para preguntar, corregir y asignar mini drills según el error.' },
                { label: 'Para encontrar práctica', text: 'La página responde a búsquedas como práctica ICFES inglés, ejercicios Saber 11 y conectores ICFES.' },
              ].map((item) => (
                <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.85rem', background: 'var(--bg-2)' }}>
                  <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '0.96rem' }}>{item.label}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ marginTop: '1rem', padding: '1.25rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
              Diseño para clase
            </p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.35rem', letterSpacing: '-0.03em' }}>
              Cómo aprovecharlo con profesor
            </h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Empieza con sesión mixta de 12 preguntas para detectar si el problema está en forma verbal, conector o lectura del contexto.',
                'Cuando el estudiante falle, usa la pregunta guía para que explique el razonamiento antes de ver la regla.',
                'Cierra con repaso de errores: el reporte muestra la habilidad más débil y propone una intervención de 8 minutos.',
              ].map((item, idx) => (
                <div key={item} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.7rem', alignItems: 'start' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(4,120,87,0.1)', border: '1px solid rgba(4,120,87,0.22)', color: TEACHER_COLOR, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
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
                title: 'Sinónimos e inferencia',
                text: 'Complementa gramática con vocabulario en contexto, paráfrasis e inferencia.',
                href: '/practica/icfes-saber-11/sinonimos-inferencia',
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

          <div style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.55, display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <ListChecks size={16} />
            Banco actual: {ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.length} preguntas propias de práctica académica, inspiradas en formatos recurrentes del componente de inglés Saber 11.
          </div>
        </div>
      </section>
    </>
  );
}
