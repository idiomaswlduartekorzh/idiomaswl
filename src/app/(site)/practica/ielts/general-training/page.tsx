import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { CourseSchema } from '@/components/practica/EducationSchema';

const CANONICAL_URL = 'https://www.idiomaswl.com/practica/ielts/general-training';
const IELTS_GENERAL_TRAINING_URL = 'https://ielts.org/take-a-test/test-types/ielts-general-training-test';
const IELTS_GENERAL_TRAINING_SAMPLE_URL =
  'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test';

const FAQS = [
  {
    question: '¿IELTS General Training es igual a IELTS Academic?',
    answer:
      'No. Listening y Speaking tienen el mismo formato general, pero Reading y Writing cambian. General Training usa textos más sociales, laborales y cotidianos, y Writing Task 1 pide una carta en lugar de describir datos visuales.',
  },
  {
    question: '¿Para qué sirve IELTS General Training?',
    answer:
      'Suele usarse para migración, trabajo o estudios por debajo de nivel universitario en países angloparlantes. Para admisión universitaria normalmente se pide IELTS Academic, pero siempre conviene verificar el requisito de la institución o autoridad migratoria.',
  },
  {
    question: '¿Esta página reemplaza materiales oficiales de IELTS?',
    answer:
      'No. Esta página organiza el formato y ofrece práctica original WeLearn con respuestas explicadas. Las fechas, requisitos y políticas oficiales deben confirmarse en IELTS.org o con la entidad que solicita el examen.',
  },
];

const pathways = [
  {
    title: 'Reading General Training',
    officialFormat:
      '60 minutos. Los textos son más cotidianos, laborales y sociales que en Academic, aunque varios tipos de pregunta se parecen.',
    welearnStrategy:
      'Entrenar skimming, scanning, inferencia, paráfrasis y límite de palabras con textos funcionales antes de pasar a simulacros.',
    links: [
      { label: 'Practicar Reading General Training', href: '/practica/ielts/general-training/reading' },
      { label: 'Habilidades de Reading IELTS', href: '/practica/ielts/reading/habilidades' },
      { label: 'Tipos de pregunta IELTS Reading', href: '/practica/ielts/reading/tipos-de-preguntas' },
    ],
  },
  {
    title: 'Writing Task 1: carta',
    officialFormat:
      'Respuesta de al menos 150 palabras a una situación. La carta puede pedir información, explicar un problema, solicitar algo o responder a una persona.',
    welearnStrategy:
      'Practicar propósito, tono, saludo/cierre, tres puntos obligatorios y claridad funcional antes de escribir bajo tiempo.',
    links: [
      { label: 'Practicar carta General Training Task 1', href: '/practica/ielts/general-training/writing/task1' },
      { label: 'Ver Writing Academic como contraste', href: '/practica/ielts/academic/writing/task1' },
    ],
  },
  {
    title: 'Writing Task 2: ensayo',
    officialFormat:
      'Ensayo de al menos 250 palabras sobre un punto de vista, argumento o problema. Comparte muchas exigencias de Task 2 Academic.',
    welearnStrategy:
      'Usar el banco de Task 2 Academic para tesis, organización, párrafos y lenguaje de argumentación mientras se crea el banco específico GT.',
    links: [
      { label: 'Practicar ensayo General Training Task 2', href: '/practica/ielts/general-training/writing/task2' },
      { label: 'Practicar IELTS Academic Task 2', href: '/practica/ielts/academic/writing/task2' },
    ],
  },
];

