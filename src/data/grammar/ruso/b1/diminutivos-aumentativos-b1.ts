import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'diminutivos-aumentativos-b1',
  order: '19',
  color: '#1a2ecc',
  category: 'Formación de Palabras',
  level: 'B1',
  title: 'Diminutivos y Aumentativos en Ruso B1',
  shortTitle: 'Diminutivos: -ик, -ка, -ко; Aumentativos: -ище',
  metaTitle: 'Diminutivos y Aumentativos en Ruso B1',
  description: 'Sufijos diminutivos (-ик, -ка, -ко, -ечка) y aumentativos (-ище, -ина) modifican sustantivos para expresar tamaño, afección o énfasis. "стол" (mesa) → "столик" (mesita), "дом" (casa) → "домище" (casarón).',
  lead: 'Domina diminutivos y aumentativos: tono y tamaño con sufijos',
  outcomes: [
    'Forma diminutivos y aumentativos con sufijos',
    'Entiende matices de tamaño y afección',
    'Usa diminutivos en conversación coloquial',
    'Expresa énfasis con aumentativos',
  ],
  guide: {
    goal: 'Usar sufijos para expresar tamaño, afección y énfasis.',
    model: 'столик (pequeña mesa), кошечка (gatita), домище (casarón)',
    formula: 'Raíz + Sufijo (-ик, -ка, -ко/-чка, -ище)',
    decisions: [
      '-ик: diminutivo masculino. стол → столик (pequeña mesa)',
      '-ка: diminutivo femenino. кошка → кошечка (gatita), pero кошка ya es diminutivo de кот',
      '-ко: diminutivo neutro. окно → оконечко (ventanita)',
      '-ище: aumentativo. дом → домище (casarón), ветер → ветрище (ventarrón)',
    ],
    table: [
      ['Sufijo', 'Género', 'Ejemplo'],
      ['-ик', 'Masculino', 'стол → столик'],
      ['-ка', 'Femenino', 'кошка → кошечка'],
      ['-ко/-чка', 'Neutro', 'окно → оконечко'],
      ['-ище', 'Aumentativo', 'дом → домище'],
    ],
    mistakes: [
      '"столик" ✓ (diminutivo de стол). "стол" es base neutra.',
      '"кошечка" ✓ (gatita affectionate) vs "кошка" (gato/gata regular).'],
  },
  seo: [
    {heading: '¿Qué son diminutivos y aumentativos?', paragraphs: ['Diminutivos (уменьшительные суффиксы) expresan pequeño tamaño o afección: "столик" (mesita, pequeña/querida mesa).', 'Aumentativos (увеличительные суффиксы) expresan gran tamaño o énfasis: "домище" (casarón, casa grande/fea).']},
    {heading: 'Diminutivos muy comunes', paragraphs: ['"кот" (gato) → "котик" (gatito). "дом" (casa) → "домик" (casita). "книга" (libro) → "книжечка" (librito).', 'Son muy usados en ruso coloquial y afectivo.']},
    {heading: 'Aumentativos expresivos', paragraphs: ['"дом" (casa) → "домище" (casarón). "ветер" (viento) → "ветрище" (ventarrón). Expresan algo grande, a menudo con connotación negativa.', 'Menos frecuentes que diminutivos pero muy expresivos.']},
    {heading: 'Cambio de género con sufijos', paragraphs: ['"дом" (masc) → "домик" (masc diminutivo). "кот" (masc) → "кошка" (fem form), "кошечка" (fem diminutivo de koshka). Algunos sufijos cambian género.', 'Importante conjugar correctamente con género nuevo.']},
    {heading: 'Afección vs tamaño real', paragraphs: ['"столик" puede ser pequeño o simplemente querido/íntimo (mesa pequeña de café, mesa del estudio). "мамочка" (mamita) es afectuoso, no necesariamente pequeño.', 'En ruso, diminutivos cargan connotación emocional.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Diminutivos y aumentativos: tamaño, afección, énfasis', graphicPrompt: 'Tabla: Sufijos diminutivos y aumentativos', scene: [['Маленький столик.', 'Una mesita pequeña (diminutivo).'], ['Это мамочка!', '¡Es mamita! (afectuoso diminutivo).'], ['Какой домище!', '¡Qué casarón! (aumentativo).'], ['Котик спит.', 'El gatito duerme (diminutivo tierno).'], ['Ветрище разрушил крышу.', 'El ventarrón destruyó el techo (aumentativo negativo).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['суффикс', 'размер', 'оттенок']},
  practice: {levels: [{id: 'level-1', title: 'Diminutivo correcto', tag: 'Múltipla escolha', intro: 'Elige diminutivo.', type: 'choice', items: [{scene: 'Diminutivo de стол', lines: [['', 'Маленький ___.']], options: ['стол', 'столик', 'столище', 'столе'], answer: 'столик', explain: 'столик (diminutivo) — mesita.'}, {scene: 'Diminutivo de дом', lines: [['', '___ был красивый.']], options: ['домик', 'домище', 'дома', 'доме'], answer: 'домик', explain: 'домик (diminutivo) — casita.'}]}, {id: 'level-2', title: 'Aumentativos', tag: 'Aumentativos', intro: 'Completa aumentativos.', type: 'guidedText', scene: 'Expresiones con aumentativos.', text: 'Это ___ (grande, feo). Какой ___ дом! Ветер ___ разрушил.', blanks: [{options: ['домик', 'домище'], answer: 'домище', explain: 'домище (aumentativo).'}, {options: ['домик', 'домище'], answer: 'домище', explain: 'домище (casarón).'}, {options: ['ветрище', 'ветер'], answer: 'ветрище', explain: 'ветрище (aumentativo viento).'}]}, {id: 'level-3', title: 'Escritura con sufijos', tag: 'Sufijos', intro: 'Forma diminutivos.', type: 'freeText', scene: 'Mis objetos pequeños y tiernos.', text: '1. [[0]] (Una gatita). 2. [[1]] (Una mesita). 3. [[2]] (Una casita).', blanks: [{answer: 'Маленькая кошечка', accepted: ['кошечка', 'маленькая'], explain: 'кошечка (diminutivo fem).'}, {answer: 'Маленький столик', accepted: ['столик', 'маленький'], explain: 'столик (diminutivo masc).'}, {answer: 'Маленький домик', accepted: ['домик', 'маленький'], explain: 'домик (diminutivo masc).'}]}, {id: 'level-4', title: 'Análise de sufijos', tag: 'Análise', intro: 'Explica sufijos.', type: 'write', items: [{scene: 'Diferencia diminutivo/aumentativo', prompt: '¿Cuál es la diferencia en matiz entre "столик" y "домище"?', answer: '"столик" (diminutivo) expresa pequeño tamaño y afección/intimidad (mesita querida). "домище" (aumentativo) expresa gran tamaño y a menudo connotación negativa (casarón feo). Opuestos en tamaño y tono emocional.', accepted: ['размер', 'эмоция', 'оттенок'], explain: 'Diminutivo: pequeño/afectuoso; Aumentativo: grande/negativo.'}]}]},
}

export default topic
