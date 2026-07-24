import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'dativo-b1',
  order: '13',
  color: '#1a2ecc',
  category: 'Casos y Preposiciones',
  level: 'B1',
  title: 'Caso Dativo en Ruso B1',
  shortTitle: 'Dativo (indirect object, for, toward)',
  metaTitle: 'Caso Dativo en Ruso B1',
  description: 'El dativo (дательный падеж) expresa: objeto indirecto (дать кому — dar a quién), destino (идти кому — ir hacia), preposición к (hacia). Terminaciones: -у/-ю (masc/neut), -е/-и (fem), -ам/-ям (pl).',
  lead: 'Domina dativo: кому? куда? — a quién, para quién, hacia dónde',
  outcomes: [
    'Usa dativo para objeto indirecto: дать ему (dar le)',
    'Expresa destino/dirección con к (hacia)',
    'Forma preposiciones con dativo: к, по (around)',
    'Entiende impersonales + dativo: мне нужно, мне нравится',
  ],
  guide: {
    goal: 'Usar dativo para objeto indirecto, dirección y después de preposiciones.',
    model: 'Я даю книгу другу. Мне нужна помощь. Я иду к школе.',
    formula: 'N + -у/-ю/-е/-и/-ам/-ям (según género/número)',
    decisions: [
      'Objeto indirecto: дать кому (dar a quién). Письмо учителю (carta al profesor)',
      'Destino (к + dativo): идти к дому (ir hacia la casa)',
      'Impersonales: мне нужно (me necesita), мне нравится (me gusta), мне кажется (me parece)',
      'Preposición по: гулять по парку (pasear por el parque)',
    ],
    table: [
      ['Género', 'Terminación', 'Ejemplo'],
      ['Masculino', '-у/-ю', 'другу (to friend)'],
      ['Neutro', '-у/-ю', 'окну (to window)'],
      ['Femenino', '-е/-и', 'книге (to book), двери (to door)'],
      ['Plural', '-ам/-ям', 'друзьям (to friends)'],
    ],
    mistakes: [
      '"Я даю книгу другу" ✓ (не "даю книгу друга") — dativo para objeto indirecto.',
      '"Я иду к дому" ✓ (не "иду на дом") — к + dativo para destino.'],
  },
  seo: [
    {heading: '¿Qué es el dativo?', paragraphs: ['El dativo (дательный падеж) expresa: a quién (objeto indirecto), hacia dónde (con preposición к), y se usa en expresiones impersonales.', 'Es el cuarto caso principal del ruso.']},
    {heading: 'Dativo para objeto indirecto', paragraphs: ['"Я даю книгу другу" — doy un libro a un amigo (дatively). "Она пишет письмо матери" — escribe una carta a su madre.', 'Estructura: verbo ditransitivo + acusativo (objeto) + dativo (destinatario).']},
    {heading: 'Dativo con preposición к (hacia)', paragraphs: ['"Я иду к дому" — voy hacia la casa. "Она подходит к учителю" — se acerca al profesor.', 'к + dativo indica movimiento/aproximación hacia.']},
    {heading: 'Impersonales con dativo', paragraphs: ['"Мне нужна помощь" — me necesita ayuda (el sujeto real es "помощь"). "Ему нравится музыка" — le gusta música.', 'Estos verbos toman dativo (не nominativo) para el "experimentador".']},
    {heading: 'Preposición по: sobre, por (dativo)', paragraphs: ['"гулять по парку" — pasear por el parque. "ходить по комнате" — caminar por la habitación.', 'по + dativo indica movimiento sobre una superficie.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Dativo: objeto indirecto, dirección (к), impersonales', graphicPrompt: 'Tabla: Dativo por función y preposición', scene: [['Я даю книгу другу.', 'Doy libro a amigo (objeto indirecto).'], ['Я иду к дому.', 'Voy hacia la casa (к + dat).'], ['Мне нравится кино.', 'Me gusta cine (impersonal + dat).'], ['Она подходит к учителю.', 'Se acerca al profesor.'], ['Он гуляет по парку.', 'Pasea por el parque (по + dat).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['дательный', 'адресат', 'направление']},
  practice: {levels: [{id: 'level-1', title: 'Forma dativa', tag: 'Múltipla escolha', intro: 'Elige forma correcta.', type: 'choice', items: [{scene: 'Dativo de objeto indirecto', lines: [['', 'Я даю книгу ___. (friend)']], options: ['друга', 'другу', 'друге', 'другом'], answer: 'другу', explain: 'другу (dativo) — to friend.'}, {scene: 'Dativo con к', lines: [['', 'Я иду ___ дому. (к + dat)']], options: ['кому', 'к', 'ко'], answer: 'к', explain: 'к (preposición) + дому (dativo) — towards.'}]}, {id: 'level-2', title: 'Dativo en contexto', tag: 'Dativo', intro: 'Completa dativo.', type: 'guidedText', scene: 'Oraciones con dativo.', text: 'Я пишу письмо [[0]]. Она идёт [[1]] школе. Мне [[2]] помощь.', blanks: [{options: ['матери', 'матер'], answer: 'матери', explain: 'матери (dativo fem) — to mother.'}, {options: ['к', 'на'], answer: 'к', explain: 'к (preposición) + школе (dativo).'}, {options: ['нужна', 'нужно'], answer: 'нужна', explain: 'нужна (fem sg) — needs (impersonal predicate).'}]}, {id: 'level-3', title: 'Escritura con dativo', tag: 'Dativo', intro: 'Escribe con dativo.', type: 'freeText', scene: 'Mis acciones con dativo.', text: '1. [[0]] (Doy dinero a mi amigo). 2. [[1]] (Voy hacia la escuela). 3. [[2]] (Me gusta el deporte).', blanks: [{answer: 'Я даю деньги другу', accepted: ['другу', 'даю'], explain: 'другу (dativo) — to friend.'}, {answer: 'Я иду к школе', accepted: ['к', 'школе'], explain: 'к школе (к + dat) — towards school.'}, {answer: 'Мне нравится спорт', accepted: ['нравится', 'мне'], explain: 'Мне (dat) + нравится — I like (impersonal).'}]}, {id: 'level-4', title: 'Análise de dativo', tag: 'Análise', intro: 'Explica dativo.', type: 'write', items: [{scene: 'Funciones del dativo', prompt: '¿Cuáles son las tres funciones principales del dativo?', answer: '1) Objeto indirecto: дать кому (dar a quién). 2) Dirección con к: идти к дому (ir hacia la casa). 3) Impersonales: мне нравится (me gusta — el dativo marca el experimentador, no el sujeto). Todas son muy comunes en ruso.', accepted: ['адресат', 'направление', 'безличный'], explain: 'Dativo: objeto indirecto, dirección, impersonal.'}]}]},
}

export default topic
