// ─── Das Kassenbuch des Großvaters — Historia B1–B2 en alemán ─────────────────
// Adaptación nativa de «The Grandfather's Ledger». Quien reclama los regalos es
// el ABUELO (Werner), no la abuela: el error que había en la versión inglesa no
// se hereda aquí — narrador, transcripciones y preguntas dicen lo mismo.
//
// AUDIO: /audio/historias/aleman/das-kassenbuch-des-grossvaters/{a,b}.mp3
// a con voz de mujer (Nadine), b con voz de hombre mayor (Werner).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  kassenbuch: 'libro de cuentas',
  tabelle: 'hoja de cálculo / tabla',
  quittung: 'recibo / factura',
  quittungen: 'recibos / facturas',
  kinderwagen: 'cochecito de bebé',
  kinderzimmer: 'cuarto del bebé',
  wiege: 'cuna',
  kommode: 'cómoda',
  möbel: 'muebles',
  spielzeug: 'juguetes',
  ausbildungsfonds: 'fondo para los estudios',
  großvater: 'abuelo',
  großmutter: 'abuela',
  opa: 'abuelo (coloquial)',
  enkel: 'nieto',
  enkelkind: 'nieto/a',
  enkelsohn: 'nieto (varón)',
  schwiegertochter: 'nuera',
  schwiegervater: 'suegro',
  schwanger: 'embarazada',
  schwangerschaft: 'embarazo',
  vermögen: 'fortuna / patrimonio',
  vermögenswerte: 'activos / bienes',
  besitz: 'posesiones / propiedad',
  investiert: 'invirtió / invertido',
  investition: 'inversión',
  großzügig: 'generoso/a',
  großzügigkeit: 'generosidad',
  geizig: 'tacaño/a',
  gierig: 'codicioso/a / avaro/a',
  bösewicht: 'villano / el malo de la película',
  ungeheuer: 'monstruo',
  inventur: 'inventario (recuento)',
  lager: 'almacén / bodega',
  lagerraum: 'trastero',
  organisiert: 'organizado/a',
  papierkram: 'papeleo',
  ordentlich: 'ordenado/a',
  bestand: 'existencias / inventario',
  haltung: 'actitud',
  einstellung: 'actitud / mentalidad',
  dankbarkeit: 'gratitud',
  anerkennung: 'reconocimiento',
  wertschätzung: 'aprecio / valoración',
  weitergeben: 'pasar a otro / heredar dentro de la familia',
  weitergegeben: 'pasado a otro / heredado',
  generation: 'generación',
  generationen: 'generaciones',
  weigerte: 'se negó',
  geweigert: 'negado / rechazado',
  schockiert: 'impactado/a / sorprendido/a',
  fassungslos: 'atónito/a / sin palabras',
  empört: 'indignado/a',
  abwehrend: 'a la defensiva',
  verteidigte: 'se defendió',
  vorwurf: 'reproche / acusación',
  streit: 'discusión / disputa',
  konflikt: 'conflicto',
  absicht: 'intención',
  vorsätzlich: 'premeditado/a',
  beweis: 'prueba / evidencia',
  wahrnehmung: 'percepción',
  annahme: 'suposición',
  erwartung: 'expectativa',
  bedingung: 'condición',
  bedingungslos: 'incondicional',
  geschenk: 'regalo',
  geschenke: 'regalos',
  leihgabe: 'préstamo (cosa prestada)',
  vernünftig: 'razonable',
  unvernünftig: 'poco razonable',
  gerecht: 'justo/a',
  gerechtigkeit: 'justicia',
  wahnsinn: 'una locura',
  verrückt: 'loco/a',
  verbrechen: 'crimen / delito',
  ausrede: 'excusa',
  entschuldigung: 'disculpa',
  ironie: 'ironía',
  sarkasmus: 'sarcasmo',
  rhetorisch: 'retórico/a',
  tonfall: 'tono (de voz)',
  angeblich: 'supuestamente / al parecer',
  offenbar: 'por lo visto / al parecer',
  plötzlich: 'de repente',
  eigentlich: 'en realidad',
  ehrlich: 'honestamente',
  finanziell: 'económicamente',
  ausgerechnet: 'justamente / precisamente (con ironía)',
};

