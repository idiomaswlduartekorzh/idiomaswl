'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GOVERNMENTS } from '@/data/governments';
import { INDICATORS, CATEGORY_LABELS, CATEGORY_ICONS } from '@/data/indicators';
import { computeGovStats } from '@/lib/utils';
import {
  computeWeightedScore,
  cellScore,
  WEIGHT_PRESETS,
  DEFAULT_WEIGHTS,
  type CategoryWeights,
} from '@/lib/scoring';
import { EXTERNAL_SHOCKS } from '@/data/externalShocks';
import type { IndicatorCategory, Government, Observation } from '@/types';

import { GDP_GROWTH } from '@/data/observations/economy';
import { UNEMPLOYMENT } from '@/data/observations/employment';
import { MONETARY_POVERTY } from '@/data/observations/poverty';
import { HOMICIDE_RATE } from '@/data/observations/security';
import { COCA_HECTARES } from '@/data/observations/narcotics';
import { DEFORESTATION } from '@/data/observations/environment';
import { INFANT_MORTALITY } from '@/data/observations/health';
import { COMPANIES_CREATED } from '@/data/observations/companies';
import { DESERCION_ESCOLAR } from '@/data/observations/education';
import { GASTO_SALUD } from '@/data/observations/budget';
import { CPI_TRANSPARENCIA } from '@/data/observations/corruption';
import { VIVIENDAS_INICIADAS } from '@/data/observations/housing';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type TrendResult = 'mejora' | 'deterioro' | 'estable' | 'sin-datos';

interface CategoryResult {
  category: IndicatorCategory;
  indicatorId: string;
  shortName: string;
  unit: string;
  higherIsBetter: boolean;
  valueStart: number | null;
  valueEnd: number | null;
  changeAbsolute: number | null;
  changePercent: number | null;
  trend: TrendResult;
}

interface GovBalance {
  government: Government;
  categories: CategoryResult[];
  mejoras: number;
  deterioros: number;
  estable: number;
  sinDatos: number;
  weightedScore: number | null;
}

// ────────────────────────────────────────────────────────────────────────────
// Data config — one representative indicator per category
// ────────────────────────────────────────────────────────────────────────────

