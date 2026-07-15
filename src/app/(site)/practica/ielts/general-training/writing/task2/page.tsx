import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const CANONICAL_URL = 'https://www.idiomaswl.com/practica/ielts/general-training/writing/task2';
const IELTS_GENERAL_TRAINING_URL = 'https://ielts.org/take-a-test/test-types/ielts-general-training-test';
const IELTS_GENERAL_TRAINING_SAMPLE_URL =
  'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test';

type EssayPrompt = {
  id: string;
  category: 'opinion' | 'discussion' | 'advantages-disadvantages' | 'problem-solution' | 'direct-question';
  prompt: string;
  target: string;
  plan: string[];
  thesisMove: string;
  usefulLanguage: string[];
  commonTrap: string;
  modelOpening: string;
  answerCheck: string;
};

const FAQS = [
  {
    question: '¿IELTS General Training Writing Task 2 es igual a Academic Task 2?',
    answer:
      'El formato general es un ensayo de al menos 250 palabras. Sin embargo, General Training suele usar temas más sociales, cotidianos o laborales, mientras Academic puede sentirse más institucional o académico. La estrategia de tesis, párrafos y ejemplos sigue siendo transferible.',
  },
  {
    question: '¿Puedo usar los bancos de Academic Task 2 para General Training?',
    answer:
      'Sí, para estructura y tipos de ensayo ayudan bastante. Esta ruta añade prompts y ejemplos con ángulo General Training para que el estudiante practique temas más cercanos a vida diaria, trabajo, comunidad y servicios.',
  },
  {
    question: '¿Estos ensayos son respuestas oficiales?',
    answer:
      'No. Los prompts, planes y aperturas son práctica original WeLearn. Las fuentes oficiales se citan para formato y muestras, no para afirmar que estos ejercicios sean oficiales.',
  },
];

