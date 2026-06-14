'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#7c3aed';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; icon: string; desc: string; tip: string; qs: GQItem[] }> = {
  past_simple: {
    title: 'Past simple: affirmative, negative & questions',
    icon: '⏰',
    desc: 'Añade -ed al verbo regular (walk→walked). Irregulares: go→went, see→saw, have→had, buy→bought. Negativo: didn\'t + verbo base. Preguntas: Did you/he/she...?',
    tip: '"Didn\'t" ya negatiza — el verbo queda en base: "She didn\'t go" (✓) no "She didn\'t went" (✗). Lo mismo aplica en preguntas: "Did she go?" no "Did she went?"',
    qs: [
      { s:'She ___ to the cinema last night.', opts:['go','goes','went','gone'], a:2, fb:'"Went" es el pasado irregular de "go". Nunca usamos "goed".' },
      { s:'They ___ (not) finish the project on time.', opts:["didn't","don't","wasn't","weren't"], a:0, fb:'"Didn\'t" + verbo base: "didn\'t finish". Para negaciones pasadas con I/you/we/they/he/she/it.' },
      { s:'___ you enjoy the party?', opts:['Did','Do','Were','Was'], a:0, fb:'"Did you...?" es la forma de hacer preguntas en pasado simple.' },
      { s:'I ___ my keys this morning.', opts:['lose','lost','losted','was losing'], a:1, fb:'"Lost" es el pasado de "lose" (irregular). No existe "losted".' },
      { s:'He ___ (not) come to class yesterday.', opts:["didn't","doesn't","wasn't","hadn't"], a:0, fb:'"Didn\'t come" — negativo pasado simple. Nota: "come" queda en infinitivo después de "didn\'t".' },
      { s:'We ___ a beautiful sunset on the beach.', opts:['saw','see','seed','seen'], a:0, fb:'"Saw" es el pasado de "see". "Seen" es participio pasado — no se usa con pasado simple solo.' },
      { s:'___ she call you last night?', opts:['Did','Does','Was','Is'], a:0, fb:'"Did she call?" — preguntas en pasado simple usan "did" + sujeto + verbo base.' },
      { s:'My parents ___ in Bogotá in 1990.', opts:['lived','live','was living','lives'], a:0, fb:'"Lived" — verbo regular, añadimos -ed. "Live→lived". Período específico en el pasado.' },
      { s:'I ___ a new laptop last week.', opts:['buyed','buy','bought','have bought'], a:2, fb:'"Bought" es el pasado de "buy" (irregular). Uno de los más importantes: buy→bought→bought.' },
      { s:'___ they arrive on time?', opts:['Did','Were','Have','Do'], a:0, fb:'"Did they arrive?" — pregunta en pasado simple. Notad: "arrive" va en infinitivo, no "arrived".' },
    ],
  },
  comparative_superlative: {
    title: 'Comparative & superlative adjectives',
    icon: '📊',
    desc: 'Corto (1-2 sílabas): añade -er/-est (fast→faster→fastest). Largo (3+ sílabas): more/most (beautiful→more beautiful→most beautiful). Irregulares: good→better→best, bad→worse→worst, far→farther→farthest.',
    tip: 'Doble la consonante final si hay patrón CVC (consonante-vocal-consonante): big→bigger (no "biger"). "Thin→thinner", "hot→hotter". Excepto: w, x, y al final no se duplican.',
    qs: [
      { s:'Mount Everest is ___ mountain in the world.', opts:['the highest','the most high','higher','most highest'], a:0, fb:'"The highest" — superlativo de "high" (adjetivo corto): high→higher→the highest.' },
      { s:'My new phone is ___ than my old one.', opts:['more expensive','expensiver','most expensive','the most expensive'], a:0, fb:'"More expensive" — comparativo de adjetivo largo (3 sílabas): más + adjetivo.' },
      { s:'Today is ___ than yesterday.', opts:['hotter','more hot','hoter','most hot'], a:0, fb:'"Hotter" — "hot" sigue el patrón CVC: dobla la t → hotter.' },
      { s:'She is ___ student in the class.', opts:['the best','the most good','the goodest','better'], a:0, fb:'"The best" — superlativo irregular de "good": good→better→the best.' },
      { s:'This film is ___ than the book.', opts:['worse','more bad','worst','badder'], a:0, fb:'"Worse" — comparativo irregular de "bad": bad→worse→the worst.' },
      { s:'Is Spanish ___ than English?', opts:['easier','more easy','easiest','most easy'], a:0, fb:'"Easier" — "easy" termina en consonante+y → cambia y por i: easy→easier→the easiest.' },
      { s:'He is ___ person I know.', opts:['the most generous','the generousest','more generous','generousest'], a:0, fb:'"The most generous" — adjetivo largo (4 sílabas) → superlativo con "most".' },
      { s:'My coffee is ___ than yours.', opts:['stronger','more strong','strongest','most strong'], a:0, fb:'"Stronger" — "strong" es adjetivo corto: strong→stronger→the strongest.' },
      { s:'Venice is ___ city I have ever visited.', opts:['the most beautiful','beautifulest','more beautiful','the beautifullest'], a:0, fb:'"The most beautiful" — adjetivo largo → superlativo con "the most".' },
      { s:'Which is ___: a cat or a dog?', opts:['more intelligent','intelligenter','most intelligent','the most intelligent'], a:0, fb:'"More intelligent" — comparativo de adjetivo largo (4 sílabas): more + adjective + than.' },
    ],
  },
  present_continuous: {
    title: 'Present continuous: now & future arrangements',
    icon: '🔄',
    desc: 'Forma: am/is/are + verbo-ing. Usos: (1) acción ocurriendo AHORA ("I am working right now"), (2) plan/arreglo FUTURO ya confirmado ("I am meeting Ana tomorrow — ya está en mi agenda").',
    tip: 'La diferencia clave: "I work tomorrow" (❌) vs "I am working tomorrow" (✓ — plan confirmado). Con "going to" expresamos intenciones/planes; con present continuous expresamos arreglos ya hechos con otra persona.',
    qs: [
      { s:'Shhh! The baby ___ .', opts:['is sleeping','sleeps','sleep','sleeping'], a:0, fb:'"Is sleeping" — acción que ocurre exactamente ahora. Señal: "Shhh!" indica el presente inmediato.' },
      { s:'I ___ my friend for lunch tomorrow — she already confirmed.', opts:['am meeting','meet','will meet','meets'], a:0, fb:'"Am meeting" — arreglo futuro ya confirmado. No es una intención vaga, es un plan concreto.' },
      { s:'What ___ you ___ right now?', opts:['are / doing','do / do','is / do','were / doing'], a:0, fb:'"Are you doing?" — pregunta en present continuous para acción en progreso ahora.' },
      { s:'They ___ to Paris next week — the flights are booked.', opts:['are flying','fly','will fly','flew'], a:0, fb:'"Are flying" — vuelos reservados = arreglo futuro confirmado → present continuous.' },
      { s:'She ___ (not) pay attention in class right now.', opts:["isn't paying","doesn't pay","wasn't paying","won't pay"], a:0, fb:'"Isn\'t paying" — negativo present continuous = is not + verbo-ing.' },
      { s:'Look! It ___ outside.', opts:['is raining','rains','rain','rained'], a:0, fb:'"Is raining" — acción en progreso visible ahora ("Look!" es señal de tiempo presente).' },
      { s:'We ___ a new project this month.', opts:['are developing','develop','developed','will be developing'], a:0, fb:'"Are developing" — proyecto en progreso en este período de tiempo.' },
      { s:'___ he ___ tonight? He mentioned he had tickets.', opts:['Is / working','Does / work','Will / work','Did / work'], a:0, fb:'"Is he working tonight?" — plan/arreglo futuro ya mencionado → present continuous.' },
      { s:'I ___ (not) use my car this week — it\'s in the repair shop.', opts:["am not using","don't use","won't use","didn't use"], a:0, fb:'"Am not using" — negativo present continuous: am not + verbo-ing.' },
      { s:'She ___ a presentation to the board on Friday — it\'s scheduled.', opts:['is giving','gives','give','will give'], a:0, fb:'"Is giving" — presentación programada (arreglo ya en agenda) → present continuous.' },
    ],
  },
  going_to_will: {
    title: 'Going to vs will: plans vs spontaneous decisions',
    icon: '🔮',
    desc: '"Going to" = plan/intención ya decidida ("I\'m going to study medicine" — ya lo decidí). "Will" = decisión espontánea en el momento de hablar ("I\'ll help you with that!" — decides en el momento), predicciones basadas en evidencia vs intuición.',
    tip: 'Señales de "going to": "I\'ve decided to...", "My plan is...", "I\'m going to...". Señales de "will": "OK, I\'ll...", "Don\'t worry, I\'ll...", "I think it will...". Si alguien te pide ayuda y dices que sí → WILL (decisión espontánea).',
    qs: [
      { s:'A: "The phone is ringing!" B: "Don\'t worry, ___ answer it."', opts:["I'll","I'm going to","I'm","I was going to"], a:0, fb:'"I\'ll answer it" — decisión tomada en el momento de escuchar el teléfono. Clásico uso de "will".' },
      { s:'I ___ learn Korean next year — I\'ve already enrolled in a course.', opts:["'m going to","'ll","would","am"], a:0, fb:'"I\'m going to learn" — intención ya decidida con preparación (inscripción) → going to.' },
      { s:'Look at those clouds — it ___ rain.', opts:["'s going to","'ll","would","is"], a:0, fb:'"It\'s going to rain" — predicción basada en evidencia visible (las nubes). Going to = evidencia presente.' },
      { s:'"I don\'t have enough money." "Really? I ___ lend you some."', opts:["'ll","'m going to","would","am going to"], a:0, fb:'"I\'ll lend you" — decisión espontánea en reacción a lo que alguien dice. → will.' },
      { s:'She ___ become a doctor. She has wanted this since she was 5.', opts:["'s going to","'ll","would","is"], a:0, fb:'"She\'s going to become" — plan de largo plazo ya decidido y con motivación clara → going to.' },
      { s:'I think technology ___ change our lives completely.', opts:["will","is going to","would","is"], a:0, fb:'"Will change" — predicción basada en opinión/creencia ("I think"), no en evidencia física → will.' },
      { s:'"There\'s no milk." "I know — I ___ buy some on my way home." (ya lo había pensado)', opts:["'m going to","'ll","would","am"], a:0, fb:'"I\'m going to buy" — ya lo habías pensado antes de esta conversación → going to.' },
      { s:'A: "Can you help me?" B: "Sure! I ___ do it right now."', opts:["'ll","'m going to","would","am going to"], a:0, fb:'"I\'ll do it" — respuesta espontánea a una petición de ayuda → will.' },
      { s:'They ___ get married in June — they\'ve booked the venue.', opts:["'re going to","'ll","would","are"], a:0, fb:'"They\'re going to get married" — plan concreto con reservas hechas → going to.' },
      { s:'In 2050, robots ___ probably do most routine jobs.', opts:["will","are going to","would","do"], a:0, fb:'"Will probably do" — predicción futura sin evidencia inmediata, basada en creencia → will.' },
    ],
  },
  modals: {
    title: 'Modal verbs: can/could/would/should',
    icon: '🎯',
    desc: 'Can (habilidad presente / permiso informal), Could (habilidad pasada / petición más formal), Would (petición muy cortés / condicional), Should (consejo / recomendación — "deberías").',
    tip: 'Para peticiones más formales, escala: "Can you...?" (informal) → "Could you...?" (más formal) → "Would you mind...?" (muy formal). "Should" es para dar consejos — equivale a "deberías".',
    qs: [
      { s:'___ you speak French when you were a child?', opts:['Could','Can','Should','Would'], a:0, fb:'"Could" — habilidad en el pasado. "Could you speak" = ¿Podías hablar? (de niño).' },
      { s:'You look tired. You ___ go to sleep earlier.', opts:['should','could','would','can'], a:0, fb:'"Should" — consejo/recomendación. "You should go to sleep earlier" = te recomiendo dormir más temprano.' },
      { s:'___ you pass the salt, please? (formal)', opts:['Could','Can','Should','Would'], a:0, fb:'"Could you pass...?" — petición formal. Más cortés que "Can you pass...?"' },
      { s:'I ___ swim very fast. I won three races!', opts:['can','could','should','would'], a:0, fb:'"Can swim" — habilidad presente. "I can swim fast" = tengo esa habilidad ahora.' },
      { s:'"___ you like some coffee?" "Yes, please."', opts:['Would','Could','Should','Can'], a:0, fb:'"Would you like...?" — oferta muy cortés. Fórmula fija en inglés para ofrecer algo.' },
      { s:'You ___ eat so much fast food. It\'s not good for you.', opts:["shouldn't","couldn't","wouldn't","can't"], a:0, fb:'"Shouldn\'t eat" — consejo negativo. "Shouldn\'t" = no deberías (recomendación de no hacer algo).' },
      { s:'___ I open the window? It\'s very hot here.', opts:['Can','Would','Should','Must'], a:0, fb:'"Can I open...?" — pedir permiso informal. También valid: "Could I open...?" (más formal).' },
      { s:'She ___ play piano beautifully when she was young.', opts:['could','can','should','would'], a:0, fb:'"Could play" — habilidad pasada. Ella tenía esa habilidad cuando era joven.' },
      { s:'"I have a headache." "You ___ take an aspirin."', opts:['should','would','could','can'], a:0, fb:'"Should take" — consejo directo. "You should take an aspirin" = te recomiendo tomar aspirina.' },
      { s:'___ you help me with this suitcase? It\'s very heavy.', opts:['Could','Should','Would','Must'], a:0, fb:'"Could you help me?" — petición cortés. "Could" en este contexto es más educado que "can".' },
    ],
  },
};

