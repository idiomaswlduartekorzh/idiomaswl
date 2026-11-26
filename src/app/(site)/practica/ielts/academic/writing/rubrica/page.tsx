import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/rubrica';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
const IELTS_ACADEMIC_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';
const IELTS_SCORING_URL = 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail';

const FAQS = [
  {
    question: '¿Esta es la rúbrica oficial de IELTS Writing?',
    answer:
      'No. Es una rúbrica pedagógica de WeLearn para estudiar y revisar respuestas. IELTS evalúa Writing con criterios oficiales; esta página organiza esos criterios en acciones de práctica sin prometer una banda exacta.',
  },
  {
    question: '¿Sirve para Task 1 y Task 2?',
    answer:
      'Sí. Task 1 cambia el tipo de respuesta porque describe información visual, mientras Task 2 exige un ensayo. La autoevaluación separa las diferencias de tarea y mantiene criterios comunes como coherencia, vocabulario y gramática.',
  },
  {
    question: '¿Puedo calcular mi band score exacto con esta página?',
    answer:
      'Aquí puedes encontrar una mejora en tu propio texto. Un tutor puede orientarte sobre tu nivel a partir de respuestas completas. La puntuación oficial la asignan los examinadores de IELTS.',
  },
];

const criteria = [
  {
    name: 'Task Achievement / Task Response',
    task1: 'Tapa los párrafos de detalle. Si solo pudieras leer tu overview, ¿qué sabrías del gráfico? Comprueba que puedes señalar en la figura el patrón que describes.',
    task2: 'Vuelve a la última línea de la consigna. Si pide explicar dos posturas y dar tu opinión, localiza en tu ensayo dónde haces cada una de esas tres cosas.',
    action: 'Corrige primero lo que falta. Un ejemplo nuevo sirve cuando ayuda a cumplir una parte concreta del encargo.',
  },
  {
    name: 'Coherence and Cohesion',
    task1: 'Lee un párrafo y ponle un título al margen. «Los dos materiales con tasas más altas» da al lector una razón para encontrar esos datos juntos.',
    task2: 'Toma la oración que precede al ejemplo y la que le sigue. ¿Queda claro cómo ese caso ayuda a entender la razón del párrafo?',
    action: 'Si has escrito «Furthermore», cubre esa palabra un momento. Decide si necesitas añadir otra idea, mostrar una consecuencia o explicar mejor la que ya tienes.',
  },
  {
    name: 'Lexical Resource',
    task1: 'Mira la unidad del eje. Un porcentaje puede ser la proporción de familias con internet o la parte del presupuesto destinada a vivienda. El sustantivo debe identificar ese grupo.',
    task2: 'Busca una palabra amplia como «better». En el ejemplo de los autobuses, ¿quieres decir más barato, más rápido o capaz de transportar más personas?',
    action: 'Prueba la palabra nueva dentro de la oración completa. Si cambia el grupo, la cantidad o el sentido de la afirmación, vuelve a la expresión que sí puedes justificar.',
  },
  {
    name: 'Grammatical Range and Accuracy',
    task1: 'Rodea los años y los verbos que los describen. Para un mapa propuesto para 2035, comprueba si tu frase da por terminada una construcción que todavía es un proyecto.',
    task2: 'En la frase más larga, lee solo el sujeto y el verbo principal. Después incorpora la parte que empieza con «although», «if» o «because» y comprueba qué relación expresa.',
    action: 'Haz una sola reparación cada vez. Primero recupera el sentido que querías dar a la frase y luego vuelve a leerla junto a la anterior.',
  },
];

