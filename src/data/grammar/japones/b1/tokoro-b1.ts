import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tokoro-b1',
  order: '14',
  color: '#dc2626',
  category: 'Tiempo y Aspecto',
  level: 'B1',
  title: '〜ところ — Momento preciso en Japonés B1',
  shortTitle: '〜ところ (just doing, at the moment of)',
  metaTitle: '〜ところ en Japonés B1 — Expresar el Momento Exacto',
  description: '〜ところ expresa el momento preciso en el que ocurre algo: presente (〜ている+ところ: está justo haciendo), pasado (〜た+ところ: justo hizo), futuro (〜ところだ: a punto de). "今電話しているところです" (estoy justo hablando por teléfono).',
  lead: 'Domina 〜ところ: expresa momentos precisos de las acciones',
  outcomes: [
    'Forma 〜ところ con diferentes tiempos verbales',
    'Expresa acciones en el momento exacto de ocurrencia',
    'Usa en contexto presente/pasado/futuro',
    'Distingue 〜ところ de 〜ている (acción continua)',
  ],
  guide: {
    goal: 'Expresar el momento preciso en que algo sucede (presente, pasado o futuro inminente).',
    model: '今電話しているところです。(Ima denwa shite iru tokoro desu.) — Estoy justo hablando por teléfono. 出かけようとしているところだ。(Dekakeyou to shite iru tokoro da.) — Estoy a punto de salir.',
    formula: 'Verbo + ところ (presente: 〜ている+ところ, pasado: 〜た+ところ, futuro: 〜ところだ/〜ところです)',
    decisions: [
      '〜ているところ: acción en pleno desarrollo (estoy haciendo)',
      '〜たところ: justo fue completado (justo hice)',
      '〜ところだ: está a punto de ocurrir (a punto de hacer)',
      'ところで: por cierto, a propósito (transición conversacional)',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['〜ているところ', 'Acción en progreso', '食べているところです (estoy comiendo)'],
      ['〜たところ', 'Justo completado', '食べたところです (justo comí)'],
      ['〜ところだ', 'Punto de ocurrir', '食べるところです (estoy a punto de comer)'],
    ],
    mistakes: [
      '「食べているところです」 ✓ (estoy comiendo). 「食べているです」 expresa acción habitual, no el momento exacto.',
      '「出かけるところです」 ✓ (a punto de salir). No confundir con 「出かけるです」 (voy a salir — más general).'],
  },
  seo: [
    {heading: '¿Qué es 〜ところ?', paragraphs: ['〜ところ expresa precisión temporal: el momento exacto en el que algo sucede, sin ambigüedad sobre si pasó, está pasando o está a punto de pasar.', 'Muy usado en japonés cotidiano para dar contexto temporal específico.']},
    {heading: '〜ているところ: acción en desarrollo', paragraphs: ['"今映画を見ているところです" (estoy viendo una película AHORA MISMO — en este preciso momento). "会議に出ているところです" (estoy en la reunión JUSTO AHORA).', 'Expresa que la acción ocurre en el momento de habla.']},
    {heading: '〜たところ: justo completado', paragraphs: ['"朝ごはんを食べたところです" (justo desayuné hace poco). "試験が終わったところです" (el examen justo terminó).', 'Expresa acción recientemente completada.']},
    {heading: '〜ところだ: punto de ocurrir', paragraphs: ['"寝るところです" (estoy a punto de dormir — inminente). "帰るところだ" (estoy a punto de irme).', 'Expresa acción inminente, a punto de ocurrir.']},
    {heading: 'ところで: transición conversacional', paragraphs: ['"ところで、昨日のパーティー、どうだった？" (por cierto, ¿qué tal la fiesta de ayer?). "そういえば" と同じような意味。', 'Expresión fija para cambiar de tema de manera natural.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜ところ: precisión temporal (momento exacto)', graphicPrompt: 'Línea de tiempo: 〜ているところ (presente) vs 〜たところ (pasado) vs 〜ところだ (futuro inminente)', scene: [['今食べているところです。', 'Estoy comiendo AHORA MISMO.'], ['出かけようとしているところです。', 'Estoy a punto de salir.'], ['ちょうど到着したところです。', 'Justo acabo de llegar.'], ['会議に出ているところです。', 'Estoy en la reunión en este momento.'], ['寝るところだ。', 'Estoy a punto de dormir.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['момент', '時間', '正確さ']},
  practice: {levels: [{id: 'level-1', title: 'Forma 〜ところ correcta', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: '〜ているところ', lines: [['', '今テレビを見___。']], options: ['ているところです', 'たところです', 'ところです', 'ています'], answer: 'ているところです', explain: 'ているところです (acción en progreso ahora).'}, {scene: '〜たところ', lines: [['', '朝ごはんを食べ___。']], options: ['たところです', 'ているところです', 'るところです', 'て'], answer: 'たところです', explain: 'たところです (justo completado).'}]}, {id: 'level-2', title: '〜ところ en contexto', tag: 'Contexto', intro: 'Completa con la forma correcta.', type: 'guidedText', scene: 'Momentos precisos de acciones.', text: '今___。 試験が___。 寝___。', blanks: [{options: ['食べているところです', 'たところです'], answer: '食べているところです', explain: 'ているところです (ahora mismo).'}, {options: ['終わったところです', 'わるところです'], answer: '終わったところです', explain: 'たところです (justo terminó).'}, {options: ['るところです', 'たところです'], answer: 'るところです', explain: 'ところだ/です (a punto de).'}]}, {id: 'level-3', title: 'Escritura con 〜ところ', tag: 'Escritura', intro: 'Escribe acciones en momentos precisos.', type: 'freeText', scene: 'Mis momentos específicos.', text: '1. [[0]] (Estoy comiendo ahora). 2. [[1]] (Justo llegué). 3. [[2]] (A punto de dormir).', blanks: [{answer: '今食べているところです', accepted: ['ているところ', '食べ'], explain: '〜ているところです (en progreso).'}, {answer: 'ちょうど到着したところです', accepted: ['たところ', '到着'], explain: '〜たところです (justo completado).'}, {answer: '寝るところです', accepted: ['ところです', '寝'], explain: '〜ところです (a punto de).'}]}, {id: 'level-4', title: 'Análise de 〜ところ', tag: 'Análise', intro: 'Explica el significado.', type: 'write', items: [{scene: 'Precisión de 〜ところ', prompt: '¿Cuál es la diferencia entre "食べています" y "食べているところです"?', answer: '"食べています" es acción habitual o continua (suelo comer, estoy comiendo en general). "食べているところです" es MÁS PRECISO: especifica el MOMENTO EXACTO (estoy comiendo JUSTO AHORA, en este instante). ところ añade precisión temporal.', accepted: ['момент', '正確', '今'], explain: '〜ところ: precisión temporal del momento exacto.'}]}]},
}

export default topic
