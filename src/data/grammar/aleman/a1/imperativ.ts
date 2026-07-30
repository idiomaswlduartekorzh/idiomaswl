import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperativ',
  order: '17',
  color: '#c9a900',
  category: 'Satzbau',
  level: 'A1',
  title: 'Imperativ im Deutschen A1',
  shortTitle: 'Imperativ',
  metaTitle: 'Imperativo alemán A1 — du, ihr, Sie: Komm! Kommt! Kommen Sie!',
  description:
    'El imperativo alemán tiene tres formas según a quién hablas: du (informal singular), ihr (informal plural) y Sie (formal). La forma du se basa en el radical sin terminación; la forma ihr es igual al presente de ihr; la forma Sie invierte infinitivo y pronombre. Irregular: sein → sei / seid / seien Sie.',
  lead: 'En alemán mandas de tres maneras: Komm! (a un amigo), Kommt! (a un grupo), Kommen Sie! (formalmente). Y el verbo irregular más importante: Sei pünktlich! / Seid ruhig! / Seien Sie bitte leise!',
  outcomes: [
    'Formas el imperativo du (radical), ihr (=presente ihr) y Sie (infinitivo + Sie)',
    'Aplicas el imperativo del verbo sein (sei/seid/seien Sie)',
    'Usas verbos con cambio vocálico e→i en imperativo du (sprich, lies, gib)',
  ],

  guide: {
    goal: 'Dar instrucciones, órdenes y peticiones en las tres formas del imperativo alemán.',
    model: 'Komm her! / Kommt her! / Kommen Sie her! / Sei ruhig! / Seid ruhig! / Seien Sie ruhig!',
    formula: 'du → Stamm (sin -st) | ihr → Präsens ihr-Form | Sie → Infinitiv + Sie',
    decisions: [
      'du (informal singular): radical del verbo, sin -st, sin pronombre: Lern! / Mach! / Komm! (la -e final es opcional: Lerne!/Mach!)',
      'ihr (informal plural): igual que el presente ihr, sin pronombre: Lernt! / Macht! / Kommt!',
      'Sie (formal singular y plural): infinitivo + Sie (pronombre siempre presente): Lernen Sie! / Machen Sie! / Kommen Sie!',
      'sein es irregular: du → sei (Sei nett!), ihr → seid (Seid ruhig!), Sie → seien Sie (Seien Sie bitte leise!)',
      'Verbos e→i en du: sprechen → sprich!, lesen → lies!, geben → gib!, essen → iss!, helfen → hilf!',
      'Negativo: nicht al final o antes del elemento negado: Komm nicht zu spät! / Mach das nicht!',
    ],
    table: [
      ['Person', 'Endung/Regel', 'Beispiel (kommen / machen)'],
      ['du (informal sg)', 'Stamm, sin -st, sin pronombre', 'Komm! / Mach!'],
      ['ihr (informal pl)', '= Präsens ihr-Form', 'Kommt! / Macht!'],
      ['Sie (formal)', 'Infinitiv + Sie', 'Kommen Sie! / Machen Sie!'],
      ['du — sein', 'sei (irregular)', 'Sei pünktlich!'],
      ['ihr — sein', 'seid', 'Seid bitte ruhig!'],
      ['Sie — sein', 'seien Sie', 'Seien Sie so nett!'],
    ],
    mistakes: [
      '"Du komm!" ❌ — en imperativo du no se usa el pronombre: "Komm!" ✓',
      '"Kommen!" sin Sie ❌ — en Sie siempre aparece el pronombre: "Kommen Sie!" ✓',
      '"Sprecht langsam" para du ❌ — "sprecht" es ihr; para du: "Sprich langsam!" ✓ (e→i)',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el imperativo en alemán?',
      paragraphs: [
        'El imperativo del alemán tiene tres formas claramente distintas según el contexto social. Para una persona de confianza (amigo, familiar, niño) usamos "du": Komm mal her! / Lern Deutsch! Para un grupo informal usamos "ihr": Kommt alle rein! / Macht die Bücher auf! Para una o varias personas en contexto formal usamos "Sie": Kommen Sie bitte herein! / Nehmen Sie Platz!',
        'La diferencia fundamental entre du e ihr es solo la terminación: "Komm!" (du) vs. "Kommt!" (ihr). La diferencia con Sie es estructural: el pronombre siempre aparece y el verbo va en forma de infinitivo-con-conjugación formal.',
      ],
    },
    {
      heading: '¿Cómo es el imperativo con du en alemán?',
      paragraphs: [
        'Para formar el imperativo du, se toma el radical (Stamm) del verbo y se elimina la terminación -st de la forma du del presente: wohnst → Wohn! / lernst → Lern! / machst → Mach! La -e final (Lerne!, Mache!) es opcional en el alemán moderno hablado, aunque en registros formales escritos puede aparecer.',
        'Excepción importante: los verbos con cambio e→i mantienen ese cambio en el imperativo du: sprechen (du sprichst) → Sprich! / lesen (du liest) → Lies! / geben (du gibst) → Gib! / essen (du isst) → Iss! Estos verbos NO toman -e al final.',
      ],
    },
    {
      heading: '¿Cómo es el imperativo del verbo sein?',
      paragraphs: [
        '"Sein" (ser/estar) tiene formas completamente irregulares en imperativo: du → sei (Sei ehrlich! / Sei bitte ruhig!), ihr → seid (Seid pünktlich! / Seid nicht so laut!), Sie → seien Sie (Seien Sie so nett... / Seien Sie bitte leise!). Estas formas son muy frecuentes en instrucciones cotidianas y hay que memorizarlas.',
        'También hay que memorizar las combinaciones con "bitte" para expresar cortesía: Kommen Sie bitte herein. / Sei bitte ruhig. / Warten Sie bitte einen Moment. El "bitte" puede ir al principio o al final de la oración imperativa.',
      ],
    },
    {
      heading: 'El imperativo en el día a día',
      paragraphs: [
        'El imperativo es esencial para dar instrucciones en clase (Öffnet das Buch auf Seite 10! / Hört zu! / Schreibt das auf!), en el trabajo (Rufen Sie mich an! / Schicken Sie mir die Datei!), en la vida cotidiana (Komm her! / Mach das Licht an! / Hör auf damit!) y para dar direcciones (Gehen Sie geradeaus! / Nehmen Sie links!).',
        'Una forma muy suavizada del imperativo en alemán usa "bitte" y el infinitivo: "Bitte kommen!" o bien construye con "Könnten Sie...?" (¿Podría usted...?) para mayor cortesía.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Imperativo alemán: tres formas (du/ihr/Sie) con sein irregular y cambio e→i.',
    graphicPrompt: 'Tabla de las tres formas del imperativo con ejemplos de kommen, machen y sein.',
    scene: [
      ['Komm! (du)', 'Komm mal her, Carlos! — ¡Ven aquí, Carlos!'],
      ['Kommt! (ihr)', 'Kommt alle rein! — ¡Entrad todos!'],
      ['Kommen Sie! (Sie)', 'Kommen Sie bitte herein! — ¡Por favor, entre!'],
      ['Sei! (du — sein)', 'Sei nicht so laut! — ¡No seas tan ruidoso!'],
      ['Seid! (ihr — sein)', 'Seid bitte pünktlich! — ¡Por favor, sed puntuales!'],
      ['Sprich! (e→i)', 'Sprich langsam, bitte! — ¡Habla despacio, por favor!'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['du=radical sin pronombre', 'ihr=presente ihr', 'Sie=infinitivo+Sie', 'sein irregular: sei/seid/seien Sie'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del imperativo según la situación.',
        type: 'choice',
        items: [
          {
            scene: 'Lía le dice a un estudiante (informal, solo) que entre',
            lines: [['Lía', '___ herein, Carlos!']],
            options: ['Komm', 'Kommt', 'Kommen Sie', 'Kommst'],
            answer: 'Komm',
            explain: 'A un estudiante de confianza (du): imperativo sin pronombre, radical. Kommen → Komm!',
          },
          {
            scene: 'Lía le dice a toda la clase que abran el libro',
            lines: [['Lía', '___ das Buch auf!']],
            options: ['Öffnet', 'Öffne', 'Öffnen Sie', 'Öffnest'],
            answer: 'Öffnet',
            explain: 'A la clase (ihr, plural informal): imperativo ihr-Form. Öffnen → ihr öffnet → ¡Öffnet!',
          },
          {
            scene: 'Gael recibe a un cliente formal por primera vez',
            lines: [['Gael', '___ bitte Platz!']],
            options: ['Nehmen Sie', 'Nehmt', 'Nimm', 'Nehmen'],
            answer: 'Nehmen Sie',
            explain: 'A un cliente (Sie, formal): infinitivo + Sie. Nehmen Sie!',
          },
          {
            scene: 'Gael le pide a su amigo que no llegue tarde',
            lines: [['Gael', '___ nicht zu spät!']],
            options: ['Komm', 'Kommt', 'Kommen Sie', 'Kommst'],
            answer: 'Komm',
            explain: 'A un amigo (du informal singular): "Komm!" — solo radical, sin pronombre.',
          },
          {
            scene: 'Lía le pide a Carlos que hable más despacio (sprechen: e→i)',
            lines: [['Lía', '___ bitte langsamer!']],
            options: ['Sprich', 'Sprecht', 'Sprechen Sie', 'Sprichst'],
            answer: 'Sprich',
            explain: '"Sprechen" tiene cambio e→i en du: sprichst → Sprich! (no "Sprech!").',
          },
          {
            scene: 'Gael le pide a todo el grupo que sea puntual',
            lines: [['Gael', '___ bitte pünktlich!']],
            options: ['Seid', 'Sei', 'Seien Sie', 'Seid ihr'],
            answer: 'Seid',
            explain: '"Sein" irregular en ihr: seid. Seid bitte pünktlich! — ¡Por favor, sed puntuales!',
          },
          {
            scene: 'Lina le pide a su amiga que lea el texto (lesen: e→i)',
            lines: [['Lina', '___ den Text laut!']],
            options: ['Lies', 'Lest', 'Lesen Sie', 'Liest'],
            answer: 'Lies',
            explain: '"Lesen" tiene cambio e→i en du: liest → Lies! (no "Les!").',
          },
          {
            scene: 'Un cliente formal llega a la academia, Gael lo saluda',
            lines: [['Gael', '___ bitte ruhig, gleich komme ich.']],
            options: ['Seien Sie', 'Sei', 'Seid', 'Sein Sie'],
            answer: 'Seien Sie',
            explain: '"Sein" formal (Sie): seien Sie. Seien Sie bitte ruhig. — Por favor, esté tranquilo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Forma del imperativo',
        tag: '2 espacios',
        intro: 'Elige la forma del imperativo y completa la instrucción.',
        type: 'dual',
        items: [
          {
            scene: 'Lía da instrucciones a la clase entera',
            lines: [['Lía', '[[0]] das Buch auf Seite 15 [[1]]! (aufmachen, ihr)']],
            blanks: [
              { options: ['Macht', 'Mach', 'Machen Sie', 'Macht ihr'], answer: 'Macht', explain: 'Imperativo ihr del verbo "aufmachen": ihr macht → Macht!' },
              { options: ['auf', 'an', 'aus', 'zu'], answer: 'auf', explain: '"Aufmachen" es separable: prefijo "auf" al final.' },
            ],
          },
          {
            scene: 'Gael le pide a Carlos (informal) que lo llame',
            lines: [['Gael', '[[0]] mich bitte [[1]]! (anrufen, du)']],
            blanks: [
              { options: ['Ruf', 'Ruft', 'Rufen Sie', 'Rufst'], answer: 'Ruf', explain: 'Imperativo du de "anrufen": radical "ruf", sin pronombre.' },
              { options: ['an', 'auf', 'aus', 'mit'], answer: 'an', explain: '"Anrufen" separable: prefijo "an" al final.' },
            ],
          },
          {
            scene: 'Lía le dice formalmente a un padre que espere',
            lines: [['Lía', '[[0]] Sie bitte einen [[1]]! (warten)']],
            blanks: [
              { options: ['Warten', 'Warte', 'Wartet', 'Wartst'], answer: 'Warten', explain: 'Imperativo Sie: infinitivo "Warten" + Sie.' },
              { options: ['Moment', 'Morgen', 'Monat', 'Mittag'], answer: 'Moment', explain: '"Warten Sie einen Moment" = Espere un momento, por favor.' },
            ],
          },
          {
            scene: 'Ana le pide a un amigo que sea más tranquilo',
            lines: [['Ana', '[[0]] bitte [[1]]! Du bist so laut.']],
            blanks: [
              { options: ['Sei', 'Seid', 'Seien Sie', 'Bist'], answer: 'Sei', explain: '"Sein" imperativo du → sei (irregular).' },
              { options: ['ruhiger', 'ruhig', 'laut', 'nett'], answer: 'ruhiger', explain: '"Ruhiger" = más tranquilo/a. Sei ruhiger! — ¡Sé más tranquilo!' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del imperativo según la persona indicada.',
        type: 'guidedText',
        scene: 'Lía da instrucciones durante la primera clase del curso de alemán.',
        text: '[[0]] (setzen, ihr) bitte! [[1]] (nehmen, ihr) eure Hefte heraus. Heute lernen wir Modalverben. Carlos, [[2]] (lesen, du/e→i) bitte Satz 1. Gut! [[3]] (sprechen, ihr) alle zusammen! Und [[4]] (sein, ihr) bitte ruhig, wenn ein Kollege liest. Frau García, [[5]] (wiederholen, Sie) die Frage bitte. [[6]] (schreiben, alle/ihr) die Antwort in euer Heft.',
        blanks: [
          { options: ['Setzt', 'Setz', 'Setzen Sie', 'Setzt euch'], answer: 'Setzt', explain: 'Imperativo ihr: "ihr setzt" → Setzt! (setzt euch = sentaos).' },
          { options: ['Nehmt', 'Nimm', 'Nehmen Sie', 'Nimmst'], answer: 'Nehmt', explain: 'Imperativo ihr de "nehmen": nehmt.' },
          { options: ['Lies', 'Lest', 'Lesen Sie', 'Liest'], answer: 'Lies', explain: '"Lesen" e→i en du: du liest → Lies! (Carlos = du informal).' },
          { options: ['Sprecht', 'Sprich', 'Sprechen Sie', 'Sprecht ihr'], answer: 'Sprecht', explain: 'Imperativo ihr de "sprechen": ihr sprecht → Sprecht!' },
          { options: ['Seid', 'Sei', 'Seien Sie', 'Seid ihr'], answer: 'Seid', explain: '"Sein" imperativo ihr: seid (irregular).' },
          { options: ['Wiederholen Sie', 'Wiederhole', 'Wiederholt', 'Wiederholen'], answer: 'Wiederholen Sie', explain: 'Imperativo Sie (Frau García = formal): infinitivo + Sie.' },
          { options: ['Schreibt', 'Schreib', 'Schreiben Sie', 'Schreibst'], answer: 'Schreibt', explain: 'Imperativo ihr (todos): ihr schreibt → Schreibt!' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del imperativo de memoria.',
        type: 'freeText',
        scene: 'Gael le da instrucciones a Marco (amigo, informal).',
        text: '[[0]] (kommen) heute um 18 Uhr! [[1]] (mitbringen) dein Wörterbuch. [[2]] (sein) pünktlich — du weißt, ich hasse Verspätungen. [[3]] (lesen) noch mal Kapitel 3, und [[4]] (schreiben) die neuen Vokabeln auf.',
        blanks: [
          { answer: 'Komm', accepted: ['Komm', 'Kommen'], explain: 'Imperativo du de "kommen": Komm! (sin pronombre).' },
          { answer: 'Bring', accepted: ['Bring', 'Bringe', 'Bring mit'], explain: 'Imperativo du de "mitbringen": Bring mit! (separable).' },
          { answer: 'Sei', accepted: ['Sei'], explain: '"Sein" imperativo du → sei (irregular). Sei pünktlich!' },
          { answer: 'Lies', accepted: ['Lies'], explain: '"Lesen" e→i: du liest → Lies! (no "Les!").' },
          { answer: 'Schreib', accepted: ['Schreib', 'Schreibe'], explain: 'Imperativo du de "schreiben": Schreib! (sin pronombre, -e opcional).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe instrucciones completas en imperativo según la situación.',
        type: 'write',
        items: [
          {
            scene: 'Eres el profesor y das instrucciones a toda la clase',
            prompt: 'Da 3 instrucciones a la clase en imperativo ihr (abrir el libro, escuchar, escribir).',
            answer: 'Öffnet das Buch! Hört zu! Schreibt die Antworten!',
            accepted: ['öffnet', 'macht auf', 'hört', 'schreibt', 'lest', 'sprecht', 'seid'],
            explain: 'Imperativo ihr: ihr öffnet → Öffnet! / ihr hört → Hört! / ihr schreibt → Schreibt!',
          },
          {
            scene: 'Le das consejos a un amigo que empieza a aprender alemán',
            prompt: 'Da 3 consejos en imperativo du: estudia cada día, lee textos alemanes, habla sin miedo.',
            answer: 'Lern jeden Tag! Lies deutsche Texte! Sprich ohne Angst!',
            accepted: ['lern', 'lerne', 'lies', 'sprich', 'üb', 'übe', 'hör', 'schreib'],
            explain: 'Du imperativo: radical sin pronombre. Lesen e→i: Lies! Sprechen e→i: Sprich!',
          },
          {
            scene: 'Un padre formal viene a hablar con Lía. Ella lo atiende',
            prompt: 'Escribe 3 frases en imperativo Sie: que entre, que tome asiento, que espere un momento.',
            answer: 'Kommen Sie bitte herein! Nehmen Sie Platz! Warten Sie bitte einen Moment!',
            accepted: ['kommen sie', 'nehmen sie', 'warten sie', 'setzen sie', 'sprechen sie', 'seien sie'],
            explain: 'Imperativo Sie: infinitivo + Sie (con pronombre siempre). Kommen Sie / Nehmen Sie / Warten Sie.',
          },
          {
            scene: 'Usando el verbo "sein" en las tres formas',
            prompt: 'Escribe una instrucción con "sein" para du, otra para ihr y otra para Sie.',
            answer: 'Sei pünktlich! Seid ruhig! Seien Sie bitte geduldig!',
            accepted: ['sei ', 'seid ', 'seien sie'],
            explain: '"Sein" irregular: du → sei, ihr → seid, Sie → seien Sie. Tres formas únicas que hay que memorizar.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe un conjunto de instrucciones para una situación real.',
        type: 'write',
        items: [
          {
            scene: 'Eres profesor/a sustituto/a de Lía por un día',
            prompt: 'Escribe 5 instrucciones para la clase usando imperativo ihr. Usa verbos variados.',
            answer: 'Öffnet das Buch auf Seite 5! Lest den Dialog! Schreibt die Antworten! Sprecht mit eurem Partner! Seid bitte ruhig!',
            accepted: ['öffnet', 'lest', 'schreibt', 'sprecht', 'seid', 'hört', 'macht', 'wiederholt', 'nehmt'],
            explain: 'Imperativo ihr: ihr öffnet → Öffnet. ihr lest → Lest. ihr schreibt → Schreibt. ihr seid → Seid.',
          },
          {
            scene: 'Le escribes un WhatsApp a tu amigo con planes para el fin de semana',
            prompt: 'Escribe 4 instrucciones/sugerencias en imperativo du para organizar una salida.',
            answer: 'Komm um 18 Uhr zu mir! Bring das Essen mit! Ruf mich vorher an! Sei pünktlich!',
            accepted: ['komm', 'bring', 'ruf … an', 'sei', 'lern', 'kauf', 'geh', 'mach'],
            explain: 'Du imperativo para mensajes informales a amigos. Verbos separables: prefijo al final. Sein → sei.',
          },
          {
            scene: 'Eres recepcionista en WeLearn y atienes a un cliente VIP',
            prompt: 'Escribe 3 frases formales en imperativo Sie para atender al cliente.',
            answer: 'Kommen Sie bitte herein! Nehmen Sie Platz! Warten Sie bitte einen Moment, ich rufe Frau Korzh an.',
            accepted: ['kommen sie', 'nehmen sie', 'warten sie', 'setzen sie', 'seien sie', 'sprechen sie', 'sagen sie'],
            explain: 'Sie imperativo: siempre infinitivo + Sie. "Bitte" suaviza la instrucción. Verbos separables: rufe...an.',
          },
        ],
      },
    ],
  },
}

export default topic
