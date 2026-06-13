'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#003189';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }
interface Topic { id: string; title: string; icon: string; desc: string; tip: string; qs: GQItem[]; }

const TOPICS: Topic[] = [
  {
    id: 'articles', title: 'Articles: le/la/l\'/les/un/une', icon: '📗',
    desc: 'Masculin → le/un · Féminin → la/une · Devant voyelle → l\' · Pluriel → les/des',
    tip: 'Truco: si la palabra empieza con vocal (a, e, i, o, u), usa l\' en vez de le/la.',
    qs: [
      { s:"J'ai ___ frère.",               opts:["un","une","le","l'"],     a:0, fb:'"Frère" es masculino, primera mención → un frère.' },
      { s:"Elle a ___ sœur.",              opts:["un","une","le","la"],     a:1, fb:'"Sœur" es femenino, primera mención → une sœur.' },
      { s:"___ chat est mignon.",          opts:["Le","La","L'","Les"],     a:0, fb:'"Chat" = masculino → le chat.' },
      { s:"___ école est grande.",         opts:["Le","La","L'","Les"],     a:2, fb:'"École" empieza con vocal → l\'école.' },
      { s:"J'ai ___ amis.",               opts:["des","les","un","de"],    a:0, fb:'Plural indefinido → des amis.' },
      { s:"___ livres sont sur la table.", opts:["Le","La","Les","L'"],    a:2, fb:'Plural definido → les livres.' },
      { s:"Il lit ___ journal.",          opts:["un","une","le","l'"],     a:0, fb:'"Journal" es masculino, primera mención → un journal.' },
      { s:"C'est ___ belle ville.",        opts:["un","une","le","la"],     a:1, fb:'"Ville" es femenino → une ville.' },
      { s:"___ hôtel est moderne.",        opts:["Le","La","L'","Les"],     a:2, fb:'"Hôtel" empieza con vocal → l\'hôtel (aunque h no se pronuncia).' },
      { s:"J'ai ___ stylos dans mon sac.", opts:["des","les","un","de"],    a:0, fb:'Plural indefinido → des stylos.' },
    ],
  },
  {
    id: 'etre', title: 'Être au présent', icon: '⚡',
    desc: 'je suis · tu es · il/elle est · nous sommes · vous êtes · ils/elles sont',
    tip: 'Recuerda: être (ser/estar) es completamente irregular. ¡No hay patrón lógico, hay que memorizar!',
    qs: [
      { s:"Je ___ étudiant(e).",          opts:["suis","es","est","sommes"], a:0, fb:'"Je suis" — con je siempre suis.' },
      { s:"Tu ___ français(e)?",          opts:["suis","es","est","êtes"],   a:1, fb:'"Tu es" — con tu siempre es.' },
      { s:"Il ___ médecin.",              opts:["suis","es","est","sont"],   a:2, fb:'"Il est" — con il/elle → est.' },
      { s:"Elle ___ très gentille.",      opts:["suis","es","est","sont"],   a:2, fb:'"Elle est" — con il/elle → est.' },
      { s:"Nous ___ amis.",               opts:["sommes","êtes","sont","es"],a:0, fb:'"Nous sommes" — con nous → sommes.' },
      { s:"Vous ___ à Paris?",            opts:["sommes","êtes","sont","es"],a:1, fb:'"Vous êtes" — con vous → êtes.' },
      { s:"Ils ___ à l'école.",           opts:["sommes","êtes","sont","es"],a:2, fb:'"Ils sont" — con ils/elles → sont.' },
      { s:"Je ne ___ pas fatigué(e).",    opts:["suis","es","est","sommes"], a:0, fb:'"Je ne suis pas" — negación: ne + verbo + pas.' },
      { s:"Elles ___ très belles.",       opts:["sommes","êtes","sont","es"],a:2, fb:'"Elles sont" — plural femenino → sont.' },
      { s:"Tu ___ prêt(e)?",             opts:["suis","es","est","êtes"],   a:1, fb:'"Tu es" — con tu → es.' },
    ],
  },
  {
    id: 'avoir', title: 'Avoir au présent', icon: '🔑',
    desc: 'j\'ai · tu as · il/elle a · nous avons · vous avez · ils/elles ont',
    tip: 'Avoir se usa para decir la edad: "J\'ai vingt ans" (tengo veinte años). En español usamos "tener", no "ser".',
    qs: [
      { s:"J'___ vingt ans.",             opts:["ai","as","a","avons"],   a:0, fb:'"J\'ai" — con je → ai.' },
      { s:"Tu ___ un chat?",              opts:["ai","as","a","avez"],    a:1, fb:'"Tu as" — con tu → as.' },
      { s:"Il ___ une voiture.",          opts:["ai","as","a","ont"],     a:2, fb:'"Il a" — con il/elle → a.' },
      { s:"Nous ___ faim.",               opts:["avons","avez","ont","as"],a:0, fb:'"Nous avons" — con nous → avons.' },
      { s:"Vous ___ des enfants?",        opts:["avons","avez","ont","as"],a:1, fb:'"Vous avez" — con vous → avez.' },
      { s:"Elles ___ peur.",              opts:["avons","avez","ont","a"], a:2, fb:'"Elles ont" — con ils/elles → ont.' },
      { s:"J'___ un frère et une sœur.",  opts:["ai","as","a","avons"],   a:0, fb:'"J\'ai" — con je → ai.' },
      { s:"Tu ___ soif?",                 opts:["ai","as","a","avez"],    a:1, fb:'"Tu as soif" = "¿Tienes sed?" — con tu → as.' },
      { s:"Il ___ besoin d'aide.",        opts:["ai","as","a","ont"],     a:2, fb:'"Il a besoin" = "él necesita (tiene necesidad)" — con il → a.' },
      { s:"Ils ___ beaucoup de travail.", opts:["avons","avez","ont","a"], a:2, fb:'"Ils ont" — con ils → ont.' },
    ],
  },
  {
    id: 'negation', title: 'La négation (ne...pas)', icon: '🚫',
    desc: 'Forma negativa: ne + verbe + pas. Avec élision: n\'+ verbe + pas (devant voyelle)',
    tip: 'La "ne" a menudo se omite en francés hablado informal ("Je sais pas"), pero en francés escrito siempre se pone.',
    qs: [
      { s:"Je ___ parle pas anglais.",   opts:["ne","n'","pas","non"],   a:0, fb:'"Je ne parle pas" — ne antes de consonante.' },
      { s:"Il ___ aime pas les légumes.", opts:["ne","n'","pas","non"],  a:1, fb:'"Il n\'aime pas" — n\' antes de vocal (aime).' },
      { s:"Tu ___ comprends pas?",       opts:["ne","n'","pas","non"],   a:0, fb:'"Tu ne comprends pas?" — ne antes de consonante.' },
      { s:"Je ___ suis pas fatigué.",    opts:["ne","n'","pas","non"],   a:0, fb:'"Je ne suis pas" — être en negativo.' },
      { s:"Elle ___ est pas là.",        opts:["ne","n'","pas","non"],   a:1, fb:'"Elle n\'est pas" — n\' antes de vowel (est).' },
      { s:"Je parle ___ anglais.",       opts:["ne","n'","pas","non"],   a:2, fb:'La negación requiere ne...pas: "je ne parle pas".' },
      { s:"Nous ___ avons pas de chat.", opts:["ne","n'","pas","non"],   a:1, fb:'"Nous n\'avons pas" — avons empieza con vocal → n\'.' },
      { s:"Vous ___ habitez pas ici?",   opts:["ne","n'","pas","non"],   a:0, fb:'"Vous ne habitez pas" — ne antes de consonante (h aspirada).' },
    ],
  },
  {
    id: 'questions', title: 'Poser des questions', icon: '❓',
    desc: 'Est-ce que...? / Qu\'est-ce que...? / Comment / Où / Quand / Combien',
    tip: '"Est-ce que" es la forma más fácil de hacer preguntas: simplemente pon "est-ce que" antes de una oración afirmativa.',
    qs: [
      { s:"___ vous habitez? (¿Dónde vives?)", opts:["Comment","Où","Quand","Combien"], a:1, fb:'"Où" = dónde. "Comment" = cómo. "Quand" = cuándo.' },
      { s:"___ vous appelez-vous? (¿Cómo se llama?)", opts:["Comment","Où","Quand","Qui"], a:0, fb:'"Comment" = cómo.' },
      { s:"___ est-ce que tu vas? (¿Cómo estás?)", opts:["Comment","Où","Combien","Quand"], a:0, fb:'"Comment est-ce que tu vas?" — forma formal.' },
      { s:"___ ça coûte? (¿Cuánto cuesta?)", opts:["Comment","Où","Combien","Quand"], a:2, fb:'"Combien" = cuánto/cuántos.' },
      { s:"___ est-ce que le cours commence? (¿Cuándo empieza?)", opts:["Pourquoi","Où","Quand","Comment"], a:2, fb:'"Quand" = cuándo.' },
      { s:"___ est-ce que tu aimes? (¿Qué te gusta?)", opts:["Qui","Qu'","Où","Comment"], a:1, fb:'"Qu\'est-ce que tu aimes?" — qu\' = qué (ante vocal).' },
      { s:"___ parle français? (¿Quién habla francés?)", opts:["Qui","Où","Quand","Comment"], a:0, fb:'"Qui" = quién.' },
    ],
  },
];

