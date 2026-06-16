'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { GOVERNMENTS } from '@/data/governments';
import { INDICATORS, CATEGORY_LABELS, CATEGORY_ICONS } from '@/data/indicators';
import { getObservations, CONTEXT_EVENTS } from '@/data/index';
import { computeGovStats, getChangeColor, CATEGORY_COLORS } from '@/lib/utils';
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
  const selected = GOVERNMENTS.find((g) => g.id === value);

  return (
    <div className="relative">
      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{label}</p>
      <button
        onClick={() => setOpen(!open)}
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full mt-2 w-full z-50 glass rounded-xl overflow-hidden shadow-2xl border border-slate-700"
          >
            {GOVERNMENTS.filter((g) => g.id !== excludeId).map((gov) => (
              <button
                key={gov.id}
                onClick={() => { onChange(gov.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-slate-800/50 transition-colors text-left ${gov.id === value ? 'bg-slate-800/30' : ''}`}
              >
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: gov.color }} />
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

function IndicatorSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const selected = INDICATORS.find((i) => i.id === value);
  const categories = [...new Set(INDICATORS.map((i) => i.category))];

  const filtered = filter
    ? INDICATORS.filter((i) => i.category === filter)
    : INDICATORS;

  return (
    <div className="relative">
      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Indicador</p>
      <button
        onClick={() => setOpen(!open)}
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full mt-2 w-full z-50 glass rounded-xl overflow-hidden shadow-2xl border border-slate-700 max-h-96 overflow-y-auto"
          >
            {/* Category filter */}
            <div className="p-3 border-b border-slate-700/50 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter(null)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${!filter ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${filter === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {filtered.map((ind) => (
              <button
                key={ind.id}
                onClick={() => { onChange(ind.id); setOpen(false); setFilter(null); }}
                className={`w-full flex items-start gap-3 p-3 hover:bg-slate-800/50 transition-colors text-left ${ind.id === value ? 'bg-slate-800/30' : ''}`}
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

  const referenceBands = [
    { startYear: govDataA.startYear, endYear: govDataA.endYear, label: govDataA.president.split(' ')[0], color: govDataA.color },
    { startYear: govDataB.startYear, endYear: govDataB.endYear, label: govDataB.president.split(' ')[0], color: govDataB.color },
  ];

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
        <div className="glass rounded-2xl p-6 mb-8">
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
          <motion.div key={`${govA}-${indicatorId}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass-card rounded-xl p-5" style={{ borderTop: `3px solid ${govDataA.color}` }}>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">{govDataA.president}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-white">
                  {statsA.start !== null ? statsA.start.toFixed(1) : '—'}
                </span>
                <span className="text-slate-400 text-sm">{indicator.unit}</span>
                <span className="text-slate-500 text-xs">al inicio</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Al final del periodo', value: statsA.end },
                  { label: 'Promedio del periodo', value: statsA.mean },
                  { label: 'Mínimo alcanzado', value: statsA.min },
                  { label: 'Máximo registrado', value: statsA.max },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs">{label}</span>
                    <span className="text-slate-300 text-sm font-medium">
                      {value !== null ? value.toFixed(1) : '—'} <span className="text-slate-500 text-xs">{indicator.unit}</span>
                    </span>
                  </div>
                ))}
                {statsA.change !== null && (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                    <span className="text-slate-500 text-xs">Cambio total</span>
                    <span className={`text-sm font-bold ${getChangeColor(statsA.change, indicator.higherIsBetter)}`}>
                      {statsA.change > 0 ? '+' : ''}{statsA.change.toFixed(1)} ({statsA.changePercent !== null ? (statsA.changePercent > 0 ? '+' : '') + statsA.changePercent.toFixed(1) + '%' : '—'})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div key={`${govB}-${indicatorId}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass-card rounded-xl p-5" style={{ borderTop: `3px solid ${govDataB.color}` }}>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">{govDataB.president}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-white">
                  {statsB.start !== null ? statsB.start.toFixed(1) : '—'}
                </span>
                <span className="text-slate-400 text-sm">{indicator.unit}</span>
                <span className="text-slate-500 text-xs">al inicio</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Al final del periodo', value: statsB.end },
                  { label: 'Promedio del periodo', value: statsB.mean },
                  { label: 'Mínimo alcanzado', value: statsB.min },
                  { label: 'Máximo registrado', value: statsB.max },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs">{label}</span>
                    <span className="text-slate-300 text-sm font-medium">
                      {value !== null ? value.toFixed(1) : '—'} <span className="text-slate-500 text-xs">{indicator.unit}</span>
                    </span>
                  </div>
                ))}
                {statsB.change !== null && (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                    <span className="text-slate-500 text-xs">Cambio total</span>
                    <span className={`text-sm font-bold ${getChangeColor(statsB.change, indicator.higherIsBetter)}`}>
                      {statsB.change > 0 ? '+' : ''}{statsB.change.toFixed(1)} ({statsB.changePercent !== null ? (statsB.changePercent > 0 ? '+' : '') + statsB.changePercent.toFixed(1) + '%' : '—'})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold">Serie histórica: {indicator.shortName}</h3>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 inline-block" style={{ backgroundColor: govDataA.color }} />
                {govDataA.president.split(' ')[0]}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 inline-block" style={{ backgroundColor: govDataB.color }} />
                {govDataB.president.split(' ')[0]}
              </span>
            </div>
          </div>
          <LineChart
            data={filteredChartData.map((d) => ({ year: d.year, value: d.value ?? 0 }))}
            lines={[{ key: 'value', color: '#60a5fa', name: indicator.shortName, strokeWidth: 2 }]}
            referenceBands={referenceBands}
            yLabel={indicator.unit}
            height={320}
            formatY={(v) => v.toFixed(1)}
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
