'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#0066cc';

// ─── 5 A1 Reading texts ───────────────────────────────────────────────────────

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
    id: 1, title: 'My Daily Routine', topic: 'Vida cotidiana', words: 65, grammar: 'Presente simple',
    text: "Hi! My name is Tom. I am 25 years old. Every morning, I wake up at seven o'clock. I take a shower and have breakfast. I usually eat toast and drink orange juice. Then I take the bus to work. I work in an office near the city centre. I finish work at five o'clock in the afternoon. In the evening, I watch TV or read a book.",
    vocab: { wake:'despierto', shower:'ducha', breakfast:'desayuno', usually:'normalmente', toast:'tostadas', drink:'bebo', bus:'autobús', office:'oficina', centre:'centro', finish:'termino', evening:'noche/tarde', watch:'veo', book:'libro' },
    preQ: [
      { q: '¿A qué hora te despiertas normalmente?', opts: ['Antes de las 7', 'Entre las 7 y las 9', 'Después de las 9'], a: -1 },
      { q: '¿Cómo vas normalmente al trabajo/colegio?', opts: ['En bus', 'Caminando', 'En carro', 'En bici'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "breakfast"?', cat: 'Vocabulario', opts: ['Almuerzo','Desayuno','Cena','Merienda'], a: 1, fb: '"Breakfast" = desayuno, la primera comida del día.' },
      { q: '¿Qué significa "wake up"?', cat: 'Vocabulario', opts: ['Dormirse','Despertarse','Ducharse','Acostarse'], a: 1, fb: '"Wake up" = despertarse. "Wake" (despertar) + "up" (arriba) = levantarse del sueño.' },
      { q: '¿A qué hora se despierta Tom?', cat: 'Comprensión', opts: ['A las 6','A las 7','A las 8','A las 5'], a: 1, fb: '"I wake up at seven o\'clock" — Tom se despierta a las 7 en punto.' },
      { q: '¿Cómo va Tom al trabajo?', cat: 'Comprensión', opts: ['En carro','En bus','Caminando','En metro'], a: 1, fb: '"I take the bus to work" — Tom toma el autobús al trabajo.' },
      { q: 'En el texto, "I finish work at five" indica que...', cat: 'Gramática', opts: ['Tom trabaja por la tarde', 'Tom termina a las 5pm', 'Tom empieza a las 5', 'Tom no trabaja'], a: 1, fb: '"Finish" = terminar. "At five" = a las cinco (5pm en contexto laboral).' },
    ],
    openQ: 'Describe tu rutina matutina en 2–3 oraciones en inglés. Usa: "I wake up at...", "I have...", "I take..."',
    production: 'Usa "I wake up", "I eat/drink", y "I take" para escribir sobre tu mañana.',
  },
  {
    id: 2, title: 'My Family', topic: 'La familia', words: 58, grammar: 'Adjetivos + to be',
    text: "I have a small family. My mother is a nurse. She is very kind and patient. My father is a teacher. He is tall and funny. I have one sister. Her name is Emma. She is 18 years old. She loves music and art. We all live together in a house in the city. I love my family very much.",
    vocab: { mother:'madre/mamá', nurse:'enfermera', kind:'amable', patient:'paciente', father:'padre/papá', teacher:'maestro/a', tall:'alto/a', funny:'gracioso/a', sister:'hermana', loves:'ama/le encanta', music:'música', art:'arte', together:'juntos' },
    preQ: [
      { q: '¿Cuántas personas hay en tu familia (en casa)?', opts: ['2-3 personas', '4-5 personas', '6 o más'], a: -1 },
      { q: '¿Qué profesión tiene alguien en tu familia?', opts: ['Médico/a o enfermero/a', 'Maestro/a', 'Otra profesión'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "nurse"?', cat: 'Vocabulario', opts: ['Abogada','Médica','Enfermera','Maestra'], a: 2, fb: '"Nurse" = enfermero/a. Una persona que trabaja cuidando pacientes en hospitales o clínicas.' },
      { q: '¿Cómo se llama la hermana?', cat: 'Comprensión', opts: ['Mary','Emma','Anna','Sarah'], a: 1, fb: '"My sister. Her name is Emma." — la hermana se llama Emma.' },
      { q: '¿Cuál es la profesión del padre?', cat: 'Comprensión', opts: ['Doctor','Abogado','Maestro','Chef'], a: 2, fb: '"My father is a teacher" — el papá es maestro.' },
      { q: '¿Qué ama Emma?', cat: 'Comprensión', opts: ['Los deportes','La música y el arte','Cocinar','Viajar'], a: 1, fb: '"She loves music and art." — Emma ama la música y el arte.' },
      { q: '"She is kind" usa el verbo "to be". ¿Cuál es la traducción?', cat: 'Gramática', opts: ['Ella tiene amabilidad', 'Ella es amable', 'Ella tiene cariño', 'Ella hace amable'], a: 1, fb: 'Con adjetivos en inglés se usa "to be" + adjetivo: "she is kind" = "ella es amable".' },
    ],
    openQ: 'Describe a un miembro de tu familia en 2–3 oraciones. Usa: "My [mother/father/sister...] is a [profession]. He/She is [adjective]."',
    production: 'Escribe sobre un familiar usando "My _____ is a _____. He/She is _____."',
  },
  {
    id: 3, title: 'My Home', topic: 'La casa', words: 67, grammar: 'There is / There are · Preposiciones',
    text: "I live in a small house. There are three rooms: a bedroom, a kitchen, and a living room. My bedroom is upstairs. In my bedroom there is a bed, a desk, and a big wardrobe. There are some books on the shelf next to the window. In front of the house there is a small garden. Next to the house there is a park. I love my home because it is comfortable and quiet.",
    vocab: { rooms:'habitaciones', bedroom:'dormitorio', kitchen:'cocina', living:'sala de estar', upstairs:'arriba/en el piso de arriba', desk:'escritorio', wardrobe:'armario/ropero', shelf:'estante', window:'ventana', front:'enfrente', garden:'jardín', park:'parque', comfortable:'cómodo/a', quiet:'tranquilo/a' },
    preQ: [
      { q: '¿En qué tipo de vivienda vives?', opts: ['Casa', 'Apartamento', 'Otro'], a: -1 },
      { q: '¿Cuántas habitaciones tiene tu casa/apto?', opts: ['1-2', '3-4', '5 o más'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "wardrobe"?', cat: 'Vocabulario', opts: ['Escritorio','Cama','Armario/ropero','Estante'], a: 2, fb: '"Wardrobe" = armario o ropero. Es el mueble donde guardamos la ropa.' },
      { q: '¿Qué hay en frente de la casa?', cat: 'Comprensión', opts: ['Un parque','Un jardín','Una tienda','Un carro'], a: 1, fb: '"In front of the house there is a small garden" — hay un jardín enfrente.' },
      { q: '¿Cuántas habitaciones tiene la casa?', cat: 'Comprensión', opts: ['2','3','4','5'], a: 1, fb: '"There are three rooms: a bedroom, a kitchen, and a living room."' },
      { q: '¿Dónde está el dormitorio?', cat: 'Comprensión', opts: ['Abajo','Arriba','Afuera','En el sótano'], a: 1, fb: '"My bedroom is upstairs" — el dormitorio está arriba (en el segundo piso).' },
      { q: '"There are some books on the shelf" — ¿qué estructura gramatical es?', cat: 'Gramática', opts: ['"there is" para singular', '"there are" para plural', '"there has"', '"there be"'], a: 1, fb: 'Usamos "there is" para singular (there is a book) y "there are" para plural (there are some books).' },
    ],
    openQ: 'Describe tu habitación en 3 oraciones usando "There is..." y "There are...". Menciona al menos 3 objetos.',
    production: 'Escribe: "In my room there is a ___. There are ___ and ___. My room is ___."',
  },
  {
    id: 4, title: 'Food I Like', topic: 'La comida', words: 55, grammar: 'I like / I don\'t like · Frecuencia',
    text: "I love food! My favourite meal is breakfast. Every morning I eat eggs and toast. I drink coffee with milk. For lunch I usually have rice and chicken. I don't like vegetables very much, but I eat fruit every day. My favourite fruits are apples and mangoes. I never eat fast food. On Sundays I cook spaghetti with tomato sauce for my family.",
    vocab: { favourite:'favorito/a', meal:'comida/plato', eggs:'huevos', toast:'tostadas', coffee:'café', lunch:'almuerzo', usually:'normalmente', rice:'arroz', chicken:'pollo', vegetables:'verduras/vegetales', fruit:'fruta', apples:'manzanas', mangoes:'mangos', cook:'cocino', spaghetti:'espaguetis', sauce:'salsa', never:'nunca' },
    preQ: [
      { q: '¿Cuál es tu comida favorita?', opts: ['Pasta/arroz', 'Carne/pollo', 'Frutas/verduras', 'Otra'], a: -1 },
      { q: '¿Con qué frecuencia cocinas?', opts: ['Todos los días', 'A veces', 'Casi nunca'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "meal"?', cat: 'Vocabulario', opts: ['Plato de comida','Menú','Receta','Restaurante'], a: 0, fb: '"Meal" = comida, plato o ingesta (breakfast es la primera meal del día).' },
      { q: '¿Qué come en el desayuno?', cat: 'Comprensión', opts: ['Cereal y leche','Arroz','Huevos y tostadas','Fruta'], a: 2, fb: '"I eat eggs and toast" — come huevos y tostadas en el desayuno.' },
      { q: '¿Qué no le gusta mucho?', cat: 'Comprensión', opts: ['La fruta','El café','Las verduras','La pasta'], a: 2, fb: '"I don\'t like vegetables very much" — no le gustan mucho las verduras.' },
      { q: '¿Qué cocina los domingos?', cat: 'Comprensión', opts: ['Pollo','Pizza','Espaguetis','Paella'], a: 2, fb: '"I cook spaghetti with tomato sauce" — cocina espaguetis con salsa de tomate.' },
      { q: '"I never eat fast food" — ¿qué indica "never"?', cat: 'Gramática', opts: ['Frecuencia: siempre', 'Frecuencia: nunca', 'Frecuencia: a veces', 'Frecuencia: normalmente'], a: 1, fb: 'Adverbios de frecuencia: always (siempre) → usually → sometimes → never (nunca).' },
    ],
    openQ: 'Escribe 3 oraciones sobre tu comida usando: "I like/love ___", "I don\'t like ___", "I usually eat/drink ___ for breakfast/lunch."',
    production: 'Usa al menos un adverbio de frecuencia (always, usually, sometimes, never).',
  },
  {
    id: 5, title: 'My School', topic: 'La escuela', words: 62, grammar: 'Presente simple · Días de la semana',
    text: "My school is not far from my home. I go to school from Monday to Friday. Classes start at eight in the morning. My favourite subjects are English and Science. My English teacher's name is Mr. Brown. He is young and very helpful. I have lunch at school with my friends. We usually eat sandwiches. School finishes at three thirty. After school, I do my homework.",
    vocab: { far:'lejos', monday:'lunes', friday:'viernes', classes:'clases', start:'empiezan', subjects:'materias', favourite:'favorito/a', science:'ciencias', helpful:'servicial/útil', lunch:'almuerzo', sandwiches:'sándwiches', finishes:'termina', homework:'tarea' },
    preQ: [
      { q: '¿Cuántos días a la semana vas a estudiar/trabajar?', opts: ['5 días', '6 días', 'Horario variable'], a: -1 },
      { q: '¿Cuál es tu materia o área favorita?', opts: ['Ciencias exactas', 'Humanidades', 'Idiomas', 'Artes'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "subjects"?', cat: 'Vocabulario', opts: ['Libros','Materias/asignaturas','Clases','Profesores'], a: 1, fb: '"Subjects" = materias o asignaturas (English, Math, Science, History son subjects).' },
      { q: '¿Cómo se llama el profesor de inglés?', cat: 'Comprensión', opts: ['Mr. Brown','Mr. Smith','Mr. Jones','Mr. Green'], a: 0, fb: '"My English teacher\'s name is Mr. Brown."' },
      { q: '¿Cuándo van a la escuela?', cat: 'Comprensión', opts: ['Solo lunes','Lunes a viernes','Lunes a sábado','Todos los días'], a: 1, fb: '"I go to school from Monday to Friday" — cinco días a la semana.' },
      { q: '¿A qué hora terminan las clases?', cat: 'Comprensión', opts: ['3:00','3:30','4:00','2:30'], a: 1, fb: '"School finishes at three thirty" = las tres y media (3:30).' },
      { q: '"I go to school" — ¿por qué se usa "go" y no "goes"?', cat: 'Gramática', opts: ['Porque es pasado', 'Porque el sujeto es "I" (primera persona)', 'Porque "school" es singular', 'Porque es futuro'], a: 1, fb: 'En presente simple, "I/you/we/they" usan el verbo base (go). Solo he/she/it añaden -s (goes).' },
    ],
    openQ: 'Describe tu colegio/universidad en 3 oraciones. Incluye: horario, materias y cómo vas. Usa presente simple.',
    production: 'Escribe: "I go to [school/university] from ___ to ___. My favourite subject is ___. My [teacher] is ___."',
  },
];

// ─── Tokenizer ────────────────────────────────────────────────────────────────

function tokenize(text: string) {
  return text.split(/(\s+|[.,!?']+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?']+$/.test(t),
    clean: t.replace(/[^a-zA-Z]/g, '').toLowerCase(),
  }));
}

// ─── MCQ Question ─────────────────────────────────────────────────────────────

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

// ─── Single reading lesson ────────────────────────────────────────────────────

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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Todos los textos</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Texto {t.id} / 5 — {t.title}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 {t.words} palabras · {t.grammar}
        </span>
      </div>

      {/* Progress steps */}
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

      {/* PRE-READING */}
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

      {/* READING */}
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

      {/* QUESTIONS */}
      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          {/* Open question */}
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

      {/* DONE */}
      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 3 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? '¡Perfecto! Comprendiste todo el texto.' : score >= 3 ? 'Muy bien. Repasa las preguntas que fallaste.' : 'Vuelve al texto y búscalas — el contexto ayuda.'}
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

// ─── Text selector ────────────────────────────────────────────────────────────

export default function LecturaInglesA1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
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
          <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Reading · Inglés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos progresivos. Cada texto tiene pre-lectura, vocabulario interactivo, preguntas adaptativas y producción libre.
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
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Lee el texto tocando las palabras resaltadas para ver su traducción. Luego responde las preguntas de vocabulario, comprensión y gramática. Al final, escribe tu propia producción libre.
        </div>
      </div>
    </section>
  );
}
