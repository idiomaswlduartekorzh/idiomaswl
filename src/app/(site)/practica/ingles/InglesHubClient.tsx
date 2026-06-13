'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type Skill = 'lectura' | 'gramatica' | 'escritura' | 'habla' | 'escucha';

// ─── Reading A1 data ─────────────────────────────────────────────────────────

const READING_TEXT =
  "Hi! My name is Tom. I am 25 years old. I live in a small apartment in London. " +
  "Every morning, I take the bus to work. I work in an office. " +
  "I like coffee, music, and books. I have a cat named Max. " +
  "My family is in Canada. I call them every weekend.";

const VOCAB: Record<string, string> = {
  hi: '¡hola', name: 'nombre', am: 'soy / tengo (edad)',
  years: 'años', old: '(de) años', live: 'vivo', small: 'pequeño/a',
  apartment: 'apartamento', london: 'Londres', every: 'cada / todos los',
  morning: 'mañana', take: 'tomo', bus: 'autobús', work: 'trabajo',
  office: 'oficina', like: 'me gusta', coffee: 'café', music: 'música',
  books: 'libros', book: 'libro', have: 'tengo', cat: 'gato',
  named: 'llamado/a', max: 'Max', family: 'familia',
  canada: 'Canadá', call: 'llamo', them: 'ellos/ellas', weekend: 'fin de semana',
};

const READ_Q = [
  { q: '¿Qué significa "apartment"?', opts: ['apartamento','edificio','ciudad','tienda'], a: 0, fb: '"Apartment" = apartamento. Es donde vivimos.' },
  { q: '¿Qué significa "morning"?', opts: ['noche','tarde','mañana','semana'], a: 2, fb: '"Morning" = mañana (la parte del día antes del mediodía).' },
  { q: '¿Dónde trabaja Tom?', opts: ['En un restaurante','En una oficina','En una tienda','En casa'], a: 1, fb: '"I work in an office" — Tom trabaja en una oficina.' },
  { q: '¿Cómo va Tom al trabajo?', opts: ['En carro','En bus','Caminando','En tren'], a: 1, fb: '"I take the bus to work" — Tom va en bus al trabajo.' },
];
const OPEN_Q = '¿Qué cosas le gustan a Tom? Escríbelo en español o en inglés.';

