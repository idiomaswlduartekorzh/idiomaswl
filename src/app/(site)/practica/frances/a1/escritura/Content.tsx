'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; topic: string;
  prompt: string; promptFr: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Me présenter', topic: 'La présentation',
    prompt: 'Escribe 4–5 oraciones para presentarte en francés: tu nombre, edad, dónde vives, qué haces y algo que te gusta.',
    promptFr: 'Écris 4–5 phrases pour te présenter: ton prénom, ton âge, où tu habites, ce que tu fais et ce que tu aimes.',
    model: 'Bonjour! Je m\'appelle Carlos. J\'ai vingt-cinq ans. J\'habite à Bogotá, en Colombie. J\'étudie l\'ingénierie à l\'université. J\'aime le sport et la musique française.',
    criteria: ['Incluye nombre y edad (Je m\'appelle... / J\'ai ... ans)', 'Menciona dónde vives (J\'habite à...)', 'Dice qué estudias o haces (J\'étudie/Je travaille)', 'Incluye un gusto (J\'aime...)'],
    vocab: ["Je m'appelle", "J'ai ___ ans", "J'habite à", "J'étudie", "Je travaille", "J'aime", "Je n'aime pas", "avec ma famille", "à l'université"],
    checklist: ['¿Usaste "J\'ai" para la edad (no "Je suis")?', '¿Conjugaste être correctamente (je suis, il est)?', '¿Pusiste acento en "é" de "étudiant/e"?', '¿Los artículos son correctos (le/la/un/une)?'],
  },
  {
    id: 2, title: 'Ma famille', topic: 'La famille',
    prompt: 'Describe tu familia en 4–5 oraciones: al menos 2 miembros, sus nombres, edades, profesiones y una característica.',
    promptFr: 'Décris ta famille: au moins 2 membres, leurs noms, âges, professions et une caractéristique.',
    model: 'J\'ai une petite famille. Ma mère s\'appelle Maria. Elle est infirmière et elle a quarante ans. Mon père est professeur. Il est grand et très sympa.',
    criteria: ['Describe al menos 2 miembros (Ma mère/Mon père/Ma sœur/Mon frère)', 'Incluye profesión con "être" (Il/Elle est + profesión)', 'Usa "il" para hombres y "elle" para mujeres', 'Añade un adjetivo de personalidad o físico'],
    vocab: ["Ma mère/Mon père s'appelle", "Il/Elle est", "Il/Elle a ___ ans", "Il/Elle travaille", "très gentil(le)/sympa/grand(e)/intelligent(e)", "J'ai un/une"],
    checklist: ['¿Usaste "Il est" para hombres y "Elle est" para mujeres?', '¿La profesión no tiene artículo? (Il est médecin, no "un médecin")', '¿Los adjetivos concuerdan en género (grand/grande)?', '¿Usaste "s\'appelle" para el nombre?'],
  },
  {
    id: 3, title: 'Mon appartement', topic: 'Le logement',
    prompt: 'Describe tu casa o apartamento en 4–5 oraciones. Usa "il y a" para describir lo que hay en cada habitación.',
    promptFr: 'Décris ton appartement. Utilise "il y a" pour décrire ce qu\'il y a dans chaque pièce.',
    model: 'J\'habite dans un appartement à Medellín. Il y a trois pièces: un salon, une cuisine et une chambre. Dans le salon, il y a un canapé et une télévision. Ma chambre est petite mais confortable. J\'aime mon appartement.',
    criteria: ['Dice dónde vives (J\'habite dans... à...)', 'Usa "il y a" al menos 2 veces', 'Menciona al menos 2 habitaciones', 'Añade un adjetivo descriptivo (petit/grande/confortable)'],
    vocab: ["J'habite dans", "Il y a", "Dans le salon/la cuisine/ma chambre", "un canapé/une table/un lit/une armoire", "petit(e)/grand(e)/confortable/moderne"],
    checklist: ['¿Usaste "il y a" para describir lo que hay?', '¿Los artículos son correctos (un/une/des)?', '¿Pusiste acento en palabras con é (télévisión → télévision)?', '¿Describiste al menos 2 habitaciones?'],
  },
  {
    id: 4, title: 'Ma journée', topic: 'La routine',
    prompt: 'Escribe 5–6 oraciones sobre tu rutina diaria. Usa expresiones de tiempo (à ... heures, le matin, le soir) y verbos en presente.',
    promptFr: 'Écris 5–6 phrases sur ta journée. Utilise des expressions de temps et le présent de l\'indicatif.',
    model: 'Chaque matin, je me lève à sept heures. Je prends une douche et je mange des céréales. À huit heures, je prends le bus pour aller au travail. Le déjeuner est à midi. Le soir, je rentre chez moi à dix-huit heures et je regarde la télévision.',
    criteria: ['Usa al menos 2 expresiones de tiempo (le matin, à ___ heures, le soir)', 'La rutina tiene orden lógico (mañana → tarde → noche)', 'Los verbos están en presente', 'Menciona al menos 4 actividades diferentes'],
    vocab: ["Chaque matin/soir", "À ___ heures", "Je me lève", "Je prends une douche", "Je mange", "Je vais à", "Je rentre chez moi", "Je regarde", "Le déjeuner/dîner est à"],
    checklist: ['¿Usaste "chaque matin" o "le matin" (no "every morning")?', '¿Las horas siguen el patrón "à ___ heures"?', '¿Conectaste acciones con "et" o "puis" (luego)?', '¿Los verbos reflexivos llevan pronombre (je me lève)?'],
  },
  {
    id: 5, title: 'Mes loisirs', topic: 'Les loisirs',
    prompt: 'Escribe 4–5 oraciones sobre tus pasatiempos. Usa "J\'aime / J\'adore / Je n\'aime pas" y adverbios de frecuencia (souvent, parfois, jamais).',
    promptFr: 'Écris sur tes activités préférées. Utilise "j\'aime/j\'adore/je n\'aime pas" + un adverbe de fréquence.',
    model: 'J\'adore la musique. Je joue souvent de la guitare le soir. J\'aime aussi regarder des films français. Je fais parfois du sport avec mes amis. Je n\'aime pas regarder la télévision.',
    criteria: ['Menciona al menos 2 cosas que te gustan', 'Menciona al menos 1 que no te gusta', 'Usa al menos un adverbio de frecuencia (souvent/parfois/jamais)', 'Usa al menos 3 verbos diferentes'],
    vocab: ["J'adore/J'aime/Je n'aime pas", "Je joue de la", "Je regarde des", "Je fais du sport", "J'écoute de la musique", "souvent/parfois/rarement/jamais", "le week-end/le soir"],
    checklist: ['¿Usaste "J\'adore" para lo que más te gusta y "J\'aime" para gusto moderado?', '¿Pusiste "ne...pas" completo en la negación?', '¿El adverbio de frecuencia está después del verbo?', '¿Conectaste ideas con "aussi" (también) o "mais" (pero)?'],
  },
];

