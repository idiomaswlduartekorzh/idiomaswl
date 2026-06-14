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
    id: 1, title: 'Un week-end passé', topic: 'Passé composé',
    prompt: 'Escribe 5–6 oraciones sobre lo que hiciste el fin de semana pasado. Usa el passé composé con los auxiliares avoir y être correctamente.',
    promptFr: "Écris 5–6 phrases sur ce que tu as fait le week-end dernier. Utilise le passé composé avec avoir et être.",
    model: "Le week-end dernier, je suis allé(e) au marché avec ma mère. Nous avons acheté des légumes frais et du fromage. L'après-midi, j'ai regardé un film français avec des sous-titres. Le soir, mes amis sont venus chez moi et nous avons mangé une pizza. Le dimanche, je suis resté(e) à la maison et j'ai lu un livre. C'était un week-end très agréable !",
    criteria: ['Usa el passé composé (avoir/être + participio)', 'Incluye al menos 2 verbos con ÊTRE (aller, venir, rester, arriver...)', 'Acuerda el participio con ÊTRE correctamente (-e, -s, -es según el sujeto)', 'Usa marcadores de tiempo: le week-end dernier, l\'après-midi, le soir, le dimanche'],
    vocab: ["Le week-end dernier", "je suis allé(e) à", "nous avons visité", "j'ai mangé / bu / regardé", "ils/elles sont venus(es)", "je suis resté(e)", "nous avons fait du shopping", "c'était très bien / agréable"],
    checklist: ['¿Usaste "être" con verbos de movimiento (aller, venir, partir, arriver)?', '¿Acordaste el participio con el sujeto al usar ÊTRE? (elle est allée, ils sont partis)', '¿Usaste "avoir" con verbos ordinarios (manger, regarder, acheter)?', '¿Pusiste marcadores de tiempo al inicio de las oraciones?'],
  },
  {
    id: 2, title: 'Comparer deux choses', topic: 'Comparatif et superlatif',
    prompt: 'Compara dos ciudades, dos países, dos restaurantes o dos escuelas que conoces. Escribe 5–6 oraciones usando comparativos y superlativos.',
    promptFr: "Compare deux choses que tu connais bien. Utilise le comparatif (plus...que, moins...que, aussi...que) et le superlatif (le plus, le meilleur).",
    model: "Je connais deux villes : Bogotá et Medellín. Bogotá est plus grande que Medellín, mais Medellín est plus agréable en termes de climat. Le temps à Medellín est aussi doux que le printemps en France. La vie à Bogotá est plus stressante et plus chère. À mon avis, Medellín est la ville la plus belle de Colombie. Cependant, Bogotá a le meilleur système de transport en commun.",
    criteria: ['Usa plus...que, moins...que o aussi...que al menos 3 veces', 'Incluye al menos un superlatif (le plus, la plus, les plus)', 'Usa correctamente meilleur/meilleure (irregular de bon)', 'Añade tu opinión personal (À mon avis, Pour moi...)'],
    vocab: ["plus ___ que", "moins ___ que", "aussi ___ que", "le/la plus + adj", "le meilleur / la meilleure", "cependant (sin embargo)", "à mon avis", "par contre (en cambio)", "en termes de (en términos de)"],
    checklist: ['¿Usaste "que" después del comparativo (plus grand QUE...)?', '¿Usaste "le/la/les" antes del superlatif?', '¿Escribiste "meilleur" (no "plus bon") para el comparativo de "bon"?', '¿El adjetivo concuerda en género y número con el sustantivo?'],
  },
  {
    id: 3, title: "Mes projets d'avenir", topic: 'Futur proche + futur simple',
    prompt: 'Escribe sobre tus planes futuros: a corto plazo (esta semana/mes) y a largo plazo (en los próximos años). Combina el futur proche y el futur simple.',
    promptFr: "Parle de tes projets : à court terme (futur proche) et à long terme (futur simple). Utilise les deux formes du futur.",
    model: "La semaine prochaine, je vais commencer un cours de cuisine française. Je vais aussi acheter de nouveaux livres en français pour pratiquer. Dans six mois, j'espère parler français couramment. Dans quelques années, je voyagerai en France et je visiterai Paris, Lyon et Bordeaux. Un jour, je travaillerai dans une entreprise internationale et j'utiliserai le français tous les jours. Mon rêve est de devenir parfaitement bilingue.",
    criteria: ['Usa el futur proche (aller + infinitif) para planes concretos y cercanos', 'Usa el futur simple para planes lejanos o sueños', 'Distingue correctamente entre los dos futuros según el contexto', 'Usa expresiones temporales: la semaine prochaine, dans six mois, un jour...'],
    vocab: ["Je vais + infinitif (futur proche)", "La semaine prochaine / Ce mois-ci", "Dans six mois / l'année prochaine", "je voyagerai / je visiterai / je parlerai (futur simple)", "un jour / dans quelques années", "j'espère + infinitif", "mon rêve est de"],
    checklist: ['¿Usaste "aller + infinitivo" para el futur proche?', '¿Las terminaciones del futur simple son correctas? (-erai, -eras, -era, -erons, -erez, -eront)', '¿Usaste futur proche para planes concretos/inminentes y futur simple para sueños/predicciones?', '¿Hay marcadores de tiempo que justifiquen el tiempo verbal elegido?'],
  },
  {
    id: 4, title: 'Donner des conseils', topic: 'Devoir, pouvoir, il faut',
    prompt: 'Un amigo quiere aprender francés o mejorar su salud. Escríbele 5–6 consejos usando devoir, pouvoir, il faut y il ne faut pas.',
    promptFr: "Un(e) ami(e) veut apprendre le français (ou améliorer sa santé). Donne-lui 5–6 conseils avec devoir, pouvoir, il faut et il ne faut pas.",
    model: "Pour apprendre le français rapidement, tu dois écouter des podcasts français tous les jours. Tu peux regarder des séries françaises avec des sous-titres pour améliorer ta compréhension. Il faut pratiquer au moins 30 minutes chaque jour — la régularité est essentielle. Il ne faut pas avoir peur de faire des erreurs : c'est comme ça qu'on apprend. Tu dois aussi essayer de parler avec des natifs. Si tu peux, tu devrais t'inscrire à un cours de conversation.",
    criteria: ['Usa devoir (obligation) correctamente conjugado', 'Usa pouvoir (capacidad/posibilidad)', 'Usa il faut + infinitivo (obligación impersonal)', 'Usa il ne faut pas + infinitivo (prohibición impersonal)', 'El tono es amistoso y motivador'],
    vocab: ["Tu dois + infinitif", "Tu peux + infinitif", "Il faut + infinitif", "Il ne faut pas + infinitif", "Tu devrais (conditionnel — deberías)", "Je te conseille de", "Essaie de + infinitif", "la régularité est essentielle"],
    checklist: ['¿Conjugaste correctamente "devoir" y "pouvoir" según el sujeto?', '¿Usaste "il faut + infinitivo" (no "il faut que + subjuntivo" — eso es B1)?', '¿El tono es de consejo amigable, no de orden?', '¿Incluiste al menos una motivación o explicación del consejo?'],
  },
  {
    id: 5, title: 'Un courriel professionnel', topic: 'Register formel / vouvoiement',
    prompt: 'Escribe un email formal a una empresa francesa solicitando información sobre un puesto de trabajo o una reserva para un grupo. Usa el vouvoiement (vous) en todo el mensaje.',
    promptFr: "Écris un courriel professionnel à une entreprise ou un hôtel. Utilise le vouvoiement (vous) et le registre formel tout au long du message.",
    model: "Madame, Monsieur,\n\nJe me permets de vous contacter au sujet d'une offre d'emploi publiée sur votre site internet le 10 juin. Je suis étudiant(e) en communication et je serais très intéressé(e) par le poste de stagiaire que vous proposez.\n\nPouvez-vous me faire parvenir plus d'informations sur les responsabilités du poste et la durée du stage ? Je suis disponible pour un entretien à votre convenance.\n\nDans l'attente de votre réponse, je vous adresse mes cordiales salutations.\n\nJulio Ramírez",
    criteria: ['Comienza con "Madame, Monsieur," o "Madame," / "Monsieur,"', 'Usa el vouvoiement (vous) en todo el email, nunca "tu"', 'Incluye el motivo del email en el primer párrafo', 'Termina con una fórmula de cierre formal (Cordialement, / Salutations,)', 'El tono es profesional y cortés en todo momento'],
    vocab: ["Je me permets de vous contacter", "Au sujet de + nom", "Je serais intéressé(e) par", "Pouvez-vous me faire parvenir", "Dans l'attente de votre réponse", "Je vous adresse mes cordiales salutations", "Madame, Monsieur,", "À votre convenance (a su conveniencia)"],
    checklist: ['¿Usaste "vous" en todos los verbos dirigidos al receptor?', '¿El email tiene saludo formal al inicio?', '¿El email tiene fórmula de cierre formal?', '¿Explicaste claramente el motivo del contacto?', '¿El registro es formal en todo momento (sin "salut", "super", etc.)?'],
  },
];

