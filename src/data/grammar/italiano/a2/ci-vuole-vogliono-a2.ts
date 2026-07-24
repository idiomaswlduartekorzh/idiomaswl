import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ci-vuole-vogliono-a2',
  order: '10',
  color: '#009246',
  category: 'Espressioni impersonali',
  level: 'A2',
  title: 'Ci vuole / ci vogliono en italiano A2 — expresar necesidad',
  shortTitle: 'Ci vuole / ci vogliono',
  metaTitle: 'Ci vuole e ci vogliono italiano A2 — necesidad, tiempo, ingredientes',
  description:
    'La expresión "ci vuole" (singular) y "ci vogliono" (plural) se usa para indicar que algo es necesario o que algo requiere cierta cantidad de tiempo, dinero, esfuerzo, ingredientes, etc. Ci vuole + singular; ci vogliono + plural.',
  lead: 'Ci vuole + sing. (Per questa ricetta ci vuole un uovo.) / Ci vogliono + plur. (Ci vogliono due ore.) Expresa necesidad impersonal.',
  outcomes: [
    'Distinguir cuándo usar ci vuole (singular) y ci vogliono (plural)',
    'Expresar tiempo necesario con ci vuole/vogliono',
    'Usar la expresión para indicar ingredientes, materiales o esfuerzo necesario',
    'Conjugar ci vuole/vogliono en passato prossimo: ci è voluto / ci sono voluti',
  ],

  guide: {
    goal: 'Indicar lo que es necesario o cuánto tiempo/esfuerzo/ingredientes se necesita usando ci vuole/vogliono.',
    model: 'Per imparare l\'italiano ci vuole pazienza. / Per Roma ci vogliono tre ore di treno. / Ci è voluta una settimana per finire.',
    formula: 'ci vuole + [nome singolare] / ci vogliono + [nome plurale]',
    decisions: [
      'Ci vuole + sostantivo singolare: ci vuole un\'ora, ci vuole coraggio, ci vuole un euro',
      'Ci vogliono + sostantivo plurale: ci vogliono due ore, ci vogliono tre uova',
      'Per indicare necessità: per questa torta ci vogliono 200g di farina',
      'Con espressioni di tempo: quanto ci vuole? / quanto tempo ci vuole?',
      'Passato prossimo: ci è voluto (sing. m.) / ci è voluta (sing. f.) / ci sono voluti (plur. m.) / ci sono volute (plur. f.)',
      'La persona che ha bisogno: a me ci vuole tempo (io ho bisogno di tempo)',
    ],
    table: [
      ['Uso', 'Forma', 'Ejemplo'],
      ['Tiempo (sing.)', 'ci vuole + unità singola', 'Ci vuole un\'ora per arrivare'],
      ['Tiempo (plur.)', 'ci vogliono + unità plurale', 'Ci vogliono due ore in macchina'],
      ['Ingrediente (sing.)', 'ci vuole + ingrediente', 'Per la pasta ci vuole il sale'],
      ['Ingrediente (plur.)', 'ci vogliono + ingredienti', 'Ci vogliono tre uova per la torta'],
      ['Qualità (sing.)', 'ci vuole + qualità astratta', 'Per imparare ci vuole pazienza'],
      ['Passato (sing.)', 'ci è voluto/a', 'Ci è voluta una settimana'],
      ['Passato (plur.)', 'ci sono voluti/e', 'Ci sono voluti tre giorni'],
    ],
    mistakes: [
      'Usar ci vogliono con singular: ci vogliono un\'ora ✗ → ci vuole un\'ora ✓',
      'Usar ci vuole con plural: ci vuole tre ore ✗ → ci vogliono tre ore ✓',
      'Confundir con c\'è / ci sono: c\'è (hay/existe) vs ci vuole (se necesita)',
    ],
  },

  seo: [
    {
      heading: '¿Qué significa ci vuole / ci vogliono en italiano?',
      paragraphs: [
        '"Ci vuole / ci vogliono" es una expresión impersonal de necesidad: "hace falta", "se necesita" o "se tarda". La regla es simple y solo depende del número de lo necesitado: singular → ci vuole; plural → ci vogliono. En pasado usa essere y concuerda. Esta es la tabla:',
      ],
      table: [
        ['Cuándo', 'Forma', 'Ejemplo'],
        ['Se necesita 1 cosa (sing.)', 'ci vuole', 'Ci vuole tempo.'],
        ['Se necesitan varias (pl.)', 'ci vogliono', 'Ci vogliono tre ore.'],
        ['Pasado singular', 'ci è voluto/a', 'Ci è voluta un\'ora.'],
        ['Pasado plural', 'ci sono voluti/e', 'Ci sono voluti tre giorni.'],
      ],
    },
    {
      heading: '¿Cuándo se usa ci vuole y cuándo ci vogliono?',
      paragraphs: [
        '"ci vuole" cuando lo necesario es singular: "Ci vuole pazienza", "Ci vuole un\'ora". "ci vogliono" cuando es plural: "Ci vogliono due uova", "Ci vogliono tre giorni". Concuerda con la COSA necesitada, no con la persona.',
      ],
    },
    {
      heading: '¿Cómo se dice "se tarda X tiempo" en italiano?',
      paragraphs: [
        'De forma impersonal con "ci vuole / ci vogliono": "Per arrivare ci vogliono venti minuti" (se tardan veinte minutos en llegar). En pasado: "Ci è voluta un\'ora". Si el sujeto es una persona concreta, se usa "metterci" (ver abajo).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre volerci y metterci?',
      paragraphs: [
        '"Volerci" (ci vuole/vogliono) es impersonal: el tiempo o esfuerzo necesario en general ("Ci vogliono tre ore"). "Metterci" es personal: cuánto tarda alguien concreto ("Io ci metto tre ore", "Quanto ci metti?"). Volerci no lleva sujeto personal; metterci sí.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante distingue ci vuole (singular) de ci vogliono (plural) para expresar necesidad de tiempo, ingredientes y esfuerzo.',
    graphicPrompt: 'Reloj con flechas de tiempo, receta con ingredientes, termómetro de esfuerzo.',
    scene: [
      ['Ci vuole un\'ora per arrivare.', 'Se tarda una hora en llegar.'],
      ['Ci vogliono tre uova per la torta.', 'Se necesitan tres huevos para el pastel.'],
      ['Per imparare ci vuole pazienza.', 'Para aprender hace falta paciencia.'],
      ['Ci sono voluti due giorni.', 'Se tardaron dos días.'],
    ],
    learnerModes: ['visual: receta + cronómetro', 'analítico: singular vs plural', 'oral: decir cuánto tiempo se tarda'],
    reviewFocus: ['ci vuole + singolare', 'ci vogliono + plurale', 'passato: ci è voluto/ci sono voluti'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: '¿Ci vuole o ci vogliono?',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta: ci vuole o ci vogliono.',
        type: 'choice',
        items: [
          {
            scene: 'El viaje',
            lines: [['Marco', 'Da Milano a Roma ___ circa tre ore di treno.']],
            options: ['ci vogliono', 'ci vuole', 'ci sono', "c'è"],
            answer: 'ci vogliono',
            explain: 'Tre ore = plural → ci vogliono.',
          },
          {
            scene: 'La receta',
            lines: [['Giulia', 'Per questa pasta ___ solo un limone.']],
            options: ['ci vuole', 'ci vogliono', "c'è", 'ci sono'],
            answer: 'ci vuole',
            explain: 'Un limone = singular → ci vuole.',
          },
          {
            scene: 'El estudio',
            lines: [['Sofia', 'Per parlare bene italiano ___ molta pratica.']],
            options: ['ci vuole', 'ci vogliono', 'serve', 'bisogna'],
            answer: 'ci vuole',
            explain: 'Molta pratica = singular → ci vuole.',
          },
          {
            scene: 'Los ingredientes',
            lines: [['Leo', 'Per la pizza margherita ___ mozzarella, pomodoro e basilico.']],
            options: ['ci vogliono', 'ci vuole', "c'è", 'ci sono'],
            answer: 'ci vogliono',
            explain: 'Mozzarella, pomodoro e basilico = varios ingredientes → ci vogliono.',
          },
          {
            scene: 'El pasado',
            lines: [['Ana', 'Per trovare la strada ___ quasi un\'ora. (passato)']],
            options: ["ci è voluta", "ci sono volute", "ci è voluto", "ci vuole"],
            answer: "ci è voluta",
            explain: "Un'ora = femenino singular → ci è voluta.",
          },
          {
            scene: 'El pasado plural',
            lines: [['Carlo', 'Per finire il progetto ___ tre settimane. (passato)']],
            options: ['ci sono volute', "ci è voluto", "ci vuole", 'ci vogliono'],
            answer: 'ci sono volute',
            explain: 'Tre settimane = femenino plural → ci sono volute.',
          },
          {
            scene: 'La pregunta',
            lines: [['Luca', '— Quanto ___ per arrivare in centro?']],
            options: ['ci vuole', 'ci vogliono', "c'è", 'ci sono'],
            answer: 'ci vuole',
            explain: 'Quando ci vuole? pregunta por el tiempo necesario (singular implícito).',
          },
          {
            scene: 'El dinero',
            lines: [['Elena', 'Per comprare un biglietto ___ venti euro.']],
            options: ['ci vogliono', 'ci vuole', 'bisogna', "c'è"],
            answer: 'ci vogliono',
            explain: 'Venti euro = plural → ci vogliono.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Cantidad y verbo',
        tag: '2 espacios',
        intro: 'Completa con la cantidad o el sustantivo y la forma correcta de ci vuole/vogliono.',
        type: 'dual',
        items: [
          {
            scene: 'La pizza',
            lines: [['Chef', 'Per la pizza [[0]] [[1]]: farina, acqua, lievito e sale.']],
            blanks: [
              { options: ['ci vogliono', 'ci vuole', "c'è"], answer: 'ci vogliono', explain: 'Varios ingredientes (plural) → ci vogliono.' },
              { options: ['quattro ingredienti', 'un ingrediente', 'tanta farina'], answer: 'quattro ingredienti', explain: 'Quattro ingredienti = plural, compatible con ci vogliono.' },
            ],
          },
          {
            scene: 'El autobús',
            lines: [['Sofia', '[[0]] quanto tempo [[1]] per andare in centro?']],
            blanks: [
              { options: ['Secondo te,', 'Per fortuna,', 'Forse'], answer: 'Secondo te,', explain: 'Introducción a la pregunta de tiempo necesario.' },
              { options: ['ci vuole', 'ci vogliono', "c'è"], answer: 'ci vuole', explain: 'Quanto tempo = singular implícito → ci vuole.' },
            ],
          },
          {
            scene: 'El pasado',
            lines: [['Marco', 'Per preparare la cena [[0]] [[1]] due ore.']],
            blanks: [
              { options: ['ci sono volute', "ci è voluta", 'ci vogliono'], answer: 'ci sono volute', explain: 'Due ore = femenino plural → ci sono volute (passato).' },
              { options: ['esatte', 'esatto', 'esatta'], answer: 'esatte', explain: 'Due ore esatte (femenino plural).' },
            ],
          },
          {
            scene: 'El esfuerzo',
            lines: [['Giulia', 'Per diventare medico [[0]] [[1]] di studio e dedizione.']],
            blanks: [
              { options: ['ci vogliono', 'ci vuole', "c'è"], answer: 'ci vogliono', explain: 'Anni di studio = plural → ci vogliono.' },
              { options: ['anni', 'molta pazienza', 'un anno'], answer: 'anni', explain: 'Ci vogliono anni (plural).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La receta de la nonna',
        tag: 'Texto guiado',
        intro: 'Completa la receta con ci vuole o ci vogliono.',
        type: 'guidedText',
        scene: 'La nonna italiana explica cómo hacer tiramisù',
        text: 'Per un buon tiramisù [[0]] sei uova, [[1]] 500g di mascarpone e [[2]] almeno due ore in frigorifero. Ah, e [[3]] anche molta pazienza e amore! Per i savoiardi [[4]] un caffè forte.',
        blanks: [
          { options: ['ci vogliono', 'ci vuole', "c'è"], answer: 'ci vogliono', explain: 'Sei uova = plural → ci vogliono.' },
          { options: ['ci vuole', 'ci vogliono', "c'è"], answer: 'ci vuole', explain: '500g di mascarpone = singular (un ingrediente) → ci vuole.' },
          { options: ['ci vogliono', 'ci vuole', 'ci sono'], answer: 'ci vogliono', explain: 'Almeno due ore = plural → ci vogliono.' },
          { options: ['ci vuole', 'ci vogliono', "c'è"], answer: 'ci vuole', explain: 'Molta pazienza = singular → ci vuole.' },
          { options: ['ci vuole', 'ci vogliono', "c'è"], answer: 'ci vuole', explain: 'Un caffè forte = singular → ci vuole.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Completa con ci vuole o ci vogliono.',
        type: 'freeText',
        scene: 'Leo explica lo que se necesita para aprender italiano',
        text: 'Per imparare bene l\'italiano [[0]] tempo e costanza. Per ogni lezione [[1]] circa 30 minuti di studio. Per la pronuncia [[2]] molta pratica ad alta voce. Per capire i film italiani [[3]] almeno due anni di studio. E per tutto questo [[4]] grande motivazione!',
        blanks: [
          { answer: 'ci vogliono', explain: 'Tempo e costanza = plural → ci vogliono.' },
          { answer: 'ci vogliono', explain: 'Circa 30 minuti = plural → ci vogliono.' },
          { answer: 'ci vuole', explain: 'Molta pratica = singular → ci vuole.' },
          { answer: 'ci vogliono', explain: 'Almeno due anni = plural → ci vogliono.' },
          { answer: 'ci vuole', explain: 'Grande motivazione = singular → ci vuole.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye frases con ci vuole/vogliono',
        tag: 'Escritura guiada',
        intro: 'Escribe una frase completa usando ci vuole o ci vogliono.',
        type: 'write',
        items: [
          {
            scene: 'Para la torta',
            prompt: 'Per questa torta ___ (tre uova, farina e zucchero)',
            answer: 'Per questa torta ci vogliono tre uova, farina e zucchero.',
            accepted: ['per questa torta ci vogliono tre uova', 'ci vogliono tre uova farina e zucchero'],
            explain: 'Ingredientes múltiples (plural) → ci vogliono.',
          },
          {
            scene: 'El tiempo',
            prompt: 'Per imparare una lingua straniera ___ (muito tempo)',
            answer: 'Per imparare una lingua straniera ci vuole molto tempo.',
            accepted: ['ci vuole molto tempo', 'ci vogliono anni'],
            explain: 'Molto tempo = singular → ci vuole.',
          },
          {
            scene: 'El pasado',
            prompt: 'Per trovare casa a Milano ___ (sei mesi, passato)',
            answer: 'Per trovare casa a Milano ci sono voluti sei mesi.',
            accepted: ['ci sono voluti sei mesi', 'ci sono volute sei settimane'],
            explain: 'Sei mesi = masculino plural → ci sono voluti.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Ci vuole/vogliono en tu vida',
        tag: 'Escritura libre',
        intro: 'Usa ci vuole/vogliono para hablar de lo que se necesita en situaciones de tu vida.',
        type: 'write',
        items: [
          {
            scene: 'Para tu actividad favorita',
            prompt: 'Per fare [tu actividad favorita] ci vuole/vogliono... (tiempo, materiales, habilidades)',
            answer: 'Per suonare la chitarra ci vogliono anni di pratica e ci vuole molta dedizione.',
            accepted: ['ci vuole', 'ci vogliono'],
            explain: 'Usa ci vuole + singular y ci vogliono + plural según lo que necesitas.',
          },
          {
            scene: 'El viaje',
            prompt: 'Per andare da casa tua a [un luogo] ci vogliono/ci vuole...',
            answer: "Per andare da casa mia all'aeroporto ci vogliono quaranta minuti.",
            accepted: ['ci vogliono', 'ci vuole'],
            explain: 'Quaranta minuti = plural → ci vogliono. Un\'ora = singular → ci vuole.',
          },
          {
            scene: 'Aprender idiomas',
            prompt: 'Per imparare [un idioma] ci vuole/ci vogliono... (tu opinión)',
            answer: "Per imparare il coreano ci vogliono almeno tre anni e ci vuole tanto impegno.",
            accepted: ['ci vuole', 'ci vogliono'],
            explain: 'Expr. temporales: tre anni → ci vogliono. Qualità: tanto impegno → ci vuole.',
          },
        ],
      },
    ],
  },
}

export default topic
