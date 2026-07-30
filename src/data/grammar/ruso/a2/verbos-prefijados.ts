import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-prefijados',
  order: '14',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos prefijados de movimiento en ruso A2: при-, у-, вы-, за-',
  shortTitle: 'Verbos prefijados movimiento',
  metaTitle: 'Verbos prefijados de movimiento ruso A2 — приходить, уходить, выходить, заходить',
  description:
    'Los verbos de movimiento prefijados combinan идти/ходить o ехать/ездить con prefijos que modifican el significado. Prefijos principales: при- (llegada: приходить/прийти), у- (salida: уходить/уйти), вы- (salir hacia afuera: выходить/выйти), вхо- (entrar: входить/войти), за- (pasar a ver/de paso: заходить/зайти), до- (llegar hasta: доходить/дойти), пере- (cruzar: переходить/перейти), под- (acercarse: подходить/подойти). Todos se forman sobre ходить (imperfectivo) y идти (base perfectiva).',
  lead: 'Он пришёл / Она ушла / Они вошли: los verbos prefijados de movimiento más usados en ruso A2.',
  outcomes: [
    'Usar приходить/прийти (llegar) y уходить/уйти (irse)',
    'Usar входить/войти (entrar) y выходить/выйти (salir)',
    'Usar заходить/зайти (pasar a ver) y подходить/подойти (acercarse)',
    'Distinguir imperfectivo (proceso) y perfectivo (acción concluida)',
  ],

  guide: {
    goal: 'Usar verbos de movimiento prefijados para expresar llegada, salida, entrada, paso y otros movimientos específicos.',
    model: 'Он пришёл домой в 7 вечера. (Llegó a casa a las 7 de la tarde.) / Зайди ко мне после урока. (Pasa a verme después de clase.)',
    formula: 'приставка + ходить (imperf.) / приставка + ти/-йти (perf.) | при- = llega | у- = se va | вы- = sale | в- = entra',
    decisions: [
      'при- (llega hacia): приходить (imperf.) / прийти (perf.) → "Он каждый день приходит" / "Он пришёл вчера"',
      'у- (se aleja, se va): уходить (imperf.) / уйти (perf.) → "Она ушла в 8"',
      'вы- (sale hacia afuera): выходить / выйти → "Выйди из комнаты" / "Он вышел"',
      'в- (entra): входить / войти → "Войдите !" (imperativo = entre/entren)',
      'за- (pasar de camino): заходить / зайти → "Зайди ко мне завтра" (pasa a verme mañana)',
    ],
    table: [
      ['Prefijo', 'Significado', 'Verbos'],
      ['при-', 'llegar, venir', 'приходить / прийти'],
      ['у-', 'irse, salir (permanente)', 'уходить / уйти'],
      ['вы- / в-', 'salir / entrar', 'выходить/выйти | входить/войти'],
    ],
    mistakes: [
      '"Войдите" ✓ = entre (imperf. usado como cortés) | "Войдите" para imperativo es correcto.',
      '"Он ушёл" = se fue (perfectivo, terminado) | "Он уходит" = está saliendo (proceso en curso).',
      '"Зайди ко мне" = pasa a verme (за- = de paso/visita breve) ≠ прийди ко мне (ven a verme).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funcionan приходить/прийти y уходить/уйти?',
      paragraphs: [
        'Приходить (imperfectivo) / прийти (perfectivo) significan "venir, llegar": "Он каждый день приходит на работу в 9" (hábito) vs "Он пришёл домой поздно" (acción concluida). Uходить (imperfectivo) / уйти (perfectivo) significan "irse, marcharse": "Она уходит в 6" (hábito) vs "Она уже ушла" (ya se fue). El prefijo при- indica movimiento hacia el hablante o hacia un punto de llegada; у- indica alejamiento.',
        'Los verbos prefijados de movimiento forman pares aspectuales: входить/войти (entrar), выходить/выйти (salir), заходить/зайти (pasar de visita), подходить/подойти (acercarse), доходить/дойти (llegar hasta), переходить/перейти (cruzar). Todos se conjugan con las mismas terminaciones que ходить y -йти/-ти.',
      ],
    },
    {
      heading: '¿Qué significan войти, выйти y зайти?',
      paragraphs: [
        'Входить/войти (entrar): "Войдите, пожалуйста" (Entre, por favor — imperativo). "Он вошёл в магазин" (Entró a la tienda). La forma de imperativo войди/войдите es muy usada para invitar a entrar. Выходить/выйти (salir): "Выйди из класса" (Sal de la clase). "Поезд выходит с третьего пути" (El tren sale del andén 3).',
        'Заходить/зайти (pasar a ver de camino, visitar brevemente): "Зайди ко мне после работы" (Pasa por mi casa después del trabajo). "Я зайду в магазин по дороге домой" (Pasaré por la tienda de camino a casa). El prefijo за- indica una acción de paso breve.',
      ],
    },
    {
      heading: '¿Cómo afecta el prefijo al aspecto de los verbos de movimiento?',
      paragraphs: [
        'En los verbos de movimiento prefijados, la raíz multidireccional forma el imperfectivo y la unidireccional el perfectivo: приходить (imperfectivo, "soler llegar / estar llegando") frente a прийти (perfectivo, "llegar [una vez, con resultado]"). Así, Он приходит каждый день (viene cada día, hábito) usa el imperfectivo, y Он пришёл (llegó/ha llegado) usa el perfectivo.',
        'La trampa para el hispanohablante es que un mismo prefijo (при-, у-, в-, вы-) genera SIEMPRE los dos aspectos, uno con cada raíz: приезжать/приехать, уезжать/уехать. Elegir mal el aspecto cambia el sentido entre acción habitual/en proceso (imperfectivo) y acción única completada (perfectivo).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'при- (llega) | у- (se va) | вы-/в- (sale/entra) | за- (pasa de visita).',
    graphicPrompt: 'Flechas de dirección en una casa: flecha entrando (при-/в-), saliendo (у-/вы-), pasando (за-).',
    scene: [
      ['Он пришёл домой очень поздно.', 'Llegó a casa muy tarde.'],
      ['Она ушла на работу в 8 утра.', 'Se fue al trabajo a las 8 de la mañana.'],
      ['Войдите, пожалуйста — мы вас ждём.', 'Entre, por favor — le estamos esperando.'],
      ['Выйди на улицу — там тебя ждут.', 'Sal a la calle — te están esperando allí.'],
      ['Зайди ко мне завтра после обеда.', 'Pasa a verme mañana después de comer.'],
      ['Подойди ближе — я плохо вижу.', 'Acércate más — no veo bien.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['приходить/прийти = llegar', 'уходить/уйти = irse', 'входить/войти = entrar', 'заходить/зайти = pasar a ver'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el verbo prefijado correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el verbo prefijado que corresponde al contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Он ___ домой в 7 вечера. (llegó ayer)',
            lines: [['', 'Он ___ домой в 7 вечера.']],
            options: ['пришёл', 'ушёл', 'вышел', 'вошёл'],
            answer: 'пришёл',
            explain: '"пришёл" — прийти (perfectivo de приходить). Llegada al hogar.',
          },
          {
            scene: 'Она ___ из дома рано утром.',
            lines: [['', 'Она ___ из дома рано утром.']],
            options: ['ушла', 'пришла', 'вошла', 'зашла'],
            answer: 'ушла',
            explain: '"ушла" — уйти (perfectivo de уходить). Se fue de casa.',
          },
          {
            scene: '— Можно войти ? — ___.',
            lines: [['', '— ___ !']],
            options: ['Войдите', 'Выйдите', 'Придите', 'Уйдите'],
            answer: 'Войдите',
            explain: '"Войдите" — imperativo de войти. Invite a entrar.',
          },
          {
            scene: '— ___ из класса, пожалуйста. (Sal)',
            lines: [['', '___ из класса, пожалуйста.']],
            options: ['Выйди', 'Войди', 'Зайди', 'Уйди'],
            answer: 'Выйди',
            explain: '"Выйди" — imperativo de выйти. Sal hacia afuera.',
          },
          {
            scene: '___ ко мне после занятий. (Pasa a verme)',
            lines: [['', '___ ко мне после занятий.']],
            options: ['Зайди', 'Уйди', 'Войди', 'Выйди'],
            answer: 'Зайди',
            explain: '"Зайди" — imperativo de зайти. Pasa a visitarme (visita breve de camino).',
          },
          {
            scene: 'Поезд уже ___. (se fue, perfectivo)',
            lines: [['', 'Поезд уже ___.']],
            options: ['ушёл', 'пришёл', 'зашёл', 'вышел'],
            answer: 'ушёл',
            explain: '"ушёл" — уйти. El tren ya se fue / partió.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Acción concluida vs habitual',
        tag: '2 espacios',
        intro: 'Completa con el aspecto correcto (perfectivo o imperfectivo).',
        type: 'dual',
        items: [
          {
            scene: 'Ayer llegó a las 8 / Habitualmente llega a las 8.',
            lines: [['', 'Вчера он [[0]] в 8. Обычно он [[1]] в 8.']],
            blanks: [
              { options: ['пришёл', 'приходит', 'прийти', 'приходил'], answer: 'пришёл', explain: '"пришёл" — perfectivo (вчера = ayer, acción concluida).' },
              { options: ['приходит', 'пришёл', 'прийти', 'приходит'], answer: 'приходит', explain: '"приходит" — imperfectivo (обычно = habitualmente).' },
            ],
          },
          {
            scene: 'Se fue ya / Siempre se va a las 6.',
            lines: [['', 'Она уже [[0]]. Обычно она [[1]] в 6.']],
            blanks: [
              { options: ['ушла', 'уходит', 'уйти', 'уходила'], answer: 'ушла', explain: '"ушла" — perfectivo (уже = ya, acción terminada).' },
              { options: ['уходит', 'ушла', 'уйти', 'уходила'], answer: 'уходит', explain: '"уходит" — imperfectivo (обычно = habitualmente).' },
            ],
          },
          {
            scene: 'Entre, por favor (imperativo) / Ella está entrando ahora.',
            lines: [['', '[[0]], пожалуйста ! Она сейчас [[1]] в зал.']],
            blanks: [
              { options: ['Войдите', 'Входите', 'Выйдите', 'Уйдите'], answer: 'Войдите', explain: '"Войдите" — imperf. войти para invitar a entrar (único imperativo cortés de в-).' },
              { options: ['входит', 'вошла', 'выходит', 'вышла'], answer: 'входит', explain: '"входит" — входить, proceso en curso (сейчас = ahora → imperfectivo).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una tarde en casa',
        tag: 'Texto guiado',
        intro: 'Completa con el verbo prefijado correcto.',
        type: 'guidedText',
        scene: 'Ирина рассказывает о вечере.',
        text: 'Вчера вечером я [[0]] домой в 6 часов. Я [[1]] в квартиру и поставила чайник. Потом [[2]] мой сосед — он хотел вернуть книгу. Мы немного поговорили, и он [[3]]. Потом [[4]] мой брат, и мы поужинали вместе.',
        blanks: [
          { options: ['пришла', 'ушла', 'вышла', 'зашла'], answer: 'пришла', explain: '"пришла" — прийти. Llegué a casa.' },
          { options: ['вошла', 'вышла', 'зашла', 'ушла'], answer: 'вошла', explain: '"вошла" — войти. Entré al apartamento.' },
          { options: ['зашёл', 'пришёл', 'ушёл', 'вошёл'], answer: 'зашёл', explain: '"зашёл" — зайти. Pasó a visitarme (visita breve de camino).' },
          { options: ['ушёл', 'пришёл', 'зашёл', 'вышел'], answer: 'ушёл', explain: '"ушёл" — уйти. Se fue.' },
          { options: ['пришёл', 'ушёл', 'зашёл', 'вошёл'], answer: 'пришёл', explain: '"пришёл" — прийти. Mi hermano llegó.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el verbo correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta del verbo prefijado.',
        type: 'freeText',
        scene: 'Напишите правильный глагол.',
        text: 'Студенты [[0]] в аудиторию. (entraron, perfectivo) / [[1]] , пожалуйста ! (Salgan, imperativo) / Мама уже [[2]]. (se fue, perfectivo) / Он [[3]] ко мне каждый вторник. (pasa a verme, imperfectivo, hábito)',
        blanks: [
          { answer: 'вошли', explain: '"вошли" — войти, pasado plural perfectivo.' },
          { answer: 'Выйдите', explain: '"Выйдите" — imperativo pl. de выйти (Salgan/Salid).' },
          { answer: 'ушла', explain: '"ушла" — уйти, pasado fem. perfectivo.' },
          { answer: 'заходит', explain: '"заходит" — заходить, imperfectivo 3ª sg (hábito).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe movimientos',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase con el verbo prefijado correcto.',
        type: 'write',
        items: [
          {
            scene: 'Mis padres llegaron ayer a las 7.',
            prompt: 'Usa прийти (perf.) en pasado plural.',
            answer: 'Мои родители пришли вчера в 7 вечера.',
            accepted: ['Вчера мои родители пришли в 7 часов.'],
            explain: '"пришли" — прийти, pasado pl. perf.',
          },
          {
            scene: 'Pasa a verme cuando puedas.',
            prompt: 'Usa зайти en imperativo informal (зайди).',
            answer: 'Зайди ко мне, когда сможешь.',
            accepted: ['Когда сможешь, зайди ко мне.'],
            explain: '"Зайди ко мне" — imperativo de зайти. ко мне = con dativo de я.',
          },
          {
            scene: 'Ella siempre se va del trabajo a las 18:00.',
            prompt: 'Usa уходить (imperf.) para el hábito.',
            answer: 'Она всегда уходит с работы в 18:00.',
            accepted: ['Обычно она уходит с работы в шесть.'],
            explain: '"уходит" — imperfectivo (всегда/обычно = hábito).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Cuenta lo que pasó ayer',
        tag: 'Escritura libre',
        intro: 'Describe los movimientos de ayer usando verbos prefijados.',
        type: 'write',
        items: [
          {
            scene: 'Describe 4-5 movimientos de tu día de ayer.',
            prompt: 'Используй пришёл/пришла, ушёл/ушла, вошёл/вошла, вышел/вышла, зашёл/зашла.',
            answer: 'Вчера я вышла из дома в 8 утра. Я зашла в кафе по дороге. Потом вошла в офис и начала работать. В 6 вечера я ушла с работы. Пришла домой усталая, но довольная.',
            accepted: ['Вчера утром я вышел из квартиры в 9. Зашёл в магазин купить хлеб. Пришёл на работу немного опоздав. Вечером ушёл домой в 7.'],
            explain: 'Prefijados perfectivos en pasado: вышла/вышел, зашла/зашёл, вошла/вошёл, ушла/ушёл, пришла/пришёл.',
          },
          {
            scene: 'Describe los movimientos habituales de un día normal.',
            prompt: 'Используй imperfectivos: выходить, заходить, входить, уходить, приходить.',
            answer: 'Каждый день я выхожу из дома в 8. Иногда захожу в кафе за кофе. Вхожу в офис и начинаю работать. Ухожу с работы в 18:00. Прихожу домой и отдыхаю.',
            accepted: ['Обычно я выхожу из дома рано. Иногда захожу к другу по дороге. Прихожу на место к 9. Ухожу в 6 вечера.'],
            explain: 'Prefijados imperfectivos (каждый день, обычно, иногда = hábito).',
          },
        ],
      },
    ],
  },
}

export default topic
