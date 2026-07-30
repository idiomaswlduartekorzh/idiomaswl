import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condizionale-presente-a2',
  order: '09',
  color: '#009246',
  category: 'Condizionale',
  level: 'A2',
  title: 'El condicional presente en italiano A2 — vorrei, potresti, sarebbe',
  shortTitle: 'Condizionale presente',
  metaTitle: 'Condicional presente italiano A2 — vorrei, potresti, sarebbe, mi piacerebbe',
  description:
    'El condizionale presente expresa deseos, peticiones educadas, hipótesis y situaciones imaginarias. Las terminaciones son: -rei, -resti, -rebbe, -remmo, -reste, -rebbero. Los irregulares más importantes son essere→sarei, avere→avrei, volere→vorrei, potere→potrei, dovere→dovrei, andare→andrei.',
  lead: '-rei/-resti/-rebbe/-remmo/-reste/-rebbero. Quería (vorrei), podrías (potresti), sería (sarebbe). Se usa para peticiones educadas y deseos.',
  outcomes: [
    'Conjugar el condizionale presente de verbos regulares en -are, -ere, -ire',
    'Usar los irregulares más frecuentes: essere, avere, volere, potere, dovere, andare',
    'Expresar deseos con vorrei y mi piacerebbe',
    'Formular peticiones educadas con potresti/potrebbe',
  ],

  guide: {
    goal: 'Expresar deseos, peticiones educadas e hipótesis usando el condizionale presente.',
    model: 'Vorrei un caffè. / Potresti aiutarmi? / Sarebbe bello viaggiare insieme. / Mi piacerebbe imparare il coreano.',
    formula: 'radice del futuro + terminazioni -rei, -resti, -rebbe, -remmo, -reste, -rebbero',
    decisions: [
      'Regulares -are: parlare → parlerei, parleresti, parlerebbe…',
      'Regulares -ere/-ire: vendere → venderei; partire → partirei',
      'Essere irregular: sarei, saresti, sarebbe, saremmo, sareste, sarebbero',
      'Avere irregular: avrei, avresti, avrebbe, avremmo, avreste, avrebbero',
      'Volere irregular: vorrei, vorresti, vorrebbe, vorremmo, vorreste, vorrebbero',
      'Potere irregular: potrei, potresti, potrebbe, potremmo, potreste, potrebbero',
      'Dovere irregular: dovrei, dovresti, dovrebbe, dovremmo, dovreste, dovrebbero',
      'Andare irregular: andrei, andresti, andrebbe, andremmo, andreste, andrebbero',
    ],
    table: [
      ['Sujeto', 'parlare (-ei)', 'essere/volere (irr.)'],
      ['io', 'parlerei', 'sarei / vorrei'],
      ['tu', 'parleresti', 'saresti / vorresti'],
      ['lui/lei', 'parlerebbe', 'sarebbe / vorrebbe'],
      ['noi', 'parleremmo', 'saremmo / vorremmo'],
      ['voi', 'parlereste', 'sareste / vorreste'],
      ['loro', 'parlerebbero', 'sarebbero / vorrebbero'],
    ],
    mistakes: [
      'Usar el presente en lugar del condizionale para peticiones: Vuoi aiutarmi? (neutro) vs Potresti aiutarmi? (más educado)',
      'Confundir futuro y condizionale: parlerò (futuro) vs parlerei (condizionale)',
      'Olvidar la doble r en irregolari: vorrei ✓, no "vorei" ✗; potrei ✓, no "poterei" ✗',
    ],
  },

  seo: [
    {
      heading: '¿Para qué sirve el condicional presente en italiano?',
      paragraphs: [
        'El condizionale presente tiene tres usos principales en A2: expresar deseos (vorrei una pizza = quisiera una pizza), hacer peticiones educadas (potresti aprire la finestra? = ¿podrías abrir la ventana?) e imaginar situaciones hipotéticas (sarebbe bello vivere in Italia = sería bonito vivir en Italia).',
        'El uso de vorrei es esencial para los viajeros: en bares, restaurantes y tiendas es la forma estándar y educada de pedir algo. Decir "voglio" suena más directo, mientras que "vorrei" es cortés y suavizado.',
      ],
    },
    {
      heading: 'Conjugación: terminaciones del condizionale',
      paragraphs: [
        'Las terminaciones del condizionale son iguales para todos los verbos: -rei, -resti, -rebbe, -remmo, -reste, -rebbero. La raíz es la MISMA que la del futuro (parler-, sar-, vorr-), así que si sabes el futuro, el condicional es automático. Esta es la tabla con un regular y dos irregulares:',
      ],
      table: [
        ['Persona', 'parlare', 'essere', 'volere'],
        ['io', 'parlerei', 'sarei', 'vorrei'],
        ['tu', 'parleresti', 'saresti', 'vorresti'],
        ['lui/lei', 'parlerebbe', 'sarebbe', 'vorrebbe'],
        ['noi', 'parleremmo', 'saremmo', 'vorremmo'],
        ['voi', 'parlereste', 'sareste', 'vorreste'],
        ['loro', 'parlerebbero', 'sarebbero', 'vorrebbero'],
      ],
    },
    {
      heading: 'Los irregulares del condizionale (misma raíz que el futuro)',
      paragraphs: [
        'Comparten la raíz irregular del futuro y añaden las terminaciones del condicional. Los más frecuentes:',
      ],
      table: [
        ['Infinitivo', 'Raíz', 'io (condizionale)'],
        ['essere', 'sar-', 'sarei'],
        ['avere', 'avr-', 'avrei'],
        ['andare', 'andr-', 'andrei'],
        ['fare', 'far-', 'farei'],
        ['venire', 'verr-', 'verrei'],
        ['volere', 'vorr-', 'vorrei'],
        ['potere', 'potr-', 'potrei'],
        ['dovere', 'dovr-', 'dovrei'],
      ],
    },
    {
      heading: '¿Cómo se forma el condicional presente en italiano?',
      paragraphs: [
        'Con la raíz del futuro + las terminaciones -rei, -resti, -rebbe, -remmo, -reste, -rebbero. Ejemplo con parlare: parlerei, parleresti, parlerebbe, parleremmo, parlereste, parlerebbero. Los -are cambian la a por e (parler-), igual que en el futuro.',
      ],
    },
    {
      heading: '¿Cuándo se usa el condizionale en italiano?',
      paragraphs: [
        'Para deseos ("vorrei un caffè"), peticiones educadas ("potresti aiutarmi?"), consejos ("dovresti riposare") e hipótesis ("sarebbe bello"). Es el tiempo de la cortesía: suaviza lo que en presente sonaría demasiado directo.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "voglio" y "vorrei"?',
      paragraphs: [
        '"Voglio" (quiero) es directo y puede sonar brusco al pedir algo; "vorrei" (quisiera / me gustaría) es la forma cortés y estándar en bares, tiendas y restaurantes. "Vorrei un cappuccino" es mucho más natural y educado que "Voglio un cappuccino".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende el condizionale para peticiones educadas y deseos, con foco en vorrei/potresti/sarebbe.',
    graphicPrompt: 'Bocadillo de diálogo con vorrei, un mostrador de bar y botón de "por favor".',
    scene: [
      ['Vorrei un caffè macchiato, per favore.', 'Quisiera un café manchado, por favor.'],
      ['Potresti aiutarmi con i compiti?', '¿Podrías ayudarme con los deberes?'],
      ['Sarebbe bello andare in vacanza.', 'Sería bonito ir de vacaciones.'],
      ['Mi piacerebbe imparare a cucinare.', 'Me gustaría aprender a cocinar.'],
    ],
    learnerModes: ['visual: situaciones de cortesía', 'analítico: base futuro + terminaciones', 'oral: peticiones en el bar/oficina'],
    reviewFocus: ['vorrei/vorresti/vorrebbe', 'potresti/potrebbe para peticiones', 'sarebbe para hipótesis'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Condicionales frecuentes',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del condizionale presente.',
        type: 'choice',
        items: [
          {
            scene: 'En el bar',
            lines: [['Cliente', '___ un cappuccino, per favore. (volere)']],
            options: ['Vorrei', 'Voglio', 'Vorevo', 'Vorrò'],
            answer: 'Vorrei',
            explain: 'Petición educada: vorrei (condizionale di volere, prima persona).',
          },
          {
            scene: 'Una petición amable',
            lines: [['Marco', '___ aprire la finestra? Fa caldo! (tu / potere)']],
            options: ['Potresti', 'Potevi', 'Puoi', 'Potrò'],
            answer: 'Potresti',
            explain: 'Petición educada con tu: potresti (condizionale di potere).',
          },
          {
            scene: 'El sueño',
            lines: [['Sofia', '___ bello vivere al mare. (essere)']],
            options: ['Sarebbe', 'Sarai', 'Sei', 'Saresti'],
            answer: 'Sarebbe',
            explain: 'Hipótesis: sarebbe (condizionale di essere, terza persona).',
          },
          {
            scene: 'El viaje',
            lines: [['Leo', 'Io ___ tanto in Italia se potessi. (andare)']],
            options: ['andrei', 'andrò', 'sono andato', 'vado'],
            answer: 'andrei',
            explain: 'Condizionale di andare: andrei (prima persona).',
          },
          {
            scene: 'La petición al colega',
            lines: [['Giulia', '___ mandarmi il documento? (lei formale / potere)']],
            options: ['Potrebbe', 'Potresti', 'Potrai', 'Puoi'],
            answer: 'Potrebbe',
            explain: 'Con lei formal (usted): potrebbe (condizionale di potere, terza persona).',
          },
          {
            scene: 'El deseo',
            lines: [['Carlo', 'Mi ___ imparare la chitarra. (piacere — condizionale)']],
            options: ['piacerebbe', 'piacerei', 'piacerebbe stato', 'piaceva'],
            answer: 'piacerebbe',
            explain: 'Mi piacerebbe = me gustaría. Condizionale di piacere (terza persona).',
          },
          {
            scene: 'Deber',
            lines: [['Luca', '___ studiare di più per l\'esame. (dovere — io)']],
            options: ['Dovrei', 'Devo', 'Dovrò', 'Dovevo'],
            answer: 'Dovrei',
            explain: 'Consejo o obligación hipotética: dovrei (condizionale di dovere).',
          },
          {
            scene: 'Nosotros',
            lines: [['Elena', 'Noi ___ più spesso insieme. (uscire)']],
            options: ['usciremmo', 'usciamo', 'usciremo', 'siamo usciti'],
            answer: 'usciremmo',
            explain: 'Noi + condizionale di uscire: usciremmo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Sujeto + condicional',
        tag: '2 espacios',
        intro: 'Completa con el sujeto correcto y la forma del condizionale.',
        type: 'dual',
        items: [
          {
            scene: 'En la tienda',
            lines: [['Cliente', '[[0]] [[1]] provare quella giacca. (io)']],
            blanks: [
              { options: ['Io', 'Tu', 'Lei'], answer: 'Io', explain: 'Vorrei → primera persona → io.' },
              { options: ['vorrei', 'vorresti', 'vorrebbe'], answer: 'vorrei', explain: 'Io + condizionale di volere → vorrei.' },
            ],
          },
          {
            scene: 'El favor',
            lines: [['Marco', '— [[0]] [[1]] farmi un favore? (tu)']],
            blanks: [
              { options: ['Tu', 'Lei', 'Lui'], answer: 'Tu', explain: 'Potresti → segunda persona → tu.' },
              { options: ['potresti', 'potrebbe', 'potrei'], answer: 'potresti', explain: 'Tu + condizionale di potere → potresti.' },
            ],
          },
          {
            scene: 'El sueño de Sofia',
            lines: [['Sofia', '[[0]] [[1]] vivere a Parigi. (a me)']],
            blanks: [
              { options: ['Mi', 'Ti', 'Gli'], answer: 'Mi', explain: 'A me → mi (pronome indiretto).' },
              { options: ['piacerebbe', 'piacerei', 'piaceremmo'], answer: 'piacerebbe', explain: 'Piacere → condizionale terza persona → piacerebbe.' },
            ],
          },
          {
            scene: 'El consejo',
            lines: [['Leo', '[[0]] [[1]] riposare di più. (tu)']],
            blanks: [
              { options: ['Tu', 'Io', 'Voi'], answer: 'Tu', explain: 'Dovresti → segunda persona → tu.' },
              { options: ['dovresti', 'dovrei', 'dovrebbe'], answer: 'dovresti', explain: 'Tu + condizionale di dovere → dovresti.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'En el restaurante',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo en el restaurante con el condizionale correcto.',
        type: 'guidedText',
        scene: 'Marco pide en un restaurante italiano',
        text: '— Buonasera! Cosa [[0]]? — [[1]] una pasta al pomodoro, per favore. — E da bere? — [[2]] un\'acqua minerale. — [[3]] anche del pane? — Sì, grazie. E [[4]] avere il conto alla fine?',
        blanks: [
          { options: ['vorrebbe', 'vuole', 'voleva'], answer: 'vorrebbe', explain: 'El camarero pregunta educadamente con vorrebbe (3ª persona).' },
          { options: ['Vorrei', 'Voglio', 'Vorei'], answer: 'Vorrei', explain: 'Petición educada del cliente: vorrei (1ª persona).' },
          { options: ['vorrei', 'voglio', 'vorrò'], answer: 'vorrei', explain: 'Vorrei = quisiera (petición educada).' },
          { options: ['Vorrebbe', 'Vuole', 'Volete'], answer: 'Vorrebbe', explain: 'El camarero ofrece educadamente: vorrebbe (3ª persona).' },
          { options: ['potrei', 'posso', 'potrò'], answer: 'potrei', explain: 'Petición educada del cliente: potrei avere = ¿podría tener?' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del condizionale.',
        type: 'freeText',
        scene: 'Sofia imagina su vida ideal',
        text: 'Nella mia vita ideale [[0]] in una città al mare. (vivere) [[1]] un lavoro creativo. (avere) Ogni giorno [[2]] a nuotare. (andare) Il weekend [[3]] con gli amici. (uscire) E [[4]] molto! (viaggiare)',
        blanks: [
          { answer: 'vivrei', explain: 'Vivere → condizionale: vivrei (prima persona).' },
          { answer: 'avrei', explain: 'Avere → condizionale irregolare: avrei.' },
          { answer: 'andrei', explain: 'Andare → condizionale irregolare: andrei.' },
          { answer: 'uscirei', explain: 'Uscire → condizionale: uscirei.' },
          { answer: 'viaggerei', explain: 'Viaggiare → condizionale: viaggerei (nota: gg per conservar el sonido).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Peticiones y deseos',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase completa usando el condizionale.',
        type: 'write',
        items: [
          {
            scene: 'En el bar',
            prompt: '___ un tè caldo, per favore. (volere — io, petición educada)',
            answer: 'Vorrei un tè caldo, per favore.',
            accepted: ['vorrei un tè caldo per favore', 'vorrei un tè caldo'],
            explain: 'Petición educada: io + condizionale di volere → vorrei.',
          },
          {
            scene: 'Un favor',
            prompt: '___ aiutarmi con questo esercizio? (potere — tu)',
            answer: 'Potresti aiutarmi con questo esercizio?',
            accepted: ['potresti aiutarmi con questo esercizio', 'potresti aiutarmi'],
            explain: 'Tu + condizionale di potere → potresti. Petición educada.',
          },
          {
            scene: 'Una hipótesis',
            prompt: '___ bello parlare italiano con tutti! (essere)',
            answer: 'Sarebbe bello parlare italiano con tutti!',
            accepted: ['sarebbe bello parlare italiano con tutti', 'sarebbe bello'],
            explain: 'Essere + condizionale terza persona → sarebbe. Hipótesis positiva.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Deseos y sueños libres',
        tag: 'Escritura libre',
        intro: 'Describe deseos e hipótesis usando el condizionale presente.',
        type: 'write',
        items: [
          {
            scene: 'Tu deseo principal',
            prompt: 'Vorrei... / Mi piacerebbe... (un deseo importante para ti)',
            answer: 'Vorrei imparare il giapponese e mi piacerebbe visitare Tokyo.',
            accepted: ['vorrei', 'mi piacerebbe'],
            explain: 'Vorrei + infinitivo = quisiera. Mi piacerebbe + infinitivo = me gustaría.',
          },
          {
            scene: 'Tu vida ideal',
            prompt: 'Nella mia vita ideale vivrei... avrei... (describe 2 aspectos)',
            answer: 'Nella mia vita ideale vivrei vicino al mare e avrei una casa grande.',
            accepted: ['vivrei', 'avrei', 'andrei', 'lavorerei'],
            explain: 'Condizionale para imaginar: vivrei, avrei, andrei...',
          },
          {
            scene: 'Una petición educada',
            prompt: 'Potresti/Potrebbe ___ per favore? (una cosa que quieres pedir)',
            answer: 'Potresti parlare più lentamente, per favore?',
            accepted: ['potresti', 'potrebbe', 'potreste'],
            explain: 'Potresti (tu) / Potrebbe (lei formal) para peticiones educadas.',
          },
        ],
      },
    ],
  },
}

export default topic
