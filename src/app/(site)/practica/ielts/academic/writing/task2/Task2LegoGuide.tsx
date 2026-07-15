'use client';

import Link from 'next/link';

const LEGO_BLOCKS = [
  {
    n: 1,
    name: 'Leer el prompt',
    route: '/practica/ielts/academic/writing/task2/tipo-ensayo',
    skill: 'Detectar tipo de pregunta e instrucción final.',
    output: 'Sé si debo opinar, discutir, diagnosticar, evaluar pros/contras o responder dos preguntas.',
  },
  {
    n: 2,
    name: 'Paraphrasing',
    route: '/practica/ielts/academic/writing/task2/introduccion',
    skill: 'Reescribir el tema sin copiar frases largas.',
    output: 'Primera oración de la introducción.',
  },
  {
    n: 3,
    name: 'Tomar posición',
    route: '/practica/ielts/academic/writing/task2/introduccion',
    skill: 'Decidir stance, balance u hoja de ruta según el tipo.',
    output: 'Tesis clara y compatible con la pregunta.',
  },
  {
    n: 4,
    name: 'Body 1',
    route: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    skill: 'Topic sentence + explicación + ejemplo + cierre.',
    output: 'Primer argumento o primera pregunta respondida.',
  },
  {
    n: 5,
    name: 'Body 2',
    route: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    skill: 'Segundo argumento, postura opuesta, solución o Q2.',
    output: 'Segundo bloque de desarrollo sin perder coherencia.',
  },
  {
    n: 6,
    name: 'Linking words',
    route: '/practica/ielts/academic/writing/task2/linking-language',
    skill: 'Conectar función lógica: contraste, causa, ejemplo, consecuencia, conclusión.',
    output: 'Cohesión natural, no una cadena de conectores memorizados.',
  },
  {
    n: 7,
    name: 'Syllogism',
    route: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    skill: 'Premisa general + caso específico + conclusión controlada.',
    output: 'Argumentos que no saltan de idea en idea.',
  },
  {
    n: 8,
    name: 'Conclusión',
    route: '/practica/ielts/academic/writing/task2/conclusion',
    skill: 'Reformular tesis y cerrar sin información nueva.',
    output: 'Último párrafo breve y evaluativo.',
  },
  {
    n: 9,
    name: 'Lectura crítica final',
    route: '/practica/ielts/academic/writing/task2/tarea-completa',
    skill: 'Leer como examinador: instrucción, postura, desarrollo, cohesión, errores.',
    output: 'Corrección rápida antes de entregar.',
  },
  {
    n: 10,
    name: 'Tarea completa',
    route: '/practica/ielts/academic/writing/task2/tarea-completa',
    skill: '40 minutos, 250+ palabras, revisión global.',
    output: 'Ensayo completo con checklist y modelo.',
  },
];

const LINKING_FUNCTIONS = [
  ['Adición', 'moreover, furthermore, in addition, likewise'],
  ['Contraste', 'however, nevertheless, whereas, by contrast'],
  ['Causa', 'because, since, as a result of, due to'],
  ['Consecuencia', 'therefore, consequently, hence, as a result'],
  ['Ejemplo', 'for example, for instance, such as, this can be seen in'],
  ['Concesión', 'although, even though, despite this, admittedly'],
  ['Conclusión', 'overall, in conclusion, ultimately, for these reasons'],
];

const SYLLOGISM_MOVES = [
  {
    label: 'Premisa general',
    example: 'When children spend most of their free time online, they have fewer opportunities to practise face-to-face communication.',
  },
  {
    label: 'Caso específico',
    example: 'For example, a teenager who studies and socialises mainly through a screen may avoid group activities at school.',
  },
  {
    label: 'Conclusión lógica',
    example: 'As a result, excessive screen time can weaken social confidence rather than simply change the medium of interaction.',
  },
];

const SENTENCE_TYPES = [
  {
    label: 'Claim sentence',
    function: 'Presenta el punto central del párrafo.',
    example: 'Public transport is a more efficient use of urban space than private cars.',
  },
  {
    label: 'Complex cause sentence',
    function: 'Explica por qué ocurre algo usando because, since, as o due to.',
    example: 'Because buses carry many passengers in limited space, they reduce congestion more effectively than road expansion.',
  },
  {
    label: 'Concession sentence',
    function: 'Reconoce una objeción sin abandonar tu postura.',
    example: 'Although road construction may relieve traffic temporarily, it often encourages more car use in the long term.',
  },
  {
    label: 'Result sentence',
    function: 'Cierra una cadena lógica con therefore, as a result o consequently.',
    example: 'Consequently, governments should prioritise mass transit when planning urban infrastructure.',
  },
];

export default function Task2LegoGuide() {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />Sistema Lego de Writing Task 2
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(5,150,105,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            Un ensayo deja de ser intimidante cuando cada oración tiene función.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            Piensa cada parte como un bloque: si el bloque no cumple una función, sobra. Si falta un bloque, el ensayo se cae.
            Este flujo conecta los documentos de writing, conjunctions y syllogism con práctica IELTS real.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {LEGO_BLOCKS.map((block) => (
            <article key={block.name} style={{ padding: '0.95rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              <p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem' }}>
                BLOQUE {block.n}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.96rem' }}>{block.name}</h3>
              <p style={{ margin: '0 0 0.45rem', color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{block.skill}</p>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.45, fontSize: '0.76rem' }}>
                <strong>Resultado:</strong> {block.output}
              </p>
              <Link href={block.route} style={{ color: '#0f3d8c', fontWeight: 800, fontSize: '0.8rem', textDecoration: 'none' }}>
                Entrenar →
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginTop: '1rem' }}>
        <article style={{ padding: '1rem', borderRadius: 8, border: '1px solid rgba(15,61,140,0.18)', background: 'rgba(15,61,140,0.05)' }}>
          <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.98rem' }}>Conjunctions y linking phrases por función</h3>
          {LINKING_FUNCTIONS.map(([fn, words]) => (
            <p key={fn} style={{ margin: '0 0 0.35rem', color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.45 }}>
              <strong>{fn}:</strong> <span style={{ fontFamily: 'var(--mono)', color: '#0f3d8c' }}>{words}</span>
            </p>
          ))}
        </article>
        <article style={{ padding: '1rem', borderRadius: 8, border: '1px solid rgba(124,58,237,0.18)', background: 'rgba(124,58,237,0.05)' }}>
          <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.98rem' }}>Syllogism aplicado al Body paragraph</h3>
          {SYLLOGISM_MOVES.map((move) => (
            <div key={move.label} style={{ marginBottom: '0.55rem' }}>
              <p style={{ margin: '0 0 0.2rem', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.76rem' }}>{move.label}</p>
              <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{move.example}</p>
            </div>
          ))}
        </article>
        <article style={{ padding: '1rem', borderRadius: 8, border: '1px solid rgba(217,119,6,0.2)', background: 'rgba(217,119,6,0.05)' }}>
          <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.98rem' }}>Tipos de oración para construir argumentos</h3>
          {SENTENCE_TYPES.map((sentence) => (
            <div key={sentence.label} style={{ marginBottom: '0.55rem' }}>
              <p style={{ margin: '0 0 0.2rem', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.76rem' }}>{sentence.label}</p>
              <p style={{ margin: '0 0 0.18rem', color: 'var(--muted)', lineHeight: 1.45, fontSize: '0.78rem' }}>{sentence.function}</p>
              <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{sentence.example}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
