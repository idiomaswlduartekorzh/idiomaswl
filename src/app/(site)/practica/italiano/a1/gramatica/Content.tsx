'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#7c3aed';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; icon: string; desc: string; tip: string; qs: GQItem[] }> = {
  articoli: {
    title: 'Articoli — il/la/un/una',
    icon: '📌',
    desc: 'Articolo determinativo: il (masc.), la (fem.), lo (masch. z/s+cons.), l\' (davanti vocale). Plurale: i, le, gli. Indeterminativo: un, una, uno, un\'.',
    tip: 'Trucco: "lo" va davanti a z-, s+consonante, gn-, ps-, x-, y-. Esempi: lo zio, lo studente, lo gnomo. In tutto il resto: il.',
    qs: [
      { s: '___ libro è interessante.', opts: ['Il', 'Lo', 'La', 'Un'], a: 0, fb: '"Il libro" — libro è maschile, inizia con consonante normale: il.' },
      { s: '___ amica di Maria è simpatica.', opts: ['Il', 'Lo', "L'", 'La'], a: 2, fb: '"L\'amica" — parola femminile che inizia con vocale: l\'.' },
      { s: 'Ho ___ zaino nuovo.', opts: ['un', 'uno', "un'", 'una'], a: 1, fb: '"Uno zaino" — zaino inizia con z: si usa uno (indeterminativo maschile).' },
      { s: '___ studente studia molto.', opts: ['Il', 'Lo', 'La', 'Un'], a: 1, fb: '"Lo studente" — studente inizia con s+t (gruppo consonantico): si usa lo.' },
      { s: 'Leggo ___ libro ogni giorno.', opts: ['il', 'lo', 'un', 'uno'], a: 2, fb: '"un libro" — prima menzione, maschile con consonante normale: un.' },
      { s: '___ case di Roma sono bellissime.', opts: ['Il', 'Le', 'I', 'Gli'], a: 1, fb: '"Le case" — case è femminile plurale: si usa le.' },
      { s: '___ amici vengono stasera.', opts: ['I', 'Gli', 'Le', 'Il'], a: 1, fb: '"Gli amici" — amici inizia con vocale, plurale maschile: gli.' },
      { s: 'Ho ___ sorella maggiore.', opts: ['un', 'uno', "un'", 'una'], a: 3, fb: '"una sorella" — sorella è femminile con consonante: una.' },
      { s: '___ occhi di Giulia sono verdi.', opts: ['I', 'Gli', 'Le', 'L\''], a: 1, fb: '"Gli occhi" — occhi inizia con o (vocale), plurale maschile: gli.' },
      { s: 'Compro ___ arancia al mercato.', opts: ['un', 'uno', "un'", 'una'], a: 2, fb: '"un\'arancia" — arancia è femminile con vocale: un\' (con apostrofo).' },
    ],
  },
  essere_avere: {
    title: 'Essere e Avere — presente',
    icon: '🔵',
    desc: 'ESSERE: sono / sei / è / siamo / siete / sono. AVERE: ho / hai / ha / abbiamo / avete / hanno. Nota: la h in avere è SEMPRE muta.',
    tip: 'Memoria: "essere" = esistir, identidad. "avere" = tener. "Io sono studente" (soy), "io ho un libro" (tengo). En italiano "ho" no lleva acento — la h solo bloquea el hiato.',
    qs: [
      { s: 'Io ___ italiano.', opts: ['sono', 'sei', 'è', 'ho'], a: 0, fb: '"Io sono" — la 1ª persona singular de essere es "sono".' },
      { s: 'Luca ___ venti anni.', opts: ['è', 'ha', 'sono', 'hai'], a: 1, fb: '"Luca ha" — per l\'età in italiano si usa AVERE: ha venti anni.' },
      { s: 'Voi ___ di Milano?', opts: ['siete', 'avete', 'sono', 'siamo'], a: 0, fb: '"Voi siete" — 2ª persona plurale di essere.' },
      { s: 'Noi ___ due gatti.', opts: ['siamo', 'abbiamo', 'hanno', 'avete'], a: 1, fb: '"Noi abbiamo" — 1ª persona plurale di avere: abbiamo.' },
      { s: 'Tu ___ stanco?', opts: ['sei', 'hai', 'è', 'siete'], a: 0, fb: '"Tu sei" — 2ª persona singular di essere: sei.' },
      { s: 'Maria ___ una borsa rossa.', opts: ['è', 'ha', 'sono', 'hai'], a: 1, fb: '"Maria ha" — ha (3ª persona singular di avere): tener.' },
      { s: 'Loro ___ studenti universitari.', opts: ['sono', 'hanno', 'è', 'siete'], a: 0, fb: '"Loro sono" — 3ª persona plurale di essere: sono (uguale alla 1ª!).' },
      { s: 'Io non ___ fame adesso.', opts: ['sono', 'ho', 'sei', 'ha'], a: 1, fb: '"non ho fame" — avere fame = tener hambre. Si usa avere per sensazioni fisiche.' },
      { s: 'Dove ___ la fermata del bus?', opts: ['è', 'ha', 'sono', 'sei'], a: 0, fb: '"Dov\'è" — contratto di dove + è. La fermata è (está): essere per posizione.' },
      { s: 'Gli studenti ___ molto entusiasmo.', opts: ['sono', 'hanno', 'è', 'siamo'], a: 1, fb: '"hanno entusiasmo" — avere per "tener algo": gli studenti hanno entusiasmo.' },
    ],
  },
  verbi_are: {
    title: 'Verbi -ARE/-ERE/-IRE al presente',
    icon: '⏰',
    desc: 'PARLARE: parlo/parli/parla/parliamo/parlate/parlano. VEDERE: vedo/vedi/vede/vediamo/vedete/vedono. DORMIRE: dormo/dormi/dorme/dormiamo/dormite/dormono.',
    tip: 'La terminazione -ARE è la più frequente. Nota: la 3ª plurale termina sempre in -ano (-are), -ono (-ere/-ire). Confronta con lo spagnolo: -ar/-er/-ir seguono una logica simile!',
    qs: [
      { s: 'Io ___ (parlare) italiano ogni giorno.', opts: ['parlo', 'parli', 'parla', 'parlano'], a: 0, fb: '"parlo" — io + verbo -are: radice + -o. parl + o = parlo.' },
      { s: 'Marco ___ (vedere) un film stasera.', opts: ['vedo', 'vedi', 'vede', 'vedono'], a: 2, fb: '"vede" — lui/lei + verbo -ere: radice + -e. ved + e = vede.' },
      { s: 'Voi ___ (dormire) tardi il sabato?', opts: ['dormite', 'dormono', 'dormiamo', 'dormi'], a: 0, fb: '"dormite" — voi + verbo -ire: radice + -ite. dorm + ite = dormite.' },
      { s: 'Noi ___ (lavorare) in un ufficio.', opts: ['lavorano', 'lavoriamo', 'lavorate', 'lavori'], a: 1, fb: '"lavoriamo" — noi + verbo -are: radice + -iamo. lavor + iamo = lavoriamo.' },
      { s: 'Loro ___ (mangiare) la pizza.', opts: ['mangia', 'mangiamo', 'mangiate', 'mangiano'], a: 3, fb: '"mangiano" — loro + verbo -are: radice + -ano. mangi + ano = mangiano.' },
      { s: 'Tu ___ (leggere) molti libri?', opts: ['leggo', 'leggi', 'legge', 'leggono'], a: 1, fb: '"leggi" — tu + verbo -ere: radice + -i. legg + i = leggi.' },
      { s: 'Lei ___ (abitare) a Roma.', opts: ['abito', 'abiti', 'abita', 'abitano'], a: 2, fb: '"abita" — lei/lui + verbo -are: radice + -a. abit + a = abita.' },
      { s: 'Io ___ (capire) bene lo spagnolo.', opts: ['capisci', 'capisce', 'capisco', 'capiscono'], a: 2, fb: '"capisco" — io + verbo -ire tipo -isc: cap + isco = capisco. (capire = verbo con infisso -isc-).' },
    ],
  },
  pronomi: {
    title: 'Pronomi soggetto e accordo',
    icon: '👤',
    desc: 'Pronomi: io, tu, lui/lei, noi, voi, loro. In italiano i pronomi soggetto sono FACOLTATIVI (si omettono spesso) perché la desinenza del verbo li indica.',
    tip: 'A diferencia del español, en italiano "lei" (ella) y "Lei" (usted formal) son iguales. Se distinguen por contexto y mayúscula. "Voi" = ustedes (no "Usted" formal en el sur de Italia).',
    qs: [
      { s: 'Maria è italiana. ___ è di Roma.', opts: ['Lui', 'Lei', 'Loro', 'Essa'], a: 1, fb: '"Lei" — Maria è donna → pronome femminile singolare lei.' },
      { s: 'Marco e Luca studiano. ___ studiano medicina.', opts: ['Noi', 'Voi', 'Loro', 'Lui'], a: 2, fb: '"Loro" — Marco e Luca sono un gruppo di terze persone → loro.' },
      { s: 'Io e te siamo amici. ___ siamo colleghi da anni.', opts: ['Voi', 'Loro', 'Noi', 'Lui'], a: 2, fb: '"Noi" — io + te = noi (prima persona plurale).' },
      { s: 'Il gatto dorme. ___ dorme sul divano.', opts: ['Lei', 'Lui', 'Esso', 'Loro'], a: 1, fb: '"Lui" — in italiano colloquiale si usa lui/lei anche per animali.' },
      { s: '___ (voi) dove andate in vacanza quest\'estate?', opts: ['Tu', 'Loro', 'Voi', 'Noi'], a: 2, fb: '"Voi" — 2ª persona plurale, equivale a "ustedes" in spagnolo.' },
      { s: 'La macchina è rossa. ___ è molto veloce.', opts: ['Lui', 'Lei', 'Esso', 'Loro'], a: 1, fb: '"Lei" — macchina è femminile, si usa lei (informale) o essa (formale).' },
      { s: 'Io e mia sorella cuciniamo insieme. ___ cuciniamo la domenica.', opts: ['Voi', 'Loro', 'Noi', 'Tu'], a: 2, fb: '"Noi" — io + mia sorella = noi. Prima persona plurale.' },
      { s: 'Il professore spiega bene. ___ spiega in modo chiaro.', opts: ['Lei', 'Lui', 'Voi', 'Loro'], a: 1, fb: '"Lui" — professore è maschile → lui.' },
    ],
  },
  ce_ci_sono: {
    title: "C'è / Ci sono + preposizioni di luogo",
    icon: '📍',
    desc: "C'È (c'è = ci è) = hay (singular). CI SONO = hay (plural). Preposizioni: in, a, su, sotto, vicino a, davanti a, dietro a, accanto a.",
    tip: '"C\'è" o "ci sono" equivalen al "hay" español. "C\'è un libro" = hay un libro. "Ci sono libri" = hay libros. Attenzione: NON si usa essere senza ci per questo significato!',
    qs: [
      { s: "___ un gatto sul tetto.", opts: ["C'è", 'Ci sono', 'È', 'Sono'], a: 0, fb: '"C\'è un gatto" — un gatto è singolare → c\'è.' },
      { s: '___ molte persone in piazza.', opts: ["C'è", 'Ci sono', 'È', 'Ha'], a: 1, fb: '"Ci sono molte persone" — persone è plurale → ci sono.' },
      { s: 'Il libro è ___ tavolo.', opts: ['in', 'su', 'a', 'sotto'], a: 1, fb: '"sul tavolo" — su = sopra una superficie. Sul = su + il.' },
      { s: 'La fermata è ___ all\'angolo.', opts: ['dietro', 'sotto', 'vicino', 'dentro'], a: 2, fb: '"vicino all\'angolo" — vicino a = cerca de. Indica prossimità.' },
      { s: "___ due ristoranti ___ scuola.", opts: ["C'è / vicino alla", 'Ci sono / vicino alla', "C'è / sotto la", 'Ci sono / dentro la'], a: 1, fb: '"Ci sono due ristoranti vicino alla scuola" — due è plurale → ci sono; vicino alla = cerca de la.' },
      { s: 'Il cane dorme ___ il letto.', opts: ['su', 'in', 'sotto', 'davanti a'], a: 2, fb: '"sotto il letto" — sotto = debajo de. Il cane è sotto il letto.' },
      { s: 'La farmacia è ___ la banca.', opts: ['sotto', 'davanti a', 'accanto a', 'dentro'], a: 2, fb: '"accanto alla banca" — accanto a = al lado de. Indica posizione adiacente.' },
      { s: "___ una piscina ___ palestra.", opts: ["C'è / in", "Ci sono / nella", "C'è / dentro la", "C'è / nella"], a: 3, fb: '"C\'è una piscina nella palestra" — una è singolare → c\'è; nella = in + la (dentro della palestra).' },
    ],
  },
};

