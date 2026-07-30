import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'instrumental-b1',
  order: '07',
  color: '#1a2ecc',
  category: 'Casos y Preposiciones',
  level: 'B1',
  title: 'Caso Instrumental en Ruso B1',
  shortTitle: 'Instrumental (tools, manner, with)',
  metaTitle: 'Instrumental en Ruso B1 — Caso de Medios y Maneras',
  description: 'El instrumental (творительный падеж) expresa: con qué (tool: ручка — pen), cómo (manera: быстро — quickly), quién es (predicate nominal: быть учителем — be a teacher). Casos: -ом/-ем (masc/neut), -ой/-ей (fem), -ами/-ями (plural).',
  lead: 'Domina instrumental: с чем? кем? как? — con qué, quién es, cómo.',
  outcomes: [
    'Usa instrumental para instrumentos: писать ручкой (escribir con bolígrafo)',
    'Expresa profesión/rol: быть учителем (ser profesor)',
    'Entiende instrumental en predicado nominal y después de preposiciones',
    'Forma plural instrumental correctamente',
  ],
  guide: {
    goal: 'Usar instrumental para expresar instrumento, rol y manera.',
    model: 'Я пишу ручкой. Она работает учителем. Мы идём быстро.',
    formula: 'N + -ом/-ем/-ой/-ей/-ами/-ями (según género/número)',
    decisions: [
      'Instrumento: с + instrumental o simple instrumental. Писать ручкой (escribir con bolígrafo)',
      'Rol/predicado: быть + instrumental. Она учитель → Она работает учителем',
      'Con preposiciones: перед (antes de), под (bajo), над (sobre), между (entre)',
      'Plural: -ами (hard) / -ями (soft)',
    ],
    table: [
      ['Género', 'Terminación', 'Ejemplo'],
      ['Masculino', '-ом/-ем', 'ручкой (con bolígrafo)'],
      ['Neutro', '-ом/-ем', 'окном (con ventana)'],
      ['Femenino', '-ой/-ей', 'ручкой (fem), тетрадью (cuaderno fem)'],
      ['Plural', '-ами/-ями', 'ручками (bolígrafos), книгами (libros)'],
    ],
    mistakes: [
      '"Я пишу ручкой" ✓ (no "я пишу ручку") — instrumental para instrumento.',
      '"Она работает учителем" ✓ (no "она работает учителя") — instrumental en predicado.'],
  },
  seo: [
    {heading: '¿Qué es el instrumental?', paragraphs: ['El instrumental (творительный падеж) expresa tres cosas: 1) con qué (instrumento), 2) quién eres (rol/profesión), 3) después de ciertas preposiciones.', 'Es uno de los seis casos principales del ruso.']},
    {heading: '¿Cómo se usa el instrumental para el instrumento o medio?', paragraphs: ['"Я пишу ручкой" — escribo con bolígrafo (instrumental). "Она режет нож" — corta con cuchillo (instrumental).', 'Estructura: verbo transitivo + instrumento en instrumental (no acusativo).']},
    {heading: '¿Cuándo se usa el instrumental en el predicado nominal?', paragraphs: ['"Она учитель" (simple) vs "Она работает учителем" (instrumental en predicado). Después de быть, становиться, работать, считаться, казаться.', '"Он был врачом" — era doctor (instrumental en pasado).']},
    {heading: 'Instrumental después de preposiciones', paragraphs: ['перед (antes): "перед зданием" (antes del edificio). под (bajo): "под столом" (bajo la mesa). над (sobre): "над морем" (sobre el mar).', 'между (entre): "между нами" (entre nosotros). Todas estas preposiciones rigen instrumental.']},
    {heading: 'Formación por género y número', paragraphs: ['Masculino/Neutro: -ом (hard) / -ем (soft). "столом" (mesa), "полем" (campo).', 'Femenino: -ой (hard) / -ей (soft). "ручкой", "тетрадью". Plural: -ами / -ями. "столами", "книгами".']},
  ],
  visual: {mode: 'scene', teacherLens: 'Instrumental: instrumento (con qué), rol (quién), preposiciones', graphicPrompt: 'Tabla: Instrumental por género y función.', scene: [['Я пишу ручкой.', 'Escribo con bolígrafo.'], ['Она работает учителем.', 'Trabaja como profesora.'], ['Он был врачом.', 'Era doctor.'], ['Под столом лежит кот.', 'Bajo la mesa hay un gato.'], ['Она интересуется искусством.', 'Se interesa por el arte.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['творительный', 'инструмент', 'роль']},
  practice: {levels: [{id: 'level-1', title: 'Forma instrumental', tag: 'Múltipla escolha', intro: 'Elige forma correcta.', type: 'choice', items: [{scene: 'Instrumental de instrumento', lines: [['', 'Я пишу ___. (болígrafо)']], options: ['ручку', 'ручка', 'ручкой', 'ручке'], answer: 'ручкой', explain: 'ручкой (instrumental) — instrumento.'}, {scene: 'Instrumental en predicado', lines: [['', 'Она работает ___. (profesor)']], options: ['учителя', 'учитель', 'учителем', 'учителе'], answer: 'учителем', explain: 'учителем (instrumental) — rol/predicado.'}]}, {id: 'level-2', title: 'Instrumental en contexto', tag: 'Instrumental', intro: 'Completa con instrumental.', type: 'guidedText', scene: 'Oraciones con instrumental.', text: 'Я режу хлеб [[0]]. Она была [[1]] . Это произошло [[2]] нами.', blanks: [{options: ['ножа', 'ножом'], answer: 'ножом', explain: 'ножом (instrumental) — instrumento.'}, {options: ['доктора', 'доктором'], answer: 'доктором', explain: 'доктором (instrumental) — predicado.'}, {options: ['перед', 'среди'], answer: 'перед', explain: 'перед + instrumental — before.'}]}, {id: 'level-3', title: 'Escritura con instrumental', tag: 'Instrumental', intro: 'Escribe con instrumental.', type: 'freeText', scene: 'Mis profesiones y herramientas.', text: '1. [[0]] (Escribo con bolígrafo). 2. [[1]] (Trabajo como ingeniero). 3. [[2]] (Bajo la mesa).', blanks: [{answer: 'Я пишу ручкой', accepted: ['ручкой', 'пишу'], explain: 'ручкой (instrumental) — instrumento.'}, {answer: 'Я работаю инженером', accepted: ['инженером', 'работаю'], explain: 'инженером (instrumental) — profesión.'}, {answer: 'Под столом', accepted: ['столом', 'под'], explain: 'столом (instrumental) — после предлога.'}]}, {id: 'level-4', title: 'Análise de instrumental', tag: 'Análise', intro: 'Explica usos del instrumental.', type: 'write', items: [{scene: 'Instrumental en múltiples contextos', prompt: '¿Cuántas funciones tiene el instrumental?', answer: 'Tres: 1) instrumento (с чем): писать ручкой. 2) Rol/predicado nominal: быть учителем. 3) Después de preposiciones: перед, под, над, между + instrumental. Es muy versátil.', accepted: ['инструмент', 'роль', 'предлог'], explain: 'Instrumental: instrumento, rol, preposiciones.'}]}]},
}

export default topic
