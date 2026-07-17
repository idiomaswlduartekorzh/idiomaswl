'use client';

import Link from 'next/link';
import { Task2EssayArchitectureVisual } from './Task2VisualLab';

export const TASK2_ESSAY_TYPES = [
  {
    name: 'Opinion',
    route: '/practica/ielts/academic/writing/task2/opinion',
    signal: 'To what extent do you agree or disagree? / Do you agree or disagree?',
    task: 'Tomar una posición clara y defenderla durante todo el ensayo.',
    lego: ['Paráfrasis del tema', 'Tesis con posición', 'Body 1: razón principal', 'Body 2: segunda razón o contraargumento refutado', 'Conclusión con postura'],
    body1: 'Topic sentence con tu razón más fuerte. Explica el mecanismo y añade ejemplo.',
    body2: 'Otra razón compatible con tu tesis o una concesión breve seguida de refutación.',
    trap: 'Tratar ambos lados por igual como si fuera Discussion.',
  },
  {
    name: 'Discussion',
    route: '/practica/ielts/academic/writing/task2/discussion',
    signal: 'Discuss both views and give your own opinion.',
    task: 'Explicar ambas posturas y luego evaluar cuál es más convincente.',
    lego: ['Paráfrasis del debate', 'Tesis balanceada con opinión final', 'Body 1: View A', 'Body 2: View B + tu evaluación', 'Conclusión con opinión'],
    body1: 'Presenta una postura con respeto, razón y ejemplo.',
    body2: 'Presenta la otra postura y conecta con tu opinión personal.',
    trap: 'Olvidar tu opinión o darla solo como frase decorativa.',
  },
  {
    name: 'Problem–Solution',
    route: '/practica/ielts/academic/writing/task2/problem-solution',
    signal: 'What are the causes/problems? What measures/solutions can be taken?',
    task: 'Diagnosticar causas o problemas y proponer soluciones conectadas.',
    lego: ['Paráfrasis del problema', 'Tesis de diagnóstico + respuesta', 'Body 1: causas/problemas', 'Body 2: soluciones que responden a esas causas', 'Conclusión'],
    body1: 'Nombra 1-2 causas concretas y muestra sus consecuencias.',
    body2: 'Propón soluciones que ataquen exactamente esas causas.',
    trap: 'Soluciones genéricas que no responden al diagnóstico.',
  },
  {
    name: 'Advantages–Disadvantages',
    route: '/practica/ielts/academic/writing/task2/advantages-disadvantages',
    signal: 'Discuss the advantages and disadvantages. / Do the advantages outweigh the disadvantages?',
    task: 'Evaluar pros y contras de una tendencia o desarrollo.',
    lego: ['Paráfrasis del desarrollo', 'Tesis con balance u outweigh', 'Body 1: ventajas', 'Body 2: desventajas + evaluación', 'Conclusión con balance'],
    body1: 'Explica beneficios reales, no una lista de palabras positivas.',
    body2: 'Explica costos o riesgos y decide qué lado pesa más si el prompt lo pide.',
    trap: 'Enumerar pros/contras sin responder si un lado supera al otro.',
  },
  {
    name: 'Direct Questions',
    route: '/practica/ielts/academic/writing/task2/direct-question',
    signal: 'Why is this happening? Is this positive or negative? / What are the reasons? What effects does this have?',
    task: 'Responder dos preguntas explícitas sin dejar ninguna incompleta.',
    lego: ['Paráfrasis del tema', 'Tesis que anuncia Q1 + Q2', 'Body 1: respuesta a Q1', 'Body 2: respuesta a Q2', 'Conclusión que une ambas'],
    body1: 'El topic sentence debe mostrar que responde la primera pregunta.',
    body2: 'El topic sentence debe mostrar que responde la segunda pregunta.',
    trap: 'Convertir la segunda pregunta en soluciones cuando pide evaluación.',
  },
];

export default function Task2EssayTypeGuide() {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />Tipos de pregunta en IELTS Writing Task 2
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(15,61,140,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            Task 2 es un ensayo de 250+ palabras en 40 minutos, pero no todos los prompts piden el mismo esqueleto.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            La instrucción final decide la estructura. Si identificas mal el tipo, puedes escribir bonito y aun así perder
            Task Response. WeLearn lo entrena como bloques Lego: cada tipo de pregunta cambia la tesis, los cuerpos y la conclusión.
          </p>
        </div>
        <div style={{ padding: '1rem 1.15rem', borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
          <p style={{ margin: '0 0 0.7rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Visual architecture: choose the right essay skeleton</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {TASK2_ESSAY_TYPES.map((type) => (
              <div key={type.name} style={{ padding: '0.65rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg)' }}>
                <Task2EssayArchitectureVisual type={type.name as Parameters<typeof Task2EssayArchitectureVisual>[0]['type']} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
          {TASK2_ESSAY_TYPES.map((type) => (
            <article key={type.name} style={{ padding: '1rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.98rem' }}>{type.name}</h3>
              <p style={{ margin: '0 0 0.45rem', color: '#0f3d8c', fontWeight: 800, fontSize: '0.76rem', fontFamily: 'var(--mono)', lineHeight: 1.45 }}>
                {type.signal}
              </p>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong>Objetivo:</strong> {type.task}
              </p>
              <ol style={{ margin: '0 0 0.6rem', paddingLeft: '1.05rem', color: 'var(--ink-2)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                {type.lego.map((block) => <li key={block}>{block}</li>)}
              </ol>
              <p style={{ margin: '0 0 0.55rem', color: '#dc2626', lineHeight: 1.45, fontSize: '0.78rem' }}>
                <strong>Trampa:</strong> {type.trap}
              </p>
              <Link href={type.route} style={{ color: '#0f3d8c', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>
                Practicar este tipo →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
