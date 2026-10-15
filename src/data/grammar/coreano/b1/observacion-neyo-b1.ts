import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'observacion-neyo-b1',
  order: '20',
  color: '#c60c30',
  category: 'Expresión de Perspectiva',
  level: 'B1',
  title: '-네요 / -네: Observación y Descubrimiento en Coreano B1',
  shortTitle: '-네요 (parece, observo que)',
  metaTitle: '-네요 en Coreano B1 — Expresar Observación Personal',
  description: '-네요 expresa descubrimiento, observación personal o sorpresa: "veo que" o "¡qué...!". Combina -네, que marca una constatación nueva para el hablante, con -요, que aporta cortesía. Es muy frecuente en la conversación natural.',
  lead: 'Domina -네요 para expresar observación: "parece que..., ¡qué...!"',
  outcomes: ['Forma observación con -네요', 'Expresa descubrimiento e inmediatez', 'Usa en conversación natural y reacción', 'Distingues -네요 de -군요 (sorpresa enfática)'],
  guide: {
    goal: 'Expresar que acabas de descubrir o notar algo.',
    model: '날씨가 좋네요. 한국어가 어렵네요. (¡Qué buen día! El coreano es difícil.)',
    formula: '형용사/동사 + -네요',
    decisions: ['-네요: observación o descubrimiento en registro cortés', '-네: forma informal o íntima', '-군요/-는군요: descubrimiento presentado de manera más exclamativa o explicativa', '-구나: descubrimiento informal, frecuente en monólogo o hacia alguien cercano', 'Suele reflejar algo que el hablante acaba de percibir o reconocer'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['-네요', 'Observación cortés', '좋네요 → veo que está bueno/¡qué bueno!'], ['-는군요 / -군요', 'Descubrimiento o impresión marcada', '오는군요 / 좋군요'], ['-구나', 'Descubrimiento informal', '좋구나 → ¡ah, está bueno!']],
    mistakes: ['-네요 no expresa duda: presenta una observación o reacción nueva del hablante.', 'Con verbos de acción en presente, -군요 toma -는군요: 오다 → 오는군요. No es una forma «retrospectiva».', '"-네" es informal o de estilo íntimo; "-네요" añade cortesía.'],
  },
  seo: [
    {heading: '¿Qué es -네요?', paragraphs: ['-네요 expresa que acabas de descubrir o notar algo: "parece que", "veo que", "¡qué...!". Es muy natural en conversación porque marca el momento del descubrimiento.', 'Se usa en reacciones inmediatas, comentarios sobre observaciones personales.']},
    {heading: '¿Cómo se usa -네요 con adjetivos en coreano?', paragraphs: ['"날씨가 좋네요" (¡qué buen día! veo que el día está bueno). "한국어가 어렵네요" (veo que el coreano es difícil).', '"집이 크네요" (¡qué casa tan grande! veo que es grande). -네요 con adjetivos expresa reacción a características.']},
    {heading: '-네요 con verbos (acciones)', paragraphs: ['"열심히 일하네요" (veo que trabajas duro/¡qué duro trabajas!). "계속 공부하네요" (veo que sigues estudiando).', 'Con verbos, -네요 enfatiza la acción en progreso o característica observable.']},
    {heading: '¿Cuál es la diferencia entre -네요 y -군요?', paragraphs: ['-네요 presenta una observación espontánea y suele sonar más interactivo: "날씨가 좋네요" (¡qué buen tiempo hace!).', '-군요/-는군요 presenta un descubrimiento o una impresión con más énfasis explicativo: "날씨가 좋군요", "열심히 공부하는군요". Con verbos de acción en presente se usa -는군요.']},
    {heading: '-네요 vs -구나 (cortés vs informal)', paragraphs: ['-네요: formal/cortés. "좋네요" (parece que está bueno — dirigido a alguien con respeto).', '-구나: informal entre amigos. "좋구나" (parece que está bueno — entre amigos). La diferencia es solo de tono.']},
  ],
  visual: {mode: 'scene', teacherLens: '-네요: observación y descubrimiento. Marcador de perspectiva personal.', graphicPrompt: 'Tabla: -네요 (observación) vs -군요 (sorpresa). Ejemplos.', scene: [['날씨가 좋네요.', '¡Qué buen día!'], ['한국어가 어렵네요.', 'El coreano es difícil (veo).'], ['열심히 일하네요.', '¡Qué duro trabajas!'], ['맛있네요.', '¡Está sabroso!'], ['계속 공부하네요.', 'Sigues estudiando (veo).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['발견', '즉시성', '관찰']},
  practice: {levels: [{id: 'level-1', title: 'Forma -네요', tag: 'Opción múltiple', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Adjetivo + -네요', lines: [['', '날씨가 좋___요.']], options: ['네', '군', '구나', '-는데'], answer: '네', explain: '좋다 → 좋네요 (observación).'}, {scene: '-네요 vs -군요', lines: [['', '집이 크___요! (descubrimiento marcado)']], options: ['네', '군', '구나', 'ㄴ'], answer: '군', explain: '크다 → 크군요 presenta el descubrimiento de forma marcada.'}]}, {id: 'level-2', title: 'Observación en contexto', tag: 'Observación', intro: 'Completa observaciones.', type: 'guidedText', scene: 'Comentarios sobre observaciones.', text: '음식이 맛있[[0]]요. 지금 비가 오[[1]]요. 한국어가 어렵[[2]]요.', blanks: [{options: ['네', '군'], answer: '네', explain: '-네요 con comida.'}, {options: ['네', '군'], answer: '네', explain: '-네요 con lluvia.'}, {options: ['네', '군'], answer: '네', explain: '-네요 con dificultad.'}]}, {id: 'level-3', title: 'Escritura de observación', tag: 'Observación', intro: 'Escribe observaciones.', type: 'freeText', scene: 'Mis observaciones personales.', text: '1. [[0]] (Veo que hace buen día). 2. [[1]] (¡Qué delicioso!). 3. [[2]] (Veo que estudias duro).', blanks: [{answer: '날씨가 좋네요', accepted: ['-네요', '날씨'], explain: '-네요 con clima.'}, {answer: '맛있네요', accepted: ['-네요', '맛'], explain: '-네요 con sabor.'}, {answer: '열심히 공부하네요', accepted: ['-네요', '공부'], explain: '-네요 con estudio.'}]}, {id: 'level-4', title: 'Análisis de observación', tag: 'Análisis', intro: 'Explica observación.', type: 'write', items: [{scene: 'Observación inmediata', prompt: '"-네요" expresa qué tipo de acción del hablante?', answer: '-네요 expresa que el hablante acaba de descubrir, notar u observar algo. Marca el momento del descubrimiento personal: "veo que", "observo que", "parece que". Muy natural en reacciones inmediatas y comentarios conversacionales.', accepted: ['발견', '관찰', '즉시'], explain: '-네요 marca descubrimiento inmediato del hablante.'}]}]},
}

export default topic
