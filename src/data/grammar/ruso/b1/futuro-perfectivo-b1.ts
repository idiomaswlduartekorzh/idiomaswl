import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-perfectivo-b1',
  order: '17',
  color: '#1a2ecc',
  category: 'Tiempo y Aspecto',
  level: 'B1',
  title: 'Futuro Perfectivo en Ruso B1',
  shortTitle: 'СВ futuro: буду vs напишу',
  metaTitle: 'Futuro Perfectivo en Ruso B1',
  description: 'El futuro perfectivo (СВ будущее) se forma sin вспомогательный глагол (without auxiliary). Директно из raíz: напишу (escribiré — completed action). Contrasta con НСВ futuro: буду писать (estaré escribiendo — process).',
  lead: 'Domina futuro perfectivo: напишу (escribiré — action completed)',
  outcomes: [
    'Forma futuro de perfectivos sin auxiliar',
    'Distingue futuro perfectivo de futuro imperfectivo',
    'Usa -ю, -ишь, -ит terminations',
    'Expresa acciones futuras completadas',
  ],
  guide: {
    goal: 'Usar futuro perfectivo para acciones futuras completadas.',
    model: 'Я напишу письмо завтра. Она закончит работу в пять.',
    formula: 'СВ + флексия будущего (-ю, -ишь, -ит, -им, -ите, -ят)',
    decisions: [
      'СВ futuro: "напишу" (escribiré — action will be done)',
      'НСВ futuro: "буду писать" (estaré escribiendo — process in future)',
      'No existe futuro en presente de СВ (не "я напишу сейчас" — sonaría raro)',
      'SV futuro es naturalmente completivo: "Я напишу письмо" = haré que la carta esté escrita',
    ],
    table: [
      ['Aspecto', 'Futuro', 'Significado'],
      ['СВ (perfecto)', 'Напишу письмо', 'Escribiré la carta (será completada)'],
      ['НСВ (imperfecto)', 'Буду писать письмо', 'Estaré escribiendo la carta (proceso)'],
    ],
    mistakes: [
      '"Я напишу письмо завтра" ✓ — СВ futuro para acción completada.',
      '"Я буду писать письмо 2 часа" ✓ — НСВ futuro con duración.'],
  },
  seo: [
    {heading: '¿Qué es futuro perfectivo?', paragraphs: ['Futuro perfectivo (СВ будущее) es forma simple del perfectivo: напишу, сделаю, прочитаю. Expresa que la acción será completada en el futuro.', 'Sin auxiliar вспомогательный глагол, a diferencia de НСВ futuro (буду + infinitivo).']},
    {heading: 'Formación de futuro perfectivo', paragraphs: ['"Я напишу" (escribiré). "Ты напишешь" (escribirás). "Он напишет" (escribirá). Terminaciones: -ю (первое лицо), -ишь/-ешь (второе), -ит/-ет (третье).', 'Es regular para la mayoría de verbos.']},
    {heading: 'Contraste: СВ futuro vs НСВ futuro', paragraphs: ['"Я напишу письмо" (СВ — escribiré la carta, será completada). "Я буду писать письмо" (НСВ — estaré escribiendo la carta, proceso).', 'Diferencia fundamental: completivo vs proceso en futuro.']},
    {heading: 'Irregularidad en algunas formas', paragraphs: ['"я возьму" (cogeré, irreg.). "ты возьмешь" (cogerás). "он возьмет" (cogerá). Algunos perfectivos tienen raíces irregulares en futuro.', 'Mayoría es regular, pero aprender irregulares.']},
    {heading: 'Futuro perfectivo en narrativa', paragraphs: ['"Завтра я напишу письмо и отправлю его" (mañana escribiré la carta y la enviaré). Dos acciones completadas en futuro.', 'Muy usado en planes y predicciones de acciones completadas.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Futuro perfectivo: СВ простое будущее vs НСВ compound будущее', graphicPrompt: 'Tabla: Futuro perfectivo vs imperfectivo', scene: [['Я напишу письмо завтра.', 'Escribiré la carta mañana (СВ completado).'], ['Я буду писать письмо 2 часа.', 'Estaré escribiendo 2 horas (НСВ proceso).'], ['Она закончит работу в пять.', 'Terminará el trabajo a las cinco (СВ).'], ['Он будет работать весь день.', 'Trabajará todo el día (НСВ).'], ['Я возьму книгу завтра.', 'Tomaré el libro mañana (СВ irreg).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['совершенный', 'будущее', 'завершенность']},
  practice: {levels: [{id: 'level-1', title: 'Futuro perfectivo', tag: 'Múltipla escolha', intro: 'Elige futuro correcto.', type: 'choice', items: [{scene: 'СВ futuro (completado)', lines: [['', 'Я ___ письмо завтра.']], options: ['буду писать', 'напишу', 'пишу', 'писал'], answer: 'напишу', explain: 'напишу (СВ futuro) — completado.'}, {scene: 'НСВ futuro (proceso)', lines: [['', 'Я ___ письмо 2 часа.']], options: ['напишу', 'буду писать', 'пишу', 'писал'], answer: 'буду писать', explain: 'буду писать (НСВ futuro) — proceso.'}]}, {id: 'level-2', title: 'Futuro en contexto', tag: 'Futuro', intro: 'Completa futuro.', type: 'guidedText', scene: 'Acciones futuras completadas vs proceso.', text: 'Я [[0]] письмо. Ты [[1]] письмо час? Он [[2]] работу сегодня.', blanks: [{options: ['напишу', 'буду писать'], answer: 'напишу', explain: 'напишу (СВ futuro).'}, {options: ['напишешь', 'будешь писать'], answer: 'будешь писать', explain: 'будешь писать (НСВ с duración).'}, {options: ['закончит', 'будет заканчивать'], answer: 'закончит', explain: 'закончит (СВ futuro).'}]}, {id: 'level-3', title: 'Escritura futuro', tag: 'Futuro', intro: 'Escribe futuros.', type: 'freeText', scene: 'Mis planes futuros.', text: '1. [[0]] (Escribiré la carta). 2. [[1]] (Trabajaré todo el día). 3. [[2]] (Terminaré mañana).', blanks: [{answer: 'Я напишу письмо', accepted: ['напишу', 'письмо'], explain: 'Напишу (СВ futuro).'}, {answer: 'Я буду работать весь день', accepted: ['буду', 'работать'], explain: 'буду работать (НСВ futuro).'}, {answer: 'Я закончу завтра', accepted: ['закончу', 'завтра'], explain: 'Закончу (СВ futuro).'}]}, {id: 'level-4', title: 'Análise de futuros', tag: 'Análise', intro: 'Explica diferencia.', type: 'write', items: [{scene: 'СВ vs НСВ в будущем', prompt: '"Я напишу" vs "Я буду писать": ¿cuál es la diferencia de significado?', answer: '"Я напишу" (СВ futuro) expresa que completaré la acción (la carta será escrita). "Я буду писать" (НСВ futuro) expresa que estaré en el proceso (escribiendo). Diferencia fundamental: completivo vs proceso.', accepted: ['завершение', 'процесс', 'результат'], explain: 'СВ futuro: completado; НСВ futuro: proceso.'}]}]},
}

export default topic
