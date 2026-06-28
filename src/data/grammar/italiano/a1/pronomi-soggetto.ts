import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomi-soggetto',
  order: '01',
  color: '#009246',
  category: 'Pronombres',
  level: 'A1',
  title: 'Pronomi Soggetto en italiano A1 — Pronombres personales',
  shortTitle: 'Pronomi soggetto',
  metaTitle: 'Pronomi soggetto italiano A1 — io tu lui lei noi voi loro',
  description:
    'Los pronombres de sujeto del italiano (io, tu, lui, lei, noi, voi, loro) equivalen a los del español con diferencias clave: lei significa "ella" pero también "usted" formal (Lei con mayúscula), y los pronombres se omiten frecuentemente porque la conjugación los hace redundantes.',
  lead: 'io/tu/lui/lei/noi/voi/loro. En italiano el sujeto suele omitirse: "parlo" ya significa "yo hablo". Pero hay que conocerlos para el énfasis y para reconocerlos al escuchar.',
  outcomes: [
    'Identifica los pronombres de sujeto del italiano',
    'Distingue lei (ella) de Lei (usted formal)',
    'Sabe cuándo omitir el pronombre como hace un hablante nativo',
  ],

  guide: {
    goal: 'Usar y reconocer los pronombres de sujeto del italiano y entender cuándo pueden omitirse.',
    model: 'Parlo italiano. (Hablo italiano.) / Lei parla molto bene. (Ella habla muy bien. / Usted habla muy bien.)',
    formula: '[pronombre opcional] + verbo conjugado',
    decisions: [
      'io = yo | tu = tú | lui = él | lei = ella | noi = nosotros | voi = vosotros | loro = ellos/as',
      'Lei (mayúscula) = usted formal — mismo pronombre que lei (ella)',
      'En italiano se omite el pronombre normalmente: "Parlo" = "Yo hablo"',
      'Se usa el pronombre para énfasis o contraste: "Io non lo so, tu lo sai!" (Yo no lo sé, ¡tú sí!)',
      'No existe distinción masculino/femenino en primera y segunda persona (io, tu, noi, voi)',
    ],
    table: [
      ['Pronombre', 'Equivalente español', 'Nota'],
      ['io', 'yo', 'Se omite frecuentemente'],
      ['tu', 'tú', 'Informal; no lleva acento'],
      ['lui / lei', 'él / ella', 'lei también = usted formal (Lei)'],
      ['noi', 'nosotros/as', 'Sin distinción de género'],
      ['voi', 'vosotros/as', 'Sin distinción de género'],
      ['loro', 'ellos/ellas', 'También = ustedes (formal plural)'],
    ],
    mistakes: [
      '"io" nunca lleva acento — "ìo" no existe. Solo "io" en minúscula salvo inicio de frase.',
      '"lei" = ella SIEMPRE; "Lei" (mayúscula) = usted. En oral, el contexto distingue.',
      'En italiano NO existe "vos" como en el español latinoamericano. La forma de respeto es "Lei" (3ª singular).',
    ],
  },
  seo: [
    {
      heading: 'Pronombres de sujeto del italiano: io, tu, lui, lei, noi, voi, loro',
      paragraphs: [
        'Los pronombres de sujeto del italiano son: io (yo), tu (tú), lui (él), lei (ella), noi (nosotros/as), voi (vosotros/as), loro (ellos/ellas). Para el hispanohablante son fáciles de aprender porque la lógica es idéntica al español, pero hay diferencias importantes.',
        'La principal diferencia es que en italiano los pronombres de sujeto se omiten con mucha más frecuencia que en español. Mientras en español "hablo" ya implica "yo" pero solemos añadirlo, en italiano "parlo" es completamente natural sin "io". El pronombre se añade solo para énfasis o contraste.',
      ],
    },
    {
      heading: 'Lei: ella y usted al mismo tiempo',
      paragraphs: [
        'Una particularidad del italiano es que "lei" sirve tanto para "ella" como para "usted" formal. Cuando se escribe, la forma de respeto se suele capitalizar como "Lei". En la lengua oral el contexto lo aclara: si hablas con tu jefe, "Lei lavora molto" = "Usted trabaja mucho"; si hablas de tu amiga, "lei lavora molto" = "ella trabaja mucho".',
        'Esta diferencia es fundamental porque el verbo se conjuga igual en ambos casos (en tercera persona singular). Solo el contexto y la mayúscula escrita diferencian "ella" de "usted". Este sistema de cortesía con la tercera persona es similar al alemán (Sie).',
      ],
    },
    {
      heading: 'Cuándo omitir el pronombre en italiano',
      paragraphs: [
        'En italiano, los pronombres de sujeto son opcionales porque las terminaciones verbales identifican la persona. "Mangio" = yo como, "mangi" = tú comes, "mangia" = él/ella come. Por eso un hablante nativo dice "Parlo italiano" sin "io" a menos que quiera enfatizar que es él quien habla.',
        'Se usan los pronombres en tres casos: (1) énfasis: "Io non ci credo!" (¡Yo no me lo creo!); (2) contraste: "Tu parli italiano, io parlo spagnolo" (Tú hablas italiano, yo español); (3) cuando el verbo se omite: "Chi parla italiano? Io." (¿Quién habla italiano? Yo.).',
      ],
    },
  ],
  visual: {
    mode: 'pronoun-chart',
    teacherLens: 'El estudiante entiende que el pronombre es opcional en italiano y aprende la distinción lei/Lei.',
    graphicPrompt: 'Tabla de pronombres con nota de omisión frecuente y lei/Lei destacados.',
    scene: [
      ['io / tu', 'yo / tú (omisión frecuente)'],
      ['lui / lei / Lei', 'él / ella / usted'],
      ['noi / voi / loro', 'nosotros / vosotros / ellos'],
    ],
    learnerModes: ['visual: tabla paralela español-italiano', 'analítico: cuándo omitir vs incluir', 'oral: presentación en italiano'],
    reviewFocus: ['lei vs Lei', 'omisión del sujeto', 'énfasis con pronombre explícito'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre italiano correcto para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Presentándote',
            lines: [['Carlo', '___ mi chiamo Carlo. (Me llamo Carlo.)']],
            options: ['Io', 'Lui', 'Lei', 'Voi'],
            answer: 'Io',
            explain: 'Io = yo. Primera persona singular.',
          },
          {
            scene: 'Hablando de ella',
            lines: [['Marco', '___ è molto brava. (Ella es muy buena.)']],
            options: ['Lei', 'Lui', 'Voi', 'Noi'],
            answer: 'Lei',
            explain: 'Lei = ella. Tercera persona singular femenino.',
          },
          {
            scene: 'Preguntando a un amigo',
            lines: [['Sofia', '___ parli italiano? (¿Tú hablas italiano?)']],
            options: ['Tu', 'Voi', 'Lei', 'Loro'],
            answer: 'Tu',
            explain: 'Tu = tú. Segunda persona singular informal.',
          },
          {
            scene: 'Hablando de ellos',
            lines: [['Anna', '___ studiano molto. (Ellos estudian mucho.)']],
            options: ['Loro', 'Voi', 'Noi', 'Lei'],
            answer: 'Loro',
            explain: 'Loro = ellos/ellas. Tercera persona plural.',
          },
          {
            scene: 'Nosotros',
            lines: [['Luca', '___ siamo italiani. (Nosotros somos italianos.)']],
            options: ['Noi', 'Voi', 'Loro', 'Io'],
            answer: 'Noi',
            explain: 'Noi = nosotros/as. Primera persona plural.',
          },
          {
            scene: 'Respeto formal al profesor',
            lines: [['Studente', '___ parla molto bene, professore! (¡Usted habla muy bien, profesor!)']],
            options: ['Lei', 'Tu', 'Voi', 'Lui'],
            answer: 'Lei',
            explain: 'Lei (mayúscula en escrito) = usted formal. Mismo pronombre que ella, conjugado igual.',
          },
          {
            scene: 'Énfasis en vosotros',
            lines: [['David', '___ parlate italiano molto bene! (¡Vosotros habláis italiano muy bien!)']],
            options: ['Voi', 'Loro', 'Noi', 'Tu'],
            answer: 'Voi',
            explain: 'Voi = vosotros/as. Segunda persona plural.',
          },
          {
            scene: 'Él es el jefe',
            lines: [['Ana', '___ è il direttore. (Él es el director.)']],
            options: ['Lui', 'Lei', 'Voi', 'Noi'],
            answer: 'Lui',
            explain: 'Lui = él. Tercera persona singular masculino.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Sujeto en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos pronombres del diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Presentación mutua',
            lines: [
              ['Carlo', '[[0]] mi chiamo Carlo. E [[1]]?'],
              ['Sofia', 'Io mi chiamo Sofia.'],
            ],
            blanks: [
              { options: ['Io', 'Tu', 'Lei'], answer: 'Io', explain: 'Io = yo. Carlo se presenta.' },
              { options: ['tu', 'lui', 'voi'], answer: 'tu', explain: 'E tu? = ¿Y tú? Pregunta informal.' },
            ],
          },
          {
            scene: 'Él y ella',
            lines: [['Marco', '[[0]] studia medicina. E [[1]] cosa studia?']],
            blanks: [
              { options: ['Lei', 'Lui', 'Noi'], answer: 'Lei', explain: 'Lei = ella. Habla de una chica.' },
              { options: ['lui', 'voi', 'loro'], answer: 'lui', explain: 'E lui = ¿Y él? Pregunta sobre otro.' },
            ],
          },
          {
            scene: 'Contraste nosotros/vosotros',
            lines: [['David', '[[0]] siamo di Bogotá. E [[1]], di dove siete?']],
            blanks: [
              { options: ['Noi', 'Voi', 'Loro'], answer: 'Noi', explain: 'Noi = nosotros. David habla del grupo.' },
              { options: ['voi', 'loro', 'noi'], answer: 'voi', explain: 'E voi = ¿Y vosotros? Segunda persona plural.' },
            ],
          },
          {
            scene: 'Ellos y usted',
            lines: [['Studente', '[[0]] studiano francese. E [[1]], professore, insegna anche il francese?']],
            blanks: [
              { options: ['Loro', 'Noi', 'Voi'], answer: 'Loro', explain: 'Loro = ellos. Habla de los demás alumnos.' },
              { options: ['Lei', 'Tu', 'Lui'], answer: 'Lei', explain: 'Lei (usted formal) al hablarle al profesor.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Presentaciones en italiano',
        tag: 'Opciones',
        intro: 'Completa el texto de presentación con el pronombre correcto.',
        type: 'guidedText',
        scene: 'Presentación en una clase de italiano',
        text: '[[0]] mi chiamo Sofia. Sono di Milano. Il mio amico si chiama Marco — [[1]] è di Roma. La nostra insegnante è Zhanna — [[2]] insegna italiano e russo. [[3]] studiamo insieme da sei mesi. E [[4]], di dove siete?',
        blanks: [
          { options: ['Io', 'Tu', 'Lei'], answer: 'Io', explain: 'Io = yo. Sofia se presenta.' },
          { options: ['lui', 'lei', 'voi'], answer: 'lui', explain: 'Lui = él. Habla del amigo Marco.' },
          { options: ['Lei', 'Lui', 'Loro'], answer: 'Lei', explain: 'Lei = ella. Habla de la profesora Zhanna.' },
          { options: ['Noi', 'Voi', 'Loro'], answer: 'Noi', explain: 'Noi = nosotros. Sofia y Marco estudian juntos.' },
          { options: ['voi', 'loro', 'tu'], answer: 'voi', explain: 'E voi = ¿Y vosotros? Pregunta al grupo.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin ayuda',
        tag: 'Sin opciones',
        intro: 'Escribe el pronombre correcto sin opciones.',
        type: 'freeText',
        scene: 'Conversación en WeLearn Italiano',
        text: 'David è poliglotta — [[0]] parla otto lingue. Zhanna insegna con lui — [[1]] è di origine ucraina. [[2]] lavoriamo bene insieme. Gli studenti sono molto motivati — [[3]] studiano ogni giorno. E [[4]], studentessa, come stai?',
        blanks: [
          { answer: 'lui', explain: 'Lui = él. Habla de David.' },
          { answer: 'lei', explain: 'Lei = ella. Habla de Zhanna.' },
          { answer: 'Noi', accepted: ['noi'], explain: 'Noi = nosotros. David y Zhanna trabajan juntos.' },
          { answer: 'loro', explain: 'Loro = ellos. Los estudiantes.' },
          { answer: 'tu', explain: 'Tu = tú. Pregunta informal a la estudiante.' },
        ],
      },
      {
        id: 'l5',
        title: 'Traduciendo pronombres',
        tag: 'Producción',
        intro: 'Escribe la frase italiana con el pronombre indicado.',
        type: 'write',
        items: [
          {
            scene: 'Presentación',
            prompt: 'Escribe: Yo soy italiano. → ___ sono italiano.',
            answer: 'Io sono italiano.',
            accepted: ['io sono italiano', 'io sono italiano.'],
            explain: 'Io = yo. En italiano también puede omitirse: Sono italiano.',
          },
          {
            scene: 'Ella habla',
            prompt: 'Escribe: Ella habla muy bien. → ___ parla molto bene.',
            answer: 'Lei parla molto bene.',
            accepted: ['lei parla molto bene', 'lei parla molto bene.'],
            explain: 'Lei = ella. Tercera persona singular femenino.',
          },
          {
            scene: 'Nosotros estudiamos',
            prompt: 'Escribe: Nosotros estudiamos italiano. → ___ studiamo italiano.',
            answer: 'Noi studiamo italiano.',
            accepted: ['noi studiamo italiano', 'noi studiamo italiano.'],
            explain: 'Noi = nosotros. Primera persona plural.',
          },
          {
            scene: 'Pregunta a vosotros',
            prompt: 'Escribe: ¿Vosotros sois de Italia? → ___ siete di Italia?',
            answer: 'Voi siete di Italia?',
            accepted: ['voi siete di italia?', 'voi siete di italia'],
            explain: 'Voi = vosotros. Segunda persona plural.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: preséntate en italiano',
        tag: 'Reto final',
        intro: 'Escribe una mini-presentación en italiano usando al menos 3 pronombres distintos.',
        type: 'write',
        items: [
          {
            scene: 'Presentación personal',
            prompt: 'Io mi chiamo ___. ___ sono di ___. Il mio/La mia [amico/a] si chiama ___ — ___ è di ___.',
            answer: 'Io mi chiamo Sofia. Io sono di Madrid. Il mio amico si chiama Carlo — lui è di Roma.',
            accepted: [
              'io mi chiamo sofia io sono di madrid il mio amico si chiama carlo lui è di roma',
              'io mi chiamo carlos io sono di bogotá la mia amica si chiama ana lei è di medellín',
            ],
            explain: 'Io per sé, lui/lei per altri. Struttura di presentazione in italiano A1.',
          },
          {
            scene: 'Habla de tu grupo de estudio',
            prompt: 'Noi studiamo ___. ___ siamo ___. Il professore si chiama ___ — ___ insegna molto bene.',
            answer: 'Noi studiamo italiano. Noi siamo studenti. Il professore si chiama David — lui insegna molto bene.',
            accepted: [
              'noi studiamo italiano noi siamo studenti il professore si chiama david lui insegna molto bene',
              'noi studiamo italiano noi siamo di bogotá il professore si chiama david lui insegna molto bene',
            ],
            explain: 'Noi per il gruppo, lui per il professore. Omissione normale in italiano.',
          },
          {
            scene: 'Contraste yo vs ellos',
            prompt: 'Usa io y loro en contraste: ___ studio ___, loro studiano ___.',
            answer: 'Io studio italiano, loro studiano inglese.',
            accepted: ['io studio italiano loro studiano inglese', 'io studio spagnolo loro studiano italiano'],
            explain: 'Pronombres explícitos para contraste: io vs loro.',
          },
        ],
      },
    ],
  },
}

export default topic
