'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; titleFr: string; topic: string;
  prompt: string; promptFr: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1,
    title: 'Una opinión personal',
    titleFr: 'Une opinion personnelle',
    topic: 'Subjonctif + opinion',
    prompt: 'Escribe tu opinión sobre las redes sociales en 6 oraciones. Usa "Je pense que...", "Il est important que...", "Bien que...", expresando acuerdo y desacuerdo.',
    promptFr: "Donnez votre opinion sur les réseaux sociaux en 6 phrases. Utilisez le subjonctif et les connecteurs logiques.",
    model: "Je pense que les réseaux sociaux ont transformé notre façon de communiquer. Il est indéniable qu'ils permettent de maintenir des liens avec des amis éloignés. Cependant, il est important que les utilisateurs soient conscients des risques liés à la désinformation. Bien que les réseaux sociaux offrent des opportunités professionnelles, ils peuvent aussi créer des dépendances problématiques. Je suis convaincu qu'il faudrait que les plateformes prennent davantage de responsabilités. Pour que cette technologie soit bénéfique, il est essentiel qu'elle soit utilisée de manière réfléchie.",
    criteria: ['Usa al menos 3 veces el subjonctif (soit, soient, soit, faudrait que, prennent)', 'Incluye "Bien que" + subjonctif (concesión)', 'Añade "Il est important que" o "Il est essentiel que" + subjonctif', 'Usa conectores: Cependant, Cependant, Pour autant, En revanche'],
    vocab: ["Je pense que...", "Il est indéniable que...", "Bien que + subjonctif", "Il est important que + subjonctif", "Cependant (sin embargo)", "Pour autant (por ello)", "Je suis convaincu(e) que...", "Il faudrait que + subjonctif", "Pour que + subjonctif", "En revanche (en cambio)"],
    checklist: ['¿Usaste el subjonctif al menos 3 veces?', '¿Usaste "Bien que" correctamente con subjonctif?', '¿Tu texto tiene una estructura lógica (argumentación → concesión → conclusión)?', '¿Usaste conectores logiques (Cependant, Pour que, Il est essentiel que)?'],
  },
  {
    id: 2,
    title: 'Un email formal',
    titleFr: 'Un email formel',
    topic: 'Conditionnel de politesse + discours formel',
    prompt: 'Escribe un email formal a un hotel quejándote del servicio. Usa el conditionnel para ser cortés y expresa tu insatisfacción de forma profesional.',
    promptFr: "Rédigez un email formel à un hôtel pour vous plaindre du service. Utilisez le conditionnel de politesse et un registre formel.",
    model: "Madame, Monsieur,\n\nJe me permets de vous contacter suite à mon séjour dans votre établissement du 15 au 18 juin dernier. Malheureusement, j'ai été déçu(e) par la qualité du service reçu.\n\nEn premier lieu, la chambre que j'avais réservée n'était pas disponible à mon arrivée. De plus, le personnel de réception n'a pas semblé particulièrement attentif à ma situation. J'aurais souhaité qu'on me propose une solution plus rapide.\n\nJe vous saurais gré de bien vouloir m'expliquer ces dysfonctionnements. Je voudrais également savoir si vous seriez en mesure de m'offrir une compensation pour ce séjour décevant.\n\nDans l'attente de votre réponse, je vous adresse mes cordiales salutations.\n\nPrénom Nom",
    criteria: ['Comienza con "Madame, Monsieur,"', 'Usa el conditionnel para expresar deseos (j\'aurais souhaité, je voudrais, vous seriez)', 'Estructura en 3 párrafos: situación / queja / petición', 'Cierra con fórmula de cortesía formal', 'Registre vouvoiement en todo el email'],
    vocab: ["Je me permets de vous contacter", "Suite à mon séjour", "J'aurais souhaité que + subjonctif", "Je vous saurais gré de", "Je voudrais savoir si", "Vous seriez en mesure de", "Dans l'attente de votre réponse", "Je vous adresse mes cordiales salutations", "Malheureusement (desgraciadamente)", "En premier lieu (en primer lugar)"],
    checklist: ['¿Usaste el vouvoiement (vous) en todo el email?', '¿Incluiste el conditionnel para ser más cortés (j\'aurais, je voudrais, seriez)?', '¿El email tiene saludo formal al inicio?', '¿El email tiene fórmula de cierre formal?', '¿El tono es profesional y cortés, no agresivo?'],
  },
  {
    id: 3,
    title: 'Comparar dos ciudades',
    titleFr: 'Comparer deux villes',
    topic: 'Comparatifs + pronoms relatifs',
    prompt: 'Compara París y Lyon (o dos ciudades que conozcas) usando comparativos y pronoms relatifs. Escribe 6-8 oraciones.',
    promptFr: "Comparez Paris et Lyon (ou deux villes que vous connaissez) en utilisant des comparatifs et des pronoms relatifs.",
    model: "Paris et Lyon sont deux villes françaises dont la réputation est internationale. Paris, qui est la capitale, est beaucoup plus grande que Lyon, mais Lyon est souvent considérée comme plus conviviale. La gastronomie lyonnaise, dont les fameux bouchons font la renommée, est reconnue comme la meilleure de France. En revanche, les musées que Paris possède sont incomparables à ceux de Lyon. La qualité de vie que Lyon offre est souvent meilleure que celle de Paris : les loyers sont moins élevés et les embouteillages moins fréquents. Cependant, les opportunités professionnelles qui existent à Paris sont plus nombreuses. En conclusion, le choix entre ces deux villes dépend de ce que l'on recherche.",
    criteria: ['Usa comparativos: plus...que, moins...que, aussi...que', 'Incluye pronoms relatifs: qui, que, dont, où', 'Añade superlativos: le/la plus, la meilleure', 'Usa conectores de contraste: En revanche, Cependant, Pourtant'],
    vocab: ["plus ___ que", "moins ___ que", "aussi ___ que", "dont la réputation", "qui est / qui possède", "que Paris offre", "la meilleure de", "En revanche (en cambio)", "Cependant (sin embargo)", "En conclusion (en conclusión)"],
    checklist: ['¿Usaste al menos 3 comparativos diferentes (plus, moins, aussi)?', '¿Incluiste los 4 pronoms relatifs (qui, que, dont, où)?', '¿Usaste al menos un superlatif?', '¿Las frases con pronoms relatifs están bien construidas (sin repetir el sustantivo)?'],
  },
  {
    id: 4,
    title: 'Una elección difícil',
    titleFr: 'Un choix difficile',
    topic: 'Conditionnel présent (hypothèse)',
    prompt: 'Si tuvieras que elegir entre dos carreras (médico vs artista, abogado vs músico, etc.), ¿qué harías? Usa "Si j\'avais..., je..." con conditionnel présent. Escribe 6-8 oraciones.',
    promptFr: "Si vous deviez choisir entre deux carrières, que feriez-vous ? Utilisez le conditionnel présent pour exprimer vos hypothèses.",
    model: "Si j'avais à choisir entre devenir médecin ou artiste, je choisirais probablement la médecine. Si j'étudiais la médecine, je pourrais aider les gens tout en ayant une carrière stable. Cependant, si j'avais un talent artistique exceptionnel, je n'hésiterais pas à poursuivre cette voie. En tant qu'artiste, je voyagerais davantage et j'aurais plus de liberté créative. Mais je saurais que la vie d'artiste serait financièrement incertaine. Si je devais vraiment choisir, je prendrais la médecine de jour et je ferais de l'art le soir comme passe-temps. Cette solution me permettrait de concilier mes deux passions sans sacrifier la sécurité financière.",
    criteria: ['Usa "Si + imparfait → conditionnel" al menos 4 veces', 'NUNCA pongas conditionnel después de "Si"', 'Usa el conditionnel de: pouvoir, aller, être, avoir, choisir, faire', 'Expresa tu razonamiento con conectores: Cependant, Mais, En revanche, Pourtant'],
    vocab: ["Si j'avais..., je...", "Si j'étais..., je...", "je choisirais / j'irais / je ferais", "je pourrais (pouvoir)", "j'aurais (avoir)", "je serais (être)", "Cependant (sin embargo)", "Pourtant (sin embargo / no obstante)", "probablement (probablemente)", "sans sacrifier (sin sacrificar)"],
    checklist: ['¿Usaste "Si + imparfait → conditionnel" (no conditionnel después de Si)?', '¿Las terminaciones del conditionnel son correctas (-ais, -ait, -ions, -iez, -aient)?', '¿Justificaste tu elección con argumentos?', '¿Usaste al menos 3 verbos diferentes en conditionnel?'],
  },
  {
    id: 5,
    title: 'Un événement passé',
    titleFr: 'Un événement passé',
    topic: 'Plus-que-parfait + passé composé',
    prompt: 'Describe un evento importante en tu vida y qué había pasado antes. Usa "Quand je suis arrivé(e), il avait déjà..." y combina plus-que-parfait con passé composé.',
    promptFr: "Décrivez un événement important et ce qui s'était passé avant. Combinez le plus-que-parfait et le passé composé.",
    model: "Le jour de ma première présentation professionnelle, j'ai vécu une expérience mémorable. Avant d'arriver au bureau, j'avais préparé mes diaporamas pendant des heures. Quand je suis entré(e) dans la salle, les autres participants étaient déjà installés. J'ai réalisé que j'avais oublié mon ordinateur portable à la maison. Heureusement, mon collègue avait apporté un câble adapté. J'avais répété ma présentation tellement de fois que je la connaissais par cœur. La présentation s'est finalement bien passée, même si les premières minutes avaient été stressantes. Cette expérience m'a appris qu'il faut toujours prévoir l'imprévu.",
    criteria: ['Usa el plus-que-parfait (avais + participe) al menos 3 veces', 'Combina con passé composé (ai + participe) al menos 3 veces', 'Usa "Quand + passé composé... il/elle avait déjà + PQP"', 'Incluye adverbios temporales: avant de, quand, heureusement, finalement'],
    vocab: ["Avant d'arriver, j'avais déjà...", "Quand je suis arrivé(e), il/elle avait...", "j'avais préparé / oublié / répété", "je suis entré(e) / j'ai réalisé / ça s'est passé", "Heureusement (afortunadamente)", "Finalement (finalmente)", "tellement de fois que (tantas veces que)", "par cœur (de memoria)"],
    checklist: ['¿Usaste el PQP con l\'auxiliaire correct (avoir ou être + participe)?', '¿Las oraciones con PQP expresan una acción ANTERIOR a otra acción pasada?', '¿Usaste el passé composé para los eventos principales?', '¿Hay conectores temporales que marquen la cronología?'],
  },
];

