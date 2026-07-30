import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passiv-praesens-a2',
  order: '16',
  color: '#c9a900',
  category: 'Verbos',
  level: 'A2',
  title: 'Passiv Präsens en alemán A2: werden + Partizip II',
  shortTitle: 'Passiv Präsens',
  metaTitle: 'Pasiva en alemán A2 — Passiv Präsens con werden + Partizip II',
  description:
    'La voz pasiva en presente (Passiv Präsens) se forma con werden + Partizip II. Se usa cuando la acción es más importante que quien la realiza. Es esencial para comprender textos formales, noticias y textos académicos en alemán.',
  lead: 'Das Buch wird gelesen: aprende a construir la voz pasiva en alemán con werden.',
  outcomes: [
    'Formar el Passiv Präsens con werden + Partizip II',
    'Distinguir la oración activa de la oración pasiva',
    'Identificar el agente opcional con "von + Dativ"',
    'Usar la pasiva para hablar de procesos y acciones sin agente específico',
  ],

  guide: {
    goal: 'Construir oraciones en voz pasiva en presente usando werden + Partizip II.',
    model: 'Das Buch wird gelesen. (El libro es leído.) / Die Tür wird geöffnet. (La puerta es abierta.)',
    formula: 'Subjekt + werden (konjugiert) + Partizip II',
    decisions: [
      'Sujeto de la pasiva = objeto directo de la frase activa (pasa a ser el tema principal)',
      'werden se conjuga según el sujeto: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie werden',
      'El Partizip II va siempre al FINAL de la oración',
      'El agente (quien realiza la acción) se indica con von + Dativ si es relevante: Das Essen wird von der Köchin zubereitet',
      'Sin agente expreso: Das Auto wird repariert. (Se repara el coche / El coche está siendo reparado)',
    ],
    table: [
      ['Aktiv', 'Passiv Präsens', 'Español'],
      ['Der Lehrer erklärt die Regel', 'Die Regel wird erklärt', 'La regla es explicada'],
      ['Man baut eine Brücke', 'Eine Brücke wird gebaut', 'Se construye un puente'],
      ['Sie öffnen die Tür', 'Die Tür wird geöffnet', 'La puerta es abierta'],
    ],
    mistakes: [
      '"Das Buch ist gelesen werden" ❌ → "Das Buch wird gelesen" ✓ — En presente se usa wird, no ist.',
      '"Das Buch wird lesen" ❌ → "Das Buch wird gelesen" ✓ — Se necesita el Partizip II, no el infinitivo.',
      '"Von dem Lehrer" con Nominativ ❌ → "von dem Lehrer" ya es Dativ ✓ — von siempre rige Dativ.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el Passiv Präsens en alemán?',
      paragraphs: [
        'La voz pasiva en presente (Passiv Präsens) permite describir acciones sin mencionar al responsable. En vez de "El chef prepara la comida", dices "La comida es preparada". En alemán: "Das Essen wird zubereitet."',
        'La construcción es siempre: sujeto + forma conjugada de werden + Partizip II al final. Es una de las estructuras más comunes en alemán escrito formal, medios de comunicación y textos técnicos.',
      ],
    },
    {
      heading: '¿Cómo se transforma una oración activa en pasiva en alemán?',
      paragraphs: [
        'Para convertir una oración activa en pasiva: el objeto directo (Akkusativ) pasa a ser el sujeto (Nominativ), el verbo se convierte en werden + Partizip II, y el sujeto original puede mencionarse con "von + Dativ" o simplemente omitirse.',
      ],
      examples: [
        ['Aktiv', 'Passiv', 'Bedeutung'],
        ['Man trinkt Kaffee', 'Kaffee wird getrunken', 'El café es bebido'],
        ['Die Studenten lesen den Text', 'Der Text wird gelesen', 'El texto es leído'],
      ],
    },
    {
      heading: '¿Cómo se forma el Passiv Präsens en alemán?',
      paragraphs: [
        'Con el auxiliar werden en presente + el Partizip II del verbo principal al final de la oración: "Das Haus wird gebaut" (la casa es/está siendo construida). Es una trampa clásica para el hispanohablante, que espera "sein" (ser) como en español: en alemán la voz pasiva de proceso usa werden, no sein. El agente, si aparece, se introduce con "von" + dativo: "Das Buch wird von der Lehrerin gelesen" (el libro es leído por la profesora). Recuerda que werden es también el verbo del futuro y significa "volverse" por sí solo; aquí funciona solo como auxiliar de la pasiva, y el sentido lo da el Partizip II final.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Passiv Präsens: werden + Partizip II para procesos sin agente.',
    graphicPrompt: 'Fábrica con objetos siendo producidos, sin mostrar quién los hace.',
    scene: [
      ['Das Auto wird repariert.', 'El coche está siendo reparado.'],
      ['Die Pizza wird geliefert.', 'La pizza está siendo entregada.'],
      ['Der Brief wird geschrieben.', 'La carta está siendo escrita.'],
      ['Das Haus wird gebaut.', 'La casa está siendo construida.'],
      ['Die Tür wird geschlossen.', 'La puerta está siendo cerrada.'],
      ['Das Lied wird gesungen.', 'La canción está siendo cantada.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['werden conjugado', 'Partizip II al final', 'activa vs pasiva'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta de werden',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma de werden adecuada para cada sujeto.',
        type: 'choice',
        items: [
          {
            scene: 'En la fábrica, describiendo procesos.',
            lines: [['', 'Das Auto ___ repariert.']],
            options: ['wird', 'werden', 'werde', 'werdet'],
            answer: 'wird',
            explain: '"Das Auto" es singular neutro → wird.',
          },
          {
            scene: 'Hablando de libros en la biblioteca.',
            lines: [['', 'Die Bücher ___ gelesen.']],
            options: ['werden', 'wird', 'werdet', 'werde'],
            answer: 'werden',
            explain: '"Die Bücher" es plural → werden.',
          },
          {
            scene: 'En el restaurante.',
            lines: [['', 'Das Essen ___ gekocht.']],
            options: ['wird', 'werden', 'werdet', 'wirst'],
            answer: 'wird',
            explain: '"Das Essen" es singular neutro → wird.',
          },
          {
            scene: 'En clase, preguntando por las tareas.',
            lines: [['Profe', 'Die Hausaufgaben ___ kontrolliert.']],
            options: ['werden', 'wird', 'werde', 'werdet'],
            answer: 'werden',
            explain: '"Die Hausaufgaben" es plural → werden.',
          },
          {
            scene: 'Describiendo obras de construcción.',
            lines: [['', 'Eine neue Schule ___ gebaut.']],
            options: ['wird', 'werden', 'werde', 'bist'],
            answer: 'wird',
            explain: '"Eine neue Schule" es singular femenino → wird.',
          },
          {
            scene: 'Sobre un concierto.',
            lines: [['', 'Das Lied ___ gesungen.']],
            options: ['wird', 'werden', 'werdet', 'ist'],
            answer: 'wird',
            explain: '"Das Lied" es singular neutro → wird.',
          },
          {
            scene: 'En el hospital.',
            lines: [['', 'Die Patienten ___ untersucht.']],
            options: ['werden', 'wird', 'werde', 'seid'],
            answer: 'werden',
            explain: '"Die Patienten" es plural → werden.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pasiva con agente',
        tag: '2 espacios',
        intro: 'Completa la oración pasiva con werden y el agente correcto.',
        type: 'dual',
        items: [
          {
            scene: 'La carta es escrita por la secretaria.',
            lines: [['', 'Der Brief [[0]] von der Sekretärin [[1]].']],
            blanks: [
              { options: ['wird', 'werden', 'ist', 'hat'], answer: 'wird', explain: '"Brief" singular → wird.' },
              { options: ['geschrieben', 'schreiben', 'schreibt', 'schrieb'], answer: 'geschrieben', explain: 'Partizip II de "schreiben".' },
            ],
          },
          {
            scene: 'El pastel es preparado por el panadero.',
            lines: [['', 'Der Kuchen [[0]] vom Bäcker [[1]].']],
            blanks: [
              { options: ['wird', 'werden', 'wurde', 'ist'], answer: 'wird', explain: '"Kuchen" singular masculino → wird.' },
              { options: ['gebacken', 'backen', 'backt', 'buk'], answer: 'gebacken', explain: 'Partizip II de "backen" = gebacken.' },
            ],
          },
          {
            scene: 'Los niños son llevados al colegio.',
            lines: [['', 'Die Kinder [[0]] von den Eltern [[1]].']],
            blanks: [
              { options: ['werden', 'wird', 'sind', 'haben'], answer: 'werden', explain: 'Plural "Kinder" → werden.' },
              { options: ['gebracht', 'bringen', 'bringt', 'brachte'], answer: 'gebracht', explain: 'Partizip II de "bringen" = gebracht.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un proceso descrito en pasiva',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre cómo se hace una pizza con la forma correcta.',
        type: 'guidedText',
        scene: 'Un chef describe el proceso de preparar pizza.',
        text: 'Zuerst [[0]] der Teig geknetet. Dann [[1]] die Tomatensoße aufgetragen. Die Zutaten [[2]] sorgfältig gewählt. Die Pizza [[3]] bei 250 Grad gebacken. Schließlich [[4]] sie heiß serviert.',
        blanks: [
          { options: ['wird', 'werden', 'ist', 'hat'], answer: 'wird', explain: '"Teig" = singular → wird.' },
          { options: ['wird', 'werden', 'ist', 'hat'], answer: 'wird', explain: '"Soße" = singular → wird.' },
          { options: ['werden', 'wird', 'sind', 'haben'], answer: 'werden', explain: '"Zutaten" = plural → werden.' },
          { options: ['wird', 'werden', 'ist', 'hat'], answer: 'wird', explain: '"Pizza" = singular → wird.' },
          { options: ['wird', 'werden', 'ist', 'hat'], answer: 'wird', explain: '"sie" (die Pizza) = singular → wird.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma adecuada de werden en cada espacio.',
        type: 'freeText',
        scene: 'En una panadería, describiendo el proceso de producción.',
        text: 'Das Brot [[0]] täglich gebacken. Die Brötchen [[1]] um 5 Uhr morgens gemacht. Der Teig [[2]] von Hand geknetet. Die Produkte [[3]] frisch verkauft. Die Qualität [[4]] jeden Tag kontrolliert.',
        blanks: [
          { answer: 'wird', explain: '"Brot" singular → wird.' },
          { answer: 'werden', explain: '"Brötchen" plural → werden.' },
          { answer: 'wird', explain: '"Teig" singular → wird.' },
          { answer: 'werden', explain: '"Produkte" plural → werden.' },
          { answer: 'wird', explain: '"Qualität" singular → wird.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma a pasiva',
        tag: 'Escritura guiada',
        intro: 'Transforma la oración activa en una oración en voz pasiva.',
        type: 'write',
        items: [
          {
            scene: 'Activa: "Man trinkt hier Kaffee." → Pasiva con werden.',
            prompt: 'Man trinkt hier Kaffee.',
            answer: 'Kaffee wird hier getrunken.',
            accepted: ['Hier wird Kaffee getrunken.'],
            explain: '"Man" desaparece, "Kaffee" (Akk) se convierte en sujeto, "trinkt" → "wird... getrunken".',
          },
          {
            scene: 'Activa: "Der Arzt untersucht den Patienten." → Pasiva.',
            prompt: 'Der Arzt untersucht den Patienten.',
            answer: 'Der Patient wird vom Arzt untersucht.',
            accepted: ['Der Patient wird untersucht.'],
            explain: '"den Patienten" (Akk) se convierte en "der Patient" (Nom), agente "vom Arzt" es opcional.',
          },
          {
            scene: 'Activa: "Die Studenten lesen die Texte." → Pasiva.',
            prompt: 'Die Studenten lesen die Texte.',
            answer: 'Die Texte werden von den Studenten gelesen.',
            accepted: ['Die Texte werden gelesen.'],
            explain: '"die Texte" pasa a ser sujeto, agente "von den Studenten" es opcional.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe oraciones en pasiva',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales en Passiv Präsens.',
        type: 'write',
        items: [
          {
            scene: 'Describe qué se hace en una escuela.',
            prompt: 'Escribe una oración sobre lo que se hace en una escuela (pasiva).',
            answer: 'In der Schule werden Hausaufgaben kontrolliert.',
            accepted: [
              'Die Schüler werden unterrichtet.',
              'Deutsche Bücher werden gelesen.',
              'Mathe wird erklärt.',
            ],
            explain: 'Sujeto + wird/werden + Partizip II al final. El agente es opcional.',
          },
          {
            scene: 'Describe un proceso de fabricación.',
            prompt: 'Escribe una oración sobre cómo se produce algo (pasiva).',
            answer: 'Das Auto wird in Deutschland produziert.',
            accepted: [
              'Das Brot wird jeden Morgen gebacken.',
              'Die Produkte werden kontrolliert.',
            ],
            explain: 'Voz pasiva para procesos: lo importante es el objeto, no quién lo hace.',
          },
        ],
      },
    ],
  },
}

export default topic
