import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperativo',
  order: '16',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Imperativo en ruso A2: ты/вы, afirmativo y negativo',
  shortTitle: 'Imperativo',
  metaTitle: 'Imperativo ruso A2 — forma tú/usted, imperativo afirmativo negativo, пожалуйста',
  description:
    'El imperativo ruso tiene dos formas: тебе (ты) para una persona de confianza y вам (вы) para cortesía o plural. Se forma desde la raíz del presente: si la raíz termina en vocal, se añade -й (читай, говори); si termina en consonante, -и (иди, пиши) o -ь (встань). La forma вы se forma añadiendo -те: читайте, идите. Negativo: не + imperativo (не читай) o не + infinitivo (не читать — prohibición general).',
  lead: 'Говори по-русски! / Не шуми! / Входите, пожалуйста: el imperativo ruso A2.',
  outcomes: [
    'Formar el imperativo informal (ты) desde la raíz del presente',
    'Añadir -те para la forma formal/plural (вы)',
    'Usar el imperativo negativo с не',
    'Reconocer imperativos irregulares comunes: иди, ешь, дай',
  ],

  guide: {
    goal: 'Dar órdenes y peticiones en рuso usando las formas correctas para ты y вы.',
    model: 'Читай книгу! (¡Lee el libro! — a una persona de confianza) / Читайте книгу! (¡Lean el libro! / ¡Lea el libro! — formal) / Не читай сейчас! (¡No leas ahora!)',
    formula: 'raíz present. + -й (vocal) / -и (cons.) / -ь → ты | + -те → вы | не + imper. → negativo',
    decisions: [
      'Raíz termina en vocal: читают → читай; рисуют → рисуй',
      'Raíz termina en consonante: идут → иди; пишут → пиши; встанут → встань',
      'Вы formal: añadir -те → читайте, идите, встаньте',
      'Negativo: не читай, не идите, не шуми',
      'Irregulares frecuentes: идти→иди, есть→ешь, дать→дай, быть→будь, пить→пей',
    ],
    table: [
      ['Verbo', 'Ты (informal)', 'Вы (formal/pl.)'],
      ['читать (leer)', 'читай', 'читайте'],
      ['говорить (hablar)', 'говори', 'говорите'],
      ['идти (ir a pie)', 'иди', 'идите'],
    ],
    mistakes: [
      '"Пишите" es вы-formal de писать; "пиши" es ты-informal. No confundirlos.',
      '"Не читать" (prohibición general/infinitivo) vs "не читай" (a esta persona). "Не курить" = prohibido fumar (cartel).',
      '"Дай мне" (dame) — irregular; no "давай мне" (давай = vamos / de acuerdo, diferente sentido).',
    ],
  },

  seo: [
    {
      heading: 'Cómo se forma el imperativo en ruso',
      paragraphs: [
        'El imperativo ruso se deriva de la tercera persona plural del presente. Se extrae la raíz (quitando -ут/-ют/-ат/-ят) y se añade -й si la raíz termina en vocal, o -и/-ь si termina en consonante. Ejemplos: они читают → читай (lee); они говорят → говори (habla); они идут → иди (ve); они встанут → встань (levántate). Para la forma formal/plural (вы), simplemente se añade -те: читайте, говорите, идите, встаньте.',
        'El acento importa en algunos verbos: позвони (llama) lleva acento en la última sílaba — este patrón es común en verbos de la segunda conjugación. Los verbos imperfectivos en imperativo dan instrucciones continuas (говори медленнее — habla más despacio), mientras que los perfectivos expresan una acción puntual (скажи мне — dime).',
      ],
    },
    {
      heading: 'Imperativo negativo y expresiones con давай',
      paragraphs: [
        'El imperativo negativo se forma con не + imperativo: не говори (no hables), не идите (no vayan). En carteles y prohibiciones formales, se usa не + infinitivo: "Не курить" (Prohibido fumar), "Не входить" (No entrar). La diferencia: "не кури" es una orden personal a alguien; "не курить" es una prohibición general.',
        'Давай/Давайте tiene un uso especial: davay + infinitivo imperfectivo = "vamos a": "Давай говорить по-русски" (Hablemos ruso). "Давай" solo = de acuerdo / vamos. El imperativo пожалуйста suaviza la petición: "Скажите, пожалуйста" (Diga, por favor).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'raíz 3pl → -й/-и/-ь | + -те (вы) | не + imper. | давай + inf.',
    graphicPrompt: 'Maestro señalando la pizarra con "Читайте!" y un semáforo con "Не шуми!".',
    scene: [
      ['Говори медленнее, пожалуйста!', '¡Habla más despacio, por favor!'],
      ['Идите прямо, потом направо.', 'Vayan recto, luego a la derecha.'],
      ['Не шуми! Здесь люди спят.', '¡No hagas ruido! Aquí la gente duerme.'],
      ['Дай мне, пожалуйста, эту книгу.', 'Dame ese libro, por favor.'],
      ['Давайте говорить по-русски!', '¡Hablemos ruso!'],
      ['Встань и скажи своё имя.', 'Levántate y di tu nombre.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['raíz + -й/-и/-ь (ты)', '-те para вы', 'не + imperativo (negación)', 'irregulares: иди, дай, ешь, будь'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el imperativo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el imperativo correcto para ты o вы.',
        type: 'choice',
        items: [
          {
            scene: '___ (читать) эту книгу! — informal (ты)',
            lines: [['', '___ эту книгу! (informal)']],
            options: ['Читай', 'Читайте', 'Читает', 'Читать'],
            answer: 'Читай',
            explain: '"Читай" — raíz читай- (они читают → читай). Forma ты.',
          },
          {
            scene: '___ (говорить) медленнее, пожалуйста. — formal (вы)',
            lines: [['', '___ медленнее, пожалуйста. (formal)']],
            options: ['Говорите', 'Говори', 'Говорит', 'Говорить'],
            answer: 'Говорите',
            explain: '"Говорите" — говори + те = вы-форма. Formal/plural.',
          },
          {
            scene: 'Не ___ (шуметь) здесь! — informal',
            lines: [['', 'Не ___ здесь! (informal)']],
            options: ['шуми', 'шумите', 'шумеешь', 'шуметь'],
            answer: 'шуми',
            explain: '"шуми" — imperativo ты de шуметь. Не шуми = no hagas ruido.',
          },
          {
            scene: '___ (дать) мне воды, пожалуйста.',
            lines: [['', '___ мне воды, пожалуйста.']],
            options: ['Дай', 'Дайте', 'Давай', 'Дать'],
            answer: 'Дай',
            explain: '"Дай" — irregular, imperativo ты de дать. "Дайте" sería formal.',
          },
          {
            scene: '___ (идти) прямо и потом налево. — formal (вы)',
            lines: [['', '___ прямо и потом налево. (formal)']],
            options: ['Идите', 'Иди', 'Идёт', 'Идти'],
            answer: 'Идите',
            explain: '"Идите" — иди + те = форма вы. Иди = ты (informal).',
          },
          {
            scene: 'Давай ___ (говорить) по-русски!',
            lines: [['', 'Давай ___ по-русски!']],
            options: ['говорить', 'говори', 'говорите', 'говоришь'],
            answer: 'говорить',
            explain: '"говорить" — давай + infinitivo = vamos a hablar.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Ты vs вы',
        tag: '2 espacios',
        intro: 'Completa con la forma ты y la forma вы del mismo verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Informal y formal de писать (escribir).',
            lines: [['', 'Ты: [[0]] здесь. Вы: [[1]] здесь.']],
            blanks: [
              { options: ['Пиши', 'Пишите', 'Пишет', 'Писать'], answer: 'Пиши', explain: '"Пиши" — ты-форма: oni pišut → raíz piš- + и.' },
              { options: ['Пишите', 'Пиши', 'Пишет', 'Писать'], answer: 'Пишите', explain: '"Пишите" — вы-форма: пиши + те.' },
            ],
          },
          {
            scene: 'Informal y formal de встать (levantarse).',
            lines: [['', 'Ты: [[0]] с места. Вы: [[1]] с мест.']],
            blanks: [
              { options: ['Встань', 'Встаньте', 'Встаёт', 'Встать'], answer: 'Встань', explain: '"Встань" — ты-форма: oni vstánut → raíz vstan- + ь.' },
              { options: ['Встаньте', 'Встань', 'Встаёт', 'Встать'], answer: 'Встаньте', explain: '"Встаньте" — вы-форма: встань + те.' },
            ],
          },
          {
            scene: 'Imperativo negativo de слушать (escuchar) — ты y вы.',
            lines: [['', 'Не [[0]] музыку сейчас! (ты) / Не [[1]] громко! (вы)']],
            blanks: [
              { options: ['слушай', 'слушайте', 'слушает', 'слушать'], answer: 'слушай', explain: '"слушай" — ты-imperativo: они слушают → слушай.' },
              { options: ['слушайте', 'слушай', 'слушает', 'слушать'], answer: 'слушайте', explain: '"слушайте" — вы-форма: слушай + те.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Instrucciones en clase',
        tag: 'Texto guiado',
        intro: 'Completa las instrucciones del profesor.',
        type: 'guidedText',
        scene: 'Профессор даёт задания студентам.',
        text: '[[0]] (Открыть-вы) учебники на странице пять. [[1]] (Читать-вы) текст внимательно. [[2]] (Не говорить-вы) по-английски. [[3]] (Отвечать-вы) на вопросы. Если не понимаете — [[4]] (спросить-вы) меня.',
        blanks: [
          { options: ['Откройте', 'Открой', 'Открыть', 'Открывайте'], answer: 'Откройте', explain: '"Откройте" — вы-форма pf. de открыть. открой + те.' },
          { options: ['Читайте', 'Читай', 'Читать', 'Читает'], answer: 'Читайте', explain: '"Читайте" — вы-форма impf. de читать.' },
          { options: ['Не говорите', 'Не говори', 'Не говорить', 'Не говорит'], answer: 'Не говорите', explain: '"Не говорите" — вы-форма negativa: не + говорите.' },
          { options: ['Отвечайте', 'Отвечай', 'Отвечать', 'Отвечает'], answer: 'Отвечайте', explain: '"Отвечайте" — вы-форма de отвечать.' },
          { options: ['спросите', 'спроси', 'спрашивать', 'спрашивайте'], answer: 'спросите', explain: '"спросите" — вы-форма pf. de спросить (acción puntual).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el imperativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma imperativa correcta.',
        type: 'freeText',
        scene: 'Образуй повелительное наклонение.',
        text: 'Смотреть → ___ (ты-форма) / Пить → ___ (вы-форма) / Написать → ___ (ты-форма) / Есть → ___ (ты-форма, irregular)',
        blanks: [
          { answer: 'смотри', explain: '"смотри" — они смотрят → raíz смотр- + и.' },
          { answer: 'пейте', explain: '"пейте" — пей (ты) + те. пить → пей (irregular).' },
          { answer: 'напиши', explain: '"напиши" — написать (pf.) → oni napišut → napíš- + и.' },
          { answer: 'ешь', explain: '"ешь" — irregular de есть (comer). ты-форма: ешь.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe instrucciones',
        tag: 'Escritura guiada',
        intro: 'Escribe peticiones e instrucciones en ruso.',
        type: 'write',
        items: [
          {
            scene: 'Di "habla más despacio" de forma informal.',
            prompt: 'Usa говорить → говори + медленнее.',
            answer: 'Говори медленнее!',
            accepted: ['Говори, пожалуйста, медленнее.'],
            explain: '"Говори" — ты-форма de говорить. медленнее = más despacio.',
          },
          {
            scene: 'Di "no entren" de forma formal.',
            prompt: 'Usa входить → входите → не входите.',
            answer: 'Не входите!',
            accepted: ['Пожалуйста, не входите.'],
            explain: '"Не входите" — вы-форма negativa. входи + те = входите → не входите.',
          },
          {
            scene: 'Sugiere "hablemos ruso" usando давайте.',
            prompt: 'Usa давайте + говорить (infinitivo).',
            answer: 'Давайте говорить по-русски!',
            accepted: ['Давайте говорить только по-русски.'],
            explain: '"Давайте говорить" — propuesta colectiva. давайте + infinitivo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tus instrucciones y consejos',
        tag: 'Escritura libre',
        intro: 'Da consejos o instrucciones a alguien usando el imperativo.',
        type: 'write',
        items: [
          {
            scene: 'Da 4 consejos a un amigo que estudia ruso.',
            prompt: 'Используй говори/читай/слушай/пиши cada día.',
            answer: 'Говори по-русски каждый день! Читай русские тексты. Слушай подкасты. Пиши новые слова в тетрадь.',
            accepted: ['Занимайся каждый день. Не бойся ошибок. Смотри фильмы на русском. Говори с носителями.'],
            explain: 'Imperativo ты: говори, читай, слушай, пиши — todos de la 3ra pl.',
          },
          {
            scene: 'Escribe las instrucciones para una receta simple.',
            prompt: 'Используй вы-форму: нарежьте, добавьте, перемешайте, подавайте.',
            answer: 'Нарежьте овощи. Добавьте соль и перец. Перемешайте всё хорошо. Подавайте горячим.',
            accepted: ['Возьмите яйца. Разбейте их в миску. Добавьте молоко. Перемешайте и жарьте.'],
            explain: 'вы-форма pf. para instrucciones de receta: нарежьте, добавьте, перемешайте.',
          },
        ],
      },
    ],
  },
}

export default topic
