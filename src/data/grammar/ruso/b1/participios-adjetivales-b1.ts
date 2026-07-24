import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'participios-adjetivales-b1',
  order: '20',
  color: '#1a2ecc',
  category: 'Verbos y Participios',
  level: 'B1',
  title: 'Participios Adjetivales en Ruso B1',
  shortTitle: 'Participios activos y pasivos (como adjetivos)',
  metaTitle: 'Participios Adjetivales en Ruso B1',
  description: 'Participios (причастия) son formas verbales con función adjetival. Activos: читающий (que lee), прочитавший (que ha leído). Pasivos: читаемый (que es leído), прочитанный (que ha sido leído). Concuerdan en género, número, caso.',
  lead: 'Domina participios adjetivales: читающий (que lee), прочитанный (que fue leído)',
  outcomes: [
    'Forma participios activos y pasivos',
    'Usa participios como adjetivos en atributo',
    'Entiende concordancia género/número/caso',
    'Construye oraciones con participios',
  ],
  guide: {
    goal: 'Usar participios como modificadores adjetivales del sustantivo.',
    model: 'Человек, читающий книгу (the man reading a book). Книга, прочитанная вчера (the book read yesterday).',
    formula: 'Раíz + Sufijo participial + Flexión adjectives (-ый/-ой, -ая/-яя, -ое/-ее, -ые/-ые)',
    decisions: [
      'Participio activo presente: читающий (que lee — НСВ)',
      'Participio activo pasado: прочитавший (que ha leído — СВ)',
      'Participio pasivo presente: читаемый (que es leído — НСВ)',
      'Participio pasivo pasado: прочитанный (que fue/ha sido leído — СВ)',
    ],
    table: [
      ['Tipo', 'Tiempo', 'Ejemplo'],
      ['Activo presente', 'НСВ', 'читающий (que lee)'],
      ['Activo pasado', 'СВ', 'прочитавший (que ha leído)'],
      ['Pasivo presente', 'НСВ', 'читаемый (que es leído)'],
      ['Pasivo pasado', 'СВ', 'прочитанный (que fue leído)'],
    ],
    mistakes: [
      '"человек, читающий книгу" ✓ — participio activo como adjetivo. "Он читает книгу" vs "Он, читающий книгу" (adjetival) vs atributo.',
      '"книга, прочитанная вчера" ✓ — participio pasivo en atributo con concordancia.'],
  },
  seo: [
    {heading: '¿Qué son participios adjetivales?', paragraphs: ['Participios (причастия) combinan propiedades de verbo y adjetivo. Funcionan como adjetivos que modifican sustantivos: "hombre que lee" = "hombre leyente" = "человек читающий".', 'Concuerdan en género, número, caso con el sustantivo.']},
    {heading: 'Participios activos', paragraphs: ['"Человек, читающий книгу" (hombre que lee un libro — participio activo de НСВ). "Человек, прочитавший книгу" (hombre que ha leído el libro — participio activo de СВ).', 'Expresan quién realiza la acción.']},
    {heading: 'Participios pasivos', paragraphs: ['"Книга, читаемая студентами" (libro que es leído por estudiantes — participio pasivo de НСВ). "Книга, прочитанная вчера" (libro leído ayer — participio pasivo de СВ).', 'Expresan quién/qué recibe la acción.']},
    {heading: 'Concordancia de participios', paragraphs: ['"Большой читающий человек" (hombre leyente grande — masc). "Большая читающая женщина" (mujer leyente grande — fem).', 'Participios concuerdan exactamente como adjetivos: género, número, caso.']},
    {heading: 'Uso en oraciones relatoras', paragraphs: ['"Книга, которую я читал" (libro que leí) puede expresarse: "Книга, читаемая мной" o "Книга, прочитанная мной" (libro leído por mí).', 'Los participios reemplazan cláusulas relativas en ruso formal/culto.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Participios: activos y pasivos como adjetivos', graphicPrompt: 'Tabla: Participios por tipo y tiempo', scene: [['Человек, читающий книгу.', 'El hombre que lee el libro.'], ['Книга, прочитанная вчера.', 'El libro leído ayer.'], ['Женщина, поющая в хоре.', 'La mujer que canta en el coro.'], ['Письмо, написанное мной.', 'La carta escrita por mí.'], ['Дерево, растущее в саду.', 'El árbol que crece en el jardín.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['причастие', 'род', 'согласование']},
  practice: {levels: [{id: 'level-1', title: 'Participio correcto', tag: 'Múltipla escolha', intro: 'Elige participio.', type: 'choice', items: [{scene: 'Participio activo', lines: [['', 'Человек, ___ книгу.']], options: ['читаю', 'читающий', 'читая', 'читал'], answer: 'читающий', explain: 'читающий (participio activo) — who reads.'}, {scene: 'Participio pasivo', lines: [['', 'Книга, ___ вчера.']], options: ['читаемая', 'читаю', 'прочитанная', 'читая'], answer: 'прочитанная', explain: 'прочитанная (participio pasivo) — read (by me).'}]}, {id: 'level-2', title: 'Concordancia participio', tag: 'Concordancia', intro: 'Completa con concordancia.', type: 'guidedText', scene: 'Concordancia género/número.', text: 'Человек, [[0]]. Женщина, [[1]]. Дети, [[2]].', blanks: [{options: ['читающий', 'читающая'], answer: 'читающий', explain: 'читающий (masc) — man.'}, {options: ['читающая', 'читающий'], answer: 'читающая', explain: 'читающая (fem) — woman.'}, {options: ['читающие', 'читающий'], answer: 'читающие', explain: 'читающие (plural) — children.'}]}, {id: 'level-3', title: 'Escritura con participios', tag: 'Participios', intro: 'Escribe participios.', type: 'freeText', scene: 'Descripciones con participios.', text: '1. [[0]] (El hombre que lee). 2. [[1]] (La mujer que canta). 3. [[2]] (El libro leído).', blanks: [{answer: 'Человек, читающий книгу', accepted: ['читающий', 'книгу'], explain: 'читающий (participio activo masc).'}, {answer: 'Женщина, поющая в хоре', accepted: ['поющая', 'хоре'], explain: 'поющая (participio activo fem).'}, {answer: 'Книга, прочитанная мной', accepted: ['прочитанная', 'мной'], explain: 'прочитанная (participio pasivo fem).'}]}, {id: 'level-4', title: 'Análise de participios', tag: 'Análise', intro: 'Explica participios.', type: 'write', items: [{scene: 'Participios vs adjetivos', prompt: '¿En qué se diferencian los participios de los adjetivos verdaderos?', answer: 'Los participios vienen de verbos y retienen características verbales (toman objeto directo: "человек, читающий книгу"). Los adjetivos verdaderos no toman objetos ("большой человек"). Pero ambos concuerdan como adjetivos en género, número, caso. Los participios son "adjetivos verbales".', accepted: ['глагол', 'объект', 'согласование'], explain: 'Participios: de verbo, toman objeto; adjetivos: intrínsecos.'}]}]},
}

export default topic
