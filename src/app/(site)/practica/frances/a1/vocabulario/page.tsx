'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; gender?: string; }
interface VocabSet { id: string; name: string; nameFr: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'famille', name: 'La familia', nameFr: 'La famille', icon: '👨‍👩‍👧‍👦',
    words: [
      { word:'le père', es:'el padre', emoji:'👨', example:'Mon père est médecin.', exampleEs:'Mi padre es médico.', gender:'m' },
      { word:'la mère', es:'la madre', emoji:'👩', example:'Ma mère aime cuisiner.', exampleEs:'A mi madre le gusta cocinar.', gender:'f' },
      { word:'le frère', es:'el hermano', emoji:'👦', example:'J\'ai un frère.', exampleEs:'Tengo un hermano.', gender:'m' },
      { word:'la sœur', es:'la hermana', emoji:'👧', example:'Ma sœur a dix ans.', exampleEs:'Mi hermana tiene diez años.', gender:'f' },
      { word:'le fils', es:'el hijo', emoji:'🧒', example:'Le fils est petit.', exampleEs:'El hijo es pequeño.', gender:'m' },
      { word:'la fille', es:'la hija', emoji:'👧', example:'Sa fille est à l\'école.', exampleEs:'Su hija está en la escuela.', gender:'f' },
      { word:'les parents', es:'los padres', emoji:'👪', example:'Mes parents habitent à Paris.', exampleEs:'Mis padres viven en París.', gender:'m' },
      { word:'le mari', es:'el esposo', emoji:'💍', example:'Son mari est professeur.', exampleEs:'Su esposo es profesor.', gender:'m' },
      { word:'la femme', es:'la esposa / mujer', emoji:'💍', example:'Sa femme est médecin.', exampleEs:'Su esposa es médica.', gender:'f' },
      { word:'les enfants', es:'los hijos / niños', emoji:'👶', example:'Ils ont deux enfants.', exampleEs:'Tienen dos hijos.', gender:'m' },
    ],
  },
  {
    id: 'couleurs', name: 'Los colores', nameFr: 'Les couleurs', icon: '🎨',
    words: [
      { word:'rouge', es:'rojo/a', emoji:'🔴', example:'La pomme est rouge.', exampleEs:'La manzana es roja.' },
      { word:'bleu(e)', es:'azul', emoji:'🔵', example:'Le ciel est bleu.', exampleEs:'El cielo es azul.' },
      { word:'vert(e)', es:'verde', emoji:'🟢', example:'La feuille est verte.', exampleEs:'La hoja es verde.' },
      { word:'jaune', es:'amarillo/a', emoji:'🟡', example:'Le soleil est jaune.', exampleEs:'El sol es amarillo.' },
      { word:'blanc/blanche', es:'blanco/a', emoji:'⬜', example:'La neige est blanche.', exampleEs:'La nieve es blanca.' },
      { word:'noir(e)', es:'negro/a', emoji:'⬛', example:'Le chat est noir.', exampleEs:'El gato es negro.' },
      { word:'orange', es:'naranja', emoji:'🟠', example:'La carotte est orange.', exampleEs:'La zanahoria es naranja.' },
      { word:'rose', es:'rosado/a', emoji:'🌸', example:'La fleur est rose.', exampleEs:'La flor es rosada.' },
      { word:'violet(te)', es:'morado/a', emoji:'🟣', example:'La robe est violette.', exampleEs:'El vestido es morado.' },
      { word:'gris(e)', es:'gris', emoji:'🔘', example:'Le ciel est gris aujourd\'hui.', exampleEs:'El cielo está gris hoy.' },
    ],
  },
  {
    id: 'nourriture', name: 'La comida', nameFr: 'La nourriture', icon: '🥐',
    words: [
      { word:'le pain', es:'el pan', emoji:'🍞', example:'Je mange du pain le matin.', exampleEs:'Como pan en la mañana.', gender:'m' },
      { word:'la baguette', es:'la baguette', emoji:'🥖', example:'J\'achète une baguette.', exampleEs:'Compro una baguette.', gender:'f' },
      { word:'le fromage', es:'el queso', emoji:'🧀', example:'J\'aime le fromage français.', exampleEs:'Me gusta el queso francés.', gender:'m' },
      { word:'le café', es:'el café', emoji:'☕', example:'Je bois du café le matin.', exampleEs:'Bebo café en la mañana.', gender:'m' },
      { word:'le lait', es:'la leche', emoji:'🥛', example:'Je prends du lait avec mon café.', exampleEs:'Tomo leche con mi café.', gender:'m' },
      { word:'les légumes', es:'las verduras', emoji:'🥦', example:'Je mange des légumes chaque jour.', exampleEs:'Como verduras cada día.', gender:'m' },
      { word:'les fruits', es:'las frutas', emoji:'🍎', example:'J\'aime les fruits de saison.', exampleEs:'Me gustan las frutas de temporada.', gender:'m' },
      { word:'la viande', es:'la carne', emoji:'🥩', example:'Elle ne mange pas de viande.', exampleEs:'Ella no come carne.', gender:'f' },
      { word:'le poisson', es:'el pescado', emoji:'🐟', example:'Le vendredi, on mange du poisson.', exampleEs:'Los viernes comemos pescado.', gender:'m' },
      { word:'l\'eau', es:'el agua', emoji:'💧', example:'Je bois de l\'eau toute la journée.', exampleEs:'Bebo agua todo el día.', gender:'f' },
    ],
  },
  {
    id: 'maison', name: 'La casa', nameFr: 'La maison', icon: '🏠',
    words: [
      { word:'la maison', es:'la casa', emoji:'🏠', example:'Ma maison est grande.', exampleEs:'Mi casa es grande.', gender:'f' },
      { word:'l\'appartement', es:'el apartamento', emoji:'🏢', example:'J\'habite dans un appartement.', exampleEs:'Vivo en un apartamento.', gender:'m' },
      { word:'la chambre', es:'la habitación', emoji:'🛏️', example:'Ma chambre est petite.', exampleEs:'Mi habitación es pequeña.', gender:'f' },
      { word:'la cuisine', es:'la cocina', emoji:'🍳', example:'Je cuisine dans la cuisine.', exampleEs:'Cocino en la cocina.', gender:'f' },
      { word:'le salon', es:'la sala de estar', emoji:'🛋️', example:'On regarde la TV dans le salon.', exampleEs:'Vemos TV en la sala.', gender:'m' },
      { word:'la salle de bain', es:'el baño', emoji:'🚿', example:'La salle de bain est propre.', exampleEs:'El baño está limpio.', gender:'f' },
      { word:'le lit', es:'la cama', emoji:'🛏️', example:'Il y a un lit dans ma chambre.', exampleEs:'Hay una cama en mi habitación.', gender:'m' },
      { word:'la table', es:'la mesa', emoji:'🪑', example:'Nous mangeons à la table.', exampleEs:'Comemos en la mesa.', gender:'f' },
      { word:'la fenêtre', es:'la ventana', emoji:'🪟', example:'J\'ouvre la fenêtre le matin.', exampleEs:'Abro la ventana en la mañana.', gender:'f' },
      { word:'la porte', es:'la puerta', emoji:'🚪', example:'Ferme la porte, s\'il te plaît.', exampleEs:'Cierra la puerta, por favor.', gender:'f' },
    ],
  },
  {
    id: 'nombres', name: 'Los números', nameFr: 'Les chiffres', icon: '🔢',
    words: [
      { word:'un / une', es:'uno / una', emoji:'1️⃣', example:'J\'ai un frère.', exampleEs:'Tengo un hermano.' },
      { word:'deux', es:'dos', emoji:'2️⃣', example:'J\'ai deux sœurs.', exampleEs:'Tengo dos hermanas.' },
      { word:'trois', es:'tres', emoji:'3️⃣', example:'Il y a trois pièces.', exampleEs:'Hay tres habitaciones.' },
      { word:'dix', es:'diez', emoji:'🔟', example:'J\'ai dix euros.', exampleEs:'Tengo diez euros.' },
      { word:'vingt', es:'veinte', emoji:'2️⃣0️⃣', example:'J\'ai vingt ans.', exampleEs:'Tengo veinte años.' },
      { word:'trente', es:'treinta', emoji:'3️⃣0️⃣', example:'Il a trente ans.', exampleEs:'Él tiene treinta años.' },
      { word:'cent', es:'cien', emoji:'💯', example:'Ça coûte cent euros.', exampleEs:'Cuesta cien euros.' },
      { word:'premier/première', es:'primero/a', emoji:'🥇', example:'C\'est le premier jour.', exampleEs:'Es el primer día.' },
      { word:'beaucoup', es:'mucho/a/os/as', emoji:'➕', example:'J\'ai beaucoup d\'amis.', exampleEs:'Tengo muchos amigos.' },
      { word:'peu', es:'poco/a', emoji:'➖', example:'Je mange peu le soir.', exampleEs:'Como poco en la noche.' },
    ],
  },
  {
    id: 'ville', name: 'La ciudad', nameFr: 'La ville', icon: '🏙️',
    words: [
      { word:'la rue', es:'la calle', emoji:'🛣️', example:'J\'habite dans cette rue.', exampleEs:'Vivo en esta calle.', gender:'f' },
      { word:'le magasin', es:'la tienda', emoji:'🏪', example:'Je vais au magasin.', exampleEs:'Voy a la tienda.', gender:'m' },
      { word:'le marché', es:'el mercado', emoji:'🛒', example:'Je vais au marché le dimanche.', exampleEs:'Voy al mercado el domingo.', gender:'m' },
      { word:'la boulangerie', es:'la panadería', emoji:'🥐', example:'J\'achète le pain à la boulangerie.', exampleEs:'Compro el pan en la panadería.', gender:'f' },
      { word:'le café', es:'el café / cafetería', emoji:'☕', example:'On se retrouve au café.', exampleEs:'Nos encontramos en el café.', gender:'m' },
      { word:'la gare', es:'la estación de tren', emoji:'🚉', example:'Le train part de la gare.', exampleEs:'El tren sale de la estación.', gender:'f' },
      { word:'le métro', es:'el metro', emoji:'🚇', example:'Je prends le métro chaque matin.', exampleEs:'Tomo el metro cada mañana.', gender:'m' },
      { word:'la pharmacie', es:'la farmacia', emoji:'💊', example:'La pharmacie est fermée.', exampleEs:'La farmacia está cerrada.', gender:'f' },
      { word:'l\'hôtel', es:'el hotel', emoji:'🏨', example:'L\'hôtel est très confortable.', exampleEs:'El hotel es muy cómodo.', gender:'m' },
      { word:'la bibliothèque', es:'la biblioteca', emoji:'📚', example:'J\'étudie à la bibliothèque.', exampleEs:'Estudio en la biblioteca.', gender:'f' },
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
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>¡Mazo completado!</h3>
      <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
      <div style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)' }}>{idx+1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width:'100%', maxWidth:400, minHeight:200, cursor:'pointer', borderRadius:18, border:`2px solid ${flipped?COLOR:'var(--line-soft)'}`, background:flipped?`${COLOR}08`:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0.65rem', padding:'1.5rem', transition:'all 0.3s', textAlign:'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize:'2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
            {w.gender && <div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, padding:'0.1rem 0.4rem', borderRadius:5, background:`${COLOR}15` }}>{w.gender === 'm' ? 'masculin' : 'féminin'}</div>}
            <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:'1rem', color:'var(--muted)', fontStyle:'italic' }}>{w.word}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:COLOR }}>{w.es}</div>
            <div style={{ fontSize:'0.82rem', color:'var(--muted)', marginTop:'0.5rem', lineHeight:1.5, borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem', width:'100%', textAlign:'left' }}>
              <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span><br/>
              <span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k+1); setIdx(i => i+1); setFlipped(false); }} style={{ background:COLOR, borderColor:COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i+1); setFlipped(false); }}>Repasar →</button>
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
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score >= shuffled.length*0.8?'🏆':'⭐'}</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
        {w.gender && <div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, padding:'0.1rem 0.4rem', borderRadius:5, background:`${COLOR}15`, display:'inline-block', marginTop:'0.25rem' }}>{w.gender === 'm' ? 'masculin' : 'féminin'}</div>}
      </div>
      <p style={{ margin:0, fontWeight:600, color:'var(--ink)', textAlign:'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg='var(--bg)', border='1.5px solid var(--line-soft)', color='var(--ink)';
          if (answered !== null && isCorrect) { bg='rgba(5,150,105,0.1)'; border='1.5px solid #059669'; color='#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1.5px solid #dc2626'; color='#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s=>s+1); }}
              style={{ padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.95rem', cursor:answered!==null?'default':'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding:'0.65rem 0.9rem', borderRadius:8, background:allOpts[answered]===w.es?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.82rem', color:'var(--muted)', marginBottom:'0.65rem' }}>
            <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
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
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score>=shuffled.length*0.7?'🎉':'📝'}</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase() ||
    input.trim().toLowerCase() === w.word.toLowerCase().replace(/[\(\/].*/, '').trim();

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.1rem', fontWeight:700, color:COLOR }}>{w.es}</div>
        <div style={{ fontSize:'0.8rem', color:'var(--muted)', marginTop:'0.25rem', fontStyle:'italic' }}>{w.example.replace(new RegExp(w.word.split('/')[0].replace(/[\[\]()]/g,'').trim(), 'i'), '___')}</div>
      </div>
      <p style={{ margin:0, fontWeight:600, color:'var(--ink)' }}>Escribe la palabra en francés:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="Ta réponse en français..."
        onKeyDown={e => { if (e.key==='Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s=>s+1); }}}
        style={{ padding:'0.7rem 1rem', borderRadius:10, border:`1.5px solid ${checked?(isCorrect?'#059669':'#dc2626'):'var(--line-soft)'}`, background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', outline:'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s=>s+1); }} style={{ background:COLOR, borderColor:COLOR }}>Vérifier</button>}
      {checked && (
        <div>
          <div style={{ padding:'0.7rem 0.9rem', borderRadius:9, background:isCorrect?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.88rem', marginBottom:'0.65rem' }}>
            {isCorrect ? '✅ ¡Correct!' : `✗ La réponse est: ${w.word}`}
            <div style={{ marginTop:'0.3rem', fontSize:'0.8rem', color:'var(--muted)', fontStyle:'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx < shuffled.length - 1 ? 'Suivant →' : 'Voir résultat →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioFrancesA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:580 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:0, fontFamily:'var(--mono)', fontSize:'0.82rem' }}>← {set.nameFr}</button>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Choix multiple' : '✏️ Écrire'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1.5rem' }}>← Vocabulaire A1</button>
        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line" />{set.icon} {set.nameFr}</p>
        <h2 style={{ fontSize:'1.75rem', margin:'0 0 0.25rem', fontWeight:700 }}>{set.name}</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>{set.words.length} mots · Choisissez un mode de pratique</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
          {[
            { id:'flashcard' as PracticeMode, icon:'🎴', title:'Flashcards', desc:'Ve cada palabra y su traducción. Marca las que ya conoces.' },
            { id:'mcq' as PracticeMode, icon:'🎯', title:'Choix multiple', desc:'Elige la traducción correcta de 4 opciones.' },
            { id:'fillblank' as PracticeMode, icon:'✏️', title:'Écrire le mot', desc:'Escribe la palabra en francés a partir de la traducción.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1.1rem 1.3rem', border:`1.5px solid ${COLOR}22`, borderRadius:14, background:`${COLOR}04`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLOR}14`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow='none';}}>
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
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.65rem' }}>Vocabulaire ({set.words.length} mots)</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:'0.55rem' }}>
            {set.words.map(w => (
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
          <Link href="/practica/frances/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📚 Vocabulaire</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Vocabulaire · Français A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Vocabulaire A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>6 thèmes essentiels — 60 mots avec exemples. Flashcards, choix multiple et exercices d'écriture.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ padding:'1.25rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}04`, height:'100%', display:'flex', flexDirection:'column', gap:'0.5rem', transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLOR}14`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ fontSize:'1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight:800, color:'var(--ink)' }}>{s.nameFr}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>{s.name} · {s.words.length} mots</div>
                <div style={{ marginTop:'auto', fontSize:'0.8rem', color:COLOR, fontWeight:700 }}>Commencer →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
