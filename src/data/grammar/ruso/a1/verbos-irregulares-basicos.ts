import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-irregulares-basicos',
  order: '18',
  color: '#1a2ecc',
  category: 'Глаголы',
  level: 'A1',
  title: 'Verbos irregulares básicos en ruso A1: хотеть, мочь, знать, идти',
  shortTitle: 'Verbos irregulares',
  metaTitle: 'Verbos irregulares A1 ruso — хотеть, мочь, знать, идти conjugación',
  description:
    'En ruso hay verbos de uso frecuente con conjugaciones irregulares que no siguen los patrones -ать/-ить estándar. Para A1 son esenciales: хотеть (querer), мочь (poder), знать (saber/conocer), идти (ir a pie) y los verbos con consonante alterna como писать→пишу. Aprenderlos desde el principio evita los errores más comunes.',
  lead: 'Хочу, могу, знаю, иду — los verbos más usados en ruso tienen formas especiales que hay que memorizar. Son irregulares, pero aparecen en cada conversación, así que aprenderlos bien desde A1 es clave.',
  outcomes: [
    'Conjugar хотеть (querer) en todos los pronombres personales',
    'Usar мочь (poder) y знать (saber) correctamente',
    'Distinguir идти (ir en este momento, a pie) de otras formas de movimiento',
  ],
  guide: {
    goal: 'Usar los verbos irregulares más frecuentes del ruso en presente.',
    model: 'хочу/хочешь/хочет — мочь: могу/можешь/может — знать: знаю/знаешь/знает',
    formula: 'хотеть: хочу/хочешь/хочет/хотим/хотите/хотят (cambio х→хоч/хот)',
    decisions: [
      '¿Expresas deseo? → хотеть: Я хочу кофе (Quiero café)',
      '¿Expresas posibilidad/capacidad? → мочь: Я могу помочь (Puedo ayudar)',
      '¿Preguntas si alguien sabe algo? → знать: Ты знаешь русский? (¿Sabes ruso?)',
      '¿Hablas de ir a pie ahora mismo? → идти: Я иду домой (Voy a casa ahora)',
    ],
    table: [
      ['Pronombre', 'хотеть (querer)', 'мочь (poder)'],
      ['я', 'хочу', 'могу'],
      ['ты', 'хочешь', 'можешь'],
      ['он/она', 'хочет', 'может'],
      ['мы', 'хотим', 'можем'],
      ['вы', 'хотите', 'можете'],
      ['они', 'хотят', 'могут'],
    ],
    mistakes: [
      'хотеть cambia de raíz: хочу/хочешь/хочет (singular) vs хотим/хотите/хотят (plural). NO "хотю" ni "хочим".',
      'мочь cambia г→ж en singular: могу, мо**ж**ешь, мо**ж**ет. En plural: мо**г**ем, мо**г**ете, мо**г**ут.',
      'знать es semirregular: знаю, знаешь, знает, знаем, знаете, знают. La -ю de "знаю" es característica de verbos -ать tipo 1.',
      'идти: иду, идёшь, идёт, идём, идёте, идут — la е es "ё" en las personas intermedias.',
    ],
  },
  seo: [
    {
      heading: '¿Cuáles son los verbos irregulares más importantes en ruso A1?',
      paragraphs: [
        'En el nivel A1 del ruso hay cuatro verbos irregulares que aparecen constantemente y es imprescindible memorizar: хотеть (querer), мочь (poder), знать (saber/conocer) e идти (ir, a pie, en este momento). Su irregularidad no es caprichosa — refleja patrones históricos del eslavo antiguo — pero para el estudiante hispanohablante conviene tratarlos como listas a memorizar.',
        'Хотеть es especialmente irregular porque cambia la raíz entre singular y plural: хочу/хочешь/хочет en singular, хотим/хотите/хотят en plural. Мочь alterna г/ж: могу pero можешь. Dominar estos cuatro verbos en A1 abre el 80% de las conversaciones básicas en ruso.',
      ],
      table: [
        ['Pronombre', 'знать (saber)', 'идти (ir a pie)'],
        ['я', 'знаю', 'иду'],
        ['ты', 'знаешь', 'идёшь'],
        ['он/она', 'знает', 'идёт'],
        ['мы', 'знаем', 'идём'],
        ['вы', 'знаете', 'идёте'],
        ['они', 'знают', 'идут'],
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Focus on хотеть and мочь as the highest-frequency irregulars. The singular/plural split in хотеть (хочу vs хотим) is the most common mistake. For мочь, the г→ж alternation in singular is a characteristic Russian consonant mutation. знать is almost regular (знаю pattern) — use it as a bridge. идти is motion verb (covered separately) but include conjugation here.',
    graphicPrompt:
      'Four verb boxes side by side: хотеть (want), мочь (can), знать (know), идти (go). Each shows a 6-row conjugation table with Russian and Spanish. Blue Russian theme.',
    scene: [
      ['хотеть', 'Я хочу учить русский в WeLearn. (Quiero estudiar ruso.) — Она хочет кофе. (Ella quiere café.)'],
      ['мочь', 'Я могу помочь. (Puedo ayudar.) — Ты можешь говорить медленнее? (¿Puedes hablar más lento?)'],
      ['знать', 'Я знаю немного русский. (Sé un poco de ruso.) — Вы знаете Давида? (¿Conocen a Bruno?)'],
      ['идти', 'Я иду на урок. (Voy a clase [ahora].) — Куда ты идёшь? (¿Adónde vas?)'],
    ],
    learnerModes: ['recognition', 'gap-fill', 'production'],
    practiceVerbs: ['хотеть', 'мочь', 'знать', 'идти'],
    reviewFocus: ['хочу/хочешь/хочет ≠ хотим/хотите/хотят', 'могу/можешь/может', 'знаю/знаешь/знает'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Хотеть, мочь, знать, идти',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo irregular.',
        type: 'choice',
        items: [
          { scene: 'Я + хотеть', lines: [['', '"Quiero un café": Я ___ кофе.']], options: ['хочу', 'хочет', 'хотим', 'хотят'], answer: 'хочу', explain: 'Я хочу. Хотеть, 1ª persona singular: хочу (raíz хоч-).' },
          { scene: 'Она + хотеть', lines: [['', '"Ella quiere estudiar": Она ___ учиться.']], options: ['хочу', 'хочешь', 'хочет', 'хотят'], answer: 'хочет', explain: 'Она хочет. 3ª persona singular: хочет.' },
          { scene: 'Мы + хотеть', lines: [['', '"Queremos hablar ruso": Мы ___ говорить по-русски.']], options: ['хочем', 'хотим', 'хочут', 'хотят'], answer: 'хотим', explain: 'Мы хотим. 1ª persona plural: хотим (raíz хот- en plural).' },
          { scene: 'Я + мочь', lines: [['', '"Puedo ayudar": Я ___ помочь.']], options: ['мочу', 'могу', 'может', 'можем'], answer: 'могу', explain: 'Я могу. Мочь, 1ª persona singular: могу.' },
          { scene: 'Ты + мочь', lines: [['', '"¿Puedes repetir?": Ты ___ повторить?']], options: ['могу', 'может', 'можешь', 'можете'], answer: 'можешь', explain: 'Ты можешь. 2ª persona singular: г→ж (мо-жешь).' },
          { scene: 'Я + знать', lines: [['', '"No sé su nombre": Я не ___ его имя.']], options: ['знаю', 'знаешь', 'знает', 'знают'], answer: 'знаю', explain: 'Я знаю. Знать, 1ª persona: знаю.' },
          { scene: 'Куда ты идёшь?', lines: [['', '"¿Adónde vas ahora?": Куда ты ___ сейчас?']], options: ['иду', 'идёшь', 'идёт', 'идут'], answer: 'идёшь', explain: 'Ты идёшь. Идти, 2ª persona singular: идёшь.' },
          { scene: 'Они + хотеть', lines: [['', '"Ellos quieren aprender coreano": Они ___ учить корейский.']], options: ['хотят', 'хочут', 'хотим', 'хочет'], answer: 'хотят', explain: 'Они хотят. 3ª persona plural: хотят (raíz хот- + ят).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbos irregulares — 2 espacios',
        tag: '2 espacios',
        intro: 'Elige el verbo y la forma correcta.',
        type: 'dual',
        items: [
          { scene: 'Querer + café', lines: [['', '"Bruno quiere un café": Дэвид [[0]] [[1]].']], blanks: [{ options: ['хочет', 'хочу', 'хотят', 'хотим'], answer: 'хочет', explain: 'Дэвид (он) → хочет. 3ª persona singular.' }, { options: ['кофе', 'кофею', 'кофей', 'кофея'], answer: 'кофе', explain: 'Кофе es indeclinable en ruso — siempre "кофе".' }] },
          { scene: 'Poder + hablar', lines: [['', '"¿Puedes hablar más lento?": Ты [[0]] говорить [[1]]?']], blanks: [{ options: ['можешь', 'могу', 'может', 'можем'], answer: 'можешь', explain: 'Ты → можешь. Мочь, 2ª persona singular.' }, { options: ['быстро', 'медленнее', 'хорошо', 'тихо'], answer: 'медленнее', explain: 'Медленнее = más lento (comparativo de медленно).' }] },
          { scene: 'Saber + ruso', lines: [['', '"¿Saben ruso?": Вы [[0]] [[1]]?']], blanks: [{ options: ['знаете', 'знают', 'знаем', 'знаешь'], answer: 'знаете', explain: 'Вы → знаете. 2ª persona plural (formal).' }, { options: ['русского', 'по-русски', 'русскому', 'русский'], answer: 'по-русски', explain: 'Знать по-русски = saber ruso (el idioma). Literalmente "saber en ruso".' }] },
          { scene: 'Ir a clase', lines: [['', '"Voy a clase ahora": Я [[0]] [[1]] сейчас.']], blanks: [{ options: ['иду', 'идёшь', 'идёт', 'идут'], answer: 'иду', explain: 'Я → иду. Идти, 1ª persona singular.' }, { options: ['на урок', 'в урок', 'к уроку', 'урок'], answer: 'на урок', explain: 'На урок = a clase. Preposición "на" + acusativo para lecciones/eventos.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Текст — в WeLearn',
        tag: 'Opciones',
        intro: 'Completa el texto con los verbos irregulares correctos.',
        type: 'guidedText',
        scene: 'Primera clase en WeLearn',
        text: 'Дэвид спрашивает: «Вы [[0]] говорить по-русски?» (¿Saben hablar en ruso?) Студентка отвечает: «Я [[1]] только немного». (Solo sé un poco.) «Отлично! Вы [[2]] учить!» (¡Perfecto! ¡Pueden aprender!) «Я [[3]] учить с вами». (Quiero aprender con ustedes.) Потом Дэвид [[4]] к доске. (Luego Bruno va a la pizarra.)',
        blanks: [
          { options: ['знаете', 'знают', 'знаем', 'знаешь'], answer: 'знаете', explain: 'Вы знаете — 2ª persona plural, знать.' },
          { options: ['знаю', 'знаешь', 'знает', 'знаем'], answer: 'знаю', explain: 'Я знаю — 1ª persona singular, знать.' },
          { options: ['можете', 'могут', 'можем', 'можешь'], answer: 'можете', explain: 'Вы можете — 2ª persona plural, мочь.' },
          { options: ['хочу', 'хочет', 'хотим', 'хотят'], answer: 'хочу', explain: 'Я хочу — 1ª persona singular, хотеть.' },
          { options: ['идёт', 'иду', 'идут', 'идём'], answer: 'идёт', explain: 'Дэвид (он) идёт — 3ª persona singular, идти.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Verbos irregulares — escritura libre',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del verbo sin ayuda.',
        type: 'freeText',
        scene: 'Conversación sobre idiomas',
        text: '1. "Quiero aprender ruso": Я [[0]] учить русский. 2. "¿Puedes ayudarme?": Ты [[1]] мне помочь? 3. "Ella sabe coreano": Она [[2]] корейский. 4. "¿Adónde vas?": Куда ты [[3]]? 5. "Ellos quieren viajar": Они [[4]] путешествовать.',
        blanks: [
          { answer: 'хочу', accepted: ['хочу'], explain: 'Я хочу. Хотеть, 1ª persona singular.' },
          { answer: 'можешь', accepted: ['можешь'], explain: 'Ты можешь. Мочь, 2ª persona singular (г→ж).' },
          { answer: 'знает', accepted: ['знает'], explain: 'Она знает. Знать, 3ª persona singular.' },
          { answer: 'идёшь', accepted: ['идёшь'], explain: 'Ты идёшь. Идти, 2ª persona singular.' },
          { answer: 'хотят', accepted: ['хотят'], explain: 'Они хотят. Хотеть, 3ª persona plural (raíz хот-).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Frases con verbos irregulares',
        tag: 'Producción',
        intro: 'Construye frases completas con el verbo entre paréntesis.',
        type: 'write',
        items: [
          { scene: 'хотеть en práctica', prompt: '(хотеть) → "Yo quiero aprender ruso en WeLearn."', answer: 'Я хочу учить русский в WeLearn.', accepted: ['Я хочу учить русский в WeLearn.', 'Я хочу учить русский.'], explain: 'Я хочу + infinitivo. Хотеть: хочу (1ª sg).' },
          { scene: 'мочь en práctica', prompt: '(мочь) → "¿Pueden hablar más lento, por favor?"', answer: 'Вы можете говорить медленнее, пожалуйста?', accepted: ['Вы можете говорить медленнее, пожалуйста?', 'Вы можете говорить медленнее?'], explain: 'Вы можете + infinitivo. Мочь: можете (2ª pl).' },
          { scene: 'знать en práctica', prompt: '(знать) → "Nosotros sabemos un poco de japonés."', answer: 'Мы знаем немного японский.', accepted: ['Мы знаем немного японский.', 'Мы знаем немного по-японски.'], explain: 'Мы знаем. Знать: знаем (1ª pl).' },
          { scene: 'идти en práctica', prompt: '(идти) → "Bruno va a clase ahora."', answer: 'Дэвид идёт на урок сейчас.', accepted: ['Дэвид идёт на урок сейчас.', 'Дэвид идёт на урок.'], explain: 'Дэвид (он) идёт. Идти: идёт (3ª sg).' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión — verbos clave',
        tag: 'Libre',
        intro: 'Escribe dos oraciones originales usando los verbos irregulares aprendidos.',
        type: 'write',
        items: [
          { scene: 'Querer y poder', prompt: 'Escribe sobre lo que quieres hacer esta semana. Usa "хочу" y "могу".', answer: 'Я хочу учить русский и могу заниматься каждый день.', accepted: ['хочу', 'могу'], explain: 'Combina хочу + infinitivo (deseo) y могу + infinitivo (capacidad).' },
          { scene: 'Saber e ir', prompt: 'Escribe una frase con "знать" o "идти" en contexto de WeLearn.', answer: 'Я знаю немного русский и иду на урок.', accepted: ['знаю', 'знает', 'знаем', 'знаете', 'знают', 'иду', 'идёшь', 'идёт', 'идём', 'идёте', 'идут'], explain: 'Знать (saber) e идти (ir a pie ahora) son los dos verbos irregulares más usados en A1.' },
        ],
      },
    ],
  },
}

export default topic
