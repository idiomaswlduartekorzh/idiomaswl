import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preposiciones-casos-b1',
  order: '14',
  color: '#1a2ecc',
  category: 'Casos y Preposiciones',
  level: 'B1',
  title: 'Preposiciones y Régimen de Casos en Ruso B1',
  shortTitle: 'Preposiciones: régimen de casos',
  metaTitle: 'Preposiciones y Régimen de Casos en Ruso B1',
  description: 'Cada preposición rige un caso específico: в/на + acusativo (movimiento), в/на + locativo (posición); из/с + genitivo (origen); к/по + dativo; перед/под + instrumental. Regla absoluta: no se puede cambiar el caso.',
  lead: 'Domina régimen de preposiciones: в → куда? (ac) vs где? (loc)',
  outcomes: [
    'Distingue preposiciones de movimiento vs posición',
    'Aplica régimen de casos: в + ac vs в + loc',
    'Usa preposiciones de origen: из, с + genitivo',
    'Forma frases con preposiciones correctas',
  ],
  guide: {
    goal: 'Usar preposiciones con el caso correcto según contexto.',
    model: 'В дом (в + ac — into). В доме (в + loc — in). Из дома (из + gen — from). К дому (к + dat — towards).',
    formula: 'Preposición + Caso (genitivo, dativo, acusativo, instrumental, locativo)',
    decisions: [
      'в + Ac (куда? — whither): в город (into the city)',
      'в + Loc (где? — where): в городе (in the city)',
      'из + Gen (откуда? — from where): из города (from the city)',
      'с + Gen (откуда?): с полки (from the shelf)',
      'к + Dat (куда? — towards): к городу (towards the city)',
      'перед/под + Inst: перед домом (before the house), под столом (under the table)',
    ],
    table: [
      ['Preposición', 'Caso', 'Ejemplo'],
      ['в/на', 'Acusativo (movimiento)', 'в город (into city)'],
      ['в/на', 'Locativo (posición)', 'в городе (in city)'],
      ['из/с', 'Genitivo (origen)', 'из города (from city)'],
      ['к/по', 'Dativo (destino)', 'к городу (towards city)'],
      ['перед/под', 'Instrumental', 'перед домом (before house)'],
    ],
    mistakes: [
      '"Я иду в город" ✓ (в + ac — moving into). "Я живу в городе" ✓ (в + loc — living in).',
      '"Он пришёл из дома" ✓ (не "из домом") — из + genitivo siempre.'],
  },
  seo: [
    {heading: '¿Qué es régimen de preposiciones?', paragraphs: ['Régimen es la regla de qué caso rige cada preposición. Cada preposición reclama un caso específico y no otro: в + acusativo (movimiento), в + locativo (posición).', 'Es una regla absoluta en ruso; no hay excepciones.']},
    {heading: 'В/на: acusativo vs locativo', paragraphs: ['"в город" (в + ac — into the city — moving). "в городе" (в + loc — in the city — staying). Diferencia fundamental: acusativo = movimiento; locativo = lugar.', '"на стол" (onto the table) vs "на столе" (on the table) — mismo contraste.']},
    {heading: 'Из/с: genitivo para origen', paragraphs: ['"из города" (from the city — из + genitivo). "с полки" (from the shelf — с + genitivo). Ambas preposiciones de origen toman genitivo.', 'Regla: origen siempre = genitivo.']},
    {heading: 'К: dativo para destino cercano', paragraphs: ['"к городу" (towards the city — dirección cercana o punto de destino). "к дому" (towards the house). к + dativo es más específico que в.', 'Diferencia sutil con в: в = into/within a space; к = towards/approaching.']},
    {heading: 'Перед/под + instrumental', paragraphs: ['"перед домом" (before/in front of the house — instrumental). "под столом" (under the table — instrumental). Estas preposiciones siempre rigen instrumental.', 'Otras: над (above), между (between), за (behind) — todas instrumental.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Preposiciones: régimen de casos. Movimiento vs posición', graphicPrompt: 'Tabla: Preposiciones por caso regente', scene: [['Я иду в город.', 'Voy a la ciudad (в + ac).'], ['Я живу в городе.', 'Vivo en la ciudad (в + loc).'], ['Он пришёл из города.', 'Vino de la ciudad (из + gen).'], ['Она идёт к дому.', 'Va hacia la casa (к + dat).'], ['Кот сидит под столом.', 'El gato está bajo la mesa (под + inst).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['предлог', 'падеж', 'направление']},
  practice: {levels: [{id: 'level-1', title: 'Caso preposición', tag: 'Múltipla escolha', intro: 'Elige caso correcto.', type: 'choice', items: [{scene: 'В + acusativo (movimiento)', lines: [['', 'Я иду ___ школу. (в + ac)']], options: ['в школе', 'в школу', 'из школы', 'к школе'], answer: 'в школу', explain: 'в школу (в + ac) — into school (moving).'}, {scene: 'В + locativo (posición)', lines: [['', 'Я учусь ___ школе. (в + loc)']], options: ['в школу', 'в школе', 'из школы', 'к школе'], answer: 'в школе', explain: 'в школе (в + loc) — in school (staying).'}]}, {id: 'level-2', title: 'Preposiciones en contexto', tag: 'Preposiciones', intro: 'Completa preposiciones.', type: 'guidedText', scene: 'Oraciones con movimiento y posición.', text: 'Я иду [[0]] город. Он живёт [[1]] городе. Она пришла [[2]] города.', blanks: [{options: ['в', 'в', 'в'], answer: 'в', explain: 'в + ac (ciudad — moving).'}, {options: ['в', 'в', 'в'], answer: 'в', explain: 'в + loc (ciudad — in).'}, {options: ['из', 'из', 'из'], answer: 'из', explain: 'из + gen (origen).'}]}, {id: 'level-3', title: 'Escritura con preposiciones', tag: 'Preposiciones', intro: 'Escribe frases con preposiciones.', type: 'freeText', scene: 'Movimiento y ubicación.', text: '1. [[0]] (Voy a la oficina). 2. [[1]] (Trabajo en la oficina). 3. [[2]] (Vengo de la oficina).', blanks: [{answer: 'Я иду в офис', accepted: ['в', 'офис'], explain: 'в офис (в + ac) — to office.'}, {answer: 'Я работаю в офисе', accepted: ['в', 'офисе'], explain: 'в офисе (в + loc) — in office.'}, {answer: 'Я прихожу из офиса', accepted: ['из', 'офиса'], explain: 'из офиса (из + gen) — from office.'}]}, {id: 'level-4', title: 'Análise de régimen', tag: 'Análise', intro: 'Explica régimen.', type: 'write', items: [{scene: 'Razón de acusativo vs locativo', prompt: '¿Por qué "в город" (ac) vs "в городе" (loc)? ¿Cuál es la diferencia?', answer: '"в город" (ac) expresa movimiento hacia un lugar (voy hacia, entro en). "в городе" (loc) expresa posición estática (estoy en, vivo en). Acusativo = dinámico; Locativo = estático. Es la regla universal del ruso.', accepted: ['движение', 'место', 'направление'], explain: 'Ac = movimiento; Loc = posición (régimen obligatorio).'}]}]},
}

export default topic
