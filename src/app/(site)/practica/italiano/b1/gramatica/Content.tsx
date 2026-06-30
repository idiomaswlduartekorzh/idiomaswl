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
  b1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'congiuntivo', title: 'Congiuntivo Presente', icon: '🎯',
    rule: "Il congiuntivo si usa dopo verbi di opinione, volontà, emozione e espressioni impersonali: volere che, sperare che, credere che, pensare che, è importante che, è necessario che, sebbene, benché, affinché. Formazione: -are → -i/-i/-i/-iamo/-iate/-ino; -ere e -ire → -a/-a/-a/-iamo/-iate/-ano. Irregolari: essere→sia, avere→abbia, andare→vada, fare→faccia, venire→venga, potere→possa, dovere→debba.",
    tip: "Trucco: cerca il segnale — se la frase principale contiene volere, sperare, credere, pensare, temere, è bene/importante/necessario/possibile → la frase subordinata va al congiuntivo. Il soggetto della frase principale e della subordinata deve essere DIVERSO.",
    table: {
      headers: ['Persona', 'parlare (-are)', 'credere (-ere)', 'partire (-ire)', 'essere (irr.)'],
      rows: [
        ['io', 'parli', 'creda', 'parta', 'sia'],
        ['tu', 'parli', 'creda', 'parta', 'sia'],
        ['lui/lei', 'parli', 'creda', 'parta', 'sia'],
        ['noi', 'parliamo', 'crediamo', 'partiamo', 'siamo'],
        ['voi', 'parliate', 'crediate', 'partiate', 'siate'],
        ['loro', 'parlino', 'credano', 'partano', 'siano'],
      ]
    },
    b1note: "Al B1 usi il congiuntivo per esprimere desideri, dubbi e condizioni. È molto comune nel parlato italiano naturale. Senza congiuntivo, il tuo italiano suona troppo semplice: 'Voglio che tu vieni' (sbagliato) vs 'Voglio che tu venga' (corretto).",
    examples: [
      "È necessario che tu finisca il lavoro entro domani. (espressione impersonale + che + congiuntivo)",
      "Speravo che Maria venisse alla festa. (sperare + che + congiuntivo — soggetti diversi)",
      "Sebbene sia stanco, continua a lavorare. (congiunzione concessiva + congiuntivo)",
    ],
    fills: [
      { s: "È importante che tu ___ (finire) il progetto in tempo.", opts: ['finisca', 'finisce', 'ha finito', 'finirà'], a: 0, fb: "'Finisca' — congiuntivo di finire (3ª coniug. → -a). Dopo 'è importante che' → congiuntivo obbligatorio." },
      { s: "Voglio che lui ___ (venire) alla riunione domani.", opts: ['venga', 'viene', 'è venuto', 'verrà'], a: 0, fb: "'Venga' — congiuntivo irregolare di venire. 'Volere che' + soggetti diversi → congiuntivo nella subordinata." },
      { s: "Credo che loro ___ (avere) ragione su questo punto.", opts: ['abbiano', 'hanno', 'avevano', 'avranno'], a: 0, fb: "'Abbiano' — congiuntivo di avere (irregolare: abbia/abbia/abbia/abbiamo/abbiate/abbiano). 'Credere che' → congiuntivo." },
      { s: "Benché ___ (fare) freddo, decidiamo di uscire.", opts: ['faccia', 'fa', 'faceva', 'ha fatto'], a: 0, fb: "'Faccia' — congiuntivo di fare (irregolare). 'Benché' è una congiunzione concessiva che richiede sempre il congiuntivo." },
      { s: "Spera che la situazione ___ (migliorare) presto.", opts: ['migliori', 'migliora', 'è migliorata', 'migliorerà'], a: 0, fb: "'Migliori' — congiuntivo di migliorare (-are → -i). 'Sperare che' + soggetti diversi → congiuntivo." },
    ],
    transforms: [
      { prompt: "Trasforma usando il congiuntivo:", s: "Penso: 'Lei ha torto.' → Penso che...", opts: ["Penso che lei abbia torto.", "Penso che lei ha torto.", "Penso che lei aveva torto.", "Penso che lei avrebbe torto."], a: 0, fb: "'Penso che lei abbia torto' — pensare che → congiuntivo. Avere irregolare: abbia." },
      { prompt: "Combina con il congiuntivo:", s: "È possibile. Loro arrivano tardi.", opts: ["È possibile che loro arrivino tardi.", "È possibile che loro arrivano tardi.", "È possibile che loro sono arrivati tardi.", "È possibile loro arrivano tardi."], a: 0, fb: "'Arrivino' — congiuntivo di arrivare. Espressione impersonale 'è possibile che' → congiuntivo + 'che' obbligatorio." },
      { prompt: "Usa una congiunzione concessiva:", s: "Sebbene / essere / stanco / lavora sempre.", opts: ["Sebbene sia stanco, lavora sempre.", "Sebbene è stanco, lavora sempre.", "Sebbene fosse stanco, lavora sempre.", "Sebbene stia stanco, lavora sempre."], a: 0, fb: "'Sebbene sia stanco' — sebbene + congiuntivo (non indicativo). Essere irregolare: sia." },
    ],
    errors: [
      { s: "Voglio che tu viene subito.", q: "¿Qué está mal?", opts: ["'viene' → 'venga' (congiuntivo di venire)", "'viene' → 'è venuto'", "'voglio che' → 'voglio di'", "No hay error"], a: 0, fb: "Dopo 'volere che' con soggetti diversi → congiuntivo: 'voglio che tu venga'. 'Viene' è indicativo, non congiuntivo." },
      { s: "È necessario che noi studiamo ogni giorno.", q: "¿Cuál es el error?", opts: ["'studiamo' → 'studiamo' — ¡es correcto! Il congiuntivo noi = studiamo", "'studiamo' → 'studiamo' (uguale all'indicativo — errore di forma)", "No hay error — 'studiamo' puede ser congiuntivo aquí", "'È necessario che' → 'È necessario di'"], a: 2, fb: "¡Correcto! Para la 1ª persona plural (-iamo), el congiuntivo es idéntico al indicativo: 'studiamo'. No hay error." },
    ],
    production: "Scrivi 4 frasi usando il congiuntivo presente. Usa: 'È importante che...', 'Spero che...', 'Sebbene...', 'Penso che...'. Scegli temi come studio, lavoro o vita quotidiana.",
  },
  {
    id: 'condizionale', title: 'Condizionale Presente', icon: '🌟',
    rule: "Il condizionale si usa per: (1) richieste educate (Vorrei, Potrei); (2) consigli (Dovresti studiare di più); (3) desideri ipotetici (Mi piacerebbe vivere in Italia); (4) frase principale del periodo ipotetico (Se avessi tempo, studierei). Formazione: stessa radice del futuro + terminazioni -ei/-esti/-ebbe/-emmo/-este/-ebbero. Irregolari: essere→sarei, avere→avrei, andare→andrei, fare→farei, potere→potrei, volere→vorrei, venire→verrei, dovere→dovrei.",
    tip: "Differenza con il futuro: il futuro indica qualcosa che accadrà realmente ('Studierò domani'). Il condizionale indica qualcosa di ipotetico o educato ('Studierei volentieri, ma ho un impegno'). 'Vorrei' è il condizionale più usato nell'italiano quotidiano.",
    table: {
      headers: ['Persona', 'parlare', 'prendere', 'essere (irr.)', 'volere (irr.)'],
      rows: [
        ['io', 'parlerei', 'prenderei', 'sarei', 'vorrei'],
        ['tu', 'parleresti', 'prenderesti', 'saresti', 'vorresti'],
        ['lui/lei', 'parlerebbe', 'prenderebbe', 'sarebbe', 'vorrebbe'],
        ['noi', 'parleremmo', 'prenderemmo', 'saremmo', 'vorremmo'],
        ['voi', 'parlereste', 'prendereste', 'sareste', 'vorreste'],
        ['loro', 'parlerebbero', 'prenderebbero', 'sarebbero', 'vorrebbero'],
      ]
    },
    b1note: "Al A2 fai richieste dirette: 'Voglio un caffè'. Al B1 sei più educato e sfumato: 'Vorrei un caffè, per favore'. Il condizionale trasforma tutto il tuo italiano — richieste, consigli, desideri — in qualcosa di molto più naturale e sofisticato.",
    examples: [
      "Vorrei prenotare un tavolo per due persone. (richiesta educata — molto comune)",
      "Dovresti parlare con il direttore prima di decidere. (consiglio con dovere al condizionale)",
      "Se potessi, vivrei in Italia per un anno. (periodo ipotetico — vedi tema 3)",
    ],
    fills: [
      { s: "___ (volere) un caffè, per favore.", opts: ['Vorrei', 'Voglio', 'Vorrò', 'Volevo'], a: 0, fb: "'Vorrei' — condizionale di volere (irregolare: vorrei/vorresti/vorrebbe...). È la forma più educata per ordinare qualcosa." },
      { s: "Tu ___ (dovere) studiare di più per l'esame.", opts: ['dovresti', 'devi', 'dovevi', 'dovrai'], a: 0, fb: "'Dovresti' — condizionale di dovere. Consiglio con sfumatura gentile: non è un ordine, è una raccomandazione." },
      { s: "Secondo me, ___ (essere) meglio aspettare.", opts: ['sarebbe', 'è', 'era', 'sarà'], a: 0, fb: "'Sarebbe' — condizionale di essere. Esprime un'opinione ipotetica: 'sarebbe meglio' = 'lo ritengo preferibile'." },
      { s: "___ (potere) parlarmi del suo percorso professionale?", opts: ['Potrebbe', 'Può', 'Poteva', 'Potrà'], a: 0, fb: "'Potrebbe' — condizionale di potere per richiesta formale. Molto più educato di 'Può?' — usato in contesti professionali." },
      { s: "Noi ___ (andare) volentieri al concerto, ma abbiamo un impegno.", opts: ['andremmo', 'andiamo', 'andavamo', 'andremo'], a: 0, fb: "'Andremmo' — condizionale di andare (irregolare: andr- + emmo). Esprime un desiderio che non si realizza per un ostacolo." },
    ],
    transforms: [
      { prompt: "Trasforma in richiesta educata (condizionale):", s: "Voglio informazioni sul corso.", opts: ["Vorrei informazioni sul corso.", "Vorrò informazioni sul corso.", "Avrei voluto informazioni.", "Voglio delle informazioni."], a: 0, fb: "'Vorrei informazioni' — condizionale di volere per richiesta educata. Trasformazione fondamentale in italiano formale." },
      { prompt: "Dai un consiglio con il condizionale:", s: "Parla con il medico. (tu / dovere)", opts: ["Dovresti parlare con il medico.", "Devi parlare con il medico.", "Parleresti con il medico.", "Hai dovuto parlare con il medico."], a: 0, fb: "'Dovresti parlare' — condizionale di dovere per consiglio gentile. Meno imperativo di 'devi', più naturale e educato." },
      { prompt: "Esprimi il desiderio ipotetico:", s: "Mi piace vivere in Italia. (ipotetico — mi piacerebbe...)", opts: ["Mi piacerebbe vivere in Italia.", "Mi piacerei vivere in Italia.", "Mi piacerebbe a vivere in Italia.", "Vorrei che mi piacesse vivere in Italia."], a: 0, fb: "'Mi piacerebbe' — condizionale di piacere. Esprime un desiderio non ancora realizzato. Nota: 'mi piacerebbe' non ha bisogno di 'a' prima dell'infinito." },
    ],
    errors: [
      { s: "Vorresti venire alla festa domani? — Sì, voglio venire!", q: "¿Qué sería más natural en la respuesta?", opts: ["'voglio' → 'vorrei' para mantener el registro educado", "No hay error — voglio es correcto aquí", "'voglio' → 'vorrò' (futuro)", "'voglio' → 'volevo'"], a: 0, fb: "En una respuesta a '¿Vorresti...?' es más natural y coherente responder con 'Sì, vorrei venire!' — mantiene el mismo registro condizionale." },
      { s: "Se ho tempo, verrei.", q: "¿Cuál es el error en el periodo ipotetico?", opts: ["'ho' → 'avessi' (congiuntivo imperfetto)", "'verrei' → 'vengo'", "No hay error", "'se' → 'quando'"], a: 0, fb: "Período hipotético: 'Se avessi tempo, verrei.' Con condizionale nella principale → congiuntivo imperfetto nella condizione (Se + congiuntivo imperfetto... → condizionale)." },
    ],
    production: "Scrivi 4 frasi usando il condizionale. Includi: una richiesta educata (Vorrei...), un consiglio (Dovresti...), un desiderio (Mi piacerebbe...) e un'ipotesi (Se potessi...).",
  },
  {
    id: 'periodo_ipotetico', title: 'Periodo Ipotetico (Irreale)', icon: '🔮',
    rule: "Il periodo ipotetico della irrealtà si forma: SE + congiuntivo imperfetto → condizionale presente. Struttura: 'Se avessi più tempo, studierei ogni giorno.' La condizione (if-clause) usa il congiuntivo imperfetto; la conseguenza usa il condizionale presente. Congiuntivo imperfetto irregolari: essere→fossi, fare→facessi, dare→dessi, stare→stessi. ATTENZIONE: mai usare il condizionale dopo 'se': ❌ 'Se avrei tempo' è sbagliato.",
    tip: "Confronta con il periodo reale (A2): 'Se ho tempo, studio' (indicativo presente → indicativo presente). Al B1 il periodo ipotetico dell'irrealtà si usa per situazioni contrarie alla realtà presente: 'Se fossi ricco, comprerei una casa in Italia' (non sono ricco = condizione irreale).",
    table: {
      headers: ['Persona', 'essere (cong. imp.)', 'avere (cong. imp.)', 'fare (cong. imp.)', 'andare (cong. imp.)'],
      rows: [
        ['io', 'fossi', 'avessi', 'facessi', 'andassi'],
        ['tu', 'fossi', 'avessi', 'facessi', 'andassi'],
        ['lui/lei', 'fosse', 'avesse', 'facesse', 'andasse'],
        ['noi', 'fossimo', 'avessimo', 'facessimo', 'andassimo'],
        ['voi', 'foste', 'aveste', 'faceste', 'andaste'],
        ['loro', 'fossero', 'avessero', 'facessero', 'andassero'],
      ]
    },
    b1note: "Al A2 usi il periodo reale con l'indicativo: 'Se studio, imparo'. Al B1 parli di situazioni ipotetiche contrarie alla realtà: 'Se studiassi di più, imparerei più velocemente' (implica che non studi abbastanza). Questa struttura è essenziale per conversazioni complesse.",
    examples: [
      "Se avessi più soldi, farei un viaggio in Giappone. (condizione irreale nel presente/futuro)",
      "Se fossi te, parlerei con il direttore prima di dimettermi. (consiglio ipotetico — molto comune)",
      "Se sapessi cucinare, preparerei la cena ogni sera. (abilità che non si possiede)",
    ],
    fills: [
      { s: "Se ___ (avere) tempo, verrei al tuo concerto.", opts: ['avessi', 'ho', 'avrei', 'avrò'], a: 0, fb: "'Avessi' — congiuntivo imperfetto di avere. Dopo 'se' nel periodo ipotetico dell'irrealtà → congiuntivo imperfetto (mai condizionale)." },
      { s: "Se ___ (essere) più coraggioso, chiederei un aumento.", opts: ['fossi', 'sono', 'sarei', 'sarò'], a: 0, fb: "'Fossi' — congiuntivo imperfetto di essere (irregolare). La condizione contraria alla realtà presente: 'non sono coraggioso'." },
      { s: "Se parlassi meglio l'italiano, ___ (potere) lavorare in Italia.", opts: ['potrei', 'posso', 'potevo', 'potrò'], a: 0, fb: "'Potrei' — condizionale di potere. La conseguenza usa il condizionale presente: 'Se + cong. imperfetto → condizionale'." },
      { s: "Cosa ___ (fare) tu se ___ (vincere) alla lotteria?", opts: ['faresti / vincessi', 'fai / vinci', 'faresti / vinceresti', 'farai / vinci'], a: 0, fb: "'Faresti / vincessi' — condizionale nella principale, congiuntivo imperfetto dopo 'se'. 'Vincessi' da vincere (-ere → -essi)." },
      { s: "Se ___ (essere) in vacanza adesso, ___ (stare) in spiaggia.", opts: ['fossi / starei', 'sono / sto', 'fossi / stessi', 'sarei / starei'], a: 0, fb: "'Fossi / starei' — congiuntivo imperfetto dopo 'se' + condizionale nella principale. 'Fossi' (essere) e 'starei' (stare condiz.)." },
    ],
    transforms: [
      { prompt: "Trasforma in periodo ipotetico dell'irrealtà:", s: "Non ho la macchina. Non vado in montagna.", opts: ["Se avessi la macchina, andrei in montagna.", "Se ho la macchina, vado in montagna.", "Se avessi la macchina, andassi in montagna.", "Se avrò la macchina, andrò in montagna."], a: 0, fb: "'Se avessi la macchina, andrei' — condizione irreale (non ho la macchina) → cong. imperfetto + condizionale." },
      { prompt: "Dai un consiglio ipotetico:", s: "Al posto tuo, (parlare) con i genitori prima di decidere.", opts: ["Se fossi in te, parlerei con i genitori prima di decidere.", "Se sei te, parli con i genitori.", "Se ero te, parlavo con i genitori.", "Se sarei te, parlerei con i genitori."], a: 0, fb: "'Se fossi in te, parlerei' — formula fissa per dare consigli: 'Se fossi in te/al posto tuo' + condizionale." },
      { prompt: "Trasforma la condizione reale in irreale:", s: "Se studio ogni giorno, passo l'esame. (irreale: non studio abbastanza)", opts: ["Se studiassi ogni giorno, passerei l'esame.", "Se studiassi ogni giorno, passassi l'esame.", "Se studiavo ogni giorno, passerei l'esame.", "Se avessi studiato, passerei l'esame."], a: 0, fb: "'Se studiassi → passerei' — condizione reale (presente) diventa irreale: indicativo → congiuntivo imperfetto + condizionale." },
    ],
    errors: [
      { s: "Se avrei più tempo, studierei di più.", q: "¿Cuál es el error típico?", opts: ["'avrei' → 'avessi' (mai condizionale dopo 'se')", "'studierei' → 'studiassi'", "No hay error", "'se' → 'quando'"], a: 0, fb: "Regola fondamentale: MAI condizionale dopo 'se'. Corretto: 'Se avessi più tempo, studierei.' Sbagliato: ❌ 'Se avrei'." },
      { s: "Se fossi te, andrei a parlare con lui subito.", q: "¿Está bien formado este período?", opts: ["Sì, è perfettamente corretto", "No: 'fossi' → 'sei'", "No: 'andrei' → 'andassi'", "No: 'te' → 'tu'"], a: 0, fb: "Sì, corretto! 'Se fossi te' (cong. imperfetto) + 'andrei' (condizionale). Formula standard per consigli ipotetici." },
    ],
    production: "Scrivi 3-4 frasi usando il periodo ipotetico dell'irrealtà. Inizia con: 'Se fossi ricco/a...', 'Se potessi cambiare lavoro...', 'Se vivessi in Italia...'",
  },
  {
    id: 'pronomi_relativi', title: 'Pronomi Relativi', icon: '🔗',
    rule: "I pronomi relativi collegano due frasi. Principali: (1) CHE — soggetto o oggetto diretto; non cambia: 'Il libro che ho letto è bellissimo.' (2) CUI — usato dopo preposizioni: 'La città in cui vivo è Roma.' / 'Il motivo per cui sono venuto è...' (3) IL/LA QUALE, I/LE QUALI — più formale, concorda col nome: 'Il professore, il quale insegna matematica...' (4) DOVE — per i luoghi: 'La casa dove abito...'",
    tip: "CHE vs CUI: 'che' sostituisce il soggetto o oggetto diretto (senza preposizione). 'Cui' sostituisce un complemento indiretto (sempre con preposizione: a cui, di cui, con cui, in cui, per cui). 'Il ragazzo che conosco' (oggetto diretto = nessuna prep.) vs 'Il ragazzo di cui parlo' (complemento di specificazione = di + cui).",
    table: {
      headers: ['Pronome', 'Uso', 'Esempio'],
      rows: [
        ['che', 'soggetto o oggetto diretto', "La persona che conosco è gentile."],
        ['cui (+ prep.)', 'complemento indiretto', "La città in cui vivo è Roma."],
        ['di cui', 'specificazione / argomento', "Il libro di cui ti ho parlato è esaurito."],
        ['a cui', 'complemento di termine', "La persona a cui ho scritto non ha risposto."],
        ['il/la quale', 'formale / disambiguazione', "Il direttore, il quale ha firmato il contratto..."],
        ['dove', 'complemento di luogo', "La scuola dove ho studiato è chiusa."],
      ]
    },
    b1note: "Al A2 usi frasi semplici coordinate: 'Ho un amico. Lui abita a Roma.' Al B1 combini queste frasi elegantemente: 'Ho un amico che abita a Roma.' / 'Ho un amico con cui vado spesso al cinema.' I pronomi relativi rendono il tuo italiano molto più fluido e naturale.",
    examples: [
      "Il film che abbiamo visto ieri era davvero emozionante. (che = oggetto diretto di 'abbiamo visto')",
      "La collega con cui lavoro è molto competente. (con cui = complemento di compagnia, prep. + cui)",
      "Questo è il motivo per cui ho deciso di studiare italiano. (per cui = complemento di causa)",
    ],
    fills: [
      { s: "Il ristorante ___ mi hai consigliato è eccellente.", opts: ['che', 'cui', 'il quale', 'dove'], a: 0, fb: "'Che' — oggetto diretto di 'mi hai consigliato' (senza preposizione). 'Che' si usa quando il pronome relativo è soggetto o oggetto diretto." },
      { s: "La città in ___ sono nato si chiama Torino.", opts: ['cui', 'che', 'quale', 'dove'], a: 0, fb: "'Cui' — dopo preposizione (in + cui). 'In cui' sostituisce 'in Torino'. Con preposizione → sempre 'cui', non 'che'." },
      { s: "Non capisco il motivo per ___ si è arrabbiato.", opts: ['cui', 'che', 'il quale', 'dove'], a: 0, fb: "'Cui' — 'per cui' = per questo motivo. Indica causa. Struttura: per + cui. Non si può usare 'che' dopo una preposizione." },
      { s: "L'amica ___ lavoro abita a Milano.", opts: ['con cui', 'che', 'con la quale', 'dove'], a: 0, fb: "'Con cui' — complemento di compagnia (lavorare con qualcuno). 'Con cui' e 'con la quale' sono entrambi corretti, ma 'con cui' è più comune nel parlato." },
      { s: "La sala ___ teniamo le riunioni è al terzo piano.", opts: ['dove', 'che', 'cui', 'in cui'], a: 0, fb: "'Dove' o 'in cui' sono entrambi corretti per i luoghi. 'Dove' è più informale, 'in cui' è più formale. 'Che' non si usa per i luoghi senza preposizione." },
    ],
    transforms: [
      { prompt: "Unisci le due frasi con un pronome relativo:", s: "Ho visto un film. Il film era commovente.", opts: ["Ho visto un film che era commovente.", "Ho visto un film cui era commovente.", "Ho visto un film il quale era commovente.", "Ho visto un film dove era commovente."], a: 0, fb: "'Un film che era commovente' — 'che' è soggetto della frase relativa. Nota: 'il quale era commovente' è anche corretto ma meno comune." },
      { prompt: "Unisci con preposizione + pronome relativo:", s: "Conosco una persona. Lavoro con questa persona.", opts: ["Conosco una persona con cui lavoro.", "Conosco una persona che lavoro.", "Conosco una persona cui lavoro con.", "Conosco una persona con quale lavoro."], a: 0, fb: "'Con cui' — preposizione 'con' + 'cui'. Non si dice 'che' quando c'è una preposizione. 'Con quale' è sbagliato — deve essere 'con la quale'." },
      { prompt: "Trasforma usando 'il quale/la quale':", s: "Ho parlato con il professore che insegna italiano.", opts: ["Ho parlato con il professore il quale insegna italiano.", "Ho parlato con il professore cui insegna italiano.", "Ho parlato con il professore che insegna italiano.", "Ho parlato con il professore dove insegna italiano."], a: 0, fb: "'Il quale' — forma più formale di 'che' quando è soggetto. Concorda col genere e numero del nome: il professore → il quale." },
    ],
    errors: [
      { s: "La città che vivo è molto bella.", q: "¿Cuál es el error?", opts: ["'che' → 'in cui' o 'dove' (luogo → preposizione + cui)", "'che' → 'cui'", "No hay error", "'che' → 'la quale'"], a: 0, fb: "Con i luoghi occorre la preposizione: 'La città in cui vivo' o 'La città dove vivo'. 'Che' non si usa per luoghi quando la relazione è di luogo (in/a)." },
      { s: "Il libro di cui ti ho parlato ieri è esaurito.", q: "¿Está correcto?", opts: ["Sì, è corretto — 'di cui' = complemento di argomento", "No: 'di cui' → 'che'", "No: 'di cui' → 'del quale'", "No: 'di cui' → 'dove'"], a: 0, fb: "Sì, corretto! 'Di cui ti ho parlato' = del quale ti ho parlato. 'Di cui' è la forma standard, 'del quale' è più formale. Entrambi sono corretti." },
    ],
    production: "Scrivi 4 frasi usando pronomi relativi diversi: una con 'che' (soggetto), una con 'di cui', una con 'in cui' o 'dove', e una con una preposizione diversa + cui.",
  },
  {
    id: 'discorso_indiretto', title: 'Discorso Indiretto', icon: '💬',
    rule: "Il discorso indiretto riporta le parole di qualcuno. I principali cambiamenti: (1) Presente → Imperfetto: 'Sono stanco' → Ha detto che era stanco. (2) Passato prossimo → Trapassato: 'Ho mangiato' → Ha detto che aveva mangiato. (3) Futuro → Condizionale: 'Verrò' → Ha detto che sarebbe venuto. (4) Imperativo → di + infinito: 'Vieni!' → Gli ha detto di venire. (5) Domande: interrogative dirette → se + frase; interrogative con parola interrogativa → parola + frase.",
    tip: "Quando il verbo introduttivo è al passato (ha detto, mi ha chiesto, ecc.), i tempi verbali nel discorso indiretto si spostano indietro nel tempo (la 'concordanza dei tempi'). Se il verbo è al presente (dice, mi chiede), i tempi possono rimanere invariati.",
    table: {
      headers: ['Discorso diretto', 'Discorso indiretto (verbo introduttivo al passato)'],
      rows: [
        ['Presente: "Sono stanco"', 'Imperfetto: Ha detto che era stanco'],
        ['Passato prossimo: "Ho mangiato"', 'Trapassato: Ha detto che aveva mangiato'],
        ['Futuro: "Verrò"', 'Condizionale: Ha detto che sarebbe venuto'],
        ['Imperativo: "Vieni!"', 'di + infinito: Gli ha detto di venire'],
        ['Domanda sì/no: "Hai fame?"', 'se: Mi ha chiesto se avevo fame'],
        ['Domanda aperta: "Dove vai?"', 'parola interrogativa: Mi ha chiesto dove andavo'],
      ]
    },
    b1note: "Il discorso indiretto è essenziale per raccontare conversazioni: 'Sai cosa mi ha detto Maria? Ha detto che non veniva alla festa perché si sentiva male.' È uno degli elementi che distinguono un italiano B1 da un A2 — ti permette di raccontare storie in modo molto più ricco.",
    examples: [
      "Marco: 'Sono molto stanco.' → Marco ha detto che era molto stanco. (presente → imperfetto)",
      "Lei: 'Verrò domani.' → Ha detto che sarebbe venuta il giorno dopo. (futuro → condizionale)",
      "Il professore: 'Studiate per l'esame!' → Il professore ci ha detto di studiare per l'esame. (imperativo → di + inf.)",
    ],
    fills: [
      { s: "Maria ha detto: 'Sono stanca.' → Maria ha detto che ___ stanca.", opts: ['era', 'è', 'fosse', 'sarà'], a: 0, fb: "'Era' — discorso indiretto con verbo al passato: presente 'sono' → imperfetto 'era'." },
      { s: "Luigi ha detto: 'Verrò alla festa.' → Ha detto che ___ alla festa.", opts: ['sarebbe venuto', 'verrà', 'viene', 'venisse'], a: 0, fb: "'Sarebbe venuto' — futuro 'verrò' → condizionale passato 'sarebbe venuto' nel discorso indiretto al passato." },
      { s: "Il medico mi ha detto: 'Prendi queste medicine.' → Il medico mi ha detto ___ quelle medicine.", opts: ['di prendere', 'che prendo', 'prendi', 'di prendessi'], a: 0, fb: "'Di prendere' — imperativo → di + infinito nel discorso indiretto. 'Mi ha detto di + infinito' per riportare ordini o consigli." },
      { s: "Lei mi ha chiesto: 'Hai visto Marco?' → Mi ha chiesto ___ visto Marco.", opts: ['se avevo', 'se ho', 'che avevo', 'se avessi'], a: 0, fb: "'Se avevo' — domanda sì/no: 'se' + frase. Il tempo cambia: 'hai visto' (passato prossimo) → 'avevo visto' (trapassato) nel discorso indiretto." },
      { s: "Luca ha detto: 'Ho già finito il lavoro.' → Ha detto che ___ già ___ il lavoro.", opts: ['aveva / finito', 'ha / finito', 'avrebbe / finito', 'aveva / finire'], a: 0, fb: "'Aveva finito' — passato prossimo → trapassato prossimo nel discorso indiretto. 'Ho finito' → 'aveva finito'." },
    ],
    transforms: [
      { prompt: "Trasforma in discorso indiretto:", s: "Paolo: 'Non capisco niente.' → Paolo ha detto che...", opts: ["Paolo ha detto che non capiva niente.", "Paolo ha detto che non capisce niente.", "Paolo ha detto di non capire niente.", "Paolo ha detto che non avrebbe capito niente."], a: 0, fb: "'Non capiva niente' — presente 'capisco' → imperfetto 'capiva'. Verbo introduttivo al passato → concordanza dei tempi." },
      { prompt: "Trasforma la domanda in discorso indiretto:", s: "La professoressa: 'Dove abitate?' → La professoressa ci ha chiesto...", opts: ["La professoressa ci ha chiesto dove abitavamo.", "La professoressa ci ha chiesto dove abitiamo.", "La professoressa ci ha chiesto se abitavamo.", "La professoressa ci ha chiesto dove abitassimo."], a: 0, fb: "'Dove abitavamo' — domanda aperta con parola interrogativa: 'dove' rimane, il verbo passa a imperfetto." },
      { prompt: "Trasforma dal discorso indiretto al diretto:", s: "Ha detto che sarebbe partito il giorno dopo.", opts: ['"Partirò domani."', '"Partirei domani."', '"Sono partito domani."', '"Partivo domani."'], a: 0, fb: "'Partirò domani' — condizionale 'sarebbe partito' → futuro 'partirò'. 'Il giorno dopo' → 'domani' (riferimento temporale torna al presente)." },
    ],
    errors: [
      { s: "Mi ha chiesto che ore sono.", q: "¿Cuál es el error en el discorso indiretto?", opts: ["'che ore sono' → 'che ore fossero' o 'che ore erano'", "'che' → 'se'", "No hay error", "'che ore sono' → 'le ore'"], a: 0, fb: "Con domanda indiretta e verbo introduttivo al passato → il verbo cambia tempo: 'che ore sono' → 'che ore erano/fossero'. 'Sono' (presente) → 'erano' (imperfetto) nel discorso indiretto." },
      { s: "Il capo mi ha detto di finire il rapporto entro venerdì.", q: "¿Está correcto?", opts: ["Sì, è corretto — imperativo → 'di' + infinito", "No: 'di finire' → 'che finisca'", "No: 'di finire' → 'finire'", "No: 'di finire' → 'che finivo'"], a: 0, fb: "Sì, corretto! Imperativo 'Finisci il rapporto' → 'mi ha detto di finire'. La struttura 'dire di + infinito' è quella corretta per riportare ordini/richieste." },
    ],
    production: "Racconta una conversazione reale o immaginaria usando il discorso indiretto. Scrivi 4-5 frasi. Includi almeno: un'affermazione, una domanda e un ordine/consiglio riportato.",
  },
];

