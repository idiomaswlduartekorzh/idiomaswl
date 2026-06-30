'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'proshedshee', title: 'Прошедшее время (Pasado)', icon: '⏰',
    rule: 'El pasado ruso es muy simple: infinitive quita -ть → + л (masc.) / ла (fem.) / ло (neutro) / ли (plural). Verbo irregular principal: быть (ser/estar): был/была/было/были. No hay conjugación por persona — solo por GÉNERO y NÚMERO del sujeto. Negación: не + verbo. Auxiliar: НЕТ auxiliar — el pasado es forma simple.',
    tip: 'Diferencia clave con A1: en A1 usabas presente: "Я иду (ya idu — voy)". En A2 narras el pasado: "Вчера я ходил/ходила (Vchera ya khodil/khodila — ayer fui)". El género del SUJETO determina la terminación, no la persona: Маша читала (fem.), Иван читал (masc.).',
    table: {
      headers: ['Sujeto', 'M / F / N / Pl', 'читать — leer', 'идти — ir', 'быть — ser'],
      rows: [
        ['Он (él)', 'M → л', 'читал (chital)', 'шёл (shyol)', 'был (byl)'],
        ['Она (ella)', 'F → ла', 'читала (chitala)', 'шла (shla)', 'была (byla)'],
        ['Оно (neutro)', 'N → ло', 'читало (chitalo)', 'шло (shlo)', 'было (bylo)'],
        ['Они / мы / вы', 'Pl → ли', 'читали (chitali)', 'шли (shli)', 'были (byli)'],
      ]
    },
    a1note: 'En A1 usabas el presente: "Я читаю (ya chitayu — leo)". El pasado no tiene conjugación por persona — solo cambia la terminación según el GÉNERO del sujeto. Это упрощает систему! (Eto uproschayet sistemu — ¡Esto simplifica el sistema!)',
    examples: [
      'Вчера она читала книгу весь вечер. (Vchera ona chitala knigu ves vecher.) — Ayer ella leyó un libro toda la tarde. [она = fem. → читала]',
      'Иван не пришёл на работу. (Ivan ne prishol na rabotu.) — Iván no fue al trabajo. [он = masc. → пришёл, negación с не]',
      'Мы были в Москве прошлым летом. (My byli v Moskve proshylm letom.) — Estuvimos en Moscú el verano pasado. [мы = plural → были]',
    ],
    fills: [
      { s: 'Вчера она ___ (читать) книгу весь день.', opts: ['читал', 'читала', 'читало', 'читали'], a: 1, fb: '"Читала" — она = femenino singular → terminación -ла. Recuerda: la terminación depende del género del sujeto, no de la persona.' },
      { s: 'Они ___ (не быть) дома вчера.', opts: ['не был', 'не была', 'не было', 'не были'], a: 3, fb: '"Не были" — они = plural → terminación -ли. Negación: не + forma pasada.' },
      { s: 'Мой брат ___ (прийти) поздно.', opts: ['пришла', 'пришло', 'пришёл', 'пришли'], a: 2, fb: '"Пришёл" — брат = masculino → terminación -л. Глагол идти / прийти tiene formas irregulares en pasado.' },
      { s: 'Вчера я ___ (идти) в магазин пешком.', opts: ['шла/шёл', 'шло', 'шли', 'иду'], a: 0, fb: '"Шёл" (masc.) / "шла" (fem.) — pasado de идти. La respuesta depende de tu género. Идти tiene pasado irregular: шёл/шла/шло/шли.' },
      { s: 'Дети ___ (играть) во дворе весь день.', opts: ['играл', 'играла', 'играло', 'играли'], a: 3, fb: '"Играли" — дети (niños) = plural → terminación -ли. Глагол правильный: играть → играл/играла/играло/играли.' },
    ],
    transforms: [
      { prompt: 'Reescribe en pasado (она):',s: 'Она читает книгу. (вчера)', opts: ['Вчера она читала книгу.', 'Вчера она читал книгу.', 'Вчера она читало книгу.', 'Вчера она читали книгу.'], a: 0, fb: '"Читала" — она = femenino → -ла. Presente читает → Pasado читала. Añade вчера (vchera — ayer).' },
      { prompt: 'Convierte a negativo (он):',s: 'Он пришёл на встречу.', opts: ['Он не пришёл на встречу.', 'Он не приходил на встречу.', 'Он не приходит на встречу.', 'Он был не пришёл на встречу.'], a: 0, fb: 'Negativo pasado: не + forma pasada. "Он не пришёл" — simplemente añade не antes del verbo en pasado.' },
      { prompt: 'Cambia a plural (они):',s: 'Она была в театре.', opts: ['Они были в театре.', 'Они была в театре.', 'Они был в театре.', 'Они будут в театре.'], a: 0, fb: '"Были" — они = plural → terminación -ли. была (fem. sg.) → были (plural).' },
    ],
    errors: [
      { s: 'Она вчера читал книгу.', q: '¿Qué está mal?', opts: ['"читал" → "читала" (она es femenino)', '"вчера" debe ir al final', '"книгу" debe ser "книга"', 'No hay error'], a: 0, fb: '"Она" es femenino → el pasado debe ser "читала" (-ла). "Читал" es masculino. Error muy común: olvidar cambiar la terminación según el género del sujeto.' },
      { s: 'Они не был дома.', q: '¿Cuál es el error?', opts: ['"был" → "были" (они es plural)', '"не" debe ir después del verbo', '"дома" → "домой"', 'No hay error'], a: 0, fb: '"Они" = plural → "были" (-ли). "Был" es masculino singular. Con они, мы, вы: siempre -ли.' },
    ],
    production: 'Escribe 4 oraciones sobre lo que hiciste ayer. Recuerda cambiar la terminación según tu género: -л (si eres hombre) / -ла (si eres mujer). Empieza con: "Вчера я..." (Vchera ya... — Ayer yo...)',
  },
  {
    id: 'budushchee', title: 'Будущее время (Futuro)', icon: '🔮',
    rule: 'Futuro IMPERFECTIVO (acciones repetidas/proceso): быть (conjugado) + infinitivo. Буду / будешь / будет / будем / будете / будут + infinitivo. Futuro PERFECTIVO (acción completa): conjugar el verbo perfectivo en tiempo presente. Para A2: enfócate en el imperfectivo: быть + infinitivo. Es el más accesible y directo.',
    tip: 'En A2 enfócate en el futuro imperfectivo: быть + infinитivo. Es directo: "Завтра я БУДУ РАБОТАТЬ (Zavtra ya budu rabotat — mañana voy a trabajar)". El aspecto perfectivo se profundiza en B1.',
    table: {
      headers: ['Persona', 'Futuro de быть', 'Ejemplo (trabajar)', 'Transliteración'],
      rows: [
        ['Я', 'буду', 'буду работать', 'budu rabotat'],
        ['Ты', 'будешь', 'будешь работать', 'budesh rabotat'],
        ['Он/Она', 'будет', 'будет работать', 'budet rabotat'],
        ['Мы', 'будем', 'будем работать', 'budem rabotat'],
        ['Вы', 'будете', 'будете работать', 'budete rabotat'],
        ['Они', 'будут', 'будут работать', 'budut rabotat'],
      ]
    },
    a1note: 'En A1 usabas el presente para hablar de acciones habituales. En A2, el futuro ruso es compuesto: быть + infinitivo. No hay cambio en el infinitivo — solo cambia la forma de быть. "Я буду учиться" (ya budu uchitsya — voy a estudiar).',
    examples: [
      'Завтра я буду готовить ужин. (Zavtra ya budu gotovit uzhin.) — Mañana voy a cocinar la cena.',
      'Они не будут работать в субботу. (Oni ne budut rabotat v subbotu.) — No van a trabajar el sábado.',
      'Ты будешь дома вечером? (Ty budesh doma vecherom?) — ¿Vas a estar en casa por la noche?',
    ],
    fills: [
      { s: 'Завтра я ___ (учиться) весь день.', opts: ['буду учиться', 'буду учился', 'будет учиться', 'был учиться'], a: 0, fb: '"Буду учиться" — я → буду + infinitivo (учиться). El infinitivo no cambia. "Буду учился" es incorrecto — mezcla futuro y pasado.' },
      { s: 'Она ___ (не работать) завтра.', opts: ['не будет работать', 'не буду работать', 'не работает', 'не будет работал'], a: 0, fb: '"Не будет работать" — она → будет + infinitivo. Negación: не + будет. El infinitivo va al final sin cambios.' },
      { s: 'Мы ___ (смотреть) фильм вечером.', opts: ['будем смотреть', 'будет смотреть', 'буду смотреть', 'смотрели'], a: 0, fb: '"Будем смотреть" — мы → будем + infinitivo. Recuerda: будем solo se usa con мы.' },
      { s: '___ (ты, читать) эту книгу на следующей неделе?', opts: ['Будешь читать', 'Буду читать', 'Будет читать', 'Будешь читал'], a: 0, fb: '"Будешь читать" — ты → будешь + infinitivo. Pregunta: ¿Vas a leer este libro la semana que viene?' },
      { s: 'Они ___ (жить) в Петербурге год.', opts: ['будут жить', 'будет жить', 'буду жить', 'жили'], a: 0, fb: '"Будут жить" — они → будут + infinitivo. Van a vivir en San Petersburgo un año.' },
    ],
    transforms: [
      { prompt: 'Convierte al futuro (я):',s: 'Я работаю каждый день. (завтра)', opts: ['Завтра я буду работать.', 'Завтра я работал.', 'Завтра я работает.', 'Завтра я будет работать.'], a: 0, fb: '"Буду работать" — я + будущее: буду + infinitivo. El presente "работаю" se reemplaza por "буду работать".' },
      { prompt: 'Haz negativo (она):',s: 'Она будет учиться в университете.', opts: ['Она не будет учиться в университете.', 'Она будет не учиться в университете.', 'Она не будет учился в университете.', 'Она не учится в университете.'], a: 0, fb: 'Negativo futuro: не перед будет. "Она НЕ БУДЕТ учиться." Siempre не + форма быть.' },
      { prompt: 'Formula la pregunta (вы):',s: 'Вы будете отдыхать летом. → ?', opts: ['Вы будете отдыхать летом?', 'Будете ли вы отдыхать летом?', 'Вы будете отдыхали летом?', 'Вы будет отдыхать летом?'], a: 0, fb: 'Pregunta: misma estructura, entonación ascendente o partícula ли. "Вы будете отдыхать летом?" es la más natural en A2.' },
    ],
    errors: [
      { s: 'Завтра она будет работала.', q: '¿Qué está mal?', opts: ['"работала" → "работать" (debe ser infinitivo)', '"будет" → "буду"', '"завтра" → "вчера"', 'No hay error'], a: 0, fb: 'El futuro requiere быть + INFINITIVO. "Работала" es la forma pasada femenina. Lo correcto: "она будет работать".' },
      { s: 'Они будем учиться русскому.', q: '¿Cuál es el error?', opts: ['"будем" → "будут" (они exige будут)', '"учиться" → "учился"', '"русскому" → "русский"', 'No hay error'], a: 0, fb: '"Они" → будут (не будем). Будем es solo para мы. Recuerda la conjugación: я-буду, ты-будешь, он/она-будет, мы-будем, вы-будете, они-будут.' },
    ],
    production: 'Escribe 4 frases sobre lo que vas a hacer el próximo mes usando буду/будешь/будет + infinitivo. Incluye al menos una negación (не буду...) y una pregunta.',
  },
  {
    id: 'glagoly_dvizheniya', title: 'Глаголы движения (Verbos de movimiento)', icon: '🚶',
    rule: 'Los verbos de movimiento rusos son PARES: ИДТИ (ir a pie, un solo trayecto directo) vs ХОДИТЬ (ir a pie, habitualmente o de ida y vuelta). ЕХАТЬ (ir en vehículo, un trayecto) vs ЕЗДИТЬ (ir en vehículo, habitualmente). Con prefijos: при- (llegada), у- (salida), в- (entrada), вы- (salida de lugar), по- (inicio del movimiento). Preposición de dirección: В/НА + acusativo. Preposición de lugar: В/НА + prepositivo.',
    tip: 'Regla práctica: ¿Una vez, dirección específica AHORA? → ИДТИ/ЕХАТЬ. ¿Habitualmente o de ida y vuelta? → ХОДИТЬ/ЕЗДИТЬ. Truco: "Я иду в магазин" (ya idu v magazin — voy AL supermercado AHORA, directo). "Я хожу в магазин каждый день" (ya khozhu v magazin kazhdyy den — habitualmente).',
    table: {
      headers: ['', 'Идти (pie, directo)', 'Ходить (pie, habit.)', 'Ехать (veh., directo)', 'Ездить (veh., habit.)'],
      rows: [
        ['Я', 'иду (idu)', 'хожу (khozhu)', 'еду (edu)', 'езжу (yezzhu)'],
        ['Ты', 'идёшь (idyosh)', 'ходишь (khodish)', 'едешь (edesh)', 'ездишь (yezdish)'],
        ['Он/Она', 'идёт (idyot)', 'ходит (khodit)', 'едет (edet)', 'ездит (yezdit)'],
        ['Мы', 'идём (idyom)', 'ходим (khodim)', 'едем (edem)', 'ездим (yezdim)'],
      ]
    },
    a1note: 'En A1 aprendiste los verbos en su forma básica. En A2, la distinción идти/ходить y ехать/ездить es esencial para sonar natural. Error común: usar идти para hábitos — "Я иду в школу каждый день" está mal; lo correcto es "Я хожу в школу каждый день".',
    examples: [
      'Сейчас я иду в библиотеку. (Seychas ya idu v biblioteku.) — Ahora voy a la biblioteca. [un trayecto directo → идти]',
      'Обычно я хожу на работу пешком. (Obychno ya khozhu na rabotu peshkom.) — Normalmente voy al trabajo a pie. [habitual → ходить]',
      'Они едут в Москву на поезде. (Oni edut v Moskvu na poyezde.) — Van a Moscú en tren ahora. [vehículo, directo → ехать]',
    ],
    fills: [
      { s: 'Сейчас Маша ___ в магазин (пешком, один раз).', opts: ['идёт', 'ходит', 'едет', 'ездит'], a: 0, fb: '"Идёт" — un trayecto directo a pie AHORA. Идти: я иду, ты идёшь, он/она идёт.' },
      { s: 'Каждое утро я ___ в спортзал (пешком, привычка).', opts: ['иду', 'хожу', 'еду', 'езжу'], a: 1, fb: '"Хожу" — hábito o acción repetida. "Каждое утро" (cada mañana) indica habitualidad → ходить. Я хожу.' },
      { s: 'Они ___ в Киев на автобусе (сейчас, один рейс).', opts: ['идут', 'ходят', 'едут', 'ездят'], a: 2, fb: '"Едут" — vehículo (автобус = autobús), trayecto directo ahora → ехать. Они едут.' },
      { s: 'Мой брат часто ___ в командировки (на самолёте, привычка).', opts: ['идёт', 'ходит', 'едет', 'ездит'], a: 3, fb: '"Ездит" — vehículo, habitualmente ("часто" — frecuentemente). Ездить para hábito en vehículo. Он ездит.' },
      { s: 'Куда ты ___? — Я ___ на почту. (ahora, a pie)', opts: ['идёшь / иду', 'ходишь / хожу', 'едешь / еду', 'ездишь / езжу'], a: 0, fb: '"Идёшь / иду" — pregunta + respuesta para trayecto directo a pie ahora mismo. Идти: ты идёшь, я иду.' },
    ],
    transforms: [
      { prompt: 'Cambia de "ahora" a "habitualmente":',s: 'Сейчас Анна идёт в парк.', opts: ['Анна часто ходит в парк.', 'Анна часто идёт в парк.', 'Анна часто едет в парк.', 'Анна часто шла в парк.'], a: 0, fb: 'Habitual → ходить. "Часто ходит" (khodit — habitualmente, 3a persona). Идти (directo ahora) → Ходить (habitual).' },
      { prompt: 'Cambia de "a pie" a "en coche":',s: 'Он идёт на работу.', opts: ['Он едет на работу.', 'Он ходит на работу.', 'Он ездит на работу.', 'Он едет в работу.'], a: 0, fb: '"Едет" — trayecto directo en vehículo (mismo contexto de "ahora, directo"). Идти (pie) → ехать (vehículo).' },
      { prompt: 'Pregunta de dónde viene (хотеть знать):',s: 'Он идёт. (¿Куда?) → ?', opts: ['Куда он идёт?', 'Откуда он идёт?', 'Куда он ходит?', 'Куда он шёл?'], a: 0, fb: '"Куда он идёт?" — preguntar dirección presente con идти. Куда (kuda — ¿adónde?) se usa con movimiento en progreso.' },
    ],
    errors: [
      { s: 'Я иду в кино каждую пятницу.', q: '¿Qué está mal?', opts: ['"иду" → "хожу" (hábito, каждую пятницу)', '"иду" → "еду" (vehículo)', '"кино" → "кинотеатр"', 'No hay error'], a: 0, fb: '"Каждую пятницу" indica hábito → ходить. "Я хожу в кино каждую пятницу." Идти es solo para un trayecto directo ahora.' },
      { s: 'Они ездят в аэропорт сейчас на такси.', q: '¿Cuál es el error?', opts: ['"ездят" → "едут" (ahora, un trayecto)', '"такси" → "машину"', '"сейчас" debe ir al final', 'No hay error'], a: 0, fb: '"Сейчас" indica acción en progreso, un trayecto directo → ехать. "Они едут в аэропорт сейчас." Ездить es para hábito o viajes repetidos.' },
    ],
    production: 'Escribe 4 frases describiendo cómo vas a diferentes lugares: 2 con hábito (ходить/ездить) y 2 describiendo adónde vas ahora mismo o fuiste ayer (идти/ехать en presente o pasado).',
  },
  {
    id: 'datelny', title: 'Дательный падеж (Caso Dativo)', icon: '🎁',
    rule: 'El dativo (кому? чему? — ¿a quién? ¿para qué?) se usa: (1) Con el receptor de la acción: "Я дал БРАТУ книгу (ya dal bratu knigu — le di el libro al hermano)". (2) Expresar edad: "Мне ДВАДЦАТЬ лет (mne dvadtsat let — tengo 20 años)". (3) Gustos: "Мне нравится (mne nravitsya — me gusta)". (4) Con preposiciones: по, к, благодаря. Terminaciones: Masc./Neut. → -у/-ю; Fem. → -е/-и; Plural → -ам/-ям.',
    tip: 'El dativo es esencial para A2 porque "нравиться" (gustar) lo usa: Мне нравится музыка (mne nravitsya muzyka — me gusta la música). El que GUSTA va en nominativo, el que SIENTE va en DATIVO. Exactamente como el español: "me gusta" (a mí = dativo).',
    table: {
      headers: ['Género/Número', 'Nominativo', 'Dativo', 'Ejemplo'],
      rows: [
        ['Masculino -', 'брат (brat)', 'брату (bratu)', 'Я дал брату книгу.'],
        ['Masculino -й/-ь', 'Андрей (Andrey)', 'Андрею (Andreyu)', 'Я позвоню Андрею.'],
        ['Femenino -а', 'сестра (sestra)', 'сестре (sestre)', 'Я помог сестре.'],
        ['Femenino -ь', 'дочь (doch)', 'дочери (docheri)', 'Я купил дочери подарок.'],
        ['Pronombres', 'я / ты / он / она', 'мне / тебе / ему / ей', 'Мне нравится. Тебе тоже?'],
        ['Plural', 'друзья (druzya)', 'друзьям (druzyam)', 'Я написал друзьям.'],
      ]
    },
    a1note: 'En A1 usabas el nominativo para sujetos y el acusativo básico para objetos directos. En A2, el dativo amplía tu expresividad: puedes decir "me gusta", "tengo X años", "le doy algo a alguien". Estas tres funciones son las más frecuentes en el habla cotidiana.',
    examples: [
      'Мне нравится этот фильм. (Mne nravitsya etot film.) — Me gusta esta película. [мне = dativo de я]',
      'Сколько тебе лет? — Мне двадцать пять лет. (Skolko tebe let? — Mne dvadtsat pyat let.) — ¿Cuántos años tienes? — Tengo 25 años.',
      'Она дала другу подарок на день рождения. (Ona dala drugu podarok na den rozhdeniya.) — Le dio un regalo a su amigo en su cumpleaños.',
    ],
    fills: [
      { s: '___ (я) нравится русская музыка.', opts: ['Мне', 'Я', 'Меня', 'Мой'], a: 0, fb: '"Мне" — dativo de я. Gustar: Мне нравится... El sujeto gramatical es "музыка" (nominativo), el que siente va en dativo.' },
      { s: 'Сколько ___ (ты) лет?', opts: ['тебе', 'ты', 'тебя', 'тебя'], a: 0, fb: '"Тебе" — dativo de ты. Para preguntar la edad: сколько + dativo + лет. "Сколько тебе лет?"' },
      { s: 'Он дал ___ (сестра) цветы.', opts: ['сестре', 'сестра', 'сестру', 'сестры'], a: 0, fb: '"Сестре" — dativo de сестра (fem. -а → -е). Dar algo A alguien: давать + dativo de persona + acusativo de cosa.' },
      { s: 'Я позвоню ___ (друзья) вечером.', opts: ['друзьям', 'друзья', 'друзей', 'другу'], a: 0, fb: '"Друзьям" — dativo plural (-am). Llamar A alguien: звонить + dativo.' },
      { s: 'По ___ (дорога) шли дети. (A lo largo del camino)', opts: ['дороге', 'дорога', 'дороги', 'дорогу'], a: 0, fb: '"Дороге" — dativo con preposición "по" (по + dativo = a lo largo de). По дороге (po doroge — por/a lo largo del camino).' },
    ],
    transforms: [
      { prompt: 'Expresa "me gusta" con нравиться:',s: 'кофе (café — neutro)', opts: ['Мне нравится кофе.', 'Мне нравятся кофе.', 'Я нравлюсь кофе.', 'Кофе нравится мне.'], a: 0, fb: '"Мне нравится кофе." — Кофе es singular (aunque neutro) → нравится (sg.). El que gusta = nominativo кофе. El que siente = дательный мне.' },
      { prompt: 'Expresa la edad:',s: 'Антон — 30 лет', opts: ['Антону тридцать лет.', 'Антон тридцать лет.', 'У Антона тридцать лет.', 'Антону есть тридцать лет.'], a: 0, fb: '"Антону тридцать лет." — Антон → Антону (dativo masc.: брат → брату, Антон → Антону). Edad: dativo + número + лет.' },
      { prompt: 'Expresa "le compré":',s: 'Я купил подарок. (para мама)', opts: ['Я купил маме подарок.', 'Я купил мама подарок.', 'Я купил маму подарок.', 'Я купил для маме подарок.'], a: 0, fb: '"Маме" — dativo de мама (fem. -а → -е). Dar/comprar para alguien: глагол + dativo + что (qué).' },
    ],
    errors: [
      { s: 'Мне нравятся этот фильм.', q: '¿Qué está mal?', opts: ['"нравятся" → "нравится" (фильм es singular)', '"Мне" → "Я"', '"фильм" debe ir en dativo', 'No hay error'], a: 0, fb: '"Фильм" es singular → нравится (singular). "Нравятся" es para plural: "Мне нравятся фильмы (películas, plural)". El verbo concuerda con lo que gusta, no con quien gusta.' },
      { s: 'Сколько ты лет?', q: '¿Cuál es el error?', opts: ['"ты" → "тебе" (dativo para edad)', '"сколько" → "какой"', '"лет" → "год"', 'No hay error'], a: 0, fb: 'La edad usa el DATIVO: "Сколько тебе лет?" (Mne = dativo de я, тебе = dativo de ты). "Ты" es nominativo y no se usa para expresar edad.' },
    ],
    production: 'Escribe 4 oraciones: 2 usando "нравится/нравятся" (me gusta/gustan) con diferentes cosas, y 2 dándole algo a alguien o indicando la edad de una persona.',
  },
  {
    id: 'vozvratnye', title: 'Возвратные глаголы (-ся/-сь)', icon: '🔄',
    rule: 'Los verbos reflexivos terminan en -ся (después de consonante) o -сь (después de vocal). Usos: (1) Verdaderamente reflexivos: одеваться (odevatʹsya — vestirse), умываться (umyvatʹsya — lavarse la cara). (2) Recíproco: встречаться (vstrechatʹsya — encontrarse/reunirse), познакомиться (poznakomitsya — conocerse). (3) Pasivo: Магазин закрывается в 8 (Magazin zakryvayetsya v 8 — la tienda se cierra a las 8). (4) Verbo con nuevo significado: учить (enseñar) → учиться (estudiar).',
    tip: 'Conjugación: es igual al verbo sin -ся/-сь, solo añades -ся (después de consonante) o -сь (después de vocal de la desinencia). Я одеваюСЬ (vocal) / Он одеваетСЯ (consonante). El sufijo SIEMPRE va al final, después de toda la desinencia.',
    table: {
      headers: ['Persona', 'одеваться — vestirse', 'учиться — estudiar', 'встречаться — encontrarse'],
      rows: [
        ['Я', 'одеваюсь (odevaÿus)', 'учусь (uchus)', 'встречаюсь (vstrechaÿus)'],
        ['Ты', 'одеваешься (odevaeshsya)', 'учишься (uchishsya)', 'встречаешься (vstrechaeshsya)'],
        ['Он/Она', 'одевается (odevaetsya)', 'учится (uchitsya)', 'встречается (vstrechaetsya)'],
        ['Мы', 'одеваемся (odevaems ya)', 'учимся (uchimsya)', 'встречаемся (vstrechaems ya)'],
        ['Вы', 'одеваетесь (odevaetes)', 'учитесь (uchites)', 'встречаетесь (vstrechaetes)'],
        ['Они', 'одеваются (odevaûtsya)', 'учатся (uchatsya)', 'встречаются (vstrechaÿutsya)'],
      ]
    },
    a1note: 'En A1 usabas verbos sin -ся para acciones básicas. En A2, los verbos reflexivos amplían mucho tu repertorio: la rutina matutina (умываться, одеваться, бриться), la vida social (познакомиться, встречаться), y el estudio (учиться, заниматься).',
    examples: [
      'Каждое утро я умываюсь и одеваюсь. (Kazhd oye utro ya umyvaÿus i odevaÿus.) — Cada mañana me lavo la cara y me visto.',
      'Магазин закрывается в восемь вечера. (Magazin zakryvayetsya v vosem vechera.) — La tienda se cierra a las 8 de la tarde. [uso pasivo]',
      'Мы познакомились на вечеринке. (My poznakomiïs na vecherinke.) — Nos conocimos en una fiesta. [recíproco]',
    ],
    fills: [
      { s: 'Каждое утро я ___ (умываться) в семь часов.', opts: ['умываюсь', 'умываешься', 'умывается', 'умываются'], a: 0, fb: '"Умываюсь" — я + reflexivo → -юсь (vocal ante -ся → -сь). Умываться: я умываюсь, ты умываешься, он умывается.' },
      { s: 'Дети ___ (одеваться) медленно утром.', opts: ['одеваюсь', 'одеваешься', 'одевается', 'одеваются'], a: 3, fb: '"Одеваются" — они (дети = plural) → -ются. Recuerda: -ся después de consonante, -сь después de vocal.' },
      { s: 'Банк ___ (закрываться) в шесть.', opts: ['закрываюсь', 'закрываешься', 'закрывается', 'закрываются'], a: 2, fb: '"Закрывается" — он (банк = masculino) → -ется. Uso pasivo del reflexivo: la tienda/el banco "se cierra" = закрывается.' },
      { s: 'Мы ___ (встречаться) каждую неделю.', opts: ['встречаюсь', 'встречаешься', 'встречается', 'встречаемся'], a: 3, fb: '"Встречаемся" — мы → -емся. Uso recíproco: nos vemos / nos encontramos.' },
      { s: 'Ты ___ (учиться) в университете?', opts: ['учусь', 'учишься', 'учится', 'учимся'], a: 1, fb: '"Учишься" — ты → -ешься. Учиться (estudiar/aprender) ≠ учить (enseñar). Contexto: ¿estudias en la universidad?' },
    ],
    transforms: [
      { prompt: 'Convierte al reflexivo (-ся) y cambia el significado:',s: 'учить (enseñar) → yo estudio', opts: ['Я учусь.', 'Я учу.', 'Я учился.', 'Я учусь.ся'], a: 0, fb: '"Я учусь" — учить (enseñar) → учиться (estudiar). Reflexivo cambia el significado. Я учусь = yo estudio/aprendo.' },
      { prompt: 'Expresa acción matutina con reflexivo:',s: 'bañarse (duchatsya) → él todos los días', opts: ['Он каждый день душится.', 'Он каждый день душась.', 'Он каждый день душает.', 'Он каждый день душивается.'], a: 0, fb: '"Душится" — он → -ится. Душиться (duchitsya) = ducharse. La rutina matutina usa abundantes reflexivos.' },
      { prompt: 'Haz negativo y pon en pasado (она):',s: 'Она встречается с подругой. → ayer no', opts: ['Вчера она не встречалась с подругой.', 'Вчера она не встречался с подругой.', 'Вчера она не встречаться с подругой.', 'Вчера она не встречалась с подругой.ся'], a: 0, fb: '"Не встречалась" — ella (fem.) + pasado reflexivo. Pasado: встречаться → встречал(а)сь. Femenino: -лась. No se añade -ся/-сь extra.' },
    ],
    errors: [
      { s: 'Я одевается каждое утро.', q: '¿Qué está mal?', opts: ['"одевается" → "одеваюсь" (я exige -юсь)', '"каждое" → "каждый"', '"утро" debe ir primero', 'No hay error'], a: 0, fb: '"Одевается" es 3a persona (он/она). Con я: "одеваюсь" (-юсь después de vocal). Я одеваюсь каждое утро.' },
      { s: 'Мы познакомился на конференции.', q: '¿Cuál es el error?', opts: ['"познакомился" → "познакомились" (мы exige -лись)', '"конференции" → "конференцию"', '"на" → "в"', 'No hay error'], a: 0, fb: '"Познакомились" — мы = plural → pasado reflexivo plural: -лись. "Познакомился" es masculino singular.' },
    ],
    production: 'Describe tu rutina matutina usando 5-6 verbos reflexivos en orden: просыпаться (despertarse), вставать (levantarse), умываться (lavarse), одеваться (vestirse), завтракать (no reflexivo — desayunar), выходить (salir).',
  },
];

