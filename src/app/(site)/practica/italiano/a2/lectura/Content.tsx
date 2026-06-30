'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#009246';

interface ReadingText {
  id: number;
  title: string;
  topic: string;
  words: number;
  grammar: string;
  text: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[];
  openQ: string;
  production: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Il weekend a Firenze', topic: 'Viajes', words: 98, grammar: 'Passato prossimo',
    text: "Il mese scorso, Anna e i suoi amici hanno deciso di visitare Firenze per un weekend. Sono partiti venerdì sera e sono arrivati in treno. Il sabato mattina hanno visitato gli Uffizi e hanno visto opere d'arte meravigliose. Nel pomeriggio hanno attraversato il Ponte Vecchio e hanno assaggiato il gelato più buono della città. La domenica hanno salito sul campanile di Giotto e hanno ammirato un panorama incredibile. Hanno anche comprato qualche souvenir nel mercato di San Lorenzo. È stato un weekend indimenticabile.",
    vocab: { deciso: 'decidieron', partiti: 'partieron', arrivati: 'llegaron', visitato: 'visitaron', visto: 'vieron', meravigliose: 'maravillosas', attraversato: 'cruzaron', assaggiato: 'probaron', saliti: 'subieron', ammirato: 'admiraron', panorama: 'panorama', indimenticabile: 'inolvidable', souvenir: 'recuerdos' },
    preQ: [
      { q: '¿Has visitado alguna ciudad italiana?', opts: ['Sí, Florencia', 'Sí, Roma u otra', 'No, pero me gustaría'], a: -1 },
      { q: '¿Qué tipo de turismo prefieres?', opts: ['Arte y museos', 'Gastronomía', 'Naturaleza y paisaje'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "indimenticabile"?', cat: 'Vocabulario', opts: ['inolvidable', 'cansado', 'increíble', 'bonito'], a: 0, fb: '"Indimenticabile" = inolvidable. Prefijo in- (negación) + dimenticare (olvidar) + -bile (sufijo adjetival).' },
      { q: '¿Cuándo partieron para Florencia?', cat: 'Comprensión', opts: ['El jueves por la mañana', 'El viernes por la tarde', 'El sábado por la tarde', 'El domingo'], a: 1, fb: '"Sono partiti venerdì sera" — partieron el viernes por la tarde.' },
      { q: '¿Cómo viajaron a Florencia?', cat: 'Comprensión', opts: ['En avión', 'En autobús', 'En tren', 'En coche'], a: 2, fb: '"Sono arrivati in treno" — llegaron en tren.' },
      { q: '¿Qué visitaron el sábado por la mañana?', cat: 'Comprensión', opts: ['El Ponte Vecchio', 'El mercado de San Lorenzo', 'Los Uffizi', 'El campanile de Giotto'], a: 2, fb: '"Il sabato mattina hanno visitato gli Uffizi" — visitaron los Uffizi el sábado por la mañana.' },
      { q: '¿Qué hicieron el domingo?', cat: 'Comprensión', opts: ['Comieron gelato', 'Visitaron los Uffizi', 'Subieron al campanile de Giotto', 'Cruzaron el Ponte Vecchio'], a: 2, fb: '"La domenica hanno salito sul campanile di Giotto" — subieron al campanile el domingo.' },
      { q: '"Hanno visitato gli Uffizi" — ¿qué tiempo verbal es?', cat: 'Gramática', opts: ['Presente indicativo', 'Passato prossimo con avere', 'Imperfetto', 'Futuro semplice'], a: 1, fb: '"Hanno visitato" = passato prossimo. Visitare es un verbo transitivo → usa AVERE. Participio: visitato.' },
    ],
    openQ: 'Describe un viaje que hiciste en el pasado en 3-4 oraciones. Usa el passato prossimo.',
    production: 'Usa: "Il mese scorso, sono andato/a a ___ con ___. Ho visitato ___ e ___. È stato ___."',
  },
  {
    id: 2, title: 'Nuovo lavoro, nuova vita', topic: 'Trabajo', words: 95, grammar: 'Passato prossimo + imperfetto',
    text: "Paolo lavorava in un piccolo ufficio da cinque anni. Il lavoro era monotono e lo stipendio era basso. Un giorno ha deciso di cambiare. Ha mandato il suo curriculum a molte aziende e ha ottenuto un colloquio in una grande società. Il colloquio è andato molto bene. Il direttore era simpatico e le mansioni sembravano interessanti. Due settimane dopo, Paolo ha ricevuto la risposta: era stato selezionato! Il nuovo lavoro paga meglio e i colleghi sono entusiasti. Paolo si è dimesso dal vecchio lavoro e ha iniziato la sua nuova avventura professionale.",
    vocab: { lavorava: 'trabajaba', monotono: 'monótono', stipendio: 'salario', curriculum: 'hoja de vida', colloquio: 'entrevista', società: 'empresa', mansioni: 'tareas/funciones', selezionato: 'seleccionado', dimesso: 'renunció', entusiasti: 'entusiastas', avventura: 'aventura', ottenuto: 'obtuvo' },
    preQ: [
      { q: '¿Has cambiado de trabajo alguna vez?', opts: ['Sí, varias veces', 'Sí, una vez', 'Todavía no'], a: -1 },
      { q: '¿Qué es más importante para ti en un trabajo?', opts: ['El salario', 'El ambiente', 'El aprendizaje'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "colloquio"?', cat: 'Vocabulario', opts: ['entrevista de trabajo', 'reunión de equipo', 'contrato', 'currículum'], a: 0, fb: '"Colloquio" = entrevista (de trabajo). También puede significar conversación o charla en contexto más general.' },
      { q: '¿Cuánto tiempo llevaba Paolo en su trabajo anterior?', cat: 'Comprensión', opts: ['Dos años', 'Tres años', 'Cinco años', 'Un año'], a: 2, fb: '"Paolo lavorava in un piccolo ufficio da cinque anni" — llevaba cinco años trabajando allí.' },
      { q: '¿Por qué decidió cambiar de trabajo?', cat: 'Comprensión', opts: ['Por problemas con el jefe', 'El trabajo era monótono y el salario era bajo', 'La empresa cerró', 'Quería trabajar en otra ciudad'], a: 1, fb: '"Il lavoro era monotono e lo stipendio era basso" — trabajo monótono y salario bajo.' },
      { q: '¿Cómo fue la entrevista?', cat: 'Comprensión', opts: ['Muy difícil', 'Regular', 'Muy bien', 'Un desastre'], a: 2, fb: '"Il colloquio è andato molto bene" — la entrevista fue muy bien.' },
      { q: '"Lavorava in un piccolo ufficio" — ¿qué expresa el imperfetto aquí?', cat: 'Gramática', opts: ['Un evento puntual en el pasado', 'Una situación continua y habitual en el pasado', 'Un plan futuro', 'Una orden'], a: 1, fb: '"Lavorava" (imperfetto) = situación continua habitual en el pasado. Contrasta con "ha deciso" (passato prossimo = evento puntual).' },
      { q: '¿Qué significa "si è dimesso"?', cat: 'Vocabulario', opts: ['se contrató', 'renunció / se dimitió', 'se fue de viaje', 'se enfermó'], a: 1, fb: '"Dimettersi" = renunciar/dimitir. Verbo reflexivo → usa essere: "si è dimesso". Un verbo clave del vocabulario laboral.' },
    ],
    openQ: 'Cuenta una experiencia laboral o académica pasada en 3-4 oraciones. Combina imperfetto y passato prossimo.',
    production: 'Usa: "Prima lavoravo / studiavo ___. Il lavoro / studio era ___. Un giorno ho deciso di ___."',
  },
  {
    id: 3, title: 'La città di ieri e oggi', topic: 'Ciudad', words: 102, grammar: 'Imperfetto vs presente',
    text: "Il quartiere dove abito ora è molto cambiato negli ultimi vent'anni. Prima c'era un vecchio mercato dove i nonni compravano verdura fresca ogni mattina. Le strade erano tranquille e i bambini giocavano fuori fino a tardi. Poi hanno demolito molti edifici vecchi e hanno costruito appartamenti moderni e grattacieli. Oggi il quartiere è più vivace ma anche più caotico. I vecchi negozi artigianali hanno chiuso e ci sono ora catene commerciali internazionali. La gente è sempre di fretta. A volte mi manca la semplicità di prima, ma il quartiere offre anche tante opportunità nuove.",
    vocab: { quartiere: 'barrio', cambiato: 'cambiado', demolito: 'demolieron', costruito: 'construyeron', grattacieli: 'rascacielos', vivace: 'animado', caotico: 'caótico', artigianali: 'artesanales', catene: 'cadenas (comerciales)', fretta: 'prisa', semplicità: 'sencillez', opportunità: 'oportunidades' },
    preQ: [
      { q: '¿Tu barrio o ciudad ha cambiado mucho en los últimos años?', opts: ['Sí, muchísimo', 'Un poco', 'Casi nada'], a: -1 },
      { q: '¿Prefieres los barrios tradicionales o los modernos?', opts: ['Tradicionales', 'Modernos', 'Un mix de ambos'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "grattacieli"?', cat: 'Vocabulario', opts: ['edificios históricos', 'rascacielos', 'apartamentos pequeños', 'parques'], a: 1, fb: '"Grattacieli" = rascacielos. Literalmente "rasca-cielos". Singular: grattacielo.' },
      { q: '¿Qué había antes en el barrio?', cat: 'Comprensión', opts: ['Grandes centros comerciales', 'Un viejo mercado donde los abuelos compraban verduras', 'Una fábrica', 'Un parque enorme'], a: 1, fb: '"Prima c\'era un vecchio mercato dove i nonni compravano verdura fresca ogni mattina."' },
      { q: '¿Qué pasó con los edificios viejos?', cat: 'Comprensión', opts: ['Los renovaron', 'Los convirtieron en museos', 'Los demolieron y construyeron modernos', 'Nada cambió'], a: 2, fb: '"Hanno demolito molti edifici vecchi e hanno costruito appartamenti moderni e grattacieli."' },
      { q: '¿Qué siente el narrador sobre el cambio?', cat: 'Comprensión', opts: ['Solo tristeza', 'Solo alegría', 'Nostalgia por el pasado pero también ve las oportunidades nuevas', 'No le importa'], a: 2, fb: '"Mi manca la semplicità di prima, ma il quartiere offre anche tante opportunità nuove" — sentimiento mixto.' },
      { q: '"I bambini giocavano fuori fino a tardi" — ¿qué expresa el imperfetto?', cat: 'Gramática', opts: ['Un evento único en el pasado', 'Una acción habitual y repetida en el pasado', 'Una acción futura', 'Una descripción del presente'], a: 1, fb: '"Giocavano" (imperfetto) = hábito pasado repetido. Los niños lo hacían regularmente antes.' },
      { q: '¿Qué significa "mi manca"?', cat: 'Vocabulario', opts: ['me falta / echo de menos', 'me enoja', 'me alegra', 'me cansa'], a: 0, fb: '"Mancare" = faltar / echar de menos. "Mi manca la semplicità" = echo de menos la sencillez. Es un uso especial de "mancare".' },
    ],
    openQ: 'Describe cómo era tu ciudad o barrio antes y cómo es ahora. Usa imperfetto para el pasado y presente para ahora.',
    production: 'Usa: "Prima il mio quartiere / la mia città era ___. C\'era ___. Adesso è ___ e ci sono ___."',
  },
  {
    id: 4, title: 'Messaggi tra amici', topic: 'Amistades', words: 108, grammar: 'Futuro semplice',
    text: "Luca: Ciao Sara! Hai saputo che Laura compie gli anni sabato? Dobbiamo organizzare una festa a sorpresa! — Sara: Che bella idea! Quando ci vedremo per pianificare tutto? — Luca: Domani pomeriggio andrò a casa tua, se sei libera. Porterò le decorazioni. — Sara: Perfetto! Io preparerò il cibo e ordinerò la torta. Quante persone inviteremo? — Luca: Inviterò Marco, Giulia e i suoi colleghi, saranno circa venti persone. — Sara: Dove faremo la festa? Il mio appartamento sarà troppo piccolo. — Luca: Useremo il giardino di Marco, lui ha già detto di sì. Sarà bellissimo! — Sara: Non vedo l'ora! Sarà la festa dell'anno!",
    vocab: { compie: 'cumple (años)', organizzare: 'organizar', sorpresa: 'sorpresa', pianificare: 'planificar', decorazioni: 'decoraciones', ordinerò: 'pediré/encargaré', inviteremo: 'invitaremos', useremo: 'usaremos', giardino: 'jardín', bellissimo: 'hermosísimo', vedo: 'veo', non_vedo_lora: 'no puedo esperar/estoy ansioso' },
    preQ: [
      { q: '¿Te gustan las fiestas sorpresa?', opts: ['Sí, me encantan', 'Depende', 'No mucho'], a: -1 },
      { q: '¿Cuándo fue la última vez que organizaste algo especial?', opts: ['Hace poco', 'Hace meses', 'Hace mucho tiempo'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "compie gli anni"?', cat: 'Vocabulario', opts: ['cumple años', 'termina el año', 'trabaja todo el año', 'comienza un nuevo año'], a: 0, fb: '"Compiere gli anni" = cumplir años. Expresión fija en italiano. "Laura compie gli anni sabato" = Laura cumple años el sábado.' },
      { q: '¿Por qué se quieren organizar?', cat: 'Comprensión', opts: ['Para celebrar el trabajo de Laura', 'Para una fiesta sorpresa de cumpleaños de Laura', 'Para planear un viaje juntos', 'Para ver a un amigo que vuelve'], a: 1, fb: '"Laura compie gli anni sabato? Dobbiamo organizzare una festa a sorpresa!" — fiesta sorpresa de cumpleaños.' },
      { q: '¿Qué llevará Luca mañana?', cat: 'Comprensión', opts: ['La torta', 'La comida', 'Las decoraciones', 'Las invitaciones'], a: 2, fb: '"Porterò le decorazioni" — Luca llevará las decoraciones. Futuro de portare (portare → porterò).' },
      { q: '¿Dónde harán la fiesta?', cat: 'Comprensión', opts: ['En casa de Sara', 'En casa de Laura', 'En un restaurante', 'En el jardín de Marco'], a: 3, fb: '"Useremo il giardino di Marco" — usarán el jardín de Marco.' },
      { q: '"Andrò a casa tua domani" — ¿qué tiempo verbal es?', cat: 'Gramática', opts: ['Presente indicativo', 'Passato prossimo', 'Futuro semplice', 'Imperfetto'], a: 2, fb: '"Andrò" = futuro semplice irregular de andare (andare → andrò). Indica un plan para el futuro.' },
      { q: '¿Qué significa "non vedo l\'ora"?', cat: 'Vocabulario', opts: ['no puedo esperar / estoy muy emocionada', 'no veo la hora en el reloj', 'no tengo tiempo', 'no tengo ganas'], a: 0, fb: '"Non vedere l\'ora" = no poder esperar / estar muy emocionado/a por algo. Expresión idiomática muy común.' },
    ],
    openQ: 'Planea un evento con un amigo en italiano usando el futuro semplice. Min. 4 oraciones.',
    production: 'Usa: "Sabato organizzeremo ___. Io porterò ___ e tu preparerai ___. Inviteremo ___. Sarà ___!"',
  },
  {
    id: 5, title: 'Intervista a uno chef', topic: 'Gastronomía', words: 105, grammar: 'Pronomi diretti',
    text: "Giornalista: Chef Ricci, come ha imparato a cucinare? — Chef: L'ho imparata da mia nonna. Mi ha insegnato le ricette tradizionali quando ero piccolo e le ho sempre amate. — Giornalista: Qual è il suo piatto preferito? — Chef: Il risotto ai funghi. Lo preparo ogni settimana. Gli ingredienti devono essere freschissimi. — Giornalista: Ha qualche segreto per cucinare bene? — Chef: Sì, uso sempre prodotti locali. Li compro direttamente dai contadini. Il sapore è incomparabile. — Giornalista: Il suo ristorante è molto famoso. Come lo descrive? — Chef: Lo descrivo come un posto dove la tradizione incontra la creatività. I clienti tornano sempre — li conosco quasi tutti di nome.",
    vocab: { imparata: 'aprendida', nonna: 'abuela', insegnato: 'enseñado', ricette: 'recetas', risotto: 'risotto (arroz cremoso)', funghi: 'champiñones/hongos', freschissimi: 'fresquísimos', prodotti: 'productos', contadini: 'campesinos/agricultores', sapore: 'sabor', incomparabile: 'incomparable', tradizione: 'tradición', creatività: 'creatividad', clienti: 'clientes' },
    preQ: [
      { q: '¿Te interesa la gastronomía italiana?', opts: ['Sí, mucho', 'Un poco', 'Prefiero otras cocinas'], a: -1 },
      { q: '¿Cuál es tu plato italiano favorito?', opts: ['Pizza', 'Pasta', 'Risotto / otro'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "ricette"?', cat: 'Vocabulario', opts: ['recetas', 'recibos', 'ingredientes', 'platos'], a: 0, fb: '"Ricette" = recetas. Singular: ricetta. No confundir con "ricevute" (recibos) o "ricetta medica" (receta médica).' },
      { q: '¿Dónde aprendió a cocinar el chef?', cat: 'Comprensión', opts: ['En una escuela de cocina', 'En un restaurante famoso', 'De su abuela', 'De su madre'], a: 2, fb: '"L\'ho imparata da mia nonna" — la (el arte de cocinar) aprendí de mi abuela.' },
      { q: '¿Cuál es el plato favorito del chef?', cat: 'Comprensión', opts: ['La pizza napolitana', 'El risotto ai funghi', 'La pasta al pesto', 'El tiramisù'], a: 1, fb: '"Qual è il suo piatto preferito? Il risotto ai funghi" — su plato favorito es el risotto con champiñones.' },
      { q: '¿Dónde compra los productos el chef?', cat: 'Comprensión', opts: ['En el supermercado', 'En el mercado del barrio', 'Directamente de los agricultores', 'Los importa de Francia'], a: 2, fb: '"Li compro direttamente dai contadini" — los compra directamente de los agricultores.' },
      { q: '"Lo preparo ogni settimana" — ¿a qué se refiere "lo"?', cat: 'Gramática', opts: ['Al chef (masculino)', 'Al risotto (masculino, pronombre directo)', 'A la cocina (femenina)', 'Al ingrediente'], a: 1, fb: '"Lo" = pronombre directo masculino singular, se refiere al risotto. "Lo preparo" = lo (= il risotto) preparo.' },
      { q: '"L\'ho imparata da mia nonna" — ¿por qué el participio es "imparata" y no "imparato"?', cat: 'Gramática', opts: ["Porque con i pronomi diretti il participio si accorda (la → -a)", "Porque imparare è irregolare", "Porque usa essere, non avere", "No hay razón especial"], a: 0, fb: "Con passato prossimo + pronome diretto (la → l'), il participio si accorda col pronome: la = femminile → imparata." },
    ],
    openQ: 'Describe un plato que te gusta preparar o comer. Usa pronomi diretti donde sea posible. Min. 3 oraciones.',
    production: 'Usa: "Il mio piatto preferito è ___. Lo preparo con ___. Gli ingredienti li compro ___. Il sapore è ___."',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+|[.,!?'"\-:]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'"\-:]+$/.test(t),
    clean: t.replace(/[^a-zA-ZàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚ]/g, '').toLowerCase(),
  }));
}

function MCQItem({ q, qi, answers, onAnswer }: {
  q: ReadingText['mcq'][0]; qi: number;
  answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void;
}) {
  const ans = answers[qi];
  const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        {q.cat} · Domanda {qi + 1}
      </div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
          if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenize(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleWord(clean: string, idx: number) {
    if (!clean) return;
    setActiveWord(t.vocab[clean] ?? null);
    setActiveIdx(idx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Tutti i testi</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Testo {t.id} / 5 — {t.title}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 {t.words} parole · {t.grammar}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lettura', 'Lettura', 'Domande', 'Risultato'];
          const current = phase === p;
          const past = (['pre', 'read', 'questions', 'done'] as const).indexOf(p) < (['pre', 'read', 'questions', 'done'] as const).indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Prima di leggere — attiva le tue conoscenze</p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Pensa un momento prima di leggere. Non ci sono risposte giuste o sbagliate — solo attiva la mente sul tema: <strong style={{ color: 'var(--ink)' }}>{t.topic}</strong>.
          </p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.84rem' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setPhase('read')}>
            Pronto — vai al testo →
          </button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />{t.title} — tocca una parola per vedere la traduzione
          </p>
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => handleWord(tk.clean, i)} style={{
                    background: isActive ? 'rgba(0,146,70,0.12)' : hasTrans ? 'rgba(0,146,70,0.06)' : 'transparent',
                    border: isActive ? `1.5px solid ${COLOR}` : hasTrans ? `1px dashed rgba(0,146,70,0.3)` : 'none',
                    borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                    fontSize: 'inherit', fontFamily: 'inherit',
                    color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                  }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: activeWord ? '#1a4a2a' : '#6f7691', color: '#fff', borderRadius: 8,
                      padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap',
                      zIndex: 10, boxShadow: '0 4px 16px rgba(0,80,30,0.25)', marginTop: 4,
                    }}>
                      {activeWord ?? '(parola funzionale)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              Ho letto → Rispondere alle domande
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Nascondere tooltip
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: 'auto' }} onClick={() => setPhase('pre')}>
              ← Tornare alla pre-lettura
            </button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Tornare al testo</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Produzione libera</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4}
              placeholder="Scrivi qui la tua risposta in italiano..."
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && (
            <button className="btn btn-sm" onClick={() => setPhase('done')}>Vedere il risultato →</button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} corrette</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? 'Perfetto! Hai capito tutto il testo.' : score >= 4 ? 'Molto bene. Ripassa le domande sbagliate.' : 'Ritorna al testo e cerca le risposte — il contesto aiuta.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>LA TUA PRODUZIONE LIBERA</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Riprovare</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Scegliere un altro testo</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LetturaItalianoA2() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Lettura · Italiano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lettura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 testi progressivi (80-120 parole). Ogni testo ha pre-lettura, vocabolario interattivo, 6 domande adattive e produzione libera.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
                border: `1.5px solid ${COLOR}22`, borderRadius: 16,
                background: `linear-gradient(135deg, rgba(0,146,70,0.04) 0%, transparent 100%)`,
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(0,146,70,0.12)`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {t.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {t.words} parole · Grammatica: {t.grammar} · {t.mcq.length} domande + produzione libera
                  </p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,146,70,0.06)', border: '1px solid rgba(0,146,70,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Come usarlo:</strong> Leggi il testo toccando le parole evidenziate per vedere la traduzione. Poi rispondi alle 6 domande di vocabolario, comprensione e grammatica. Alla fine, scrivi la tua produzione libera.
        </div>
      </div>
    </section>
  );
}
