import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbo-essere',
  order: '02',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A1',
  title: 'Verbo Essere en italiano A1 — Ser y Estar',
  shortTitle: 'Essere (ser/estar)',
  metaTitle: 'Verbo essere italiano A1 — conjugación (sono, sei, è) y usos: ser y estar',
  description:
    'El verbo essere es uno de los más irregulares e importantes del italiano. Equivale tanto a "ser" como a "estar" del español, con una diferencia clave: en italiano el contexto determina cuál de los dos verbos españoles corresponde, ya que essere los cubre a los dos.',
  lead: 'Essere = ser + estar. sono/sei/è/siamo/siete/sono. En italiano no existe separación entre "ser" y "estar" como en español — essere los hace a ambos.',
  outcomes: [
    'Conjuga essere en presente para todos los sujetos',
    'Usa essere para identidad, profesión, origen y estados',
    'Forma negaciones con non essere y preguntas por inversión',
  ],

  guide: {
    goal: 'Conjugar essere correctamente y usarlo para identificación, origen, profesión y descripción.',
    model: 'Sono italiano. (Soy italiano.) / Sono a Roma. (Estoy en Roma.) / È stanco. (Está cansado.)',
    formula: '[sujeto] + sono/sei/è/siamo/siete/sono + [complemento]',
    decisions: [
      'sono → io y loro (¡misma forma!): Io sono / Loro sono',
      'sei → tu: Sei di Milano?',
      'è → lui/lei/Lei: È il professore.',
      'siamo → noi: Siamo studenti.',
      'siete → voi: Siete bravi!',
      'Negación: non + essere: Non sono stanco. Non è italiano.',
      'Professione SIN artículo: Sono insegnante. (NO: Sono un insegnante.)',
    ],
    table: [
      ['Sujeto', 'Essere', 'Ejemplo'],
      ['io', 'sono', 'Sono colombiano.'],
      ['tu', 'sei', 'Sei di Roma?'],
      ['lui/lei', 'è', 'È molto intelligente.'],
      ['noi', 'siamo', 'Siamo in classe.'],
      ['voi', 'siete', 'Siete bravi!'],
      ['loro', 'sono', 'Sono amici.'],
    ],
    mistakes: [
      '"io sono" y "loro sono" son iguales — el contexto diferencia. No añadas -no a loro.',
      'Professione sin artículo: "Sono medico" ✓ (no "Sono un medico" salvo modificador).',
      '"Non è" — la negación siempre antes del verbo: non è, non sei, non siamo.',
    ],
  },
  seo: [
    {
      heading: 'Essere: el verbo fundamental del italiano',
      paragraphs: [
        'Essere (ser/estar) es el verbo más usado del italiano. Su conjugación es completamente irregular: sono, sei, è, siamo, siete, sono. Para el hispanohablante la buena noticia es que no hay que elegir entre "ser" y "estar" — essere cubre los dos. Además es el auxiliar de muchos tiempos compuestos (sono andato = he ido).',
        'Estos son los usos que debes reconocer de un vistazo, cada uno con su ejemplo:',
      ],
      table: [
        ['Uso', 'Ejemplo (italiano)', 'Español'],
        ['Identidad', 'Sono Marco.', 'Soy Marco.'],
        ['Nacionalidad / origen', 'Sei di Napoli?', '¿Eres de Nápoles?'],
        ['Profesión', 'È insegnante.', 'Es profesor(a).'],
        ['Ubicación / estado', 'Siamo in classe.', 'Estamos en clase.'],
        ['Descripción', 'È stanco.', 'Está cansado.'],
        ['Hora', 'Sono le tre.', 'Son las tres.'],
      ],
    },
    {
      heading: '¿Essere es "ser" o "estar"? La clave está en el contexto',
      paragraphs: [
        'La duda número uno del hispanohablante: como en español separamos "ser" y "estar", uno espera dos verbos en italiano. Pero essere hace los dos trabajos; es el contexto —no el verbo— el que decide la traducción. Observa el mismo verbo traducido de las dos formas:',
      ],
      table: [
        ['Frase italiana', 'Traducción', '¿Ser o estar?'],
        ['Sono italiano.', 'Soy italiano.', 'ser (identidad)'],
        ['Sono felice.', 'Estoy feliz.', 'estar (estado)'],
        ['È il mio amico.', 'Es mi amigo.', 'ser (relación)'],
        ['È a casa.', 'Está en casa.', 'estar (lugar)'],
        ['Siamo pronti.', 'Estamos listos.', 'estar (estado)'],
      ],
    },
    {
      heading: 'La trampa de io y loro',
      paragraphs: [
        'La principal dificultad de essere para el hispanohablante es que "sono" sirve tanto para "io" como para "loro". En español tenemos "soy" (yo) vs "son" (ellos), formas claramente distintas. En italiano: "Io sono studente" = "Loro sono studenti". El sujeto o el contexto debe aclarar quién habla.',
        'Para distinguirlos: usa el pronombre "io" o "loro" si hay ambigüedad, o confía en el contexto. En conversación normal "Sono stanco" sin pronombre solo puede ser "yo" (nadie se referiría a sí mismo en tercera persona sin aclararlo).',
      ],
    },
    {
      heading: 'Professione sin artículo indeterminado',
      paragraphs: [
        'Una regla que sorprende al hispanohablante: en italiano, al indicar profesión con essere, no se usa el artículo indeterminado. Donde el español dice "Soy un médico", el italiano dice "Sono medico" (sin "un"). La excepción es cuando la profesión va modificada: "Sono un bravo medico" (Soy un buen médico).',
      ],
    },
    {
      heading: '¿Cómo se conjuga el verbo essere en presente?',
      paragraphs: [
        'Essere en presente indicativo: io sono, tu sei, lui/lei è, noi siamo, voi siete, loro sono. Es completamente irregular, así que se memoriza de golpe. Fíjate en que "io sono" y "loro sono" comparten forma, y en que la tercera persona "è" lleva acento grave para no confundirse con "e" (y).',
      ],
    },
    {
      heading: '¿Essere significa "ser" o "estar"?',
      paragraphs: [
        'Las dos cosas. El italiano no distingue "ser" y "estar" como el español: essere cubre identidad y estado por igual. "Sono stanco" es "estoy cansado" y "Sono italiano" es "soy italiano" — el mismo verbo. La traducción al español depende del contexto, no de una elección de verbo en italiano.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre essere y stare?',
      paragraphs: [
        'Essere es el verbo general de ser/estar. Stare se reserva para salud y estados de ánimo ("Come stai?" = ¿cómo estás?), para la forma progresiva ("sto studiando" = estoy estudiando) y para expresiones fijas de permanencia. Regla práctica: para preguntar cómo está alguien usa stare, no essere ("Come stai?", no "Come sei?").',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante aprende la conjugación irregular de essere y el doble valor ser/estar.',
    graphicPrompt: 'Tabla de conjugación con sono doble (io/loro) resaltado. Professione sin artículo.',
    scene: [
      ['sono / sei / è', 'yo / tú / él-ella'],
      ['siamo / siete / sono', 'nos / vos / ellos'],
      ['essere = ser + estar', 'sin distinción en italiano'],
    ],
    learnerModes: ['visual: conjugación en colores', 'analítico: essere vs ser/estar', 'oral: presentaciones'],
    practiceVerbs: ['Identifica', 'Ubica', 'Describe', 'Niega', 'Pregunta', 'Presenta'],
    reviewFocus: ['sono io vs sono loro', 'professione sin artículo', 'non + essere', 'è con acento'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Conjugación en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de essere.',
        type: 'choice',
        items: [
          {
            scene: 'Presentación',
            lines: [['Carlo', 'Io ___ italiano.']],
            options: ['sono', 'sei', 'è', 'siamo'],
            answer: 'sono',
            explain: 'Io sono = yo soy. Primera persona singular.',
          },
          {
            scene: 'Pregunta de origen',
            lines: [['Sofia', 'Tu ___ di Milano?']],
            options: ['sei', 'sono', 'è', 'siete'],
            answer: 'sei',
            explain: 'Tu sei = tú eres. Segunda persona singular.',
          },
          {
            scene: 'Describiendo al profesor',
            lines: [['Studente', 'Il professore ___ molto bravo.']],
            options: ['è', 'sono', 'sei', 'siamo'],
            answer: 'è',
            explain: 'Lui è = él es. Tercera persona singular.',
          },
          {
            scene: 'Dónde estamos',
            lines: [['Hugo', 'Noi ___ in classe adesso.']],
            options: ['siamo', 'sono', 'siete', 'sei'],
            answer: 'siamo',
            explain: 'Noi siamo = nosotros estamos. Primera persona plural.',
          },
          {
            scene: 'Elogio al grupo',
            lines: [['Nora', 'Voi ___ studenti eccellenti!']],
            options: ['siete', 'sono', 'siamo', 'sei'],
            answer: 'siete',
            explain: 'Voi siete = vosotros sois. Segunda persona plural.',
          },
          {
            scene: 'Profesión',
            lines: [['Marco', 'Io ___ insegnante di matematica.']],
            options: ['sono', 'sei', 'è', 'siamo'],
            answer: 'sono',
            explain: 'Io sono insegnante. Professione sin artículo indeterminado.',
          },
          {
            scene: 'Ellos en Roma',
            lines: [['Lina', 'I miei amici ___ a Roma questa settimana.']],
            options: ['sono', 'è', 'siamo', 'sei'],
            answer: 'sono',
            explain: 'Loro sono = ellos están. Misma forma que io sono — el contexto aclara.',
          },
          {
            scene: 'Negación',
            lines: [['Ana', 'Io non ___ stanca. Sto bene!']],
            options: ['sono', 'sei', 'è', 'siamo'],
            answer: 'sono',
            explain: 'Non sono stanca = no estoy cansada. Negación: non + essere.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Essere en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos verbos essere en cada diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Conociendo a alguien',
            lines: [
 ['Carlo', 'Io [[0]] Carlo. Tu [[1]] Sofia, vero?'],
 ['Sofia', 'Sì, esatto!'],
 ],
            blanks: [
              { options: ['sono', 'sei', 'è'], answer: 'sono', explain: 'Io sono Carlo. Primera persona.' },
              { options: ['sei', 'sono', 'è'], answer: 'sei', explain: 'Tu sei Sofia. Segunda persona.' },
            ],
          },
          {
            scene: 'Describiendo la clase',
            lines: [['Hugo', 'La classe [[0]] bella. Gli studenti [[1]] molto bravi.']],
            blanks: [
              { options: ['è', 'sono', 'siamo'], answer: 'è', explain: 'La classe è bella. Singular femenino → è.' },
              { options: ['sono', 'è', 'siamo'], answer: 'sono', explain: 'Gli studenti sono = ellos son. Plural.' },
            ],
          },
          {
            scene: 'Tú y yo',
            lines: [['Ana', 'Io [[0]] di Bogotá e tu [[1]] di Medellín?']],
            blanks: [
              { options: ['sono', 'sei', 'è'], answer: 'sono', explain: 'Io sono di Bogotá. Primera persona.' },
              { options: ['sei', 'sono', 'è'], answer: 'sei', explain: 'Tu sei di Medellín? Segunda persona.' },
            ],
          },
          {
            scene: 'Nosotros y ellos',
            lines: [['Sofia', 'Noi [[0]] studenti di italiano. Loro [[1]] studenti di francese.']],
            blanks: [
              { options: ['siamo', 'sono', 'siete'], answer: 'siamo', explain: 'Noi siamo = nosotros somos.' },
              { options: ['sono', 'siamo', 'è'], answer: 'sono', explain: 'Loro sono = ellos son.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa la presentación con la forma correcta de essere.',
        type: 'guidedText',
        scene: 'Presentación de la academia WeLearn Italia',
        text: 'WeLearn [[0]] una scuola di lingue. I fondatori [[1]] Hugo e Nora. Hugo [[2]] poliglotta — lui [[3]] molto appassionato dell\'insegnamento. Nora [[4]] direttrice accademica. Noi [[5]] una squadra eccellente!',
        blanks: [
          { options: ['è', 'sono', 'siamo'], answer: 'è', explain: 'WeLearn è una scuola. Singular → è.' },
          { options: ['sono', 'è', 'siamo'], answer: 'sono', explain: 'I fondatori sono Hugo e Nora. Plural → sono.' },
          { options: ['è', 'sono', 'sei'], answer: 'è', explain: 'Hugo è poliglotta. Singular masculino → è.' },
          { options: ['è', 'sono', 'sei'], answer: 'è', explain: 'Lui è molto appassionato. Descripción con essere.' },
          { options: ['è', 'sono', 'siamo'], answer: 'è', explain: 'Nora è direttrice. Professione sin artículo.' },
          { options: ['siamo', 'sono', 'è'], answer: 'siamo', explain: 'Noi siamo una squadra. Primera plural → siamo.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta de essere.',
        type: 'freeText',
        scene: 'Diálogo entre estudiantes de italiano',
        text: 'Ciao, io [[0]] Luca e [[1]] di Firenze. Tu [[2]] straniero? Sì, io [[3]] colombiano. I miei amici [[4]] qui in Italia per studiare l\'italiano. Voi [[5]] del corso di italiano A1?',
        blanks: [
          { answer: 'sono', explain: 'Io sono Luca. Primera persona singular.' },
          { answer: 'sono', explain: 'Io sono di Firenze. Mismo sujeto, mismo verbo.' },
          { answer: 'sei', explain: 'Tu sei straniero? Segunda persona singular.' },
          { answer: 'sono', explain: 'Io sono colombiano. Primera persona.' },
          { answer: 'sono', explain: 'I miei amici sono = mis amigos son/están. Plural.' },
          { answer: 'siete', explain: 'Voi siete = vosotros sois. Segunda persona plural.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo con essere',
        tag: 'Producción',
        intro: 'Escribe la frase completa con essere.',
        type: 'write',
        items: [
          {
            scene: 'Presentación',
            prompt: 'Escribe: Yo soy estudiante de italiano. → Io ___ studente di italiano.',
            answer: 'Io sono studente di italiano.',
            accepted: ['io sono studente di italiano', 'io sono studente di italiano.'],
            explain: 'Io sono = yo soy. Professione sin artículo.',
          },
          {
            scene: 'Ubicación',
            prompt: 'Escribe: Nosotros estamos en clase. → Noi ___ in classe.',
            answer: 'Noi siamo in classe.',
            accepted: ['noi siamo in classe', 'noi siamo in classe.'],
            explain: 'Noi siamo = nosotros estamos. Essere para ubicación.',
          },
          {
            scene: 'Descripción',
            prompt: 'Escribe: Ella es muy inteligente. → Lei ___ molto intelligente.',
            answer: 'Lei è molto intelligente.',
            accepted: ['lei è molto intelligente', 'lei è molto intelligente.'],
            explain: 'Lei è = ella es. Tercera persona singular con acento.',
          },
          {
            scene: 'Negación',
            prompt: 'Escribe: Ellos no son de Italia. → Loro non ___ di Italia.',
            answer: 'Loro non sono di Italia.',
            accepted: ['loro non sono di italia', 'loro non sono di italia.'],
            explain: 'Loro non sono = ellos no son. Non antes del verbo.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Usa essere para presentarte y describir a tu grupo.',
        type: 'write',
        items: [
          {
            scene: 'Presentación personal',
            prompt: 'Io ___ [nombre]. Sono di [ciudad]. Sono [profesión/estudiante].',
            answer: 'Io sono Carlo. Sono di Roma. Sono studente di italiano.',
            accepted: [
              'io sono carlo sono di roma sono studente di italiano',
              'io sono sofia sono di madrid sono studentessa di italiano',
              'io sono carlos sono di bogotá sono studente di spagnolo',
            ],
            explain: 'Io sono para presentarse. Professione sin artículo.',
          },
          {
            scene: 'Tu compañero',
            prompt: 'Il mio amico/La mia amica ___ [nombre]. ___ di [ciudad]. ___ [profesión].',
            answer: 'Il mio amico è Marco. È di Napoli. È studente.',
            accepted: [
              'il mio amico è marco è di napoli è studente',
              'la mia amica è sofia è di barcellona è studentessa',
            ],
            explain: 'Lui/Lei è para tercera persona. Essere = ser y estar.',
          },
          {
            scene: 'Vuestra clase',
            prompt: 'Noi ___ studenti di ___. Il professore ___ molto ___.',
            answer: 'Noi siamo studenti di italiano. Il professore è molto bravo.',
            accepted: ['noi siamo studenti di italiano il professore è molto bravo'],
            explain: 'Noi siamo per il gruppo. Essere para describir al profesor.',
          },
        ],
      },
    ],
  },
}

export default topic