const NARRATOR_PARAGRAPHS = [
  'Als der kleine Elias vor drei Jahren geboren wurde, gab sein Großvater Werner mehr Geld aus als alle anderen in der Familie.',
  'Er kaufte fast alles: einen teuren Kinderwagen, die komplette Einrichtung fürs Kinderzimmer, teures Spielzeug — und er legte sogar einen Ausbildungsfonds an.',
  'Alle dachten, er sei einfach großzügig.',
  'Dann erzählte Werners Tochter Lena, dass sie schwanger sei.',
  'Plötzlich fing Werner an, Bemerkungen zu machen: Man könne einige von Elias\' Sachen ja mit dem neuen Baby "teilen".',
  'Ein paar Wochen später stand er bei seinem Sohn und seiner Schwiegertochter vor der Tür — mit einer Tabelle, in der jedes teure Geschenk stand, das er je gekauft hatte.',
  'Er bat um Sachen im Wert von mehreren tausend Euro zurück.',
  'Die Schwiegertochter sagte Nein.',
  'Jetzt erzählen beide Seiten sehr unterschiedliche Versionen davon, was passiert ist.',
];

const A_PARAGRAPHS = [
  'Du, ich zittere immer noch.',
  'Du weißt doch, wie Marks Vater damals alles gekauft hat, als Elias geboren wurde. Den Kinderwagen, die Möbel fürs Kinderzimmer, all die teuren Sachen, die er unbedingt kaufen wollte.',
  'Und jetzt sag mir bitte, warum dieser Mann gestern bei mir vor der Tür stand — mit einer ausgedruckten Tabelle.',
  'Einer Tabelle.',
  'Ich mache keine Witze.',
  'Er hat sich an meinen Küchentisch gesetzt und ist Punkt für Punkt durchgegangen, als würde er Inventur im Lager machen.',
  'Der Kinderwagen. Die Wiege. Die Kommode. Sogar das Geld, das er in den Ausbildungsfonds gelegt hat.',
  'Und dann sagt er, völlig ernst: "Ich finde es nur gerecht, wenn ein Teil davon jetzt an Lenas Baby geht."',
  'Und ich sitze da und denke... gerecht für wen?',
  'Elias benutzt diese Sachen doch. Jeden Tag.',
  'Das sind keine Kisten, die im Lagerraum stehen. Das sind seine Sachen.',
  'Dann fängt er an, dass er viel Geld investiert habe und dass Familienvermögen in der Familie bleiben solle.',
  'Familienvermögen?',
  'Herr Berger, das ist Ihr Enkel und kein Immobilienportfolio.',
  'Und dann holt er Quittungen raus.',
  'Quittungen.',
  'Von vor drei Jahren.',
  'Wer hebt Quittungen für Babygeschenke auf, wenn er nicht damit rechnet, sie irgendwann zurückzubekommen?',
  'Das Ganze war einfach Wahnsinn.',
  'Das Schlimmste ist: Er war ehrlich fassungslos, als ich Nein gesagt habe.',
  'Als hätte er wirklich erwartet, dass ich die Sachen meines Kindes rausgebe, weil ein anderes Enkelkind unterwegs ist.',
  'Ich schwöre dir: Hätte er einfach gefragt, ob Elias irgendwas rausgewachsen ist, hätte ich das gerne gegeben.',
  'Aber mit Papierkram und einem Rückholplan vor der Tür stehen?',
  'Auf keinen Fall.',
];

