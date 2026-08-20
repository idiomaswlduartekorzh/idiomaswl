'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; gender?: string; }
interface VocabSet { id: string; name: string; namePt: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'familia', name: 'La familia', namePt: 'A família', icon: '👨‍👩‍👧‍👦',
    words: [
      { word:'o pai', es:'el padre', emoji:'👨', example:'Meu pai é engenheiro.', exampleEs:'Mi padre es ingeniero.', gender:'m' },
      { word:'a mãe', es:'la madre', emoji:'👩', example:'Minha mãe é professora.', exampleEs:'Mi madre es profesora.', gender:'f' },
      { word:'o irmão', es:'el hermano', emoji:'👦', example:'Meu irmão tem vinte anos.', exampleEs:'Mi hermano tiene veinte años.', gender:'m' },
      { word:'a irmã', es:'la hermana', emoji:'👧', example:'Minha irmã mora em São Paulo.', exampleEs:'Mi hermana vive en São Paulo.', gender:'f' },
      { word:'o filho', es:'el hijo', emoji:'🧒', example:'Ela tem um filho pequeno.', exampleEs:'Ella tiene un hijo pequeño.', gender:'m' },
      { word:'a filha', es:'la hija', emoji:'👧', example:'A filha dela é muito inteligente.', exampleEs:'Su hija es muy inteligente.', gender:'f' },
      { word:'os pais', es:'los padres', emoji:'👪', example:'Meus pais moram em Brasília.', exampleEs:'Mis padres viven en Brasilia.', gender:'m' },
      { word:'o marido', es:'el esposo', emoji:'💍', example:'O marido dela é médico.', exampleEs:'Su esposo es médico.', gender:'m' },
      { word:'a esposa', es:'la esposa', emoji:'💍', example:'Minha esposa é advogada.', exampleEs:'Mi esposa es abogada.', gender:'f' },
      { word:'os filhos', es:'los hijos', emoji:'👶', example:'Eles têm dois filhos.', exampleEs:'Ellos tienen dos hijos.', gender:'m' },
    ],
  },
  {
    id: 'cores', name: 'Los colores', namePt: 'As cores', icon: '🎨',
    words: [
      { word:'vermelho/a', es:'rojo/a', emoji:'🔴', example:'A maçã é vermelha.', exampleEs:'La manzana es roja.' },
      { word:'azul', es:'azul', emoji:'🔵', example:'O céu é azul.', exampleEs:'El cielo es azul.' },
      { word:'verde', es:'verde', emoji:'🟢', example:'A folha é verde.', exampleEs:'La hoja es verde.' },
      { word:'amarelo/a', es:'amarillo/a', emoji:'🟡', example:'O sol é amarelo.', exampleEs:'El sol es amarillo.' },
      { word:'branco/a', es:'blanco/a', emoji:'⬜', example:'A neve é branca.', exampleEs:'La nieve es blanca.' },
      { word:'preto/a', es:'negro/a', emoji:'⬛', example:'O gato é preto.', exampleEs:'El gato es negro.' },
      { word:'laranja', es:'naranja', emoji:'🟠', example:'A cenoura é laranja.', exampleEs:'La zanahoria es naranja.' },
      { word:'rosa', es:'rosado/a', emoji:'🌸', example:'A flor é rosa.', exampleEs:'La flor es rosada.' },
      { word:'roxo/a', es:'morado/a', emoji:'🟣', example:'A uva é roxa.', exampleEs:'La uva es morada.' },
      { word:'cinza', es:'gris', emoji:'🔘', example:'O céu está cinza hoje.', exampleEs:'El cielo está gris hoy.' },
    ],
  },
  {
    id: 'comida', name: 'La comida', namePt: 'A comida', icon: '🍽️',
    words: [
      { word:'o pão', es:'el pan', emoji:'🍞', example:'Como pão de manhã.', exampleEs:'Como pan en la mañana.', gender:'m' },
      { word:'o arroz', es:'el arroz', emoji:'🍚', example:'O arroz com feijão é típico do Brasil.', exampleEs:'El arroz con frijoles es típico de Brasil.', gender:'m' },
      { word:'o feijão', es:'los frijoles / el frijol', emoji:'🫘', example:'Adoro feijão preto.', exampleEs:'Me encantan los frijoles negros.', gender:'m' },
      { word:'a carne', es:'la carne', emoji:'🥩', example:'Meu pai gosta de carne.', exampleEs:'A mi padre le gusta la carne.', gender:'f' },
      { word:'o frango', es:'el pollo', emoji:'🍗', example:'Como frango todo dia.', exampleEs:'Como pollo todos los días.', gender:'m' },
      { word:'as frutas', es:'las frutas', emoji:'🍎', example:'Gosto de comer frutas.', exampleEs:'Me gusta comer frutas.', gender:'f' },
      { word:'o café', es:'el café', emoji:'☕', example:'Tomo café de manhã.', exampleEs:'Tomo café en la mañana.', gender:'m' },
      { word:'o leite', es:'la leche', emoji:'🥛', example:'Prefiro café com leite.', exampleEs:'Prefiero café con leche.', gender:'m' },
      { word:'a água', es:'el agua', emoji:'💧', example:'Bebo muita água.', exampleEs:'Bebo mucha agua.', gender:'f' },
      { word:'o suco', es:'el jugo', emoji:'🧃', example:'Quero um suco de laranja.', exampleEs:'Quiero un jugo de naranja.', gender:'m' },
    ],
  },
  {
    id: 'cidade', name: 'La ciudad', namePt: 'A cidade', icon: '🏙️',
    words: [
      { word:'a rua', es:'la calle', emoji:'🛣️', example:'Moro nessa rua.', exampleEs:'Vivo en esa calle.', gender:'f' },
      { word:'o supermercado', es:'el supermercado', emoji:'🏪', example:'Vou ao supermercado amanhã.', exampleEs:'Voy al supermercado mañana.', gender:'m' },
      { word:'o mercado', es:'el mercado', emoji:'🛒', example:'Compro frutas no mercado.', exampleEs:'Compro frutas en el mercado.', gender:'m' },
      { word:'a padaria', es:'la panadería', emoji:'🥐', example:'Compro pão na padaria.', exampleEs:'Compro pan en la panadería.', gender:'f' },
      { word:'o banco', es:'el banco', emoji:'🏦', example:'Vou ao banco hoje.', exampleEs:'Voy al banco hoy.', gender:'m' },
      { word:'o metrô', es:'el metro', emoji:'🚇', example:'Pego o metrô para trabalhar.', exampleEs:'Tomo el metro para trabajar.', gender:'m' },
      { word:'o ônibus', es:'el autobús', emoji:'🚌', example:'O ônibus chega às oito.', exampleEs:'El autobús llega a las ocho.', gender:'m' },
      { word:'o hospital', es:'el hospital', emoji:'🏥', example:'O hospital fica perto daqui.', exampleEs:'El hospital queda cerca de aquí.', gender:'m' },
      { word:'a farmácia', es:'la farmacia', emoji:'💊', example:'A farmácia está aberta.', exampleEs:'La farmacia está abierta.', gender:'f' },
      { word:'o parque', es:'el parque', emoji:'🌳', example:'Vou ao parque no fim de semana.', exampleEs:'Voy al parque el fin de semana.', gender:'m' },
    ],
  },
  {
    id: 'numeros', name: 'Los números', namePt: 'Os números', icon: '🔢',
    words: [
      { word:'um / uma', es:'uno / una', emoji:'1️⃣', example:'Tenho um irmão.', exampleEs:'Tengo un hermano.' },
      { word:'dois / duas', es:'dos', emoji:'2️⃣', example:'Tenho duas irmãs.', exampleEs:'Tengo dos hermanas.' },
      { word:'três', es:'tres', emoji:'3️⃣', example:'O apartamento tem três quartos.', exampleEs:'El apartamento tiene tres habitaciones.' },
      { word:'dez', es:'diez', emoji:'🔟', example:'Tenho dez reais.', exampleEs:'Tengo diez reales.' },
      { word:'vinte', es:'veinte', emoji:'2️⃣0️⃣', example:'Tenho vinte e dois anos.', exampleEs:'Tengo veintidós años.' },
      { word:'trinta', es:'treinta', emoji:'3️⃣0️⃣', example:'Ela tem trinta anos.', exampleEs:'Ella tiene treinta años.' },
      { word:'cem', es:'cien', emoji:'💯', example:'Isso custa cem reais.', exampleEs:'Eso cuesta cien reales.' },
      { word:'muito/a', es:'mucho/a', emoji:'➕', example:'Tenho muitos amigos.', exampleEs:'Tengo muchos amigos.' },
      { word:'pouco/a', es:'poco/a', emoji:'➖', example:'Como pouco à noite.', exampleEs:'Como poco en la noche.' },
      { word:'todo/a', es:'todo/a', emoji:'✅', example:'Todo dia tomo café.', exampleEs:'Todos los días tomo café.' },
    ],
  },
  {
    id: 'corpo', name: 'El cuerpo', namePt: 'O corpo', icon: '🧍',
    words: [
      { word:'a cabeça', es:'la cabeza', emoji:'🗣️', example:'Estou com dor de cabeça.', exampleEs:'Tengo dolor de cabeza.', gender:'f' },
      { word:'o cabelo', es:'el pelo', emoji:'💇', example:'Ela tem o cabelo longo.', exampleEs:'Ella tiene el pelo largo.', gender:'m' },
      { word:'o olho', es:'el ojo', emoji:'👁️', example:'Tenho os olhos castanhos.', exampleEs:'Tengo los ojos marrones.', gender:'m' },
      { word:'o nariz', es:'la nariz', emoji:'👃', example:'O nariz está entupido.', exampleEs:'La nariz está tapada.', gender:'m' },
      { word:'a boca', es:'la boca', emoji:'👄', example:'A boca é pequena.', exampleEs:'La boca es pequeña.', gender:'f' },
      { word:'o braço', es:'el brazo', emoji:'💪', example:'Doeu o braço.', exampleEs:'Me duele el brazo.', gender:'m' },
      { word:'a mão', es:'la mano', emoji:'✋', example:'Ela tem as mãos pequenas.', exampleEs:'Ella tiene las manos pequeñas.', gender:'f' },
      { word:'a perna', es:'la pierna', emoji:'🦵', example:'A perna direita dói.', exampleEs:'La pierna derecha duele.', gender:'f' },
      { word:'o pé', es:'el pie', emoji:'🦶', example:'Meu pé está doendo.', exampleEs:'Mi pie está doliendo.', gender:'m' },
      { word:'o coração', es:'el corazón', emoji:'❤️', example:'O coração bate rápido.', exampleEs:'El corazón late rápido.', gender:'m' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🎴</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>Baralho completo!</h3>
      <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1.25rem' }}>{known}/{words.length} palavras marcadas.</p>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir baralho</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
      <div style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)' }}>{idx+1}/{words.length}</div>
      <div onClick={() => setFlipped(f=>!f)} style={{ width:'100%', maxWidth:400, minHeight:200, cursor:'pointer', borderRadius:18, border:`2px solid ${flipped?COLOR:'var(--line-soft)'}`, background:flipped?`${COLORMix(3.1)}`:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0.65rem', padding:'1.5rem', transition:'all 0.3s', textAlign:'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize:'2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
            {w.gender && <div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, padding:'0.1rem 0.4rem', borderRadius:5, background:`${COLORMix(8.2)}` }}>{w.gender==='m'?'masculino':'feminino'}</div>}
            <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.25rem' }}>Toque para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:'1rem', color:'var(--muted)', fontStyle:'italic' }}>{w.word}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:COLOR }}>{w.es}</div>
            <div style={{ fontSize:'0.82rem', color:'var(--muted)', marginTop:'0.5rem', lineHeight:1.5, borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem', width:'100%', textAlign:'left' }}>
              <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span><br/><span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k=>k+1); setIdx(i=>i+1); setFlipped(false); }} style={{ background:COLOR, borderColor:COLOR }}>✓ Eu sei</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i=>i+1); setFlipped(false); }}>Rever →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} corretas</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x=>x.word!==w.word)).slice(0,3).map(x=>x.es);
  const allOpts = shuffle([w.es,...distractors]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
        {allOpts.map((opt,i)=>{
          const isCorrect=opt===w.es, isSel=answered!==null&&allOpts[answered]===opt;
          let bg='var(--bg)',border='1.5px solid var(--line-soft)',color='var(--ink)';
          if (answered!==null&&isCorrect){bg='rgba(5,150,105,0.1)';border='1.5px solid #059669';color='#059669';}
          if (answered!==null&&isSel&&!isCorrect){bg='rgba(220,38,38,0.1)';border='1.5px solid #dc2626';color='#dc2626';}
          return (
            <button key={i} disabled={answered!==null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s=>s+1); }}
              style={{ padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.95rem', cursor:answered!==null?'default':'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered!==null && (
        <div>
          <div style={{ padding:'0.65rem 0.9rem', borderRadius:8, background:allOpts[answered]===w.es?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.82rem', color:'var(--muted)', marginBottom:'0.65rem' }}>
            <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx<shuffled.length-1?'Próxima →':'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} corretas</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase()===w.word.toLowerCase()||input.trim().toLowerCase()===w.word.replace(/\/.*$/,'').trim().toLowerCase();

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.1rem', fontWeight:700, color:COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin:0, fontWeight:600, color:'var(--ink)' }}>Escreva a palavra em português:</p>
      <input value={input} onChange={e=>setInput(e.target.value)} disabled={checked} placeholder="Sua resposta em português..."
        onKeyDown={e=>{if(e.key==='Enter'&&input.trim()&&!checked){setChecked(true);if(isCorrect)setScore(s=>s+1);}}}
        style={{ padding:'0.7rem 1rem', borderRadius:10, border:`1.5px solid ${checked?(isCorrect?'#059669':'#dc2626'):'var(--line-soft)'}`, background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', outline:'none' }}/>
      {!checked&&input.trim()&&<button className="btn btn-sm" onClick={() => { setChecked(true); if(isCorrect) setScore(s=>s+1); }} style={{ background:COLOR, borderColor:COLOR }}>Verificar</button>}
      {checked && (
        <div>
          <div style={{ padding:'0.7rem 0.9rem', borderRadius:9, background:isCorrect?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.88rem', marginBottom:'0.65rem' }}>
            {isCorrect?'✅ Correto!':`✗ A resposta é: ${w.word}`}
            <div style={{ marginTop:'0.3rem', fontSize:'0.8rem', color:'var(--muted)', fontStyle:'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx<shuffled.length-1?'Próxima →':'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioPortuguesA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:580 }}>
        <button onClick={() => setMode(null)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1.25rem' }}>← {set.namePt}</button>
        {mode==='flashcard'&&<Flashcard words={set.words} onDone={() => setMode(null)}/>}
        {mode==='mcq'&&<MCQPractice words={set.words} onDone={() => setMode(null)}/>}
        {mode==='fillblank'&&<FillBlank words={set.words} onDone={() => setMode(null)}/>}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1.5rem' }}>← Vocabulário A1</button>
        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line"/>{set.icon} {set.namePt}</p>
        <h2 style={{ fontSize:'1.75rem', margin:'0 0 0.25rem', fontWeight:700 }}>{set.name}</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>{set.words.length} palavras · Escolha um modo de prática</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
          {[{id:'flashcard' as PracticeMode,icon:'🎴',title:'Flashcards',desc:'Veja cada palavra e sua tradução.'},{id:'mcq' as PracticeMode,icon:'🎯',title:'Múltipla escolha',desc:'Escolha a tradução correta.'},{id:'fillblank' as PracticeMode,icon:'✏️',title:'Escrever a palavra',desc:'Escreva a palavra em português.'}].map(m=>(
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1.1rem 1.3rem', border:`1.5px solid ${COLORMix(13.3)}`, borderRadius:14, background:`${COLORMix(1.6)}`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(33.3)}`;(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLORMix(7.8)}`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(13.3)}`;(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ width:42, height:42, borderRadius:10, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>{m.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:'var(--ink)', marginBottom:'0.1rem' }}>{m.title}</div>
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color:COLOR, fontWeight:700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.65rem' }}>Lista de palavras</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:'0.55rem' }}>
            {set.words.map(w=>(
              <div key={w.word} style={{ padding:'0.55rem 0.7rem', borderRadius:9, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
                <div style={{ fontWeight:700, fontSize:'0.88rem', color:'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{w.es}</div>
              </div>
            ))}
          </div>
        </div>
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
          <span style={{ color:COLOR, fontWeight:800 }}>📚 Vocabulário</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Vocabulário · Português A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Vocabulário A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>6 temas essenciais — 60 palavras com exemplos. Flashcards, múltipla escolha e escrita.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:'0.85rem' }}>
          {SETS.map(s=>(
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ padding:'1.25rem', border:`1.5px solid ${COLORMix(13.3)}`, borderRadius:16, background:`${COLORMix(1.6)}`, height:'100%', display:'flex', flexDirection:'column', gap:'0.5rem', transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(33.3)}`;(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLORMix(7.8)}`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(13.3)}`;(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ fontSize:'1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight:800, color:'var(--ink)' }}>{s.namePt}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>{s.name} · {s.words.length} palavras</div>
                <div style={{ marginTop:'auto', fontSize:'0.8rem', color:COLOR, fontWeight:700 }}>Começar →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
