// ─── Das gesperrte Handy — Historia B1–B2 en alemán ───────────────────────────
// Adaptación nativa de «The Locked Phone»: mismo conflicto y mismo diseño de
// preguntas, pero escrita en alemán hablado, no traducida palabra por palabra.
//
// Los enunciados van en alemán (es lo que se está evaluando); las explicaciones,
// en español, que es donde tiene que caer la ficha.
//
// AUDIO PENDIENTE: cuando se grabe, va en
// /audio/historias/aleman/das-gesperrte-handy/{a,b}.mp3 — a con voz de mujer
// (Jana), b con voz de hombre (Tobias).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  handy: 'celular / móvil',
  bildschirm: 'pantalla',
  nachricht: 'mensaje',
  nachrichten: 'mensajes',
  benachrichtigung: 'notificación',
  umgedreht: 'volteado / dado la vuelta',
  umdreht: 'voltea / da la vuelta',
  abendessen: 'cena',
  tisch: 'mesa',
  küche: 'cocina',
  sofa: 'sofá',
  fotos: 'fotos',
  hund: 'perro',
  standort: 'ubicación',
  arbeit: 'trabajo',
  freitag: 'viernes',
  samstag: 'sábado',
  frühling: 'primavera',
  aufleuchtet: 'se ilumina / se enciende',
  aufleuchtete: 'se iluminó',
  bemerkte: 'notó / se dio cuenta',
  halb: 'medio / a medias',
  scherzhaft: 'en broma',
  halbscherzhaft: 'medio en broma',
  weigerte: 'se negó',
  weigerung: 'negativa / rechazo',
  weigere: 'me niego',
  überreichen: 'entregar (algo en mano)',
  aushändigen: 'entregar / dar acceso a',
  anbot: 'ofreció',
  beantworten: 'responder / contestar',
  antwort: 'respuesta',
  privatsphäre: 'privacidad',
  grenze: 'límite / frontera',
  grenzen: 'límites',
  prinzip: 'principio',
  prinzipien: 'principios',
  vertrauen: 'confianza / confiar',
  misstrauen: 'desconfianza',
  verdächtig: 'sospechoso/a',
  verdacht: 'sospecha',
  schuldig: 'culpable',
  unschuldig: 'inocente',
  beweis: 'prueba / evidencia',
  beweise: 'pruebas',
  beweisen: 'demostrar',
  ermittelt: 'investigado (como en una causa)',
  verstecken: 'esconder / ocultar',
  versteckt: 'escondido/a',
  eifersüchtig: 'celoso/a',
  eifersucht: 'celos',
  verletzt: 'herido/a / dolido/a',
  unsicher: 'inseguro/a',
  beruhigung: 'tranquilidad / que te calmen',
  verteidigt: 'se defiende',
  abwehrend: 'a la defensiva',
  erschöpfend: 'agotador/a',
  beziehung: 'relación (de pareja)',
  freundin: 'novia',
  freund: 'novio / amigo',
  verlobte: 'prometido/a',
  ehrlich: 'honestamente / sinceramente',
  offensichtlich: 'obviamente',
  eigentlich: 'en realidad',
  plötzlich: 'de repente',
  ausgerechnet: 'justamente / precisamente (con ironía)',
  angeblich: 'supuestamente / al parecer',
  überhaupt: 'en absoluto / para nada',
  trotzdem: 'aun así / a pesar de eso',
  stattdessen: 'en su lugar / en cambio',
  außerdem: 'además',
  sowieso: 'de todos modos',
  niemand: 'nadie',
  gewohnheit: 'costumbre / hábito',
  gewohnt: 'acostumbrado/a',
  vorwurf: 'reproche / acusación',
  vorwürfe: 'reproches',
  test: 'prueba / test',
  geste: 'gesto',
  zugang: 'acceso',
  kontrolle: 'control',
  kontrollieren: 'controlar',
  regel: 'regla / norma',
  wahrheit: 'verdad',
  lüge: 'mentira',
  lügner: 'mentiroso',
  rede: 'discurso',
  wirklich: 'de verdad / realmente',
  schlimmer: 'peor',
  entschuldige: 'me disculpo / perdona',
  entschuldigung: 'disculpa',
  gerechtfertigt: 'justificado/a',
  ironie: 'ironía',
  rhetorisch: 'retórico/a',
  wortwahl: 'elección de palabras',
  tonfall: 'tono (de voz)',
};

