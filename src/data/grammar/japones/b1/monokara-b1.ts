import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'monokara-b1',
  order: '16',
  color: '#dc2626',
  category: 'Causalidad y Razón',
  level: 'B1',
  title: '〜ものなら — Condición Hipotética en Japonés B1',
  shortTitle: '〜ものなら (if, if you can)',
  metaTitle: '〜ものなら en Japonés B1 — Expresar Condición Hipotética',
  description: '〜ものなら expresa condición hipotética imposible o muy difícil: "できるものなら、もう一度挑戦したい" (si fuera posible, querría intentarlo de nuevo). Literal: mono (cosa) + nara (si). Implica dificultad o improbabilidad.',
  lead: 'Domina 〜ものなら: expresa condiciones imposibles o deseadas',
  outcomes: [
    'Forma 〜ものなら con diferentes verbos',
    'Expresa condición hipotética y deseos imposibles',
    'Usa en contexto de "si fuera posible"',
    'Distingue 〜ものなら de 〜たら (condición real)',
  ],
  guide: {
    goal: 'Expresar condición hipotética difícil o imposible: lo que harías si fuera posible.',
    model: 'できるものなら、もう一度挑戦したい。(Dekiru monokara, mou ichido chousen shitai.) — Si fuera posible, querría intentarlo de nuevo. 時間があるものなら、世界中を旅したい。(Jikan ga aru monokara, sekai-juu wo tabisuru shitai.) — Si tuviera tiempo, viajaría por el mundo.',
    formula: 'Verbo/Adjetivo + ものなら',
    decisions: [
      '〜ものなら + 〜たい: expresa deseo imposible o muy difícil (quería si fuera posible)',
      '〜ものなら + 〜のに: expresa lamento (lo haría si fuera posible, pero...)',
      '〜ものなら: implica que la condición es improbable o imposible (no solo difícil)',
      'Contraste: 〜たら (condición posible), 〜ものなら (condición imposible/hipotética)',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['〜ものなら + たい', 'Deseo imposible', 'できるものなら行きたい (quisiera ir si fuera posible)'],
      ['〜ものなら + のに', 'Lamento hipotético', 'お金があるものなら買うのに (lo compraría si tuviera dinero)'],
      ['〜ものなら', 'Condición imposible', '生きかえるものなら... (si pudiera volver a vivir...)'],
    ],
    mistakes: [
      '「できるものなら、行きたい」 ✓ (si fuera posible, querría ir). 「できたら、行きたい」 es más simple/posible.',
      '「時間があるものなら、来るのに」 ✓ (vendría si tuviera tiempo — lamento). El speaker desea pero no puede.'],
  },
  seo: [
    {heading: '¿Qué es 〜ものなら?', paragraphs: ['〜ものなら expresa condición hipotética: si algo fuera verdad (pero probablemente no lo es). Es condición MÁS IMPOSIBLE que 〜たら (que es más posible/real).', 'Muy usado para expresar deseos y lamentos.']},
    {heading: '〜ものなら + たい: deseo imposible', paragraphs: ['"もっとお金があるものなら、家を買いたい" (si tuviera más dinero, compraría casa). "時間があるものなら、毎日旅したい" (si tuviera tiempo, viajaría diariamente).', 'Expresa deseo que probablemente no se cumplirá.']},
    {heading: '〜ものなら + のに: lamento', paragraphs: ['"健康であるものなら、スポーツをするのに" (si fuera sano, practicaría deporte). "若いものなら、いろいろ挑戦するのに" (si fuera joven, intentaría muchas cosas).', 'Expresa lo que haría si las circunstancias fueran diferentes.']},
    {heading: '〜ものなら vs 〜たら', paragraphs: ['"できるものなら、行きたい" (si FUERA posible — improbable) vs "できたら、行く" (si pueda — posible). ものなら es más hipotético; たら es más real.', 'ものなら implica que la condición es muy difícil o imposible.']},
    {heading: 'Uso literario y poético', paragraphs: ['"生きかえるものなら" (si pudiera volver a vivir) es muy literario. "言い直すものなら" (si pudiera corregir lo que dije) expresa lamento imposible de cambiar.', 'Common en narrativas y expresiones sentimentales.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜ものなら: condición hipotética imposible', graphicPrompt: 'Tabla: 〜ものなら (imposible) vs 〜たら (posible)', scene: [['できるものなら、行きたい。', 'Quisiera ir si fuera posible.'], ['お金があるものなら、家を買うのに。', 'Compraría casa si tuviera dinero.'], ['若いものなら、何でも挑戦するのに。', 'Haría todo si fuera joven.'], ['時間があるものなら、旅したい。', 'Quisiera viajar si tuviera tiempo.'], ['生き返るものなら。', 'Si pudiera volver a vivir...']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['仮定', '願い', '不可能']},
  practice: {levels: [{id: 'level-1', title: '〜ものなら correcto', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: 'Deseo imposible', lines: [['', 'できるものなら、行___。']], options: ['きたい', 'きました', 'きます', 'く'], answer: 'きたい', explain: 'ものなら + たい (deseo imposible).'}, {scene: '〜ものなら + のに', lines: [['', 'お金があるものなら、買___のに。']], options: ['った', 'う', 'い'], answer: 'う', explain: 'ものなら + のに (lamento).'}]}, {id: 'level-2', title: '〜ものなら en contexto', tag: 'Contexto', intro: 'Completa con la forma correcta.', type: 'guidedText', scene: 'Deseos y lamentos imposibles.', text: 'できるものなら、[[0]]。 時間があるものなら、[[1]]。 お金があるものなら、[[2]]。', blanks: [{options: ['行きたい', 'います'], answer: '行きたい', explain: 'ものなら + たい.'}, {options: ['旅したい', 'ます'], answer: '旅したい', explain: 'ものなら + たい.'}, {options: ['買うのに', 'ます'], answer: '買うのに', explain: 'ものなら + のに (lamento).'}]}, {id: 'level-3', title: 'Escritura con 〜ものなら', tag: 'Escritura', intro: 'Expresa deseos imposibles.', type: 'freeText', scene: 'Mis deseos y lamentos hipotéticos.', text: '1. [[0]] (Quisiera viajar si fuera posible). 2. [[1]] (Si tuviera dinero...). 3. [[2]] (Si fuera joven...).', blanks: [{answer: 'できるものなら、旅したい', accepted: ['ものなら', '旅'], explain: 'ものなら + たい.'}, {answer: 'お金があるものなら、買うのに', accepted: ['ものなら', 'のに'], explain: 'ものなら + のに (lamento).'}, {answer: '若いものなら、挑戦するのに', accepted: ['ものなら', '若い'], explain: 'ものなら + のに.'}]}, {id: 'level-4', title: 'Análise de 〜ものなら', tag: 'Análise', intro: 'Explica el significado.', type: 'write', items: [{scene: 'ものなら vs たら', prompt: '"できるものなら、行きたい" と "できたら、行く" の違いは何？', answer: '"できるものなら、行きたい" は条件が難しい・不可能（もし可能なら、という希望）。"できたら、行く" は条件がより現実的（できそうなら、という予想）。ものなら は仮定がより不可能に近い。', accepted: ['不可能', '可能性', '現実'], explain: 'ものなら: imposible; たら: posible/real.'}]}]},
}

export default topic
