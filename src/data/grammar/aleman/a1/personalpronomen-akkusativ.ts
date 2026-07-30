import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'personalpronomen-akkusativ',
  order: '20',
  color: '#c9a900',
  category: 'Pronomen',
  level: 'A1',
  title: 'Personalpronomen im Akkusativ A1',
  shortTitle: 'Pronomen Akkusativ',
  metaTitle: 'Pronombres personales acusativo alemán A1 — mich, dich, ihn, sie, es, uns, euch',
  description:
    'Los pronombres personales del alemán cambian de forma en acusativo (objeto directo). Los cambios más importantes son: ich→mich, du→dich, er→ihn. Los demás son más predecibles: wir→uns, ihr→euch, sie/Sie→sie/Sie (sin cambio). Ich liebe dich. / Er sieht mich. / Kennst du ihn?',
  lead: 'Ich→mich, du→dich, er→ihn: los tres cambios que hay que memorizar. El resto es más predecible. Ich liebe dich. / Er kennt mich. / Siehst du ihn?',
  outcomes: [
    'Cambias ich→mich, du→dich, er→ihn correctamente en acusativo',
    'Sabes que wir→uns, ihr→euch y sie/Sie no cambian en acusativo',
    'Usas los pronombres en acusativo como objeto directo del verbo',
  ],

  guide: {
    goal: 'Usar los pronombres personales en acusativo (objeto directo) en frases cotidianas.',
    model: 'Ich liebe dich. / Er sieht mich. / Kennst du ihn? / Sie vermisst uns.',
    formula: 'Sujeto (Nominativ) + Verbo + Objeto directo (Akkusativ)',
    decisions: [
      'ich → mich (me): Er liebt mich. / Kannst du mich hören?',
      'du → dich (te): Ich vermisse dich. / Er sucht dich.',
      'er → ihn (lo, a él): Ich kenne ihn. / Siehst du ihn?',
      'sie (ella) → sie (la): Ich sehe sie. / Er kennt sie. (sin cambio)',
      'es → es (lo, neutro): Ich nehme es. / Hast du es? (sin cambio)',
      'wir → uns (nos): Er sieht uns. / Kannst du uns helfen?',
      'ihr → euch (os/los): Ich vermisse euch. / Er sucht euch.',
      'sie/Sie → sie/Sie (los/les): Ich sehe sie. / Ich sehe Sie. (sin cambio)',
    ],
    table: [
      ['Nominativ', 'Akkusativ', 'Beispiel'],
      ['ich', 'mich', 'Er liebt mich.'],
      ['du', 'dich', 'Ich vermisse dich.'],
      ['er', 'ihn', 'Kennst du ihn?'],
      ['sie (ella)', 'sie', 'Ich kenne sie. (sin cambio)'],
      ['es', 'es', 'Ich nehme es. (sin cambio)'],
      ['wir', 'uns', 'Er sieht uns.'],
      ['ihr', 'euch', 'Ich vermisse euch.'],
      ['sie/Sie', 'sie/Sie', 'Ich sehe sie/Sie. (sin cambio)'],
    ],
    mistakes: [
      '"Er liebt ich" ❌ — en posición de objeto directo usa acusativo: "Er liebt mich" ✓',
      '"Ich kenne er" ❌ — er cambia a ihn en acusativo: "Ich kenne ihn" ✓',
      '"Kennst du mir?" ❌ — "mir" es dativo; para objeto directo usa "mich": "Kennst du mich?" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Cómo son los pronombres personales en acusativo en alemán?',
      paragraphs: [
        'En alemán, los pronombres personales tienen formas distintas según su función en la frase. En nominativo (sujeto) son: ich, du, er, sie, es, wir, ihr, sie/Sie. En acusativo (objeto directo, responde a "¿a quién?" o "¿qué?") cambian: ich→mich, du→dich, er→ihn. Las demás formas no cambian o cambian mínimamente: wir→uns, ihr→euch.',
        'Los tres cambios que hay que memorizar a toda costa son: ich→mich, du→dich, er→ihn. Estos son los únicos cambios "no predecibles". El resto: sie (ella)→sie, es→es, sie/Sie→sie/Sie no cambian en acusativo. Y wir→uns / ihr→euch siguen un patrón claro.',
      ],
    },
    {
      heading: '¿Cómo se identifica el objeto directo en alemán?',
      paragraphs: [
        'El objeto directo (acusativo) responde a la pregunta "¿Qué?" o "¿A quién?" después del verbo. En "Ich liebe dich", "dich" responde a "¿A quién amo?". En "Er sieht uns", "uns" responde a "¿A quién ve?". Los verbos más comunes en A1 que toman objeto acusativo son: sehen (ver), kennen (conocer), lieben (amar), mögen (gustar), suchen (buscar), brauchen (necesitar), haben (tener), verstehen (entender).',
        'Diferencia con dativo: el dativo responde a "¿para quién?" o "¿a quién?" en sentido indirecto. Ich gebe dir das Buch (dativo: te doy el libro). Ich liebe dich (acusativo: te amo). En A1 el foco está en el acusativo; el dativo se trabaja más en A2.',
      ],
    },
    {
      heading: '¿Dónde va el pronombre acusativo en la frase alemana?',
      paragraphs: [
        'El pronombre acusativo generalmente aparece justo después del verbo conjugado: Ich sehe ihn. / Er liebt mich. / Kennst du uns? Cuando hay también un pronombre dativo en la misma frase, en alemán el acusativo va después del dativo: Ich gebe dir das Buch → Ich gebe es dir (acusativo "es" antes que dativo "dir" solo cuando el acusativo es pronombre). Esta regla de A2 no es necesaria en A1.',
        'Lo más importante en A1 es reconocer y usar los pronombres acusativos en su posición natural después del verbo. "Siehst du ihn?" / "Ich kenne sie nicht." / "Er braucht uns." — el pronombre acusativo forma una unidad compacta con el verbo.',
      ],
    },
    {
      heading: 'Verbos frecuentes con pronombres acusativos',
      paragraphs: [
        'Los verbos más frecuentes en A1 que usan pronombres acusativos son: lieben (amar — ich liebe dich), kennen (conocer — kennst du ihn?), sehen (ver — ich sehe sie), suchen (buscar — er sucht mich), brauchen (necesitar — wir brauchen euch), hören (escuchar/oír — kannst du mich hören?), verstehen (entender — ich verstehe dich), anrufen (llamar — ruf mich an!), besuchen (visitar — ich besuche euch).',
        'Un truco de memoria para los tres cambios cruciales: "Mich-Dich-Ihn — yo, tú, él". Después de saber estos tres, el resto del sistema acusativo es mucho más manejable.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Pronombres en acusativo: ich→mich, du→dich, er→ihn son los tres cambios clave.',
    graphicPrompt: 'Tabla de nominativo vs acusativo con flechas resaltando los tres cambios (mich/dich/ihn) en color.',
    scene: [
      ['ich → mich', 'Er kennt mich. — Él me conoce.'],
      ['du → dich', 'Ich liebe dich. — Te amo.'],
      ['er → ihn', 'Siehst du ihn? — ¿Lo ves?'],
      ['sie (ella) → sie', 'Ich vermisse sie. — La extraño. (sin cambio)'],
      ['wir → uns', 'Kannst du uns hören? — ¿Puedes oírnos?'],
      ['ihr → euch', 'Ich brauche euch. — Los/os necesito.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ich→mich, du→dich, er→ihn (memorizar)', 'wir→uns, ihr→euch', 'sie/es → sin cambio'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre en acusativo correcto.',
        type: 'choice',
        items: [
          {
            scene: 'Leo le dice algo tierno a su alumna favorita',
            lines: [['Leo', 'Ich vermisse ___ (tú), wenn du nicht in der Klasse bist.']],
            options: ['dich', 'du', 'dir', 'dein'],
            answer: 'dich',
            explain: '"Du" en acusativo (objeto directo) → "dich". Ich vermisse dich = Te extraño.',
          },
          {
            scene: 'Carlos pregunta si Alba conoce a Marco',
            lines: [['Carlos', 'Kennst du ___ (él)?']],
            options: ['ihn', 'er', 'ihm', 'sein'],
            answer: 'ihn',
            explain: '"Er" en acusativo (objeto directo) → "ihn". Kennst du ihn? = ¿Lo conoces?',
          },
          {
            scene: 'Ana habla de sus amigos que la llaman',
            lines: [['Ana', 'Meine Freunde rufen ___ (me) oft an.']],
            options: ['mich', 'ich', 'mir', 'mein'],
            answer: 'mich',
            explain: '"Ich" en acusativo → "mich". Sie rufen mich an = Ellos me llaman.',
          },
          {
            scene: 'Lina pregunta si Leo ha visto a Sofia',
            lines: [['Lina', 'Hast du ___ (ella) gesehen?']],
            options: ['sie', 'ihr', 'ihn', 'er'],
            answer: 'sie',
            explain: '"Sie" (ella) no cambia en acusativo. Hast du sie gesehen? = ¿La has visto?',
          },
          {
            scene: 'Marco dice que el grupo los necesita',
            lines: [['Marco', 'Die Gruppe braucht ___ (nosotros).']],
            options: ['uns', 'wir', 'unser', 'euch'],
            answer: 'uns',
            explain: '"Wir" en acusativo → "uns". Die Gruppe braucht uns = El grupo nos necesita.',
          },
          {
            scene: 'Alba le dice a la clase que los quiere',
            lines: [['Alba', 'Ich mag ___ (vosotros/ustedes) sehr gern!']],
            options: ['euch', 'ihr', 'euer', 'uns'],
            answer: 'euch',
            explain: '"Ihr" en acusativo → "euch". Ich mag euch = Los quiero mucho (a todos).',
          },
          {
            scene: 'Carlos pregunta si Leo lo conoce',
            lines: [['Carlos', 'Kennt Leo ___ (me)?']],
            options: ['mich', 'mir', 'ich', 'mein'],
            answer: 'mich',
            explain: '"Ich" en acusativo → "mich". Kennt Leo mich? = ¿Me conoce Leo?',
          },
          {
            scene: 'Sofia describe el libro — es muy bueno',
            lines: [['Sofia', 'Das Buch ist toll! Ich empfehle ___ (it/neutro).']],
            options: ['es', 'er', 'ihn', 'sie'],
            answer: 'es',
            explain: '"Es" (neutro) no cambia en acusativo. Ich empfehle es = Lo recomiendo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Pronombre + verbo',
        tag: '2 espacios',
        intro: 'Completa el pronombre en acusativo y el verbo en la forma correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Alba pregunta a Carlos si reconoce a Leo (en una foto)',
            lines: [['Alba', '[[0]] du [[1]]? Das ist Leo auf dem Foto.']],
            blanks: [
              { options: ['Kennst', 'Kenne', 'Kennt', 'Kennen'], answer: 'Kennst', explain: '"Du" + kennen → "kennst". Pregunta Ja/Nein: verbo al inicio.' },
              { options: ['ihn', 'er', 'ihm', 'sein'], answer: 'ihn', explain: '"Er" (Leo, masculino) → acusativo: "ihn".' },
            ],
          },
          {
            scene: 'Marco dice que Ana lo busca',
            lines: [['Marco', 'Ana [[0]] [[1]] überall.']],
            blanks: [
              { options: ['sucht', 'suche', 'suchst', 'suchen'], answer: 'sucht', explain: '"Ana" (sie) + suchen → "sucht".' },
              { options: ['mich', 'mir', 'ich', 'mein'], answer: 'mich', explain: '"Ich" → acusativo: "mich". Ana sucht mich = Ana me busca.' },
            ],
          },
          {
            scene: 'Leo le dice a su clase que los aprecia',
            lines: [['Leo', 'Ich [[0]] [[1]] alle sehr!']],
            blanks: [
              { options: ['mag', 'magst', 'mögen', 'mögt'], answer: 'mag', explain: '"Ich" + mögen → "mag" (irregular).' },
              { options: ['euch', 'ihr', 'euer', 'uns'], answer: 'euch', explain: '"Ihr" → acusativo: "euch". Ich mag euch alle = Los aprecio a todos.' },
            ],
          },
          {
            scene: 'Lina y Carlos preguntan si Sofia puede ayudarlos',
            lines: [['Lina', 'Kannst du [[0]] [[1]]?']],
            blanks: [
              { options: ['uns', 'wir', 'unser', 'euch'], answer: 'uns', explain: '"Wir" → acusativo: "uns". Kannst du uns helfen?.' },
              { options: ['helfen', 'hilft', 'helfst', 'hilfst'], answer: 'helfen', explain: '"Helfen" en infinitivo al final (con modal "kannst").' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige el pronombre en acusativo correcto para cada hueco.',
        type: 'guidedText',
        scene: 'Leo escribe una carta a sus estudiantes de WeLearn.',
        text: 'Liebe Studenten, ich kenne [[0]] (vosotros) noch nicht alle persönlich, aber ich mag [[1]] (vosotros) schon sehr. Wenn ihr Fragen habt, ruft [[2]] (me) einfach an! Meine Kollegin Alba — kennt ihr [[3]] (ella)? — sie unterrichtet [[4]] (vosotros) nächste Woche. Carlos, ich habe [[5]] (you, du) bei der Prüfung gesehen — gut gemacht! Und Marco, ich suche [[6]] (you, du) — wo bist du?',
        blanks: [
          { options: ['euch', 'ihr', 'uns', 'sie'], answer: 'euch', explain: '"Ihr" (vosotros) → acusativo: "euch". Ich kenne euch.' },
          { options: ['euch', 'ihr', 'uns', 'sie'], answer: 'euch', explain: '"Ihr" → acusativo: "euch". Ich mag euch sehr.' },
          { options: ['mich', 'mir', 'ich', 'mein'], answer: 'mich', explain: '"Ich" → acusativo: "mich". Ruft mich an = llamadme.' },
          { options: ['sie', 'ihr', 'ihn', 'es'], answer: 'sie', explain: '"Sie" (ella, Alba) → acusativo: "sie" (sin cambio). Kennt ihr sie?' },
          { options: ['euch', 'ihr', 'uns', 'mich'], answer: 'euch', explain: '"Ihr" (la clase) → acusativo: "euch". Sie unterrichtet euch.' },
          { options: ['dich', 'du', 'dir', 'dein'], answer: 'dich', explain: '"Du" (Carlos) → acusativo: "dich". Ich habe dich gesehen.' },
          { options: ['dich', 'du', 'dir', 'dein'], answer: 'dich', explain: '"Du" (Marco) → acusativo: "dich". Ich suche dich.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre en acusativo correcto de memoria.',
        type: 'freeText',
        scene: 'Diálogo en la academia WeLearn.',
        text: 'Alba: "Carlos, ich sehe [[0]] (tú) jeden Tag in der Klasse. Kennst du Sofia?" Carlos: "Ja, ich kenne [[1]] (ella) gut!" Alba: "Und kennt sie [[2]] (ti)?" Carlos: "Natürlich! Wir kennen [[3]] (a cada uno, us) sehr gut." Alba: "Gut! Ich brauche [[4]] (a vosotros dos, euch) für ein Projekt."',
        blanks: [
          { answer: 'dich', accepted: ['dich'], explain: '"Du" (Carlos) → acusativo: "dich". Ich sehe dich.' },
          { answer: 'sie', accepted: ['sie'], explain: '"Sie" (Sofia, ella) → acusativo: "sie" (sin cambio).' },
          { answer: 'mich', accepted: ['mich'], explain: '"Ich" (Carlos habla de sí mismo) → acusativo: "mich".' },
          { answer: 'uns', accepted: ['uns'], explain: '"Wir" → acusativo: "uns". Wir kennen uns = nos conocemos.' },
          { answer: 'euch', accepted: ['euch'], explain: '"Ihr" (los dos) → acusativo: "euch". Ich brauche euch.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe frases completas usando pronombres en acusativo.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de relaciones personales',
            prompt: 'Di 3 cosas que haces con/para las personas de tu vida usando mich, dich, ihn o sie.',
            answer: 'Meine Mutter liebt mich. Ich vermisse dich sehr. Ich kenne ihn gut.',
            accepted: ['mich', 'dich', 'ihn', 'sie', 'uns', 'euch'],
            explain: 'Los 3 cambios clave: ich→mich, du→dich, er→ihn. Verifica que el pronombre sea objeto directo del verbo.',
          },
          {
            scene: 'Contándole a Alba sobre tu grupo de amigos',
            prompt: 'Di que conoces a tu grupo (uns), que los llamas (euch) y que una amiga te busca (mich).',
            answer: 'Wir kennen uns gut. Ich rufe euch morgen an. Meine Freundin sucht mich.',
            accepted: ['uns', 'euch', 'mich', 'dich', 'sie'],
            explain: 'Wir→uns (acusativo). Ihr→euch (acusativo). Ich→mich (acusativo). Verbos con objeto directo.',
          },
          {
            scene: 'Describiendo qué sientes por personas de tu vida',
            prompt: 'Escribe 4 frases con "lieben", "vermissen", "kennen" y "brauchen" usando pronombres acusativos variados.',
            answer: 'Ich liebe dich. Ich vermisse euch alle. Kennst du ihn? Ich brauche dich hier.',
            accepted: ['mich', 'dich', 'ihn', 'sie', 'uns', 'euch', 'es'],
            explain: 'Lieben, vermissen, kennen, brauchen: todos toman objeto directo en acusativo. ich→mich, du→dich, er→ihn.',
          },
          {
            scene: 'Haciendo preguntas a un compañero',
            prompt: 'Haz 3 preguntas a un amigo usando pronombres acusativos: ¿me conoces? ¿lo ves? ¿nos escuchas?',
            answer: 'Kennst du mich? Siehst du ihn? Hörst du uns?',
            accepted: ['du mich', 'du ihn', 'du sie', 'du uns', 'du euch', 'du es'],
            explain: 'Preguntas Ja/Nein: verbo al inicio + sujeto + pronombre acusativo. Kennst du mich?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe un mini-diálogo usando al menos 5 pronombres en acusativo distintos.',
        type: 'write',
        items: [
          {
            scene: 'Primer día en WeLearn: conociéndose',
            prompt: 'Escribe un diálogo de 4 intercambios donde Leo y Carlos se conocen, usando mich, dich, ihn, sie, uns.',
            answer: 'Leo: "Kennst du mich?" Carlos: "Ja, ich kenne dich! Du bist Leo." Leo: "Und kennst du Alba?" Carlos: "Ich sehe sie jeden Tag. Sie unterrichtet uns."',
            accepted: ['mich', 'dich', 'ihn', 'sie', 'uns', 'euch'],
            explain: 'Usa al menos 5 pronombres acusativos distintos. Ich→mich, du→dich, er→ihn, sie (ella)→sie, wir→uns.',
          },
          {
            scene: 'Mensaje de WhatsApp del grupo de WeLearn',
            prompt: 'Escribe 4 mensajes de un grupo de WhatsApp entre estudiantes usando pronombres acusativos.',
            answer: 'Carlos: "Ich vermisse euch!" Lina: "Wir vermissen dich auch, Carlos!" Marco: "Habt ihr mich gehört? Ich brauche euch!" Ana: "Ja! Wir sehen dich morgen."',
            accepted: ['euch', 'dich', 'mich', 'sie', 'uns', 'ihn'],
            explain: 'Mensajes informales: usa acusativo para decir a quién extrañas, ves o necesitas. ihr→euch, du→dich, ich→mich.',
          },
          {
            scene: 'Recomendación de la academia',
            prompt: 'Escribe un texto de 3 frases recomendando WeLearn usando ihn (Leo), sie (Alba) y uns.',
            answer: 'Kennt ihr Leo? Ich kenne ihn seit einem Jahr — er ist fantastisch! Und Alba? Ich sehe sie jeden Tag. Kommt zu uns bei WeLearn!',
            accepted: ['ihn', 'sie', 'uns', 'mich', 'dich', 'euch'],
            explain: 'Er (Leo) → ihn en acusativo. Sie (Alba) → sie (sin cambio). Wir → uns. Kommt zu uns = venid a vernos.',
          },
        ],
      },
    ],
  },
}

export default topic
