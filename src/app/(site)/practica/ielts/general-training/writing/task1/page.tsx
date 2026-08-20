import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const CANONICAL_URL = 'https://www.idiomaswl.com/practica/ielts/general-training/writing/task1';
const IELTS_GENERAL_TRAINING_URL = 'https://ielts.org/take-a-test/test-types/ielts-general-training-test';
const IELTS_GENERAL_TRAINING_SAMPLE_URL =
  'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test';

type LetterPrompt = {
  id: string;
  title: string;
  situation: string;
  tone: 'formal' | 'semi-formal' | 'informal';
  purpose: string;
  bulletPoints: string[];
  plan: string[];
  usefulLanguage: string[];
  commonTrap: string;
  modelOpening: string;
  answerCheck: string;
};

const FAQS = [
  {
    question: '¿Qué pide IELTS General Training Writing Task 1?',
    answer:
      'Pide escribir una carta de al menos 150 palabras en respuesta a una situación. La carta debe cubrir todos los puntos del enunciado, elegir un tono adecuado y resolver un propósito comunicativo claro.',
  },
  {
    question: '¿La carta siempre es formal?',
    answer:
      'No. Puede ser formal, semi-formal o informal según destinatario y situación. WeLearn entrena primero la decisión de tono porque afecta saludo, cierre, vocabulario y nivel de detalle.',
  },
  {
    question: '¿Estos prompts son oficiales de IELTS?',
    answer:
      'No. Son prompts originales de práctica WeLearn. La página cita fuentes oficiales para formato y usa ejercicios propios para entrenar propósito, tono, puntos obligatorios y revisión.',
  },
];

const GT_TASK1_LETTER_PROMPTS: LetterPrompt[] = [
  {
    id: 'gt-task1-letter-complaint-noise',
    title: 'Queja formal por ruido en un edificio',
    situation:
      'You recently moved into a new apartment. There is loud construction noise every night after 10 p.m. Write to the building manager.',
    tone: 'formal',
    purpose: 'Presentar una queja clara y pedir una solución concreta.',
    bulletPoints: [
      'Explain when the problem started',
      'Describe how it affects you',
      'Ask the manager to take action',
    ],
    plan: [
      'Abrir con el motivo de la carta y el dato del apartamento.',
      'Explicar frecuencia y hora del ruido con detalles verificables.',
      'Conectar el problema con una consecuencia concreta: descanso, trabajo o salud.',
      'Pedir una acción medible: revisar horarios, enviar aviso o confirmar fecha de solución.',
    ],
    usefulLanguage: ['I am writing to report...', 'This has affected...', 'I would appreciate it if...'],
    commonTrap:
      'Sonar agresivo o demasiado emocional. En carta formal conviene ser firme, específico y cortés.',
    modelOpening:
      'Dear Building Manager, I am writing to report a recurring noise problem in Apartment 604, where construction work has continued after 10 p.m. on several nights this week.',
    answerCheck:
      'La respuesta cubre los tres puntos, mantiene tono formal y termina con una petición clara de acción.',
  },
  {
    id: 'gt-task1-letter-course-request',
    title: 'Solicitud semi-formal sobre un curso',
    situation:
      'You are interested in taking a weekend photography course at a local community centre. Write to the course coordinator.',
    tone: 'semi-formal',
    purpose: 'Pedir información específica antes de inscribirse.',
    bulletPoints: [
      'Explain why you are interested',
      'Ask about the schedule and cost',
      'Ask whether beginners can join',
    ],
    plan: [
      'Presentar interés con una razón breve.',
      'Agrupar preguntas prácticas en una o dos oraciones.',
      'Preguntar por nivel de entrada sin sonar inseguro.',
      'Cerrar agradeciendo y dejando disponibilidad para recibir información.',
    ],
    usefulLanguage: ['I am interested in...', 'Could you please let me know...', 'I would be grateful for...'],
    commonTrap:
      'Escribir como mensaje de chat. Semi-formal permite cercanía, pero todavía necesita estructura y cortesía.',
    modelOpening:
      'Dear Course Coordinator, I am interested in joining the weekend photography course because I would like to improve my travel photos and learn the basics of camera settings.',
    answerCheck:
      'La carta explica interés, pregunta horario/costo y confirma si principiantes pueden participar.',
  },
  {
    id: 'gt-task1-letter-friend-apology',
    title: 'Disculpa informal a un amigo',
    situation:
      'A friend invited you to a dinner, but you cannot attend because of a work commitment. Write to your friend.',
    tone: 'informal',
    purpose: 'Disculparse, explicar la razón y proponer otra ocasión.',
    bulletPoints: [
      'Apologise for not being able to come',
      'Explain why you cannot attend',
      'Suggest another time to meet',
    ],
    plan: [
      'Abrir con saludo natural y disculpa directa.',
      'Dar una razón breve sin convertir la carta en excusa larga.',
      'Mostrar interés real por ver a la persona.',
      'Proponer una fecha o plan alternativo.',
    ],
    usefulLanguage: ['I am really sorry...', 'Something came up at work...', 'Could we meet... instead?'],
    commonTrap:
      'Mantener tono demasiado formal con un amigo. Informal no significa desordenado; significa natural y personal.',
    modelOpening:
      'Hi Marco, I am really sorry, but I will not be able to make it to dinner on Friday because an urgent work meeting was moved to that evening.',
    answerCheck:
      'La respuesta suena personal, cubre disculpa/razón/alternativa y evita frases demasiado rígidas.',
  },
  {
    id: 'gt-task1-letter-lost-item',
    title: 'Reporte formal de objeto perdido',
    situation:
      'You left a jacket on a train during a trip. Write to the train company customer service department.',
    tone: 'formal',
    purpose: 'Dar datos suficientes para recuperar un objeto perdido.',
    bulletPoints: [
      'Describe the item you lost',
      'Give details of your journey',
      'Explain how the company can contact you',
    ],
    plan: [
      'Identificar el objeto con color, marca o característica distintiva.',
      'Dar fecha, ruta, horario y asiento si aplica.',
      'Pedir confirmación si lo encuentran.',
      'Dejar método de contacto y agradecer.',
    ],
    usefulLanguage: ['I believe I left...', 'The item can be identified by...', 'Please contact me at...'],
    commonTrap:
      'Olvidar datos de viaje. En una carta funcional, la precisión ayuda más que vocabulario avanzado.',
    modelOpening:
      'Dear Customer Service Team, I believe I left a navy jacket on the 7:40 p.m. train from Manchester to Leeds last Saturday.',
    answerCheck:
      'La carta incluye descripción, datos del trayecto y forma de contacto, con tono formal y objetivo.',
  },
];