// ─── Grammar A1 data ─────────────────────────────────────────────────────────

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; desc: string; qs: GQItem[] }> = {
  articles: {
    title: 'Artículos: a / an / the',
    desc: 'Usa "a" antes de sonido consonántico, "an" antes de sonido vocálico, "the" para algo específico o único.',
    qs: [
      { s:'I have ___ dog.',           opts:['a','an','the'],   a:0, fb:'"A dog" — sonido consonántico (d-og). Usamos "a".' },
      { s:'She eats ___ apple a day.', opts:['a','an','the'],   a:1, fb:'"An apple" — sonido vocálico (a-pple). Usamos "an".' },
      { s:'___ sun is very big.',      opts:['A','An','The'],   a:2, fb:'"The sun" — hay solo un sol. Usamos "the" para cosas únicas.' },
      { s:'He is ___ engineer.',       opts:['a','an','the'],   a:1, fb:'"An engineer" — sonido vocálico (e-ngineer). Usamos "an".' },
      { s:'I live in ___ apartment.',  opts:['a','an','the'],   a:1, fb:'"An apartment" — sonido vocálico (a-partment).' },
      { s:'___ moon is full tonight.', opts:['A','An','The'],   a:2, fb:'"The moon" — hay solo una luna. Usamos "the".' },
      { s:'She is ___ teacher.',       opts:['a','an','the'],   a:0, fb:'"A teacher" — primera mención + sonido consonántico (t-eacher).' },
      { s:'I need ___ umbrella.',      opts:['a','an','the'],   a:1, fb:'"An umbrella" — sonido vocálico (u-mbrella).' },
      { s:'Is there ___ bank nearby?', opts:['a','an','the'],   a:0, fb:'"A bank" — primera mención + sonido consonántico (b-ank).' },
      { s:'___ water here is cold.',   opts:['A','An','The'],   a:2, fb:'"The water" — el agua específica de este lugar.' },
    ],
  },
  verb_be: {
    title: 'Presente del verbo "to be"',
    desc: 'El verbo "to be" se conjuga: I am / you are / he-she-it is / we-they are.',
    qs: [
      { s:'I ___ a student.',              opts:['am','is','are'], a:0, fb:'"I am" — con "I" siempre usamos "am".' },
      { s:'She ___ very kind.',            opts:['am','is','are'], a:1, fb:'"She is" — con he/she/it usamos "is".' },
      { s:'We ___ from Colombia.',         opts:['am','is','are'], a:2, fb:'"We are" — con we/you/they usamos "are".' },
      { s:'He ___ not at home right now.', opts:['am','is','are'], a:1, fb:'"He is not" — con he/she/it usamos "is".' },
      { s:'They ___ good friends.',        opts:['am','is','are'], a:2, fb:'"They are" — con they usamos "are".' },
      { s:'___ you happy?',                opts:['Am','Is','Are'], a:2, fb:'"Are you?" — pregunta con "you" usa "are".' },
      { s:'The coffee ___ hot.',           opts:['am','is','are'], a:1, fb:'"Coffee is" — sujeto singular (el café), usamos "is".' },
      { s:'My parents ___ doctors.',       opts:['am','is','are'], a:2, fb:'"Parents are" — sujeto plural, usamos "are".' },
      { s:'I ___ not tired today.',        opts:['am','is','are'], a:0, fb:'"I am not" — con "I" siempre "am".' },
      { s:'It ___ raining outside.',       opts:['am','is','are'], a:1, fb:'"It is" — con he/she/it usamos "is".' },
    ],
  },
  pronouns: {
    title: 'Pronombres personales',
    desc: 'He (hombre), She (mujer), It (cosa/animal), We (nosotros), They (ellos).',
    qs: [
      { s:'Maria is from Spain. ___ is from Spain.',     opts:['He','She','It','They'], a:1, fb:'"She" — Maria es mujer.' },
      { s:'Tom and I are friends. ___ are friends.',     opts:['We','They','You','It'],  a:0, fb:'"We" — cuando yo estoy incluido en el grupo.' },
      { s:'The book is on the table. ___ is on the table.', opts:['He','She','It','They'], a:2, fb:'"It" — para cosas y objetos.' },
      { s:'My parents work hard. ___ work hard.',        opts:['We','They','You','It'],  a:1, fb:'"They" — para grupos de personas.' },
      { s:'John lives in London. ___ lives in London.',  opts:['He','She','It','They'], a:0, fb:'"He" — John es un hombre.' },
      { s:'The children play outside. ___ play outside.', opts:['We','They','You','It'], a:1, fb:'"They" — los niños = grupo = they.' },
      { s:'The car is fast. ___ is fast.',               opts:['He','She','It','They'], a:2, fb:'"It" — para objetos como el carro.' },
      { s:'My sister and I love music. ___ love music.',  opts:['We','They','You','It'], a:0, fb:'"We" — yo + mi hermana = nosotros.' },
    ],
  },
};

// ─── Speaking A1 data ─────────────────────────────────────────────────────────

const PHRASES = [
  { phrase:'Hello! How are you?',     phonetic:'[heh-LOH · haw ar yoo]',   es:'¡Hola! ¿Cómo estás?' },
  { phrase:'My name is ___.',         phonetic:'[mai neym iz]',             es:'Me llamo ___.' },
  { phrase:"I'm from Colombia.",      phonetic:'[aim from koh-LOM-bia]',    es:'Soy de Colombia.' },
  { phrase:'Nice to meet you.',       phonetic:'[nais tuh meet yoo]',       es:'Mucho gusto.' },
  { phrase:'Thank you very much.',    phonetic:'[thænk yoo VER-ee mutch]',  es:'Muchas gracias.' },
  { phrase:"I don't understand.",     phonetic:'[ai dohnt un-der-STÆND]',   es:'No entiendo.' },
  { phrase:'Can you repeat that?',    phonetic:'[kæn yoo rih-PEET thæt]',  es:'¿Puede repetir eso?' },
  { phrase:'Where is the bathroom?',  phonetic:'[wer iz thuh BÆTH-room]',   es:'¿Dónde está el baño?' },
  { phrase:'How much does it cost?',  phonetic:'[haw mutch duz it kost]',   es:'¿Cuánto cuesta?' },
  { phrase:'I need help, please.',    phonetic:'[ai need help pleez]',      es:'Necesito ayuda, por favor.' },
];

