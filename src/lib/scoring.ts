import type { IndicatorCategory } from '@/types';

export type CategoryWeights = Record<IndicatorCategory, number>;

export const DEFAULT_WEIGHTS: CategoryWeights = {
  economia: 1, empleo: 1, pobreza: 1, seguridad: 1,
  narcotrafico: 1, ambiente: 1, infancia: 1, empresas: 1,
  educacion: 1, salud: 1, corrupcion: 1, vivienda: 1,
};

export const WEIGHT_PRESETS: Array<{
  id: string;
  label: string;
  description: string;
  weights: CategoryWeights;
}> = [
  {
    id: 'igual',
    label: 'Igual peso',
    description: 'Todas las categorías pesan igual',
    weights: { ...DEFAULT_WEIGHTS },
  },
  {
    id: 'ciudadano',
    label: 'Ciudadano',
    description: 'Seguridad, empleo y pobreza como prioridad',
    weights: {
      economia: 2, empleo: 3, pobreza: 3, seguridad: 3,
      narcotrafico: 2, ambiente: 1, infancia: 2, empresas: 1,
      educacion: 2, salud: 2, corrupcion: 2, vivienda: 2,
    },
  },
  {
    id: 'empresarial',
    label: 'Empresarial',
    description: 'Economía, empresas y control de corrupción',
    weights: {
      economia: 3, empleo: 2, pobreza: 1, seguridad: 2,
      narcotrafico: 2, ambiente: 1, infancia: 1, empresas: 3,
      educacion: 1, salud: 1, corrupcion: 3, vivienda: 1,
    },
  },
  {
    id: 'social',
    label: 'Social',
    description: 'Pobreza, educación, salud y ambiente',
    weights: {
      economia: 1, empleo: 2, pobreza: 3, seguridad: 2,
      narcotrafico: 1, ambiente: 3, infancia: 3, empresas: 1,
      educacion: 3, salud: 3, corrupcion: 2, vivienda: 2,
    },
  },
];

// Returns a weighted composite score −100..+100.
// Positive = net improvement weighted by user priorities.
export function computeWeightedScore(
  categories: Array<{
    category: IndicatorCategory;
    changePercent: number | null;
    higherIsBetter: boolean;
  }>,
  weights: CategoryWeights,
): number | null {
  let totalWeight = 0;
  let weightedSum = 0;

  for (const { category, changePercent, higherIsBetter } of categories) {
    if (changePercent === null || !isFinite(changePercent) || isNaN(changePercent)) continue;
    const w = weights[category] ?? 1;
    if (w === 0) continue;
    const pct = Math.min(Math.max(changePercent, -100), 100);
    const sign = higherIsBetter ? 1 : -1;
    weightedSum += sign * pct * w;
    totalWeight += w;
  }

  if (totalWeight === 0) return null;
  // ±25% average weighted change → ±100 composite score
  return Math.min(Math.max((weightedSum / totalWeight / 25) * 100, -100), 100);
}

// Directional score for a single cell — positive = improved, negative = worsened.
// Used for head-to-head comparison regardless of indicator direction.
export function cellScore(
  changePercent: number | null,
  higherIsBetter: boolean,
): number | null {
  if (changePercent === null || !isFinite(changePercent) || isNaN(changePercent)) return null;
  return (higherIsBetter ? 1 : -1) * changePercent;
}