const toneDrills = [
  {
    prompt: 'You are writing to your landlord about a broken heater.',
    answer: 'formal',
    explanation:
      'El destinatario tiene una relación de servicio/contrato. Usa saludo formal, datos específicos y una petición clara.',
  },
  {
    prompt: 'You are writing to a colleague you know well to swap shifts.',
    answer: 'semi-formal',
    explanation:
      'Hay cercanía, pero sigue siendo contexto laboral. Mantén cortesía y claridad sin sonar demasiado distante.',
  },
  {
    prompt: 'You are writing to a close friend to thank them for hosting you.',
    answer: 'informal',
    explanation:
      'La relación es personal. Puedes sonar cálido y natural, siempre cubriendo todos los puntos del prompt.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS General Training Writing Task 1: carta',
  description:
    'Guía y banco de práctica para IELTS General Training Writing Task 1: tipos de carta, tono, propósito, prompts originales y respuestas explicadas.',
  keywords: [
    'IELTS General Training Writing Task 1',
    'IELTS letter writing',
    'IELTS carta formal informal',
    'IELTS GT Writing Task 1',
    'IELTS General Training carta',
  ],
  openGraph: {
    title: 'IELTS General Training Writing Task 1: carta',
    description:
      'Practica cartas IELTS General Training con prompts originales, tono, plan, lenguaje útil y respuestas explicadas.',
    type: 'website',
    locale: 'es_CO',
    url: CANONICAL_URL,
  },
  alternates: { canonical: CANONICAL_URL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS General Training Writing Task 1: carta"
        url={CANONICAL_URL}
        description="Guía con formato oficial, estrategia WeLearn, banco de cartas y respuestas explicadas para IELTS General Training Writing Task 1."
        teaches={[
          'IELTS General Training Writing Task 1',
          'letter tone',
          'formal letter',
          'semi-formal letter',
          'informal letter',
          'prompt planning',
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
          { name: 'Writing Task 1', url: CANONICAL_URL },
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
            <span style={{ color: 'var(--ink)' }}>Writing Task 1</span>
          </nav>

          <section style={{ marginBottom: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>
              <span className="ink-line" />
              IELTS General Training Writing
            </p>
            <h1 style={{ margin: 0, maxWidth: 780 }}>IELTS General Training Writing Task 1: carta</h1>
            <p style={{ maxWidth: 740, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
              En IELTS General Training Writing Task 1 escribes una carta de al menos 150 palabras. Esta página entrena
              el flujo que más evita errores: identificar destinatario, elegir tono, cubrir los tres puntos del prompt
              y cerrar con una acción clara.
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
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-surface-card)' }}>
              <h2 id="official-vs-welearn" style={{ marginTop: 0, fontSize: '1.05rem' }}>
                Formato oficial vs estrategia WeLearn
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS General Training Writing Task 1 pide responder por carta a una situación. El formato oficial marca
                extensión mínima y tarea; WeLearn convierte eso en decisiones prácticas: tono, propósito, puntos
                obligatorios, saludo, cierre y revisión.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #f8fafc)' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Respuesta explicada</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Cada prompt del banco incluye situación, tono, propósito, plan, lenguaje útil, trampa común y apertura
                modelo. No memorices cartas completas: aprende a adaptar el registro a la relación y al problema.
              </p>
            </article>
          </section>

          <section aria-labelledby="method" style={{ marginBottom: '2rem' }}>
            <h2 id="method">Método de 5 pasos para escribir la carta</h2>
            <ol style={{ display: 'grid', gap: '0.75rem', paddingLeft: '1.25rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Marca el destinatario:</strong> amigo, colega, coordinador,
                empresa, landlord o autoridad.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Decide el tono:</strong> formal, semi-formal o informal antes
                de escribir el saludo.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Convierte cada bullet en un párrafo corto:</strong> no dejes
                puntos obligatorios escondidos.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Añade detalles funcionales:</strong> fecha, lugar, objeto,
                consecuencia o petición concreta.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Revisa tono y propósito:</strong> la carta debe sonar como si
                pudiera enviarse en la vida real.
              </li>
            </ol>
          </section>

          <section aria-labelledby="tone-drill" style={{ marginBottom: '2rem' }}>
            <h2 id="tone-drill">Mini práctica: elige el tono</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Antes de redactar, decide el registro. Este ejercicio es breve porque en Task 1 el tono equivocado puede
              dañar vocabulario, saludo, cierre y nivel de detalle.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {toneDrills.map((drill, index) => (
                <article key={drill.prompt} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-surface-card)' }}>
                  <p style={{ marginTop: 0, fontWeight: 800 }}>Decisión {index + 1}</p>
                  <p style={{ lineHeight: 1.65 }}>{drill.prompt}</p>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Respuesta:</strong> {drill.answer}
                  </p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                    <strong style={{ color: 'var(--ink)' }}>Explicación:</strong> {drill.explanation}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="prompt-bank" style={{ marginBottom: '2rem' }}>
            <h2 id="prompt-bank">Banco de práctica: cartas IELTS General Training Task 1</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Estos prompts son originales de WeLearn. Úsalos para practicar decisiones de carta antes de pasar a
              escritura cronometrada de 20 minutos.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {GT_TASK1_LETTER_PROMPTS.map((prompt) => (
                <article key={prompt.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-surface-card)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
                    {prompt.tone.toUpperCase()} · {prompt.id}
                  </p>
                  <h3 style={{ marginTop: 0 }}>{prompt.title}</h3>
                  <p style={{ lineHeight: 1.65 }}>{prompt.situation}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <p style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Puntos obligatorios</p>
                      <ul style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                        {prompt.bulletPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Plan recomendado</p>
                      <ol style={{ color: 'var(--muted)', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
                        {prompt.plan.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Propósito:</strong> {prompt.purpose}
                  </p>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Lenguaje útil:</strong> {prompt.usefulLanguage.join(' / ')}
                  </p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa común:</strong> {prompt.commonTrap}
                  </p>
                  <blockquote style={{ margin: '1rem 0', borderLeft: '3px solid var(--accent)', paddingLeft: '1rem', color: 'var(--ink)' }}>
                    {prompt.modelOpening}
                  </blockquote>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                    <strong style={{ color: 'var(--ink)' }}>Respuesta explicada:</strong> {prompt.answerCheck}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="checklist" style={{ marginBottom: '2rem' }}>
            <h2 id="checklist">Checklist antes de entregar</h2>
            <ul style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
              <li>La carta responde a los tres puntos del enunciado.</li>
              <li>El saludo y cierre coinciden con el tono.</li>
              <li>Cada párrafo tiene una función distinta.</li>
              <li>Hay detalles concretos, no solo frases generales.</li>
              <li>La petición, disculpa, invitación o explicación queda clara al final.</li>
            </ul>
          </section>

          <section aria-labelledby="sources" style={{ marginBottom: '2rem' }}>
            <h2 id="sources">Fuentes y siguientes rutas</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Para formato oficial, revisa IELTS.org. Para seguir practicando, compara esta tarea con Academic Task 1 y
              usa la rúbrica WeLearn para detectar problemas de respuesta, coherencia, vocabulario y gramática.
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
                <Link href="/practica/ielts/academic/writing/task1">IELTS Academic Writing Task 1</Link>
              </li>
              <li>
                <Link href="/practica/ielts/academic/writing/rubrica">Rúbrica IELTS Writing WeLearn</Link>
              </li>
              <li>
                <Link href="/practica/ielts/academic/writing/task2">IELTS Writing Task 2</Link>
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
