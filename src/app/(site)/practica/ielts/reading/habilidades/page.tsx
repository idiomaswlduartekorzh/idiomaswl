import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Clock, SearchCheck } from 'lucide-react';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, FaqJsonLd, JsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const URL = `${PRACTICE_BASE_URL}/practica/ielts/reading/habilidades`;
const ACCENT = '#0369a1';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

const HUB_FAQS = [
  {
    question: '¿Skimming, scanning e inferencia son tipos oficiales de pregunta IELTS?',
    answer:
      'No. Son habilidades de lectura. En WeLearn viven bajo /habilidades porque apoyan tipos oficiales como Matching Headings, Matching Information, Multiple Choice, Completion y True/False/Not Given.',
  },
  {
    question: '¿Por qué estudiar habilidades antes de hacer simulacros IELTS completos?',
    answer:
      'Porque el simulacro mezcla muchos problemas a la vez. Una ruta por habilidades te permite entrenar mapa del texto, ubicación de evidencia, paráfrasis, inferencia, límite de palabras y tiempo de forma aislada antes de combinarlos.',
  },
  {
    question: '¿Qué habilidad conviene estudiar primero para IELTS Reading?',
    answer:
      'Empieza con skimming para crear mapa del pasaje, sigue con scanning para localizar evidencia y después practica inferencia, paráfrasis, límite de palabras y gestión del tiempo según el tipo de pregunta que estés trabajando.',
  },
];

