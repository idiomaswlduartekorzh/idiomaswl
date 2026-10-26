import type { GrammarTopic } from '../types.ts'

export type RussianAdvancedPattern = { label: string; pattern: string; example: string; cue: string; key: string; warning: string }
export type RussianAdvancedCurriculumSpec = {
  slug: string; order: string; level: 'B2' | 'C1' | 'C2'; category: string; color: string; shortTitle: string
  description: string; purpose: string; register: string; formula: string; model: string
  patterns: [RussianAdvancedPattern, RussianAdvancedPattern, RussianAdvancedPattern]
}

const rotate = <T,>(items: T[], offset: number) => items.map((_, index) => items[(index + offset) % items.length])
function cloze(example: string, key: string, index: number) {
  const position = example.indexOf(key)
  if (position < 0) throw new Error(`Ключ «${key}» не найден в примере «${example}».`)
  return `${example.slice(0, position)}[[${index}]]${example.slice(position + key.length)}`
}

export function createRussianAdvancedCurriculumTopic(spec: RussianAdvancedCurriculumSpec): GrammarTopic {
  const patterns = spec.patterns
  const examples = patterns.map((item) => item.example), labels = patterns.map((item) => item.label), cues = patterns.map((item) => item.cue)
  const recognition = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length], interpret = index >= patterns.length
    return { scene: `${interpret ? 'Определение значения' : 'Выбор формы'} ${index + 1}`, lines: [['', interpret ? `Что выражает конструкция в предложении «${target.example}»?` : `Выберите предложение, которое естественнее всего выражает значение: ${target.cue}.`]] as [string, string][], options: rotate(interpret ? cues : examples, index % examples.length), answer: interpret ? target.cue : target.example, explain: `Модель «${target.label}» используется, чтобы ${target.cue}.` }
  })
  const dual = patterns.map((target, index) => ({ scene: `Форма и функция ${index + 1}`, lines: [['', `В предложении «${target.example}» модель [[0]] помогает [[1]].`]] as [string, string][], blanks: [{ options: rotate(labels, index), answer: target.label, explain: `Эта форма относится к модели «${target.label}».` }, { options: rotate(cues, index), answer: target.cue, explain: `Её коммуникативная функция — ${target.cue}.` }] }))
  const guidedBlanks = Array.from({ length: 6 }, (_, index) => { const target = patterns[index % patterns.length]; return { options: rotate(examples, index % examples.length), answer: target.example, explain: `${target.label}: ${target.pattern}` } })
  const freeItems = [...patterns.map((target, index) => ({ text: cloze(target.example, target.key, index), answer: target.key, explain: `Опорный элемент модели «${target.label}» — «${target.key}». Схема: ${target.pattern}.` })), ...patterns.slice(0, 2).map((target, index) => ({ text: `Запишите базовую схему модели «${target.label}»: [[${index + patterns.length}]].`, answer: target.pattern, explain: `Базовая схема: ${target.pattern}.` }))]

  return {
    slug: spec.slug, order: spec.order, color: spec.color, category: spec.category, level: spec.level,
    title: `${spec.shortTitle}: русская грамматика ${spec.level}`, shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} — русский ${spec.level} | урок, практика и PDF`, description: spec.description,
    lead: `${spec.description} На уроке форма, значение, синтаксическая связь, речевой регистр и авторская позиция рассматриваются как единая система выбора.`,
    outcomes: [`Распознавать основные варианты темы «${spec.shortTitle}» в реальном контексте.`, `Выбирать наиболее естественную конструкцию, чтобы ${spec.purpose}.`, 'Объяснять и исправлять ошибки в управлении, виде, порядке слов, сфере действия и регистре.', `Точно и уместно применять конструкции в таких сферах, как ${spec.register}.`],
    guide: {
      goal: `Использовать тему «${spec.shortTitle}», чтобы ${spec.purpose}, сохраняя смысл, управление и стиль. Итоговая цель — не только выбрать форму, но и объяснить свой выбор.`, model: spec.model, formula: spec.formula,
      decisions: [`Сначала определите коммуникативную задачу: ${spec.purpose}.`, 'Установите синтаксический центр, видо-временной план и требуемое падежное управление.', 'Проверьте субъект, источник информации, сферу отрицания и логические связи.', `Соотнесите конструкцию с регистром: ${spec.register}.`, 'Сравните с нейтральным вариантом и сформулируйте, какой оттенок добавляет выбранная форма.'],
      table: [['Функция', 'Модель', 'Пример'], ...patterns.map((item) => [item.label, item.pattern, item.example] as [string, string, string])], mistakes: patterns.map((item) => item.warning),
    },
    seo: [
      { heading: `${spec.shortTitle}: значение и выбор формы`, paragraphs: [spec.description, `Главная задача — ${spec.purpose}. Грамматический выбор в русском языке кодирует не только событие, но и его границы, источник знания, фокус, отношение говорящего и дистанцию с адресатом.`], examples: patterns.map((item) => [item.example, item.cue]) },
      { heading: 'Как построить конструкцию шаг за шагом', paragraphs: [`Рабочая схема темы: «${spec.formula}». Начните с предикативного центра, затем добавьте зависимые компоненты и проверьте управление каждого из них.`, `Разберите модель «${spec.model}». Важно восстанавливать русскую структуру из нужного смысла, а не переводить слово за словом.`], table: [['Решение', 'Структура', 'Контекстный пример'], ...patterns.map((item) => [item.label, item.pattern, item.example])] },
      { heading: 'Как различать близкие варианты', paragraphs: ['Формально похожие конструкции различаются видом, актуальным членением, степенью уверенности, жанром и тем, на кого возлагается ответственность за сообщение.', 'Сильный ответ называет не только правильную форму, но и изменение смысла при замене на соседний вариант. Именно это превращает правило в устойчивый навык.'], table: [['Нужный смысл', 'Предпочтительная модель'], ...patterns.map((item) => [item.cue, item.label])] },
      { heading: 'Регистр, связность и финальная редактура', paragraphs: [`Тема особенно важна в таких контекстах, как ${spec.register}. Сложная форма оправданна только тогда, когда помогает читателю точнее восстановить логику и позицию автора.`, 'Перед публикацией проверьте согласование, управление, вид, референцию местоимений, границы отрицания, пунктуацию и связь предложения с абзацем. При двусмысленности выбирайте более прозрачную формулировку.'] },
    ],
    visual: { mode: `russian-advanced-${spec.slug}`, teacherLens: 'Карта ведёт от коммуникативного намерения к синтаксической модели, смысловому контрасту и готовому высказыванию, связывая форму с функцией.', graphicPrompt: `Минималистичная инфографика по теме «${spec.shortTitle}»: цель, структура, три контраста и редакторская проверка.`, scene: patterns.map((item) => [item.example, item.cue]), learnerModes: ['Визуальный режим: увидеть связи', 'Аналитический режим: обосновать форму', 'Редакторский режим: согласовать стиль и контекст'], practiceVerbs: ['Распознать', 'Сопоставить', 'Построить', 'Преобразовать', 'Отредактировать', 'Создать'], reviewFocus: ['Коммуникативная цель', 'Форма и управление', 'Смысловой контраст', 'Регистр и норма'] },
    practice: { levels: [
      { id: 'level-1', title: 'Распознать форму в контексте', tag: '6 заданий', intro: 'Выберите предложение, которое соответствует указанному значению и ситуации.', type: 'choice', items: recognition },
      { id: 'level-2', title: 'Связать форму и функцию', tag: '6 решений', intro: 'Соотнесите пример с грамматической моделью и её коммуникативной функцией.', type: 'dual', items: dual },
      { id: 'level-3', title: 'Сохранить логику текста', tag: '6 контекстов', intro: 'Выберите форму, которая сохраняет смысловую и стилистическую связность фрагмента.', type: 'guidedText', scene: 'Редактирование текста', text: [...patterns.map((item, index) => `Выберите предложение со значением «${item.cue}»: [[${index}]].`), ...patterns.map((item, index) => `Выберите пример, построенный по схеме «${item.pattern}»: [[${index + patterns.length}]].`)].join(' '), blanks: guidedBlanks },
      { id: 'level-4', title: 'Восстановить форму без подсказки', tag: '5 заданий', intro: 'Впишите ключевой грамматический элемент и базовую схему без вариантов ответа.', type: 'freeText', scene: 'Самостоятельное восстановление', text: freeItems.map((item) => item.text).join(' '), blanks: freeItems.map(({ answer, explain }) => ({ answer, explain })) },
      { id: 'level-5', title: 'Преобразовать высказывание', tag: '4 трансформации', intro: 'Переформулируйте смысл с помощью указанной продвинутой модели.', type: 'write', items: Array.from({ length: 4 }, (_, index) => { const target = patterns[index % patterns.length]; return { scene: `Трансформация ${index + 1}`, prompt: `Напишите новое предложение с моделью «${target.label}», чтобы ${target.cue}.`, answer: target.example, accepted: [target.key], explain: `${target.pattern}. Эта форма ясно реализует функцию «${target.label}».` } }) },
      { id: 'level-6', title: 'Создать текст для реальной ситуации', tag: '3 развёрнутых задания', intro: 'Самостоятельно примените грамматику в реалистичном контексте.', type: 'write', items: patterns.map((target, index) => ({ scene: `Продуктивная задача ${index + 1}`, prompt: `Напишите два связанных предложения: первое — с моделью «${target.label}», чтобы ${target.cue}; второе — с более нейтральной формой и иным оттенком.`, answer: `${target.example} Затем тот же смысл передаётся нейтральной конструкцией.`, accepted: [target.key], explain: `Качественный ответ точно использует ${target.pattern}, сохраняет управление и ясно показывает смысловой контраст.` })) },
    ] },
  }
}

export function pattern(label: string, form: string, example: string, cue: string, key: string, warning?: string): RussianAdvancedPattern {
  return { label, pattern: form, example, cue, key, warning: warning ?? `В модели «${label}» проверьте управление, вид, субъект и соответствие речевому регистру.` }
}