const B_PARAGRAPHS = [
  'Ich muss jemandem erzählen, was wirklich passiert ist, weil ich offenbar jetzt der Bösewicht bin.',
  'Vor drei Jahren, als Elias geboren wurde, habe ich ein Vermögen für die Kinder ausgegeben.',
  'Ein Vermögen.',
  'Nicht weil mich jemand gezwungen hätte. Weil ich wollte, dass mein Enkel alles hat.',
  'Allein die Möbel fürs Kinderzimmer haben mehr gekostet als mein erstes Auto.',
  'Habe ich mich beschwert? Nein.',
  'Habe ich jemals Anerkennung verlangt? Nein.',
  'Jetzt bekommt meine Tochter Lena ihr erstes Kind, und sie hat finanziell wirklich zu kämpfen.',
  'Also dachte ich, dass man ein paar von den teuren Sachen, die sowieso kaum noch benutzt werden, weitergeben könnte.',
  'So wie Familien das seit Generationen machen.',
  'Stattdessen hat Nadine reagiert, als wollte ich eine Bank ausrauben.',
  'Ich habe nie gesagt, dass ich alles zurückhaben will.',
  'Ich habe gesagt, dass wir vielleicht darüber reden könnten, ein paar der größeren Sachen zu teilen.',
  'Aber in der Sekunde, in der ich den Kinderwagen erwähnt habe, wurde sie abwehrend.',
  'Und ehrlich gesagt?',
  'Was mich gestört hat, waren nicht mal die Sachen.',
  'Es war die Haltung.',
  'Diese komplette Abwesenheit von Wertschätzung.',
  'Drei Jahre lang habe ich zugesehen, wie sie Dinge benutzen, die ich bezahlt habe — und in dem Moment, in dem ich vorschlage, einem anderen Enkelkind zu helfen, bin ich plötzlich ein gieriges Ungeheuer.',
  'Und alle machen sich über meine Tabelle lustig.',
  'Entschuldigung, dass ich organisiert bin.',
  'Wenn es um zehntausende Euro geht, ist es vielleicht nicht das Verrückteste der Welt, so etwas aufzuschreiben.',
  'Ich wollte Elias nichts wegnehmen.',
  'Ich wollte Lena helfen.',
  'Aber in dieser Familie ist das offenbar inzwischen ein Verbrechen.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Wortschatz',
    q: 'Der Erzähler sagt, Werner habe "fast alles" gekauft und sogar einen Ausbildungsfonds angelegt. Was signalisiert diese Aufzählung?',
    opts: [
      'Er kaufte vor allem günstige, praktische Sachen für den Alltag mit einem Baby',
      'Er gab weit mehr aus, als ein Geschenk normalerweise kostet',
      'Er kaufte alles gebraucht und gab deshalb kaum Geld aus',
      'Er kaufte nur Sachen, die gerade im Angebot waren, um Geld zu sparen',
    ],
    correct: 1,
    explanation:
      'La lista sube de escalón en escalón: cochecito, muebles, juguetes y por fin un fondo para los estudios. No es una lista de regalos, es una lista de inversiones — y eso prepara todo lo que viene después.',
  },
  {
    type: 'Inferencia',
    q: 'Der Erzähler benutzt das Wort "Plötzlich", als Werners Haltung sich ändert. Was bedeutet das?',
    opts: [
      'Die Veränderung kam langsam über mehrere Monate und war in der Familie lange erwartet',
      'Werner hatte von Anfang an geplant, die Sachen eines Tages wieder zurückzuholen',
      'Der Umschwung kam direkt nach einem Ereignis: der Schwangerschaft seiner Tochter',
      'Lena hatte Werner selbst um die Sachen gebeten, und er gab nur nach',
    ],
    correct: 2,
    explanation:
      '«Plötzlich» contrasta con tres años de generosidad e implica que la motivación de Werner cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: 'Was stand in Werners Tabelle?',
    opts: [
      'Eine Liste künftiger Käufe für das neue Baby',
      'Jedes teure Geschenk, das er je gekauft hatte',
      'Das Haushaltsbudget der Familie für das kommende Jahr',
      'Ein schriftlicher Vertrag zwischen Werner und seinem Sohn',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «mit einer Tabelle, in der jedes teure Geschenk stand, das er je gekauft hatte».',
  },
  {
    type: 'Pensamiento crítico',
    q: '"Alle dachten, er sei einfach großzügig." Was deutet das Wort "einfach" an?',
    opts: [
      'Werner war eindeutig großzügig, ganz ohne Hintergedanken',
      'Hinter Werners Großzügigkeit steckte vielleicht mehr, als es damals aussah',
      'Die Familie wusste schon immer, dass Werner Bedingungen stellte',
      'Werner wollte die Familie von Anfang an offen kontrollieren',
    ],
    correct: 1,
    explanation:
      '«Einfach» sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Wortschatz',
    q: 'Nadine vergleicht Werners Besuch mit einer "Inventur im Lager". Was macht dieser Vergleich?',
    opts: [
      'Metapher — Werner hat in der Küche wirklich ihre Möbel bewegt und alles neu geordnet',
      'Vergleich — er wirkt kalt und geschäftsmäßig, als wären Geschenke rückholbare Ware',
      'Übertreibung — sie will nur witzig sein und meint den Vergleich nicht ernst',
      'Personifikation — die Tabelle bekommt menschliche Züge und wird selbst zur Figur im Streit',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar: equipararla a un recuento de almacén muestra que Nadine vivió la escena como una transacción, no como una conversación entre familia.',
  },
  {
    type: 'Inferencia',
    q: '"Wer hebt Quittungen für Babygeschenke auf, wenn er nicht damit rechnet, sie zurückzubekommen?" Was will diese rhetorische Frage sagen?',
    opts: [
      'Dass man alle Quittungen für teure Geschenke grundsätzlich aufheben sollte, egal für wen',
      'Dass Werner einfach nur ein sehr ordentlicher Mensch ist, der grundsätzlich nie eine Quittung wegwirft',
      'Dass die Quittungen beweisen, dass Werner die Rückgabe von Anfang an im Kopf hatte',
      'Dass Nadine ihre eigenen Quittungen längst verloren hat und deshalb nichts beweisen kann',
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. Nadine la usa para convertir los recibos en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: 'Wie beschreibst du den Tonfall von Nadines Sprachnachricht am besten?',
    opts: [
      'Ruhig, distanziert und analytisch',
      'Emotional aufgeladen, empört und ungläubig',
      'Traurig, leise und reumütig',
      'Formell, sachlich und professionell',
    ],
    correct: 1,
    explanation:
      '«Ich zittere immer noch», las frases de una sola palabra («Einer Tabelle.», «Quittungen.») y el sarcasmo («kein Immobilienportfolio») marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: 'Welche Bitte von Werner WÄRE für Nadine in Ordnung gewesen?',
    opts: [
      'Eine ausgedruckte Tabelle aller Geschenke mitbringen und sie Punkt für Punkt durchgehen',
      'Kinderwagen und Wiege sofort zurückverlangen, weil Lena sie jetzt braucht',
      'Fragen, ob Elias etwas rausgewachsen ist, das man weitergeben könnte',
      'Eine formelle schriftliche Anfrage mit einer Frist schicken',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: «Hätte er einfach gefragt, ob Elias irgendwas rausgewachsen ist, hätte ich das gerne gegeben.» El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: '"Herr Berger, das ist Ihr Enkel und kein Immobilienportfolio." Was macht Nadine hier?',
    opts: [
      'Sie spricht sachlich über sein Immobiliengeschäft, weil Werner sein Geld tatsächlich mit Wohnungen und Häusern verdient',
      'Sie benutzt Ironie und siezt ihn plötzlich, um seine geschäftliche Sicht auf die Familie bloßzustellen',
      'Sie stimmt ihm höflich zu und bleibt dabei beim förmlichen Sie',
      'Sie zitiert wörtlich eine Zeile aus seiner ausgedruckten Tabelle',
    ],
    correct: 1,
    explanation:
      'Dos golpes a la vez: el vocabulario financiero («Immobilienportfolio») se burla de su forma de tratar a la familia como cartera de inversión, y el cambio repentino al «Sie» + apellido convierte la cortesía en distancia.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Wortschatz',
    q: 'Werner sagt, die Sachen könne man "weitergeben". Auf welche Tradition spielt dieses Wort an?',
    opts: [
      'Waren im Laden zurückgeben und Geld zurückbekommen',
      'Die Familienpraxis, Besitz von einem Mitglied zum nächsten weiterzureichen',
      'Ein förmliches Erbverfahren vor dem Notar mit Urkunden',
      'Gebrauchte Sachen an eine Wohltätigkeitsorganisation im Ort spenden',
    ],
    correct: 1,
    explanation:
      '«Weitergeben» invoca una costumbre familiar, no una devolución. Werner presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: 'Was hat Werner nach eigener Aussage verlangt — im Gegensatz zu Nadines Version?',
    opts: [
      'Jeden einzelnen Gegenstand seiner Liste, und zwar sofort und vollständig zurück',
      'Nur das Geld aus dem Ausbildungsfonds, den er damals angelegt hatte',
      'Ein Gespräch darüber, ein paar der größeren Sachen zu teilen',
      'Eine schriftliche Entschuldigung von Nadine für ihre Reaktion an der Haustür',
    ],
    correct: 2,
    explanation:
      'Werner dice: «Ich habe nie gesagt, dass ich alles zurückhaben will. Ich habe gesagt, dass wir vielleicht darüber reden könnten…». Contradice directamente el relato de Nadine.',
  },
  {
    type: 'Inferencia',
    q: '"Was mich gestört hat, waren nicht mal die Sachen. Es war die Haltung." Was zeigt dieser Satz?',
    opts: [
      'Er tut nur so, als wären ihm die Sachen egal',
      'Er fühlt sich emotional missachtet, trotz jahrelanger Großzügigkeit',
      'Er will Nadine aus der Familie drängen',
      'Er bereut inzwischen, die teuren Geschenke damals gekauft zu haben',
    ],
    correct: 1,
    explanation:
      'Al separar «die Sachen» de «die Haltung», Werner deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: '"Entschuldigung, dass ich organisiert bin." Welchen Tonfall hat dieser Satz?',
    opts: [
      'Echte Reue und ehrliches Bedauern über die Tabelle',
      'Sarkastische Verteidigung — er findet nicht, dass er etwas falsch gemacht hat',
      'Aufrichtige Verwirrung darüber, warum plötzlich alle sauer auf ihn sind und niemand ihn versteht',
      'Akademisch, distanziert und sehr formell',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa: tiene la forma de una disculpa y el contenido de un reproche. Defiende su acto mientras insinúa que criticarle la tabla es ridículo.',
  },
  {
    type: 'Wortschatz',
    q: '"Offenbar bin ich jetzt der Bösewicht." Was verrät Werners Wortwahl?',
    opts: [
      'Er gibt mit diesem Wort zu, dass sein Verhalten gegenüber den Kindern falsch und übertrieben war',
      'Er fühlt sich zu Unrecht in die Rolle des Bösen einer Geschichte gedrängt, die andere über ihn erzählen',
      'Er benutzt juristische Fachsprache, weil er den Streit wie einen Rechtsfall behandelt',
      'Er sucht Mitleid durch Schmeichelei, damit die Familie ihm die Sachen freiwillig zurückgibt',
    ],
    correct: 1,
    explanation:
      '«Bösewicht» es una palabra de cuento, no de vida real. Werner la usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Welche Tatsache bestätigen Nadine und Werner BEIDE?',
    opts: [
      'Werner wollte alle Sachen dauerhaft zurück',
      'Nadine hatte schon von sich aus etwas angeboten',
      'Werner brachte eine Tabelle mit',
      'Lena hat die Sachen selbst von Werner verlangt',
    ],
    correct: 2,
    explanation:
      'La tabla es el único dato objetivo que confirman las dos versiones. Todo lo demás —la intención, el tono, el alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: 'Der Erzähler sagt, Werner habe "Sachen im Wert von mehreren tausend Euro zurück" verlangt. Werner sagt, er habe "vorgeschlagen, über das Teilen zu reden". Was zeigt diese Lücke?',
    opts: [
      'Der Erzähler ist von Anfang an gegen Werner voreingenommen und übernimmt Nadines Version',
      'Zwischen Werners erklärter Absicht und der Wirkung seiner Bitte liegt ein großer Unterschied',
      'Nadine hat den größten Teil der Geschichte erfunden, um Werner schlecht dastehen zu lassen',
      'Der Erzähler hat sich in den Zahlen und im Ablauf sachlich geirrt',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Werner creía estar abriendo una conversación; Nadine (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Was ist die genaueste GRUNDursache dieses Konflikts?',
    opts: [
      'Werners Geldgier im Alter',
      'Nadines Undankbarkeit gegenüber ihrem Schwiegervater',
      'Beim Schenken wurde nie besprochen, was eigentlich erwartet wird',
      'Lenas Entscheidung, ausgerechnet in diesem Jahr ein Kind zu bekommen',
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: 'Nadine sagt, Werner sei "ehrlich fassungslos" gewesen. Was sagt diese Reaktion über ihn?',
    opts: [
      'Er hat die Überraschung nur gespielt, um Mitleid zu bekommen',
      'Er hatte wirklich nicht damit gerechnet, dass jemand seine Bitte unverschämt finden könnte',
      'Er wusste, dass sie Nein sagen würde, und hat sie getestet',
      'Ihm wurde in seinem ganzen Leben noch nie etwas abgeschlagen',
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que Werner opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: 'Werner nennt seinen Sohn und seine Schwiegertochter "die Kinder". Was sagt diese Wortwahl?',
    opts: [
      'Sein Sohn und Nadine sind wirklich noch sehr jung und stehen finanziell erst ganz am Anfang',
      'Werner sieht sich als Autorität und die beiden als unerfahrene Menschen, denen er geholfen hat',
      'Werner hat im Streit ihre Namen vergessen und redet deshalb allgemein von ihnen',
      'Es ist im Deutschen ein formeller, respektvoller Ausdruck für erwachsene Söhne und Töchter',
    ],
    correct: 1,
    explanation:
      'Llamarlos «die Kinder» los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'Inventur machen', meaning: 'hacer recuento de existencias — aquí, aplicado a una familia' },
  { phrase: 'weitergeben', meaning: 'pasar algo a otro miembro de la familia, de generación en generación' },
  { phrase: 'rhetorische Frage', meaning: 'pregunta que no espera respuesta: dicta un veredicto' },
  { phrase: 'Entschuldigung, dass …', meaning: 'no-disculpa: forma de disculpa, contenido de reproche' },
  { phrase: 'plötzlich siezen', meaning: 'pasar al «Sie» de golpe: cortesía usada como distancia y arma' },
];

export const dasKassenbuchDesGrossvaters: Historia = {
  slug: 'das-kassenbuch-des-grossvaters',
  lang: 'aleman',
  icon: '🎙️',
  color: '#059669',
  level: 'B1–B2',
  title: 'Das Kassenbuch des Großvaters',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa.',
  metaTitle: 'Das Kassenbuch des Großvaters — comprensión en alemán B1–B2',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa. Dos audios, transcripción y 19 preguntas en alemán B1–B2.',
  intro:
    'Un conflicto de familia. Dos versiones. Tú decides quién tiene razón. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en las palabras y en el momento en que pasan las cosas: el narrador no es neutral. Busca las pistas de hacia qué lado se inclina el idioma que usa.',
  },
  voices: [
    {
      key: 'a',
      name: 'Nadine',
      role: 'Schwiegertochter',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/aleman/das-kassenbuch-des-grossvaters/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Nadine.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en alemán.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Werner',
      role: 'Schwiegervater',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/aleman/das-kassenbuch-des-grossvaters/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de Werner con la de Nadine: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Werner.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en alemán.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Werner.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Estas preguntas te piden sostener las dos versiones a la vez y pensar con calma qué pasó, por qué, y cómo el idioma que elige cada uno moldea lo que creemos que pasó.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Después de oír a los dos: ¿quién tiene el argumento más fuerte, y por qué?',
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia de los textos: palabras, frases y detalles concretos. Eso es exactamente lo que pide un B2 en alemán.',
  },
  ui: 'es',
};

export default dasKassenbuchDesGrossvaters;
