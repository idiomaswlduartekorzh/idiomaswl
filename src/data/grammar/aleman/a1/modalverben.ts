import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'modalverben',
  order: '14',
  color: '#c9a900',
  category: 'Verben',
  level: 'A1',
  title: 'Modalverben im Deutschen A1',
  shortTitle: 'Modalverben',
  metaTitle: 'Verbos modales alemán A1 — können, müssen, wollen, mögen, dürfen, sollen',
  description:
    'Los verbos modales alemanes (können, müssen, wollen, mögen/möchten, dürfen, sollen) expresan posibilidad, obligación, deseo y permiso. Su característica más importante: el verbo principal va en infinitivo AL FINAL de la frase. Además, las formas de ich y er/sie/es son idénticas y no llevan terminación.',
  lead: 'Los modales son los verbos más útiles del alemán. La clave: el infinitivo siempre va AL FINAL. Ich kann Deutsch sprechen. / Du musst jetzt lernen.',
  outcomes: [
    'Conjugas los 6 verbos modales en presente',
    'Colocas el infinitivo al final de la frase correctamente',
    'Distingues können (poder), müssen (deber), wollen (querer), dürfen (permiso), sollen (se supone) y möchten (quisiera)',
  ],

  guide: {
    goal: 'Usar los 6 verbos modales alemanes en frases completas con infinitivo al final.',
    model: 'Ich kann Gitarre spielen. / Du musst jetzt lernen. / Wir wollen nach Berlin fahren.',
    formula: 'Sujeto + Modal (pos. 2) + ... + Infinitivo (AL FINAL)',
    decisions: [
      'können (poder/saber hacer): Ich kann schwimmen. / Kannst du Deutsch?',
      'müssen (tener que/deber): Ich muss arbeiten. / Du musst schlafen.',
      'wollen (querer/tener intención): Ich will Deutsch lernen. / Wir wollen reisen.',
      'möchten (quisiera/me gustaría — más educado que wollen): Ich möchte Kaffee. / Ich möchte Deutsch lernen.',
      'dürfen (poder con permiso): Darf ich rauchen? / Hier darf man nicht parken.',
      'sollen (se supone que/deber moral externo): Du sollst pünktlich sein. / Er soll anrufen.',
      'ich y er/sie/es son IGUALES y sin terminación: ich kann = er kann; ich muss = er muss',
    ],
    table: [
      ['Modal', 'ich / er', 'Ejemplo'],
      ['können', 'kann', 'Ich kann Deutsch sprechen.'],
      ['müssen', 'muss', 'Er muss jetzt gehen.'],
      ['wollen', 'will', 'Ich will reisen.'],
      ['möchten', 'möchte', 'Sie möchte Tee trinken.'],
      ['dürfen', 'darf', 'Er darf hier parken.'],
      ['sollen', 'soll', 'Du sollst anrufen.'],
    ],
    mistakes: [
      '"Ich kann sprechen Deutsch" ❌ — el infinitivo va AL FINAL: "Ich kann Deutsch sprechen" ✓',
      '"Ich kanne" / "er musst" ❌ — ich y er/sie/es no llevan terminación: "ich kann", "er muss" ✓',
      '"Ich will lernen Deutsch" ❌ — infinitivo siempre al final: "Ich will Deutsch lernen" ✓',
    ],
  },

  seo: [
    {
      heading: 'Los verbos modales: la clave de la expresión en alemán',
      paragraphs: [
        'Los 6 verbos modales del alemán (können, müssen, wollen, mögen/möchten, dürfen, sollen) son fundamentales desde el nivel A1. Con ellos puedes expresar si algo es posible, necesario, deseado o permitido. Dominarlos transforma tu capacidad de comunicación de inmediato.',
        'La regla más importante: en una frase con modal, el verbo principal aparece en infinitivo y va siempre al FINAL. Ich muss heute lernen (no "ich muss lernen heute"). Esta posición final del infinitivo es uno de los rasgos más característicos del alemán.',
      ],
    },
    {
      heading: 'Conjugación irregular: ich = er/sie/es',
      paragraphs: [
        'Los modales son irregulares de una manera especial: las formas de ich y er/sie/es son idénticas y no llevan terminación. Ich kann = er kann. Ich muss = sie muss. Ich will = es will. Esto los diferencia de los verbos regulares donde er/sie/es lleva -t.',
        'La conjugación completa de können como modelo: ich kann, du kannst, er/sie/es kann, wir können, ihr könnt, sie/Sie können. Nota que wir/sie/Sie recuperan el infinitivo (können), igual que los verbos regulares.',
      ],
    },
    {
      heading: 'Wollen vs. möchten: querer con estilo',
      paragraphs: [
        '"Wollen" expresa una voluntad firme o intención: Ich will Arzt werden (Quiero ser médico). "Möchten" es la forma subjuntiva de mögen y expresa un deseo más educado o un querer más suave: Ich möchte bitte einen Kaffee (Quisiera un café, por favor).',
        'En contextos cotidianos de A1 — pedir en una tienda, cafetería, restaurante — "möchten" es siempre la opción más apropiada. "Ich will einen Kaffee" suena brusco; "Ich möchte einen Kaffee" es educado y natural.',
      ],
    },
    {
      heading: 'Dürfen vs. können: dos tipos de "poder"',
      paragraphs: [
        'El español solo tiene "poder" para dos conceptos que el alemán distingue: können (ser capaz de / tener la habilidad) y dürfen (tener el permiso). "Ich kann Auto fahren" = sé conducir (tengo la habilidad). "Ich darf hier parken" = tengo permiso para aparcar aquí.',
        'Las preguntas de permiso usan dürfen: "Darf ich das Fenster öffnen?" (¿Puedo abrir la ventana?). Las preguntas de capacidad usan können: "Kannst du mir helfen?" (¿Puedes ayudarme?).',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Modales alemanes: conjugación y posición del infinitivo al final.',
    graphicPrompt: 'Tabla de los 6 modales con sus formas ich/er y ejemplos de frases con infinitivo al final.',
    scene: [
      ['können (poder)', 'Ich kann Spanisch sprechen. — Puedo hablar español.'],
      ['müssen (tener que)', 'Du musst jetzt lernen. — Tienes que aprender ahora.'],
      ['wollen (querer)', 'Wir wollen nach Berlin fahren. — Queremos ir a Berlín.'],
      ['möchten (quisiera)', 'Ich möchte Kaffee trinken. — Quisiera tomar café.'],
      ['dürfen (poder/permiso)', 'Darf ich hier sitzen? — ¿Puedo sentarme aquí?'],
      ['sollen (se supone)', 'Du sollst pünktlich sein. — Se supone que llegas a tiempo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ich = er/sie/es sin terminación', 'infinitivo al final de la frase', 'wollen vs. möchten'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el modal correcto para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'David habla de sus habilidades lingüísticas',
            lines: [['David', 'Ich ___ acht Sprachen sprechen.']],
            options: ['kann', 'muss', 'will', 'soll'],
            answer: 'kann',
            explain: '"Können" expresa habilidad/capacidad. Ich kann = puedo/sé. David puede hablar 8 idiomas.',
          },
          {
            scene: 'Carlos tiene un examen mañana',
            lines: [['Carlos', 'Ich ___ heute viel lernen. Morgen habe ich eine Prüfung.']],
            options: ['muss', 'kann', 'darf', 'soll'],
            answer: 'muss',
            explain: '"Müssen" expresa necesidad/obligación. Ich muss = tengo que. Carlos tiene que estudiar.',
          },
          {
            scene: 'Ana quiere pedir un café educadamente',
            lines: [['Ana', 'Ich ___ bitte einen Kaffee.']],
            options: ['möchte', 'will', 'muss', 'kann'],
            answer: 'möchte',
            explain: '"Möchten" es más educado que "wollen". Ich möchte = quisiera. Perfecto para pedir algo.',
          },
          {
            scene: 'Lina pregunta si está permitido estacionarse aquí',
            lines: [['Lina', '___ ich hier parken?']],
            options: ['Darf', 'Kann', 'Muss', 'Will'],
            answer: 'Darf',
            explain: '"Dürfen" pregunta por permiso. Darf ich = ¿puedo/me está permitido?',
          },
          {
            scene: 'Marco tiene planes firmes para el futuro',
            lines: [['Marco', 'Ich ___ eines Tages in Deutschland leben.']],
            options: ['will', 'muss', 'darf', 'soll'],
            answer: 'will',
            explain: '"Wollen" expresa intención firme. Ich will = quiero/tengo intención de.',
          },
          {
            scene: 'La profesora Zhanna da instrucciones a la clase',
            lines: [['Zhanna', 'Ihr ___ das Buch auf Seite 10 öffnen.']],
            options: ['sollt', 'wollt', 'könnt', 'dürft'],
            answer: 'sollt',
            explain: '"Sollen" expresa instrucción externa. Ihr sollt = se supone que deben (forma ihr: sollt).',
          },
          {
            scene: 'Sofia describe a su hermano',
            lines: [['Sofia', 'Mein Bruder ___ sehr gut Klavier spielen.']],
            options: ['kann', 'darf', 'soll', 'muss'],
            answer: 'kann',
            explain: '"Kann" = er/sie/es kann (sin terminación). Habilidad: su hermano sabe tocar piano.',
          },
          {
            scene: 'Carlos pregunta si puede salir antes',
            lines: [['Carlos', '___ wir heute früher gehen?']],
            options: ['Dürfen', 'Müssen', 'Wollen', 'Sollen'],
            answer: 'Dürfen',
            explain: '"Dürfen wir...?" pregunta por permiso para el grupo. ¿Nos está permitido salir antes?',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Modal + infinitivo',
        tag: '2 espacios',
        intro: 'Completa el modal conjugado y el infinitivo al final.',
        type: 'dual',
        items: [
          {
            scene: 'David habla de su plan para hoy',
            lines: [['David', 'Ich [[0]] heute Grammatik [[1]].']],
            blanks: [
              { options: ['muss', 'musst', 'müssen', 'musste'], answer: 'muss', explain: '"Ich" + müssen → "muss" (sin terminación).' },
              { options: ['lernen', 'lerne', 'lernst', 'lernt'], answer: 'lernen', explain: 'El infinitivo siempre va AL FINAL de la frase.' },
            ],
          },
          {
            scene: 'Zhanna habla de los alumnos',
            lines: [['Zhanna', 'Die Studenten [[0]] sehr gut Deutsch [[1]].']],
            blanks: [
              { options: ['können', 'kann', 'kannst', 'könnt'], answer: 'können', explain: '"Die Studenten" (sie, plural) → "können".' },
              { options: ['sprechen', 'spricht', 'sprechst', 'spreche'], answer: 'sprechen', explain: 'Infinitivo al final: sprechen.' },
            ],
          },
          {
            scene: 'Lina habla de sus planes de viaje',
            lines: [['Lina', 'Ich [[0]] nächsten Sommer nach Deutschland [[1]].']],
            blanks: [
              { options: ['will', 'wille', 'willst', 'wollen'], answer: 'will', explain: '"Ich" + wollen → "will" (sin terminación).' },
              { options: ['reisen', 'reise', 'reist', 'reisest'], answer: 'reisen', explain: 'Infinitivo al final: reisen.' },
            ],
          },
          {
            scene: 'Ana pregunta si está permitido',
            lines: [['Ana', '[[0]] ich das Fenster [[1]]?']],
            blanks: [
              { options: ['Darf', 'Dürfen', 'Dürft', 'Darfst'], answer: 'Darf', explain: '"Ich" + dürfen → "darf". Pregunta: verbo al inicio.' },
              { options: ['öffnen', 'öffne', 'öffnet', 'öffnest'], answer: 'öffnen', explain: 'Infinitivo al final en preguntas con modal también.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma modal correcta.',
        type: 'guidedText',
        scene: 'David escribe sobre lo que puede, quiere y debe hacer esta semana.',
        text: 'Diese Woche [[0]] (müssen, ich) viele E-Mails schreiben. Aber ich [[1]] (wollen) auch Spanisch üben. Mein Kollege Marco [[2]] (können) mir helfen — er [[3]] (können) sehr gut Spanisch. Abends [[4]] (möchten, wir) ins Kino gehen. Leider [[5]] (dürfen, wir) das Büro nicht vor 18 Uhr verlassen. Carlos [[6]] (sollen) um 17 Uhr anrufen.',
        blanks: [
          { options: ['muss', 'musst', 'müssen', 'müsst'], answer: 'muss', explain: '"Ich" + müssen → "muss" (sin terminación).' },
          { options: ['will', 'willst', 'wollen', 'wollt'], answer: 'will', explain: '"Ich" + wollen → "will" (sin terminación).' },
          { options: ['kann', 'kannst', 'können', 'könnt'], answer: 'kann', explain: '"Marco" (er) + können → "kann" (sin terminación, igual que ich).' },
          { options: ['kann', 'kannst', 'können', 'könnt'], answer: 'kann', explain: '"Er" + können → "kann". ich = er en los modales.' },
          { options: ['möchten', 'möchte', 'möchtest', 'möchtet'], answer: 'möchten', explain: '"Wir" + möchten → "möchten" (igual al infinitivo).' },
          { options: ['dürfen', 'darf', 'darfst', 'dürft'], answer: 'dürfen', explain: '"Wir" + dürfen → "dürfen" (igual al infinitivo).' },
          { options: ['soll', 'sollst', 'sollen', 'sollt'], answer: 'soll', explain: '"Carlos" (er) + sollen → "soll" (sin terminación).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Conjuga el modal indicado de memoria.',
        type: 'freeText',
        scene: 'Diálogo en la academia WeLearn.',
        text: 'Zhanna fragt: "Was [[0]] (können) du auf Deutsch?" Carlos antwortet: "Ich [[1]] (können) lesen und schreiben. Aber ich [[2]] (müssen) noch viel üben. Ich [[3]] (wollen) bald fließend sprechen." Zhanna: "Gut! Du [[4]] (sollen) jeden Tag 30 Minuten hören."',
        blanks: [
          { answer: 'kannst', accepted: ['kannst'], explain: '"Du" + können → "kannst".' },
          { answer: 'kann', accepted: ['kann'], explain: '"Ich" + können → "kann" (sin terminación).' },
          { answer: 'muss', accepted: ['muss'], explain: '"Ich" + müssen → "muss" (sin terminación).' },
          { answer: 'will', accepted: ['will'], explain: '"Ich" + wollen → "will" (sin terminación).' },
          { answer: 'sollst', accepted: ['sollst'], explain: '"Du" + sollen → "sollst".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe frases completas con verbos modales. Recuerda: infinitivo al FINAL.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de tus habilidades lingüísticas',
            prompt: 'Di dos cosas que puedes hacer en alemán (können).',
            answer: 'Ich kann auf Deutsch lesen. Ich kann ein bisschen sprechen.',
            accepted: ['ich kann', 'kannst du'],
            explain: 'Ejemplo: Ich kann Deutsch lesen. / Ich kann schon ein bisschen sprechen. Infinitivo siempre al final.',
          },
          {
            scene: 'Hablando de obligaciones',
            prompt: 'Di qué tienes que hacer hoy y qué quieres hacer esta semana.',
            answer: 'Ich muss heute lernen. Ich will diese Woche einen Film auf Deutsch sehen.',
            accepted: ['ich muss', 'ich will', 'ich möchte'],
            explain: 'Müssen = obligación, wollen = intención. El infinitivo siempre al final: Ich muss heute viel lernen.',
          },
          {
            scene: 'Pidiendo permiso educadamente',
            prompt: 'Haz dos preguntas de permiso (dürfen) y una petición educada (möchten).',
            answer: 'Darf ich das Fenster öffnen? Darf ich eine Frage stellen? Ich möchte bitte Wasser.',
            accepted: ['darf ich', 'dürfen wir', 'ich möchte', 'möchten sie'],
            explain: 'Dürfen para permiso: "Darf ich...?" Möchten para pedir: "Ich möchte bitte..."',
          },
          {
            scene: 'Hablando de planes futuros',
            prompt: 'Di qué quieres hacer el próximo año y qué se supone que debes hacer según tus padres.',
            answer: 'Ich will nächstes Jahr nach Deutschland reisen. Ich soll jeden Tag Vokabeln lernen.',
            accepted: ['ich will', 'ich soll', 'ich möchte', 'ich muss'],
            explain: 'Wollen = plan propio. Sollen = expectativa externa. Infinitivo al final siempre.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe un párrafo sobre ti usando al menos 4 modales distintos.',
        type: 'write',
        items: [
          {
            scene: 'Presentándote en la academia WeLearn',
            prompt: 'Di qué puedes hacer, qué quieres lograr, qué tienes que hacer y qué quisieras aprender.',
            answer: 'Ich kann ein bisschen Deutsch sprechen. Ich will fließend werden. Ich muss jeden Tag üben. Ich möchte gern in Deutschland leben.',
            accepted: ['ich kann', 'ich will', 'ich muss', 'ich möchte', 'ich darf', 'ich soll'],
            explain: 'Usa al menos 4 modales distintos con infinitivo al final. Ejemplo: Ich kann lesen, ich will sprechen, ich muss üben, ich möchte reisen.',
          },
          {
            scene: 'Describiendo la rutina de un compañero de clase',
            prompt: 'Describe lo que Carlos puede hacer, quiere lograr y tiene que hacer esta semana.',
            answer: 'Carlos kann gut Deutsch lesen. Er will diese Woche einen Kurs belegen. Er muss viel Grammatik üben.',
            accepted: ['kann', 'will', 'muss', 'möchte', 'darf', 'soll'],
            explain: 'er/sie/es → kann, will, muss, möchte, darf, soll (sin terminación en todos). Infinitivo al final.',
          },
          {
            scene: 'Escribiendo un email a Zhanna sobre tus metas',
            prompt: 'Escribe 3 oraciones sobre tus metas de aprendizaje usando modales variados.',
            answer: 'Ich möchte in 6 Monaten fließend Deutsch sprechen. Ich muss jeden Tag eine Stunde üben. Ich will die B1-Prüfung bestehen.',
            accepted: ['ich möchte', 'ich muss', 'ich will', 'ich kann', 'ich soll'],
            explain: 'Usa möchten para deseos, müssen para compromisos, wollen para metas firmes. Infinitivo siempre al final.',
          },
        ],
      },
    ],
  },
}

export default topic
