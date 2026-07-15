'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type EssayType = 'opinion' | 'discussion' | 'advantages' | 'problem' | 'direct';

type ModelAnswer = {
  id: EssayType;
  label: string;
  prompt: string;
  answer: { label: string; text: string; note: string }[];
  bandLogic: string[];
};

const MODEL_ANSWERS: ModelAnswer[] = [
  {
    id: 'opinion',
    label: 'Opinion essay',
    prompt:
      'Some people believe that university education should be free for everyone. To what extent do you agree or disagree?',
    answer: [
      {
        label: 'Introducción',
        text: 'Access to university can strongly influence a person’s future opportunities. I largely agree that higher education should be free, provided that governments also protect quality and admission standards.',
        note: 'Responde la pregunta con una postura graduada: largely agree, no una opinión vaga.',
      },
      {
        label: 'Cuerpo 1',
        text: 'The main reason is fairness. When tuition fees are very high, talented students from low-income families may avoid university or graduate with heavy debt. Free education would allow ability and effort, rather than family wealth, to determine who can become a doctor, engineer or teacher.',
        note: 'Desarrolla una razón central con consecuencia social concreta.',
      },
      {
        label: 'Cuerpo 2',
        text: 'However, free university should not mean unlimited places in every course. If governments pay the full cost, they must still fund laboratories, libraries and qualified lecturers. They could also ask graduates with high incomes to contribute later through progressive taxation, so the system remains sustainable.',
        note: 'Reconoce una limitación y la controla sin abandonar la tesis.',
      },
      {
        label: 'Conclusión',
        text: 'In conclusion, I agree that university should be free because it promotes equal opportunity, but this policy must be managed carefully to preserve quality and financial sustainability.',
        note: 'Cierra con la misma posición y resume los dos matices principales.',
      },
    ],
    bandLogic: [
      'Task Response: responde “to what extent” con una posición clara y matizada.',
      'Coherence: cada párrafo cumple una función visible.',
      'Lexical Resource: usa lenguaje académico natural sin sonar memorizado.',
    ],
  },
  {
    id: 'discussion',
    label: 'Discussion essay',
    prompt:
      'Some people think children should start learning a foreign language at primary school, while others believe this should begin at secondary school. Discuss both views and give your own opinion.',
    answer: [
      {
        label: 'Introducción',
        text: 'There is debate about the best age for children to begin studying a foreign language. While secondary school students may understand grammar more consciously, I believe primary school is usually the better time to start because younger children can build confidence and pronunciation earlier.',
        note: 'Menciona ambas posturas y deja la opinión propia desde el inicio.',
      },
      {
        label: 'Cuerpo 1',
        text: 'Those who prefer secondary school argue that older students are more mature. They can compare grammar with their first language, take notes and prepare for exams more independently. This may make formal language study more efficient, especially in schools with limited teaching hours.',
        note: 'Representa la postura contraria de forma justa, no como caricatura.',
      },
      {
        label: 'Cuerpo 2',
        text: 'Nevertheless, starting in primary school has stronger long-term benefits. Young children are often less embarrassed about making mistakes, so they can practise speaking more freely. They also have more years to hear sounds, songs and classroom routines in the new language, which can make later academic study easier.',
        note: 'Desarrolla la postura preferida y explica por qué pesa más.',
      },
      {
        label: 'Conclusión',
        text: 'Overall, although secondary school learners may handle grammar more analytically, I believe foreign languages should begin in primary school because early exposure builds confidence and gives students more time to develop.',
        note: 'Cierra comparando ambas posturas y reafirmando opinión.',
      },
    ],
    bandLogic: [
      'Task Response: discute ambos puntos de vista y da opinión propia.',
      'Coherence: Body 1 y Body 2 separan posturas con contraste claro.',
      'Grammar: combina oraciones complejas controladas con estructuras simples.',
    ],
  },
  {
    id: 'advantages',
    label: 'Advantages / disadvantages',
    prompt:
      'In many countries, more people are choosing to work remotely rather than travelling to an office every day. Do the advantages of this development outweigh the disadvantages?',
    answer: [
      {
        label: 'Introducción',
        text: 'Remote work has become a normal alternative to daily office attendance. Although it can reduce face-to-face communication, I believe its advantages outweigh its disadvantages because it saves time and increases access to employment.',
        note: 'Responde explícitamente “outweigh” y anticipa la comparación.',
      },
      {
        label: 'Cuerpo 1',
        text: 'A major advantage is the reduction in commuting. Employees who no longer spend hours travelling can use that time for focused work, family responsibilities or rest. Remote work also allows companies to hire people outside expensive city centres, which can benefit both skilled workers and employers.',
        note: 'Presenta beneficios distintos con consecuencias claras.',
      },
      {
        label: 'Cuerpo 2',
        text: 'The main drawback is weaker social connection. Some employees may feel isolated or find teamwork slower online. However, these problems can be reduced through hybrid schedules and clear communication routines, whereas the time and cost of commuting are daily burdens for many workers.',
        note: 'Reconoce el lado débil y explica por qué pesa menos.',
      },
      {
        label: 'Conclusión',
        text: 'In conclusion, remote work creates challenges for collaboration, but its benefits for time, flexibility and access to jobs are greater overall.',
        note: 'La conclusión mantiene la evaluación, no solo resume pros y contras.',
      },
    ],
    bandLogic: [
      'Task Response: compara peso relativo, no solo lista ventajas y desventajas.',
      'Coherence: usa concesión para manejar el lado opuesto.',
      'Vocabulary: trabaja con consecuencias concretas: commuting, access, isolation.',
    ],
  },
  {
    id: 'problem',
    label: 'Problem-solution',
    prompt:
      'In many cities, young people are finding it increasingly difficult to buy their first home. What problems does this cause, and what solutions can governments and communities offer?',
    answer: [
      {
        label: 'Introducción',
        text: 'Buying a first home has become unrealistic for many young adults in large cities. This can delay independence and increase inequality, so governments and communities need to expand affordable housing options.',
        note: 'Responde problemas y soluciones sin esperar hasta la conclusión.',
      },
      {
        label: 'Cuerpo 1',
        text: 'One problem is that young adults may postpone independent life. If rent and deposits consume most of their income, they may continue living with parents or delay starting families. Housing costs can also widen inequality because people with family support can buy earlier, while others remain renters for years.',
        note: 'Explica problemas específicos y sus efectos.',
      },
      {
        label: 'Cuerpo 2',
        text: 'A practical solution is to require new developments to include affordable units for first-time buyers. Local communities can also support cooperative housing, where residents share costs and reduce the need for large deposits. These measures target access to housing rather than only advising young people to save more.',
        note: 'Las soluciones tienen actor, acción y conexión con el problema.',
      },
      {
        label: 'Conclusión',
        text: 'In conclusion, unaffordable housing can delay independence and deepen social gaps. The best responses are policies and community models that make ownership genuinely accessible.',
        note: 'Cierra vinculando diagnóstico y medida.',
      },
    ],
    bandLogic: [
      'Task Response: cubre ambos elementos: problems and solutions.',
      'Coherence: Body 1 diagnostica; Body 2 propone medidas conectadas.',
      'Development: evita soluciones genéricas como “government should help”.',
    ],
  },
  {
    id: 'direct',
    label: 'Direct-question',
    prompt:
      'In many countries, people are spending less time cooking at home and more time eating prepared food. Why is this happening, and do you think this is a positive or negative development?',
    answer: [
      {
        label: 'Introducción',
        text: 'Home cooking is being replaced by ready-made meals in many societies. This is mainly happening because people have less free time and easier access to prepared food, and I believe the trend is mostly negative.',
        note: 'Contesta las dos preguntas desde la introducción.',
      },
      {
        label: 'Cuerpo 1',
        text: 'The first reason is pressure on people’s schedules. Many adults work long hours and commute across large cities, so cooking from basic ingredients can feel unrealistic. Prepared meals are also easier to obtain because delivery apps and supermarkets offer quick options at almost any time.',
        note: 'Responde “why is this happening?” con causas concretas.',
      },
      {
        label: 'Cuerpo 2',
        text: 'Despite the convenience, I consider this development negative overall. People who depend on prepared food may consume more salt, sugar and processed ingredients. Families may also lose basic cooking skills, which makes healthy eating harder for the next generation.',
        note: 'Responde “positive or negative?” con evaluación clara.',
      },
      {
        label: 'Conclusión',
        text: 'In conclusion, prepared food is becoming more common because modern life is busy and convenience food is widely available. However, the effect is mainly negative because it can damage health and weaken everyday food skills.',
        note: 'La conclusión vuelve a ambas preguntas, no solo a la opinión.',
      },
    ],
    bandLogic: [
      'Task Response: no deja ninguna pregunta sin contestar.',
      'Coherence: cada cuerpo responde una parte distinta del prompt.',
      'Conclusion: resume causa y evaluación final.',
    ],
  },
];

