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
    id: 1, title: 'Удалённая работа в России', titleTranslit: 'Udalyonnaya rabota v Rossii', topic: 'Trabajo y tecnología', words: 130, grammar: 'Виды глагола (aspectos verbales)',
    text: 'За последние несколько лет удалённая работа стала нормой для миллионов россиян. Раньше большинство компаний требовали присутствия сотрудников в офисе каждый день. Сейчас всё изменилось. Многие специалисты предпочитают работать из дома, используя интернет и современные технологии. Опросы показывают, что производительность труда не снизилась, а в некоторых случаях даже выросла. Сотрудники экономят время на дороге и могут лучше совмещать работу с личной жизнью. Конечно, есть и минусы: не всем хватает живого общения с коллегами, и некоторые жалуются на то, что дома трудно сосредоточиться. Компании адаптируются и предлагают гибкий формат — несколько дней в офисе, несколько дома. Это оказалось хорошим решением для всех.',
    textTranslit: 'Za poslednie neskolko let udalyonnaya rabota stala normoy dlya millionov rossiyan. Ranshe bolshinstvo kompaniy trebovalo prisutstviya sotrudnikov v ofise kazhdyy den. Seychas vsyo izmenilos. Mnogie spetsialisty predpochitayut rabotat iz doma, ispolzuya internet i sovremennye tekhnologii. Oprosy pokazyvayut, chto proizvoditelnost truda ne snizilas, a v nekotorykh sluchayakh dazhe vyrosla. Sotrudniki ekonomyat vremya na doroge i mogut luchshe sovmeshchat rabotu s lichnoy zhiznyu. Konechno, est i minusy: ne vsem khvatayet zhivogo obshcheniya s kollegami, i nekotorye zhaluyutsya na to, chto doma trudno sosredotochitsya. Kompanii adaptiruyutsya i predlagayut gibky format — neskolko dney v ofise, neskolko doma. Eto okazalos khoroshim resheniem dlya vsekh.',
    vocab: { стала: 'se convirtió', требовали: 'exigían', производительность: 'productividad', снизилась: 'disminuyó', совмещать: 'combinar', жалуются: 'se quejan', сосредоточиться: 'concentrarse', адаптируются: 'se adaptan', гибкий: 'flexible', оказалось: 'resultó ser' },
    preQ: [
      { q: '¿Has trabajado de forma remota alguna vez?', opts: ['Sí, regularmente', 'Solo temporalmente', 'No, nunca'], a: -1 },
      { q: '¿Qué ventaja crees más importante del trabajo remoto?', opts: ['Ahorro de tiempo', 'Flexibilidad', 'Más productividad'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "снизилась"?', cat: 'Vocabulario', opts: ['aumentó', 'se mantuvo igual', 'disminuyó', 'desapareció'], a: 2, fb: '"Снизилась" = disminuyó. De снизиться (disminuirse) — совершенный вид, femenino pasado (производительность = fem.).' },
      { q: '¿Cómo era la situación antes del trabajo remoto?', cat: 'Comprensión', opts: ['Las empresas permitían trabajar desde casa', 'La mayoría de empresas exigía presencia diaria en la oficina', 'Solo algunos trabajaban desde casa', 'No había internet'], a: 1, fb: '"Раньше большинство компаний требовали присутствия сотрудников в офисе каждый день." — la mayoría exigía presencia diaria.' },
      { q: '¿Qué revelan las encuestas?', cat: 'Comprensión', opts: ['La productividad bajó', 'La productividad no bajó y en algunos casos subió', 'Todos prefieren la oficina', 'Las empresas cerraron'], a: 1, fb: '"Производительность труда не снизилась, а в некоторых случаях даже выросла." — no bajó y en algunos casos incluso subió.' },
      { q: '¿Cuál es la principal queja de quienes trabajan en casa?', cat: 'Comprensión', opts: ['El salario es menor', 'La falta de contacto con colegas y dificultad de concentrarse', 'No hay internet suficiente', 'Los jefes son más exigentes'], a: 1, fb: '"Не всем хватает живого общения с коллегами, и некоторые жалуются, что дома трудно сосредоточиться."' },
      { q: '¿Cuál fue la solución que adoptaron las empresas?', cat: 'Comprensión', opts: ['Solo trabajo remoto', 'Solo presencia en oficina', 'Formato híbrido: algunos días en oficina y otros en casa', 'Reducción de empleados'], a: 2, fb: '"Компании предлагают гибкий формат — несколько дней в офисе, несколько дома." — formato híbrido.' },
      { q: '"Стала нормой" — ¿qué aspecto verbal es "стала"?', cat: 'Gramática', opts: ['Несовершенный (proceso)', 'Совершенный (resultado completado)', 'Futuro imperfectivo', 'Imperativo'], a: 1, fb: '"Стала" — совершенный вид de становиться → стать. Denota resultado: se convirtió (completado). El NSV seria "становилась" (se estaba convirtiendo, proceso).' },
    ],
    openQ: 'Describe las ventajas y desventajas del trabajo remoto en 3-4 oraciones. Usa aspectos verbales correctamente.',
    production: 'Usa: "Удалённая работа ___ (NSV proceso / SV resultado). С одной стороны... С другой стороны... Я думаю, что..."',
  },
  {
    id: 2, title: 'Защита окружающей среды', titleTranslit: 'Zashchita okruzhayushchey sredy', topic: 'Medioambiente', words: 128, grammar: 'Творительный падеж + причастия',
    text: 'Проблема загрязнения окружающей среды становится всё более актуальной. Учёные, занимающиеся экологическими исследованиями, предупреждают: если мы не примем срочных мер, последствия будут катастрофическими. Главными источниками загрязнения являются промышленность, транспорт и сельское хозяйство. Вместе с тем во многих странах развивается зелёная экономика. Компании, использующие возобновляемые источники энергии, получают налоговые льготы. Правительства сотрудничают с учёными для разработки новых решений. Рядовые граждане тоже могут внести вклад: перерабатывать мусор, экономить воду и электроэнергию, пользоваться общественным транспортом. Каждый небольшой шаг, сделанный сегодня, поможет сохранить планету для будущих поколений.',
    textTranslit: 'Problema zagryazneniya okruzhayushchey sredy stanovitsya vsyo boleye aktualnoy. Uchyonye, zanimayushchiesya ekologicheskimi issledovaniyami, preduprezhdayut: yesli my ne primem srochnykh mer, posledstviya budut katastroficheskimi. Glavnymi istochnikami zagryazneniya yavlyayutsya promyshlennost, transport i selskoe khozyaystvo. Vmeste s tem vo mnogikh stranakh razvivaetsya zelyonaya ekonomika. Kompanii, ispolzuyushchie vozobnovlyaemye istochniki energii, poluchayut nalogovye lgoty. Pravitelstva sotrudnichayut s uchyonymi dlya razrabotki novykh resheniy. Ryadovye grazhdane tozhe mogut vnesti vklad: pererabatyvat musor, ekonomit vodu i elektroenergiya, polzovatsya obshchestvennym transportom. Kazhdyy nebolshoy shag, sdelanny segodnya, pomozhet sokhranit planetu dlya budushchikh pokoleniy.',
    vocab: { актуальной: 'relevante/urgente', предупреждают: 'advierten', срочных: 'urgentes/inmediatas', источниками: 'fuentes (instrumental pl.)', льготы: 'beneficios/exenciones', сотрудничают: 'colaboran', рядовые: 'ciudadanos comunes', 'внести вклад': 'hacer una contribución', поколений: 'generaciones (gen. pl.)', сделанный: 'hecho/realizado (participio)' },
    preQ: [
      { q: '¿Qué haces tú para cuidar el medioambiente?', opts: ['Reciclo', 'Uso transporte público', 'Ahorro energía'], a: -1 },
      { q: '¿Cuál crees que es el mayor problema ambiental actual?', opts: ['Contaminación del aire', 'Cambio climático', 'Deforestación'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "предупреждают"?', cat: 'Vocabulario', opts: ['celebran', 'advierten', 'investigan', 'proponen'], a: 1, fb: '"Предупреждают" = advierten. De предупреждать (NSV) — advertir. Presente plural, 3ª persona.' },
      { q: '¿Cuáles son las principales fuentes de contaminación mencionadas?', cat: 'Comprensión', opts: ['Turismo, plásticos y electricidad', 'Industria, transporte y agricultura', 'Minería, pesca y silvicultura', 'Ciudades, ríos y montañas'], a: 1, fb: '"Главными источниками загрязнения являются промышленность, транспорт и сельское хозяйство."' },
      { q: '¿Qué beneficio reciben las empresas que usan energías renovables?', cat: 'Comprensión', opts: ['Subvenciones directas', 'Exenciones fiscales', 'Nuevos contratos', 'Publicidad gratuita'], a: 1, fb: '"Компании, использующие возобновляемые источники энергии, получают налоговые льготы." — льготы = exenciones/beneficios fiscales.' },
      { q: '¿Qué pueden hacer los ciudadanos comunes?', cat: 'Comprensión', opts: ['Solo protestar', 'Reciclar, ahorrar agua y usar transporte público', 'Comprar productos ecológicos', 'Escribir a los políticos'], a: 1, fb: '"Рядовые граждане могут перерабатывать мусор, экономить воду, пользоваться общественным транспортом."' },
      { q: '"Учёные, занимающиеся исследованиями" — ¿qué es "занимающиеся"?', cat: 'Gramática', opts: ['Adjetivo simple', 'Participio activo de presente plural', 'Verbo en presente', 'Gerundio'], a: 1, fb: '"Занимающиеся" — причастие настоящего времени, plural. De заниматься → занимаются → занимающиеся. Reemplaza "которые занимаются".' },
      { q: '"Главными источниками" — ¿por qué "главными"?', cat: 'Gramática', opts: ['Genitivo plural', 'Dativo plural', 'Instrumental plural', 'Nominativo plural'], a: 2, fb: '"Главными источниками" — творительный падеж (instrumental) plural. "Являются + instrumental" es una construcción copulativa formal: X является Y-ом/Y-ами.' },
    ],
    openQ: 'Describe 3 acciones concretas que podrías hacer para ayudar al medioambiente. Usa NSV para hábitos y SV para acciones puntuales.',
    production: 'Usa: "Я решил/а ___ (SV). Каждый день я буду ___ (NSV). Если мы все ___ (SV), то ___."',
  },
  {
    id: 3, title: 'Русская кухня в мире', titleTranslit: 'Russkaya kukhnya v mire', topic: 'Gastronomía y cultura', words: 125, grammar: 'Родительный мн.ч. + сравнение',
    text: 'Русская кухня завоёвывает популярность во всём мире. Традиционные блюда, такие как борщ, пельмени и блины, стали известны далеко за пределами России. В крупных городах мира — Нью-Йорке, Лондоне, Берлине — открываются рестораны русской кухни, привлекающие тысячи посетителей. Многие повара адаптируют рецепты для местных вкусов, добавляя местные ингредиенты. Интересно, что борщ — суп, происхождение которого оспаривается несколькими странами, — стал символом спора о культурной принадлежности. Тем не менее его популярность только растёт. Русские сладости, особенно торты и пирожные, тоже пользуются спросом за рубежом. Гастрономический туризм становится всё более популярным, и Россия активно развивает это направление.',
    textTranslit: 'Russkaya kukhnya zavoyovyvayet populyarnost vo vsyom mire. Traditsionnye blyuda, takiye kak borshch, pelmeni i bliny, stali izvestny daleko za predelami Rossii. V krupnykh gorodakh mira — Nyu-Yorke, Londone, Berline — otkryvayutsya restorany russkoy kukhni, privlekayushchie tysyachi posetiteley. Mnogie povara adaptiruyut retsepty dlya mestnykh vkusov, dobavlyaya mestnye ingredienty. Interesno, chto borshch — sup, proiskhozhdeniye kotorogo osparivaetsya neskolkimi stranami — stal simvolom spora o kulturnoy prinadlezhnosti. Tem ne meneye yego populyarnost tolko rastyot. Russkie sladosti, osobenno torty i pirozhnyye, tozhe polzuyutsya sprosom za rubezhom. Gastronomichesky turizm stanovitsya vsyo boleye populyarnym, i Rossiya aktivno razvivayet eto napravleniye.',
    vocab: { завоёвывает: 'conquista/gana', пределами: 'fronteras/límites (instr. pl.)', привлекающие: 'que atraen (participio)', рецепты: 'recetas', оспаривается: 'se disputa', принадлежности: 'pertenencia/identidad', 'пользуются спросом': 'tienen demanda', рубежом: 'en el extranjero', направление: 'dirección/área', ингредиенты: 'ingredientes' },
    preQ: [
      { q: '¿Has probado algún plato de la cocina rusa?', opts: ['Sí, el borscht', 'Sí, los pelmeni', 'No he probado ninguno'], a: -1 },
      { q: '¿Qué cocina internacional te gusta más?', opts: ['Japonesa', 'Italiana', 'Mexicana / Latinoamericana'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "завоёвывает популярность"?', cat: 'Vocabulario', opts: ['pierde popularidad', 'gana popularidad', 'mantiene popularidad', 'crea popularidad'], a: 1, fb: '"Завоёвывает популярность" = gana/conquista popularidad. Завоёвывать = conquistar/ganar (NSV). Популярность = popularidad.' },
      { q: '¿Qué ocurre con la cocina rusa en ciudades como Nueva York y Londres?', cat: 'Comprensión', opts: ['Se prohibió', 'Se abren restaurantes que atraen miles de visitantes', 'Solo hay un restaurante por ciudad', 'Es poco conocida'], a: 1, fb: '"В крупных городах мира открываются рестораны русской кухни, привлекающие тысячи посетителей."' },
      { q: '¿Cómo adaptan los chefs las recetas rusas?', cat: 'Comprensión', opts: ['No las cambian', 'Eliminan ingredientes', 'Añaden ingredientes locales', 'Las hacen más baratas'], a: 2, fb: '"Многие повара адаптируют рецепты для местных вкусов, добавляя местные ингредиенты."' },
      { q: '¿Por qué el borscht es motivo de controversia?', cat: 'Comprensión', opts: ['Por su sabor', 'Su origen es disputado por varios países', 'Es muy caro', 'Tiene ingredientes raros'], a: 1, fb: '"Борщ — суп, происхождение которого оспаривается несколькими странами." Varios países reclaman ser su origen.' },
      { q: '"Рестораны, привлекающие тысячи посетителей" — ¿qué es "привлекающие"?', cat: 'Gramática', opts: ['Adjetivo ordinario', 'Participio activo de presente plural', 'Verbo en pasado', 'Participio pasivo'], a: 1, fb: '"Привлекающие" — причастие настоящего времени, plural. Привлекать → привлекают → привлекающий/ие. Reemplaza "которые привлекают".' },
      { q: '"Несколькими странами" usa творительный падеж porque...', cat: 'Gramática', opts: ['El verbo "оспаривается" pide instrumental para el agente', 'Es genitivo plural', 'Es complemento directo', 'Es locativo'], a: 0, fb: '"Несколькими странами" — творительный (instrumental) en construcción pasiva: "оспаривается (кем?) несколькими странами". El agente en pasivas va en instrumental.' },
    ],
    openQ: 'Describe un plato típico de tu país o región en 3-4 oraciones, explicando sus ingredientes y cuándo se come.',
    production: 'Usa: "___ — традиционное блюдо из ___. Его готовят из (gen. pl.) ___. Это блюдо популярно, потому что ___."',
  },
  {
    id: 4, title: 'Преимущества изучения языков', titleTranslit: 'Preimushchestva izucheniya yazykov', topic: 'Educación y cognición', words: 132, grammar: 'Условные предложения с бы + виды глагола',
    text: 'Изучение иностранных языков приносит огромную пользу для мозга и карьеры. Исследования показывают: люди, знающие два или более языков, лучше справляются с многозадачностью и имеют более острое внимание. Если бы все начинали учить языки с детства, польза была бы намного больше. Двуязычные дети легче переключаются между задачами и, как правило, имеют более высокий академический успех. С точки зрения карьеры, знание языков открывает двери к международным компаниям и повышает зарплату в среднем на двадцать процентов. Кроме того, изучение языков развивает эмпатию: когда мы общаемся с носителями языка, мы лучше понимаем другие культуры. Если бы у каждого было время и желание учить языки, мир стал бы более открытым и взаимопонимающим.',
    textTranslit: 'Izuchenie inostrannykh yazykov prinosit ogromnuyu polzu dlya mozga i karery. Issledovaniya pokazyvayut: lyudi, znayushchie dva ili boleye yazykov, luchshe spravlyayutsya s mnogozadachnostyu i imeyut boleye ostroe vnimanie. Yesli by vse nachinali uchit yazyki s detstva, polza byla by namnogo bolshe. Dvuyazychnye deti legche pereklyuchayutsya mezhdu zadachami i, kak pravilo, imeyut boleye vysoky akademichesky uspekh. S tochki zreniya karery, znanie yazykov otkryvayet dveri k mezhdunarodnym kompaniyam i povyshayet zarplatu v srednem na dvadtsat protsentov. Krome togo, izuchenie yazykov razvivayet empatiyu: kogda my obshchaemsya s nositelyami yazyka, my luchshe ponimaem drugie kultury. Yesli by u kazhdogo bylo vremya i zhelaniye uchit yazyki, mir stal by boleye otkrytym i vzaimopanimayushchim.',
    vocab: { пользу: 'beneficio/provecho', справляются: 'se manejan/arreglan', многозадачностью: 'multitarea (instrumental)', переключаются: 'se cambian/alternan', двуязычные: 'bilingüe', носителями: 'hablantes nativos (instrumental pl.)', взаимопонимающим: 'de comprensión mutua', острое: 'agudo (atención)', повышает: 'aumenta', эмпатию: 'empatía' },
    preQ: [
      { q: '¿Cuántos idiomas hablas o estudias?', opts: ['Solo 1', '2 idiomas', '3 o más'], a: -1 },
      { q: '¿Por qué empezaste a aprender un idioma?', opts: ['Por trabajo', 'Por viaje', 'Por interés cultural'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué beneficio cognitivo tienen las personas bilingües?', cat: 'Comprensión', opts: ['Duermen mejor', 'Son más creativas', 'Mejor manejo de multitarea y atención más aguda', 'Hablan más rápido'], a: 2, fb: '"Лучше справляются с многозадачностью и имеют более острое внимание." — mejor multitarea y atención más aguda.' },
      { q: '"Если бы все начинали учить языки с детства, польза была бы намного больше" — ¿qué tipo de condicional es?', cat: 'Gramática', opts: ['Condicional real (futuro posible)', 'Condicional hipotético/irreal con бы + pasado', 'Condicional pasado imposible', 'Oración de deseo simple'], a: 1, fb: '"Если бы... было бы" — condicional irreal (hipotético). Если бы + pasado (начинали) → бы + pasado (была бы). NSV начинали indica proceso habitual hipotético.' },
      { q: '¿En qué porcentaje aumenta el salario quienes conocen idiomas?', cat: 'Comprensión', opts: ['Un 10%', 'Un 15%', 'Un 20%', 'Un 25%'], a: 2, fb: '"Повышает зарплату в среднем на двадцать процентов." — aumenta el salario en un 20% en promedio.' },
      { q: '¿Qué desarrolla el aprendizaje de idiomas además de habilidades cognitivas?', cat: 'Comprensión', opts: ['Fuerza física', 'Empatía hacia otras culturas', 'Habilidades matemáticas', 'Resistencia al estrés'], a: 1, fb: '"Изучение языков развивает эмпатию: когда мы общаемся с носителями языка, мы лучше понимаем другие культуры."' },
      { q: '"Люди, знающие два языка" — ¿qué es "знающие"?', cat: 'Gramática', opts: ['Adjetivo irregular', 'Participio activo de presente plural (nominativo)', 'Verbo en presente', 'Adjetivo superlativo'], a: 1, fb: '"Знающие" — причастие настоящего времени, plural nominativo. Знать → знают → знающий (sg. masc.) / знающие (pl.). Reemplaza "которые знают".' },
      { q: '"Общаемся с носителями язык" — ¿qué caso es "носителями"?', cat: 'Gramática', opts: ['Dativo plural', 'Instrumental plural', 'Genitivo plural', 'Nominativo plural'], a: 1, fb: '"Носителями" — instrumental plural. С + instrumental: "с носителями (с кем?) языка". Носитель → носители → носителями (-ями). Общаться + "с кем?" → с + instrumental.' },
    ],
    openQ: 'Escribe 3 razones por las que aprendes ruso. Usa al menos una oración condicional con "если бы".',
    production: 'Usa: "Я учу русский язык, потому что ___. Если бы я знал/а русский хорошо, я бы ___. Для меня изучение языков — это ___."',
  },
  {
    id: 5, title: 'Город будущего', titleTranslit: 'Gorod budushchego', topic: 'Tecnología y urbanismo', words: 135, grammar: 'Условные с бы + причастия + родительный мн.ч.',
    text: 'Города будущего разрабатываются уже сегодня. Архитекторы и инженеры, работающие над проектами умных городов, предлагают революционные решения. Если бы у нас были неограниченные ресурсы, мы могли бы построить идеальные экологические города. Умный город предполагает использование датчиков, собирающих данные об уровне загрязнения, трафике и потреблении энергии. Жители таких городов пользуются умным транспортом: беспилотными автобусами и велодорожками вместо дорог для машин. Зелёные крыши и вертикальные сады позволяют снизить температуру и улучшить качество воздуха. В умном городе нет дефицита энергии: солнечные панели и ветряные генераторы обеспечивают тысячи домов электричеством. Если бы все города мира стали умными, количество выбросов CO₂ значительно сократилось бы. Это будущее — не фантастика, а реальная цель.',
    textTranslit: 'Goroda budushchego razrabatyvayutsya uzhe segodnya. Arkhitektory i inzhenery, rabotayushchie nad proyektami umnykh gorodov, predlagayut revolyutsionnye resheniya. Yesli by u nas byli neogranichennye resursy, my mogli by postroit idealnye ekologicheskie goroda. Umny gorod predpolagayet ispolzovanie datchikov, sobira yushchikh dannye ob urovne zagryazneniya, trafike i potreblenii energii. Zhiteli takikh gorodov polzuyutsya umnym transportom: bespilotnymi avtobusami i velodorozhkami vmesto dorog dlya mashin. Zelyonye kryshi i vertikalnye sady pozvolyayut snizit temperaturu i uluchshit kachestvo vozdukha. V umnom gorode net defitsita energii: solnechnye paneli i vetryannye generatory obespechivayut tysyachi domov elektrichestvom. Yesli by vse goroda mira stali umnymi, kolichestvo vybrosov CO₂ znachitelno sokratilos by. Eto budushchee — ne fantastika, a realnaya tsel.',
    vocab: { разрабатываются: 'se están desarrollando', неограниченные: 'ilimitados', датчиков: 'sensores (gen. pl.)', беспилотными: 'autónomos/sin piloto', велодорожками: 'carriles bici (instr. pl.)', вертикальные: 'verticales', 'сократилось бы': 'se reduciría', дефицита: 'escasez (gen.)', обеспечивают: 'proporcionan/abastecen', предполагает: 'implica/presupone' },
    preQ: [
      { q: '¿Qué característica te parece más importante en una ciudad del futuro?', opts: ['Transporte limpio', 'Energía renovable', 'Espacios verdes'], a: -1 },
      { q: '¿Crees que las ciudades inteligentes son posibles pronto?', opts: ['Sí, en 10 años', 'Tal vez en 50 años', 'No en nuestro tiempo'], a: -1 },
    ],
    mcq: [
      { q: '¿Quiénes trabajan en proyectos de ciudades inteligentes?', cat: 'Comprensión', opts: ['Solo ingenieros', 'Políticos y economistas', 'Arquitectos e ingenieros', 'Científicos y médicos'], a: 2, fb: '"Архитекторы и инженеры, работающие над проектами умных городов..." — arquitectos e ingenieros.' },
      { q: '"Если бы у нас были ресурсы, мы могли бы построить..." — ¿qué expresa esto?', cat: 'Gramática', opts: ['Un plan real y concreto', 'Una condición hipotética/irreal con бы', 'Una orden', 'Un hecho pasado'], a: 1, fb: '"Если бы... могли бы построить" — condicional hipotético (irreal). Если бы + pasado → бы + pasado. Expresa condición imposible o muy improbable.' },
      { q: '¿Para qué sirven los sensores en una ciudad inteligente?', cat: 'Comprensión', opts: ['Para vigilar a los ciudadanos', 'Para recoger datos de contaminación, tráfico y energía', 'Para controlar los precios', 'Para registrar a los visitantes'], a: 1, fb: '"Датчики, собирающие данные об уровне загрязнения, трафике и потреблении энергии."' },
      { q: '¿Cómo se abastecen de electricidad las ciudades inteligentes?', cat: 'Comprensión', opts: ['Con carbón y gas', 'Con paneles solares y generadores eólicos', 'Con grandes represas', 'Con reactores nucleares'], a: 1, fb: '"Солнечные панели и ветряные генераторы обеспечивают тысячи домов электричеством."' },
      { q: '"Датчиков, собирающих данные" — ¿qué es "собирающих"?', cat: 'Gramática', opts: ['Adjetivo en genitivo', 'Participio de presente en genitivo plural', 'Verbo reflexivo', 'Forma pasiva'], a: 1, fb: '"Собирающих" — participio activo de presente en genitivo plural (-щих). Собирать → собирают → собирающий → собирающих (gen. pl.). Concuerda con датчиков (gen. pl. masc.).' },
      { q: '"Тысячи домов" — ¿qué caso es "домов"?', cat: 'Gramática', opts: ['Nominativo plural', 'Acusativo plural', 'Genitivo plural', 'Instrumental plural'], a: 2, fb: '"Домов" — родительный (genitivo) plural. Тысячи (miles de) + genitivo plural. Дом → дома → домов (gen. pl. masculino -ов).' },
    ],
    openQ: 'Describe cómo sería la ciudad ideal del futuro en 3-4 oraciones. Usa condicionales con "если бы" y al menos un participio.',
    production: 'Usa: "В идеальном городе будущего ___ (participio) люди могли бы ___. Если бы все города ___бы, то ___. Я думаю, что ___."',
  },
];

function tokenizeRu(text: string) {
  return text.split(/(\s+|[.,!?'"«»\-—:;()\[\]]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'"«»\-—:;()\[\]]+$/.test(t),
    clean: t.replace(/[^а-яёА-ЯЁ]/g, '').toLowerCase(),
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
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Producción libre</div>
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
            {score === t.mcq.length ? '¡Отлично! Comprendiste todo el texto B1.' : score >= 4 ? 'Хорошо. Repasa las preguntas que fallaste.' : 'Vuelve al texto y búscalas — la transliteración ayuda.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>TU PRODUCCIÓN LIBRE</div>
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

export default function LecturaRusoB1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ruso/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso B1</Link>
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
          <Link href="/practica/ruso/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Чтение</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Чтение · Ruso B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos en cirílico (120-150 слов). Cada texto incluye transliteración, vocabulario interactivo, 6 вопросов y producción libre.
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
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Lee el texto en cirílico tocando las palabras resaltadas. Usa la transliteración como apoyo. Luego responde los 6 вопросов de vocabulario, comprensión y gramática B1.
        </div>
      </div>
    </section>
  );
}