export default function EscrituraFrancesA1() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setCheckDone({}); }

  if (submitted && task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:720 }}>
        <div style={{ textAlign:'center', padding:'2rem 1rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>✅</div>
          <h2 style={{ margin:'0 0 0.5rem', color:COLOR }}>¡Texte envoyé!</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>Registrado para revisión con David o Zhanna.</p>
          <div style={{ padding:'1.1rem 1.25rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1.5rem', textAlign:'left' }}>
            <p style={{ margin:0, fontSize:'0.92rem', color:'var(--ink)', lineHeight:1.75, whiteSpace:'pre-wrap' }}>{text}</p>
          </div>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background:COLOR, borderColor:COLOR }}>Écrire de nouveau</button>
            <button className="btn btn-ghost btn-sm" onClick={back}>← Autres tâches</button>
          </div>
        </div>
      </div>
    </section>
  );

  if (task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:720 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica/frances/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>Français A1</Link>
          <span>/</span>
          <button onClick={back} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--mono)', fontSize:'0.82rem', padding:0 }}>✍️ Écriture</button>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>Tâche {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line" />Tâche d'écriture {task.id} — {task.topic}</p>
        <h2 style={{ fontSize:'1.7rem', margin:'0 0 1.5rem', fontWeight:700 }}>{task.title}</h2>

        <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Consigne (español)</div>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.95rem', color:'var(--ink)', lineHeight:1.6 }}>{task.prompt}</p>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>En français</div>
          <p style={{ margin:0, fontSize:'0.88rem', color:'var(--muted)', fontStyle:'italic', lineHeight:1.6 }}>{task.promptFr}</p>
        </div>

        <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1rem', fontSize:'0.82rem' }}>
          {showModel ? '👁 Masquer le modèle' : '👁 Voir le texte modèle'}
        </button>
        {showModel && (
          <div style={{ padding:'1rem 1.2rem', borderRadius:12, background:'rgba(37,99,235,0.06)', border:'1px solid rgba(37,99,235,0.2)', marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'#2563eb', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Texte modèle</div>
            <p style={{ margin:0, fontSize:'0.9rem', color:'var(--ink)', lineHeight:1.7, fontStyle:'italic' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'0.85rem', marginBottom:'1.25rem' }}>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Critères d'évaluation</div>
            {task.criteria.map((c, i) => <p key={i} style={{ margin:'0 0 0.3rem', fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.4 }}>• {c}</p>)}
          </div>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Vocabulaire utile — cliquer</div>
            <div style={{ display:'flex', gap:'0.35rem', flexWrap:'wrap' }}>
              {task.vocab.map((v, i) => (
                <button key={i} onClick={() => setText(p => p ? `${p} ${v}` : v)}
                  style={{ fontSize:'0.72rem', padding:'0.18rem 0.5rem', borderRadius:6, background:`${COLOR}10`, color:COLOR, border:`1px solid ${COLOR}30`, cursor:'pointer', fontFamily:'inherit' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea value={text} onChange={e => setText(e.target.value)} rows={7} placeholder="Écris ton texte en français ici..."
          style={{ width:'100%', padding:'1rem 1.1rem', borderRadius:12, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.7, marginBottom:'0.5rem' }} />
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.25rem', fontSize:'0.78rem', fontFamily:'var(--mono)', color:words<20?'#d97706':'#059669' }}>
          <span>{words} mots {words<20?'(minimum recommandé: 25)':'✓'}</span>
        </div>

        <div style={{ padding:'1rem 1.2rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)', marginBottom:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>Liste de vérification avant d'envoyer</div>
          {task.checklist.map((item, i) => (
            <button key={i} onClick={() => setCheckDone(p => ({ ...p, [i]: !p[i] }))}
              style={{ display:'flex', alignItems:'center', gap:'0.6rem', width:'100%', padding:'0.35rem 0', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', color:'inherit', textAlign:'left' }}>
              <span style={{ fontSize:'1rem', flexShrink:0 }}>{checkDone[i] ? '✅' : '⬜'}</span>
              <span style={{ fontSize:'0.82rem', color:checkDone[i]?'#059669':'var(--muted)' }}>{item}</span>
            </button>
          ))}
        </div>

        <button className="btn btn-sm" onClick={() => text.trim() && setSubmitted(true)} disabled={!text.trim()}
          style={{ background:COLOR, borderColor:COLOR, opacity:text.trim()?1:0.5 }}>
          Envoyer →
        </button>
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
          <span style={{ color:COLOR, fontWeight:800 }}>✍️ Écriture</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Écriture · Français A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Production écrite A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>5 tâches guidées avec texte modèle, vocabulaire utile et liste de vérification.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', padding:'1.1rem 1.4rem', border:`1.5px solid ${COLOR}22`, borderRadius:16, background:`${COLOR}05`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 4px 20px ${COLOR}18`;(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}44`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';(e.currentTarget as HTMLElement).style.borderColor=`${COLOR}22`;}}>
                <div style={{ width:48, height:48, borderRadius:12, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', fontWeight:900, fontFamily:'var(--mono)', flexShrink:0 }}>{t.id}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.15rem' }}>{t.title}</div>
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{t.topic} · {t.prompt.substring(0,70)}...</p>
                </div>
                <span style={{ color:COLOR, fontSize:'1.1rem', fontWeight:700, flexShrink:0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
