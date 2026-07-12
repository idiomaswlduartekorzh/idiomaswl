import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'discurso-indirecto-b1',
  order: '09',
  color: '#1a2ecc',
  category: 'Sintaxis Compleja',
  level: 'B1',
  title: 'Discurso Indirecto (Косвенная речь) en Ruso B1',
  shortTitle: 'Косвенная речь (reported speech)',
  metaTitle: 'Discurso Indirecto en Ruso B1',
  description: 'Косвенная речь (reported speech) reproduce el habla sin comillas directo. Cambios: pronombres (я→он, ты→она), tiempo verbal (presente→pasado), conectores (тот что, ли).',
  lead: 'Domina косвенная речь para reportar discurso: "Él dijo que..."',
  outcomes: [
    'Convierte discurso directo a indirecto',
    'Cambia pronombres y tiempos correctamente',
    'Usa conectores: что, ли, какой',
    'Forma cláusulas subordinadas de reporte',
  ],
  guide: {
    goal: 'Reportar discurso de otros sin comillas directas.',
    model: 'Прямо: "Я приду завтра." Косвенно: Он сказал, что он придёт завтра.',
    formula: 'глагол + что/ли + измененная речь',
    decisions: [
      'Прямо: "Я люблю книги" → Косвенно: Он сказал, что он любит книги',
      'Вопрос: "Ты придёшь?" → Он спросил, придёт ли она',
      'Изменение времени: в косвенной речи обычно все глаголы переходят в прошедшее',
    ],
    table: [
      ['Tipo', 'Directo', 'Indirecto'],
      ['Afirmación', '"Я приду"', 'Он сказал, что он придёт'],
      ['Pregunta', '"Ты придёшь?"', 'Он спросил, придёт ли она'],
    ],
    mistakes: [
      '"Он сказал, что он придёт" ✓ (cambio de yo → él).',
      'No mezcles directo y indirecto en la misma oración.'],
  },
  seo: [
    {heading: '¿Qué es косвенная речь?', paragraphs: ['Косвенная речь es reportar lo que alguien dijo sin usar comillas directas. "Ella dijo que vendría" en lugar de "Ella dijo: Vendré".', 'Requiere cambios de pronombres, tiempo verbal y conectores.']},
    {heading: 'Cambio de pronombres', paragraphs: ['"Я приду" → Он сказал, что он придёт (yo → él). "Ты пришла" → Она спросила, пришла ли я (tú → yo, en contexto del que reporta).', 'Los pronombres cambian según la perspectiva del que reporta.']},
    {heading: 'Cambio de tiempo verbal', paragraphs: ['En косвенная речь, el tiempo generalmente cambia al pasado o presente según la lógica. "Я приду завтра" → "Он сказал, что он придёт завтра" (futuro se mantiene o se convierte en implicación).', 'Presente directo puede ser presente o pasado en indirecto según contexto.']},
    {heading: 'Conectores: что, ли, какой', paragraphs: ['"Он сказал, что он приходит" (que — para afirmaciones). "Она спросила, придёт ли она" (ли — para yes/no preguntas).', 'Preguntas qué/cuál: "Он спросил, какую книгу я читал" (какой — para preguntas interrogativas).']},
    {heading: 'Contraste: directo vs indirecto', paragraphs: ['"Я люблю кино" (directo — con énfasis, yo hablando). "Он сказал, что он любит кино" (indirecto — reporte neutral).', 'Indirecto requiere verbo de dicción: сказать, спросить, ответить, рассказать.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Косвенная речь: cambio de pronombres, tiempo y conectores', graphicPrompt: 'Tabla: Directo vs Indirecto', scene: [['Прямо: "Я приду завтра"', 'Directamente: Vendré mañana.'], ['Косвенно: Он сказал, что он придёт завтра', 'Indirectamente: Él dijo que vendría mañana.'], ['Вопрос: "Ты пришла?"', 'Pregunta: ¿Viniste?'], ['Косвенно: Она спросила, пришла ли я', 'Indirectamente: Ella me preguntó si vino.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['время', 'местоимение', 'коннектор']},
  practice: {levels: [{id: 'level-1', title: 'Cambio de pronombre', tag: 'Múltipla escolha', intro: 'Elige pronombre correcto.', type: 'choice', items: [{scene: 'Cambio de yo → él', lines: [['', '"Я приду" → Он сказал, что ___ придёт']], options: ['я', 'он', 'она', 'они'], answer: 'он', explain: 'он (él) — cambio de yo a él.'}, {scene: 'Cambio de tú → ella', lines: [['', '"Ты пришла?" → Она спросила, пришла ли ___']], options: ['она', 'я', 'ты', 'мы'], answer: 'я', explain: 'я (yo) — cambio de tú a yo (perspectiva del que habla).'}]}, {id: 'level-2', title: 'Tiempo en косвенная речь', tag: 'Tiempo', intro: 'Completa tiempos.', type: 'guidedText', scene: 'Cambio de tiempo verbal.', text: '"Я читаю" → Он сказал, что он ___. "Я прочитал" → Она сказала, что она ___. "Я буду читать" → Они сказали, что они ___.', blanks: [{options: ['читает', 'читал', 'читает'], answer: 'читает', explain: 'читает (present/impf) — presente/habitual.'}, {options: ['читала', 'прочитала', 'читала'], answer: 'прочитала', explain: 'прочитала (past perf fem) — acción completada.'}, {options: ['будут читать', 'будут читать', 'читают'], answer: 'будут читать', explain: 'будут читать (future) — futuro.'}]}, {id: 'level-3', title: 'Escritura de косвенная речь', tag: 'Discurso Indirecto', intro: 'Escribe en косвенная речь.', type: 'freeText', scene: 'Reportar lo que otros dijeron.', text: '1. [[0]] (Directo: "Я приду завтра"). 2. [[1]] (Directo: "Ты знаешь?"). 3. [[2]] (Directo: "Мне нравится кино").', blanks: [{answer: 'Он сказал, что он придёт завтра', accepted: ['что', 'придёт'], explain: 'Kosvenno: что + cambio de pronombre/tiempo.'}, {answer: 'Она спросила, знаю ли я', accepted: ['ли', 'спросила'], explain: 'Pregunta косвенно: ли.'}, {answer: 'Он сказал, что ему нравится кино', accepted: ['что', 'нравится'], explain: 'Kosvenno: что + implicación de gusto.'}]}, {id: 'level-4', title: 'Análise de косвенная речь', tag: 'Análise', intro: 'Explica cambios.', type: 'write', items: [{scene: 'Contraste directo/indirecto', prompt: 'Explica los cambios en косвенная речь: "Я люблю кино" → "Он сказал, что он любит кино"', answer: 'Cambios: 1) я → он (pronombre de yo a él). 2) Tiempo verbal se mantiene o se ajusta (aquí permanece en presente porque es característica).  3) Se añade "что" como conector de cláusula subordinada. 4) Pierde énfasis directo y se neutraliza el tono.', accepted: ['местоимение', 'время', 'соединитель'], explain: 'Косвенная речь: pronombre, tiempo y conectores.'}]}]},
}

export default topic
