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
    id: 1, title: 'Il lavoro a distanza in Italia', topic: 'Attualità', words: 135, grammar: 'Congiuntivo + Condizionale',
    text: "Negli ultimi anni, il lavoro a distanza, o smart working, è diventato sempre più comune in Italia. Sebbene molte aziende fossero inizialmente scettiche, la pandemia ha dimostrato che i dipendenti possono essere produttivi anche da casa. Oggi, molti lavoratori preferiscono che le aziende offrano questa flessibilità. Tuttavia, ci sono anche aspetti negativi: alcuni temono che l'isolamento possa danneggiare i rapporti professionali. Un manager ha dichiarato che, se potesse scegliere, manterrebbe un modello ibrido. Secondo le ultime statistiche, il 40% dei lavoratori italiani ritiene che lavorare da remoto aumenti la qualità della vita. È importante che le aziende trovino un equilibrio tra flessibilità e collaborazione.",
    vocab: { scettiche: 'escépticas', pandemia: 'pandemia', dipendenti: 'empleados', produttivi: 'productivos', flessibilità: 'flexibilidad', isolamento: 'aislamiento', danneggiare: 'perjudicar', rapporti: 'relaciones', ibrido: 'híbrido', equilibrio: 'equilibrio', collaborazione: 'colaboración', remoto: 'remoto' },
    preQ: [
      { q: '¿Trabajas o estudias desde casa alguna vez?', opts: ['Sí, siempre', 'A veces', 'No, nunca'], a: -1 },
      { q: '¿Cuál es tu opinión sobre el trabajo remoto?', opts: ['Es muy positivo', 'Tiene ventajas y desventajas', 'Prefiero la oficina'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "scettiche"?', cat: 'Vocabulario', opts: ['escépticas', 'entusiastas', 'preocupadas', 'interesadas'], a: 0, fb: '"Scettiche" = escépticas (femenino plural). Se refiere a las empresas que no confiaban en el trabajo remoto al principio.' },
      { q: '¿Qué demostró la pandemia según el texto?', cat: 'Comprensión', opts: ['Que el trabajo remoto es imposible', 'Que los empleados pueden ser productivos desde casa', 'Que las empresas son más eficientes en la oficina', 'Que el trabajo híbrido es perjudicial'], a: 1, fb: '"la pandemia ha dimostrato che i dipendenti possono essere produttivi anche da casa"' },
      { q: '¿Cuál es uno de los aspectos negativos del trabajo remoto mencionado?', cat: 'Comprensión', opts: ['El coste de Internet', 'El aislamiento puede dañar las relaciones profesionales', 'La falta de tecnología', 'El aumento de los gastos de viaje'], a: 1, fb: '"alcuni temono che l\'isolamento possa danneggiare i rapporti professionali"' },
      { q: '¿Qué preferiría el manager citado?', cat: 'Comprensión', opts: ['Trabajar siempre en la oficina', 'Un modelo completamente remoto', 'Un modelo híbrido', 'Eliminar el trabajo remoto'], a: 2, fb: '"se potesse scegliere, manterrebbe un modello ibrido" — condicional hipotético.' },
      { q: '"Sebbene molte aziende fossero inizialmente scettiche" — ¿qué modo verbal es "fossero"?', cat: 'Gramática', opts: ['Indicativo imperfetto', 'Congiuntivo imperfetto', 'Condizionale passato', 'Congiuntivo presente'], a: 1, fb: '"Fossero" = congiuntivo imperfetto di essere. "Sebbene" (aunque) es una conjunción concesiva que requiere siempre el congiuntivo.' },
      { q: '¿Cuál es el porcentaje de trabajadores que creen que el trabajo remoto mejora su calidad de vida?', cat: 'Comprensión', opts: ['20%', '30%', '40%', '50%'], a: 2, fb: '"il 40% dei lavoratori italiani ritiene che lavorare da remoto aumenti la qualità della vita"' },
    ],
    openQ: 'Describe las ventajas y desventajas del trabajo o estudio a distancia en 3-4 frases. Usa "sebbene", "è importante che" o "penso che".',
    production: 'Usa: "Penso che il lavoro a distanza sia... / Sebbene ci siano vantaggi... / Sarebbe meglio se..."',
  },
  {
    id: 2, title: 'La tutela dell\'ambiente', topic: 'Ambiente', words: 128, grammar: 'Congiuntivo + periodo ipotetico',
    text: "Il cambiamento climatico è una delle sfide più urgenti del nostro tempo. Molti scienziati ritengono che le emissioni di CO₂ debbano essere ridotte drasticamente entro il 2030. Sebbene i governi abbiano firmato accordi internazionali, l'attuazione delle politiche verdi è ancora lenta. Alcuni esperti credono che, se non agissimo adesso, le conseguenze sarebbero catastrofiche per le generazioni future. In Italia, sono state adottate politiche per promuovere le energie rinnovabili, ma è necessario che i cittadini cambino anche le loro abitudini quotidiane. Riciclare, usare i trasporti pubblici e ridurre i consumi energetici sono azioni che tutti potrebbero compiere. Il futuro del pianeta dipende dalle scelte che facciamo oggi.",
    vocab: { sfide: 'desafíos', emissioni: 'emisiones', drasticamente: 'drásticamente', accordi: 'acuerdos', attuazione: 'implementación', catastrofiche: 'catastróficas', adottate: 'adoptadas', rinnovabili: 'renovables', abitudini: 'hábitos', consumi: 'consumos', compiere: 'realizar', dipende: 'depende' },
    preQ: [
      { q: '¿Qué haces tú para cuidar el medio ambiente?', opts: ['Mucho (reciclo, transporte público)', 'Algo (a veces)', 'Poco por ahora'], a: -1 },
      { q: '¿Crees que el cambio climático es urgente?', opts: ['Es una emergencia global', 'Es importante pero hay tiempo', 'No estoy seguro/a'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "sfide"?', cat: 'Vocabulario', opts: ['desafíos', 'soluciones', 'acuerdos', 'políticas'], a: 0, fb: '"Sfide" = desafíos (singular: sfida). "Una delle sfide più urgenti" = uno de los desafíos más urgentes.' },
      { q: '¿Qué creen los científicos según el texto?', cat: 'Comprensión', opts: ['Que las emisiones ya se han reducido', 'Que las emisiones deben reducirse drásticamente antes de 2030', 'Que los acuerdos son suficientes', 'Que Italia es el mayor contaminador'], a: 1, fb: '"Molti scienziati ritengono che le emissioni di CO₂ debbano essere ridotte drasticamente entro il 2030"' },
      { q: '¿Por qué la implementación de políticas verdes es lenta?', cat: 'Comprensión', opts: ['Porque los ciudadanos no cooperan', 'Porque los científicos no se ponen de acuerdo', 'Sebbene i governi abbiano firmato acuerdos, la attuazione es lenta', 'Porque no hay tecnología disponible'], a: 2, fb: '"Sebbene i governi abbiano firmato accordi internazionali, l\'attuazione delle politiche verdi è ancora lenta" — aunque firmaron acuerdos, la implementación es lenta.' },
      { q: '¿Qué pasaría si no actuáramos ahora según el texto?', cat: 'Comprensión', opts: ['Las consecuencias serían moderadas', 'El planeta se recuperaría solo', 'Las consecuencias serían catastróficas para las futuras generaciones', 'Los gobiernos actuarían solos'], a: 2, fb: '"se non agissimo adesso, le conseguenze sarebbero catastrofiche" — período hipotético: cong. imperfetto + condizionale.' },
      { q: '"se non agissimo adesso, le conseguenze sarebbero catastrofiche" — ¿qué estructura es esta?', cat: 'Gramática', opts: ['Período real (presente indicativo + futuro)', 'Período hipotético irreale (cong. imperfetto + condizionale)', 'Discorso indiretto', 'Comparativo'], a: 1, fb: '"Se non agissimo" = congiuntivo imperfetto; "sarebbero" = condizionale. Período hipotético de la irrealidad — condición contraria a la realidad.' },
      { q: '¿Qué acciones específicas menciona el texto?', cat: 'Comprensión', opts: ['Solo reciclar', 'Riciclare, usare trasporti pubblici, ridurre consumi energetici', 'Usar energía solar y eólica', 'Firmar acuerdos internacionales'], a: 1, fb: '"Riciclare, usare i trasporti pubblici e ridurre i consumi energetici" — tres acciones concretas para los ciudadanos.' },
    ],
    openQ: 'Escribe 3-4 frases sobre lo que harías si pudieras cambiar el mundo. Usa el período hipotético: "Se potessi..., ...".',
    production: 'Usa: "Se potessi, ridurrei... / È necessario che noi... / Sebbene sia difficile, dobbiamo..."',
  },
  {
    id: 3, title: 'La cucina italiana nel mondo', topic: 'Cultura', words: 130, grammar: 'Pronomi relativi + congiuntivo',
    text: "La cucina italiana è considerata una delle più ricche e varie del mondo. I piatti che gli italiani preparano da secoli, come la pasta, la pizza e il risotto, sono ormai diffusi in ogni angolo del pianeta. Tuttavia, molti italiani si lamentano che la versione internazionale dei loro piatti sia spesso lontana dall'originale. Una ricercatrice che studia l'identità culturale italiana sostiene che il cibo sia molto più di una semplice necessità: è un'espressione della storia, del territorio e dei valori di un popolo. Il concetto di convivialità, con cui gli italiani descrivono il piacere di mangiare insieme, è centrale nella cultura italiana. Cucinare con ingredienti freschi e locali — quella che molti chiamano la 'cucina del territorio' — rimane un valore fondamentale.",
    vocab: { varie: 'variadas', secoli: 'siglos', diffusi: 'difundidos', angolo: 'rincón', lamentano: 'se quejan', ricercatrice: 'investigadora', convivialità: 'convivialidad', centrales: 'central', ingredienti: 'ingredientes', territorio: 'territorio', fondamentale: 'fundamental', popolo: 'pueblo/nación' },
    preQ: [
      { q: '¿Cuál es tu plato italiano favorito?', opts: ['Pasta/Risotto', 'Pizza', 'Otro (tiramisù, etc.)'], a: -1 },
      { q: '¿Has probado la cocina italiana original en Italia?', opts: ['Sí', 'No, solo la versión local', 'Nunca he probado cocina italiana'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "convivialità"?', cat: 'Vocabulario', opts: ['convivialidad / el placer de compartir la mesa', 'competición culinaria', 'receta tradicional', 'producto artesanal'], a: 0, fb: '"Convivialità" = convivialidad. Viene del latín "convivium" (banquete). Es el placer de comer y estar juntos.' },
      { q: '¿De qué se quejan muchos italianos según el texto?', cat: 'Comprensión', opts: ['Que la pasta italiana no es buena', 'Que la versión internacional de sus platos es diferente al original', 'Que los italianos no saben cocinar fuera de Italia', 'Que la cocina italiana es demasiado cara'], a: 1, fb: '"molti italiani si lamentano che la versione internazionale dei loro piatti sia spesso lontana dall\'originale" — usan congiuntivo dopo "lamentarsi che".' },
      { q: '¿Qué dice la investigadora sobre la comida?', cat: 'Comprensión', opts: ['Que es solo una necesidad biológica', 'Que es una expresión de la historia, el territorio y los valores del pueblo', 'Que la cocina italiana es inferior a la francesa', 'Que los italianos comen demasiado'], a: 1, fb: '"una ricercatrice... sostiene che il cibo sia molto più di una semplice necessità: è un\'espressione della storia, del territorio e dei valori di un popolo"' },
      { q: '"I piatti che gli italiani preparano da secoli" — ¿a qué se refiere "che" aquí?', cat: 'Gramática', opts: ['Pronome relativo: oggetto diretto di "preparano"', 'Pronome relativo: soggetto di "preparano"', 'Congiunzione causale', 'Avverbio interrogativo'], a: 0, fb: '"Che" = pronome relativo oggetto diretto: i piatti (cosa preparano gli italiani). Sin preposición → "che" para objeto directo.' },
      { q: '"il concetto di convivialità, con cui gli italiani descrivono il piacere di mangiare insieme" — ¿qué es "cui" aquí?', cat: 'Gramática', opts: ['Pronome relativo con preposizione (con + cui)', 'Pronome relativo soggetto', 'Articolo determinativo', 'Congiunzione'], a: 0, fb: '"Con cui" = con il quale. Preposizione "con" + "cui" per indicare il mezzo/strumento. Non si usa "con che" — dopo preposizione sempre "cui".' },
      { q: '¿Qué es la "cucina del territorio"?', cat: 'Comprensión', opts: ['La cocina de restaurantes con estrellas', 'Cocinar con ingredientes frescos y locales', 'La cocina de las regiones montañosas', 'Los platos exportados al mundo'], a: 1, fb: '"Cucinare con ingredienti freschi e locali — quella che molti chiamano la \'cucina del territorio\'".' },
    ],
    openQ: 'Describe un plato típico de tu país o región. ¿Tiene ingredientes locales? ¿Qué lo hace especial? Usa pronomi relativi.',
    production: 'Usa: "Il piatto che preferisco è... / È un piatto che viene preparato... / Gli ingredienti con cui si cucina sono..."',
  },
  {
    id: 4, title: 'I vantaggi dell\'apprendimento delle lingue', topic: 'Istruzione', words: 132, grammar: 'Congiuntivo + discorso indiretto',
    text: "Molti esperti di neuroscienze affermano che imparare una seconda lingua sia uno degli esercizi più benefici per il cervello. Studi recenti hanno dimostrato che le persone bilingui hanno una maggiore capacità di concentrazione e resistono meglio al declino cognitivo in età avanzata. Un professore universitario ha spiegato ai suoi studenti che chi parla più lingue sviluppa una sensibilità interculturale che lo rende più aperto e tollerante. Ha aggiunto che, se tutti potessero imparare almeno una lingua straniera, il mondo sarebbe un posto più comprensivo. In Italia, si stima che meno del 40% della popolazione parli correntemente una lingua straniera, nonostante sia necessario che i giovani acquisiscano competenze linguistiche per competere nel mercato globale.",
    vocab: { neuroscienze: 'neurociencias', benefici: 'beneficiosos', cervello: 'cerebro', bilingui: 'bilingües', concentrazione: 'concentración', cognitivo: 'cognitivo', sensibilità: 'sensibilidad', interculturale: 'intercultural', tollerante: 'tolerante', comprensivo: 'comprensivo/tolerante', acquisiscano: 'adquieran', competenze: 'competencias' },
    preQ: [
      { q: '¿Cuántos idiomas hablas tú?', opts: ['Uno', 'Dos', 'Tres o más'], a: -1 },
      { q: '¿Por qué estudias italiano?', opts: ['Por trabajo / estudio', 'Por viaje / cultura', 'Por pasión personal'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "cervello"?', cat: 'Vocabulario', opts: ['cerebro', 'corazón', 'idioma', 'memoria'], a: 0, fb: '"Cervello" = cerebro. "Uno degli esercizi più benefici per il cervello" = uno de los ejercicios más beneficiosos para el cerebro.' },
      { q: '¿Qué ventaja tienen las personas bilingües según el texto?', cat: 'Comprensión', opts: ['Ganan más dinero', 'Viajan más', 'Mayor concentración y mejor resistencia al declive cognitivo', 'Aprenden más rápido matemáticas'], a: 2, fb: '"le persone bilingui hanno una maggiore capacità di concentrazione e resistono meglio al declino cognitivo"' },
      { q: '¿Qué desarrolla quien habla más lenguas?', cat: 'Comprensión', opts: ['Solo habilidades técnicas', 'Una sensibilidad intercultural que lo hace más abierto y tolerante', 'Mayor inteligencia matemática', 'Problemas de identidad'], a: 1, fb: '"chi parla più lingue sviluppa una sensibilità interculturale che lo rende più aperto e tollerante" — pronome relativo "che".' },
      { q: '"Ha spiegato... che chi parla più lingue sviluppa..." — ¿qué tipo de estructura es esta?', cat: 'Gramática', opts: ['Período hipotético', 'Discorso indiretto (verbo introduttivo al passato)', 'Congiuntivo presente', 'Futuro semplice'], a: 1, fb: '"Ha spiegato che" = discorso indiretto con verbo al passato. El verbo "chi parla" permanece en indicativo porque expresa una verdad general.' },
      { q: '"se tutti potessero imparare almeno una lingua straniera, il mondo sarebbe più comprensivo" — ¿qué estructura es?', cat: 'Gramática', opts: ['Período ipotetico dell\'irrealtà (cong. imperfetto + condizionale)', 'Período real (presente + futuro)', 'Congiuntivo presente + futuro', 'Discorso indiretto'], a: 0, fb: '"Potessero" = congiuntivo imperfetto di potere; "sarebbe" = condizionale. Período hipotético de la irrealidad en estilo indirecto.' },
      { q: '¿Qué porcentaje de italianos habla fluidamente una lengua extranjera?', cat: 'Comprensión', opts: ['Menos del 20%', 'Menos del 40%', 'Más del 60%', 'Más del 80%'], a: 1, fb: '"si stima che meno del 40% della popolazione parli correntemente una lingua straniera" — "parli" es congiuntivo dopo "si stima che".' },
    ],
    openQ: 'Escribe sobre tu experiencia aprendiendo idiomas. ¿Por qué es importante para ti? ¿Qué ventajas has notado?',
    production: 'Usa: "Penso che imparare le lingue sia... / Ho notato che... / Se parlassi più lingue, potrei..."',
  },
  {
    id: 5, title: 'La città del futuro', topic: 'Innovazione', words: 127, grammar: 'Condizionale + congiuntivo',
    text: "Come saranno le città del futuro? Urbanisti e architetti di tutto il mondo immaginano metropoli dove i trasporti sarebbero completamente elettrici e i parchi verdi occuperebbero il 40% dello spazio urbano. Molti esperti sostengono che sarebbe fondamentale che gli edifici producano la propria energia. Secondo un recente rapporto, le città che adotteranno tecnologie intelligenti ridurrebbero significativamente l'inquinamento. Alcuni pensano che, se i politici volessero davvero cambiare le cose, investirebbero molto di più nelle infrastrutture verdi. Le città italiane, con la loro ricca eredità storica, affrontano la sfida di modernizzarsi senza perdere il loro carattere unico. Sarebbe utile che ogni città trovasse un equilibrio tra innovazione e tutela del patrimonio culturale.",
    vocab: { urbanisti: 'urbanistas', metropoli: 'metrópolis', elettrici: 'eléctricos', occuperebbero: 'ocuparían', fondamentale: 'fundamental', edifici: 'edificios', rapporto: 'informe', adotteranno: 'adoptarán', inquinamento: 'contaminación', infrastrutture: 'infraestructuras', eredità: 'herencia', patrimonio: 'patrimonio' },
    preQ: [
      { q: '¿En qué tipo de ciudad te gustaría vivir?', opts: ['Ciudad verde y sostenible', 'Ciudad tecnológica y moderna', 'Ciudad histórica y cultural'], a: -1 },
      { q: '¿Crees que las ciudades cambiarán mucho en 50 años?', opts: ['Sí, radicalmente', 'Algo, pero no demasiado', 'No mucho'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "eredità storica"?', cat: 'Vocabulario', opts: ['herencia histórica', 'edificios históricos', 'museos de historia', 'documentos históricos'], a: 0, fb: '"Eredità storica" = herencia histórica. "Eredità" viene del latín "hereditas". Las ciudades italianas tienen una gran herencia cultural e histórica.' },
      { q: '¿Qué características tendrían las ciudades del futuro según los urbanistas?', cat: 'Comprensión', opts: ['Transporte de vapor y pocas casas', 'Transportes eléctricos y 40% de espacios verdes', 'Solo edificios altos de cristal', 'Sin coches ni transporte público'], a: 1, fb: '"i trasporti sarebbero completamente elettrici e i parchi verdi occuperebbero il 40% dello spazio urbano"' },
      { q: '¿Qué sostienen muchos expertos?', cat: 'Comprensión', opts: ['Que los edificios deberían ser más altos', 'Que sería fundamental que los edificios produzcan su propia energía', 'Que las ciudades deberían tener más coches eléctricos', 'Que los museos son más importantes que la tecnología'], a: 1, fb: '"sarebbe fondamentale che gli edifici producano la propria energia" — condizionale "sarebbe" + congiuntivo "producano".' },
      { q: '"sarebbero" en "i trasporti sarebbero completamente elettrici" — ¿qué modo es?', cat: 'Gramática', opts: ['Futuro semplice', 'Condizionale presente', 'Congiuntivo presente', 'Imperfetto'], a: 1, fb: '"Sarebbero" = condizionale presente di essere. Expresa una situación hipotética o imaginada: así serían las ciudades del futuro.' },
      { q: '"se i politici volessero davvero cambiare le cose, investirebbero..." — ¿qué expresa esta frase?', cat: 'Gramática', opts: ['Un hecho real del presente', 'Una condición hipotética irreale (los políticos no quieren)', 'Un plan futuro cierto', 'Un deseo del pasado'], a: 1, fb: '"Se volessero" (cong. imperfetto) + "investirebbero" (condizionale): período hipotético de la irrealidad. Implica que los políticos no quieren realmente.' },
      { q: '¿Cuál es el desafío específico de las ciudades italianas?', cat: 'Comprensión', opts: ['Construir más edificios nuevos', 'Modernizarse sin perder su carácter histórico único', 'Eliminar todos los edificios históricos', 'Atraer más turistas extranjeros'], a: 1, fb: '"Le città italiane... affrontano la sfida di modernizzarsi senza perdere il loro carattere unico"' },
    ],
    openQ: 'Describe la ciudad ideal del futuro. ¿Cómo sería? ¿Qué cambiarías en tu ciudad actual? Usa il condizionale.',
    production: 'Usa: "La città del futuro sarebbe... / Ci sarebbero... / Se potessi, cambierei... / Sarebbe importante che..."',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+|[.,!?'"\-:;()\/]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'"\-:;()\/]+$/.test(t),
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
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Produzione libera</div>
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
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>LA TUA PRODUZIONE LIBERA</div>
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

export default function LetturaItalianoB1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano B1</Link>
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
          <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Lettura · Italiano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lettura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 testi B1 (120-150 parole) su attualità, cultura e innovazione. Ogni testo include vocabolario interattivo, 6 domande e produzione libera.
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
          💡 <strong style={{ color: 'var(--ink)' }}>Come usarlo:</strong> Leggi il testo toccando le parole evidenziate per la traduzione. Poi rispondi alle 6 domande di vocabolario, comprensione e grammatica B1 (congiuntivo, condizionale, pronomi relativi). Alla fine, scrivi la tua produzione libera.
        </div>
      </div>
    </section>
  );
}
