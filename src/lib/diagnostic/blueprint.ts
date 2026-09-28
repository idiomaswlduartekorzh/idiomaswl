import {
  CEFR_LEVELS,
  DIAGNOSTIC_SKILLS,
  type CefrLevel,
  type DiagnosticObjectiveSkill,
  type DiagnosticRouteId,
  type DiagnosticSkill,
} from './types.ts';

export const DIAGNOSTIC_BLUEPRINT_VERSION = 'welearn-english-placement-v2';

export interface DiagnosticDimensionBlueprint {
  skill: DiagnosticSkill;
  label: string;
  construct: string;
  subdomains: readonly string[];
  minimumDecisions: number;
  minimumDistinctStimuli: number;
}

export interface DiagnosticRouteBlueprint {
  id: DiagnosticRouteId;
  levels: readonly CefrLevel[];
  label: string;
}

export interface DiagnosticBlueprint {
  id: string;
  language: 'en';
  levels: readonly CefrLevel[];
  dimensions: readonly DiagnosticDimensionBlueprint[];
  locator: {
    decisions: number;
    targetLevels: readonly CefrLevel[];
    decisionsPerObjectiveSkill: Readonly<Record<DiagnosticObjectiveSkill, number>>;
  };
  precision: { minimumDecisions: number; maximumDecisions: number };
  routes: readonly DiagnosticRouteBlueprint[];
  maximumMinutes: number;
}

export const ENGLISH_DIAGNOSTIC_BLUEPRINT: DiagnosticBlueprint = {
  id: DIAGNOSTIC_BLUEPRINT_VERSION,
  language: 'en',
  levels: CEFR_LEVELS,
  dimensions: [
    {
      skill: 'reading',
      label: 'Lectura',
      construct: 'Comprender propósito, ideas, relaciones y significado en textos de uso personal, público, educativo y profesional.',
      subdomains: ['main-idea', 'detail', 'inference', 'purpose', 'structure', 'meaning-in-context'],
      minimumDecisions: 5,
      minimumDistinctStimuli: 3,
    },
    {
      skill: 'listening',
      label: 'Escucha',
      construct: 'Construir significado a partir de habla grabada con voces, ritmos y situaciones adecuados al nivel candidato.',
      subdomains: ['main-idea', 'detail', 'speaker-intent', 'inference', 'discourse-tracking'],
      minimumDecisions: 5,
      minimumDistinctStimuli: 3,
    },
    {
      skill: 'written-discourse',
      label: 'Construcción del discurso escrito',
      construct: 'Reconocer, organizar y revisar relaciones de coherencia, cohesión, propósito, audiencia y estructura en textos escritos mediante tareas cerradas.',
      subdomains: ['organisation-sequencing', 'cohesion-reference', 'rhetorical-relations', 'audience-register', 'revision-coherence'],
      minimumDecisions: 7,
      minimumDistinctStimuli: 6,
    },
    {
      skill: 'grammar',
      label: 'Gramática',
      construct: 'Seleccionar y producir estructuras con rango y precisión suficientes para expresar las relaciones requeridas.',
      subdomains: ['form', 'sentence-structure', 'tense-aspect', 'agreement', 'cohesion'],
      minimumDecisions: 5,
      minimumDistinctStimuli: 5,
    },
    {
      skill: 'vocabulary',
      label: 'Vocabulario',
      construct: 'Reconocer y usar significado, colocación, paráfrasis y registro en contexto.',
      subdomains: ['meaning', 'collocation', 'paraphrase', 'word-formation', 'register'],
      minimumDecisions: 5,
      minimumDistinctStimuli: 5,
    },
  ],
  locator: {
    decisions: 15,
    targetLevels: ['A2', 'B1', 'B2'],
    decisionsPerObjectiveSkill: { reading: 3, listening: 3, 'written-discourse': 3, grammar: 3, vocabulary: 3 },
  },
  precision: { minimumDecisions: 20, maximumDecisions: 30 },
  routes: [
    { id: 'low-a1-a2', levels: ['A1', 'A2'], label: 'Fundamentos' },
    { id: 'mid-b1-b2', levels: ['B1', 'B2'], label: 'Independencia' },
    { id: 'high-c1-c2', levels: ['C1', 'C2'], label: 'Dominio avanzado' },
  ],
  maximumMinutes: 75,
};

