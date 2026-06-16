'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { INDICATORS, CATEGORY_LABELS, CATEGORY_ICONS } from '@/data/indicators';
import { getObservations, GOVERNMENTS } from '@/data/index';
import { CATEGORY_COLORS, computeGovStats, getChangeColor } from '@/lib/utils';
import LineChart from '@/components/charts/LineChart';
import MethodologyBadge from '@/components/MethodologyBadge';
import { ArrowLeft } from 'lucide-react';

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = use(params);
  const indicators = INDICATORS.filter((i) => i.category === categoria);
  const color = CATEGORY_COLORS[categoria] || '#3b82f6';

  if (indicators.length === 0) {
    return (
      <div className="min-h-screen bg-[#080d1a]">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 pt-32 text-center">
          <p className="text-slate-400">Categoría no encontrada.</p>
          <Link href="/indicadores" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Volver a indicadores
          </Link>
        </div>
      </div>
    );
  }

  const DUQ = GOVERNMENTS.find((g) => g.id === 'duque')!;
  const PET = GOVERNMENTS.find((g) => g.id === 'petro')!;

  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <Link
          href="/indicadores"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Todos los indicadores
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{CATEGORY_ICONS[categoria]}</span>
            <h1 className="text-3xl font-bold text-white">{CATEGORY_LABELS[categoria]}</h1>
          </div>
          <p className="text-slate-400 mb-10">
            {indicators.length} indicadores disponibles. Datos históricos desde fuentes oficiales.
          </p>
        </motion.div>

        <div className="space-y-10">
          {indicators.map((ind, i) => {
            const obs = getObservations(ind.id);
            const obsNational = obs.filter((o) => !o.department);

            const chartData = obsNational.map((o) => ({ year: o.year, value: o.value }));
            const statsDuq = computeGovStats(obsNational, DUQ);
            const statsPet = computeGovStats(obsNational, PET);

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6"
                style={{ borderTop: `2px solid ${color}30` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-white font-bold text-lg mb-1">{ind.name}</h2>
                    <p className="text-slate-400 text-sm">{ind.definition}</p>
                  </div>
                  <MethodologyBadge level={ind.comparabilityLevel} showLabel />
                </div>

                {/* Mini comparación Duque vs Petro */}
                {(statsDuq.start !== null || statsPet.start !== null) && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[{ gov: DUQ, stats: statsDuq }, { gov: PET, stats: statsPet }].map(({ gov, stats }) => (
                      <div
                        key={gov.id}
                        className="glass-card rounded-lg p-3"
                        style={{ borderLeft: `2px solid ${gov.color}` }}
                      >
                        <p className="text-xs text-slate-500 mb-1">{gov.president.split(' ').slice(0, 2).join(' ')}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-white">
                            {stats.mean !== null ? stats.mean.toFixed(1) : '—'}
                          </span>
                          <span className="text-slate-400 text-xs">{ind.unit}</span>
                        </div>
                        {stats.change !== null && (
                          <p className={`text-xs mt-1 font-medium ${getChangeColor(stats.change, ind.higherIsBetter)}`}>
                            {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)} en el periodo
                          </p>
                        )}
                        {stats.mean === null && <p className="text-xs text-slate-500 mt-1">Sin datos</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Chart */}
                {chartData.length > 0 && (
                  <LineChart
                    data={chartData}
                    lines={[{ key: 'value', color: color, name: ind.shortName, strokeWidth: 2 }]}
                    referenceBands={[
                      { startYear: DUQ.startYear, endYear: DUQ.endYear, label: 'Duque', color: DUQ.color },
                      { startYear: PET.startYear, endYear: PET.endYear, label: 'Petro', color: PET.color },
                    ]}
                    yLabel={ind.unit}
                    height={250}
                    formatY={(v) => v.toFixed(1)}
                    sourceLabel={`Fuente: ${ind.sourceIds.join(', ')}`}
                  />
                )}

                {/* Limitaciones */}
                {ind.limitations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Advertencias metodológicas</p>
                    <ul className="space-y-1">
                      {ind.limitations.map((lim, j) => (
                        <li key={j} className="flex gap-2 text-xs text-slate-500">
                          <span className="text-amber-400 shrink-0">⚠</span>
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <Link
                    href={`/comparador?indicator=${ind.id}`}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Comparar en detalle →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
