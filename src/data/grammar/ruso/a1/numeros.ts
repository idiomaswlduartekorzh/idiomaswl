import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'numeros',
  order: '15',
  color: '#1a2ecc',
  category: 'Числа',
  level: 'A1',
  title: 'Números en ruso A1: 1-100 y su uso con sustantivos',
  shortTitle: 'Números 1-100',
  metaTitle: 'Números en ruso A1 — один, два, три, десять, двадцать, сто con casos',
  description:
    'Los números rusos (1-100) tienen una peculiaridad clave: el número determina el caso del sustantivo siguiente. 1 = nominativo singular; 2-4 = genitivo singular; 5+ = genitivo plural. Esta regla es esencial para usar los números correctamente en ruso desde A1.',
  lead: 'Один, два, три, четыре, пять... y la regla de oro: 1 sustantivo normal, 2-4 en genitivo singular, 5+ en genitivo plural. Los números rusos son fascinantes y completamente lógicos.',
  outcomes: [
    'Reconocer y pronunciar números del 1 al 100 en ruso',
    'Aplicar la regla de casos con números: 1 + nom.sg., 2-4 + gen.sg., 5+ + gen.pl.',
    'Usar números en contextos cotidianos (precios, edades, cantidades)',
  ],
  guide: {
    goal: 'Usar números del 1 al 100 con la declinación correcta del sustantivo.',
    model: '[número] + [sustantivo en caso correcto]',
    formula: '1+ном.ед. | 2-4+род.ед. | 5-20+род.мн. | 21+ном.ед. | 22-24+род.ед.',
    decisions: [
      '¿El número termina en 1 (excepto 11)? → nominativo singular: один студент, двадцать один студент',
      '¿Termina en 2, 3, 4 (excepto 12, 13, 14)? → genitivo singular: два студента, двадцать два студента',
      '¿Termina en 5-9, 0, 11-14? → genitivo plural: пять студентов, одиннадцать студентов',
      '¿Preguntas cuánto? → Сколько? + genitivo: Сколько студентов? (¿Cuántos estudiantes?)',
    ],
    table: [
      ['Número', 'Regla', 'Ejemplo con "студент"'],
      ['1 / 21 / 31...', 'Nominativo sg.', 'один студент / двадцать один студент'],
      ['2, 3, 4 / 22, 23...', 'Genitivo sg.', 'два студента / двадцать два студента'],
      ['5-20 / 25-30...', 'Genitivo pl.', 'пять студентов / двадцать пять студентов'],
      ['11, 12, 13, 14', 'Genitivo pl. (siempre)', 'одиннадцать студентов / двенадцать студентов'],
    ],
    mistakes: [
      'Excepción: 11-14 SIEMPRE toman genitivo plural, aunque terminen en 1-4. Одиннадцать студентов (no студент).',
      'Dos (2) es diferente según género: два (masc/ntr) vs две (fem). Два студента, НО две студентки.',
      'Oба/обе = ambos/ambas: оба студента (masc), обе студентки (fem). Para exactamente 2.',
      'Сколько (¿cuántos?) siempre pide genitivo plural: Сколько студентов? Сколько книг?',
    ],
  },
  seo: [
    {
      heading: '¿Cómo funcionan los números del 1 al 100 en ruso?',
      paragraphs: [
        'Los números rusos del 1 al 20 son básicos: один (1), два (2), три (3), четыре (4), пять (5), шесть (6), семь (7), восемь (8), девять (9), десять (10), одиннадцать (11), двенадцать (12), тринадцать (13), четырнадцать (14), пятнадцать (15), шестнадцать (16), семнадцать (17), восемнадцать (18), девятнадцать (19), двадцать (20).',
        'Las decenas del 30 al 90: тридцать, сорок, пятьдесят, шестьдесят, семьдесят, восемьдесят, девяносто. Y сто para el 100. Los compuestos se forman uniendo: двадцать один (21), тридцать два (32), etc.',
      ],
      table: [
        ['Número', 'Ruso', 'Pronunciación aprox.'],
        ['1', 'один', 'a-DEEN'],
        ['2', 'два / две', 'dva / dvye'],
        ['5', 'пять', 'pyat'],
        ['10', 'десять', 'DYEsyat'],
        ['20', 'двадцать', 'DVATsat'],
        ['100', 'сто', 'sto'],
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The case-agreement rule after numbers is the key grammatical challenge. Focus first on the three-way split (1/2-4/5+) before diving into exceptions (11-14 always genitive plural). Два/две gender distinction comes second.',
    graphicPrompt:
      'Number line 1-10 with color coding: 1=green (nom sg), 2-4=yellow (gen sg), 5-10=red (gen pl). Examples below each group. Blue Russian theme.',
    scene: [
      ['1', 'один студент (a-DEEN) — un estudiante (nominativo sg)'],
      ['2', 'два студента (dva) — dos estudiantes (genitivo sg)'],
      ['5', 'пять студентов (pyat) — cinco estudiantes (genitivo pl)'],
      ['11', 'одиннадцать студентов (a-DIN-nat-tsat) — once estudiantes (gen pl siempre!)'],
      ['21', 'двадцать один студент — veintiún estudiantes (nom sg - termina en 1)'],
      ['100', 'сто студентов — cien estudiantes (genitivo pl)'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['студент', 'рубль', 'год', 'книга'],
    reviewFocus: ['1→ном.ед.', '2-4→род.ед.', '5+→род.мн.', '11-14→всегда род.мн.'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Числа и падежи',
        tag: 'Opción múltiple',
        intro: 'Identifica el número y la forma correcta del sustantivo.',
        type: 'choice',
        items: [
          { scene: '1 + sustantivo', lines: [['', '"Un estudiante": ___ студент']], options: ['один', 'два', 'пять', 'десять'], answer: 'один', explain: 'Один = uno (masc). 1 + nominativo singular. один студент.' },
          { scene: '2-4 + genitivo sg', lines: [['', '"Tres estudiantes": три ___ (genitivo de студент)']], options: ['студент', 'студентов', 'студента', 'студенты'], answer: 'студента', explain: 'Три + genitivo singular. студент → студента (masc añade -а). три студента.' },
          { scene: '5+ + genitivo pl', lines: [['', '"Cinco libros": пять ___ (genitivo pl de книга)']], options: ['книга', 'книги', 'книге', 'книг'], answer: 'книг', explain: 'Пять + genitivo plural. книга → книг (genitivo plural, la -а cae). пять книг.' },
          { scene: 'Excepción 11-14', lines: [['', '"Once estudiantes": одиннадцать ___']], options: ['студент', 'студента', 'студентов', 'студенты'], answer: 'студентов', explain: 'Одиннадцать (11) siempre + genitivo plural. одиннадцать студентов. Excepción para 11-14.' },
          { scene: 'Сколько?', lines: [['', '"¿Cuántos estudiantes?": Сколько ___?']], options: ['студент', 'студента', 'студентов', 'студенты'], answer: 'студентов', explain: 'Сколько siempre pide genitivo plural. Сколько студентов?' },
          { scene: 'Dos femenino', lines: [['', '"Dos estudiantes" (femenino — студентка): две ___']], options: ['студентка', 'студентки', 'студенток', 'студентке'], answer: 'студентки', explain: 'Две (fem de два) + genitivo singular. студентка → студентки (-а/-я → -и в gen sg fem).' },
          { scene: 'Número 21', lines: [['', '"Veintiún años": двадцать один ___ (год = año)']], options: ['лет', 'года', 'год', 'годов'], answer: 'год', explain: '21 termina en 1 → nominativo singular. двадцать один год. (25 лет = genitivo plural; 23 года = gen sg).' },
          { scene: 'Precio', lines: [['', '"Cien rublos": сто ___ (рубль = rublo)']], options: ['рубль', 'рубля', 'рублей', 'рублю'], answer: 'рублей', explain: 'Сто + genitivo plural. рубль → рублей. сто рублей.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Числа в контексте',
        tag: '2 espacios',
        intro: 'Completa con el número y la forma del sustantivo.',
        type: 'dual',
        items: [
          { scene: 'Precio en rublos', lines: [['', '"Cuatro rublos": [[0]] [[1]].']], blanks: [{ options: ['один', 'два', 'четыре', 'пять'], answer: 'четыре', explain: 'Четыре = cuatro. 2-4 → genitivo singular.' }, { options: ['рубль', 'рубля', 'рублей', 'рублю'], answer: 'рубля', explain: 'Рубль → рубля. Masc + 2-4 → genitivo singular: añade -я.' }] },
          { scene: 'Años de edad', lines: [['', '"Tengo treinta y dos años": Мне [[0]] [[1]].']], blanks: [{ options: ['тридцать один', 'тридцать два', 'тридцать пять', 'двадцать'], answer: 'тридцать два', explain: 'Тридцать два (32). 32 termina en 2 → genitivo singular.' }, { options: ['год', 'года', 'лет', 'годов'], answer: 'года', explain: 'Год → года. 2-4 + gen sg. Мне тридцать два года.' }] },
          { scene: 'Estudiantes en clase', lines: [['', '"Hay veinte estudiantes": [[0]] [[1]] в классе.']], blanks: [{ options: ['двадцать', 'двадцать один', 'двадцать два', 'один'], answer: 'двадцать', explain: 'Двадцать = veinte. 20 termina en 0 → genitivo plural.' }, { options: ['студент', 'студента', 'студентов', 'студенты'], answer: 'студентов', explain: 'Студент → студентов. 20 + genitivo plural: студентов.' }] },
          { scene: 'Сколько лет?', lines: [['', '"¿Cuántos años tienes?": Сколько тебе [[0]]? — Мне пятнадцать [[1]].']], blanks: [{ options: ['год', 'лет', 'года', 'годы'], answer: 'лет', explain: 'Сколько + genitivo plural. Лет = genitivo plural de год (irregular).' }, { options: ['год', 'года', 'лет', 'годов'], answer: 'лет', explain: 'Пятнадцать (15) + genitivo plural. Лет. Мне пятнадцать лет.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Текст — числа в жизни',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del sustantivo con cada número.',
        type: 'guidedText',
        scene: 'Un día en WeLearn con números',
        text: 'В академии WeLearn есть двадцать [[0]] студентов. (Hay 20 estudiantes.) Каждый день приходят три [[1]]. (Cada día llegan 3 profesores.) У Дэвида пять [[2]]. (Tomás tiene 5 libros.) Один [[3]] говорит по-корейски. (Un estudiante habla coreano.) Цена за урок — восемьдесят [[4]] рублей. (El precio de la lección es 80 rublos.)',
        blanks: [
          { options: ['студент', 'студента', 'студентов', 'студенты'], answer: 'студентов', explain: 'Двадцать (20) + genitivo plural. студентов.' },
          { options: ['учитель', 'учителя', 'учителей', 'учители'], answer: 'учителя', explain: 'Три (3) = 2-4 + genitivo singular. учитель → учителя (-ель → -еля).' },
          { options: ['книга', 'книги', 'книг', 'книге'], answer: 'книг', explain: 'Пять (5) + genitivo plural. книга → книг.' },
          { options: ['студентов', 'студента', 'студенты', 'студент'], answer: 'студент', explain: 'Один (1) + nominativo singular. один студент.' },
          { options: ['рубль', 'рубля', 'рублей', 'рублю'], answer: 'рублей', explain: 'Восемьдесят (80) + genitivo plural. рублей.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Свободное письмо — числа',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del sustantivo con el número dado.',
        type: 'freeText',
        scene: 'Expresando cantidades en ruso',
        text: '1. "Dos años": два [[0]] (год → gen sg). 2. "Siete estudiantes": семь [[1]] (студент → gen pl). 3. "Veintiún rublos": двадцать один [[2]] (рубль → nom sg). 4. "Cuatro libros": четыре [[3]] (книга → gen sg). 5. "Once horas": одиннадцать [[4]] (час → gen pl).',
        blanks: [
          { answer: 'года', accepted: ['года'], explain: 'Два + genitivo singular. год → года.' },
          { answer: 'студентов', accepted: ['студентов'], explain: 'Семь (7) + genitivo plural. студент → студентов.' },
          { answer: 'рубль', accepted: ['рубль'], explain: 'Двадцать один (21 termina en 1) + nominativo singular. рубль.' },
          { answer: 'книги', accepted: ['книги'], explain: 'Четыре (4) + genitivo singular fem. книга → книги.' },
          { answer: 'часов', accepted: ['часов'], explain: 'Одиннадцать (11) — excepción, siempre genitivo plural. час → часов.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Числа в предложениях',
        tag: 'Producción',
        intro: 'Construye frases completas con números en ruso.',
        type: 'write',
        items: [
          { scene: 'Presentar cantidades', prompt: 'Traduce al ruso: "En mi clase hay quince estudiantes. Cinco estudiantes hablan inglés. Un estudiante habla coreano." (в моём классе = en mi clase, говорит = habla)', answer: 'В моём классе есть пятнадцать студентов. Пять студентов говорят по-английски. Один студент говорит по-корейски.', accepted: ['пятнадцать студентов', 'пять студентов', 'один студент'], explain: 'Пятнадцать (15) + gen pl (студентов). Пять (5) + gen pl. Один (1) + nom sg (студент).' },
          { scene: 'Precios y edades', prompt: 'Traduce al ruso: "El café cuesta ochenta rublos. Tengo veintitrés años." (кофе = café, стоит = cuesta, мне = tengo/a mí)', answer: 'Кофе стоит восемьдесят рублей. Мне двадцать три года.', accepted: ['восемьдесят рублей', 'двадцать три года'], explain: 'Восемьдесят (80) + gen pl → рублей. Двадцать три (23 termina en 3) + gen sg → года.' },
          { scene: 'Сколько?', prompt: 'Escribe en ruso: "¿Cuántos estudiantes hay? — Hay veintidós estudiantes." (есть = hay)', answer: 'Сколько студентов есть? — Есть двадцать два студента.', accepted: ['сколько студентов', 'двадцать два студента'], explain: 'Сколько + gen pl (студентов). Двадцать два (22 termina en 2) + gen sg (студента).' },
          { scene: 'Tu edad y cantidades', prompt: 'Escribe en ruso: "Tengo [tu edad] años y estudio en WeLearn. La clase tiene [número] estudiantes."', answer: 'Мне двадцать пять лет и я учусь в WeLearn. В классе двадцать студентов.', accepted: ['лет', 'студентов'], explain: 'Лет = genitivo plural de год (irregular). Двадцать (20) + gen pl (студентов).' },
        ],
      },
      {
        id: 'level-6',
        title: 'Числовая миссия',
        tag: 'Producción',
        intro: 'Usa números en contextos reales del ruso.',
        type: 'write',
        items: [
          { scene: 'Describir una tienda', prompt: 'Escribe en ruso un pequeño anuncio de tienda con precios (inventados). Incluye al menos 4 números con sustantivos en los casos correctos. Usa: рубль (rublo), книга (libro), час (hora), студент.', answer: 'Книга — триста рублей. Урок русского языка — тысяча рублей в час. В группе пять студентов. Курс длится три месяца.', accepted: ['рублей', 'студентов', 'месяца'], explain: 'Триста (300) + gen pl (рублей). Пять (5) + gen pl (студентов). Три (3) + gen sg (месяца).' },
          { scene: 'Anuncio de WeLearn', prompt: 'Escribe en ruso un mini-anuncio de WeLearn con: cuántos idiomas enseñan, cuántos profesores hay, y el precio de una clase. Usa números correctos.', answer: 'WeLearn предлагает шесть языков. У нас работают двенадцать преподавателей. Цена одного урока — сто пятьдесят рублей.', accepted: ['шесть языков', 'двенадцать преподавателей', 'ста', 'рублей'], explain: 'Шесть (6) + gen pl (языков). Двенадцать (12 — excepción!) + gen pl (преподавателей). Сто пятьдесят + gen pl.' },
        ],
      },
    ],
  },
}

export default topic
