'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { word: string; translit: string; es: string; emoji: string; example: string; exampleTranslit: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameRu: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'puteshestvie', name: 'Viajes y transporte', nameRu: 'Путешествие и транспорт', icon: '✈️',
    words: [
      { word: 'билет', translit: 'bilet', es: 'billete / tiquete', emoji: '🎫', example: 'Я купил билет до Москвы.', exampleTranslit: 'Ya kupil bilet do Moskvy.', exampleEs: 'Compré un billete a Moscú.' },
      { word: 'паспорт', translit: 'pasport', es: 'pasaporte', emoji: '📕', example: 'Не забудьте паспорт!', exampleTranslit: 'Ne zabudte pasport!', exampleEs: '¡No olvides el pasaporte!' },
      { word: 'багаж', translit: 'bagazh', es: 'equipaje', emoji: '🧳', example: 'Мой багаж слишком тяжёлый.', exampleTranslit: 'Moy bagazh slishkom tyazholyy.', exampleEs: 'Mi equipaje es demasiado pesado.' },
      { word: 'таможня', translit: 'tamozhnya', es: 'aduana', emoji: '🛃', example: 'Нужно пройти таможню.', exampleTranslit: 'Nuzhno proyti tamozhnu.', exampleEs: 'Hay que pasar por la aduana.' },
      { word: 'выход на посадку', translit: 'vykhod na posadku', es: 'puerta de embarque', emoji: '🚪', example: 'Выход на посадку — B7.', exampleTranslit: 'Vykhod na posadku — B7.', exampleEs: 'La puerta de embarque es B7.' },
      { word: 'пункт назначения', translit: 'punkt naznacheniya', es: 'destino', emoji: '📍', example: 'Какой ваш пункт назначения?', exampleTranslit: 'Kakoy vash punkt naznacheniya?', exampleEs: '¿Cuál es su destino?' },
      { word: 'отправление', translit: 'otpravleniye', es: 'salida', emoji: '🚀', example: 'Отправление в восемь утра.', exampleTranslit: 'Otpravleniye v vosem utra.', exampleEs: 'La salida es a las ocho de la mañana.' },
      { word: 'прибытие', translit: 'pribytiye', es: 'llegada', emoji: '🛬', example: 'Прибытие в 11:30.', exampleTranslit: 'Pribytiye v 11:30.', exampleEs: 'La llegada es a las 11:30.' },
      { word: 'пересадка', translit: 'peresadka', es: 'escala / transbordo', emoji: '🔄', example: 'Есть пересадка в Варшаве.', exampleTranslit: 'Est peresadka v Varshave.', exampleEs: 'Hay una escala en Varsovia.' },
      { word: 'бронирование', translit: 'bronirovaniye', es: 'reserva', emoji: '📋', example: 'Я сделал бронирование онлайн.', exampleTranslit: 'Ya sdelal bronirovaniye onlayn.', exampleEs: 'Hice la reserva en línea.' },
    ],
  },
  {
    id: 'rabota', name: 'Trabajo y carrera', nameRu: 'Работа и карьера', icon: '💼',
    words: [
      { word: 'зарплата', translit: 'zarplata', es: 'salario', emoji: '💰', example: 'Его зарплата выросла в этом году.', exampleTranslit: 'Yego zarplata vyrosla v etom godu.', exampleEs: 'Su salario aumentó este año.' },
      { word: 'коллега', translit: 'kollega', es: 'colega / compañero/a', emoji: '🤝', example: 'Мои коллеги очень дружелюбные.', exampleTranslit: 'Moi kollegi ochen druzhelyubnye.', exampleEs: 'Mis colegas son muy amables.' },
      { word: 'начальник', translit: 'nachalnik', es: 'jefe/a', emoji: '👔', example: 'Начальник организовал собрание.', exampleTranslit: 'Nachalnik organizoval sobraniye.', exampleEs: 'El jefe organizó una reunión.' },
      { word: 'дедлайн', translit: 'dedlayn', es: 'fecha límite', emoji: '⏰', example: 'Нужно успеть к дедлайну.', exampleTranslit: 'Nuzhno uspet k dedlaynu.', exampleEs: 'Hay que cumplir el plazo.' },
      { word: 'совещание', translit: 'soveshchaniye', es: 'reunión', emoji: '📋', example: 'Совещание отменили.', exampleTranslit: 'Soveshchaniye otmenili.', exampleEs: 'La reunión fue cancelada.' },
      { word: 'продвижение по службе', translit: 'prodvizheniye po sluzhbe', es: 'ascenso', emoji: '⬆️', example: 'Он получил продвижение по службе.', exampleTranslit: 'On poluchil prodvizheniye po sluzhbe.', exampleEs: 'Recibió un ascenso.' },
      { word: 'уволиться', translit: 'uvolitsya', es: 'renunciar', emoji: '🚪', example: 'Она решила уволиться.', exampleTranslit: 'Ona reshila uvolitsya.', exampleEs: 'Ella decidió renunciar.' },
      { word: 'нанимать', translit: 'nanimat', es: 'contratar', emoji: '📝', example: 'Компания будет нанимать новых сотрудников.', exampleTranslit: 'Kompaniya budet nanimat novykh sotrudnikov.', exampleEs: 'La empresa va a contratar nuevos empleados.' },
      { word: 'сверхурочная работа', translit: 'sverkhurochnaya rabota', es: 'horas extra', emoji: '⌚', example: 'Он много работает сверхурочно.', exampleTranslit: 'On mnogo rabotayet sverkhurochno.', exampleEs: 'Trabaja muchas horas extra.' },
      { word: 'искать работу', translit: 'iskat rabotu', es: 'buscar trabajo', emoji: '🔍', example: 'Она ищет работу уже два месяца.', exampleTranslit: 'Ona ishchet rabotu uzhe dva mesyatsa.', exampleEs: 'Ella lleva dos meses buscando trabajo.' },
    ],
  },
  {
    id: 'magazin', name: 'Compras y dinero', nameRu: 'Магазин и деньги', icon: '🛍️',
    words: [
      { word: 'чек / квитанция', translit: 'chek / kvitantsiya', es: 'recibo', emoji: '🧾', example: 'Сохраните чек для возврата.', exampleTranslit: 'Sokhranite chek dlya vozvrata.', exampleEs: 'Guarde el recibo para las devoluciones.' },
      { word: 'скидка', translit: 'skidka', es: 'descuento', emoji: '🏷️', example: 'Есть скидка двадцать процентов.', exampleTranslit: 'Est skidka dvadtsat protsentov.', exampleEs: 'Hay un descuento del 20%.' },
      { word: 'возврат денег', translit: 'vozvrat deneg', es: 'reembolso', emoji: '↩️', example: 'Я попросил возврат денег.', exampleTranslit: 'Ya poprosil vozvrat deneg.', exampleEs: 'Pedí un reembolso.' },
      { word: 'выгодная покупка', translit: 'vygodnaya pokupka', es: 'ganga', emoji: '🤑', example: 'Это пальто за тысячу рублей — выгодная покупка!', exampleTranslit: 'Eto palto za tysyachu rubley — vygodnaya pokupka!', exampleEs: 'Este abrigo por mil rublos ¡es una ganga!' },
      { word: 'наличные', translit: 'nalichnye', es: 'efectivo', emoji: '💵', example: 'У меня нет наличных.', exampleTranslit: 'U menya net nalichnykh.', exampleEs: 'No tengo efectivo.' },
      { word: 'кредитная карта', translit: 'kreditnaya karta', es: 'tarjeta de crédito', emoji: '💳', example: 'Можно платить кредитной картой?', exampleTranslit: 'Mozhno platit kreditnoy kartoy?', exampleEs: '¿Se puede pagar con tarjeta de crédito?' },
      { word: 'сдача', translit: 'sdacha', es: 'cambio / vuelta', emoji: '🔄', example: 'Оставьте сдачу себе!', exampleTranslit: 'Ostavte sdachu sebe!', exampleEs: '¡Quédese con el cambio!' },
      { word: 'цена', translit: 'tsena', es: 'precio', emoji: '💲', example: 'Какая цена на этот товар?', exampleTranslit: 'Kakaya tsena na etot tovar?', exampleEs: '¿Cuál es el precio de este producto?' },
      { word: 'распродажа', translit: 'rasprodazha', es: 'rebajas', emoji: '🏷️', example: 'В магазине большая распродажа.', exampleTranslit: 'V magazine bolshaya rasprodazha.', exampleEs: 'En la tienda hay grandes rebajas.' },
      { word: 'ценник', translit: 'tsennik', es: 'etiqueta de precio', emoji: '🏷️', example: 'На ценнике написано пятьсот рублей.', exampleTranslit: 'Na tsennike napisano pyatsot rubley.', exampleEs: 'La etiqueta dice quinientos rublos.' },
    ],
  },
  {
    id: 'zdorovye', name: 'Salud y cuerpo', nameRu: 'Здоровье и тело', icon: '🏥',
    words: [
      { word: 'головная боль', translit: 'golovnaya bol', es: 'dolor de cabeza', emoji: '🤕', example: 'У меня ужасная головная боль.', exampleTranslit: 'U menya uzhasnaya golovnaya bol.', exampleEs: 'Tengo un terrible dolor de cabeza.' },
      { word: 'температура', translit: 'temperatura', es: 'fiebre', emoji: '🌡️', example: 'У него температура тридцать девять.', exampleTranslit: 'U nego temperatura tridtsat devyat.', exampleEs: 'Tiene 39 grados de fiebre.' },
      { word: 'рецепт', translit: 'retsept', es: 'receta médica', emoji: '📋', example: 'Врач дал мне рецепт.', exampleTranslit: 'Vrach dal mne retsept.', exampleEs: 'El médico me dio una receta.' },
      { word: 'аптека', translit: 'apteka', es: 'farmacia', emoji: '💊', example: 'Аптека открыта до восьми вечера.', exampleTranslit: 'Apteka otkryta do vosmi vechera.', exampleEs: 'La farmacia está abierta hasta las 8.' },
      { word: 'симптом', translit: 'simptom', es: 'síntoma', emoji: '🔍', example: 'Какие у вас симптомы?', exampleTranslit: 'Kakiye u vas simptomy?', exampleEs: '¿Cuáles son sus síntomas?' },
      { word: 'приём у врача', translit: 'priyom u vracha', es: 'consulta médica', emoji: '📅', example: 'У меня приём у врача в три часа.', exampleTranslit: 'U menya priyom u vracha v tri chasa.', exampleEs: 'Tengo consulta médica a las tres.' },
      { word: 'хирург', translit: 'khirurg', es: 'cirujano/a', emoji: '🔬', example: 'Хирург оперирует завтра утром.', exampleTranslit: 'Khirurg opereruyet zavtra utrom.', exampleEs: 'El cirujano opera mañana por la mañana.' },
      { word: 'выздоравливать', translit: 'vyzdoravlivat', es: 'recuperarse', emoji: '💪', example: 'Он выздоравливал две недели.', exampleTranslit: 'On vyzdoravlival dve nedeli.', exampleEs: 'Tardó dos semanas en recuperarse.' },
      { word: 'аллергия', translit: 'allergiya', es: 'alergia', emoji: '🤧', example: 'У меня аллергия на орехи.', exampleTranslit: 'U menya allergiya na orekhi.', exampleEs: 'Soy alérgico/a a los frutos secos.' },
      { word: 'укол', translit: 'ukol', es: 'inyección', emoji: '💉', example: 'Врач сделал мне укол.', exampleTranslit: 'Vrach sdelal mne ukol.', exampleEs: 'El médico me puso una inyección.' },
    ],
  },
  {
    id: 'kharakter', name: 'Describir personas', nameRu: 'Характер и личность', icon: '👤',
    words: [
      { word: 'уверенный / ая', translit: 'uverenny / aya', es: 'seguro/a de sí mismo', emoji: '😎', example: 'Она очень уверенная в себе.', exampleTranslit: 'Ona ochen uverennaya v sebe.', exampleEs: 'Ella es muy segura de sí misma.' },
      { word: 'честолюбивый / ая', translit: 'chestolyubivy / aya', es: 'ambicioso/a', emoji: '🚀', example: 'Мой новый коллега очень честолюбивый.', exampleTranslit: 'Moy novy kollega ochen chestolyubivy.', exampleEs: 'Mi nuevo colega es muy ambicioso.' },
      { word: 'надёжный / ая', translit: 'nadyozhny / aya', es: 'confiable', emoji: '🤝', example: 'Она надёжный и честный человек.', exampleTranslit: 'Ona nadyozhny i chestny chelovek.', exampleEs: 'Es una persona confiable y honesta.' },
      { word: 'упрямый / ая', translit: 'upramy / aya', es: 'terco/a', emoji: '🐂', example: 'Он упрямый — никогда не меняет мнения.', exampleTranslit: 'On upramy — nikogda ne menyayet mneniya.', exampleEs: 'Es terco — nunca cambia de opinión.' },
      { word: 'щедрый / ая', translit: 'shchedry / aya', es: 'generoso/a', emoji: '🎁', example: 'Она очень щедрая со своими друзьями.', exampleTranslit: 'Ona ochen shchedraya so svoimi druzyami.', exampleEs: 'Es muy generosa con sus amigos.' },
      { word: 'терпеливый / ая', translit: 'terpelivy / aya', es: 'paciente', emoji: '⏳', example: 'Хороший учитель должен быть терпеливым.', exampleTranslit: 'Khoroshiy uchitel dolzhen byt terpelivym.', exampleEs: 'Un buen profesor debe ser paciente.' },
      { word: 'любопытный / ая', translit: 'lyubopytny / aya', es: 'curioso/a', emoji: '🔍', example: 'Дети очень любопытные по природе.', exampleTranslit: 'Deti ochen lyubopytnye po prirode.', exampleEs: 'Los niños son muy curiosos por naturaleza.' },
      { word: 'застенчивый / ая', translit: 'zastenchiv / aya', es: 'tímido/a', emoji: '😊', example: 'Она была застенчивой в детстве.', exampleTranslit: 'Ona byla zastenchivoy v detstve.', exampleEs: 'Era tímida en la infancia.' },
      { word: 'общительный / ая', translit: 'obshchitelny / aya', es: 'sociable', emoji: '🗣️', example: 'Он очень общительный и весёлый.', exampleTranslit: 'On ochen obshchitelny i vesyoly.', exampleEs: 'Es muy sociable y alegre.' },
      { word: 'честный / ая', translit: 'chestny / aya', es: 'honesto/a', emoji: '⚖️', example: 'Всегда будь честным с людьми.', exampleTranslit: 'Vsegda bud chestnym s lyudmi.', exampleEs: 'Sé siempre honesto con las personas.' },
    ],
  },
  {
    id: 'kvartira', name: 'Casa y hogar', nameRu: 'Квартира и жильё', icon: '🏠',
    words: [
      { word: 'однокомнатная квартира', translit: 'odnokomnatnaya kvartira', es: 'estudio / apartamento de un cuarto', emoji: '🏠', example: 'Я снимаю однокомнатную квартиру.', exampleTranslit: 'Ya snimayu odnokomnatnuyu kvartiru.', exampleEs: 'Alquilo un estudio.' },
      { word: 'аренда', translit: 'arenda', es: 'alquiler', emoji: '🔑', example: 'Аренда дорогая в центре города.', exampleTranslit: 'Arenda dorogaya v tsentre goroda.', exampleEs: 'El alquiler es caro en el centro.' },
      { word: 'хозяин', translit: 'khozyain', es: 'dueño / propietario', emoji: '👤', example: 'Хозяин разрешил завести кошку.', exampleTranslit: 'Khozyain razreshil zavesti koshku.', exampleEs: 'El dueño permitió tener un gato.' },
      { word: 'жилец', translit: 'zhilets', es: 'inquilino', emoji: '🏘️', example: 'Жилец платит аренду каждый месяц.', exampleTranslit: 'Zhilets platit arendu kazhdyy mesyats.', exampleEs: 'El inquilino paga el alquiler cada mes.' },
      { word: 'мебель', translit: 'mebel', es: 'muebles', emoji: '🪑', example: 'В квартире новая мебель.', exampleTranslit: 'V kvartire novaya mebel.', exampleEs: 'El apartamento tiene muebles nuevos.' },
      { word: 'жилой комплекс', translit: 'zhiloy kompleks', es: 'conjunto residencial', emoji: '🏢', example: 'Мы живём в новом жилом комплексе.', exampleTranslit: 'My zhivyom v novom zhilom komplekse.', exampleEs: 'Vivimos en un nuevo conjunto residencial.' },
      { word: 'переезд', translit: 'pereezd', es: 'mudanza', emoji: '📦', example: 'Переезд запланирован на следующую неделю.', exampleTranslit: 'Pereezd zaplanirovan na sleduyushchuyu nedelyu.', exampleEs: 'La mudanza está planificada para la semana que viene.' },
      { word: 'обставлять', translit: 'obstavlyat', es: 'amueblar', emoji: '🛋️', example: 'Мы обставляем новую квартиру.', exampleTranslit: 'My obstavlyayem novuyu kvartiru.', exampleEs: 'Estamos amueblando el nuevo apartamento.' },
      { word: 'коммунальные услуги', translit: 'kommunalnye uslugi', es: 'facturas de servicios', emoji: '💡', example: 'Коммунальные услуги включены в аренду.', exampleTranslit: 'Kommunalnye uslugi vklyucheny v arendu.', exampleEs: 'Las facturas de servicios están incluidas en el alquiler.' },
      { word: 'ремонт', translit: 'remont', es: 'renovación / reparación', emoji: '🔨', example: 'В квартире сделали ремонт.', exampleTranslit: 'V kvartire sdelali remont.', exampleEs: 'Le hicieron una renovación al apartamento.' },
    ],
  },
  {
    id: 'tekhnologiya', name: 'Tecnología', nameRu: 'Технология и интернет', icon: '💻',
    words: [
      { word: 'скачать', translit: 'skachat', es: 'descargar', emoji: '⬇️', example: 'Я скачал приложение на телефон.', exampleTranslit: 'Ya skachal prilozheniye na telefon.', exampleEs: 'Descargué la aplicación en el teléfono.' },
      { word: 'загрузить', translit: 'zagruzit', es: 'subir (a la nube)', emoji: '⬆️', example: 'Загрузи фото на сервер.', exampleTranslit: 'Zagruzi foto na server.', exampleEs: 'Sube la foto al servidor.' },
      { word: 'подключиться', translit: 'podklyuchitsya', es: 'conectarse', emoji: '📶', example: 'Подключитесь к Wi-Fi.', exampleTranslit: 'Podklyuchites k Wi-Fi.', exampleEs: 'Conéctese al Wi-Fi.' },
      { word: 'устройство', translit: 'ustroystvo', es: 'dispositivo', emoji: '📱', example: 'Моё устройство не работает.', exampleTranslit: 'Moyo ustroystvo ne rabotayet.', exampleEs: 'Mi dispositivo no funciona.' },
      { word: 'приложение', translit: 'prilozheniye', es: 'aplicación', emoji: '📲', example: 'Это приложение очень удобное.', exampleTranslit: 'Eto prilozheniye ochen udobnoye.', exampleEs: 'Esta aplicación es muy conveniente.' },
      { word: 'обновить', translit: 'obnovit', es: 'actualizar', emoji: '🔄', example: 'Нужно обновить программу.', exampleTranslit: 'Nuzhno obnovit programmu.', exampleEs: 'Hay que actualizar el programa.' },
      { word: 'пароль', translit: 'parol', es: 'contraseña', emoji: '🔑', example: 'Я забыл свой пароль.', exampleTranslit: 'Ya zabyl svoy parol.', exampleEs: 'Olvidé mi contraseña.' },
      { word: 'поделиться', translit: 'podelit\'sya', es: 'compartir', emoji: '📤', example: 'Поделись этим видео со мной.', exampleTranslit: 'Podelisya etim video so mnoy.', exampleEs: 'Comparte este vídeo conmigo.' },
      { word: 'профиль', translit: 'profil', es: 'perfil', emoji: '👤', example: 'Обнови свой профиль в соцсети.', exampleTranslit: 'Obnovì svoy profil v sotsseti.', exampleEs: 'Actualiza tu perfil en la red social.' },
      { word: 'уведомление', translit: 'uvedomleniye', es: 'notificación', emoji: '🔔', example: 'Я отключил уведомления.', exampleTranslit: 'Ya otklyuchil uvedomleniya.', exampleEs: 'Desactivé las notificaciones.' },
    ],
  },
  {
    id: 'priroda', name: 'Naturaleza y medio ambiente', nameRu: 'Природа и окружающая среда', icon: '🌿',
    words: [
      { word: 'пейзаж', translit: 'peyzazh', es: 'paisaje', emoji: '🏔️', example: 'Пейзаж в горах очень красивый.', exampleTranslit: 'Peyzazh v gorakh ochen krasivyy.', exampleEs: 'El paisaje en las montañas es muy hermoso.' },
      { word: 'лес', translit: 'les', es: 'bosque', emoji: '🌲', example: 'Мы гуляли в лесу всё утро.', exampleTranslit: 'My gulyali v lesu vsyo utro.', exampleEs: 'Paseamos por el bosque toda la mañana.' },
      { word: 'водопад', translit: 'vodopad', es: 'cascada', emoji: '💧', example: 'Мы видели огромный водопад.', exampleTranslit: 'My videli ogromny vodopad.', exampleEs: 'Vimos una cascada enorme.' },
      { word: 'загрязнение', translit: 'zagryazneniye', es: 'contaminación', emoji: '🏭', example: 'Загрязнение воздуха — серьёзная проблема.', exampleTranslit: 'Zagryazneniye vozdukha — seryoznaya problema.', exampleEs: 'La contaminación del aire es un problema grave.' },
      { word: 'перерабатывать', translit: 'pererabatyvat', es: 'reciclar', emoji: '♻️', example: 'Нужно перерабатывать стекло и бумагу.', exampleTranslit: 'Nuzhno pererabatyvat steklo i bumagu.', exampleEs: 'Hay que reciclar el vidrio y el papel.' },
      { word: 'экономить', translit: 'ekonomit', es: 'ahorrar (energía/agua)', emoji: '💡', example: 'Экономьте воду каждый день.', exampleTranslit: 'Ekonomte vodu kazhdyy den.', exampleEs: 'Ahorra agua cada día.' },
      { word: 'климат', translit: 'klimat', es: 'clima', emoji: '🌍', example: 'Изменение климата — мировая проблема.', exampleTranslit: 'Izmeneniye klimata — mirovaya problema.', exampleEs: 'El cambio climático es un problema mundial.' },
      { word: 'засуха', translit: 'zasukha', es: 'sequía', emoji: '🌵', example: 'Этот регион страдает от засухи.', exampleTranslit: 'Etot region stradayet ot zasukhi.', exampleEs: 'Esta región sufre una sequía.' },
      { word: 'биоразнообразие', translit: 'bioraznoobraziye', es: 'biodiversidad', emoji: '🦋', example: 'Биоразнообразие планеты под угрозой.', exampleTranslit: 'Bioraznoobraziye planety pod ugrozoy.', exampleEs: 'La biodiversidad del planeta está en peligro.' },
      { word: 'вулкан', translit: 'vulkan', es: 'volcán', emoji: '🌋', example: 'Вулкан извергался три дня.', exampleTranslit: 'Vulkan izvergalsya tri dnya.', exampleEs: 'El volcán estuvo en erupción tres días.' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Mazo completado!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 220, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.translit}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.word} · {w.translit}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
              <span style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleTranslit}</span><br />
              <span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Repasar →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.8 ? '🏆' : '⭐'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}`, display: 'inline-block', marginTop: '0.3rem' }}>{w.translit}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es; const isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
            <span style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleTranslit}</span><br />
            {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.7 ? '🎉' : '📝'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.translit.toLowerCase() ||
    input.trim() === w.word;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>{w.exampleEs}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escribe la transliteración (o el cirílico):</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="transliteración o кириллица..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡Correcto!' : `✗ Respuesta: ${w.word} (${w.translit})`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
            <div style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleTranslit}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioRusoA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameRu}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Elección múltiple' : '✏️ Escribir'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Словарь A2</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameRu}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} слов · Elige un modo de práctica</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Ve cirílico + transliteración. Marca las que ya conoces.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Elección múltiple', desc: 'Elige la traducción correcta de 4 opciones.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Escribir la palabra', desc: 'Escribe la transliteración (o cirílico) a partir de la traducción.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Словарь ({set.words.length} слов)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.1rem' }}>{w.translit}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{w.es}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Словарь</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Словарь · Ruso A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 sets temáticos — 80 слов con cirílico + transliteración. Flashcards, elección múltiple y ejercicios de escritura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameRu}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} слов</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Empezar →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