export default function GramaticaItalianoA1() {
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
          <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammatica · Italiano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Grammatica A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 1.75rem' }}>
          5 temas esenciales con 8–10 ejercicios cada uno. Explicación + ejemplos + feedback inmediato.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {topics.map(([k, v]) => (
            <button key={k} onClick={() => switchTopic(k)}
              className={topicKey === k ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.83rem', ...(topicKey === k ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {v.icon} {v.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.6 }}>📖 {data.desc}</p>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}>✨ {data.tip}</p>
        </div>

        {done > 0 && !showResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: COLOR, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexShrink: 0 }}>{done}/{total}</span>
          </div>
        )}

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
                      {ans === q.a ? '✅ ' : `✗ Risposta: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}
            {done === total && (
              <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: COLOR, borderColor: COLOR }}>
                Vedere il risultato →
              </button>
            )}
          </div>
        )}

        {showResult && (
          <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{correct === total ? '🏆' : correct >= total * 0.7 ? '⭐' : '📖'}</div>
            <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{correct} / {total} corrette</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
              {correct === total ? 'Perfetto! Padroneggi questo tema.' : correct >= total * 0.7 ? 'Molto bene. Ripassala gli errori e riprova.' : 'Studia la spiegazione sopra e pratica di nuovo.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: COLOR, borderColor: COLOR }}>Riprovare</button>
              <button className="btn btn-ghost btn-sm" onClick={() => {
                const keys = Object.keys(GRAMMAR_TOPICS);
                const next = keys[(keys.indexOf(topicKey) + 1) % keys.length];
                switchTopic(next);
              }}>Tema seguente →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
