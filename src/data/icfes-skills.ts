/**
 * Single source of truth for ICFES skill display metadata.
 * Previously each icfes component (DiagnosticTest, SkillMeter, SkillsHeatmap,
 * DailyChallengeCard) redeclared its own copy, which had already drifted.
 */
import type { IcfesSkill } from '@/lib/types/icfes'

/** Spanish display label for each skill. */
export const SKILL_LABELS: Record<string, string> = {
  vocabulary_basic: 'Vocabulario Básico',
  vocabulary_context: 'Vocabulario en Contexto',
  grammar_recognition: 'Gramática',
  connectors: 'Conectores',
  reference_words: 'Referencias',
  main_idea: 'Idea Principal',
  detail: 'Detalles',
  inference: 'Inferencia',
  paraphrase: 'Paráfrasis',
  tone: 'Tono',
  purpose: 'Propósito',
  sentence_order: 'Orden de Oraciones',
  dialogue_completion: 'Diálogos',
  scanning: 'Scanning',
  time_management: 'Gestión de Tiempo',
  functional_texts: 'Textos Funcionales',
}

/** Tailwind gradient (from-… to-…) used by circular meters / accents per skill. */
export const SKILL_COLORS: Record<string, string> = {
  vocabulary_basic: 'from-blue-500 to-cyan-500',
  vocabulary_context: 'from-purple-500 to-pink-500',
  grammar_recognition: 'from-green-500 to-emerald-500',
  connectors: 'from-orange-500 to-red-500',
  reference_words: 'from-indigo-500 to-blue-500',
  main_idea: 'from-amber-500 to-yellow-500',
  detail: 'from-cyan-500 to-teal-500',
  inference: 'from-violet-500 to-purple-500',
  paraphrase: 'from-rose-500 to-pink-500',
  tone: 'from-fuchsia-500 to-rose-500',
  purpose: 'from-lime-500 to-green-500',
  sentence_order: 'from-sky-500 to-blue-500',
  dialogue_completion: 'from-emerald-500 to-green-500',
  scanning: 'from-yellow-500 to-amber-500',
  time_management: 'from-red-500 to-rose-500',
  functional_texts: 'from-teal-500 to-cyan-500',
}

/** Label lookup that falls back to the raw key for unknown skills. */
export function skillLabel(skill: IcfesSkill | string): string {
  return SKILL_LABELS[skill] ?? skill
}
