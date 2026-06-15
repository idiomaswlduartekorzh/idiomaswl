'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#009c3b';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }
interface Topic { id: string; title: string; icon: string; desc: string; tip: string; qs: GQItem[]; }

const TOPICS: Topic[] = [
  {
    id: 'artigos', title: 'Artigos: o/a/um/uma', icon: '📗',
    desc: 'Masculino → o (definido) / um (indefinido) · Feminino → a (definida) / uma (indefinida) · Plural → os/as/uns/umas',
    tip: 'A diferença de gênero é similar ao espanhol: palavras que terminam em -o tendem a ser masculinas e em -a femininas. Mas há exceções!',
    qs: [
      { s:'___ livro é interessante.',    opts:['O','A','Um','Uma'],     a:0, fb:'"O livro" — livro é masculino → o.' },
      { s:'___ casa é bonita.',           opts:['O','A','Um','Uma'],     a:1, fb:'"A casa" — casa é feminino → a.' },
      { s:'Eu tenho ___ irmão.',          opts:['o','a','um','uma'],     a:2, fb:'"Um irmão" — masculino indefinido → um.' },
      { s:'Ela tem ___ filha.',           opts:['o','a','um','uma'],     a:3, fb:'"Uma filha" — feminino indefinido → uma.' },
      { s:'___ alunos estudam muito.',    opts:['O','A','Os','As'],      a:2, fb:'"Os alunos" — plural masculino → os.' },
      { s:'___ professoras são ótimas.',  opts:['O','A','Os','As'],      a:3, fb:'"As professoras" — plural feminino → as.' },
      { s:'Quero ___ café, por favor.',   opts:['o','a','um','uma'],     a:2, fb:'"Um café" — masculino indefinido → um.' },
      { s:'Preciso de ___ caneta.',       opts:['o','a','um','uma'],     a:3, fb:'"Uma caneta" — feminino indefinido → uma.' },
      { s:'___ menino está na escola.',   opts:['O','A','Um','Uma'],     a:0, fb:'"O menino" — masculino definido → o.' },
      { s:'___ cidade é grande.',         opts:['O','A','Um','Uma'],     a:1, fb:'"A cidade" — feminino definido → a.' },
    ],
  },
  {
    id: 'ser_estar', title: 'Ser vs Estar', icon: '⚡',
    desc: 'Ser = identidade permanente (origem, profissão, característica). Estar = estado temporário ou localização.',
    tip: 'Regra geral: "Ser" para quem você É. "Estar" para como você ESTÁ. Ex: "Sou estudante" (soy estudiante) vs "Estou cansado" (estoy cansado).',
    qs: [
      { s:'Eu ___ estudante. (identidade)',      opts:['sou','estou','é','está'],       a:0, fb:'"Eu sou" — identidade → ser.' },
      { s:'Ele ___ cansado hoje. (estado)',       opts:['sou','estou','é','está'],       a:3, fb:'"Ele está cansado" — estado temporário → estar.' },
      { s:'Nós ___ do Brasil. (origem)',          opts:['somos','estamos','são','estão'],a:0, fb:'"Nós somos" — origem → ser.' },
      { s:'Ela ___ feliz agora. (estado)',        opts:['sou','estou','é','está'],       a:3, fb:'"Ela está feliz" — estado temporário → estar.' },
      { s:'Você ___ professor? (profissão)',      opts:['sou','estou','é','está'],       a:2, fb:'"Você é" — profissão → ser.' },
      { s:'Eles ___ em casa. (localização)',      opts:['são','estão','somos','estamos'],a:1, fb:'"Eles estão" — localização → estar.' },
      { s:'O café ___ quente. (estado)',          opts:['é','está','sou','estou'],       a:1, fb:'"O café está quente" — estado temporário → estar.' },
      { s:'Minha mãe ___ médica. (profissão)',    opts:['é','está','sou','estou'],       a:0, fb:'"Minha mãe é médica" — profissão → ser.' },
      { s:'Eu ___ bem, obrigado. (estado)',       opts:['sou','estou','é','está'],       a:1, fb:'"Eu estou bem" — estado → estar.' },
      { s:'São Paulo ___ uma cidade grande.',     opts:['é','está','sou','estou'],       a:0, fb:'"São Paulo é" — característica permanente → ser.' },
    ],
  },
  {
    id: 'verbos_ar', title: 'Verbos regulares -AR', icon: '🔑',
    desc: 'EU -o · TU -as · ELE/ELA -a · NÓS -amos · VOCÊS/ELES -am',
    tip: 'En Brasil, "você" se usa mucho en lugar de "tu". Con "você" se conjuga igual que "ele/ela": você fala, você mora, você come.',
    qs: [
      { s:'Eu ___ (falar) português.',    opts:['falo','falas','fala','falamos'],      a:0, fb:'"Eu falo" — eu + -o.' },
      { s:'Você ___ (morar) em São Paulo?',opts:['moro','moras','mora','moram'],      a:2, fb:'"Você mora" — você + -a.' },
      { s:'Ela ___ (trabalhar) muito.',   opts:['trabalho','trabalhas','trabalha','trabalham'],a:2, fb:'"Ela trabalha" — ela + -a.' },
      { s:'Nós ___ (estudar) inglês.',    opts:['estudo','estudas','estuda','estudamos'],a:3, fb:'"Nós estudamos" — nós + -amos.' },
      { s:'Eles ___ (amar) o Brasil.',    opts:['amo','amas','ama','amam'],             a:3, fb:'"Eles amam" — eles + -am.' },
      { s:'Tu ___ (gostar) de música?',   opts:['gosto','gostas','gosta','gostam'],     a:1, fb:'"Tu gostas" — tu + -as.' },
      { s:'Eu ___ (tomar) café de manhã.',opts:['tomo','tomas','toma','tomamos'],       a:0, fb:'"Eu tomo" — eu + -o.' },
      { s:'Nós ___ (usar) o computador.', opts:['uso','usas','usa','usamos'],           a:3, fb:'"Nós usamos" — nós + -amos.' },
      { s:'Ela ___ (comprar) frutas.',    opts:['compro','compras','compra','compram'], a:2, fb:'"Ela compra" — ela + -a.' },
      { s:'Você ___ (ajudar) muito.',     opts:['ajudo','ajudas','ajuda','ajudam'],     a:2, fb:'"Você ajuda" — você + -a (igual que ele/ela).' },
    ],
  },
  {
    id: 'ter', title: 'Verbo "ter" (ter/tener)', icon: '🏠',
    desc: 'eu tenho · tu tens · ele/ela tem · nós temos · vocês/eles têm',
    tip: '"Ter" = tener en español. Úsalo para posesión ("tenho um carro") y edad ("tenho 25 anos"). Nota: en español "tener años", en português también "ter anos".',
    qs: [
      { s:'Eu ___ um irmão.',        opts:['tenho','tens','tem','temos'],    a:0, fb:'"Eu tenho" — eu + tenho.' },
      { s:'Você ___ um carro?',      opts:['tenho','tens','tem','têm'],      a:2, fb:'"Você tem" — você + tem (igual que ele/ela).' },
      { s:'Ela ___ trinta anos.',    opts:['tenho','tens','tem','têm'],      a:2, fb:'"Ela tem trinta anos" — ela + tem.' },
      { s:'Nós ___ aula amanhã.',    opts:['temos','tens','tem','têm'],      a:0, fb:'"Nós temos" — nós + temos.' },
      { s:'Eles ___ dois filhos.',   opts:['temos','tens','tem','têm'],      a:3, fb:'"Eles têm" — plural + têm.' },
      { s:'Tu ___ fome?',            opts:['tenho','tens','tem','temos'],    a:1, fb:'"Tu tens" — tu + tens. "Ter fome" = tener hambre.' },
      { s:'Eu ___ vinte e cinco anos.',opts:['tenho','tens','tem','temos'],  a:0, fb:'"Eu tenho" — eu + tenho.' },
      { s:'O apartamento ___ três quartos.',opts:['tenho','tens','tem','têm'],a:2,fb:'"O apartamento tem" — 3ª pessoa sing. + tem.' },
    ],
  },
];

