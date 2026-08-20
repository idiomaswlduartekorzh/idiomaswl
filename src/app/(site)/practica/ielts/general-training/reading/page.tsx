import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const CANONICAL_URL = 'https://www.idiomaswl.com/practica/ielts/general-training/reading';
const IELTS_GENERAL_TRAINING_URL = 'https://ielts.org/take-a-test/test-types/ielts-general-training-test';
const IELTS_GENERAL_TRAINING_SAMPLE_URL =
  'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test';

type ReadingQuestion = {
  id: string;
  type: 'matching-information' | 'short-answer' | 'sentence-completion' | 'true-false-not-given';
  prompt: string;
  answer: string;
  explanation: string;
  trap: string;
};

type ReadingText = {
  id: string;
  title: string;
  context: 'social' | 'workplace' | 'public notice' | 'training';
  firstMove: 'skimming' | 'scanning';
  passage: string[];
  questions: ReadingQuestion[];
};

const FAQS = [
  {
    question: '¿IELTS General Training Reading usa los mismos textos que Academic?',
    answer:
      'No. General Training usa textos más cotidianos, sociales, laborales y funcionales. Algunos tipos de pregunta se parecen a Academic, pero el contexto y la forma de buscar evidencia cambian.',
  },
  {
    question: '¿Estos ejercicios son preguntas oficiales de IELTS?',
    answer:
      'No. Son textos y preguntas originales de WeLearn creados para practicar habilidades y tipos de pregunta compatibles. La página cita IELTS.org para formato y muestras oficiales.',
  },
  {
    question: '¿Qué debo practicar antes de un simulacro completo?',
    answer:
      'Practica skimming para entender propósito, scanning para ubicar datos, paráfrasis para reconocer equivalencias y límite de palabras para copiar respuestas exactas sin excederte.',
  },
];

