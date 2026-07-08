import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'deeprichastiya-b1',
  order: '04',
  color: '#1a2ecc',
  category: 'Деепричастия',
  level: 'B1',
  title: 'Деепричастия (Gerundios) en Ruso B1',
  shortTitle: 'Деепричастия (Gerundios)',
  metaTitle: 'Деепричастия en Ruso B1 — Gerundios Imperfectivos (-я) y Perfectivos (-в)',
  description:
    'Los деепричастия (deeprichástiya) son formas verbales invariables que expresan una acción secundaria del mismo sujeto que realiza la acción principal. Los imperfectivos terminan en -я/-а y expresan simultaneidad; los perfectivos en -в/-вши/-ши y expresan acción previa. Son propios del registro escrito formal y literario, pero también aparecen en la lengua hablada culta.',
  lead: 'Aprende a formar y usar los деепричастия (gerundios adverbiales) imperfectivos (-я) y perfectivos (-в) para describir dos acciones simultáneas o consecutivas del mismo sujeto.',
  outcomes: [
    'Forma деепричастия imperfectivos (-я/-а) a partir de verbos НСВ',
    'Forma деепричастия perfectivos (-в/-вши/-ши) a partir de verbos СВ',
    'Usa деепричастия para expresar simultaneidad y acción previa',
    'Identifica la regla del mismo sujeto y evita errores de referencia',
  ],

  guide: {
    goal: 'Usar деепричастия para reducir oraciones compuestas a construcciones más elegantes y formales, manteniendo la coherencia de sujeto.',
    model: 'Читая книгу, он засыпал. / Прочитав письмо, она позвонила другу.',
    formula: 'Деепричастие (invariable) + acción principal [mismo sujeto obligatorio]',
    decisions: [
      'Деепричастие imperfectivo (НСВ): они + -ют/-ат/-ят → quita -ют/-ат/-ят + añade -я o -а: читают → читая; говорят → говоря',
      'Деепричастие perfectivo (СВ): infinitivo − -ть + -в: написать → написав; прийти → придя (irregular)',
      'REGLA CLAVE: el sujeto del деепричастие y de la oración principal SIEMPRE deben ser el mismo',
      'Деепричастие imperfectivo = acción simultánea con la principal (mientras hacía X, hacía Y)',
      'Деепричастие perfectivo = acción previa a la principal (después de hacer X, hizo Y)',
      'Forma negativa: не читая (sin leer), не зная (sin saber) — muy frecuente',
    ],
    table: [
      ['Tipo', 'Formación', 'Ejemplo'],
      ['Imperfectivo НСВ', 'они -ют/-ат/-ят → -я/-а', 'читают → читая (leyendo)'],
      ['Perfectivo СВ (vocal + ть)', 'infinitivo − ть + -в', 'написать → написав (habiendo escrito)'],
      ['Perfectivo СВ (consonante)', 'tema + -ши', 'принести → принеся'],
      ['Negación', 'не + деепричастие', 'не зная (sin saber)'],
    ],
    mistakes: [
      '"*Читая книгу, мне было скучно" ❌ — el sujeto de "читая" (yo) ≠ el sujeto de "мне было скучно" (construcción impersonal). Correcto: "Читая книгу, я скучал."',
      '"*Придя домой, начался дождь" ❌ — "придя" implica un sujeto (yo/él), pero "начался дождь" no tiene ese sujeto. Sin деепричастие: "Когда я пришёл домой, начался дождь."',
      '"Написав письмо, он отдохнул" ✓ — mismo sujeto (он) para las dos acciones.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los деепричастия en ruso?',
      paragraphs: [
        'Los деепричастия son formas verbales invariables (no se declinan ni conjugan) que expresan una acción secundaria del mismo sujeto que realiza la acción principal de la oración. En español los traducimos con gerundios adverbiales ("leyendo", "habiendo escrito") o con cláusulas temporales/causales: "Читая книгу, он засыпал" → "Leyendo el libro, se quedaba dormido" / "Mientras leía el libro, se quedaba dormido".',
        'La característica más importante: el sujeto del деепричастие y el sujeto de la oración principal DEBEN ser el mismo. Esta regla es inflexible y su violación es el error más frecuente de los hispanohablantes.',
      ],
    },
    {
      heading: 'Деепричастия imperfectivos: formación y uso',
      paragraphs: [
        'Para formar el деепричастие imperfectivo: se toma la 3ª persona plural del presente (они читают), se quita la terminación (-ют, -ут, -ят, -ат) y se añade -я o -а: читают → читая; говорят → говоря; пишут → пиша (poco común; пишут → пиша, pero muchos verbos con -ш-, -ж- etc. tienen restricciones). Nota: некоторые verbos НСВ no tienen деепричастие: хотеть, бежать, ждать, бить, пить, врать — se evitan o se sustituyen.',
        'El деепричастие imperfectivo expresa una acción SIMULTÁNEA con la principal: "Читая книгу, она пила чай" (Leyendo el libro, tomaba té = hacía las dos cosas a la vez). Pueden ir al principio, al final o en medio de la oración, siempre separados por comas.',
      ],
    },
    {
      heading: 'Деепричастия perfectivos: formación y uso',
      paragraphs: [
        'Para el деепричастие perfectivo: infinitivo СВ − -ть + -в: написать → написав; прочитать → прочитав; позвонить → позвонив; прийти → придя (irregular); принести → принеся. Si la raíz termina en consonante se añade -ши en algunas formas, pero la mayoría de verbos СВ siguen el patrón -в.',
        'El деепричастие perfectivo expresa una acción ANTERIOR a la principal: "Прочитав письмо, она улыбнулась" (Habiendo leído la carta, sonrió = primero leyó la carta y luego sonrió). Este es el деепричастие más frecuente en textos formales y literarios.',
      ],
    },
    {
      heading: 'La regla del mismo sujeto: el error más crítico',
      paragraphs: [
        'El error más grave en el uso de деепричастия es violar la regla del mismo sujeto. En español a veces decimos "Al llegar a casa, empezó a llover" (sujeto implícito inconsistente), pero en ruso esto es gramaticalmente incorrecto. "Придя домой, начался дождь" ❌ — "придя" implica un agente humano, pero "начался дождь" no tiene ese agente.',
        'Siempre verifica: ¿El mismo sujeto hace la acción del деепричастие Y la acción principal? Sí → puedes usar деепричастие. No → usa "когда", "после того как", "потому что" etc.',
      ],
    },
    {
      heading: 'Деепричастия con negación y expresiones frecuentes',
      paragraphs: [
        'La negación не + деепричастие es muy productiva y frecuente: "не зная" (sin saber), "не понимая" (sin entender), "не говоря о X" (sin hablar de X, por no mencionar X). "Не зная русского языка, сложно понять эту книгу" (Sin saber ruso, es difícil entender este libro).',
        'Expresiones fijas muy útiles: несмотря на (a pesar de — originalmente деепричастие), судя по (a juzgar por), благодаря (gracias a — dativo). Estas formas están tan lexicalizadas que ya se usan como preposiciones y no requieren mismo sujeto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Деепричастия — gerundios adverbiales que expresan acción secundaria simultánea (НСВ) o previa (СВ) del mismo sujeto.',
    graphicPrompt: 'Línea de tiempo: деепричастие НСВ (flecha simultánea) vs деепричастие СВ (flecha previa).',
    scene: [
      ['Читая книгу, он пил чай. (Chitáya knígu, on pil chay.)', 'Leyendo el libro, tomaba té (simultáneo).'],
      ['Прочитав письмо, она позвонила. (Prochitáf pis\'mó, aná pazvaníla.)', 'Habiendo leído la carta, llamó (anterior).'],
      ['Говоря по телефону, он шёл по улице. (Gavarya pa telefónu, on shól pa ulitse.)', 'Hablando por teléfono, caminaba por la calle.'],
      ['Придя домой, я сразу лёг спать. (Pridya damóy, ya srazu lyok spat\'.)', 'Al llegar a casa, me acosté enseguida.'],
      ['Не зная ответа, она промолчала. (Ne znáya otveta, aná promalchála.)', 'Sin saber la respuesta, guardó silencio.'],
      ['Закончив работу, они пошли обедать. (Zakonchif rabótu, aní pashli abyédat\'.)', 'Habiendo terminado el trabajo, fueron a almorzar.'],
      ['Слушая музыку, она убирала квартиру. (Slúshaya múzyku, aná ubírala kvartiру.)', 'Escuchando música, limpiaba el apartamento.'],
      ['Купив билеты заранее, мы не беспокоились. (Kupíf bilyéty zaráneye, my ne bespakóyilis\'.)', 'Habiendo comprado los billetes con antelación, no nos preocupamos.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['sufijo -я para НСВ', 'sufijo -в para СВ', 'regla del mismo sujeto', 'simultaneidad vs anterioridad'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el деепричастие correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el деепричастие correcto (imperfectivo o perfectivo) según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Mientras escuchaba',
            lines: [['', '___ лекцию, студенты делали заметки. (Escuchando la clase, los estudiantes tomaban apuntes.)']],
            options: ['Слушая', 'Послушав', 'Слушав', 'Послушая'],
            answer: 'Слушая',
            explain: 'Simultaneidad (mientras escuchaban, tomaban apuntes) → деепричастие НСВ: слушая (слушать → слушают → слушая).',
          },
          {
            scene: 'Después de leer',
            lines: [['', '___ статью, он написал комментарий. (Habiendo leído el artículo, escribió un comentario.)']],
            options: ['Прочитав', 'Читая', 'Прочитавши', 'Читав'],
            answer: 'Прочитав',
            explain: 'Acción previa (primero leyó, luego escribió) → деепричастие СВ: прочитав (прочитать → прочита- + -в).',
          },
          {
            scene: 'Sin entender',
            lines: [['', '___ задание, студент всё же попробовал его выполнить. (Sin entender la tarea, el estudiante de todas formas intentó hacerla.)']],
            options: ['Не понимая', 'Не поняв', 'Понимая', 'Поняв'],
            answer: 'Не понимая',
            explain: 'Proceso simultáneo de no entender + el intento → НСВ negativo: не понимая.',
          },
          {
            scene: 'Después de llegar',
            lines: [['', '___ домой, дети сразу попросили есть. (Al llegar a casa, los niños enseguida pidieron comer.)']],
            options: ['Придя', 'Приходя', 'Пришедши', 'Придти'],
            answer: 'Придя',
            explain: 'Acción previa (llegaron → pidieron) → СВ: прийти → придя (forma irregular del perfectivo).',
          },
          {
            scene: 'Trabajando',
            lines: [['', '___ в тишине, она лучше концентрировалась. (Trabajando en silencio, se concentraba mejor.)']],
            options: ['Работая', 'Поработав', 'Работав', 'Работавши'],
            answer: 'Работая',
            explain: 'Simultaneidad y condición habitual → НСВ: работать → работают → работая.',
          },
          {
            scene: 'Habiendo terminado',
            lines: [['', '___ экзамен, студентка почувствовала облегчение. (Habiendo aprobado el examen, la estudiante sintió alivio.)']],
            options: ['Сдав', 'Сдавая', 'Сдавши', 'Сдаявши'],
            answer: 'Сдав',
            explain: 'Acción previa completada → СВ: сдать → сда- + -в = сдав.',
          },
          {
            scene: 'Escuchando música',
            lines: [['', 'Он шёл домой, ___ в наушниках музыку. (Caminaba a casa escuchando música con los auriculares.)']],
            options: ['слушая', 'послушав', 'слушал', 'слушавший'],
            answer: 'слушая',
            explain: 'Acción secundaria simultánea (mientras caminaba, escuchaba) → НСВ: слушая.',
          },
          {
            scene: 'Habiendo llamado',
            lines: [['', '___ другу, она рассказала ему новость. (Habiendo llamado al amigo, le contó la noticia.)']],
            options: ['Позвонив', 'Звоня', 'Позвонивши', 'Звонив'],
            answer: 'Позвонив',
            explain: 'Acción previa (primero llamó, luego contó) → СВ: позвонить → позвони- + -в = позвонив.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos деепричастия en contexto',
        tag: '2 espacios',
        intro: 'Completa con dos деепричастия correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina matutina',
            lines: [['', '[[0]] душ и [[1]] кофе, она вышла из дома.']],
            blanks: [
              { options: ['Приняв', 'Принимая', 'Принявши', 'Принимав'], answer: 'Приняв', explain: 'Acción previa (ducharse) → СВ: принять → приняв.' },
              { options: ['выпив', 'выпивая', 'выпивши', 'пив'], answer: 'выпив', explain: 'Acción previa (tomar café) → СВ: выпить → вы- + пить → выпив.' },
            ],
          },
          {
            scene: 'Estudiando',
            lines: [['', 'Он сидел в библиотеке, [[0]] книги и [[1]] заметки.']],
            blanks: [
              { options: ['читая', 'прочитав', 'читавши', 'читав'], answer: 'читая', explain: 'Acción simultánea con la principal (estaba sentado leyendo) → НСВ: читая.' },
              { options: ['делая', 'сделав', 'делавши', 'делав'], answer: 'делая', explain: 'También simultánea → НСВ: делать → делают → делая.' },
            ],
          },
          {
            scene: 'Al terminar el proyecto',
            lines: [['', '[[0]] проект, команда [[1]] результаты и пошла праздновать.']],
            blanks: [
              { options: ['Завершив', 'Завершая', 'Завершивши', 'Завершав'], answer: 'Завершив', explain: 'Acción previa (completaron) → СВ: завершить → заверши- + -в = завершив.' },
              { options: ['подведя', 'подводя', 'подведши', 'подводив'], answer: 'подведя', explain: 'También previa o simultánea: подвести итоги → СВ/НСВ. Подведя (СВ подвести → подве- + -дя).' },
            ],
          },
          {
            scene: 'En el aeropuerto',
            lines: [['', '[[0]] паспорт и [[1]] на рейс, он расслабился.']],
            blanks: [
              { options: ['Показав', 'Показывая', 'Показавши', 'Показав'], answer: 'Показав', explain: 'СВ previo: показать → показа- + -в = показав.' },
              { options: ['зарегистрировавшись', 'регистрируясь', 'зарегистрировав', 'регистрировавшись'], answer: 'зарегистрировавшись', explain: 'СВ reflexivo: зарегистрироваться → зарегистрировав + -шись = зарегистрировавшись.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Historia con деепричастия',
        tag: 'Texto guiado',
        intro: 'Completa la historia con деепричастия imperfectivos o perfectivos según el contexto.',
        type: 'guidedText',
        scene: 'Historia sobre una estudiante en su primer día en Moscú.',
        text: 'Анна приехала в Москву первый раз. [[0]] (Выйти) из поезда, она огляделась по сторонам. [[1]] (Нести) тяжёлый чемодан, она медленно шла к выходу. [[2]] (Найти) такси, она назвала адрес гостиницы. [[3]] (Ехать) по городу, она смотрела в окно и удивлялась. [[4]] (Прийти) в гостиницу, она сразу приняла душ. [[5]] (Отдохнуть), она позвонила маме и рассказала о первых впечатлениях.',
        blanks: [
          { options: ['Выйдя', 'Выходя', 'Вышедши', 'Выйдявши'], answer: 'Выйдя', explain: 'СВ previo (salió del tren → se giró a mirar): выйти → выйдя (irregular: выйд + -я).' },
          { options: ['Неся', 'Принеся', 'Нёсши', 'Принося'], answer: 'Неся', explain: 'Simultáneo (mientras llevaba la maleta, caminaba): нести → несут → неся.' },
          { options: ['Найдя', 'Находя', 'Нашедши', 'Находив'], answer: 'Найдя', explain: 'СВ previo (encontró taxi → dijo la dirección): найти → найдя.' },
          { options: ['Едя', 'Ехав', 'Езжая', 'Едя'], answer: 'Едя', explain: 'Simultáneo (mientras iba en taxi, miraba): ехать → едут → едя (forma poco elegante; también válido: "Пока она ехала...").' },
          { options: ['Придя', 'Приходя', 'Пришедши', 'Приходив'], answer: 'Придя', explain: 'СВ previo (llegó → se duchó): прийти → придя.' },
          { options: ['Отдохнув', 'Отдыхая', 'Отдохнувши', 'Отдыхав'], answer: 'Отдохнув', explain: 'СВ previo (descansó → llamó a mamá): отдохнуть → отдохну- + -в = отдохнув.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa los деепричастия',
        tag: 'Texto libre',
        intro: 'Escribe el деепричастие correcto del verbo dado entre paréntesis.',
        type: 'freeText',
        scene: 'Forma деепричастия imperfectivos y perfectivos.',
        text: 'Миша очень занятой человек. Утром он [[0]] (бегать) в парке слушает подкасты. [[1]] (Позавтракать), он идёт на работу. На работе [[2]] (говорить) по телефону, он одновременно пишет заметки. [[3]] (Закончить) все дела, он чувствует усталость. [[4]] (Не хотеть) готовить, он заказывает еду.',
        blanks: [
          { answer: 'бегая', accepted: ['бегая'], explain: 'НСВ simultáneo: бегать → бегают → бегая.' },
          { answer: 'Позавтракав', accepted: ['Позавтракав', 'позавтракав'], explain: 'СВ previo: позавтракать → позавтрака- + -в = позавтракав.' },
          { answer: 'говоря', accepted: ['говоря'], explain: 'НСВ simultáneo: говорить → говорят → говоря.' },
          { answer: 'Закончив', accepted: ['Закончив', 'закончив'], explain: 'СВ previo: закончить → закончи- + -в = закончив.' },
          { answer: 'Не желая', accepted: ['Не желая', 'Не хотя', 'не желая', 'не хотя'], explain: 'НСВ negativo: не желать → не желая, o не хотеть (irregular, poco común). Se prefiere: не желая.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con деепричастия',
        tag: 'Producción',
        intro: 'Escribe oraciones usando деепричастия para combinar dos acciones del mismo sujeto.',
        type: 'write',
        items: [
          {
            scene: 'Dos acciones simultáneas',
            prompt: 'Escribe una oración con деепричастие НСВ (dos acciones simultáneas del mismo sujeto).',
            answer: 'Слушая музыку, я делаю домашнее задание.',
            accepted: ['слушая', 'читая', 'работая', 'говоря', 'идя', 'думая'],
            explain: 'НСВ деепричастие para simultaneidad: слушая (escuchando), читая (leyendo), работая (trabajando).',
          },
          {
            scene: 'Acción previa',
            prompt: 'Escribe una oración con деепричастие СВ (acción previa, luego la principal).',
            answer: 'Позвонив другу, я рассказал ему хорошую новость.',
            accepted: ['позвонив', 'прочитав', 'написав', 'купив', 'придя', 'выйдя'],
            explain: 'СВ деепричастие para anterioridad: позвонив (habiendo llamado), прочитав (habiendo leído).',
          },
          {
            scene: 'Negación',
            prompt: 'Escribe una oración con не + деепричастие (sin hacer algo).',
            answer: 'Не зная ответа, я промолчал.',
            accepted: ['не зная', 'не понимая', 'не думая', 'не читая', 'не слушая'],
            explain: 'Negación: не + деепричастие НСВ: не зная, не понимая, не думая.',
          },
          {
            scene: 'Rutina propia',
            prompt: 'Describe tu propia rutina matutina usando un деепричастие perfectivo (habiendo hecho X, hice Y).',
            answer: 'Приготовив завтрак, я сел за компьютер.',
            accepted: ['приготовив', 'позавтракав', 'приняв', 'выпив', 'собравшись', 'одевшись'],
            explain: 'СВ деепричастие: приготовив (habiendo preparado), позавтракав (habiendo desayunado).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describe tu día',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre actividades de hoy usando деепричастия (mínimo 2 perfectivos, 1 imperfectivo).',
        type: 'write',
        items: [
          {
            scene: 'Mañana — acción previa (СВ)',
            prompt: 'Describe algo que hiciste antes de otra cosa esta mañana (деепричастие perfectivo).',
            answer: 'Выпив кофе, я начал работать.',
            accepted: ['выпив', 'позавтракав', 'приняв', 'проснувшись', 'одевшись', 'собравшись'],
            explain: 'Деепричастие СВ: выпив (habiendo bebido), позавтракав (habiendo desayunado).',
          },
          {
            scene: 'Durante el día — simultaneidad (НСВ)',
            prompt: 'Describe dos cosas que hacías al mismo tiempo hoy (деепричастие imperfectivo).',
            answer: 'Работая дома, я слушал радио.',
            accepted: ['работая', 'слушая', 'читая', 'думая', 'говоря', 'идя'],
            explain: 'Деепричастие НСВ para simultaneidad: работая (trabajando), слушая (escuchando).',
          },
          {
            scene: 'Tarde — resultado (СВ)',
            prompt: 'Describe algo que completaste antes de relajarte esta tarde (деепричастие perfectivo).',
            answer: 'Закончив все дела, я посмотрел фильм.',
            accepted: ['закончив', 'сделав', 'отправив', 'написав', 'позвонив', 'поговорив'],
            explain: 'СВ деепричастие para acción completada previa: закончив (habiendo terminado).',
          },
        ],
      },
    ],
  },
}

export default topic
