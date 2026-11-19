import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'uhrzeit',
  order: '21',
  color: '#856100',
  category: 'Alltag',
  level: 'A1',
  title: 'La hora en alemán A1: leer relojes y decir la hora',
  shortTitle: 'Die Uhrzeit · la hora',
  metaTitle: 'La hora en alemán A1: relojes, halb y Viertel | WeLearn',
  description: 'Aprende a leer relojes y a preguntar y decir la hora en alemán. Compara la forma de los horarios con nach, vor, halb y Viertel, y practica con relojes de manecillas.',
  lead: 'Mira primero la aguja larga: marca los minutos. Luego mira la corta: indica la hora. A las 3:30 se dice halb vier, literalmente «media hora hacia las cuatro». Aquí aprenderás a leer el reloj y a comunicar la hora con seguridad.',
  outcomes: [
    'Lees horas y minutos en un reloj de manecillas sin confundir la aguja corta con la larga.',
    'Preguntas y respondes la hora en alemán con la forma de los horarios y la forma coloquial.',
    'Interpretas nach, vor, Viertel y halb, incluido el cambio a la hora siguiente.',
    'Distingues Es ist ... de um ... al hablar de una cita o una salida.',
  ],
  guide: {
    goal: 'Leer un reloj analógico y decir la hora de manera comprensible en situaciones cotidianas de nivel A1.',
    model: 'Wie spät ist es? — Es ist halb vier. (3:30) / Um wie viel Uhr beginnt der Kurs? — Um vierzehn Uhr dreißig. (14:30)',
    formula: 'Es ist + hora + Uhr + minutos | minutos + nach/vor + hora | halb + hora siguiente',
    decisions: [
      'Busca la aguja larga: en el 12 son :00; en el 3 son :15; en el 6 son :30; en el 9 son :45.',
      'Mira la aguja corta: si está entre dos números, todavía no ha llegado al segundo.',
      'Para un horario escrito, usa la hora de 24 horas: 14:30 → vierzehn Uhr dreißig.',
      'Con minutos del :01 al :29, puedes decir minutos + nach + la hora actual: 3:10 → zehn nach drei.',
      'A los :15 di Viertel nach + hora actual: 3:15 → Viertel nach drei.',
      'A los :30 di halb + hora siguiente: 3:30 → halb vier, no halb drei.',
      'Con minutos del :31 al :59, cuenta lo que falta y usa vor + hora siguiente: 3:50 → zehn vor vier.',
      'A los :45 di Viertel vor + hora siguiente: 3:45 → Viertel vor vier.',
      'Para preguntar la hora actual: Wie spät ist es? o Wie viel Uhr ist es? Responde Es ist ...',
      'Para preguntar a qué hora ocurre algo: Um wie viel Uhr ...? Responde Um ...',
      'El reloj de manecillas no revela si son las 3:00 o las 15:00; añade contexto o usa 15 Uhr.',
    ],
    table: [
      ['Hora', 'Horario o forma precisa', 'Conversación cotidiana'],
      ['1:00', 'ein Uhr', 'ein Uhr'],
      ['3:00', 'drei Uhr', 'drei Uhr'],
      ['3:05', 'drei Uhr fünf', 'fünf nach drei'],
      ['3:15', 'drei Uhr fünfzehn', 'Viertel nach drei'],
      ['3:30', 'drei Uhr dreißig', 'halb vier'],
      ['3:45', 'drei Uhr fünfundvierzig', 'Viertel vor vier'],
      ['3:55', 'drei Uhr fünfundfünfzig', 'fünf vor vier'],
      ['14:10', 'vierzehn Uhr zehn', 'zehn nach zwei (por la tarde)'],
      ['0:00', 'null Uhr', 'Mitternacht'],
    ],
    mistakes: [
      '3:30 → halb vier ✓. Halb drei significa 2:30, porque la media hora apunta hacia las tres.',
      '3:45 → Viertel vor vier ✓. Viertel vor drei corresponde a 2:45.',
      '1:00 → ein Uhr ✓, no eins Uhr. Sin Uhr, en el habla se puede oír Es ist eins.',
      'Wie spät ist es? — Es ist drei Uhr ✓. Para una cita: Der Kurs beginnt um drei Uhr ✓; no Es ist um drei Uhr.',
      'Uhr lleva mayúscula y no cambia a plural al decir la hora: zwei Uhr, no zwei Uhren.',
    ],
  },
  seo: [
    {
      heading: 'Cómo leer un reloj de manecillas antes de hablar',
      paragraphs: [
        'La aguja larga es el minutero (der Minutenzeiger); la corta es la aguja horaria (der Stundenzeiger). Empieza por la larga. Cada número representa cinco minutos: 1 = :05, 2 = :10, 3 = :15, 6 = :30 y 9 = :45. Si apunta al 12, la hora está en punto. No leas el número que señala el minutero como si fuera una hora.',
        'Después observa la aguja corta. A las 3:30 no está clavada en el 3: va a medio camino hacia el 4. A las 3:45 está aún más cerca del 4, pero son todavía las tres. Esta posición física explica por qué en alemán aparecen expresiones que nombran la hora siguiente. Un reloj de doce horas no muestra si es de mañana o de tarde; para saberlo necesitas el contexto.',
      ],
      table: [['Minutero en', 'Minutos', 'Lectura básica'], ['12', ':00', 'en punto'], ['1', ':05', 'cinco minutos'], ['3', ':15', 'un cuarto'], ['6', ':30', 'media hora'], ['9', ':45', 'faltan quince'], ['11', ':55', 'faltan cinco']],
    },
    {
      heading: 'Vocabulario esencial de la hora en alemán',
      paragraphs: [
        'Die Uhr es el reloj como objeto y también aparece después del número cuando dices una hora precisa: drei Uhr. Die Uhrzeit es la hora del día que se comunica en una cita o un horario. Die Stunde es una duración de sesenta minutos: Ich lerne eine Stunde (estudio una hora). Por eso no sustituyas Uhr por Stunde al responder qué hora es.',
        'Nach significa «después de» y vor significa «antes de». Halb significa «media» y Viertel, «cuarto». En esta lección cada palabra se aprende junto con una imagen del reloj y una frase útil, de modo que el vocabulario sirve para comprender una hora real, no solo para memorizar una lista.',
      ],
      table: [['Alemán', 'Español', 'Ejemplo útil'], ['die Uhr', 'reloj / marcador de hora', 'Es ist drei Uhr.'], ['die Uhrzeit', 'hora del día', 'Welche Uhrzeit passt?'], ['die Stunde', 'hora de duración', 'Eine Stunde dauert 60 Minuten.'], ['die Minute', 'minuto', 'Fünf Minuten später.'], ['der Stundenzeiger', 'aguja corta', 'Der Stundenzeiger steht zwischen drei und vier.'], ['der Minutenzeiger', 'aguja larga', 'Der Minutenzeiger steht auf der Sechs.'], ['nach / vor', 'pasadas / para', 'Zehn nach drei / zehn vor vier.'], ['halb / Viertel', 'media / cuarto', 'Halb vier / Viertel nach drei.'], ['der Termin', 'cita', 'Der Termin ist um 15 Uhr.'], ['der Fahrplan', 'horario de transporte', 'Der Zug fährt um 14:10 Uhr.']],
    },
    {
      heading: 'Cómo preguntar la hora y cómo preguntar por un horario',
      paragraphs: [
        'Para saber la hora de ahora, pregunta Wie spät ist es? o Wie viel Uhr ist es? Las dos son naturales. Se responde Es ist ...: Wie spät ist es? — Es ist Viertel nach drei. La palabra spät forma parte de la pregunta establecida; no significa aquí que la persona llegue tarde.',
        'Si quieres saber cuándo empieza una clase, un tren o una cita, pregunta Um wie viel Uhr beginnt ...? o, de forma más amplia, Wann beginnt ...? La respuesta lleva um: Der Kurs beginnt um acht Uhr. La diferencia es de función: Es ist informa qué marca el reloj; um ocho indica el momento en que ocurre una acción. En el habla también se oye Um drei, sin repetir Uhr, si la hora ya está clara.',
      ],
      table: [['Intención', 'Pregunta', 'Respuesta'], ['Hora actual', 'Wie spät ist es?', 'Es ist halb vier.'], ['Hora actual', 'Wie viel Uhr ist es?', 'Es ist drei Uhr fünfzehn.'], ['Inicio de evento', 'Um wie viel Uhr beginnt der Kurs?', 'Um neun Uhr.'], ['Pregunta general', 'Wann fährt der Zug?', 'Er fährt um 14:10 Uhr.']],
    },
    {
      heading: 'La forma precisa de los horarios: Uhr y el reloj de 24 horas',
      paragraphs: [
        'En horarios de tren, citas y anuncios se usa a menudo la forma precisa con veinticuatro horas: 14:10 → vierzehn Uhr zehn; 18:30 → achtzehn Uhr dreißig. La estructura es hora + Uhr + minutos. No hay que convertir las 14 a las 2 para leer un horario formal. La forma con Uhr es especialmente clara cuando importa distinguir mañana y tarde.',
        'Cuando la hora es la una, se dice ein Uhr, no eins Uhr. Para las 2:05 puedes decir zwei Uhr fünf; el cero de 05 no se pronuncia. En una respuesta cotidiana también puedes usar la forma precisa: no es una forma «incorrecta» por ser formal. A medianoche, un horario puede indicar 0:00 como null Uhr; en conversación se entiende Mitternacht.',
      ],
      table: [['Escrito', 'Dicho en horario', 'En español'], ['01:00', 'ein Uhr', 'la una'], ['08:05', 'acht Uhr fünf', 'las ocho y cinco'], ['12:00', 'zwölf Uhr', 'mediodía'], ['14:10', 'vierzehn Uhr zehn', 'las dos y diez de la tarde'], ['18:30', 'achtzehn Uhr dreißig', 'las seis y media de la tarde'], ['00:00', 'null Uhr', 'medianoche']],
    },
    {
      heading: 'La forma cotidiana: nach, vor, Viertel y halb',
      paragraphs: [
        'En conversación se suele mirar la hora desde el último número entero o hacia el siguiente. A las 3:10 ya pasaron diez minutos de las tres: zehn nach drei. A las 3:50 faltan diez para las cuatro: zehn vor vier. A los :15 se usa Viertel nach y a los :45, Viertel vor. Esta manera de contar se parece en parte al español «y cuarto» y «menos cuarto».',
        'La diferencia crucial está en halb. Halb vier no significa «las cuatro y media»: significa media hora antes de las cuatro, es decir, 3:30. Piensa en la aguja corta a medio camino hacia el 4. El número que viene después de halb es la próxima hora. Así, 7:30 = halb acht y 12:30 = halb eins. En una conversación puedes añadir morgens, nachmittags o abends cuando el momento del día no está claro.',
      ],
      table: [['Reloj', 'Forma coloquial', 'Idea para recordarla'], ['3:05', 'fünf nach drei', 'cinco después de las tres'], ['3:15', 'Viertel nach drei', 'un cuarto después de las tres'], ['3:30', 'halb vier', 'a medio camino hacia las cuatro'], ['3:45', 'Viertel vor vier', 'un cuarto antes de las cuatro'], ['3:55', 'fünf vor vier', 'cinco antes de las cuatro'], ['7:30', 'halb acht', 'a medio camino hacia las ocho']],
    },
    {
      heading: 'Matices para hispanohablantes: duración, contexto y variantes regionales',
      paragraphs: [
        'En español «hora» nombra tanto el momento como la duración. En alemán conviene separarlos: Es ist drei Uhr dice qué marca el reloj; Der Unterricht dauert eine Stunde dice que la clase dura sesenta minutos. Del mismo modo, Es ist halb vier informa la hora actual, pero Der Film beginnt um halb vier sitúa el inicio de la película.',
        'Algunas regiones usan viertel vier para 3:15 y dreiviertel vier para 3:45. Puedes aprender a reconocer esas formas si las oyes, pero para empezar produce Viertel nach drei y Viertel vor vier: son expresiones claras en distintas regiones. Un reloj analógico tampoco decide por ti entre 3:15 y 15:15; si el contexto importa, usa fünfzehn Uhr fünfzehn o añade nachmittags.',
      ],
      table: [['Si ves u oyes', 'Interprétalo como', 'Consejo A1'], ['halb vier', '3:30', 'piensa en la hora siguiente'], ['viertel vier (regional)', '3:15', 'produce Viertel nach drei'], ['dreiviertel vier (regional)', '3:45', 'produce Viertel vor vier'], ['eine Stunde', '60 minutos de duración', 'no es una hora del reloj'], ['um 15 Uhr', 'a las 15:00', 'momento de una acción'], ['Es ist 15 Uhr', 'son las 15:00', 'hora actual']],
    },
    {
      heading: 'De la imagen al diálogo: tres situaciones reales',
      paragraphs: [
        'Situación 1, en casa: una persona ve las agujas en 6:30 y pregunta Wie spät ist es? Respuesta: Es ist halb sieben. Situación 2, en la estación: el billete indica 14:10. La información se lee Der Zug fährt um vierzehn Uhr zehn. Situación 3, antes de una cita: el reloj marca 8:45 y la reunión empieza a las 9. Puedes decir Es ist Viertel vor neun. Der Termin beginnt um neun Uhr.',
        'Practica primero leyendo la aguja larga y luego la corta. Después elige una forma que encaje con la situación: coloquial para una conversación y precisa para un horario. Por último, pasa de decir simplemente la hora a usarla en una frase: Wir treffen uns um halb vier. Repite el mismo recorrido con relojes distintos hasta que puedas hacerlo sin traducir mentalmente cada palabra.',
      ],
      table: [['Contexto', 'Reloj o dato', 'Frase útil'], ['En casa', '6:30', 'Es ist halb sieben.'], ['Billete de tren', '14:10', 'Der Zug fährt um vierzehn Uhr zehn.'], ['Antes de una cita', '8:45', 'Es ist Viertel vor neun.'], ['Cita', '9:00', 'Der Termin beginnt um neun Uhr.']],
    },
  ],
  visual: {
    mode: 'clock',
    teacherLens: 'Lee primero el minutero y después la aguja horaria. Compara la misma imagen con la forma precisa y la forma coloquial.',
    graphicPrompt: 'Seis relojes analógicos con el minutero rojo y la aguja horaria azul muestran el paso de en punto a nach, halb y vor.',
    clocks: [
      { hour: 3, minute: 0, digital: '03:00', spoken: 'drei Uhr', meaning: 'las tres en punto', note: 'El minutero está en el 12.' },
      { hour: 3, minute: 5, digital: '03:05', spoken: 'fünf nach drei', meaning: 'las tres y cinco', note: 'El minutero está en el 1.' },
      { hour: 3, minute: 15, digital: '03:15', spoken: 'Viertel nach drei', meaning: 'las tres y cuarto', note: 'El minutero está en el 3.' },
      { hour: 3, minute: 30, digital: '03:30', spoken: 'halb vier', meaning: 'las tres y media', note: 'La aguja corta va hacia el 4.' },
      { hour: 3, minute: 45, digital: '03:45', spoken: 'Viertel vor vier', meaning: 'las cuatro menos cuarto', note: 'El minutero está en el 9.' },
      { hour: 3, minute: 55, digital: '03:55', spoken: 'fünf vor vier', meaning: 'las cuatro menos cinco', note: 'El minutero está en el 11.' },
    ],
    scene: [
      ['03:00', 'drei Uhr — hora en punto'],
      ['03:05', 'drei Uhr fünf / fünf nach drei'],
      ['03:15', 'drei Uhr fünfzehn / Viertel nach drei'],
      ['03:30', 'drei Uhr dreißig / halb vier'],
      ['03:45', 'drei Uhr fünfundvierzig / Viertel vor vier'],
      ['03:55', 'drei Uhr fünfundfünfzig / fünf vor vier'],
      ['14:10', 'vierzehn Uhr zehn — horario de 24 horas'],
      ['Wie spät ist es?', 'Es ist ... — hora actual'],
      ['Um wie viel Uhr?', 'Um ... — hora de una acción'],
    ],
    learnerModes: ['ver relojes', 'escoger', 'completar', 'escribir'],
    reviewFocus: ['minutero antes que aguja horaria', 'halb + próxima hora', 'nach / vor', 'Es ist / um', '24 horas en horarios'],
  },
  practice: {
    levels: [
      {
        id: 'l1', title: 'Lee el reloj', tag: 'Relojes · opción múltiple',
        intro: 'Observa las dos agujas y elige la forma coloquial correcta. Las soluciones aparecen al terminar el nivel.',
        type: 'choice', items: [
          { scene: 'Reloj 1', clock: { hour: 3, minute: 0 }, lines: [['Mia', 'Wie spät ist es?']], options: ['drei Uhr', 'halb drei', 'Viertel nach drei', 'drei Uhr dreißig'], answer: 'drei Uhr', explain: 'Minutero en el 12 y aguja corta en el 3: son las 3:00, drei Uhr.' },
          { scene: 'Reloj 2', clock: { hour: 3, minute: 15 }, lines: [['Jonas', 'Wie spät ist es?']], options: ['Viertel nach drei', 'Viertel vor drei', 'halb vier', 'Viertel nach vier'], answer: 'Viertel nach drei', explain: 'Minutero en el 3: :15. Han pasado quince minutos de las tres.' },
          { scene: 'Reloj 3', clock: { hour: 3, minute: 30 }, lines: [['Mia', 'Wie spät ist es?']], options: ['halb vier', 'halb drei', 'drei Uhr', 'Viertel vor vier'], answer: 'halb vier', explain: 'La aguja corta está a medio camino hacia el 4: 3:30 = halb vier.' },
          { scene: 'Reloj 4', clock: { hour: 3, minute: 45 }, lines: [['Jonas', 'Wie spät ist es?']], options: ['Viertel vor vier', 'Viertel nach vier', 'Viertel vor drei', 'halb vier'], answer: 'Viertel vor vier', explain: 'Minutero en el 9: faltan quince minutos para las cuatro.' },
          { scene: 'Reloj 5', clock: { hour: 7, minute: 5 }, lines: [['Mia', 'Wie spät ist es?']], options: ['fünf nach sieben', 'fünf vor sieben', 'sieben Uhr fünfzig', 'fünf nach acht'], answer: 'fünf nach sieben', explain: 'Minutero en el 1: :05. Son cinco minutos después de las siete.' },
          { scene: 'Reloj 6', clock: { hour: 9, minute: 50 }, lines: [['Jonas', 'Wie spät ist es?']], options: ['zehn vor zehn', 'zehn nach neun', 'zehn vor neun', 'halb zehn'], answer: 'zehn vor zehn', explain: 'Minutero en el 10: :50. Faltan diez minutos para las diez.' },
          { scene: 'Reloj 7', clock: { hour: 1, minute: 0 }, lines: [['Mia', 'Wie spät ist es?']], options: ['ein Uhr', 'eins Uhr', 'halb eins', 'ein Stunden'], answer: 'ein Uhr', explain: 'La una se dice ein Uhr; eins pierde la -s delante de Uhr.' },
          { scene: 'Reloj 8', clock: { hour: 12, minute: 30 }, lines: [['Jonas', 'Wie spät ist es?']], options: ['halb eins', 'halb zwölf', 'zwölf Uhr', 'Viertel vor eins'], answer: 'halb eins', explain: '12:30 está a medio camino hacia la una: halb eins.' },
        ],
      },
      {
        id: 'l2', title: 'Forma las expresiones', tag: 'Relojes · dos decisiones',
        intro: 'Completa cada expresión a partir del reloj. Fíjate en cuándo cambia la hora nombrada.',
        type: 'dual', items: [
          { scene: 'La media hora', clock: { hour: 6, minute: 30 }, lines: [['Mia', 'Es ist [[0]] [[1]].']], blanks: [
            { options: ['halb', 'Viertel', 'sechs'], answer: 'halb', explain: 'A los :30 se usa halb.' },
            { options: ['sieben', 'sechs', 'acht'], answer: 'sieben', explain: '6:30 = halb sieben: se nombra la próxima hora.' },
          ] },
          { scene: 'Un cuarto para', clock: { hour: 4, minute: 45 }, lines: [['Jonas', 'Es ist [[0]] [[1]] fünf.']], blanks: [
            { options: ['Viertel', 'halb', 'vier'], answer: 'Viertel', explain: ':45 deja un cuarto de hora.' },
            { options: ['vor', 'nach', 'um'], answer: 'vor', explain: 'Falta un cuarto para las cinco: Viertel vor fünf.' },
          ] },
          { scene: 'La cita es a las 2:20 de la tarde', clock: { hour: 14, minute: 20 }, lines: [['Mia', 'Der Termin beginnt um [[0]] Uhr [[1]].']], blanks: [
            { options: ['vierzehn', 'zwei', 'zwölf'], answer: 'vierzehn', explain: 'En un horario de 24 horas, las 14 se dicen vierzehn.' },
            { options: ['zwanzig', 'zwei', 'dreißig'], answer: 'zwanzig', explain: '14:20 = vierzehn Uhr zwanzig.' },
          ] },
          { scene: 'La una en punto', clock: { hour: 1, minute: 0 }, lines: [['Jonas', 'Es ist [[0]] [[1]].']], blanks: [
            { options: ['ein', 'eins', 'eine'], answer: 'ein', explain: 'Con Uhr se dice ein, sin -s.' },
            { options: ['Uhr', 'Stunde', 'Uhren'], answer: 'Uhr', explain: 'Para el momento del día se usa Uhr.' },
          ] },
          { scene: 'Cinco para', clock: { hour: 8, minute: 55 }, lines: [['Mia', 'Es ist [[0]] [[1]] neun.']], blanks: [
            { options: ['fünf', 'neun', 'halb'], answer: 'fünf', explain: ':55 significa cinco minutos restantes.' },
            { options: ['vor', 'nach', 'um'], answer: 'vor', explain: '8:55 = fünf vor neun.' },
          ] },
        ],
      },
      {
        id: 'l3', title: 'El horario de la ciudad', tag: 'Horario · opciones',
        intro: 'Lee el horario y completa las frases de una estación, una clase y una cita.',
        type: 'guidedText', scene: 'Un día en Berlín',
        text: 'Der Zug fährt um [[0]] (08:05). Der Deutschkurs beginnt um [[1]] (09:00). Um [[2]] (12:30) essen wir zu Mittag. Der Termin ist um [[3]] (14:10). Der Bus fährt um [[4]] (17:45). Am Abend beginnt der Film um [[5]] (20:00).',
        blanks: [
          { options: ['acht Uhr fünf', 'acht Uhr fünfzig', 'fünf vor acht'], answer: 'acht Uhr fünf', explain: '08:05 se lee acht Uhr fünf en un horario.' },
          { options: ['neun Uhr', 'neun Stunden', 'halb neun'], answer: 'neun Uhr', explain: '09:00 = neun Uhr.' },
          { options: ['zwölf Uhr dreißig', 'halb zwölf', 'zwölf Uhr dreizehn'], answer: 'zwölf Uhr dreißig', explain: '12:30 = zwölf Uhr dreißig; coloquialmente halb eins.' },
          { options: ['vierzehn Uhr zehn', 'zehn Uhr vierzehn', 'vierzehn Uhr zwanzig'], answer: 'vierzehn Uhr zehn', explain: '14:10 se lee en 24 horas: vierzehn Uhr zehn.' },
          { options: ['siebzehn Uhr fünfundvierzig', 'siebzehn Uhr fünfzehn', 'Viertel vor siebzehn'], answer: 'siebzehn Uhr fünfundvierzig', explain: '17:45 en un horario: siebzehn Uhr fünfundvierzig.' },
          { options: ['zwanzig Uhr', 'zwölf Uhr', 'halb zwanzig'], answer: 'zwanzig Uhr', explain: '20:00 = zwanzig Uhr.' },
        ],
      },
      {
        id: 'l4', title: 'Es ist o um', tag: 'Contexto · sin opciones',
        intro: 'Escribe la expresión que falta. Distingue la hora actual del momento de una acción.',
        type: 'freeText', scene: 'Conversaciones de horarios',
        text: '— Wie spät ist es? — [[0]] (3:00). — Um wie viel Uhr beginnt der Kurs? — [[1]] (3:00). — Wie spät ist es jetzt? — [[2]] (3:30, forma coloquial). — Wann fährt der Zug? — [[3]] (14:10, forma precisa). — Wie spät ist es? — [[4]] (7:45, forma coloquial). — Wann treffen wir uns? — [[5]] (8:00).',
        blanks: [
          { answer: 'Es ist drei Uhr', accepted: ['Es ist drei Uhr.'], explain: 'Hora actual: Es ist drei Uhr.' },
          { answer: 'Um drei Uhr', accepted: ['um drei Uhr'], explain: 'Momento de una acción: um drei Uhr.' },
          { answer: 'Es ist halb vier', accepted: ['Es ist halb vier.'], explain: '3:30 = halb vier; Es ist para la hora actual.' },
          { answer: 'Um vierzehn Uhr zehn', accepted: ['um vierzehn Uhr zehn'], explain: '14:10 en un horario: um vierzehn Uhr zehn.' },
          { answer: 'Es ist Viertel vor acht', accepted: ['Es ist Viertel vor acht.'], explain: '7:45 = Viertel vor acht.' },
          { answer: 'Um acht Uhr', accepted: ['um acht Uhr'], explain: 'El encuentro es a las 8:00: um acht Uhr.' },
        ],
      },
      {
        id: 'l5', title: 'Di la hora que ves', tag: 'Relojes · respuesta escrita',
        intro: 'Escribe una oración completa para cada reloj. Aquí se comprueba la hora exacta, no solo un intento de escritura.',
        type: 'write', items: [
          { scene: 'Reloj A', clock: { hour: 2, minute: 0 }, prompt: 'Responde a Wie spät ist es? con una oración que incluya Uhr.', answer: 'Es ist zwei Uhr.', explain: 'Minutero en el 12 y aguja corta en el 2: Es ist zwei Uhr.', strict: true },
          { scene: 'Reloj B', clock: { hour: 2, minute: 15 }, prompt: 'Escribe la hora coloquial usando Viertel nach.', answer: 'Es ist Viertel nach zwei.', explain: '2:15 = Viertel nach zwei. Se nombra la hora actual.', strict: true },
          { scene: 'Reloj C', clock: { hour: 2, minute: 30 }, prompt: 'Responde con halb y la hora hacia la que avanza la aguja corta.', answer: 'Es ist halb drei.', explain: '2:30 = halb drei: media hora hacia las tres.', strict: true },
          { scene: 'Reloj D', clock: { hour: 2, minute: 45 }, prompt: 'Escribe una oración coloquial con Viertel vor.', answer: 'Es ist Viertel vor drei.', explain: '2:45 = Viertel vor drei; faltan quince minutos.', strict: true },
          { scene: 'Reloj E', clock: { hour: 5, minute: 10 }, prompt: 'Di cuántos minutos han pasado usando nach.', answer: 'Es ist zehn nach fünf.', explain: '5:10 = zehn nach fünf.', strict: true },
          { scene: 'Reloj F', clock: { hour: 5, minute: 50 }, prompt: 'Di cuántos minutos faltan usando vor.', answer: 'Es ist zehn vor sechs.', explain: '5:50 = zehn vor sechs.', strict: true },
          { scene: 'Reloj G', clock: { hour: 11, minute: 30 }, prompt: 'Escribe una oración con halb y la hora siguiente.', answer: 'Es ist halb zwölf.', explain: '11:30 = halb zwölf.', strict: true },
        ],
      },
      {
        id: 'l6', title: 'Usa la hora en tu vida', tag: 'Producción propia',
        intro: 'Escribe frases útiles para situaciones reales. Compara tu producción con los modelos al terminar.',
        type: 'write', items: [
          { scene: 'Tu rutina de mañana', prompt: 'Escribe en alemán a qué hora te levantas. Usa um y una hora real de tu rutina.', answer: 'Ich stehe um sieben Uhr auf.', explain: 'Un momento en una rutina se introduce con um: Ich stehe um sieben Uhr auf.' },
          { scene: 'Una cita', prompt: 'Escribe una pregunta para saber a qué hora empieza una cita y una respuesta con un horario de 24 horas.', answer: 'Um wie viel Uhr beginnt der Termin? Er beginnt um vierzehn Uhr zehn.', explain: 'Pregunta por el momento con Um wie viel Uhr; responde con um + hora.' },
          { scene: 'Un amigo pregunta la hora', prompt: 'Escribe en alemán la pregunta por la hora actual y una respuesta coloquial para las 3:30.', answer: 'Wie spät ist es? Es ist halb vier.', explain: 'La hora actual usa Es ist. Halb vier = 3:30.' },
          { scene: 'Un tren', prompt: 'Escribe una frase que diga que el tren sale a las 8:45, usando la forma precisa de un horario.', answer: 'Der Zug fährt um acht Uhr fünfundvierzig.', explain: 'El horario se expresa con um acht Uhr fünfundvierzig; en conversación, Viertel vor neun.' },
        ],
      },
    ],
  },
}

export default topic