export default function GramaticaItalianoB1() {
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
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammatica · Italiano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          6 percorsi B1: congiuntivo, condizionale, particelle pronominali, periodo ipotetico, pronomi relativi y discorso indiretto. Tabelle, esempi, fill-in, trasformazioni e quest guidati.
        </p>

        <Link href="/practica/italiano/b1/particelle" style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '1.5rem' }}>
          <div style={{
            padding: '1rem 1.15rem',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0,146,70,0.08) 0%, transparent 100%)',
            border: '1.5px solid rgba(0,146,70,0.24)',
            borderLeft: '4px solid #009246',
            display: 'flex',
            gap: '0.9rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: '#009246', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#009246', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Percorso pronominale</div>
              <div style={{ fontWeight: 850, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.18rem' }}>Particelle pronominali: ci, ne, gli, le, vi</div>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                6 livelli progressivi per distinguere luogo, quantità, complemento indiretto e forme pronominali in contesto.
              </p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#009246', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800 }}>
              <span>48 esercizi</span>
              <span style={{ fontSize: '1rem' }}>→</span>
            </div>
          </div>
        </Link>

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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.b1note}
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Trova l&apos;errore</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
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
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>La tua produzione</div>
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
                ? 'Perfetto! Padroneggi questo argomento B1.'
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
              <Link href="/practica/italiano/b1" className="btn btn-ghost btn-sm">Tornare a B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
