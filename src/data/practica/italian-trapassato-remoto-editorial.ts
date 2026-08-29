import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'Il portone del castello', instruction: 'Coniuga chiudere al trapassato remoto.', segments: ['Non appena il custode ', ' il portone, udì bussare.'], entries: [['chiudere', 'ebbe chiuso']] },
  { title: 'La sala del consiglio', instruction: 'Coniuga entrare al trapassato remoto.', segments: ['Dopo che i ministri ', ', il re prese la parola.'], entries: [['entrare', 'furono entrati']] },
  { title: 'La risposta inattesa', instruction: 'Coniuga leggere al trapassato remoto.', segments: ['Appena tu ', ' la risposta, impallidisti.'], entries: [['leggere', 'avesti letto']] },
  { title: 'Il dispaccio', instruction: 'Coniuga ricevere al trapassato remoto.', segments: ['Quando io ', ' il dispaccio, partii per la capitale.'], entries: [['ricevere', 'ebbi ricevuto']] },
  { title: 'Oltre il fiume', instruction: 'Coniuga attraversare al trapassato remoto.', segments: ['Non appena i cavalieri ', ' il fiume, smontarono da cavallo.'], entries: [['attraversare', 'ebbero attraversato']] },
  { title: 'La partenza di Marta', instruction: 'Coniuga partire al trapassato remoto.', segments: ['Dopo che Marta ', ', la casa cadde nel silenzio.'], entries: [['partire', 'fu partita']] },
  { title: 'L’ultima firma', instruction: 'Coniuga firmare al trapassato remoto.', segments: ['Appena noi ', ' l’accordo, le campane suonarono.'], entries: [['firmare', 'avemmo firmato']] },
  { title: 'Fuori dal teatro', instruction: 'Coniuga uscire al trapassato remoto.', segments: ['Quando voi ', ' dal teatro, cominciò a piovere.'], entries: [['uscire', 'foste usciti']] },
  { title: 'Il segnale', instruction: 'Coniuga accendere al trapassato remoto.', segments: ['Non appena la guardia ', ' la lanterna, la nave rispose.'], entries: [['accendere', 'ebbe acceso']] },
  { title: 'Le ultime provviste', instruction: 'Coniuga caricare al trapassato remoto.', segments: ['Dopo che i marinai ', ' le provviste, il capitano ordinò la partenza.'], entries: [['caricare', 'ebbero caricato']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Il decreto reale', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Non appena il re ', ' il decreto, lo consegnò al cancelliere. Dopo che il cancelliere ', ' il documento, chiamò il messaggero. Quando il messaggero ', ', il cortile tornò silenzioso.'], entries: [['firmare', 'ebbe firmato'], ['sigillare', 'ebbe sigillato'], ['partire', 'fu partito']] },
  { title: 'L’arrivo degli ambasciatori', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Dopo che gli ambasciatori ', ' nel cortile, le guardie li accolsero. Non appena ', ' le armi, furono ammessi nel palazzo. Quando ', ' nella sala del trono, il re si alzò.'], entries: [['entrare', 'furono entrati'], ['consegnare', 'ebbero consegnato'], ['salire', 'furono saliti']] },
  { title: 'La fuga dalla torre', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Appena la prigioniera ', ' la corda, la fissò alla finestra. Dopo che si ', ' nel cortile, corse verso le mura. Quando si ', ' nel bosco, le guardie persero le sue tracce.'], entries: [['legare', 'ebbe legato'], ['calare', 'fu calata'], ['nascondere', 'fu nascosta']] },
  { title: 'Il ponte levatoio', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Quando i soldati ', ' il fossato, raggiunsero la porta. Dopo che le guardie ', ' il ponte, suonarono l’allarme. Non appena il comandante ', ' le porte, la fortezza rimase isolata.'], entries: [['attraversare', 'ebbero attraversato'], ['alzare', 'ebbero alzato'], ['chiudere', 'ebbe chiuso']] },
  { title: 'La lettera segreta', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Non appena io ', ' la lettera, ne compresi il pericolo. Dopo che la ', ' nel camino, controllai le ceneri. Quando ', ' la stanza, nessuno mi vide.'], entries: [['leggere', 'ebbi letto'], ['gettare', 'ebbi gettata'], ['lasciare', 'ebbi lasciato']] },
  { title: 'Il banchetto concluso', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Dopo che gli ospiti ', ' il dolce, i servi tolsero i piatti. Non appena si ', ' dal tavolo, l’orchestra iniziò a suonare. Quando si ', ' nel salone, il duca fece il suo annuncio.'], entries: [['finire', 'ebbero finito'], ['alzarsi', 'furono alzati'], ['riunirsi', 'furono riuniti']] },
  { title: 'La nave nella nebbia', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Appena i marinai ', ' le vele, il vento spinse la nave. Dopo che essa ', ' il promontorio, il faro scomparve. Quando ', ' nella nebbia, il capitano ordinò il silenzio.'], entries: [['issare', 'ebbero issato'], ['superare', 'ebbe superato'], ['scomparire', 'fu scomparsa']] },
  { title: 'Il verdetto', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Quando i giudici ', ' le prove, sospesero la seduta. Dopo che ', ' in aula, il pubblico tacque. Non appena il presidente ', ' la sentenza, l’imputato abbassò lo sguardo.'], entries: [['esaminare', 'ebbero esaminato'], ['tornare', 'furono tornati'], ['pronunciare', 'ebbe pronunciato']] },
  { title: 'La porta nella montagna', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Non appena Marta ', ' la chiave, chiamò i compagni. Dopo che la ', ' nella serratura, sentì un rumore. Quando la porta si ', ', apparve una scala.'], entries: [['trovare', 'ebbe trovato'], ['inserire', 'ebbe inserita'], ['aprirsi', 'fu aperta']] },
  { title: 'La ritirata', instruction: 'Completa le tre anteriorità al trapassato remoto.', segments: ['Dopo che l’esercito ', ' le provviste, il generale convocò gli ufficiali. Non appena ', ' il campo, le sentinelle partirono. Quando si ', ' verso nord, il nemico occupò la valle.'], entries: [['consumare', 'ebbe consumato'], ['smontare', 'ebbe smontato'], ['ritirarsi', 'fu ritirato']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'Il messaggio cifrato', pieces: [['Appena la spia ', 'ebbe ricevuto'], [' il foglio, lo aprì. Dopo che lo ', 'aveva decifrato'], [', memorizzò il testo. Non appena lo ', 'ebbe bruciato']], after: ', fuggì.', wrong: 1, answer: 'ebbe decifrato', reason: 'la subordinada temporal inmediata exige ebbe decifrato' },
  { title: 'Il portone', pieces: [['Dopo che noi ', 'fummo entrati'], [' nel cortile, le guardie ci fermarono. Quando ', 'avemmo salutato'], [', ci lasciarono passare. Non appena voi ', 'siete saliti']], after: ' alla torre, il portone si chiuse.', wrong: 2, answer: 'foste saliti', reason: 'el sujeto voi y la subordinada literaria exigen foste saliti' },
  { title: 'La proclamazione', pieces: [['Dopo che il re ', 'aveva firmato'], [' il testo, lo consegnò al cancelliere. Quando questi lo ', 'ebbe letto'], [', si affacciò al balcone. Non appena la folla ', 'ebbe acclamato']], after: ' il sovrano, suonarono le campane.', wrong: 0, answer: 'ebbe firmato', reason: 'la primera subordinada temporal exige ebbe firmato' },
  { title: 'Il cofanetto', pieces: [['Appena Marta ', 'ebbe trovato'], [' la chiave, chiamò Paolo. Dopo che la ', 'aveva inserita'], [', udì uno scatto. Quando il coperchio si ', 'fu aperto']], after: ', apparve la collana.', wrong: 1, answer: 'ebbe inserita', reason: 'la segunda anterioridad inmediata exige ebbe inserita' },
  { title: 'La partenza', pieces: [['Dopo che i marinai ', 'ebbero caricato'], [' i barili, chiusero la stiva. Quando ', 'ebbero sciolto'], [' le corde, il capitano salutò il porto. Non appena la nave ', 'è partita']], after: ', si alzò il vento.', wrong: 2, answer: 'fu partita', reason: 'la última subordinada literaria exige fu partita' },
  { title: 'Il discorso', pieces: [['Dopo che io ', 'avevo terminato'], [' il discorso, tornai al mio posto. Quando il pubblico ', 'ebbe applaudito'], [', il presidente si alzò. Non appena ', 'ebbe preso']], after: ' la parola, l’aula tacque.', wrong: 0, answer: 'ebbi terminato', reason: 'el sujeto io y la subordinada temporal exigen ebbi terminato' },
  { title: 'La liberazione', pieces: [['Quando i soldati ', 'ebbero aperto'], [' la cella, gettarono le chiavi. Dopo che i prigionieri ', 'erano usciti'], [', le guardie fuggirono. Non appena tutti ', 'ebbero raggiunto']], after: ' il cortile, il cancello si chiuse.', wrong: 1, answer: 'furono usciti', reason: 'la subordinada literaria de uscire exige furono usciti' },
  { title: 'L’ordine del capitano', pieces: [['Dopo che il capitano ', 'ebbe consultato'], [' la mappa, diede l’ordine. Quando noi ', 'avemmo cambiato'], [' rotta, il vento aumentò. Non appena voi ', 'avete avvisato']], after: ' l’equipaggio, tutti salirono sul ponte.', wrong: 2, answer: 'aveste avvisato', reason: 'el sujeto voi exige aveste avvisato' },
  { title: 'La torre', pieces: [['Dopo che le guardie ', 'avevano acceso'], [' le torce, salirono sulle mura. Quando ', 'ebbero chiuso'], [' il portone, il cortile si svuotò. Non appena il comandante ', 'ebbe dato']], after: ' il segnale, gli arcieri si prepararono.', wrong: 0, answer: 'ebbero acceso', reason: 'la primera subordinada inmediata exige ebbero acceso' },
  { title: 'Il ponte', pieces: [['Appena tu ', 'avesti attraversato'], [' il ponte, prendesti la torcia. Dopo che lo ', 'avevi distrutto'], [', raggiungesti il bosco. Quando i nemici ', 'furono rimasti']], after: ' sull’altra riva, ordinasti la ritirata.', wrong: 1, answer: 'avesti distrutto', reason: 'la segunda subordinada inmediata exige avesti distrutto' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Dopo che il re ebbe letto il dispaccio, convocò i ministri', 'Quando ebbe ascoltato i consiglieri, prese una decisione', 'Non appena ebbe ordinato la partenza, il messaggero corse alle scuderie'], target: 0 },
  { events: ['Dopo che i soldati ebbero attraversato il fiume, cercarono un’altura', 'Quando ebbero montato il campo, accesero i fuochi', 'Non appena ebbero posto le sentinelle, il comandante si ritirò'], target: 1 },
  { events: ['Appena Marta ebbe aperto il cofanetto, vide la collana', 'Dopo che ebbe preso il gioiello, lesse il biglietto', 'Quando ebbe richiuso il coperchio, lasciò la stanza'], target: 2 },
  { events: ['Dopo che noi avemmo ricevuto il segnale, salimmo a bordo', 'Quando avemmo sciolto le corde, la corrente ci spinse', 'Non appena fummo partiti dal molo, il faro si spense'], target: 0 },
  { events: ['Dopo che il giudice ebbe letto le prove, chiamò il testimone', 'Quando ebbe ascoltato la deposizione, sospese la seduta', 'Non appena ebbe pronunciato la sentenza, l’aula si svuotò'], target: 1 },
  { events: ['Dopo che gli ospiti furono entrati, le porte si chiusero', 'Quando ebbero consegnato i mantelli, seguirono il servo', 'Non appena furono saliti nella sala, l’orchestra iniziò'], target: 2 },
  { events: ['Appena io ebbi trovato il passaggio, chiamai gli altri', 'Dopo che ebbi acceso la torcia, scesi i primi gradini', 'Quando fui entrato nella grotta, udii scorrere l’acqua'], target: 0 },
  { events: ['Dopo che voi aveste chiuso le finestre, spegneste le lampade', 'Quando aveste controllato il corridoio, chiamaste la guardia', 'Non appena foste usciti dal palazzo, il portone si chiuse'], target: 1 },
  { events: ['Appena il messaggero ebbe sellato il cavallo, prese il mantello', 'Dopo che ebbe ricevuto la lettera, la nascose nella borsa', 'Quando fu partito verso nord, cominciò a nevicare'], target: 2 },
  { events: ['Dopo che i marinai ebbero caricato le casse, chiusero la stiva', 'Quando ebbero alzato le vele, il capitano diede la rotta', 'Non appena furono usciti dal porto, il vento cambiò'], target: 0 },
]

export const ITALIAN_TRAPASSATO_REMOTO_EDITORIAL = createItalianEditorialPack({
  slug: 'remote-pluperfect',
  tense: 'trapassato-remoto',
  focus: 'Trapassato remoto',
  rule: 'El trapassato remoto marca, en narración literaria, una acción inmediatamente anterior a otra en passato remoto.',
  micro,
  long,
  errors,
  sequences,
})
