import { createStructureQuest, type FinalRow, type StructureSeed } from './create-structure-quest.ts'

// Contenido heredado. La ruta pública usa russian-structure-quest-config.ts y bancos editoriales auditados.

export const RUSSIAN_FORMS = [
  { id: 'present-imperfective', label: 'Настоящее время', group: 'Время' },
  { id: 'past-imperfective', label: 'Прошедшее: процесс / фон', group: 'Время и вид' },
  { id: 'past-perfective', label: 'Прошедшее: результат', group: 'Время и вид' },
  { id: 'future-imperfective', label: 'Будущее: процесс', group: 'Время и вид' },
  { id: 'future-perfective', label: 'Будущее: результат', group: 'Время и вид' },
  { id: 'conditional-present', label: 'Условное: настоящее', group: 'Условность' },
  { id: 'conditional-past', label: 'Условное: прошлое', group: 'Условность' },
  { id: 'imperative-imperfective', label: 'Императив: процесс', group: 'Побуждение' },
  { id: 'imperative-perfective', label: 'Императив: результат', group: 'Побуждение' },
  { id: 'infinitive-aspect', label: 'Вид после фазовых глаголов', group: 'Вид' },
] as const

export type RussianFormId = (typeof RUSSIAN_FORMS)[number]['id']

