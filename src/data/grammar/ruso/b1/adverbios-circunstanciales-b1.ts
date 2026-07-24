import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adverbios-circunstanciales-b1',
  order: '18',
  color: '#1a2ecc',
  category: 'Adverbios y Expresiones',
  level: 'B1',
  title: 'Adverbios Circunstanciales en Ruso B1',
  shortTitle: 'Adverbios: как, когда, где, почему',
  metaTitle: 'Adverbios Circunstanciales en Ruso B1',
  description: 'Adverbios circunstanciales modifican verbos para expresar cómo, cuándo, dónde, por qué: как (cómo), когда (cuándo), где (dónde), почему (por qué), сколько (cuánto). Formación: adjective + -о/-е (красиво, хорошо, плохо).',
  lead: 'Domina adverbios: как, когда, где, почему — modificadores de verbo',
  outcomes: [
    'Forma adverbios de adjetivos (-о, -е)',
    'Usa adverbios interrogativos y relativos',
    'Expresa circunstancias: forma, tiempo, lugar, causa',
    'Ordena adverbios en la oración',
  ],
  guide: {
    goal: 'Usar adverbios para modificar verbos expresando circunstancias.',
    model: 'Она говорит красиво. Я встречу его когда? Ты идешь быстро.',
    formula: 'Verbo + Adverbio (adj + -о/-е)',
    decisions: [
      'Adverbio de modo: красиво (hermosamente), хорошо (bien), плохо (mal)',
      'Adverbio de tiempo: когда (cuándo), вчера (ayer), завтра (mañana), сейчас (ahora)',
      'Adverbio de lugar: где (dónde), здесь (aquí), там (allá), везде (en todas partes)',
      'Adverbio de causa: почему (por qué), зачем (para qué)',
    ],
    table: [
      ['Tipo', 'Adverbio', 'Ejemplo'],
      ['Modo', 'красиво (hermosamente)', 'Она поет красиво'],
      ['Tiempo', 'когда (cuándo)', 'Когда ты придешь?'],
      ['Lugar', 'где (dónde)', 'Где ты живешь?'],
      ['Causa', 'почему (por qué)', 'Почему ты не пришел?'],
    ],
    mistakes: [
      '"Она говорит красиво" ✓ (не "она говорит красивый") — adverbio, no adjetivo.',
      '"Когда ты придешь?" ✓ — adverbio interrogativo inicial.'],
  },
  seo: [
    {heading: '¿Qué son adverbios circunstanciales?', paragraphs: ['Adverbios circunstanciales (обстоятельственные наречия) modifican verbos para expresar cómo, cuándo, dónde, por qué: "Ella habla hermosamente" (cómo), "Vengo mañana" (cuándo).', 'Muy comunes en ruso; forman parte de toda conversación.']},
    {heading: 'Formación de adverbios de modo', paragraphs: ['"красивый" (hermoso) → "красиво" (hermosamente). "хороший" (bueno) → "хорошо" (bien). "плохой" (malo) → "плохо" (mal).', 'Regla: adjetivo neutro singular = adverbio.']},
    {heading: 'Adverbios interrogativos y relativos', paragraphs: ['"Как ты это сделал?" (¿Cómo lo hiciste? — modo). "Когда ты придешь?" (¿Cuándo vendrás? — tiempo).', '"Где ты был?" (¿Dónde estabas? — lugar). "Почему ты не пришел?" (¿Por qué no viniste? — causa).']},
    {heading: 'Orden de adverbios en la oración', paragraphs: ['"Он идет быстро в парк" (cómo + dónde). "Она работает здесь сейчас" (dónde + cuándo). Generalmente: verbo + cómo + dónde + cuándo.', 'Orden es flexible pero estas reglas son preferidas.']},
    {heading: 'Adverbios de cantidad', paragraphs: ['"Сколько времени?" (¿Cuánto tiempo? — cantidad). "Я здесь долго" (he estado aquí mucho tiempo — duración). "Он приходит часто" (viene frecuentemente — frecuencia).', 'Expresan duración, cantidad, frecuencia.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Adverbios circunstanciales: modo, tiempo, lugar, causa', graphicPrompt: 'Tabla: Adverbios por tipo de circunstancia', scene: [['Она говорит красиво.', 'Habla hermosamente (modo).'], ['Я приду завтра.', 'Vendré mañana (tiempo).'], ['Ты где живешь?', '¿Dónde vives? (lugar).'], ['Почему ты опоздал?', '¿Por qué llegaste tarde? (causa).'], ['Он часто приходит сюда.', 'Viene aquí frecuentemente (frecuencia).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['обстоятельство', 'наречие', 'тип']},
  practice: {levels: [{id: 'level-1', title: 'Adverbio o adjetivo', tag: 'Múltipla escolha', intro: 'Elige forma correcta.', type: 'choice', items: [{scene: 'Adverbio de modo', lines: [['', 'Она поет ___.']], options: ['красивая', 'красиво', 'красивое', 'красивый'], answer: 'красиво', explain: 'красиво (adverbio) — hermosamente.'}, {scene: 'Adverbio interrogativo', lines: [['', '___ ты приходишь?']], options: ['Какой', 'Когда', 'Кто', 'Какую'], answer: 'Когда', explain: 'Когда (adverbio interrogativo) — when?'}]}, {id: 'level-2', title: 'Adverbios en contexto', tag: 'Adverbios', intro: 'Completa adverbios.', type: 'guidedText', scene: 'Circunstancias con adverbios.', text: 'Она поет [[0]]. [[1]] ты встаешь? Мы встречаемся [[2]]ль?', blanks: [{options: ['красивая', 'красиво'], answer: 'красиво', explain: 'красиво (modo).'}, {options: ['какой', 'когда'], answer: 'когда', explain: 'Когда (tiempo interrogativo).'}, {options: ['где', 'как'], answer: 'где', explain: 'Где (lugar).'}]}, {id: 'level-3', title: 'Escritura con adverbios', tag: 'Adverbios', intro: 'Escribe con adverbios.', type: 'freeText', scene: 'Circunstancias de mis acciones.', text: '1. [[0]] (Ella canta hermosamente). 2. [[1]] (Voy mañana). 3. [[2]] (¿Por qué no viniste?).', blanks: [{answer: 'Она поет красиво', accepted: ['красиво', 'поет'], explain: 'красиво (adverbio modo).'}, {answer: 'Я иду завтра', accepted: ['завтра', 'иду'], explain: 'завтра (adverbio tiempo).'}, {answer: 'Почему ты не пришел?', accepted: ['почему', 'пришел'], explain: 'Почему (adverbio causa interrogativo).'}]}, {id: 'level-4', title: 'Análise de adverbios', tag: 'Análise', intro: 'Explica tipos.', type: 'write', items: [{scene: 'Tipos de adverbios', prompt: '¿Cuáles son los cuatro tipos principales de adverbios circunstanciales?', answer: '1) Adverbios de modo (cómo): красиво, хорошо. 2) Tiempo (cuándo): завтра, сейчас. 3) Lugar (dónde): здесь, везде. 4) Causa (por qué): почему, зачем. Cada uno modifica el verbo desde una perspectiva diferente.', accepted: ['способ', 'время', 'место', 'причина'], explain: '4 tipos: modo, tiempo, lugar, causa.'}]}]},
}

export default topic