export default function EscrituraFrancesA2() {
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
          <Link href="/practica/frances/a2" style={{ color:'var(--muted)', textDecoration:'none' }}>Français A2</Link>
          <span>/</span>
          <button onClick={back} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--mono)', fontSize:'0.82rem', padding:0 }}>✍️ Écriture</button>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>Tâche {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line" />Tâche d&apos;écriture {task.id} — {task.topic}</p>
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
            <p style={{ margin:0, fontSize:'0.9rem', color:'var(--ink)', lineHeight:1.7, fontStyle:'italic', whiteSpace:'pre-wrap' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'0.85rem', marginBottom:'1.25rem' }}>
          <div style={{ padding:'0.9rem 1rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Critères d&apos;évaluation</div>
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

        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Écris ton texte en français ici..."
          style={{ width:'100%', padding:'1rem 1.1rem', borderRadius:12, resize:'vertical', border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.7, marginBottom:'0.5rem' }} />
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.25rem', fontSize:'0.78rem', fontFamily:'var(--mono)', color:words<30?'#d97706':'#059669' }}>
          <span>{words} mots {words<30?'(minimum recommandé: 40)':'✓'}</span>
        </div>

        <div style={{ padding:'1rem 1.2rem', borderRadius:12, border:'1px solid var(--line-soft)', background:'var(--bg)', marginBottom:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>Liste de vérification avant d&apos;envoyer</div>
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
          <Link href="/practica/frances/a2" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A2</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>✍️ Écriture</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Écriture · Français A2</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Production écrite A2</h1>
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
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{t.topic} · {t.prompt.substring(0,75)}...</p>
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