const SEEDS: StructureSeed<RussianFormId>[] = [
  { id: 'present-imperfective', explanation: 'В настоящем времени употребляется несовершенный вид: привычка, процесс или расписание.', examples: [
    { context: 'Каждое утро Анна ___ новости.', answer: 'читает', wrong: 'прочитает', lemma: 'читать', cue: 'регулярное действие', distractors: ['прочитала', 'читала', 'будет читать'] },
    { context: 'Сейчас мы ___ новый проект.', answer: 'обсуждаем', wrong: 'обсудим', lemma: 'обсуждать', cue: 'процесс сейчас', distractors: ['обсудили', 'обсуждали', 'будем обсуждать'] },
    { context: 'Поезд ___ завтра в семь утра.', answer: 'отправляется', wrong: 'отправляюсь', lemma: 'отправляться', cue: 'расписание', distractors: ['отправился', 'отправлялся', 'будет отправляться'] },
  ] },
  { id: 'past-imperfective', explanation: 'Несовершенный вид в прошлом описывает процесс, фон или повторяющееся действие без фокуса на результате.', examples: [
    { context: 'В детстве Сергей часто ___ во дворе.', answer: 'играл', wrong: 'сыграл', lemma: 'играть', cue: 'повторяющаяся привычка', distractors: ['играет', 'будет играть', 'сыграет'] },
    { context: 'В восемь часов они ещё ___.', answer: 'ужинали', wrong: 'поужинали', lemma: 'ужинать', cue: 'процесс в определённый момент', distractors: ['ужинают', 'будут ужинать', 'поужинают'] },
    { context: 'Весь вечер ___ снег.', answer: 'шёл', accepted: ['шел'], wrong: 'пошёл', lemma: 'идти (о снеге)', cue: 'длительный фон', distractors: ['идёт', 'будет идти', 'пойдёт'] },
  ] },
  { id: 'past-perfective', explanation: 'Совершенный вид в прошлом выделяет завершение, результат или одно последовательное событие.', examples: [
    { context: 'Вчера Олег ___ письмо и отправил его.', answer: 'написал', wrong: 'писал', lemma: 'написать', cue: 'завершённый результат', distractors: ['пишет', 'будет писать', 'напишет'] },
    { context: 'Наконец Марина ___ ключи.', answer: 'нашла', wrong: 'искала', lemma: 'найти', cue: 'достигнутый результат', distractors: ['находит', 'будет искать', 'найдёт'] },
    { context: 'Мы ___ дверь и ушли.', answer: 'закрыли', wrong: 'закрывали', lemma: 'закрыть', cue: 'последовательное завершённое действие', distractors: ['закрываем', 'будем закрывать', 'закроем'] },
  ] },
  { id: 'future-imperfective', explanation: 'Буду/будешь/будут + инфинитив несовершенного вида показывает будущий процесс или повторение.', examples: [
    { context: 'Завтра весь день я ___.', answer: 'буду работать', wrong: 'буду поработать', lemma: 'работать', cue: 'длительный будущий процесс', distractors: ['работал', 'поработал', 'поработаю'] },
    { context: 'В семь часов они ___.', answer: 'будут ужинать', wrong: 'будет ужинать', lemma: 'ужинать', cue: 'процесс в будущем моменте', distractors: ['ужинали', 'поужинали', 'поужинают'] },
    { context: 'На следующей неделе мы ___ бюджет каждый день.', answer: 'будем обсуждать', wrong: 'обсудим', lemma: 'обсуждать', cue: 'повторение в будущем', distractors: ['обсуждали', 'обсудили', 'обсуждаем'] },
  ] },
  { id: 'future-perfective', explanation: 'Глагол совершенного вида в форме настоящего имеет будущее значение и направлен на результат.', examples: [
    { context: 'После встречи я тебе ___.', answer: 'позвоню', wrong: 'звоню', lemma: 'позвонить', cue: 'одно завершённое будущее действие', distractors: ['звонил', 'буду звонить', 'позвонил'] },
    { context: 'К пятнице команда ___ отчёт.', answer: 'закончит', wrong: 'будет заканчивать', lemma: 'закончить', cue: 'результат к сроку', distractors: ['заканчивала', 'закончила', 'заканчивает'] },
    { context: 'Скоро поезд ___.', answer: 'отправится', wrong: 'отправляется', lemma: 'отправиться', cue: 'предстоящее единичное событие', distractors: ['отправился', 'отправлялся', 'будет отправляться'] },
  ] },
  { id: 'conditional-present', explanation: 'Частица бы с формой прошедшего времени выражает нереальную или желаемую ситуацию сейчас.', examples: [
    { context: 'Сейчас Анна ___ в отпуск, если бы могла.', answer: 'поехала бы', wrong: 'поедет', lemma: 'поехать', cue: 'нереальное желание сейчас', distractors: ['ехала', 'ездила', 'будет ездить'] },
    { context: 'На твоём месте мы ___ это предложение.', answer: 'приняли бы', wrong: 'примем', lemma: 'принять', cue: 'гипотетический совет', distractors: ['принимали', 'приняли', 'будем принимать'] },
    { context: 'Без дождя дети ___ во дворе.', answer: 'играли бы', wrong: 'сыграли', lemma: 'играть', cue: 'воображаемый результат сейчас', distractors: ['играют', 'играли', 'будут играть'] },
  ] },
  { id: 'conditional-past', explanation: 'Та же конструкция с бы получает контрфактическое прошлое из контекста: событие уже не состоялось.', examples: [
    { context: 'Вчера мы ___ на поезд, если бы вышли раньше.', answer: 'успели бы', wrong: 'успеем', lemma: 'успеть', cue: 'несостоявшийся результат вчера', distractors: ['успевали', 'успели', 'будем успевать'] },
    { context: 'Без той ошибки она ___ экзамен в прошлом году.', answer: 'сдала бы', wrong: 'сдаст', lemma: 'сдать', cue: 'контрфактическое прошлое', distractors: ['сдавала', 'сдала', 'будет сдавать'] },
    { context: 'При хорошей погоде самолёт ___ вовремя утром.', answer: 'вылетел бы', wrong: 'вылетит', lemma: 'вылететь', cue: 'нереализованное прошлое', distractors: ['вылетал', 'вылетел', 'будет вылетать'] },
  ] },
  { id: 'imperative-imperfective', explanation: 'Императив несовершенного вида приглашает начать или продолжать процесс, повторять действие либо запрещает его.', examples: [
    { context: 'Пока ждёте врача, ___ текст внимательнее.', answer: 'Читайте', wrong: 'Прочитайте', lemma: 'читать', cue: 'процесс во время ожидания', distractors: ['Читаете', 'Читали', 'Будете читать'] },
    { context: '___ мне каждый вечер.', answer: 'Звоните', wrong: 'Позвоните', lemma: 'звонить', cue: 'повторяющаяся просьба', distractors: ['Звоните один раз', 'Звонили', 'Будете звонить'] },
    { context: '___ окно: здесь холодно.', answer: 'Не открывайте', wrong: 'Не откройте', lemma: 'не открывать', cue: 'нейтральный запрет', distractors: ['Не открываете', 'Не открывали', 'Не будете открывать'] },
  ] },
  { id: 'imperative-perfective', explanation: 'Императив совершенного вида просит получить конкретный результат один раз.', examples: [
    { context: '___ письмо до конца.', answer: 'Прочитайте', wrong: 'Читайте', lemma: 'прочитать', cue: 'конкретный результат', distractors: ['Прочитаете', 'Прочитали', 'Будете читать'] },
    { context: '___ мне завтра после обеда.', answer: 'Позвоните', wrong: 'Звоните', lemma: 'позвонить', cue: 'одно будущее действие', distractors: ['Позвоните всегда', 'Позвонили', 'Будете звонить'] },
    { context: '___ дверь перед уходом.', answer: 'Закройте', wrong: 'Закрывайте', lemma: 'закрыть', cue: 'действие до результата', distractors: ['Закрываете', 'Закрыли', 'Будете закрывать'] },
  ] },
  { id: 'infinitive-aspect', explanation: 'Начать/продолжать требуют процесса, а успеть подчёркивает достигнутый результат: вид инфинитива меняет смысл.', examples: [
    { context: 'Он начал ___ новую книгу.', answer: 'читать', wrong: 'прочитать', lemma: 'читать / прочитать', cue: 'начало процесса', distractors: ['читал', 'прочитал', 'прочитает'] },
    { context: 'Она успела ___ отчёт до пяти.', answer: 'закончить', wrong: 'заканчивать', lemma: 'заканчивать / закончить', cue: 'успешно достигнутый результат', distractors: ['заканчивала', 'закончила', 'закончит'] },
    { context: 'После перерыва мы продолжили ___ вопрос.', answer: 'обсуждать', wrong: 'обсудить', lemma: 'обсуждать / обсудить', cue: 'продолжение процесса', distractors: ['обсуждали', 'обсудили', 'обсудим'] },
  ] },
]

