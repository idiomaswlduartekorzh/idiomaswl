import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'noni-b1',
  order: '18',
  color: '#dc2626',
  category: 'Contraste y Concesión',
  level: 'B1',
  title: '〜のに — Concesión y Contraste en Japonés B1',
  shortTitle: '〜のに (although, in spite of, yet)',
  metaTitle: '〜のに en Japonés B1 — Expresar Contraste y Concesión',
  description: '〜のに expresa contraste: "勉強したのに、試験に落ちた" (estudié, pero reprobé; aunque estudié...). O "～なのに～だ" muestra sorpresa/frustración. Literal: no + i (nominalizador + partícula de tiempo/contraste).',
  lead: 'Domina 〜のに: expresa contraste, concesión y frustración',
  outcomes: [
    'Forma 〜のに con diferentes verbos',
    'Expresa contraste y concesión (aunque...)',
    'Usa para expresar frustración o sorpresa',
    'Distingue 〜のに de けれど (pero)',
  ],
  guide: {
    goal: 'Expresar que algo sucedió de manera contraria a lo esperado: "aunque X, sucedió Y" (frustración, sorpresa).',
    model: '勉強したのに、試験に落ちた。(Benkyou shita noni, shiken ni ochita.) — Estudié, pero reprobé (a pesar de estudiar). 高いのに、質が悪い。(Takai noni, shitsu ga warui.) — Es caro, pero la calidad es mala.',
    formula: 'Verbo [forma pasada/〜た] + のに / Adjetivo/Sustantivo + のに',
    decisions: [
      '〜たのに: contraste con pasado (aunque hice X, pasó Y)',
      '〜ているのに: contraste continuo (a pesar de estar haciendo X, Y sucede)',
      'Adjetivo/Sustantivo + のに: sorpresa/frustración (a pesar de ser X, Y)',
      '〜のに + 〜たらいい: sugerencia (sería bueno si... aunque ahora no lo hace)',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['〜たのに', 'Aunque pasado', '勉強したのに落ちた (estudié pero reprobé)'],
      ['〜ているのに', 'Aunque continuo', '頑張っているのに結果がない (trabajo duro pero sin resultado)'],
      ['形容詞 + のに', 'Sorpresa/frustración', '高いのに質が悪い (caro pero mala calidad)'],
    ],
    mistakes: [
      '「勉強したのに、試験に落ちた」 ✓ (contraste: estudié pero reprobé). 「勉強したから、試験に合格した」 es casual esperado (porque estudié, pasé).',
      '「高いのに、質が悪い」 ✓ (frustración: caro pero malo). 「高いし、質が悪い」 es enumeración neutra (es caro Y mala calidad).'],
  },
  seo: [
    {heading: '¿Qué es 〜のに?', paragraphs: ['〜のに expresa contraste: A debería llevar a B, pero sucedió lo opuesto o algo inesperado. Lleva tono de frustración, sorpresa o lamento.', 'Es muy usado en conversación natural.']},
    {heading: '〜たのに: contraste con pasado', paragraphs: ['"勉強したのに、試験に落ちた" (estudié pero reprobé). "一生懸命働いたのに、給料が上がらない" (trabajo duro pero el salario no sube).', 'El speaker esperaba un resultado pero no sucedió.']},
    {heading: '〜ているのに: contraste continuo', paragraphs: ['"毎日運動しているのに、痩せない" (hago ejercicio diariamente pero no bajo de peso). "説明しているのに、理解していない" (estoy explicando pero no lo entiende).', 'Expresa frustración con una acción continua.']},
    {heading: 'Adjetivo/Sustantivo + のに: sorpresa', paragraphs: ['"新しいのに、壊れている" (es nuevo pero está roto). "子どもなのに、頭がいい" (siendo niño, es muy inteligente).', 'Expresa que una cualidad CONTRADICE una expectativa.']},
    {heading: '〜のに vs けれど', paragraphs: ['"勉強したのに、落ちた" (estudié pero reprobé — frustración) vs "勉強したけれど、落ちた" (estudié pero reprobé — neutral). のに tiene tono emocional más fuerte.', 'Ambas expresan contraste pero のに es más dramático.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜のに: contraste y frustración', graphicPrompt: 'Tabla: Esperado vs Realidad con 〜のに', scene: [['勉強したのに、試験に落ちた。', 'Estudié pero reprobé (frustración).'], ['高いのに、質が悪い。', 'Es caro pero la calidad es mala (sorpresa).'], ['毎日運動しているのに、痩せない。', 'Hago ejercicio diariamente pero no bajo (frustración).'], ['新しいのに、壊れている。', 'Es nuevo pero está roto (sorpresa).'], ['説明しているのに、わかっていない。', 'Estoy explicando pero no entiende (frustración).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['対比', '落胆', 'ぎゃっぷ']},
  practice: {levels: [{id: 'level-1', title: '〜のに correcto', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: 'Contraste pasado', lines: [['', '勉強したの___、試験に落ちた。']], options: ['に', 'で', 'の', 'を'], answer: 'に', explain: 'のに (contraste).'}, {scene: 'Sorpresa adjetivo', lines: [['', '新しいの___、壊れている。']], options: ['に', 'で', 'の', 'て'], answer: 'に', explain: 'のに (sorpresa).'}]}, {id: 'level-2', title: '〜のに en contexto', tag: 'Contexto', intro: 'Completa con contraste.', type: 'guidedText', scene: 'Contrastes y frustraciones.', text: '勉強したの[[0]]落ちた。 毎日運動しているの[[1]]痩せない。 高いの[[2]]質が悪い。', blanks: [{options: ['に', 'で'], answer: 'に', explain: 'のに (contraste).'}, {options: ['に', 'で'], answer: 'に', explain: 'のに (frustración).'}, {options: ['に', 'で'], answer: 'に', explain: 'のに (sorpresa).'}]}, {id: 'level-3', title: 'Escritura con 〜のに', tag: 'Escritura', intro: 'Expresa contrastes.', type: 'freeText', scene: 'Mis frustraciones y sorpresas.', text: '1. [[0]] (Estudié pero reprobé). 2. [[1]] (Es caro pero mala calidad). 3. [[2]] (Hago ejercicio pero no bajo).', blanks: [{answer: '勉強したのに、試験に落ちた', accepted: ['のに', '勉強'], explain: 'のに (contraste).'}, {answer: '高いのに、質が悪い', accepted: ['のに', '高い'], explain: 'のに (sorpresa).'}, {answer: '毎日運動しているのに、痩せない', accepted: ['のに', '運動'], explain: 'のに (frustración).'}]}, {id: 'level-4', title: 'Análise de 〜のに', tag: 'Análise', intro: 'Explica significado.', type: 'write', items: [{scene: 'のに vs けれど', prompt: '"勉強したのに落ちた" と "勉強したけれど落ちた" の違いは何？', answer: '両方ともcontraste を表すが、"のに" はより感情的（落胆・驚き・後悔）。"けれど" はより中立的・客観的。"のに" は期待と現実のギャップに焦点; "けれど" は単なる事実のcontraste。', accepted: ['感情', '期待', 'ぎゃっぷ'], explain: 'のに: emocional; けれど: neutral.'}]}]},
}

export default topic
