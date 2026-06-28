import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negacion-ne',
  order: '05',
  color: '#7c3aed',
  category: 'Sintaxis',
  level: 'A1',
  title: 'La negación en ruso: не y нет',
  shortTitle: 'Negación: не y нет',
  metaTitle: 'Negación en ruso A1 | не y нет — cómo negar en ruso',
  description:
    'En ruso, la negación tiene dos instrumentos principales: не (partícula que precede al verbo o adjetivo) y нет (no hay / hay ausencia). Ambas son esenciales desde el primer día: con не construyes cualquier oración negativa y con нет respondes preguntas y señalas ausencia.',
  lead: 'Domina не (antes del verbo) y нет (ausencia o respuesta negativa) — las dos herramientas de negación más usadas del ruso desde el nivel A1.',
  outcomes: [
    'Colocar не correctamente antes del verbo conjugado',
    'Usar нет para respuestas negativas y ausencia',
    'Distinguir los contextos de не y нет',
  ],
  guide: {
    goal: 'Negar oraciones con verbos usando не y expresar ausencia con нет.',
    model: 'Sujeto + не + verbo conjugado | нет + sustantivo (genitivo simple)',
    formula: '[Sujeto] + не + [verbo] | Нет + [sustantivo]',
    decisions: [
      '¿Quieres negar una acción o estado? → pon не justo antes del verbo: Я не знаю',
      '¿Quieres responder "no" a una pregunta? → нет solo, o нет + oración negativa',
      '¿Quieres decir "no hay / no tengo"? → нет + sustantivo (en genitivo): Нет времени',
      '¿Quieres negar un adjetivo predicativo? → не antes del adjetivo: Он не большой',
    ],
    table: [
      ['Estructura', 'Uso', 'Ejemplo'],
      ['не + verbo', 'negar una acción', 'Я не понимаю — No entiendo'],
      ['не + verbo', 'negar un estado', 'Он не знает — Él no sabe'],
      ['нет', 'respuesta negativa', '— Вы говорите? — Нет.'],
      ['нет + sustantivo', 'ausencia / no hay', 'Нет времени — No hay tiempo'],
      ['не + adjetivo', 'negar cualidad', 'Это не сложно — Eso no es difícil'],
    ],
    mistakes: [
      'не SIEMPRE va antes del verbo conjugado — nunca antes del pronombre sujeto.',
      'нет como "no hay" requiere el sustantivo en genitivo — en A1 simplemente aprende las frases: Нет проблем, Нет времени, Нет денег.',
      'No confundas нет (no hay / respuesta) con не (partícula negativa ante verbo).',
      'La doble negación es OBLIGATORIA en ruso: Я ничего не знаю (Yo nada no sé = No sé nada). En A1, con не y нет es suficiente.',
    ],
  },
  seo: [
    {
      heading: 'Cómo se dice "no" en ruso: не vs нет',
      paragraphs: [
        'El ruso tiene dos palabras principales para la negación. не es una partícula que se coloca directamente antes del verbo (o del elemento que se niega): Я не говорю по-китайски (No hablo chino). нет es tanto la respuesta negativa ("no") como la expresión de ausencia ("no hay").',
        'La distinción es simple: si niegas una acción con un verbo conjugado, usas не antes del verbo. Si respondes "no" a una pregunta o dices que algo no existe, usas нет.',
      ],
      table: [
        ['Herramienta', 'Cuándo usarla', 'Ejemplo'],
        ['не', 'Negar una acción o estado verbal', 'Я не работаю — No trabajo'],
        ['не', 'Negar un adjetivo predicativo', 'Он не умный — Él no es listo'],
        ['нет', 'Respuesta negativa a una pregunta', '¿Вы русский? — Нет.'],
        ['нет', 'Expresar ausencia (no hay / no tengo)', 'Нет проблем — No hay problema'],
      ],
    },
    {
      heading: 'не: la partícula negativa universal',
      paragraphs: [
        'не es el "no" del español que va antes del verbo. La regla es simple: justo antes del verbo conjugado. Я не понимаю (No entiendo), Он не читает (Él no lee), Мы не говорим по-японски (No hablamos japonés).',
        'не también puede negar adjetivos cuando son predicativos: Это не сложно (Eso no es difícil), Он не большой (No es grande). La posición siempre es inmediatamente antes del elemento negado.',
      ],
    },
    {
      heading: 'нет: ausencia y respuesta negativa',
      paragraphs: [
        'нет tiene dos funciones. Como respuesta: — Вы говорите по-русски? — Нет (¿Habla usted ruso? — No). Como expresión de ausencia: нет + sustantivo. En este uso, el sustantivo va en genitivo, pero en A1 es suficiente aprender las frases hechas más frecuentes.',
        'Frases con нет que debes conocer desde A1: Нет проблем (No hay problema — literalmente "No de problemas"), Нет времени (No hay tiempo), Нет денег (No hay dinero). El genitivo se aprenderá en profundidad en A2.',
      ],
    },
    {
      heading: 'La doble negación rusa',
      paragraphs: [
        'Una diferencia clave con el español: en ruso la doble negación es gramaticalmente CORRECTA y obligatoria. "Yo no sé nada" en ruso es Я ничего не знаю — literalmente "yo nada no sé".',
        'En A1 esto no te afecta mucho porque trabajarás con не simple, pero es importante saber que si usas ничего (nada), никто (nadie) o никогда (nunca), también debes poner не antes del verbo.',
      ],
    },
  ],
  visual: {
    mode: 'formula-highlight',
    teacherLens:
      'Mastering не and нет early prevents students from defaulting to "no" alone, which produces ungrammatical Russian sentences at every turn.',
    graphicPrompt:
      'Two contrasting cards: left card shows "не + verbo" with an arrow pointing to the verb, right card shows "нет" with an X mark and absence symbol. Clean, minimal, color-coded.',
    scene: [
      ['не + verbo', 'Я не понимаю (No entiendo)'],
      ['не + verbo', 'Он не знает (Él no sabe)'],
      ['не + adjetivo', 'Это не сложно (Eso no es difícil)'],
      ['нет = respuesta', '— Вы говорите? — Нет.'],
      ['нет = no hay', 'Нет проблем / Нет времени'],
    ],
    learnerModes: ['recognition', 'negative-transformation', 'gap-fill', 'dialogue'],
    practiceVerbs: ['понимать', 'знать', 'говорить', 'читать', 'работать'],
    reviewFocus: ['не antes del verbo', 'нет para ausencia', 'no confundir не/нет'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Identifica la negación correcta (не o нет) para cada contexto.',
        type: 'choice',
        items: [
          { scene: 'Negación verbal', lines: [['', '¿Cómo niegas "Я понимаю" (Entiendo)?']], options: ['нет понимаю', 'Я не понимаю', 'Я нет понимаю', 'Не я понимаю'], answer: 'Я не понимаю', explain: 'не va directamente antes del verbo conjugado. Я не понимаю = No entiendo.' },
          { scene: 'Respuesta negativa', lines: [['', 'Alguien te pregunta "Вы говорите по-русски?" y la respuesta es negativa. ¿Qué dices?']], options: ['не', 'нет', 'не говорю', 'нет говорить'], answer: 'нет', explain: 'нет como respuesta negativa aislada. Puedes agregar: Нет, я не говорю по-русски.' },
          { scene: 'Expresando ausencia', lines: [['', '¿Cómo se dice "No hay tiempo" en ruso?']], options: ['Не время', 'Нет времени', 'Время не', 'Не есть время'], answer: 'Нет времени', explain: 'нет + sustantivo en genitivo. Нет времени = No hay tiempo. Frase esencial.' },
          { scene: 'Posición de не', lines: [['', '¿Dónde se coloca не en "Он читает" para negarlo?']], options: ['Не он читает', 'Он читает не', 'Он не читает', 'Он не читать'], answer: 'Он не читает', explain: 'не va inmediatamente antes del verbo conjugado: Он не читает = Él no lee.' },
          { scene: 'Negación verbal', lines: [['', '¿Cuál es la negación correcta de "Я знаю" (Sé)?']], options: ['Нет знаю', 'Я знаю не', 'Я не знаю', 'Не знать я'], answer: 'Я не знаю', explain: 'Я не знаю = No sé. не va antes del verbo conjugado знаю.' },
          { scene: 'Frases hechas', lines: [['', 'Quieres decir "No hay problema". ¿Cuál es correcto?']], options: ['Не проблема', 'Нет проблем', 'Проблем не', 'Нет проблема'], answer: 'Нет проблем', explain: 'Нет проблем — literalmente "No de problemas". Frase hecha fundamental.' },
          { scene: 'Concordancia verbal', lines: [['', '¿Cuál de estas oraciones está correctamente negada?']], options: ['Мы не работает', 'Мы не работаем', 'Нет мы работаем', 'Мы работаем не'], answer: 'Мы не работаем', explain: 'Мы не работаем = No trabajamos. не + verbo conjugado correcto (работаем, no работает).' },
          { scene: 'Diferencia не vs нет', lines: [['', '¿Qué diferencia hay entre не y нет?']], options: ['Son sinónimos intercambiables', 'не va antes del verbo; нет es respuesta o expresa ausencia', 'нет va antes del verbo; не es respuesta', 'не es formal; нет es informal'], answer: 'не va antes del verbo; нет es respuesta o expresa ausencia', explain: 'не niega verbos/adjetivos en la oración. нет es la respuesta "no" o expresa "no hay".' },
        ],
      },
      {
        id: 'level-2',
        title: 'Afirmativa y su negación',
        tag: '2 espacios',
        intro: 'Relaciona cada oración con su negación correcta.',
        type: 'dual',
        items: [
          { scene: 'Negando oraciones', lines: [['', 'Я понимаю → negación: Я [[0]] [[1]]']], blanks: [{ options: ['не', 'нет', 'да'], answer: 'не', explain: 'не va antes del verbo.' }, { options: ['понимаю', 'понимает', 'понимаем'], answer: 'понимаю', explain: 'Primera persona singular: понимаю.' }] },
          { scene: 'Negando oraciones', lines: [['', 'Он работает → negación: Он [[0]] [[1]]']], blanks: [{ options: ['не', 'нет', 'да'], answer: 'не', explain: 'не antes del verbo.' }, { options: ['работает', 'работаю', 'работаем'], answer: 'работает', explain: 'Él: работает.' }] },
          { scene: 'Negando oraciones', lines: [['', 'Мы знаем → negación: Мы [[0]] [[1]]']], blanks: [{ options: ['не', 'нет', 'да'], answer: 'не', explain: 'не antes del verbo.' }, { options: ['знаем', 'знает', 'знаю'], answer: 'знаем', explain: 'Nosotros: знаем.' }] },
          { scene: 'Negando oraciones', lines: [['', 'Они читают → negación: Они [[0]] [[1]]']], blanks: [{ options: ['не', 'нет', 'да'], answer: 'не', explain: 'не antes del verbo.' }, { options: ['читают', 'читает', 'читаю'], answer: 'читают', explain: 'Ellos: читают.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — не vs нет',
        tag: 'Opciones',
        intro: 'Elige не o нет para completar cada oración correctamente.',
        type: 'guidedText',
        scene: 'Negación en contexto ruso',
        text: 'Я [[0]] понимаю. [[1]] времени! Он [[2]] говорит по-испански. — Вы работаете? — [[3]]. Мы [[4]] знаем этого. [[5]] проблем! Это [[6]] сложно.',
        blanks: [
          { options: ['не', 'нет'], answer: 'не', explain: 'Я не понимаю. не antes del verbo conjugado.' },
          { options: ['Нет', 'Не'], answer: 'Нет', explain: 'Нет времени. нет expresa ausencia o inexistencia.' },
          { options: ['не', 'нет'], answer: 'не', explain: 'Он не говорит. не antes del verbo.' },
          { options: ['Нет', 'Не'], answer: 'Нет', explain: 'нет como respuesta negativa aislada.' },
          { options: ['не', 'нет'], answer: 'не', explain: 'Мы не знаем. не antes del verbo знаем.' },
          { options: ['Нет', 'Не'], answer: 'Нет', explain: 'Нет проблем — frase hecha de ausencia.' },
          { options: ['не', 'нет'], answer: 'не', explain: 'Это не сложно. не puede negar adjetivos.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — producción de negaciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma negativa correcta para cada oración.',
        type: 'freeText',
        scene: 'Escribiendo negaciones en ruso',
        text: '1. "Я читаю" → negativa: [[0]]. 2. "No hay dinero." (деньги = dinero): [[1]]. 3. "Они говорят" → negativa: [[2]]. 4. Respuesta corta negativa en ruso: [[3]]. 5. "Он знает ответ" → negativa: [[4]].',
        blanks: [
          { answer: 'Я не читаю', accepted: ['я не читаю', 'я не читаю.'], explain: 'Я не читаю. не se inserta antes del verbo читаю.' },
          { answer: 'Нет денег', accepted: ['нет денег', 'нет денег.'], explain: 'Нет денег — "No hay dinero." деньги en genitivo = денег.' },
          { answer: 'Они не говорят', accepted: ['они не говорят', 'они не говорят.'], explain: 'Они не говорят. не antes de говорят.' },
          { answer: 'Нет', accepted: ['нет', 'Нет'], explain: 'нет = no (respuesta negativa).' },
          { answer: 'Он не знает ответ', accepted: ['он не знает ответ', 'он не знает ответ.'], explain: 'Он не знает ответ. не antes del verbo знает.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones negativas completas en ruso.',
        type: 'write',
        items: [
          { scene: 'Negando acciones', prompt: 'Escribe en ruso: "No hablo ruso." (говорить + по-русски)', answer: 'Я не говорю по-русски', accepted: ['я не говорю по-русски'], explain: 'Я не говорю по-русски. говорить → 2.ª conj. → я говорю → я не говорю.' },
          { scene: 'Negando acciones', prompt: 'Escribe: "Ella no trabaja hoy." (сегодня = hoy, работать)', answer: 'Она не работает сегодня', accepted: ['она не работает сегодня'], explain: 'Она не работает сегодня. работать → 1.ª conj. → она работает → она не работает.' },
          { scene: 'Negando acciones', prompt: 'Escribe: "No entendemos." (понимать — 1.ª conj.)', answer: 'Мы не понимаем', accepted: ['мы не понимаем'], explain: 'Мы не понимаем. понимать → 1.ª conj. → мы понимаем → мы не понимаем.' },
          { scene: 'Expresando ausencia', prompt: 'Escribe: "No hay tiempo." (времени = genitivo de время)', answer: 'Нет времени', accepted: ['нет времени'], explain: 'Нет времени — frase de ausencia. нет + sustantivo en genitivo.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Usa не y нет en un contexto conversacional real en ruso.',
        type: 'write',
        items: [
          { scene: 'Conversación real', prompt: 'Un amigo te pregunta tres cosas que no sabes hacer o no tienes. Escríbelas en ruso con не/нет.', answer: 'Я не говорю по-китайски. Я не понимаю. Нет времени.', accepted: ['не', 'нет'], explain: 'Modelo: Я не говорю по-китайски. Я не понимаю. Нет времени. ¡Usa tus propias negaciones!' },
          { scene: 'Mini-diálogo', prompt: 'Escribe un mini-diálogo: alguien pregunta si hablas ruso y tú respondes que no, pero que lo estás aprendiendo. (учить = aprender)', answer: '— Вы говорите по-русски? — Нет, я не говорю, но я учу русский язык.', accepted: ['нет', 'не говорю'], explain: '— Вы говорите по-русски? — Нет, я не говорю, но я учу русский язык.' },
          { scene: 'Transformación', prompt: 'Transforma las tres oraciones a forma negativa: "Я читаю. Он работает. Мы знаем."', answer: 'Я не читаю. Он не работает. Мы не знаем.', accepted: ['не читаю', 'не работает', 'не знаем'], explain: 'не se inserta antes de cada verbo conjugado.' },
        ],
      },
    ],
  },
}

export default topic
