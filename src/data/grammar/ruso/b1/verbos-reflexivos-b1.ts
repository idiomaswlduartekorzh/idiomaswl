import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-reflexivos-b1',
  order: '12',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'B1',
  title: 'Verbos Reflexivos (-ся) en Ruso B1',
  shortTitle: 'Verbos reflexivos con -ся/-сь',
  metaTitle: 'Verbos Reflexivos en Ruso B1',
  description: 'Verbos reflexivos con -ся (después consonante) o -сь (después vocal) indican acción sobre sí mismo o pasiva. "умываться" (lavarse), "смотреться" (verse/parecer), "нравиться" (gustar). El -ся no cambia el caso del objeto directo (sigue siendo acusativo).',
  lead: 'Domina verbos reflexivos: умываться (lavarse), нравиться (gustar)',
  outcomes: [
    'Identifica y forma verbos reflexivos con -ся/-сь',
    'Entiende reflexividad directa e indirecta',
    'Usa verbos reflexivos en contextos cotidianos',
    'Distingue reflexivo de pasivo verbal',
  ],
  guide: {
    goal: 'Usar verbos reflexivos para expresar acciones sobre sí mismo.',
    model: 'Я умываюсь. Ей нравится кино. Мне кажется, что...',
    formula: 'глагол + -ся (после согласной) или -сь (после гласной)',
    decisions: [
      'Reflexivo genuino (прямой): умываться (lavarse — sobre sí mismo)',
      'Reflexivo indirecto: заботиться о (cuidar de — afecta a sí indirectamente)',
      'Pasivo: его ударили (lo golpearon) vs встреча состоялась (la reunión se llevó a cabo)',
      'Verbs como нравиться siempre van en dativo (мне нравится — me gusta)',
    ],
    table: [
      ['Tipo', 'Ejemplo', 'Significado'],
      ['Reflexivo directo', 'умываться', 'Lavarse (sobre sí mismo)'],
      ['Reflexivo indirecto', 'заботиться о', 'Cuidar de'],
      ['Aparente/pasivo', 'встреча состоялась', 'La reunión se efectuó'],
    ],
    mistakes: [
      '"Я умываюсь" ✓ (no "я умываю меня") — -ся marca reflexividad.',
      '"Мне нравится кино" ✓ (не "я люблю кино") — нравиться es impersonal + dativo.'],
  },
  seo: [
    {heading: '¿Qué son verbos reflexivos?', paragraphs: ['Verbos reflexivos (возвратные глаголы) llevan la partícula -ся/-сь. Puede indicar acción sobre sí mismo, pasiva, o cambio de significado: "смотреть" (look) vs "смотреться" (look at oneself/seem).', 'Muy comunes en ruso: умываться, одеваться, смеяться, нравиться.']},
    {heading: 'Reflexividad genuina (прямая)', paragraphs: ['"умываться" — lavarse (sobre sí mismo). "одеваться" — vestirse (sobre sí mismo). "расчёсываться" — peinarse (sobre sí mismo).', 'La acción retorna al sujeto.']},
    {heading: 'Verbos impersonales reflexivos: нравиться, казаться', paragraphs: ['"Мне нравится кино" — me gusta cine (no "я люблю кино" en este contexto reflexivo). "Мне кажется" — me parece.', 'Estos verbos toman dativo: мне (me), тебе (te), ему (le), etc.']},
    {heading: 'Reflexivo aparente (пассивное значение)', paragraphs: ['"встреча состоялась" (la reunión se llevó a cabo — pasivo). "дверь открывается ключом" (la puerta se abre con llave — pasivo agentivo).', 'A veces -ся crea significado pasivo sin complemento de agente.']},
    {heading: 'Cambio de significado con -ся', paragraphs: ['"смотреть" (mirar) vs "смотреться" (parecer, verse). "вешать" (colgar algo) vs "вешаться" (suicidarse — colgar se). El significado puede cambiar completamente.', 'No siempre es predecible, requiere aprendizaje de pares.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Verbos reflexivos: -ся marca reflexividad, pasiva, o cambio de significado', graphicPrompt: 'Tabla: Verbos reflexivos por categoría', scene: [['Я умываюсь.', 'Me lavo (reflexivo genuino).'], ['Мне нравится кино.', 'Me gusta cine (impersonal reflexivo).'], ['Она смотрится хорошо.', 'Se ve bien (reflexivo con cambio de significado).'], ['Встреча состоялась вчера.', 'La reunión se efectuó ayer (pasivo reflexivo).'], ['Он одевается быстро.', 'Se viste rápidamente (reflexivo genuino).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['возвратный', '-ся', 'смысл']},
  practice: {levels: [{id: 'level-1', title: 'Forma reflexiva', tag: 'Múltipla escolha', intro: 'Elige verbo reflexivo correcto.', type: 'choice', items: [{scene: 'Reflexivo genuino', lines: [['', 'Я ___. (lavar)']], options: ['мою', 'умываюсь', 'умываю', 'мою меня'], answer: 'умываюсь', explain: 'умываюсь (reflexivo) — me lavo.'}, {scene: 'Impersonal reflexivo нравиться', lines: [['', 'Мне ___ кино.']], options: ['нравится', 'люблю', 'люблится', 'нравлю'], answer: 'нравится', explain: 'нравится (impersonal) — me gusta.'}]}, {id: 'level-2', title: 'Reflexivos en contexto', tag: 'Reflexivo', intro: 'Completa reflexivos.', type: 'guidedText', scene: 'Acciones sobre sí mismo.', text: 'Я [[0]]. Она [[1]]. Мне [[2]]спорт.', blanks: [{options: ['одеваю', 'одеваюсь'], answer: 'одеваюсь', explain: 'одеваюсь (reflexivo) — me visto.'}, {options: ['смотрит', 'смотрится'], answer: 'смотрится', explain: 'смотрится (reflexivo) — she looks.'}, {options: ['нравится', 'люблю'], answer: 'нравится', explain: 'нравится (impersonal) — I like.'}]}, {id: 'level-3', title: 'Escritura reflexiva', tag: 'Reflexivo', intro: 'Escribe acciones reflexivas.', type: 'freeText', scene: 'Mi rutina diaria.', text: '1. [[0]] (Me levanto). 2. [[1]] (Me lavo). 3. [[2]] (Me visto).', blanks: [{answer: 'Я просыпаюсь', accepted: ['-сь', 'пробуждаюсь'], explain: 'просыпаюсь (reflexivo) — me despierzo.'}, {answer: 'Я умываюсь', accepted: ['-ся', 'умываюсь'], explain: 'умываюсь (reflexivo) — me lavo.'}, {answer: 'Я одеваюсь', accepted: ['-ся', 'одеваюсь'], explain: 'одеваюсь (reflexivo) — me visto.'}]}, {id: 'level-4', title: 'Análise reflexivos', tag: 'Análise', intro: 'Explica reflexividad.', type: 'write', items: [{scene: 'Tipos de reflexividad', prompt: '¿Cuáles son los principales usos de -ся?', answer: '-ся tiene tres usos principales: 1) Reflexivo genuino (acción sobre sí: умываться). 2) Impersonal/cambio de significado (нравиться, казаться, смотреться). 3) Pasivo (встреча состоялась). No siempre es traducible literalmente.', accepted: ['возвратный', 'безличный', 'пассивный'], explain: '-ся: reflexivo, impersonal, pasivo.'}]}]},
}

export default topic
