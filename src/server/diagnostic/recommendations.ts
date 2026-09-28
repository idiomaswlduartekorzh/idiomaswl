import { ENGLISH_LEVEL_EVIDENCE } from '../../lib/diagnostic/blueprint.ts';
import { CEFR_LEVELS, type CefrLevel, type DiagnosticSkill, type DiagnosticSkillEvidence } from '../../lib/diagnostic/types.ts';

export interface DiagnosticRecommendation {
  skill: DiagnosticSkill;
  priority: number;
  currentLevel: CefrLevel | null;
  targetLevel: CefrLevel;
  reason: string;
  practice: { label: string; href: string };
  course: { label: string; href: string };
}

const PRACTICE: Readonly<Record<DiagnosticSkill, { label: string; href: string }>> = {
  reading: { label: 'Practicar lectura en inglés', href: '/practica/ingles' },
  listening: { label: 'Entrenar escucha con podcasts', href: '/podcasts' },
  'written-discourse': { label: 'Practicar cohesión y organización escrita', href: '/practica/ielts-writing-conectores' },
  grammar: { label: 'Reforzar estructuras en contexto', href: '/practica/ingles' },
  vocabulary: { label: 'Construir vocabulario personal', href: '/practica/mi-vocabulario' },
};

function targetAfter(level?: CefrLevel): CefrLevel {
  if (!level) return 'A1';
  return CEFR_LEVELS[Math.min(CEFR_LEVELS.length - 1, CEFR_LEVELS.indexOf(level) + 1)];
}

function urgency(evidence: DiagnosticSkillEvidence): number {
  if (!evidence.estimatedLevel || evidence.status === 'not-estimated') return -100;
  const level = CEFR_LEVELS.indexOf(evidence.estimatedLevel);
  return level + (evidence.confidence ?? 0) * 0.2;
}

export function buildEnglishDiagnosticRecommendations(
  skills: readonly DiagnosticSkillEvidence[],
): readonly DiagnosticRecommendation[] {
  if (new Set(skills.map(skill => skill.skill)).size !== skills.length) throw new Error('diagnostic recommendations contain duplicate skills');
  const ordered = [...skills].sort((left, right) => urgency(left) - urgency(right) || left.skill.localeCompare(right.skill));
  return ordered.map((evidence, index) => {
    const targetLevel = targetAfter(evidence.estimatedLevel);
    const reason = evidence.status === 'not-estimated' || !evidence.estimatedLevel
      ? 'Falta evidencia suficiente en esta habilidad; conviene repetir una medición dirigida antes de asignar un nivel.'
      : `La evidencia actual se concentra en ${evidence.estimatedLevel}. El siguiente objetivo observable es: ${ENGLISH_LEVEL_EVIDENCE[targetLevel][evidence.skill]}`;
    return {
      skill: evidence.skill,
      priority: index + 1,
      currentLevel: evidence.estimatedLevel ?? null,
      targetLevel,
      reason,
      practice: PRACTICE[evidence.skill],
      course: { label: 'Diseñar una ruta con un profesor', href: '/clases-de-ingles' },
    };
  });
}
