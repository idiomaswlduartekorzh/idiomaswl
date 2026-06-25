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
  b1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'vid_glagola', title: 'Вид глагола (Vid glagola — Aspecto verbal)', icon: '⚡',
    rule: 'El ruso tiene dos aspectos verbales: НЕСОВЕРШЕННЫЙ (imperfectivo) — proceso en curso, acciones repetidas, sin resultado específico; y СОВЕРШЕННЫЙ (perfectivo) — acción completada, resultado específico, acción puntual. Imperfectivo responde: ¿Qué hacías? / ¿Qué hacías habitualmente? Perfectivo responde: ¿Qué hiciste? (con resultado). Los pares de aspecto suelen diferir por prefijo (читать → прочитать) o sufijo (писать → написать, давать → дать).',
    tip: 'Prueba simple: ¿La acción terminó con un resultado claro? → СОВЕРШЕННЫЙ. ¿Es un proceso o hábito? → НЕСОВЕРШЕННЫЙ. "Я читал книгу" (estaba leyendo / leía) vs "Я прочитал книгу" (terminé de leer el libro). El perfectivo siempre implica que la acción llegó a su fin.',
    table: {
      headers: ['Imperfectivo (NSV)', 'Perfectivo (SV)', 'Significado NSV', 'Significado SV'],
      rows: [
        ['читать (chitat)', 'прочитать (prochitat)', 'leer (proceso)', 'terminar de leer'],
        ['писать (pisat)', 'написать (napisat)', 'escribir (proceso)', 'escribir (completado)'],
        ['делать (delat)', 'сделать (sdelat)', 'hacer (proceso)', 'hacer (completado)'],
        ['говорить (govorit)', 'сказать (skazat)', 'hablar (proceso)', 'decir (una vez)'],
        ['давать (davat)', 'дать (dat)', 'dar (habitual)', 'dar (una vez)'],
      ]
    },
    b1note: 'En A2 usabas el pasado sin distinguir aspectos. En B1 esta distinción es ESENCIAL: "Вчера я читал (NSV) газету, но не прочитал (SV) её — мне помешали" (Ayer estaba leyendo el periódico pero no lo terminé — me interrumpieron). NSV + SV en la misma oración para contraste es nivel B1.',
    examples: [
      'Я читал (NSV) книгу два часа. (Ya chital knigu dva chasa.) — Leía el libro dos horas. [proceso, duración]',
      'Я прочитал (SV) книгу за два часа. (Ya prochital knigu za dva chasa.) — Leí el libro en dos horas. [completado, con resultado]',
      'Каждый день она писала (NSV) в дневнике. (Kazhdyy den ona pisala v dnevnike.) — Cada día escribía en su diario. [habitual → NSV]',
    ],
    fills: [
      { s: 'Я ___ (читать/прочитать) книгу каждый день.', opts: ['читал', 'прочитал', 'читаю', 'прочитаю'], a: 2, fb: '"Читаю" — каждый день indica hábito/rutina → несовершенный вид. En presente imperfectivo: я читаю.' },
      { s: 'Наконец она ___ (писать/написать) отчёт.', opts: ['писала', 'написала', 'пишет', 'напишет'], a: 1, fb: '"Написала" — "наконец" (finalmente) implica resultado completado → совершенный вид. Ella finalmente terminó de escribir el informe.' },
      { s: 'Пока я ___ (готовить/приготовить) ужин, он смотрел телевизор.', opts: ['готовил', 'приготовил', 'готовит', 'приготовит'], a: 0, fb: '"Готовил" — пока (mientras) indica proceso paralelo → несовершенный. "Mientras yo cocinaba (proceso), él veía televisión."' },
      { s: 'В детстве мы часто ___ (играть/сыграть) в футбол.', opts: ['играли', 'сыграли', 'играем', 'сыграем'], a: 0, fb: '"Играли" — часто (frecuentemente) + детство (infancia) indica hábito pasado → несовершенный вид.' },
      { s: 'Вчера он ___ (делать/сделать) домашнее задание за час.', opts: ['делал', 'сделал', 'делает', 'сделает'], a: 1, fb: '"Сделал" — "за час" (en una hora) implica que lo terminó en ese tiempo → совершенный вид. Результат достигнут.' },
    ],
    transforms: [
      { prompt: 'Cambia a perfectivo (resultado completado):',s: 'Она писала письмо весь вечер. (pero lo terminó)', opts: ['Она написала письмо за весь вечер.', 'Она написала письмо.', 'Она пишет письмо вечером.', 'Она будет писать письмо.'], a: 1, fb: '"Написала" — совершенный вид indica que terminó la carta. El NSV "писала" describe el proceso; el SV "написала" destaca el resultado completado.' },
      { prompt: 'Cambia al proceso continuo pasado (NSV):',s: 'Мы прочитали все документы. → (acción en progreso, без результата)', opts: ['Мы читали документы.', 'Мы прочли документы.', 'Мы будем читать документы.', 'Мы читаем документы.'], a: 0, fb: '"Читали" — NSV en pasado describe el proceso de leer, sin énfasis en si lo terminaron. NSV + duración describe proceso.' },
      { prompt: 'Añade контекст completado (SV, responde: ¿Qué logró hacer?):',s: 'Он долго учил русский язык. → (y eventually speaks it)', opts: ['Он выучил русский язык.', 'Он учил русский язык хорошо.', 'Он учится русскому языку.', 'Он будет учить русский.'], a: 0, fb: '"Выучил" — совершенный вид de учить. Prefijo вы- crea el perfectivo con significado de dominar/aprender completamente.' },
    ],
    errors: [
      { s: 'Вчера я читал книгу и закончил её.', q: '¿Qué está gramaticalmente inconsistente?', opts: ['"Читал" debería ser "прочитал" si se terminó (совершенный)', '"Закончил" es incorrecto', '"Вчера" debe ir al final', 'No hay error, ambos son válidos'], a: 3, fb: '¡No hay error! En ruso se puede decir "читал (proceso) и закончил (terminó)". El NSV describe la actividad y SV describe el resultado. Ambos aspectos en el mismo contexto son posibles y correctos.' },
      { s: 'Каждый день он написал отчёт ровно в 9.', q: '¿Qué está mal?', opts: ['"Написал" (SV) → "писал" (NSV) — каждый день indica hábito', '"Каждый день" no puede ir al inicio', '"В 9" debe ser "в 9 часов"', 'No hay error'], a: 0, fb: '"Написал" es perfectivo — indica un resultado único. Con "каждый день" (cada día) se describe un hábito → NSV: "Каждый день он писал отчёт ровно в 9." El perfectivo no puede expresar hábito.' },
    ],
    production: 'Escribe 4 oraciones: 2 usando NSV (процесс/привычка) y 2 usando SV (результат completado). Usa las parejas: читать/прочитать, писать/написать, делать/сделать, учить/выучить. Ej: "Каждый день я ___ (NSV). Вчера я ___ (SV)."',
  },
  {
    id: 'tvoritelny', title: 'Творительный падеж (Tvoritelny padezh — Instrumental)', icon: '🔧',
    rule: 'El caso instrumental (Творительный) responde a: С КЕМ? (¿con quién?) y ЧЕМ? (¿con qué?). Usos principales: (1) CON alguien/algo: "с другом (s drugom — con un amigo)". (2) Profesión/rol con быть: "быть врачом (byt vrachom — ser médico)". (3) Instrumento o medio: "писать ручкой (pisat ruchkoy — escribir con bolígrafo)". (4) Modo de transporte: "ехать автобусом (yekhat avtobusom — ir en autobús)". Terminaciones: Masc./Neut.: -ом/-ем; Fem.: -ой/-ей/-ью; Pl.: -ами/-ями.',
    tip: 'El instrumental de profesión con быть: "Кем он работает? — Он работает учителем (uchitelem — de maestro)." Esta estructura es MUY común en ruso. Compara: "Он — учитель" (identificación simple) vs "Он работает учителем" (trabaja como/de maestro — más específico). Con instrumental describes el rol.',
    table: {
      headers: ['Género/Caso', 'Nominativo', 'Instrumental', 'Ejemplo'],
      rows: [
        ['Masc. (consonante)', 'друг (drug)', 'другом (drugom)', 'с другом (con un amigo)'],
        ['Masc. (-й)', 'гений (geniy)', 'гением (geniyem)', 'быть гением (ser un genio)'],
        ['Fem. (-а)', 'сестра (sestra)', 'сестрой (sestroy)', 'с сестрой (con la hermana)'],
        ['Fem. (-ь)', 'дочь (doch)', 'дочерью (docheryu)', 'с дочерью (con la hija)'],
        ['Neutro (-о)', 'молоко (moloko)', 'молоком (molokom)', 'с молоком (con leche)'],
        ['Plural', 'друзья (druzya)', 'друзьями (druzyami)', 'с друзьями (con los amigos)'],
      ]
    },
    b1note: 'En A2 viste el dativo (кому?). El instrumental es igual de frecuente pero distinto. Error clásico: mezclar "с" + dativo en lugar de "с" + instrumental. Siempre: "с другом" NO "с другу" — el dativo NUNCA va con "с" en este sentido. Instrumental = -ом/-ой/-ью.',
    examples: [
      'Вчера я встретился с коллегой (NSV). (Vchera ya vstretilsya s kollegoy.) — Ayer me reuní con una colega. [с + instrumental fem.]',
      'Он мечтает стать известным журналистом. (On mechtayet stat izvestnym zhurnalistom.) — Sueña con ser un periodista famoso. [стать + instrumental]',
      'Мы едем на работу автобусом. (My yedem na rabotu avtobusom.) — Vamos al trabajo en autobús. [transporte — instrumental sin preposición]',
    ],
    fills: [
      { s: 'Она разговаривает с ___ (директор) каждую неделю.', opts: ['директора', 'директором', 'директору', 'директор'], a: 1, fb: '"Директором" — с + instrumental masc. (-ом). Директор → директором. "С кем? — с директором (con el director)."' },
      { s: 'В будущем я хочу стать ___ (врач).', opts: ['врача', 'врачу', 'врачом', 'врач'], a: 2, fb: '"Врачом" — стать (llegar a ser) требует instrumental. Врач → врачом. "Стать + кем?" → instrumental.' },
      { s: 'Они пришли на вечеринку с ___ (подруга).', opts: ['подруги', 'подруге', 'подруга', 'подругой'], a: 3, fb: '"Подругой" — с + instrumental fem. (-ой). Подруга → подругой. Con amiga → с подругой.' },
      { s: 'Суп лучше есть ___ (ложка), а не вилкой.', opts: ['ложки', 'ложке', 'ложкой', 'ложку'], a: 2, fb: '"Ложкой" — instrumento sin preposición en instrumental. Ложка (cuchara) → ложкой (con cuchara). "Чем ешь?" → instrumental.' },
      { s: 'Она работает ___ (менеджер) в банке.', opts: ['менеджера', 'менеджеру', 'менеджером', 'менеджер'], a: 2, fb: '"Менеджером" — работать + кем? → instrumental. Менеджер → менеджером. Profesión en instrumental con работать/быть.' },
    ],
    transforms: [
      { prompt: 'Expresa profesión con instrumental (стать):',s: 'Он хочет быть программистом в будущем.', opts: ['Он хочет стать программистом в будущем.', 'Он хочет стать программиста в будущем.', 'Он хочет быть программист в будущем.', 'Он станет программист.'], a: 0, fb: '"Стать программистом" — стать (llegar a ser) pide instrumental, igual que быть. Программист → программистом (-ом).' },
      { prompt: 'Expresa compañía con "с" + instrumental:',s: 'Мы поехали в отпуск. (con familia)', opts: ['Мы поехали в отпуск с семьёй.', 'Мы поехали в отпуск с семьи.', 'Мы поехали в отпуск с семье.', 'Мы поехали в отпуск с семью.'], a: 0, fb: '"С семьёй" — семья (familia) → семьёй (instrumental fem. -ей para terminaciones en -ья). Con + quién = с + instrumental.' },
      { prompt: 'Expresa modo de transporte (sin preposición):',s: 'Она ездит на работу. (en metro)', opts: ['Она ездит на работу метро.', 'Она ездит на работу метром.', 'Она ездит на работу на метро.', 'Она ездит на работу в метро.'], a: 1, fb: '"Метром" — transporte en instrumental sin preposición: метро → метром. Aunque en el habla coloquial "на метро" también se usa, el instrumental es gramaticalmente más formal y correcto.' },
    ],
    errors: [
      { s: 'Он работает учитель в школе.', q: '¿Qué está mal?', opts: ['"Учитель" → "учителем" — trabajar como... requiere instrumental', '"В школе" → "в школу"', '"Работает" → "работал"', 'No hay error'], a: 0, fb: 'Работать + КЕМ? → instrumental. "Учитель → учителем". "Он работает учителем" (trabaja de maestro). La profesión con работать/быть siempre va en instrumental.' },
      { s: 'Я встретилась с другу вчера.', q: '¿Cuál es el error?', opts: ['"Другу" → "другом" — "с" pide instrumental, no dativo', '"Встретилась" debe ser "встретил"', '"Вчера" debe ir al principio', 'No hay error'], a: 0, fb: '"Другом" — "с" + instrumental (НЕ dativo). Друг → другом. "Другу" es dativo (я дал другу — le di al amigo), pero "с другом" = con el amigo. С + инструментальный падеж.' },
    ],
    production: 'Escribe 4 oraciones usando el instrumental: 1 con profesión (работать/стать + кем?), 1 con compañía (с + кем?), 1 con instrumento (писать/есть + чем?), 1 con transporte (ехать + чем?).',
  },
  {
    id: 'roditelny_mn', title: 'Родительный мн.ч. (Roditelny mn.ch. — Genitivo plural)', icon: '🔢',
    rule: 'El genitivo plural es el caso más difícil del ruso. Se usa con: (1) números 5+ и много/несколько: "пять книг (pyat knig — cinco libros)". (2) Negación: "нет книг (net knig — no hay libros)". (3) Cantidad: "много студентов (mnogo studentov — muchos estudiantes)". Reglas: Masc. conson. → -ов (студентов); Masc. -й → -ев (музеев); Fem. -а/-я → quitar terminación (книга → книг, неделя → недель); Neutro -о/-е → quitar (окно → окон); Irregulares: человек→людей, ребёнок→детей, друг→друзей.',
    tip: 'Con números: 1 = nominativo (один студент), 2-4 = genitivo singular (два студента), 5+ = genitivo plural (пять студентов). "Сколько студентов?" всегда требует родительного падежа множественного числа. Irregulares importantes: человек → людей (люди); ребёнок → детей (дети); год → лет (с числительными 5+).',
    table: {
      headers: ['Nominativo sg.', 'Gen. plural', 'Ejemplo con 5', 'Transliteración'],
      rows: [
        ['студент (student)', 'студентов (studentov)', 'пять студентов', 'pyat studentov'],
        ['музей (muzey)', 'музеев (muzeyev)', 'пять музеев', 'pyat muzeyev'],
        ['книга (kniga)', 'книг (knig)', 'пять книг', 'pyat knig'],
        ['неделя (nedelya)', 'недель (nedel)', 'пять недель', 'pyat nedel'],
        ['окно (okno)', 'окон (okon)', 'пять окон', 'pyat okon'],
        ['деньги (денег)', 'денег (deneg)', 'нет денег', 'net deneg'],
      ]
    },
    b1note: 'En A2 trabajaste el dativo e instrumental singulares. El genitivo plural es nuevo en B1 y aparece constantemente con números, preguntas con "сколько" y negación con "нет". Memoriza estos irregulares: человек→людей, ребёнок→детей, друг→друзей, год→лет.',
    examples: [
      'У меня нет денег сегодня. (U menya net deneg segodnya.) — Hoy no tengo dinero. [нет + roditelny pl.]',
      'В классе двадцать пять студентов. (V klasse dvadtsat pyat studentov.) — En la clase hay veinticinco estudiantes. [25 + roditelny pl.]',
      'В этом городе много интересных музеев. (V etom gorode mnogo interesnykh muzeyev.) — En esta ciudad hay muchos museos interesantes. [много + roditelny pl.]',
    ],
    fills: [
      { s: 'У меня нет ___ (деньги) на это.', opts: ['деньги', 'деньгам', 'денег', 'деньгах'], a: 2, fb: '"Денег" — нет + родительный падеж. Деньги (pl.) → денег (gen. pl. irregular). "У меня нет денег" = No tengo dinero.' },
      { s: 'В городе живёт много ___ (человек).', opts: ['человек', 'людей', 'людям', 'человеков'], a: 1, fb: '"Людей" — roditelny plural de человек. Irregular: человек → люди → людей. "Много людей" = mucha gente.' },
      { s: 'Мне нужно пять ___ (минута) для этого.', opts: ['минуты', 'минутам', 'минут', 'минутах'], a: 2, fb: '"Минут" — 5 + roditelny plural. Минута (fem. -а) → минут (gen. pl.: quitar -а). Пять минут = cinco minutos.' },
      { s: 'В классе нет ___ (окно), только дверь.', opts: ['окна', 'окну', 'окон', 'оконах'], a: 2, fb: '"Окон" — нет + roditelny pl. Окно (neutro -о) → окон (gen. pl. con inserción de -о-). Нет окон = no hay ventanas.' },
      { s: 'Сколько ___ (друг) у тебя?', opts: ['другов', 'друзей', 'другам', 'друга'], a: 1, fb: '"Друзей" — родительный мн.ч. de друг. Irregular con чередование г→з: друг → друзья → друзей. "Сколько друзей?" = ¿Cuántos amigos tienes?' },
    ],
    transforms: [
      { prompt: 'Expresa "no hay" con нет + roditelny pl.:',s: 'Здесь есть студенты. → (negación)', opts: ['Здесь нет студентов.', 'Здесь нет студенты.', 'Здесь не студенты.', 'Здесь нет студента.'], a: 0, fb: '"Студентов" — нет + родительный мн.ч. Студент → студентов (-ов). Здесь нет студентов = aquí no hay estudiantes.' },
      { prompt: 'Usa "много" con roditelny plural:',s: 'В библиотеке книги. → (muchos)', opts: ['В библиотеке много книг.', 'В библиотеке много книги.', 'В библиотеке много книгам.', 'В библиотеке много книгах.'], a: 0, fb: '"Книг" — много + родительный мн.ч. Книга (fem. -а) → книг (gen. pl.: quitar -а). Много книг = muchos libros.' },
      { prompt: 'Cuenta con número 5 + roditelny plural:',s: 'В комнате стул (5 штук).', opts: ['В комнате пять стульев.', 'В комнате пять стулья.', 'В комнате пять стулам.', 'В комнате пять стулов.'], a: 0, fb: '"Стульев" — пять + roditelny pl. Стул (masc. -л) → стулья → стульев (gen. pl. с чередованием). Пять стульев = cinco sillas.' },
    ],
    errors: [
      { s: 'У меня нет время на это.', q: '¿Qué está mal?', opts: ['"Время" → "времени" — нет requiere roditelny (sg. acá)', '"Нет" → "не"', '"На это" → "на этого"', 'No hay error'], a: 0, fb: '"Времени" — нет + родительный падеж. Время (neutro irregulares) → времени (gen. sg.). "У меня нет времени" = No tengo tiempo. Tiempo es singular aquí, por eso genitivo singular -ени.' },
      { s: 'В городе много человек.', q: '¿Cuál es el error?', opts: ['"Человек" → "людей" — много pide roditelny pl. de человек', '"Много" → "несколько"', '"В городе" → "в городах"', 'No hay error'], a: 0, fb: '"Людей" — много + roditelny pl. Человек tiene plural supletivo: человек → люди → людей. "Много людей" (mucha gente). "Много человек" se usa solo para contar personas en un grupo específico y es registro más coloquial.' },
    ],
    production: 'Escribe 4 oraciones: 1 con "нет + genitive pl.", 1 con "много + genitive pl.", 1 con un número 5-10 + genitive pl., 1 preguntando "сколько + genitive pl.?"',
  },
  {
    id: 'uslovnye', title: 'Условные предложения с бы (Uslovnye — Condicional con бы)', icon: '💭',
    rule: 'El condicional ruso usa бы (by) + pasado de verbo: "Если бы я знал (Yesli by ya znal — Si yo supiera)". Tipo 2 (hipotético/irreal): Если бы + pasado (prótasis) → бы + pasado (apódosis). Прим.: "Если бы у меня было время, я бы поехал в Москву (Yesli by u menya bylo vremya, ya by poyekhal v Moskvu — Si tuviera tiempo, iría a Moscú)". Бы NO cambia con la persona: я бы, ты бы, он бы, мы бы. El tiempo pasado tampoco cambia: был/была/было/были según el sujeto.',
    tip: 'Трюк: La partícula БЫ puede aparecer después del verbo o después del союза ЕСЛИ: "Если бы" siempre va juntas (not *"если" alone for hypotheticals). Compara: "Если у меня будет время, я поеду" (real future — si tengo tiempo, iré) vs "Если бы у меня было время, я бы поехал" (hipotético — si tuviera tiempo, iría). БЫ = hace el condicional irreal.',
    table: {
      headers: ['Persona', 'Condicional con бы', 'Ejemplo', 'Transliteración'],
      rows: [
        ['Я', 'я бы + pasado', 'Я бы пошёл/пошла', 'Ya by poshol/poshla'],
        ['Ты', 'ты бы + pasado', 'Ты бы знал/знала', 'Ty by znal/znala'],
        ['Он/Она', 'он/она бы + pasado', 'Она бы сказала', 'Ona by skazala'],
        ['Мы', 'мы бы + pasado', 'Мы бы поехали', 'My by poyekhali'],
        ['Вы', 'вы бы + pasado', 'Вы бы согласились', 'Vy by soglasilis'],
        ['Они', 'они бы + pasado', 'Они бы помогли', 'Oni by pomogli'],
      ]
    },
    b1note: 'En A2 usabas el futuro real: "Если у меня будет время, я поеду." En B1, el condicional irreal es esencial para debate y conversación avanzada: expresar deseos, hipótesis, consejos. "Что бы вы сделали на моём месте?" (¿Qué haría usted en mi lugar?) — estructura B1 frecuente.',
    examples: [
      'Если бы у меня было больше денег, я бы купил машину. (Yesli by u menya bylo bolshe deneg, ya by kupil mashinu.) — Si tuviera más dinero, compraría un coche.',
      'Что бы ты сделал на моём месте? (Shto by ty sdelal na moyom meste?) — ¿Qué harías tú en mi lugar? [pregunta con бы]',
      'Я бы не отказался от чашки кофе. (Ya by ne otkazalsya ot chashki kofe.) — No rechazaría una taza de café. [condicional de deseo]',
    ],
    fills: [
      { s: 'Если бы она ___ (знать), она бы сказала тебе.', opts: ['знает', 'знала', 'знала бы', 'знает бы'], a: 1, fb: '"Знала" — Если бы + pasado (sin бы en la prótasis). Знать → знала (fem. pasado). "Если бы она знала" (Si ella supiera/hubiera sabido).' },
      { s: 'Я ___ поехал в Россию, если бы мог.', opts: ['бы', 'был', 'будет', 'буду'], a: 0, fb: '"Бы" — apódosis: я + бы + поехал. La partícula бы es invariable. "Я бы поехал" = yo iría. Бы se coloca después del pronombre o cerca del verbo.' },
      { s: 'Если бы у нас ___ (быть) больше времени, мы бы всё успели.', opts: ['есть', 'было', 'будет', 'были'], a: 1, fb: '"Было" — tiempo (время) es neutro singular → было (pasado neutro de быть). "Если бы у нас было время" = Si tuviéramos tiempo.' },
      { s: 'Что ___ ты сделал на его месте?', opts: ['есть', 'бы', 'будет', 'было'], a: 1, fb: '"Бы" — "Что бы ты сделал?" (¿Qué harías...?). Con вопросительное слово "что": что бы = qué (en condicional). Estructura natural para preguntar hipótesis.' },
      { s: 'Они ___ согласились, но у них не было выбора.', opts: ['бы не', 'не бы', 'не были', 'бы'], a: 0, fb: '"Бы не" — condicional negativo: они бы не согласились (no habrían aceptado). Negación: бы + не + pasado O бы не + pasado. Ambos órdenes son posibles.' },
    ],
    transforms: [
      { prompt: 'Convierte a condicional irreal (hipotético):',s: 'Если у меня будет время, я прочитаю книгу.', opts: ['Если бы у меня было время, я бы прочитал книгу.', 'Если у меня было время, я бы прочитал книгу.', 'Если бы у меня будет время, я прочитаю книгу.', 'Если бы у меня время, я бы читал книгу.'], a: 0, fb: '"Если бы... было... я бы прочитал" — конкретные изменения: будет → было (prótasis), прочитаю → бы прочитал (apódosis). Real future → hypothetical past forms.' },
      { prompt: 'Expresa deseo con condicional бы:',s: 'Я хочу поехать в Японию. → (I wish/would go)', opts: ['Я бы поехал в Японию.', 'Я бы поеду в Японию.', 'Я был бы поехал в Японию.', 'Я поехал бы в Японию когда-нибудь.'], a: 0, fb: '"Я бы поехал" — condicional de deseo sin если бы: expresa "me gustaría / quisiera ir". Бы + pasado = deseo hipotético. Nota: el último también es correcto pero menos típico.' },
      { prompt: 'Haz la pregunta hipotética "en tu lugar":',s: '¿Qué harías tú si fueras él? → Что бы...', opts: ['Что бы ты сделал на его месте?', 'Что бы ты сделаешь на его месте?', 'Что ты бы делал на его место?', 'Что бы ты делал бы на его месте?'], a: 0, fb: '"Что бы ты сделал на его месте?" — структура: что бы + sujeto + verbo pasado + на + чьём-то месте (en lugar de alguien). "На его месте" = en su lugar.' },
    ],
    errors: [
      { s: 'Если бы она знает, она бы сказала.', q: '¿Qué está mal?', opts: ['"Знает" → "знала" — Если бы pide pasado, no presente', '"Бы сказала" → "скажет"', '"Если бы" → "если"', 'No hay error'], a: 0, fb: '"Знала" — después de "если бы" SIEMPRE pasado. "Знает" es presente → incorrecto con бы. "Если бы она знала" (If she knew). El condicional ruso usa pasado, no subjuntivo.' },
      { s: 'Я бы поеду в Москву завтра.', q: '¿Cuál es el error?', opts: ['"Поеду" → "поехал/поехала" — бы pide pasado, no futuro', '"Завтра" debe ir al principio', '"Я бы" → "мне бы"', 'No hay error'], a: 0, fb: '"Поехал/поехала" — бы + ПАСТО (no futuro). "Я бы поеду" es incorrecto; lo correcto es "я бы поехал/поехала". Бы siempre se combina con formas del pasado.' },
    ],
    production: 'Escribe 3 oraciones condicionales hipotéticas usando "если бы... бы...": 1 sobre dinero, 1 sobre tiempo libre, 1 sobre una habilidad que te gustaría tener. Ej: "Если бы у меня было/была... я бы..."',
  },
  {
    id: 'prichastiya', title: 'Причастия настоящего (Prichastiya — Participios de presente)', icon: '🎭',
    rule: 'Los participios activos de presente se forman del presente: корень глагола (3ª pl.) + -ущий/-ющий (1ª conjugación) o -ащий/-ящий (2ª conjugación). Ejemplos: читать → читают → читающий (el que lee/leyendo); говорить → говорят → говорящий (el que habla). Concuerdan con el sustantivo en género, número y caso como cualquier adjetivo. Reemplazan las oraciones con "который": "студент, который читает" → "читающий студент".',
    tip: 'Regla práctica: тип 1 (читать, писать, жить) → -ющий/-ущий. Тип 2 (говорить, учить, ходить) → -ящий/-ащий. El participio describe una ACCIÓN EN PROCESO que realiza el sustantivo. Diferencia con español: en ruso el participio concuerda en género/caso: "читающий студент (masc.)" / "читающая студентка (fem.)" / "читающие студенты (pl.)".',
    table: {
      headers: ['Infinitivo', '3ª pl. presente', 'Participio masc.', 'Ejemplo'],
      rows: [
        ['читать (chitat)', 'читают (chitayut)', 'читающий (chitayushchy)', 'читающий студент'],
        ['работать (rabotat)', 'работают (rabotayut)', 'работающий (rabotayushchy)', 'работающий человек'],
        ['говорить (govorit)', 'говорят (govoryat)', 'говорящий (govoryashchy)', 'говорящий по-русски'],
        ['учиться (uchitsya)', 'учатся (uchatsya)', 'учащийся (uchashchsya)', 'учащийся студент'],
        ['жить (zhit)', 'живут (zhivut)', 'живущий (zhivushchy)', 'живущий в Москве'],
        ['петь (pet)', 'поют (poyut)', 'поющий (poyushchy)', 'поющий голос'],
      ]
    },
    b1note: 'En A2 no se usaban participios; se reemplazaban por oraciones "который". En B1 los participios son frecuentes en texto escrito y formal. En habla coloquial, "который" sigue siendo más natural. Aprende a RECONOCER los participios en lectura y usarlos en escritura.',
    examples: [
      'Девушка, говорящая по-испански, работает переводчиком. (Devushka, govoryashchaya po-ispanski, rabotayet perevodchikom.) — La chica que habla español trabaja de traductora.',
      'Я вижу студентов, читающих книги в библиотеке. (Ya vizhu studentov, chitayushchikh knigi v biblioteke.) — Veo a estudiantes que leen libros en la biblioteca. [pl. oblicuo -щих]',
      'Это компания, производящая электромобили. (Eto kompaniya, proizvodushchaya elektromobili.) — Es una empresa que fabrica coches eléctricos.',
    ],
    fills: [
      { s: 'Студент, ___ (читать) в библиотеке, — мой брат.', opts: ['читающий', 'читавший', 'читаемый', 'прочитавший'], a: 0, fb: '"Читающий" — participio activo de presente, masc. sg.: читать → читают → читающий. Describe una acción en proceso.' },
      { s: 'Я знаю эту женщину, ___ (работать) в больнице.', opts: ['работающая', 'работавшая', 'работается', 'работаемая'], a: 0, fb: '"Работающую" — en rigor debería ser "работающую" (acusativo fem.), pero en esta oración relativa con "которую" implícita, el nominativo "работающая" también es correcto en contexto participial appositivo. Работать → работают → работающая (fem.).' },
      { s: 'Дети, ___ (играть) во дворе, — наши соседи.', opts: ['играющие', 'игравшие', 'игравшихся', 'поигравшие'], a: 0, fb: '"Играющие" — participio presente plural (nominativo): играть → играют → играющие (-ющие). Concuerda con дети (plural).' },
      { s: 'Это ___ (петь) птица — соловей.', opts: ['поющая', 'певшая', 'петая', 'поётся'], a: 0, fb: '"Поющая" — participio presente fem.: петь → поют → поющий (masc.) / поющая (fem.). "Поющая птица" = el pájaro que canta.' },
      { s: 'Люди, ___ (жить) за границей, часто скучают по дому.', opts: ['живущие', 'жившие', 'живомые', 'прожившие'], a: 0, fb: '"Живущие" — participio presente plural: жить → живут → живущий (masc.) / живущие (pl.). "Живущие за границей" = los que viven en el extranjero.' },
    ],
    transforms: [
      { prompt: 'Reemplaza "который" por participio:',s: 'Студент, который изучает русский язык, очень умный.', opts: ['Изучающий русский язык студент очень умный.', 'Студент, изучающий русский язык, очень умный.', 'Студент, изучавший русский язык, очень умный.', 'Русский язык изучающий студент очень умный.'], a: 1, fb: '"Студент, изучающий русский язык..." — el participio sigue al sustantivo que modifica en este patrón apositivo. Изучать → изучают → изучающий.' },
      { prompt: 'Haz masculino → femenino del participio:',s: 'читающий студент → una estudiante que lee', opts: ['читающая студентка', 'читавшая студентка', 'читающаяся студентка', 'читаемая студентка'], a: 0, fb: '"Читающая" — participio fem.: -ющий (masc.) → -ющая (fem.). Студент → студентка. El participio concuerda en género con el sustantivo.' },
      { prompt: 'Transforma al plural del participio:',s: 'живущий человек → las personas que viven', opts: ['живущие люди', 'живущих людей', 'живёших люди', 'живущихся люди'], a: 0, fb: '"Живущие люди" — participio pl. nom.: живущий (sg. masc.) → живущие (pl. nom.). Concuerda con люди (nominativo plural).' },
    ],
    errors: [
      { s: 'Я видел студентку, читающий книгу.', q: '¿Qué está mal?', opts: ['"Читающий" → "читающую" — debe concordar con студентку (fem. acus.)', '"Видел" → "видела"', '"Студентку" → "студент"', 'No hay error'], a: 0, fb: '"Читающую" — el participio debe concordar con студентку: fem. acusativo → читающую (-ющую). Читающий es masculino. Participios son adjetivos y concuerdan en género, número y CASO.' },
      { s: 'Компания, производящие автомобили, известна.', q: '¿Cuál es el error?', opts: ['"Производящие" → "производящая" — компания es singular fem.', '"Известна" → "известны"', '"Компания" debe ir al final', 'No hay error'], a: 0, fb: '"Производящая" — компания es singular femenino → participio fem. sg.: производящая. "Производящие" es plural. El participio concuerda con el sustantivo que modifica.' },
    ],
    production: 'Escribe 3 oraciones usando participios de presente activos: 1 con sustantivo masculino, 1 con femenino, 1 con plural. Puedes usar: читающий/ая/ие, работающий/ая/ие, живущий/ая/ие, говорящий/ая/ие.',
  },
];

export default function GramaticaRusoB1() {
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
          <Link href="/practica/ruso/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 Грамматика</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Грамматика · Ruso B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas B1 con tabla de referencia, ejemplos con transliteración, 5 fill-in-blank, 3 transformaciones, 2 detección de errores y producción libre.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.b1note}
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
                ? '¡Отлично (Otlichno — Excelente)! Dominas este tema B1.'
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
              <Link href="/practica/ruso/b1" className="btn btn-ghost btn-sm">Volver a B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
