import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'La ricevuta', instruction: 'Coniuga conservare all’imperativo, tu.', segments: ['Marco, ', ' la ricevuta fino a domani.'], entries: [['conservare', 'conserva']] },
  { title: 'La sala silenziosa', instruction: 'Coniuga parlare all’imperativo negativo, voi.', segments: ['Ragazzi, non ', ' durante la registrazione.'], entries: [['parlare', 'parlate']] },
  { title: 'Alla reception', instruction: 'Coniuga attendere all’imperativo formale, Lei.', segments: ['Signora, ', ' qui un momento.'], entries: [['attendere', 'attenda']] },
  { title: 'Il pulsante rosso', instruction: 'Coniuga premere all’imperativo negativo, tu.', segments: ['Non ', ' il pulsante rosso.'], entries: [['premere', 'premere']] },
  { title: 'La strada del porto', instruction: 'Coniuga proseguire all’imperativo, voi.', segments: ['Dopo il ponte, ', ' fino alla rotonda.'], entries: [['proseguire', 'proseguite']] },
  { title: 'Una notizia importante', instruction: 'Coniuga dire con pronome all’imperativo, tu.', segments: ['Paolo, ', ' subito la verità.'], entries: [['dire', 'dimmi']] },
  { title: 'Il documento', instruction: 'Coniuga firmare all’imperativo formale, Lei.', segments: ['Dottore, ', ' in fondo alla pagina.'], entries: [['firmare', 'firmi']] },
  { title: 'La partenza', instruction: 'Coniuga andare all’imperativo esortativo, noi.', segments: ['È tardi: ', ' alla stazione.'], entries: [['andare', 'andiamo']] },
  { title: 'Le scale bagnate', instruction: 'Coniuga correre all’imperativo negativo, voi.', segments: ['Bambini, non ', ' sulle scale bagnate.'], entries: [['correre', 'correte']] },
  { title: 'La finestra', instruction: 'Coniuga aprire all’imperativo, tu.', segments: ['Giulia, ', ' la finestra per favore.'], entries: [['aprire', 'apri']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Una pasta semplice', instruction: 'Completa le istruzioni rivolte a tu.', segments: ['Prima ', ' l’acqua sul fuoco. Poi ', ' la pasta e alla fine ', ' il sugo caldo.'], entries: [['mettere', 'metti'], ['aggiungere', 'aggiungi'], ['versare', 'versa']] },
  { title: 'L’ingresso al museo', instruction: 'Completa le istruzioni rivolte a voi.', segments: ['Prima ', ' i biglietti alla guida. Poi ', ' gli zaini negli armadietti e non ', ' le opere.'], entries: [['mostrare', 'mostrate'], ['lasciare', 'lasciate'], ['toccare', 'toccate']] },
  { title: 'La procedura di sicurezza', instruction: 'Completa le istruzioni formali rivolte a Lei.', segments: ['Signora, ', ' il macchinario, ', ' la leva blu e ', ' l’uscita laterale.'], entries: [['spegnere', 'spenga'], ['abbassare', 'abbassi'], ['raggiungere', 'raggiunga']] },
  { title: 'Il percorso per la stazione', instruction: 'Completa le indicazioni rivolte a voi.', segments: ['Al semaforo ', ' a sinistra, ', ' il ponte e poi ', ' la seconda uscita.'], entries: [['girare', 'girate'], ['attraversare', 'attraversate'], ['prendere', 'prendete']] },
  { title: 'Prepariamo la riunione', instruction: 'Completa le esortazioni rivolte a noi.', segments: ['Prima ', ' i dati, poi ', ' le priorità e infine ', ' il documento.'], entries: [['controllare', 'controlliamo'], ['discutere', 'discutiamo'], ['firmare', 'firmiamo']] },
  { title: 'Il modulo online', instruction: 'Completa le istruzioni rivolte a tu.', segments: ['Prima ', ' i tuoi dati, poi ', ' il documento e non ', ' la pagina prima della conferma.'], entries: [['inserire', 'inserisci'], ['caricare', 'carica'], ['chiudere', 'chiudere']] },
  { title: 'Una telefonata formale', instruction: 'Completa le richieste formali rivolte a Lei.', segments: ['Direttore, ', ' il cliente, gli ', ' la modifica e ci ', ' la risposta.'], entries: [['chiamare', 'chiami'], ['spiegare', 'spieghi'], ['comunicare', 'comunichi']] },
  { title: 'Prima della partenza', instruction: 'Completa le istruzioni rivolte a voi.', segments: ['Ragazzi, ', ' i documenti, ', ' le valigie e non ', ' i biglietti.'], entries: [['controllare', 'controllate'], ['pesare', 'pesate'], ['dimenticare', 'dimenticate']] },
  { title: 'La stanza in ordine', instruction: 'Completa le istruzioni rivolte a tu.', segments: ['Paolo, ', ' i libri, ', ' la scrivania e ', ' la luce prima di uscire.'], entries: [['riporre', 'riponi'], ['pulire', 'pulisci'], ['spegnere', 'spegni']] },
  { title: 'Il primo soccorso', instruction: 'Completa le istruzioni rivolte a voi.', segments: ['Prima ', ' il numero di emergenza, poi ', ' la persona al caldo e non le ', ' da bere.'], entries: [['chiamare', 'chiamate'], ['tenere', 'tenete'], ['dare', 'date']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La ricetta per Luca', pieces: [['Luca, ', 'tagliate'], [' le verdure, ', 'aggiungi'], [' l’olio e ', 'mescola']], after: ' bene.', wrong: 0, answer: 'taglia', reason: 'las instrucciones se dirigen a tu y exigen taglia' },
  { title: 'La visita del gruppo', pieces: [['Ragazzi, ', 'entrate'], [' in silenzio, ', 'segui'], [' la guida e non ', 'toccate']], after: ' le teche.', wrong: 1, answer: 'seguite', reason: 'las instrucciones se dirigen a voi y exigen seguite' },
  { title: 'La richiesta formale', pieces: [['Signora, ', 'compili'], [' il modulo, lo ', 'firmi'], [' e lo ', 'consegna']], after: ' alla reception.', wrong: 2, answer: 'consegni', reason: 'el imperativo formal exige consegni' },
  { title: 'Il computer', pieces: [['Paolo, ', 'spegnete'], [' il programma, ', 'salva'], [' il file e ', 'chiudi']], after: ' il computer.', wrong: 0, answer: 'spegni', reason: 'las instrucciones se dirigen a tu y exigen spegni' },
  { title: 'Il sentiero', pieces: [['Ragazzi, ', 'camminate'], [' sul lato destro, non ', 'correre'], [' e ', 'aspettate']], after: ' il gruppo alla curva.', wrong: 1, answer: 'correte', reason: 'la prohibición dirigida a voi usa non correte' },
  { title: 'La sala riunioni', pieces: [['Prima ', 'apriamo'], [' le finestre, poi ', 'prepariamo'], [' i fogli e ', 'controllate']], after: ' il proiettore.', wrong: 2, answer: 'controlliamo', reason: 'la esortazione mantiene el sujeto noi' },
  { title: 'Il documento del cliente', pieces: [['Signore, ', 'leggi'], [' il testo, ', 'controlli'], [' i dati e ', 'firmi']], after: ' qui.', wrong: 0, answer: 'legga', reason: 'la forma di cortesia Lei exige legga' },
  { title: 'La bicicletta', pieces: [['Marco, ', 'controlla'], [' i freni, ', 'gonfiate'], [' le gomme e ', 'metti']], after: ' il casco.', wrong: 1, answer: 'gonfia', reason: 'las instrucciones se dirigen a tu y exigen gonfia' },
  { title: 'La partenza del gruppo', pieces: [['Ragazzi, ', 'prendete'], [' gli zaini, ', 'chiudete'], [' la porta e ', 'andiamo']], after: ' verso l’autobus.', wrong: 2, answer: 'andate', reason: 'el destinatario sigue siendo voi y exige andate' },
  { title: 'La password', pieces: [['Marta, non ', 'condividi'], [' la password, ', 'cambiala'], [' ogni mese e ', 'conserva']], after: ' il codice in un luogo sicuro.', wrong: 0, answer: 'condividere', reason: 'la prohibición dirigida a tu usa non más infinitivo: non condividere' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Apri il documento con il programma corretto', 'Controlla attentamente tutti i dati', 'Invia subito il rapporto finale'], target: 0, production: { sentence: 'Apri il documento con il programma corretto', verb: 'aprire', answers: ['Apri'] } },
  { events: ['Scegliete una ricetta adatta agli ospiti', 'Comprate tutti gli ingredienti indicati nella ricetta', 'Preparate la cena prima del loro arrivo'], target: 1, production: { sentence: 'Comprate tutti gli ingredienti indicati nella ricetta', verb: 'comprare', answers: ['Comprate'] } },
  { events: ['Ritiriamo le chiavi questa mattina', 'Portiamo subito i mobili nelle stanze', 'Sistemiamo insieme la nuova casa prima di sera'], target: 2, production: { sentence: 'Sistemiamo insieme la nuova casa prima di sera', verb: 'sistemare', answers: ['Sistemiamo'] } },
  { events: ['Spenga il server prima dell’intervento tecnico', 'Sostituisca con cura il disco', 'Riavvii il sistema al termine'], target: 0, production: { sentence: 'Spenga il server prima dell’intervento tecnico', verb: 'spegnere', answers: ['Spenga'] } },
  { events: ['Leggete attentamente il nuovo regolamento', 'Compilate il modulo con tutti i dati richiesti', 'Consegnate la domanda entro domani'], target: 1, production: { sentence: 'Compilate il modulo con tutti i dati richiesti', verb: 'compilare', answers: ['Compilate'] } },
  { events: ['Accolga il gruppo davanti all’ingresso', 'Mostri con calma la nuova collezione', 'Accompagni poi tutti i visitatori fino all’uscita principale'], target: 2, production: { sentence: 'Accompagni poi tutti i visitatori fino all’uscita principale', verb: 'accompagnare', answers: ['Accompagni'] } },
  { events: ['Controlla con attenzione l’indirizzo dello studio', 'Prendi la metropolitana verso il centro', 'Raggiungi lo studio prima delle nove'], target: 0, production: { sentence: 'Controlla con attenzione l’indirizzo dello studio', verb: 'controllare', answers: ['Controlla'] } },
  { events: ['Raccogliete le fonti più affidabili', 'Scrivete insieme una relazione chiara e completa', 'Presentate i risultati durante la riunione'], target: 1, production: { sentence: 'Scrivete insieme una relazione chiara e completa', verb: 'scrivere', answers: ['Scrivete'] } },
  { events: ['Monta lo scaffale vicino alla finestra', 'Ordina i libri per argomento', 'Pulisci con cura tutta la stanza prima di uscire'], target: 2, production: { sentence: 'Pulisci con cura tutta la stanza prima di uscire', verb: 'pulire', answers: ['Pulisci'] } },
  { events: ['Facciamo insieme il riscaldamento prima della partita', 'Proviamo gli schemi più difficili', 'Entriamo in campo con fiducia'], target: 0, production: { sentence: 'Facciamo insieme il riscaldamento prima della partita', verb: 'fare', answers: ['Facciamo'] } },
]

export const ITALIAN_IMPERATIVO_EDITORIAL = createItalianEditorialPack({
  slug: 'imperative',
  tense: 'imperativo',
  focus: 'Imperativo',
  rule: 'El imperativo cambia según el destinatario; la prohibición de tu usa non más infinitivo.',
  micro,
  long,
  errors,
  sequences,
})
