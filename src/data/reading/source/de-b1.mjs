// Lectura — Alemán B1. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de alemán B1 —dos por lectura— y cada una
// arrastra además un tema de A1 o de A2. Banda propia del alemán: 300-360 palabras,
// razonada en `scripts/lib/reading-blueprint.mjs`: una palabra alemana de B1 tiene 6,7
// letras de media frente a las 5,0 de una lengua romance, así que 330 palabras alemanas
// cargan lo que 420 francesas.
//
// Lo que estrena B1 no es un tiempo verbal, es la DISTANCIA. El Konjunktiv II para lo que
// no pasó, la indirekte Rede para lo que otro dijo, la pasiva para lo que se hizo sin que
// importe quién. Un alumno de A2 cuenta hechos; uno de B1 tiene que distinguir el hecho de
// quien lo afirma. Por eso varias de estas lecturas tienen narrador poco fiable a propósito.
//
// Sigue en pie el enemigo de siempre del hispanohablante: el ORDEN. En B1 se agrava, porque
// una subordinada puede llevar cinco palabras entre el sujeto y su verbo.

const EARLIER = [
  // A1
  'adjektive-pradikativ', 'akkusativ', 'artikel', 'dativ-praepositionen', 'imperativ',
  'modalverben', 'personalpronomen-akkusativ', 'personalpronomen', 'plural-nomen',
  'possessivpronomen', 'praepositionen-ort', 'praepositionen-zeit', 'prasens-regelmaessig',
  'prasens-unregelmaessig', 'trennbare-verben', 'verb-haben', 'verb-sein', 'verneinung',
  'w-fragen', 'zukunft-prasens',
  // A2
  'adjektivdeklination-a2', 'da-hin-her-a2', 'dativ-a2', 'futur-i-a2', 'genitiv-a2',
  'infinitiv-zu-a2', 'komparativ-superlativ-a2', 'konjunktionen-a2',
  'konjunktiv-ii-wurden-a2', 'modalverben-praeteritum-a2', 'partizip-als-adjektiv-a2',
  'passiv-praesens-a2', 'perfekt-haben-a2', 'perfekt-sein-a2', 'praeteritum-basic-a2',
  'reflexivverben-a2', 'relativsaetze-a2', 'trennbare-verben-praeteritum-a2',
  'wechselpraepositionen-a2', 'zweiteilige-konnektoren-a2',
]

const B1_GRAMMAR = [
  'adjektivdeklination-b1', 'genitiv-b1', 'imperativ-b1', 'indirekte-rede-b1',
  'infinitiv-zu-b1', 'kausale-konzessive-satze-b1', 'konjunktiv-ii-b1',
  'modalverben-prateritum-b1', 'nebensatze-b1', 'partizip-als-adjektiv-b1', 'passiv-b1',
  'perfekt-haben-sein-b1', 'prateritum-starke-verben-b1', 'reflexive-verben-b1',
  'relativsatze-b1', 'temporale-prapositionen-b1', 'verben-mit-prapositionen-b1',
  'wechselprapositionen-b1', 'wortbildung-b1', 'zweiteilige-konnektoren-b1',
]

