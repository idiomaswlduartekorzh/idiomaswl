'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#cc0000';

interface ReadingText {
  id: number;
  title: string;
  titleTranslit: string;
  topic: string;
  words: number;
  grammar: string;
  text: string;
  textTranslit: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[];
  openQ: string;
  production: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Поездка в Санкт-Петербург', titleTranslit: 'Poyezdka v Sankt-Peterburg', topic: 'Viajes y turismo', words: 98, grammar: 'Прошедшее время',
    text: 'Прошлым летом я ездила в Санкт-Петербург с подругой. Мы провели там пять дней. В первый день мы пошли в Эрмитаж и увидели много картин и скульптур. Музей был огромный и очень красивый. На следующий день мы гуляли по набережной Невы и фотографировали дворцы и мосты. Белые ночи были незабываемыми — в полночь на улице было светло! В последний день мы купили сувениры на Невском проспекте. Санкт-Петербург — один из самых красивых городов в мире.',
    textTranslit: 'Proshylm letom ya yezdila v Sankt-Peterburg s podrugoy. My proveli tam pyat dney. V pervyy den my poshli v Ermitazh i uvideli mnogo kartin i skulptur. Muzey byl ogromnyy i ochen krasivyy. Na sleduyushchiy den my gulyali po naberezhnoy Nevy i fotografirovali dvortsy i mosty. Belye nochi byli nezabyvayemymi — v polnoch na ulitse bylo svetlo! V poslyedniy den my kupili suveniry na Nevskom prospekte. Sankt-Peterburg — odin iz samykh krasivykh gorodov v mire.',
    vocab: { провели: 'pasamos (tiempo)', эрмитаж: 'el Hermitage', картин: 'cuadros/pinturas', набережной: 'la ribera/malecón', дворцы: 'palacios', мосты: 'puentes', незабываемыми: 'inolvidables', полночь: 'medianoche', светло: 'había luz', проспекте: 'avenida/bulevar' },
    preQ: [
      { q: '¿Has visitado alguna ciudad con muchos museos y ríos?', opts: ['Sí, varias veces', 'Solo una vez', 'Aún no'], a: -1 },
      { q: '¿Qué te gustaría ver en Rusia?', opts: ['El Kremlin', 'El Hermitage', 'El lago Baikal'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "провели"?', cat: 'Vocabulario', opts: ['pasamos (tiempo)', 'viajamos', 'compramos', 'vimos'], a: 0, fb: '"Провели" = pasamos (tiempo). Provodít vremya = pasar el tiempo. Pasado de проводить.' },
      { q: '¿Adónde fueron el primer día?', cat: 'Comprensión', opts: ['Al Kremlin', 'Al Hermitage', 'A la orilla del río', 'Al mercado'], a: 1, fb: '"В первый день мы пошли в Эрмитаж" — fueron al Hermitage el primer día.' },
      { q: '¿Cuántos días estuvieron en San Petersburgo?', cat: 'Comprensión', opts: ['Tres días', 'Una semana', 'Cinco días', 'Dos días'], a: 2, fb: '"Мы провели там пять дней" — pasaron cinco días allí.' },
      { q: '¿Qué era especial de las noches blancas?', cat: 'Comprensión', opts: ['Hacía mucho frío', 'A medianoche había luz', 'Había muchas fiestas', 'Los museos estaban abiertos'], a: 1, fb: '"В полночь на улице было светло" — a medianoche había luz en la calle. Las noches blancas son un fenómeno de San Petersburgo en verano.' },
      { q: '¿Qué compraron el último día?', cat: 'Comprensión', opts: ['Libros', 'Ropa', 'Souvenirs', 'Comida'], a: 2, fb: '"В последний день мы купили сувениры на Невском проспекте" — compraron souvenirs en la avenida Nevsky.' },
      { q: '"Мы пошли в Эрмитаж" — ¿qué tiempo verbal es?', cat: 'Gramática', opts: ['Presente', 'Pasado (форма от идти/пойти)', 'Futuro', 'Imperativo'], a: 1, fb: '"Пошли" = pasado plural de пойти (ir, llegar). Мы пошли = nosotros fuimos. Pasado irregular con terminación -ли (plural).' },
    ],
    openQ: 'Describe un viaje que hiciste en el pasado en 3-4 oraciones. Usa verbos en pasado: ездил/а, пошёл/пошла, увидел/а, купил/а...',
    production: 'Usa: "Прошлым летом / в прошлом году я ездил/а в ___. Мы / Я пошёл/пошла в ___. Это было ___."',
  },
  {
    id: 2, title: 'Новая работа', titleTranslit: 'Novaya Rabota', topic: 'Trabajo y empleo', words: 92, grammar: 'Прошедшее время + будущее',
    text: 'На прошлой неделе Алексей начал работать в новой компании. Он проснулся рано утром, оделся и приехал в офис за пятнадцать минут до начала рабочего дня. Директор познакомил его с коллегами. Все были очень дружелюбными и помогли Алексею освоиться. На первом совещании обсуждали новый проект. Алексей волновался, но говорил уверенно. Вечером он позвонил маме и рассказал о первом рабочем дне. В следующем месяце он будет вести свой первый проект самостоятельно. Алексей уверен, что эта работа будет интереснее предыдущей.',
    textTranslit: 'Na proshloy nedele Aleksey nachal rabotat v novoy kompanii. On prosnulsya rano utrom, odelsya i priyekhal v ofis za pyatnadtsat minut do nachala rabochego dnya. Direktor poznakomil ego s kollegami. Vse byli ochen druzhelyubnymi i pomogli Alekseyu osvoit\'sya. Na pervom soveshchanii obsuzhdali novy proekt. Aleksey volnovalsya, no govoril uverenno. Vecherom on pozvonil mame i rasskazal o pervom rabochem dne. V sleduyushchem mesyatse on budet vesti svoy pervyy proekt samostoyatelno. Aleksey uveren, chto eta rabota budet interesnee predydushchey.',
    vocab: { проснулся: 'se despertó', оделся: 'se vistió', приехал: 'llegó (en vehículo)', познакомил: 'presentó/dio a conocer', освоиться: 'adaptarse/familiarizarse', совещании: 'en la reunión', обсуждали: 'discutieron/debatieron', волновался: 'estaba nervioso', уверенно: 'con confianza', интереснее: 'más interesante' },
    preQ: [
      { q: '¿Has empezado un trabajo nuevo alguna vez?', opts: ['Sí, varias veces', 'Solo una vez', 'Todavía no'], a: -1 },
      { q: '¿Qué te pone nervioso/a al empezar algo nuevo?', opts: ['Los compañeros', 'Las responsabilidades', 'El jefe'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "волновался"?', cat: 'Vocabulario', opts: ['estaba tranquilo', 'estaba nervioso', 'estaba aburrido', 'estaba contento'], a: 1, fb: '"Волновался" = estaba nervioso/ansioso. Волноваться = ponerse nervioso. Pasado masc.: волновался.' },
      { q: '¿Cuándo llegó Alexéi al trabajo?', cat: 'Comprensión', opts: ['Justo a tiempo', '15 minutos antes', 'Media hora tarde', '15 minutos tarde'], a: 1, fb: '"Приехал в офис за пятнадцать минут до начала" — llegó 15 minutos antes del inicio.' },
      { q: '¿Quién lo presentó a los colegas?', cat: 'Comprensión', opts: ['Su colega', 'El director', 'La recepcionista', 'Su amigo'], a: 1, fb: '"Директор познакомил его с коллегами" — el director lo presentó a los colegas.' },
      { q: '¿A quién llamó por la tarde?', cat: 'Comprensión', opts: ['A un amigo', 'A su jefe', 'A su mamá', 'A su esposa'], a: 2, fb: '"Вечером он позвонил маме" — por la tarde llamó a su mamá.' },
      { q: '¿Qué va a hacer el próximo mes?', cat: 'Comprensión', opts: ['Buscar otro trabajo', 'Ir de vacaciones', 'Dirigir su primer proyecto', 'Tomar un curso'], a: 2, fb: '"В следующем месяце он будет вести свой первый проект" — va a dirigir su primer proyecto. "Будет вести" = futuro imperfectivo.' },
      { q: '"Эта работа будет интереснее предыдущей" usa...', cat: 'Gramática', opts: ['Futuro imperfectivo + comparativo', 'Pasado + superlativo', 'Presente + comparativo', 'Futuro perfectivo'], a: 0, fb: '"Будет интереснее" = будет (futuro de быть) + интереснее (comparativo de интересный). Будущее время + сравнительная степень.' },
    ],
    openQ: 'Describe una situación en el pasado cuando empezaste algo nuevo (trabajo, escuela, curso). ¿Cómo te sentiste? Usa verbos en pasado.',
    production: 'Usa: "На прошлой неделе / В прошлом году я начал/а ___. Я познакомился/ась с ___. Я волновался/ась, но ___ В следующем месяце я буду ___."',
  },
  {
    id: 3, title: 'Мой район тогда и сейчас', titleTranslit: 'Moy Rayon Togda i Seychas', topic: 'Ciudad y vecindario', words: 95, grammar: 'Прошедшее время vs настоящее',
    text: 'Раньше мой район был очень тихим. Здесь было мало магазинов и не было кафе. Дети играли на улице, а машин было немного. Но за последние десять лет всё изменилось. Сейчас в нашем районе строится новый торговый центр. Открылось много кафе и ресторанов. Транспорт стал удобнее, но и шумнее. Раньше я знал всех соседей по имени. Теперь в нашем доме живут новые люди, и я не всех знаю. Район изменился, но мне здесь всё равно нравится. Я надеюсь, что в будущем он станет ещё лучше.',
    textTranslit: 'Ranshe moy rayon byl ochen tikhim. Zdes bylo malo magazinov i ne bylo kafe. Deti igrali na ulitse, a mashin bylo nemnogo. No za poslednie desyat let vsyo izmenilos. Seychas v nashem rayone stroitsya novy torgovy tsentr. Otkrylos mnogo kafe i restoranov. Transport stal udobnee, no i shumnee. Ranshe ya znal vsekh sosedey po imeni. Teper v nashem dome zhivut novye lyudi, i ya ne vsekh znayu. Rayon izmenilsya, no mne zdes vsyo ravno nravitsya. Ya nadeyus, chto v budushchem on stanet eshcho luchshe.',
    vocab: { раньше: 'antes/antiguamente', тихим: 'tranquilo', изменилось: 'cambió/se cambió', строится: 'se está construyendo', открылось: 'se abrió', удобнее: 'más cómodo', шумнее: 'más ruidoso', соседей: 'vecinos', имени: 'nombre (genitivo)', надеюсь: 'espero' },
    preQ: [
      { q: '¿Ha cambiado mucho tu barrio en los últimos años?', opts: ['Sí, mucho', 'Un poco', 'No, sigue igual'], a: -1 },
      { q: '¿Qué extrañas del barrio de tu infancia?', opts: ['La tranquilidad', 'Los vecinos', 'Los espacios verdes'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "раньше"?', cat: 'Vocabulario', opts: ['ahora', 'antes/antiguamente', 'mañana', 'siempre'], a: 1, fb: '"Раньше" = antes / antiguamente. Se usa para contrastar el pasado con el presente. Opuesto: сейчас (ahora).' },
      { q: '¿Cómo era el barrio antes?', cat: 'Comprensión', opts: ['Ruidoso y con muchas tiendas', 'Tranquilo y con pocos comercios', 'Grande y moderno', 'Peligroso'], a: 1, fb: '"Раньше мой район был очень тихим. Здесь было мало магазинов и не было кафе" — tranquilo y con pocos comercios.' },
      { q: '¿Qué se está construyendo ahora?', cat: 'Comprensión', opts: ['Un parque', 'Una escuela', 'Un centro comercial', 'Un hospital'], a: 2, fb: '"Сейчас в нашем районе строится новый торговый центр" — se está construyendo un nuevo centro comercial.' },
      { q: '¿Qué cambió con el transporte?', cat: 'Comprensión', opts: ['Se volvió más lento', 'Se volvió más cómodo pero más ruidoso', 'Desapareció', 'No cambió'], a: 1, fb: '"Транспорт стал удобнее, но и шумнее" — el transporte se volvió más cómodo pero también más ruidoso.' },
      { q: '¿Le gusta al narrador vivir allí ahora?', cat: 'Comprensión', opts: ['No, quiere mudarse', 'Sí, aunque todo cambió', 'Es indiferente', 'No se menciona'], a: 1, fb: '"Мне здесь всё равно нравится" — aún le gusta, a pesar de los cambios. Всё равно = de todas formas/de todos modos.' },
      { q: '"Район изменился" — ¿qué terminación tiene el pasado?', cat: 'Gramática', opts: ['-л (masculino)', '-ла (femenino)', '-ло (neutro)', '-ли (plural)'], a: 0, fb: '"Изменился" — район (barrio) es masculino → terminación -л + -ся (reflexivo). Masc. sg. reflexivo en pasado: -лся.' },
    ],
    openQ: 'Compara cómo era tu ciudad o barrio antes y cómo es ahora. Usa "раньше... но сейчас..." en al menos 3 oraciones.',
    production: 'Usa: "Раньше ___ был/была/было ___. Но сейчас ___ стал/стала ___. Мне нравится / не нравится, что ___."',
  },
  {
    id: 4, title: 'Сообщения другу', titleTranslit: 'Soobshcheniya Drugu', topic: 'Amistad y planes', words: 88, grammar: 'Будущее время',
    text: 'Привет! Ты свободен в эти выходные? Я буду в городе и хочу встретиться. — Привет! Да, я буду свободен в субботу. Что будем делать? — Может, сходим в кино? В эту субботу будет показывать новый фильм про космос. — Отлично! А после кино мы можем пойти в то кафе на Садовой улице. — Хорошая идея! Там будет работать новый шеф-повар. Говорят, готовит вкусно. — Договорились! Я куплю билеты онлайн, а ты зарезервируй столик. — Отлично, сделаю. Встретимся в семь вечера у входа в кинотеатр. — Договорились, до встречи!',
    textTranslit: 'Privet! Ty svoboden v eti vykhodnye? Ya budu v gorode i khochu vstretitsya. — Privet! Da, ya budu svoboden v subbotu. Chto budem delat? — Mozhet, skhodim v kino? V etu subbotu budet pokazyvat novy film pro kosmos. — Otlichno! A posle kino my mozhem poyti v to kafe na Sadovoy ulitse. — Khoroshaya ideya! Tam budet rabotat novy shef-povar. Govoryat, gotovit vkusno. — Dogovorilis! Ya kuplyu bilety onlayn, a ty zarezervuy stolik. — Otlichno, sdelayu. Vstretimsya v sem vechera u vkhoda v kinoteatr. — Dogovorilis, do vstrechi!',
    vocab: { свободен: 'libre (masc.)', выходные: 'fin de semana', встретиться: 'encontrarse/verse', сходим: 'vamos (una vez)', показывать: 'mostrar/proyectar', 'шеф-повар': 'chef', договорились: 'de acuerdo/trato hecho', зарезервируй: 'reserva (imperativo)', столик: 'mesita (en un restaurante)', вход: 'entrada' },
    preQ: [
      { q: '¿Cómo planeas normalmente las salidas con amigos?', opts: ['Por mensajes', 'Por teléfono', 'En persona'], a: -1 },
      { q: '¿Qué prefieres hacer el fin de semana?', opts: ['Ir al cine', 'Ir a un restaurante', 'Quedarme en casa'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "договорились"?', cat: 'Vocabulario', opts: ['disculpa', 'de acuerdo/trato hecho', 'hasta luego', 'quizás'], a: 1, fb: '"Договорились" = de acuerdo / quedamos. De договориться (llegar a un acuerdo). Muy frecuente para confirmar planes.' },
      { q: '¿Cuándo van a verse?', cat: 'Comprensión', opts: ['El viernes', 'El domingo', 'El sábado', 'Entre semana'], a: 2, fb: '"Я буду свободен в субботу" y "Встретимся в семь вечера" — el sábado a las 7 de la tarde.' },
      { q: '¿Qué tipo de película van a ver?', cat: 'Comprensión', opts: ['Una comedia', 'Una película de amor', 'Una película sobre el espacio', 'Un documental'], a: 2, fb: '"Новый фильм про космос" — una nueva película sobre el espacio.' },
      { q: '¿Quién va a comprar las entradas?', cat: 'Comprensión', opts: ['El amigo', 'Los dos juntos', 'El que escribe primero', 'Nadie'], a: 2, fb: '"Я куплю билеты онлайн" — el primero (el que escribe) va a comprar las entradas en línea.' },
      { q: '¿Dónde van a encontrarse?', cat: 'Comprensión', opts: ['En el café', 'En casa de uno de ellos', 'En la entrada del cine', 'En el metro'], a: 2, fb: '"Встретимся у входа в кинотеатр" — se van a encontrar en la entrada del cine.' },
      { q: '"Я буду свободен" usa будущее время porque...', cat: 'Gramática', opts: ['Es un plan futuro ya decidido', 'Es una acción habitual', 'Es el pasado', 'Es una orden'], a: 0, fb: '"Буду свободен" = futuro imperfectivo (быть + краткое прилагательное). Expresa un estado futuro: "estaré libre". Forma: буду + прилагательное/инфинитив.' },
    ],
    openQ: 'Escribe un intercambio de mensajes (3-4 mensajes) con un amigo planeando una salida el próximo fin de semana. Usa el futuro: буду, будешь, встретимся...',
    production: 'Usa: "Ты свободен/свободна в ___? — Да, я буду ___. Что будем делать? — Я куплю ___, а ты ___. Встретимся в ___ у ___."',
  },
  {
    id: 5, title: 'В ресторане', titleTranslit: 'V Restorane', topic: 'Gastronomía y servicios', words: 100, grammar: 'Дательный падеж + возвратные глаголы',
    text: 'Вчера мы с другом ходили в русский ресторан. Официант подошёл к нам и дал нам меню. Мне понравился интерьер: деревянная мебель, традиционные рисунки на стенах. Другу захотелось попробовать борщ — знаменитый русский суп из свёклы. Мне понравилась идея, и я тоже заказал борщ. На второе мы взяли пельмени с мясом и салат оливье. Официант рассказал нам о блюдах и посоветовал попробовать квас — традиционный русский напиток. Нам очень понравился ужин. Мы договорились вернуться туда в следующий раз. Ресторан называется «Берёзка».',
    textTranslit: 'Vchera my s drugom khodili v russky restoran. Ofitsiant podoshol k nam i dal nam menyu. Mne ponravilsya interer: derevyannaya mebel, traditsionnye risunki na stenakh. Drugu zakhotelos poprobovat borscht — znamenity russky sup iz svyokly. Mne ponravilas ideya, i ya tozhe zakazal borscht. Na vtoroye my vzyali pelmeni s myasom i salat olivye. Ofitsiant rasskazal nam o blyudakh i posovetoval poprobovat kvas — traditsionny russky napitok. Nam ochen ponravilsya uzhin. My dogovorilis vernutsya tuda v sleduyushchy raz. Restoran nazyvaetsya "Byorozka".',
    vocab: { официант: 'camarero', подошёл: 'se acercó', интерьер: 'interior/decoración', деревянная: 'de madera', борщ: 'borscht (sopa de remolacha)', знаменитый: 'famoso', свёклы: 'de remolacha', пельмени: 'pelmeni (empanadillas rusas)', оливье: 'ensalada olivier (ensalada rusa)', квас: 'kvas (bebida fermentada rusa)' },
    preQ: [
      { q: '¿Conoces algún plato ruso?', opts: ['Sí, el borscht', 'Sí, los pelmeni', 'No conozco ninguno'], a: -1 },
      { q: '¿Qué te gusta pedir primero en un restaurante?', opts: ['La sopa', 'Una ensalada', 'El plato principal directamente'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "пельмени"?', cat: 'Vocabulario', opts: ['sopa de remolacha', 'empanadillas rusas de carne', 'ensalada rusa', 'bebida fermentada'], a: 1, fb: '"Пельмени" (pelmeni) = empanadillas/ravioles rellenos de carne. Plato típico ruso, se sirven con crema agria (сметана).' },
      { q: '¿Qué plato le apetecía probar al amigo?', cat: 'Comprensión', opts: ['Los pelmeni', 'El kvas', 'El borscht', 'El salat olivier'], a: 2, fb: '"Другу захотелось попробовать борщ" — al amigo le apeteció probar el borscht. "Захотелось" + дательный = apetecer.' },
      { q: '¿Qué tomaron de segundo?', cat: 'Comprensión', opts: ['Sopa y pan', 'Pelmeni y ensalada olivier', 'Solo ensalada', 'Carne asada'], a: 1, fb: '"На второе мы взяли пельмени с мясом и салат оливье" — pelmeni con carne y ensalada olivier.' },
      { q: '¿Qué les recomendó el camarero probar?', cat: 'Comprensión', opts: ['El borscht', 'El vodka', 'El kvas', 'El té ruso'], a: 2, fb: '"Посоветовал попробовать квас" — les recomendó probar el kvas, una bebida tradicional rusa fermentada.' },
      { q: '"Мне понравился интерьер" — ¿por qué "мне" y no "я"?', cat: 'Gramática', opts: ['Porque нравиться usa el dativo (кому?)', 'Porque es pasado', 'Porque es reflexivo', 'Es un error'], a: 0, fb: '"Нравиться" (gustar) requiere el DATIVO: мне нравится = me gusta. "Я" sería incorrecto. El dativo indica quien experimenta el gusto.' },
      { q: '"Ресторан называется «Берёзка»" — ¿qué tipo de verbo es "называется"?', cat: 'Gramática', opts: ['Возвратный (reflexivo con -ся)', 'Irregular', 'Переходный (transitivo)', 'Futuro'], a: 0, fb: '"Называется" = se llama. Es un verbo reflexivo (-ся). Называться = llamarse (pasivo/reflexivo). Muy frecuente en ruso para expresar nombres.' },
    ],
    openQ: 'Describe una experiencia en un restaurante usando verbos en pasado y al menos una estructura con "нравиться" en dativo.',
    production: 'Usa: "Вчера/На прошлой неделе я ходил/а в ___. Мне понравился/ась/ось ___. Я заказал/а ___. Нам/мне очень понравилось ___."',
  },
];

function tokenizeRu(text: string) {
  return text.split(/(\s+|[.,!?'"«»\-—]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'"«»\-—]+$/.test(t),
    clean: t.replace(/[^а-яёА-ЯЁa-zA-Z]/g, '').toLowerCase(),
  }));
}

function MCQItem({ q, qi, answers, onAnswer }: {
  q: ReadingText['mcq'][0]; qi: number;
  answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void;
}) {
  const ans = answers[qi];
  const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        {q.cat} · Вопрос {qi + 1}
      </div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
          if (done && isSelected && isCorrect)  { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [showTranslit, setShowTranslit] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenizeRu(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleWord(clean: string, idx: number) {
    if (!clean) return;
    setActiveWord(t.vocab[clean] ?? null);
    setActiveIdx(idx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Todos los textos</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Texto {t.id} / 5 — {t.title}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 {t.words} слов · {t.grammar}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lectura', 'Lectura', 'Вопросы', 'Resultado'];
          const current = phase === p;
          const past = (['pre', 'read', 'questions', 'done'] as const).indexOf(p) < (['pre', 'read', 'questions', 'done'] as const).indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Antes de leer — activa tu conocimiento</p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Piensa un momento antes de leer. Tema: <strong style={{ color: 'var(--ink)' }}>{t.topic}</strong>.
          </p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.84rem' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setPhase('read')}>
            Listo — ir al texto →
          </button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />{t.title} — toca cualquier palabra para ver su traducción
          </p>
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => handleWord(tk.clean, i)} style={{
                    background: isActive ? 'rgba(204,0,0,0.12)' : hasTrans ? 'rgba(204,0,0,0.06)' : 'transparent',
                    border: isActive ? '1.5px solid #cc0000' : hasTrans ? '1px dashed rgba(204,0,0,0.3)' : 'none',
                    borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                    fontSize: 'inherit', fontFamily: 'inherit',
                    color: isActive ? '#cc0000' : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                  }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: activeWord ? '#8b0000' : '#6f7691', color: '#fff', borderRadius: 8,
                      padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap',
                      zIndex: 10, boxShadow: '0 4px 16px rgba(139,0,0,0.25)', marginTop: 4,
                    }}>
                      {activeWord ?? '(palabra funcional)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}20`, marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Transliteración</span>
              <button onClick={() => setShowTranslit(s => !s)} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 5, border: `1px solid ${COLOR}30`, background: showTranslit ? `${COLOR}15` : 'transparent', color: COLOR, cursor: 'pointer', fontFamily: 'var(--mono)' }}>
                {showTranslit ? '▲ Ocultar' : '▼ Mostrar'}
              </button>
            </div>
            {showTranslit && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.textTranslit}</p>}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              Ya leí → Responder вопросы
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Ocultar tooltip
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: 'auto' }} onClick={() => setPhase('pre')}>
              ← Volver a pre-lectura
            </button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Producción libre</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4}
              placeholder="Escribe aquí en ruso (cirílico o transliteración)..."
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && (
            <button className="btn btn-sm" onClick={() => setPhase('done')}>Ver mi resultado →</button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? '¡Отлично! Comprendiste todo el texto.' : score >= 4 ? 'Хорошо. Repasa las preguntas que fallaste.' : 'Vuelve al texto y búscalas — la transliteración ayuda.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>TU PRODUCCIÓN LIBRE</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Reintentar</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Elegir otro texto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaRusoA2() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Чтение</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Чтение</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Чтение · Ruso A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos en cirílico (80-120 слов). Cada texto incluye transliteración, vocabulario interactivo, 6 вопросов y producción libre.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
                border: `1.5px solid ${COLOR}22`, borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(204,0,0,0.04) 0%, transparent 100%)',
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(204,0,0,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {t.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic' }}>{t.titleTranslit}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {t.words} слов · Gramática: {t.grammar} · {t.mcq.length} вопросов + producción libre
                  </p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Lee el texto en cirílico tocando las palabras resaltadas. Usa la transliteración como apoyo. Luego responde los 6 вопросов de vocabulario, comprensión y gramática.
        </div>
      </div>
    </section>
  );
}