// ─── Writing A1 data ──────────────────────────────────────────────────────────

const WRITING_PROMPT = 'Describe yourself in 3 sentences. Include: (1) your name and age, (2) where you live and work/study, (3) one thing you like.';
const VOCAB_BANK = [
  'My name is', 'I am ___ years old', 'I live in', 'I work in', 'I study at',
  'I like', 'I love', 'I have', 'I am a', 'every day', 'my family',
];

// ─── Token parser for reading ─────────────────────────────────────────────────

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({
    raw: t,
    isSpace: /^\s+$/.test(t),
    clean: t.replace(/[^a-zA-Z]/g, '').toLowerCase(),
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ReadingA1() {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activeIdx, setActiveIdx]   = useState<number | null>(null);
  const [phase, setPhase]           = useState<'read' | 'questions' | 'done'>('read');
  const [answers, setAnswers]       = useState<Record<number, number>>({});
  const [revealed, setRevealed]     = useState<Record<number, boolean>>({});
  const [openAns, setOpenAns]       = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenize(READING_TEXT);
  const allMcqDone = READ_Q.every((_, i) => answers[i] !== undefined);

  function handleWord(clean: string, idx: number) {
    if (!clean) return;
    setActiveWord(VOCAB[clean] ?? null);
    setActiveIdx(idx);
  }

  function handleAnswer(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Reading card */}
      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />Texto A1 — Toca cualquier palabra para ver su traducción
          </p>
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative' }}>
            {tokens.map((t, i) => {
              if (t.isSpace) return <span key={i}>{t.raw}</span>;
              const hasTrans = !!VOCAB[t.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    onClick={() => handleWord(t.clean, i)}
                    style={{
                      background: isActive ? 'rgba(0,102,204,0.12)' : hasTrans ? 'rgba(0,102,204,0.06)' : 'transparent',
                      border: isActive ? '1.5px solid #0066cc' : hasTrans ? '1px dashed rgba(0,102,204,0.3)' : 'none',
                      borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                      fontSize: 'inherit', fontFamily: 'inherit', color: isActive ? '#0066cc' : 'inherit',
                      fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                    }}
                  >
                    {t.raw}
                  </button>
                  {isActive && activeWord && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: '#14215c', color: '#fff', borderRadius: 8, padding: '0.3rem 0.65rem',
                      fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10,
                      boxShadow: '0 4px 16px rgba(20,33,92,0.25)', marginTop: 4,
                    }}>
                      {activeWord}
                    </span>
                  )}
                  {isActive && !activeWord && (
                    <span style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: '#6f7691', color: '#fff', borderRadius: 8, padding: '0.3rem 0.65rem',
                      fontSize: '0.72rem', whiteSpace: 'nowrap', zIndex: 10, marginTop: 4,
                    }}>
                      (palabra funcional)
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              Ya leí el texto → Responder preguntas
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Ocultar tooltip
            </button>
          </div>
        </div>
      )}

      {/* Questions */}
      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>
            ← Volver al texto
          </button>

          {READ_Q.map((q, qi) => {
            const ans = answers[qi];
            const done = ans !== undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0066cc', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  {qi < 2 ? 'Vocabulario' : 'Comprensión'} · Pregunta {qi + 1}
                </div>
                <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.98rem' }}>{q.q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {q.opts.map((opt, oi) => {
                    const isCorrect = oi === q.a;
                    const isSelected = ans === oi;
                    let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
                    if (done && isSelected && isCorrect)  { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                    if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                    if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
                    return (
                      <button key={oi} onClick={() => handleAnswer(qi, oi)} disabled={done}
                        style={{
                          textAlign: 'left', padding: '0.65rem 1rem', borderRadius: 10,
                          border, background: bg, color, fontSize: '0.92rem',
                          cursor: done ? 'default' : 'pointer', fontFamily: 'inherit',
                          display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s',
                        }}
                      >
                        <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.6 }}>
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        {opt}
                        {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                        {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {revealed[qi] && (
                  <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.9rem', borderRadius: 8, background: answers[qi] === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.83rem', color: 'var(--ink-2)' }}>
                    {answers[qi] === q.a ? '✅ ' : '💡 '}{q.fb}
                  </div>
                )}
              </div>
            );
          })}

          {/* Open question */}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0066cc', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              Pregunta abierta
            </div>
            <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.98rem' }}>{OPEN_Q}</p>
            <textarea
              value={openAns} onChange={e => setOpenAns(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              rows={3}
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical',
                border: '1.5px solid var(--line-soft)', background: 'var(--bg)',
                color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>

          {allMcqDone && (
            <button className="btn btn-sm" onClick={() => setPhase('done')}>
              Ver resultado →
            </button>
          )}
        </div>
      )}

      {/* Done */}
      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {Object.entries(answers).filter(([i, v]) => v === READ_Q[+i].a).length === READ_Q.length ? '🎉' : '📚'}
          </div>
          <h2 style={{ margin: '0 0 0.5rem', color: 'var(--ink)' }}>
            {Object.entries(answers).filter(([i, v]) => v === READ_Q[+i].a).length} / {READ_Q.length} correctas
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
            {Object.entries(answers).filter(([i, v]) => v === READ_Q[+i].a).length >= 3
              ? '¡Excelente comprensión! Estás listo/a para textos A2.'
              : 'Buen intento. Vuelve al texto y busca las respuestas antes de reintentar.'}
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setRevealed({}); setOpenAns(''); }}>
              Intentar de nuevo
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('read')}>
              Volver al texto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Grammar A1 ───────────────────────────────────────────────────────────────