const WEAK_STRONG = [
  {
    weak: 'Nowadays education is very important and everybody has different opinions. I think it is good because students need it and the government should do something.',
    strong:
      'University education should be free because high tuition fees prevent capable low-income students from entering professional careers.',
    why:
      'La versión fuerte responde el prompt, tiene posición y razón específica. La débil usa frases generales que podrían servir para casi cualquier tema.',
  },
  {
    weak: 'There are many advantages and disadvantages and both are important. It depends on the person and society.',
    strong:
      'Although remote work can reduce team interaction, its benefits outweigh this drawback because it saves daily commuting time and widens access to jobs.',
    why:
      'La versión fuerte evalúa peso relativo. La débil evita decidir, lo cual falla en prompts tipo outweigh.',
  },
];

const CHECKLIST = [
  '¿La introducción responde exactamente la instrucción?',
  '¿Cada párrafo cuerpo tiene una idea principal visible?',
  '¿Cada idea incluye explicación o consecuencia, no solo una etiqueta?',
  '¿La conclusión responde el prompt sin introducir información nueva?',
  '¿El lenguaje académico suena natural y no memorizado?',
  '¿El ensayo podría adaptarse a otro prompt sin reescribirlo todo? Si sí, está demasiado genérico.',
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/opinion', label: 'Opinion essay' },
  { href: '/practica/ielts/academic/writing/task2/discussion', label: 'Discussion essay' },
  { href: '/practica/ielts/academic/writing/task2/advantages-disadvantages', label: 'Advantages/disadvantages' },
  { href: '/practica/ielts/academic/writing/task2/problem-solution', label: 'Problem-solution' },
  { href: '/practica/ielts/academic/writing/task2/direct-question', label: 'Direct-question' },
  { href: '/practica/ielts/academic/writing/task2/tipo-ensayo', label: 'Tipo de ensayo' },
  { href: '/practica/ielts/academic/writing/task2/tarea-completa', label: 'Tarea completa' },
];