const diagnostics = [
  {
    title: 'Task 1 · Una comparación que el gráfico sí permite',
    prompt: 'El gráfico de acceso a internet muestra que A sigue por encima de B en los cinco años. El borrador dice “Region A grew the fastest”. A pasa del 30% al 88% y B pasa del 12% al 79%. ¿Qué conservarías de esa idea?',
    bestCriterion: 'Task Achievement',
    revision: 'Region A had the highest level of access throughout, while Region B recorded the larger increase of the two.',
    explanation: 'A lidera en nivel, pero suma 58 puntos porcentuales y B suma 67. Puedes contar ambas cosas si distingues la altura de una línea de la diferencia entre sus extremos. En el siguiente gráfico comprueba qué cantidad estás comparando antes de usar «highest» o «fastest».',
  },
  {
    title: 'Task 2 · Una postura que falta',
    prompt: 'La pregunta sobre las entradas a museos pide discutir las dos posturas y dar tu opinión. Tu ensayo explica el costo para una familia y el mantenimiento de la colección. Terminas con “Both views are understandable”. ¿Qué parte queda pendiente?',
    bestCriterion: 'Task Response',
    revision: 'I would keep the permanent collection free so families can return, and charge for special exhibitions to help cover their costs.',
    explanation: 'Las dos razones ya están en el cuerpo. Ahora el lector también sabe qué harías tú. Esta postura funciona si has explicado cómo afecta el precio a las visitas y por qué hacen falta fondos. Otra postura también puede responder bien si tu desarrollo la sostiene.',
  },
  {
    title: 'Task 2 · La relación entre la razón y el ejemplo',
    prompt: 'Un borrador dice “Buses use road space well. Furthermore, buses are efficient.” Las dos frases vuelven a la misma idea. ¿Qué podrías contar para que la segunda haga avanzar el argumento?',
    bestCriterion: 'Coherence and Cohesion',
    revision: 'One full bus can carry commuters who would otherwise take up space in separate cars. A city with a crowded main road could add a bus service before widening the street.',
    explanation: 'Ahora se ve el mecanismo y una decisión concreta sobre el dinero público. Prueba a leer tu párrafo sin los conectores para escuchar si las ideas siguen avanzando.',
  },
  {
    title: 'Task 1 · Una palabra que altera la unidad',
    prompt: 'La figura de presupuesto familiar muestra que la proporción dedicada a vivienda pasó del 22% al 31%. El borrador dice “The share rose by nine per cent”. ¿Cómo nombrarías la diferencia al restar las cifras?',
    bestCriterion: 'Lexical Resource',
    revision: 'The share of household spending on housing rose by nine percentage points.',
    explanation: 'Al restar dos porcentajes, la diferencia se expresa en puntos porcentuales. Un aumento relativo del nueve por ciento sobre 22% daría alrededor de 24%. Busca otra comparación en tu informe y comprueba la unidad.',
  },
  {
    title: 'Task 2 · El verbo de una frase larga',
    prompt: 'En el ensayo sobre el precio de las entradas aparece “Although the cost of tickets are high, a family may still pay for a special exhibition”. ¿Con qué palabra concuerda «are»?',
    bestCriterion: 'Grammatical Range and Accuracy',
    revision: 'Although the cost of tickets is high, a family may still pay for a special exhibition.',
    explanation: 'Tapa «of tickets» y lee «the cost is high». El sujeto de esa parte es «cost». Conserva «although» porque la segunda idea introduce una excepción. Prueba la misma lectura en una de tus frases largas.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing rúbrica y checklist de autoevaluación',
  description:
    'Rúbrica pedagógica IELTS Writing para Task 1 y Task 2: criterios, checklist, errores frecuentes, diagnóstico y respuestas explicadas para revisar mejor.',
  keywords: [
    'IELTS writing rubric',
    'IELTS writing criteria',
    'IELTS task achievement',
    'IELTS coherence cohesion',
    'IELTS writing checklist',
    'IELTS writing band 7',
  ],
  openGraph: {
    title: 'IELTS Writing rúbrica y checklist de autoevaluación',
    description:
      'Aprende a revisar IELTS Writing Task 1 y Task 2 con criterios pedagógicos, diagnóstico y checklist.',
    type: 'website',
    locale: 'es_CO',
    url: URL,
  },
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Writing rúbrica y checklist de autoevaluación"
        url={URL}
        description="Rúbrica pedagógica para revisar respuestas de IELTS Academic Writing Task 1 y Task 2."
        teaches={[
          'IELTS Academic Writing',
          'Task Achievement',
          'Task Response',
          'Coherence and Cohesion',
          'Lexical Resource',
          'Grammatical Range and Accuracy',
          'self-review checklist',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Rúbrica', url: URL },
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
            <Link href="/practica/ielts/academic/writing">Academic Writing</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>Rúbrica</span>
          </nav>

          <section style={{ marginBottom: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>
              <span className="ink-line" />
              IELTS Academic Writing
            </p>
            <h1 style={{ margin: 0, maxWidth: 780 }}>Cómo revisar tu borrador de IELTS Writing</h1>
            <p style={{ maxWidth: 740, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
              Abre tu borrador junto al gráfico o la consigna. Elige un párrafo y busca una frase que puedas mejorar.
              Las preguntas de esta rúbrica te ayudan a encontrarla. Más abajo puedes ensayar la revisión con cinco fragmentos del curso.
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
                En IELTS Academic Writing hay dos tareas: Task 1 describe información visual en al menos 150 palabras y
                Task 2 responde un argumento o problema en al menos 250 palabras. WeLearn separa los criterios en
                acciones de revisión para que practiques sin confundir estrategia con formato oficial.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #f8fafc)' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Cómo usar esta rúbrica</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Revisa primero respuesta a la tarea, luego organización, después vocabulario y al final gramática. Si
                corriges gramática antes de saber si respondiste el prompt, puedes pulir un texto que sigue fallando.
              </p>
            </article>
          </section>

          <section aria-labelledby="criteria" style={{ marginBottom: '2rem' }}>
            <h2 id="criteria">Criterios convertidos en acciones de revisión</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem' }}>
              {criteria.map((criterion) => (
                <article className="wl-card" key={criterion.name} style={{ padding: '1rem', lineHeight: 1.65 }}>
                  <h3 lang="en" style={{ marginTop: 0 }}>{criterion.name}</h3>
                  <p><strong>Task 1.</strong> {criterion.task1}</p>
                  <p><strong>Task 2.</strong> {criterion.task2}</p>
                  <p style={{ marginBottom: 0 }}>{criterion.action}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="checklist" style={{ marginBottom: '2rem' }}>
            <h2 id="checklist">Checklist de revisión antes de entregar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                ['1. Prompt', '¿Respondí exactamente lo que el enunciado pide, no un tema parecido?'],
                ['2. Plan', '¿Cada párrafo tiene una función distinta y visible?'],
                ['3. Evidencia', '¿Task 1 usa datos seleccionados y Task 2 usa razones o ejemplos suficientes?'],
                ['4. Lenguaje', '¿El vocabulario es preciso aunque no sea complicado?'],
                ['5. Control', '¿Puedo leer el texto sin perder el hilo por errores gramaticales?'],
                ['6. Tiempo', '¿Task 1 quedó cerca de 20 minutos y Task 2 cerca de 40?'],
              ].map(([title, body]) => (
                <article key={title} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-surface-card)' }}>
                  <h3 style={{ marginTop: 0, fontSize: '1rem' }}>{title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 0 }}>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="diagnostic" style={{ marginBottom: '2rem' }}>
            <h2 id="diagnostic">Diagnóstico rápido con respuestas explicadas</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Lee cada caso y decide qué criterio limita más la respuesta. Después compara con la explicación.
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {diagnostics.map((item) => (
                <article key={item.prompt} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-surface-card)' }}>
                  <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                  <p style={{ lineHeight: 1.65 }}>{item.prompt}</p>
                  <details>
                    <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Comparar mi revisión</summary>
                    <p><strong>Criterio principal:</strong> <span lang="en">{item.bestCriterion}</span></p>
                    <p lang="en" style={{ lineHeight: 1.65 }}><em>{item.revision}</em></p>
                    <p style={{ lineHeight: 1.65 }}><strong>Explicación:</strong> {item.explanation}</p>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="next" style={{ marginBottom: '2rem' }}>
            <h2 id="next">Rutas para aplicar la rúbrica</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                ['/practica/ielts/academic/writing/task1', 'Practicar Task 1'],
                ['/practica/ielts/academic/writing/task2', 'Practicar Task 2'],
                ['/practica/ielts/academic/writing/task2/model-answers', 'Ver model answers explicados'],
                ['/practica/ielts/general-training', 'Comparar con General Training'],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    border: '1px solid var(--line-soft)',
                    borderRadius: 8,
                    padding: '1rem',
                    background: 'var(--wl-surface-card)',
                    textDecoration: 'none',
                    color: 'var(--ink)',
                    fontWeight: 800,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="sources" style={{ marginBottom: '2rem' }}>
            <h2 id="sources">Fuentes y límites</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              La página usa fuentes oficiales para el formato de IELTS Academic y muestras oficiales de preparación, y
              convierte criterios de Writing en una herramienta de estudio propia de WeLearn. No reproduce band
              descriptors oficiales ni reemplaza evaluación oficial.
            </p>
            <ul>
              <li>
                <a href={IELTS_ACADEMIC_URL} rel="noreferrer" target="_blank">
                  Formato y criterios oficiales de IELTS Academic Writing
                </a>
              </li>
              <li>
                <a href={IELTS_ACADEMIC_SAMPLE_URL} rel="noreferrer" target="_blank">
                  IELTS Academic sample test questions
                </a>
              </li>
              <li>
                <a href={IELTS_SCORING_URL} rel="noreferrer" target="_blank">
                  Cómo se ponderan los criterios y las tareas de Writing
                </a>
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
