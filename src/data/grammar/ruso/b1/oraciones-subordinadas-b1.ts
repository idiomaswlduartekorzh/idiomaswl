import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'oraciones-subordinadas-b1',
  order: '16',
  color: '#1a2ecc',
  category: 'Sintaxis Compleja',
  level: 'B1',
  title: 'Oraciones Subordinadas en Ruso B1',
  shortTitle: 'Subordinadas: что, который, если, потому что',
  metaTitle: 'Oraciones Subordinadas en Ruso B1',
  description: 'Oraciones subordinadas (придаточные предложения) conectan dos cláusulas con conectores: что (que), который (que relativo), если (si), потому что (porque). Cada conector tiene su función sintáctica y semántica.',
  lead: 'Domina subordinadas: что (that), который (which), потому что (because)',
  outcomes: [
    'Forma oraciones subordinadas con que',
    'Usa relativos: который, чей, где',
    'Expresa condición (если) y causa (потому что)',
    'Distingue conectores por función sintáctica',
  ],
  guide: {
    goal: 'Construir oraciones complejas con subordinadas.',
    model: 'Я знаю, что ты придешь. Это человек, который меня помогал. Я не пришел, потому что болел.',
    formula: 'Главное предложение + Союз + Придаточное предложение',
    decisions: [
      'что (that): "Я знаю, что ты придёшь" (objeto directo)',
      'который (which/who): "Это человек, который меня помогал" (relativo)',
      'если (if): "Если ты придёшь, мы пойдём" (condición)',
      'потому что (because): "Я не пришел, потому что болел" (causa)',
    ],
    table: [
      ['Conector', 'Función', 'Ejemplo'],
      ['что', 'Objeto directo', 'Я знаю, что ты придешь'],
      ['который', 'Relativo', 'Это человек, который помогал'],
      ['если', 'Condición', 'Если ты придешь, мы пойдём'],
      ['потому что', 'Causa', 'Не пришел, потому что болел'],
    ],
    mistakes: [
      '"Я знаю, что он приходит" ✓ — что sin cambio de caso.',
      '"Это человек, который помогал" ✓ (no "который я помогал") — который = who/which relativo.'],
  },
  seo: [
    {heading: '¿Qué son oraciones subordinadas?', paragraphs: ['Oraciones subordinadas (придаточные) dependen de una oración principal: "Я знаю" + "что ты придешь" = "Я знаю, что ты придешь".', 'Se unen con conectores: что, который, если, потому что.']},
    {heading: 'Subordinadas de objeto con ЧТО', paragraphs: ['"Я знаю, что ты придешь" — que (sé que vienes). "Он сказал, что уходит" — que (dice que se va).', 'ЧТО marca la cláusula subordinada como objeto directo de un verbo principal.']},
    {heading: 'Relativas con КОТОРЫЙ', paragraphs: ['"Это человек, который меня помогал" — que/quien (el hombre que me ayudó). "Книга, которую я читал, очень интересная" — que (el libro que leía es muy interesante).', 'КОТОРЫЙ concuerda con el sustantivo al que modifica (género, número, caso).']},
    {heading: 'Condicionales con ЕСЛИ', paragraphs: ['"Если ты придешь, мы пойдём в кино" — si (si vienes, iremos al cine). "Если бы ты пришел, мы бы пошли" — si (si vinieras, iríamos — contrafáctico).', 'Estructura: если + presente/pasado + resultado en futuro/presente.']},
    {heading: 'Causales con ПОТОМУ ЧТО', paragraphs: ['"Я не пришел, потому что болел" — porque (no vine porque estaba enfermo). "Она ушла, потому что устала" — porque (se fue porque estaba cansada).', 'ПОТОМУ ЧТО explica la causa de la acción principal.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Subordinadas: conectores que, который, если, потому что', graphicPrompt: 'Tabla: Conectores y funciones sintácticas', scene: [['Я знаю, что ты придешь.', 'Sé que vendrás (objeto con что).'], ['Это человек, который помогал.', 'Este es el hombre que ayudaba (relativa).'], ['Если ты придешь, мы пойдём.', 'Si vienes, iremos (condicional).'], ['Я не пришел, потому что болел.', 'No vine porque estaba enfermo (causal).'], ['Книга, которую я читал, интересная.', 'El libro que leía es interesante (relativa).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['союз', 'придаточная', 'функция']},
  practice: {levels: [{id: 'level-1', title: 'Conector correcto', tag: 'Múltipla escolha', intro: 'Elige conector.', type: 'choice', items: [{scene: 'ЧТО (objeto)', lines: [['', 'Я знаю, ___ ты придешь.']], options: ['что', 'который', 'если', 'потому что'], answer: 'что', explain: 'что (objeto) — that.'}, {scene: 'ЕСЛИ (condición)', lines: [['', '___ ты придешь, мы пойдём.']], options: ['что', 'который', 'если', 'потому что'], answer: 'если', explain: 'если (condicional) — if.'}]}, {id: 'level-2', title: 'Conectores en contexto', tag: 'Subordinadas', intro: 'Completa conectores.', type: 'guidedText', scene: 'Oraciones complejas.', text: 'Я знаю, ___ он здесь. Это человек, ___ помогал мне. Она не пришла, ___ была больна.', blanks: [{options: ['что', 'который'], answer: 'что', explain: 'что (objeto).'}, {options: ['что', 'который'], answer: 'который', explain: 'который (relativa).'}, {options: ['потому что', 'если'], answer: 'потому что', explain: 'потому что (causa).'}]}, {id: 'level-3', title: 'Escritura con subordinadas', tag: 'Subordinadas', intro: 'Escribe oraciones complejas.', type: 'freeText', scene: 'Mis oraciones con subordinadas.', text: '1. [[0]] (Sé que vienes). 2. [[1]] (El hombre que vino). 3. [[2]] (Si ves, vamos).', blanks: [{answer: 'Я знаю, что ты придешь', accepted: ['что', 'придешь'], explain: 'ЧТО + objeto.'}, {answer: 'Это человек, который пришел', accepted: ['который', 'пришел'], explain: 'КОТОРЫЙ (relativa).'}, {answer: 'Если ты видишь, мы идем', accepted: ['если', 'видишь'], explain: 'ЕСЛИ (condición).'}]}, {id: 'level-4', title: 'Análise de conectores', tag: 'Análise', intro: 'Explica conectores.', type: 'write', items: [{scene: 'Funciones de conectores', prompt: '¿Cuál es la diferencia entre "что" y "который"?', answer: '"ЧТО" marca una cláusula sustantiva (objeto directo): "Я знаю, что ты придешь". "КОТОРЫЙ" es un pronombre relativo que modifica un sustantivo: "Это человек, который пришел". ЧТО = conector de cláusula subordinada; КОТОРЫЙ = relativo con concordancia.', accepted: ['объект', 'релятив', 'согласование'], explain: 'ЧТО: objeto; КОТОРЫЙ: relativo con concordancia.'}]}]},
}

export default topic