const NARRATOR_PARAGRAPHS = [
  'Jana und Tobias sind seit zwei Jahren zusammen. Im Frühling sind sie in eine gemeinsame Wohnung gezogen.',
  'Am Freitag beim Abendessen leuchtete Tobias\' Handy auf dem Tisch auf, und er drehte es wortlos um.',
  'Jana bemerkte es. Sie sagte zuerst nichts.',
  'Später am Abend fragte sie halb scherzhaft, ob sie einmal in sein Handy schauen dürfe.',
  'Tobias sagte Nein.',
  'Er war nicht wütend. Er sagte, sein Handy sei privat, und er werde es niemandem aushändigen — auch ihr nicht.',
  'Stattdessen bot er an, jede Frage zu beantworten, die sie stellen wolle.',
  'Jana antwortete, eine Weigerung sei auch eine Antwort.',
  'In dieser Nacht schliefen beide schlecht, und am Samstagmorgen erzählten beide die Geschichte jemand anderem.',
];

const A_PARAGRAPHS = [
  'Ich muss das jemandem erzählen, sonst werde ich verrückt.',
  'Du weißt ja, wie Tobias mit seinem Handy umgeht. Es liegt überall herum. Auf dem Sofa, in der Küche, immer mit dem Bildschirm nach oben. Nie ein Problem.',
  'Und dann, am Freitag, beim Abendessen, leuchtet das Ding auf — und er dreht es um.',
  'Mit dem Bildschirm nach unten.',
  'Ohne mich anzusehen.',
  'Und ich sitze da und tue eine Stunde lang so, als wäre nichts.',
  'Später sage ich dann, halb im Scherz: "Zeig mir mal dein Handy."',
  'Und er sagt: "Nein."',
  'Nicht "klar, hier". Nicht "warum?". Einfach Nein.',
  'Zwei Jahre zusammen, und die Antwort ist Nein?',
  'Und dann fängt er an, über Privatsphäre zu reden. Über Prinzipien. Über Grenzen.',
  'Grenzen. Ach bitte.',
  'Ich wollte seine Nachrichten gar nicht lesen. Ich wollte sehen, wie er mir das Handy gibt. Das war der ganze Test.',
  'Wenn du nichts zu verstecken hast, warum kostet es dich dann so viel, das zu zeigen?',
  'Und je länger er erklärt hat, desto schlimmer klang es.',
  'Niemand hält eine Rede über Privatsphäre, wenn er nicht vorher schon darüber nachgedacht hat.',
  'Er hat immer wieder gesagt: "Frag mich alles, ich sage dir die Wahrheit."',
  'Super. Ich soll also dem Mann vertrauen, der mich nicht nachsehen lässt.',
  'Und jetzt tut er so, als hätte ich etwas falsch gemacht.',
  'Angeblich habe ich "eine Grenze überschritten".',
  'Ich habe eine Grenze überschritten.',
  'Ehrlich gesagt: Hätte er mir das Handy einfach gegeben, hätte ich es wahrscheinlich nicht mal aufgemacht.',
  'Genau das ist der Teil, der mich fertigmacht.',
];

