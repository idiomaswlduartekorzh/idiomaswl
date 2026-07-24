import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'te-shimau-b1',
  order: '05',
  color: '#dc2626',
  category: 'Aspecto y Resultado',
  level: 'B1',
  title: '〜てしまう — Acción completada o lamentada en Japonés B1',
  shortTitle: '〜てしまう (just did, ended up)',
  metaTitle: '〜てしまう en Japonés B1 — Expresar Finalización',
  description: '〜てしまう indica que una acción se completó o sucedió inesperadamente/desafortunadamente. "飲んでしまった" (terminé de beber, me bebí todo). Literal: te + shimau (terminar/acabar).',
  lead: 'Domina 〜てしまう: expresa acciones completadas o lamentables',
  outcomes: [
    'Forma 〜てしまう con diferentes verbos',
    'Expresa finalización o conclusión de acciones',
    'Usa en contexto de arrepentimiento o desgracia',
    'Distingue 〜てしまう de 〜た (simple pasado)',
  ],
  guide: {
    goal: 'Expresar que algo se completó o sucedió de manera inesperada/lamentable.',
    model: '飲んでしまいました。(Nonde shimaimashita.) — Me lo bebí todo / Acabé bebiéndolo. 間違えてしまった。(Machigaete shimatta.) — Cometí un error (lamentable).',
    formula: 'Verbo [forma te] + しまう',
    decisions: [
      '〜てしまう: acción completada enfáticamente o con tono de lástima',
      '〜てしまった: pasado completado o lamentado',
      'Formas: てしまう/ちゃう (coloquial, más natural)',
      'Con potencial: 〜られてしまった (desafortunadamente pude ser...)',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['〜てしまう', 'Completada/desafortunada', '飲んでしまった (me lo bebí)'],
      ['〜ちゃう', 'Coloquial de てしまう', '飲んじゃった (me lo bebí — casual)'],
    ],
    mistakes: [
      '「飲んでしまいました」 ✓ forma formal. 「飲んじゃいました」 ✓ coloquial. Ambas son correctas.',
      '「してしまう」✓ (no 「してしまった」 en presente). Usa ている si continúa.'],
  },
  seo: [
    {heading: '¿Qué es 〜てしまう?', paragraphs: ['〜てしまう expresa que algo se completó enfáticamente o sucedió de manera lamentable/inesperada. No es simplemente pasado, sino que lleva connotación emocional.', 'Muy usado en conversación natural japonesa.']},
    {heading: '〜てしまう para finalización enfática', paragraphs: ['"飲んでしまいました" (me lo bebí todo — énfasis en que se acabó). "作ってしまった" (acabé de hacerlo — lo completé).', 'Expresa que la acción llegó a su fin de manera total.']},
    {heading: '〜てしまう para desgracia/arrepentimiento', paragraphs: ['"間違えてしまった" (¡Cometí un error! — lamentable). "病気になってしまった" (me enfermé — desgraciadamente sucedió).', 'Lleva tono de "¡qué mala suerte!" o "me arrepiento".']},
    {heading: '〜ちゃう: forma coloquial', paragraphs: ['"飲んじゃった" (informal de 飲んでしまった — me lo bebí). "忘れちゃった" (olvidé — 忘れてしまった).', 'En conversación casual, ちゃう/じゃう es mucho más natural que てしまう.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜てしまう: finalización o lástima', graphicPrompt: 'Tabla: 〜てしまう (completada/lamentable) vs simple pasado', scene: [['飲んでしまいました。', 'Me lo bebí todo (completada).'], ['間違えてしまった。', 'Cometí un error (lamentable).'], ['忘れちゃった。', 'Olvidé (casual).'], ['病気になってしまった。', 'Me enfermé desafortunadamente.'], ['全部食べちゃった。', 'Me lo comí todo (casual).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['完了', '遺憾', '自然']},
  practice: {levels: [{id: 'level-1', title: 'Forma 〜てしまう', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: '〜てしまう del verbo', lines: [['', 'あの子は全部食べ___。']], options: ['てしまった', 'た', 'てしまう', 'ている'], answer: 'てしまった', explain: 'てしまった — completada (pasado).'}, {scene: 'Forma coloquial ちゃう', lines: [['', '忘れ___。']], options: ['てしまった', 'ちゃった', 'た', 'てしまう'], answer: 'ちゃった', explain: 'ちゃった (coloquial) — forgot.'}]}, {id: 'level-2', title: '〜てしまう en contexto', tag: 'Finalización', intro: 'Completa con significado correcto.', type: 'guidedText', scene: 'Oraciones de acciones completadas o lamentables.', text: '飲ん[[0]] 。 病気になっ[[1]]。 全部やっ[[2]]。', blanks: [{options: ['でしまった', 'た'], answer: 'でしまった', explain: 'てしまった (completada enfática).'}, {options: ['てしまった', 'た'], answer: 'てしまった', explain: 'てしまった (desgracia).'}, {options: ['てしまった', 'た'], answer: 'てしまった', explain: 'てしまった (completada).'}]}, {id: 'level-3', title: 'Escritura con 〜てしまう', tag: 'Finalización', intro: 'Escribe acciones completadas.', type: 'freeText', scene: 'Mis acciones completadas o lamentables.', text: '1. [[0]] (Me lo comí todo). 2. [[1]] (Olvidé). 3. [[2]] (Cometí un error).', blanks: [{answer: '全部食べてしまった', accepted: ['てしまった', '食べ'], explain: '〜てしまった (completada).'}, {answer: '忘れちゃった', accepted: ['ちゃった', '忘れ'], explain: '〜ちゃった (coloquial).'}, {answer: '間違えてしまった', accepted: ['てしまった', '間違え'], explain: '〜てしまった (lamentable).'}]}, {id: 'level-4', title: 'Análise de 〜てしまう', tag: 'Análise', intro: 'Explica significado.', type: 'write', items: [{scene: 'Diferencia de matiz', prompt: '¿Cuál es la diferencia emocional entre "飲んだ" y "飲んでしまった"?', answer: '"飲んだ" es simple pasado neutral (bebí). "飲んでしまった" lleva énfasis en que se completó enfáticamente, o tono de arrepentimiento/lástima (me lo bebí todo, ¡qué desastre!). Es la misma acción pero con connotación emocional diferente.', accepted: ['完了', '遺憾', '強調'], explain: '〜てしまう añade énfasis o matiz negativo al pasado simple.'}]}]},
}

export default topic
