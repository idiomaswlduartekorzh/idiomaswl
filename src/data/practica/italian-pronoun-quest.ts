import { createPronounQuest, type PronounSeed } from './create-pronoun-quest.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type ItalianPronounTopic =
  | 'soggetto'
  | 'dimostrativi'
  | 'possessivi'
  | 'diretti'
  | 'indiretti'
  | 'riflessivi'
  | 'combinati'

const TOPICS: readonly PronounTopicOption<ItalianPronounTopic>[] = [
  { id: 'soggetto', label: 'Pronombres sujeto', group: 'Referente', level: 'A1' },
  { id: 'dimostrativi', label: 'Demostrativos', group: 'Referencia', level: 'A1' },
  { id: 'possessivi', label: 'Posesivos', group: 'Concordancia', level: 'A1–A2' },
  { id: 'diretti', label: 'Objeto directo', group: 'Complementos', level: 'A2' },
  { id: 'indiretti', label: 'Objeto indirecto', group: 'Complementos', level: 'A2' },
  { id: 'riflessivi', label: 'Reflexivos', group: 'Posición', level: 'A2' },
  { id: 'combinati', label: 'Pronombres combinados', group: 'Integración', level: 'A2+' },
]

const PRESETS: readonly PronounPreset<ItalianPronounTopic>[] = [
  { label: 'Base A1', ids: ['soggetto', 'dimostrativi', 'possessivi'] },
  { label: 'Objetos A2', ids: ['diretti', 'indiretti'] },
  { label: 'Posición A2+', ids: ['riflessivi', 'combinati'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS: readonly PronounSeed<ItalianPronounTopic>[] = [
  {
    id: 'soggetto',
    explanation: 'En italiano el sujeto suele omitirse. Se expresa cuando contrasta, aclara o enfatiza; Lei formal exige tercera persona.',
    examples: [
      {
        context: 'Marco lavora da casa; ___, invece, lavoro in ufficio.', answer: 'io', distractors: ['tu', 'lui', 'noi'],
        cue: 'Hay contraste explícito entre Marco y quien habla.', functionAnswer: 'sujeto contrastivo', functionDistractors: ['objeto directo', 'posesivo', 'objeto indirecto'], wrong: 'me',
        transformPrompt: 'Contrasta a Giulia con Marco: Giulia studia medicina; Marco no.', transformAnswer: 'Lei studia medicina; lui no.',
        transformDistractors: ['La studia medicina; lo no.', 'Sua studia medicina; suo no.', 'Le studia medicina; gli no.'],
      },
      {
        context: 'Signora Bianchi, ___ desidera parlare con il direttore?', answer: 'Lei', distractors: ['lei', 'La', 'Le'],
        cue: 'Es tratamiento formal dirigido a una mujer.', functionAnswer: 'sujeto formal', functionDistractors: ['objeto directo femenino', 'objeto indirecto', 'posesivo'], wrong: 'La',
        transformPrompt: 'Dirígete formalmente al señor Neri: “¿Usted puede esperar?”', transformAnswer: 'Lei può aspettare?',
        transformDistractors: ['La può aspettare?', 'Gli può aspettare?', 'Lui puoi aspettare?'],
      },
      {
        context: 'Paolo e Anna? Noi portiamo le bevande; ___, invece, portano il dolce.', answer: 'loro', distractors: ['noi', 'voi', 'lei'],
        cue: 'El contraste explícito opone a “noi” con las dos personas mencionadas.', functionAnswer: 'sujeto plural contrastivo', functionDistractors: ['objeto directo plural', 'posesivo plural', 'demostrativo plural'], wrong: 'li',
        transformPrompt: 'Sustituye “Paolo e Anna” en: Paolo e Anna portano il dolce.', transformAnswer: 'Loro portano il dolce.',
        transformDistractors: ['Li portano il dolce.', 'Le portano il dolce.', 'I loro portano il dolce.'],
      },
    ],
    final: { before: 'Marco prepara i documenti; ', after: ', invece, controllo gli indirizzi. ', answer: 'io' },
  },
  {
    id: 'dimostrativi',
    explanation: 'Questo señala cercanía; quello, distancia. Cuando acompañan un nombre concuerdan con él y cuando van solos funcionan como pronombres.',
    examples: [
      {
        context: '___ è il pacco che ho qui sulla scrivania.', answer: 'Questo', distractors: ['Quello', 'Questi', 'Quella'],
        cue: 'El paquete está cerca del hablante y es singular.', functionAnswer: 'pronombre demostrativo cercano', functionDistractors: ['adjetivo posesivo', 'objeto directo', 'pronombre personal'], wrong: 'Questi',
        transformPrompt: 'Señala varios documentos cercanos: “Estos son urgentes”.', transformAnswer: 'Questi sono urgenti.',
        transformDistractors: ['Questo sono urgenti.', 'Quelli sono urgenti.', 'Queste è urgente.'],
      },
      {
        context: 'Vedi ___ in fondo alla strada?', answer: 'quell’edificio', distractors: ['quest’edificio', 'quello edificio', 'quella edificio'],
        cue: 'El edificio está lejos y la forma se elide ante vocal.', functionAnswer: 'determinante demostrativo lejano', functionDistractors: ['pronombre sujeto', 'posesivo', 'objeto indirecto'], wrong: 'quello edificio',
        transformPrompt: 'Sustituye “quell’edificio” cuando ya está identificado.', transformAnswer: 'Quello è il municipio.',
        transformDistractors: ['Quell’ è il municipio.', 'Quella è il municipio.', 'Questo edificio è lontano quello.'],
      },
      {
        context: 'Tra le due borse scelgo ___ nere vicino alla porta.', answer: 'quelle', distractors: ['quelli', 'questa', 'quel'],
        cue: 'Retoma varias bolsas femeninas que están lejos.', functionAnswer: 'pronombre demostrativo femenino plural', functionDistractors: ['posesivo femenino', 'objeto directo', 'sujeto formal'], wrong: 'quelli',
        transformPrompt: 'Señala varias sillas lejanas: “Quiero aquellas”.', transformAnswer: 'Voglio quelle.',
        transformDistractors: ['Voglio quelli.', 'Voglio quella sedie.', 'Le voglio quelle.'],
      },
    ],
    final: { before: 'Sul tavolo ci sono due pacchi: prendi ', after: ' vicino alla lampada. ', answer: 'quello' },
  },
  {
    id: 'possessivi',
    explanation: 'El posesivo concuerda con lo poseído, no con quien posee. Normalmente lleva artículo; con familiares singulares no modificados suele omitirse.',
    examples: [
      {
        context: 'Questa è la penna di Luca: è ___ penna.', answer: 'la sua', distractors: ['il suo', 'la loro', 'sua'],
        cue: 'Penna es femenino singular y el poseedor es Luca.', functionAnswer: 'adjetivo posesivo femenino singular', functionDistractors: ['pronombre objeto', 'demostrativo', 'sujeto'], wrong: 'il suo',
        transformPrompt: 'Sustituye “la mia bicicletta” cuando el sustantivo ya se conoce.', transformAnswer: 'La mia è nuova.',
        transformDistractors: ['Il mio è nuova.', 'Mia è nuova.', 'La me è nuova.'],
      },
      {
        context: 'Noi abbiamo due biglietti: questi sono ___ biglietti.', answer: 'i nostri', distractors: ['le nostre', 'il nostro', 'i loro'],
        cue: 'Biglietti es masculino plural y pertenece a nosotros.', functionAnswer: 'adjetivo posesivo masculino plural', functionDistractors: ['objeto directo plural', 'sujeto plural', 'demostrativo plural'], wrong: 'le nostre',
        transformPrompt: 'Sustituye “i nostri biglietti” cuando el nombre ya apareció.', transformAnswer: 'I nostri sono sul tavolo.',
        transformDistractors: ['Le nostre sono sul tavolo.', 'Nostri sono sul tavolo.', 'Li nostri sono sul tavolo.'],
      },
      {
        context: 'Domani pranzo con ___ madre.', answer: 'mia', distractors: ['la mia', 'mio', 'il mio'],
        cue: 'Madre es un familiar singular sin modificador.', functionAnswer: 'posesivo familiar sin artículo', functionDistractors: ['pronombre directo', 'sujeto omitido', 'demostrativo'], wrong: 'la mia',
        transformPrompt: 'Expresa “mi hermano mayor”; el adjetivo reactiva el artículo.', transformAnswer: 'il mio fratello maggiore',
        transformDistractors: ['mio fratello maggiore', 'la mia fratello maggiore', 'il miei fratello maggiore'],
      },
    ],
    final: { before: 'Sara porta la sua copia e noi portiamo ', after: '. ', answer: 'la nostra' },
  },
  {
    id: 'diretti',
    explanation: 'Lo, la, li y le sustituyen directamente aquello que recibe la acción. Van normalmente antes del verbo conjugado.',
    examples: [
      {
        context: 'Il contratto? ___ leggo questa sera.', answer: 'Lo', distractors: ['Gli', 'Le', 'Ci'],
        cue: 'Sustituye un objeto masculino singular sin preposición.', functionAnswer: 'objeto directo masculino singular', functionDistractors: ['objeto indirecto', 'sujeto', 'reflexivo'], wrong: 'Gli',
        transformPrompt: 'Sustituye “la fattura” en: Controllo la fattura adesso.', transformAnswer: 'La controllo adesso.',
        transformDistractors: ['Le controllo adesso.', 'Controllo la adesso.', 'Gli controllo adesso.'],
      },
      {
        context: 'Le chiavi? Non ___ trovo da nessuna parte.', answer: 'le', distractors: ['li', 'gli', 'ne'],
        cue: 'Retoma un objeto femenino plural.', functionAnswer: 'objeto directo femenino plural', functionDistractors: ['objeto indirecto plural', 'posesivo', 'demostrativo'], wrong: 'li',
        transformPrompt: 'Sustituye “i moduli” en: Compilo i moduli domani.', transformAnswer: 'Li compilo domani.',
        transformDistractors: ['Gli compilo domani.', 'Le compilo domani.', 'Compilo li domani.'],
      },
      {
        context: 'Hai visto Anna? Sì, ___ vista stamattina.', answer: 'l’ho', distractors: ['le ho', 'gli ho', 'la ho'],
        cue: 'El clítico se elide con el auxiliar y el participio concuerda con Anna.', functionAnswer: 'objeto directo elidido', functionDistractors: ['objeto indirecto', 'artículo posesivo', 'sujeto formal'], wrong: 'le ho',
        transformPrompt: 'Sustituye “le sedie” en passato prossimo.', transformAnswer: 'Le ho portate ieri.',
        transformDistractors: ['Gli ho portato ieri.', 'Le ho portato ieri.', 'Ho le portate ieri.'],
      },
    ],
    final: { before: 'La fattura è pronta: ', after: ' controllo prima di inviarla. ', answer: 'la' },
  },
  {
    id: 'indiretti',
    explanation: 'Los pronombres indirectos indican a quién se da, dice, escribe o responde algo: mi, ti, gli, le, ci, vi.',
    examples: [
      {
        context: 'Telefono a Marco e ___ spiego il problema.', answer: 'gli', distractors: ['lo', 'le', 'li'],
        cue: 'Marco es el destinatario masculino singular.', functionAnswer: 'objeto indirecto masculino', functionDistractors: ['objeto directo', 'posesivo', 'sujeto'], wrong: 'lo',
        transformPrompt: 'Sustituye “a Giulia” en: Mando una mail a Giulia.', transformAnswer: 'Le mando una mail.',
        transformDistractors: ['La mando una mail.', 'Gli mando una mail.', 'Mando le una mail.'],
      },
      {
        context: 'Ragazzi, ___ mando l’indirizzo tra un minuto.', answer: 'vi', distractors: ['li', 'ci', 'gli'],
        cue: 'El hablante se dirige a varias personas.', functionAnswer: 'objeto indirecto de segunda persona plural', functionDistractors: ['objeto directo plural', 'reflexivo', 'demostrativo'], wrong: 'li',
        transformPrompt: 'Sustituye “a noi” en: Il cliente manda una conferma a noi.', transformAnswer: 'Il cliente ci manda una conferma.',
        transformDistractors: ['Il cliente li manda una conferma.', 'Il cliente ne manda una conferma.', 'Il cliente manda ci una conferma.'],
      },
      {
        context: 'Se hai tempo, ___ puoi rispondere oggi?', answer: 'mi', distractors: ['me', 'lo', 'si'],
        cue: 'Quien habla es el destinatario de responder.', functionAnswer: 'objeto indirecto de primera persona', functionDistractors: ['pronombre tónico', 'objeto directo', 'reflexivo'], wrong: 'me',
        transformPrompt: 'Sustituye “a te” en: Posso mostrare il documento a te.', transformAnswer: 'Ti posso mostrare il documento.',
        transformDistractors: ['Te posso mostrare il documento.', 'Lo posso mostrare il documento.', 'Posso ti mostrare il documento.'],
      },
    ],
    final: { before: 'A Giulia manca l’indirizzo, quindi ', after: ' mando un messaggio. ', answer: 'le' },
  },
  {
    id: 'riflessivi',
    explanation: 'El reflexivo remite la acción al sujeto y concuerda con la persona: mi, ti, si, ci, vi, si.',
    examples: [
      {
        context: 'Ogni mattina io ___ sveglio alle sette.', answer: 'mi', distractors: ['ti', 'si', 'me'],
        cue: 'Sujeto y receptor de la acción son la primera persona.', functionAnswer: 'pronombre reflexivo de primera persona', functionDistractors: ['objeto directo', 'posesivo', 'demostrativo'], wrong: 'me',
        transformPrompt: 'Cambia el sujeto a “noi”: Io mi preparo alle otto.', transformAnswer: 'Noi ci prepariamo alle otto.',
        transformDistractors: ['Noi si prepariamo alle otto.', 'Noi vi prepariamo alle otto.', 'Noi ci prepara alle otto.'],
      },
      {
        context: 'Luca e Marta ___ incontrano davanti alla stazione.', answer: 'si', distractors: ['ci', 'li', 'gli'],
        cue: 'La acción es recíproca entre dos sujetos.', functionAnswer: 'pronombre recíproco', functionDistractors: ['objeto directo plural', 'objeto indirecto', 'posesivo'], wrong: 'li',
        transformPrompt: 'Cambia el sujeto a “voi”: Noi ci vediamo domani.', transformAnswer: 'Voi vi vedete domani.',
        transformDistractors: ['Voi ci vedete domani.', 'Voi si vedete domani.', 'Voi vi vediamo domani.'],
      },
      {
        context: 'Tu ___ guardi allo specchio prima di uscire?', answer: 'ti', distractors: ['mi', 'si', 'te'],
        cue: 'La persona que mira y la persona reflejada son la misma.', functionAnswer: 'pronombre reflexivo de segunda persona', functionDistractors: ['pronombre tónico', 'objeto indirecto', 'demostrativo'], wrong: 'te',
        transformPrompt: 'Cambia el sujeto a “lei”: Tu ti prepari alle sette.', transformAnswer: 'Lei si prepara alle sette.',
        transformDistractors: ['Lei ti prepara alle sette.', 'Lei la prepara alle sette.', 'Lei si preparo alle sette.'],
      },
    ],
    final: { before: 'Prima di uscire noi ', after: ' aiutiamo a vicenda. ', answer: 'ci' },
  },
  {
    id: 'combinati',
    explanation: 'Al combinar indirecto y directo, mi/ti/ci/vi cambian a me/te/ce/ve; gli y le forman glie-: me lo, ce li, gliela.',
    examples: [
      {
        context: 'Il documento è per Paolo: ___ consegno domani.', answer: 'glielo', distractors: ['gli lo', 'lo gli', 'gliela'],
        cue: '“A Paolo” + “el documento” se condensan en una sola secuencia.', functionAnswer: 'indirecto + directo masculino', functionDistractors: ['dos objetos directos', 'reflexivo + posesivo', 'sujeto + directo'], wrong: 'gli lo',
        transformPrompt: 'Sustituye “la chiave a Marta” en: Do la chiave a Marta.', transformAnswer: 'Gliela do.',
        transformDistractors: ['Le la do.', 'Glielo do.', 'La le do.'],
      },
      {
        context: 'Hai le copie? Sì, ___ porta Anna tra poco.', answer: 'ce le', distractors: ['ci le', 'ce li', 'le ci'],
        cue: '“A nosotros” + “las copias” combina ce + le.', functionAnswer: 'indirecto plural + directo femenino plural', functionDistractors: ['reflexivo plural', 'posesivo plural', 'demostrativo plural'], wrong: 'ci le',
        transformPrompt: 'Sustituye “i biglietti a noi” en: Marco manda i biglietti a noi.', transformAnswer: 'Marco ce li manda.',
        transformDistractors: ['Marco ci li manda.', 'Marco ce le manda.', 'Marco li ci manda.'],
      },
      {
        context: 'Se trovi la ricevuta, ___ mandi subito?', answer: 'me la', distractors: ['mi la', 'me lo', 'la mi'],
        cue: '“A mí” + “la ricevuta” combina me + la.', functionAnswer: 'indirecto de primera persona + directo femenino', functionDistractors: ['reflexivo + artículo', 'sujeto + posesivo', 'dos objetos directos'], wrong: 'mi la',
        transformPrompt: 'Sustituye “il numero a te” en: Spiego il numero a te.', transformAnswer: 'Te lo spiego.',
        transformDistractors: ['Ti lo spiego.', 'Te la spiego.', 'Lo ti spiego.'],
      },
    ],
    final: { before: 'Il contratto è per Paolo: domani ', after: ' consegno di persona.', answer: 'glielo' },
  },
]

export const ITALIAN_PRONOUN_QUEST = createPronounQuest({
  id: 'italian-pronoun-quest',
  storageKey: 'wl-italian-pronoun-quest-v1',
  languageName: 'Italiano',
  languageCode: 'it',
  title: 'La catena dei pronomi',
  finalTitle: 'Una consegna con troppi referenti',
  reviewLinks: [
    { href: '/practica/italiano/a1/gramatica/pronombres-sujeto', label: 'Repasar pronombres sujeto' },
    { href: '/practica/italiano/a1/gramatica/adjetivos-posesivos', label: 'Repasar posesivos' },
  ],
  topics: TOPICS,
  presets: PRESETS,
  seeds: SEEDS,
  finalDistractors: ['gli lo', 'ci le', 'me'],
})
