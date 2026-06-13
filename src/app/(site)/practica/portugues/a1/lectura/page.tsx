'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#009c3b';

interface ReadingText {
  id: number; title: string; topic: string; text: string;
  vocab: Record<string, string>;
  preQ: string[];
  mcq: { q: string; opts: string[]; a: number; fb: string }[];
  openQ: string; prodPrompt: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Olá, eu sou o Carlos', topic: 'Apresentação pessoal',
    text: "Olá! Meu nome é Carlos. Tenho trinta anos. Moro em São Paulo com minha esposa e meu filho. Trabalho num escritório perto de casa. Todo dia tomo café da manhã com pão e frutas. No fim de semana, gosto de ir ao parque com minha família. Adoro futebol e música brasileira.",
    vocab: { olá:'¡hola', nome:'nombre', tenho:'tengo', trinta:'treinta', moro:'vivo', esposa:'esposa', filho:'hijo', trabalho:'trabajo', escritório:'oficina', perto:'cerca', casa:'casa', manhã:'mañana', pão:'pan', frutas:'frutas', semana:'semana', gosto:'me gusta', parque:'parque', família:'familia', adoro:'adoro', futebol:'fútbol', música:'música', brasileira:'brasileña' },
    preQ: ['¿Qué información personal crees que encontrarás en la presentación de Carlos?', '¿Qué significa "Meu nome é"? ¿Se parece a alguna expresión que conozcas?'],
    mcq: [
      { q:'¿Qué significa "filho"?', opts:['hija','hijo','amigo','hermano'], a:1, fb:'"Filho" = hijo. "Filha" = hija.' },
      { q:'¿Qué significa "escritório"?', opts:['escuela','hospital','oficina','restaurante'], a:2, fb:'"Escritório" = oficina (lugar de trabajo).' },
      { q:'¿Dónde vive Carlos?', opts:['Rio de Janeiro','Brasília','São Paulo','Salvador'], a:2, fb:'"Moro em São Paulo" — Carlos vive en São Paulo.' },
      { q:'¿Qué hace Carlos los fines de semana?', opts:['Va al cine','Va al parque','Trabaja','Viaja'], a:1, fb:'"Gosto de ir ao parque" — Carlos va al parque.' },
      { q:'¿Qué cosas le gustan a Carlos?', opts:['Música y cine','Fútbol y música brasileña','Baile y teatro','Lectura y viajes'], a:1, fb:'"Adoro futebol e música brasileira."' },
    ],
    openQ: '¿Qué cosas le gustan a Carlos?', prodPrompt: 'Escribe 2 oraciones presentándote en portugués: tu nombre y dónde vives.',
  },
  {
    id: 2, title: 'A família da Ana', topic: 'A família',
    text: "Meu nome é Ana. Tenho uma família grande. Meu pai se chama Roberto. Ele é professor e tem cinquenta anos. Minha mãe se chama Márcia. Ela é enfermeira. Tenho dois irmãos e uma irmã. Meu irmão mais velho se chama Lucas. Ele mora em Belo Horizonte. Minha irmã se chama Sofia. Ela tem dezessete anos.",
    vocab: { meu:'mi/meu', tenho:'tengo', pai:'padre', chama:'se llama', professor:'profesor', mãe:'madre', enfermeira:'enfermera', irmãos:'hermanos', irmã:'hermana', velho:'mayor/viejo', mora:'vive', horizonte:'horizonte', dezessete:'diecisiete' },
    preQ: ['¿Qué palabras para miembros de la familia conoces en portugués?', '¿Cuál es la diferencia entre "irmão" e "irmã"?'],
    mcq: [
      { q:'¿Qué profesión tiene el padre de Ana?', opts:['Médico','Abogado','Profesor','Ingeniero'], a:2, fb:'"Meu pai... é professor."' },
      { q:'¿Cómo se llama la madre de Ana?', opts:['Sofia','Márcia','Ana','Carla'], a:1, fb:'"Minha mãe se chama Márcia."' },
      { q:'¿Dónde vive el hermano mayor?', opts:['São Paulo','Rio de Janeiro','Curitiba','Belo Horizonte'], a:3, fb:'"Ele mora em Belo Horizonte."' },
      { q:'¿Cuántos años tiene Sofia?', opts:['Quince','Dieciséis','Diecisiete','Dieciocho'], a:2, fb:'"Minha irmã... tem dezessete anos."' },
      { q:'¿Cuántos hermanos tiene Ana en total?', opts:['1','2','3','4'], a:2, fb:'Dois irmãos + uma irmã = 3 hermanos.' },
    ],
    openQ: '¿Qué hace la madre de Ana y cómo se llama el hermano mayor?', prodPrompt: 'Describe a un miembro de tu familia en 2 oraciones en portugués.',
  },
  {
    id: 3, title: 'O meu apartamento', topic: 'A moradia',
    text: "Moro num apartamento pequeno no centro de Recife. O apartamento tem dois quartos, uma sala, uma cozinha e um banheiro. Na sala, tem um sofá e uma televisão grande. No quarto, tem uma cama e um guarda-roupa. A cozinha é moderna. Gosto muito do meu apartamento porque fica perto do trabalho e tem uma vista bonita.",
    vocab: { apartamento:'apartamento', pequeno:'pequeño', centro:'centro', recife:'Recife', quartos:'habitaciones', sala:'sala', cozinha:'cocina', banheiro:'baño', sofá:'sofá', televisão:'televisión', quarto:'habitación', cama:'cama', guarda_roupa:'armario', moderna:'moderna', vista:'vista', bonita:'bonita' },
    preQ: ['¿Qué habitaciones esperas encontrar en un apartamento brasileño?', '¿Qué significa "tem" en el contexto "O apartamento tem dois quartos"?'],
    mcq: [
      { q:'¿En qué ciudad vive el narrador?', opts:['Fortaleza','Recife','Salvador','Natal'], a:1, fb:'"Moro no centro de Recife."' },
      { q:'¿Cuántos cuartos tiene el apartamento?', opts:['Uno','Dos','Tres','Cuatro'], a:1, fb:'"O apartamento tem dois quartos."' },
      { q:'¿Qué hay en la sala?', opts:['Una cama y un armario','Un sofá y una televisión','Una mesa y sillas','Un escritorio'], a:1, fb:'"Na sala, tem um sofá e uma televisão grande."' },
      { q:'¿Por qué le gusta el apartamento al narrador?', opts:['Es barato y bonito','Está cerca del trabajo y tiene buena vista','Es grande y moderno','Tiene jardín y piscina'], a:1, fb:'"...fica perto do trabalho e tem uma vista bonita."' },
      { q:'¿Qué significa "guarda-roupa"?', opts:['guardarropa/armario','ropa de cama','dormitorio','armario de cocina'], a:0, fb:'"Guarda-roupa" = armario (ropero).' },
    ],
    openQ: '¿Cómo es la cocina y qué tiene el dormitorio?', prodPrompt: 'Describe tu habitación en 2 oraciones usando "tem" (hay/tiene).',
  },
  {
    id: 4, title: 'A rotina do João', topic: 'A rotina diária',
    text: "Meu nome é João. Acordo às seis e meia. Tomo banho e me visto rapidamente. Tomo café da manhã com pão de queijo e café com leite. Às sete e meia, pego o metrô para ir ao trabalho. Trabalho das oito às cinco da tarde. Na hora do almoço, como numa lanchonete perto do escritório. À noite, volto para casa e janto com minha família.",
    vocab: { acordo:'me despierto', seis:'seis', meia:'y media', tomo:'tomo', banho:'baño/ducha', visto:'me visto', rapidamente:'rápidamente', pão_queijo:'pan de queso', leite:'leche', pego:'tomo/cojo', metrô:'metro', oito:'ocho', cinco:'cinco', tarde:'tarde', almoço:'almuerzo', como:'como', lanchonete:'cafetería/restaurante rápido', noite:'noche', volto:'vuelvo', janto:'ceno' },
    preQ: ['¿Cuál es la primera cosa que hace João al levantarse?', '¿Conoces el "pão de queijo"? Es una especialidad brasileña. ¿Qué crees que es?'],
    mcq: [
      { q:'¿A qué hora se despierta João?', opts:['A las seis','A las seis y media','A las siete','A las siete y media'], a:1, fb:'"Acordo às seis e meia" — a las seis y media.' },
      { q:'¿Qué toma João para desayunar?', opts:['Solo café','Pan de queso y café con leche','Cereales y jugo','Tostadas y fruta'], a:1, fb:'"Tomo café da manhã com pão de queijo e café com leite."' },
      { q:'¿Cómo va João al trabajo?', opts:['En coche','A pie','En metro','En autobús'], a:2, fb:'"...pego o metrô para ir ao trabalho."' },
      { q:'¿Hasta qué hora trabaja João?', opts:['Hasta las cuatro','Hasta las cinco de la tarde','Hasta las seis','Hasta las siete'], a:1, fb:'"Trabalho das oito às cinco da tarde."' },
      { q:'¿Dónde almuerza João?', opts:['En casa','En el trabajo','En una cafetería cerca de la oficina','En un restaurante caro'], a:2, fb:'"...como numa lanchonete perto do escritório."' },
    ],
    openQ: '¿Qué hace João por la noche?', prodPrompt: 'Escribe 2 oraciones sobre tu rutina matutina en portugués.',
  },
  {
    id: 5, title: 'No mercado', topic: 'Fazer compras',
    text: "Hoje eu vou ao mercado com minha mãe. Precisamos comprar legumes e frutas. Compro tomates, cenouras e batatas. Minha mãe compra maçãs e bananas. Os legumes estão frescos e não são muito caros. O vendedor é simpático. Ele nos dá um pouco de salsinha de graça. Pagamos vinte reais e voltamos para casa.",
    vocab: { hoje:'hoy', vou:'voy', mercado:'mercado', precisamos:'necesitamos', comprar:'comprar', legumes:'verduras', tomates:'tomates', cenouras:'zanahorias', batatas:'papas/patatas', maçãs:'manzanas', bananas:'bananas', frescos:'frescos', caros:'caros', vendedor:'vendedor', simpático:'simpático', salsinha:'perejil/perejil', graça:'gratis', pagamos:'pagamos', reais:'reales (moneda)', voltamos:'volvemos' },
    preQ: ['¿Qué frutas y verduras conoces en portugués?', '¿Cuál es la moneda de Brasil? (pista: "reais")'],
    mcq: [
      { q:'¿Con quién va al mercado?', opts:['Con su padre','Con un amigo','Con su madre','Solo'], a:2, fb:'"...vou ao mercado com minha mãe."' },
      { q:'¿Qué compra el narrador?', opts:['Manzanas y bananas','Tomates, zanahorias y papas','Pan y queso','Leche y mantequilla'], a:1, fb:'"Compro tomates, cenouras e batatas."' },
      { q:'¿Cómo son los legumes (verduras)?', opts:['Caros y viejos','Frescos y no muy caros','Baratos pero malos','Importados'], a:1, fb:'"Os legumes estão frescos e não são muito caros."' },
      { q:'¿Qué da el vendedor de regalo?', opts:['Un tomate','Una banana','Un poco de perejil','Una zanahoria'], a:2, fb:'"Ele nos dá um pouco de salsinha de graça."' },
      { q:'¿Cuánto pagan en total?', opts:['Dez reais','Quinze reais','Vinte reais','Trinta reais'], a:2, fb:'"Pagamos vinte reais."' },
    ],
    openQ: '¿Qué compra la madre y cómo es el vendedor?', prodPrompt: 'Escribe 2 oraciones sobre lo que comprarías en un mercado brasileiro.',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t),
    clean: t.replace(/[^a-zA-ZÀ-ÿ]/g, '').toLowerCase(),
  }));
}