export default function GramaticaRusoA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];
  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const total = t.fills.length + t.transforms.length + t.errors.length;
  const correct =
    t.fills.filter((q, i) => fillAns[i] === q.a).length +
    t.transforms.filter((q, i) => transAns[i] === q.a).length +
    t.errors.filter((q, i) => errAns[i] === q.a).length;

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 Грамматика</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Грамматика · Ruso A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas con tabla de conjugación, ejemplos reales con transliteración, 5 fill-in-blank, 3 transformaciones, 2 detección de errores y producción libre.
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(topicIdx === i ? { background: C, borderColor: C } : {}) }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 16, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1rem' }}>{t.icon} {t.title}</div>
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: `${C}0d`, fontSize: '0.82rem', color: C, borderLeft: `3px solid ${C}`, marginBottom: '0.85rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: 380 }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.45rem 0.7rem', background: `${C}18`, border: '1px solid var(--line-soft)', textAlign: 'left', fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Ejemplos en contexto real</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Completa las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 80, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correcto. ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transforma las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Correcta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Detecta el error</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Encuentra el error</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correcto. ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Producción libre</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Completa todos los ejercicios de arriba para desbloquear la producción libre.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Escribe aquí en ruso (cirílico o transliteración)..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} palabras
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 10) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 10}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 10 ? 1 : 0.5 }}>
                  Listo →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tu producción</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Editar</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Ver resultado del tema →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} ejercicios correctos
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? '¡Отлично (Otlichno — Excelente)! Dominas este tema A2.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Хорошо (Khorosho — Bien). Repasa los ejercicios marcados con ✗.'
                : 'Estudia la explicación arriba y vuelve a intentarlo. ¡Не сдавайся! (No te rindas)'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Intentar de nuevo</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Siguiente tema →
                </button>
              )}
              <Link href="/practica/ruso/a2" className="btn btn-ghost btn-sm">Volver a A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