const KEY_CATEGORIES: Array<{
  category: IndicatorCategory;
  indicatorId: string;
  observations: Observation[];
}> = [
  { category: 'economia',     indicatorId: 'pib-crecimiento',       observations: GDP_GROWTH },
  { category: 'empleo',       indicatorId: 'desempleo',             observations: UNEMPLOYMENT },
  { category: 'pobreza',      indicatorId: 'pobreza-monetaria',     observations: MONETARY_POVERTY },
  { category: 'seguridad',    indicatorId: 'homicidios-tasa',       observations: HOMICIDE_RATE },
  { category: 'narcotrafico', indicatorId: 'coca-hectareas',        observations: COCA_HECTARES },
  { category: 'ambiente',     indicatorId: 'deforestacion',         observations: DEFORESTATION },
  { category: 'infancia',     indicatorId: 'mortalidad-infantil',   observations: INFANT_MORTALITY },
  { category: 'empresas',     indicatorId: 'empresas-constituidas', observations: COMPANIES_CREATED },
  { category: 'educacion',    indicatorId: 'desercion-escolar',     observations: DESERCION_ESCOLAR },
  { category: 'salud',        indicatorId: 'gasto-salud',           observations: GASTO_SALUD },
  { category: 'corrupcion',   indicatorId: 'cpi-transparencia',     observations: CPI_TRANSPARENCIA },
  { category: 'vivienda',     indicatorId: 'viviendas-iniciadas',   observations: VIVIENDAS_INICIADAS },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function determineTrend(
  change: number | null,
  changePercent: number | null,
  higherIsBetter: boolean,
): TrendResult {
  if (change === null || changePercent === null || isNaN(changePercent) || !isFinite(changePercent))
    return 'sin-datos';
  if (Math.abs(changePercent) < 4) return 'estable';
  const improved = higherIsBetter ? change > 0 : change < 0;
  return improved ? 'mejora' : 'deterioro';
}

function fmtCompact(value: number | null, unit: string): string {
  if (value === null) return '—';
  const abs = Math.abs(value);
  const isLarge =
    unit.includes('ha') || unit.includes('empresas') || unit.includes('unidades') ||
    unit.includes('personas') || unit.includes('NNA') || unit.includes('casos') ||
    unit.includes('eventos');
  if (isLarge) {
    if (abs >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
    if (abs >= 1_000) return (value / 1_000).toFixed(0) + 'k';
    return value.toFixed(0);
  }
  return value.toFixed(1);
}

function shortUnit(unit: string): string {
  if (unit.includes('por 100.000')) return 'x100k';
  if (unit.includes('por 1.000 nacidos')) return 'x1kNV';
  if (unit.includes('% PIB')) return '% PIB';
  if (unit.includes('%')) return '%';
  if (unit.includes('puntos')) return 'pts';
  if (unit.includes('ha')) return 'ha';
  return '';
}

function fmtScore(score: number | null): string {
  if (score === null) return '—';
  return `${score > 0 ? '+' : ''}${score.toFixed(0)}`;
}

function scoreColor(score: number | null): string {
  if (score === null) return 'text-slate-600';
  if (score > 15) return 'text-emerald-400';
  if (score < -15) return 'text-red-400';
  return 'text-slate-400';
}

// ────────────────────────────────────────────────────────────────────────────
// Trend display config
// ────────────────────────────────────────────────────────────────────────────

const TREND_CFG: Record<
  TrendResult,
  { bg: string; border: string; text: string; icon: string; label: string }
> = {
  mejora:      { bg: 'bg-emerald-500/12', border: 'border-emerald-500/25', text: 'text-emerald-400', icon: '↑', label: 'Mejoró'    },
  deterioro:   { bg: 'bg-red-500/12',     border: 'border-red-500/25',     text: 'text-red-400',     icon: '↓', label: 'Empeoró'   },
  estable:     { bg: 'bg-slate-700/25',   border: 'border-slate-700/40',   text: 'text-slate-400',   icon: '→', label: 'Sin cambio' },
  'sin-datos': { bg: 'bg-slate-800/40',   border: 'border-slate-800',      text: 'text-slate-600',   icon: '—', label: 'Sin datos'  },
};

const WEIGHT_LABELS = ['Ignorar', 'Normal', 'Alto', 'Máximo'];

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────

type ViewMode = 'recientes' | 'todos';

export default function BalanceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── State (URL-synced) ───────────────────────────────────────────────────
  const [view, setView] = useState<ViewMode>(() =>
    searchParams.get('v') === 'todos' ? 'todos' : 'recientes',
  );

  const [activeCell, setActiveCell] = useState<{
    govId: string;
    category: IndicatorCategory;
  } | null>(() => {
    const g = searchParams.get('g');
    const c = searchParams.get('c') as IndicatorCategory | null;
    return g && c ? { govId: g, category: c } : null;
  });

  const [weights, setWeights] = useState<CategoryWeights>(() => {
    const p = searchParams.get('p') || 'igual';
    return { ...(WEIGHT_PRESETS.find((x) => x.id === p)?.weights ?? DEFAULT_WEIGHTS) };
  });

  const [activePreset, setActivePreset] = useState<string>(
    () => searchParams.get('p') || 'igual',
  );

  const [showWeights, setShowWeights] = useState(false);

  const [govAId, setGovAId] = useState(() => searchParams.get('ga') || 'duque');
  const [govBId, setGovBId] = useState(() => searchParams.get('gb') || 'petro');

  // ── URL sync ───────────────────────────────────────────────────────────
  const updateURL = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v === null) params.delete(k);
        else params.set(k, v);
      }
      router.replace(`/balance?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleViewChange = (v: ViewMode) => { setView(v); updateURL({ v }); };

  const handleCellClick = (govId: string, category: IndicatorCategory) => {
    const same = activeCell?.govId === govId && activeCell?.category === category;
    const next = same ? null : { govId, category };
    setActiveCell(next);
    updateURL({ g: next?.govId ?? null, c: next?.category ?? null });
  };

  const handlePreset = (id: string) => {
    const p = WEIGHT_PRESETS.find((x) => x.id === id);
    if (!p) return;
    setWeights({ ...p.weights });
    setActivePreset(id);
    updateURL({ p: id });
  };

  const handleWeightChange = (category: IndicatorCategory, v: number) => {
    setWeights((prev) => ({ ...prev, [category]: v }));
    setActivePreset('custom');
    updateURL({ p: null });
  };

  const handleGovAChange = (id: string) => { setGovAId(id); updateURL({ ga: id }); };
  const handleGovBChange = (id: string) => { setGovBId(id); updateURL({ gb: id }); };

  // ── Computed ───────────────────────────────────────────────────────────
  const allBalances = useMemo<GovBalance[]>(() => {
    return GOVERNMENTS.map((gov) => {
      const categories: CategoryResult[] = KEY_CATEGORIES.map(
        ({ category, indicatorId, observations }) => {
          const indicator = INDICATORS.find((i) => i.id === indicatorId)!;
          const stats = computeGovStats(observations, gov);
          const trend = determineTrend(stats.change, stats.changePercent, indicator.higherIsBetter);
          return {
            category,
            indicatorId,
            shortName: indicator.shortName,
            unit: indicator.unit,
            higherIsBetter: indicator.higherIsBetter,
            valueStart: stats.start,
            valueEnd: stats.end,
            changeAbsolute: stats.change,
            changePercent: stats.changePercent,
            trend,
          };
        },
      );
      return {
        government: gov,
        categories,
        mejoras:      categories.filter((c) => c.trend === 'mejora').length,
        deterioros:   categories.filter((c) => c.trend === 'deterioro').length,
        estable:      categories.filter((c) => c.trend === 'estable').length,
        sinDatos:     categories.filter((c) => c.trend === 'sin-datos').length,
        weightedScore: computeWeightedScore(categories, weights),
      };
    });
  }, [weights]);

  const displayed =
    view === 'recientes'
      ? allBalances.filter((b) => ['santos1', 'santos2', 'duque', 'petro'].includes(b.government.id))
      : allBalances;

  const detail = useMemo(() => {
    if (!activeCell) return null;
    const gb = allBalances.find((b) => b.government.id === activeCell.govId);
    if (!gb) return null;
    const cat = gb.categories.find((c) => c.category === activeCell.category);
    return cat ? { gov: gb.government, cat } : null;
  }, [activeCell, allBalances]);

  const govABalance = allBalances.find((b) => b.government.id === govAId);
  const govBBalance = allBalances.find((b) => b.government.id === govBId);

  const activePresetLabel = WEIGHT_PRESETS.find((p) => p.id === activePreset)?.label;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
            <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-slate-400">Balance de Gobierno</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Balance de Gobierno
          </h1>
          <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed">
            ¿Mejoró o empeoró cada área durante cada mandato? Ajusta qué te importa más
            y compara presidentes cara a cara.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">

        {/* ── Controls row ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {([
              { id: 'recientes', label: 'Últimos 4 presidentes' },
              { id: 'todos',     label: 'Todos (1994–2026)' },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleViewChange(opt.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === opt.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-wrap items-center gap-3">
              {(Object.entries(TREND_CFG) as [TrendResult, typeof TREND_CFG[TrendResult]][]).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                    {cfg.icon}
                  </span>
                  <span className="text-xs text-slate-500">{cfg.label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowWeights((v) => !v)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                showWeights
                  ? 'bg-violet-600/20 border-violet-500/30 text-violet-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚖️ Mi prioridad{activePreset !== 'igual' && activePreset !== 'custom' && activePresetLabel
                ? `: ${activePresetLabel}`
                : activePreset === 'custom' ? ': personalizado' : ''}
            </button>
          </div>
        </div>

        {/* ── Weight panel (collapsible) ─────────────────────────────────────────── */}
        {showWeights && (
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div>
                <p className="text-sm font-semibold text-white">¿Qué te importa más?</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  0 = ignorar · 1 = normal · 2 = importante · 3 = muy importante. El puntaje se recalcula en tiempo real.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {WEIGHT_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePreset(p.id)}
                    title={p.description}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      activePreset === p.id
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-600'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {KEY_CATEGORIES.map(({ category }) => (
                <div key={category} className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-sm">{CATEGORY_ICONS[category]}</span>
                    <span className="text-xs font-medium text-slate-300 truncate">
                      {CATEGORY_LABELS[category]}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => handleWeightChange(category, v)}
                        title={WEIGHT_LABELS[v]}
                        className={`flex-1 py-1 rounded text-xs font-bold transition-colors ${
                          weights[category] === v
                            ? 'bg-violet-600 text-white'
                            : 'bg-slate-700 text-slate-500 hover:text-slate-200 hover:bg-slate-600'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-600 mt-1 text-right">
                    {WEIGHT_LABELS[weights[category] ?? 1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Heatmap ───────────────────────────────────────────────────── */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider w-40">
                  Categoría
                </th>
                {displayed.map(({ government: g }) => (
                  <th key={g.id} className="px-2 py-3 text-center" style={{ minWidth: 110 }}>
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-slate-900"
                        style={{ backgroundColor: g.color, '--tw-ring-color': g.color } as React.CSSProperties}
                      />
                      <span className="text-[11px] font-semibold text-slate-200 leading-tight text-center">
                        {g.president.split(' ').slice(-1)[0]}
                      </span>
                      <span className="text-[10px] text-slate-500">{g.startYear}–{g.endYear}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KEY_CATEGORIES.map(({ category }) => (
                <tr key={category} className="border-b border-slate-800/50 hover:bg-slate-800/15 transition-colors">
                  <td className="px-4 py-2 bg-slate-900/20">
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none">{CATEGORY_ICONS[category]}</span>
                      <span className="text-xs font-medium text-slate-300 leading-tight">
                        {CATEGORY_LABELS[category]}
                      </span>
                    </div>
                  </td>
                  {displayed.map(({ government: g, categories }) => {
                    const cat = categories.find((c) => c.category === category)!;
                    const cfg = TREND_CFG[cat.trend];
                    const isActive = activeCell?.govId === g.id && activeCell?.category === category;
                    const shock = EXTERNAL_SHOCKS[g.id]?.[category];
                    return (
                      <td key={g.id} className="px-1.5 py-1.5 text-center">
                        <button
                          onClick={() => handleCellClick(g.id, category)}
                          className={`w-full rounded-lg border transition-all duration-150 hover:scale-105 active:scale-95 p-2 relative ${cfg.bg} ${cfg.border} ${isActive ? 'ring-2 ring-white/20' : ''}`}
                        >
                          <div className={`text-base font-bold leading-none ${cfg.text}`}>
                            {cfg.icon}
                          </div>
                          {cat.valueStart !== null && cat.valueEnd !== null && (
                            <div className="mt-1 text-[9px] text-slate-500 leading-none whitespace-nowrap">
                              {fmtCompact(cat.valueStart, cat.unit)} → {fmtCompact(cat.valueEnd, cat.unit)}
                            </div>
                          )}
                          {shock && (
                            <span
                              className="absolute top-0.5 right-0.5 text-[9px] leading-none text-amber-400"
                              title={shock}
                            >
                              ⚡
                            </span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="border-t border-slate-700 bg-slate-900/50">
                <td className="px-4 py-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Resultado
                  </span>
                </td>
                {displayed.map(({ government: g, mejoras, deterioros, estable, sinDatos, weightedScore }) => (
                  <td key={g.id} className="px-2 py-3 text-center">
                    <div className="flex justify-center gap-1 mb-1">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                        ↑{mejoras}
                      </span>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/25">
                        ↓{deterioros}
                      </span>
                    </div>
                    {weightedScore !== null && (
                      <div className={`text-xs font-bold ${scoreColor(weightedScore)}`}>
                        {fmtScore(weightedScore)}
                      </div>
                    )}
                    {(estable > 0 || sinDatos > 0) && (
                      <div className="text-[9px] text-slate-600">
                        {estable > 0 && `→${estable}`}
                        {estable > 0 && sinDatos > 0 && ' '}
                        {sinDatos > 0 && `—${sinDatos}`}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Detail panel ──────────────────────────────────────────────────── */}
        {detail?.cat && detail?.gov && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Detalle del indicador</p>
                <h3 className="text-lg font-semibold text-white">
                  {detail.cat.shortName}
                  <span className="text-slate-500 font-normal"> — </span>
                  {detail.gov.president}
                </h3>
                <p className="text-sm text-slate-500">
                  {detail.gov.startYear}–{detail.gov.endYear} · {CATEGORY_LABELS[detail.cat.category]}
                </p>
              </div>
              <button
                onClick={() => { setActiveCell(null); updateURL({ g: null, c: null }); }}
                className="text-slate-500 hover:text-slate-300 text-2xl leading-none mt-1 shrink-0"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/60 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Inicio de mandato</p>
                <p className="text-2xl font-bold text-white">
                  {detail.cat.valueStart !== null ? fmtCompact(detail.cat.valueStart, detail.cat.unit) : '—'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{shortUnit(detail.cat.unit)}</p>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Fin de mandato</p>
                <p className="text-2xl font-bold text-white">
                  {detail.cat.valueEnd !== null ? fmtCompact(detail.cat.valueEnd, detail.cat.unit) : '—'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{shortUnit(detail.cat.unit)}</p>
              </div>
              <div className={`rounded-lg p-4 border ${TREND_CFG[detail.cat.trend].bg} ${TREND_CFG[detail.cat.trend].border}`}>
                <p className="text-xs text-slate-500 mb-1">Variación total</p>
                <p className={`text-2xl font-bold ${TREND_CFG[detail.cat.trend].text}`}>
                  {detail.cat.changeAbsolute !== null
                    ? `${detail.cat.changeAbsolute > 0 ? '+' : ''}${fmtCompact(detail.cat.changeAbsolute, detail.cat.unit)}`
                    : '—'}
                </p>
                {detail.cat.changePercent !== null && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {detail.cat.changePercent > 0 ? '+' : ''}{detail.cat.changePercent.toFixed(1)}% relativo
                  </p>
                )}
              </div>
            </div>

            {EXTERNAL_SHOCKS[detail.gov.id]?.[detail.cat.category] && (
              <div className="mt-3 flex items-start gap-2 bg-amber-500/5 border border-amber-500/15 rounded-lg px-3 py-2">
                <span className="text-amber-400 text-sm mt-0.5 shrink-0">⚡</span>
                <p className="text-xs text-amber-400/80">
                  <strong className="text-amber-400">Factor externo:</strong>{' '}
                  {EXTERNAL_SHOCKS[detail.gov.id]![detail.cat.category]}
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className={`text-sm font-semibold ${TREND_CFG[detail.cat.trend].text}`}>
                {TREND_CFG[detail.cat.trend].icon} {TREND_CFG[detail.cat.trend].label}
              </span>
              <span className="text-slate-700">·</span>
              <span className="text-xs text-slate-500">
                {detail.cat.higherIsBetter ? 'Para este indicador: mayor = mejor' : 'Para este indicador: menor = mejor'}
              </span>
              <span className="text-slate-700">·</span>
              <Link
                href={`/indicadores/${detail.cat.category}`}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver serie completa →
              </Link>
            </div>
          </div>
        )}

        {/* ── Ranking cards ───────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-base font-semibold text-slate-300">Ranking</h2>
            <span className="text-xs text-slate-600">
              {activePreset !== 'igual'
                ? `· peso: ${activePreset === 'custom' ? 'personalizado' : activePresetLabel}`
                : '· puntaje basado en magnitud del cambio'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...displayed]
              .sort((a, b) => {
                const sa = a.weightedScore ?? -999;
                const sb = b.weightedScore ?? -999;
                if (sa !== sb) return sb - sa;
                return b.mejoras - a.mejoras;
              })
              .map(({ government: g, mejoras, deterioros, estable, sinDatos, weightedScore }) => {
                const total = mejoras + deterioros + estable;
                const mejoraPct   = total > 0 ? (mejoras / total) * 100 : 0;
                const deterioroPct = total > 0 ? (deterioros / total) * 100 : 0;
                return (
                  <div key={g.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white leading-tight truncate">
                          {g.president.split(' ').length >= 3
                            ? `${g.president.split(' ')[0]} ${g.president.split(' ').slice(-1)[0]}`
                            : g.president}
                        </p>
                        <p className="text-[10px] text-slate-500">{g.startYear}–{g.endYear}</p>
                      </div>
                    </div>

                    {weightedScore !== null && (
                      <div className={`text-2xl font-black mb-3 ${scoreColor(weightedScore)}`}>
                        {fmtScore(weightedScore)}
                        <span className="text-[10px] font-normal text-slate-600 ml-1">pts</span>
                      </div>
                    )}

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-emerald-400">↑ Mejoras</span>
                        <span className="text-sm font-bold text-emerald-400">{mejoras}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-red-400">↓ Deterioros</span>
                        <span className="text-sm font-bold text-red-400">{deterioros}</span>
                      </div>
                      {estable > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-slate-500">→ Sin cambio</span>
                          <span className="text-sm font-bold text-slate-500">{estable}</span>
                        </div>
                      )}
                      {sinDatos > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-slate-700">— Sin datos</span>
                          <span className="text-sm font-bold text-slate-700">{sinDatos}</span>
                        </div>
                      )}
                    </div>

                    <div className="h-1.5 rounded-full overflow-hidden bg-slate-700 flex">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: `${mejoraPct}%` }} />
                      <div className="h-full bg-red-500 transition-all"     style={{ width: `${deterioroPct}%` }} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ── Head-to-head ────────────────────────────────────────────────────── */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-base font-semibold text-slate-300 mb-4">Cara a Cara</h2>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <select
              value={govAId}
              onChange={(e) => handleGovAChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {GOVERNMENTS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.president} ({g.startYear}–{g.endYear})
                </option>
              ))}
            </select>
            <span className="text-slate-500 font-bold text-sm px-1">vs</span>
            <select
              value={govBId}
              onChange={(e) => handleGovBChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {GOVERNMENTS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.president} ({g.startYear}–{g.endYear})
                </option>
              ))}
            </select>
          </div>

          {govABalance && govBBalance && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-xs text-slate-500 py-2 px-3 w-32">Categoría</th>
                    <th className="text-center text-xs font-semibold py-2 px-3" style={{ color: govABalance.government.color }}>
                      {govABalance.government.president.split(' ').slice(-1)[0]}
                      <span className="text-slate-600 font-normal ml-1">
                        {govABalance.government.startYear}–{govABalance.government.endYear}
                      </span>
                    </th>
                    <th className="text-center text-[10px] text-slate-700 py-2 px-2 w-8">vs</th>
                    <th className="text-center text-xs font-semibold py-2 px-3" style={{ color: govBBalance.government.color }}>
                      {govBBalance.government.president.split(' ').slice(-1)[0]}
                      <span className="text-slate-600 font-normal ml-1">
                        {govBBalance.government.startYear}–{govBBalance.government.endYear}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KEY_CATEGORIES.map(({ category }) => {
                    const catA = govABalance.categories.find((c) => c.category === category)!;
                    const catB = govBBalance.categories.find((c) => c.category === category)!;
                    const sA = cellScore(catA.changePercent, catA.higherIsBetter);
                    const sB = cellScore(catB.changePercent, catB.higherIsBetter);
                    const aWins = sA !== null && sB !== null && sA > sB;
                    const bWins = sA !== null && sB !== null && sB > sA;
                    const cfgA = TREND_CFG[catA.trend];
                    const cfgB = TREND_CFG[catB.trend];

                    return (
                      <tr key={category} className="border-b border-slate-800/50 hover:bg-slate-800/10 transition-colors">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">{CATEGORY_ICONS[category]}</span>
                            <span className="text-xs text-slate-400">{CATEGORY_LABELS[category]}</span>
                          </div>
                        </td>
                        <td className={`py-2 px-3 text-center ${aWins ? 'bg-emerald-500/5' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            {aWins && <span className="text-[10px] text-emerald-500">★</span>}
                            <span className={`text-sm font-bold ${cfgA.text}`}>{cfgA.icon}</span>
                            {catA.changePercent !== null && isFinite(catA.changePercent) ? (
                              <span className="text-xs text-slate-500">
                                {catA.changePercent > 0 ? '+' : ''}{catA.changePercent.toFixed(1)}%
                              </span>
                            ) : (
                              <span className="text-xs text-slate-700">—</span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <span className="text-[10px] text-slate-800">·</span>
                        </td>
                        <td className={`py-2 px-3 text-center ${bWins ? 'bg-emerald-500/5' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            {bWins && <span className="text-[10px] text-emerald-500">★</span>}
                            <span className={`text-sm font-bold ${cfgB.text}`}>{cfgB.icon}</span>
                            {catB.changePercent !== null && isFinite(catB.changePercent) ? (
                              <span className="text-xs text-slate-500">
                                {catB.changePercent > 0 ? '+' : ''}{catB.changePercent.toFixed(1)}%
                              </span>
                            ) : (
                              <span className="text-xs text-slate-700">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  <tr className="border-t border-slate-700 bg-slate-900/40">
                    <td className="py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Puntaje
                    </td>
                    <td className={`py-3 px-3 text-center text-xl font-black ${scoreColor(govABalance.weightedScore)}`}>
                      {fmtScore(govABalance.weightedScore)}
                      {govABalance.weightedScore !== null && (
                        <span className="text-[10px] font-normal text-slate-600 ml-1">pts</span>
                      )}
                    </td>
                    <td />
                    <td className={`py-3 px-3 text-center text-xl font-black ${scoreColor(govBBalance.weightedScore)}`}>
                      {fmtScore(govBBalance.weightedScore)}
                      {govBBalance.weightedScore !== null && (
                        <span className="text-[10px] font-normal text-slate-600 ml-1">pts</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Methodology caveat ─────────────────────────────────────────────────── */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-amber-400 mb-3">⚠️ Cómo leer esta herramienta</h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Los colores muestran la dirección del cambio</strong>{' '}
              del primer al último año con datos disponibles dentro del mandato —
              no si el gobierno es responsable de ese cambio.
            </p>
            <p>
              <strong className="text-slate-300">⚡ indica un factor externo relevante</strong>{' '}
              (pandemia, crisis global, colapso de materias primas) que afectó el indicador
              de forma significativa e independiente de la política del gobierno.
            </p>
            <p>
              <strong className="text-slate-300">El puntaje compuesto</strong>{' '}
              combina magnitud del cambio con los pesos que asignes en &quot;Mi prioridad&quot;.
              Un gobierno puede tener más &quot;mejoras&quot; contadas pero menor puntaje
              si sus mejoras fueron pequeñas y sus deterioros grandes.
            </p>
            <p>
              Para contexto completo (valores absolutos, fuentes y metodología), haz clic en
              cualquier celda o visita la sección de{' '}
              <Link href="/indicadores" className="text-blue-400 hover:text-blue-300">Indicadores</Link>.
            </p>
          </div>
        </div>

        {/* ── Data note ─────────────────────────────────────────────────── */}
        <p className="text-xs text-slate-700 pb-4">
          Un indicador por categoría · Umbral: ±4% relativo · ⚡ = factor externo ·
          Fuentes: DANE, Banco de la República, MHCP, Indepaz, UNODC, Medicina Legal,
          IDEAM, Confecámaras, Transparencia Internacional, MEN ·
          Datos verificados contra fuentes primarias oficiales.
        </p>
      </div>
    </div>
  );
}
