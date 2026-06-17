'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { GOVERNMENTS } from '@/data/governments';
import { INDICATORS, CATEGORY_LABELS, CATEGORY_ICONS } from '@/data/indicators';
import { getObservations, CONTEXT_EVENTS } from '@/data/index';
import { computeGovStats, getChangeColor, CATEGORY_COLORS, getChartFormatters } from '@/lib/utils';
import LineChart from '@/components/charts/LineChart';
import IndicatorCard from '@/components/IndicatorCard';
import MethodologyBadge from '@/components/MethodologyBadge';
import WarningBox from '@/components/WarningBox';
import { ChevronDown, Info, ExternalLink, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';

const INDICATOR_OPTIONS = INDICATORS.map((i) => ({
  value: i.id,
  label: i.shortName,
  category: i.category,
}));

type GovernmentId = string;

function GovernmentSelector({
  label,
  value,
  onChange,
  excludeId,
  color,
}: {
  label: string;
  value: GovernmentId;
  onChange: (id: GovernmentId) => void;
  excludeId?: GovernmentId;
  color: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = GOVERNMENTS.find((g) => g.id === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{label}</p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-4 glass-card rounded-xl hover:border-slate-600 transition-all"
        style={{ borderLeft: `3px solid ${color}` }}
      >
        <div className="text-left">
          <p className="text-white font-semibold text-sm">{selected?.president}</p>
          <p className="text-slate-500 text-xs">{selected?.startYear}–{selected?.endYear} · {selected?.party}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full z-[200] glass rounded-xl overflow-hidden shadow-2xl border border-slate-700"
          >
            {GOVERNMENTS.filter((g) => g.id !== excludeId).map((gov) => (
              <button
                key={gov.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(gov.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-slate-700/60 transition-colors text-left ${gov.id === value ? 'bg-slate-800/50' : ''}`}
              >
                <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: gov.color }} />
                <div>
                  <p className="text-white text-sm font-medium">{gov.president}</p>
                  <p className="text-slate-500 text-xs">{gov.startYear}–{gov.endYear}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  gov,
  stats,
  indicator,
  formatVal,
}: {
  gov: (typeof GOVERNMENTS)[number];
  stats: ReturnType<typeof computeGovStats>;
  indicator: (typeof INDICATORS)[number];
  formatVal: (v: number) => string;
}) {
  const isUp = (stats.change ?? 0) > 0;
  const changeColor = stats.change !== null ? getChangeColor(stats.change, indicator.higherIsBetter) : 'text-slate-400';
  const improved =
    stats.change !== null &&
    (indicator.higherIsBetter ? stats.change > 0 : stats.change < 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
      <div className="glass-card rounded-xl p-5 h-full flex flex-col" style={{ borderTop: `3px solid ${gov.color}` }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-white font-bold text-sm leading-tight">{gov.president}</p>
            <p className="text-slate-500 text-xs mt-0.5">{gov.startYear}–{gov.endYear}</p>
          </div>
          {stats.changePercent !== null && (
            <span
              className={`text-sm font-bold px-2.5 py-1 rounded-lg ${
                Math.abs(stats.change ?? 0) < 0.01
                  ? 'bg-slate-700/50 text-slate-400'
                  : improved
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-red-500/15 text-red-400'
              }`}
            >
              {isUp ? '↑' : '↓'} {Math.abs(stats.changePercent).toFixed(1)}%
            </span>
          )}
        </div>

        {/* Trajectory: inicio → final */}
        {stats.start !== null && stats.end !== null ? (
          <div className="flex items-center gap-3 mb-5">
            <div className="text-center min-w-0">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Inicio</p>
              <p className="text-2xl font-bold text-white tabular-nums leading-none">{formatVal(stats.start)}</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
              <div className="w-full flex items-center gap-0.5">
                <div className="flex-1 h-px rounded-full" style={{ backgroundColor: gov.color + '50' }} />
                <span className={`text-sm leading-none ${changeColor}`}>{isUp ? '▲' : '▼'}</span>
                <div className="flex-1 h-px rounded-full" style={{ backgroundColor: gov.color + '50' }} />
              </div>
              {stats.change !== null && (
                <p className={`text-[11px] font-semibold ${changeColor} text-center leading-tight`}>
                  {stats.change > 0 ? '+' : ''}{formatVal(stats.change)}
                  <span className="text-slate-500 font-normal ml-1">{indicator.unit}</span>
                </p>
              )}
            </div>
            <div className="text-center min-w-0">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Final</p>
              <p className="text-2xl font-bold text-white tabular-nums leading-none">{formatVal(stats.end)}</p>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm mb-5">Sin datos en este periodo</p>
        )}

        {/* Supporting stats */}
        {stats.mean !== null && (
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700/50 mt-auto">
            {(
              [
                { key: 'Promedio', val: stats.mean },
                { key: 'Mínimo', val: stats.min },
                { key: 'Máximo', val: stats.max },
              ] as { key: string; val: number | null }[]
            ).map(({ key, val }) => (
              <div key={key} className="text-center">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">{key}</p>
                <p className="text-white text-sm font-semibold tabular-nums">
                  {val !== null ? formatVal(val) : '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function IndicatorSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selected = INDICATORS.find((i) => i.id === value);
  const categories = [...new Set(INDICATORS.map((i) => i.category))];
  const filtered = filter ? INDICATORS.filter((i) => i.category === filter) : INDICATORS;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Indicador</p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-4 glass-card rounded-xl hover:border-slate-600 transition-all"
        style={{ borderLeft: `3px solid ${selected ? CATEGORY_COLORS[selected.category] : '#3b82f6'}` }}
      >
        <div className="text-left">
          <p className="text-white font-semibold text-sm">{selected?.name}</p>
          <p className="text-slate-500 text-xs">{selected ? CATEGORY_LABELS[selected.category] : ''} · {selected?.unit}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full z-[200] glass rounded-xl shadow-2xl border border-slate-700 max-h-96 overflow-y-auto"
          >
            {/* Category filter */}
            <div className="p-3 border-b border-slate-700/50 flex flex-wrap gap-2 sticky top-0 glass">
              <button
                onMouseDown={(e) => { e.preventDefault(); setFilter(null); }}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${!filter ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onMouseDown={(e) => { e.preventDefault(); setFilter(cat); }}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${filter === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {filtered.map((ind) => (
              <button
                key={ind.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(ind.id);
                  setOpen(false);
                  setFilter(null);
                }}
                className={`w-full flex items-start gap-3 p-3 hover:bg-slate-700/60 transition-colors text-left ${ind.id === value ? 'bg-slate-800/50' : ''}`}
              >
                <div
                  className="w-1 h-8 rounded-full mt-0.5 shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[ind.category] }}
                />
                <div>
                  <p className="text-white text-sm font-medium">{ind.name}</p>
                  <p className="text-slate-500 text-xs">{ind.unit} · {CATEGORY_LABELS[ind.category]}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComparadorPage() {
  const [govA, setGovA] = useState('duque');
  const [govB, setGovB] = useState('petro');
  const [indicatorId, setIndicatorId] = useState('pib-crecimiento');
  const [showContext, setShowContext] = useState(false);
  const [showMacro, setShowMacro] = useState(false);

  const govDataA = GOVERNMENTS.find((g) => g.id === govA)!;
  const govDataB = GOVERNMENTS.find((g) => g.id === govB)!;
  const indicator = INDICATORS.find((i) => i.id === indicatorId)!;

  const allObs = useMemo(() => getObservations(indicatorId), [indicatorId]);

  const statsA = useMemo(() => computeGovStats(allObs, govDataA), [allObs, govDataA]);
  const statsB = useMemo(() => computeGovStats(allObs, govDataB), [allObs, govDataB]);

  const chartFormatters = useMemo(
    () => getChartFormatters(allObs.filter((o) => !o.department), indicator.unit),
    [allObs, indicator.unit]
  );

  const chartData = useMemo(() => {
    const years = [...new Set(allObs.filter((o) => !o.department).map((o) => o.year))].sort();
    return years.map((year) => {
      const obs = allObs.find((o) => o.year === year && !o.department);
      return {
        year,
        value: obs?.value,
        label: year.toString(),
      };
    });
  }, [allObs]);

  const relevantEvents = useMemo(
    () =>
      CONTEXT_EVENTS.filter(
        (e) =>
          e.affectedIndicators.includes(indicatorId) &&
          e.year >= Math.min(govDataA.startYear, govDataB.startYear) - 2 &&
          e.year <= Math.max(govDataA.endYear, govDataB.endYear)
      ),
    [indicatorId, govDataA, govDataB]
  );

  const minYear = Math.max(1994, Math.min(govDataA.startYear, govDataB.startYear) - 4);
  const maxYear = Math.max(govDataA.endYear, govDataB.endYear) + 1;

  const filteredChartData = chartData.filter((d) => d.year >= minYear && d.year <= maxYear);

  const referenceBands = GOVERNMENTS.map((gov) => {
    const isSelected = gov.id === govA || gov.id === govB;
    return {
      startYear: gov.startYear,
      endYear:   gov.endYear,
      label:     gov.president.split(' ')[0],
      color:     gov.color,
      fillOpacity:  isSelected ? 0.18 : 0.04,
      labelOpacity: isSelected ? 0.9  : 0.35,
    };
  });

  // Macro context data — must be after minYear/maxYear are defined
  const oilData = useMemo(() => getObservations('precio-petroleo').filter(o => o.year >= minYear && o.year <= maxYear).map(o => ({ year: o.year, value: o.value })), [minYear, maxYear]);
  const fxData = useMemo(() => getObservations('tasa-cambio').filter(o => o.year >= minYear && o.year <= maxYear).map(o => ({ year: o.year, value: o.value })), [minYear, maxYear]);
  const rateData = useMemo(() => getObservations('tasa-banrep').filter(o => o.year >= minYear && o.year <= maxYear).map(o => ({ year: o.year, value: o.value })), [minYear, maxYear]);

  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Comparador de Gobiernos</h1>
          <p className="text-slate-400">Selecciona dos presidentes y un indicador para comparar su desempeño con datos verificables.</p>
        </div>

        {/* Selector panel */}
        <div className="glass rounded-2xl p-6 mb-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GovernmentSelector
              label="Gobierno A"
              value={govA}
              onChange={setGovA}
              excludeId={govB}
              color={govDataA.color}
            />
            <GovernmentSelector
              label="Gobierno B"
              value={govB}
              onChange={setGovB}
              excludeId={govA}
              color={govDataB.color}
            />
            <IndicatorSelector value={indicatorId} onChange={setIndicatorId} />
          </div>
        </div>

        {/* Indicator info */}
        <div className="glass-card rounded-xl p-4 mb-6 flex flex-wrap items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h2 className="text-white font-semibold">{indicator.name}</h2>
              <MethodologyBadge level={indicator.comparabilityLevel} showLabel />
            </div>
            <p className="text-slate-400 text-sm">{indicator.definition}</p>
          </div>
          <button
            onClick={() => setShowContext(!showContext)}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors shrink-0"
          >
            <Info className="w-4 h-4" />
            {showContext ? 'Ocultar ficha' : 'Ver ficha técnica'}
          </button>
        </div>

        <AnimatePresence>
          {showContext && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Ficha técnica del indicador</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Unidad</p>
                    <p className="text-slate-300">{indicator.unit}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Frecuencia</p>
                    <p className="text-slate-300">{indicator.frequency}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Fuentes</p>
                    <p className="text-slate-300">{indicator.sourceIds.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Comparabilidad histórica</p>
                    <MethodologyBadge level={indicator.comparabilityLevel} showLabel />
                  </div>
                  {indicator.methodologyNotes && (
                    <div className="md:col-span-2">
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Notas metodológicas</p>
                      <p className="text-slate-300">{indicator.methodologyNotes}</p>
                    </div>
                  )}
                </div>
                {indicator.limitations.length > 0 && (
                  <div className="mt-4">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Limitaciones</p>
                    <ul className="space-y-1">
                      {indicator.limitations.map((lim, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-400">
                          <span className="text-amber-400 shrink-0">⚠</span>
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stat cards comparativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatCard
            key={`${govA}-${indicatorId}`}
            gov={govDataA}
            stats={statsA}
            indicator={indicator}
            formatVal={chartFormatters.formatY}
          />
          <StatCard
            key={`${govB}-${indicatorId}`}
            gov={govDataB}
            stats={statsB}
            indicator={indicator}
            formatVal={chartFormatters.formatY}
          />
        </div>

        {/* Chart */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Serie histórica: {indicator.shortName}</h3>
          </div>

          {/* Government timeline strip */}
          <div className="mb-4">
            <div className="flex items-stretch gap-0.5 rounded-lg overflow-hidden h-8 relative">
              {GOVERNMENTS.filter(g => g.endYear >= minYear && g.startYear <= maxYear).map((gov) => {
                const visStart = Math.max(gov.startYear, minYear);
                const visEnd = Math.min(gov.endYear, maxYear);
                const totalSpan = maxYear - minYear;
                const widthPct = ((visEnd - visStart) / totalSpan) * 100;
                const leftPct = ((visStart - minYear) / totalSpan) * 100;
                const isSelected = gov.id === govA || gov.id === govB;
                return (
                  <div
                    key={gov.id}
                    className="absolute top-0 bottom-0 flex items-center justify-center overflow-hidden"
                    style={{
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      backgroundColor: gov.color + (isSelected ? '33' : '14'),
                      borderLeft: isSelected ? `2px solid ${gov.color}` : `1px solid ${gov.color}40`,
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold truncate px-1 select-none"
                      style={{ color: gov.color, opacity: isSelected ? 1 : 0.5 }}
                    >
                      {gov.president.split(' ')[0]} {gov.startYear}–{gov.endYear}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <LineChart
            data={filteredChartData.map((d) => ({ year: d.year, value: d.value ?? 0 }))}
            lines={[{ key: 'value', color: '#60a5fa', name: indicator.shortName, strokeWidth: 2 }]}
            referenceBands={referenceBands}
            xDomain={[minYear, maxYear]}
            yLabel={indicator.unit}
            height={300}
            formatY={chartFormatters.formatY}
            formatTooltip={chartFormatters.formatTooltip}
            sourceLabel={`Fuente: ${indicator.sourceIds.join(', ')}`}
          />
        </div>

        {/* Contexto macroeconómico */}
        <div className="glass-card rounded-2xl mb-6 overflow-hidden">
          <button
            onClick={() => setShowMacro(!showMacro)}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Contexto macroeconómico externo</p>
                <p className="text-slate-500 text-xs">Precio petróleo · Tasa de cambio · Tasa Banrep — variables fuera del control del gobierno</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showMacro ? 'rotate-90' : ''}`} />
          </button>

          <AnimatePresence>
            {showMacro && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-slate-700/50">
                  <p className="text-slate-500 text-xs mt-4 mb-4 leading-relaxed">
                    Estas variables son <strong className="text-slate-400">exógenas</strong>: ningún gobierno colombiano las controla.
                    Sin embargo, explican una parte significativa de los resultados económicos. El precio del petróleo
                    determina ingresos fiscales; la tasa Banrep el costo del crédito; la tasa de cambio la inflación importada.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">Precio Brent (USD/barril)</p>
                      {oilData.length > 0 ? (
                        <LineChart
                          data={oilData}
                          lines={[{ key: 'value', color: '#f59e0b', name: 'Brent', strokeWidth: 2 }]}
                          referenceBands={referenceBands}
                          xDomain={[minYear, maxYear]}
                          height={180}
                          formatY={(v) => `$${v.toFixed(0)}`}
                          sourceLabel="Banrep/EIA"
                        />
                      ) : <p className="text-slate-600 text-xs">Sin datos en este rango</p>}
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">Tasa de cambio (COP/USD)</p>
                      {fxData.length > 0 ? (
                        <LineChart
                          data={fxData}
                          lines={[{ key: 'value', color: '#a78bfa', name: 'TRM', strokeWidth: 2 }]}
                          referenceBands={referenceBands}
                          xDomain={[minYear, maxYear]}
                          height={180}
                          formatY={(v) => `${(v / 1000).toFixed(1)}k`}
                          sourceLabel="Banrep"
                        />
                      ) : <p className="text-slate-600 text-xs">Sin datos en este rango</p>}
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">Tasa Banrep (% anual)</p>
                      {rateData.length > 0 ? (
                        <LineChart
                          data={rateData}
                          lines={[{ key: 'value', color: '#34d399', name: 'Repo', strokeWidth: 2 }]}
                          referenceBands={referenceBands}
                          xDomain={[minYear, maxYear]}
                          height={180}
                          formatY={(v) => `${v.toFixed(1)}%`}
                          sourceLabel="Banrep"
                        />
                      ) : <p className="text-slate-600 text-xs">Sin datos en este rango</p>}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Duque heredó (2018)', oil: '$72/barril', fx: '2.956 COP', rate: '4.25%', color: GOVERNMENTS.find(g=>g.id==='duque')?.color },
                      { label: 'Petro heredó (2022)', oil: '$108/barril', fx: '4.260 COP', rate: '9.0%', color: GOVERNMENTS.find(g=>g.id==='petro')?.color },
                      { label: 'Pico Banrep (2023)', oil: '$82/barril', fx: '4.325 COP', rate: '13.25%', color: '#ef4444' },
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-800/30 rounded-lg p-3 border-l-2" style={{ borderColor: item.color }}>
                        <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          <div><p className="text-slate-600">Brent</p><p className="text-slate-300">{item.oil}</p></div>
                          <div><p className="text-slate-600">TRM</p><p className="text-slate-300">{item.fx}</p></div>
                          <div><p className="text-slate-600">Banrep</p><p className="text-slate-300">{item.rate}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contexto heredado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[{ gov: govDataA }, { gov: govDataB }].map(({ gov }) => (
            gov.inheritedContext && (
              <div key={gov.id} className="glass-card rounded-xl p-5">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">
                  Contexto heredado · {gov.president}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">{gov.inheritedContext.notes}</p>
                <div className="mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-slate-500 text-xs">Desempleo heredado</p>
                    <p className="text-white text-sm font-semibold">{gov.inheritedContext.unemploymentRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Inflación heredada</p>
                    <p className="text-white text-sm font-semibold">{gov.inheritedContext.inflationRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Deuda/PIB heredada</p>
                    <p className="text-white text-sm font-semibold">{gov.inheritedContext.debtGdpRatio}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Crecimiento año anterior</p>
                    <p className="text-white text-sm font-semibold">{gov.inheritedContext.gdpGrowthPrev}%</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Eventos de contexto */}
        {relevantEvents.length > 0 && (
          <div className="glass-card rounded-xl p-5 mb-6">
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Eventos que afectan este indicador en el periodo
            </h3>
            <div className="space-y-3">
              {relevantEvents.map((evt, i) => (
                <div key={i} className="flex gap-3">
                  <div className="text-center shrink-0">
                    <span className="text-slate-400 text-xs font-mono">{evt.year}</span>
                  </div>
                  <div>
                    <p className="text-slate-200 text-sm font-medium">{evt.name}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <WarningBox type="info" title="Nota de atribución">
          <p>
            Los cambios en un indicador durante un gobierno no siempre son atribuibles directamente al
            gobierno. Factores como choques externos (petróleo, pandemia, guerra), herencia de política
            del gobierno anterior, ciclos económicos globales y rezagos de implementación afectan
            los resultados. Esta plataforma muestra datos, tendencias y contexto para que el usuario
            construya su propia interpretación informada.
          </p>
        </WarningBox>

      </div>
    </div>
  );
}
