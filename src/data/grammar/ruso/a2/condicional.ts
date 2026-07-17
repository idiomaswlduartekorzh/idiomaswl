import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condicional',
  order: '15',
  color: '#1a2ecc',
  category: 'Condicional',
  level: 'A2',
  title: 'Condicional en ruso A2: если бы + pasado, бы',
  shortTitle: 'Condicional (если бы)',
  metaTitle: 'Condicional ruso A2 — если бы, бы, subjuntivo ruso, oraciones condicionales irreal',
  description:
    'El condicional irreal en ruso se forma con если бы + verbo en pasado (oración si) y бы + verbo en pasado (oración resultado). No hay tiempo condicional separado: el pasado + бы expresa todas las condiciones irreales. Ejemplo: Если бы я знал, я бы сказал (Si lo supiera, lo diría). La partícula бы puede ir después del verbo o del sujeto — es móvil pero siempre presente.',
  lead: 'Если бы я был богатым… / Я бы поехал в Москву: el condicional irreal en ruso A2.',
  outcomes: [
    'Formar oraciones condicionales irreales con если бы',
    'Usar бы + pasado para el resultado',
    'Entender que el pasado ruso funciona como "condicional"',
    'Reconocer la posición móvil de бы',
  ],

  guide: {
    goal: 'Expresar condiciones hipotéticas con если бы + pasado y бы + pasado.',
    model: 'Если бы я знал, я бы сказал. (Si lo supiera, lo diría.) / Если бы она пришла, мы бы поговорили. (Si ella viniera, hablaríamos.)',
    formula: 'если бы + глагол (прош.) | бы + глагол (прош.) → condición irreal | бы es partícula móvil: sujeto + бы + V o V + бы',
    decisions: [
      'Condición irreal: если бы + V pasado (no presente, no futuro)',
      'Resultado irreal: бы + V pasado (o sujeto + бы + V pasado)',
      'El género/número del verbo en pasado sí importa: он знал бы / она знала бы',
      'бы puede ir después del sujeto: я бы сказал / или после глагола: сказал бы',
      'Real vs irreal: Если я знаю → real (si lo sé). Если бы я знал → irreal (si lo supiera)',
    ],
    table: [
      ['Parte', 'Estructura', 'Ejemplo'],
      ['Condición', 'если бы + V pasado', 'если бы он пришёл'],
      ['Resultado', 'бы + V pasado', 'мы бы поговорили'],
      ['Resultado alt.', 'V + бы', 'поговорили бы'],
    ],
    mistakes: [
      '"Если бы я приду" ❌ → "Если бы я пришёл" ✓ — siempre pasado, nunca futuro con если бы.',
      '"Если я бы знал" ❌ → "Если бы я знал" ✓ — бы va unido a если: "если бы" (no se separan en la oración si).',
      '"Я бы сказал" sin contexto irreal — бы sin если бы implica deseo o suavidad: "Я бы хотел" = me gustaría.',
    ],
  },

  seo: [
    {
      heading: 'El condicional irreal en ruso: если бы + pasado',
      paragraphs: [
        'En ruso no existe un tiempo verbal "condicional" como en español o francés. En cambio, la condición irreal se expresa con la partícula бы más el verbo en pasado. La estructura completa es: если бы + verbo en pasado (condición) + бы + verbo en pasado (resultado). Ejemplo: "Если бы у меня было время, я бы поехал в кино" (Si tuviera tiempo, iría al cine).',
        'El verbo en pasado concuerda en género y número con el sujeto: он знал бы (él sabría), она знала бы (ella sabría), они знали бы (ellos sabrían). La partícula бы es invariable y puede colocarse después del sujeto, del verbo, o de otro elemento enfatizado: "Я бы сказал", "Сказал бы я", "Я сказал бы" — todas son gramaticalmente correctas, con ligeros matices de énfasis.',
      ],
    },
    {
      heading: 'Бы sin если: deseo y suavidad',
      paragraphs: [
        'La partícula бы también aparece sin если бы para expresar deseo suave o petición cortés: "Я бы хотел кофе" (Me gustaría un café), "Ты бы позвонил ей" (Podrías llamarla). En este uso, бы suaviza la afirmación o da un tono de sugerencia, similar al condicional de cortesía en español.',
        'La diferencia entre real e irreal es clara: "Если я буду в Москве, я позвоню" (Si estoy en Moscú, llamaré — posible real) vs "Если бы я был в Москве, я бы позвонил" (Si estuviera en Moscú, llamaría — hipotético irreal). En ruso, el modo de las oraciones condicionales reales usa el futuro; las irreales, el pasado + бы.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'если бы + прош. | бы + прош. | бы = partícula móvil | género en pasado.',
    graphicPrompt: 'Camino bifurcado: realidad vs sueño/hipótesis con бы.',
    scene: [
      ['Если бы я знал ответ, я бы сказал.', 'Si supiera la respuesta, la diría.'],
      ['Если бы она позвонила, я бы был рад.', 'Si ella llamara, me alegraría.'],
      ['Я бы хотел поехать в Петербург.', 'Me gustaría ir a San Petersburgo.'],
      ['Если бы у нас было время, мы бы погуляли.', 'Si tuviéramos tiempo, saldríamos a caminar.'],
      ['Он бы помог тебе, если бы мог.', 'Él te ayudaría si pudiera.'],
      ['Ты бы не понял, даже если бы хотел.', 'No lo entenderías aunque quisieras.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['если бы + pasado', 'бы + pasado (resultado)', 'posición de бы', 'género del verbo pasado'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica la estructura condicional',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta para completar la condición irreal.',
        type: 'choice',
        items: [
          {
            scene: 'Если бы я ___ время, я бы поехал.',
            lines: [['', 'Если бы я ___ время, я бы поехал.']],
            options: ['имел', 'иметь', 'буду иметь', 'имею'],
            answer: 'имел',
            explain: '"имел" — pasado masculino. если бы + pasado → имел.',
          },
          {
            scene: 'Если бы она позвонила, я ___ рад.',
            lines: [['', 'Если бы она позвонила, я ___ рад.']],
            options: ['был бы', 'буду', 'был', 'есть'],
            answer: 'был бы',
            explain: '"был бы" — resultado irreal: бы + pasado masc. → был бы.',
          },
          {
            scene: 'Я ___ кофе, пожалуйста.',
            lines: [['', 'Я ___ кофе, пожалуйста.']],
            options: ['хотел бы', 'хочу бы', 'буду хотеть', 'хотеть'],
            answer: 'хотел бы',
            explain: '"хотел бы" — deseo suave con бы. хотеть → хотел (pasado masc.) + бы.',
          },
          {
            scene: 'Если бы мы знали правду, мы бы ___.',
            lines: [['', 'Если бы мы знали правду, мы бы ___.']],
            options: ['сказали', 'скажем', 'говорили', 'говорить'],
            answer: 'сказали',
            explain: '"сказали" — pasado plural perfectivo. мы бы сказали.',
          },
          {
            scene: 'Ты ___ позвонить ей — она ждёт.',
            lines: [['', 'Ты ___ позвонить ей — она ждёт.']],
            options: ['мог бы', 'можешь бы', 'будешь', 'мог'],
            answer: 'мог бы',
            explain: '"мог бы" — sugerencia cortés con бы. мочь → мог (pasado masc.) + бы.',
          },
          {
            scene: 'Если бы они пришли, вечер ___ лучше.',
            lines: [['', 'Если бы они пришли, вечер ___ лучше.']],
            options: ['был бы', 'будет', 'был', 'есть'],
            answer: 'был бы',
            explain: '"был бы" — вечер (masc.) → был бы (resultado irreal).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Condición e hipótesis',
        tag: '2 espacios',
        intro: 'Completa tanto la condición como el resultado irreal.',
        type: 'dual',
        items: [
          {
            scene: 'Si supiera ruso, hablaría con ellos.',
            lines: [['', 'Если бы я [[0]] русский, я бы [[1]] с ними.']],
            blanks: [
              { options: ['знал', 'знаю', 'буду знать', 'знать'], answer: 'знал', explain: '"знал" — pasado masc. en oración если бы.' },
              { options: ['говорил', 'говорю', 'буду говорить', 'говорить'], answer: 'говорил', explain: '"говорил" — resultado: бы + pasado masc.' },
            ],
          },
          {
            scene: 'Si ella viviera aquí, la veríamos cada día.',
            lines: [['', 'Если бы она [[0]] здесь, мы бы [[1]] её каждый день.']],
            blanks: [
              { options: ['жила', 'живёт', 'будет жить', 'жить'], answer: 'жила', explain: '"жила" — pasado femenino en condición irreal.' },
              { options: ['видели', 'видим', 'увидим', 'видеть'], answer: 'видели', explain: '"видели" — resultado: мы бы видели (pasado plural).' },
            ],
          },
          {
            scene: 'Me gustaría visitar Roma.',
            lines: [['', 'Я [[0]] [[1]] Рим.']],
            blanks: [
              { options: ['хотел', 'хочу', 'буду', 'хотеть'], answer: 'хотел', explain: '"хотел" — pasado masc. con бы = deseo suave.' },
              { options: ['посетить', 'посещаю', 'посещать', 'посетил'], answer: 'посетить', explain: '"посетить" — infinitivo después de хотел бы.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Diario de sueños',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre deseos y condiciones irreales.',
        type: 'guidedText',
        scene: 'Марина мечтает о путешествиях.',
        text: 'Если бы у Марины [[0]] деньги, она [[1]] в Японию. Она [[2]] суши каждый день. Если бы она [[3]] японский язык, она [[4]] с местными жителями.',
        blanks: [
          { options: ['были', 'есть', 'будут', 'быть'], answer: 'были', explain: '"были" — деньги (plural) → были (pasado pl.).' },
          { options: ['поехала бы', 'поедет', 'едет', 'ехать'], answer: 'поехала бы', explain: '"поехала бы" — resultado irreal, ella (femenino) → поехала (pasado fem.) + бы.' },
          { options: ['ела бы', 'ест', 'будет есть', 'есть'], answer: 'ела бы', explain: '"ела бы" — она + бы + pasado fem. (есть → ела).' },
          { options: ['знала', 'знает', 'будет знать', 'знать'], answer: 'знала', explain: '"знала" — condición: если бы + pasado fem. (она знала).' },
          { options: ['говорила бы', 'говорит', 'будет говорить', 'говорить'], answer: 'говорила бы', explain: '"говорила бы" — resultado fem.: говорила (pasado) + бы.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma la condición irreal',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta de бы y el pasado.',
        type: 'freeText',
        scene: 'Напиши нереальные условия.',
        text: 'Если бы я ___ (знать, yo masc.) ответ / Она ___ (хотеть + бы, deseo suave, fem.) кофе / Мы бы ___ (говорить, plural) по-русски / Если бы он ___ (прийти, pasado masc.) вовремя',
        blanks: [
          { answer: 'знал', explain: '"знал" — pasado masc. (я = masc. por defecto). знать → знал.' },
          { answer: 'хотела бы', explain: '"хотела бы" — она (fem.) → хотела (pasado fem.) + бы.' },
          { answer: 'говорили', explain: '"говорили" — мы бы говорили. pasado plural de говорить.' },
          { answer: 'пришёл', explain: '"пришёл" — прийти (pf.) → пришёл (pasado masc.).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe condiciones irreales',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones condicionales irreales completas.',
        type: 'write',
        items: [
          {
            scene: 'Si tuviera un perro, lo llamaría Шарик.',
            prompt: 'Usa если бы + иметь (pasado masc.) + бы + назвать.',
            answer: 'Если бы у меня была собака, я бы назвал её Шарик.',
            accepted: ['Если бы у меня была собака, я назвал бы её Шарик.'],
            explain: '"была" — собака (fem.) → была (pasado fem.). я бы назвал — resultado masc.',
          },
          {
            scene: 'Me gustaría estudiar más.',
            prompt: 'Usa хотел бы/хотела бы + учиться больше.',
            answer: 'Я хотел бы учиться больше.',
            accepted: ['Я хотела бы учиться больше.'],
            explain: '"хотел/хотела бы" — deseo suave. género según el hablante.',
          },
          {
            scene: 'Si ellos llegaran a tiempo, todo saldría bien.',
            prompt: 'Usa если бы + прийти (plural) + бы + всё хорошо.',
            answer: 'Если бы они пришли вовремя, всё было бы хорошо.',
            accepted: ['Если бы они пришли вовремя, всё прошло бы хорошо.'],
            explain: '"пришли" — pasado plural pf. "было бы" — neutro (всё). resultado irreal.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tus deseos e hipótesis',
        tag: 'Escritura libre',
        intro: 'Escribe sobre lo que harías si pudieras.',
        type: 'write',
        items: [
          {
            scene: 'Escribe 3 cosas que harías si tuvieras más tiempo.',
            prompt: 'Используй если бы у меня было время / я бы + V pasado.',
            answer: 'Если бы у меня было больше времени, я бы учил русский каждый день. Я бы читал больше книг. Я бы путешествовал по всему миру.',
            accepted: ['Если бы у меня было время, я бы занималась спортом. Я бы готовила дома. Я бы спала больше.'],
            explain: 'было — neutro (время). бы + pasado para resultados. gender del hablante en verbos.',
          },
          {
            scene: 'Describe tu país ideal usando condicionales.',
            prompt: 'Используй если бы + было/не было/можно было + бы.',
            answer: 'Если бы я мог создать идеальную страну, там было бы много парков. Все люди говорили бы на одном языке. Не было бы войн.',
            accepted: ['Если бы я была президентом, я бы сделала образование бесплатным. Медицина тоже была бы бесплатной.'],
            explain: 'мог/могла бы — gender según hablante. было бы — neutro. не было бы — negación irreal.',
          },
        ],
      },
    ],
  },
}

export default topic
