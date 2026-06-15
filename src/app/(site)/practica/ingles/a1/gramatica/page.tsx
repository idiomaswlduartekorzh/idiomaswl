'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveSkillCompletion } from '@/lib/progress';
import XPStreak from '@/components/practica/XPStreak';

const COLOR = '#7c3aed';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; icon: string; desc: string; tip: string; qs: GQItem[] }> = {
  articles: {
    title: 'Artículos: a / an / the',
    icon: '📌',
    desc: 'Usa "a" antes de sonido consonántico, "an" antes de sonido vocálico, "the" para algo específico o único.',
    tip: 'Truco: "an" va antes de sonido vocal (a, e, i, o, u), no de letra vocal. "An hour" (la h es muda), "a university" (suena "yu").',
    qs: [
      { s:'I have ___ dog.',               opts:['a','an','the'],   a:0, fb:'"A dog" — sonido consonántico (d-og). Usamos "a".' },
      { s:'She eats ___ apple a day.',      opts:['a','an','the'],   a:1, fb:'"An apple" — sonido vocálico (a-pple). Usamos "an".' },
      { s:'___ sun is very big.',           opts:['A','An','The'],   a:2, fb:'"The sun" — hay solo un sol. Usamos "the" para cosas únicas.' },
      { s:'He is ___ engineer.',            opts:['a','an','the'],   a:1, fb:'"An engineer" — sonido vocálico (e-ngineer). Usamos "an".' },
      { s:'I live in ___ apartment.',       opts:['a','an','the'],   a:1, fb:'"An apartment" — sonido vocálico (a-partment).' },
      { s:'___ moon is full tonight.',      opts:['A','An','The'],   a:2, fb:'"The moon" — hay solo una luna → "the".' },
      { s:'She is ___ teacher.',            opts:['a','an','the'],   a:0, fb:'"A teacher" — primera mención + sonido consonántico (t-eacher).' },
      { s:'I need ___ umbrella.',           opts:['a','an','the'],   a:1, fb:'"An umbrella" — sonido vocálico (u-mbrella).' },
      { s:'Is there ___ bank nearby?',      opts:['a','an','the'],   a:0, fb:'"A bank" — primera mención + sonido consonántico (b-ank).' },
      { s:'___ water in this lake is cold.',opts:['A','An','The'],   a:2, fb:'"The water" — el agua específica de ese lago.' },
    ],
  },
  verb_be: {
    title: 'Verbo "to be": am / is / are',
    icon: '🔵',
    desc: 'El verbo "to be" se conjuga: I am / You are / He-She-It is / We-You-They are.',
    tip: 'Nemotecnia: "I am" = solo yo. "He/She/It is" = singular tercera persona. "We/You/They are" = todo lo demás plural.',
    qs: [
      { s:'I ___ a student.',               opts:['am','is','are'],  a:0, fb:'"I am" — con "I" siempre usamos "am".' },
      { s:'She ___ very kind.',             opts:['am','is','are'],  a:1, fb:'"She is" — con he/she/it usamos "is".' },
      { s:'We ___ from Colombia.',          opts:['am','is','are'],  a:2, fb:'"We are" — con we/you/they usamos "are".' },
      { s:'He ___ not at home right now.',  opts:['am','is','are'],  a:1, fb:'"He is not" — con he/she/it → is.' },
      { s:'They ___ good friends.',         opts:['am','is','are'],  a:2, fb:'"They are" — con they → are.' },
      { s:'___ you happy?',                 opts:['Am','Is','Are'],  a:2, fb:'"Are you?" — preguntas con "you" usan "are".' },
      { s:'The coffee ___ hot.',            opts:['am','is','are'],  a:1, fb:'"Coffee is" — sujeto singular → is.' },
      { s:'My parents ___ doctors.',        opts:['am','is','are'],  a:2, fb:'"Parents are" — sujeto plural → are.' },
      { s:'I ___ not tired today.',         opts:['am','is','are'],  a:0, fb:'"I am not" — con "I" → am.' },
      { s:'It ___ raining outside.',        opts:['am','is','are'],  a:1, fb:'"It is" — con it → is.' },
    ],
  },
  pronouns: {
    title: 'Pronombres personales',
    icon: '👤',
    desc: 'He (hombre), She (mujer), It (cosa/animal), We (nosotros), They (ellos/ellas).',
    tip: 'En inglés los pronombres son obligatorios — no se puede omitir el sujeto como en español. Siempre di "It is raining", nunca solo "Is raining".',
    qs: [
      { s:'Maria is from Spain. ___ is from Spain.',         opts:['He','She','It','They'],  a:1, fb:'"She" — Maria es mujer.' },
      { s:'Tom and I are friends. ___ are friends.',         opts:['We','They','You','It'],   a:0, fb:'"We" — cuando yo estoy incluido en el grupo.' },
      { s:'The book is on the table. ___ is on the table.',  opts:['He','She','It','They'],  a:2, fb:'"It" — para cosas y objetos usamos "it".' },
      { s:'My parents work hard. ___ work hard.',            opts:['We','They','You','It'],   a:1, fb:'"They" — para grupos de personas (sin yo).' },
      { s:'John lives in London. ___ lives in London.',      opts:['He','She','It','They'],  a:0, fb:'"He" — John es un hombre.' },
      { s:'The children play outside. ___ play outside.',    opts:['We','They','You','It'],   a:1, fb:'"They" — los niños = grupo → they.' },
      { s:'The car is fast. ___ is fast.',                   opts:['He','She','It','They'],  a:2, fb:'"It" — para objetos como el carro.' },
      { s:'My sister and I love music. ___ love music.',     opts:['We','They','You','It'],   a:0, fb:'"We" — yo + mi hermana = nosotros.' },
    ],
  },
  present_simple: {
    title: 'Presente simple: afirmativo y negativo',
    icon: '⏰',
    desc: 'Con he/she/it añade -s/-es al verbo: I play / She plays. Negativo: I don\'t / She doesn\'t + verbo base.',
    tip: '"Doesn\'t" ya incluye la negación — el verbo vuelve a su forma base. No digas "She doesn\'t plays" sino "She doesn\'t play".',
    qs: [
      { s:'She ___ to work every day.',            opts:['walk','walks','walking'],    a:1, fb:'"She walks" — con she/he/it añadimos -s.' },
      { s:'They ___ in a big house.',              opts:['live','lives','is living'],   a:0, fb:'"They live" — con they usamos el verbo base sin -s.' },
      { s:'He ___ not eat meat.',                  opts:["don't","doesn't","isn't"],    a:1, fb:'"He doesn\'t" — con he/she/it usamos "doesn\'t" en la negación.' },
      { s:'I ___ play football on Saturdays.',     opts:["don't","doesn't","not"],      a:0, fb:'"I don\'t" — con I/you/we/they usamos "don\'t".' },
      { s:'The sun ___ in the east.',              opts:['rise','rises','is rising'],   a:1, fb:'"The sun rises" — sujeto singular → +s.' },
      { s:'My brothers ___ to the gym often.',     opts:['goes','go','going'],          a:1, fb:'"Brothers go" — plural → verbo base sin -s.' },
      { s:'She ___ speak Arabic.',                 opts:["don't","doesn't","isn't"],    a:1, fb:'"She doesn\'t speak" — con she → doesn\'t + verbo base.' },
      { s:'It ___ snow in Colombia.',              opts:["don't","doesn't","isn't"],    a:1, fb:'"It doesn\'t snow" — con it → doesn\'t.' },
    ],
  },
  plural_nouns: {
    title: 'Sustantivos en plural',
    icon: '🔢',
    desc: 'Reglas: +s (normal), +es (termina en s/sh/ch/x/z), +ies (termina en consonante+y). Irregulares: man/men, child/children, tooth/teeth.',
    tip: 'Cuando la palabra termina en vocal+y solo añade -s (boys, days). Cuando termina en consonante+y, cambia y→ies (city→cities).',
    qs: [
      { s:'One book — two ___.',              opts:['books','bookes','bookies'],      a:0, fb:'"Books" — regla general: solo +s.' },
      { s:'One box — two ___.',               opts:['boxs','boxes','boxies'],         a:1, fb:'"Boxes" — termina en x → +es.' },
      { s:'One baby — two ___.',              opts:['babys','babies','babes'],        a:1, fb:'"Babies" — consonante + y → cambia y por ies.' },
      { s:'One man — two ___.',               opts:['mans','men','manes'],            a:1, fb:'"Men" — irregular. Man→men, woman→women.' },
      { s:'One child — two ___.',             opts:['childs','childes','children'],   a:2, fb:'"Children" — irregular. Child→children.' },
      { s:'One city — two ___.',              opts:['citys','cities','cityes'],       a:1, fb:'"Cities" — consonante (t) + y → ies.' },
      { s:'One tooth — two ___.',             opts:['tooths','teeths','teeth'],       a:2, fb:'"Teeth" — irregular. Tooth→teeth, foot→feet.' },
      { s:'One bus — two ___.',               opts:['bus','buss','buses'],            a:2, fb:'"Buses" — termina en s → +es.' },
    ],
  },
};

export default function GramaticaInglesA1() {
  const topics = Object.entries(GRAMMAR_TOPICS);
  const [topicKey, setTopicKey] = useState(topics[0][0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);

  const data = GRAMMAR_TOPICS[topicKey];
  const total = data.qs.length;
  const done = Object.keys(answers).length;
  const correct = data.qs.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); setXpEarned(null); }

  function switchTopic(k: string) { setTopicKey(k); reset(); }

  function handleShowResult() {
    const score = Math.round((correct / total) * 100);
    const earned = saveSkillCompletion('ingles', 'a1', 'gramatica', score);
    setXpEarned(earned);
    setShowResult(true);
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.25rem' }}>
          <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />Grammar · Inglés A1</p>
          <XPStreak showMotivation />
        </div>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 1.75rem' }}>
          5 temas esenciales con 8–10 ejercicios cada uno. Explicación + ejemplos + feedback inmediato.
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
              <button className="btn btn-sm" onClick={handleShowResult} style={{ background: COLOR, borderColor: COLOR }}>
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
            {xpEarned !== null && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', margin: '0 0 0.75rem', padding: '0.35rem 0.85rem', borderRadius: 20, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)' }}>
                  +{xpEarned} XP ⚡
                </span>
              </div>
            )}
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
