import type { RoleplayToolkit } from './types.ts'

/** Caja común para los veinte roleplays de italiano A2. No es un diálogo en orden. */
export const TOOLKIT_ITALIANO_A2: RoleplayToolkit = {
  language: 'italiano',
  level: 'a2',
  intro:
    'Scegliete una forma utile e aggiungete i vostri dati. Non leggete tutte le righe in ordine: questa scatola serve per continuare la conversazione, non è un dialogo già scritto.',
  blocks: [
    {
      number: 1,
      title: 'Cominciare con il trattamento giusto',
      rows: [
        { form: 'Buongiorno, ha un momento, per favore?', when: 'per parlare con il personale o con una persona sconosciuta', register: 'Lei · cortese' },
        { form: 'Mi scusi, sono qui per …', when: 'per dire subito il motivo della visita', register: 'Lei · cortese' },
        { form: 'Ciao, puoi parlare un attimo?', when: 'con un amico, un collega vicino o un vicino conosciuto', register: 'tu · informale' },
        { form: 'Buongiorno, come posso aiutarla?', when: 'quando il personale apre lo scambio', register: 'Lei · servizio', tag: '[grants]' },
      ],
      tail: 'Controllate la relazione indicata sulla scheda. Mantenete Lei o tu per tutta la conversazione.',
    },
    {
      number: 2,
      title: 'Chiedere di ripetere e controllare',
      tag: '[receives]',
      rows: [
        { form: 'Mi scusi, può ripetere più lentamente?', when: 'quando un’informazione arriva troppo velocemente', register: 'Lei · cortese' },
        { form: 'Che cosa vuol dire …?', when: 'quando una parola blocca la comprensione', register: 'Lei/tu · comune' },
        { form: 'Se ho capito bene, …, giusto?', when: 'per riformulare il punto principale', register: 'Lei/tu · neutro' },
        { form: 'Parla di … oppure di …?', when: 'per distinguere due possibilità simili', register: 'Lei · cortese' },
      ],
    },
    {
      number: 3,
      title: 'Spiegare in un altro modo',
      tag: '[jargon]',
      note: 'Chi usa una parola difficile deve anche aiutare. Non ripetete solo più forte: cambiate le parole.',
      rows: [
        { form: 'In altre parole, …', when: 'per presentare la stessa idea con parole più semplici', register: 'Lei/tu · neutro' },
        { form: 'Non è …, è …', when: 'per correggere una confusione precisa', register: 'Lei/tu · comune' },
        { form: 'Per esempio, …', when: 'quando un esempio breve aiuta più di una definizione', register: 'Lei/tu · neutro' },
        { form: 'Quando dico …, voglio dire …', when: 'per spiegare una regola o un termine del servizio', register: 'Lei/tu · neutro' },
      ],
    },
    {
      number: 4,
      title: 'Dare un motivo e indicare un bisogno',
      rows: [
        { form: '… perché …', when: 'per dare un motivo personale e diretto', register: 'Lei/tu · comune' },
        { form: 'Dato che …, ho bisogno di …', when: 'per mettere la situazione prima della richiesta', register: 'Lei/tu · neutro' },
        { form: 'Il problema è che …', when: 'per indicare l’ostacolo principale', register: 'Lei/tu · comune' },
        { form: 'Per me è importante perché …', when: 'per spiegare che cosa si rischia di perdere', register: 'Lei/tu · comune' },
      ],
    },
    {
      number: 5,
      title: 'Rifiutare e mettere un limite',
      tag: '[grants]',
      rows: [
        { form: 'Mi dispiace, ma non è possibile.', when: 'per rifiutare un’opzione, non la persona', register: 'Lei/tu · cortese' },
        { form: 'Posso arrivare fino a …, ma non oltre.', when: 'per dare un limite di prezzo, tempo o quantità', register: 'Lei/tu · neutro' },
        { form: 'Per il momento non posso …', when: 'per limitare un’azione alla situazione attuale', register: 'Lei/tu · neutro' },
        { form: 'Questa soluzione non va bene per me perché …', when: 'per rifiutare con un motivo verificabile', register: 'Lei/tu · neutro' },
      ],
    },
    {
      number: 6,
      title: 'Proporre una condizione o un’alternativa',
      rows: [
        { form: 'Se …, possiamo …', when: 'per collegare la soluzione a un fatto da verificare', register: 'Lei/tu · comune' },
        { form: 'Un’altra possibilità sarebbe …', when: 'per aprire una seconda strada', register: 'Lei/tu · cortese' },
        { form: 'Invece di …, le propongo …', when: 'per sostituire un’opzione impossibile', register: 'Lei · servizio' },
        { form: 'Questa soluzione le andrebbe bene?', when: 'per chiedere se la condizione è accettabile', register: 'Lei · cortese', tag: '[grants]' },
      ],
    },
    {
      number: 7,
      title: 'Prendere tempo e fissare il prossimo passo',
      rows: [
        { form: 'Un attimo, controllo subito.', when: 'prima di consultare un documento o una regola', register: 'Lei/tu · neutro' },
        { form: 'Ho bisogno di qualche minuto per decidere.', when: 'quando una risposta immediata non è possibile', register: 'Lei/tu · neutro' },
        { form: 'Le darò una risposta entro …', when: 'per promettere un nuovo contatto con un’ora precisa', register: 'Lei · cortese' },
        { form: 'Prima facciamo …; poi …', when: 'per dividere due azioni nel tempo', register: 'Lei/tu · comune' },
      ],
      tail: 'Non inventate una risposta. Dite chi controlla, quale informazione manca e quando arriverà la risposta.',
    },
    {
      number: 8,
      title: 'Confermare e chiudere',
      rows: [
        { form: 'Va bene, allora scegliamo …', when: 'per nominare l’opzione realmente scelta', register: 'Lei/tu · comune' },
        { form: 'Ricapitolo: …, è corretto?', when: 'per controllare i dati con parole proprie', register: 'Lei · neutro' },
        { form: 'Chi fa che cosa, ed entro che ora?', when: 'per assegnare l’azione e la scadenza', register: 'Lei/tu · neutro' },
        { form: 'Grazie per l’aiuto. Ci vediamo alle …', when: 'per terminare dopo aver fissato il contatto successivo', register: 'Lei/tu · cortese' },
      ],
      tail: 'Un semplice «va bene» non basta. Entrambe le persone devono poter ripetere la stessa opzione, il responsabile e l’ora.',
    },
  ],
}