const GT_TASK2_ESSAY_PROMPTS: EssayPrompt[] = [
  {
    id: 'gt-task2-opinion-work-hours',
    category: 'opinion',
    prompt:
      'Some people believe that companies should offer shorter working weeks to improve employees’ quality of life. To what extent do you agree or disagree?',
    target: 'Definir postura sobre semana laboral corta y sostenerla con razones laborales y personales.',
    plan: [
      'Introducción: parafrasear y declarar grado de acuerdo.',
      'Párrafo 1: explicar beneficio de bienestar y productividad sostenida.',
      'Párrafo 2: reconocer límite operativo y proponer aplicación flexible.',
      'Conclusión: reafirmar postura equilibrada.',
    ],
    thesisMove:
      'I largely agree, provided that shorter schedules are planned around productivity rather than simply reducing service quality.',
    usefulLanguage: ['I largely agree that...', 'This can lead to...', 'A practical limitation is...'],
    commonTrap:
      'Responder solo con opinión personal sin explicar consecuencias para empresas y empleados.',
    modelOpening:
      'Many workers now expect employers to consider wellbeing as well as output. I largely agree that a shorter working week can improve quality of life, as long as companies redesign workloads instead of compressing the same pressure into fewer days.',
    answerCheck:
      'La respuesta funciona si mantiene una postura clara, cubre beneficios y límites, y usa ejemplos laborales concretos.',
  },
  {
    id: 'gt-task2-discussion-public-transport',
    category: 'discussion',
    prompt:
      'Some people think public transport should be free in large cities, while others believe passengers should continue to pay. Discuss both views and give your opinion.',
    target: 'Comparar gratuidad y pago de transporte, y cerrar con posición propia.',
    plan: [
      'Introducción: presentar las dos posturas y opinión general.',
      'Párrafo 1: argumento por transporte gratuito: acceso, tráfico y contaminación.',
      'Párrafo 2: argumento por pago: mantenimiento, frecuencia y sostenibilidad del sistema.',
      'Conclusión: preferir subsidios focalizados o tarifa baja antes que gratuidad total.',
    ],
    thesisMove:
      'Although free transport can improve access, I believe a low-cost system with public subsidies is more realistic than removing fares completely.',
    usefulLanguage: ['Supporters argue that...', 'On the other hand...', 'A more balanced solution would be...'],
    commonTrap:
      'Hablar solo de una postura. Discussion exige cubrir ambos lados antes de la opinión.',
    modelOpening:
      'Urban transport affects both household budgets and the way people move around a city. While some argue that buses and trains should be free, others believe fares are necessary to keep services reliable.',
    answerCheck:
      'La respuesta es sólida si cada postura recibe desarrollo real y la opinión no aparece como una frase pegada al final.',
  },
  {
    id: 'gt-task2-advantages-disadvantages-online-services',
    category: 'advantages-disadvantages',
    prompt:
      'More government services are now completed online instead of in offices. Do the advantages of this development outweigh the disadvantages?',
    target: 'Evaluar si conveniencia y eficiencia superan exclusión digital y problemas de soporte.',
    plan: [
      'Introducción: declarar que las ventajas son mayores si hay soporte offline.',
      'Párrafo 1: eficiencia, ahorro de tiempo y acceso desde casa.',
      'Párrafo 2: desventajas para adultos mayores, baja conectividad o trámites complejos.',
      'Conclusión: defender modelo digital con canales de ayuda.',
    ],
    thesisMove:
      'The advantages generally outweigh the disadvantages, but only when online systems are supported by accessible help for users who struggle with technology.',
    usefulLanguage: ['The main advantage is...', 'This is especially useful for...', 'However, this can exclude...'],
    commonTrap:
      'Listar ventajas y desventajas sin responder “outweigh”. Hay que comparar peso, no solo enumerar.',
    modelOpening:
      'Digital public services have changed how people apply for documents, pay fees and request information. In my view, this shift is mostly positive, but it should not leave less confident users without support.',
    answerCheck:
      'La respuesta debe tener juicio comparativo: por qué un lado pesa más y bajo qué condición.',
  },
  {
    id: 'gt-task2-problem-solution-neighbourhood-safety',
    category: 'problem-solution',
    prompt:
      'In some neighbourhoods, residents no longer know or trust the people who live near them. What problems can this cause, and what solutions could improve the situation?',
    target: 'Identificar problemas comunitarios y proponer soluciones realistas.',
    plan: [
      'Introducción: presentar pérdida de confianza vecinal como problema social.',
      'Párrafo 1: consecuencias: aislamiento, baja cooperación y sensación de inseguridad.',
      'Párrafo 2: soluciones: eventos locales, grupos de comunicación y proyectos compartidos.',
      'Conclusión: insistir en acciones pequeñas y constantes.',
    ],
    thesisMove:
      'This lack of trust can weaken community safety and cooperation, but local activities and shared communication channels can rebuild contact gradually.',
    usefulLanguage: ['One problem is that...', 'This may result in...', 'A practical solution would be...'],
    commonTrap:
      'Proponer soluciones demasiado grandes para un problema comunitario. Task 2 premia soluciones conectadas al problema.',
    modelOpening:
      'Neighbourhoods depend not only on buildings and services, but also on everyday trust between residents. When people do not know those around them, small local problems can become harder to solve.',
    answerCheck:
      'La respuesta funciona si cada solución responde directamente a un problema mencionado.',
  },
  {
    id: 'gt-task2-direct-question-adults-learning',
    category: 'direct-question',
    prompt:
      'Why do some adults decide to learn a new skill later in life? What challenges might they face while learning?',
    target: 'Responder dos preguntas: motivaciones y retos de adultos aprendiendo.',
    plan: [
      'Introducción: explicar que aprendizaje adulto responde a metas prácticas y personales.',
      'Párrafo 1: razones: trabajo, independencia, salud mental o interés personal.',
      'Párrafo 2: retos: tiempo, confianza, tecnología y hábitos de estudio.',
      'Conclusión: resumir beneficios y necesidad de apoyo flexible.',
    ],
    thesisMove:
      'Adults often learn new skills for practical independence or career change, but they may struggle with time pressure and confidence.',
    usefulLanguage: ['One reason is...', 'Another motivation is...', 'The main challenge is...'],
    commonTrap:
      'Contestar solo “why” y olvidar “what challenges”. Direct-question necesita responder todas las preguntas.',
    modelOpening:
      'Many adults return to learning because their personal or professional lives have changed. They may want a better job, more independence or simply the satisfaction of doing something new.',
    answerCheck:
      'La respuesta debe separar razones y desafíos; mezclar todo en un solo párrafo suele dejar una pregunta débil.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS General Training Writing Task 2: ensayo',
  description:
    'Practica IELTS General Training Writing Task 2 con prompts originales, planes, tesis, lenguaje útil, trampas y respuestas explicadas.',
  keywords: [
    'IELTS General Training Writing Task 2',
    'IELTS GT essay practice',
    'IELTS General Training essay',
    'IELTS Task 2 ensayo',
    'IELTS writing prompts General Training',
  ],
  openGraph: {
    title: 'IELTS General Training Writing Task 2: ensayo',
    description:
      'Banco original de ensayos IELTS General Training Task 2 con tipos de pregunta, planes y respuestas explicadas.',
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
        name="IELTS General Training Writing Task 2: ensayo"
        url={CANONICAL_URL}
        description="Guía y banco de práctica original para IELTS General Training Writing Task 2 con ensayos de contexto social, laboral y cotidiano."
        teaches={[
          'IELTS General Training Writing Task 2',
          'IELTS essay planning',
          'opinion essay',
          'discussion essay',
          'advantages disadvantages essay',
          'problem solution essay',
          'direct question essay',
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
          { name: 'Writing Task 2', url: CANONICAL_URL },
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
            <span style={{ color: 'var(--ink)' }}>Writing Task 2</span>
          </nav>

          <section style={{ marginBottom: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>
              <span className="ink-line" />
              IELTS General Training Writing
            </p>
            <h1 style={{ margin: 0, maxWidth: 780 }}>IELTS General Training Writing Task 2: ensayo</h1>
            <p style={{ maxWidth: 740, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
              Task 2 en General Training pide un ensayo de al menos 250 palabras. La arquitectura del ensayo se parece
              mucho a Academic, pero los temas suelen sentirse más cercanos a trabajo, comunidad, servicios, familia,
              aprendizaje y decisiones cotidianas.
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
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
              <h2 id="official-vs-welearn" style={{ marginTop: 0, fontSize: '1.05rem' }}>
                Formato oficial vs estrategia WeLearn
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS General Training Writing incluye una carta en Task 1 y un ensayo en Task 2. El formato oficial
                pide responder la pregunta con claridad; WeLearn entrena identificación del tipo de prompt, tesis,
                progresión de párrafos, ejemplos y revisión.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#f8fafc' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Respuesta explicada</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Cada prompt del banco incluye objetivo, plan, tesis posible, lenguaje útil, trampa común y apertura
                modelo. La meta no es memorizar ensayos, sino aprender a construir una respuesta adaptable.
              </p>
            </article>
          </section>

          <section aria-labelledby="difference" style={{ marginBottom: '2rem' }}>
            <h2 id="difference">Diferencia práctica entre Task 2 Academic y General Training</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Aspecto', 'Academic Task 2', 'General Training Task 2', 'Estrategia WeLearn'].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem',
                          borderBottom: '1px solid var(--line-soft)',
                          color: 'var(--muted)',
                          fontSize: '0.82rem',
                        }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tema', 'Más institucional o académico', 'Más social, laboral o cotidiano', 'Usa ejemplos realistas sin volverte informal'],
                    ['Estructura', 'Introducción, dos párrafos, conclusión', 'Misma arquitectura base', 'Mantén tesis y topic sentences claros'],
                    ['Ejemplos', 'Política, educación, tecnología, sociedad', 'Trabajo, comunidad, servicios, vida diaria', 'Ejemplos concretos, no anécdotas largas'],
                    ['Registro', 'Formal académico', 'Formal claro y práctico', 'Evita tono conversacional aunque el tema sea cotidiano'],
                  ].map(([aspect, academic, general, strategy]) => (
                    <tr key={aspect}>
                      <th scope="row" style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>
                        {aspect}
                      </th>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{academic}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{general}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="method" style={{ marginBottom: '2rem' }}>
            <h2 id="method">Método de 6 minutos antes de escribir</h2>
            <ol style={{ display: 'grid', gap: '0.75rem', paddingLeft: '1.25rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Minuto 1:</strong> identifica si el prompt pide opinión,
                discusión, ventajas/desventajas, problema-solución o dos preguntas directas.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Minuto 2:</strong> escribe una tesis que responda exactamente
                la instrucción.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Minutos 3 y 4:</strong> decide dos ideas principales, una por
                párrafo.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Minuto 5:</strong> añade un ejemplo concreto por idea.
              </li>
              <li>
                <strong style={{ color: 'var(--ink)' }}>Minuto 6:</strong> revisa que no dejaste ninguna pregunta sin
                responder.
              </li>
            </ol>
          </section>

          <section aria-labelledby="prompt-bank" style={{ marginBottom: '2rem' }}>
            <h2 id="prompt-bank">Banco de práctica: ensayos General Training Task 2</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Estos prompts son originales de WeLearn y cubren cinco formas frecuentes de entrenamiento. Úsalos para
              planear primero; después escribe una respuesta cronometrada de 40 minutos.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {GT_TASK2_ESSAY_PROMPTS.map((prompt, index) => (
                <article key={prompt.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
                  <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
                    PROMPT {index + 1} · {prompt.category.toUpperCase()} · {prompt.id}
                  </p>
                  <h3 style={{ marginTop: 0 }}>{prompt.prompt}</h3>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Objetivo:</strong> {prompt.target}
                  </p>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Tesis posible:</strong> {prompt.thesisMove}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <p style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Plan</p>
                      <ol style={{ color: 'var(--muted)', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
                        {prompt.plan.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Lenguaje útil</p>
                      <ul style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                        {prompt.usefulLanguage.map((phrase) => (
                          <li key={phrase}>{phrase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
            <h2 id="checklist">Checklist de revisión Task 2</h2>
            <ul style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
              <li>La tesis responde exactamente la instrucción del prompt.</li>
              <li>Cada párrafo tiene una idea principal diferente.</li>
              <li>Los ejemplos son concretos, pero no se vuelven historias personales largas.</li>
              <li>La conclusión reafirma la respuesta sin introducir una idea nueva.</li>
              <li>El registro se mantiene formal aunque el tema sea cotidiano.</li>
            </ul>
          </section>

          <section aria-labelledby="sources" style={{ marginBottom: '2rem' }}>
            <h2 id="sources">Fuentes y rutas internas</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Para formato oficial, usa IELTS.org. Para transferir estrategia, compara esta ruta con Task 2 Academic y
              la rúbrica WeLearn.
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
                <Link href="/practica/ielts/academic/writing/task2">IELTS Academic Writing Task 2</Link>
              </li>
              <li>
                <Link href="/practica/ielts/academic/writing/task2/model-answers">
                  Model answers IELTS Task 2
                </Link>
              </li>
              <li>
                <Link href="/practica/ielts/academic/writing/rubrica">Rúbrica IELTS Writing WeLearn</Link>
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