const IELTS_GT_READING_TEXTS: ReadingText[] = [
  {
    id: 'gt-reading-community-library',
    title: 'Community Library Membership Notice',
    context: 'public notice',
    firstMove: 'skimming',
    passage: [
      'New members can register online or in person at the front desk. Proof of address is required for a full borrowing card, but visitors may request a one-day reading pass without local documents.',
      'Borrowing cards allow members to take up to eight books for three weeks. Magazines must remain in the building, and laptops can be borrowed for two hours after leaving a photo ID with staff.',
      'The library offers free English conversation sessions on Tuesday evenings. Places are limited, so members should reserve a seat before midday on the day of the session.',
    ],
    questions: [
      {
        id: 'gt-reading-community-library-q1',
        type: 'short-answer',
        prompt: 'What document is required for a full borrowing card?',
        answer: 'proof of address',
        explanation:
          'La evidencia dice “Proof of address is required for a full borrowing card”. La respuesta debe copiar el dato exacto.',
        trap: '“Photo ID” aparece en el texto, pero se usa para laptops, no para la tarjeta completa.',
      },
      {
        id: 'gt-reading-community-library-q2',
        type: 'sentence-completion',
        prompt: 'Laptops can be borrowed for ____.',
        answer: 'two hours',
        explanation:
          'La frase “laptops can be borrowed for two hours” completa directamente la oración.',
        trap: '“Three weeks” corresponde a libros, no a laptops.',
      },
      {
        id: 'gt-reading-community-library-q3',
        type: 'true-false-not-given',
        prompt: 'Visitors can get limited library access without local documents.',
        answer: 'TRUE',
        explanation:
          'El texto dice que visitantes pueden pedir un pase de lectura de un día sin documentos locales.',
        trap: 'No confundas “limited access” con una borrowing card completa; son permisos distintos.',
      },
    ],
  },
  {
    id: 'gt-reading-workplace-roster',
    title: 'Workplace Roster Update',
    context: 'workplace',
    firstMove: 'scanning',
    passage: [
      'From 4 March, the morning cleaning team will start at 6:30 a.m. instead of 7:00 a.m. Staff who use public transport may request a temporary taxi voucher for the first two weeks.',
      'Team leaders must submit availability changes by Friday afternoon. Requests sent after Friday will be considered for the following roster, not the one starting Monday.',
      'The storage room code will change on Monday morning. Employees should collect the new code from reception after signing the updated safety sheet.',
    ],
    questions: [
      {
        id: 'gt-reading-workplace-roster-q1',
        type: 'sentence-completion',
        prompt: 'The morning cleaning team will begin at ____.',
        answer: '6:30 a.m.',
        explanation:
          'La respuesta está en la primera línea: “will start at 6:30 a.m. instead of 7:00 a.m.”',
        trap: '7:00 a.m. es el horario anterior, por eso es distractor.',
      },
      {
        id: 'gt-reading-workplace-roster-q2',
        type: 'short-answer',
        prompt: 'Where can employees collect the new storage room code?',
        answer: 'reception',
        explanation:
          'La evidencia dice “collect the new code from reception”. En una respuesta corta, “reception” basta.',
        trap: '“Storage room” es el lugar del código, no el lugar donde se recoge.',
      },
      {
        id: 'gt-reading-workplace-roster-q3',
        type: 'true-false-not-given',
        prompt: 'Late availability requests will apply to the roster starting Monday.',
        answer: 'FALSE',
        explanation:
          'El texto dice que solicitudes después del viernes se consideran para el siguiente roster, no el que empieza lunes.',
        trap: 'La frase contiene “Monday”, pero niega que los cambios tarde apliquen a ese roster.',
      },
    ],
  },
  {
    id: 'gt-reading-rental-inspection',
    title: 'Rental Inspection Email',
    context: 'social',
    firstMove: 'skimming',
    passage: [
      'Dear tenant, your annual property inspection is scheduled for Wednesday 18 June between 9 a.m. and 12 p.m. If this window is unsuitable, please contact our office by Monday 9 June.',
      'You do not need to be at home during the inspection if you have already authorised key access. However, pets must be secured in a separate room or removed from the property.',
      'The inspector will check smoke alarms, window locks and signs of water damage. Minor maintenance issues can be reported through the tenant portal before the visit.',
    ],
    questions: [
      {
        id: 'gt-reading-rental-inspection-q1',
        type: 'short-answer',
        prompt: 'By what date should tenants contact the office if the inspection time is unsuitable?',
        answer: 'Monday 9 June',
        explanation:
          'La fecha límite está en la primera sección: “please contact our office by Monday 9 June”.',
        trap: 'Wednesday 18 June es la fecha de inspección, no la fecha límite para cambiarla.',
      },
      {
        id: 'gt-reading-rental-inspection-q2',
        type: 'matching-information',
        prompt: 'Which paragraph mentions what will be checked during the visit?',
        answer: 'Paragraph 3',
        explanation:
          'El tercer párrafo enumera smoke alarms, window locks y water damage.',
        trap: 'El segundo párrafo habla de acceso y mascotas, no de los elementos inspeccionados.',
      },
      {
        id: 'gt-reading-rental-inspection-q3',
        type: 'true-false-not-given',
        prompt: 'Tenants must always be present during the inspection.',
        answer: 'FALSE',
        explanation:
          'El texto dice que no necesitan estar en casa si ya autorizaron acceso con llave.',
        trap: 'La inspección sí ocurre en la casa, pero presencia del tenant no siempre es obligatoria.',
      },
    ],
  },
  {
    id: 'gt-reading-first-aid-training',
    title: 'First Aid Training Course',
    context: 'training',
    firstMove: 'scanning',
    passage: [
      'The first aid course is open to all employees and runs from 1 p.m. to 5 p.m. on the last Thursday of each month. Participants receive a certificate valid for two years.',
      'The course covers basic wound care, recovery position, emergency calls and the use of automated defibrillators. It does not include advanced medical procedures.',
      'Employees must wear comfortable clothing because part of the course involves floor practice. Anyone with a back injury should inform the trainer before the session begins.',
    ],
    questions: [
      {
        id: 'gt-reading-first-aid-training-q1',
        type: 'sentence-completion',
        prompt: 'The certificate is valid for ____.',
        answer: 'two years',
        explanation:
          'La primera sección dice “Participants receive a certificate valid for two years”.',
        trap: '“Last Thursday” indica frecuencia del curso, no duración del certificado.',
      },
      {
        id: 'gt-reading-first-aid-training-q2',
        type: 'matching-information',
        prompt: 'Which paragraph explains clothing advice?',
        answer: 'Paragraph 3',
        explanation:
          'El tercer párrafo pide ropa cómoda porque hay práctica en el piso.',
        trap: 'El segundo párrafo enumera contenidos del curso, pero no ropa.',
      },
      {
        id: 'gt-reading-first-aid-training-q3',
        type: 'true-false-not-given',
        prompt: 'The course teaches advanced medical procedures.',
        answer: 'FALSE',
        explanation:
          'El texto dice explícitamente que no incluye advanced medical procedures.',
        trap: 'Que sea first aid no significa entrenamiento médico avanzado.',
      },
    ],
  },
];