const practiceItems = [
  {
    prompt: 'Una amiga te prestó un libro para preparar IELTS. Lo dañaste accidentalmente. ¿Qué tipo de respuesta pide Task 1 General Training?',
    options: ['Descripción de gráfico', 'Carta de disculpa y solución', 'Ensayo de opinión'],
    answer: 'Carta de disculpa y solución',
    explanation:
      'General Training Task 1 pide responder a una situación por carta. Aquí el propósito comunicativo es disculparse, explicar qué pasó y proponer reparación.',
  },
  {
    prompt: 'Un aviso de transporte dice: “The evening shuttle will not run during public holidays.” La pregunta pide completar: The shuttle is unavailable on ____.',
    options: ['weekends', 'public holidays', 'evenings'],
    answer: 'public holidays',
    explanation:
      'Es una tarea de scanning y límite de palabras: la respuesta debe copiar la evidencia exacta del aviso, no inferir “weekends” ni repetir “evenings”.',
  },
  {
    prompt: 'Un ensayo pregunta: “Some people think cities should limit private cars. To what extent do you agree?” ¿Qué debe aparecer en la introducción?',
    options: ['Una lista de ventajas sin postura', 'Una tesis clara con grado de acuerdo', 'Una carta formal al alcalde'],
    answer: 'Una tesis clara con grado de acuerdo',
    explanation:
      'Task 2 exige posición y desarrollo argumentativo. En preguntas “to what extent”, la tesis debe mostrar cuánto estás de acuerdo y orientar los párrafos.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS General Training: formato, diferencias y práctica',
  description:
    'Guía del IELTS General Training en español: diferencias con Academic, Reading, la carta del Task 1 y el ensayo del Task 2, con ejercicios.',
  alternates: { canonical: CANONICAL_URL },
  robots: { index: true, follow: true },
};

export default function IELTSGeneralTrainingPage() {
  return (
    <>
      <CourseSchema
        name="IELTS General Training — guía y práctica"
        description="Guía en español para entender IELTS General Training, diferenciarlo de Academic y practicar Reading y Writing con ejercicios originales y respuestas explicadas."
        url={CANONICAL_URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS General Training, Reading, Writing Task 1 carta, Writing Task 2 ensayo"
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name="IELTS General Training: formato, diferencias y práctica"
        url={CANONICAL_URL}
        description="Ruta introductoria con formato oficial, estrategia WeLearn, ejemplos y ejercicios explicados para IELTS General Training."
        teaches={[
          'IELTS General Training',
          'IELTS Reading General Training',
          'IELTS Writing Task 1 letter',
          'IELTS Writing Task 2 essay',
        ]}
        isPartOf={{
          name: 'Práctica IELTS Idiomas WeLearn',
          url: 'https://www.idiomaswl.com/practica/ielts',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'IELTS General Training', url: CANONICAL_URL },
        ]}
      />

      <main className="wl-section">
        <div className="wrap" style={{ maxWidth: 980 }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
              fontSize: '0.82rem',
            }}
          >
            <Link href="/practica">Práctica</Link>
            <span>/</span>
            <Link href="/practica/ielts">IELTS</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>General Training</span>
          </nav>

          <section style={{ marginBottom: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>
              <span className="ink-line" />
              IELTS General Training
            </p>
            <h1 style={{ margin: 0, maxWidth: 780 }}>
              IELTS General Training: formato, diferencias y práctica guiada
            </h1>
            <p style={{ maxWidth: 720, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
              Esta ruta organiza IELTS General Training para estudiantes que necesitan migración, trabajo o estudios
              no universitarios. Primero separa el formato oficial de la estrategia WeLearn; después te da ejercicios
              cortos con respuestas explicadas para empezar a practicar sin depender solo de simulacros completos.
            </p>
          </section>

          <section
            aria-labelledby="official-vs-welearn"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                border: '1px solid var(--line-soft)',
                borderRadius: 8,
                padding: '1rem',
                background: 'var(--wl-panel-raised, #fff)',
              }}
            >
              <h2 id="official-vs-welearn" style={{ marginTop: 0, fontSize: '1.05rem' }}>
                Formato oficial vs estrategia WeLearn
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS indica que General Training conserva Listening y Speaking con el mismo enfoque general de
                Academic, pero Reading y Writing son diferentes. Writing tiene dos tareas: una carta de 150 palabras y
                un ensayo de 250 palabras.
              </p>
            </div>
            <div
              style={{
                border: '1px solid var(--line-soft)',
                borderRadius: 8,
                padding: '1rem',
                background: 'var(--wl-panel-raised, #f8fafc)',
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Cómo lo entrenamos aquí</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                WeLearn divide la preparación en microhabilidades: leer para ubicar evidencia, decidir si una carta es
                formal o informal, planear los puntos obligatorios y escribir ensayos con tesis clara antes de medir
                tiempo completo.
              </p>
            </div>
          </section>

          <section aria-labelledby="difference" style={{ marginBottom: '2rem' }}>
            <h2 id="difference">Diferencias clave entre IELTS Academic y General Training</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
                <thead>
                  <tr>
                    {['Área', 'Academic', 'General Training', 'Qué practicar primero'].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        style={{
                          textAlign: 'left',
                          borderBottom: '1px solid var(--line-soft)',
                          padding: '0.75rem',
                          fontSize: '0.82rem',
                          color: 'var(--muted)',
                        }}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Reading', 'Textos académicos largos', 'Textos sociales, laborales y funcionales', 'Scanning, skimming y tipos de pregunta'],
                    ['Writing Task 1', 'Descripción de datos visuales', 'Carta ante una situación', 'Tono, propósito y puntos obligatorios'],
                    ['Writing Task 2', 'Ensayo argumentativo', 'Ensayo argumentativo', 'Tesis, estructura y ejemplos'],
                    ['Listening/Speaking', 'Mismo enfoque general', 'Mismo enfoque general', 'Después de cerrar Reading/Writing'],
                  ].map(([area, academic, general, practice]) => (
                    <tr key={area}>
                      <th scope="row" style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>
                        {area}
                      </th>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{academic}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{general}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{practice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="pathways" style={{ marginBottom: '2rem' }}>
            <h2 id="pathways">Flujo recomendado de estudio</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {pathways.map((pathway) => (
                <article
                  key={pathway.title}
                  style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #fff)' }}
                >
                  <h3 style={{ marginTop: 0 }}>{pathway.title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> {pathway.officialFormat}
                  </p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> {pathway.welearnStrategy}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {pathway.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="practice" style={{ marginBottom: '2rem' }}>
            <h2 id="practice">Mini práctica inicial con respuestas explicadas</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Estos ejercicios no son simulacros oficiales. Son práctica original para reconocer tarea, evidencia y
              decisión de respuesta antes de entrar a bancos completos.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {practiceItems.map((item, index) => (
                <article
                  key={item.prompt}
                  style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #fff)' }}
                >
                  <p style={{ marginTop: 0, fontWeight: 800 }}>Ejercicio {index + 1}</p>
                  <p style={{ lineHeight: 1.65 }}>{item.prompt}</p>
                  <ul style={{ marginBottom: '0.75rem' }}>
                    {item.options.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Respuesta:</strong> {item.answer}
                  </p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                    <strong style={{ color: 'var(--ink)' }}>Explicación:</strong> {item.explanation}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="sources" style={{ marginBottom: '2rem' }}>
            <h2 id="sources">Fuentes y rutas internas</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Para formato oficial, revisa IELTS General Training en IELTS.org y sus muestras oficiales. Para entrenar
              por microhabilidad, continúa con los recursos WeLearn ya publicados.
            </p>
            <ul>
              <li>
                <a href={IELTS_GENERAL_TRAINING_URL} rel="noreferrer" target="_blank">
                  IELTS General Training test format and sections
                </a>
              </li>
              <li>
                <a href={IELTS_GENERAL_TRAINING_SAMPLE_URL} rel="noreferrer" target="_blank">
                  IELTS General Training sample test questions
                </a>
              </li>
              <li>
                <Link href="/practica/ielts/general-training/reading">
                  IELTS General Training Reading con textos funcionales
                </Link>
              </li>
              <li>
                <Link href="/practica/ielts/academic">IELTS Academic en WeLearn</Link>
              </li>
              <li>
                <Link href="/practica/ielts/academic/writing">IELTS Writing Academic en WeLearn</Link>
              </li>
              <li>
                <Link href="/practica/ielts/general-training/writing/task1">
                  IELTS General Training Writing Task 1 carta
                </Link>
              </li>
              <li>
                <Link href="/practica/ielts/general-training/writing/task2">
                  IELTS General Training Writing Task 2 ensayo
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq">Preguntas frecuentes</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {FAQS.map((faq) => (
                <article key={faq.question} style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1rem' }}>
                  <h3 style={{ marginTop: 0 }}>{faq.question}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
