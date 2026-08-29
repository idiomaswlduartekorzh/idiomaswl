import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'La città antica', instruction: 'Coniuga fondare al passato remoto.', segments: ['Secondo la cronaca, i coloni ', ' la città sulla collina.'], entries: [['fondare', 'fondarono']] },
  { title: 'La lettera del poeta', instruction: 'Coniuga scrivere al passato remoto.', segments: ['Nel 1819 il poeta ', ' una lettera decisiva al suo editore.'], entries: [['scrivere', 'scrisse']] },
  { title: 'La vetta', instruction: 'Coniuga salire al passato remoto.', segments: ['L’esploratrice ', ' sulla vetta prima del tramonto.'], entries: [['salire', 'salì']] },
  { title: 'Il manoscritto', instruction: 'Coniuga scoprire al passato remoto.', segments: ['Durante il restauro loro ', ' un manoscritto nascosto.'], entries: [['scoprire', 'scoprirono']] },
  { title: 'La risposta del giudice', instruction: 'Coniuga decidere al passato remoto.', segments: ['Dopo un lungo silenzio il giudice ', ' di riaprire il caso.'], entries: [['decidere', 'decise']] },
  { title: 'La fuga nel bosco', instruction: 'Coniuga fuggire al passato remoto.', segments: ['Il prigioniero ', ' nel bosco e nessuno lo vide più.'], entries: [['fuggire', 'fuggì']] },
  { title: 'La prima pietra', instruction: 'Coniuga porre al passato remoto.', segments: ['Il sindaco ', ' la prima pietra del teatro nel 1902.'], entries: [['porre', 'pose']] },
  { title: 'La finale', instruction: 'Coniuga vincere al passato remoto.', segments: ['Contro ogni previsione la squadra ', ' il torneo.'], entries: [['vincere', 'vinse']] },
  { title: 'La scienziata', instruction: 'Coniuga nascere al passato remoto.', segments: ['La scienziata ', ' a Padova nel 1646.'], entries: [['nascere', 'nacque']] },
  { title: 'Il faro', instruction: 'Coniuga spegnersi al passato remoto.', segments: ['A mezzanotte il faro si ', ' e la costa scomparve nel buio.'], entries: [['spegnersi', 'spense']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Il messaggero del re', instruction: 'Completa il racconto al passato remoto.', segments: ['Il messaggero ', ' al castello all’alba. Le guardie lo ', ' nella sala grande e il re ', ' il sigillo senza parlare.'], entries: [['giungere', 'giunse'], ['condurre', 'condussero'], ['rompere', 'ruppe']] },
  { title: 'La spedizione del 1872', instruction: 'Completa la cronaca al passato remoto.', segments: ['La nave ', ' da Genova in aprile, ', ' una violenta tempesta e infine ', ' nel porto di Alessandria.'], entries: [['partire', 'partì'], ['superare', 'superò'], ['arrivare', 'arrivò']] },
  { title: 'Il quadro scomparso', instruction: 'Completa il racconto al passato remoto.', segments: ['Il custode ', ' la sala vuota, ', ' subito il direttore e la polizia ', ' le porte del museo.'], entries: [['trovare', 'trovò'], ['avvertire', 'avvertì'], ['chiudere', 'chiuse']] },
  { title: 'La scelta della principessa', instruction: 'Completa il racconto al passato remoto.', segments: ['La principessa ', ' la proposta, ', ' il palazzo quella notte e ', ' rifugio presso una famiglia di contadini.'], entries: [['rifiutare', 'rifiutò'], ['lasciare', 'lasciò'], ['cercare', 'cercò']] },
  { title: 'L’invenzione dimenticata', instruction: 'Completa la biografia al passato remoto.', segments: ['Nel suo laboratorio Bassi ', ' un nuovo apparecchio, ne ', ' il funzionamento e poi lo ', ' all’accademia.'], entries: [['costruire', 'costruì'], ['descrivere', 'descrisse'], ['presentare', 'presentò']] },
  { title: 'La rivolta del porto', instruction: 'Completa la cronaca al passato remoto.', segments: ['I lavoratori ', ' il cancello, ', ' la piazza e ', ' un accordo prima di sera.'], entries: [['aprire', 'aprirono'], ['occupare', 'occuparono'], ['ottenere', 'ottennero']] },
  { title: 'Il viandante e il ponte', instruction: 'Completa il racconto al passato remoto.', segments: ['Il viandante ', ' al fiume, ', ' una barca abbandonata e la ', ' per raggiungere l’altra riva.'], entries: [['scendere', 'scese'], ['vedere', 'vide'], ['usare', 'usò']] },
  { title: 'La prima rappresentazione', instruction: 'Completa la cronaca al passato remoto.', segments: ['Il sipario si ', ', l’orchestra ', ' le prime note e il pubblico ', ' in silenzio per due ore.'], entries: [['alzarsi', 'alzò'], ['suonare', 'suonò'], ['rimanere', 'rimase']] },
  { title: 'La piena del 1910', instruction: 'Completa la cronaca al passato remoto.', segments: ['Il fiume ', ' gli argini, l’acqua ', ' le case basse e molte famiglie ', ' verso la collina.'], entries: [['rompere', 'ruppe'], ['invadere', 'invase'], ['fuggire', 'fuggirono']] },
  { title: 'L’ultima pagina', instruction: 'Completa il racconto al passato remoto.', segments: ['La scrittrice ', ' l’ultima pagina, ', ' il manoscritto in una busta e lo ', ' all’editore.'], entries: [['finire', 'finì'], ['mettere', 'mise'], ['spedire', 'spedì']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'L’ambasciatore', pieces: [['L’ambasciatore ', 'entrò'], [' nella sala, ', 'salutò'], [' i presenti e poi ', 'leggi']], after: ' il messaggio del re.', wrong: 2, answer: 'lesse', reason: 'el passato remoto irregular de leggere es lesse' },
  { title: 'La battaglia', pieces: [['All’alba l’esercito ', 'avanzava'], [' verso il ponte, ', 'respinse'], [' l’attacco e ', 'occupò']], after: ' la fortezza.', wrong: 0, answer: 'avanzò', reason: 'la secuencia de hechos cerrados exige avanzò' },
  { title: 'Il processo', pieces: [['Il giudice ', 'ascoltò'], [' i testimoni, poi ', 'prendette'], [' una decisione e la ', 'comunicò']], after: ' alla corte.', wrong: 1, answer: 'prese', reason: 'el passato remoto irregular de prendere es prese' },
  { title: 'La porta segreta', pieces: [['Marta ', 'scoprì'], [' una leva, la ', 'tirò'], [' e la parete si ', 'apriva']], after: ' lentamente.', wrong: 2, answer: 'aprì', reason: 'el evento que hace avanzar el relato exige aprì' },
  { title: 'La nuova legge', pieces: [['Il parlamento ', 'approvava'], [' la legge, il presidente la ', 'firmò'], [' e il testo ', 'entrò']], after: ' in vigore.', wrong: 0, answer: 'approvò', reason: 'la cronología cerrada exige approvò' },
  { title: 'Il naufrago', pieces: [['Il naufrago ', 'raggiunse'], [' la spiaggia, ', 'beveva'], [' dell’acqua e ', 'costruì']], after: ' un riparo.', wrong: 1, answer: 'bevve', reason: 'la acción puntual y concluida exige bevve' },
  { title: 'La scoperta', pieces: [['I ricercatori ', 'analizzarono'], [' il campione, ne ', 'riconobbero'], [' l’origine e ', 'scrivevano']], after: ' subito un rapporto.', wrong: 2, answer: 'scrissero', reason: 'la acción concluida de la secuencia exige scrissero' },
  { title: 'Il duello', pieces: [['Il cavaliere ', 'estraeva'], [' la spada, ', 'fece'], [' un passo avanti e ', 'sfidò']], after: ' il rivale.', wrong: 0, answer: 'estrasse', reason: 'el hecho puntual exige el passato remoto estrasse' },
  { title: 'La spedizione polare', pieces: [['Gli esploratori ', 'lasciarono'], [' il campo, ', 'camminavano'], [' per tre giorni e infine ', 'raggiunsero']], after: ' la costa.', wrong: 1, answer: 'camminarono', reason: 'la secuencia cerrada presenta la marcha como un hecho completo y exige camminarono' },
  { title: 'La sentenza', pieces: [['La giuria ', 'tornò'], [' in aula, il presidente ', 'pronunciò'], [' la sentenza e tutti ', 'rimanevano']], after: ' immobili.', wrong: 2, answer: 'rimasero', reason: 'la reacción cerrada de la escena exige rimasero' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Il re aprì la lettera', 'ne lesse il contenuto', 'convocò il consiglio'], target: 0 },
  { events: ['La nave lasciò il porto', 'attraversò lo stretto', 'raggiunse l’isola'], target: 1 },
  { events: ['Il ladro forzò la finestra', 'prese il dipinto', 'fuggì dal giardino'], target: 2 },
  { events: ['La studiosa trovò il codice', 'lo tradusse', 'pubblicò la scoperta'], target: 0 },
  { events: ['I soldati montarono il campo', 'accesero i fuochi', 'posero le sentinelle'], target: 1 },
  { events: ['Il sindaco salì sul palco', 'pronunciò il discorso', 'inaugurò il ponte'], target: 2 },
  { events: ['La ragazza udì un rumore', 'aprì la porta', 'vide lo sconosciuto'], target: 0 },
  { events: ['Gli operai tolsero le macerie', 'liberarono il passaggio', 'riaprirono la strada'], target: 1 },
  { events: ['Il compositore scrisse la partitura', 'la consegnò al teatro', 'diresse la prima'], target: 2 },
  { events: ['L’esploratore osservò le stelle', 'tracciò la rotta', 'ordinò la partenza'], target: 0 },
]

export const ITALIAN_PASSATO_REMOTO_EDITORIAL = createItalianEditorialPack({
  slug: 'remote-past',
  tense: 'passato-remoto',
  focus: 'Passato remoto',
  rule: 'El passato remoto encadena hechos cerrados en una época histórica o en una narración literaria.',
  micro,
  long,
  errors,
  sequences,
})
