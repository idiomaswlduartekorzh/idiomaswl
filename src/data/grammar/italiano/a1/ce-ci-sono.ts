import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ce-ci-sono',
  order: '14',
  color: '#009246',
  category: 'Estructura de la oración',
  level: 'A1',
  title: 'C\'è e Ci sono en italiano A1 — Cómo expresar "hay"',
  shortTitle: 'C\'è / Ci sono (hay)',
  metaTitle: 'C\'è ci sono italiano A1 — hay en italiano singular plural negativo interrogativo',
  description:
    'Para expresar "hay" en italiano se usa c\'è (singular) o ci sono (plural). C\'è un professore. Ci sono due studenti. Negativo: non c\'è / non ci sono. Pregunta: C\'è...? / Ci sono...? A diferencia del español, el italiano distingue siempre singular y plural.',
  lead: 'Hay → c\'è (singular) o ci sono (plural). C\'è un caffè? Sì, c\'è! Ci sono studenti in classe. Non c\'è nessuno. A diferencia del español "hay" (único), el italiano usa dos formas distintas según el número.',
  outcomes: [
    'Usa c\'è para singular y ci sono para plural en oraciones afirmativas',
    'Forma preguntas con C\'è...? / Ci sono...? y respuestas con sì/no',
    'Aplica la negación non c\'è / non ci sono correctamente',
  ],

  guide: {
    goal: 'Expresar existencia y presencia con c\'è y ci sono en italiano A1.',
    model: 'C\'è un professore in classe. / Ci sono venti studenti. / Non c\'è nessuno. / C\'è un bar qui?',
    formula: 'c\'è + sustantivo singular | ci sono + sustantivo plural | non c\'è / non ci sono (negativo)',
    decisions: [
      'C\'è = hay (singular): c\'è un libro, c\'è una finestra, c\'è l\'insegnante',
      'Ci sono = hay (plural): ci sono libri, ci sono due studenti, ci sono le penne',
      'Negativo singular: non c\'è + nome: non c\'è tempo, non c\'è nessuno',
      'Negativo plural: non ci sono + nome pl.: non ci sono studenti, non ci sono problemi',
      'Interrogativo: C\'è...? / Ci sono...? — C\'è un bar vicino? / Ci sono posti liberi?',
      'C\'è = ci + è (ci es pronome di luogo, è è il verbo essere alla terza sg.)',
      'Ci sono = ci + sono (essere alla terza plurale)',
      'Con "ecco" (¡aquí/mira!): Ecco il libro! — diferente de c\'è (hay)',
    ],
    table: [
      ['Forma', 'Uso', 'Ejemplo'],
      ['c\'è', 'hay (singular)', 'C\'è un professore.'],
      ['ci sono', 'hay (plural)', 'Ci sono venti studenti.'],
      ['non c\'è', 'no hay (singular)', 'Non c\'è tempo.'],
      ['non ci sono', 'no hay (plural)', 'Non ci sono problemi.'],
      ['C\'è...?', 'pregunta singular', 'C\'è un bar qui?'],
      ['Ci sono...?', 'pregunta plural', 'Ci sono posti liberi?'],
    ],
    mistakes: [
      '"Ci è un libro" — MAL: con elisión ci + è → c\'è: "C\'è un libro".',
      '"C\'è studenti" — MAL: con plural → ci sono: "Ci sono studenti".',
      '"Hay" en español es uno solo; en italiano SIEMPRE debes elegir c\'è o ci sono.',
    ],
  },
  seo: [
    {
      heading: 'C\'è y Ci sono: la distinción que el español no tiene',
      paragraphs: [
        'En español, "hay" funciona para singular y plural: "hay un estudiante" y "hay estudiantes". En italiano, esta distinción es obligatoria: c\'è para singular (hay uno) y ci sono para plural (hay varios). C\'è un problema (hay un problema) vs Ci sono problemi (hay problemas).',
        'C\'è es la unión de ci (pronombre de lugar o existencial) y è (tercera persona singular de essere). Ci sono combina ci con sono (tercera persona plural). La i del ci se elide ante vocal: ci + è → c\'è. Por eso siempre se escribe con apóstrofo.',
      ],
    },
    {
      heading: 'Usos principales en la comunicación cotidiana',
      paragraphs: [
        'C\'è y ci sono son fundamentales para describir lugares, habitaciones y situaciones. "C\'è una farmacia vicino?" (¿Hay una farmacia cerca?), "Ci sono molti ristoranti in questa via" (Hay muchos restaurantes en esta calle). También para describir personas presentes: "Chi c\'è in classe oggi?" (¿Quién hay en clase hoy?).',
        'En contexto de aula es igualmente frecuente: "C\'è qualcuno che non capisce?" (¿Hay alguien que no entiende?), "Ci sono domande?" (¿Hay preguntas?), "Non c\'è problema!" (¡No hay problema!). Estas fórmulas aparecen en cada clase.',
      ],
    },
    {
      heading: 'C\'è vs Ecco: dos formas de presentar algo',
      paragraphs: [
        'C\'è describe existencia o presencia: C\'è il professore (hay/está el profesor). Ecco presenta o señala algo de forma inmediata: Ecco il professore! (¡Aquí está el profesor! / ¡Mira, el profesor!). Ecco equivale a "voilà" en francés — es deíctico, no describe existencia.',
        'Tampoco hay que confundir c\'è con è: "Il professore è qui" (El profesor está aquí — describe ubicación de algo ya identificado) vs "C\'è un professore" (Hay un profesor — introduce nuevo referente). C\'è siempre introduce información nueva.',
      ],
    },
  ],
  visual: {
    mode: 'sentence-structure',
    teacherLens: 'El estudiante memoriza c\'è (singular) y ci sono (plural) como las dos formas del "hay" italiano, opuestas al "hay" único español.',
    graphicPrompt: 'Dos columnas: c\'è (singular, un elemento) y ci sono (plural, varios). Sala de clase con etiquetas. Negativos marcados en rojo.',
    scene: [
      ['c\'è + singular', 'C\'è un libro / una finestra'],
      ['ci sono + plural', 'Ci sono libri / studenti'],
      ['non c\'è / non ci sono', 'Non c\'è tempo / problemi'],
      ['C\'è...? / Ci sono...?', 'Pregunta de existencia'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['c\'è singular vs ci sono plural', 'elisión ci+è → c\'è', 'non c\'è / non ci sono', 'C\'è no = Ecco'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'C\'è o Ci sono',
        tag: 'Opción múltiple',
        intro: 'Elige c\'è o ci sono según el sustantivo sea singular o plural.',
        type: 'choice',
        items: [
          {
            scene: 'En la clase',
            lines: [['David', '___ un nuovo studente oggi in classe.']],
            options: ['C\'è', 'Ci sono', 'È', 'Sono'],
            answer: 'C\'è',
            explain: 'Un nuovo studente = singular → c\'è.',
          },
          {
            scene: 'Muchos libros',
            lines: [['Sofia', '___ molti libri sul tavolo del professore.']],
            options: ['Ci sono', 'C\'è', 'È', 'Hanno'],
            answer: 'Ci sono',
            explain: 'Molti libri = plural → ci sono.',
          },
          {
            scene: 'No hay tiempo',
            lines: [['Zhanna', 'Non ___ tempo per tutto oggi. Dobbiamo essere veloci.']],
            options: ['c\'è', 'ci sono', 'è', 'hanno'],
            answer: 'c\'è',
            explain: 'Tempo = singular → non c\'è tempo.',
          },
          {
            scene: '¿Hay preguntas?',
            lines: [['David', '___ domande prima di finire la lezione?']],
            options: ['Ci sono', 'C\'è', 'Sono', 'Ha'],
            answer: 'Ci sono',
            explain: 'Domande = plural → ci sono domande?',
          },
          {
            scene: '¿Hay un bar cerca?',
            lines: [['Carlo', 'Scusi, ___ un bar vicino alla scuola?']],
            options: ['c\'è', 'ci sono', 'è', 'sono'],
            answer: 'c\'è',
            explain: 'Un bar = singular → c\'è un bar.',
          },
          {
            scene: 'No hay estudiantes',
            lines: [['Ana', 'Non ___ studenti oggi — è giorno di festa.']],
            options: ['ci sono', 'c\'è', 'sono', 'è'],
            answer: 'ci sono',
            explain: 'Studenti = plural → non ci sono studenti.',
          },
          {
            scene: '¿Hay una farmacia?',
            lines: [['Lina', 'Dove ___ una farmacia qui vicino?']],
            options: ['c\'è', 'ci sono', 'è', 'ci è'],
            answer: 'c\'è',
            explain: 'Una farmacia = singular → dove c\'è una farmacia?',
          },
          {
            scene: 'No hay problema',
            lines: [['Marco', 'Tranquillo! Non ___ nessun problema!']],
            options: ['c\'è', 'ci sono', 'è', 'sono'],
            answer: 'c\'è',
            explain: 'Nessun problema = singular → non c\'è nessun problema.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogo: descubriendo WeLearn',
        tag: '2 espacios',
        intro: 'Completa el diálogo con c\'è o ci sono.',
        type: 'dual',
        items: [
          {
            scene: 'En la recepción de WeLearn',
            lines: [
              ['Carlo', '[[0]] un professore disponibile ora?'],
              ['Receptionist', 'Sì, [[0]] David — è in aula 3. [[1]] anche altri studenti lì.'],
            ],
            blanks: [
              { options: ['c\'è', 'ci sono'], answer: 'c\'è', explain: 'Un professore = singular → c\'è.' },
              { options: ['ci sono', 'c\'è'], answer: 'ci sono', explain: 'Altri studenti = plural → ci sono.' },
            ],
          },
          {
            scene: 'Describiendo la clase',
            lines: [['David', 'In questa classe [[0]] venti sedie e [[1]] una lavagna grande.']],
            blanks: [
              { options: ['ci sono', 'c\'è'], answer: 'ci sono', explain: 'Venti sedie = plural → ci sono.' },
              { options: ['c\'è', 'ci sono'], answer: 'c\'è', explain: 'Una lavagna = singular → c\'è.' },
            ],
          },
          {
            scene: 'Lo que no hay',
            lines: [['Zhanna', 'In questo corso non [[0]] esami scritti e non [[1]] compiti difficili.']],
            blanks: [
              { options: ['ci sono', 'c\'è'], answer: 'ci sono', explain: 'Esami = plural → non ci sono.' },
              { options: ['ci sono', 'c\'è'], answer: 'ci sono', explain: 'Compiti = plural → non ci sono.' },
            ],
          },
          {
            scene: 'Buscando algo',
            lines: [
              ['Sofia', '[[0]] una penna in classe?'],
              ['Marco', 'Sì, [[0]] tre penne sul tavolo.'],
            ],
            blanks: [
              { options: ['c\'è', 'ci sono'], answer: 'c\'è', explain: 'Una penna = singular → c\'è.' },
              { options: ['ci sono', 'c\'è'], answer: 'ci sono', explain: 'Tre penne = plural → ci sono.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Descrivendo la scuola',
        tag: 'Opciones',
        intro: 'Completa la descripción de WeLearn con c\'è o ci sono.',
        type: 'guidedText',
        scene: 'David presenta la academia WeLearn a nuevos estudiantes',
        text: 'Benvenuti a WeLearn! [[0]] due aule grandi e una piccola. [[1]] una segreteria dove potete fare domande. [[2]] una cucina per il caffè. [[3]] venti studenti iscritti questo mese. [[4]] una biblioteca con libri in italiano. Non [[5]] parcheggio — siamo in centro. [[6]] un autobus che si ferma qui vicino.',
        blanks: [
          { options: ['Ci sono', 'C\'è'], answer: 'Ci sono', explain: 'Due aule = plural → ci sono.' },
          { options: ['C\'è', 'Ci sono'], answer: 'C\'è', explain: 'Una segreteria = singular → c\'è.' },
          { options: ['C\'è', 'Ci sono'], answer: 'C\'è', explain: 'Una cucina = singular → c\'è.' },
          { options: ['Ci sono', 'C\'è'], answer: 'Ci sono', explain: 'Venti studenti = plural → ci sono.' },
          { options: ['C\'è', 'Ci sono'], answer: 'C\'è', explain: 'Una biblioteca = singular → c\'è.' },
          { options: ['c\'è', 'ci sono'], answer: 'c\'è', explain: 'Parcheggio = singular → non c\'è parcheggio.' },
          { options: ['C\'è', 'Ci sono'], answer: 'C\'è', explain: 'Un autobus = singular → c\'è.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe c\'è o ci sono según corresponda.',
        type: 'freeText',
        scene: 'Ana describe su barrio y su casa a la clase de italiano',
        text: '[[0]] molte cose interessanti nel mio quartiere. [[1]] un parco grande vicino a casa mia. [[2]] tre supermercati e [[3]] anche un mercato all\'aperto. In casa mia [[4]] tre stanze da letto. Non [[5]] un garage. [[6]] una vista bellissima dalla finestra!',
        blanks: [
          { answer: 'Ci sono', explain: 'Molte cose = plural → ci sono.' },
          { answer: 'C\'è', explain: 'Un parco = singular → c\'è.' },
          { answer: 'Ci sono', explain: 'Tre supermercati = plural → ci sono.' },
          { answer: 'c\'è', explain: 'Un mercato = singular → c\'è.' },
          { answer: 'ci sono', explain: 'Tre stanze = plural → ci sono.' },
          { answer: 'c\'è', explain: 'Un garage = singular → non c\'è.' },
          { answer: 'C\'è', explain: 'Una vista = singular → c\'è.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la oración completa usando c\'è o ci sono.',
        type: 'write',
        items: [
          {
            scene: 'Hay un profesor',
            prompt: 'Escribe: Hay un profesor muy bueno en WeLearn. → ___ un professore molto bravo a WeLearn.',
            answer: 'C\'è un professore molto bravo a WeLearn.',
            accepted: ['c\'è un professore molto bravo a welearn', 'c\'e un professore molto bravo a welearn'],
            explain: 'Un professore = singular → c\'è.',
          },
          {
            scene: 'No hay problema',
            prompt: 'Escribe: No hay ningún problema con el horario. → ___ nessun problema con l\'orario.',
            answer: 'Non c\'è nessun problema con l\'orario.',
            accepted: ['non c\'è nessun problema con l\'orario', 'non c\'e nessun problema'],
            explain: 'Nessun problema = singular → non c\'è.',
          },
          {
            scene: 'Hay muchos estudiantes',
            prompt: 'Escribe: Hay muchos estudiantes de italiano en Colombia. → ___ molti studenti di italiano in Colombia.',
            answer: 'Ci sono molti studenti di italiano in Colombia.',
            accepted: ['ci sono molti studenti di italiano in colombia', 'ci sono molti studenti'],
            explain: 'Molti studenti = plural → ci sono.',
          },
          {
            scene: '¿Hay preguntas?',
            prompt: 'Pregunta a la clase: ¿Hay preguntas sobre la gramática? → ___ domande sulla grammatica?',
            answer: 'Ci sono domande sulla grammatica?',
            accepted: ['ci sono domande sulla grammatica', 'ci sono domande sulla grammatica?'],
            explain: 'Domande = plural → ci sono? (interrogativo).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe un lugar usando c\'è y ci sono.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu clase',
            prompt: 'Descrivi la tua classe: C\'è ___. Ci sono ___. Non c\'è ___.',
            answer: 'C\'è una lavagna grande. Ci sono venti studenti. Non c\'è un televisore.',
            accepted: ['c\'è una lavagna', 'ci sono studenti', 'non c\'è'],
            explain: 'C\'è + singular, ci sono + plural, non c\'è + singular.',
          },
          {
            scene: 'Describe tu barrio',
            prompt: 'Descrivi il tuo quartiere: C\'è ___. Ci sono ___. Non ci sono ___.',
            answer: 'C\'è un parco vicino. Ci sono molti negozi. Non ci sono problemi di traffico.',
            accepted: ['c\'è un parco', 'ci sono negozi', 'non ci sono problemi'],
            explain: 'C\'è + singular, ci sono + plural, non ci sono + plural.',
          },
          {
            scene: 'WeLearn en preguntas',
            prompt: 'Fai domande su WeLearn: C\'è ___? Ci sono ___?',
            answer: 'C\'è un corso di italiano per principianti? Ci sono studenti avanzati nella scuola?',
            accepted: ['c\'è un corso', 'ci sono studenti', 'c\'è una classe', 'ci sono corsi'],
            explain: 'Preguntas con c\'è (singular) y ci sono (plural).',
          },
        ],
      },
    ],
  },
}

export default topic
