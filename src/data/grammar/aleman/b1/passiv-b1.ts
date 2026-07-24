import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passiv-b1',
  order: '02',
  color: '#c9a900',
  category: 'Struktur',
  level: 'B1',
  title: 'Passiv en Alemán B1 — Voz Pasiva con werden',
  shortTitle: 'Passiv',
  metaTitle: 'Passiv B1 — Voz pasiva en alemán con werden + Partizip II',
  description:
    'La voz pasiva en alemán se forma con werden + Partizip II. En B1 debes dominar el Passiv en Präsens y Präteritum, y aprender a distinguirlo del Zustandspassiv con sein. El agente opcional se introduce con von.',
  lead: 'Aprende a construir la voz pasiva en alemán: werden + Partizip II en presente y pasado, y cuándo usar von para indicar el agente.',
  outcomes: [
    'Forma el Passiv en Präsens: wird + Partizip II',
    'Construye el Passiv en Präteritum: wurde + Partizip II',
    'Distingue el Vorgangspassiv (werden) del Zustandspassiv (sein)',
    'Introduce el agente con von o durch correctamente',
  ],

  guide: {
    goal: 'Usar el Passiv para describir acciones donde el agente es desconocido, irrelevante o cuando el proceso es lo más importante.',
    model: 'Das Auto wird repariert. / Das Haus wurde 1900 gebaut. / Die Tür ist geöffnet (Zustand).',
    formula: 'werden (konj.) + Partizip II  |  Präs.: wird  |  Prät.: wurde',
    decisions: [
      'Präsens Passiv: wird + Partizip II — Das Brief wird geschrieben.',
      'Präteritum Passiv: wurde + Partizip II — Das Haus wurde gebaut.',
      'Perfekt Passiv: ist + Partizip II + worden — Das Buch ist gelesen worden.',
      'Para indicar el agente (persona/institución): von + Dativ — Das Buch wurde von Goethe geschrieben.',
      'Para indicar el medio o causa: durch + Akkusativ — Die Stadt wurde durch den Brand zerstört.',
      'Zustandspassiv (estado resultante): sein + Partizip II — Die Tür ist geöffnet. (no proceso, sino estado)',
    ],
    table: [
      ['Tiempo', 'Fórmula', 'Ejemplo'],
      ['Präsens', 'wird + Part.II', 'Das Auto wird repariert.'],
      ['Präteritum', 'wurde + Part.II', 'Das Haus wurde gebaut.'],
      ['Perfekt', 'ist + Part.II + worden', 'Das Buch ist gelesen worden.'],
      ['Zustandspassiv', 'sein + Part.II', 'Die Tür ist geöffnet.'],
    ],
    mistakes: [
      '"Das Auto ist repariert werden" ❌ → "Das Auto ist repariert worden" ✓ — en Perfekt Passiv el auxiliar es "worden" (no "geworden").',
      '"Das Haus ist gebaut durch Arbeiter" ❌ → "Das Haus wurde von Arbeitern gebaut" ✓ — el agente usa "von + Dativ".',
      '"Er wurde krank" puede confundirse con pasiva pero es un cambio de estado activo. Distingue contexto.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el Passiv en alemán?',
      paragraphs: [
        'La voz pasiva (Passiv) en alemán sirve para poner énfasis en la acción o en el objeto que la recibe, en lugar del sujeto que la realiza. Se usa cuando el agente es desconocido, irrelevante o cuando el proceso mismo es lo importante.',
        'Comparación: Aktiv — "Der Koch kocht das Essen" (El cocinero cocina la comida). Passiv — "Das Essen wird gekocht" (La comida es cocinada). El foco cambia del cocinero a la comida.',
      ],
    },
    {
      heading: 'Vorgangspassiv: werden + Partizip II',
      paragraphs: [
        'El Vorgangspassiv describe el proceso de una acción. Se forma con werden conjugado + Partizip II al final. En Präsens: wird/werden. En Präteritum: wurde/wurden.',
        'Ejemplos Präsens: "Das Formular wird ausgefüllt" (El formulario está siendo rellenado). "Die Pakete werden geliefert" (Los paquetes son entregados). En Präteritum: "Das Gebäude wurde 1950 errichtet" (El edificio fue construido en 1950).',
      ],
      table: [
        ['Tiempo', 'Singular', 'Plural'],
        ['Präsens', 'wird gemacht', 'werden gemacht'],
        ['Präteritum', 'wurde gemacht', 'wurden gemacht'],
        ['Perfekt', 'ist gemacht worden', 'sind gemacht worden'],
      ],
    },
    {
      heading: 'El agente: von y durch',
      paragraphs: [
        'Para indicar quién realiza la acción se usa von + Dativo para personas e instituciones: "Das Lied wurde von Beethoven komponiert." Para indicar el medio, instrumento o causa natural se usa durch + Akusativo: "Die Brücke wurde durch das Hochwasser zerstört."',
        'En la mayoría de las oraciones pasivas el agente no se menciona porque es irrelevante o desconocido. La ausencia del agente es precisamente una de las razones principales de usar la pasiva.',
      ],
    },
    {
      heading: 'Zustandspassiv: sein + Partizip II',
      paragraphs: [
        'El Zustandspassiv describe un estado resultante (no el proceso). Se forma con sein + Partizip II: "Die Tür ist geöffnet" (La puerta está abierta — en ese estado). En contraste: "Die Tür wird geöffnet" describe el proceso (alguien la está abriendo).',
        'Esta distinción es crucial en B1: Vorgangspassiv (werden) = proceso en curso; Zustandspassiv (sein) = estado resultante. Compara: "Das Auto wird repariert" (lo están reparando ahora) vs. "Das Auto ist repariert" (ya está reparado, listo).',
      ],
    },
    {
      heading: 'Passiv impersonal y en textos formales',
      paragraphs: [
        'En alemán también existe el Passiv impersonal: "Es wird hier nicht geraucht" (Aquí no se fuma). El pronombre "es" aparece cuando no hay sujeto y el verbo ocupa la posición 2. En textos científicos, noticias y documentos formales el Passiv es muy frecuente.',
        'Ejemplos de uso formal: "Die Studie wurde 2023 veröffentlicht." / "Die neuen Regeln werden ab nächstem Jahr eingeführt." Reconocer y producir estas estructuras es esencial para el nivel B1.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Passiv B1: Vorgangspassiv (werden+Part.II) en Präsens/Präteritum, Zustandspassiv, agente con von/durch.',
    graphicPrompt: 'Fábrica con productos moviéndose en cinta transportadora: énfasis en el proceso, no en el trabajador.',
    scene: [
      ['Das Essen wird zubereitet.', 'La comida está siendo preparada.'],
      ['Das Haus wurde 1920 gebaut.', 'La casa fue construida en 1920.'],
      ['Die E-Mail wird gerade geschrieben.', 'El correo electrónico está siendo escrito ahora.'],
      ['Das Paket wurde von DHL geliefert.', 'El paquete fue entregado por DHL.'],
      ['Die Tür ist geschlossen.', 'La puerta está cerrada.'],
      ['Der Bericht ist fertig geschrieben worden.', 'El informe ha sido terminado de escribir.'],
      ['Hier wird Deutsch gesprochen.', 'Aquí se habla alemán.'],
      ['Das Projekt wurde durch die Krise unterbrochen.', 'El proyecto fue interrumpido por la crisis.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['bauen', 'reparieren', 'schreiben', 'öffnen', 'kochen', 'liefern', 'sprechen', 'machen'],
    reviewFocus: ['werden + Partizip II', 'wurde + Partizip II', 'von + Dativ', 'Zustandspassiv sein'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el Passiv correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del Passiv para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'En la panadería (proceso actual)',
            lines: [['', 'Das Brot ___ jeden Morgen frisch gebacken.']],
            options: ['wird', 'ist', 'wurde', 'worden'],
            answer: 'wird',
            explain: 'Passiv Präsens: wird + Partizip II. El proceso ocurre habitualmente.',
          },
          {
            scene: 'Historia del edificio',
            lines: [['', 'Das Rathaus ___ im Jahr 1890 renoviert.']],
            options: ['wurde', 'wird', 'ist', 'worden'],
            answer: 'wurde',
            explain: 'Passiv Präteritum: wurde + Partizip II para acciones pasadas puntuales.',
          },
          {
            scene: 'Estado actual',
            lines: [['', 'Die Fenster ___ alle geöffnet.']],
            options: ['sind', 'werden', 'wurden', 'worden'],
            answer: 'sind',
            explain: 'Zustandspassiv: sein + Partizip II describe el estado resultante (las ventanas están abiertas).',
          },
          {
            scene: 'Noticia',
            lines: [['', 'Das neue Gesetz ___ vom Parlament beschlossen.']],
            options: ['wurde', 'wird', 'ist', 'hat'],
            answer: 'wurde',
            explain: 'Passiv Präteritum con agente: wurde + Partizip II + von + Dativ.',
          },
          {
            scene: 'Proceso en curso',
            lines: [['', 'Das Auto ___ gerade repariert.']],
            options: ['wird', 'wurde', 'ist', 'sein'],
            answer: 'wird',
            explain: '"gerade" indica que la acción ocurre ahora → Präsens Passiv: wird + Partizip II.',
          },
          {
            scene: 'Passiv Perfekt',
            lines: [['', 'Das Buch ___ von Millionen Lesern gelesen ___.']],
            options: ['ist … worden', 'ist … geworden', 'hat … worden', 'wird … worden'],
            answer: 'ist … worden',
            explain: 'Perfekt Passiv: sein (ist) + Partizip II + worden. No es "geworden" sino "worden".',
          },
          {
            scene: 'Pasiva impersonal',
            lines: [['', 'In diesem Büro ___ nicht geraucht.']],
            options: ['wird', 'ist', 'wurde', 'hat'],
            answer: 'wird',
            explain: 'Passiv impersonal Präsens: "Es wird" / "Hier wird" + Partizip II. Norma permanente.',
          },
          {
            scene: 'Causa natural',
            lines: [['', 'Das Dorf ___ durch den Sturm zerstört.']],
            options: ['wurde', 'wird', 'ist', 'worden'],
            answer: 'wurde',
            explain: 'Passiv Präteritum. "durch" para causas o medios, aquí: el temporal (Sturm) como causa.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Proceso y agente',
        tag: '2 espacios',
        intro: 'Completa cada oración con la forma de Passiv correcta y la preposición del agente.',
        type: 'dual',
        items: [
          {
            scene: 'Un famoso puente',
            lines: [['', 'Diese Brücke [[0]] 1932 [[1]] Ingenieuren aus Hamburg gebaut.']],
            blanks: [
              { options: ['wurde', 'wird', 'ist', 'worden'], answer: 'wurde', explain: 'Passiv Präteritum: wurde + Partizip II para evento histórico pasado.' },
              { options: ['von', 'durch', 'mit', 'bei'], answer: 'von', explain: '"von + Dativ" introduce el agente (personas): von Ingenieuren.' },
            ],
          },
          {
            scene: 'Noticia de hoy',
            lines: [['', 'Das neue Stadion [[0]] gerade gebaut und [[1]] nächstes Jahr eröffnet werden.']],
            blanks: [
              { options: ['wird', 'wurde', 'ist', 'worden'], answer: 'wird', explain: 'Präsens Passiv: wird + Partizip II. El proceso ocurre ahora.' },
              { options: ['soll', 'sollte', 'müssen', 'wird'], answer: 'soll', explain: '"soll + Passiv-Infinitiv" expresa una intención o plan futuro pasivo.' },
            ],
          },
          {
            scene: 'La puerta',
            lines: [['', 'Die Tür [[0]] geöffnet — sie [[1]] jeden Morgen um 8 Uhr geöffnet.']],
            blanks: [
              { options: ['ist', 'wird', 'wurde', 'worden'], answer: 'ist', explain: 'Zustandspassiv: ist + Partizip II. Describe el estado actual (está abierta).' },
              { options: ['wird', 'ist', 'wurde', 'worden'], answer: 'wird', explain: 'Vorgangspassiv Präsens habitual: wird + Partizip II. El proceso que ocurre cada mañana.' },
            ],
          },
          {
            scene: 'Un gran logro',
            lines: [['', 'Die Impfung [[0]] von Wissenschaftlern entwickelt [[1]], und sie [[2]] bereits an Millionen Menschen getestet worden.']],
            blanks: [
              { options: ['wurde', 'wird', 'ist', 'worden'], answer: 'wurde', explain: 'Passiv Präteritum: wurde + Partizip II. Acción completada en el pasado.' },
              { options: ['ist', 'wurde', 'wird', 'hat'], answer: 'ist', explain: 'Perfekt Passiv: ist + Partizip II + worden. Acción con relevancia actual.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El proceso de fabricación',
        tag: 'Texto guiado',
        intro: 'Elige la forma de Passiv correcta para describir cómo se fabrica el chocolate.',
        type: 'guidedText',
        scene: 'Artículo sobre la producción de chocolate.',
        text: 'Schokolade [[0]] auf der ganzen Welt geliebt. Zuerst [[1]] die Kakaobohnen geerntet und getrocknet. Dann [[2]] sie in eine Fabrik transportiert. Dort [[3]] die Bohnen geröstet und gemahlen. Die Kakaomasse [[4]] mit Zucker und Milch gemischt. Schließlich [[5]] die Schokolade in Formen gegossen und [[6]] für mehrere Stunden gekühlt.',
        blanks: [
          { options: ['wird', 'wurde', 'ist', 'worden'], answer: 'wird', explain: 'Hecho general habitual: Präsens Passiv wird + Partizip II.' },
          { options: ['werden', 'wurden', 'sind', 'worden'], answer: 'werden', explain: 'Plural (die Kakaobohnen): werden + Partizip II. Präsens Passiv plural.' },
          { options: ['werden', 'wurden', 'sind', 'worden'], answer: 'werden', explain: 'Sie (plural) → werden + Partizip II. Proceso habitual en la descripción.' },
          { options: ['werden', 'wurden', 'sind', 'worden'], answer: 'werden', explain: 'Die Bohnen (plural) → werden + Partizip II en el proceso general.' },
          { options: ['wird', 'wurde', 'ist', 'worden'], answer: 'wird', explain: 'Die Kakaomasse (singular) → wird + Partizip II.' },
          { options: ['wird', 'wurde', 'ist', 'worden'], answer: 'wird', explain: 'Präsens Passiv: wird + Partizip II (gegossen). Proceso continuo.' },
          { options: ['wird', 'wurde', 'ist', 'worden'], answer: 'wird', explain: 'Segundo Partizip II en la misma oración: wird ... und wird ... gekühlt.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el Passiv',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del Passiv según el tiempo verbal indicado.',
        type: 'freeText',
        scene: 'Transforma al Passiv usando el tiempo indicado.',
        text: 'Das neue Krankenhaus [[0]] (Präteritum / bauen). Es [[1]] (Präsens / modernisieren) jeden Tag. Viele Patienten [[2]] (Präsens / behandeln). Die Ärzte sagen, dass viele Leben [[3]] (Perfekt / retten). Das Gebäude [[4]] (Zustandspassiv / renovieren — es ya está renovado).',
        blanks: [
          { answer: 'wurde gebaut', accepted: ['wurde gebaut', 'wurde erbaut'], explain: 'Präteritum Passiv: wurde + Partizip II (bauen → gebaut).' },
          { answer: 'wird modernisiert', accepted: ['wird modernisiert'], explain: 'Präsens Passiv: wird + Partizip II (modernisieren → modernisiert).' },
          { answer: 'werden behandelt', accepted: ['werden behandelt'], explain: 'Plural Präsens Passiv: werden + Partizip II (behandeln → behandelt).' },
          { answer: 'sind gerettet worden', accepted: ['sind gerettet worden', 'wurden gerettet'], explain: 'Perfekt Passiv: sind + Partizip II + worden (retten → gerettet).' },
          { answer: 'ist renoviert', accepted: ['ist renoviert', 'ist renoviert worden'], explain: 'Zustandspassiv: ist + Partizip II. El edificio se encuentra en estado renovado.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones pasivas',
        tag: 'Producción',
        intro: 'Construye oraciones en voz pasiva completas según las indicaciones.',
        type: 'write',
        items: [
          {
            scene: 'Historia local',
            prompt: 'Escribe cuándo fue construido tu ciudad/barrio/edificio favorito (Passiv Präteritum).',
            answer: 'Das Stadtzentrum wurde im 19. Jahrhundert gebaut.',
            accepted: ['wurde gebaut', 'wurde errichtet', 'wurde gegründet', 'wurde renoviert'],
            explain: 'Usa: wurde + Partizip II + Zeitangabe. Ejemplo: Das Museum wurde 1905 eröffnet.',
          },
          {
            scene: 'En tu trabajo o escuela',
            prompt: 'Describe algo que se hace regularmente en tu trabajo/escuela (Passiv Präsens).',
            answer: 'In unserem Büro werden täglich viele E-Mails geschrieben.',
            accepted: ['wird', 'werden'],
            explain: 'Präsens Passiv para actividades habituales. Ej: Die Berichte werden jeden Freitag geschickt.',
          },
          {
            scene: 'Una noticia reciente',
            prompt: 'Describe un evento reciente usando Passiv Perfekt con von.',
            answer: 'Das neue Gesetz ist von der Regierung verabschiedet worden.',
            accepted: ['ist … worden', 'wurde … von'],
            explain: 'Perfekt Passiv: ist + Part.II + worden. Agente con von + Dativ.',
          },
          {
            scene: 'El estado de algo',
            prompt: 'Describe el estado actual de algo usando Zustandspassiv (sein + Partizip II).',
            answer: 'Die Küche ist schon aufgeräumt.',
            accepted: ['ist … geöffnet', 'ist … geschlossen', 'ist … repariert', 'ist … fertig', 'ist … aufgeräumt', 'ist … renoviert'],
            explain: 'Zustandspassiv: sein + Partizip II = estado resultante. Ejemplo: Das Auto ist repariert.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Un proceso paso a paso',
        tag: 'Producción libre',
        intro: 'Describe un proceso (receta, fabricación, procedimiento) usando 3 oraciones en Passiv.',
        type: 'write',
        items: [
          {
            scene: 'Paso 1',
            prompt: 'Describe el primer paso del proceso en Passiv Präsens (plural o singular).',
            answer: 'Zuerst werden die Zutaten vorbereitet.',
            accepted: ['wird', 'werden'],
            explain: 'Usa: zuerst + werden/wird + Partizip II. Ej: Zuerst werden die Materialien sortiert.',
          },
          {
            scene: 'Paso 2',
            prompt: 'Describe un paso intermedio o algo que fue hecho antes (Passiv Präteritum).',
            answer: 'Dann wurde der Teig 30 Minuten lang geknetet.',
            accepted: ['wurde', 'wurden'],
            explain: 'Passiv Präteritum: wurde/wurden + Partizip II. Ej: Dann wurden die Teile montiert.',
          },
          {
            scene: 'Resultado final',
            prompt: 'Describe el estado final usando Zustandspassiv o Perfekt Passiv.',
            answer: 'Das Produkt ist fertig hergestellt worden.',
            accepted: ['ist … worden', 'ist … fertig', 'sind … worden', 'ist bereit'],
            explain: 'Perfekt Passiv o Zustandspassiv para el resultado: ist + Part.II + worden / ist + Part.II.',
          },
        ],
      },
    ],
  },
}

export default topic