export default function EscrituraFrancesB1() {
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
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
          <h2 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Texte envoyé!</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Registrado para revisión con David o Zhanna.</p>
          <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background: COLOR, borderColor: COLOR }}>Écrire de nouveau</button>
            <button className="btn btn-ghost btn-sm" onClick={back}>← Autres tâches</button>
          </div>
        </div>
      </div>
    </section>
  );

  if (task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Français B1</Link>
          <span>/</span>
          <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Écriture</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>Tâche {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Tâche d&apos;écriture {task.id} — {task.topic}</p>
        <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.titleFr}</h2>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Consigne (español)</div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>En français</div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.promptFr}</p>
        </div>

        <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
          {showModel ? '👁 Masquer le modèle' : '👁 Voir le texte modèle'}
        </button>
        {showModel && (
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texte modèle</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Critères d&apos;évaluation</div>
            {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>• {c}</p>)}
          </div>
          <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Vocabulaire utile — cliquer</div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {task.vocab.map((v, i) => (
                <button key={i} onClick={() => setText(p => p ? `${p} ${v}` : v)}
                  style={{ fontSize: '0.72rem', padding: '0.18rem 0.5rem', borderRadius: 6, background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}30`, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Écris ton texte en français ici..."
          style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 40 ? '#d97706' : '#059669' }}>
          <span>{words} mots {words < 40 ? '(minimum recommandé: 50)' : '✓'}</span>
        </div>

        <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Liste de vérification avant d&apos;envoyer</div>
          {task.checklist.map((item, i) => (
            <button key={i} onClick={() => setCheckDone(p => ({ ...p, [i]: !p[i] }))}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.35rem 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', textAlign: 'left' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{checkDone[i] ? '✅' : '⬜'}</span>
              <span style={{ fontSize: '0.82rem', color: checkDone[i] ? '#059669' : 'var(--muted)' }}>{item}</span>
            </button>
          ))}
        </div>

        <button className="btn btn-sm" onClick={() => text.trim() && setSubmitted(true)} disabled={!text.trim()}
          style={{ background: COLOR, borderColor: COLOR, opacity: text.trim() ? 1 : 0.5 }}>
          Envoyer →
        </button>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Français B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Écriture</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Écriture · Français B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Production écrite B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 tâches guidées B1 con texto modelo, vocabulaire utile y lista de verificación.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.titleFr}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.prompt.substring(0, 75)}...</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
