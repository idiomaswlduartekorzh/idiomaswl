'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#003189';

interface ReadingText {
  id: number; title: string; topic: string; text: string;
  vocab: Record<string, string>;
  goal: string;                              // objetivo de lectura concreto
  keyVocab: { w: string; t: string }[];      // vocabulario clave pre-enseñado
  mcq: { q: string; opts: string[]; a: number; fb: string }[];
  openQ: string; prodPrompt: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Bonjour, je suis Sophie', topic: 'Présentation personnelle',
    text: "Bonjour! Je m'appelle Sophie. J'ai vingt ans. J'habite à Paris avec mes parents. J'ai un frère et une sœur. Mon frère s'appelle Paul et il a dix-huit ans. Chaque matin, je bois du café et je mange une baguette. J'étudie le français à l'université. J'aime lire et écouter de la musique.",
    vocab: { bonjour:'¡hola', appelle:'llamo / se llama', habite:'vivo', parents:'padres', frère:'hermano', sœur:'hermana', matin:'mañana', bois:'bebo', café:'café', mange:'como', baguette:'baguette (pan)', étudie:'estudio', aime:'amo / me gusta', lire:'leer', écouter:'escuchar', musique:'música' },
    goal: 'Lee el texto y averigua: ¿dónde vive Sophie y qué le gusta hacer?',
    keyVocab: [
      { w: "je m'appelle", t: 'me llamo' },
      { w: "j'ai vingt ans", t: 'tengo veinte años' },
      { w: "j'habite à", t: 'vivo en' },
      { w: 'frère / sœur', t: 'hermano / hermana' },
      { w: 'je mange / je bois', t: 'como / bebo' },
      { w: "j'aime", t: 'me gusta' },
    ],
    mcq: [
      { q:'¿Qué significa "frère"?', opts:['hermana','hermano','amigo','padre'], a:1, fb:'"Frère" = hermano. "Sœur" = hermana.' },
      { q:'¿Qué significa "matin"?', opts:['noche','tarde','mañana','semana'], a:2, fb:'"Matin" = mañana (parte del día).' },
      { q:'¿Dónde vive Sophie?', opts:['En Lyon','En París','En Marsella','En Burdeos'], a:1, fb:'"J\'habite à Paris" — vive en París.' },
      { q:'¿Qué toma Sophie por la mañana?', opts:['Solo café','Baguette y café','Croissant y jugo','Leche'], a:1, fb:'"Je bois du café et je mange une baguette."' },
      { q:'¿Qué le gusta hacer a Sophie?', opts:['Cocinar y bailar','Leer y escuchar música','Jugar y estudiar','Correr y nadar'], a:1, fb:'"J\'aime lire et écouter de la musique."' },
    ],
    openQ: '¿Qué le gusta hacer a Sophie?', prodPrompt: 'Escribe 2 oraciones presentándote en francés: tu nombre y tu edad.',
  },
  {
    id: 2, title: 'La famille Dupont', topic: 'La famille',
    text: "Voici la famille Dupont. Le père s'appelle Marc. Il est médecin. La mère s'appelle Claire. Elle est professeure. Ils ont deux enfants: une fille et un garçon. La fille s'appelle Léa. Elle a douze ans. Le garçon s'appelle Lucas. Il a neuf ans. La famille habite dans une grande maison à Lyon.",
    vocab: { voici:'aquí está / este es', père:'padre', mère:'madre', médecin:'médico', professeure:'profesora', enfants:'hijos / niños', fille:'hija / chica', garçon:'hijo / chico', douze:'doce', neuf:'nueve', grande:'grande', maison:'casa', lyon:'Lyon' },
    goal: 'Lee el texto y averigua: ¿a qué se dedican los padres y cómo se llama la hija?',
    keyVocab: [
      { w: 'père / mère', t: 'padre / madre' },
      { w: 'médecin', t: 'médico/a' },
      { w: 'professeure', t: 'profesora' },
      { w: 'fille / garçon', t: 'hija/chica / hijo/chico' },
      { w: 'ils ont', t: 'ellos tienen' },
      { w: 'grande maison', t: 'casa grande' },
    ],
    mcq: [
      { q:'¿Qué profesión tiene Marc?', opts:['Profesor','Médico','Abogado','Ingeniero'], a:1, fb:'"Il est médecin" — Marc es médico.' },
      { q:'¿Cómo se llama la hija?', opts:['Claire','Marie','Léa','Sophie'], a:2, fb:'"La fille s\'appelle Léa."' },
      { q:'¿Cuántos años tiene Lucas?', opts:['Doce','Ocho','Nueve','Diez'], a:2, fb:'"Il a neuf ans" — nueve años.' },
      { q:'¿Dónde vive la familia?', opts:['En París','En Marsella','En Nantes','En Lyon'], a:3, fb:'"La famille habite à Lyon."' },
      { q:'¿Qué significa "grande maison"?', opts:['Casa pequeña','Apartamento','Casa grande','Mansión'], a:2, fb:'"Grande" = grande, "maison" = casa → casa grande.' },
    ],
    openQ: '¿Cómo se llaman los padres y qué hacen?', prodPrompt: 'Describe tu familia en 2 oraciones en francés.',
  },
  {
    id: 3, title: 'Mon appartement', topic: 'Le logement',
    text: "J'habite dans un appartement à Bordeaux. L'appartement est petit mais confortable. Il y a une cuisine, un salon et une chambre. Dans la cuisine, il y a une table et quatre chaises. Dans le salon, il y a un canapé et une télévision. Ma chambre est petite. Il y a un lit et une armoire. J'aime mon appartement.",
    vocab: { appartement:'apartamento', bordeaux:'Burdeos', petit:'pequeño', confortable:'cómodo', cuisine:'cocina', salon:'sala de estar', chambre:'habitación / cuarto', table:'mesa', chaises:'sillas', canapé:'sofá', télévision:'televisión', lit:'cama', armoire:'armario / ropero' },
    goal: 'Lee el texto y averigua: ¿cuántas habitaciones tiene el apartamento y qué hay en cada una?',
    keyVocab: [
      { w: 'il y a', t: 'hay' },
      { w: 'cuisine', t: 'cocina' },
      { w: 'salon', t: 'sala de estar' },
      { w: 'chambre', t: 'habitación / cuarto' },
      { w: 'table / chaises', t: 'mesa / sillas' },
      { w: 'petit mais confortable', t: 'pequeño pero cómodo' },
    ],
    mcq: [
      { q:'¿Dónde vive el narrador?', opts:['En París','En Lyon','En Burdeos','En Toulouse'], a:2, fb:'"J\'habite dans un appartement à Bordeaux."' },
      { q:'¿Cómo es el apartamento?', opts:['Grande y lujoso','Pequeño pero cómodo','Feo y oscuro','Nuevo y moderno'], a:1, fb:'"Petit mais confortable" — pequeño pero cómodo.' },
      { q:'¿Qué hay en la cocina?', opts:['Sofá y TV','Cama y armario','Mesa y cuatro sillas','Espejo y planta'], a:2, fb:'"Dans la cuisine, il y a une table et quatre chaises."' },
      { q:'¿Qué significa "il y a un lit"?', opts:['Hay una silla','Hay una cama','Hay una mesa','Hay un espejo'], a:1, fb:'"Lit" = cama. "Il y a" = hay.' },
      { q:'¿Cuántas habitaciones tiene el apartamento?', opts:['Dos','Tres','Cuatro','Cinco'], a:1, fb:'Cocina + salón + chambre = tres habitaciones.' },
    ],
    openQ: '¿Qué muebles hay en el salón según el texto?', prodPrompt: 'Describe tu habitación en 2 oraciones usando "il y a".',
  },
  {
    id: 4, title: 'Ma journée', topic: 'La routine quotidienne',
    text: "Je m'appelle Antoine. Je me lève à sept heures. Je prends une douche et je mange des céréales. Je bois du café au lait. À huit heures et demie, je prends le métro pour aller à l'université. Les cours commencent à neuf heures. À midi, je mange à la cantine avec mes amis. L'après-midi, j'étudie à la bibliothèque. Le soir, je rentre chez moi à dix-huit heures.",
    vocab: { lève:'me levanto', prends:'tomo', douche:'ducha', céréales:'cereales', demie:'y media', métro:'metro', cours:'clases', commencent:'comienzan', midi:'mediodía', cantine:'comedor / cantina', amis:'amigos', bibliothèque:'biblioteca', rentre:'regreso', soir:'noche / tarde' },
    goal: 'Lee el texto y averigua: ¿a qué hora se levanta Antoine y cómo va a la universidad?',
    keyVocab: [
      { w: 'je me lève', t: 'me levanto' },
      { w: 'à sept heures', t: 'a las siete' },
      { w: 'je prends le métro', t: 'tomo el metro' },
      { w: 'les cours', t: 'las clases' },
      { w: 'à midi', t: 'al mediodía' },
      { w: 'le soir', t: 'por la noche/tarde' },
    ],
    mcq: [
      { q:'¿A qué hora se levanta Antoine?', opts:['A las seis','A las siete','A las ocho','A las nueve'], a:1, fb:'"Je me lève à sept heures."' },
      { q:'¿Qué desayuna?', opts:['Baguette y café','Cereales y café con leche','Solo jugo','Croissant'], a:1, fb:'"Je mange des céréales. Je bois du café au lait."' },
      { q:'¿Cómo va Antoine a la universidad?', opts:['En coche','A pie','En metro','En bicicleta'], a:2, fb:'"Je prends le métro pour aller à l\'université."' },
      { q:'¿A qué hora regresan los cursos?', opts:['A las ocho','A las nueve','A las diez','A las once'], a:1, fb:'"Les cours commencent à neuf heures."' },
      { q:'¿Qué hace Antoine a mediodía?', opts:['Estudia','Duerme la siesta','Come en la cantina con amigos','Va al gimnasio'], a:2, fb:'"À midi, je mange à la cantine avec mes amis."' },
    ],
    openQ: '¿A qué hora regresa Antoine a casa y dónde estudia?', prodPrompt: 'Escribe 2 oraciones sobre tu rutina matutina en francés.',
  },
  {
    id: 5, title: 'Le marché', topic: 'Faire des courses',
    text: "Aujourd'hui, je vais au marché avec ma mère. Il y a beaucoup de légumes et de fruits. J'achète des tomates, des carottes et des pommes de terre. Ma mère achète des pommes et des oranges. Les légumes sont frais et pas trop chers. Le marchand est sympa. Il nous donne un peu de persil gratuit. Nous payons dix euros et rentrons à la maison.",
    vocab: { marché:'mercado', légumes:'verduras', fruits:'frutas', achète:'compro', tomates:'tomates', carottes:'zanahorias', pommes:'manzanas', oranges:'naranjas', frais:'frescos', chers:'caros', marchand:'vendedor / comerciante', persil:'perejil', gratuit:'gratis', payons:'pagamos' },
    goal: 'Lee el texto y averigua: ¿qué compra el narrador y cuánto pagan al final?',
    keyVocab: [
      { w: 'marché', t: 'mercado' },
      { w: 'légumes / fruits', t: 'verduras / frutas' },
      { w: "j'achète", t: 'compro' },
      { w: 'frais', t: 'frescos' },
      { w: 'pas trop chers', t: 'no demasiado caros' },
      { w: 'nous payons', t: 'pagamos' },
    ],
    mcq: [
      { q:'¿Con quién va al mercado?', opts:['Con su padre','Con un amigo','Con su madre','Solo'], a:2, fb:'"Je vais au marché avec ma mère."' },
      { q:'¿Qué compra el narrador?', opts:['Manzanas y naranjas','Tomates, zanahorias y papas','Pan y queso','Leche y mantequilla'], a:1, fb:'"J\'achète des tomates, des carottes et des pommes de terre."' },
      { q:'¿Cómo son los vegetales según el texto?', opts:['Caros y viejos','Frescos y no muy caros','Baratos pero malos','Importados y caros'], a:1, fb:'"Les légumes sont frais et pas trop chers."' },
      { q:'¿Qué da el vendedor de regalo?', opts:['Un tomate','Una manzana','Un poco de perejil','Una zanahoria'], a:2, fb:'"Il nous donne un peu de persil gratuit."' },
      { q:'¿Cuánto pagan en total?', opts:['Cinco euros','Ocho euros','Diez euros','Quince euros'], a:2, fb:'"Nous payons dix euros."' },
    ],
    openQ: '¿Qué compra la madre y cómo es el vendedor?', prodPrompt: 'Escribe 2 oraciones sobre lo que comprarías en un mercado francés.',
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

  const STEPS = ['Antes de leer', 'Leer', 'Preguntas', 'Resultado'];

  return (
    <div>
      {/* breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:0, fontFamily:'var(--mono)', fontSize:'0.82rem' }}>📖 Lecture A1</button>
        <span>/</span>
        <span style={{ color:COLOR, fontWeight:800 }}>Texte {t.id}</span>
      </div>

      {/* stepper */}
      <div style={{ display:'flex', gap:'0', marginBottom:'1.75rem', overflowX:'auto' }}>
        {STEPS.map((s, i) => {
          const phaseIdx = ['pre','read','questions','done'].indexOf(phase);
          const active = phaseIdx === i, done2 = phaseIdx > i;
          return (
            <div key={s} style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:1 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background: active ? COLOR : done2 ? '#059669' : 'var(--line-soft)', color: (active||done2) ? '#fff' : 'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.72rem', fontWeight:800, fontFamily:'var(--mono)', flexShrink:0 }}>
                  {done2 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color: active ? COLOR : done2 ? '#059669' : 'var(--muted)', fontWeight: active ? 800 : 400, marginTop:4, textAlign:'center', whiteSpace:'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ height:2, flex:1, background: done2 ? '#059669' : 'var(--line-soft)', margin:'0 4px', marginBottom:20 }} />}
            </div>
          );
        })}
      </div>

      {/* PRE phase */}
      {phase === 'pre' && (
        <div>
          <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Thème · {t.topic}</div>
            <h2 style={{ margin:'0 0 0.25rem', fontWeight:700, fontSize:'1.4rem', color:'var(--ink)' }}>{t.title}</h2>
          </div>
          {/* Objetivo de lectura */}
          <div style={{ padding:'0.9rem 1.1rem', borderRadius:12, background:`${COLOR}0d`, border:`1px solid ${COLOR}2a`, marginBottom:'1rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>🎯 Tu objetivo</div>
            <p style={{ margin:0, fontWeight:600, color:'var(--ink)', fontSize:'0.95rem', lineHeight:1.55 }}>{t.goal}</p>
          </div>
          {/* Vocabulario clave */}
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>📚 Vocabulario clave — apréndelo antes de leer</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'0.5rem', marginBottom:'1.25rem' }}>
            {t.keyVocab.map((kv, i) => (
              <div key={i} style={{ padding:'0.6rem 0.85rem', borderRadius:10, background:'var(--bg-2)', border:'1px solid var(--line-soft)' }}>
                <div style={{ fontWeight:800, color:'var(--ink)', fontSize:'0.9rem' }}>{kv.w}</div>
                <div style={{ color:'var(--muted)', fontSize:'0.8rem' }}>{kv.t}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background:COLOR, borderColor:COLOR }}>Leer el texto →</button>
        </div>
      )}

      {/* READ phase */}
      {phase === 'read' && (
        <div>
          <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Toca una palabra para ver su traducción</div>
            <div style={{ lineHeight:2.1, fontSize:'1.05rem', color:'var(--ink)', position:'relative' }}>
              {tokens.map((tok, i) => {
                if (tok.isSpace) return <span key={i}>{tok.raw}</span>;
                const has = !!t.vocab[tok.clean];
                const isActive = activeIdx === i;
                return (
                  <span key={i} style={{ position:'relative', display:'inline-block' }}>
                    <button onClick={() => setActiveIdx(isActive ? null : i)}
                      style={{ background: isActive ? `${COLOR}18` : has ? `${COLOR}08` : 'transparent', border: isActive ? `1.5px solid ${COLOR}` : has ? `1px dashed ${COLOR}44` : 'none', borderRadius:5, padding:'0 3px', cursor: has ? 'pointer' : 'default', fontSize:'inherit', fontFamily:'inherit', color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition:'all 0.15s' }}>
                      {tok.raw}
                    </button>
                    {isActive && (
                      <span style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background: t.vocab[tok.clean] ? COLOR : '#6b7280', color:'#fff', borderRadius:8, padding:'0.25rem 0.6rem', fontSize:'0.75rem', fontWeight:600, whiteSpace:'nowrap', zIndex:10, boxShadow:`0 4px 14px ${COLOR}30`, marginTop:3 }}>
                        {t.vocab[tok.clean] ?? '(mot grammatical)'}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => setPhase('questions')} style={{ background:COLOR, borderColor:COLOR }}>Responder preguntas →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← Antes de leer</button>
          </div>
        </div>
      )}

      {/* QUESTIONS phase */}
      {phase === 'questions' && (
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPhase('read')} style={{ marginBottom:'1rem' }}>← Volver al texto</button>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
            {t.mcq.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={qi} style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
                  <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Question {qi+1}</div>
                  <p style={{ margin:'0 0 0.75rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{q.q}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect=oi===q.a, isSel=ans===oi;
                      let bg='var(--bg)', border='1.5px solid var(--line-soft)', color='var(--ink)';
                      if (isDone && isCorrect) { bg=`rgba(5,150,105,0.1)`; border=`1.5px solid #059669`; color='#059669'; }
                      if (isDone && isSel && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1.5px solid #dc2626'; color='#dc2626'; }
                      return (
                        <button key={oi} onClick={() => handleAnswer(qi, oi)} disabled={isDone}
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

            {/* Open question */}
            <div style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
              <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Question ouverte</div>
              <p style={{ margin:'0 0 0.6rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{t.openQ}</p>
              <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={2} placeholder="Écris ta réponse..."
                style={{ width:'100%', padding:'0.6rem 0.8rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
            </div>

            {/* Mini-production */}
            <div style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:`1.5px solid ${COLOR}22`, background:`${COLOR}04` }}>
              <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Mini-production</div>
              <p style={{ margin:'0 0 0.6rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{t.prodPrompt}</p>
              <textarea value={prod} onChange={e => setProd(e.target.value)} rows={2} placeholder="Écris en français..."
                style={{ width:'100%', padding:'0.6rem 0.8rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
            </div>

            {allMcqDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background:COLOR, borderColor:COLOR }}>Ver resultado →</button>}
          </div>
        </div>
      )}

      {/* DONE phase */}
      {phase === 'done' && (
        <div style={{ padding:'1.75rem', borderRadius:18, border:'1.5px solid var(--line-soft)', background:'var(--bg)', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score===t.mcq.length?'🎉':score>=3?'⭐':'📚'}</div>
          <h2 style={{ margin:'0 0 0.25rem', fontWeight:800, color:'var(--ink)', fontSize:'1.5rem' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.88rem', margin:'0 0 1.25rem' }}>{score===t.mcq.length?'¡Parfait! Comprensión perfecta.':score>=3?'Très bien — casi perfecto.':'Relee el texto y vuelve a intentarlo.'}</p>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setAnswers({}); setRevealed({}); setOpenAns(''); setProd(''); }} style={{ background:COLOR, borderColor:COLOR }}>Intentar de nuevo</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Otros textos</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaFrancesA1() {
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
          <Link href="/practica/frances/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📖 Lecture</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Lecture · Français A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Compréhension écrite A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:540, margin:'0 0 2rem' }}>5 textes authentiques avec vocabulaire interactif et questions de compréhension.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {TEXTS.map(t => (
            <button key={t.id} onClick={() => setTextId(t.id)}
              style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1.1rem', padding:'1.1rem 1.4rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}04`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 20px ${COLOR}18`;(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}55`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;}}>
                <div style={{ width:44, height:44, borderRadius:11, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', fontWeight:900, fontFamily:'var(--mono)', flexShrink:0 }}>{t.id}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.1rem' }}>{t.title}</div>
                  <p style={{ margin:0, fontSize:'0.78rem', color:'var(--muted)' }}>{t.topic} · {t.mcq.length} preguntas</p>
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
