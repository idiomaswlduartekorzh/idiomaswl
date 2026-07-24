import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparativos',
  order: '11',
  color: '#1a2ecc',
  category: 'Comparación',
  level: 'A2',
  title: 'Comparativos en ruso A2: более/менее, -ее/-е, чем',
  shortTitle: 'Comparativos',
  metaTitle: 'Comparativos ruso A2 — более/менее + adj, comparativo corto -ее, чем, сравнение',
  description:
    'El comparativo en ruso tiene dos formas: la forma analítica (более/менее + adjetivo) y la forma sintética (sufijo -ее/-е o -ше). La forma sintética es más común en el habla: новый → новее, старый → старше, хороший → лучше (irreg.), плохой → хуже (irreg.), большой → больше, маленький → меньше. La comparación usa чем (que): Он старше, чем я. O el genitivo sin чем: Он старше меня.',
  lead: 'Он старше меня / Этот город больше, чем тот: los comparativos en ruso A2.',
  outcomes: [
    'Formar comparativos cortos con -ее/-е',
    'Usar чем + nominativo para "que"',
    'Usar el genitivo sin чем',
    'Reconocer comparativos irregulares (лучше, хуже, больше, меньше)',
  ],

  guide: {
    goal: 'Comparar personas y cosas usando los comparativos cortos y la construcción con чем.',
    model: 'Этот фильм интереснее того. (Esta película es más interesante que aquella.) / Она лучше готовит, чем я. (Ella cocina mejor que yo.)',
    formula: 'adj + -ее/-е = comparativo corto | более/менее + adj = formal | X + Comp + чем Y / X + Comp + Gen(Y)',
    decisions: [
      'Sufijo -ее: новый → новее, красивый → красивее, интересный → интереснее',
      'Sufijo -е (con alternancia): молодой → моложе, старый → старше, дорогой → дороже',
      'Irregulares: хороший → лучше | плохой → хуже | большой → больше | маленький → меньше',
      'Con чем: "Москва больше, чем Лондон" (+ nominativo después de чем)',
      'Con genitivo: "Москва больше Лондона" (=Лондон → Лондона genitivo)',
    ],
    table: [
      ['Adjetivo', 'Comparativo', 'Ejemplo'],
      ['новый / старый', 'новее / старше', 'Он старше меня на 5 лет'],
      ['большой / маленький', 'больше / меньше', 'Этот дом больше, чем тот'],
      ['хороший / плохой', 'лучше / хуже', 'Она говорит лучше, чем я'],
    ],
    mistakes: [
      '"Он более старше" ❌ → "Он старше" ✓ — no se combina более con forma corta.',
      '"Лондон больше, чем Москва" (según datos) o "Москва больше, чем Лондон" — verifica el hecho.',
      '"Чем" requiere nominativo: "больше, чем я" ✓ (не "меня" tras чем).',
    ],
  },

  seo: [
    {
      heading: 'Comparativo corto: sufijos -ее y -е',
      paragraphs: [
        'La forma más común del comparativo en ruso es la forma corta invariable. Se añade -ее al radical del adjetivo: новый → нов + ее = новее (más nuevo), интересный → интереснее (más interesante), красивый → красивее (más bonito). Esta forma no concuerda en género ni número, es invariable: он красивее / она красивее / они красивее.',
        'Algunos adjetivos usan -е con alternancia consonántica: старый → старше (г/д/з/т/с alternan con ж/ж/ж/ч/ш): дорогой → дороже, молодой → моложе, богатый → богаче, тихий → тише, громкий → громче. Los irregulares principales son: хороший → лучше, плохой → хуже, большой → больше, маленький → меньше.',
      ],
    },
    {
      heading: 'Construcción comparativa: чем vs genitivo',
      paragraphs: [
        'Para decir "más X que Y" en ruso hay dos opciones equivalentes. Con чем + nominativo: "Москва больше, чем Лондон" (Moscú es más grande que Londres). Sin чем + genitivo del segundo término: "Москва больше Лондона". Ambas son correctas; la versión con чем es más explícita, la del genitivo más compacta.',
        'La forma analítica (более + adjetivo) se reserva para estilos formales o escritos: "более интересный фильм" (un film más interesante). En el habla cotidiana se prefiere la forma corta: интереснее.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Comp. corto: adj + -ее/-е. Irr.: лучше/хуже/больше/меньше. X + comp + чем Y.',
    graphicPrompt: 'Balanza comparando dos elementos con sus comparativos.',
    scene: [
      ['Этот фильм интереснее того.', 'Esta película es más interesante que aquella.'],
      ['Она моложе, чем он — ей 25 лет.', 'Ella es más joven que él — tiene 25 años.'],
      ['Москва больше, чем Санкт-Петербург.', 'Moscú es más grande que San Petersburgo.'],
      ['Он говорит по-русски лучше меня.', 'Él habla ruso mejor que yo.'],
      ['Этот отель дороже, чем тот.', 'Este hotel es más caro que aquel.'],
      ['Новый компьютер работает быстрее старого.', 'El ordenador nuevo funciona más rápido que el viejo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['adj + -ее/-е', 'лучше/хуже/больше/меньше', 'X + comp + чем + Nom', 'X + comp + Gen'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma el comparativo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma comparativa correcta del adjetivo.',
        type: 'choice',
        items: [
          {
            scene: 'Этот дом ___ (большой) того.',
            lines: [['', 'Этот дом ___ того.']],
            options: ['больше', 'более большой', 'большее', 'больший'],
            answer: 'больше',
            explain: '"больше" — большой → больше (irregular). No "более большой" con forma larga.',
          },
          {
            scene: 'Она ___ (молодой), чем он.',
            lines: [['', 'Она ___, чем он.']],
            options: ['моложе', 'молодее', 'младше'],
            answer: 'моложе',
            explain: '"моложе" — молодой + alternancia: молод + же = моложе.',
          },
          {
            scene: 'Он говорит по-английски ___ (хороший), чем я.',
            lines: [['', 'Он говорит по-английски ___, чем я.']],
            options: ['лучше', 'хорошее', 'более хорошо', 'лучший'],
            answer: 'лучше',
            explain: '"лучше" — хороший → лучше (irregular). Comparativo de буено.',
          },
          {
            scene: 'Эта задача ___ (интересный) предыдущей.',
            lines: [['', 'Эта задача ___ предыдущей.']],
            options: ['интереснее', 'интересное', 'более интересно', 'интересней'],
            answer: 'интереснее',
            explain: '"интереснее" — интересный → интересн + ее = интереснее.',
          },
          {
            scene: 'Сегодня погода ___ (плохой), чем вчера.',
            lines: [['', 'Сегодня погода ___, чем вчера.']],
            options: ['хуже', 'плохее', 'более плохая'],
            answer: 'хуже',
            explain: '"хуже" — плохой → хуже (irregular). Comparativo de malo.',
          },
          {
            scene: 'Этот рюкзак ___ (лёгкий), чем тот.',
            lines: [['', 'Этот рюкзак ___, чем тот.']],
            options: ['легче', 'лёгкее', 'более лёгкий', 'лёгче'],
            answer: 'легче',
            explain: '"легче" — лёгкий + alternancia: лег + ч + е = легче.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Comparación de dos cosas',
        tag: '2 espacios',
        intro: 'Completa la comparación con los dos comparativos correctos.',
        type: 'dual',
        items: [
          {
            scene: 'El metro es más rápido pero el autobús es más cómodo.',
            lines: [['', 'Метро [[0]] (быстрый), но автобус [[1]] (удобный).']],
            blanks: [
              { options: ['быстрее', 'более быстрее', 'быстрей', 'более быстрый'], answer: 'быстрее', explain: '"быстрее" — быстрый → быстр + ее = быстрее.' },
              { options: ['удобнее', 'удобней', 'более удобный', 'удобнее'], answer: 'удобнее', explain: '"удобнее" — удобный → удобн + ее = удобнее.' },
            ],
          },
          {
            scene: 'Este libro es más interesante y más largo que aquel.',
            lines: [['', 'Эта книга [[0]] (интересный) и [[1]] (длинный), чем та.']],
            blanks: [
              { options: ['интереснее', 'интереснее', 'более интересная', 'интересней'], answer: 'интереснее', explain: '"интереснее" — invariable. интересн + ее.' },
              { options: ['длиннее', 'длинее', 'более длинная', 'длиннее'], answer: 'длиннее', explain: '"длиннее" — длинный → длинн + ее = длиннее.' },
            ],
          },
          {
            scene: 'Él habla ruso mejor pero escribe peor.',
            lines: [['', 'Он говорит по-русски [[0]], но пишет [[1]].']],
            blanks: [
              { options: ['лучше', 'хорошее', 'более хорошо', 'лучший'], answer: 'лучше', explain: '"лучше" — хорошо/хороший → лучше (irregular).' },
              { options: ['хуже', 'плохее', 'более плохо', 'хуже'], answer: 'хуже', explain: '"хуже" — плохо/плохой → хуже (irregular).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Comparación de ciudades',
        tag: 'Texto guiado',
        intro: 'Completa el texto con comparativos.',
        type: 'guidedText',
        scene: 'Сравниваем Москву и Санкт-Петербург.',
        text: 'Москва [[0]] (большой), чем Санкт-Петербург. Но Петербург [[1]] (красивый) в архитектурном плане. Жизнь в Петербурге [[2]] (дешёвый), чем в Москве. Зато в Москве зарплаты [[3]] (высокий). Лично я думаю, что Петербург [[4]] для туристов.',
        blanks: [
          { options: ['больше', 'более большая', 'больший', 'большее'], answer: 'больше', explain: '"больше" — большой → больше (irregular).' },
          { options: ['красивее', 'красивее', 'более красивый', 'красивей'], answer: 'красивее', explain: '"красивее" — красивый → красив + ее = красивее.' },
          { options: ['дешевле', 'дешевее', 'более дешёвый', 'дешевле'], answer: 'дешевле', explain: '"дешевле" — дешёвый + alternancia: дешев + ле = дешевле.' },
          { options: ['выше', 'высокее', 'более высокий', 'высоче'], answer: 'выше', explain: '"выше" — высокий → выше (alternancia + irregular).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el comparativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el comparativo correcto.',
        type: 'freeText',
        scene: 'Образуйте сравнительную степень прилагательного.',
        text: 'Он [[0]] (молодой) своей сестры. / Этот фильм [[1]] (плохой), чем тот. / Она говорит [[2]] (тихий), чем он. / Этот ресторан [[3]] (хороший) предыдущего.',
        blanks: [
          { answer: 'моложе', explain: '"моложе" — молодой → моложе (alternancia г→ж).' },
          { answer: 'хуже', explain: '"хуже" — плохой → хуже (irregular).' },
          { answer: 'тише', explain: '"тише" — тихий → тише (alternancia х→ш).' },
          { answer: 'лучше', explain: '"лучше" — хороший → лучше (irregular).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye comparaciones',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración comparativa completa.',
        type: 'write',
        items: [
          {
            scene: 'Moscú es más grande que San Petersburgo.',
            prompt: 'Usa больше + чем.',
            answer: 'Москва больше, чем Санкт-Петербург.',
            accepted: ['Москва больше Санкт-Петербурга.'],
            explain: '"больше, чем" + nominativo | "больше" + genitivo (Санкт-Петербурга).',
          },
          {
            scene: 'Ella habla inglés mejor que yo.',
            prompt: 'Usa лучше + меня (genitivo).',
            answer: 'Она говорит по-английски лучше меня.',
            accepted: ['Она говорит по-английски лучше, чем я.'],
            explain: '"лучше меня" = mejor que yo. меня = genitivo de я.',
          },
          {
            scene: 'Este ejercicio es más difícil que el anterior.',
            prompt: 'Usa труднее/сложнее + чем / genitivo.',
            answer: 'Это упражнение труднее, чем предыдущее.',
            accepted: ['Это упражнение сложнее предыдущего.'],
            explain: '"труднее" — трудный → трудн + ее = труднее. O: сложнее.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Compara cosas de tu vida',
        tag: 'Escritura libre',
        intro: 'Escribe comparaciones sobre tu vida cotidiana.',
        type: 'write',
        items: [
          {
            scene: 'Compara dos ciudades que conoces.',
            prompt: 'Используй больше/меньше, красивее, дороже, лучше/хуже и др.',
            answer: 'Мой город меньше, чем Москва, но он красивее и тише. Жизнь здесь дешевле, и воздух чище. Зато в Москве работы больше и зарплаты выше.',
            accepted: ['Барселона красивее Мадрида, но Мадрид больше. Жизнь в Мадриде немного дешевле, чем в Барселоне. Пляжи в Барселоне лучше.'],
            explain: 'Comparativos: красивее (-ее), тише (ш), дешевле (лe), чище (ч), лучше (irr.).',
          },
          {
            scene: 'Compara el estudio online con el presencial.',
            prompt: 'Используй сравнительные прилагательные и наречия.',
            answer: 'Учиться онлайн удобнее, потому что не надо ехать в класс. Но живые занятия интереснее и эффективнее для практики. Онлайн-курсы дешевле, зато очные занятия лучше для мотивации.',
            accepted: ['Онлайн-обучение гибче и дешевле. Но учиться с преподавателем эффективнее. Общение вживую лучше, чем через экран.'],
            explain: 'удобнее, интереснее, эффективнее (-ее) | дешевле, гибче (alternancia) | лучше (irr.).',
          },
        ],
      },
    ],
  },
}

export default topic
