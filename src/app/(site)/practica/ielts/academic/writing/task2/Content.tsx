'use client';

import Link from 'next/link';
import Task2EssayTypeGuide from './Task2EssayTypeGuide';
import Task2LegoGuide from './Task2LegoGuide';

const SKILLS = [
  {
    id: 'tipo-ensayo',
    n: 1,
    label: 'Tipo de Ensayo',
    icon: '🔍',
    desc: 'Identifica si el enunciado pide opinión, discusión, problema-solución, ventajas/desventajas o dos preguntas. El error más costoso del Task 2.',
    href: '/practica/ielts/academic/writing/task2/tipo-ensayo',
    tag: '5 tipos · práctica guiada',
  },
  {
    id: 'introduccion',
    n: 2,
    label: 'Introducción',
    icon: '✍️',
    desc: 'Parafrasea el tema sin copiar + escribe tu tesis en menos de 60 palabras. El examinador evalúa esto primero.',
    href: '/practica/ielts/academic/writing/task2/introduccion',
    tag: 'Paraphrase + Thesis',
  },
  {
    id: 'paraphrasing',
    n: 3,
    label: 'Paraphrasing',
    icon: '🔁',
    desc: 'Reescribe el tema con precisión: cambia vocabulario, estructura y enfoque sin alterar el significado.',
    href: '/practica/ielts/academic/writing/task2/introduccion',
    tag: 'Prompt → Topic',
  },
  {
    id: 'position',
    n: 4,
    label: 'Tomar posición',
    icon: '🎯',
    desc: 'Aprende a decidir postura, balance u hoja de ruta según el tipo de pregunta.',
    href: '/practica/ielts/academic/writing/task2/introduccion',
    tag: 'Stance · Thesis',
  },
  {
    id: 'parrafos-cuerpo',
    n: 5,
    label: 'Párrafos de Cuerpo',
    icon: '🧱',
    desc: 'Estructura TEEL: Topic sentence → Explanation → Example → Link back. Sin esto tu ensayo carece de cohesión.',
    href: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    tag: 'TEEL · 3 ejercicios',
  },
  {
    id: 'linking-language',
    n: 6,
    label: 'Linking Language',
    icon: '🔗',
    desc: 'Conectores por función: adición, contraste, causa-efecto, ejemplo y conclusión. Lo que sube de Band 5 a Band 7.',
    href: '/practica/ielts/academic/writing/task2/linking-language',
    tag: '5 categorías · Gap fill',
  },
  {
    id: 'syllogism',
    n: 7,
    label: 'Lógica y syllogism',
    icon: '🧠',
    desc: 'Convierte ideas en argumentos: premisa general, caso específico y conclusión lógica.',
    href: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    tag: 'Premise · Therefore',
  },
  {
    id: 'conclusion',
    n: 8,
    label: 'Conclusión',
    icon: '🏁',
    desc: 'Retoma la tesis con otras palabras y resume los puntos principales. Nunca introduzcas información nueva.',
    href: '/practica/ielts/academic/writing/task2/conclusion',
    tag: 'Restate + Summarize',
  },
  {
    id: 'critical-review',
    n: 9,
    label: 'Lectura crítica final',
    icon: '🔎',
    desc: 'Lee tu ensayo como examinador: instrucción respondida, posición consistente, conectores funcionales y errores visibles.',
    href: '/practica/ielts/academic/writing/task2/tarea-completa',
    tag: 'Final read',
  },
  {
    id: 'tarea-completa',
    n: 10,
    label: 'Tarea Completa',
    icon: '⏱️',
    desc: 'Práctica real: 40 minutos, 250+ palabras, auto-evaluación con rúbrica Band 1–9 y respuesta modelo.',
    href: '/practica/ielts/academic/writing/task2/tarea-completa',
    tag: 'Full Task · 40 min',
  },
];