export default function GramaticaFrancesA1() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const topic = TOPICS[topicIdx];
  const all = topic.qs.length;
  const done = Object.keys(answers).length;
  const correct = topic.qs.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }
  function nextTopic() { setTopicIdx(i => (i + 1) % TOPICS.length); reset(); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 740 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>⚡ Grammaire</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Grammaire · Français A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Grammaire A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 1.5rem' }}>5 temas esenciales: artículos, être, avoir, negación y preguntas.</p>

        {/* Topic selector */}
        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
          {TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize:'0.78rem', ...(topicIdx === i ? { background:COLOR, borderColor:COLOR } : {}) }}>
              {t.icon} {t.title.split(':')[0].split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Topic card */}
        <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.25rem' }}>Regla</div>
          <div style={{ fontWeight:700, color:'var(--ink)', marginBottom:'0.3rem' }}>{topic.desc}</div>
          <div style={{ fontSize:'0.82rem', color:'var(--muted)', borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem', marginTop:'0.5rem' }}>💡 {topic.tip}</div>
        </div>

        {/* Progress */}
        {done > 0 && !showResult && (
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
            <div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}>
              <div style={{ height:'100%', width:`${(done/all)*100}%`, background:COLOR, borderRadius:4, transition:'width 0.4s' }} />
            </div>
            <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)', flexShrink:0 }}>{done}/{all}</span>
          </div>
        )}

        {!showResult && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
            {topic.qs.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={`${topic.id}-${qi}`} style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
                  <p style={{ margin:'0 0 0.7rem', fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.7 }}>
                    {qi+1}. {q.s.split('___').map((part, i, arr) => (
                      <span key={i}>{part}{i < arr.length-1 && (
                        <span style={{ display:'inline-block', minWidth:72, borderBottom:`2px solid ${COLOR}`, margin:'0 4px', verticalAlign:'bottom' }}>
                          {isDone && <span style={{ fontSize:'0.88rem', fontWeight:800, color:ans===q.a?'#059669':'#dc2626' }}>{q.opts[ans]}</span>}
                        </span>
                      )}</span>
                    ))}
                  </p>
                  <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect=oi===q.a, isSel=ans===oi;
                      let bg='var(--bg-2)', border=`1px solid var(--line-soft)`, color='var(--ink)';
                      if (isDone && isCorrect) { bg='rgba(5,150,105,0.1)'; border='1px solid #059669'; color='#059669'; }
                      if (isDone && isSel && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1px solid #dc2626'; color='#dc2626'; }
                      return (
                        <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                          style={{ padding:'0.45rem 1rem', borderRadius:8, fontSize:'0.92rem', fontWeight:700, border, background:bg, color, cursor:isDone?'default':'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && <div style={{ marginTop:'0.55rem', fontSize:'0.8rem', color:'var(--muted)', padding:'0.45rem 0.7rem', borderRadius:8, background:ans===q.a?'rgba(5,150,105,0.07)':'rgba(220,38,38,0.07)' }}>
                    {ans===q.a?'✅ ':`✗ Correct: "${q.opts[q.a]}". `}{q.fb}
                  </div>}
                </div>
              );
            })}
            {done===all && <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background:COLOR, borderColor:COLOR }}>Ver mi resultado →</button>}
          </div>
        )}

        {showResult && (
          <div style={{ padding:'1.75rem', borderRadius:18, border:'1.5px solid var(--line-soft)', background:'var(--bg)', textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{correct===all?'🏆':correct>=all*0.7?'⭐':'📖'}</div>
            <h2 style={{ margin:'0 0 0.25rem', fontWeight:800, color:'var(--ink)' }}>{correct} / {all} correctas</h2>
            <p style={{ color:'var(--muted)', fontSize:'0.88rem', margin:'0 0 1.25rem' }}>{correct===all?'¡Parfait! Dominas este tema.':correct>=all*0.7?'Très bien. Repasa los errores.':'Estudia la regla arriba y practica de nuevo.'}</p>
            <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background:COLOR, borderColor:COLOR }}>Intentar de nuevo</button>
              <button className="btn btn-ghost btn-sm" onClick={nextTopic}>Siguiente tema →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