const FINAL_ROWS: FinalRow<RussianFormId>[] = [
  { formId: 'present-imperfective', lemma: 'руководить', before: 'Сейчас Ирина ', after: ' небольшой редакцией. ', answer: 'руководит' },
  { formId: 'past-imperfective', lemma: 'готовить', before: 'Вчера весь день она ', after: ' новый выпуск. ', answer: 'готовила' },
  { formId: 'past-perfective', lemma: 'найти', before: 'Вечером Ирина ', after: ' важную ошибку. ', answer: 'нашла' },
  { formId: 'future-imperfective', lemma: 'проверять', before: 'Завтра команда ', after: ' все страницы. ', answer: 'будет проверять' },
  { formId: 'future-perfective', lemma: 'исправить', before: 'До полудня дизайнер ', after: ' макет. ', answer: 'исправит' },
  { formId: 'conditional-present', lemma: 'нанять', before: 'При большем бюджете Ирина ', after: ' ещё одного редактора. ', answer: 'наняла бы' },
  { formId: 'conditional-past', lemma: 'заметить', before: 'Без её проверки никто не ', after: ' ошибку вчера. ', answer: 'заметил бы' },
  { formId: 'imperative-imperfective', lemma: 'читать', before: 'Она говорит стажёрам: «', after: ' текст медленно». ', answer: 'Читайте' },
  { formId: 'imperative-perfective', lemma: 'проверить', before: 'Затем добавляет: «', after: ' все даты». ', answer: 'Проверьте' },
  { formId: 'infinitive-aspect', lemma: 'обсуждать', before: 'После обеда команда продолжит ', after: ' заголовок.', answer: 'обсуждать' },
]

export const RUSSIAN_STRUCTURE_QUEST = createStructureQuest({
  id: 'russian-structure-quest', storageKey: 'wl-russian-structure-quest-v2', forms: RUSSIAN_FORMS,
  presets: [
    { label: 'Время и вид', ids: RUSSIAN_FORMS.filter((form) => form.group.includes('Время')).map((form) => form.id) },
    { label: 'Условность', ids: RUSSIAN_FORMS.filter((form) => form.group === 'Условность').map((form) => form.id) },
    { label: 'Побуждение', ids: RUSSIAN_FORMS.filter((form) => form.group === 'Побуждение').map((form) => form.id) },
  ], seeds: SEEDS, finalRows: FINAL_ROWS,
  copy: {
    languageName: 'Ruso', languageCode: 'ru', eyebrow: 'Quiz de tiempo, aspecto y modalidad · A2–B1', title: 'Мастерская вида',
    lead: 'Practica la decisión central del ruso: no solo cuándo ocurre la acción, sino si miras su proceso o su resultado.',
    range: '10 contrastes', selectedLabel: 'контрастов выбрано', selectorTitle: '¿Qué contrastes del ruso quieres practicar?',
    selectorLead: 'El pasado y el futuro se separan por aspecto; la condición usa бы y depende del contexto temporal.',
    configuredEyebrow: 'Личный маршрут', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'Completa el nivel antes de ver las soluciones.', mapLabels: ['Раньше', 'Прошлое', 'Сейчас', 'Будущее'],
    reviewLinks: [
      { href: '/practica/ruso/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/ruso/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  }, text: { finalTitle: 'Срочный выпуск', finalExplanation: 'El relato exige distinguir proceso, resultado, futuro aspectual, contrafactualidad y órdenes según el objetivo.' },
})
