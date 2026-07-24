import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genitivo-negacion-b1',
  order: '06',
  color: '#1a2ecc',
  category: 'Casos y Preposiciones',
  level: 'B1',
  title: 'Genitivo con Negación en Ruso B1',
  shortTitle: 'Genitivo después de нет, нельзя, нет (hay/no hay)',
  metaTitle: 'Genitivo con Negación en Ruso B1',
  description: 'Con negación (нет, нельзя, не могу), el objeto va en genitivo, no acusativo: "Нет молока" (no hay leche — gen), no "нет молоко". Diferente del acusativo positivo: "Я вижу молоко" (veo leche — ac). Regla absoluta y fundamental en ruso.',
  lead: 'Domina genitivo con negación: нет чего? нельзя что делать?',
  outcomes: [
    'Usa genitivo después de нет, нельзя, не могу, невозможно',
    'Distingue genitivo (negación) de acusativo (afirmación)',
    'Forma oraciones de existencia negativa correctas',
    'Expresa prohibiciones y imposibilidades',
  ],
  guide: {
    goal: 'Usar genitivo correctamente en contextos de negación.',
    model: 'Нет молока. Я не вижу молока. Нельзя открывать дверь.',
    formula: 'нет / нельзя / невозможно + Gen',
    decisions: [
      'нет + Gen: "Нет молока" (no hay leche — gen), "Нет времени" (no hay tiempo)',
      'нельзя + Inf: "Нельзя открывать дверь" (no se puede abrir la puerta)',
      'не могу + Inf: "Я не могу пойти" (no puedo ir)',
      'Positivo usa Ac: "Я вижу молоко" (veo leche) vs "Я не вижу молока" (no veo leche)',
    ],
    table: [
      ['Estructura', 'Caso', 'Ejemplo'],
      ['Положительно', 'Acusativo', 'Я вижу молоко'],
      ['С отрицанием', 'Genitivo', 'Я не вижу молока / Нет молока'],
    ],
    mistakes: [
      '"Нет молока" ✓ (no "нет молоко") — genitivo obligatorio con нет.',
      '"Нельзя открывать дверь" ✓ (no "нельзя открыв дверь") — infinitivo sin modificador.'],
  },
  seo: [
    {heading: 'Genitivo con нет (no hay)', paragraphs: ['"Нет молока" — no hay leche (gen). "Нет времени" — no hay tiempo (gen). Estructura fija: нет + genitivo.', 'Con negación existencial, el caso siempre es genitivo.']},
    {heading: 'Genitivo con negar verbo transitivo', paragraphs: ['"Я не вижу молока" — no veo leche (gen). "Я не люблю кофе" — no amo café (gen). Cuando niegas un verbo transitivo, el objeto va en genitivo.', 'Positivo: "Я вижу молоко" (ac) vs negativo: "Я не вижу молока" (gen).']},
    {heading: 'Genitivo con нельзя, невозможно', paragraphs: ['"Нельзя открывать дверь" — no se puede abrir la puerta (inf). "Невозможно пойти" — es imposible ir (inf).', 'Prohibiciones y imposibilidades usan infinitivo + genitivo para objetos.']},
    {heading: 'Excepción: algunos verbos toman acusativo en negación', paragraphs: ['"Я не люблю кофе" (gen) vs "Я не брал ключи" (ac — pasado de tomar). Mayoría toma genitivo, algunos toman acusativo (verbs of receiving, taking).', 'En hablantes modernos, el genitivo domina la negación.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Genitivo con negación: нет чего? — Gen vs Ac en positivo', graphicPrompt: 'Tabla: Positivo (Ac) vs Negación (Gen)', scene: [['Нет молока.', 'No hay leche (gen).'], ['Я не вижу молока.', 'No veo leche (gen).'], ['Нельзя открывать дверь.', 'No se puede abrir la puerta.'], ['Я не могу пойти.', 'No puedo ir.'], ['Невозможно найти квартиру.', 'Es imposible encontrar apartamento.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['род.падеж', 'отрицание', 'контраст']},
  practice: {levels: [{id: 'level-1', title: 'Genitivo vs Acusativo', tag: 'Múltipla escolha', intro: 'Elige caso correcto.', type: 'choice', items: [{scene: 'Negación: genitivo', lines: [['', 'Нет ___. (leche)']], options: ['молоко', 'молока', 'молоке', 'молоком'], answer: 'молока', explain: 'молока (gen) — нет + genitivo.'}, {scene: 'Positivo: acusativo', lines: [['', 'Я вижу ___. (leche)']], options: ['молоко', 'молока', 'молоке', 'молоком'], answer: 'молоко', explain: 'молоко (ac) — positivo + acusativo.'}]}, {id: 'level-2', title: 'Negación en contexto', tag: 'Negación', intro: 'Completa con genitivo.', type: 'guidedText', scene: 'Oraciones con negación.', text: 'Нет [[0]]. Я не вижу [[1]]. Нельзя [[2]] дверь.', blanks: [{options: ['время', 'времени'], answer: 'времени', explain: 'времени (gen) — нет + gen.'}, {options: ['молоко', 'молока'], answer: 'молока', explain: 'молока (gen) — не вижу + gen.'}, {options: ['открывать', 'открыть'], answer: 'открывать', explain: 'открывать (inf) — нельзя + inf.'}]}, {id: 'level-3', title: 'Escritura con genitivo', tag: 'Negación', intro: 'Escribe negaciones correctas.', type: 'freeText', scene: 'Expresar lo que no hay.', text: '1. [[0]] (No hay leche). 2. [[1]] (No veo la carta). 3. [[2]] (No se puede abrir).', blanks: [{answer: 'Нет молока', accepted: ['молока', 'нет'], explain: 'молока (gen) — nет + gen.'}, {answer: 'Я не вижу письма', accepted: ['письма', 'генитив'], explain: 'письма (gen) — не вижу + gen.'}, {answer: 'Нельзя открывать', accepted: ['открывать', 'нельзя'], explain: 'открывать (inf) — nельзя + inf.'}]}, {id: 'level-4', title: 'Análise de genitivo y negación', tag: 'Análise', intro: 'Explica diferencia de casos.', type: 'write', items: [{scene: 'Caso en negación', prompt: '"Я вижу молоко" vs "Я не вижу молока": ¿por qué cambio de caso?', answer: 'Con afirmación, el objeto directo va en acusativo: "молоко" (ac). Con negación, va en genitivo: "молока" (gen). Es una regla fija del ruso: negación requiere genitivo para objetos directos.', accepted: ['винительный', 'родительный', 'отрицание'], explain: 'Negación = genitivo; Positivo = acusativo.'}]}]},
}

export default topic
