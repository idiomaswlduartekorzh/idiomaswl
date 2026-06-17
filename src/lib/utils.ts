import { Observation, Government } from '@/types';

export function formatNumber(n: number, decimals = 1): string {
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return n.toFixed(decimals);
}

export function formatPercent(n: number, decimals = 1): string {
  return n.toFixed(decimals) + '%';
}

export function formatGini(n: number): string {
  return n.toFixed(3);
}

export function getChangeColor(change: number, higherIsBetter: boolean): string {
  if (Math.abs(change) < 0.01) return 'text-slate-400';
  if (change > 0) return higherIsBetter ? 'text-emerald-400' : 'text-red-400';
  return higherIsBetter ? 'text-red-400' : 'text-emerald-400';
}

export function getTrendIcon(change: number, higherIsBetter: boolean): string {
  if (Math.abs(change) < 0.01) return '→';
  if (change > 0) return higherIsBetter ? '↑' : '↓';
  return higherIsBetter ? '↓' : '↑';
}

export function getTrendEmoji(change: number, higherIsBetter: boolean): string {
  if (Math.abs(change) < 0.5) return '→';
  const improved = higherIsBetter ? change > 0 : change < 0;
  return improved ? '✓' : '✗';
}

export function computeGovStats(
  observations: Observation[],
  gov: Government
): {
  start: number | null;
  end: number | null;
  min: number | null;
  max: number | null;
  mean: number | null;
  change: number | null;
  changePercent: number | null;
} {
  const inPeriod = observations.filter(
    (o) => o.year >= gov.startYear && o.year <= gov.endYear
  );

  if (inPeriod.length === 0) {
    return { start: null, end: null, min: null, max: null, mean: null, change: null, changePercent: null };
  }

  const sorted = [...inPeriod].sort((a, b) => a.year - b.year);
  const values = sorted.map((o) => o.value);
  const start = values[0];
  const end = values[values.length - 1];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const change = end - start;
  const changePercent = start !== 0 ? (change / start) * 100 : null;

  return { start, end, min, max, mean, change, changePercent };
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function getChartFormatters(observations: Observation[], unit = ''): {
  formatY: (v: number) => string;
  formatTooltip: (v: number) => string;
} {
  const maxAbs = observations.length
    ? Math.max(...observations.map((o) => Math.abs(o.value)))
    : 0;

  if (maxAbs >= 1_000_000) {
    return {
      formatY: (v) => `${(v / 1_000_000).toFixed(1)}M`,
      formatTooltip: (v) => `${v.toLocaleString('es-CO')} ${unit}`.trim(),
    };
  }
  if (maxAbs >= 50_000) {
    return {
      formatY: (v) => `${(v / 1_000).toFixed(0)}k`,
      formatTooltip: (v) => `${v.toLocaleString('es-CO')} ${unit}`.trim(),
    };
  }
  if (maxAbs >= 1_000) {
    return {
      formatY: (v) => v.toLocaleString('es-CO'),
      formatTooltip: (v) => `${v.toLocaleString('es-CO')} ${unit}`.trim(),
    };
  }
  return {
    formatY: (v) => v.toFixed(1),
    formatTooltip: (v) => `${v.toFixed(2)} ${unit}`.trim(),
  };
}

export const CATEGORY_COLORS: Record<string, string> = {
  economia: '#3b82f6',
  empleo: '#8b5cf6',
  pobreza: '#f59e0b',
  seguridad: '#ef4444',
  narcotrafico: '#10b981',
  ambiente: '#22c55e',
  infancia: '#f43f5e',
  empresas: '#f97316',
  educacion: '#06b6d4',
  salud: '#ec4899',
  corrupcion: '#6b7280',
  vivienda: '#0ea5e9',
};
