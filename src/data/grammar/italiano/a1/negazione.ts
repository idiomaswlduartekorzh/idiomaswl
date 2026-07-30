import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negazione',
  order: '08',
  color: '#009246',
  category: 'Estructura de la oración',
  level: 'A1',
  title: 'La negazione en italiano A1 — Non antes del verbo',
  shortTitle: 'Negación (non)',
  metaTitle: 'Negación en italiano A1 — non, non...mai, non...niente, non...nessuno',
  description:
    'La negación en italiano es simple: non antes del verbo conjugado. Non parlo italiano. Non ho fame. Con palabras como mai, niente, nessuno se forma la negación reforzada sin doble negación adicional.',
  lead: 'Non + verbo = negación. Non parlo (no hablo). Con mai/niente/nessuno: non + verbo + mai/niente/nessuno. A diferencia del español, no hay doble negativo: "Non mangio niente" = no como nada.',
  outcomes: [
    'Forma oraciones negativas con non antes del verbo conjugado',
    'Usa non...mai, non...niente, non...nessuno sin doble negativo español',
    'Distingue la posición de non en italiano respecto al español',
  ],

  guide: {
    goal: 'Negar afirmaciones en italiano usando non y las formas reforzadas mai/niente/nessuno.',
    model: 'Non parlo italiano. / Non ho fame. / Non mangio mai la carne.',
    formula: 'non + verbo conjugado [+ mai / niente / nessuno / ancora / affatto]',
    decisions: [
      'non siempre va ANTES del verbo conjugado: non parlo, non ho, non sono',
      'non...mai = nunca: Non vado mai al cinema (nunca voy al cine)',
      'non...niente = nada: Non capisco niente (no entiendo nada)',
      'non...nessuno = nadie: Non conosco nessuno qui (no conozco a nadie aquí)',
      'non...ancora = todavía no: Non ho ancora finito (todavía no he terminado)',
      'non...affatto = en absoluto: Non mi piace affatto (no me gusta para nada)',
      'En italiano NO hay doble non: "non...mai" es suficiente',
      'Con verbos compuestos: non + auxiliar + participio: non ho capito',
    ],
    table: [
      ['Español', 'Italiano', 'Nota'],
      ['No hablo italiano', 'Non parlo italiano', 'non + verbo'],
      ['No tengo hambre', 'Non ho fame', 'non + avere'],
      ['Nunca como carne', 'Non mangio mai carne', 'non...mai'],
      ['No entiendo nada', 'Non capisco niente', 'non...niente'],
      ['No conozco a nadie', 'Non conosco nessuno', 'non...nessuno'],
    ],
    mistakes: [
      '"Non mai vado" — MAL. El orden correcto: non + verbo + mai: "Non vado mai".',
      '"Non mangio niente di" — incorrecto. En italiano basta "non mangio niente".',
      'Non antes del verbo, no antes del sujeto: "Io non parlo" (no "Non io parlo").',
    ],
  },
  seo: [
    {
      heading: 'La negación en italiano: más simple que en español',
      paragraphs: [
        'En italiano, negar una oración es muy sencillo: solo añade non antes del verbo conjugado. Non parlo italiano (no hablo italiano). Non ho fame (no tengo hambre). Non siamo stanchi (no estamos cansados). A diferencia del español, no hay contracciones ni cambios de posición.',
        'Esta simplicidad hace que la negación sea una de las primeras estructuras que domina el estudiante hispanohablante. El único punto de atención es la posición: non siempre precede al verbo, no al sujeto. "Io non studio" es correcto; "Non io studio" tiene sentido pero es enfático e inusual.',
      ],
    },
    {
      heading: 'Non...mai, non...niente, non...nessuno: la negación reforzada',
      paragraphs: [
        'Para decir nunca, nada, nadie, ya no, etc., el italiano usa non + verbo + una segunda palabra negativa DESPUÉS del verbo. Al hispanohablante esto le suena a "doble negación", pero en italiano es lo correcto y obligatorio. Esta es la tabla de las negaciones reforzadas:',
      ],
      table: [
        ['Expresión', 'Significado', 'Ejemplo'],
        ['non… mai', 'nunca', 'Non vado mai al cinema.'],
        ['non… niente / nulla', 'nada', 'Non capisco niente.'],
        ['non… nessuno', 'nadie / ninguno', 'Non c\'è nessuno.'],
        ['non… più', 'ya no', 'Non lavoro più qui.'],
        ['non… ancora', 'todavía no', 'Non ho ancora finito.'],
        ['non… né… né', 'ni… ni', 'Non bevo né caffè né tè.'],
      ],
    },
    {
      heading: 'Non con verbos compuestos y modales',
      paragraphs: [
        'Con los tiempos compuestos (passato prossimo), non va antes del auxiliar: "Non ho mangiato" (no he comido), "Non sono andato" (no he ido). Con los verbos modales también va antes: "Non posso venire" (no puedo venir), "Non voglio studiare" (no quiero estudiar).',
        'Ancora (todavía) en negativo: "Non ho ancora finito" (todavía no he terminado). Affatto refuerza la negación: "Non mi piace affatto" (no me gusta para nada / no me gusta en absoluto).',
      ],
    },
    {
      heading: '¿Cómo se niega una frase en italiano?',
      paragraphs: [
        'Poniendo "non" justo delante del verbo conjugado: "Non parlo italiano", "Non ho fame", "Non siamo pronti". No hay contracciones ni cambios de orden como en otras lenguas. "non" va antes del verbo, nunca antes del sujeto.',
      ],
    },
    {
      heading: '¿Existe la doble negación en italiano?',
      paragraphs: [
        'Sí, y es obligatoria: cuando se usa mai, niente, nessuno, più, etc. después del verbo, hay que mantener "non" antes. "Non vedo nessuno" (no veo a nadie), "Non faccio mai tardi" (nunca llego tarde). Suena a doble negación para el hispanohablante, pero en italiano es lo correcto.',
      ],
    },
    {
      heading: '¿Dónde se coloca "non" con los verbos compuestos y modales?',
      paragraphs: [
        'Antes del auxiliar o del verbo modal, no del participio ni del infinitivo: "Non ho mangiato" (no he comido), "Non sono andato" (no he ido), "Non posso venire" (no puedo venir), "Non voglio studiare" (no quiero estudiar).',
      ],
    },
  ],
  visual: {
    mode: 'sentence-structure',
    teacherLens: 'El estudiante aprende que non ocupa siempre la posición antes del verbo y que no hay doble negativo en italiano.',
    graphicPrompt: 'Oración afirmativa con flecha + non → oración negativa. Cuadro de mai/niente/nessuno después del verbo.',
    scene: [
      ['non + verbo', 'Non parlo / Non ho'],
      ['non + verbo + mai', 'Non vado mai'],
      ['non + verbo + niente', 'Non capisco niente'],
      ['non + verbo + nessuno', 'Non conosco nessuno'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['non antes del verbo', 'no doble negativo', 'mai/niente/nessuno después del verbo', 'non + aux en tiempos compuestos'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Elige la negación correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma negativa correcta de cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'No hablo',
            lines: [['Carlo', '___ italiano. Parlo spagnolo. (parlare / io)']],
            options: ['Non parlo', 'Non parla', 'Parlo non', 'Non mai parlo'],
            answer: 'Non parlo',
            explain: 'Non + verbo conjugado: Non parlo = no hablo.',
          },
          {
            scene: 'Nunca como carne',
            lines: [['Sofia', '___ carne. Sono vegetariana. (mangiare / io / mai)']],
            options: ['Non mangio mai', 'Non mai mangio', 'Mai non mangio', 'Non mangio'],
            answer: 'Non mangio mai',
            explain: 'non + verbo + mai: Non mangio mai. El orden correcto en italiano.',
          },
          {
            scene: 'No entiende nada',
            lines: [['Gael', 'Carlo ___ quando parlo veloce. (capire / niente)']],
            options: ['non capisce niente', 'non niente capisce', 'capisce non niente', 'non capisce'],
            answer: 'non capisce niente',
            explain: 'non + verbo + niente: non capisce niente = no entiende nada.',
          },
          {
            scene: 'No tenemos tiempo',
            lines: [['Sara', 'Oggi ___ per uscire. (avere / noi)']],
            options: ['non abbiamo tempo', 'non hanno tempo', 'abbiamo non tempo', 'non abbiamo mai'],
            answer: 'non abbiamo tempo',
            explain: 'Non abbiamo tempo — non + verbo (avere, prima pl).',
          },
          {
            scene: 'No conoce a nadie',
            lines: [['Ana', 'Lina è nuova in città. ___ qui. (conoscere / nessuno)']],
            options: ['non conosce nessuno', 'non nessuno conosce', 'conosce non nessuno', 'non conosco nessuno'],
            answer: 'non conosce nessuno',
            explain: 'non + verbo + nessuno: non conosce nessuno. Terza sg.',
          },
          {
            scene: 'Todavía no',
            lines: [['Marco', '___ questa parola. Devo cercare nel dizionario. (capire / ancora)']],
            options: ['Non capisco ancora', 'Non ancora capisco', 'Ancora non capisco', 'Non capisce ancora'],
            answer: 'Non capisco ancora',
            explain: 'non + verbo + ancora: Non capisco ancora = todavía no entiendo.',
          },
          {
            scene: 'No son estudiantes',
            lines: [['Lina', 'Carlo e Marco ___ studenti. Sono professori. (essere)']],
            options: ['non sono', 'sono non', 'non siamo', 'non è'],
            answer: 'non sono',
            explain: 'Non sono — tercera pl de essere en negativo: non + sono.',
          },
          {
            scene: 'No quiero',
            lines: [['Sofia', 'Io ___ studiare oggi. Sono stanca. (volere)']],
            options: ['non voglio', 'non vuole', 'non vogliamo', 'voglio non'],
            answer: 'non voglio',
            explain: 'Non voglio — non + verbo modal: non voglio = no quiero.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogos negativos',
        tag: '2 espacios',
        intro: 'Completa el diálogo con las formas negativas correctas.',
        type: 'dual',
        items: [
          {
            scene: 'No entiendo nada',
            lines: [
 ['Gael', 'Capisci l\'italiano?'],
 ['Carlo', '[[0]] ancora [[1]]. Sto imparando! (capire / niente)'],
 ],
            blanks: [
              { options: ['Non capisco', 'Non capisce', 'Non capiamo'], answer: 'Non capisco', explain: 'Io non capisco — prima sg negativa.' },
              { options: ['niente', 'mai', 'nessuno'], answer: 'niente', explain: 'non...niente = nada. Dopo il verbo.' },
            ],
          },
          {
            scene: 'Nunca va al gimnasio',
            lines: [['Ana', 'Carlo [[0]] in palestra. E [[1]] a correre. (andare / mai / uscire / mai)']],
            blanks: [
              { options: ['non va mai', 'non mai va', 'mai non va'], answer: 'non va mai', explain: 'non + verbo + mai = nunca. Non va mai.' },
              { options: ['non esce mai', 'non mai esce', 'non esca mai'], answer: 'non esce mai', explain: 'Non esce mai = nunca sale. Uscire terza sg: esce.' },
            ],
          },
          {
            scene: 'No tienes hambre',
            lines: [
 ['Sara', '[[0]] fame? (avere / tu)'],
 ['Lina', 'No, [[1]] fame, ma [[2]] sete. (avere / ho)'],
 ],
            blanks: [
              { options: ['Non hai', 'Non ho', 'Non ha'], answer: 'Non hai', explain: 'Tu non hai — seconda sg negativa di avere.' },
              { options: ['non ho', 'non hai', 'non ha'], answer: 'non ho', explain: 'Io non ho fame — prima sg.' },
              { options: ['ho', 'hai', 'non ho'], answer: 'ho', explain: 'Ma ho sete — afirmativo: sí tengo sed.' },
            ],
          },
          {
            scene: 'No conocen a nadie',
            lines: [['Marco', 'I nuovi studenti [[0]] ancora [[1]] in classe. (conoscere / nessuno)']],
            blanks: [
              { options: ['non conoscono', 'non conosce', 'non conosciamo'], answer: 'non conoscono', explain: 'Loro non conoscono — terza pl negativa.' },
              { options: ['nessuno', 'niente', 'mai'], answer: 'nessuno', explain: 'non...nessuno = nadie. Dopo il verbo.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Una settimana difficile',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas negativas apropiadas.',
        type: 'guidedText',
        scene: 'Carlo habla de su semana difícil en WeLearn',
        text: 'Questa settimana è difficile. [[0]] (dormir bien / dormire bene / io). [[1]] (no tengo hambre / avere fame / io). La sera [[2]] (nunca estudio / studiare / mai). [[3]] (no entiendo nada / capire / niente) nelle lezioni avanzate. [[4]] (no conozco a nadie / conoscere / nessuno) nei nuovi gruppi. E [[5]] (todavía no termino / finire / ancora) i compiti. Ma Gael dice: "[[6]] (no te preocupes / preoccuparsi)!"',
        blanks: [
          { options: ['Non dormo bene', 'Non dorme bene', 'Dormo non bene'], answer: 'Non dormo bene', explain: 'Io non dormo bene — non + verbo prima sg.' },
          { options: ['Non ho fame', 'Non ha fame', 'Fame non ho'], answer: 'Non ho fame', explain: 'Non ho fame — non + avere prima sg.' },
          { options: ['non studio mai', 'non mai studio', 'mai studio'], answer: 'non studio mai', explain: 'Non studio mai — non + verbo + mai.' },
          { options: ['Non capisco niente', 'Non capisce niente', 'Non niente capisco'], answer: 'Non capisco niente', explain: 'Non capisco niente — -isc- prima sg + niente.' },
          { options: ['Non conosco nessuno', 'Non conosce nessuno', 'Non conosco mai'], answer: 'Non conosco nessuno', explain: 'Non conosco nessuno — non + verbo + nessuno.' },
          { options: ['non finisco ancora', 'non finisce ancora', 'ancora non finisco'], answer: 'non finisco ancora', explain: 'Non finisco ancora — non + verbo + ancora.' },
          { options: ['Non ti preoccupare', 'Non preoccuparsi', 'Ti non preoccupare'], answer: 'Non ti preoccupare', explain: 'Imperativo negativo: non + infinito. Non ti preoccupare!' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma negativa correcta de cada verbo.',
        type: 'freeText',
        scene: 'Cosas que no hace Sofia durante su intercambio en Italia',
        text: 'Sofia è in Italia per imparare la lingua. [[0]] (non hablar inglés / parlare inglese / lei). [[1]] (nunca comer carne / mangiare carne / mai). [[2]] (no entender nada todavía / capire niente / ancora). [[3]] (no conoce a nadie / conoscere nessuno). Noi [[4]] (no hablamos rápido / parlare veloce) con lei. [[5]] (no tenemos fretta / avere fretta / noi). È una bella esperienza!',
        blanks: [
          { answer: 'Non parla inglese', accepted: ['non parla inglese'], explain: 'Lei non parla — terza sg negativa.' },
          { answer: 'Non mangia mai carne', accepted: ['non mangia mai carne'], explain: 'non + mangia + mai. Terza sg.' },
          { answer: 'Non capisce ancora niente', accepted: ['non capisce niente ancora', 'non capisce ancora niente'], explain: 'non + capisce (-isc-) + ancora + niente.' },
          { answer: 'Non conosce nessuno', accepted: ['non conosce nessuno'], explain: 'non + conosce + nessuno. Terza sg.' },
          { answer: 'non parliamo veloce', accepted: ['non parliamo veloce'], explain: 'Noi non parliamo — prima pl negativa.' },
          { answer: 'Non abbiamo fretta', accepted: ['non abbiamo fretta'], explain: 'Noi non abbiamo — avere prima pl.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la oración negativa completa.',
        type: 'write',
        items: [
          {
            scene: 'No hablo inglés',
            prompt: 'Escribe: Yo no hablo inglés, hablo italiano. → Io ___ inglese, parlo italiano. (parlare)',
            answer: 'Io non parlo inglese, parlo italiano.',
            accepted: ['io non parlo inglese parlo italiano', 'io non parlo inglese, parlo italiano.'],
            explain: 'Non parlo — non antes del verbo conjugado.',
          },
          {
            scene: 'Nunca bebo café',
            prompt: 'Escribe: Ella nunca bebe café. → Lei ___ caffè. (bere / mai)',
            answer: 'Lei non beve mai caffè.',
            accepted: ['lei non beve mai caffè', 'lei non beve mai caffe'],
            explain: 'Non beve mai — non + verbo + mai. Mai después del verbo.',
          },
          {
            scene: 'No entendemos nada',
            prompt: 'Escribe: No entendemos nada en la clase avanzada. → Noi ___ in classe avanzata. (capire / niente)',
            answer: 'Noi non capiamo niente in classe avanzata.',
            accepted: ['noi non capiamo niente in classe avanzata', 'non capiamo niente in classe avanzata'],
            explain: 'Noi non capiamo niente — noi + non + capire (noi: -iamo, sin -isc-) + niente.',
          },
          {
            scene: 'Todavía no termina',
            prompt: 'Escribe: Marco todavía no termina el trabajo. → Marco ___ il lavoro. (finire / ancora)',
            answer: 'Marco non finisce ancora il lavoro.',
            accepted: ['marco non finisce ancora il lavoro', 'marco non finisce ancora il lavoro.'],
            explain: 'Non finisce ancora — non + -isc- terza sg + ancora.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Escribe oraciones negativas describiendo cosas que no haces.',
        type: 'write',
        items: [
          {
            scene: 'Lo que no haces',
            prompt: 'Di tre cose che non fai mai: Non ___ mai. Non ___ niente. Non ___.',
            answer: 'Non mangio mai carne. Non capisco niente di matematica. Non dormo dopo le undici.',
            accepted: ['non mangio mai', 'non capisco niente', 'non dormo mai'],
            explain: 'non...mai, non...niente — formas negativas reforzadas.',
          },
          {
            scene: 'Tu compañero tampoco',
            prompt: 'Il tuo amico non fa queste cose. Scrivi: Lui/Lei non ___ e non ___.',
            answer: 'Lui non mangia mai la carne e non beve caffè.',
            accepted: ['lui non mangia mai', 'lei non beve mai', 'lui non mangia e non beve'],
            explain: 'Terza sg negativa: non mangia, non beve, non capisce...',
          },
          {
            scene: 'En WeLearn',
            prompt: 'A WeLearn noi non ___. Gli studenti non ___.',
            answer: 'A WeLearn noi non parliamo mai in inglese. Gli studenti non capiscono niente senza praticare.',
            accepted: ['noi non parliamo mai in inglese gli studenti non capiscono niente senza praticare', 'noi non parliamo mai inglese'],
            explain: 'non...mai (noi), non...niente (loro capiscono -isc-).',
          },
        ],
      },
    ],
  },
}

export default topic
