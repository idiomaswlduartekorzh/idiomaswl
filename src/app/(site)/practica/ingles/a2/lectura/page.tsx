'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#0066cc';

interface ReadingText {
  id: number;
  title: string;
  topic: string;
  words: number;
  grammar: string;
  text: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[];
  openQ: string;
  production: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'A Weekend Trip', topic: 'Viajes y turismo', words: 95, grammar: 'Past simple',
    text: "Last weekend, Maria and her friends decided to visit Cartagena. They travelled by bus and arrived on Friday evening. On Saturday morning, they walked around the old city and took many photos. The colonial buildings were beautiful and the food was delicious. They tried fresh seafood at a local restaurant. In the afternoon, they went to the beach and swam in the warm Caribbean sea. On Sunday, they visited a local market and bought some souvenirs. They had a wonderful time and planned to return next year.",
    vocab: { decided:'decidieron', travelled:'viajaron', arrived:'llegaron', walked:'caminaron', took:'tomaron', colonial:'colonial', delicious:'delicioso', tried:'probaron', seafood:'mariscos', swam:'nadaron', visited:'visitaron', souvenirs:'recuerdos/souvenirs', wonderful:'maravilloso', planned:'planearon' },
    preQ: [
      { q: '¿Has viajado a alguna ciudad costera colombiana?', opts: ['Sí, a Cartagena', 'Sí, a otra ciudad', 'Nunca he ido a la costa'], a: -1 },
      { q: '¿Cómo prefieres viajar?', opts: ['En bus', 'En avión', 'En carro propio'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "decided"?', cat: 'Vocabulario', opts: ['decidieron','llegaron','viajaron','planearon'], a: 0, fb: '"Decided" = decidieron. Pasado de "decide" (verbo regular: decide→decided).' },
      { q: '¿Qué comieron en el restaurante?', cat: 'Comprensión', opts: ['Pollo frito','Mariscos frescos','Arepas','Pizza'], a: 1, fb: '"They tried fresh seafood at a local restaurant" — comieron mariscos frescos.' },
      { q: '¿Cómo viajaron a Cartagena?', cat: 'Comprensión', opts: ['En avión','En tren','En bus','En carro'], a: 2, fb: '"They travelled by bus" — viajaron en bus.' },
      { q: '¿Qué hicieron el sábado por la mañana?', cat: 'Comprensión', opts: ['Fueron a la playa','Visitaron el mercado','Caminaron por la ciudad vieja','Compraron souvenirs'], a: 2, fb: '"On Saturday morning, they walked around the old city" — caminaron por la ciudad vieja.' },
      { q: '¿Qué compraron el domingo?', cat: 'Comprensión', opts: ['Ropa','Comida','Souvenirs','Libros'], a: 2, fb: '"On Sunday, they visited a local market and bought some souvenirs" — compraron souvenirs.' },
      { q: '"They swam in the warm Caribbean sea" — ¿qué tiempo verbal se usa?', cat: 'Gramática', opts: ['Presente simple','Pasado simple irregular','Pasado continuo','Futuro'], a: 1, fb: '"Swam" es el pasado irregular de "swim" (swim→swam). Pasado simple irregular.' },
    ],
    openQ: 'Describe un viaje que hiciste en el pasado en 3-4 oraciones. Usa verbos en pasado: went, visited, ate, saw, bought...',
    production: 'Usa: "Last [week/month/year], I went to ___ with ___. We visited ___ and ___. The food/weather was ___."',
  },
  {
    id: 2, title: 'Job Interview', topic: 'Trabajo y empleo', words: 88, grammar: 'Past simple + comparative',
    text: "Carlos had his first job interview last Monday. He woke up early, wore his best suit and arrived fifteen minutes before the appointment. The interviewer asked him about his previous experience and his skills. Carlos explained that he worked as an intern for two years at a marketing company. He said the new position was more interesting than his last job because it offered better opportunities for growth. The manager was friendly and the office looked modern and comfortable. Carlos felt nervous at first, but later he relaxed and answered all the questions confidently. He is now waiting for the results.",
    vocab: { interview:'entrevista', wore:'usó/llevó puesto', appointment:'cita', interviewer:'entrevistador', previous:'previo', experience:'experiencia', skills:'habilidades', explained:'explicó', intern:'practicante/pasante', position:'puesto', opportunities:'oportunidades', growth:'crecimiento', confidently:'con confianza', nervous:'nervioso', relaxed:'se relajó' },
    preQ: [
      { q: '¿Has tenido alguna entrevista de trabajo?', opts: ['Sí, varias', 'Solo una', 'Todavía no'], a: -1 },
      { q: '¿Qué te pone nervioso/a en una entrevista?', opts: ['Hablar de mis debilidades', 'El idioma', 'Presentarme a extraños'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "skills"?', cat: 'Vocabulario', opts: ['estudios','habilidades','experiencias','referencias'], a: 1, fb: '"Skills" = habilidades o competencias. "Communication skills", "technical skills" son ejemplos comunes.' },
      { q: '¿Cuándo fue la entrevista?', cat: 'Comprensión', opts: ['El viernes','El lunes pasado','El martes','Ayer'], a: 1, fb: '"Carlos had his first job interview last Monday" — fue el lunes pasado.' },
      { q: '¿Cuánto tiempo trabajó Carlos como practicante?', cat: 'Comprensión', opts: ['Un año','Tres años','Dos años','Seis meses'], a: 2, fb: '"He worked as an intern for two years" — trabajó dos años como practicante.' },
      { q: '¿Cómo se sintió Carlos al principio?', cat: 'Comprensión', opts: ['Relajado','Confiado','Nervioso','Aburrido'], a: 2, fb: '"Carlos felt nervous at first" — se sintió nervioso al principio.' },
      { q: 'En "the new position was more interesting than his last job", ¿qué estructura es "more interesting than"?', cat: 'Gramática', opts: ['Superlativo','Comparativo de adjetivo largo','Comparativo de adjetivo corto','Presente continuo'], a: 1, fb: '"More interesting than" — comparativo de adjetivo largo (3+ sílabas): more + adjective + than.' },
      { q: '¿Qué significa "wore" en el texto?', cat: 'Vocabulario', opts: ['compró','usó/llevó puesto','guardó','encontró'], a: 1, fb: '"Wore" es el pasado de "wear" (irregular: wear→wore→worn). "Llevó puesto" su mejor traje.' },
    ],
    openQ: 'Describe una situación en el pasado cuando tuviste que hacer algo difícil. ¿Cómo te sentiste antes y después?',
    production: 'Usa pasado simple y comparativos: "I felt ___ at first, but then I ___. It was ___ than I expected."',
  },
  {
    id: 3, title: 'Two Friends, Two Opinions', topic: 'Opiniones y tiempo libre', words: 100, grammar: 'Comparative + Present continuous for future',
    text: "Sofia and Lucia are planning their holiday. Sofia thinks the mountains are more peaceful than the beach. She says mountain air is cleaner and cooler than sea air. She also believes hiking is more interesting than lying on the sand. Lucia disagrees. She thinks the beach is better because the weather is warmer, the activities are more exciting, and she can relax more easily. They are now comparing prices online. Mountain cabins are cheaper than beach hotels but the journey is longer. They are meeting their travel agent tomorrow to make a final decision. Both agree that a holiday together will be more fun than going alone.",
    vocab: { planning:'planeando', holiday:'vacaciones', peaceful:'tranquilo', cleaner:'más limpio', hiking:'senderismo', lying:'acostarse/estar tumbado', disagrees:'no está de acuerdo', exciting:'emocionante', comparing:'comparando', cabins:'cabañas', cheaper:'más barato', journey:'viaje/trayecto', decision:'decisión', together:'juntos', agree:'están de acuerdo' },
    preQ: [
      { q: '¿Prefieres vacaciones en la montaña o en la playa?', opts: ['Montaña', 'Playa', 'Las dos'], a: -1 },
      { q: '¿Con quién planeas usualmente tus vacaciones?', opts: ['Solo/a', 'Con amigos', 'Con familia'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "peaceful"?', cat: 'Vocabulario', opts: ['emocionante','tranquilo','barato','moderno'], a: 1, fb: '"Peaceful" = tranquilo, en paz. "The mountains are more peaceful" = las montañas son más tranquilas.' },
      { q: '¿Qué piensa Sofia sobre las montañas?', cat: 'Comprensión', opts: ['Son más caras','Son más tranquilas que la playa','Son más emocionantes','Son más calientes'], a: 1, fb: '"Sofia thinks the mountains are more peaceful than the beach" — más tranquilas que la playa.' },
      { q: '¿Por qué prefiere Lucia la playa?', cat: 'Comprensión', opts: ['Es más barata','Es más tranquila','El clima es más cálido y las actividades más emocionantes','Está más cerca'], a: 2, fb: '"She thinks the beach is better because the weather is warmer, the activities are more exciting".' },
      { q: '¿Qué están comparando ahora?', cat: 'Comprensión', opts: ['Hoteles de lujo','Precios en línea','Restaurantes','Vuelos'], a: 1, fb: '"They are now comparing prices online" — están comparando precios en internet.' },
      { q: '¿A quién van a ver mañana?', cat: 'Comprensión', opts: ['A sus familias','A un médico','A su agente de viajes','A sus jefes'], a: 2, fb: '"They are meeting their travel agent tomorrow" — van a ver a su agente de viajes.' },
      { q: '"They are meeting their travel agent tomorrow" usa present continuous para...', cat: 'Gramática', opts: ['Una acción ahora mismo','Un arreglo futuro confirmado','Una acción habitual','El pasado'], a: 1, fb: 'Present continuous para un arreglo futuro ya acordado (tienen cita con el agente). No es algo que pasa ahora.' },
    ],
    openQ: 'Compara dos tipos de vacaciones usando comparativos. ¿Cuál prefieres y por qué?',
    production: 'Usa: "___ is more ___ than ___. I prefer ___ because ___. Also, ___ is cheaper/better/more exciting."',
  },
  {
    id: 4, title: 'A Healthy Lifestyle', topic: 'Salud y hábitos', words: 92, grammar: "Should/shouldn't + going to",
    text: "Dr. Ramirez gave an interesting talk at the community centre last Tuesday. He said that people should exercise at least three times a week. They shouldn't eat too much processed food because it contains a lot of sugar and fat. He also recommended that people should drink eight glasses of water a day. Many people in the audience were surprised because they didn't know that sleeping less than seven hours is bad for the immune system. After the talk, several people decided they were going to change their habits. Maria is going to start cycling to work next Monday. Her colleague Tom is going to cook more meals at home instead of ordering takeaway.",
    vocab: { lifestyle:'estilo de vida', exercise:'hacer ejercicio', processed:'procesado', contains:'contiene', recommended:'recomendó', audience:'público/audiencia', surprised:'sorprendidos', immune:'inmune', habits:'hábitos', cycling:'ir en bicicleta', colleague:'colega', takeaway:'comida para llevar/domicilio', instead:'en vez de', several:'varios' },
    preQ: [
      { q: '¿Cuántas veces por semana haces ejercicio?', opts: ['Todos los días', '2-3 veces', 'Casi nunca'], a: -1 },
      { q: '¿Qué cambio de hábito te gustaría hacer?', opts: ['Comer mejor', 'Hacer más ejercicio', 'Dormir más'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "processed" en el texto?', cat: 'Vocabulario', opts: ['natural','procesado','orgánico','fresco'], a: 1, fb: '"Processed food" = comida procesada/ultra-procesada. Comida con muchos conservantes y azúcar añadida.' },
      { q: '¿Cuántas veces por semana recomienda ejercitarse el Dr. Ramirez?', cat: 'Comprensión', opts: ['Una vez','Todos los días','Al menos tres veces','Dos veces'], a: 2, fb: '"People should exercise at least three times a week" — al menos tres veces por semana.' },
      { q: '¿Qué sorprendió al público?', cat: 'Comprensión', opts: ['El precio del agua','Que dormir menos de 7 horas es malo para el sistema inmune','Que el ejercicio es importante','Que la grasa es mala'], a: 1, fb: '"They didn\'t know that sleeping less than seven hours is bad for the immune system" — eso los sorprendió.' },
      { q: '¿Qué va a hacer Maria?', cat: 'Comprensión', opts: ['Va a hacer yoga','Va a ir al gimnasio','Va a ir al trabajo en bicicleta','Va a cocinar más'], a: 2, fb: '"Maria is going to start cycling to work next Monday" — va a ir al trabajo en bicicleta.' },
      { q: '"People should exercise" — ¿qué expresa "should"?', cat: 'Gramática', opts: ['Una obligación fuerte','Una recomendación/consejo','Una habilidad','Un plan futuro'], a: 1, fb: '"Should" = recomendación o consejo. No es tan fuerte como "must" (obligación). "Deberías ejercitarte."' },
      { q: '"Maria is going to start cycling" expresa...', cat: 'Gramática', opts: ['Una decisión espontánea','Un plan ya decidido','Una predicción sin evidencia','Una acción habitual'], a: 1, fb: '"Going to" = plan ya decidido. Maria ya tomó la decisión de empezar a ir en bici al trabajo.' },
    ],
    openQ: "Escribe un consejo de salud usando \"should/shouldn't\" y un plan usando \"going to\". Min. 3 oraciones.",
    production: 'Usa: "People should ___. You shouldn\'t ___. I\'m going to ___ starting ___."',
  },
  {
    id: 5, title: 'A Message from Abroad', topic: 'Comunicación internacional', words: 105, grammar: 'Past simple + present continuous + modals',
    text: "Hi Mum, I arrived safely in London three days ago. The journey was very long — I couldn't sleep on the plane because the baby next to me was crying all night. The city is bigger and more expensive than I expected, but the people are very friendly. I am staying in a small hostel near the tube station. Yesterday, I visited the British Museum and walked along the Thames. I also tried fish and chips for the first time — they were delicious! I am meeting my new colleagues tomorrow morning at nine. They said I should bring my passport and two photos. Could you please send me my university transcripts by email? I really miss you all. Love, Ana",
    vocab: { safely:'con seguridad', journey:'viaje', couldn:'no pude', staying:'me estoy quedando', hostel:'albergue', tube:'metro (Londres)', along:'a lo largo de', Thames:'el Támesis', colleagues:'colegas', transcripts:'certificados académicos', miss:'extraño', expensive:'caro', expected:'esperaba', crying:'llorando' },
    preQ: [
      { q: '¿Has viajado a un país de habla inglesa?', opts: ['Sí', 'No, pero quiero ir', 'Aún no tengo planes'], a: -1 },
      { q: '¿Qué extrañarías más de Colombia si vivieras en otro país?', opts: ['La comida', 'La familia', 'El clima'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "hostel"?', cat: 'Vocabulario', opts: ['Hotel de lujo','Hospital','Albergue/hostal','Residencia universitaria'], a: 2, fb: '"Hostel" = albergue u hostal. Alojamiento económico con habitaciones compartidas, popular entre viajeros.' },
      { q: '¿Por qué no pudo dormir Ana en el avión?', cat: 'Comprensión', opts: ['Había mucho ruido de motores','Un bebé lloraba toda la noche','El viaje era muy corto','Estaba emocionada'], a: 1, fb: '"I couldn\'t sleep on the plane because the baby next to me was crying all night."' },
      { q: '¿Dónde se está quedando Ana?', cat: 'Comprensión', opts: ['Con un amigo','En casa de su familia','En un hostal cerca del metro','En un hotel de lujo'], a: 2, fb: '"I am staying in a small hostel near the tube station" — en un hostal cerca del metro.' },
      { q: '¿Qué hizo ayer?', cat: 'Comprensión', opts: ['Fue al trabajo','Visitó el Museo Británico y caminó por el Támesis','Fue de compras','Conoció a sus colegas'], a: 1, fb: '"Yesterday, I visited the British Museum and walked along the Thames."' },
      { q: '¿Qué necesita llevar mañana?', cat: 'Comprensión', opts: ['Su laptop y auriculares','Su pasaporte y dos fotos','Dinero en efectivo','Una carta de recomendación'], a: 1, fb: '"They said I should bring my passport and two photos" — su pasaporte y dos fotos.' },
      { q: '"I couldn\'t sleep" usa "could" en pasado negativo. ¿Qué expresa aquí?', cat: 'Gramática', opts: ['Permiso denegado','Habilidad/posibilidad pasada que no ocurrió','Consejo negativo','Plan cancelado'], a: 1, fb: '"Couldn\'t" (could not) = no pude / no fui capaz. Habilidad o posibilidad que no se realizó en el pasado.' },
    ],
    openQ: 'Escribe un mensaje corto a un amigo o familiar contando un viaje o experiencia reciente. Usa pasado, present continuous y al menos un modal.',
    production: 'Usa: "I arrived in ___. I visited ___ and tried ___. I am staying ___. You should ___."',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+|[.,!?'\-]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'\-]+$/.test(t),
    clean: t.replace(/[^a-zA-Z]/g, '').toLowerCase(),
  }));
}

function MCQItem({ q, qi, answers, onAnswer }: {
  q: ReadingText['mcq'][0]; qi: number;
  answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void;
}) {
  const ans = answers[qi];
  const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        {q.cat} · Pregunta {qi + 1}
      </div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
          if (done && isSelected && isCorrect)  { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenize(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleWord(clean: string, idx: number) {
    if (!clean) return;
    setActiveWord(t.vocab[clean] ?? null);
    setActiveIdx(idx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Todos los textos</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Texto {t.id} / 5 — {t.title}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 {t.words} palabras · {t.grammar}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lectura', 'Lectura', 'Preguntas', 'Resultado'];
          const current = phase === p;
          const past = (['pre','read','questions','done'] as const).indexOf(p) < (['pre','read','questions','done'] as const).indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Antes de leer — activa tu conocimiento</p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Piensa un momento antes de leer. No hay respuestas correctas o incorrectas — solo activa tu mente sobre el tema: <strong style={{ color: 'var(--ink)' }}>{t.topic}</strong>.
          </p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.84rem' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setPhase('read')}>
            Listo — ir al texto →
          </button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />{t.title} — toca cualquier palabra para ver su traducción
          </p>
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => handleWord(tk.clean, i)} style={{
                    background: isActive ? 'rgba(0,102,204,0.12)' : hasTrans ? 'rgba(0,102,204,0.06)' : 'transparent',
                    border: isActive ? '1.5px solid #0066cc' : hasTrans ? '1px dashed rgba(0,102,204,0.3)' : 'none',
                    borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                    fontSize: 'inherit', fontFamily: 'inherit',
                    color: isActive ? '#0066cc' : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                  }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: activeWord ? '#14215c' : '#6f7691', color: '#fff', borderRadius: 8,
                      padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap',
                      zIndex: 10, boxShadow: '0 4px 16px rgba(20,33,92,0.25)', marginTop: 4,
                    }}>
                      {activeWord ?? '(palabra funcional)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              Ya leí → Responder preguntas
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Ocultar tooltip
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: 'auto' }} onClick={() => setPhase('pre')}>
              ← Volver a pre-lectura
            </button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Producción libre</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4}
              placeholder="Escribe aquí tu respuesta en inglés..."
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && (
            <button className="btn btn-sm" onClick={() => setPhase('done')}>Ver mi resultado →</button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? '¡Perfecto! Comprendiste todo el texto.' : score >= 4 ? 'Muy bien. Repasa las preguntas que fallaste.' : 'Vuelve al texto y búscalas — el contexto ayuda.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>TU PRODUCCIÓN LIBRE</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Reintentar</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Elegir otro texto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaInglesA2() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Reading · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos progresivos (80-120 palabras). Cada texto tiene pre-lectura, vocabulario interactivo, 6 preguntas adaptativas y producción libre.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
                border: `1.5px solid ${COLOR}22`, borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(0,102,204,0.04) 0%, transparent 100%)',
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,102,204,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {t.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {t.words} palabras · Gramática: {t.grammar} · {t.mcq.length} preguntas + producción libre
                  </p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,102,204,0.06)', border: '1px solid rgba(0,102,204,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Lee el texto tocando las palabras resaltadas para ver su traducción. Luego responde las 6 preguntas de vocabulario, comprensión y gramática. Al final, escribe tu propia producción libre.
        </div>
      </div>
    </section>
  );
}
