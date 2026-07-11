import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condicional-subjuntivo-b1',
  order: '08',
  color: '#1a2ecc',
  category: 'Mood y Tiempo',
  level: 'B1',
  title: 'Condicional e Irrealidad con БЫ en Ruso B1',
  shortTitle: 'БЫ (would, if only)',
  metaTitle: 'Condicional e Irrealidad БЫ en Ruso B1',
  description: 'БЫ + pasado imperfectivo expresa hipótesis, irrealidad y deseo: "Если бы я знал..." (si yo supiera...). Estructura: условное придаточное (if clause) + главное предложение (main clause). БЫ се coloca después de первый глагол.',
  lead: 'Domina БЫ para expresar irrealidad: "si yo supiera, hubiera..."',
  outcomes: [
    'Forma condicional con БЫ + глагол в прошедшем времени',
    'Construye oraciones condicionales con если бы',
    'Expresa deseos irreales y contrafácticos',
    'Distingue condicional (БЫ) de indicativo normal',
  ],
  guide: {
    goal: 'Expresar condiciones irreales y contrafácticas usando БЫ.',
    model: 'Если бы я знал, я бы пришёл. Я бы поехал, если бы была машина.',
    formula: 'если бы + Preterite (past НСВ) + бы + Preterite',
    decisions: [
      'Условие: если бы + прошедшее (НСВ)',
      'Результат: бы + глагол прошедшего',
      'БЫ может стоять после первого слова главного предложения',
      'Всегда прошедшее, никогда настоящее/будущее',
    ],
    table: [
      ['Структура', 'Пример', 'Перевод'],
      ['Если бы + Past', 'Если бы я знал', 'Si yo supiera'],
      ['Результат + БЫ', 'Я бы пришёл', 'Yo vendría / habría venido'],
    ],
    mistakes: [
      '"Если бы я знал, я бы пришёл" ✓ — прошедшее в обоих случаях.',
      'Не "если я знаю" (то не условный, а обычное условие).'],
  },
  seo: [
    {heading: '¿Qué es БЫ?', paragraphs: ['БЫ es una partícula que marca condición irreal: "si fuera, habría". Muy usado en hipótesis, deseos y contrafácticos.', 'Estructura: если бы + verbo en pasado НСВ. Siempre pasado, nunca presente.']},
    {heading: 'Condicional con если бы', paragraphs: ['"Если бы я знал" (si yo supiera). "Если бы была машина" (si hubiera coche). Estructura de if-clause en condicional.', 'Siempre va junto con el verbo de resultado que también lleva БЫ.']},
    {heading: 'Resultado con БЫ', paragraphs: ['"Я бы пришёл" (yo vendría/habría venido). БЫ marca irrealidad. El verbo siempre está en pasado, independientemente del momento.', '"Если бы я знал, я бы пришёл вчера" (si hubiera sabido, habría venido ayer).']},
    {heading: 'Deseos irreales: хотел бы, хотела бы', paragraphs: ['"Я хотел бы поехать" (me gustaría ir — deseo irreal). "Он хотел бы знать" (él quisiera saber).', 'БЫ después de хотеть transforma a pasado condicional.']},
    {heading: 'БЫ vs обычное условие (если...то)', paragraphs: ['"Если это правда, это плохо" (si es verdad, es malo — posible). "Если бы это было правдой, это было бы плохо" (si fuera verdad, sería malo — irreal).', 'Diferencia: обычное условие = posible; БЫ = irreal/contrafáctico.']},
  ],
  visual: {mode: 'scene', teacherLens: 'БЫ: condicional irreal vs обычное условие (possible)', graphicPrompt: 'Tabla: БЫ (irreal) vs Indicativo (posible)', scene: [['Если бы я знал, я бы пришёл.', 'Si hubiera sabido, habría venido.'], ['Я бы поехал, если бы была машина.', 'Yo iría si hubiera coche.'], ['Он хотел бы помочь.', 'Él quisiera ayudar.'], ['Если бы я был богат...', 'Si fuera rico...'], ['Я бы остался здесь.', 'Yo me quedaría aquí.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['условное', 'нереальное', 'БЫ']},
  practice: {levels: [{id: 'level-1', title: 'БЫ в конструкции', tag: 'Múltipla escolha', intro: 'Elige forma с БЫ.', type: 'choice', items: [{scene: 'БЫ + прошедшее', lines: [['', 'Если бы я ___ , я бы помог.']], options: ['знаю', 'знал', 'буду знать', 'знаю'], answer: 'знал', explain: 'знал (past) — condición irreal.'}, {scene: 'Результат + БЫ', lines: [['', 'Я ___ поехал.']], options: ['будто', 'был', 'бы', 'было'], answer: 'бы', explain: 'бы — marca condicional.'}]}, {id: 'level-2', title: 'Условный в контексте', tag: 'Condicional', intro: 'Completa с БЫ.', type: 'guidedText', scene: 'Hipótesis irreales.', text: 'Если бы я ___ время, я ___ учиться. Если бы она ___машину, она ___ ездить.', blanks: [{options: ['имею', 'имел'], answer: 'имел', explain: 'имел — условие.'}, {options: ['буду', 'буду', 'бы'], answer: 'бы', explain: 'бы — результат.'}, {options: ['имела', 'имеет'], answer: 'имела', explain: 'имела (fem past).'}, {options: ['может', 'могла бы'], answer: 'могла бы', explain: 'могла бы (resultado).'}]}, {id: 'level-3', title: 'Escritura con БЫ', tag: 'Condicional', intro: 'Escribe condicionales.', type: 'freeText', scene: 'Mis deseos e hipótesis.', text: '1. [[0]] (Si tuviera tiempo). 2. [[1]] (Me gustaría viajar). 3. [[2]] (Si fuera rico).', blanks: [{answer: 'Если бы у меня было время', accepted: ['было', 'бы'], explain: 'было (past) — условие.'}, {answer: 'Я бы хотел путешествовать', accepted: ['бы', 'хотел'], explain: 'бы хотел — deseo irreal.'}, {answer: 'Если бы я был богат', accepted: ['был', 'богат'], explain: 'был (past) — condición irreal.'}]}, {id: 'level-4', title: 'Análise БЫ и условия', tag: 'Análise', intro: 'Explica БЫ.', type: 'write', items: [{scene: 'БЫ vs обычное условие', prompt: '"Если я приду, помогу" vs "Если бы я пришёл, я бы помог": ¿cuál es real y cuál irreal?', answer: '"Если я приду, помогу" es real/posible (futuro indicativo). "Если бы я пришёл, я бы помог" es irreal/contrafáctico (БЫ + pasado = condición irrealizable). Diferencia clave: БЫ = hipotético/contrafáctico.', accepted: ['реальное', 'нереальное', 'условное'], explain: 'БЫ = irreal; Indicativo = posible.'}]}]},
}

export default topic
