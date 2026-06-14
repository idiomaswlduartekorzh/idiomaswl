'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#003189';

interface ReadingText {
  id: number; title: string; topic: string; grammar: string; text: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; opts: string[]; a: number; fb: string }[];
  openQ: string; prodPrompt: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Le week-end à Lyon', topic: 'Voyages et tourisme', grammar: 'Passé composé',
    text: "Le week-end dernier, Camille et son amie Léa ont décidé de visiter Lyon. Elles ont pris le train de Paris et sont arrivées vendredi soir. Le samedi matin, elles ont visité le Vieux-Lyon et se sont promenées dans les rues historiques. Les bouchons lyonnais sont célèbres et elles ont mangé une quenelle et du gratin dauphinois dans un restaurant typique. L'après-midi, elles sont montées sur la colline de Fourvière pour admirer la vue. Le dimanche, elles ont fait du shopping à la Part-Dieu. Elles ont passé un excellent week-end et elles ont envie d'y retourner.",
    vocab: { décidé:'decidieron', pris:'tomaron (tren)', arrivées:'llegaron', promenées:'pasearon', célèbres:'famosos', mangé:'comieron', quenelle:'quenela (plato típico lyonés)', gratin:'gratín', montées:'subieron', colline:'colina', admirer:'admirar', shopping:'compras', excellent:'excelente', retourner:'volver' },
    preQ: [
      { q:'¿Has visitado alguna ciudad francesa o francófona?', opts:['Sí, varias', 'Solo una vez', 'No, pero quiero ir'], a:-1 },
      { q:'¿Qué te gusta más hacer al viajar?', opts:['Visitar lugares históricos', 'Comer la comida local', 'Hacer compras'], a:-1 },
    ],
    mcq: [
      { q:'¿Qué significa "bouchon lyonnais" en el contexto del texto?', opts:['Un atasco de tráfico','Un restaurante típico de Lyon','Una tienda de vinos','Un barrio histórico'], a:1, fb:'"Bouchon lyonnais" es el nombre de los restaurantes tradicionales de Lyon, famosos por sus platos como la quenelle.' },
      { q:'¿Cómo llegaron Camille y Léa a Lyon?', opts:['En avión','En coche','En tren','En autobús'], a:2, fb:'"Elles ont pris le train de Paris" — tomaron el tren desde París.' },
      { q:'¿Qué comieron en el restaurante?', opts:['Pizza y ensalada','Quenelle y gratin dauphinois','Croissants y café','Baguettes y queso'], a:1, fb:'"Elles ont mangé une quenelle et du gratin dauphinois" — platos típicos de Lyon.' },
      { q:'¿Adónde fueron el sábado por la tarde?', opts:['Al museo','A la colina de Fourvière','A la Part-Dieu','Al Vieux-Lyon'], a:1, fb:'"Elles sont montées sur la colline de Fourvière pour admirer la vue."' },
      { q:'¿Qué hicieron el domingo?', opts:['Visitaron el Vieux-Lyon','Volvieron a París','Fueron de compras','Comieron en un bouchon'], a:2, fb:'"Le dimanche, elles ont fait du shopping à la Part-Dieu."' },
      { q:'¿Por qué "sont arrivées" usa el auxiliaire ÊTRE y "ont mangé" usa AVOIR?', opts:['Es al azar','Arriver es verbo de movimiento (ÊTRE), manger es verbo ordinario (AVOIR)','Las dos formas son correctas','Depende del sujeto'], a:1, fb:'Los verbos de movimiento/estado usan ÊTRE: arriver, partir, aller, venir... Los verbos ordinarios usan AVOIR: manger, voir, prendre...' },
    ],
    openQ: "Describe en español las actividades del sábado de Camille y Léa.",
    prodPrompt: 'Décrivez un week-end récent en utilisant le passé composé. Utilisez : "Le week-end dernier, j\'ai ___ / je suis ___. Nous avons visité ___ et mangé ___."',
  },
  {
    id: 2, title: "Un entretien d'embauche", topic: 'Travail et emploi', grammar: 'Passé composé + comparatif',
    text: "Thomas a passé un entretien d'embauche mardi dernier dans une grande entreprise à Bordeaux. Il s'est levé tôt, a mis son meilleur costume et est arrivé en avance. La directrice lui a posé des questions sur son expérience professionnelle. Thomas a expliqué qu'il avait travaillé deux ans comme stagiaire dans une agence de communication. Il a dit que ce nouveau poste était plus intéressant et mieux payé que son ancien travail. Les bureaux étaient plus modernes et l'ambiance semblait plus agréable. Thomas était nerveux au début, mais il s'est détendu et a répondu avec confiance. Il attend maintenant la décision de la directrice.",
    vocab: { entretien:"entrevista", passé:"realizó", levé:"se levantó", mis:"puso/llevó", costume:"traje", avance:"anticipación", posé:"hizo (preguntas)", expérience:"experiencia", expliqué:"explicó", stagiaire:"practicante", agence:"agencia", intéressant:"interesante", payé:"pagado", détendu:"se relajó", confiance:"confianza" },
    preQ: [
      { q:'¿Has tenido alguna entrevista de trabajo en otro idioma?', opts:['Sí, fue emocionante', 'No todavía', 'No, pero me gustaría prepararme'], a:-1 },
      { q:'¿Qué palabra crees que significa "entretien d\'embauche"?', opts:['Día de trabajo', 'Entrevista de empleo', 'Contrato de trabajo'], a:-1 },
    ],
    mcq: [
      { q:'¿Dónde fue la entrevista de Thomas?', opts:['En París','En Lyon','En Bordeaux','En Marsella'], a:2, fb:'"Dans une grande entreprise à Bordeaux" — en una gran empresa en Burdeos.' },
      { q:'¿Qué había hecho Thomas antes de esta entrevista?', opts:['Era director de ventas','Había trabajado 2 años como practicante en una agencia','Nunca había trabajado','Era estudiante universitario'], a:1, fb:'"Il avait travaillé deux ans comme stagiaire dans une agence de communication."' },
      { q:'¿Cómo describe el nuevo puesto comparado con el anterior?', opts:['Igual de bueno','Más interesante y mejor pagado','Menos interesante pero mejor pagado','Peor en todos los aspectos'], a:1, fb:'"Plus intéressant et mieux payé que son ancien travail" — comparatif de supériorité.' },
      { q:'¿Cómo estaba Thomas al principio de la entrevista?', opts:['Relajado y seguro','Muy confiado','Nervioso','Indiferente'], a:2, fb:'"Thomas était nerveux au début" — estaba nervioso al principio.' },
      { q:'¿Qué significa "il s\'est détendu" en el texto?', opts:['Se fue','Se relax','Se enojó','Se cansó'], a:1, fb:'"Se détendu" = se relajó. Verbo pronominal "se détendre" → il s\'est détendu (passé composé con ÊTRE).' },
      { q:'¿Cuál es la estructura correcta del comparatif de supériorité?', opts:['plus + adj + de','plus + adj + que','le plus + adj + que','plus + adj'], a:1, fb:'"Plus intéressant QUE son ancien travail" — el comparatif usa "que" para introducir el segundo término.' },
    ],
    openQ: "Selon le texte, quelles qualités a montrées Thomas pendant l'entretien ?",
    prodPrompt: 'Comparez votre travail actuel (ou vos études) avec votre travail/études précédent(es). Utilisez : "Mon nouveau travail est plus ___ que / moins ___ que / aussi ___ que..."',
  },
  {
    id: 3, title: 'Deux amies, deux avis', topic: 'Opinions et loisirs', grammar: 'Comparatif + futur proche',
    text: "Sofia et Julie planifient leurs vacances d'été. Sofia pense que la campagne est plus calme que la mer. Elle dit que l'air à la montagne est plus pur et plus frais que l'air marin. Elle pense aussi que les randonnées sont plus intéressantes que rester sur la plage. Julie n'est pas du tout d'accord. Pour elle, la mer est bien meilleure parce que le temps est plus chaud, les activités sont plus variées, et elle peut se détendre plus facilement. Elles comparent maintenant les prix sur internet. Les gîtes à la campagne sont moins chers que les hôtels au bord de la mer. Elles vont rencontrer leur agent de voyage demain pour prendre une décision. Les deux amies s'accordent sur le fait que les vacances ensemble vont être plus amusantes que partir seules.",
    vocab: { planifient:'planifican', campagne:'campo', calme:'tranquila', randonnées:'excursionismo/senderismo', marin:'marino', variées:'variadas', facilement:'fácilmente', gîtes:'alojamientos rurales', agent:'agente', accordent:'están de acuerdo', amusantes:'divertidas', partir:'irse', meilleure:'mejor (irregular)' },
    preQ: [
      { q:'¿Prefieres las vacaciones en el campo o en la playa?', opts:['Campo y montaña', 'Playa y mar', 'Las dos me gustan igual'], a:-1 },
      { q:'¿Qué crees que significa "ils ne sont pas du tout d\'accord"?', opts:['Están completamente de acuerdo', 'No están de acuerdo en absoluto', 'Están más o menos de acuerdo'], a:-1 },
    ],
    mcq: [
      { q:'¿Qué dice Sofia sobre el campo?', opts:['Es más caro que la playa','Es más tranquilo que el mar','Es menos interesante que la montaña','Es menos caro pero más aburrido'], a:1, fb:'"La campagne est plus calme que la mer" — comparatif de supériorité (más tranquilo que).' },
      { q:'¿Por qué prefiere Julie la playa?', opts:['Es más barata','El tiempo es más cálido y las actividades más variadas','Le gustan los gîtes','Los gîtes son mejores que los hoteles'], a:1, fb:'"Le temps est plus chaud, les activités sont plus variées" — Julie da dos argumentos comparativos.' },
      { q:'¿Qué es menos caro según el texto?', opts:['Los hoteles en la playa','Los gîtes en el campo','Los vuelos','Los restaurantes en la playa'], a:1, fb:'"Les gîtes à la campagne sont moins chers que les hôtels au bord de la mer" — comparatif d\'infériorité.' },
      { q:'¿Qué van a hacer mañana las dos amigas?', opts:['Reservar el hotel','Volver a casa','Ver a su agente de viajes','Comparar precios en internet'], a:2, fb:'"Elles vont rencontrer leur agent de voyage demain" — futur proche (aller + infinitif).' },
      { q:'¿Cuál es el único punto en que están de acuerdo?', opts:['Prefieren el campo','Prefieren la playa','Las vacaciones juntas serán más divertidas','Los precios del campo son mejores'], a:2, fb:'"Les deux amies s\'accordent sur le fait que les vacances ensemble vont être plus amusantes que partir seules."' },
      { q:'¿Cuál es la forma correcta del superlatif irrégulier de "bon" ?', opts:['le plus bon','le meilleur','le mieux','le plus bien'], a:1, fb:'"La mer est bien meilleure" — "bon" → "meilleur" (comparatif) → "le meilleur" (superlatif). Jamais "plus bon".' },
    ],
    openQ: 'Según el texto, ¿qué argumento de Sofia o Julie te parece más convincente y por qué?',
    prodPrompt: 'Comparez deux destinations de vacances avec des comparatifs. Utilisez : "La montagne est plus ___ que la plage. Cependant, la plage est moins ___ que la montagne. Je vais choisir ___ parce que..."',
  },
  {
    id: 4, title: "Conseils pour apprendre le français", topic: "Apprentissage des langues", grammar: "Imparfait + devoir/pouvoir",
    text: "Dans une interview, Julie Martel, professeure de français depuis vingt ans, a partagé ses conseils. Quand elle était étudiante, elle devait lire au moins un livre en français par mois. Elle ne pouvait pas regarder des films en version originale au début parce qu'elle ne comprenait pas assez vite. Mais avec le temps, elle a commencé à les comprendre. Elle recommande d'écouter la radio française tous les jours. 'Quand j'avais votre âge, je répétais les dialogues devant le miroir', dit-elle en souriant. 'Maintenant vous pouvez regarder des séries avec des sous-titres — c'est beaucoup plus facile qu'avant !' Elle pense que les erreurs sont nécessaires et que vous devez parler sans avoir peur.",
    vocab: { conseils:'consejos', devait:'debía', pouvait:'podía', comprenait:'entendía', recommande:'recomienda', répétait:'repetía', souriant:'sonriendo', sous_titres:'subtítulos', nécessaires:'necesarios', parler:'hablar', peur:'miedo', version_originale:'versión original', commencé:'empezó', partagé:'compartió' },
    preQ: [
      { q:'¿Qué método usas para aprender francés?', opts:['Videos y podcasts', 'Libros y gramática', 'Conversación con nativos'], a:-1 },
      { q:'¿Qué crees que significa "elle devait lire" ?', opts:['Ella leía a veces', 'Ella debía leer / tenía que leer', 'Ella iba a leer'], a:-1 },
    ],
    mcq: [
      { q:'¿Qué debía hacer Julie cuando era estudiante?', opts:['Ver películas en versión original','Leer al menos un libro en francés por mes','Escuchar la radio todos los días','Repetir diálogos en el espejo'], a:1, fb:'"Elle devait lire au moins un livre en français par mois" — imparfait de "devoir" = obligation passée.' },
      { q:'¿Por qué no podía ver películas en versión original al principio?', opts:['No tenía tiempo','No le gustaban las películas','No comprendía suficientemente rápido','Eran muy caras'], a:2, fb:'"Elle ne pouvait pas... parce qu\'elle ne comprenait pas assez vite" — imparfait pour une incapacité passée.' },
      { q:'¿Qué recomienda Julie para practicar?', opts:['Leer periódicos','Escuchar la radio francesa todos los días','Estudiar gramática','Ir a Francia'], a:1, fb:'"Elle recommande d\'écouter la radio française tous les jours" — conseil au présent.' },
      { q:'¿Qué hacía Julie cuando tenía la edad de sus alumnos?', opts:['Veía series con subtítulos','Repetía los diálogos delante del espejo','Leía periódicos','Escuchaba la radio'], a:1, fb:'"Je répétais les dialogues devant le miroir" — imparfait pour une habitude passée.' },
      { q:'¿Qué tiempo verbal es "devait" y "pouvait"?', opts:['Passé composé','Futur proche','Imparfait','Présent'], a:2, fb:'"Devait" et "pouvait" sont à l\'imparfait — ils expriment des situations habituelles ou des états dans le passé.' },
      { q:'¿Qué dice Julie sobre los errores?', opts:['Hay que evitarlos a toda costa','Son necesarios y hay que hablar sin tener miedo','Solo los principiantes cometen errores','Se deben corregir siempre'], a:1, fb:'"Les erreurs sont nécessaires et que vous devez parler sans avoir peur" — Julie encourage à prendre des risques.' },
    ],
    openQ: 'Selon Julie Martel, quelle est la différence entre apprendre le français "avant" et "maintenant" ?',
    prodPrompt: 'Écrivez 3 habitudes que vous aviez quand vous avez commencé à apprendre le français. Utilisez l\'imparfait : "Quand j\'ai commencé, je devais ___ / je ne pouvais pas ___ / je répétais ___..."',
  },
  {
    id: 5, title: "Un message de l'étranger", topic: 'Communication interculturelle', grammar: 'Passé composé + présent + futur proche',
    text: "Chère maman, je suis arrivée à Montréal il y a trois jours et tout se passe bien. Le voyage a été long mais confortable. La ville est plus grande et plus cosmopolite que je ne l'imaginais. Je loge chez une famille très sympa dans le quartier du Plateau. Hier, j'ai visité le Vieux-Montréal et j'ai goûté la poutine pour la première fois — c'est délicieux ! Ce matin, j'ai rencontré mes nouveaux collègues au bureau. Ils sont très accueillants. La semaine prochaine, je vais commencer mes cours de français québécois parce que l'accent est vraiment différent ! Je t'enverrai des photos demain. Tu me manques beaucoup. Bisous, Chloé",
    vocab: { arrivée:'llegué', cosmopolite:'cosmopolita', imaginais:'imaginaba', loge:'me alojo', sympa:'simpática', quartier:'barrio', goûté:'probé', poutine:'poutine (plato típico québécois)', accueillants:'acogedores', québécois:'québécois', manques:'extraño', bisous:'besos', enverrai:'enviaré', commencer:'empezar' },
    preQ: [
      { q:'¿Has vivido en otro país o ciudad extranjera alguna vez?', opts:['Sí, viví en el extranjero', 'Solo de vacaciones', 'No, pero quiero vivir en el extranjero'], a:-1 },
      { q:'¿Qué crees que significa "tu me manques" en francés?', opts:['Tú me fallas', 'Te extraño / Me haces falta', 'No te entiendo'], a:-1 },
    ],
    mcq: [
      { q:'¿Cuándo llegó Chloé a Montréal?', opts:['Ayer','Hace tres días','Hace una semana','La semana pasada'], a:1, fb:'"Je suis arrivée à Montréal il y a trois jours" — "il y a + tiempo" expresa cuándo ocurrió algo en el pasado.' },
      { q:'¿Cómo describe Chloé a Montréal comparado con sus expectativas?', opts:['Más pequeña de lo que imaginaba','Igual que imaginaba','Más grande y cosmopolita de lo que imaginaba','Menos interesante de lo esperado'], a:2, fb:'"La ville est plus grande et plus cosmopolite que je ne l\'imaginais" — comparatif de supériorité.' },
      { q:'¿Dónde vive Chloé en Montréal?', opts:['En un hotel','En un apartamento sola','Con una familia en el barrio del Plateau','En una residencia universitaria'], a:2, fb:'"Je loge chez une famille très sympa dans le quartier du Plateau."' },
      { q:'¿Qué probó Chloé por primera vez?', opts:['El maple syrup','La poutine','El bagel de Montréal','El smoked meat'], a:1, fb:'"J\'ai goûté la poutine pour la première fois" — plato típico québécois de papas fritas, queso y salsa.' },
      { q:'¿Qué va a hacer Chloé la semana próxima?', opts:['Volver a casa','Visitar Quebec City','Empezar cursos de francés québécois','Conocer más colegas'], a:2, fb:'"La semaine prochaine, je vais commencer mes cours de français québécois" — futur proche (aller + infinitif).' },
      { q:'En el texto, ¿cuántos tiempos verbales diferentes usa Chloé?', opts:['Solo el presente','Presente y passé composé','Présent, passé composé y futur proche (et futur simple)','Solo el passé composé'], a:3, fb:'Chloé usa: présent ("je loge", "c\'est"), passé composé ("j\'ai visité"), futur proche ("je vais commencer") y futur simple ("j\'enverrai"). ¡Texto rico en tiempos!' },
    ],
    openQ: "Imagina que eres Chloé. ¿Qué le responderías a tu mamá sobre el primer día de clases de français québécois?",
    prodPrompt: "Écrivez un court message à un ami ou à votre famille en utilisant les trois temps. Exemple : \"Hier, j'ai visité ___. Aujourd'hui, je ___ [présent]. La semaine prochaine, je vais ___.\""
  },
];

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t),
    clean: t.replace(/[^a-zA-ZÀ-ÿ_]/g, '').toLowerCase(),
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

  const STEPS = ['Antes de leer', 'Leer', 'Preguntas', 'Resultado'];

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:0, fontFamily:'var(--mono)', fontSize:'0.82rem' }}>📖 Lecture A2</button>
        <span>/</span>
        <span style={{ color:COLOR, fontWeight:800 }}>Texte {t.id}</span>
      </div>

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

      {phase === 'pre' && (
        <div>
          <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}25`, marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Thème · {t.topic} · {t.grammar}</div>
            <h2 style={{ margin:'0 0 0.25rem', fontWeight:700, fontSize:'1.4rem', color:'var(--ink)' }}>{t.title}</h2>
          </div>
          <div style={{ padding:'1rem 1.2rem', borderRadius:12, background:'var(--bg-2)', border:'1px solid var(--line-soft)', marginBottom:'1rem' }}>
            <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.6rem' }}>Antes de leer — reflexiona</div>
            {t.preQ.map((q, i) => (
              <div key={i} style={{ marginBottom:'0.75rem' }}>
                <p style={{ margin:'0 0 0.3rem', fontSize:'0.9rem', fontWeight:600, color:'var(--ink)' }}>{i+1}. {q.q}</p>
                <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
                  {q.opts.map((opt, oi) => (
                    <button key={oi} style={{ fontSize:'0.8rem', padding:'0.35rem 0.8rem', borderRadius:8, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--muted)', cursor:'default', fontFamily:'inherit' }}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background:COLOR, borderColor:COLOR }}>Leer el texto →</button>
        </div>
      )}

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

            <div style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:'1.5px solid var(--line-soft)', background:'var(--bg)' }}>
              <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Question ouverte</div>
              <p style={{ margin:'0 0 0.6rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{t.openQ}</p>
              <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={2} placeholder="Écris ta réponse..."
                style={{ width:'100%', padding:'0.6rem 0.8rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
            </div>

            <div style={{ padding:'1.1rem 1.25rem', borderRadius:14, border:`1.5px solid ${COLOR}22`, background:`${COLOR}04` }}>
              <div style={{ fontSize:'0.62rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Mini-production</div>
              <p style={{ margin:'0 0 0.6rem', fontWeight:600, color:'var(--ink)', fontSize:'0.95rem' }}>{t.prodPrompt}</p>
              <textarea value={prod} onChange={e => setProd(e.target.value)} rows={3} placeholder="Écris en français..."
                style={{ width:'100%', padding:'0.6rem 0.8rem', borderRadius:9, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', boxSizing:'border-box', resize:'none' }} />
            </div>

            {allMcqDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background:COLOR, borderColor:COLOR }}>Ver resultado →</button>}
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ padding:'1.75rem', borderRadius:18, border:'1.5px solid var(--line-soft)', background:'var(--bg)', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score===t.mcq.length?'🎉':score>=4?'⭐':'📚'}</div>
          <h2 style={{ margin:'0 0 0.25rem', fontWeight:800, color:'var(--ink)', fontSize:'1.5rem' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.88rem', margin:'0 0 1.25rem' }}>{score===t.mcq.length?'¡Parfait! Comprensión perfecta.':score>=4?'Très bien — casi perfecto.':'Relee el texto y vuelve a intentarlo.'}</p>
          <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setAnswers({}); setRevealed({}); setOpenAns(''); setProd(''); setPreAnswers(['','']); }} style={{ background:COLOR, borderColor:COLOR }}>Intentar de nuevo</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Otros textos</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaFrancesA2() {
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
          <Link href="/practica/frances/a2" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A2</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📖 Lecture</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Lecture · Français A2</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Compréhension écrite A2</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:540, margin:'0 0 2rem' }}>5 textes A2 avec vocabulaire interactif et 6 questions de compréhension par texte.</p>
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
                  <p style={{ margin:0, fontSize:'0.78rem', color:'var(--muted)' }}>{t.topic} · {t.grammar} · {t.mcq.length} preguntas</p>
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
