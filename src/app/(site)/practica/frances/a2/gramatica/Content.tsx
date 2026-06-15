'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#7c3aed';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }
interface Topic { id: string; title: string; icon: string; desc: string; tip: string; qs: GQItem[]; }

const TOPICS: Topic[] = [
  {
    id: 'passe_compose', title: 'Passé composé : avoir et être', icon: '⏰',
    desc: "Le passé composé se forme avec l'auxiliaire AVOIR ou ÊTRE + participe passé. Verbes avec ÊTRE : verbes de mouvement/état (aller→allé, venir→venu, partir→parti, arriver→arrivé, naître, mourir, rester, tomber, entrer, sortir, monter, descendre) + verbes pronominaux.",
    tip: "Truc mnémotechnique DEVTRAMPSS pour les verbes avec être : Devenir, Entrer, Venir, Tomber, Rester, Aller, Mourir, Partir, Sortir, S'en aller. Avec ÊTRE, le participe s'accorde en genre/nombre : Elle est allée (pas allé).",
    qs: [
      { s:"Elle ___ allée au marché ce matin.", opts:["est","a","sont","ont"], a:0, fb:"\"Aller\" utilise l'auxiliaire ÊTRE → elle EST allée. Le participe s'accorde : allée (féminin)." },
      { s:"Nous ___ mangé une bonne pizza hier soir.", opts:["avons","sommes","avez","êtes"], a:0, fb:"\"Manger\" utilise l'auxiliaire AVOIR → nous AVONS mangé. Pas d'accord du participe avec avoir (sauf COD avant)." },
      { s:"Ils ___ partis à six heures du matin.", opts:["sont","ont","sommes","avons"], a:0, fb:"\"Partir\" est un verbe de mouvement → auxiliaire ÊTRE. Accord au masculin pluriel : partis." },
      { s:"Tu ___ vu le nouveau film de Luc Besson ?", opts:["as","es","a","est"], a:0, fb:"\"Voir\" utilise l'auxiliaire AVOIR → tu AS vu. Verbe de perception = avoir." },
      { s:"Marie et Sophie ___ venues nous rendre visite.", opts:["sont","ont","avons","avez"], a:0, fb:"\"Venir\" → auxiliaire ÊTRE. Accord féminin pluriel : venues (Marie et Sophie = deux femmes)." },
      { s:"J'___ reçu une lettre importante.", opts:["ai","suis","avons","as"], a:0, fb:"\"Recevoir\" → auxiliaire AVOIR → j'AI reçu. Verbe de reception = avoir." },
      { s:"Elle ___ tombée dans l'escalier.", opts:["est","a","sommes","avez"], a:0, fb:"\"Tomber\" est dans la liste ÊTRE → elle EST tombée. Accord féminin singulier : tombée." },
      { s:"Vous ___ travaillé pendant toute la nuit ?", opts:["avez","êtes","avons","sont"], a:0, fb:"\"Travailler\" → auxiliaire AVOIR → vous AVEZ travaillé. Verbe ordinaire = avoir." },
      { s:"Ils se ___ rencontrés au café.", opts:["sont","ont","avons","avez"], a:0, fb:"\"Se rencontrer\" est un verbe pronominal → auxiliaire ÊTRE toujours. Accord masculin pluriel : rencontrés." },
      { s:"Mon frère ___ né à Lyon en 1995.", opts:["est","a","suis","as"], a:0, fb:"\"Naître\" → auxiliaire ÊTRE → mon frère EST né. C'est un verbe d'état." },
    ],
  },
  {
    id: 'imparfait', title: "L'imparfait : habitude et description", icon: '🔄',
    desc: "L'imparfait exprime : (1) habitudes passées répétées ('Quand j'étais enfant, je mangeais des bonbons tous les jours'), (2) descriptions dans le passé ('Il faisait beau / La maison était grande'), (3) actions en cours interrompues ('Je dormais quand le téléphone a sonné'). Formation : radical 'nous' du présent + terminaisons -ais, -ais, -ait, -ions, -iez, -aient.",
    tip: "Truc : prenez le présent 'nous', enlevez '-ons', ajoutez -ais/-ais/-ait/-ions/-iez/-aient. Exemple : nous mangeons → mang- → je mangeais. Exception : être → j'étais (radical 'ét-').",
    qs: [
      { s:"Quand j'___ enfant, je jouais dans la rue.", opts:["étais","suis","été","ai été"], a:0, fb:"\"Étais\" — imparfait de \"être\". Dans les souvenirs d'enfance, on utilise l'imparfait pour les états : j'étais (j'avais cet état dans le passé)." },
      { s:"Tous les étés, nous ___ à la plage.", opts:["allions","allons","sommes allés","irons"], a:0, fb:"\"Allions\" — imparfait de \"aller\", 1ère personne du pluriel. Habitude passée répétée (tous les étés = répétition)." },
      { s:"Il ___ très beau quand nous avons décidé de sortir.", opts:["faisait","fait","a fait","fera"], a:0, fb:"\"Faisait\" — imparfait utilisé pour la météo comme description de fond. \"Il faisait beau\" = le temps était agréable (état/description)." },
      { s:"Elle ___ (lire) un roman quand le téléphone a sonné.", opts:["lisait","lut","a lu","lit"], a:0, fb:"\"Lisait\" — imparfait pour une action en cours interrompue. Le passé composé (a sonné) exprime l'interruption." },
      { s:"Quand tu habitais à Paris, tu ___ le métro tous les jours.", opts:["prenais","as pris","prends","pris"], a:0, fb:"\"Prenais\" — imparfait pour une habitude passée régulière. \"Tous les jours\" est un marqueur de répétition → imparfait." },
      { s:"La maison était grande et les jardins ___ magnifiques.", opts:["étaient","sont","ont été","seront"], a:0, fb:"\"Étaient\" — imparfait pour une description dans le passé. On décrit comment étaient les jardins à ce moment-là." },
      { s:"Je ___ (travailler) quand mon patron est entré.", opts:["travaillais","ai travaillé","travaille","travaillerai"], a:0, fb:"\"Travaillais\" — action en cours (imparfait) interrompue par l'arrivée du patron (passé composé: est entré)." },
      { s:"Avant, les gens ___ beaucoup plus de lettres.", opts:["écrivaient","ont écrit","écrivent","écriront"], a:0, fb:"\"Écrivaient\" — habitude passée générale. \"Avant\" est un marqueur typique de l'imparfait pour les habitudes du passé." },
      { s:"Mes grands-parents ___ dans une petite ferme à la campagne.", opts:["vivaient","ont vécu","vivent","vivront"], a:0, fb:"\"Vivaient\" — description de la situation passée (où vivaient-ils). État permanent dans le passé = imparfait." },
      { s:"Chaque matin, il ___ son café en lisant le journal.", opts:["buvait","a bu","boit","boira"], a:0, fb:"\"Buvait\" — habitude passée régulière. \"Chaque matin\" + passé = imparfait." },
    ],
  },
  {
    id: 'pronoms_cod_coi', title: 'Pronoms COD et COI', icon: '🔗',
    desc: "COD (Complément d'Objet Direct) remplace un nom sans préposition : le/la/les/l'. COI (Complément d'Objet Indirect) remplace 'à + personne' : lui (sing.) / leur (plur.). Placement : AVANT le verbe conjugué (ou l'auxiliaire au passé composé).",
    tip: "Test COD : 'Il voit QUI/QUOI ?' → Si réponse directe = COD → le/la/les. Test COI : 'Il parle À QUI ?' → lui/leur. Erreur fréquente : 'Je lui vois' (❌) → 'Je le vois' (✓) parce que 'voir quelqu'un' est direct (pas 'à quelqu'un').",
    qs: [
      { s:"Est-ce que tu as vu Marie ? — Oui, je ___ ai vue hier.", opts:["l'","la","lui","les"], a:0, fb:"\"L'ai vue\" — Marie = COD féminin singulier → pronom \"la\" (élision l'). Accord du participe avec le COD féminin : vue." },
      { s:"Tu as téléphoné à tes parents ? — Oui, je ___ ai téléphoné.", opts:["leur","les","lui","y"], a:0, fb:"\"Leur ai téléphoné\" — COI pluriel (à tes parents = à eux, pluriel). \"Téléphoner à quelqu'un\" = COI → lui/leur." },
      { s:"Il attend sa femme. Il ___ attend devant la gare.", opts:["l'","lui","la","leur"], a:0, fb:"\"Il l'attend\" — \"attendre quelqu'un\" = COD. Sa femme → pronom féminin singulier = la (l' devant voyelle)." },
      { s:"Vous avez parlé au directeur ? — Oui, nous ___ avons parlé.", opts:["lui","le","la","l'"], a:0, fb:"\"Nous lui avons parlé\" — \"parler à quelqu'un\" = COI singulier → lui. Le directeur = singulier masculin → lui." },
      { s:"Tu prends les billets ? — Oui, je ___ prends.", opts:["les","leur","lui","y"], a:0, fb:"\"Je les prends\" — les billets = COD masculin pluriel → \"les\"." },
      { s:"Elle écrit à ses amies. Elle ___ écrit une lettre.", opts:["leur","les","lui","y"], a:0, fb:"\"Elle leur écrit\" — COI pluriel (à ses amies = à elles, pluriel). \"Écrire à quelqu'un\" = COI → leur." },
      { s:"J'ai acheté cette robe. Je ___ ai achetée dans une boutique.", opts:["l'","lui","la","les"], a:0, fb:"\"Je l'ai achetée\" — cette robe = COD féminin singulier → la (l'). Accord du participe : achetée." },
      { s:"Tu as demandé à Pierre de venir ? — Oui, je ___ ai demandé.", opts:["lui","le","la","leur"], a:0, fb:"\"Je lui ai demandé\" — \"demander à quelqu'un\" = COI singulier → lui. Pierre = singulier." },
      { s:"Ils ont invité leurs cousins. Ils ___ ont invités.", opts:["les","leur","lui","y"], a:0, fb:"\"Ils les ont invités\" — les cousins = COD masculin pluriel → \"les\". Accord : invités (masculin pluriel)." },
      { s:"Elle téléphone à sa mère tous les soirs. Elle ___ téléphone à 20h.", opts:["lui","la","les","leur"], a:0, fb:"\"Elle lui téléphone\" — \"téléphoner à quelqu'un\" = COI singulier. Sa mère = féminin singulier → lui." },
    ],
  },
  {
    id: 'comparatif_superlatif', title: 'Comparatif et superlatif', icon: '📊',
    desc: "Comparatif: plus...que (supériorité), moins...que (infériorité), aussi...que (égalité). Superlatif: le/la/les plus + adj (supériorité absolue), le/la/les moins + adj. Irréguliers: bon → meilleur/le meilleur, mauvais → pire/le pire, bien → mieux/le mieux (adverbe).",
    tip: "Attention aux irréguliers ! \"Bon\" ne fait PAS \"plus bon\" mais \"meilleur\". \"Mauvais\" peut faire \"pire\" (plus fort) ou \"plus mauvais\" (courant). \"Bien\" (adverbe) → \"mieux\", jamais \"plus bien\" qui n'existe pas.",
    qs: [
      { s:"Cette voiture est ___ chère ___ celle-là.", opts:["plus / que","plus / de","la plus / que","aussi / qui"], a:0, fb:"\"Plus chère que\" — comparatif de supériorité. Structure : plus + adjectif + que." },
      { s:"Ce film est très intéressant. C'est ___ film de l'année.", opts:["le meilleur","le plus bon","le mieux","plus bon"], a:0, fb:"\"Le meilleur\" — superlatif irrégulier de \"bon\". Jamais \"le plus bon\" qui est incorrect en français." },
      { s:"Marie parle anglais ___ bien ___ Pierre.", opts:["aussi / que","aussi / qui","plus / de","le plus / de"], a:0, fb:"\"Aussi bien que\" — comparatif d'égalité. Structure : aussi + adverbe + que." },
      { s:"Cette solution est ___ efficace ___ l'ancienne méthode.", opts:["moins / que","moins / de","le moins / que","plus / de"], a:0, fb:"\"Moins efficace que\" — comparatif d'infériorité. Structure : moins + adjectif + que." },
      { s:"Paris est ___ grande ville de France.", opts:["la plus / ∅","la plus / de","la plus / que","plus / que"], a:0, fb:"\"La plus grande ville de France\" — superlatif relatif avec \"de\" après. Structure : le/la/les + plus + adj + de + groupe." },
      { s:"Ce résultat est ___ qu'attendu.", opts:["pire","plus mauvais que","le pire","plus pire"], a:0, fb:"\"Pire\" — comparatif irrégulier de \"mauvais\". \"Pire que\" exprime l'infériorité qualitative plus forte que \"plus mauvais que\"." },
      { s:"Il chante ___ que moi, mais elle chante ___.", opts:["mieux / le mieux","bien / bien","aussi bien / mieux","meilleur / le meilleur"], a:0, fb:"\"Mieux que moi\" (comparatif de bien) — \"le mieux\" (superlatif de bien). \"Bien\" → \"mieux\" → \"le mieux\"." },
      { s:"Les enfants sont ___ énergiques ___ les adultes.", opts:["plus / que","plus / de","aussi / de","le plus / que"], a:0, fb:"\"Plus énergiques que\" — comparatif de supériorité. \"Que\" introduit le deuxième terme de la comparaison." },
      { s:"C'est ___ restaurant de la ville — tout le monde y vient.", opts:["le meilleur","le plus bon","le mieux","plus bon"], a:0, fb:"\"Le meilleur\" — superlatif irrégulier de \"bon\". Jamais \"le plus bon\" qui est incorrect en français." },
      { s:"Ces deux robes coûtent le même prix. Elles coûtent ___ cher.", opts:["aussi","autant","plus","moins"], a:0, fb:"\"Aussi cher\" — quand les prix sont égaux, on utilise \"aussi + adjectif\" pour le comparatif d'égalité." },
    ],
  },
  {
    id: 'futur_proche_simple', title: 'Futur proche vs futur simple', icon: '🔮',
    desc: "Futur proche: aller (conjugué) + infinitif → action imminente ou plan concret ('Je vais partir dans 5 minutes'). Futur simple: -er → -erai/-eras/-era/-erons/-erez/-eront → événements futurs généraux, prédictions, promesses ('Un jour, je voyagerai partout').",
    tip: "Règle pratique : futur proche = proche dans le temps ou dans l'intention (on a déjà décidé). Futur simple = lointain ou incertain. À l'oral, le futur proche est de loin le plus utilisé en français courant.",
    qs: [
      { s:"Attends, je ___ t'aider avec tes valises.", opts:["vais","irai","veux","suis allé"], a:0, fb:"\"Je vais t'aider\" — futur proche. Décision immédiate de venir en aide → aller + infinitif." },
      { s:"Dans 50 ans, les voitures électriques ___ toutes les rues.", opts:["envahiront","vont envahir","envahissent","ont envahi"], a:0, fb:"\"Envahiront\" — futur simple pour une prédiction lointaine et générale (dans 50 ans = horizon éloigné)." },
      { s:"Ce soir, nous ___ au cinéma — les places sont réservées.", opts:["allons aller","irons","aller","sommes allés"], a:0, fb:"\"Allons aller\" — futur proche pour un plan concret déjà organisé (places réservées = certitude)." },
      { s:"Je te ___ dès que j'arrive à la gare.", opts:["téléphonerai","vais téléphoner","téléphone","ai téléphoné"], a:0, fb:"\"Téléphonerai\" — futur simple dans une proposition avec \"dès que\". En français, après \"dès que/quand/lorsque\" qui exprime l'avenir, on utilise le futur simple." },
      { s:"Ils ___ déménager la semaine prochaine — le camion est réservé.", opts:["vont","iront","sont allés","vont aller"], a:0, fb:"\"Vont déménager\" — futur proche. Plan concret imminent avec préparation (camion réservé) → aller + infinitif." },
      { s:"Un jour, elle ___ son propre restaurant.", opts:["ouvrira","va ouvrir","ouvre","a ouvert"], a:0, fb:"\"Ouvrira\" — futur simple pour un rêve ou projet lointain/vague. \"Un jour\" = horizon indéfini → futur simple." },
      { s:"Vous ___ prêts à partir dans dix minutes ?", opts:["allez être","serez","êtes","avez été"], a:0, fb:"\"Allez être prêts ?\" — futur proche pour demander si quelqu'un sera prêt très bientôt (dans 10 minutes)." },
      { s:"Quand tu ___ à Rome, envoie-moi des photos.", opts:["seras","vas être","es","étais"], a:0, fb:"\"Seras\" — futur simple après \"quand\" qui exprime le futur. En français, \"quand + futur\" (pas de présent comme parfois en espagnol)." },
      { s:"Tu veux un café ? Je ___ faire du café tout de suite.", opts:["vais","ferai","fais","ai fait"], a:0, fb:"\"Je vais faire\" — futur proche pour une action très imminente proposée sur-le-champ. Décision instantanée." },
      { s:"Dans ce film, la ville ___ détruite par un tremblement de terre.", opts:["sera","va être","est","était"], a:0, fb:"\"Sera détruite\" — futur simple pour une narration/prédiction dans un contexte fictif. Le film se passe dans le futur." },
    ],
  },
];

export default function GramaticaFrancesA2() {
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
          <Link href="/practica/frances/a2" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A2</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📐 Grammaire</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Grammaire · Français A2</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Grammaire A2</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 1.5rem' }}>5 temas esenciales: passé composé, imparfait, pronoms COD/COI, comparatif/superlatif et futur.</p>

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