export default function GramaticaPortuguesA1() {
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
      <div className="wrap" style={{ maxWidth:740 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇧🇷 Português A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>⚡ Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Gramática · Português A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Gramática A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 1.5rem' }}>4 temas fundamentais: artigos, ser/estar, verbos -AR e o verbo "ter".</p>

        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
          {TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx===i?'btn btn-sm':'btn btn-ghost btn-sm'}
              style={{ fontSize:'0.78rem', ...(topicIdx===i?{background:COLOR,borderColor:COLOR}:{}) }}>
              {t.icon} {t.title.split(':')[0]}
            </button>
          ))}
        </div>

        <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.25rem' }}>Regra</div>
          <div style={{ fontWeight:700, color:'var(--ink)', marginBottom:'0.3rem' }}>{topic.desc}</div>
          <div style={{ fontSize:'0.82rem', color:'var(--muted)', borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem', marginTop:'0.5rem' }}>💡 {topic.tip}</div>
        </div>

        {done > 0 && !showResult && (
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
            <div style={{ flex:1, height:6, background:'var(--line-soft)', borderRadius:4 }}>
              <div style={{ height:'100%', width:`${(done/all)*100}%`, background:COLOR, borderRadius:4, transition:'width 0.4s' }}/>
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
                    {ans===q.a?'✅ ':`✗ Correto: "${q.opts[q.a]}". `}{q.fb}
                  </div>}
                </div>
              );
            })}
            {done===all && <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background:COLOR, borderColor:COLOR }}>Ver meu resultado →</button>}
          </div>
        )}

        {showResult && (
          <div style={{ padding:'1.75rem', borderRadius:18, border:'1.5px solid var(--line-soft)', background:'var(--bg)', textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{correct===all?'🏆':correct>=all*0.7?'⭐':'📖'}</div>
            <h2 style={{ margin:'0 0 0.25rem', fontWeight:800, color:'var(--ink)' }}>{correct} / {all} corretas</h2>
            <p style={{ color:'var(--muted)', fontSize:'0.88rem', margin:'0 0 1.25rem' }}>{correct===all?'Perfeito! Você domina este tema.':correct>=all*0.7?'Muito bem. Revise os erros.':'Estude a regra acima e pratique de novo.'}</p>
            <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background:COLOR, borderColor:COLOR }}>Tentar de novo</button>
              <button className="btn btn-ghost btn-sm" onClick={nextTopic}>Próximo tema →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