function GramaticaA1() {
  const [topic, setTopic]     = useState<keyof typeof GRAMMAR_TOPICS>('articles');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const data = GRAMMAR_TOPICS[topic];
  const all = data.qs.length;
  const done = Object.keys(answers).length;
  const correct = data.qs.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Topic selector */}
      <div className="wl-card" style={{ padding: '1.25rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Elige un tema</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[]).map(k => (
            <button key={k}
              className={topic === k ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              onClick={() => { setTopic(k); reset(); }}
              style={{ fontSize: '0.84rem' }}
            >
              {GRAMMAR_TOPICS[k].title}
            </button>
          ))}
        </div>
        <p style={{ margin: '0.85rem 0 0', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          {data.desc}
        </p>
      </div>

      {/* Progress */}
      {done > 0 && !showResult && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${(done / all) * 100}%`, background: '#0066cc', borderRadius: 4, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexShrink: 0 }}>{done}/{all}</span>
        </div>
      )}

      {/* Questions */}
      {!showResult && data.qs.map((q, qi) => {
        const ans = answers[qi];
        const isDone = ans !== undefined;
        return (
          <div key={`${topic}-${qi}`} className="wl-card" style={{ padding: '1.25rem' }}>
            <p style={{ margin: '0 0 0.85rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.7 }}>
              {qi + 1}. {q.s.split('___').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{ display: 'inline-block', minWidth: 70, borderBottom: '2px solid #0066cc', margin: '0 4px', verticalAlign: 'bottom' }}>
                      {isDone && <span style={{ fontSize: '0.88rem', fontWeight: 800, color: answers[qi] === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                    </span>
                  )}
                </span>
              ))}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {q.opts.map((opt, oi) => {
                const isCorrect = oi === q.a;
                const isSelected = ans === oi;
                let bg = 'var(--bg-2)'; let border = '1px solid var(--line-soft)'; let color = 'var(--ink)';
                if (isDone && isCorrect)  { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                return (
                  <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                    style={{
                      padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700,
                      border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {revealed[qi] && (
              <div style={{ marginTop: '0.65rem', fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.5rem 0.75rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)' }}>
                {ans === q.a ? '✅ ' : `✗ La respuesta es "${q.opts[q.a]}". `}{q.fb}
              </div>
            )}
          </div>
        );
      })}

      {done === all && !showResult && (
        <button className="btn btn-sm" onClick={() => setShowResult(true)}>Ver mi resultado →</button>
      )}

      {showResult && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{correct === all ? '🏆' : correct >= all * 0.7 ? '⭐' : '📖'}</div>
          <h2 style={{ margin: '0 0 0.5rem', color: 'var(--ink)' }}>{correct} / {all} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
            {correct === all ? '¡Perfecto! Dominas este tema.' : correct >= all * 0.7 ? 'Muy bien. Repasa los errores y vuelve a intentarlo.' : 'Estudia la explicación y practica de nuevo.'}
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={reset}>Intentar de nuevo</button>
            <button className="btn btn-ghost btn-sm" onClick={() => {
              const keys = Object.keys(GRAMMAR_TOPICS) as (keyof typeof GRAMMAR_TOPICS)[];
              const next = keys[(keys.indexOf(topic) + 1) % keys.length];
              setTopic(next); reset();
            }}>Siguiente tema →</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Writing A1 ───────────────────────────────────────────────────────────────

function EscrituraA1() {
  const [text, setText]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  function handleVocab(word: string) {
    setText(p => p ? `${p} ${word}` : word);
  }

  if (submitted) {
    return (
      <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#059669' }}>¡Texto enviado!</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1rem', maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
          Tu escritura fue registrada. Un profesor de WeLearn la revisará pronto y te dará feedback personalizado.
        </p>
        <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.25rem', textAlign: 'left', maxWidth: 440, margin: '0 auto 1.25rem' }}>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{text}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); }}>
          Escribir otro texto
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Prompt */}
      <div className="wl-card" style={{ padding: '1.5rem', borderTop: '3px solid #0066cc' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Tarea de escritura A1</p>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.7 }}>
          {WRITING_PROMPT}
        </p>
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['💡 3 frases mínimo', '✏️ Tiempo libre', '🔤 En inglés'].map(tag => (
            <span key={tag} style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 6, background: 'rgba(0,102,204,0.08)', color: '#0066cc', border: '1px solid rgba(0,102,204,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="wl-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Tu respuesta:</span>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words >= 20 ? '#059669' : 'var(--muted)' }}>
            {words} palabras {words >= 20 ? '✓' : '(mín. 20)'}
          </span>
        </div>
        <textarea
          value={text} onChange={e => setText(e.target.value)}
          placeholder="Start writing here... / Empieza a escribir aquí..."
          rows={6}
          style={{
            width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical',
            border: '1.5px solid var(--line-soft)', background: 'var(--bg)',
            color: 'var(--ink)', fontSize: '0.98rem', fontFamily: 'inherit', boxSizing: 'border-box',
            lineHeight: 1.8,
          }}
        />
      </div>

      {/* Vocabulary bank */}
      <div className="wl-card" style={{ padding: '1.25rem' }}>
        <p style={{ margin: '0 0 0.65rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--mono)' }}>
          Banco de vocabulario útil — haz click para insertar
        </p>
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          {VOCAB_BANK.map(v => (
            <button key={v} onClick={() => handleVocab(v)}
              style={{
                fontSize: '0.82rem', padding: '0.3rem 0.7rem', borderRadius: 8,
                border: '1px solid rgba(0,102,204,0.25)', background: 'rgba(0,102,204,0.06)',
                color: '#0066cc', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
              }}
            >{v}</button>
          ))}
        </div>
      </div>

      <button
        className="btn btn-sm"
        disabled={words < 10}
        onClick={() => setSubmitted(true)}
        style={{ opacity: words < 10 ? 0.5 : 1 }}
      >
        Enviar texto →
      </button>
      {words < 10 && words > 0 && (
        <p style={{ margin: '-0.75rem 0 0', fontSize: '0.8rem', color: 'var(--muted)' }}>Escribe al menos 10 palabras antes de enviar.</p>
      )}
    </div>
  );
}

// ─── Speaking A1 ──────────────────────────────────────────────────────────────

function HablaA1() {
  const [status, setStatus] = useState<Record<number, 'done' | 'retry' | null>>({});
  const done = Object.values(status).filter(v => v === 'done').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="wl-card" style={{ padding: '1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Práctica de pronunciación A1</p>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          Lee cada frase en voz alta. Usa la guía fonética para aproximar la pronunciación.
          Después marca si lo lograste o necesitas más práctica — es autoevaluación honesta.
        </p>
        {done > 0 && (
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${(done / PHRASES.length) * 100}%`, background: '#059669', borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: '#059669' }}>{done}/{PHRASES.length} frases</span>
          </div>
        )}
      </div>

      {PHRASES.map((p, i) => {
        const s = status[i];
        return (
          <div key={i} className="wl-card" style={{
            padding: '1.25rem',
            borderLeft: s === 'done' ? '3px solid #059669' : s === 'retry' ? '3px solid #f59e0b' : '3px solid var(--line-soft)',
            transition: 'border-color 0.3s',
          }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.25rem' }}>{p.phrase}</div>
              <div style={{ fontSize: '0.85rem', color: '#0066cc', fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>{p.phonetic}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>{p.es}</div>
            </div>
            {s === null || s === undefined ? (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button onClick={() => setStatus(p => ({ ...p, [i]: 'done' }))}
                  style={{ padding: '0.45rem 1rem', borderRadius: 8, border: '1.5px solid #059669', background: 'rgba(5,150,105,0.08)', color: '#059669', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ✓ Lo logré
                </button>
                <button onClick={() => setStatus(p => ({ ...p, [i]: 'retry' }))}
                  style={{ padding: '0.45rem 1rem', borderRadius: 8, border: '1.5px solid #f59e0b', background: 'rgba(245,158,11,0.08)', color: '#d97706', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  🔁 Necesito practicar
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: s === 'done' ? '#059669' : '#d97706' }}>
                  {s === 'done' ? '✓ Completado' : '🔁 Para practicar'}
                </span>
                <button onClick={() => setStatus(p => { const n = { ...p }; delete n[i]; return n; })}
                  style={{ fontSize: '0.75rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>
                  Cambiar
                </button>
              </div>
            )}
          </div>
        );
      })}

      {done === PHRASES.length && (
        <div className="wl-card" style={{ padding: '1.25rem', textAlign: 'center', background: 'rgba(5,150,105,0.07)', border: '1.5px solid #059669' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎉</div>
          <p style={{ margin: 0, fontWeight: 700, color: '#059669' }}>¡Completaste todas las frases de supervivencia!</p>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Practica estas frases en voz alta todos los días hasta que fluyan naturalmente.</p>
        </div>
      )}
    </div>
  );
}

// ─── Listening A1 (placeholder) ───────────────────────────────────────────────

function EscuchaA1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center', borderTop: '3px solid #0066cc' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎧</div>
        <h2 style={{ margin: '0 0 0.5rem', color: 'var(--ink)', fontSize: '1.4rem' }}>Escucha A1 — Próximamente</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', maxWidth: 400, margin: '0 auto 1.25rem', lineHeight: 1.65 }}>
          Los ejercicios de escucha A1 estarán disponibles muy pronto. Incluirán diálogos reales, ejercicios de completar texto y comprensión auditiva.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🗣️ Diálogos reales', '📝 Fill in the blanks', '🔊 Frases de supervivencia', '🎯 True / False'].map(tag => (
            <span key={tag} style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem', borderRadius: 20, background: 'rgba(0,102,204,0.08)', color: '#0066cc', border: '1px solid rgba(0,102,204,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontSize: '0.85rem', color: 'var(--muted)' }}>
        Mientras esperas: escucha podcasts lentos en inglés como <strong style={{ color: 'var(--ink)' }}>VOA Learning English</strong> o <strong style={{ color: 'var(--ink)' }}>BBC Learning English</strong> — son recursos gratuitos ideales para nivel A1-A2.
      </div>
    </div>
  );
}

// ─── Root hub ─────────────────────────────────────────────────────────────────

const LEVELS = [
  { id: 'A1', label: 'A1 — Principiante', active: true },
  { id: 'A2', label: 'A2 — Básico',       active: false },
  { id: 'B1', label: 'B1 — Intermedio',   active: false },
  { id: 'B2', label: 'B2 — Intermedio alto', active: false },
  { id: 'C1', label: 'C1 — Avanzado',     active: false },
];

const SKILLS: { id: Skill; label: string; icon: string; desc: string }[] = [
  { id: 'lectura',   label: 'Lectura',    icon: '📖', desc: 'Texto con vocabulario + preguntas de comprensión' },
  { id: 'gramatica', label: 'Gramática',  icon: '⚡', desc: 'Artículos, verb to be, pronombres' },
  { id: 'escritura', label: 'Escritura',  icon: '✏️', desc: 'Prompt guiado con banco de vocabulario' },
  { id: 'habla',     label: 'Expresión oral', icon: '🗣️', desc: 'Frases de supervivencia con guía fonética' },
  { id: 'escucha',   label: 'Escucha',    icon: '🎧', desc: 'Próximamente' },
];

export default function InglesHubClient() {
  const [level, setLevel] = useState<string | null>(null);
  const [skill, setSkill] = useState<Skill | null>(null);

  // ── Level selector ──────────────────────────────────────────────────────────
  if (!level) {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <Link href="/practica" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Práctica</Link>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Práctica / Inglés</span>
            </div>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🇬🇧 Práctica de Inglés</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Elige tu nivel</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 2rem' }}>Ejercicios de Lectura, Gramática, Escritura y Expresión oral.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {LEVELS.map(l => (
                <button key={l.id} onClick={() => l.active && setLevel(l.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem 1.25rem', borderRadius: 14,
                    border: l.active ? '1.5px solid #0066cc' : '1.5px solid var(--line-soft)',
                    background: l.active ? 'rgba(0,102,204,0.06)' : 'var(--bg-2)',
                    cursor: l.active ? 'pointer' : 'default', fontFamily: 'inherit',
                    opacity: l.active ? 1 : 0.6, transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: 6,
                      background: l.active ? '#0066cc' : 'var(--line-soft)',
                      color: l.active ? '#fff' : 'var(--muted)', fontFamily: 'var(--mono)',
                    }}>{l.id}</span>
                    <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{l.label}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: l.active ? '#0066cc' : 'var(--muted)', fontWeight: l.active ? 700 : 400 }}>
                    {l.active ? 'Practicar →' : 'Próximamente'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Skill selector ──────────────────────────────────────────────────────────
  if (!skill) {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <button onClick={() => setLevel(null)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Volver</button>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Inglés / {level}</span>
            </div>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Inglés {level}</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>¿Qué quieres practicar?</h1>
            <div className="wl-exams-catalog" style={{ marginTop: '1.5rem' }}>
              {SKILLS.map(s => (
                <button key={s.id}
                  onClick={() => s.id !== 'escucha' && setSkill(s.id)}
                  className={`wl-catalog-card${s.id === 'escucha' ? ' wl-catalog-card--soon' : ''}`}
                  style={{ '--exam-color': '#0066cc', textAlign: 'left', cursor: s.id !== 'escucha' ? 'pointer' : 'default', appearance: 'none', WebkitAppearance: 'none', margin: 0, padding: 0, font: 'inherit', color: 'inherit', display: 'flex', flexDirection: 'column' } as React.CSSProperties}
                >
                  <div className="wl-catalog-card__bar" />
                  <div className="wl-catalog-card__body">
                    <div className="wl-catalog-card__top">
                      <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                      {s.id === 'escucha' && <span className="wl-catalog-card__badge">Próximamente</span>}
                    </div>
                    <h2 className="wl-catalog-card__name">{s.label}</h2>
                    <p className="wl-catalog-card__tagline">{s.desc}</p>
                  </div>
                  <div className="wl-catalog-card__footer">
                    <span>Inglés {level}</span>
                    <span className="wl-catalog-card__cta">{s.id === 'escucha' ? 'Próximamente' : 'Practicar →'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Exercise ────────────────────────────────────────────────────────────────
  const skillLabel = SKILLS.find(s => s.id === skill)?.label ?? skill;
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={() => setSkill(null)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Habilidades</button>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Inglés {level} / {skillLabel}</span>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />🇬🇧 Inglés {level} — {skillLabel}</p>
          </div>
          {skill === 'lectura'   && <ReadingA1 />}
          {skill === 'gramatica' && <GramaticaA1 />}
          {skill === 'escritura' && <EscrituraA1 />}
          {skill === 'habla'     && <HablaA1 />}
          {skill === 'escucha'   && <EscuchaA1 />}
        </div>
      </div>
    </section>
  );
}