const TRANSFER_MAP = [
  {
    skill: 'Skimming',
    href: '/practica/ielts/reading/habilidades/skimming',
    use: 'Crear mapa del pasaje, detectar idea principal y función de párrafos.',
    officialTypes: [
      { label: 'Matching Headings', href: '/practica/ielts/reading/tipos-de-preguntas/matching-headings' },
      { label: 'Summary Completion', href: '/practica/ielts/reading/tipos-de-preguntas/summary-completion' },
    ],
  },
  {
    skill: 'Scanning',
    href: '/practica/ielts/reading/habilidades/scanning',
    use: 'Ubicar nombres, fechas, cifras, términos técnicos y zonas de evidencia.',
    officialTypes: [
      { label: 'Matching Information', href: '/practica/ielts/reading/tipos-de-preguntas/matching-information' },
      { label: 'Sentence Completion', href: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion' },
      { label: 'Diagram Labeling', href: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling' },
    ],
  },
  {
    skill: 'Inferencia',
    href: '/practica/ielts/reading/habilidades/inferencia',
    use: 'Elegir conclusiones moderadas que el texto permite defender.',
    officialTypes: [
      { label: 'Multiple Choice', href: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice' },
      { label: 'Yes/No/Not Given', href: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given' },
    ],
  },
  {
    skill: 'Paráfrasis',
    href: '/practica/ielts/reading/habilidades/parafrasis',
    use: 'Comprobar equivalencia entre pregunta, opción y evidencia.',
    officialTypes: [
      { label: 'True/False/Not Given', href: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given' },
      { label: 'Matching Sentence Endings', href: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings' },
    ],
  },
  {
    skill: 'Límite de palabras',
    href: '/practica/ielts/reading/habilidades/limite-de-palabras',
    use: 'Copiar la unidad mínima que completa el espacio sin romper la instrucción.',
    officialTypes: [
      { label: 'Note Completion', href: '/practica/ielts/reading/tipos-de-preguntas/note-completion' },
      { label: 'Table Completion', href: '/practica/ielts/reading/tipos-de-preguntas/table-completion' },
      { label: 'Short-answer', href: '/practica/ielts/reading/tipos-de-preguntas/short-answer' },
    ],
  },
  {
    skill: 'Gestión del tiempo',
    href: '/practica/ielts/reading/habilidades/gestion-del-tiempo',
    use: 'Decidir qué resolver, marcar o saltar dentro de los 60 minutos.',
    officialTypes: [
      { label: 'Tipos de pregunta IELTS Reading', href: '/practica/ielts/reading/tipos-de-preguntas' },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Habilidades IELTS Reading | Estrategias y práctica',
  description:
    'Ruta de habilidades para IELTS Reading: aprende skimming, scanning, inferencia, paráfrasis, límite de palabras y gestión del tiempo antes de hacer simulacros completos.',
  keywords: [
    'habilidades IELTS reading',
    'skimming IELTS reading',
    'scanning IELTS reading',
    'IELTS reading strategies',
    'IELTS reading practice',
  ],
  openGraph: {
    title: 'Habilidades IELTS Reading',
    description: 'Aprende habilidades de lectura para IELTS Academic Reading con práctica guiada.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  const published = IELTS_READING_SKILLS.filter((item) => item.status === 'published');

  return (
    <>
      <CourseSchema
        name="Habilidades IELTS Reading"
        description="Ruta de habilidades transversales para IELTS Academic Reading: skimming, scanning, inferencia, paráfrasis, límite de palabras y gestión del tiempo."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS Reading skills, skimming, scanning, inference, paraphrase, word limit"
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name="Habilidades IELTS Reading"
        url={URL}
        description="Índice de habilidades para estudiar IELTS Academic Reading antes de mezclar tipos de pregunta."
        teaches={['IELTS Reading', 'skimming', 'scanning', 'inference', 'paraphrase', 'word limit', 'time management']}
        isPartOf={{ name: 'IELTS Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Habilidades', url: URL },
        ]}
      />
      <FaqJsonLd faqs={HUB_FAQS} />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Ruta de habilidades IELTS Reading',
          itemListElement: published.map((skill, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: skill.title,
            url: `${PRACTICE_BASE_URL}${skill.path}`,
          })),
        }}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Reading</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Habilidades</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Academic Reading
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.15rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                Habilidades IELTS Reading
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
                Los tipos de pregunta te dicen qué responder. Las habilidades te dicen cómo leer. Esta ruta entrena skimming, scanning, inferencia, paráfrasis, límite de palabras y gestión del tiempo para que cada ejercicio tenga método, no suerte.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <BookOpenCheck size={18} />, label: 'Mapa', text: 'Primero entiende de qué trata cada párrafo.' },
                { icon: <SearchCheck size={18} />, label: 'Evidencia', text: 'Después localiza la zona exacta para responder.' },
                { icon: <Clock size={18} />, label: 'Tiempo', text: 'La velocidad nace de saber cuándo leer rápido y cuándo frenar.' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', alignItems: 'start' }}>
                  <span style={{ color: ACCENT }}>{item.icon}</span>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>{item.label}:</strong> {item.text}
                  </p>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> esta ruta organiza habilidades de lectura para IELTS Academic Reading. Primero aprendes cómo leer y encontrar evidencia; después aplicas esas habilidades en los tipos oficiales de pregunta.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading tiene 60 minutos, tres textos largos y 40 preguntas. Los tipos oficiales incluyen opciones múltiples, emparejamientos, completar información, identificar información/opiniones y respuestas cortas.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> separamos habilidades de tipos de pregunta para que el estudiante practique una destreza concreta antes de mezclarla en simulacros completos.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es el índice de habilidades, no el índice de tipos oficiales de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Ruta recomendada</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {published.map((skill) => (
                <Link key={skill.slug} href={skill.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', alignItems: 'start', marginBottom: '0.45rem' }}>
                      <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem', letterSpacing: '-0.01em' }}>{skill.title.replace(' en IELTS Reading', '')}</h3>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 900, color: ACCENT }}>
                        DISPONIBLE
                      </span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{skill.description}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Mapa de transferencia</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Qué habilidad usar según el tipo de pregunta</h2>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {TRANSFER_MAP.map((item) => (
                <article key={item.skill} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 0.55fr) 1fr', gap: '0.75rem', alignItems: 'start' }}>
                    <div>
                      <Link href={item.href} style={{ color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', textDecoration: 'none' }}>
                        {item.skill}
                      </Link>
                      <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{item.use}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {item.officialTypes.map((type) => (
                        <Link key={type.href} href={type.href} className="btn btn-ghost btn-sm">
                          {type.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Cómo usar esta ruta</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Habilidad primero, tipo de pregunta después
            </h2>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {[
                'Empieza con skimming para saber de qué trata cada párrafo sin leer palabra por palabra.',
                'Pasa a scanning para ubicar datos, nombres, fechas y paráfrasis dentro del mapa.',
                'Entrena inferencia cuando ya puedas separar evidencia textual de opinión externa.',
                'Practica límite de palabras para responder completion tasks con frases exactas y gramática compatible.',
                'Cierra con gestión del tiempo para decidir cuándo resolver, marcar o saltar temporalmente.',
                'Vuelve a tipos de pregunta como Matching Headings, Matching Information o Summary Completion para transferir la habilidad.',
              ].map((step, index) => (
                <p key={step} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </p>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '1.4rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {HUB_FAQS.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/reading/habilidades/skimming" className="btn btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Empezar con skimming <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Seguir con scanning <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/inferencia" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Entrenar inferencia <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/parafrasis" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Practicar paráfrasis <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/limite-de-palabras" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Revisar límite de palabras <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/gestion-del-tiempo" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Gestionar tiempo <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/tipos-de-preguntas" className="btn btn-ghost btn-sm">
              Ver tipos de pregunta
            </Link>
            <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
              Volver a IELTS Reading
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
