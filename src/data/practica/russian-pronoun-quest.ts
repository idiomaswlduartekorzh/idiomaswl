import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type RussianPronounTopic = 'nominative' | 'accusative' | 'dative' | 'prepositional_n' | 'possessive' | 'demonstrative' | 'reflexive' | 'relative'

const TOPICS: readonly PronounTopicOption<RussianPronounTopic>[] = [
  { id: 'nominative', label: 'Personales en nominativo', group: 'Caso', level: 'A1' },
  { id: 'accusative', label: 'Personales en acusativo', group: 'Caso', level: 'A1–A2' },
  { id: 'dative', label: 'Personales en dativo', group: 'Caso', level: 'A2' },
  { id: 'prepositional_n', label: 'Formas con н- tras preposición', group: 'Caso', level: 'A2' },
  { id: 'possessive', label: 'Posesivos y свой', group: 'Concordancia', level: 'A2' },
  { id: 'demonstrative', label: 'Demostrativos', group: 'Referencia', level: 'A1–A2' },
  { id: 'reflexive', label: 'Reflexivo себя', group: 'Referencia', level: 'A2' },
  { id: 'relative', label: 'Relativo который', group: 'Conexión', level: 'A2–B1' },
]

const PRESETS: readonly PronounPreset<RussianPronounTopic>[] = [
  { label: 'Casos base', ids: ['nominative', 'accusative', 'dative'] },
  { label: 'Preposición y referencia', ids: ['prepositional_n', 'reflexive'] },
  { label: 'Concordancia', ids: ['possessive', 'demonstrative', 'relative'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({ id: 'nominative', explanation: 'Я, ты, он/она/оно, мы, вы y они marcan el sujeto. Вы también sirve como tratamiento formal y puede escribirse Вы en correspondencia personal.', functionAnswer: 'sujeto en nominativo', functionDistractors: ['objeto en acusativo', 'objeto en dativo', 'posesivo'], examples: [
    { context: 'Анна работает здесь. ___ встречает гостей.', answer: 'Она', distractors: ['Её', 'Ей', 'Они'], cue: 'Анна es singular femenina y realiza la acción.', wrong: 'Её', transform: ['Sustituye «Павел и я».', 'Мы готовим зал.', ['Нас готовим зал.', 'Они готовим зал.', 'Мы готовит зал.']] },
    { context: 'Господин Иванов, ___ готовы?', answer: 'вы', distractors: ['вас', 'вам', 'ваш'], cue: 'Se habla formalmente con una persona y el pronombre es sujeto.', wrong: 'вас', transform: ['Sustituye «письмо».', 'Оно лежит на столе.', ['Его лежит на столе.', 'Он лежит на столе.', 'Ему лежит на столе.']] },
    { context: 'Ключи уже здесь. ___ лежат у окна.', answer: 'Они', distractors: ['Их', 'Им', 'Она'], cue: 'Ключи es plural y sujeto.', wrong: 'Их', transform: ['Sustituye «Мария и Ольга».', 'Они знают адрес.', ['Она знают адрес.', 'Их знают адрес.', 'Они знает адрес.']] },
  ], final: { before: 'Анна знает программу, поэтому ', after: ' встречает гостей. ', answer: 'она' } }),
  authorPronounSeed({ id: 'accusative', explanation: 'Меня, тебя, его, её, нас, вас e их aparecen como objeto directo. Его, её e их no cambian de forma entre genitivo y acusativo.', functionAnswer: 'objeto directo en acusativo', functionDistractors: ['sujeto en nominativo', 'objeto en dativo', 'posesivo'], examples: [
    { context: 'Где Павел? Я вижу ___ у входа.', answer: 'его', distractors: ['он', 'ему', 'него'], cue: 'Павел es masculino animado y recibe la acción видеть.', wrong: 'он', transform: ['Sustituye «Анну».', 'Я встретил её утром.', ['Я встретил она утром.', 'Я встретил ей утром.', 'Я её встретила Анну утром.']] },
    { context: 'Документы готовы. Я проверю ___ вечером.', answer: 'их', distractors: ['они', 'им', 'свои'], cue: 'Документы es plural y objeto directo.', wrong: 'они', transform: ['Sustituye «меня и Максима».', 'Нас ждут в зале.', ['Мы ждут в зале.', 'Нам ждут в зале.', 'Нас ждём в зале.']] },
    { context: 'Ты знаешь эту женщину? — Да, я знаю ___.', answer: 'её', distractors: ['она', 'ей', 'её книга'], cue: 'El referente femenino es objeto directo de знать.', wrong: 'она', transform: ['Sustituye «вас» formal en una oración.', 'Директор приглашает вас.', ['Директор приглашает вы.', 'Директор приглашает вам.', 'Директор вас приглашаете.']] },
  ], final: { before: 'Волонтёры уже пришли; встреть ', after: ' у входа. ', answer: 'их' } }),
  authorPronounSeed({ id: 'dative', explanation: 'Мне, тебе, ему, ей, нам, вам e им expresan destinatario o experimentante y aparecen con verbos como помогать, звонить y нравиться.', functionAnswer: 'objeto o experimentante en dativo', functionDistractors: ['objeto en acusativo', 'sujeto', 'posesivo'], examples: [
    { context: 'Я звоню Марине и объясняю ___ план.', answer: 'ей', distractors: ['её', 'она', 'ему'], cue: 'Марина es destinataria singular.', wrong: 'её', transform: ['Sustituye «гостям».', 'Мы показываем им зал.', ['Мы показываем их зал.', 'Мы им показывают зал.', 'Мы показываем они зал.']] },
    { context: 'Ты можешь ___ помочь?', answer: 'мне', distractors: ['меня', 'я', 'мой'], cue: 'Помогать rige dativo y quien habla recibe la ayuda.', wrong: 'меня', transform: ['Sustituye «Павлу».', 'Этот билет нужен ему.', ['Этот билет нужен его.', 'Этот билет нужен он.', 'Этот билет ему нужны.']] },
    { context: 'Детям нравится музыка; ___ весело.', answer: 'им', distractors: ['их', 'они', 'ими'], cue: 'El estado impersonal se atribuye a varias personas en dativo.', wrong: 'они', transform: ['Sustituye «нам».', 'Менеджер прислал нам адрес.', ['Менеджер прислал нас адрес.', 'Менеджер прислал мы адрес.', 'Менеджер нам прислали адрес.']] },
  ], final: { before: 'Гостям нужна схема; мы даём ', after: ' копию. ', answer: 'им' } }),
  authorPronounSeed({ id: 'prepositional_n', explanation: 'Las formas de tercera persona suelen añadir н- después de preposición: у него, к ней, с ними, о них. No se añade tras preposiciones derivadas como благодаря.', functionAnswer: 'forma de tercera persona tras preposición', functionDistractors: ['forma sin preposición', 'sujeto nominativo', 'posesivo'], examples: [
    { context: 'Павел уже здесь; я говорю с ___.', answer: 'ним', distractors: ['им', 'его', 'он'], cue: 'Tras с instrumental, он toma la forma ним.', wrong: 'им', transform: ['Sustituye «Анна» después de к.', 'Я подхожу к ней.', ['Я подхожу к ей.', 'Я подхожу к её.', 'Я подхожу ней.']] },
    { context: 'Это наши коллеги; мы ждём ответа от ___.', answer: 'них', distractors: ['их', 'ими', 'они'], cue: 'От rige genitivo y activa н- en tercera persona plural.', wrong: 'их', transform: ['Sustituye «он» después de у.', 'У него есть ключ.', ['У его есть ключ.', 'У нему есть ключ.', 'Него есть у ключ.']] },
    { context: 'Мария — эксперт; благодаря ___ проект готов.', answer: 'ей', distractors: ['ней', 'её', 'она'], cue: 'Благодаря es una preposición derivada: aquí no se añade н-.', wrong: 'ней', transform: ['Usa о con pronombre plural.', 'Мы говорим о них.', ['Мы говорим о их.', 'Мы говорим об ими.', 'Мы о них говорите.']] },
  ], final: { before: 'Техник уже в зале; я обсуждаю детали с ', after: '. ', answer: 'ним' } }),
  authorPronounSeed({ id: 'possessive', explanation: 'Мой, твой, наш y ваш concuerdan con lo poseído. Его, её e их son invariables. Свой remite al sujeto de la oración.', functionAnswer: 'posesivo vinculado al poseedor y al caso', functionDistractors: ['objeto directo', 'pronombre personal sujeto', 'demostrativo'], examples: [
    { context: 'Анна проверяет ___ список.', answer: 'свой', distractors: ['её', 'своя', 'свою'], cue: 'La lista pertenece al sujeto Анна; список es masculino acusativo.', wrong: 'её', transform: ['Cambia lo poseído a femenino.', 'Анна проверяет свою почту.', ['Анна проверяет свой почту.', 'Анна проверяет своей почту.', 'Анна проверяет её свою почту.']] },
    { context: 'Мы уже распечатали ___ билеты.', answer: 'наши', distractors: ['наш', 'наших', 'свой'], cue: 'Билеты es plural acusativo inanimado y el poseedor es мы.', wrong: 'наш', transform: ['Usa el posesivo invariable de ella.', 'Её документы на столе.', ['Ея документы на столе.', 'Её документами на столе.', 'Она документы на столе.']] },
    { context: 'Я говорю с ___ новым коллегой.', answer: 'моим', distractors: ['мой', 'моего', 'моя'], cue: 'С rige instrumental; коллегой es singular.', wrong: 'мой', transform: ['Usa свой con sujeto plural.', 'Они знают свои роли.', ['Они знают их роли свои.', 'Они знает свои роли.', 'Они знают свой роли.']] },
  ], final: { before: 'Каждый волонтёр проверяет ', after: ' список перед началом. ', answer: 'свой' } }),
  authorPronounSeed({ id: 'demonstrative', explanation: 'Этот y тот se declinan como adjetivos y concuerdan en género, número y caso con el sustantivo o referente.', functionAnswer: 'demostrativo declinado por caso', functionDistractors: ['pronombre personal', 'posesivo', 'relativo'], examples: [
    { context: 'Я беру ___ папку, которая рядом.', answer: 'эту', distractors: ['эта', 'этой', 'этот'], cue: 'Папка es femenino singular y objeto acusativo.', wrong: 'эта', transform: ['Señala un objeto neutro cercano.', 'Это письмо уже готово.', ['Этот письмо уже готово.', 'Эта письмо уже готово.', 'Эти письмо уже готово.']] },
    { context: 'Мы работаем с ___ устройством.', answer: 'этим', distractors: ['это', 'этого', 'этому'], cue: 'С rige instrumental y устройство es neutro.', wrong: 'это', transform: ['Señala varios documentos lejanos.', 'Те документы уже подписаны.', ['Тот документы уже подписаны.', 'Та документы уже подписаны.', 'Те документ уже подписан.']] },
    { context: 'Из двух столов я выберу ___.', answer: 'тот', distractors: ['того', 'тому', 'те'], cue: 'El demostrativo sustituye стол como objeto inanimado masculino.', wrong: 'того', transform: ['Pon этот en preposicional femenino.', 'Мы говорим об этой идее.', ['Мы говорим об эта идее.', 'Мы говорим об эту идею.', 'Мы говорим об этом идее.']] },
  ], final: { before: 'На столе две папки; возьми ', after: ' рядом с лампой. ', answer: 'эту' } }),
  authorPronounSeed({ id: 'reflexive', explanation: 'Себя remite al sujeto y no tiene nominativo ni género. Se declina según su función: себя, себе, собой/собою.', functionAnswer: 'pronombre reflexivo себя en el caso exigido', functionDistractors: ['pronombre personal de otra persona', 'posesivo', 'demostrativo'], examples: [
    { context: 'Анна видит ___ в зеркале.', answer: 'себя', distractors: ['её', 'она', 'себе'], cue: 'Анна es sujeto y objeto de la misma acción.', wrong: 'её', transform: ['Cambia el sujeto sin cambiar el reflexivo.', 'Мы видим себя на фотографии.', ['Мы видим нас на своей фотографии.', 'Мы видим себе на фотографии.', 'Мы видит себя на фотографии.']] },
    { context: 'Он часто говорит о ___.', answer: 'себе', distractors: ['себя', 'нём', 'его'], cue: 'О rige preposicional y el referente es el propio sujeto.', wrong: 'себя', transform: ['Usa instrumental tras с.', 'Она взяла документы с собой.', ['Она взяла документы с себя.', 'Она взяла документы с ней.', 'Она с собой взял документы.']] },
    { context: 'Дети приготовили всё ___.', answer: 'сами', distractors: ['себя', 'себе', 'их'], cue: 'Сами enfatiza que los niños actuaron sin ayuda; concuerda en plural.', wrong: 'себя', transform: ['Añade énfasis femenino singular.', 'Мария сама проверила список.', ['Мария сам проверила список.', 'Мария себя проверила список.', 'Мария самой проверила список.']] },
  ], final: { before: 'Перед открытием команда проверяет ', after: ' по списку. ', answer: 'себя' } }),
  authorPronounSeed({ id: 'relative', explanation: 'Который concuerda en género y número con el antecedente, pero su caso depende de la función que cumple dentro de la oración subordinada.', functionAnswer: 'pronombre relativo который declinado', functionDistractors: ['demostrativo principal', 'posesivo', 'pronombre personal aislado'], examples: [
    { context: 'Женщина, ___ нам помогает, — дизайнер.', answer: 'которая', distractors: ['которую', 'которой', 'который'], cue: 'El antecedente es femenino y el relativo es sujeto nominativo.', wrong: 'которую', transform: ['Une con objeto masculino.', 'Вот человек, которого я знаю.', ['Вот человек, который я знаю.', 'Вот человек, которому я знаю.', 'Вот человек, его я знаю который.']] },
    { context: 'Это устройство, с ___ мы работаем.', answer: 'которым', distractors: ['которое', 'которого', 'которому'], cue: 'С exige instrumental y el antecedente es neutro.', wrong: 'которое', transform: ['Une con lugar en preposicional.', 'Это зал, в котором проходит встреча.', ['Это зал, в который проходит встреча.', 'Это зал, которого проходит встреча.', 'Это зал, в нём который проходит встреча.']] },
    { context: 'Это Анна, ___ мы отправили адрес.', answer: 'которой', distractors: ['которая', 'которую', 'которого'], cue: 'Анна es destinataria femenina en dativo.', wrong: 'которую', transform: ['Usa plural con preposición.', 'Это гости, для которых мы готовим стол.', ['Это гости, для которые мы готовим стол.', 'Это гости, которым для мы готовим стол.', 'Это гости, их мы готовим стол.']] },
  ], final: { before: 'В конце мы благодарим коллегу, ', after: ' мы отправили важные данные.', answer: 'которой' } }),
] as const

export const RUSSIAN_PRONOUN_QUEST = createPronounQuest({
  id: 'russian-pronoun-quest', storageKey: 'wl-russian-pronoun-quest-v1', languageName: 'Ruso', languageCode: 'ru', title: 'Маршрут местоимений', finalTitle: 'Одно событие — восемь ясных связей',
  reviewLinks: [{ href: '/practica/ruso/a1/gramatica', label: 'Repasar gramática A1' }, { href: '/practica/ruso/a2/gramatica', label: 'Repasar gramática A2' }],
  topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['её', 'они', 'которую'],
})
