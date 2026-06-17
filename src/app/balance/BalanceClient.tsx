'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GOVERNMENTS } from '@/data/governments';
import { INDICATORS, CATEGORY_LABELS, CATEGORY_ICONS } from '@/data/indicators';
import { computeGovStats } from '@/lib/utils';
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
}

// ────────────────────────────────────────────────────────────────────────────
// Data config — one representative indicator per category
// ────────────────────────────────────────────────────────────────────────────

const KEY_CATEGORIES: Array<{
  category: IndicatorCategory;
  indicatorId: string;
  observations: Observation[];
}> = [
  { category: 'economia',     indicatorId: 'pib-crecimiento',      observations: GDP_GROWTH },
  { category: 'empleo',       indicatorId: 'desempleo',            observations: UNEMPLOYMENT },
  { category: 'pobreza',      indicatorId: 'pobreza-monetaria',    observations: MONETARY_POVERTY },
  { category: 'seguridad',    indicatorId: 'homicidios-tasa',      observations: HOMICIDE_RATE },
  { category: 'narcotrafico', indicatorId: 'coca-hectareas',       observations: COCA_HECTARES },
  { category: 'ambiente',     indicatorId: 'deforestacion',        observations: DEFORESTATION },
  { category: 'infancia',     indicatorId: 'mortalidad-infantil',  observations: INFANT_MORTALITY },
  { category: 'empresas',     indicatorId: 'empresas-constituidas',observations: COMPANIES_CREATED },
  { category: 'educacion',    indicatorId: 'desercion-escolar',    observations: DESERCION_ESCOLAR },
  { category: 'salud',        indicatorId: 'gasto-salud',          observations: GASTO_SALUD },
  { category: 'corrupcion',   indicatorId: 'cpi-transparencia',    observations: CPI_TRANSPARENCIA },
  { category: 'vivienda',     indicatorId: 'viviendas-iniciadas',  observations: VIVIENDAS_INICIADAS },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function determineTrend(
  change: number | null,
  changePercent: number | null,
  higherIsBetter: boolean,
): TrendResult {
  if (
    change === null ||
    changePercent === null ||
    isNaN(changePercent) ||
    !isFinite(changePercent)
  )
    return 'sin-datos';
  // threshold: 4 % relative change to count as meaningful
  if (Math.abs(changePercent) < 4) return 'estable';
  const improved = higherIsBetter ? change > 0 : change < 0;
  return improved ? 'mejora' : 'deterioro';
}

function fmtCompact(value: number | null, unit: string): string {
  if (value === null) return '—';
  const abs = Math.abs(value);
  const isLargeAbsolute =
    unit.includes('ha') ||
    unit.includes('empresas') ||
    unit.includes('unidades') ||
    unit.includes('personas') ||
    unit.includes('NNA') ||
    unit.includes('casos') ||
    unit.includes('eventos');

  if (isLargeAbsolute) {
    if (abs >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
    if (abs >= 1_000) return (value / 1_000).toFixed(0) + 'k';
    return value.toFixed(0);
  }
  // % and index values
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

// ────────────────────────────────────────────────────────────────────────────
// Trend display config
// ────────────────────────────────────────────────────────────────────────────

const TREND_CFG: Record<
  TrendResult,
  { bg: string; border: string; text: string; icon: string; label: string }
> = {
  mejora: {
    bg: 'bg-emerald-500/12',
    border: 'border-emerald-500/25',
    text: 'text-emerald-400',
    icon: '↑',
    label: 'Mejoró',
  },
  deterioro: {
    bg: 'bg-red-500/12',
    border: 'border-red-500/25',
    text: 'text-red-400',
    icon: '↓',
    label: 'Empeoró',
  },
  estable: {
    bg: 'bg-slate-700/25',
    border: 'border-slate-700/40',
    text: 'text-slate-400',
    icon: '→',
    label: 'Sin cambio',
  },
  'sin-datos': {
    bg: 'bg-slate-800/40',
    border: 'border-slate-800',
    text: 'text-slate-600',
    icon: '—',
    label: 'Sin datos',
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────

type ViewMode = 'recientes' | 'todos';

export default function BalanceClient() {
  const [view, setView] = useState<ViewMode>('recientes');
  const [activeCell, setActiveCell] = useState<{
    govId: string;
    category: IndicatorCategory;
  } | null>(null);

  // Compute full balance matrix (memoised — pure from static data)
  const allBalances = useMemo<GovBalance[]>(() => {
    return GOVERNMENTS.map((gov) => {
      const categories: CategoryResult[] = KEY_CATEGORIES.map(
        ({ category, indicatorId, observations }) => {
          const indicator = INDICATORS.find((i) => i.id === indicatorId)!;
          const stats = computeGovStats(observations, gov);
          const trend = determineTrend(
            stats.change,
            stats.changePercent,
            indicator.higherIsBetter,
          );
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
        mejoras: categories.filter((c) => c.trend === 'mejora').length,
        deterioros: categories.filter((c) => c.trend === 'deterioro').length,
        estable: categories.filter((c) => c.trend === 'estable').length,
        sinDatos: categories.filter((c) => c.trend === 'sin-datos').length,
      };
    });
  }, []);

  const displayed =
    view === 'recientes'
      ? allBalances.filter((b) =>
          ['santos1', 'santos2', 'duque', 'petro'].includes(b.government.id),
        )
      : allBalances;

  // Active cell detail
  const detail = useMemo(() => {
    if (!activeCell) return null;
    const gb = allBalances.find((b) => b.government.id === activeCell.govId);
    if (!gb) return null;
    const cat = gb.categories.find((c) => c.category === activeCell.category);
    return { gov: gb.government, cat };
  }, [activeCell, allBalances]);

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
            <Link href="/" className="hover:text-slate-400 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-slate-400">Balance de Gobierno</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Balance de Gobierno
          </h1>
          <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed">
            ¿Mejoró o empeoró cada área durante cada mandato? Una celda verde
            significa que el indicador evolucionó favorablemente; roja, que
            empeoró. Los datos son el punto de partida, no el juicio final.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* ── Controls ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* View toggle */}
          <div className="flex gap-2">
            {(
              [
                { id: 'recientes', label: 'Últimos 4 presidentes' },
                { id: 'todos', label: 'Todos (1994–2026)' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setView(opt.id)}
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

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3">
            {(
              Object.entries(TREND_CFG) as [TrendResult, (typeof TREND_CFG)[TrendResult]][]
            ).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold border ${cfg.bg} ${cfg.border} ${cfg.text}`}
                >
                  {cfg.icon}
                </span>
                <span className="text-xs text-slate-500">{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Heatmap ───────────────────────────────────────────────────── */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider w-40">
                  Categoría
                </th>
                {displayed.map(({ government: g }) => (
                  <th
                    key={g.id}
                    className="px-2 py-3 text-center"
                    style={{ minWidth: 110 }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-slate-900"
                        style={{ backgroundColor: g.color, '--tw-ring-color': g.color } as React.CSSProperties}
                      />
                      <span className="text-[11px] font-semibold text-slate-200 leading-tight text-center">
                        {g.president.split(' ').slice(-1)[0]}
                        {g.president.includes('(') && (
                          <span className="text-slate-500">
                            {' '}
                            {g.president.match(/\(([^)]+)\)/)?.[1] ?? ''}
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {g.startYear}–{g.endYear}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {KEY_CATEGORIES.map(({ category }) => (
                <tr
                  key={category}
                  className="border-b border-slate-800/50 hover:bg-slate-800/15 transition-colors group"
                >
                  {/* Category label */}
                  <td className="px-4 py-2 bg-slate-900/20">
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none">
                        {CATEGORY_ICONS[category]}
                      </span>
                      <span className="text-xs font-medium text-slate-300 leading-tight">
                        {CATEGORY_LABELS[category]}
                      </span>
                    </div>
                  </td>

                  {/* Trend cells */}
                  {displayed.map(({ government: g, categories }) => {
                    const cat = categories.find((c) => c.category === category)!;
                    const cfg = TREND_CFG[cat.trend];
                    const isActive =
                      activeCell?.govId === g.id &&
                      activeCell?.category === category;
                    return (
                      <td key={g.id} className="px-1.5 py-1.5 text-center">
                        <button
                          onClick={() =>
                            setActiveCell(
                              isActive ? null : { govId: g.id, category },
                            )
                          }
                          className={`w-full rounded-lg border transition-all duration-150 hover:scale-105 active:scale-95 p-2 ${cfg.bg} ${cfg.border} ${isActive ? 'ring-2 ring-white/20' : ''}`}
                        >
                          <div
                            className={`text-base font-bold leading-none ${cfg.text}`}
                          >
                            {cfg.icon}
                          </div>
                          {cat.valueStart !== null && cat.valueEnd !== null && (
                            <div className="mt-1 text-[9px] text-slate-500 leading-none whitespace-nowrap">
                              {fmtCompact(cat.valueStart, cat.unit)}
                              {shortUnit(cat.unit) && (
                                <span className="text-slate-700">
                                  {shortUnit(cat.unit)}{' '}
                                </span>
                              )}{' '}
                              →{' '}
                              {fmtCompact(cat.valueEnd, cat.unit)}
                            </div>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Score summary row */}
              <tr className="border-t border-slate-700 bg-slate-900/50">
                <td className="px-4 py-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Resultado
                  </span>
                </td>
                {displayed.map(
                  ({ government: g, mejoras, deterioros, estable, sinDatos }) => (
                    <td key={g.id} className="px-2 py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                          ↑{mejoras}
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/25">
                          ↓{deterioros}
                        </span>
                      </div>
                      {(estable > 0 || sinDatos > 0) && (
                        <div className="mt-1 text-[9px] text-slate-600">
                          {estable > 0 && `→${estable}`}
                          {estable > 0 && sinDatos > 0 && ' '}
                          {sinDatos > 0 && `—${sinDatos}`}
                        </div>
                      )}
                    </td>
                  ),
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Detail panel (appears when a cell is clicked) ─────────────── */}
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
                  {detail.gov.startYear}–{detail.gov.endYear} ·{' '}
                  {CATEGORY_LABELS[detail.cat.category]}
                </p>
              </div>
              <button
                onClick={() => setActiveCell(null)}
                className="text-slate-500 hover:text-slate-300 text-2xl leading-none mt-1 shrink-0"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/60 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Inicio de mandato</p>
                <p className="text-2xl font-bold text-white">
                  {detail.cat.valueStart !== null
                    ? fmtCompact(detail.cat.valueStart, detail.cat.unit)
                    : '—'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {shortUnit(detail.cat.unit)}
                </p>
              </div>

              <div className="bg-slate-900/60 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Fin de mandato</p>
                <p className="text-2xl font-bold text-white">
                  {detail.cat.valueEnd !== null
                    ? fmtCompact(detail.cat.valueEnd, detail.cat.unit)
                    : '—'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {shortUnit(detail.cat.unit)}
                </p>
              </div>

              <div
                className={`rounded-lg p-4 border ${TREND_CFG[detail.cat.trend].bg} ${TREND_CFG[detail.cat.trend].border}`}
              >
                <p className="text-xs text-slate-500 mb-1">Variación total</p>
                <p
                  className={`text-2xl font-bold ${TREND_CFG[detail.cat.trend].text}`}
                >
                  {detail.cat.changeAbsolute !== null
                    ? `${detail.cat.changeAbsolute > 0 ? '+' : ''}${fmtCompact(detail.cat.changeAbsolute, detail.cat.unit)}`
                    : '—'}
                </p>
                {detail.cat.changePercent !== null && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {detail.cat.changePercent > 0 ? '+' : ''}
                    {detail.cat.changePercent.toFixed(1)}% relativo
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span
                className={`text-sm font-semibold ${TREND_CFG[detail.cat.trend].text}`}
              >
                {TREND_CFG[detail.cat.trend].icon}{' '}
                {TREND_CFG[detail.cat.trend].label}
              </span>
              <span className="text-slate-700">·</span>
              <span className="text-xs text-slate-500">
                {detail.cat.higherIsBetter
                  ? 'Para este indicador: mayor = mejor'
                  : 'Para este indicador: menor = mejor'}
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

        {/* ── Ranking cards ─────────────────────────────────────────────── */}
        <div>
          <h2 className="text-base font-semibold text-slate-300 mb-4">
            Conteo de indicadores por presidente
            <span className="text-xs font-normal text-slate-600 ml-2">
              (ordenado por mayor número de mejoras)
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...displayed]
              .sort((a, b) => b.mejoras - a.mejoras)
              .map(
                ({ government: g, mejoras, deterioros, estable, sinDatos }) => {
                  const total = mejoras + deterioros + estable;
                  const mejoraPct = total > 0 ? (mejoras / total) * 100 : 0;
                  const deterioroPct = total > 0 ? (deterioros / total) * 100 : 0;
                  return (
                    <div
                      key={g.id}
                      className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: g.color }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white leading-tight truncate">
                            {g.president.split(' ').length >= 3
                              ? `${g.president.split(' ')[0]} ${g.president.split(' ').slice(-1)[0]}`
                              : g.president}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {g.startYear}–{g.endYear}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-emerald-400">
                            ↑ Mejoras
                          </span>
                          <span className="text-sm font-bold text-emerald-400">
                            {mejoras}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-red-400">
                            ↓ Deterioros
                          </span>
                          <span className="text-sm font-bold text-red-400">
                            {deterioros}
                          </span>
                        </div>
                        {estable > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] text-slate-500">
                              → Sin cambio
                            </span>
                            <span className="text-sm font-bold text-slate-500">
                              {estable}
                            </span>
                          </div>
                        )}
                        {sinDatos > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] text-slate-700">
                              — Sin datos
                            </span>
                            <span className="text-sm font-bold text-slate-700">
                              {sinDatos}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Stacked bar: green / red / gray */}
                      <div className="h-1.5 rounded-full overflow-hidden bg-slate-700 flex">
                        <div
                          className="h-full bg-emerald-500 transition-all"
                          style={{ width: `${mejoraPct}%` }}
                        />
                        <div
                          className="h-full bg-red-500 transition-all"
                          style={{ width: `${deterioroPct}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>

        {/* ── Methodology caveat ────────────────────────────────────────── */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-amber-400 mb-3">
            ⚠️ Cómo leer esta herramienta
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              <strong className="text-slate-300">Los colores muestran la dirección del cambio</strong>{' '}
              del primer al último año con datos disponibles dentro del mandato —
              no si el gobierno es responsable de ese cambio.
            </p>
            <p>
              <strong className="text-slate-300">
                Factores externos que afectan múltiples indicadores:
              </strong>{' '}
              crisis global 2008–09 (Uribe II), caída del precio del petróleo
              2014–16 (Santos II), COVID-19 2020–21 (Duque), herencia de la
              pandemia en indicadores de pobreza y empleo.
            </p>
            <p>
              Un gobierno que recibe una economía en expansión puede mostrar
              más &quot;mejoras&quot; simplemente por continuar una tendencia. Uno que
              enfrenta una crisis externa puede mostrar &quot;deterioros&quot; sin
              culpabilidad directa.
            </p>
            <p>
              Para contexto completo (valores absolutos, contexto histórico,
              fuentes y metodología), haz clic en cualquier celda o visita la
              sección de Indicadores.
            </p>
          </div>
        </div>

        {/* ── Data note ─────────────────────────────────────────────────── */}
        <p className="text-xs text-slate-700 pb-4">
          Un indicador por categoría · Umbral de cambio: ±4% relativo ·
          Fuentes: DANE, Banco de la República, MHCP, Indepaz, UNODC, Medicina
          Legal, IDEAM, Confecámaras, Transparencia Internacional, MEN ·
          Datos verificados contra fuentes primarias oficiales.
        </p>
      </div>
    </div>
  );
}
