import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'perfekt-haben-a2',
  order: '01',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Das Perfekt mit haben im Deutschen A2',
  shortTitle: 'Perfekt mit haben',
  metaTitle: 'Perfekt con haben — Alemán A2: Pasado Compuesto',
  description:
    'El Perfekt es el tiempo pasado más usado en el alemán oral y cotidiano. Se forma con haben conjugado + Partizip II al final de la oración. La mayoría de verbos transitivos e intransitivos estáticos usan haben como auxiliar.',
  lead: 'El pasado del alemán hablado: haben conjugado + Partizip II al final.',
  outcomes: [
    'Formar el Partizip II de verbos regulares e irregulares comunes',
    'Conjugar haben (habe/hast/hat/haben/habt/haben) como auxiliar',
    'Reconocer el Partizip II de verbos con prefijo separable',
    'Usar el Perfekt en conversaciones cotidianas sobre el pasado',
  ],

  guide: {
    goal: 'Usar haben + Partizip II para hablar del pasado en alemán oral.',
    model: 'Ich habe heute viel gearbeitet. / Er hat das Buch gelesen. / Wir haben Pizza gegessen.',
    formula: 'Sujeto + haben (conjugado) + ... + Partizip II',
    decisions: [
      'Verbos regulares: ge- + raíz + -(e)t → machen → gemacht, spielen → gespielt, arbeiten → gearbeitet',
      'Verbos irregulares frecuentes: sehen → gesehen, essen → gegessen, trinken → getrunken, schreiben → geschrieben',
      'Verbos con prefijo separable: trennbares Präfix + ge + raíz + t → aufmachen → aufgemacht, anrufen → angerufen',
      'haben propio: haben → gehabt / nehmen → genommen / geben → gegeben / lesen → gelesen',
      'El Partizip II siempre va al FINAL de la oración principal',
      'En preguntas: ¿Has...? → Hast du...? con Partizip II al final',
    ],
    table: [
      ['Persona', 'haben', 'Ejemplo'],
      ['ich', 'habe', 'Ich habe gespielt'],
      ['du', 'hast', 'Du hast gegessen'],
      ['er/sie/es', 'hat', 'Er hat geschrieben'],
      ['wir', 'haben', 'Wir haben gearbeitet'],
      ['ihr', 'habt', 'Ihr habt getrunken'],
      ['sie/Sie', 'haben', 'Sie haben gemacht'],
    ],
    mistakes: [
      'Colocar el Partizip II en posición 2: INCORRECTO "Ich habe gemacht es" → CORRECTO "Ich habe es gemacht"',
      'Olvidar el ge- en verbos regulares: INCORRECTO "Ich habe spielt" → CORRECTO "Ich habe gespielt"',
      'Confundir el prefijo separable: INCORRECTO "Ich habe geaufgemacht" → CORRECTO "Ich habe aufgemacht"',
    ],
  },

  seo: [
    {
      heading: 'Cómo se forma el Partizip II en alemán',
      paragraphs: [
        'El Partizip II (participio pasado) es la pieza clave del Perfekt. Para verbos regulares, la fórmula es: ge- + raíz verbal + -(e)t. Así machen da gemacht, spielen da gespielt, y arbeiten (con -e- para la pronunciación) da gearbeitet.',
        'Los verbos irregulares tienen formas propias que hay que memorizar: sehen → gesehen, essen → gegessen, trinken → getrunken, schreiben → geschrieben, lesen → gelesen, nehmen → genommen, geben → gegeben. Muchos siguen el patrón ge- + raíz modificada + -en.',
      ],
    },
    {
      heading: 'Verbos con prefijo separable y el Partizip II',
      paragraphs: [
        'En los verbos separables, el ge- se inserta entre el prefijo y la raíz del verbo: aufmachen → aufgemacht (no geaufmacht), anrufen → angerufen, einkaufen → eingekauft, aufräumen → aufgeräumt.',
        'Esta regla es consistente: siempre el prefijo va primero, luego ge-, luego la raíz. Es una de las diferencias más importantes respecto al inglés, donde no existe esta estructura.',
      ],
    },
    {
      heading: 'El Perfekt vs el Präteritum en alemán',
      paragraphs: [
        'En el alemán hablado, el Perfekt es el tiempo pasado universal. Se usa para hablar de lo que pasó hoy, ayer, hace años, en tu infancia — casi siempre Perfekt en la conversación oral.',
        'El Präteritum (simple past) se reserva principalmente para la narración escrita, cuentos, noticias y periódicos. Las excepciones son sein (war), haben (hatte) y los verbos modales, que prefieren el Präteritum incluso en el habla oral.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Perfekt con haben: posición del Partizip II al final y ge- en el participio.',
    graphicPrompt: 'Línea temporal con persona hablando sobre el pasado, señalando el Partizip II al final.',
    scene: [
      ['Ich habe gespielt', 'Yo he jugado / jugué'],
      ['Du hast gegessen', 'Tú has comido / comiste'],
      ['Er hat geschrieben', 'Él ha escrito / escribió'],
      ['Wir haben gearbeitet', 'Nosotros hemos trabajado'],
      ['Ihr habt getrunken', 'Vosotros habéis bebido'],
      ['Sie haben aufgeräumt', 'Ellos han ordenado'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ge- + raíz + -t', 'haben conjugado', 'Partizip II al final'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el Partizip II correcto para completar el Perfekt.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de lo que hiciste ayer',
            lines: [['', 'Ich habe gestern viel ___ . (machen)']],
            options: ['gemacht', 'gemachen', 'gemascht'],
            answer: 'gemacht',
            explain: '"machen" es regular: ge- + mach + t = gemacht.',
          },
          {
            scene: 'Contando lo que comiste',
            lines: [['', 'Was hast du zum Frühstück ___? (essen)']],
            options: ['gegessen', 'geesst', 'gessen', 'geessen'],
            answer: 'gegessen',
            explain: '"essen" es irregular: ge- + ess → gess → gegessen.',
          },
          {
            scene: 'Hablando de trabajo',
            lines: [['', 'Wir haben heute lange ___. (arbeiten)']],
            options: ['gearbeitet', 'gearbeit', 'gearbeite', 'arbeitet'],
            answer: 'gearbeitet',
            explain: '"arbeiten" termina en -t, por eso se añade -e-: gearbeitet.',
          },
          {
            scene: 'Comentando sobre un libro',
            lines: [['', 'Er hat das Buch ___. (lesen)']],
            options: ['gelesen', 'gelest', 'gelesst', 'geliest'],
            answer: 'gelesen',
            explain: '"lesen" es irregular: ge- + les + -en = gelesen.',
          },
          {
            scene: 'Preguntando sobre el partido',
            lines: [['', 'Habt ihr Fußball ___? (spielen)']],
            options: ['gespielt', 'gespiel', 'gspielt', 'spielget'],
            answer: 'gespielt',
            explain: '"spielen" es regular: ge- + spiel + t = gespielt.',
          },
          {
            scene: 'Hablando de una llamada telefónica',
            lines: [['', 'Ich habe meine Mutter ___. (anrufen)']],
            options: ['angerufen', 'gerufen', 'anruft', 'geruft'],
            answer: 'angerufen',
            explain: '"anrufen" es separable: an + ge + rufen = angerufen.',
          },
          {
            scene: 'Describiendo el fin de semana',
            lines: [['', 'Sie haben das Fenster ___. (aufmachen)']],
            options: ['aufgemacht', 'geaufmacht', 'aufmachte', 'gemacht auf'],
            answer: 'aufgemacht',
            explain: '"aufmachen" separable: auf + ge + mach + t = aufgemacht.',
          },
          {
            scene: 'Preguntando por las compras',
            lines: [['', 'Hast du Milch ___? (kaufen)']],
            options: ['gekauft', 'gekauen', 'gekaufen', 'kauft'],
            answer: 'gekauft',
            explain: '"kaufen" es regular: ge- + kauf + t = gekauft.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el auxiliar haben y el Partizip II.',
        type: 'dual',
        items: [
          {
            scene: 'Contando lo que pasó en el trabajo',
            lines: [['', 'Ich [[0]] heute sehr viel [[1]]. (arbeiten)']],
            blanks: [
              { options: ['habe', 'haben', 'hat', 'hast'], answer: 'habe', explain: 'Primera persona singular: ich habe.' },
              { options: ['gearbeitet', 'gearbeit', 'arbeitet', 'gearbeite'], answer: 'gearbeitet', explain: '"arbeiten" → gearbeitet (con -e- de apoyo).' },
            ],
          },
          {
            scene: 'Preguntando por la cena',
            lines: [['', 'Was [[0]] du gestern Abend [[1]]? (kochen)']],
            blanks: [
              { options: ['hast', 'habe', 'hat', 'habt'], answer: 'hast', explain: 'Segunda persona singular: du hast.' },
              { options: ['gekocht', 'gekochen', 'kochte', 'gekokt'], answer: 'gekocht', explain: '"kochen" regular: ge- + koch + t = gekocht.' },
            ],
          },
          {
            scene: 'Hablando de una película',
            lines: [['', 'Wir [[0]] einen guten Film [[1]]. (sehen)']],
            blanks: [
              { options: ['haben', 'habe', 'habt', 'hat'], answer: 'haben', explain: 'Primera persona plural: wir haben.' },
              { options: ['gesehen', 'gesieht', 'sah', 'geseht'], answer: 'gesehen', explain: '"sehen" irregular: ge- + seh + -en = gesehen.' },
            ],
          },
          {
            scene: 'Sobre el fin de semana',
            lines: [['', 'Er [[0]] das Zimmer [[1]]. (aufräumen)']],
            blanks: [
              { options: ['hat', 'habe', 'haben', 'hast'], answer: 'hat', explain: 'Tercera persona singular: er hat.' },
              { options: ['aufgeräumt', 'geaufräumt', 'aufgeräumen', 'geräumt auf'], answer: 'aufgeräumt', explain: '"aufräumen" separable: auf + ge + räum + t = aufgeräumt.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma correcta del Perfekt con haben.',
        type: 'guidedText',
        scene: 'Laura cuenta su día de ayer.',
        text: 'Gestern [[0]] ich um sieben Uhr [[1]] (aufstehen, separable). Dann [[2]] ich Kaffee [[3]] (trinken). Ich [[4]] meine E-Mails [[5]] (lesen) und danach [[6]] ich meine Kollegen [[7]] (anrufen). Am Abend [[8]] wir zusammen [[9]] (kochen).',
        blanks: [
          { options: ['habe', 'hat', 'haben', 'hast'], answer: 'habe', explain: 'ich → habe (primera persona singular).' },
          { options: ['aufgestanden', 'gestanden auf', 'aufstand', 'geaufstanden'], answer: 'aufgestanden', explain: '"aufstehen" separable + irregular: auf + ge + standen = aufgestanden.' },
          { options: ['habe', 'hat', 'haben', 'hast'], answer: 'habe', explain: 'ich → habe.' },
          { options: ['getrunken', 'getrinkt', 'getrunket', 'trunk'], answer: 'getrunken', explain: '"trinken" irregular: ge- + trunk + -en = getrunken.' },
          { options: ['habe', 'hat', 'haben', 'hast'], answer: 'habe', explain: 'ich → habe.' },
          { options: ['gelesen', 'gelesst', 'gelest', 'lesen'], answer: 'gelesen', explain: '"lesen" irregular: ge- + les + -en = gelesen.' },
          { options: ['habe', 'hat', 'haben', 'hast'], answer: 'habe', explain: 'ich → habe.' },
          { options: ['angerufen', 'gerufen an', 'angeruft', 'gerufen'], answer: 'angerufen', explain: '"anrufen" separable: an + ge + rufen = angerufen.' },
          { options: ['haben', 'habe', 'hat', 'habt'], answer: 'haben', explain: 'wir → haben (primera persona plural).' },
          { options: ['gekocht', 'gekochen', 'kochen', 'gkocht'], answer: 'gekocht', explain: '"kochen" regular: ge- + koch + t = gekocht.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Completa libremente con el Partizip II correcto.',
        type: 'freeText',
        scene: 'Max describe su fin de semana.',
        text: 'Am Wochenende [[0]] ich viel [[1]] (schreiben). Ich [[2]] auch ein Buch [[3]] (kaufen). Abends [[4]] wir Freunde [[5]] (einladen).',
        blanks: [
          { answer: 'habe', accepted: ['habe'], explain: 'ich → habe.' },
          { answer: 'geschrieben', accepted: ['geschrieben'], explain: '"schreiben" irregular: ge- + schrieb + -en = geschrieben.' },
          { answer: 'habe', accepted: ['habe'], explain: 'ich → habe.' },
          { answer: 'gekauft', accepted: ['gekauft'], explain: '"kaufen" regular: ge- + kauf + t = gekauft.' },
          { answer: 'haben', accepted: ['haben'], explain: 'wir → haben.' },
          { answer: 'eingeladen', accepted: ['eingeladen'], explain: '"einladen" separable + irregular: ein + ge + laden = eingeladen.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas en Perfekt usando haben.',
        type: 'write',
        items: [
          {
            scene: 'Contando tu desayuno de hoy',
            prompt: 'Di qué has desayunado hoy usando el Perfekt (Ich habe...).',
            answer: 'Ich habe heute Brot und Kaffee gegessen.',
            accepted: ['Ich habe', 'habe ... gegessen', 'habe ... getrunken'],
            explain: 'Ejemplo: Ich habe heute Müsli gegessen und Tee getrunken.',
          },
          {
            scene: 'Describiendo el fin de semana',
            prompt: 'Di dos cosas que hiciste el fin de semana pasado.',
            answer: 'Am Wochenende habe ich Fußball gespielt und einen Film gesehen.',
            accepted: ['habe ich', 'habe ... gespielt', 'habe ... gesehen'],
            explain: 'Recuerda: haben conjugado en posición 2 (o 1 en preguntas), Partizip II al final.',
          },
          {
            scene: 'Llamadas y mensajes',
            prompt: 'Di que llamaste a alguien y después escribiste un mensaje.',
            answer: 'Ich habe meine Mutter angerufen und dann eine Nachricht geschrieben.',
            accepted: ['angerufen', 'geschrieben', 'habe ... angerufen'],
            explain: '"anrufen" → angerufen (separable); "schreiben" → geschrieben (irregular).',
          },
          {
            scene: 'Lo que hizo tu amigo/a',
            prompt: 'Describe tres cosas que hizo tu amigo/a ayer (Er/Sie hat...).',
            answer: 'Er hat gestern Musik gehört, Sport gemacht und ein Buch gelesen.',
            accepted: ['hat ... gemacht', 'hat ... gelesen', 'hat ... gehört'],
            explain: 'Tercera persona singular: hat. Partizip II siempre al final.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe un párrafo corto sobre lo que hiciste la semana pasada.',
        type: 'write',
        items: [
          {
            scene: 'Tu semana pasada',
            prompt: 'Escribe 2-3 oraciones sobre lo que hiciste (Perfekt con haben).',
            answer: 'Letzte Woche habe ich viel gearbeitet. Ich habe auch Freunde getroffen und Pizza gegessen.',
            accepted: ['habe ich', 'habe ... gearbeitet', 'habe ... getroffen'],
            explain: 'Usa habe/hat/haben según la persona. Partizip II siempre al final de la cláusula.',
          },
          {
            scene: 'Una pregunta sobre el pasado',
            prompt: 'Haz una pregunta a tu compañero/a sobre lo que hizo el fin de semana.',
            answer: 'Was hast du am Wochenende gemacht?',
            accepted: ['Hast du', 'Was hast du', 'Wo hast du'],
            explain: 'Preguntas con haben: verbo auxiliar en posición 1, Partizip II al final.',
          },
          {
            scene: 'Respuesta negativa',
            prompt: 'Di algo que NO has hecho esta semana usando "nicht" o "kein".',
            answer: 'Ich habe diese Woche nicht Sport gemacht.',
            accepted: ['nicht', 'kein', 'habe nicht'],
            explain: '"nicht" va antes del Partizip II o antes del elemento negado: Ich habe nicht gearbeitet.',
          },
        ],
      },
    ],
  },
}

export default topic