export default function ModelAnswersClient({ faqs }: { faqs: Faq[] }) {
  const [selectedId, setSelectedId] = useState<EssayType>('opinion');
  const [checklist, setChecklist] = useState<Set<number>>(new Set());

  const selected = useMemo(
    () => MODEL_ANSWERS.find((answer) => answer.id === selectedId) ?? MODEL_ANSWERS[0],
    [selectedId],
  );

  const checklistCount = checklist.size;

  function toggleChecklist(index: number) {
    setChecklist((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <main className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task2" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
              Task 2
            </Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Model answers</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 2
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            IELTS Writing Task 2 model answers explicados
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 760 }}>
            Estudia modelos originales de Task 2 con anotaciones: qué responde cada párrafo, por qué funciona y cómo evitar respuestas genéricas.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Writing Task 2 se evalúa con criterios oficiales de respuesta a la tarea, coherencia, vocabulario y gramática. Esta página no publica respuestas oficiales de IELTS.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> usamos model answers como laboratorio: lees el ensayo, miras las anotaciones y luego aplicas el checklist a tu propio texto.
            </p>
          </div>

          <section aria-labelledby="selector-heading">
            <h2 id="selector-heading" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Banco de model answers por tipo de ensayo
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {MODEL_ANSWERS.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  className={answer.id === selectedId ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                  onClick={() => setSelectedId(answer.id)}
                  style={{ fontSize: '0.82rem' }}
                >
                  {answer.label}
                </button>
              ))}
            </div>

            <article className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
              <p style={{ margin: '0 0 0.4rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Practice prompt
              </p>
              <p style={{ margin: '0 0 1rem', color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.95rem' }}>{selected.prompt}</p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {selected.answer.map((part) => (
                  <section key={part.label} style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '0.85rem' }}>
                    <h3 style={{ margin: '0 0 0.45rem', color: '#0f3d8c', fontSize: '0.95rem' }}>{part.label}</h3>
                    <p style={{ margin: '0 0 0.55rem', color: 'var(--ink)', lineHeight: 1.7, fontSize: '0.92rem' }}>{part.text}</p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Por qué funciona:</strong> {part.note}
                    </p>
                  </section>
                ))}
              </div>
            </article>

            <div className="wl-card" style={{ padding: '1rem', borderRadius: 8, marginTop: '0.85rem', background: 'rgba(15,61,140,0.05)' }}>
              <h3 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Lectura Band 7 del modelo seleccionado</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                {selected.bandLogic.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="comparison-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="comparison-heading" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Comparación débil vs fuerte
            </h2>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {WEAK_STRONG.map((item, index) => (
                <article key={item.strong} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.65rem', fontSize: '0.98rem' }}>Ejemplo {index + 1}</h3>
                  <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    <div style={{ border: '1px solid rgba(185,28,28,0.22)', borderRadius: 8, padding: '0.85rem', background: 'rgba(185,28,28,0.05)' }}>
                      <p style={{ margin: '0 0 0.35rem', color: '#991b1b', fontWeight: 800, fontSize: '0.78rem' }}>Débil</p>
                      <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{item.weak}</p>
                    </div>
                    <div style={{ border: '1px solid rgba(4,120,87,0.25)', borderRadius: 8, padding: '0.85rem', background: 'rgba(4,120,87,0.06)' }}>
                      <p style={{ margin: '0 0 0.35rem', color: '#047857', fontWeight: 800, fontSize: '0.78rem' }}>Fuerte</p>
                      <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{item.strong}</p>
                    </div>
                  </div>
                  <p style={{ margin: '0.7rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Por qué importa:</strong> {item.why}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="checklist-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="checklist-heading" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Checklist WeLearn para revisar tu ensayo
            </h2>
            <div className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
              <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                Marca cada punto mientras revisas tu respuesta. Esto no reemplaza los criterios oficiales, pero te ayuda a detectar problemas antes de entregar.
              </p>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {CHECKLIST.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChecklist(index)}
                    style={{
                      textAlign: 'left',
                      borderRadius: 8,
                      border: checklist.has(index) ? '2px solid rgba(4,120,87,0.5)' : '1px solid var(--line-soft)',
                      background: checklist.has(index) ? 'rgba(4,120,87,0.08)' : 'var(--bg-2)',
                      color: 'var(--ink)',
                      padding: '0.75rem 0.85rem',
                      cursor: 'pointer',
                      lineHeight: 1.5,
                    }}
                  >
                    {checklist.has(index) ? '✓ ' : ''}{item}
                  </button>
                ))}
              </div>
              <p style={{ margin: '0.85rem 0 0', color: 'var(--ink)', fontWeight: 700, fontSize: '0.9rem' }}>
                Progreso de revisión: {checklistCount} de {CHECKLIST.length}
              </p>
            </div>
          </section>

          <section aria-labelledby="links-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Sigue practicando Task 2
            </h2>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {INTERNAL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Preguntas frecuentes
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.96rem' }}>{faq.question}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
