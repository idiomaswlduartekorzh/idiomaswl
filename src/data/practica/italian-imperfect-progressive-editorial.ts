import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'La chiamata delle otto', instruction: 'Coniuga cenare all’imperfetto progressivo.', segments: ['Quando mi hai chiamato, noi ', ' sul balcone.'], entries: [['cenare', 'stavamo cenando']] },
  { title: 'Davanti al cinema', instruction: 'Coniuga aspettare all’imperfetto progressivo.', segments: ['Alle nove precise tu ', ' ancora davanti al cinema.'], entries: [['aspettare', 'stavi aspettando']] },
  { title: 'Il temporale', instruction: 'Coniuga rientrare all’imperfetto progressivo.', segments: ['Quando iniziò a grandinare, i ciclisti ', ' in paese.'], entries: [['rientrare', 'stavano rientrando']] },
  { title: 'La luce accesa', instruction: 'Coniuga studiare all’imperfetto progressivo.', segments: ['A mezzanotte Carla ', ' ancora per l’esame.'], entries: [['studiare', 'stava studiando']] },
  { title: 'Il messaggio interrotto', instruction: 'Coniuga scrivere all’imperfetto progressivo.', segments: ['Quando il telefono si spense, io ti ', ' un messaggio.'], entries: [['scrivere', 'stavo scrivendo']] },
  { title: 'In sala d’attesa', instruction: 'Coniuga compilare all’imperfetto progressivo.', segments: ['Quando arrivò l’infermiera, voi ', ' i moduli.'], entries: [['compilare', 'stavate compilando']] },
  { title: 'Il cantiere', instruction: 'Coniuga sollevare all’imperfetto progressivo.', segments: ['In quel momento la gru ', ' una trave molto pesante.'], entries: [['sollevare', 'stava sollevando']] },
  { title: 'La curva', instruction: 'Coniuga rallentare all’imperfetto progressivo.', segments: ['Poco prima dell’urto, l’autista ', ' per affrontare la curva.'], entries: [['rallentare', 'stava rallentando']] },
  { title: 'La prova', instruction: 'Coniuga provare all’imperfetto progressivo.', segments: ['Quando entrò il regista, gli attori ', ' la scena finale.'], entries: [['provare', 'stavano provando']] },
  { title: 'La fila', instruction: 'Coniuga comprare all’imperfetto progressivo.', segments: ['Ti ho visto mentre ', ' il biglietto alla cassa.'], entries: [['comprare', 'stavi comprando']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Il blackout durante la festa', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Gli invitati ', ' in salotto, Marta ', ' la torta e noi ', ' le candeline quando si spensero tutte le luci.'], entries: [['ballare', 'stavano ballando'], ['tagliare', 'stava tagliando'], ['accendere', 'stavamo accendendo']] },
  { title: 'La telefonata in stazione', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Io ', ' il tabellone, tu ', ' i biglietti e i bambini ', ' le valigie quando annunciarono il ritardo.'], entries: [['controllare', 'stavo controllando'], ['comprare', 'stavi comprando'], ['sorvegliare', 'stavano sorvegliando']] },
  { title: 'L’allarme nel laboratorio', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['La ricercatrice ', ' un campione, noi ', ' i risultati e il tecnico ', ' la pressione quando suonò l’allarme.'], entries: [['osservare', 'stava osservando'], ['confrontare', 'stavamo confrontando'], ['misurare', 'stava misurando']] },
  { title: 'La pioggia sulla partita', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Le squadre ', ' il secondo tempo, l’arbitro ', ' verso l’area e il pubblico ', ' quando cominciò a piovere.'], entries: [['giocare', 'stavano giocando'], ['correre', 'stava correndo'], ['cantare', 'stava cantando']] },
  { title: 'L’ospite inatteso', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Noi ', ' la tavola, Paolo ', ' il vino e Anna ', ' la musica quando bussarono alla porta.'], entries: [['apparecchiare', 'stavamo apparecchiando'], ['aprire', 'stava aprendo'], ['scegliere', 'stava scegliendo']] },
  { title: 'Il problema in diretta', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['La giornalista ', ' il risultato, i tecnici ', ' il collegamento e il cameraman ', ' l’inquadratura quando il segnale sparì.'], entries: [['commentare', 'stava commentando'], ['controllare', 'stavano controllando'], ['regolare', 'stava regolando']] },
  { title: 'Il rumore nel corridoio', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Voi ', ' il progetto, la docente ', ' una formula e io ', ' gli appunti quando sentimmo un forte rumore.'], entries: [['discutere', 'stavate discutendo'], ['spiegare', 'stava spiegando'], ['riordinare', 'stavo riordinando']] },
  { title: 'L’arrivo del temporale', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['I pescatori ', ' le reti, una barca ', ' nel porto e il guardiano ', ' le porte quando arrivò la prima raffica.'], entries: [['raccogliere', 'stavano raccogliendo'], ['entrare', 'stava entrando'], ['chiudere', 'stava chiudendo']] },
  { title: 'La caduta in cucina', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Io ', ' la pasta, mia sorella ', ' i piatti e i bambini ', ' l’acqua quando il vassoio cadde.'], entries: [['scolare', 'stavo scolando'], ['asciugare', 'stava asciugando'], ['versare', 'stavano versando']] },
  { title: 'La visita del direttore', instruction: 'Completa la scena all’imperfetto progressivo.', segments: ['Gli operai ', ' il motore, il caposquadra ', ' le istruzioni e noi ', ' gli attrezzi quando entrò il direttore.'], entries: [['smontare', 'stavano smontando'], ['leggere', 'stava leggendo'], ['preparare', 'stavamo preparando']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La porta che si aprì', pieces: [['Io ', 'stavo leggendo'], [' vicino alla finestra, Marta ', 'stavano dormendo'], [' e i bambini ', 'stavano disegnando']], after: ' quando la porta si aprì.', wrong: 1, answer: 'stava dormendo', reason: 'Marta es singular y exige stava dormendo' },
  { title: 'Il telefono cadde', pieces: [['Noi ', 'stavamo parlando'], [' con il cliente, tu ', 'stavi prendendo'], [' appunti e Luca ', 'stavano cercando']], after: ' il contratto quando il telefono cadde.', wrong: 2, answer: 'stava cercando', reason: 'Luca es singular y exige stava cercando' },
  { title: 'La sirena', pieces: [['Le guardie ', 'stava controllando'], [' l’ingresso, il custode ', 'stava chiudendo'], [' una sala e noi ', 'stavamo uscendo']], after: ' quando suonò la sirena.', wrong: 0, answer: 'stavano controllando', reason: 'le guardie exige stavano controllando' },
  { title: 'L’annuncio', pieces: [['Il treno ', 'stava rallentando'], [' mentre noi ', 'stava raccogliendo'], [' i bagagli e il controllore ', 'stava attraversando']], after: ' il vagone.', wrong: 1, answer: 'stavamo raccogliendo', reason: 'el sujeto noi exige stavamo raccogliendo' },
  { title: 'La campanella', pieces: [['La professoressa ', 'stava spiegando'], [' la regola, io ', 'stavo copiando'], [' l’esempio e voi ', 'stavamo ascoltando']], after: ' quando suonò la campanella.', wrong: 2, answer: 'stavate ascoltando', reason: 'el sujeto voi exige stavate ascoltando' },
  { title: 'Il vetro rotto', pieces: [['Tu ', 'stava lavando'], [' i bicchieri, io ', 'stavo asciugando'], [' i piatti e Marta ', 'stava riponendo']], after: ' le posate quando sentimmo il vetro rompersi.', wrong: 0, answer: 'stavi lavando', reason: 'el sujeto tu exige stavi lavando' },
  { title: 'La connessione', pieces: [['I tecnici ', 'stavano aggiornando'], [' il sistema, la direttrice ', 'stavano aspettando'], [' una risposta e noi ', 'stavamo provando']], after: ' a collegarci.', wrong: 1, answer: 'stava aspettando', reason: 'la direttrice es singular y exige stava aspettando' },
  { title: 'La foto', pieces: [['Marta ', 'stava indicando'], [' il panorama, noi ', 'stavamo guardando'], [' il lago e tu ', 'stavamo scattando']], after: ' una foto.', wrong: 2, answer: 'stavi scattando', reason: 'el sujeto tu exige stavi scattando' },
  { title: 'L’arbitro fischiò', pieces: [['I giocatori ', 'stava tornando'], [' a centrocampo, l’allenatore ', 'stava dando'], [' istruzioni e il pubblico ', 'stava protestando']], after: ' quando l’arbitro fischiò.', wrong: 0, answer: 'stavano tornando', reason: 'i giocatori exige stavano tornando' },
  { title: 'La visita inattesa', pieces: [['Io ', 'stavo sistemando'], [' la scrivania, voi ', 'stava riordinando'], [' l’archivio e Sara ', 'stava stampando']], after: ' i documenti quando arrivò il cliente.', wrong: 1, answer: 'stavate riordinando', reason: 'el sujeto voi exige stavate riordinando' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Io stavo aprendo il file', 'lo stavo correggendo', 'lo stavo inviando al cliente'], target: 0 },
  { events: ['Gli operai stavano scaricando i materiali', 'stavano montando la struttura', 'stavano fissando il tetto'], target: 1 },
  { events: ['Marta stava pesando la farina', 'stava impastando', 'stava formando i panini'], target: 2 },
  { events: ['Noi stavamo scegliendo il percorso', 'stavamo comprando i biglietti', 'stavamo preparando gli zaini'], target: 0 },
  { events: ['Il medico stava leggendo gli esami', 'stava visitando il paziente', 'stava compilando il referto'], target: 1 },
  { events: ['Voi stavate raccogliendo le risposte', 'stavate creando il grafico', 'stavate preparando la presentazione'], target: 2 },
  { events: ['Il custode stava spegnendo le luci', 'stava controllando le porte', 'stava attivando l’allarme'], target: 0 },
  { events: ['Io stavo lavando le verdure', 'le stavo tagliando', 'le stavo mettendo in pentola'], target: 1 },
  { events: ['I musicisti stavano accordando gli strumenti', 'stavano provando il brano', 'stavano salutando il pubblico'], target: 2 },
  { events: ['Tu stavi cercando l’indirizzo', 'stavi prendendo l’autobus', 'stavi raggiungendo lo studio'], target: 0 },
]

export const ITALIAN_IMPERFECT_PROGRESSIVE_EDITORIAL = createItalianEditorialPack({
  slug: 'imperfect-progressive',
  tense: 'imperfetto-progressivo',
  focus: 'Imperfetto progressivo',
  rule: 'Stare all’imperfetto più gerundio mette a fuoco un processo in corso in un punto del passato.',
  micro,
  long,
  errors,
  sequences,
})