const ESSAY_TYPES = [
  {
    href: '/practica/ielts/academic/writing/task2/opinion',
    label: 'Opinion essay',
    desc: 'Practica agree/disagree y to what extent con tesis clara, argumentos y contraargumento controlado.',
  },
  {
    href: '/practica/ielts/academic/writing/task2/discussion',
    label: 'Discussion essay',
    desc: 'Practica discuss both views and give your own opinion con balance, desarrollo de ambas posturas y cierre evaluativo.',
  },
  {
    href: '/practica/ielts/academic/writing/task2/advantages-disadvantages',
    label: 'Advantages and disadvantages',
    desc: 'Practica ventajas, desventajas y preguntas outweigh con evaluación clara de qué lado pesa más.',
  },
  {
    href: '/practica/ielts/academic/writing/task2/problem-solution',
    label: 'Problem-solution essay',
    desc: 'Practica problemas, causas y soluciones con desarrollo específico y conexión clara entre diagnóstico y medida.',
  },
  {
    href: '/practica/ielts/academic/writing/task2/direct-question',
    label: 'Direct-question essay',
    desc: 'Practica two-part questions con respuestas visibles para cada pregunta y una estructura que no deja mitades sin contestar.',
  },
  {
    href: '/practica/ielts/academic/writing/task2/model-answers',
    label: 'Model answers explicados',
    desc: 'Estudia modelos originales con anotaciones, comparación débil/fuerte y checklist de revisión.',
  },
];

export default function Task2HubPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Writing</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic / Writing / Task 2</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />IELTS Academic Writing Task 2</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: 0, margin: '0 0 0.5rem', fontWeight: 700 }}>
            Writing Task 2
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>
            Ensayo argumentativo de 250+ palabras en 40 minutos. Vale el doble que el Task 1.
            Domina las sub-habilidades que separan Band 5 de Band 7+: leer el prompt, construir tesis,
            desarrollar argumentos y revisar el ensayo como examinador.
          </p>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['Opinion', 'Discussion', 'Problem-Solution', 'Advantages', 'Two-part question'].map(t => (
              <span key={t} style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Formato oficial vs estrategia WeLearn</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS Academic Writing Task 2 pide un ensayo de al menos 250 palabras. WeLearn separa el entrenamiento
                en tipo de prompt, tesis, párrafos de cuerpo, linking language, conclusión y práctica completa para que
                el formato oficial no se confunda con categorías pedagógicas.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#f8fafc' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Respuesta explicada</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Las rutas y el banco de prompts explican por qué una tesis responde la instrucción, cómo progresa un
                párrafo y qué trampas aparecen cuando se ignora una parte del prompt.
              </p>
            </article>
          </div>

          <Task2EssayTypeGuide />
          <Task2LegoGuide />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {SKILLS.map(sk => (
              <Link key={sk.id} href={sk.href} style={{ textDecoration: 'none' }}>
                <div className="wl-card" style={{ padding: '1.25rem', height: '100%', borderTop: '3px solid #0f3d8c', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{sk.icon}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Sub-habilidad {sk.n}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{sk.label}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6, flex: 1 }}>{sk.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.15)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{sk.tag}</span>
                    <span style={{ fontSize: '0.82rem', color: '#0f3d8c', fontWeight: 700 }}>Practicar →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
              Práctica por tipo de ensayo
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {ESSAY_TYPES.map(type => (
                <Link key={type.href} href={type.href} style={{ textDecoration: 'none' }}>
                  <div className="wl-card" style={{ padding: '1.1rem', height: '100%', borderTop: '3px solid #0f3d8c' }}>
                    <p style={{ margin: '0 0 0.35rem', fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Essay type
                    </p>
                    <h3 style={{ margin: '0 0 0.4rem', fontWeight: 700, fontSize: '1.02rem', color: 'var(--ink)' }}>
                      {type.label}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                      {type.desc}
                    </p>
                    <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.82rem', color: '#0f3d8c', fontWeight: 700 }}>Practicar →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
