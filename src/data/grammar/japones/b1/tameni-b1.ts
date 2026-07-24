import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tameni-b1',
  order: '17',
  color: '#dc2626',
  category: 'Propósito y Razón',
  level: 'B1',
  title: '〜ために — Propósito y Razón en Japonés B1',
  shortTitle: '〜ために (in order to, for, because of)',
  metaTitle: '〜ために en Japonés B1 — Expresar Propósito y Causa',
  description: '〜ために expresa propósito (para, a fin de): "試験に合格するために勉強する" (estudio para aprobar el examen), o causa (porque, debido a): "病気のために学校を休む" (falto a la escuela porque estoy enfermo).',
  lead: 'Domina 〜ために: expresa propósito y causa',
  outcomes: [
    'Forma 〜ために con diferentes verbos y sustantivos',
    'Expresa propósito (para, a fin de)',
    'Expresa causa o razón (porque, debido a)',
    'Usa en oraciones con propósito claro',
  ],
  guide: {
    goal: 'Expresar propósito (para qué se hace algo) o causa (por qué sucede algo).',
    model: 'お金を貯めるために働く。(Okane wo tameru tame ni hataraku.) — Trabajo para ahorrar dinero. 病気のために来られなかった。(Byouki no tame ni korarenakata.) — No pude venir porque estaba enfermo.',
    formula: 'Verbo [forma base] + ために / Sustantivo + の + ために',
    decisions: [
      '〜ために (propósito): para, a fin de (voluntario, propósito claro)',
      '〜ために (causa): porque, debido a (involuntario, razón de hecho)',
      '〜ため (sin に): es más sustantivo (el propósito de)',
      'Contraste: 〜ために vs ように (ために: propósito; ように: método/forma)',
    ],
    table: [
      ['Uso', 'Significado', 'Ejemplo'],
      ['Propósito', 'Para, a fin de', '合格するために勉強する (estudio para aprobar)'],
      ['Causa', 'Porque, debido a', '病気のために休む (falto porque estoy enfermo)'],
      ['Sustantivo + ため', 'Razón, causa', '仕事のため (por el trabajo, para el trabajo)'],
    ],
    mistakes: [
      '「試験に合格するために勉強する」 ✓ (estudio para aprobar). 「合格するように勉強する」 expresa manera de estudiar, no propósito directo.',
      '「病気のために来られない」 ✓ (no puedo venir porque estoy enfermo). 「病気のせいで」 también es posible (más coloquial).'],
  },
  seo: [
    {heading: '¿Qué es 〜ために?', paragraphs: ['〜ために tiene dos usos principales: 1) propósito (para qué), 2) causa (por qué). Ambos son muy comunes en japonés.', 'Es una de las estructuras más versátiles y frecuentes.']},
    {heading: '〜ために: propósito (voluntario)', paragraphs: ['"キャリアを積むために留学する" (estudio en el extranjero para construir carrera). "健康のために運動する" (hago ejercicio para la salud).', 'Acción realizada CON UN PROPÓSITO CLARO.']},
    {heading: '〜ために: causa (involuntario)', paragraphs: ['"大雨のために試合が中止になった" (el partido fue cancelado porque llovió mucho). "事故のために道が塞がっている" (el camino está bloqueado debido al accidente).', 'Situación que CAUSÓ un resultado sin intención.']},
    {heading: '〜ため vs 〜ために', paragraphs: ['"勉強のため" (para estudiar — sustantivo, más formal) vs "勉強するために" (para poder estudiar — verbo, más específico). Ambas formas son correctas pero ため es más nominal.', 'Ejemplo: "子どものため" vs "子どもを育てるために".']},
    {heading: '〜ために vs 〜ように', paragraphs: ['"伝わるようにゆっくり話す" (hablo lentamente PARA que se entienda — método) vs "理解させるために繰り返す" (repito PARA que entienda — propósito). ために es propósito; ように es método/forma.', 'Contextos diferentes, ambas expresan finalidad pero con énfasis distinto.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜ために: propósito y causa', graphicPrompt: 'Diagrama: 〜ために (propósito voluntario) vs causa involuntaria', scene: [['試験に合格するために勉強する。', 'Estudio para aprobar el examen (propósito).'], ['病気のために学校を休む。', 'Falto a la escuela porque estoy enfermo (causa).'], ['お金を貯めるために働く。', 'Trabajo para ahorrar dinero (propósito).'], ['大雨のために試合が中止になった。', 'El partido fue cancelado por lluvia (causa).'], ['健康のために運動する。', 'Hago ejercicio para la salud (propósito).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['目的', '理由', 'ため']},
  practice: {levels: [{id: 'level-1', title: '〜ために correcto', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: 'Propósito', lines: [['', '試験に合格するため___勉強する。']], options: ['に', 'で', 'の', 'を'], answer: 'に', explain: 'ために (propósito).'}, {scene: 'Causa', lines: [['', '病気の___来られない。']], options: ['ため', 'ので', 'から', 'ために'], answer: 'ために', explain: 'ために (causa).'}]}, {id: 'level-2', title: '〜ために en contexto', tag: 'Contexto', intro: 'Completa con la forma correcta.', type: 'guidedText', scene: 'Propósitos y causas.', text: 'キャリアを[[0]]ために留学する。 大雨の[[1]]試合が中止になった。 健康の[[2]]運動する。', blanks: [{options: ['積むため', 'ています'], answer: '積むため', explain: 'ために (propósito).'}, {options: ['ため', 'です'], answer: 'ため', explain: 'ために (causa).'}, {options: ['ため', 'ます'], answer: 'ため', explain: 'ために (propósito).'}]}, {id: 'level-3', title: 'Escritura con 〜ために', tag: 'Escritura', intro: 'Escribe propósitos y razones.', type: 'freeText', scene: 'Mis propósitos y razones.', text: '1. [[0]] (Estudio para aprobar). 2. [[1]] (Falto porque estoy enfermo). 3. [[2]] (Trabajo para ahorrar).', blanks: [{answer: '試験に合格するために勉強する', accepted: ['ために', '勉強'], explain: 'ために (propósito).'}, {answer: '病気のために学校を休む', accepted: ['ために', '病気'], explain: 'ために (causa).'}, {answer: 'お金を貯めるために働く', accepted: ['ために', '働く'], explain: 'ために (propósito).'}]}, {id: 'level-4', title: 'Análise de 〜ために', tag: 'Análise', intro: 'Explica significado.', type: 'write', items: [{scene: '〜ために vs 〜ように', prompt: '"伝わるようにゆっくり話す" と "理解させるためにゆっくり話す" の違いは何？', answer: '両方ともゆっくり話す理由について述べているが、"ように" はその方法・手段に焦点（～するように、つまり方法として）、"ために" は最終目的に焦点（～するために、つまり目的として）。どちらも結果は同じだが、視点が異なる。', accepted: ['方法', '目的', 'ため'], explain: 'ために: propósito; ように: método.'}]}]},
}

export default topic
