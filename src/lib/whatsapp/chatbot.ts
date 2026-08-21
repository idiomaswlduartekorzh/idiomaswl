export type ConversationStage =
  | 'awaiting_language'
  | 'awaiting_goal'
  | 'awaiting_level'
  | 'qualified'
  | 'handoff_requested';

export type ConversationStatus = 'active' | 'qualified' | 'handoff_requested';

export interface ConversationSnapshot {
  stage: ConversationStage;
  status: ConversationStatus;
  language: string | null;
  goal: string | null;
  level: string | null;
}

export interface ConversationUpdates {
  stage?: ConversationStage;
  status?: ConversationStatus;
  language?: string | null;
  goal?: string | null;
  level?: string | null;
}

export interface BotDecision {
  reply: string;
  updates: ConversationUpdates;
}

export const INITIAL_CONVERSATION: ConversationSnapshot = {
  stage: 'awaiting_language',
  status: 'active',
  language: null,
  goal: null,
  level: null,
};

const LANGUAGE_PROMPT = [
  '¡Hola! Soy el asistente de WeLearn 👋',
  '¿Qué idioma quieres aprender o mejorar?',
  '',
  '1. Inglés',
  '2. Coreano',
  '3. Francés',
  '4. Alemán',
  '5. Italiano',
  '6. Portugués',
  '7. Otro',
  '',
  'Responde con el número o el idioma. En cualquier momento puedes escribir ASESOR.',
].join('\n');

const GOAL_PROMPT = [
  '¡Perfecto! ¿Cuál es tu objetivo principal?',
  '',
  '1. Conversación y fluidez',
  '2. Preparar un examen',
  '3. Trabajo o estudios',
  '4. Viaje o migración',
].join('\n');

const LEVEL_PROMPT = [
  '¿Cómo describirías tu nivel actual?',
  '',
  '1. Estoy empezando desde cero',
  '2. Básico',
  '3. Intermedio',
  '4. Avanzado',
  '5. No estoy seguro/a',
].join('\n');

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsTerm(input: string, terms: string[]): boolean {
  return terms.some((term) => input === term || input.includes(` ${term} `) || input.startsWith(`${term} `) || input.endsWith(` ${term}`));
}

function parseOption(
  rawInput: string,
  options: Array<{ number: string; value: string; terms: string[] }>,
): string | null {
  const input = normalize(rawInput);
  const byNumber = options.find((option) => input === option.number);
  if (byNumber) return byNumber.value;

  return options.find((option) => containsTerm(` ${input} `, option.terms))?.value ?? null;
}

function parseLanguage(input: string): string | null {
  return parseOption(input, [
    { number: '1', value: 'Inglés', terms: ['ingles', 'english'] },
    { number: '2', value: 'Coreano', terms: ['coreano', 'korean'] },
    { number: '3', value: 'Francés', terms: ['frances', 'french'] },
    { number: '4', value: 'Alemán', terms: ['aleman', 'german'] },
    { number: '5', value: 'Italiano', terms: ['italiano', 'italian'] },
    { number: '6', value: 'Portugués', terms: ['portugues', 'portuguese'] },
    { number: '7', value: 'Otro', terms: ['otro', 'otra'] },
  ]);
}

function parseGoal(input: string): string | null {
  return parseOption(input, [
    { number: '1', value: 'Conversación y fluidez', terms: ['conversacion', 'fluidez', 'hablar'] },
    { number: '2', value: 'Preparar un examen', terms: ['examen', 'ielts', 'toefl', 'icfes', 'goethe', 'delf', 'cils', 'celi', 'topik'] },
    { number: '3', value: 'Trabajo o estudios', terms: ['trabajo', 'estudios', 'estudio', 'laboral', 'universidad'] },
    { number: '4', value: 'Viaje o migración', terms: ['viaje', 'viajar', 'migracion', 'migrar', 'visa'] },
  ]);
}

function parseLevel(input: string): string | null {
  return parseOption(input, [
    { number: '1', value: 'Desde cero', terms: ['cero', 'empezando', 'principiante', 'ninguno'] },
    { number: '2', value: 'Básico', terms: ['basico', 'a1', 'a2'] },
    { number: '3', value: 'Intermedio', terms: ['intermedio', 'b1', 'b2'] },
    { number: '4', value: 'Avanzado', terms: ['avanzado', 'c1', 'c2'] },
    { number: '5', value: 'Por diagnosticar', terms: ['no se', 'no estoy seguro', 'diagnostico'] },
  ]);
}

function isHandoffRequest(input: string): boolean {
  const normalized = ` ${normalize(input)} `;
  return containsTerm(normalized, ['asesor', 'asesora', 'humano', 'persona', 'agente']);
}

function isMenuRequest(input: string): boolean {
  const normalized = normalize(input);
  return normalized === 'menu' || normalized === 'reiniciar' || normalized === 'empezar de nuevo';
}

function isGreeting(input: string): boolean {
  const normalized = normalize(input);
  return ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches'].includes(normalized);
}