type Phase = 'pre' | 'read' | 'questions' | 'done';

function TextExercise({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('pre');
  const [preAnswers, setPreAnswers] = useState<string[]>(['', '']);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [openAns, setOpenAns] = useState('');
  const [prod, setProd] = useState('');

  const tokens = tokenize(t.text);
  const allMcqDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleAnswer(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  const STEPS = ['Antes de ler', 'Leitura', 'Perguntas', 'Resultado'];

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:0, fontFamily:'var(--mono)', fontSize:'0.82rem' }}>📖 Leitura A1</button>
        <span>/</span>
        <span style={{ color:COLOR, fontWeight:800 }}>Texto {t.id}</span>
      </div>
      <div style={{ display:'flex', gap:'0', marginBottom:'1.75rem', overflowX:'auto' }}>
        {STEPS.map((s, i) => {
          const phaseIdx = ['pre','read','questions','done'].indexOf(phase);
          const active = phaseIdx === i, done2 = phaseIdx > i;
          return (
            <div key={s} style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:1 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:active?COLOR:done2?'#059669':'var(--line-soft)', color:(active||done2)?'#fff':'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.72rem', fontWeight:800, fontFamily:'var(--mono)', flexShrink:0 }}>
                  {done2?'✓':i+1}
                </div>
                <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:active?COLOR:done2?'#059669':'var(--muted)', fontWeight:active?800:400, marginTop:4, textAlign:'center', whiteSpace:'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ height:2, flex:1, background:done2?'#059669':'var(--line-soft)', margin:'0 4px', marginBottom:20 }}/>}
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div>
          <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Tema · {t.topic}</div>
            <h2 style={{ margin:'0 0 0.25rem', fontWeight:700, fontSize:'1.4rem', color:'var(--ink)' }}>{t.title}</h2>
          </div>
          <div style={{ padding:'1rem 1.2rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>Antes de ler — reflita</div>
            {t.preQ.map((q, i) => (
              <div key={i} style={{ marginBottom:'0.75rem' }}>
                <p style={{ margin:'0 0 0.3rem', fontSize:'0.9rem', fontWeight:600, color:'var(--ink)' }}>{i+1}. {q}</p>
                <textarea value={preAnswers[i]} onChange={e => { const a=[...preAnswers]; a[i]=e.target.value; setPreAnswers(a); }} rows={2} placeholder="Escreva sua hipótese..."
                  style={{ width:'100%', padding:'0.55rem 0.75rem', borderRadius:8, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.88rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background:COLOR, borderColor:COLOR }}>Ler o texto →</button>
        </div>
      )}

      {phase === 'read' && (
        <div>
          <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Clique em uma palavra para ver a tradução</div>
            <div style={{ lineHeight:2.1, fontSize:'1.05rem', color:'var(--ink)', position:'relative' }}>
              {tokens.map((tok, i) => {
                if (tok.isSpace) return <span key={i}>{tok.raw}</span>;
                const has = !!t.vocab[tok.clean];
                const isActive = activeIdx === i;
                return (
                  <span key={i} style={{ position:'relative', display:'inline-block' }}>
                    <button onClick={() => setActiveIdx(isActive?null:i)}
                      style={{ background:isActive?`${COLOR}18`:has?`${COLOR}08`:'transparent', border:isActive?`1.5px solid ${COLOR}`:has?`1px dashed ${COLOR}44`:'none', borderRadius:5, padding:'0 3px', cursor:has?'pointer':'default', fontSize:'inherit', fontFamily:'inherit', color:isActive?COLOR:'inherit', fontWeight:isActive?700:'inherit', transition:'all 0.15s' }}>
                      {tok.raw}
                    </button>
                    {isActive && (
                      <span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:t.vocab[tok.clean]?COLOR:'#6b7280', color:'#fff', borderRadius:8, padding:'0.25rem 0.6rem', fontSize:'0.75rem', fontWeight:600, whiteSpace:'nowrap', zIndex:10, boxShadow:`0 4px 14px ${COLOR}30`, marginTop:3 }}>
                        {t.vocab[tok.clean]??'(palavra gramatical)'}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => setPhase('questions')} style={{ background:COLOR, borderColor:COLOR }}>Responder perguntas →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← Antes de ler</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPhase('read')} style={{ marginBottom:'1rem' }}>← Voltar ao texto</button>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
            {t.mcq.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={qi} style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
                  <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Pergunta {qi+1}</div>
                  <p style={{ margin:'0 0 0.75rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{q.q}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect=oi===q.a, isSel=ans===oi;
                      let bg='var(--bg)', border='1.5px solid var(--line-soft)', color='var(--ink)';
                      if (isDone && isCorrect) { bg='rgba(5,150,105,0.1)'; border='1.5px solid #059669'; color='#059669'; }
                      if (isDone && isSel && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1.5px solid #dc2626'; color='#dc2626'; }
                      return (
                        <button key={oi} onClick={() => handleAnswer(qi,oi)} disabled={isDone}
                          style={{ textAlign:'left', padding:'0.55rem 0.9rem', borderRadius:9, border, background:bg, color, fontSize:'0.9rem', cursor:isDone?'default':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.15s' }}>
                          <span style={{ fontSize:'0.72rem', fontFamily:'var(--mono)', fontWeight:700, opacity:0.55 }}>{String.fromCharCode(65+oi)}.</span>
                          {opt}
                          {isDone && isCorrect && <span style={{ marginLeft:'auto' }}>✓</span>}
                          {isDone && isSel && !isCorrect && <span style={{ marginLeft:'auto' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && <div style={{ marginTop:'0.6rem', padding:'0.55rem 0.8rem', borderRadius:8, background:ans===q.a?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.8rem', color:'var(--muted)' }}>{ans===q.a?'✅ ':'💡 '}{q.fb}</div>}
                </div>
              );
            })}
            <div style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
              <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Pergunta aberta</div>
              <p style={{ margin:'0 0 0.6rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{t.openQ}</p>
              <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={2} placeholder="Escreva sua resposta..."
                style={{ width:'100%', padding:'0.6rem 0.8rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
            </div>
            <div style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:`1.5px solid ${COLOR}22`, background:`${COLOR}04` }}>
              <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Mini-produção</div>
              <p style={{ margin:'0 0 0.6rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{t.prodPrompt}</p>
              <textarea value={prod} onChange={e => setProd(e.target.value)} rows={2} placeholder="Escreva em português..."
                style={{ width:'100%', padding:'0.6rem 0.8rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
            </div>
            {allMcqDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background:COLOR, borderColor:COLOR }}>Ver resultado →</button>}
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ padding:'1.75rem', borderRadius:18, border:'1.5px solid var(--line-soft)', background:'var(--bg)', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score===t.mcq.length?'🎉':score>=3?'⭐':'📚'}</div>
          <h2 style={{ margin:'0 0 0.25rem', fontWeight:800, color:'var(--ink)', fontSize:'1.5rem' }}>{score} / {t.mcq.length} corretas</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.88rem', margin:'0 0 1.25rem' }}>{score===t.mcq.length?'Perfeito! Compreensão total.':score>=3?'Muito bem!':'Releia o texto e tente novamente.'}</p>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setAnswers({}); setRevealed({}); setOpenAns(''); setProd(''); setPreAnswers(['','']); }} style={{ background:COLOR, borderColor:COLOR }}>Tentar de novo</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Outros textos</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeituraPortuguesA1() {
  const [textId, setTextId] = useState<number | null>(null);
  const text = TEXTS.find(t => t.id === textId);

  if (text) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:720 }}>
        <TextExercise t={text} onBack={() => setTextId(null)} />
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇧🇷 Português A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📖 Leitura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Leitura · Português A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Compreensão Leitora A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:540, margin:'0 0 2rem' }}>5 textos autênticos com vocabulário interativo e perguntas de compreensão.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {TEXTS.map(t => (
            <button key={t.id} onClick={() => setTextId(t.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1.1rem', padding:'1.1rem 1.4rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}04`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 20px ${COLOR}18`;(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}55`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;}}>
                <div style={{ width:44, height:44, borderRadius:11, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', fontWeight:900, fontFamily:'var(--mono)', flexShrink:0 }}>{t.id}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.1rem' }}>{t.title}</div>
                  <p style={{ margin:0, fontSize:'0.78rem', color:'var(--muted)' }}>{t.topic} · {t.mcq.length} perguntas</p>
                </div>
                <span style={{ color:COLOR, fontSize:'1.1rem', fontWeight:700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
