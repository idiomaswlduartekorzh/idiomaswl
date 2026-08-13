import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/rubrica';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';
const IELTS_ACADEMIC_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';

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
      'No. La página ayuda a detectar problemas visibles y priorizar revisión. La banda real depende de evaluación oficial o de un profesor entrenado con muestras completas.',
  },
];

const criteria = [
  {
    name: 'Task Achievement / Task Response',
    task1: 'Selecciona rasgos principales, compara datos relevantes y evita describir cada número sin jerarquía.',
    task2: 'Responde exactamente la pregunta, sostiene una posición y desarrolla ideas con razones y ejemplos.',
    warning: 'El texto parece correcto, pero no responde el foco del prompt.',
    action: 'Subraya el verbo de la pregunta y escribe una oración que responda ese verbo antes de redactar.',
  },
  {
    name: 'Coherence and Cohesion',
    task1: 'Agrupa datos por patrón: tendencia, contraste, pico, caída, categoría dominante o cambio espacial.',
    task2: 'Usa párrafos con una idea principal, progresión lógica y conectores que muestran relación real.',
    warning: 'Hay conectores, pero las ideas saltan o se repiten.',
    action: 'Escribe el plan en cuatro líneas: introducción, idea 1, idea 2, cierre. Cada línea debe tener función distinta.',
  },
  {
    name: 'Lexical Resource',
    task1: 'Usa lenguaje de datos: increase, decline, remain stable, account for, respectively, compared with.',
    task2: 'Usa vocabulario de argumento: policy, access, long-term effect, responsibility, trade-off, evidence.',
    warning: 'El texto repite palabras del prompt o usa sinónimos imprecisos.',
    action: 'Reemplaza solo palabras clave que entiendes bien; no cambies precisión por sonar avanzado.',
  },
  {
    name: 'Grammatical Range and Accuracy',
    task1: 'Controla tiempos, comparativos, superlativos, preposiciones de datos y oraciones subordinadas simples.',
    task2: 'Combina oraciones simples y complejas sin sacrificar claridad ni concordancia.',
    warning: 'La gramática ambiciosa oscurece la idea o genera errores básicos.',
    action: 'Después de escribir, revisa tres zonas: sujeto-verbo, artículos/plurales y puntuación entre cláusulas.',
  },
];

const diagnostics = [
  {
    prompt:
      'Task 1: “The chart shows the percentage of commuters using bicycles in three cities from 2010 to 2020.” Un estudiante escribe solo una lista de porcentajes año por año.',
    bestCriterion: 'Task Achievement / Task Response',
    explanation:
      'El problema principal no es vocabulario sino selección. Task 1 necesita rasgos generales, comparaciones y agrupación de datos; listar todo sin overview debilita la respuesta.',
  },
  {
    prompt:
      'Task 2: “Some people believe universities should focus on employability. Others think academic knowledge is more important.” El ensayo habla de educación en general, pero no contrasta las dos posturas.',
    bestCriterion: 'Task Achievement / Task Response',
    explanation:
      'El ensayo se sale del foco. Para discussion essays, la respuesta debe cubrir ambas posturas y normalmente añadir posición propia si el prompt lo pide.',
  },
  {
    prompt:
      'Un párrafo usa “Furthermore” en tres oraciones seguidas, pero cada oración repite la misma idea con palabras distintas.',
    bestCriterion: 'Coherence and Cohesion',
    explanation:
      'El conector no crea progreso lógico. La revisión debe añadir desarrollo, ejemplo o consecuencia, no solo más marcadores discursivos.',
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
            <h1 style={{ margin: 0, maxWidth: 780 }}>IELTS Writing rúbrica y checklist de autoevaluación</h1>
            <p style={{ maxWidth: 740, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
              Esta página convierte los criterios de IELTS Writing en decisiones de revisión. No calcula una banda
              oficial; te ayuda a ver si tu respuesta cumple la tarea, organiza ideas, usa vocabulario preciso y
              mantiene control gramatical antes de pasar a un profesor o simulacro completo.
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
                En IELTS Academic Writing hay dos tareas: Task 1 describe información visual en al menos 150 palabras y
                Task 2 responde un argumento o problema en al menos 250 palabras. WeLearn separa los criterios en
                acciones de revisión para que practiques sin confundir estrategia con formato oficial.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#f8fafc' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Cómo usar esta rúbrica</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Revisa primero respuesta a la tarea, luego organización, después vocabulario y al final gramática. Si
                corriges gramática antes de saber si respondiste el prompt, puedes pulir un texto que sigue fallando.
              </p>
            </article>
          </section>

          <section aria-labelledby="criteria" style={{ marginBottom: '2rem' }}>
            <h2 id="criteria">Criterios convertidos en acciones de revisión</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 860, borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Criterio', 'Task 1', 'Task 2', 'Señal de alerta', 'Acción'].map((heading) => (
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
                  {criteria.map((criterion) => (
                    <tr key={criterion.name}>
                      <th scope="row" style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>
                        {criterion.name}
                      </th>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{criterion.task1}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{criterion.task2}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{criterion.warning}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--line-soft)' }}>{criterion.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <article key={title} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
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
              {diagnostics.map((item, index) => (
                <article key={item.prompt} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
                  <p style={{ marginTop: 0, fontWeight: 800 }}>Caso {index + 1}</p>
                  <p style={{ lineHeight: 1.65 }}>{item.prompt}</p>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>Criterio principal:</strong> {item.bestCriterion}
                  </p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                    <strong style={{ color: 'var(--ink)' }}>Explicación:</strong> {item.explanation}
                  </p>
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
                    background: '#fff',
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
                  IELTS Academic test format and sections
                </a>
              </li>
              <li>
                <a href={IELTS_ACADEMIC_SAMPLE_URL} rel="noreferrer" target="_blank">
                  IELTS Academic sample test questions
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