function qualifiedReply(conversation: ConversationSnapshot): string {
  return [
    '¡Gracias! Ya tengo lo necesario para orientarte ✅',
    '',
    `Idioma: ${conversation.language}`,
    `Objetivo: ${conversation.goal}`,
    `Nivel: ${conversation.level}`,
    '',
    'Puedes escribir PRECIOS, HORARIOS, MÉTODO o ASESOR.',
  ].join('\n');
}

function answerQualifiedQuestion(input: string, conversation: ConversationSnapshot): string {
  const normalized = ` ${normalize(input)} `;

  if (containsTerm(normalized, ['precio', 'precios', 'costo', 'costos', 'valor', 'plan', 'planes'])) {
    return 'Puedes consultar los planes vigentes aquí: https://www.idiomaswl.com/precios\n\nSi quieres que revisemos cuál encaja con tu objetivo, escribe ASESOR.';
  }

  if (containsTerm(normalized, ['horario', 'horarios', 'disponibilidad', 'hora'])) {
    return 'Manejamos distintas franjas horarias según el programa y el profesor. Escribe ASESOR y el equipo confirmará contigo la disponibilidad para tu zona horaria.';
  }

  if (containsTerm(normalized, ['metodo', 'metodologia', 'clases', 'funciona'])) {
    return 'En WeLearn combinamos acompañamiento docente, práctica guiada y trabajo autónomo. El plan se adapta a tu idioma, nivel y objetivo para que avances con una ruta clara. Más información: https://www.idiomaswl.com/metodo';
  }

  if (containsTerm(normalized, ['diagnostico', 'prueba', 'nivel'])) {
    return 'Podemos ayudarte a confirmar tu punto de partida con un diagnóstico. Escribe ASESOR para coordinarlo con el equipo.';
  }

  if (containsTerm(normalized, ['examen', 'ielts', 'toefl', 'icfes', 'goethe', 'delf', 'dalf', 'cils', 'celi', 'celpe', 'topik'])) {
    return 'Preparamos rutas para exámenes internacionales y nacionales según el idioma. Cuéntanos cuál examen y fecha tienes, o escribe ASESOR para una recomendación personal.';
  }

  const summary = `${conversation.language ?? 'tu idioma'} · ${conversation.goal ?? 'tu objetivo'} · ${conversation.level ?? 'nivel por definir'}`;
  return `Tengo registrado: ${summary}.\n\nPuedo ayudarte con PRECIOS, HORARIOS, MÉTODO o conectarte con un ASESOR.`;
}

export function decideBotReply(
  rawInput: string | null,
  conversation: ConversationSnapshot = INITIAL_CONVERSATION,
): BotDecision {
  const input = rawInput?.trim() ?? '';

  if (!input) {
    return {
      reply: 'Por ahora puedo ayudarte mejor por texto. Escríbeme el idioma que te interesa o escribe ASESOR para hablar con una persona.',
      updates: {},
    };
  }

  if (isMenuRequest(input)) {
    return {
      reply: LANGUAGE_PROMPT,
      updates: {
        stage: 'awaiting_language',
        status: 'active',
        language: null,
        goal: null,
        level: null,
      },
    };
  }

  if (isHandoffRequest(input)) {
    return {
      reply: 'Listo, dejé marcada tu solicitud para que una persona del equipo continúe la conversación. Te responderemos por este mismo chat. 🙌',
      updates: { stage: 'handoff_requested', status: 'handoff_requested' },
    };
  }

  if (conversation.status === 'handoff_requested') {
    return {
      reply: 'Tu solicitud ya está en manos del equipo. Si quieres volver al asistente automático, escribe MENÚ.',
      updates: {},
    };
  }

  if (conversation.stage === 'awaiting_language') {
    const language = parseLanguage(input);
    if (!language) {
      return {
        reply: isGreeting(input) ? LANGUAGE_PROMPT : `No alcancé a identificar el idioma.\n\n${LANGUAGE_PROMPT}`,
        updates: {},
      };
    }

    return {
      reply: GOAL_PROMPT,
      updates: { language, stage: 'awaiting_goal' },
    };
  }

  if (conversation.stage === 'awaiting_goal') {
    const goal = parseGoal(input);
    if (!goal) {
      return { reply: `No alcancé a identificar el objetivo.\n\n${GOAL_PROMPT}`, updates: {} };
    }

    return {
      reply: LEVEL_PROMPT,
      updates: { goal, stage: 'awaiting_level' },
    };
  }

  if (conversation.stage === 'awaiting_level') {
    const level = parseLevel(input);
    if (!level) {
      return { reply: `No alcancé a identificar el nivel.\n\n${LEVEL_PROMPT}`, updates: {} };
    }

    const completedConversation: ConversationSnapshot = {
      ...conversation,
      level,
      stage: 'qualified',
      status: 'qualified',
    };

    return {
      reply: qualifiedReply(completedConversation),
      updates: { level, stage: 'qualified', status: 'qualified' },
    };
  }

  return {
    reply: answerQualifiedQuestion(input, conversation),
    updates: {},
  };
}
