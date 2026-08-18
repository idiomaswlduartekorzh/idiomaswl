'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { id: string; ru: string; translit: string; es: string; emoji: string; example: string; exampleTranslit: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameRu: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'rabota', name: 'Trabajo y carrera', nameRu: 'Работа и карьера (Rabota i kariera)', icon: '💼',
    words: [
      { id: 'peregovory', ru: 'переговоры', translit: 'peregovory', es: 'negociaciones', emoji: '🤝', example: 'Переговоры прошли успешно.', exampleTranslit: 'Peregovory proshli uspeshno.', exampleEs: 'Las negociaciones salieron bien.' },
      { id: 'srok', ru: 'срок', translit: 'srok', es: 'plazo / fecha límite', emoji: '⏰', example: 'Срок сдачи — пятница.', exampleTranslit: 'Srok sdachi — pyatnitsa.', exampleEs: 'El plazo de entrega es el viernes.' },
      { id: 'kollega', ru: 'коллега', translit: 'kollega', es: 'colega / compañero/a', emoji: '👥', example: 'Мои коллеги очень профессиональны.', exampleTranslit: 'Moi kollegi ochen professionaly.', exampleEs: 'Mis colegas son muy profesionales.' },
      { id: 'povyshenie', ru: 'повышение', translit: 'povyshenie', es: 'ascenso / aumento', emoji: '⬆️', example: 'Он получил повышение в марте.', exampleTranslit: 'On poluchil povyshenie v marte.', exampleEs: 'Recibió un ascenso en marzo.' },
      { id: 'uvolitsya', ru: 'уволиться', translit: 'uvolitsya', es: 'renunciar / dimitir', emoji: '🚪', example: 'Она решила уволиться из компании.', exampleTranslit: 'Ona reshila uvolitsya iz kompanii.', exampleEs: 'Ella decidió renunciar de la empresa.' },
      { id: 'kontrakt', ru: 'контракт', translit: 'kontrakt', es: 'contrato', emoji: '📄', example: 'Мы подписали новый контракт.', exampleTranslit: 'My podpisali novy kontrakt.', exampleEs: 'Firmamos un nuevo contrato.' },
      { id: 'nanyat', ru: 'нанять', translit: 'nanyat', es: 'contratar / contratar a alguien', emoji: '📝', example: 'Компания решила нанять специалиста.', exampleTranslit: 'Kompaniya reshila nanyat spetsialista.', exampleEs: 'La empresa decidió contratar a un especialista.' },
      { id: 'zarplata', ru: 'зарплата', translit: 'zarplata', es: 'salario / sueldo', emoji: '💰', example: 'Зарплата выплачивается каждый месяц.', exampleTranslit: 'Zarplata vyplachivaetsya kazhdyy mesyats.', exampleEs: 'El salario se paga cada mes.' },
      { id: 'rezultat', ru: 'результат', translit: 'rezultat', es: 'resultado', emoji: '📊', example: 'Результат работы превзошёл ожидания.', exampleTranslit: 'Rezultat raboty prevzoshol ozhidaniya.', exampleEs: 'El resultado del trabajo superó las expectativas.' },
      { id: 'otdel', ru: 'отдел', translit: 'otdel', es: 'departamento / sección', emoji: '🏢', example: 'Она работает в отделе маркетинга.', exampleTranslit: 'Ona rabotayet v otdele marketinga.', exampleEs: 'Ella trabaja en el departamento de marketing.' },
    ],
  },
  {
    id: 'tekhnologii', name: 'Tecnología', nameRu: 'Технологии (Tekhnologii)', icon: '💻',
    words: [
      { id: 'programmnoe', ru: 'программное обеспечение', translit: 'programmnoe obespechenie', es: 'software / programa', emoji: '🖥️', example: 'Нужно обновить программное обеспечение.', exampleTranslit: 'Nuzhno obnovit programmnoe obespechenie.', exampleEs: 'Hay que actualizar el software.' },
      { id: 'baza', ru: 'база данных', translit: 'baza dannykh', es: 'base de datos', emoji: '🗄️', example: 'База данных хранит всю информацию.', exampleTranslit: 'Baza dannykh khranit vsyu informatsiyu.', exampleEs: 'La base de datos almacena toda la información.' },
      { id: 'skachat', ru: 'скачать', translit: 'skachat', es: 'descargar', emoji: '⬇️', example: 'Я скачал новое приложение.', exampleTranslit: 'Ya skachal novoe prilozhenie.', exampleEs: 'Descargué la nueva aplicación.' },
      { id: 'zashifrovat', ru: 'зашифровать', translit: 'zashifrovat', es: 'cifrar / encriptar', emoji: '🔐', example: 'Данные нужно зашифровать.', exampleTranslit: 'Dannye nuzhno zashifrovat.', exampleEs: 'Los datos hay que cifrarlos.' },
      { id: 'interfeys', ru: 'интерфейс', translit: 'interfeys', es: 'interfaz', emoji: '🖱️', example: 'Интерфейс программы очень удобный.', exampleTranslit: 'Interfeys programmy ochen udobny.', exampleEs: 'La interfaz del programa es muy cómoda.' },
      { id: 'virus', ru: 'вирус', translit: 'virus', es: 'virus (informático)', emoji: '🦠', example: 'Компьютер заразился вирусом.', exampleTranslit: 'Kompyuter zarazilsya virusom.', exampleEs: 'La computadora se infectó con un virus.' },
      { id: 'algoritm', ru: 'алгоритм', translit: 'algoritm', es: 'algoritmo', emoji: '🔢', example: 'Алгоритм обрабатывает данные быстро.', exampleTranslit: 'Algoritm obrabatyvayet dannye bystro.', exampleEs: 'El algoritmo procesa los datos rápidamente.' },
      { id: 'propusknaya', ru: 'пропускная способность', translit: 'propusknaya sposobnost', es: 'ancho de banda', emoji: '📶', example: 'Пропускная способность сети увеличилась.', exampleTranslit: 'Propusknaya sposobnost seti uvelichilas.', exampleEs: 'El ancho de banda de la red aumentó.' },
      { id: 'besprovodnoy', ru: 'беспроводной', translit: 'besprovodnoy', es: 'inalámbrico', emoji: '📡', example: 'Беспроводное соединение стабильное.', exampleTranslit: 'Besprovodnoe soedinenie stabilnoe.', exampleEs: 'La conexión inalámbrica es estable.' },
      { id: 'set', ru: 'сеть', translit: 'set', es: 'red', emoji: '🌐', example: 'Сеть работает без перебоев.', exampleTranslit: 'Set rabotayet bez pereboyev.', exampleEs: 'La red funciona sin interrupciones.' },
    ],
  },
  {
    id: 'zdorovye', name: 'Salud', nameRu: 'Здоровье (Zdorovye)', icon: '🏥',
    words: [
      { id: 'diagnoz', ru: 'диагноз', translit: 'diagnoz', es: 'diagnóstico', emoji: '🩺', example: 'Врач поставил точный диагноз.', exampleTranslit: 'Vrach postavil tochny diagnoz.', exampleEs: 'El médico dio un diagnóstico preciso.' },
      { id: 'simptom', ru: 'симптом', translit: 'simptom', es: 'síntoma', emoji: '🔍', example: 'Симптомы появились внезапно.', exampleTranslit: 'Simptomy poyavilis vnezapno.', exampleEs: 'Los síntomas aparecieron de repente.' },
      { id: 'retsept', ru: 'рецепт', translit: 'retsept', es: 'receta médica', emoji: '📋', example: 'Врач выписал рецепт на антибиотики.', exampleTranslit: 'Vrach vypisal retsept na antibiotiki.', exampleEs: 'El médico recetó antibióticos.' },
      { id: 'khirurgiya', ru: 'хирургия', translit: 'khirurgiya', es: 'cirugía', emoji: '🔬', example: 'Хирургия прошла без осложнений.', exampleTranslit: 'Khirurgiya proshla bez oslozhneniy.', exampleEs: 'La cirugía fue sin complicaciones.' },
      { id: 'khronicheskiy', ru: 'хронический', translit: 'khronicheskiy', es: 'crónico', emoji: '📅', example: 'У него хроническое заболевание.', exampleTranslit: 'U nego khronicheskoe zabolevanie.', exampleEs: 'Él tiene una enfermedad crónica.' },
      { id: 'allergicheskiy', ru: 'аллергический', translit: 'allergicheskiy', es: 'alérgico', emoji: '🤧', example: 'У неё аллергическая реакция на пыльцу.', exampleTranslit: 'U neyo allergicheskaya reaktsiya na pyltsu.', exampleEs: 'Ella tiene reacción alérgica al polen.' },
      { id: 'vaktsinatsiya', ru: 'вакцинация', translit: 'vaktsinatsiya', es: 'vacunación', emoji: '💉', example: 'Вакцинация защищает от болезней.', exampleTranslit: 'Vaktsinatsiya zashchishchayet ot bolezney.', exampleEs: 'La vacunación protege de las enfermedades.' },
      { id: 'terapiya', ru: 'терапия', translit: 'terapiya', es: 'terapia / tratamiento', emoji: '💊', example: 'Терапия длилась несколько месяцев.', exampleTranslit: 'Terapiya dlilas neskolko mesyatsev.', exampleEs: 'La terapia duró varios meses.' },
      { id: 'immunitet', ru: 'иммунитет', translit: 'immunitet', es: 'inmunidad', emoji: '🛡️', example: 'Иммунитет помогает бороться с инфекциями.', exampleTranslit: 'Immunitet pomogayet borotsya s infektsiyami.', exampleEs: 'La inmunidad ayuda a combatir las infecciones.' },
      { id: 'vyzdorovlenie', ru: 'выздоровление', translit: 'vyzdorovlenie', es: 'recuperación', emoji: '💪', example: 'Выздоровление заняло две недели.', exampleTranslit: 'Vyzdorovlenie zanyalo dve nedeli.', exampleEs: 'La recuperación tardó dos semanas.' },
    ],
  },
  {
    id: 'ekologiya', name: 'Medio ambiente', nameRu: 'Окружающая среда (Okruzhayushchaya sreda)', icon: '🌿',
    words: [
      { id: 'zagryaznenie', ru: 'загрязнение', translit: 'zagryaznenie', es: 'contaminación', emoji: '🏭', example: 'Загрязнение воздуха — серьёзная проблема.', exampleTranslit: 'Zagryaznenie vozdukha — seryoznaya problema.', exampleEs: 'La contaminación del aire es un problema grave.' },
      { id: 'vozobnovlyaemy', ru: 'возобновляемый', translit: 'vozobnovlyaemy', es: 'renovable', emoji: '♻️', example: 'Возобновляемые источники энергии важны.', exampleTranslit: 'Vozobnovlyaemye istochniki energii vazhny.', exampleEs: 'Las fuentes de energía renovables son importantes.' },
      { id: 'vyrubka', ru: 'вырубка леса', translit: 'vyrubka lesa', es: 'deforestación / tala de bosques', emoji: '🌲', example: 'Вырубка леса уничтожает экосистемы.', exampleTranslit: 'Vyrubka lesa unichtozhayet ekosistemy.', exampleEs: 'La deforestación destruye ecosistemas.' },
      { id: 'vybros', ru: 'выброс', translit: 'vybros', es: 'emisión (de gases)', emoji: '💨', example: 'Выбросы CO₂ растут каждый год.', exampleTranslit: 'Vybrosy CO₂ rastut kazhdyy god.', exampleEs: 'Las emisiones de CO₂ crecen cada año.' },
      { id: 'bioraznoobrazie', ru: 'биоразнообразие', translit: 'bioraznoobrazie', es: 'biodiversidad', emoji: '🦋', example: 'Биоразнообразие планеты под угрозой.', exampleTranslit: 'Bioraznoobrazie planety pod ugrozoy.', exampleEs: 'La biodiversidad del planeta está amenazada.' },
      { id: 'ustoychivy', ru: 'устойчивый', translit: 'ustoychivy', es: 'sostenible', emoji: '🌱', example: 'Устойчивое развитие — цель компании.', exampleTranslit: 'Ustoychivoe razvitie — tsel kompanii.', exampleEs: 'El desarrollo sostenible es el objetivo de la empresa.' },
      { id: 'sreda_obitaniya', ru: 'среда обитания', translit: 'sreda obitaniya', es: 'hábitat', emoji: '🐾', example: 'Среда обитания животных разрушается.', exampleTranslit: 'Sreda obitaniya zhivotnykh razrushaetsya.', exampleEs: 'El hábitat de los animales se destruye.' },
      { id: 'zasukha', ru: 'засуха', translit: 'zasukha', es: 'sequía', emoji: '🌵', example: 'Засуха уничтожила урожай.', exampleTranslit: 'Zasukha unichtozhila urozhay.', exampleEs: 'La sequía destruyó la cosecha.' },
      { id: 'okhrana', ru: 'охрана природы', translit: 'okhrana prirody', es: 'conservación de la naturaleza', emoji: '🌍', example: 'Охрана природы — задача каждого.', exampleTranslit: 'Okhrana prirody — zadacha kazhdogo.', exampleEs: 'La conservación de la naturaleza es tarea de todos.' },
      { id: 'pererabatyvat', ru: 'перерабатывать', translit: 'pererabatyvat', es: 'reciclar', emoji: '♻️', example: 'Нужно перерабатывать пластик и стекло.', exampleTranslit: 'Nuzhno pererabatyvat plastik i steklo.', exampleEs: 'Hay que reciclar el plástico y el vidrio.' },
    ],
  },
  {
    id: 'puteshestviya', name: 'Viajes', nameRu: 'Путешествия (Puteshestviya)', icon: '✈️',
    words: [
      { id: 'marshrut', ru: 'маршрут', translit: 'marshrut', es: 'ruta / itinerario', emoji: '🗺️', example: 'Маршрут поездки был очень интересным.', exampleTranslit: 'Marshrut poyezdki byl ochen interesnym.', exampleEs: 'El itinerario del viaje fue muy interesante.' },
      { id: 'zhilyo', ru: 'жильё', translit: 'zhilyo', es: 'alojamiento', emoji: '🏨', example: 'Мы нашли жильё в центре города.', exampleTranslit: 'My nashli zhilyo v tsentre goroda.', exampleEs: 'Encontramos alojamiento en el centro de la ciudad.' },
      { id: 'valyuta', ru: 'валюта', translit: 'valyuta', es: 'divisa / moneda extranjera', emoji: '💱', example: 'Нужно обменять валюту перед поездкой.', exampleTranslit: 'Nuzhno obmenyat valyutu pered poyezdkoy.', exampleEs: 'Hay que cambiar divisas antes del viaje.' },
      { id: 'nasledie', ru: 'культурное наследие', translit: 'kulturnoe nasledie', es: 'patrimonio cultural', emoji: '🏛️', example: 'Кремль — часть культурного наследия России.', exampleTranslit: 'Kreml — chast kulturnogo naslediya Rossii.', exampleEs: 'El Kremlin es parte del patrimonio cultural de Rusia.' },
      { id: 'obychai', ru: 'обычаи', translit: 'obychai', es: 'costumbres / tradiciones', emoji: '🎎', example: 'У каждого народа свои обычаи.', exampleTranslit: 'U kazhdogo naroda svoi obychai.', exampleEs: 'Cada pueblo tiene sus propias costumbres.' },
      { id: 'granitsa', ru: 'граница', translit: 'granitsa', es: 'frontera', emoji: '🛃', example: 'На границе нужно показать паспорт.', exampleTranslit: 'Na granitse nuzhno pokazat pasport.', exampleEs: 'En la frontera hay que mostrar el pasaporte.' },
      { id: 'suvenir', ru: 'сувенир', translit: 'suvenir', es: 'recuerdo / souvenir', emoji: '🎁', example: 'Она купила сувенир для мамы.', exampleTranslit: 'Ona kupila suvenir dlya mamy.', exampleEs: 'Ella compró un recuerdo para su mamá.' },
      { id: 'ekspeditsiya', ru: 'экспедиция', translit: 'ekspeditsiya', es: 'expedición', emoji: '🧭', example: 'Экспедиция в Сибирь длилась месяц.', exampleTranslit: 'Ekspeditsiya v Sibir dlilas mesyats.', exampleEs: 'La expedición a Siberia duró un mes.' },
      { id: 'tourist', ru: 'турист', translit: 'tourist', es: 'turista', emoji: '📸', example: 'Туристы фотографировали Красную площадь.', exampleTranslit: 'Turisty fotografirovali Krasnuyu ploshchad.', exampleEs: 'Los turistas fotografiaron la Plaza Roja.' },
      { id: 'dostoprimechatelnost', ru: 'достопримечательность', translit: 'dostoprimechatelnost', es: 'lugar de interés / atracción turística', emoji: '🗼', example: 'Эрмитаж — главная достопримечательность Петербурга.', exampleTranslit: 'Ermitazh — glavnaya dostoprimechatelnost Peterburga.', exampleEs: 'El Hermitage es el principal atractivo de Petersburgo.' },
    ],
  },
  {
    id: 'obshchestvo', name: 'Sociedad', nameRu: 'Общество (Obshchestvo)', icon: '🌐',
    words: [
      { id: 'bednost', ru: 'бедность', translit: 'bednost', es: 'pobreza', emoji: '📉', example: 'Бедность — глобальная проблема.', exampleTranslit: 'Bednost — globalnaya problema.', exampleEs: 'La pobreza es un problema global.' },
      { id: 'neravenstvo', ru: 'неравенство', translit: 'neravenstvo', es: 'desigualdad', emoji: '⚖️', example: 'Неравенство доходов растёт в мире.', exampleTranslit: 'Neravenstvo dokhodov rastyot v mire.', exampleEs: 'La desigualdad de ingresos crece en el mundo.' },
      { id: 'diskriminatsiya', ru: 'дискриминация', translit: 'diskriminatsiya', es: 'discriminación', emoji: '🚫', example: 'Дискриминация по полу незаконна.', exampleTranslit: 'Diskriminatsiya po polu nezakonna.', exampleEs: 'La discriminación por género es ilegal.' },
      { id: 'bezhenets', ru: 'беженец', translit: 'bezhenets', es: 'refugiado', emoji: '🏳️', example: 'Беженцы ищут убежище в других странах.', exampleTranslit: 'Bezhentsy ishchut ubezhishche v drugikh stranakh.', exampleEs: 'Los refugiados buscan asilo en otros países.' },
      { id: 'blagotvoritelnost', ru: 'благотворительность', translit: 'blagotvoritelnost', es: 'caridad / filantropía', emoji: '❤️', example: 'Он занимается благотворительностью.', exampleTranslit: 'On zanimaetsya blagotvoritelnostyu.', exampleEs: 'Él se dedica a la caridad.' },
      { id: 'volonter', ru: 'волонтёр', translit: 'volonter', es: 'voluntario', emoji: '🙋', example: 'Волонтёры помогли организовать мероприятие.', exampleTranslit: 'Volontyory pomogli organizovat meropriyatie.', exampleEs: 'Los voluntarios ayudaron a organizar el evento.' },
      { id: 'kampaniya', ru: 'кампания', translit: 'kampaniya', es: 'campaña', emoji: '📢', example: 'Кампания по защите прав человека началась.', exampleTranslit: 'Kampaniya po zashchite prav cheloveka nachalas.', exampleEs: 'La campaña de derechos humanos comenzó.' },
      { id: 'osvedomlyonnost', ru: 'осведомлённость', translit: 'osvedomlyonnost', es: 'concienciación / conocimiento', emoji: '💡', example: 'Осведомлённость о проблеме растёт.', exampleTranslit: 'Osvedomlyonnost o probleme rastyot.', exampleEs: 'La concienciación sobre el problema crece.' },
      { id: 'protest', ru: 'протест', translit: 'protest', es: 'protesta', emoji: '✊', example: 'Протест прошёл мирно.', exampleTranslit: 'Protest proshol mirno.', exampleEs: 'La protesta transcurrió pacíficamente.' },
      { id: 'soobshchestvo', ru: 'сообщество', translit: 'soobshchestvo', es: 'comunidad', emoji: '🤝', example: 'Местное сообщество объединилось.', exampleTranslit: 'Mestnoe soobshchestvo obediniloss.', exampleEs: 'La comunidad local se unió.' },
    ],
  },
  {
    id: 'obrazovanie', name: 'Educación', nameRu: 'Образование (Obrazovanie)', icon: '🎓',
    words: [
      { id: 'programma', ru: 'учебная программа', translit: 'uchebnaya programma', es: 'plan de estudios / currículo', emoji: '📚', example: 'Учебная программа изменилась в этом году.', exampleTranslit: 'Uchebnaya programma izmenilas v etom godu.', exampleEs: 'El plan de estudios cambió este año.' },
      { id: 'stipendiya', ru: 'стипендия', translit: 'stipendiya', es: 'beca / estipendio', emoji: '🏆', example: 'Она получила стипендию на обучение.', exampleTranslit: 'Ona poluchila stipendiyu na obuchenie.', exampleEs: 'Ella obtuvo una beca para estudiar.' },
      { id: 'plata', ru: 'плата за обучение', translit: 'plata za obuchenie', es: 'matrícula / pago por estudios', emoji: '💳', example: 'Плата за обучение в университете высокая.', exampleTranslit: 'Plata za obuchenie v universitete vysokaya.', exampleEs: 'La matrícula universitaria es alta.' },
      { id: 'dissertatsiya', ru: 'диссертация', translit: 'dissertatsiya', es: 'disertación / tesis', emoji: '📝', example: 'Он написал диссертацию по лингвистике.', exampleTranslit: 'On napisal dissertatsiyu po lingvistike.', exampleEs: 'Escribió su tesis sobre lingüística.' },
      { id: 'issledovanie', ru: 'исследование', translit: 'issledovanie', es: 'investigación', emoji: '🔬', example: 'Исследование заняло три года.', exampleTranslit: 'Issledovanie zanyalo tri goda.', exampleEs: 'La investigación tardó tres años.' },
      { id: 'diplomirovanny', ru: 'дипломированный', translit: 'diplomirovanny', es: 'titulado / graduado', emoji: '🎓', example: 'Он дипломированный инженер.', exampleTranslit: 'On diplomirovanny inzhener.', exampleEs: 'Es un ingeniero titulado.' },
      { id: 'akademichesky', ru: 'академический', translit: 'akademichesky', es: 'académico', emoji: '🏫', example: 'Академический год начинается в сентябре.', exampleTranslit: 'Akademichesky god nachinaetsya v sentyabre.', exampleEs: 'El año académico comienza en septiembre.' },
      { id: 'distsiplina', ru: 'дисциплина', translit: 'distsiplina', es: 'asignatura / disciplina', emoji: '📐', example: 'Какая у тебя любимая дисциплина?', exampleTranslit: 'Kakaya u tebya lyubimaya distsiplina?', exampleEs: '¿Cuál es tu asignatura favorita?' },
      { id: 'lektsiya', ru: 'лекция', translit: 'lektsiya', es: 'conferencia / clase magistral', emoji: '🎤', example: 'Лекция профессора была очень интересной.', exampleTranslit: 'Lektsiya professora byla ochen interesnoy.', exampleEs: 'La conferencia del profesor fue muy interesante.' },
      { id: 'semestr', ru: 'семестр', translit: 'semestr', es: 'semestre', emoji: '📅', example: 'Первый семестр заканчивается в январе.', exampleTranslit: 'Pervy semestr zakanchivaetsya v yanvare.', exampleEs: 'El primer semestre termina en enero.' },
    ],
  },
  {
    id: 'emotsii', name: 'Emociones', nameRu: 'Эмоции (Emotsii)', icon: '💭',
    words: [
      { id: 'trevozny', ru: 'тревожный', translit: 'trevozny', es: 'ansioso / preocupado', emoji: '😰', example: 'Он был тревожным перед экзаменом.', exampleTranslit: 'On byl trevozhnым pered ekzamenom.', exampleEs: 'Estaba ansioso antes del examen.' },
      { id: 'revnivy', ru: 'ревнивый', translit: 'revnivy', es: 'celoso', emoji: '😤', example: 'Ревнивый характер мешает отношениям.', exampleTranslit: 'Revnivy kharakter meshayet otnosheniyam.', exampleEs: 'Un carácter celoso perjudica las relaciones.' },
      { id: 'blagodarny', ru: 'благодарный', translit: 'blagodarny', es: 'agradecido / reconocido', emoji: '🙏', example: 'Я очень благодарен за помощь.', exampleTranslit: 'Ya ochen blagodaren za pomoshch.', exampleEs: 'Estoy muy agradecido por la ayuda.' },
      { id: 'razocharovanny', ru: 'разочарованный', translit: 'razocharovanny', es: 'decepcionado', emoji: '😔', example: 'Она была разочарована результатом.', exampleTranslit: 'Ona byla razocharovana rezultatom.', exampleEs: 'Ella estaba decepcionada con el resultado.' },
      { id: 'uverenny', ru: 'уверенный', translit: 'uverenny', es: 'seguro / confiado', emoji: '😎', example: 'Он уверенно ответил на вопросы.', exampleTranslit: 'On uverenno otvetil na voprosy.', exampleEs: 'Respondió las preguntas con seguridad.' },
      { id: 'sochuvstvuyushchy', ru: 'сочувствующий', translit: 'sochuvstvuyushchy', es: 'empático / comprensivo', emoji: '🤗', example: 'Она сочувствующий и добрый человек.', exampleTranslit: 'Ona sochuvstvuyushchy i dobry chelovek.', exampleEs: 'Es una persona empática y buena.' },
      { id: 'loyalny', ru: 'лояльный', translit: 'loyalny', es: 'leal / fiel', emoji: '🤝', example: 'Лояльный сотрудник — ценный актив.', exampleTranslit: 'Loyalny sotrudnik — tsenny aktiv.', exampleEs: 'Un empleado leal es un activo valioso.' },
      { id: 'obidchivy', ru: 'обидчивый', translit: 'obidchivy', es: 'susceptible / sensible (fácil de ofender)', emoji: '😢', example: 'Он очень обидчивый, осторожно!', exampleTranslit: 'On ochen obidchivy, ostorozhno!', exampleEs: '¡Es muy susceptible, ten cuidado!' },
      { id: 'nezhny', ru: 'нежный', translit: 'nezhny', es: 'tierno / cariñoso', emoji: '💕', example: 'Она нежная и внимательная мама.', exampleTranslit: 'Ona nezhnaya i vnimatelny mama.', exampleEs: 'Es una mamá tierna y atenta.' },
      { id: 'optimistichny', ru: 'оптимистичный', translit: 'optimistichny', es: 'optimista', emoji: '😊', example: 'Оптимистичный взгляд помогает в жизни.', exampleTranslit: 'Optimistichny vzglyad pomogayet v zhizni.', exampleEs: 'Una perspectiva optimista ayuda en la vida.' },
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
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{w.ru}</div>
            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.translit}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.ru} · {w.translit}</div>
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
  const distractors = shuffle(shuffled.filter(x => x.ru !== w.ru)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink)' }}>{w.ru}</div>
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
  const isCorrect = input.trim().toLowerCase() === w.translit.toLowerCase() || input.trim() === w.ru;

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
            {isCorrect ? '✅ ¡Correcto!' : `✗ Respuesta: ${w.ru} (${w.translit})`}
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

export default function VocabularioRusoB1() {
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
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Словарь B1</button>
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
              <div key={w.id} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{w.emoji} {w.ru}</div>
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
          <Link href="/practica/ruso/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Словарь</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Словарь · Ruso B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario B1</h1>
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
