'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'passato_prossimo', title: 'Passato Prossimo', icon: '⏰',
    rule: "Formato: soggetto + AVERE/ESSERE + participio passato. AVERE: verbi transitivi (mangiare→ho mangiato, vedere→ho visto, fare→ho fatto). ESSERE: verbi di movimento e cambiamento (andare→sono andato/a, venire→sono venuto/a, nascere→sono nato/a). Con ESSERE, il participio si accorda con il soggetto in genere e numero.",
    tip: "Trucco: se puoi rispondere 'chi?' o 'cosa?' dopo il verbo → usa AVERE. Se no → di solito ESSERE. Tutti i verbi riflessivi usano ESSERE: mi sono alzato/a, ti sei svegliato/a.",
    table: {
      headers: ['', 'Con AVERE', 'Con ESSERE'],
      rows: [
        ['Infinito', 'mangiare / leggere', 'andare / venire'],
        ['1ª pers. sing.', 'ho mangiato / letto', 'sono andato/a'],
        ['3ª pers. sing.', 'ha mangiato / letto', 'è andato/a'],
        ['1ª pers. plur.', 'abbiamo mangiato', 'siamo andati/e'],
      ]
    },
    a1note: "Al livello A1 usi il presente: 'Ogni giorno mangio la pasta'. Al A2 racconti eventi passati e conclusi: 'Ieri ho mangiato una pizza deliziosa.' Presente = abitudine; passato prossimo = evento concluso.",
    examples: [
      "Ieri ho comprato un libro interessante. (avere + verbo transitivo)",
      "Siamo arrivati a Roma sabato mattina. (essere + verbo di movimento, accordo plurale)",
      "Maria si è alzata tardi perché era stanca. (riflessivo → essere, accordo femminile)",
    ],
    fills: [
      { s: "Ieri sera lei ___ al cinema con le amiche.", opts: ['è andata', 'ha andato', 'va', 'andava'], a: 0, fb: "'È andata' — andare usa ESSERE. Il participio si accorda: lei (femminile) → andata." },
      { s: "Noi ___ una pizza buonissima ieri sera.", opts: ['abbiamo mangiato', 'siamo mangiati', 'mangiamo', 'mangiavamo'], a: 0, fb: "'Abbiamo mangiato' — mangiare è transitivo (cosa? la pizza) → usa AVERE." },
      { s: "___ tu già ___ questo film?", opts: ['Hai / visto', 'Sei / visto', 'Hai / vedere', 'Hai / veduto'], a: 0, fb: "'Hai visto' — vedere usa AVERE (transitivo). Participio irregolare: vedere→visto." },
      { s: "Marco e Sofia ___ a casa tardi.", opts: ['sono tornati', 'hanno tornato', 'tornano', 'tornavano'], a: 0, fb: "'Sono tornati' — tornare usa ESSERE. Accordo con il soggetto maschile plurale: tornati." },
      { s: "Stamattina mi ___ alle 7.", opts: ['sono svegliato', 'ho svegliato', 'sveglio', 'svegliavo'], a: 0, fb: "'Mi sono svegliato' — i verbi riflessivi usano sempre ESSERE. L'accordo dipende dal soggetto." },
    ],
    transforms: [
      { prompt: "Trasforma al passato prossimo:", s: "Ogni giorno mangio la pasta. (ieri)", opts: ["Ieri ho mangiato la pasta.", "Ieri ho mangiare la pasta.", "Ieri sono mangiato la pasta.", "Ieri mangiavo la pasta."], a: 0, fb: "'Ho mangiato' — mangiare + AVERE. Participio regolare: -are → -ato. 'Ieri' indica un evento passato concluso." },
      { prompt: "Trasforma al negativo:", s: "Lui ha finito il progetto.", opts: ["Lui non ha finito il progetto.", "Lui non è finito il progetto.", "Lui non ha finire il progetto.", "Lui non finiva il progetto."], a: 0, fb: "Negativo passato prossimo: 'non' + AUSILIARE + participio. 'Non ha finito' — l'ausiliare non cambia." },
      { prompt: "Forma una domanda:", s: "Lei è partita per Milano.", opts: ["È partita lei per Milano?", "Ha partito lei per Milano?", "Lei ha partito per Milano?", "Lei è partire per Milano?"], a: 0, fb: "Domanda: inversione soggetto-ausiliare o intonazione. 'È partita' mantiene l'accordo femminile." },
    ],
    errors: [
      { s: "Ieri ho andato al mercato con mia madre.", q: "¿Qué está mal?", opts: ["'ho andato' → 'sono andato'", "'ho andato' → 'ho andare'", "'ieri' → 'oggi'", "No hay error"], a: 0, fb: "Andare usa ESSERE, non AVERE. La forma corretta è 'sono andato/a'. Con ESSERE il participio si accorda." },
      { s: "Maria si ha svegliata alle 6 stamattina.", q: "¿Cuál es el error?", opts: ["'ha' → 'è'", "'svegliata' → 'svegliato'", "'stamattina' → 'ieri mattina'", "No hay error"], a: 0, fb: "I verbi riflessivi usano ESSERE: 'Maria si è svegliata'. Mai 'si ha' — sempre 'si è' con i riflessivi." },
    ],
    production: "Scrivi 3-4 frasi su quello che hai fatto ieri o il weekend scorso. Usa almeno 2 verbi con AVERE e 1 con ESSERE. Inizia con: 'Ieri / Il weekend scorso...'"
  },
  {
    id: 'imperfetto', title: 'Imperfetto', icon: '🔄',
    rule: "Uso: (1) abitudini passate ripetute ('Quando ero bambino, giocavo ogni giorno'); (2) descrizioni nel passato (tempo, stati, sentimenti); (3) azioni in corso quando ne accade un'altra. Formazione: -are → -avo/-avi/-ava/-avamo/-avate/-avano; -ere → -evo; -ire → -ivo. Irregolari: essere→ero/eri/era/eravamo/eravate/erano.",
    tip: "Differenza chiave: Passato prossimo = evento singolo e concluso ('Ieri HO MANGIATO la pizza'). Imperfetto = stato/abitudine/sfondo ('Quando ero piccolo, MANGIAVO sempre la pizza'). Insieme: 'Leggevo un libro (imperfetto = in corso) quando è arrivato Paolo (passato prossimo = nuovo evento)'",
    table: {
      headers: ['Persona', 'parlare (-are)', 'credere (-ere)', 'capire (-ire)', 'essere (irr.)'],
      rows: [
        ['io', 'parlavo', 'credevo', 'capivo', 'ero'],
        ['tu', 'parlavi', 'credevi', 'capivi', 'eri'],
        ['lui/lei', 'parlava', 'credeva', 'capiva', 'era'],
        ['noi', 'parlavamo', 'credevamo', 'capivamo', 'eravamo'],
        ['voi', 'parlavate', 'credevate', 'capivate', 'eravate'],
        ['loro', 'parlavano', 'credevano', 'capivano', 'erano'],
      ]
    },
    a1note: "Al livello A1 descrivi il presente: 'Abito a Roma, lavoro in un ufficio'. Con l'imperfetto descrivi come erano le cose nel passato: 'Da bambino abitavo in campagna, giocavo fuori ogni giorno.' È il tempo delle memorie e delle descrizioni.",
    examples: [
      "Quando ero piccolo, andavo sempre al mare d'estate. (abitudine passata ripetuta)",
      "Leggevo un libro quando ha suonato il telefono. (azione in corso + evento nuovo al passato prossimo)",
      "Il cielo era grigio e faceva freddo — era una giornata triste. (descrizione del passato)",
    ],
    fills: [
      { s: "Quando ___ bambina, mi piaceva molto disegnare.", opts: ['ero', 'sono stata', 'sarò', 'sia'], a: 0, fb: "'Ero' — imperfetto di 'essere'. Abitudine passata: da bambina (stato ripetuto nel tempo)." },
      { s: "Marco ___ la televisione quando è arrivata sua sorella.", opts: ['guardava', 'ha guardato', 'guarda', 'guarderà'], a: 0, fb: "'Guardava' — azione in corso (imperfetto) interrotta da un evento puntuale (passato prossimo: è arrivata)." },
      { s: "Da piccola, ogni domenica ___ con i nonni.", opts: ['pranzavamo', 'abbiamo pranzato', 'pranziamo', 'pranzeremo'], a: 0, fb: "'Pranzavamo' — abitudine ripetuta nel passato. 'Ogni domenica' è un indicatore di imperfetto." },
      { s: "Loro non ___ dove abitava il nuovo collega.", opts: ['sapevano', 'hanno saputo', 'sanno', 'sapranno'], a: 0, fb: "'Sapevano' — stato mentale nel passato (sapere = conoscenza). Gli stati mentali usano di solito l'imperfetto." },
      { s: "Ieri ___ bel tempo, così siamo usciti.", opts: ['faceva', 'ha fatto', 'fa', 'farà'], a: 0, fb: "'Faceva' — descrizione del clima nel passato (sfondo). L'imperfetto descrive il contesto dell'azione principale." },
    ],
    transforms: [
      { prompt: "Trasforma al passato (abitudine):", s: "Ogni mattina bevo il caffè. (da bambino)", opts: ["Da bambino bevevo il caffè ogni mattina.", "Da bambino ho bevuto il caffè ogni mattina.", "Da bambino bevo il caffè ogni mattina.", "Da bambino berrò il caffè ogni mattina."], a: 0, fb: "'Bevevo' — imperfetto di bere (irregolare: bev- + terminazione -evo). Abitudine passata → imperfetto." },
      { prompt: "Descrivi il passato:", s: "Il film è noioso. (ieri, il film era...)", opts: ["Ieri il film era noioso.", "Ieri il film è stato noioso.", "Ieri il film è noioso.", "Ieri il film sarà noioso."], a: 0, fb: "'Era' — imperfetto di essere per descrizione. Anche 'è stato' è possibile, ma l'imperfetto è più naturale per descrizioni." },
      { prompt: "Combina le due azioni:", s: "Leggevo. È arrivato Marco.", opts: ["Leggevo quando è arrivato Marco.", "Ho letto quando è arrivato Marco.", "Leggevo quando arrivava Marco.", "Stavo leggere quando è arrivato Marco."], a: 0, fb: "Azione in corso (imperfetto) + evento puntuale (passato prossimo): 'Leggevo quando è arrivato Marco'." },
    ],
    errors: [
      { s: "Quando avevo dieci anni, sono andato in vacanza ogni estate.", q: "¿Hay un error de uso?", opts: ["Sì: 'sono andato' → 'andavo' (abitudine)", "Sì: 'avevo' → 'ho avuto'", "Sì: 'ogni estate' → 'una estate'", "No hay error"], a: 0, fb: "'Ogni estate' indica un'abitudine ripetuta → imperfetto: 'andavo'. 'Sono andato' indica un evento singolo." },
      { s: "Ieri sera guardavamo un film e ci siamo addormentati sul divano.", q: "¿Está bien usado el imperfecto?", opts: ["Sì, è corretto: guardavamo = in corso, ci siamo addormentati = evento puntuale", "No: 'guardavamo' → 'abbiamo guardato'", "No: 'ci siamo addormentati' → 'ci addormentavamo'", "No hay error gramatical pero el uso no es natural"], a: 0, fb: "Perfetto! 'Guardavamo' (azione in corso/sfondo) + 'ci siamo addormentati' (evento puntuale). Uso corretto." },
    ],
    production: "Descrivi come eri / com'era la tua vita da bambino/a (5-8 anni). Scrivi 4-5 frasi usando l'imperfetto. Inizia con: 'Quando ero piccolo/a...'"
  },
  {
    id: 'futuro_semplice', title: 'Futuro Semplice', icon: '🔮',
    rule: "Formazione: -are/ere → togliere la -e finale + terminazioni (-ò/-ai/-à/-emo/-ete/-anno). -ire → stesso sistema. Irregolari comuni: essere→sarò, avere→avrò, andare→andrò, fare→farò, potere→potrò, volere→vorrò, venire→verrò, dovere→dovrò. USO: (1) eventi futuri incerti o lontani; (2) probabilità nel presente (Dove sarà Luca? Sarà al lavoro.); (3) ipotesi.",
    tip: "Per piani certi o prossimi, l'italiano preferisce il PRESENTE: 'Domani vado al cinema' (già deciso). Il futuro semplice è per cose più incerte o più lontane nel tempo, o per esprimere probabilità.",
    table: {
      headers: ['Persona', 'parlare (-are)', 'prendere (-ere)', 'partire (-ire)', 'essere (irr.)'],
      rows: [
        ['io', 'parlerò', 'prenderò', 'partirò', 'sarò'],
        ['tu', 'parlerai', 'prenderai', 'partirai', 'sarai'],
        ['lui/lei', 'parlerà', 'prenderà', 'partirà', 'sarà'],
        ['noi', 'parleremo', 'prenderemo', 'partiremo', 'saremo'],
        ['voi', 'parlerete', 'prenderete', 'partirete', 'sarete'],
        ['loro', 'parleranno', 'prenderanno', 'partiranno', 'saranno'],
      ]
    },
    a1note: "Al livello A1 descrivi il presente e usi il presente per il futuro immediato. Al A2, il futuro semplice ti permette di parlare di piani futuri incerti, previsioni e probabilità: 'L'anno prossimo andrò in Italia' (piano futuro incerto).",
    examples: [
      "L'anno prossimo andrò a studiare all'estero — non so ancora dove. (piano futuro incerto)",
      "Dove sarà Marco? — Sarà in palestra, di solito va lì il martedì. (probabilità nel presente)",
      "Se studierai ogni giorno, parlerai italiano benissimo. (futuro nelle frasi condizionali)",
    ],
    fills: [
      { s: "L'estate prossima ___ in Sicilia con la famiglia.", opts: ['andremo', 'siamo andati', 'andiamo', 'andavamo'], a: 0, fb: "'Andremo' — futuro irregolare di andare (and- → andr- + -emo). Piano futuro non ancora definito." },
      { s: "Non so dove ___ i biglietti del treno.", opts: ['saranno', 'sono stati', 'sono', 'erano'], a: 0, fb: "'Saranno' — futuro di essere per esprimere probabilità. 'Non so dove saranno' = probabilmente sono da qualche parte." },
      { s: "Se mangerai troppo dolce, ti ___ mal di pancia.", opts: ['farà', 'ha fatto', 'fa', 'faceva'], a: 0, fb: "'Farà' — futuro di fare nelle frasi condizionali. 'Se + futuro... futuro' (in italiano, entrambe le frasi al futuro)." },
      { s: "Quanto ___ questo appartamento?", opts: ['costerà', 'ha costato', 'costa', 'costava'], a: 0, fb: "'Costerà' — futuro per esprimere ipotesi o stima. 'Quanto costerà?' = Quanto pensi che costi?" },
      { s: "Domani ___ un incontro importante con il direttore.", opts: ['avrò', 'ho avuto', 'ho', 'avevo'], a: 0, fb: "'Avrò' — futuro irregolare di avere (av- → avr- + -ò). Evento futuro pianificato." },
    ],
    transforms: [
      { prompt: "Trasforma al futuro semplice:", s: "Studio italiano ogni giorno. (l'anno prossimo)", opts: ["L'anno prossimo studierò italiano ogni giorno.", "L'anno prossimo ho studiato italiano ogni giorno.", "L'anno prossimo studio italiano ogni giorno.", "L'anno prossimo studiavo italiano ogni giorno."], a: 0, fb: "'Studierò' — futuro regolare: studiar- + -ò. L'anno prossimo indica un piano futuro → futuro semplice." },
      { prompt: "Esprimi una probabilità nel presente:", s: "Non risponde. Probabilmente dorme.", opts: ["Non risponde. Dormirà.", "Non risponde. Dormiva.", "Non risponde. Ha dormito.", "Non risponde. Dorme."], a: 0, fb: "'Dormirà' — futuro di probabilità. In italiano il futuro semplice si usa per fare ipotesi sul presente." },
      { prompt: "Completa la condizione:", s: "Se avrai tempo, (chiamarmi).", opts: ["Se avrai tempo, mi chiamerai.", "Se avrai tempo, mi chiami.", "Se avessi tempo, mi chiamerai.", "Se hai tempo, mi chiamerai."], a: 0, fb: "Condizionale reale: Se + futuro → futuro. 'Se avrai tempo, mi chiamerai.' Entrambe le parti al futuro." },
    ],
    errors: [
      { s: "Domani andrò sicuramente al mercato — l'ho già deciso.", q: "¿Es correcto usar el futuro aquí?", opts: ["Meglio il presente: 'vado al mercato' (piano già deciso)", "Sì, è corretto usare il futuro", "Meglio l'imperfetto: 'andavo al mercato'", "Meglio il passato prossimo: 'sono andato'"], a: 0, fb: "Per piani già decisi e certi, l'italiano preferisce il presente: 'Domani vado al mercato'. Il futuro semplice è per piani incerti." },
      { s: "Loro verranno alla festa domani.", q: "¿Hay un error gramatical?", opts: ["No, è corretto — venire (irregolare): verr- + -anno", "Sì: 'verranno' → 'vengono'", "Sì: 'verranno' → 'verrebbero'", "Sì: 'verranno' → 'hanno venuto'"], a: 0, fb: "Corretto! Venire è irregolare al futuro: venire → verrò/verrai/verrà/verremo/verrete/verranno. 'Verranno' è la forma plurale." },
    ],
    production: "Scrivi 4 frasi su cosa farai l'estate prossima. Usa il futuro semplice. Include: cosa farai, dove andrai, con chi sarai, e come sarà."
  },
  {
    id: 'pronomi', title: 'Pronomi Diretti e Indiretti', icon: '🎯',
    rule: "Pronomi DIRETTI (risponde a 'chi?'/'cosa?'): mi/ti/lo/la/ci/vi/li/le. Pronomi INDIRETTI (risponde a 'a chi?'): mi/ti/gli/le/ci/vi/gli (loro). Posizione: prima del verbo coniugato ('Lo vedo ogni giorno') o attaccati all'infinito ('Voglio vederlo'). Con il passato prossimo e pronomi diretti, il participio si accorda: 'La pizza? L'HO MANGIATA.'",
    tip: "Trappola: gli = a lui; le = a lei. Con plurale informale 'gli' sostituisce 'loro': 'Ho detto a Maria e Paolo → gli ho detto'. Non confondere: 'lo/la' (diretto, cosa/chi) vs 'gli/le' (indiretto, a chi).",
    table: {
      headers: ['Persona', 'Pronome diretto', 'Pronome indiretto'],
      rows: [
        ['io', 'mi', 'mi'],
        ['tu', 'ti', 'ti'],
        ['lui', 'lo', 'gli'],
        ['lei', 'la', 'le'],
        ['noi', 'ci', 'ci'],
        ['voi', 'vi', 'vi'],
        ['loro', 'li / le', 'gli (loro)'],
      ]
    },
    a1note: "Al livello A1 usi il nome completo: 'Vedo Marco ogni giorno', 'Parlo a Maria spesso'. Al A2 sostituisci con i pronomi per parlare in modo più naturale: 'Lo vedo ogni giorno', 'Le parlo spesso'. I pronomi rendono il discorso fluido.",
    examples: [
      "La pizza? L'ho mangiata tutta! (pronome diretto la → l'; accordo con passato prossimo: -a)",
      "Ho telefonato a Marco — gli ho detto la verità. (pronome indiretto gli = a lui)",
      "Questi libri? Li compro sempre in biblioteca. (pronome diretto li = i libri, maschile plurale)",
    ],
    fills: [
      { s: "Hai visto Maria? — Sì, ___ ho vista stamattina.", opts: ['la', 'le', 'lo', 'li'], a: 0, fb: "'La ho vista' → 'L'ho vista'. Pronome diretto la (= Maria, femminile). Con passato prossimo il participio si accorda: vista." },
      { s: "Marco vuole parlare con me — ___ telefono stasera.", opts: ['gli', 'lo', 'la', 'li'], a: 0, fb: "'Gli telefono' — telefonare richiede il pronome indiretto (telefonare a qualcuno). Gli = a lui (Marco)." },
      { s: "Questi documenti sono importanti — ___ firmo subito.", opts: ['li', 'gli', 'le', 'lo'], a: 0, fb: "'Li firmo' — pronome diretto maschile plurale (i documenti → li). 'Firmare + cosa?' = pronome diretto." },
      { s: "Devo chiamare la professoressa — ___ scrivo un'email.", opts: ['le', 'la', 'gli', 'li'], a: 0, fb: "'Le scrivo' — scrivere a qualcuno = pronome indiretto. Le = a lei (la professoressa)." },
      { s: "Vuoi questo caffè? — No grazie, non ___ voglio.", opts: ['lo', 'gli', 'li', 'le'], a: 0, fb: "'Lo voglio' — pronome diretto maschile singolare (il caffè → lo). 'Volere + cosa?' = pronome diretto." },
    ],
    transforms: [
      { prompt: "Sostituisci il complemento con il pronome:", s: "Mangio la pasta. (la pasta → ?)", opts: ["La mangio.", "Lo mangio.", "Le mangio.", "Li mangio."], a: 0, fb: "'La mangio' — la pasta è femminile singolare → pronome diretto la. Posizione: prima del verbo." },
      { prompt: "Usa il pronome indiretto:", s: "Telefono a mia madre ogni domenica.", opts: ["Le telefono ogni domenica.", "La telefono ogni domenica.", "Gli telefono ogni domenica.", "Li telefono ogni domenica."], a: 0, fb: "'Le telefono' — telefonare a qualcuno = pronome indiretto. A mia madre (femminile) → le." },
      { prompt: "Accordo con passato prossimo:", s: "Ho visto le ragazze ieri. (le ragazze → ?)", opts: ["Le ho viste ieri.", "Le ho visto ieri.", "Li ho viste ieri.", "Le ho vedere ieri."], a: 0, fb: "'Le ho viste' — pronome diretto femminile plurale le + accordo del participio: viste (femminile plurale)." },
    ],
    errors: [
      { s: "Ho telefonato la mia amica e lo ho detto tutto.", q: "¿Qué está mal con el pronombre?", opts: ["'lo' → 'le' (telefonare a → pronome indiretto femminile)", "'lo' → 'la' (pronome diretto)", "'lo' → 'gli' (maschile)", "No hay error"], a: 0, fb: "'Dire a qualcuno' richiede il pronome indiretto. A mia amica (femminile) → le: 'le ho detto tutto'." },
      { s: "La pizza era buona — l'ho mangiato tutto.", q: "¿Hay un error de concordancia?", opts: ["Sì: 'mangiato' → 'mangiata' (accordo con la, femminile)", "Sì: 'l'ho' → 'lo ho'", "No hay error", "Sì: 'mangiato' → 'mangiati'"], a: 0, fb: "'La pizza' (femminile) → pronome la → participio accorda: mangiata. 'L'ho mangiata tutta' è corretto." },
    ],
    production: "Riscrivi queste frasi sostituendo le parole sottolineate con il pronome corretto: 1) Vedo Marco ogni giorno. 2) Scrivo a mia sorella ogni settimana. 3) Ho comprato i biglietti ieri. 4) Telefono alla professoressa stasera."
  },
  {
    id: 'comparativo', title: 'Comparativo e Superlativo', icon: '📊',
    rule: "Comparativo di maggioranza: più + aggettivo + di/che. Comparativo di minoranza: meno + aggettivo + di/che. Comparativo di uguaglianza: (così) + aggettivo + come / tanto + aggettivo + quanto. Superlativo relativo: il/la/i/le + più/meno + aggettivo. Superlativo assoluto: aggettivo + -issimo/a/i/e O molto + aggettivo. Irregolari: buono→migliore/ottimo, cattivo→peggiore/pessimo, grande→maggiore/massimo, piccolo→minore/minimo.",
    tip: "Di vs Che nel comparativo: usa 'DI' quando paragoni due SOSTANTIVI/PRONOMI ('Luca è più alto di Marco'). Usa 'CHE' quando paragoni due AGGETTIVI, VERBI o AVVERBI sullo stesso soggetto ('È più bello che intelligente').",
    table: {
      headers: ['Tipo', 'Struttura', 'Esempio', 'Note'],
      rows: [
        ['Maggioranza', 'più + agg + di/che', 'Roma è più grande di Firenze', 'di = tra due nomi'],
        ['Minoranza', 'meno + agg + di/che', 'Il treno è meno veloce dell\'aereo', 'che = tra verbi/avv.'],
        ['Uguaglianza', 'così + agg + come', 'È così bello come pensavo', 'oppure: tanto...quanto'],
        ['Sup. relativo', 'il/la + più + agg', 'È il ristorante più caro', 'accordo con il nome'],
        ['Sup. assoluto', 'agg + -issimo/a', 'È bellissimo / buonissimo', 'irregolare: ottimo, pessimo'],
        ['Irregolari', 'buono→migliore', 'Questo vino è migliore', 'ottimo = superlativo'],
      ]
    },
    a1note: "Al livello A1 usi gli aggettivi semplici: 'Roma è bella, il caffè è buono'. Al A2 confronti e valuti: 'Roma è più bella di Milano', 'Questo caffè è buonissimo — il migliore che ho bevuto'. Il comparativo ti permette di esprimere opinioni complesse.",
    examples: [
      "Il Colosseo è più grande di quanto pensassi. (comparativo di maggioranza con 'di')",
      "È più stanco che stressato — ha dormito poco. (comparativo con 'che' tra aggettivi)",
      "Questo è il vino migliore che ho bevuto in vita mia. (superlativo irregolare di buono)",
    ],
    fills: [
      { s: "Roma è ___ grande ___ Firenze.", opts: ['più / di', 'più / che', 'meno / di', 'così / come'], a: 0, fb: "'Più grande di Firenze' — comparativo tra due nomi/città → usa 'di' (non 'che')." },
      { s: "Questo film è ___ interessante ___ mi aspettavo.", opts: ['più / di quanto', 'più / che', 'così / come', 'meno / di'], a: 0, fb: "'Più interessante di quanto' — struttura con 'di quanto' + congiuntivo. Indica più del previsto." },
      { s: "È il ___ gelato che abbia mai mangiato!", opts: ['migliore', 'più buono', 'meglio', 'buonissimo'], a: 0, fb: "'Il migliore' — superlativo relativo irregolare di 'buono' (buono→migliore→ottimo). Con l'articolo = superlativo." },
      { s: "Marco è ___ intelligente ___ simpatico.", opts: ['più / che', 'più / di', 'così / come', 'meno / di'], a: 0, fb: "'Più intelligente che simpatico' — comparativo tra due aggettivi dello stesso soggetto → usa 'che'." },
      { s: "Questa pizza è ___!", opts: ['buonissima', 'molto buonissima', 'la più buona', 'buona molto'], a: 0, fb: "'Buonissima' — superlativo assoluto: buon- + -issima (accordo femminile). Non si dice 'molto buonissima'." },
    ],
    transforms: [
      { prompt: "Esprimi uguaglianza:", s: "Maria è alta. Paolo è alto uguale.", opts: ["Maria è alta quanto Paolo.", "Maria è più alta di Paolo.", "Maria è altissima.", "Maria è così alta che Paolo."], a: 0, fb: "'Alta quanto Paolo' — comparativo di uguaglianza: (così) + agg + come/quanto. Entrambe le forme sono corrette." },
      { prompt: "Forma il superlativo assoluto:", s: "Il film era molto bello.", opts: ["Il film era bellissimo.", "Il film era il più bello.", "Il film era tanto bello.", "Il film era più bello."], a: 0, fb: "'Bellissimo' — superlativo assoluto: bell- + -issimo. Alternativa: 'molto bello' (ma -issimo è più enfatico)." },
      { prompt: "Correggi il comparativo:", s: "Questo caffè è più buono di quello.", opts: ["Questo caffè è migliore di quello.", "Questo caffè è più bello di quello.", "Questo caffè è buonissimo di quello.", "Questo caffè è il migliore di quello."], a: 0, fb: "'Migliore' — comparativo irregolare di 'buono'. Non si dice 'più buono' con i comparativi irregolari." },
    ],
    errors: [
      { s: "Milano è più grande che Roma.", q: "¿Hay un error en el uso de 'che'?", opts: ["Sì: 'che' → 'di' (paragone tra due nomi)", "No, è corretto", "Sì: 'più' → 'molto'", "Sì: 'grande' → 'granda'"], a: 0, fb: "Paragone tra due nomi (Milano e Roma) → usa 'di': 'Milano è più grande di Roma'. 'Che' si usa quando paragoni due aggettivi o verbi." },
      { s: "Questa è la pizza più buona che ho mangiato.", q: "¿Se puede mejorar este superlativo?", opts: ["Meglio: 'la migliore pizza che ho mangiato' (irregolare)", "No, è già corretto", "Meglio: 'la pizza buonissima'", "Meglio: 'la più pizza buona'"], a: 0, fb: "'La migliore' — il superlativo relativo di buono è irregolare. 'La migliore pizza' è più corretto e naturale." },
    ],
    production: "Paragona due città o paesi che conosci. Scrivi 4-5 frasi usando comparativi e superlativi. Usa almeno un superlativo assoluto in -issimo."
  },
];

