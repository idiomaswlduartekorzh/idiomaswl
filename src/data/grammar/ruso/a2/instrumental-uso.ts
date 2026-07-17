import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'instrumental-uso',
  order: '07',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A2',
  title: 'El instrumental en ruso: profesiones, с и medios de transporte',
  shortTitle: 'Instrumental',
  metaTitle: 'Instrumental ruso A2 | Он работает врачом, с другом, на автобусе',
  description:
    'El instrumental ruso expresa el instrumento, el medio o la compañía. Tiene tres usos principales en A2: profesiones con работать (Он работает врачом — trabaja de médico), compañía con с (с другом — con el amigo), y medios de transporte (ехать на автобусе).',
  lead: 'Aprende el caso instrumental: Он работает врачом (trabaja de médico), Я иду с другом (voy con mi amigo), Мы едем на автобусе (vamos en autobús).',
  outcomes: [
    'Usar el instrumental con работать para expresar profesiones',
    'Usar с + instrumental para expresar compañía',
    'Usar медios de transporte con ехать/идти',
  ],
  guide: {
    goal: 'Usar el instrumental en los tres contextos principales del A2: profesión, compañía y medio.',
    model: 'Сущ. в instrumental: masc -ом/-ем, fem -ой/-ей, neutro -ом/-ем, pl -ами/-ями',
    formula: 'работать + instrumental | с + instrumental | ехать на + prepositivo (транспорт)',
    decisions: [
      '¿Expresas profesión con работать, быть, стать? → sustantivo en instrumental',
      '¿Dices "con alguien"? → с + dativo (¡No! → с + instrumental)',
      '¿Medio de transporte? → ехать/идти на + prepositivo (en autobús = на автобусе)',
      'Instrumental masculino: врач → врачом | студент → студентом',
      'Instrumental femenino: учительница → учительницей | подруга → подругой',
    ],
    table: [
      ['Sustantivo', 'Nominativo', 'Instrumental'],
      ['médico (masc)', 'врач', 'врачом'],
      ['profesora (fem)', 'учительница', 'учительницей'],
      ['amigo (masc)', 'друг', 'другом'],
      ['amiga (fem)', 'подруга', 'подругой'],
      ['estudiante (masc)', 'студент', 'студентом'],
      ['hermana (fem)', 'сестра', 'сестрой'],
    ],
    mistakes: [
      'NO uses nominativo con работать: NO «он работает врач» → он работает врачом.',
      'с siempre rige instrumental, no nominativo: NO «с друг» → с другом.',
      'Medio de transporte: на автобусе (prepositivo), no «с автобусом».',
      'Instrumental pl.: с друзьями (amigos), с сёстрами (hermanas) — terminación -ами/-ями.',
    ],
  },
  seo: [
    {
      heading: 'El instrumental con trabajar: profesiones en ruso',
      paragraphs: [
        'En ruso, para decir en qué trabaja alguien se usa работать + sustantivo en instrumental. Por ejemplo: Он работает врачом (trabaja de médico), Она работает учительницей (trabaja de profesora). Esto es diferente del español donde se usa "de" + nominativo.',
        'Los verbos быть (ser) y стать (llegar a ser) también rigen instrumental: Он хочет быть врачом (quiere ser médico), Она стала директором (se convirtió en directora).',
      ],
      table: [
        ['Profesión', 'Masculino', 'Femenino'],
        ['médico', 'врач → врачом', 'врач → врачом'],
        ['profesor/a', 'учитель → учителем', 'учительница → учительницей'],
        ['estudiante', 'студент → студентом', 'студентка → студенткой'],
        ['ingeniero/a', 'инженер → инженером', 'инженер → инженером'],
      ],
    },
    {
      heading: 'С + instrumental: la compañía',
      paragraphs: [
        'La preposición с (con) siempre rige instrumental en ruso. Ejemplos: Я иду с другом (voy con mi amigo), Она разговаривала с мамой (hablaba con su madre), Мы с братом (mi hermano y yo — lit. nosotros con el hermano).',
        'Esta estructura también se usa para expresar ingredientes o componentes: суп с курицей (sopa con pollo), чай с лимоном (té con limón), хлеб с маслом (pan con mantequilla).',
      ],
    },
  ],
  visual: {
    mode: 'case-table',
    teacherLens:
      'Three high-frequency instrumental contexts: profession (работать), company (с), and ingredients. Drill each context separately before combining.',
    graphicPrompt:
      'Three panels: 1) person at work with profession label in instrumental, 2) two people together with с + instrumental, 3) food items showing с + ingredient in instrumental.',
    scene: [
      ['Profesión', 'работать врачом / учителем / студентом / журналистом'],
      ['Compañía', 'с другом / с подругой / с братом / с мамой / с коллегой'],
      ['Ingredientes', 'чай с молоком / суп с курицей / хлеб с маслом'],
      ['Masc. -ом', 'врач→врачом / студент→студентом / друг→другом'],
      ['Fem. -ой/-ей', 'подруга→подругой / учительница→учительницей'],
    ],
    learnerModes: ['recognition', 'case-drilling', 'gap-fill', 'production'],
    practiceVerbs: ['работать', 'быть', 'стать', 'идти с', 'говорить с'],
    reviewFocus: ['работать + инструментальный', 'с + инструментальный', 'окончания -ом/-ей'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identificar el instrumental correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del instrumental.',
        type: 'choice',
        items: [
          {
            scene: 'Profesión masculina',
            lines: [['', 'Он работает _____. (médico — врач → instrumental)']],
            options: ['врачом', 'врач', 'врача', 'врачу'],
            answer: 'врачом',
            explain: 'работать + instrumental masculino: врач → врачом (-ом).',
          },
          {
            scene: 'Profesión femenina',
            lines: [['', 'Она работает _____. (profesora — учительница → instrumental)']],
            options: ['учительницей', 'учительница', 'учительницу', 'учительнице'],
            answer: 'учительницей',
            explain: 'работать + instrumental femenino: учительница → учительницей (-ей).',
          },
          {
            scene: 'Con + amigo',
            lines: [['', 'Я иду в кино с _____. (con mi amigo — друг)']],
            options: ['другом', 'друга', 'другу', 'друге'],
            answer: 'другом',
            explain: 'с + instrumental: друг → другом (-ом).',
          },
          {
            scene: 'Con + amiga',
            lines: [['', 'Она пошла в магазин с _____. (con su amiga — подруга)']],
            options: ['подругой', 'подруга', 'подруги', 'подруге'],
            answer: 'подругой',
            explain: 'с + instrumental femenino: подруга → подругой (-ой).',
          },
          {
            scene: 'Ingrediente',
            lines: [['', 'Я пью чай с _____. (con leche — молоко)']],
            options: ['молоком', 'молоко', 'молока', 'молоке'],
            answer: 'молоком',
            explain: 'с + instrumental neutro: молоко → молоком (-ом).',
          },
          {
            scene: 'Querer ser',
            lines: [['', 'Она хочет быть _____. (quiere ser arquitecta — архитектор)']],
            options: ['архитектором', 'архитектор', 'архитектора', 'архитекторе'],
            answer: 'архитектором',
            explain: 'быть + instrumental: архитектор → архитектором.',
          },
          {
            scene: 'Con + mamá',
            lines: [['', 'Я говорил с _____. (hablé con mi madre — мама)']],
            options: ['мамой', 'мама', 'мамы', 'маме'],
            answer: 'мамой',
            explain: 'с + instrumental femenino: мама → мамой (-ой).',
          },
          {
            scene: 'Identificar error',
            lines: [['', '¿Qué es incorrecto?']],
            options: ['Он работает учитель', 'Он работает учителем', 'Она работает врачом', 'Они работают студентами'],
            answer: 'Он работает учитель',
            explain: 'trabajar + profesión requiere instrumental: НЕ учитель → учителем.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Contexto y forma instrumental',
        tag: '2 espacios',
        intro: 'Completa con el verbo y la forma instrumental correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Profesión — masculino',
            lines: [['', 'Он [[0]] [[1]]. (trabaja de ingeniero — инженер)']],
            blanks: [
              { options: ['работает', 'работать', 'работал'], answer: 'работает', explain: 'Presente: он работает.' },
              { options: ['инженером', 'инженер', 'инженеру'], answer: 'инженером', explain: 'Instrumental: инженер → инженером.' },
            ],
          },
          {
            scene: 'Compañía — femenino',
            lines: [['', 'Я иду с [[0]] в театр. [[1]] = instrumental de сестра']],
            blanks: [
              { options: ['сестрой', 'сестра', 'сестры'], answer: 'сестрой', explain: 'с + instrumental: сестра → сестрой.' },
              { options: ['сестрой', 'сестра', 'сестре'], answer: 'сестрой', explain: 'Confirmación: сестрой.' },
            ],
          },
          {
            scene: 'Ingrediente — neutro',
            lines: [['', 'Он любит суп с [[0]]. [[1]] = instrumental de курица']],
            blanks: [
              { options: ['курицей', 'курица', 'курицу'], answer: 'курицей', explain: 'с + instrumental: курица → курицей (-ей).' },
              { options: ['курицей', 'курицу', 'куриц'], answer: 'курицей', explain: 'Confirmación: курицей.' },
            ],
          },
          {
            scene: 'Llegar a ser',
            lines: [['', 'Она хочет стать [[0]]. [[1]] = tipo de profesión']],
            blanks: [
              { options: ['журналисткой', 'журналист', 'журналистка'], answer: 'журналисткой', explain: 'стать + instrumental femenino: журналистка → журналисткой.' },
              { options: ['журналисткой', 'журналист', 'журналисту'], answer: 'журналисткой', explain: 'Confirmación: журналисткой.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — instrumental en contexto',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas instrumentales correctas.',
        type: 'guidedText',
        scene: 'Mis amigos y yo',
        text: 'Мой друг работает [[0]]. Его жена стала [[1]]. Вчера я ходил в кино с [[2]]. Мы пили кофе с [[3]]. Она хочет быть [[4]].',
        blanks: [
          { options: ['программистом', 'программист', 'программисту'], answer: 'программистом', explain: 'работать + instrumental masc.: программист → программистом.' },
          { options: ['врачом', 'врач', 'врача'], answer: 'врачом', explain: 'стать + instrumental: врач → врачом.' },
          { options: ['подругой', 'подруга', 'подруги'], answer: 'подругой', explain: 'с + instrumental fem.: подруга → подругой.' },
          { options: ['молоком', 'молоко', 'молока'], answer: 'молоком', explain: 'с + instrumental neut.: молоко → молоком.' },
          { options: ['учительницей', 'учительница', 'учительнице'], answer: 'учительницей', explain: 'быть + instrumental fem.: учительница → учительницей.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — instrumental sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del instrumental.',
        type: 'freeText',
        scene: 'Completar con el instrumental',
        text: '1. Она работает [[0]]. (журналист) 2. Я иду в парк с [[1]]. (друг) 3. Он хочет стать [[2]]. (архитектор) 4. Чай с [[3]] — мой любимый. (лимон) 5. Мы с [[4]] — лучшие друзья. (сестра)',
        blanks: [
          { answer: 'журналистом', accepted: ['журналистом'], explain: 'работать + instrumental: журналист → журналистом.' },
          { answer: 'другом', accepted: ['другом'], explain: 'с + instrumental masc.: друг → другом.' },
          { answer: 'архитектором', accepted: ['архитектором'], explain: 'стать + instrumental: архитектор → архитектором.' },
          { answer: 'лимоном', accepted: ['лимоном'], explain: 'с + instrumental masc.: лимон → лимоном.' },
          { answer: 'сестрой', accepted: ['сестрой'], explain: 'с + instrumental fem.: сестра → сестрой.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el instrumental.',
        type: 'write',
        items: [
          {
            scene: 'Profesión',
            prompt: 'Escribe en ruso: "Mi padre trabaja de médico." (мой отец, работать, врач)',
            answer: 'Мой отец работает врачом.',
            accepted: ['мой отец работает врачом', 'отец работает врачом'],
            explain: 'работать + instrumental: врач → врачом.',
          },
          {
            scene: 'Compañía',
            prompt: 'Escribe: "Fui al cine con mi hermana." (я, идти, в кино, сестра)',
            answer: 'Я ходил в кино с сестрой.',
            accepted: ['я ходил в кино с сестрой', 'ходила в кино с сестрой', 'пошёл с сестрой', 'пошла с сестрой'],
            explain: 'с + instrumental: сестра → сестрой.',
          },
          {
            scene: 'Querer ser',
            prompt: 'Escribe: "Ella quiere ser profesora." (она, хотеть, быть, учительница)',
            answer: 'Она хочет быть учительницей.',
            accepted: ['она хочет быть учительницей'],
            explain: 'быть + instrumental fem.: учительница → учительницей.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Habla de profesiones y actividades en compañía usando el instrumental.',
        type: 'write',
        items: [
          {
            scene: 'Mi familia trabaja',
            prompt: 'Escribe 3 oraciones: qué profesión tienen los miembros de tu familia (работает + instrumental).',
            answer: 'Мой папа работает инженером. Моя мама работает учительницей. Мой брат работает программистом.',
            accepted: ['работает', 'работают', 'ом', 'ей'],
            explain: 'работать + instrumental de profesión. Masc. -ом, fem. -ой/-ей.',
          },
          {
            scene: 'Con quién',
            prompt: 'Escribe 2 oraciones sobre lo que hiciste con alguien (с + instrumental).',
            answer: 'Вчера я ходил в кино с другом. Мы пили чай с мамой.',
            accepted: ['с другом', 'с подругой', 'с братом', 'с сестрой', 'с мамой', 'с папой'],
            explain: 'с + instrumental: другом, сестрой, мамой, папой.',
          },
          {
            scene: 'Sueños de futuro',
            prompt: 'Escribe sobre lo que quieres ser en el futuro (хочу быть / стать + instrumental).',
            answer: 'Я хочу быть врачом. Я хочу стать известным журналистом.',
            accepted: ['хочу быть', 'хочу стать', 'ом', 'ей'],
            explain: 'быть/стать + instrumental de profesión.',
          },
        ],
      },
    ],
  },
}

export default topic