const B_PARAGRAPHS = [
  'Mann, ich weiß nicht, wie ich das erzählen soll, ohne wie der Böse zu klingen.',
  'Freitagabend. Abendessen. Mein Handy leuchtet auf, ich drehe es um.',
  'Ich lege mein Handy beim Essen immer mit dem Bildschirm nach unten. Das mache ich, seit ich neunzehn bin.',
  'Offenbar ist das jetzt ein Beweis.',
  'Später will sie in mein Handy schauen.',
  'Und hör zu — auf diesem Handy ist nichts. Gar nichts.',
  'Arbeitsgruppen, meine Mutter, Fußballergebnisse, vierzig Fotos vom Hund.',
  'Aber darum geht es nicht.',
  'Es geht darum, dass ich mein Handy nicht aushändige, um zu beweisen, dass ich kein Lügner bin.',
  'Denn wenn du das einmal machst, ist es ab dann normal, oder?',
  'Diesen Monat das Handy. Nächsten Monat mein Standort. Und danach, mit wem ich Mittag gegessen habe.',
  'Ich habe ihr gesagt: Frag mich alles. Wirklich alles. Ich antworte.',
  'Sie wollte keine Antworten. Sie wollte das Handy.',
  'Und ich verstehe sie ja. Wirklich. Ich weiß, dass sie verletzt worden ist, und ihr Ex war tatsächlich furchtbar.',
  'Aber ich bin nicht er.',
  'Gegen mich wird ermittelt für etwas, das jemand anderes getan hat.',
  'Und jetzt bin ich der Verdächtige, weil ich Nein gesagt habe.',
  'Das ist der Teil, über den ich nicht hinwegkomme.',
  'Wenn Nein sagen dich schuldig macht, dann gibt es keine Antwort, die funktioniert.',
  'Schau — vielleicht hätte ich den Moment besser lösen können. Vielleicht.',
  'Aber ich entschuldige mich nicht dafür, dass ich eine Grenze habe.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Wortschatz',
    q: 'Der Erzähler sagt, das Handy "leuchtete auf dem Tisch auf". Was bedeutet das?',
    opts: [
      'Das Handy fing Feuer',
      'Der Bildschirm ging von selbst an, weil eine Nachricht ankam',
      'Tobias nahm das Handy und entsperrte es',
      'Das Handy war an diesem Abend besonders hell eingestellt',
    ],
    correct: 1,
    explanation:
      '«Aufleuchten» describe una pantalla que se enciende sola, normalmente porque acaba de llegar una notificación. Es el detonante de todo lo que viene después.',
  },
  {
    type: 'Inferencia',
    q: 'Jana fragt "halb scherzhaft". Was sagt diese Wortwahl über die Situation?',
    opts: [
      'Jana hatte kein echtes Interesse an dem Handy',
      'Jana wollte sich über Tobias lustig machen',
      'Die Bitte war als Scherz verpackt, hatte aber eine echte Absicht dahinter',
      'Jana hatte das Handy schon vorher angesehen',
    ],
    correct: 2,
    explanation:
      '«Halb scherzhaft» deja a los dos margen para interpretar el momento de forma distinta: ella puede decir que solo bromeaba, él puede oír una acusación seria. Esa ambigüedad es donde arranca la discusión.',
  },
  {
    type: 'Comprensión',
    q: 'Was bot Tobias an, statt ihr das Handy zu geben?',
    opts: [
      'Die Nachrichten vor ihren Augen zu löschen',
      'Jede Frage zu beantworten, die sie stellen wollte',
      'Ihr nur die Fotos zu zeigen',
      'Ihr das Handy am nächsten Tag zu geben',
    ],
    correct: 1,
    explanation:
      'El narrador dice que «bot er an, jede Frage zu beantworten». Tobias separa dos cosas que Jana trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '"Eine Weigerung sei auch eine Antwort." Welche Annahme steckt hinter diesem Satz?',
    opts: [
      'Dass Menschen, die Nein sagen, meistens müde oder beschäftigt sind',
      'Dass ein Unschuldiger zugestimmt hätte — also ist das Nein selbst ein Beweis',
      'Dass Tobias versprochen hatte, sein Handy zu teilen',
      'Dass Ablehnen auf Deutsch immer unhöflich ist',
    ],
    correct: 1,
    explanation:
      'Jana trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Tobias sin ninguna forma posible de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Was wollte Jana nach eigener Aussage wirklich, als sie nach dem Handy fragte?',
    opts: [
      'Zwei Jahre Nachrichten lesen',
      'Herausfinden, wer die Benachrichtigung geschickt hatte',
      'Sehen, wie er es ihr freiwillig gibt — die Bitte war ein Test',
      'Seinen Standortverlauf prüfen',
    ],
    correct: 2,
    explanation:
      'Lo dice literalmente: «Ich wollte seine Nachrichten gar nicht lesen. Ich wollte sehen, wie er mir das Handy gibt.» Para Jana lo que importaba era el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '"Wenn du nichts zu verstecken hast, warum kostet es dich dann so viel?" — Wo liegt das Problem dieser rhetorischen Frage?',
    opts: [
      'Sie ist grammatikalisch falsch',
      'Sie setzt Weigerung mit Schuld gleich — keine Antwort kann Tobias entlasten',
      'Sie zeigt, dass Jana schon weiß, was auf dem Handy ist',
      'Sie beweist, dass Jana die Beziehung beenden will',
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Tobías nombra esa misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: 'Wie würdest du den Tonfall von Janas Sprachnachricht am besten beschreiben?',
    opts: [
      'Ruhig, sachlich und analytisch',
      'Formell und professionell',
      'Wütend und sarkastisch, aber eingerahmt von Selbstzweifel und Verletzung',
      'Durchgehend locker und humorvoll',
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real («Grenzen. Ach bitte.»), pero fíjate en el marco: abre con «sonst werde ich verrückt» y cierra con «der Teil, der mich fertigmacht». La rabia está montada encima del dolor.',
  },
  {
    type: 'Wortschatz',
    q: '"Grenzen. Ach bitte." — Was macht Jana mit dieser Antwort?',
    opts: [
      'Sie stimmt höflich zu, dass Grenzen wichtig sind',
      'Sie wiederholt sein eigenes Wort sarkastisch, um es als Ausrede abzutun',
      'Sie bittet ihn, ihr das Wort zu erklären',
      'Sie zitiert eine Therapeutin',
    ],
    correct: 1,
    explanation:
      'Devolver la palabra del otro como frase suelta, seguida de «ach bitte», es un recurso sarcástico habitual en alemán hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: 'Jana sagt: Angeblich habe ich "eine Grenze überschritten". Warum benutzt sie hier Anführungszeichen?',
    opts: [
      'Sie zitiert einen juristischen Text',
      'Sie zitiert seine Worte, um sich davon zu distanzieren und den Vorwurf zurückzuweisen',
      'Der Ausdruck verlangt im Deutschen immer Anführungszeichen',
      'Sie weiß nicht, wie man das übersetzt',
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. Al repetir la frase y luego decirla otra vez en seco —«Ich habe eine Grenze überschritten.»— deja claro que la acusación es de él, no suya, y que le parece absurda. El «angeblich» refuerza lo mismo.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Welchen Grund nennt Tobias für seine Weigerung?',
    opts: [
      'Auf dem Handy sind Nachrichten, die sie nicht sehen soll',
      'Das Handy gehört seiner Firma',
      'Nicht, dass er etwas versteckt — sondern dass ein einziges Ja eine dauerhafte Kontrollerwartung schaffen würde',
      'Er hatte sein Passwort vergessen',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante («auf diesem Handy ist nichts») y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Wortschatz',
    q: '"Diesen Monat das Handy. Nächsten Monat mein Standort." Welche Argumentationstechnik ist das?',
    opts: [
      'Dammbruchargument — ein kleines Zugeständnis wird als Anfang einer Kette dargestellt',
      'Ein wörtliches Zitat von Janas Forderung',
      'Eine Entschuldigung für sein Verhalten',
      'Eine sachliche Beschreibung dessen, was schon passiert ist',
    ],
    correct: 0,
    explanation:
      'El «Dammbruchargument» (pendiente resbaladiza) predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '"Gegen mich wird ermittelt für etwas, das jemand anderes getan hat." Was zeigt dieser Satz?',
    opts: [
      'Die Polizei ermittelt tatsächlich gegen Tobias',
      'Tobias glaubt, er zahle für das Verhalten von Janas Ex-Partner',
      'Tobias hat dasselbe getan wie ihr Ex-Partner',
      'Tobias will, dass Jana ihren Ex kontaktiert',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial («ermittelt», «verdächtig», «Beweis») recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '"Wenn Nein sagen dich schuldig macht, dann gibt es keine Antwort, die funktioniert." Worauf weist Tobias hin?',
    opts: [
      'Darauf, dass Jana ihm nie Fragen stellt',
      'Darauf, dass die Bitte gar nicht ehrlich bestanden werden kann — jede Reaktion bestätigt den Verdacht',
      'Darauf, dass er die Beziehung beenden will',
      'Darauf, dass er die Frage nicht verstanden hat',
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Jana — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: '"Vielleicht hätte ich den Moment besser lösen können. Vielleicht." Was bewirkt das wiederholte "vielleicht"?',
    opts: [
      'Volle Übernahme der Verantwortung',
      'Völlige Verwirrung darüber, was passiert ist',
      'Ein minimales Zugeständnis, das er sofort zurücknimmt — ein Satz in Entschuldigungsform, der nichts zugibt',
      'Echte Reue und ein Plan, sich zu ändern',
    ],
    correct: 2,
    explanation:
      'El primer «vielleicht» abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente («Aber ich entschuldige mich nicht…») lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Welches Detail wird von BEIDEN Versionen bestätigt?',
    opts: [
      'Tobias bekam eine Nachricht von einer anderen Frau',
      'Jana hatte einen Teil des Chats schon gelesen',
      'Tobias drehte sein Handy beim Abendessen um',
      'Tobias entschuldigte sich am nächsten Morgen',
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que ambos cuentan. Su significado está totalmente en disputa: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: 'Jana nennt die Bitte einen "Test". Tobias spricht davon, dass gegen ihn "ermittelt" wird. Was zeigt dieser Unterschied?',
    opts: [
      'Einer von beiden lügt absichtlich über den Abend',
      'Dieselbe Handlung bekommt entgegengesetzte Bedeutungen, je nachdem, wofür sie für jeden steht',
      'Keiner von beiden erinnert sich richtig',
      'Tobias benutzt einen gehobeneren Wortschatz als Jana',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Was ist die genaueste GRUNDursache dieses Konflikts?',
    opts: [
      'Tobias versteckt etwas auf seinem Handy',
      'Jana ist einfach ein eifersüchtiger Mensch',
      'Das Paar hatte nie geklärt, was Privatsphäre zwischen ihnen bedeutet — bis es geprüft wurde',
      'Der Ex-Partner von Jana',
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: 'Jana sagt, Tobias werfe ihr vor, "eine Grenze überschritten" zu haben. Tobias sagt, er entschuldige sich nicht dafür, "eine Grenze zu haben". Was zeigt dieses geteilte Bild?',
    opts: [
      'Beide zitieren denselben Film',
      'Beide benutzen dasselbe Grenz-Bild, um entgegengesetzte Positionen zu verteidigen — jeder hält sich für den, der eine Grenze schützt',
      '"Grenze" bedeutet in beiden Fällen etwas völlig anderes',
      'Es beweist, dass Tobias Janas Wortschatz kopiert',
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: '"Hätte er mir das Handy einfach gegeben, hätte ich es wahrscheinlich nicht mal aufgemacht." Was zeigt dieser Satz?',
    opts: [
      'Jana hat gelogen, als sie das Handy sehen wollte',
      'Jana wollte Beruhigung, keine Information — und das Einzige, was sie ihr gegeben hätte, war genau die Geste, die Tobias aus Prinzip verweigert',
      'Jana hatte das Handy schon vorher geöffnet',
      'Jana kennt sein Passwort nicht',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos obtuvieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'aufleuchten', meaning: 'que una pantalla se encienda sola al llegar una notificación' },
  { phrase: 'mit dem Bildschirm nach unten', meaning: 'boca abajo — acto literal, significado simbólico' },
  { phrase: 'halb scherzhaft', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: 'Dammbruchargument', meaning: 'pendiente resbaladiza: una concesión pequeña lleva a otras peores' },
  { phrase: 'Angeblich …', meaning: 'marca distancia: repites la acusación ajena sin asumirla' },
  { phrase: 'Vielleicht … Vielleicht.', meaning: 'no-disculpa: concede la forma y retira el fondo' },
];

export const dasGesperrteHandy: Historia = {
  slug: 'das-gesperrte-handy',
  lang: 'aleman',
  icon: '📵',
  color: '#be185d',
  level: 'B1–B2',
  title: 'Das gesperrte Handy',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: 'Das gesperrte Handy — comprensión en alemán B1–B2',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en alemán B1–B2.',
  intro:
    'Una pareja, un celular y dos versiones completamente distintas del mismo viernes por la noche. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en lo poco que pasó de verdad: nadie leyó un mensaje, nadie pilló a nadie. Toda la discusión está construida con detalles mínimos y el significado que cada uno les da. Vigila también las palabras del narrador: tampoco es neutral.',
  },
  voices: [
    {
      key: 'a',
      name: 'Jana',
      role: 'Freundin',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/aleman/das-gesperrte-handy/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Jana.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en alemán.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Tobias',
      role: 'Freund',
      color: '#7c3aed',
      audioSrc: '/audio/historias/aleman/das-gesperrte-handy/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Tobias repite un detalle que Jana también menciona: búscalo.',
      transcriptHint: 'compara la versión de Tobias con la de Jana: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Tobias.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en alemán.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Tobias.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Ahora sabes algo que ninguno de los dos sabe: has oído las dos versiones. Estas preguntas te piden ponerlas una al lado de la otra — qué detalles sobreviven en las dos, dónde tiene razón cada uno y dónde tener razón no es lo mismo que ser justo.',
    'Fíjate en las palabras que los dos eligen. Cuando dos personas usan la misma imagen para defender posiciones opuestas, ahí suele estar escondido el desacuerdo de verdad.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: '¿Negarse es lo mismo que esconder? ¿Y puede una petición ser razonable y aun así injusta?',
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia de los textos: palabras, frases y detalles concretos de cada versión. Eso es exactamente lo que pide un B2 en alemán.',
  },
  ui: 'es',
};

export default dasGesperrteHandy;