export const metadata: Metadata = {
  title: 'IELTS General Training Reading: textos y práctica',
  description:
    'Practica IELTS General Training Reading con textos funcionales, sociales y laborales, preguntas originales, respuestas explicadas y estrategia WeLearn.',
  keywords: [
    'IELTS General Training Reading',
    'IELTS GT Reading practice',
    'IELTS reading textos funcionales',
    'IELTS General Training ejercicios',
    'IELTS Reading social workplace texts',
  ],
  openGraph: {
    title: 'IELTS General Training Reading: textos y práctica',
    description:
      'Banco original de Reading General Training con textos cotidianos, laborales y funcionales, preguntas y explicaciones.',
    type: 'website',
    locale: 'es_CO',
    url: CANONICAL_URL,
  },
  alternates: { canonical: CANONICAL_URL },
  robots: { index: true, follow: true },
};

export default function Page() {
  const totalQuestions = IELTS_GT_READING_TEXTS.reduce((sum, text) => sum + text.questions.length, 0);

  return (
    <>
      <LearningResourceJsonLd
        name="IELTS General Training Reading: textos y práctica"
        url={CANONICAL_URL}
        description="Guía y banco de práctica original para IELTS General Training Reading con textos funcionales, sociales y laborales."
        teaches={[
          'IELTS General Training Reading',
          'functional reading',
          'workplace texts',
          'short-answer questions',
          'sentence completion',
          'true false not given',
          'matching information',
        ]}
        isPartOf={{
          name: 'IELTS General Training',
          url: 'https://www.idiomaswl.com/practica/ielts/general-training',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'General Training', url: 'https://www.idiomaswl.com/practica/ielts/general-training' },
          { name: 'Reading', url: CANONICAL_URL },
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
            <Link href="/practica/ielts/general-training">General Training</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>Reading</span>
          </nav>

          <section style={{ marginBottom: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>
              <span className="ink-line" />
              IELTS General Training Reading
            </p>
            <h1 style={{ margin: 0, maxWidth: 780 }}>IELTS General Training Reading: textos y práctica</h1>
            <p style={{ maxWidth: 740, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
              IELTS General Training Reading mantiene el reto de encontrar evidencia con precisión, pero usa textos más
              cotidianos: avisos, correos, normas de trabajo, cursos y servicios. Esta ruta entrena lectura funcional
              antes de mezclar todo en simulacros completos.
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
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #fff)' }}>
              <h2 id="official-vs-welearn" style={{ marginTop: 0, fontSize: '1.05rem' }}>
                Formato oficial vs estrategia WeLearn
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS indica que General Training Reading usa materiales de contexto social, laboral y cotidiano. Los
                tipos de pregunta pueden parecerse a Academic, pero aquí WeLearn entrena primero propósito, ubicación
                de datos, límite de palabras y lectura de instrucciones funcionales.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #f8fafc)' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Banco inicial revisado</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Este banco tiene {IELTS_GT_READING_TEXTS.length} textos originales y {totalQuestions} preguntas con
                respuesta, explicación y trampa. No son preguntas oficiales; son práctica original para construir
                precisión antes de cronometrar.
              </p>
            </article>
          </section>

          <section aria-labelledby="method" style={{ marginBottom: '2rem' }}>
            <h2 id="method">Método de lectura funcional</h2>
            <ol style={{ display: 'grid', gap: '0.75rem', paddingLeft: '1.25rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Lee el encabezado primero:</strong> identifica si es aviso,
                email, norma laboral, horario o instrucción de curso.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Decide la primera acción:</strong> skimming para propósito
                general, scanning para fechas, números, requisitos y lugares.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Subraya la zona de evidencia:</strong> no respondas desde
                memoria ni por sentido común.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Revisa el límite de palabras:</strong> copia lo mínimo
                necesario cuando la pregunta pide completar o responder corto.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Distingue cambio vs condición:</strong> muchos distractores
                usan horarios antiguos, excepciones o requisitos de otra sección.
              </li>
            </ol>
          </section>

          <section aria-labelledby="practice-bank" style={{ marginBottom: '2rem' }}>
            <h2 id="practice-bank">Banco de práctica: textos General Training Reading</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Trabaja cada texto en dos pasadas: primero decide si conviene skimming o scanning; luego contesta mirando
              evidencia. Las respuestas explicadas muestran por qué los distractores son peligrosos.
            </p>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {IELTS_GT_READING_TEXTS.map((text, textIndex) => (
                <article key={text.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #fff)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
                    TEXT {textIndex + 1} · {text.context.toUpperCase()} · FIRST MOVE: {text.firstMove.toUpperCase()}
                  </p>
                  <h3 style={{ marginTop: 0 }}>{text.title}</h3>
                  <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                    {text.passage.map((paragraph, paragraphIndex) => (
                      <p key={paragraph} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--ink)' }}>Paragraph {paragraphIndex + 1}:</strong> {paragraph}
                      </p>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gap: '0.85rem' }}>
                    {text.questions.map((question, questionIndex) => (
                      <section
                        key={question.id}
                        aria-labelledby={question.id}
                        style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '0.85rem' }}
                      >
                        <p id={question.id} style={{ margin: '0 0 0.35rem', fontWeight: 800 }}>
                          Pregunta {questionIndex + 1}: {question.prompt}
                        </p>
                        <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
                          Tipo: {question.type}
                        </p>
                        <p style={{ marginBottom: '0.35rem' }}>
                          <strong>Respuesta:</strong> {question.answer}
                        </p>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.35rem' }}>
                          <strong style={{ color: 'var(--ink)' }}>Explicación:</strong> {question.explanation}
                        </p>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                          <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {question.trap}
                        </p>
                      </section>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="transfer" style={{ marginBottom: '2rem' }}>
            <h2 id="transfer">Qué practicar después</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                {
                  title: 'Skimming',
                  text: 'Para entender propósito de aviso, email o norma antes de ir a preguntas.',
                  href: '/practica/ielts/reading/habilidades/skimming',
                },
                {
                  title: 'Scanning',
                  text: 'Para ubicar fechas, horarios, requisitos, lugares y excepciones.',
                  href: '/practica/ielts/reading/habilidades/scanning',
                },
                {
                  title: 'Límite de palabras',
                  text: 'Para responder con frases exactas y no exceder instrucciones.',
                  href: '/practica/ielts/reading/habilidades/limite-de-palabras',
                },
                {
                  title: 'Tipos de pregunta',
                  text: 'Para transferir esta lectura funcional a formatos IELTS Reading específicos.',
                  href: '/practica/ielts/reading/tipos-de-preguntas',
                },
              ].map((item) => (
                <article key={item.href} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #fff)' }}>
                  <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{item.text}</p>
                  <Link href={item.href}>Abrir recurso</Link>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="sources" style={{ marginBottom: '2rem' }}>
            <h2 id="sources">Fuentes y rutas internas</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Para formato oficial y muestras, consulta IELTS.org. Para entrenar por habilidad, usa las rutas WeLearn
              de Reading ya publicadas.
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
                <Link href="/practica/ielts/general-training">IELTS General Training hub</Link>
              </li>
              <li>
                <Link href="/practica/ielts/general-training/writing/task1">
                  IELTS General Training Writing Task 1 carta
                </Link>
              </li>
              <li>
                <Link href="/practica/ielts/reading">IELTS Reading Academic y habilidades</Link>
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
