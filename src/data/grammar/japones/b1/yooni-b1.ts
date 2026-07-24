import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'yooni-b1',
  order: '19',
  color: '#dc2626',
  category: 'Propósito y Modo',
  level: 'B1',
  title: '〜ように — Propósito y Similitud en Japonés B1',
  shortTitle: '〜ように (so that, in order to, like)',
  metaTitle: '〜ように en Japonés B1 — Expresar Propósito y Semejanza',
  description: '〜ように expresa propósito (para que, a fin de): "わかるように説明する" (explico para que entienda), o similitud (como, de la manera de): "鳥のように飛ぶ" (vuela como un pájaro).',
  lead: 'Domina 〜ように: expresa propósito, método y similitud',
  outcomes: [
    'Forma 〜ように con diferentes verbos',
    'Expresa propósito (para que, a fin de)',
    'Expresa similitud y comparación (como)',
    'Usa en contexto de método y manera',
  ],
  guide: {
    goal: 'Expresar propósito (para que algo suceda) o similitud (como, de la manera de).',
    model: 'わかるように説明する。(Wakaru you ni setsumei suru.) — Explico para que entienda. 鳥のように飛ぶ。(Tori no you ni tobu.) — Vuela como un pájaro.',
    formula: 'Verbo [forma base] + ように / Sustantivo + のように / Adjetivo + ように',
    decisions: [
      '〜ように (propósito): para que, a fin de (resultado esperado)',
      '〜ように (similitud): como, de manera similar (comparación)',
      '〜ような: adjetival (like, similar — modificador)',
      'Contraste: 〜ために (propósito claro), 〜ように (método/forma/propósito gentil)',
    ],
    table: [
      ['Uso', 'Significado', 'Ejemplo'],
      ['Propósito', 'Para que', 'わかるように説明する (explico para que entienda)'],
      ['Similitud', 'Como', '鳥のように飛ぶ (vuela como un pájaro)'],
      ['〜ような', 'Similar a', 'そのような人 (una persona como esa)'],
    ],
    mistakes: [
      '「わかるように説明する」 ✓ (explico para que entienda — método). 「わかるために説明する」 es más directo (propósito claro).',
      '「鳥のように飛ぶ」 ✓ (vuela como un pájaro). 「鳥みたいに飛ぶ」 es más coloquial (ambas correctas).'],
  },
  seo: [
    {heading: '¿Qué es 〜ように?', paragraphs: ['〜ように tiene dos usos: 1) propósito (para que), 2) similitud (como). Es muy versátil y versión más suave de 〜ために.', 'Especialmente usado para expresar METHOD o MANNER.']},
    {heading: '〜ように: propósito (método gentil)', paragraphs: ['"子どもが理解するように説明する" (explico de manera que el niño entienda). "誰にでもわかるようにシンプルにする" (simplifico para que cualquiera entienda).', 'Enfatiza el MÉTODO para lograr el propósito.']},
    {heading: '〜ように: similitud y comparación', paragraphs: ['"天使のように美しい" (hermosa como un ángel). "光のように速い" (rápido como la luz). "葉が落ちるように雪が降る" (la nieve cae como hojas que caen).', 'Expresa SIMILITUD ENTRE DOS COSAS.']},
    {heading: '〜ような: forma adjetival', paragraphs: ['"そのような人" (una persona como esa). "不思議なような気がする" (siento algo extraño). "〜ような" modifica sustantivos.', 'Forma de adjetivo derivada de ように.']},
    {heading: '〜ように vs 〜ために', paragraphs: ['"理解させるようにゆっくり話す" (hablo lentamente PARA QUE entienda — énfasis método) vs "理解させるためにゆっくり話す" (hablo lentamente PARA entienda — énfasis propósito). ように es más METHOD; ために es más PURPOSE.', 'Ambas son correctas pero con énfasis distinto.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜ように: propósito (suave) y similitud', graphicPrompt: 'Tabla: 〜ように (propósito) vs similitud', scene: [['わかるように説明する。', 'Explico para que entienda (método).'], ['天使のように美しい。', 'Hermosa como un ángel (similitud).'], ['子どもが理解するようにシンプルにする。', 'Simplifico para que el niño entienda (método).'], ['光のように速い。', 'Rápido como la luz (similitud).'], ['そのような人は好きじゃない。', 'No me gustan personas como esa (adjetival).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['目的', '方法', '比較']},
  practice: {levels: [{id: 'level-1', title: '〜ように correcto', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: 'Propósito', lines: [['', 'わかるよ___説明する。']], options: ['うに', 'りに', 'れに'], answer: 'うに', explain: 'ように (propósito).'}, {scene: 'Similitud', lines: [['', '鳥のよ___飛ぶ。']], options: ['うに', 'りに', 'いに', 'えに'], answer: 'うに', explain: 'ように (similitud).'}]}, {id: 'level-2', title: '〜ように en contexto', tag: 'Contexto', intro: 'Completa con propósito o similitud.', type: 'guidedText', scene: 'Métodos y comparaciones.', text: 'わかるよ[[0]]説明する。 天使のよ[[1]]美しい。 誰にでもわかるよ[[2]]シンプルにする。', blanks: [{options: ['うに', 'いに'], answer: 'うに', explain: 'ように (propósito).'}, {options: ['うに', 'いに'], answer: 'うに', explain: 'ように (similitud).'}, {options: ['うに', 'いに'], answer: 'うに', explain: 'ように (propósito).'}]}, {id: 'level-3', title: 'Escritura con 〜ように', tag: 'Escritura', intro: 'Expresa propósitos y similitudes.', type: 'freeText', scene: 'Mis explicaciones y comparaciones.', text: '1. [[0]] (Explico para que entienda). 2. [[1]] (Hermosa como flor). 3. [[2]] (Rápido como rayo).', blanks: [{answer: 'わかるように説明する', accepted: ['ように', '説明'], explain: 'ように (propósito).'}, {answer: '花のように美しい', accepted: ['ように', '花'], explain: 'ように (similitud).'}, {answer: '雷のように速い', accepted: ['ように', '雷'], explain: 'ように (similitud).'}]}, {id: 'level-4', title: 'Análise de 〜ように', tag: 'Análise', intro: 'Explica significado.', type: 'write', items: [{scene: '〜ように vs 〜ために', prompt: '"理解するように説明する" と "理解させるために説明する" の違いは何？', answer: '両方ともpropósito を表すが、"ように" は方法・manner に焦点（～するように、つまりこういう方法で）、"ために" は最終目的に焦点（～するために、つまり最終目的として）。どちらも結果は同じだが、視点が異なる。', accepted: ['方法', '目的', 'ため'], explain: 'ように: método/manner; ために: propósito final.'}]}]},
}

export default topic