export default function GramaticaInglesA2() {
  const topics = Object.entries(GRAMMAR_TOPICS);
  const [topicKey, setTopicKey] = useState(topics[0][0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const data = GRAMMAR_TOPICS[topicKey];
  const total = data.qs.length;
  const done = Object.keys(answers).length;
  const correct = data.qs.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  function switchTopic(k: string) { setTopicKey(k); reset(); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammar · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 1.75rem' }}>
          5 temas esenciales con 10 ejercicios cada uno. Explicación + ejemplos + feedback inmediato.
        </p>

        {/* Topic selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {topics.map(([k, v]) => (
            <button key={k} onClick={() => switchTopic(k)}
              className={topicKey === k ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.83rem', ...(topicKey === k ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {v.icon} {v.title}
            </button>
          ))}
        </div>

        {/* Explanation */}
        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.6 }}>📖 {data.desc}</p>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}>✨ {data.tip}</p>
        </div>

        {/* Progress */}
        {done > 0 && !showResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: COLOR, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexShrink: 0 }}>{done}/{total}</span>
          </div>
        )}

        {/* Questions */}
        {!showResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.qs.map((q, qi) => {
              const ans = answers[qi];
              const isDone = ans !== undefined;
              return (
                <div key={`${topicKey}-${qi}`} className="wl-card" style={{ padding: '1.25rem' }}>
                  <p style={{ margin: '0 0 0.85rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.7 }}>
                    {qi + 1}. {q.s.split('___').map((part, i, arr) => (
                      <span key={i}>{part}{i < arr.length - 1 && (
                        <span style={{ display: 'inline-block', minWidth: 80, borderBottom: `2px solid ${COLOR}`, margin: '0 4px', verticalAlign: 'bottom' }}>
                          {isDone && <span style={{ fontSize: '0.88rem', fontWeight: 800, color: answers[qi] === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                        </span>
                      )}</span>
                    ))}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect = oi === q.a; const isSelected = ans === oi;
                      let bg = 'var(--bg-2)'; let border = `1px solid var(--line-soft)`; let color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                          style={{ padding: '0.5rem 1.1rem', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && (
                    <div style={{ marginTop: '0.65rem', fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.5rem 0.75rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)' }}>
                      {ans === q.a ? '✅ ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}
            {done === total && (
              <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: COLOR, borderColor: COLOR }}>
                Ver mi resultado →
              </button>
            )}
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= total * 0.7 ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{correct} / {total} correctas</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
              {correct === total ? '¡Perfecto! Dominas este tema.' : correct >= total * 0.7 ? 'Muy bien. Repasa los errores y vuelve a intentarlo.' : 'Estudia la explicación arriba y practica de nuevo.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: COLOR, borderColor: COLOR }}>Intentar de nuevo</button>
              <button className="btn btn-ghost btn-sm" onClick={() => {
                const keys = Object.keys(GRAMMAR_TOPICS);
                const next = keys[(keys.indexOf(topicKey) + 1) % keys.length];
                switchTopic(next);
              }}>Siguiente tema →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