export const ENGLISH_LEVEL_EVIDENCE: Readonly<Record<CefrLevel, Readonly<Record<DiagnosticSkill, string>>>> = {
  A1: {
    reading: 'Localiza nombres, cifras y mensajes muy breves en material cotidiano con apoyo contextual.',
    listening: 'Reconoce información concreta en habla lenta, clara y familiar.',
    'written-discourse': 'Reconoce secuencias cotidianas, referencias explícitas y conectores básicos en textos muy breves.',
    grammar: 'Controla patrones memorizados y estructuras elementales, aunque con errores frecuentes.',
    vocabulary: 'Dispone de palabras y expresiones básicas para situaciones personales inmediatas.',
  },
  A2: {
    reading: 'Comprende textos breves y previsibles y localiza información específica de alta frecuencia.',
    listening: 'Comprende el punto esencial y detalles previsibles en mensajes claros sobre asuntos cotidianos.',
    'written-discourse': 'Organiza mensajes breves y reconoce cronología, causa, contraste y referencias frecuentes.',
    grammar: 'Usa estructuras simples frecuentes con control suficiente para mantener el significado.',
    vocabulary: 'Maneja repertorio para rutinas, transacciones y temas personales, con reformulación limitada.',
  },
  B1: {
    reading: 'Comprende los puntos principales y evidencia explícita en textos claros sobre temas familiares.',
    listening: 'Sigue las ideas principales y detalles relevantes de habla estándar claramente articulada.',
    'written-discourse': 'Organiza párrafos conectados y distingue idea principal, apoyo, contraste y consecuencia explícita.',
    grammar: 'Combina estructuras frecuentes con control razonable, aunque persisten errores no sistemáticos.',
    vocabulary: 'Tiene rango suficiente para explicar temas familiares y sortear vacíos mediante paráfrasis.',
  },
  B2: {
    reading: 'Comprende argumentos, postura y detalle en textos de complejidad concreta y abstracta moderada.',
    listening: 'Sigue discurso extendido y argumentación cuando la organización y el tema son razonablemente accesibles.',
    'written-discourse': 'Organiza y revisa textos argumentativos breves y reconoce relaciones de apoyo, concesión y propósito.',
    grammar: 'Usa variedad de estructuras con buen control y errores que rara vez dificultan la comprensión.',
    vocabulary: 'Selecciona vocabulario amplio con control de colocación, matiz y registro en temas generales.',
  },
  C1: {
    reading: 'Interpreta textos largos y exigentes, relaciones implícitas, postura, tono y organización discursiva.',
    listening: 'Comprende discurso extenso incluso cuando las relaciones no están señaladas explícitamente.',
    'written-discourse': 'Reconstruye arquitectura textual, relaciones implícitas y elecciones de registro con matización.',
    grammar: 'Mantiene control alto sobre un repertorio amplio de estructuras complejas.',
    vocabulary: 'Usa repertorio amplio, idiomático y flexible con selección precisa y escasa búsqueda visible.',
  },
  C2: {
    reading: 'Comprende prácticamente cualquier texto y discrimina matices de estilo, implicación y significado.',
    listening: 'Comprende habla rápida o densa y reconstruye matices e implicaciones con poca dependencia del apoyo.',
    'written-discourse': 'Discrimina alcance lógico, presuposición, postura y revisiones globales entre alternativas plausibles.',
    grammar: 'Sostiene control consistente de estructuras complejas incluso al formular significado denso.',
    vocabulary: 'Explota un repertorio muy amplio con precisión de matiz, colocación, registro y efecto retórico.',
  },
};

export function validateDiagnosticBlueprint(blueprint: DiagnosticBlueprint): string[] {
  const errors: string[] = [];
  if (blueprint.levels.join('|') !== CEFR_LEVELS.join('|')) errors.push('levels must cover A1–C2 in order');
  if (blueprint.dimensions.map(item => item.skill).join('|') !== DIAGNOSTIC_SKILLS.join('|')) {
    errors.push('dimensions must expose the five diagnostic skills in canonical order');
  }
  if (blueprint.locator.decisions !== Object.values(blueprint.locator.decisionsPerObjectiveSkill).reduce((a, b) => a + b, 0)) {
    errors.push('locator decision total does not match its skill allocation');
  }
  if (Object.values(blueprint.locator.decisionsPerObjectiveSkill).some(count => count < 2)) {
    errors.push('locator must include multiple decisions for every objective skill');
  }
  if (blueprint.precision.minimumDecisions > blueprint.precision.maximumDecisions) {
    errors.push('precision minimum exceeds maximum');
  }
  const routedLevels = blueprint.routes.flatMap(route => route.levels);
  if (new Set(routedLevels).size !== CEFR_LEVELS.length || routedLevels.some(level => !CEFR_LEVELS.includes(level))) {
    errors.push('routes must cover every CEFR level exactly once');
  }
  for (const dimension of blueprint.dimensions) {
    if (dimension.minimumDecisions < 1) errors.push(`${dimension.skill} has no evidence floor`);
    if (dimension.minimumDistinctStimuli < 1) errors.push(`${dimension.skill} has no stimulus floor`);
    if (!dimension.construct.trim() || dimension.subdomains.length < 3) errors.push(`${dimension.skill} construct is incomplete`);
  }
  return errors;
}