export default {
  language: 'de',
  variant: 'de-DE',
  cefr: 'B1',
  displayLabel: 'Alemán B1',
  tutorLocales: ['es'],
  status: 'draft',
  seriesId: 'aleman-b1-lectura-10',
  allowedGrammar: [...EARLIER, ...B1_GRAMMAR],
  disallowedGrammar: ['Futur II', 'erweitertes Partizipialattribut', 'Nominalstil amtlich', 'Konjunktiv I seltener Verben'],
  maxOutOfLevelVocabularyPercent: 6,
  inferenceBand: 'moderate',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'space' },
  targetCanDo:
    'Puedes seguir un texto alemán largo que desarrolla una idea y cambia de dirección, separar lo que ocurrió de lo que alguien dice que ocurrió, y justificar una inferencia cruzando dos pasajes distintos.',
  assessor: 'Preflight editorial — falta confirmación de hablante nativo',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Prosa B1 con Konjunktiv II, indirekte Rede, pasiva y subordinadas encadenadas. Konjunktiv I solo en verbos frecuentes (sei, habe, wolle). Inferencia moderada: exige cruzar dos pasajes separados.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Pendiente',
    pedagogyReviewer: 'Pendiente',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA. Falta revisión de lengua por hablante nativo de alemán y revisión pedagógica antes de publicar.',
    languageDecision: 'pending',
    pedagogyDecision: 'pending',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'der-konjunktiv-der-nachbarn',
      title: 'El subjuntivo de los vecinos',
      genre: 'crónica de pueblo',
      topic: 'un rumor que se sostiene solo con la gramática',
      tags: ['aleman b1', 'lectura', 'Konjunktiv II', 'estilo indirecto'],
      intro: 'Un pueblo entero habla durante tres semanas de una mujer recién llegada, y ni una sola frase está en indicativo. Lectura de alemán B1.',
      mission: 'Averigua qué revela la forma verbal que usan los vecinos, aunque nadie lo diga.',
      seoTitle: 'Lectura de alemán B1: el subjuntivo de los vecinos | WeLearn',
      seoDescription: 'Lee una crónica en alemán B1 y practica el Konjunktiv y el estilo indirecto. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['konjunktiv-ii-b1', 'indirekte-rede-b1', 'praeteritum-basic-a2'],
      text: `Als Frau Kessler die alte Werkstatt in der Mühlenstraße mietete, wusste im Dorf niemand etwas über sie. Zwei Wochen später wusste jeder alles.

Sie sei aus Hamburg, hieß es. Sie habe dort eine Firma gehabt, und die sei pleite gegangen. Sie wolle hier höchstens ein Jahr bleiben. Ihr Mann sei in Hamburg geblieben, oder es habe nie einen Mann gegeben; da war man sich nicht einig. Mein Vater sagte, sie hätte bestimmt Schulden. Meine Tante sagte, an ihrer Stelle wäre sie längst zurückgefahren.

Mir fiel etwas anderes auf. Alle diese Sätze standen im Konjunktiv. Sie sei, sie habe, sie wolle. Im Deutschen ist das kein Zufall: Wer so spricht, gibt damit zu, dass er es nur gehört hat. Die Grammatik selbst sagte also die ganze Zeit, dass niemand nachgefragt hatte. Ein ganzes Dorf redete drei Wochen lang über eine Frau, und kein einziger Satz stand im Indikativ.

Im Oktober brachte ich mein Rad in die Werkstatt, weil die Gangschaltung klemmte und ich keine Lust hatte, bis nach Waldheim zu fahren. Frau Kessler drehte das Rad um, sah zwanzig Sekunden lang hin und sagte: Der Zug ist ausgeleiert, das kostet acht Euro. Dann fragte sie, ob ich Kaffee wolle.

Ich fragte sie, warum sie hergekommen sei. Im selben Moment merkte ich, dass ich es auch im Konjunktiv fragte, und das war mir unangenehm.

Sie lachte und sagte: Weil die Miete hier vierhundert Euro kostet und in Hamburg zweitausend. Das ist alles. Es gibt keine Geschichte.

Ich erzählte das zu Hause. Mein Vater hörte zu, kaute weiter und sagte dann: Na ja. Das sagt sie.

Da verstand ich, dass es nie um Informationen gegangen war. Wer wollte, konnte jede Antwort wieder in den Konjunktiv setzen und sie damit unschädlich machen. Die Wahrheit hätte das Gerede beendet, aber niemand im Dorf wollte, dass es endete.

Frau Kessler ist immer noch da. Sie repariert Räder, sie nimmt acht Euro, und man sagt weiterhin, sie sei aus Hamburg. Das stimmt sogar.`,
      objectives: [
        'Reconocer el Konjunktiv como marca de que quien habla no responde de lo que dice.',
        'Reproducir en estilo indirecto lo que un tercero afirmó.',
        'Separar el hecho comprobado de la versión que circula.',
      ],
      vocabulary: [
        { surface: 'Werkstatt', gloss: 'taller' },
        { surface: 'pleite', gloss: 'en quiebra, arruinado' },
        { surface: 'Schulden', gloss: 'deudas' },
        { surface: 'Gangschaltung', gloss: 'cambio de marchas' },
        { surface: 'ausgeleiert', lemma: 'ausleiern', gloss: 'dado de sí, desgastado' },
        { surface: 'Gerede', gloss: 'habladurías' },
        { surface: 'unschädlich', gloss: 'inofensivo, sin efecto' },
        { surface: 'Miete', gloss: 'alquiler' },
      ],
      culturalNote: 'El alemán tiene una forma verbal reservada para citar sin responder de lo citado. La prensa la usa a diario: «der Minister habe gesagt» no compromete al periódico con lo dicho.',
      spanishSpeakerNote: 'El español marca el rumor con palabras («dicen que», «al parecer»); el alemán lo marca con la forma del verbo. Por eso «sie sei aus Hamburg» ya lleva dentro el «según dicen», sin añadir nada.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es el asunto del texto?',
          options: [
            ['forma', 'Que la forma verbal del pueblo delataba que nadie había preguntado nada'],
            ['pasado', 'Que la recién llegada escondía un pasado grave'],
            ['taller', 'Que el taller de bicicletas iba mal económicamente'],
          ],
          answer: 'forma',
          evidence: 'Alle diese Sätze standen im Konjunktiv … Die Grammatik selbst sagte also die ganze Zeit, dass niemand nachgefragt hatte.',
          correct: 'Sí. El narrador no descubre un secreto: descubre que la gramática ya lo confesaba todo.',
          incorrect: 'El texto no confirma ningún pasado grave y el taller funciona. Fíjate en qué observa el narrador de las frases del pueblo.',
          strategy: 'Cuando el narrador comenta cómo se dice algo y no qué se dice, la forma es el tema.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué razón da ella para haberse mudado?',
          options: [
            ['alquiler', 'Que el alquiler aquí cuesta cuatrocientos euros y en Hamburgo dos mil'],
            ['familia', 'Que su marido se quedó en Hamburgo y ella quería alejarse'],
            ['deudas', 'Que tenía deudas y huía de sus acreedores'],
          ],
          answer: 'alquiler',
          evidence: 'Weil die Miete hier vierhundert Euro kostet und in Hamburg zweitausend. Das ist alles.',
          correct: 'Correcto, y ella misma añade que no hay ninguna historia detrás.',
          incorrect: 'Lo del marido y lo de las deudas son versiones del pueblo, no respuestas suyas. Busca lo que ella contesta.',
          strategy: 'Distingue lo que dice el personaje de lo que dicen sobre el personaje: suelen estar en frases distintas.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto habla de «das Gerede». ¿Qué significa aquí?',
          options: [
            ['rumores', 'El conjunto de rumores que circulan'],
            ['discurso', 'Un discurso público en el ayuntamiento'],
            ['acuerdo', 'Un acuerdo entre vecinos'],
          ],
          answer: 'rumores',
          evidence: 'Die Wahrheit hätte das Gerede beendet, aber niemand im Dorf wollte, dass es endete.',
          correct: 'Eso es. Y la frase añade lo importante: la verdad lo habría terminado, y por eso no la querían.',
          incorrect: 'Nada de esto ocurre en un acto público ni es un pacto. Fíjate en qué es lo que la verdad habría terminado.',
          strategy: 'Si algo «se acabaría con la verdad», es algo que vive de no ser verificado.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el padre responde «Na ja. Das sagt sie»?',
          options: [
            ['sostener', 'Porque devolver la respuesta al terreno de lo no verificado permite seguir hablando del tema'],
            ['sordo', 'Porque no había entendido bien lo que el narrador le contó'],
            ['pruebas', 'Porque conocía pruebas de que ella mentía'],
          ],
          answer: 'sostener',
          evidence: 'Wer wollte, konnte jede Antwort wieder in den Konjunktiv setzen und sie damit unschädlich machen … niemand im Dorf wollte, dass es endete.',
          correct: 'Sí, y el narrador lo formula justo después: bastaba con devolverlo todo al condicional.',
          incorrect: 'El padre entiende perfectamente y no aporta ninguna prueba. Cruza su frase con el párrafo siguiente.',
          strategy: 'Para inferir, cruza una réplica de un personaje con la explicación que el narrador da a continuación.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el narrador consiguió que en el pueblo dejaran de repetir la versión de Hamburgo.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Sie repariert Räder, sie nimmt acht Euro, und man sagt weiterhin, sie sei aus Hamburg.',
          correct: 'Falso: al final del texto se sigue diciendo exactamente lo mismo, en la misma forma verbal.',
          incorrect: 'Lee el último párrafo entero. El adverbio «weiterhin» decide la respuesta.',
          strategy: 'Un final que repite la frase del principio suele indicar que nada cambió.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena lo que ocurre en el relato.',
          options: [
            ['p1', 'Ella alquila el taller y el pueblo empieza a hablar'],
            ['p2', 'El narrador nota que ninguna frase está en indicativo'],
            ['p3', 'Lleva la bicicleta y le pregunta directamente'],
            ['p4', 'En casa, la respuesta vuelve a convertirse en rumor'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Als Frau Kessler die alte Werkstatt … mietete … Mir fiel etwas anderes auf … Im Oktober brachte ich mein Rad in die Werkstatt … Ich erzählte das zu Hause.',
          correct: 'Correcto. El relato va del rumor a la pregunta directa, y de ahí de vuelta al rumor.',
          incorrect: 'Guíate por las marcas de tiempo: «Als… mietete», «Zwei Wochen später», «Im Oktober», «zu Hause».',
          strategy: 'En un relato con marcas temporales explícitas, esas marcas dan el orden sin necesidad de interpretar.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán contando un rumor que oíste sobre alguien y qué pasó cuando preguntaste. Usa al menos cuatro verbos en Konjunktiv (sei, habe, wolle, hätte).',
        minWords: 70, maxWords: 130,
        hints: ['Man sagte, er sei…', 'Meine Nachbarin sagte, sie habe…', 'Ich fragte ihn, warum er…', 'Die Wahrheit war viel einfacher.'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'was-alles-repariert-wurde',
      title: 'Lo que se reparó aquí',
      genre: 'reportaje local',
      topic: 'un taller vecinal de reparaciones',
      tags: ['aleman b1', 'lectura', 'voz pasiva', 'participio como adjetivo'],
      intro: 'Un taller vecinal lleva un cuaderno con todo lo que se ha reparado desde 2019. El objeto que más aparece no es el que se espera. Lectura de alemán B1.',
      mission: 'Averigua por qué la misma cafetera aparece siete veces en el cuaderno.',
      seoTitle: 'Lectura de alemán B1: lo que se reparó aquí | WeLearn',
      seoDescription: 'Lee un reportaje en alemán B1 y practica la voz pasiva y el participio usado como adjetivo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['passiv-b1', 'partizip-als-adjektiv-b1', 'perfekt-haben-a2'],
      text: `Das Repair-Café in Gronau wird jeden ersten Samstag im Monat in der alten Turnhalle geöffnet. Von neun bis dreizehn Uhr werden dort Dinge repariert, die sonst weggeworfen worden wären: Toaster, Lampen, Hosen mit kaputten Reißverschlüssen, einmal sogar ein Akkordeon.

Die Regeln hängen ausgedruckt an der Tür und sind kurz. Es wird nichts abgegeben: Wer etwas bringt, bleibt dabei und hilft mit. Es wird nichts bezahlt, aber am Ausgang steht eine Kasse, in die gespendet werden kann.

Seit 2019 wird ein Heft geführt. In die linke Spalte wird eingetragen, was gebracht wurde, in die rechte, ob es repariert werden konnte. Bis heute sind 1.812 Gegenstände eingetragen worden. Etwa zwei Drittel wurden wieder in Gang gesetzt. Der Rest war entweder zu alt, oder es wurden für ihn längst keine Ersatzteile mehr hergestellt.

Der am häufigsten eingetragene Gegenstand ist keine Waschmaschine und kein Fahrrad, sondern eine bestimmte Kaffeemaschine. Sie steht siebenmal in dem Heft. Es ist jedes Mal dieselbe Maschine, und sie wird jedes Mal von demselben Mann gebracht: Herr Vogt, achtzig Jahre alt, ehemaliger Schlosser.

Beim vierten Mal wurde den Freiwilligen klar, dass an dieser Maschine nie etwas Ernsthaftes kaputt gewesen war. Es wurde ein Filter gereinigt, eine Dichtung getauscht, ein loses Kabel nachgezogen — Arbeiten, die in zehn Minuten erledigt sind. Herr Vogt blieb trotzdem jedes Mal bis eins.

Man hätte ihm sagen können, dass er auch ohne Maschine kommen darf. Genau das wurde nicht gemacht, und darüber wurde auch nicht abgestimmt. Stattdessen wurde beschlossen, die Reparatur langsam durchzuführen. Der Filter wird seitdem sehr gründlich gereinigt.

Die reparierte Maschine wird am Ende auf den Tisch gestellt, angeschlossen und feierlich eingeschaltet. Der erste Kaffee wird von Herrn Vogt getrunken, der zweite von der Person, die die Reparatur gemacht hat. Das ist inzwischen eine Regel, die nirgends aufgeschrieben ist.

In der rechten Spalte des Heftes steht bei ihm jedes Mal dasselbe Wort: repariert. Das ist nicht gelogen. Es ist nur nicht die ganze Wahrheit.`,
      objectives: [
        'Leer prosa informativa en voz pasiva sin buscar un sujeto agente.',
        'Reconocer el participio usado como adjetivo delante del sustantivo.',
        'Distinguir lo que un documento registra de lo que realmente ocurre.',
      ],
      vocabulary: [
        { surface: 'Turnhalle', gloss: 'gimnasio escolar' },
        { surface: 'Reißverschlüssen', lemma: 'Reißverschluss', gloss: 'cremalleras' },
        { surface: 'Spalte', gloss: 'columna de una tabla' },
        { surface: 'Ersatzteile', gloss: 'piezas de repuesto' },
        { surface: 'Dichtung', gloss: 'junta, empaque' },
        { surface: 'Freiwilligen', lemma: 'Freiwilliger', gloss: 'voluntarios' },
        { surface: 'gründlich', gloss: 'a fondo, minuciosamente' },
        { surface: 'gespendet', lemma: 'spenden', gloss: 'donado' },
      ],
      culturalNote: 'Los Repair-Cafés nacieron en Ámsterdam en 2009 y hay más de mil en Alemania. La regla de que quien trae algo se queda a ayudar es común a casi todos: no son un servicio técnico gratis.',
      spanishSpeakerNote: 'La pasiva alemana se usa mucho más que la española, sobre todo en prosa institucional. Donde el español dice «se abre» o «abren», el alemán dice «wird geöffnet». No busques quién lo hace: muchas veces el texto no lo dice a propósito.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué explica finalmente el texto?',
          options: [
            ['compania', 'Que un hombre lleva siete veces la misma cafetera porque lo que busca es compañía, y allí le siguen el juego'],
            ['defecto', 'Que esa cafetera tiene un defecto de fábrica que nadie logra arreglar'],
            ['dinero', 'Que el taller decidió cobrar por las reparaciones repetidas'],
          ],
          answer: 'compania',
          evidence: 'wurde den Freiwilligen klar, dass an dieser Maschine nie etwas Ernsthaftes kaputt gewesen war … Stattdessen wurde beschlossen, die Reparatur langsam durchzuführen.',
          correct: 'Sí. Y la decisión más importante del texto es la que no se toma: nadie le dice que puede venir sin la cafetera.',
          incorrect: 'El texto dice expresamente que la máquina nunca tuvo nada serio, y allí no se cobra nada. Busca qué se decidió hacer después.',
          strategy: 'Cuando un texto informativo termina con una frase sobre la verdad, esa frase reinterpreta todo lo anterior.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué proporción de los objetos registrados se logró arreglar?',
          options: [
            ['dostercios', 'Alrededor de dos tercios'],
            ['todos', 'Todos menos el acordeón'],
            ['mitad', 'Exactamente la mitad'],
          ],
          answer: 'dostercios',
          evidence: 'Bis heute sind 1.812 Gegenstände eingetragen worden. Etwa zwei Drittel wurden wieder in Gang gesetzt.',
          correct: 'Correcto, y el resto falló por edad o por falta de repuestos.',
          incorrect: 'El acordeón es solo un ejemplo de lo que se lleva allí. Busca la frase con «Drittel».',
          strategy: 'Las proporciones suelen ir en la frase siguiente a la cifra total.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que se cambió una «Dichtung». ¿Qué es?',
          options: [
            ['junta', 'Una junta o empaque que impide que se escape el agua'],
            ['tapa', 'La tapa exterior del aparato'],
            ['manual', 'El manual de instrucciones'],
          ],
          answer: 'junta',
          evidence: 'Es wurde ein Filter gereinigt, eine Dichtung getauscht, ein loses Kabel nachgezogen.',
          correct: 'Eso es. Va en una lista de arreglos mínimos: filtro, junta, cable.',
          incorrect: 'Un manual no se cambia en una reparación de diez minutos. Fíjate en la compañía de la palabra.',
          strategy: 'En una enumeración técnica, las palabras que van juntas suelen ser del mismo tipo.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el filtro se limpia «muy a fondo» desde entonces?',
          options: [
            ['alargar', 'Para alargar la reparación y que él pueda quedarse'],
            ['sucio', 'Porque el filtro se ensucia mucho más que antes'],
            ['norma', 'Porque una norma de higiene lo exige'],
          ],
          answer: 'alargar',
          evidence: 'Stattdessen wurde beschlossen, die Reparatur langsam durchzuführen. Der Filter wird seitdem sehr gründlich gereinigt.',
          correct: 'Sí, y las dos frases van seguidas justamente para que el lector una las piezas.',
          incorrect: 'No se menciona ninguna norma ni ningún cambio en el filtro. Lee la frase inmediatamente anterior.',
          strategy: 'Cuando una frase empieza por «seitdem», la causa está en la frase de antes.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: quien lleva un objeto al taller se queda allí y participa en la reparación.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Es wird nichts abgegeben: Wer etwas bringt, bleibt dabei und hilft mit.',
          correct: 'Verdadero, y es la primera de las dos reglas colgadas en la puerta.',
          incorrect: 'Las reglas están al principio del texto, en el segundo párrafo, y son solo dos.',
          strategy: 'Si un texto anuncia que hay reglas, la respuesta literal está en ese párrafo.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la información tal como la presenta el reportaje.',
          options: [
            ['p1', 'Cuándo abre el taller y qué se repara allí'],
            ['p2', 'Las reglas de la casa y la hucha de la salida'],
            ['p3', 'Las cifras del cuaderno desde 2019'],
            ['p4', 'El caso de Herr Vogt y su cafetera'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Das Repair-Café in Gronau wird jeden ersten Samstag … Die Regeln hängen ausgedruckt an der Tür … Seit 2019 wird ein Heft geführt … Der am häufigsten eingetragene Gegenstand …',
          correct: 'Correcto. El reportaje va de lo general a lo particular, y guarda el caso para el final.',
          incorrect: 'Fíjate en cómo empieza cada párrafo: horario, reglas, cuaderno, y solo después la persona.',
          strategy: 'Un reportaje suele ir de datos generales a un caso concreto, no al revés.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán describiendo cómo funciona un sitio que conoces (un taller, una biblioteca, un comedor). Usa al menos cinco frases en pasiva.',
        minWords: 70, maxWords: 130,
        hints: ['Die Tür wird um … Uhr geöffnet.', 'Es wird nichts bezahlt.', 'Seit … wird ein Heft geführt.', 'Am Ende wird … eingeschaltet.'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'die-haltestelle-die-es-nicht-gibt',
      title: 'La parada que ya no existe',
      genre: 'retrato urbano',
      topic: 'una parada de autobús suprimida',
      tags: ['aleman b1', 'lectura', 'oraciones de relativo', 'declinación del adjetivo'],
      intro: 'Un cartel amarillo que hace cuatro años que no significa nada, una mujer de ochenta y uno y doce segundos. Lectura de alemán B1.',
      mission: 'Averigua por qué los conductores siguen parando en una parada que no está en ningún plano.',
      seoTitle: 'Lectura de alemán B1: la parada que ya no existe | WeLearn',
      seoDescription: 'Lee un retrato urbano en alemán B1 y practica las oraciones de relativo y la declinación del adjetivo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['relativsatze-b1', 'adjektivdeklination-b1', 'akkusativ'],
      text: `An der Ecke Lindenweg steht ein Schild, das seit vier Jahren nichts mehr bedeutet. Die Linie 7, die dort früher hielt, fährt eine andere Strecke. Das alte gelbe Schild wurde nie abmontiert, weil die Firma, die dafür zuständig war, den Auftrag verloren hat, und weil die neue Firma nur Schilder aufstellt, die im Plan stehen.

Frau Adamczyk, die im Haus gegenüber wohnt, ist einundachtzig. Sie geht jeden Werktag um zwanzig nach zehn zu diesem Schild und wartet dort etwa eine Viertelstunde. Sie weiß, dass kein Bus mehr hält. Sie hat mir das selbst gesagt, in einem ruhigen Satz, der keine Erklärung enthielt: Ich weiß es, junger Mann.

Was sie nicht weiß, ist, dass die Fahrer es auch wissen.

Der Erste, der anhielt, war ein Fahrer namens Demir. Er sah eine alte Frau an einer Haltestelle, die auf keinem seiner Pläne stand, und tat das Naheliegende: Er öffnete die Tür. Sie stieg nicht ein. Sie sagte guten Morgen, er sagte guten Morgen, und dann fuhr er weiter.

Am nächsten Tag hielt er wieder. Nach zwei Wochen erzählte er es den Kollegen. Heute halten alle, die auf dieser Strecke fahren, an einem Schild, das offiziell nicht existiert. Es kostet sie zwölf Sekunden.

Einen Fahrer, den ich gefragt habe, warum sie das machen, hat mit den Schultern gezuckt und geantwortet: Zwölf Sekunden holt man in der Bahnhofstraße wieder rein. Das ist die Art von Antwort, die man in dieser Stadt bekommt, wenn man nach Gefühlen fragt.

Im Frühjahr kam ein Brief vom Verkehrsbetrieb, in dem stand, dass alle Schilder, die nicht mehr benötigt werden, im Juni abgebaut werden. Die Fahrer haben einen Antrag geschrieben, den vierzig Leute unterschrieben haben. Der Antrag hatte einen einzigen Satz und eine falsche Begründung: Die Haltestelle Lindenweg wird weiterhin genutzt.

Das Schild steht noch. Frau Adamczyk steht um zwanzig nach zehn davor. Der Bus hält. Sie steigt nicht ein, und niemand hat ihr je erklärt, warum er trotzdem anhält.`,
      objectives: [
        'Encadenar oraciones de relativo con el verbo al final.',
        'Declinar el adjetivo delante del sustantivo según el artículo.',
        'Reconocer una mentira administrativa escrita a propósito.',
      ],
      vocabulary: [
        { surface: 'Schild', gloss: 'cartel, señal' },
        { surface: 'abmontiert', lemma: 'abmontieren', gloss: 'desmontado, retirado' },
        { surface: 'zuständig', gloss: 'competente, encargado de algo' },
        { surface: 'Werktag', gloss: 'día laborable' },
        { surface: 'Naheliegende', lemma: 'naheliegend', gloss: 'lo más obvio, lo que salta a la vista' },
        { surface: 'gezuckt', lemma: 'zucken', gloss: 'encogido (los hombros)' },
        { surface: 'Antrag', gloss: 'solicitud formal' },
        { surface: 'Begründung', gloss: 'motivación, justificación' },
      ],
      culturalNote: 'En Alemania una parada solo existe si figura en el plan de la empresa de transporte. Que un cartel siga colgado no la hace real, y que cuarenta personas firmen tampoco.',
      spanishSpeakerNote: 'En la oración de relativo alemana el verbo se va al final: «ein Schild, das seit vier Jahren nichts mehr bedeutet». Si traduces mentalmente en el orden español, pierdes el verbo. Léela hasta el punto y luego colócalo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta este retrato?',
          options: [
            ['acuerdo', 'Que los conductores mantienen por su cuenta una parada suprimida, sin decírselo a la mujer'],
            ['error', 'Que la empresa de transporte cometió un error de planificación'],
            ['protesta', 'Que los vecinos organizaron una protesta para recuperar la línea 7'],
          ],
          answer: 'acuerdo',
          evidence: 'Heute halten alle, die auf dieser Strecke fahren, an einem Schild, das offiziell nicht existiert … niemand hat ihr je erklärt, warum er trotzdem anhält.',
          correct: 'Sí, y el detalle que lo sostiene todo es que ella nunca lo ha sabido.',
          incorrect: 'No hay protesta vecinal y la supresión de la línea no se presenta como error. Fíjate en qué hacen los conductores.',
          strategy: 'Si un texto repite que alguien «no lo sabe», ese desconocimiento es parte del asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto tiempo les cuesta la parada a los conductores?',
          options: [
            ['doce', 'Doce segundos'],
            ['cuarto', 'Un cuarto de hora'],
            ['cuatro', 'Cuatro minutos'],
          ],
          answer: 'doce',
          evidence: 'Es kostet sie zwölf Sekunden … Zwölf Sekunden holt man in der Bahnhofstraße wieder rein.',
          correct: 'Correcto, y la cifra se repite en la respuesta del conductor.',
          incorrect: 'El cuarto de hora es lo que espera ella; los cuatro son años sin línea. Busca la cifra con «Sekunden».',
          strategy: 'Empareja cada número con su unidad antes de responder: años, minutos, segundos.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'La carta menciona los carteles que ya no se «benötigen». ¿Qué significa el verbo?',
          options: [
            ['necesitar', 'Necesitar, hacer falta'],
            ['pintar', 'Pintar de nuevo'],
            ['pagar', 'Pagar una tasa'],
          ],
          answer: 'necesitar',
          evidence: 'dass alle Schilder, die nicht mehr benötigt werden, im Juni abgebaut werden',
          correct: 'Eso es: lo que ya no hace falta se desmonta en junio.',
          incorrect: 'La frase habla de retirar carteles, no de pintarlos ni de cobrarlos. Fíjate en qué les ocurre en junio.',
          strategy: 'Si un verbo va seguido de una consecuencia («por eso se retiran»), esa consecuencia lo define.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la solicitud contenía una justificación falsa?',
          options: [
            ['unica', 'Porque la razón verdadera no cuenta como argumento administrativo y esta sí'],
            ['error', 'Porque los conductores se equivocaron al redactarla deprisa'],
            ['ordenaron', 'Porque la empresa les ordenó escribir eso'],
          ],
          answer: 'unica',
          evidence: 'Der Antrag hatte einen einzigen Satz und eine falsche Begründung: Die Haltestelle Lindenweg wird weiterhin genutzt … Das ist die Art von Antwort, die man in dieser Stadt bekommt, wenn man nach Gefühlen fragt.',
          correct: 'Sí. En un formulario no cabe «hay una señora que espera»; sí cabe «la parada se sigue usando».',
          incorrect: 'El texto llama a la justificación «falsa», no equivocada, y nadie se lo ordenó. Cruza la frase de la solicitud con la del conductor.',
          strategy: 'Cuando el texto califica algo de falso y no de erróneo, la falsedad es deliberada.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: Frau Adamczyk sube al autobús cuando este se detiene ante el cartel.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Sie stieg nicht ein … Der Bus hält. Sie steigt nicht ein.',
          correct: 'Falso: no sube nunca, ni la primera vez ni al final del texto.',
          incorrect: 'La misma frase aparece dos veces, al principio del episodio de Demir y en el último párrafo.',
          strategy: 'Una frase repetida al principio y al final del texto es una afirmación que el autor quiere que no se te escape.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos según el texto.',
          options: [
            ['p1', 'Suprimen la línea 7 y el cartel se queda colgado'],
            ['p2', 'Demir para por primera vez y abre la puerta'],
            ['p3', 'Los demás conductores empiezan a parar también'],
            ['p4', 'Llega la carta y los conductores redactan la solicitud'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Die Linie 7, die dort früher hielt, fährt eine andere Strecke … Der Erste, der anhielt, war ein Fahrer namens Demir … Nach zwei Wochen erzählte er es den Kollegen … Im Frühjahr kam ein Brief vom Verkehrsbetrieb.',
          correct: 'Correcto. Empieza con el cartel huérfano y termina con el intento de salvarlo.',
          incorrect: 'Guíate por «früher», «Der Erste», «Nach zwei Wochen» e «Im Frühjahr».',
          strategy: 'Los ordinales y las expresiones de tiempo son la escalera del texto: súbela en orden.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán sobre un lugar de tu ciudad que ya no sirve para lo que fue. Usa al menos cinco oraciones de relativo (der/die/das) con el verbo al final.',
        minWords: 70, maxWords: 130,
        hints: ['An der Ecke … steht ein Haus, das …', 'Die Frau, die dort wohnt, …', 'Der Mann, den ich gefragt habe, …', 'Es kostet niemanden etwas.'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'obwohl-sie-wieder-verloren',
      title: 'Aunque perdieron otra vez',
      genre: 'reportaje deportivo',
      topic: 'un club de fútbol que no gana nunca',
      tags: ['aleman b1', 'lectura', 'causales y concesivas', 'subordinadas'],
      intro: 'Veintidós partidos, ninguna victoria, y el estadio más lleno que la temporada anterior. Lectura de alemán B1 con weil, obwohl, deshalb y trotzdem.',
      mission: 'Averigua qué cambió en el club cuando dejó de poder ganar.',
      seoTitle: 'Lectura de alemán B1: aunque perdieron otra vez | WeLearn',
      seoDescription: 'Lee un reportaje en alemán B1 y practica las oraciones causales y concesivas (weil, da, obwohl, trotzdem) y las subordinadas. Con seis preguntas.',
      grammarFocus: ['kausale-konzessive-satze-b1', 'nebensatze-b1', 'konjunktionen-a2'],
      text: `Der SV Kirchhorst hat in der Saison 2024/25 kein einziges Spiel gewonnen. Zweiundzwanzig Spiele, zwei Unentschieden, zwanzig Niederlagen, 19:88 Tore. Trotzdem war das Stadion voller als in der Saison davor.

Das klingt wie ein Fehler in der Statistik, ist aber keiner. Ich bin hingefahren, weil ich es nicht glauben wollte.

Der Platz liegt hinter einer Gärtnerei. Es gibt eine Tribüne mit vier Reihen, einen niedrigen Zaun und einen Container, in dem Bratwurst verkauft wird. Am Sonntag standen dort etwa dreihundert Leute, obwohl es den ganzen Nachmittag regnete und obwohl jeder wusste, wie das Spiel ausgehen würde.

Ich fragte einen Mann in der zweiten Reihe, warum er komme. Er sagte: Weil mein Sohn spielt. Das war eine ehrliche Antwort, aber sie erklärte nur ihn.

Eine Frau neben ihm sagte etwas Besseres. Sie sagte, früher seien sie gekommen, um zu gewinnen, und das habe nur an guten Tagen funktioniert. Jetzt kämen sie, um dabei zu sein, und das funktioniere jeden Sonntag.

Da der Verein sportlich nichts mehr zu bieten hatte, hat er etwas anderes gemacht. Der Eintritt ist seit zwei Jahren frei. Die Bratwurst kostet zwei Euro, denn sie soll nicht der Grund sein, warum jemand nicht kommt. Nach dem Spiel bleibt die Kabine offen, und wer will, geht hinein und sagt den Spielern etwas. Der Vorsitzende sagte mir, das sei am Anfang allen unangenehm gewesen, deshalb hätten sie es beibehalten.

Kirchhorst verlor an diesem Sonntag 1:4. Das Tor fiel in der 88. Minute, und es war ein Eigentor des Gegners. Die dreihundert Leute jubelten, als wäre es ein Pokalsieg, obwohl allen klar war, wie lächerlich das ist. Genau deshalb war es schön.

Auf der Rückfahrt dachte ich an einen Satz des Trainers. Er sagte ihn ohne jede Bitterkeit: Wir sind der einzige Verein hier, bei dem niemand Angst hat abzusteigen, weil es tiefer nicht mehr geht. Deshalb sind wir entspannt. Ich weiß, dass das kein sportliches Argument ist.`,
      objectives: [
        'Distinguir weil y da (verbo al final) de denn (no mueve el verbo).',
        'Usar obwohl, trotzdem y deshalb con el orden correcto.',
        'Separar la explicación individual de la explicación general.',
      ],
      vocabulary: [
        { surface: 'Unentschieden', gloss: 'empates' },
        { surface: 'Niederlagen', lemma: 'Niederlage', gloss: 'derrotas' },
        { surface: 'Gärtnerei', gloss: 'vivero de plantas' },
        { surface: 'Tribüne', gloss: 'grada' },
        { surface: 'Kabine', gloss: 'vestuario' },
        { surface: 'Eigentor', gloss: 'gol en propia meta' },
        { surface: 'lächerlich', gloss: 'ridículo' },
        { surface: 'abzusteigen', lemma: 'absteigen', gloss: 'descender de categoría' },
      ],
      culturalNote: 'En el fútbol alemán de aficionados el club suele ser una asociación de socios (Verein) con presidente elegido, no una empresa. Por eso decisiones como suprimir la entrada las toma la propia gente que va.',
      spanishSpeakerNote: 'Tres palabras españolas («porque», «por eso», «aunque») se reparten aquí en tres estructuras distintas: weil y obwohl mandan el verbo al final, denn lo deja donde está, y deshalb y trotzdem invierten sujeto y verbo. La conjunción decide el orden.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es la idea central del reportaje?',
          options: [
            ['pertenencia', 'Que al no poder ofrecer victorias el club pasó a ofrecer pertenencia, y por eso va más gente'],
            ['ascenso', 'Que el club prepara su ascenso para la próxima temporada'],
            ['dinero', 'Que el club se salvó gracias a un patrocinador nuevo'],
          ],
          answer: 'pertenencia',
          evidence: 'Da der Verein sportlich nichts mehr zu bieten hatte, hat er etwas anderes gemacht … Jetzt kämen sie, um dabei zu sein, und das funktioniere jeden Sonntag.',
          correct: 'Sí. El cambio no es deportivo: es de qué se ofrece a quien va.',
          incorrect: 'No hay patrocinador ni ascenso; el club está en el fondo de la tabla. Busca qué hizo al no poder ganar.',
          strategy: 'Cuando una frase empieza por «da» (puesto que), lo que sigue es la tesis del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cómo llegó el único gol de Kirchhorst ese domingo?',
          options: [
            ['propia', 'Fue un gol en propia meta del rival, en el minuto 88'],
            ['penalti', 'Fue un penalti al final del partido'],
            ['hijo', 'Lo marcó el hijo del hombre de la segunda fila'],
          ],
          answer: 'propia',
          evidence: 'Das Tor fiel in der 88. Minute, und es war ein Eigentor des Gegners.',
          correct: 'Correcto, y por eso la celebración resulta ridícula y a la vez conmovedora.',
          incorrect: 'No se menciona ningún penalti ni quién juega en ese momento. Busca la palabra «Eigentor».',
          strategy: 'Una palabra compuesta como «Eigentor» se lee por partes: propio + gol.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El entrenador dice que nadie tiene miedo de «absteigen». ¿Qué significa?',
          options: [
            ['bajar', 'Bajar de categoría al final de la temporada'],
            ['renunciar', 'Renunciar al cargo de entrenador'],
            ['viajar', 'Viajar a otro estadio'],
          ],
          answer: 'bajar',
          evidence: 'bei dem niemand Angst hat abzusteigen, weil es tiefer nicht mehr geht',
          correct: 'Eso es, y él mismo lo explica: más abajo ya no hay nada.',
          incorrect: 'La frase habla de la posición del club, no de personas ni de viajes. Fíjate en la explicación con «tiefer».',
          strategy: 'Cuando el propio hablante añade una explicación en la misma frase, esa explicación define la palabra.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el presidente mantiene la costumbre de dejar el vestuario abierto?',
          options: [
            ['incomodo', 'Precisamente porque al principio incomodaba a todos'],
            ['obligacion', 'Porque el reglamento de la liga lo exige'],
            ['espacio', 'Porque no hay otro sitio donde reunir a la gente'],
          ],
          answer: 'incomodo',
          evidence: 'das sei am Anfang allen unangenehm gewesen, deshalb hätten sie es beibehalten',
          correct: 'Sí, y el «deshalb» es lo que sorprende: mantienen la costumbre por la incomodidad, no a pesar de ella.',
          incorrect: 'No se cita ningún reglamento ni falta de espacio. Lee entera la frase del presidente.',
          strategy: 'Si un «deshalb» une una causa negativa con una decisión de mantenerla, ahí hay una intención deliberada.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la entrada al campo lleva dos años siendo gratuita para el público.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Der Eintritt ist seit zwei Jahren frei.',
          correct: 'Verdadero, y la salchicha a dos euros va en la misma lógica: que el dinero no sea el motivo de quedarse en casa.',
          incorrect: 'Busca la frase corta que empieza por «Der Eintritt». Está en el párrafo de las medidas del club.',
          strategy: 'Los datos de precios suelen ir en frases cortas y aisladas: son fáciles de localizar por su forma.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena cómo avanza el reportaje.',
          options: [
            ['p1', 'Las cifras de la temporada y la contradicción con el público'],
            ['p2', 'La descripción del campo y la gente bajo la lluvia'],
            ['p3', 'Lo que hizo el club al no poder ganar'],
            ['p4', 'El partido, el gol y la frase del entrenador'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Der SV Kirchhorst hat … kein einziges Spiel gewonnen … Der Platz liegt hinter einer Gärtnerei … Da der Verein sportlich nichts mehr zu bieten hatte … Kirchhorst verlor an diesem Sonntag 1:4.',
          correct: 'Correcto: dato, escena, explicación y cierre.',
          incorrect: 'Fíjate en dónde aparecen por primera vez las cifras, el campo, las medidas del club y el resultado.',
          strategy: 'Un reportaje que abre con una contradicción suele dedicar la parte central a explicarla.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán sobre algo que sigues haciendo aunque no funcione. Usa weil, obwohl, deshalb y trotzdem al menos una vez cada uno.',
        minWords: 70, maxWords: 130,
        hints: ['Ich mache das, obwohl …', 'Weil es nie funktioniert hat, …', 'Trotzdem gehe ich jeden …', 'Deshalb bin ich entspannt.'],
      },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'der-zug-um-sechs-uhr-zwoelf',
      title: 'El tren de las 6:12',
      genre: 'perfil de una persona',
      topic: 'un cambio de horario de tres minutos',
      tags: ['aleman b1', 'lectura', 'Präteritum de verbos fuertes', 'preposiciones temporales'],
      intro: 'Durante veintidós años tomó el mismo tren. Cambiaron el horario tres minutos y algo se rompió. Lectura de alemán B1.',
      mission: 'Averigua qué se perdía exactamente con esos tres minutos.',
      seoTitle: 'Lectura de alemán B1: el tren de las 6:12 | WeLearn',
      seoDescription: 'Lee un perfil en alemán B1 y practica el Präteritum de los verbos fuertes y las preposiciones de tiempo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['prateritum-starke-verben-b1', 'temporale-prapositionen-b1', 'praepositionen-zeit'],
      text: `Zweiundzwanzig Jahre lang nahm Herr Brandt den Zug um sechs Uhr zwölf. Er stand um Viertel vor fünf auf, ging um halb sechs aus dem Haus und war vor sechs am Bahnsteig. Im Winter wartete er drinnen, im Sommer draußen an der dritten Bank.

Der Zug kam fast immer pünktlich. Herr Brandt stieg immer am selben Wagen ein, saß immer auf demselben Platz und sprach in diesen zweiundzwanzig Jahren mit ungefähr fünf Personen.

Im Dezember wurde der Fahrplan geändert. Aus sechs Uhr zwölf wurde sechs Uhr neun. Drei Minuten.

Als er mir davon erzählte, lachte ich zuerst. Ich verstand nicht, warum drei Minuten ein Problem sein sollten. Er erklärte es mir in einem einzigen Satz, und danach lachte ich nicht mehr.

Um sechs Uhr zwölf, sagte er, kam er genau in dem Moment am Bahnsteig an, in dem die Bäckerei am Ausgang aufmachte. Er kaufte seit Jahren jeden Morgen dasselbe: ein Brötchen, keinen Kaffee. Die Frau hinter der Theke legte es ihm hin, bevor er etwas sagte. Das war das einzige Gespräch seines Tages vor neun Uhr.

Bei sechs Uhr neun war die Bäckerei noch zu.

Er ging trotzdem weiter zum selben Bahnsteig, nur eben früher. Vier Wochen lang stand er dort und sah durch die dunkle Scheibe, wie drinnen nach und nach das Licht anging. Dann schrieb er einen Brief. Nicht an die Bahn, sondern an die Bäckerei.

Er schrieb, er wolle sich nicht beschweren, er wolle nur mitteilen, dass sich für ihn etwas geändert habe. Den Brief warf er nachts ein, weil er ihn niemandem in die Hand geben wollte.

Seit Februar macht die Bäckerei um sechs Uhr auf. Die Besitzerin sagt, das habe nichts mit dem Brief zu tun, sondern mit den anderen Fahrgästen, die seit dem neuen Fahrplan früher da seien. Sie sagt das jedes Mal, wenn man sie danach fragt, und sie sagt es immer ein bisschen zu schnell.

Herr Brandt kauft jetzt um zwei Minuten nach sechs sein Brötchen. Er nimmt den Zug um sechs Uhr neun. Er sagt, es sei jetzt sogar besser, weil er nicht mehr hetzen müsse.`,
      objectives: [
        'Reconocer el Präteritum de los verbos fuertes frecuentes: nahm, ging, kam, saß, sprach, schrieb.',
        'Usar um, vor, seit, bei, nach y bevor con el sentido temporal correcto.',
        'Detectar cuándo un personaje niega algo con demasiada rapidez.',
      ],
      vocabulary: [
        { surface: 'Bahnsteig', gloss: 'andén' },
        { surface: 'pünktlich', gloss: 'puntual' },
        { surface: 'Fahrplan', gloss: 'horario de trenes' },
        { surface: 'Brötchen', gloss: 'panecillo' },
        { surface: 'Theke', gloss: 'mostrador' },
        { surface: 'Scheibe', gloss: 'cristal de un escaparate' },
        { surface: 'beschweren', lemma: 'sich beschweren', gloss: 'quejarse formalmente' },
        { surface: 'hetzen', gloss: 'ir con prisas, correr' },
      ],
      culturalNote: 'Los cambios de horario ferroviario en Alemania se aplican todos a la vez, en diciembre, y desplazan miles de trenes unos pocos minutos. Cada uno de esos minutos cae sobre la rutina de alguien.',
      spanishSpeakerNote: 'El alemán reparte las preposiciones de tiempo con más precisión que el español: um para la hora exacta, gegen para la hora aproximada, vor para antes, nach para después, seit para lo que empezó y sigue. «Um sechs Uhr zwölf» no admite un «sobre las seis».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué perdió realmente Herr Brandt con el cambio de horario?',
          options: [
            ['contacto', 'El único contacto humano que tenía antes de las nueve de la mañana'],
            ['asiento', 'Su asiento habitual en el vagón de siempre'],
            ['tren', 'La posibilidad de llegar puntual al trabajo'],
          ],
          answer: 'contacto',
          evidence: 'Die Frau hinter der Theke legte es ihm hin, bevor er etwas sagte. Das war das einzige Gespräch seines Tages vor neun Uhr.',
          correct: 'Sí, y el texto lo dice sin subrayarlo: era su único intercambio de la mañana.',
          incorrect: 'Sigue teniendo tren y asiento; el problema está en tierra, no en el andén. Busca qué ocurría en la panadería.',
          strategy: 'Cuando un texto llama a algo «lo único», ahí está el asunto, aunque parezca un detalle.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿A quién dirigió la carta?',
          options: [
            ['panaderia', 'A la panadería, no a la compañía ferroviaria'],
            ['ferrocarril', 'A la compañía ferroviaria, para pedir el horario antiguo'],
            ['ayuntamiento', 'Al ayuntamiento de la ciudad'],
          ],
          answer: 'panaderia',
          evidence: 'Dann schrieb er einen Brief. Nicht an die Bahn, sondern an die Bäckerei.',
          correct: 'Correcto, y el texto marca el contraste con «nicht… sondern».',
          incorrect: 'El texto descarta expresamente a uno de los destinatarios. Busca la construcción «nicht… sondern».',
          strategy: 'La estructura «nicht A, sondern B» siempre te da la respuesta y el error más probable a la vez.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Escribe que no quiere «sich beschweren». ¿Qué significa?',
          options: [
            ['quejarse', 'Presentar una queja'],
            ['mudarse', 'Cambiarse de domicilio'],
            ['despedirse', 'Despedirse de alguien'],
          ],
          answer: 'quejarse',
          evidence: 'Er schrieb, er wolle sich nicht beschweren, er wolle nur mitteilen, dass sich für ihn etwas geändert habe.',
          correct: 'Eso es, y lo contrapone a «mitteilen», simplemente comunicar.',
          incorrect: 'La frase opone dos maneras de escribir a un negocio. Fíjate con qué verbo se contrasta.',
          strategy: 'Si dos verbos se oponen en la misma frase, el sentido de uno se deduce del otro.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué sugiere que la dueña conteste siempre «un poco demasiado rápido»?',
          options: [
            ['carta', 'Que el cambio de horario sí tuvo que ver con la carta y prefiere no reconocerlo'],
            ['molesta', 'Que le molesta que los clientes le hagan preguntas'],
            ['olvido', 'Que ya no recuerda bien cuándo cambió el horario'],
          ],
          answer: 'carta',
          evidence: 'Die Besitzerin sagt, das habe nichts mit dem Brief zu tun … und sie sagt es immer ein bisschen zu schnell.',
          correct: 'Sí. El narrador no lo afirma: describe cómo lo dice y deja que el lector concluya.',
          incorrect: 'No hay señales de molestia ni de olvido; ella tiene la respuesta preparada. Fíjate en el adverbio final.',
          strategy: 'Cuando el narrador describe la manera de responder y no el contenido, está señalando lo que no se dice.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: Herr Brandt dejó de ir al andén durante las cuatro semanas en que la panadería estaba cerrada.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Er ging trotzdem weiter zum selben Bahnsteig, nur eben früher. Vier Wochen lang stand er dort.',
          correct: 'Falso: siguió yendo cuatro semanas, solo que más temprano y mirando el cristal a oscuras.',
          incorrect: 'Busca la frase que empieza por «Er ging trotzdem». El adverbio decide la respuesta.',
          strategy: 'La palabra «trotzdem» avisa de que lo esperable no ocurrió: léela siempre con atención.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos del perfil.',
          options: [
            ['p1', 'Veintidós años con el mismo tren y el mismo panecillo'],
            ['p2', 'En diciembre cambia el horario tres minutos'],
            ['p3', 'Cuatro semanas ante la panadería cerrada'],
            ['p4', 'Desde febrero la panadería abre a las seis'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Zweiundzwanzig Jahre lang nahm Herr Brandt den Zug … Im Dezember wurde der Fahrplan geändert … Vier Wochen lang stand er dort … Seit Februar macht die Bäckerei um sechs Uhr auf.',
          correct: 'Correcto: rutina, ruptura, espera y desenlace.',
          incorrect: 'Guíate por las marcas temporales: «zweiundzwanzig Jahre lang», «im Dezember», «vier Wochen lang», «seit Februar».',
          strategy: 'Cuando cada párrafo abre con una expresión de tiempo, el texto ya viene ordenado.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán sobre una rutina tuya que se rompió por un cambio mínimo. Usa seis verbos fuertes en Präteritum y al menos cuatro preposiciones de tiempo distintas.',
        minWords: 70, maxWords: 130,
        hints: ['Jahrelang nahm ich …', 'Um … Uhr kam ich …', 'Seit … ist alles anders.', 'Vor sieben Uhr war niemand da.'],
      },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'ich-freue-mich-auf-nichts',
      title: 'Ya no me alegro de nada',
      genre: 'diario profesional',
      topic: 'una residencia de mayores y una preposición',
      tags: ['aleman b1', 'lectura', 'verbos con preposición', 'verbos reflexivos'],
      intro: 'Una auxiliar colombiana oye una frase en la cena y lo primero que nota es la preposición. Lo segundo cambia su forma de trabajar. Lectura de alemán B1.',
      mission: 'Averigua qué diferencia hay entre «sich freuen auf» y «sich freuen über», y por qué importa aquí.',
      seoTitle: 'Lectura de alemán B1: ya no me alegro de nada | WeLearn',
      seoDescription: 'Lee un diario profesional en alemán B1 y practica los verbos con preposición fija y los reflexivos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['verben-mit-prapositionen-b1', 'reflexive-verben-b1', 'reflexivverben-a2'],
      text: `In dem Pflegeheim, in dem ich arbeite, wohnt seit acht Monaten Herr Sander. Er ist neunundachtzig, war Elektriker und beschwert sich über nichts, was in einem Heim ungewöhnlich ist.

Im Februar sagte er beim Abendessen einen Satz, an den ich mich wahrscheinlich noch in zwanzig Jahren erinnern werde: Ich freue mich auf nichts mehr.

Ich komme aus Kolumbien und lerne seit sechs Jahren Deutsch. Wahrscheinlich habe ich deshalb zuerst auf die Grammatik geachtet und nicht auf den Inhalt. Im Deutschen muss man sich nämlich entscheiden: Man freut sich auf etwas, das noch kommt, und man freut sich über etwas, das schon da ist. Zwei Präpositionen, zwei verschiedene Richtungen der Zeit.

Ich fragte ihn also: Und über etwas?

Er sah mich an, als hätte ich ihn beim Kartenspielen erwischt. Dann sagte er: Über den Kaffee heute Morgen. Der war gut.

Wir haben danach eine halbe Stunde geredet. Er hat sich an einen Sommer erinnert, in dem er auf einem Dach in Kassel gearbeitet hat, und er hat sich über seinen Bruder geärgert, der 1994 gestorben ist. Das hielt ich zuerst für einen Fehler und später nicht mehr.

Seitdem mache ich etwas, worüber ich mit niemandem im Team gesprochen habe. Wenn jemand sagt, er freue sich auf nichts, frage ich nach dem über.

Es funktioniert nicht immer. Frau Petrov hat mir geantwortet, ich solle mich um meine eigenen Angelegenheiten kümmern, und damit hatte sie recht.

Aber oft funktioniert es. Die meisten Menschen hier warten auf nichts mehr, das stimmt. Auf ein Datum, auf eine Nachricht, auf ein Enkelkind, das kommen soll — damit ist es vorbei. Über etwas freuen können sich fast alle noch, und zwar über Dinge, die so klein sind, dass man sie einem gesunden Menschen nicht erzählen kann, ohne dass er lächelt.

Herr Sander sagt inzwischen manchmal, er freue sich auf den Donnerstag. Donnerstags kommt der Friseur. Ich habe ihn nie gefragt, ob er das für mich sagt.`,
      objectives: [
        'Elegir la preposición fija correcta: sich freuen auf/über, sich ärgern über, warten auf, sich erinnern an.',
        'Colocar el pronombre reflexivo en el lugar que le toca en la frase.',
        'Leer una decisión profesional que el texto no formula como norma.',
      ],
      vocabulary: [
        { surface: 'Pflegeheim', gloss: 'residencia de mayores' },
        { surface: 'Elektriker', gloss: 'electricista' },
        { surface: 'ungewöhnlich', gloss: 'poco habitual' },
        { surface: 'erwischt', lemma: 'erwischen', gloss: 'pillado, sorprendido' },
        { surface: 'geärgert', lemma: 'sich ärgern', gloss: 'enfadado, molestado' },
        { surface: 'Angelegenheiten', lemma: 'Angelegenheit', gloss: 'asuntos propios' },
        { surface: 'Enkelkind', gloss: 'nieto o nieta' },
        { surface: 'Friseur', gloss: 'peluquero' },
      ],
      culturalNote: 'En las residencias alemanas trabaja mucho personal extranjero, y a menudo son ellos quienes notan matices de la lengua que a un nativo se le pasan por evidentes.',
      spanishSpeakerNote: 'El español dice «alegrarse de» para todo. El alemán obliga a elegir dirección temporal: «auf» apunta a lo que viene, «über» a lo que ya ocurrió. No es un adorno: cambia lo que estás diciendo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué descubre la narradora?',
          options: [
            ['distincion', 'Que la distinción entre auf y über le da una manera de responder a quien dice que ya no espera nada'],
            ['idioma', 'Que su alemán es mejor que el de sus compañeros de equipo'],
            ['diagnostico', 'Que Herr Sander tiene una depresión sin diagnosticar'],
          ],
          answer: 'distincion',
          evidence: 'Wenn jemand sagt, er freue sich auf nichts, frage ich nach dem über.',
          correct: 'Sí, y lo convierte en método de trabajo sin llamarlo así ni contárselo a nadie.',
          incorrect: 'El texto no compara niveles de alemán ni da diagnósticos médicos. Fíjate en qué hace ella desde entonces.',
          strategy: 'Si la narradora describe un hábito nuevo que adoptó, ese hábito suele ser la conclusión del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué contesta Herr Sander cuando ella le pregunta por el «über»?',
          options: [
            ['cafe', 'Que se alegró del café de esa mañana'],
            ['jueves', 'Que se alegra de que venga el peluquero'],
            ['hermano', 'Que se acuerda de su hermano'],
          ],
          answer: 'cafe',
          evidence: 'Dann sagte er: Über den Kaffee heute Morgen. Der war gut.',
          correct: 'Correcto, y es una respuesta mínima que abre media hora de conversación.',
          incorrect: 'Lo del jueves llega mucho más tarde y lo del hermano es otro momento. Busca su respuesta inmediata.',
          strategy: 'Localiza primero la pregunta y lee solo lo que viene justo después.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Frau Petrov le dice que se ocupe de sus «Angelegenheiten». ¿Qué significa?',
          options: [
            ['asuntos', 'Sus propios asuntos'],
            ['pacientes', 'Los pacientes que tiene asignados'],
            ['turnos', 'Sus turnos de trabajo'],
          ],
          answer: 'asuntos',
          evidence: 'Frau Petrov hat mir geantwortet, ich solle mich um meine eigenen Angelegenheiten kümmern, und damit hatte sie recht.',
          correct: 'Eso es. Es la manera alemana de decir «no te metas donde no te llaman».',
          incorrect: 'La frase es un reproche personal, no una instrucción de trabajo. Fíjate en el adjetivo «eigenen».',
          strategy: 'El adjetivo «eigen» (propio) marca que la frase habla del terreno privado de alguien.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la narradora no ha preguntado nunca a Herr Sander si lo del jueves lo dice por ella?',
          options: [
            ['preferir', 'Porque prefiere no comprobarlo: la respuesta podría estropear lo que ha conseguido'],
            ['tiempo', 'Porque no coincide con él los jueves'],
            ['prohibido', 'Porque el equipo le ha prohibido hacer preguntas personales'],
          ],
          answer: 'preferir',
          evidence: 'Seitdem mache ich etwas, worüber ich mit niemandem im Team gesprochen habe … Ich habe ihn nie gefragt, ob er das für mich sagt.',
          correct: 'Sí. Es coherente con lo anterior: guarda para sí lo que funciona en vez de someterlo a prueba.',
          incorrect: 'Nadie le ha prohibido nada y sí coincide con él. Cruza la última frase con lo que dice del equipo.',
          strategy: 'Para inferir un motivo, busca otra decisión del mismo personaje que apunte en la misma dirección.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la narradora ha comentado con su equipo el método que empezó a usar.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Seitdem mache ich etwas, worüber ich mit niemandem im Team gesprochen habe.',
          correct: 'Falso: lo dice expresamente, no lo ha hablado con nadie del equipo.',
          incorrect: 'La respuesta está en la frase que abre el párrafo del método, y es literal.',
          strategy: 'Un pronombre como «worüber» anuncia que viene información sobre el hábito recién mencionado.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena lo que ocurre en el diario.',
          options: [
            ['p1', 'La frase de Herr Sander en la cena de febrero'],
            ['p2', 'Ella pregunta por la otra preposición'],
            ['p3', 'Media hora de conversación sobre Kassel y el hermano'],
            ['p4', 'El método aplicado a otros residentes'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Im Februar sagte er beim Abendessen einen Satz … Ich fragte ihn also: Und über etwas? … Wir haben danach eine halbe Stunde geredet … Seitdem mache ich etwas …',
          correct: 'Correcto: la frase, la pregunta, la conversación y la costumbre que nace de ahí.',
          incorrect: 'Guíate por «Im Februar», «Ich fragte ihn also», «danach» y «Seitdem».',
          strategy: 'Los adverbios «danach» y «seitdem» ordenan el relato sin necesidad de fechas.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán sobre algo que esperas y algo de lo que ya te alegraste. Usa sich freuen auf, sich freuen über, warten auf, sich erinnern an y sich ärgern über.',
        minWords: 70, maxWords: 130,
        hints: ['Ich freue mich auf …', 'Ich habe mich über … gefreut.', 'Ich erinnere mich an einen Sommer, in dem …', 'Ich warte nicht mehr auf …'],
      },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'die-tuer-des-schrankes',
      title: 'La puerta del armario',
      genre: 'relato de oficio',
      topic: 'palabras compuestas en una tienda de muebles',
      tags: ['aleman b1', 'lectura', 'formación de palabras', 'genitivo'],
      intro: 'Un vendedor de Medellín en una tienda de muebles de Dortmund descubre que el alemán tiene dos maneras de decir lo mismo, y que no son intercambiables. Lectura de alemán B1.',
      mission: 'Averigua el truco para leer una palabra alemana de cuarenta letras sin asustarse.',
      seoTitle: 'Lectura de alemán B1: la puerta del armario | WeLearn',
      seoDescription: 'Lee un relato de oficio en alemán B1 y practica la formación de palabras compuestas y el genitivo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['wortbildung-b1', 'genitiv-b1', 'genitiv-a2'],
      text: `Ich verkaufe seit drei Jahren Möbel in einem großen Möbelhaus in Dortmund. Ich komme aus Medellín, und mein erstes Jahr hier war eine einzige lange Auseinandersetzung mit langen Wörtern.

Am dritten Arbeitstag gab mir mein Chef eine Liste. Darauf stand: Schrankinnenbeleuchtungsschalter. Ich dachte, das sei ein Scherz für den Neuen. Es war keiner. Es gibt dieses Ding, es kostet vierzehn Euro, und der Name beschreibt es vollständig: der Schalter der Beleuchtung des Innenraums des Schrankes.

Das ist der Punkt, den ich erst nach Monaten verstanden habe. Das Deutsche hat zwei Wege für dieselbe Sache. Man kann sagen: die Tür des Schrankes. Oder man kann sagen: die Schranktür. Der erste Weg ist der Genitiv und klingt ordentlich, fast amtlich. Der zweite Weg klebt die Wörter einfach zusammen und ist das, was die Leute tatsächlich sagen.

Kunden benutzen den zweiten Weg. Verträge benutzen den ersten.

Wenn ich also lese, dass die Lieferung des Schrankes innerhalb der nächsten Woche erfolgt, dann bin ich in der Sprache des Vertrages. Wenn eine Kundin fragt, ob die Schranktür links oder rechts aufgeht, bin ich in der Sprache des Ladens. Beide Sätze meinen dasselbe Möbelstück.

Meine Kollegin Ayşe hat mir einen Trick beigebracht, der besser ist als jede Regel. Bei einem langen Wort liest man von hinten. Das letzte Stück sagt, was das Ding ist. Alles davor sagt nur, welches. Schrankinnenbeleuchtungsschalter: ein Schalter. Der ganze Rest ist Adresse.

Seitdem habe ich vor keinem Wort mehr Angst. Die Unfreundlichkeit eines Wortes hat nichts mit seiner Länge zu tun.

Letzte Woche kam ein Mann und fragte nach einem Ding, dessen Namen er selbst nicht wusste. Er beschrieb es mit den Händen: das kleine Teil unten an der Tür des Kühlschranks, das den Schmutz aufhält.

Ich wusste sofort, was er meinte, und ich wusste auch, dass ich das Wort dafür nie gehört hatte. Wir haben es gemeinsam gebaut, Stück für Stück: Kühlschranktürdichtung. Er hat gelacht und gesagt, das sei bestimmt richtig. Es war richtig.`,
      objectives: [
        'Descomponer una palabra compuesta empezando por el final.',
        'Alternar entre genitivo y palabra compuesta según el registro.',
        'Reconocer el registro administrativo frente al registro hablado.',
      ],
      vocabulary: [
        { surface: 'Auseinandersetzung', gloss: 'pelea, enfrentamiento prolongado' },
        { surface: 'Scherz', gloss: 'broma' },
        { surface: 'Beleuchtung', gloss: 'iluminación' },
        { surface: 'amtlich', gloss: 'oficial, de administración' },
        { surface: 'Lieferung', gloss: 'entrega de un pedido' },
        { surface: 'beigebracht', lemma: 'beibringen', gloss: 'enseñado a alguien' },
        { surface: 'Unfreundlichkeit', gloss: 'antipatía, aspereza' },
        { surface: 'Schmutz', gloss: 'suciedad' },
      ],
      culturalNote: 'La palabra compuesta alemana no tiene límite gramatical de longitud: se forma sobre la marcha y no hace falta que exista en el diccionario para que todo el mundo la entienda a la primera.',
      spanishSpeakerNote: 'Donde el español encadena «de»: «el interruptor de la luz del interior del armario», el alemán tiene dos opciones: el genitivo, que suena a contrato, o la palabra pegada, que es lo que se habla. Empieza a leerla por el final y deja de darte miedo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué aprende el narrador a lo largo del texto?',
          options: [
            ['dos', 'Que el alemán tiene dos formas para la misma relación, y que cada una pertenece a un registro'],
            ['diccionario', 'Que hay que memorizar el diccionario de muebles para vender'],
            ['dialecto', 'Que en Dortmund se habla un dialecto difícil de entender'],
          ],
          answer: 'dos',
          evidence: 'Das Deutsche hat zwei Wege für dieselbe Sache … Kunden benutzen den zweiten Weg. Verträge benutzen den ersten.',
          correct: 'Sí, y el texto lo cierra con el ejemplo del cliente: la palabra la construyen los dos juntos.',
          incorrect: 'No se habla de dialecto ni de memorizar listas. Busca la frase que dice cuántos caminos hay.',
          strategy: 'Cuando un texto dice «hay dos maneras», la comparación entre ambas suele ser el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿En qué consiste el truco que le enseña Ayşe?',
          options: [
            ['final', 'Leer la palabra desde el final: el último trozo dice qué cosa es'],
            ['articulo', 'Buscar el artículo para saber el género'],
            ['dividir', 'Dividir la palabra siempre en dos mitades iguales'],
          ],
          answer: 'final',
          evidence: 'Bei einem langen Wort liest man von hinten. Das letzte Stück sagt, was das Ding ist. Alles davor sagt nur, welches.',
          correct: 'Correcto, y el propio texto lo aplica al interruptor: lo demás es dirección.',
          incorrect: 'El truco no tiene que ver con el género ni con partir por la mitad. Busca el párrafo de Ayşe.',
          strategy: 'Cuando un texto atribuye un truco a un personaje, ese truco viene explicado justo después.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El narrador dice que el genitivo suena «amtlich». ¿Qué quiere decir?',
          options: [
            ['oficial', 'Que suena a documento oficial'],
            ['anticuado', 'Que suena antiguo y ya nadie lo usa'],
            ['grosero', 'Que suena grosero'],
          ],
          answer: 'oficial',
          evidence: 'Der erste Weg ist der Genitiv und klingt ordentlich, fast amtlich … Verträge benutzen den ersten.',
          correct: 'Eso es, y la frase siguiente lo confirma con los contratos.',
          incorrect: 'El texto no dice que nadie lo use: dice quién lo usa. Sigue leyendo dos frases más.',
          strategy: 'Si no entiendes un adjetivo, busca quién o qué lo usa según el texto.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el episodio final del cliente cierra el texto?',
          options: [
            ['aplica', 'Porque demuestra que ya no necesita conocer la palabra: sabe fabricarla'],
            ['venta', 'Porque logró vender un frigorífico caro'],
            ['error', 'Porque el narrador se equivocó y tuvo que consultar a Ayşe'],
          ],
          answer: 'aplica',
          evidence: 'Wir haben es gemeinsam gebaut, Stück für Stück: Kühlschranktürdichtung … Es war richtig.',
          correct: 'Sí. Pasa de sufrir palabras largas a construirlas con un desconocido, y acierta.',
          incorrect: 'No hay venta ni consulta a nadie: la palabra la inventan entre los dos. Fíjate en el verbo «gebaut».',
          strategy: 'Un final que repite en acción lo que el texto explicó antes en teoría es una demostración, no una anécdota.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la lista que le dio el jefe el tercer día era una broma para el empleado nuevo.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Ich dachte, das sei ein Scherz für den Neuen. Es war keiner. Es gibt dieses Ding, es kostet vierzehn Euro.',
          correct: 'Falso: él lo creyó, pero el texto lo desmiente en la frase siguiente y hasta da el precio.',
          incorrect: 'Distingue lo que el narrador pensó de lo que el texto afirma. Van en frases seguidas.',
          strategy: 'Después de «Ich dachte» casi siempre viene una corrección: no te quedes en la primera frase.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los pasos del relato.',
          options: [
            ['p1', 'El jefe le entrega la lista con la palabra imposible'],
            ['p2', 'Descubre que hay dos caminos: genitivo y palabra compuesta'],
            ['p3', 'Ayşe le enseña a leer desde el final'],
            ['p4', 'Con un cliente construye una palabra que no había oído nunca'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Am dritten Arbeitstag gab mir mein Chef eine Liste … Das Deutsche hat zwei Wege … Meine Kollegin Ayşe hat mir einen Trick beigebracht … Letzte Woche kam ein Mann …',
          correct: 'Correcto: susto, regla, truco y aplicación.',
          incorrect: 'Guíate por «Am dritten Arbeitstag», «erst nach Monaten», el párrafo de Ayşe y «Letzte Woche».',
          strategy: 'Un relato de aprendizaje suele ir del problema a la regla y de la regla al uso.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán explicando un objeto de tu trabajo o tu casa. Usa tres palabras compuestas y tres construcciones con genitivo (des/der).',
        minWords: 70, maxWords: 130,
        hints: ['Die Tür des Schrankes …', 'Die Schranktür …', 'Das letzte Stück sagt, was es ist.', 'Ich habe vor langen Wörtern keine Angst mehr.'],
      },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'sie-hat-nie-fahren-wollen',
      title: 'Nunca quiso conducir',
      genre: 'relato familiar',
      topic: 'un carnet de conducir a los sesenta y uno',
      tags: ['aleman b1', 'lectura', 'modales en pasado', 'Perfekt'],
      intro: 'A los sesenta y uno se saca el carnet en secreto, diciendo que va a gimnasia acuática. Lectura de alemán B1 con los modales en pasado.',
      mission: 'Averigua la diferencia entre no querer y no haber podido querer.',
      seoTitle: 'Lectura de alemán B1: nunca quiso conducir | WeLearn',
      seoDescription: 'Lee un relato familiar en alemán B1 y practica los verbos modales en pasado y el Perfekt con haben y sein. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['modalverben-prateritum-b1', 'perfekt-haben-sein-b1', 'modalverben'],
      text: `Meine Mutter hat mit einundsechzig Jahren den Führerschein gemacht. Vorher konnte sie nicht fahren, und das war kein Zufall.

Als sie jung war, durfte sie nicht. Ihr Vater hat gesagt, dafür sei kein Geld da, und dasselbe Geld, das nicht da war, hat zwei Jahre später für den Führerschein ihres Bruders gereicht. Sie hat das nie laut kommentiert. Sie hat nur einmal gesagt: Damals musste man nicht diskutieren, damals hat man verstanden.

Später wollte sie nicht mehr. Mein Vater fuhr, und wenn er nicht fuhr, fuhr ich. Es hat vierzig Jahre lang funktioniert, und wenn etwas vierzig Jahre lang funktioniert, sieht niemand, was es kostet.

Was es kostete, sah man erst, als mein Vater im März ins Krankenhaus musste. Er konnte drei Monate lang nicht fahren. Meine Mutter hat in diesen drei Monaten dreiundvierzig Mal jemanden fragen müssen, ob er sie mitnimmt. Sie hat mitgezählt. Das ist der Teil, den ich nicht vergesse: Sie hat mitgezählt.

Im Juli hat sie sich in einer Fahrschule angemeldet. Sie hat es niemandem gesagt, auch mir nicht. Sie hat behauptet, sie gehe zur Wassergymnastik, und ist stattdessen zweimal pro Woche zum Unterricht gegangen.

Der Fahrlehrer war siebenundzwanzig und hat sie geduzt, was sie geärgert hat. Sie hat trotzdem nichts gesagt, weil sie nicht auffallen wollte. Die Theorieprüfung hat sie im ersten Anlauf bestanden. Die praktische Prüfung hat sie zweimal machen müssen, und beim ersten Mal ist sie nach Hause gefahren worden, was sie schlimmer fand als das Durchfallen selbst.

An dem Tag, an dem sie den Schein bekam, hat sie mich angerufen und gefragt, ob ich einen Kaffee wolle. Sie ist gekommen und hat vor dem Haus geparkt, ziemlich weit weg vom Bordstein.

Ich habe nichts über das Parken gesagt. Ich habe gefragt, wie es war. Sie hat einen Moment nachgedacht und dann geantwortet: Ich hätte das mit zwanzig gekonnt. Ich habe es nur nie gedurft, und irgendwann habe ich geglaubt, ich wollte nicht.`,
      objectives: [
        'Distinguir konnte, durfte, wollte y musste en el pasado.',
        'Formar el Perfekt de los modales con doble infinitivo: hat fragen müssen.',
        'Separar una prohibición antigua de una preferencia personal.',
      ],
      vocabulary: [
        { surface: 'Führerschein', gloss: 'carnet de conducir' },
        { surface: 'gereicht', lemma: 'reichen', gloss: 'bastado, alcanzado' },
        { surface: 'mitgezählt', lemma: 'mitzählen', gloss: 'llevado la cuenta' },
        { surface: 'angemeldet', lemma: 'sich anmelden', gloss: 'inscrito, matriculado' },
        { surface: 'behauptet', lemma: 'behaupten', gloss: 'afirmado, sostenido' },
        { surface: 'geduzt', lemma: 'duzen', gloss: 'tuteado' },
        { surface: 'Durchfallen', lemma: 'durchfallen', gloss: 'suspender un examen' },
        { surface: 'Bordstein', gloss: 'bordillo de la acera' },
      ],
      culturalNote: 'El carnet alemán exige clases obligatorias en autoescuela y cuesta entre dos y tres mil euros. En los años sesenta, ese gasto solía decidirse una vez por familia, y casi nunca a favor de las hijas.',
      spanishSpeakerNote: 'Cuando un modal va en Perfekt, el alemán no usa participio sino dos infinitivos al final: «Sie hat fragen müssen», no «gemusst». Se lee del final hacia atrás: primero el modal, luego el verbo principal.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué revela la frase final de la madre?',
          options: [
            ['creido', 'Que la prohibición de entonces terminó convirtiéndose en una falta de ganas que ella se creyó'],
            ['miedo', 'Que siempre tuvo miedo a los coches y lo superó'],
            ['edad', 'Que los sesenta son la mejor edad para aprender a conducir'],
          ],
          answer: 'creido',
          evidence: 'Ich hätte das mit zwanzig gekonnt. Ich habe es nur nie gedurft, und irgendwann habe ich geglaubt, ich wollte nicht.',
          correct: 'Sí, y la frase distingue tres cosas: poder, tener permiso y querer.',
          incorrect: 'No se menciona miedo a los coches ni se recomienda ninguna edad. Lee la última frase entera.',
          strategy: 'Cuando la última frase enumera varios verbos modales, la distinción entre ellos es el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántas veces tuvo que pedir que la llevaran en esos tres meses?',
          options: [
            ['cuarentaytres', 'Cuarenta y tres veces'],
            ['tres', 'Tres veces'],
            ['veintisiete', 'Veintisiete veces'],
          ],
          answer: 'cuarentaytres',
          evidence: 'Meine Mutter hat in diesen drei Monaten dreiundvierzig Mal jemanden fragen müssen, ob er sie mitnimmt.',
          correct: 'Correcto, y lo importante no es la cifra sino que ella la contara.',
          incorrect: 'Los tres son meses y los veintisiete, la edad del profesor. Busca la cifra con «Mal».',
          strategy: 'Empareja cada número con su unidad: meses, veces, años.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El profesor la ha «geduzt» y eso la molestó. ¿Qué significa?',
          options: [
            ['tutear', 'Tratarla de tú en lugar de usted'],
            ['suspender', 'Suspenderla en una clase'],
            ['esperar', 'Hacerla esperar'],
          ],
          answer: 'tutear',
          evidence: 'Der Fahrlehrer war siebenundzwanzig und hat sie geduzt, was sie geärgert hat.',
          correct: 'Eso es. La edad del profesor está ahí justamente para que se note el desajuste.',
          incorrect: 'El verbo aparece unido a la edad del profesor, no a notas ni a horarios. Fíjate en esa relación.',
          strategy: 'Si un dato aparentemente inútil (la edad) acompaña a un verbo, suele explicar por qué molestó.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el narrador no comenta nada del aparcamiento?',
          options: [
            ['respeto', 'Porque corregirla en ese momento habría estropeado lo que acababa de conseguir'],
            ['visto', 'Porque no vio cómo había aparcado'],
            ['prisa', 'Porque tenía prisa y quería entrar en casa'],
          ],
          answer: 'respeto',
          evidence: 'hat vor dem Haus geparkt, ziemlich weit weg vom Bordstein. Ich habe nichts über das Parken gesagt. Ich habe gefragt, wie es war.',
          correct: 'Sí. El narrador se fija —lo describe— y aun así elige preguntar otra cosa.',
          incorrect: 'Sí lo vio, porque lo describe con detalle, y no se menciona ninguna prisa. Fíjate en el contraste entre las dos frases.',
          strategy: 'Cuando alguien describe algo con precisión y luego calla, el silencio es una decisión.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: ocultó a su familia que se había matriculado en la autoescuela.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Sie hat es niemandem gesagt, auch mir nicht. Sie hat behauptet, sie gehe zur Wassergymnastik.',
          correct: 'Verdadero, e incluso inventó una coartada: la gimnasia acuática.',
          incorrect: 'Busca el párrafo de julio. Allí se dice a quién se lo contó y qué dijo en su lugar.',
          strategy: 'La expresión «auch mir nicht» amplía la negación al propio narrador: nadie significa nadie.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la historia de la madre.',
          options: [
            ['p1', 'De joven no le dejan y el dinero va al hermano'],
            ['p2', 'Cuarenta años en los que conducen otros'],
            ['p3', 'El padre ingresa y ella cuenta cuarenta y tres favores'],
            ['p4', 'Se matricula en secreto y aprueba en julio'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Als sie jung war, durfte sie nicht … Es hat vierzig Jahre lang funktioniert … als mein Vater im März ins Krankenhaus musste … Im Juli hat sie sich in einer Fahrschule angemeldet.',
          correct: 'Correcto: prohibición, costumbre, ruptura y decisión.',
          incorrect: 'Guíate por «Als sie jung war», «vierzig Jahre lang», «im März» e «Im Juli».',
          strategy: 'En un relato de varias décadas, ordena primero por edades y luego por meses.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán sobre algo que no pudiste, no te dejaron o no quisiste hacer de joven. Usa konnte, durfte, wollte y musste, y dos modales en Perfekt.',
        minWords: 70, maxWords: 130,
        hints: ['Als ich jung war, durfte ich nicht …', 'Ich habe … fragen müssen.', 'Vierzig Jahre lang hat es funktioniert.', 'Ich hätte das mit zwanzig gekonnt.'],
      },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'stell-den-stuhl-ans-fenster',
      title: 'Pon la silla junto a la ventana',
      genre: 'escena de taller',
      topic: 'un técnico de teatro y su aprendiz',
      tags: ['aleman b1', 'lectura', 'Wechselpräpositionen', 'imperativo'],
      intro: 'Un técnico que lleva cuarenta años en el mismo teatro y habla casi solo en imperativo enseña la única regla que hace falta. Lectura de alemán B1.',
      mission: 'Averigua qué distingue «ans Fenster» de «am Fenster», y por qué en un escenario eso es una orden.',
      seoTitle: 'Lectura de alemán B1: pon la silla junto a la ventana | WeLearn',
      seoDescription: 'Lee una escena de taller en alemán B1 y practica las Wechselpräpositionen (acusativo o dativo) y el imperativo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['wechselprapositionen-b1', 'imperativ-b1', 'imperativ'],
      text: `Karl-Heinz hat vierzig Jahre lang in diesem Theater gearbeitet und redet fast nur in Befehlen. An meinem ersten Tag sagte er zu mir: Stell den Stuhl ans Fenster. Ich stellte ihn ans Fenster. Dann sagte er: Und jetzt sag mir, wo der Stuhl steht.

Ich sagte: Am Fenster.

Er nickte, als hätte ich eine Prüfung bestanden, und sagte: Gut. Merk dir den Unterschied, dann brauchst du in diesem Beruf nie wieder Grammatik.

Ich habe zwei Jahre gebraucht, um zu verstehen, dass das kein Spruch war. Im Deutschen ändern bestimmte Präpositionen ihre Bedeutung mit dem Fall. An die Wand sagt man, wenn sich etwas bewegt. An der Wand sagt man, wenn es schon steht. Bewegung oder Ort: Der Fall entscheidet, nicht die Präposition.

Auf einer Bühne ist das keine Feinheit, sondern eine Arbeitsanweisung. Häng das Bild über das Sofa heißt: Nimm es und häng es dorthin. Das Bild hängt über dem Sofa heißt: Fass es nicht an.

Karl-Heinz hat ein Verfahren, über das er mit niemandem spricht, weil er es für selbstverständlich hält. Wenn er eine Anweisung gibt, geht er dabei los. Wenn er einen Zustand beschreibt, bleibt er stehen. Man kann ihn also verstehen, ohne die Wörter zu hören, und genau das ist bei einer Probe nützlich.

Hinter der Bühne hört man ihn oft, ohne ihn zu sehen. Leg das Kabel unter den Teppich. Das Kabel liegt unter dem Teppich. Zwei Sätze, ein einziger Unterschied, und die zweite Fassung bedeutet, dass die Arbeit fertig ist.

Im Mai geht er in Rente. Die neue Kollegin, die ihn ersetzen soll, hat Theaterwissenschaft studiert und schreibt alles mit, was er sagt. Sie hat mich neulich gefragt, was sie sich unbedingt merken solle.

Ich habe gesagt: Stell einen Stuhl ans Fenster und sag ihm dann, wo er steht.

Sie hat gelacht. Karl-Heinz stand zwei Meter weiter im Dunkeln und hat nichts gesagt, aber ich habe gehört, dass er zufrieden war. So etwas hört man an der Art, wie jemand nicht redet.`,
      objectives: [
        'Elegir acusativo o dativo con an, auf, über, unter e in según haya movimiento o lugar.',
        'Dar instrucciones en imperativo con la preposición correcta.',
        'Entender una regla profesional transmitida sin explicarla.',
      ],
      vocabulary: [
        { surface: 'Befehlen', lemma: 'Befehl', gloss: 'órdenes' },
        { surface: 'nickte', lemma: 'nicken', gloss: 'asintió con la cabeza' },
        { surface: 'Spruch', gloss: 'frase hecha, dicho' },
        { surface: 'Feinheit', gloss: 'matiz, sutileza' },
        { surface: 'Anweisung', gloss: 'instrucción de trabajo' },
        { surface: 'Verfahren', gloss: 'procedimiento' },
        { surface: 'Probe', gloss: 'ensayo de teatro' },
        { surface: 'Rente', gloss: 'jubilación' },
      ],
      culturalNote: 'En los teatros alemanes el oficio técnico se transmite dentro de la casa, de una persona a la siguiente, y muchas veces sin manual: quien se jubila deja un método que nunca escribió.',
      spanishSpeakerNote: 'Nueve preposiciones alemanas cambian de sentido según el caso: an, auf, hinter, in, neben, über, unter, vor, zwischen. Acusativo si hay desplazamiento («ans Fenster»), dativo si describe dónde está («am Fenster»). El español no distingue: usa «junto a» para las dos.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué le enseña Karl-Heinz al narrador?',
          options: [
            ['caso', 'Que el caso, y no la preposición, decide si algo se mueve o ya está colocado'],
            ['orden', 'Que en el teatro hay que obedecer sin preguntar'],
            ['memoria', 'Que conviene apuntar todo lo que dicen los veteranos'],
          ],
          answer: 'caso',
          evidence: 'Bewegung oder Ort: Der Fall entscheidet, nicht die Präposition.',
          correct: 'Sí, y lo enseña sin nombrar la gramática: con una silla y dos frases.',
          incorrect: 'Lo de apuntar es lo que hace la nueva compañera, y no se habla de obediencia. Busca la frase que empieza por «Bewegung oder Ort».',
          strategy: 'Cuando un texto formula una regla en una frase corta y aislada, esa frase es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué hace Karl-Heinz físicamente cuando da una instrucción?',
          options: [
            ['moverse', 'Echa a andar mientras la dice'],
            ['senalar', 'Señala el objeto con la mano'],
            ['repetir', 'Repite la frase dos veces'],
          ],
          answer: 'moverse',
          evidence: 'Wenn er eine Anweisung gibt, geht er dabei los. Wenn er einen Zustand beschreibt, bleibt er stehen.',
          correct: 'Correcto: su cuerpo hace lo mismo que el caso gramatical.',
          incorrect: 'No se menciona ni señalar ni repetir. Busca el párrafo del «Verfahren».',
          strategy: 'Si el texto contrapone dos comportamientos en frases paralelas, la respuesta está en una de las dos.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El narrador dice que la frase de Karl-Heinz no era un «Spruch». ¿Qué significa?',
          options: [
            ['frasehecha', 'Una frase hecha sin contenido real'],
            ['insulto', 'Un insulto'],
            ['contrato', 'Una cláusula del contrato'],
          ],
          answer: 'frasehecha',
          evidence: 'Ich habe zwei Jahre gebraucht, um zu verstehen, dass das kein Spruch war.',
          correct: 'Eso es. Si tardó dos años en ver que no lo era, es que parecía una frase vacía.',
          incorrect: 'La palabra no aparece en contexto de ofensa ni de documento. Fíjate en cuánto tardó en entenderlo.',
          strategy: 'Una negación («no era un X») define X por lo que resultó ser en realidad.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el narrador le repite a la nueva compañera el mismo ejercicio de la silla?',
          options: [
            ['transmitir', 'Porque el método se transmite haciéndolo, no anotándolo'],
            ['burla', 'Porque quiere burlarse de ella por venir de la universidad'],
            ['prueba', 'Porque debe examinarla antes de que la contraten'],
          ],
          answer: 'transmitir',
          evidence: 'Die neue Kollegin … schreibt alles mit, was er sagt … Ich habe gesagt: Stell einen Stuhl ans Fenster und sag ihm dann, wo er steht.',
          correct: 'Sí, y el contraste está puesto a propósito: ella apunta palabras, él le devuelve un gesto.',
          incorrect: 'No hay examen ni burla: ella se ríe y Karl-Heinz queda satisfecho. Cruza lo que ella hace con lo que él le responde.',
          strategy: 'Cuando un personaje repite en el final lo que le hicieron al principio, está transmitiendo, no repitiendo.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: Karl-Heinz estaba presente cuando el narrador dio el consejo a su sustituta.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Karl-Heinz stand zwei Meter weiter im Dunkeln und hat nichts gesagt.',
          correct: 'Verdadero: estaba a dos metros, a oscuras, y no dijo nada.',
          incorrect: 'La respuesta está en la penúltima frase del texto, que dice dónde estaba.',
          strategy: 'En un final breve, cada frase aporta un dato: léelas una a una antes de decidir.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la escena.',
          options: [
            ['p1', 'La prueba de la silla el primer día'],
            ['p2', 'La regla del caso explicada dos años después'],
            ['p3', 'Los ejemplos del cable y del cuadro en el escenario'],
            ['p4', 'La jubilación de mayo y la nueva compañera'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'An meinem ersten Tag sagte er zu mir … Ich habe zwei Jahre gebraucht … Hinter der Bühne hört man ihn oft … Im Mai geht er in Rente.',
          correct: 'Correcto: la prueba, la regla, el uso diario y el relevo.',
          incorrect: 'Guíate por «An meinem ersten Tag», «zwei Jahre», «hinter der Bühne» e «Im Mai».',
          strategy: 'Un relato de oficio suele terminar en el momento del relevo: busca esa marca al final.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán dando instrucciones para colocar cosas en una habitación y describiendo después dónde quedaron. Alterna acusativo y dativo con an, auf, über, unter e in.',
        minWords: 70, maxWords: 130,
        hints: ['Stell den Tisch an die Wand.', 'Der Tisch steht an der Wand.', 'Leg das Kabel unter den Teppich.', 'Das Kabel liegt unter dem Teppich.'],
      },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'entweder-jetzt-oder-nie',
      title: 'O ahora o nunca',
      genre: 'testimonio en primera persona',
      topic: 'el relevo en una panadería familiar',
      tags: ['aleman b1', 'lectura', 'infinitivo con zu', 'conectores dobles'],
      intro: 'Una panadería de 1961, unas cifras sobre la mesa y una decisión que a los treinta y cinco ya no se puede tomar. Lectura de alemán B1.',
      mission: 'Averigua por qué acepta, si dice que no lo quería especialmente.',
      seoTitle: 'Lectura de alemán B1: o ahora o nunca | WeLearn',
      seoDescription: 'Lee un testimonio en alemán B1 y practica el infinitivo con zu y los conectores dobles (entweder…oder, weder…noch, je…desto). Con seis preguntas.',
      grammarFocus: ['infinitiv-zu-b1', 'zweiteilige-konnektoren-b1', 'infinitiv-zu-a2'],
      text: `Die Bäckerei meiner Familie gibt es seit 1961. Mein Großvater hat sie aufgemacht, mein Vater hat sie übernommen, und im Januar hat mein Vater mir gesagt, dass er sie entweder verkaufen oder schließen muss.

Ich hatte nicht vor, Bäckerin zu werden. Ich hatte angefangen, Betriebswirtschaft zu studieren, und ich war ziemlich gut darin, das frühe Aufstehen zu vermeiden.

Mein Vater hat mich nicht gefragt, ob ich die Bäckerei will. Das ist wichtig. Er hat mir nur die Zahlen auf den Tisch gelegt und gesagt: Ich zeige dir das nicht, um dich unter Druck zu setzen, sondern damit du es weißt.

Die Zahlen waren weder gut noch katastrophal. Der Umsatz sinkt seit sechs Jahren langsam. Je mehr Filialen die großen Ketten aufmachen, desto weniger Leute kommen wegen des Brotes, und desto mehr kommen wegen des Kaffees. Wir hatten keinen Kaffee.

Ich habe drei Wochen gebraucht, um zu verstehen, dass es hier gar nicht ums Brot ging. Es ging darum, ob ich mit fünfundzwanzig eine Entscheidung treffen will, die man mit fünfunddreißig nicht mehr treffen kann, weil man dann eine Wohnung, einen Vertrag und weniger Mut hat.

Sowohl mein Freund als auch meine beste Freundin haben mir abgeraten, und ihre Argumente waren richtig. Nicht nur die Arbeitszeiten sind hart, sondern auch die Marge ist klein, und in dieser Branche wird niemand schnell reich.

Im März habe ich zugesagt. Nicht, weil ich es unbedingt wollte, sondern weil mir klar wurde, dass ich es später bereuen würde, es nicht versucht zu haben. Das ist keine schöne Begründung, aber es ist eine ehrliche.

Wir haben jetzt Kaffee. Wir machen um halb sechs auf statt um sechs, und wir schließen sonntags, was mein Großvater nie getan hätte. Mein Vater steht immer noch jeden Morgen um vier in der Backstube, obwohl das längst nicht mehr seine Aufgabe ist.

Er sagt, er komme nur, um zu sehen, ob ich es richtig mache. Ich glaube, er kommt, um noch da zu sein.`,
      objectives: [
        'Construir infinitivos con zu, incluidos um zu, ohne zu y statt zu.',
        'Usar los conectores dobles: entweder…oder, weder…noch, sowohl…als auch, nicht nur…sondern auch, je…desto.',
        'Distinguir la razón declarada de la razón real de una decisión.',
      ],
      vocabulary: [
        { surface: 'übernommen', lemma: 'übernehmen', gloss: 'tomado el relevo de un negocio' },
        { surface: 'Betriebswirtschaft', gloss: 'administración de empresas' },
        { surface: 'Umsatz', gloss: 'facturación' },
        { surface: 'Filialen', lemma: 'Filiale', gloss: 'sucursales' },
        { surface: 'abgeraten', lemma: 'abraten', gloss: 'desaconsejado' },
        { surface: 'Marge', gloss: 'margen de beneficio' },
        { surface: 'bereuen', gloss: 'arrepentirse de algo' },
        { surface: 'Backstube', gloss: 'obrador de una panadería' },
      ],
      culturalNote: 'Alemania ha perdido más de la mitad de sus panaderías artesanales desde el año 2000. El relevo generacional suele decidirse en enero, cuando se cierran las cuentas del año anterior.',
      spanishSpeakerNote: 'El infinitivo con zu va al final y arrastra todo lo demás: «um dich unter Druck zu setzen». Si el verbo es separable, el zu se mete dentro: «aufzumachen», no «zu aufmachen».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Por qué acepta finalmente la narradora?',
          options: [
            ['arrepentir', 'Porque comprendió que se arrepentiría de no haberlo intentado'],
            ['vocacion', 'Porque siempre había querido ser panadera'],
            ['dinero', 'Porque las cuentas eran mejores de lo que parecía'],
          ],
          answer: 'arrepentir',
          evidence: 'Nicht, weil ich es unbedingt wollte, sondern weil mir klar wurde, dass ich es später bereuen würde, es nicht versucht zu haben.',
          correct: 'Sí, y ella misma dice que no es una razón bonita, solo honesta.',
          incorrect: 'Dice expresamente que no quería serlo, y las cifras no eran buenas. Busca la frase con «nicht… sondern».',
          strategy: 'La estructura «nicht A, sondern B» descarta la razón falsa y da la verdadera en la misma frase.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué dice el padre al poner las cifras sobre la mesa?',
          options: [
            ['saber', 'Que no se las enseña para presionarla, sino para que lo sepa'],
            ['vender', 'Que ya ha encontrado un comprador para el negocio'],
            ['pedir', 'Que le pide que se haga cargo cuanto antes'],
          ],
          answer: 'saber',
          evidence: 'Ich zeige dir das nicht, um dich unter Druck zu setzen, sondern damit du es weißt.',
          correct: 'Correcto, y el texto marca antes que no le preguntó si la quería: «Das ist wichtig».',
          incorrect: 'No hay comprador ni petición. Busca la frase entrecomillada del padre.',
          strategy: 'Cuando el narrador dice «esto es importante», la frase siguiente suele ser una cita literal decisiva.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que el «Umsatz» baja desde hace seis años. ¿Qué es?',
          options: [
            ['facturacion', 'La facturación del negocio'],
            ['alquiler', 'El alquiler del local'],
            ['personal', 'El número de empleados'],
          ],
          answer: 'facturacion',
          evidence: 'Der Umsatz sinkt seit sechs Jahren langsam. Je mehr Filialen die großen Ketten aufmachen, desto weniger Leute kommen wegen des Brotes.',
          correct: 'Eso es, y la frase siguiente explica por qué: se van a las cadenas.',
          incorrect: 'La explicación habla de clientes que dejan de venir, no de local ni de plantilla. Sigue leyendo una frase más.',
          strategy: 'Si la frase siguiente explica una causa, esa causa te dice de qué magnitud se hablaba.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el padre sigue yendo al obrador a las cuatro de la mañana?',
          options: [
            ['presencia', 'Para seguir formando parte del negocio, aunque diga que va a supervisar'],
            ['desconfia', 'Porque desconfía de la formación de su hija'],
            ['deudas', 'Porque todavía es él quien responde de las deudas'],
          ],
          answer: 'presencia',
          evidence: 'Er sagt, er komme nur, um zu sehen, ob ich es richtig mache. Ich glaube, er kommt, um noch da zu sein.',
          correct: 'Sí, y la narradora marca la diferencia entre lo que él dice y lo que ella cree.',
          incorrect: 'No se habla de deudas, y ella no interpreta desconfianza. Compara las dos últimas frases entre sí.',
          strategy: 'Cuando un texto pone «er sagt» y «ich glaube» en frases seguidas, contrapone versión y lectura.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la panadería ahora abre media hora antes y cierra los domingos.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Wir machen um halb sechs auf statt um sechs, und wir schließen sonntags, was mein Großvater nie getan hätte.',
          correct: 'Verdadero, y el texto añade que el abuelo no lo habría hecho nunca.',
          incorrect: 'Los cambios están todos en el penúltimo párrafo, junto con el café.',
          strategy: 'Los cambios de un negocio suelen ir enumerados juntos: localiza esa lista y compárala con la pregunta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena las etapas de la decisión.',
          options: [
            ['p1', 'En enero el padre plantea vender o cerrar'],
            ['p2', 'Le enseña las cifras sin pedirle nada'],
            ['p3', 'Tres semanas para entender de qué iba realmente'],
            ['p4', 'En marzo acepta y cambian los horarios'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'im Januar hat mein Vater mir gesagt … Er hat mir nur die Zahlen auf den Tisch gelegt … Ich habe drei Wochen gebraucht … Im März habe ich zugesagt.',
          correct: 'Correcto: planteamiento, datos, reflexión y decisión.',
          incorrect: 'Guíate por «im Januar», las cifras sobre la mesa, «drei Wochen» e «Im März».',
          strategy: 'Un texto sobre una decisión suele estar ordenado por el calendario: busca los meses.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en alemán sobre una decisión difícil que tomaste o que evitaste. Usa entweder…oder, weder…noch, nicht nur…sondern auch y dos infinitivos con um zu.',
        minWords: 70, maxWords: 130,
        hints: ['Ich musste entweder … oder …', 'Die Lage war weder gut noch …', 'Ich habe drei Wochen gebraucht, um zu verstehen, dass …', 'Nicht nur …, sondern auch …'],
      },
    },
  ],
}