export default function GramaticaItalianoA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];
  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const total = t.fills.length + t.transforms.length + t.errors.length;
  const correct =
    t.fills.filter((q, i) => fillAns[i] === q.a).length +
    t.transforms.filter((q, i) => transAns[i] === q.a).length +
    t.errors.filter((q, i) => errAns[i] === q.a).length;

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: 'var(--wl-on-panel-ok, #059669)' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: 'var(--wl-on-panel-alert, #dc2626)' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammatica · Italiano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temi con tabella di coniugazione, esempi reali, 5 fill-in-blank, 3 trasformazioni, 2 rilevamento errori e produzione libera.
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(topicIdx === i ? { background: C, borderColor: C } : {}) }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 16, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1rem' }}>{t.icon} {t.title}</div>
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: `${C}0d`, fontSize: '0.82rem', color: C, borderLeft: `3px solid ${C}`, marginBottom: '0.85rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: 380 }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.45rem 0.7rem', background: `${C}18`, border: '1px solid var(--line-soft)', textAlign: 'left', fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Esempi in contesto reale</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Completa le frasi</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Corretto. ' : `✗ Risposta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Trasforma le frasi</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-warn, #d97706)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Corretta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Trova l&apos;errore</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-alert, #dc2626)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Trova l&apos;errore</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: 'var(--wl-on-panel-alert, #dc2626)', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Corretto. ' : `✗ Risposta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Produzione libera</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Completa tutti gli esercizi sopra per sbloccare la produzione libera.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Scrivi qui la tua risposta in italiano..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} parole
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 10) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 10}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 10 ? 1 : 0.5 }}>
                  Pronto →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>La tua produzione</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Modificare</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Vedere il risultato del tema →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} esercizi corretti
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? 'Perfetto! Padroneggi questo argomento A2.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Molto bene. Ripassa gli esercizi segnati con ✗.'
                : 'Studia la spiegazione sopra e riprova.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Riprovare</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Prossimo tema →
                </button>
              )}
              <Link href="/practica/italiano/a2" className="btn btn-ghost btn-sm">Tornare ad A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
