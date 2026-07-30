import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'aspecto-perfectivo-imperfectivo-b1',
  order: '05',
  color: '#1a2ecc',
  category: 'Aspecto Verbal',
  level: 'B1',
  title: 'Aspecto Perfectivo e Imperfectivo en Ruso B1',
  shortTitle: 'СВ (perfectivo) vs НСВ (imperfectivo)',
  metaTitle: 'Aspecto Perfectivo e Imperfectivo en Ruso B1',
  description: 'El aspecto verbal es la característica más importante del ruso: СВ (perfectivo) expresa acción completada o puntual; НСВ (imperfectivo) expresa acción en proceso, habitual o repetida. La mayoría de pares de verbos tienen СВ e НСВ: читать (НСВ) vs прочитать (СВ). Dominar el aspecto es clave para sonar natural en ruso.',
  lead: 'Domina el aspecto: сделать vs делать, прочитать vs читать — una acción completada vs en proceso.',
  outcomes: [
    'Distingue perfectivo (СВ) de imperfectivo (НСВ)',
    'Entiende cuándo usar cada aspecto según contexto temporal',
    'Forma pares de aspectos: основные, приходить/прийти, читать/прочитать',
    'Usa aspectos correctamente en pasado, presente y futuro',
  ],
  guide: {
    goal: 'Elegir el aspecto correcto según si la acción fue completada (СВ) o estaba en proceso/es habitual (НСВ).',
    model: 'Вчера я писал письмо. (Impf: escribía — proceso). Вчера я написал письмо. (Perf: escribí — completado).',
    formula: 'НСВ (писать, делать, читать) vs СВ (написать, сделать, прочитать)',
    decisions: [
      'СВ: acción completada, resultado importante — "Я написал письмо" (escribí la carta — está hecha)',
      'НСВ: acción en proceso, habitual, repetida — "Я писал письмо" (escribía la carta — era un proceso)',
      'НСВ en presente para acciones generales: "Я пишу письма каждый день"',
      'СВ en futuro cercano: "Я напишу письмо завтра"',
    ],
    table: [
      ['Aspecto', 'Significado', 'Ejemplo'],
      ['СВ (completado)', 'Acción terminada, puntual', 'написать — escribí (está hecho)'],
      ['НСВ (proceso)', 'En desarrollo, habitual, repetido', 'писать — escribía, escribo (proceso/hábito)'],
    ],
    mistakes: [
      '"Я написал письмо вчера" ✓ — СВ en pasado (acción completada).',
      '"Я писал письмо вчера 2 часа" ✓ — НСВ con duración (proceso).',
      'Presente solo con НСВ: "Я пишу" (escribo); no existe "Я напишу" en presente.',
    ],
  },
  seo: [
    {heading: '¿Qué es el aspecto en ruso?', paragraphs: ['El aspecto es la diferencia entre сделать (hacer — completado) y делать (hacer — en proceso). Dos formas del verbo con significados relacionados pero usos muy distintos.', 'Es lo más importante después de casos y género en ruso.']},
    {heading: '¿Qué expresa el aspecto perfectivo (СВ)?', paragraphs: ['"Я написал письмо" — escribí la carta (está lista). "Она прочитала книгу" — leyó el libro (terminó). СВ enfatiza que la acción fue completada y tiene un resultado.', 'Común en pasado: "Что ты делал вчера?" — "Я смотрел фильм" (НСВ — qué hacías). "Что ты сделал вчера?" — "Я написал письмо" (СВ — qué hiciste/completaste).']},
    {heading: '¿Qué expresa el aspecto imperfectivo (НСВ)?', paragraphs: ['"Я писал письмо" — escribía la carta (era un proceso). "Она читает книги каждый день" — lee libros cada día (hábito). НСВ enfatiza el proceso, no el resultado.', 'Con duraciones: "Я писал письмо 2 часа" (escribía durante 2 horas — proceso)']},
    {heading: 'Pares de aspectos más comunes', paragraphs: ['делать/сделать (hacer), писать/написать (escribir), читать/прочитать (leer), говорить/сказать (decir), идти/пойти (ir), ехать/поехать (viajar).', 'Cada par tiene un aspecto imperfectivo (НСВ) y uno perfectivo (СВ) con significados relacionados.']},
    {heading: 'Presente: solo imperfectivo', paragraphs: ['"Я пишу письмо" (escribo — acción en progreso). No existe presente de СВ: no se dice "Я напишу письмо" para hablar de ahora.', 'Futuro de СВ: "Я напишу письмо завтра" (escribiré la carta — ya sea hoy o mañana, completaré).']},
    {heading: 'Pasado: ambos aspectos', paragraphs: ['"Я писал письмо" (НСВ — escribía, estaba en proceso). "Я написал письмо" (СВ — escribí, terminé). Diferencia clave en narrativa y descripción.', 'En histórico: "Я писал письмо 2 часа, когда позвонил мой друг" (escribía cuando llamó mi amigo — НСВ para el proceso interrumpido).']},
  ],
  visual: {mode: 'scene', teacherLens: 'Aspecto: СВ (completado) vs НСВ (proceso/hábito)', graphicPrompt: 'Tabla: СВ (perfecto) vs НСВ (imperfecto). Línea temporal.', scene: [['Я писал письмо.', 'Escribía la carta (proceso).'], ['Я написал письмо.', 'Escribí la carta (completada).'], ['Она читает книги.', 'Lee libros (hábito, НСВ).'], ['Она прочитала книгу.', 'Leyó el libro (terminó, СВ).'], ['Завтра я напишу письмо.', 'Mañana escribiré (СВ futuro).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['СВ', 'НСВ', 'контекст']},
  practice: {levels: [{id: 'level-1', title: 'Forma correcta (СВ vs НСВ)', tag: 'Múltipla escolha', intro: 'Elige el aspecto correcto.', type: 'choice', items: [{scene: 'СВ vs НСВ en pasado', lines: [['', 'Я ___ письмо вчера. (acción completada)']], options: ['писал', 'написал', 'пишу', 'напишу'], answer: 'написал', explain: 'написал (СВ) — acción completada.'}, {scene: 'НСВ para hábito', lines: [['', 'Я каждый день ___ письма.']], options: ['напишу', 'написал', 'пишу', 'напису'], answer: 'пишу', explain: 'пишу (НСВ) — hábito presente.'}]}, {id: 'level-2', title: 'Aspecto en contexto', tag: 'Aspecto', intro: 'Completa con aspecto correcto.', type: 'guidedText', scene: 'Narrativa con proceso y resultado.', text: 'Я 2 часа [[0]] письмо. Наконец я [[1]] его. После этого я [[2]] кофе.', blanks: [{options: ['писал', 'написал'], answer: 'писал', explain: 'писал (НСВ) — duración (2 horas).'}, {options: ['писал', 'написал'], answer: 'написал', explain: 'написал (СВ) — resultado (terminé).'}, {options: ['пил', 'пил'], answer: 'пил', explain: 'пил (НСВ) — después de completar.'}]}, {id: 'level-3', title: 'Escritura con aspecto', tag: 'Aspecto', intro: 'Escribe con aspecto correcto.', type: 'freeText', scene: 'Mi rutina y acciones ayer.', text: '1. [[0]] (Escribo cartas cada día). 2. [[1]] (Ayer escribí una carta importante). 3. [[2]] (Escribía durante 2 horas).', blanks: [{answer: 'Я пишу письма каждый день', accepted: ['пишу', 'НСВ'], explain: 'пишу (НСВ) — hábito.'}, {answer: 'Вчера я написал важное письмо', accepted: ['написал', 'СВ'], explain: 'написал (СВ) — acción completada.'}, {answer: 'Я писал 2 часа', accepted: ['писал', 'НСВ'], explain: 'писал (НСВ) — duración.'}]}, {id: 'level-4', title: 'Análise de aspecto', tag: 'Análise', intro: 'Explica la diferencia de aspecto.', type: 'write', items: [{scene: 'СВ vs НСВ en narrativa', prompt: '"Я писал письмо" vs "Я написал письмо": ¿cuál expresa resultado?', answer: '"Я написал письмо" (СВ) expresa que la carta está terminada (resultado). "Я писал письмо" (НСВ) es solo que escribía (proceso). Diferencia clave: СВ enfatiza conclusión; НСВ enfatiza desarrollo.', accepted: ['результат', 'процесс', 'завершение'], explain: 'СВ expresa resultado completado; НСВ expresa proceso.'}]}]},
}

export default topic
