import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'participios-pasivos-b1',
  order: '03',
  color: '#1a2ecc',
  category: 'Participios',
  level: 'B1',
  title: 'Participios Pasivos en Ruso B1',
  shortTitle: 'Participios Pasivos',
  metaTitle: 'Participios Pasivos en Ruso B1 — Formas Largas y Cortas (-нный, -тый, -мый)',
  description:
    'Los participios pasivos expresan que el sustantivo recibe la acción de un agente. En ruso tienen formas largas (declinables, como adjetivos) y formas cortas (indeclinables, solo predicativas). Los sufijos clave son -нный/-енный para verbos en -ать/-ить y -тый para ciertos verbos. Las formas cortas (-н/-ен/-т) son esenciales para la voz pasiva formal.',
  lead: 'Domina los participios pasivos largos (-нный/-енный/-тый) y sus formas cortas (-н/-ен/-т) para leer textos formales y construir oraciones pasivas en ruso.',
  outcomes: [
    'Forma participios pasivos largos de presente (-мый) y de pasado (-нный/-енный/-тый)',
    'Usa las formas cortas del participio pasivo (-н/-ена/-ено/-ены) como predicado',
    'Distingue participio pasivo largo (atributivo) de forma corta (predicativa)',
    'Lee y comprende oraciones pasivas con participios en textos formales y científicos',
  ],

  guide: {
    goal: 'Reconocer y usar participios pasivos largos y cortos para leer textos formales y escribir en registro académico o periodístico.',
    model: 'написанное письмо / Письмо написано. / Задание выполнено. / уважаемый профессор',
    formula: 'Participio pasivo largo: [sustantivo] + [participio en género/número/caso]. Forma corta: [sujeto] + [forma corta]',
    decisions: [
      'Participio pasivo PRESENTE (solo НСВ transitivos): tema pers. plural − -т/-ат + -мый: читать → читаемый',
      'Participio pasivo PASADO de verbos en -ать/-ять (СВ): infinitivo − ть + -нный: написать → написанный',
      'Participio pasivo PASADO de verbos en -ить/-еть (СВ): infinitivo − ить/-еть + -енный/-ённый: сделать→ сделанный; построить→ построенный',
      'Participio pasivo PASADO de verbos monosilábicos y algunos verbos: + -тый: открыть → открытый, взять → взятый',
      'Forma corta del participio: solo para predicado, quita una -н: написанный → написан/написана/написано/написаны',
    ],
    table: [
      ['Tipo de verbo', 'Sufijo', 'Ejemplo'],
      ['-ать / -ять (СВ pasado)', '-нный', 'написать → написанный'],
      ['-ить / -еть (СВ pasado)', '-енный / -ённый', 'построить → построенный'],
      ['Monosilábicos (СВ)', '-тый', 'открыть → открытый'],
      ['НСВ transitivos (presente)', '-мый', 'читать → читаемый'],
    ],
    mistakes: [
      '"Письмо написанное" — en predicado se usa forma corta: "Письмо написано" ✓.',
      '"Задача решённая" como predicado → "Задача решена" ✓ (forma corta femenina).',
      '"Построеный дом" ❌ → "Построенный дом" ✓ — dos -н- en la forma larga.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los participios pasivos en ruso?',
      paragraphs: [
        'Los participios pasivos (страдательные причастия, stradátelnyye prichástiya) expresan que el sustantivo que modifican recibe la acción de otro sujeto. "Книга, написанная Толстым" — "El libro escrito por Tolstói": la книга (libro) recibe la acción de escribir, realizada por Tolstói.',
        'En ruso los participios pasivos tienen dos formas: la forma LARGA, que funciona como adjetivo y concuerda en género, número y caso con el sustantivo; y la forma CORTA, que es invariable (solo cambia por género y número) y funciona solo como predicado nominal.',
      ],
    },
    {
      heading: '¿Cómo se forman los participios pasivos de pasado?',
      paragraphs: [
        'Para verbos en -ать/-ять (principalmente): се quita -ть y se añade -нный. Например: написать → написанный, прочитать → прочитанный, сделать → сделанный, потерять → потерянный.',
        'Para verbos en -ить/-еть: se quita -ить/-еть y se añade -енный/-ённый (con cambios de consonante en algunos casos): построить → построенный, решить → решённый, приготовить → приготовленный. Para verbos con raíz corta (monosilábicos) se usa -тый: открыть → открытый, взять → взятый, забыть → забытый.',
      ],
      table: [
        ['Infinitivo', 'Forma larga (masc.)', 'Forma corta (masc./fem./neutro/pl.)', 'Traducción'],
        ['написать', 'написанный', 'написан/написана/написано/написаны', 'escrito'],
        ['построить', 'построенный', 'построен/построена/построено/построены', 'construido'],
        ['открыть', 'открытый', 'открыт/открыта/открыто/открыты', 'abierto'],
        ['потерять', 'потерянный', 'потерян/потеряна/потеряно/потеряны', 'perdido'],
      ],
    },
    {
      heading: '¿Cuándo se usa la forma larga y cuándo la corta?',
      paragraphs: [
        'La forma LARGA funciona como adjetivo atributivo y concuerda con su sustantivo en todos los casos: "написанное письмо" (carta escrita, nom. neutro), "в написанном письме" (en la carta escrita, prep. neutro). Se usa cuando el participio modifica directamente al sustantivo.',
        'La forma CORTA solo funciona como predicado (el verbo "ser" está implícito o explícito): "Письмо написано" (La carta está/fue escrita). "Дверь открыта" (La puerta está abierta). Es obligatoria en esta función predicativa — no puedes usar la forma larga como predicado.',
      ],
    },
    {
      heading: 'Participios pasivos de presente (-мый)',
      paragraphs: [
        'Los participios pasivos de presente se forman solo de НСВ transitivos: se toma la 1ª persona plural (мы читаем) y se añade -мый: читаемый (que es leído). Son menos frecuentes que los de pasado pero aparecen en textos formales: "уважаемый" (estimado/apreciado), "видимый" (visible), "любимый" (amado/favorito).',
        'Algunas formas de presente se han lexicalizado como adjetivos comunes: "любимый цвет" (color favorito), "уважаемый коллега" (estimado colega). En contextos formales y científicos son productivos: "используемый метод" (el método utilizado/que se utiliza).',
      ],
    },
    {
      heading: 'Uso del agente con instrumento (творительный падеж)',
      paragraphs: [
        'Cuando se usa un participio pasivo y se quiere mencionar quién realizó la acción, el agente va en caso instrumental: "Роман, написанный Толстым" (La novela escrita por Tolstói). "Дом, построенный рабочими" (La casa construida por los obreros).',
        'Esto equivale a la construcción pasiva en español con "por". Es una construcción muy típica del registro académico y periodístico ruso y aparece frecuentemente en textos de nivel B1-B2.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Participios pasivos — formas largas (atributivas) y formas cortas (predicativas) con el agente en instrumental.',
    graphicPrompt: 'Tabla comparativa: forma larga (atributo) vs forma corta (predicado) con ejemplos de género y número.',
    scene: [
      ['Письмо, написанное другом, лежит на столе. (Pis\'mo, napísannoye drúgam, lezhít na stalé.)', 'La carta escrita por el amigo está sobre la mesa.'],
      ['Дверь открыта. (Dver\' otkrýta.)', 'La puerta está abierta.'],
      ['Задание выполнено. (Zadániye vypalněno.)', 'La tarea está completada.'],
      ['Уважаемый профессор, здравствуйте! (Uvazháyemy proféssor, zdravstvuyte!)', '¡Estimado profesor, buenos días!'],
      ['Книга, написанная Достоевским, переведена на сто языков. (Kníga, napísannaya Dostayévskim, perevedéna na sto yazýkov.)', 'El libro escrito por Dostoievski fue traducido a cien idiomas.'],
      ['Вопросы, решённые на собрании, важны. (Voprósy, reshónniye na sabraníi, vazhnýi.)', 'Las preguntas resueltas en la reunión son importantes.'],
      ['Билеты куплены заранее. (Bilyéty kúpleny zaráneye.)', 'Los billetes están comprados con antelación.'],
      ['Любимый город моей мечты. (Lyubímyi górod mayéy mechty.)', 'La ciudad favorita de mis sueños.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['sufijos -нный/-енный/-тый', 'formas cortas (-н/-ена/-ено/-ены)', 'agente en instrumental'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige el participio pasivo correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'La carta',
            lines: [['', 'Письмо, ___ другом, пришло вчера. (La carta escrita por el amigo llegó ayer.)']],
            options: ['написанное', 'написанный', 'написанная', 'написан'],
            answer: 'написанное',
            explain: 'Письмо — neutro nominativo → participio neutro: написанное. Largo (atributivo).',
          },
          {
            scene: 'La tarea terminada',
            lines: [['', 'Задание ___. Можно идти домой. (La tarea está terminada. Se puede ir a casa.)']],
            options: ['выполнено', 'выполненное', 'выполненный', 'выполненная'],
            answer: 'выполнено',
            explain: 'Predicado → forma corta. Задание (neutro) → выполнено (-о para neutro).',
          },
          {
            scene: 'El libro famoso',
            lines: [['', '___ Толстым роман стал классикой. (La novela escrita por Tolstói se convirtió en clásico.)']],
            options: ['Написанный', 'Написанное', 'Написан', 'Написанная'],
            answer: 'Написанный',
            explain: 'Роман — masculino → написанный. Forma larga atributiva prenominal.',
          },
          {
            scene: 'La puerta',
            lines: [['', 'Дверь ___. Войдите. (La puerta está abierta. Entren.)']],
            options: ['открыта', 'открытая', 'открытый', 'открыто'],
            answer: 'открыта',
            explain: 'Predicado con sujeto femenino (дверь) → forma corta femenina: открыта.',
          },
          {
            scene: 'Los documentos',
            lines: [['', 'Все документы ___ и подписаны. (Todos los documentos están preparados y firmados.)']],
            options: ['готовы', 'готовые', 'готов', 'готово'],
            answer: 'готовы',
            explain: 'Predicado plural → forma corta plural: готовы. (Здесь готов — adjetivo corto, comportamiento igual.)',
          },
          {
            scene: 'La reunión',
            lines: [['', 'Вопрос, ___ на прошлой неделе, очень важный. (La pregunta planteada la semana pasada es muy importante.)']],
            options: ['поставленный', 'поставленная', 'поставлен', 'поставленное'],
            answer: 'поставленный',
            explain: 'Вопрос — masculino nominativo → форма larga: поставленный. Поставить → поставленный.',
          },
          {
            scene: 'Las fotos',
            lines: [['', '___ фотографии очень красивые. (Las fotos tomadas son muy bonitas.)']],
            options: ['Сделанные', 'Сделанный', 'Сделан', 'Сделана'],
            answer: 'Сделанные',
            explain: 'Фотографии — plural → форма larga plural: сделанные.',
          },
          {
            scene: 'El problema resuelto',
            lines: [['', 'Задача, ___ студентом, была правильной. (El problema resuelto por el estudiante era correcto.)']],
            options: ['решённая', 'решённый', 'решена', 'решённое'],
            answer: 'решённая',
            explain: 'Задача — femenino nominativo → форма larga femenina: решённая. Решить → решённый.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Largo y corto en contexto',
        tag: '2 espacios',
        intro: 'Completa con la forma larga o corta del participio pasivo, según el contexto.',
        type: 'dual',
        items: [
          {
            scene: 'En la oficina de correos',
            lines: [['', 'Посылка, другом, уже [[0]]. (El paquete enviado por el amigo ya llegó / ya está enviado.)']],
            blanks: [
              { options: ['отправленная', 'отправленный', 'отправлен', 'отправленное'], answer: 'отправленная', explain: 'Посылка (femenino), forma larga atributiva (modifica al sustantivo) → отправленная.' },
              { options: ['получена', 'получено', 'полученная', 'полученный'], answer: 'получена', explain: 'Predicado con sujeto femenino (посылка) → forma corta: получена.' },
            ],
          },
          {
            scene: 'Describiendo el apartamento',
            lines: [['', '[[0]] дом и [[1]] квартира нам понравились. (La casa construida y el apartamento amueblado nos gustaron.)']],
            blanks: [
              { options: ['Построенный', 'Построен', 'Построенная', 'Построенное'], answer: 'Построенный', explain: 'Дом (masculino) + forma larga atributiva prenominal → Построенный.' },
              { options: ['обставленная', 'обставлен', 'обставленный', 'обставленное'], answer: 'обставленная', explain: 'Квартира (femenino) + forma larga atributiva → обставленная.' },
            ],
          },
          {
            scene: 'Resultados del proyecto',
            lines: [['', 'Проект [[0]]. Все задачи [[1]].']],
            blanks: [
              { options: ['завершён', 'завершённый', 'завершена', 'завершено'], answer: 'завершён', explain: 'Predicado con сujeto masculino (проект) → forma corta: завершён.' },
              { options: ['выполнены', 'выполненные', 'выполнен', 'выполнена'], answer: 'выполнены', explain: 'Predicado con sujeto plural (задачи) → forma corta plural: выполнены.' },
            ],
          },
          {
            scene: 'Carta formal',
            lines: [['', '[[0]] коллеги! Сообщаем, что встреча [[1]] на пятницу.']],
            blanks: [
              { options: ['Уважаемые', 'Уважаемый', 'Уважаем', 'Уважаемая'], answer: 'Уважаемые', explain: 'Уважаемый — participio pasivo de presente lexicalizado. Plural (коллеги) → уважаемые.' },
              { options: ['назначена', 'назначенная', 'назначен', 'назначено'], answer: 'назначена', explain: 'Predicado con сujeto femenino (встреча) → forma corta: назначена.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto formal con participios',
        tag: 'Texto guiado',
        intro: 'Completa el comunicado oficial con participios pasivos en la forma correcta.',
        type: 'guidedText',
        scene: 'Comunicado oficial de una empresa rusa.',
        text: 'Уважаемые сотрудники! [[0]] (направить) вам список изменений. Все решения [[1]] (принять) на совещании в понедельник. [[2]] (обновить) правила работы вступят в силу с первого числа. Новый [[3]] (назначить) руководитель начнёт работу на следующей неделе. Все [[4]] (подготовить) материалы размещены на корпоративном сайте. Сообщаем, что старый офис [[5]] (закрыть) с пятницы.',
        blanks: [
          { options: ['Направленный', 'Направляем', 'Направлен', 'Направленное'], answer: 'Направляем', explain: 'Aquí es el verbo conjugado "enviamos" (НСВ presente 1ª plural) — no un participio. Направлять → направляем.' },
          { options: ['приняты', 'принятые', 'принят', 'принята'], answer: 'приняты', explain: 'Predicado plural (все решения) → forma corta plural: приняты. Принять → принятый → принят/приняты.' },
          { options: ['Обновлённые', 'Обновлены', 'Обновлён', 'Обновлённый'], answer: 'Обновлённые', explain: 'Forma larga atributiva plural prenominal (modifica "правила") → Обновлённые.' },
          { options: ['назначенный', 'назначен', 'назначенная', 'назначенное'], answer: 'назначенный', explain: 'Forma larga atributiva masculino (modifica "руководитель") → назначенный.' },
          { options: ['подготовленные', 'подготовлены', 'подготовленный', 'подготовлена'], answer: 'подготовленные', explain: 'Forma larga plural atributiva (modifica "материалы") → подготовленные.' },
          { options: ['закрыт', 'закрытый', 'закрыта', 'закрыто'], answer: 'закрыт', explain: 'Predicado masculino (офис) → forma corta: закрыт. Закрыть → закрытый → закрыт.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma los participios',
        tag: 'Texto libre',
        intro: 'Escribe el participio pasivo de pasado en la forma larga o corta indicada.',
        type: 'freeText',
        scene: 'Convierte los verbos entre paréntesis a participios pasivos.',
        text: 'Это [[0]] (написать, masc. largo) в 1865 году письмо сейчас хранится в музее. Оно [[1]] (найти, corto neutro) случайно в архиве. [[2]] (переводить, пres. largo, masc.) текст сложный. Статья [[3]] (опубликовать, corto fem.) в журнале. [[4]] (потерять, masc. largo) билет — это проблема.',
        blanks: [
          { answer: 'написанное', accepted: ['написанное'], explain: 'Написать → написанный → neutro (письмо): написанное.' },
          { answer: 'найдено', accepted: ['найдено'], explain: 'Найти → найденный → forma corta neutro (оно): найдено.' },
          { answer: 'Переводимый', accepted: ['Переводимый', 'переводимый'], explain: 'Participio pasivo presente НСВ, masculino: переводить → переводят → переводимый.' },
          { answer: 'опубликована', accepted: ['опубликована'], explain: 'Опубликовать → опубликованный → forma corta femenino (статья): опубликована.' },
          { answer: 'Потерянный', accepted: ['Потерянный', 'потерянный'], explain: 'Потерять → потерянный. Masculino largo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando participios pasivos largo o corto según el contexto.',
        type: 'write',
        items: [
          {
            scene: 'Estado de algo',
            prompt: 'Describe el estado de algo (puerta, ventana, tarea, problema) usando forma corta del participio pasivo.',
            answer: 'Окно открыто. На улице холодно.',
            accepted: ['открыта', 'закрыта', 'открыто', 'закрыто', 'выполнено', 'решено', 'готова', 'готово'],
            explain: 'Forma corta del participio como predicado: дверь открыта, окно открыто, задание выполнено.',
          },
          {
            scene: 'Algo creado o construido',
            prompt: 'Describe algo construido o creado usando participio largo atributivo (casa, libro, puente...).',
            answer: 'Этот мост, построенный в прошлом веке, ещё очень прочный.',
            accepted: ['построенный', 'написанный', 'сделанный', 'созданный', 'открытый'],
            explain: 'Usa la forma larga que concuerda con el sustantivo: построенный мост, написанная книга.',
          },
          {
            scene: 'Resultado de un proceso',
            prompt: 'Escribe una oración donde algo esté terminado o completado usando forma corta del participio.',
            answer: 'Работа закончена. Можно отдохнуть.',
            accepted: ['закончена', 'завершена', 'сделана', 'выполнена', 'написана', 'сдана'],
            explain: 'Forma corta como predicado: работа закончена/сделана, задание выполнено, проект завершён.',
          },
          {
            scene: 'Carta formal',
            prompt: 'Escribe el saludo formal de una carta usando "уважаемый/-ая" (estimado/a).',
            answer: 'Уважаемый профессор Иванов, здравствуйте!',
            accepted: ['уважаемый', 'уважаемая', 'уважаемые'],
            explain: '"Уважаемый/-ая/-ые" es un participio pasivo de presente lexicalizado. Es el saludo estándar en cartas formales rusas.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Texto formal',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones en registro formal usando participios pasivos (largo y/o corto).',
        type: 'write',
        items: [
          {
            scene: 'Anuncio oficial',
            prompt: 'Escribe una oración de anuncio oficial donde algo esté "completado" o "terminado" (используйте краткую форму).',
            answer: 'Ремонт завершён. Офис открыт для посетителей.',
            accepted: ['завершён', 'окончен', 'открыт', 'закрыт', 'выполнен', 'готов'],
            explain: 'Formas cortas como predicados: ремонт завершён, работа выполнена, проект закончен.',
          },
          {
            scene: 'Descripción de objeto',
            prompt: 'Describe un objeto (libro, documento, edificio) con un participio pasivo largo.',
            answer: 'Этот документ, подписанный директором, имеет юридическую силу.',
            accepted: ['подписанный', 'написанный', 'построенный', 'сделанный', 'открытый', 'закрытый'],
            explain: 'Forma larga con agente en instrumental: подписанный директором, написанный автором.',
          },
          {
            scene: 'Resultado de trabajo',
            prompt: 'Escribe una oración describiendo el resultado de un trabajo o proyecto.',
            answer: 'Все материалы подготовлены и отправлены клиенту.',
            accepted: ['подготовлены', 'отправлены', 'выполнены', 'сделаны', 'завершены', 'готовы'],
            explain: 'Formas cortas coordinadas como predicados en plural: подготовлены и отправлены.',
          },
        ],
      },
    ],
  },
}

export default topic
