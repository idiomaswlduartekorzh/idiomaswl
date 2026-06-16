'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { getObservations, GOVERNMENTS } from '@/data/index';
import { COMPANIES_PERCAPITA_INTERNATIONAL } from '@/data/observations/companies';
import { computeGovStats, getChangeColor } from '@/lib/utils';
import LineChart from '@/components/charts/LineChart';
import WarningBox from '@/components/WarningBox';
import MethodologyBadge from '@/components/MethodologyBadge';
import { ArrowLeft, Building2 } from 'lucide-react';

const COLOR = '#f97316';

export default function EmpresasPage() {
  const DUQ = GOVERNMENTS.find((g) => g.id === 'duque')!;
  const PET = GOVERNMENTS.find((g) => g.id === 'petro')!;

  const created = getObservations('empresas-constituidas');
  const cancelled = getObservations('empresas-canceladas');
  const perCapita = getObservations('empresas-percapita');
  const survival = getObservations('tasa-supervivencia-empresarial');

  const govBands = [
    { startYear: DUQ.startYear, endYear: DUQ.endYear, label: 'Duque', color: DUQ.color },
    { startYear: PET.startYear, endYear: PET.endYear, label: 'Petro', color: PET.color },
  ];

  // Merge created and cancelled into single series
  const allYears = Array.from(
    new Set([...created, ...cancelled].map((o) => o.year))
  ).sort((a, b) => a - b);

  const flowData = allYears.map((year) => ({
    year,
    constituidas: created.find((o) => o.year === year)?.value,
    canceladas: cancelled.find((o) => o.year === year)?.value,
  }));

  const perCapitaData = perCapita.map((o) => ({ year: o.year, value: o.value }));
  const survivalData = survival.map((o) => ({ year: o.year, value: o.value }));

  const statsDuqCreated = computeGovStats(created, DUQ);
  const statsPetCreated = computeGovStats(created, PET);
  const statsDuqPerCapita = computeGovStats(perCapita, DUQ);
  const statsPetPerCapita = computeGovStats(perCapita, PET);
  const statsDuqSurvival = computeGovStats(survival, DUQ);
  const statsPetSurvival = computeGovStats(survival, PET);

  // Net creation per period
  const duqCreated = created.filter((o) => o.year >= DUQ.startYear && o.year <= DUQ.endYear).reduce((s, o) => s + o.value, 0);
  const duqCancelled = cancelled.filter((o) => o.year >= DUQ.startYear && o.year <= DUQ.endYear).reduce((s, o) => s + o.value, 0);
  const petCreated = created.filter((o) => o.year >= PET.startYear && o.year <= PET.endYear).reduce((s, o) => s + o.value, 0);
  const petCancelled = cancelled.filter((o) => o.year >= PET.startYear && o.year <= PET.endYear).reduce((s, o) => s + o.value, 0);

  const formatK = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0);

  // Sort international data by value descending for table
  const intlSorted = [...COMPANIES_PERCAPITA_INTERNATIONAL].sort((a, b) => b.value - a.value);
  const maxVal = Math.max(...intlSorted.map((d) => d.value));

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
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: COLOR + '20', border: `1px solid ${COLOR}40` }}
            >
              <Building2 className="w-5 h-5" style={{ color: COLOR }} />
            </div>
            <h1 className="text-3xl font-bold text-white">Empresas y Tejido Productivo</h1>
          </div>
          <p className="text-slate-400 mb-2 max-w-3xl">
            Dinámica de creación, cancelación y supervivencia empresarial en Colombia. Fuente: Confecámaras — Registro Mercantil consolidado.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            5 indicadores · Datos 2000–2024 · Comparación con 9 países de referencia
          </p>
        </motion.div>

        {/* Advertencia metodológica top */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
          <WarningBox type="warning" title="Limitación estructural importante">
            Este módulo captura <strong>solo el sector formal registrado</strong>. Colombia tiene una tasa de informalidad de ~56%,
            lo que significa que la mayoría de la actividad económica real <em>no aparece</em> en estos datos.
            Las comparaciones entre gobiernos son válidas en tendencia, pero no miden el tejido económico total.
            Los años 2020 (COVID) y 2021 (rebote) deben interpretarse con cautela por parálisis de trámites.
          </WarningBox>
        </motion.div>

        {/* Scorecard comparativo Duque vs Petro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-10"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <h2 className="text-white font-bold text-lg mb-1">Resumen por gobierno</h2>
          <p className="text-slate-500 text-sm mb-6">
            Comparación directa de indicadores clave del tejido empresarial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Empresas constituidas */}
            <div className="glass-card rounded-xl p-4">
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">Empresas creadas/año (promedio)</p>
              <div className="flex gap-3">
                {[{ gov: DUQ, stats: statsDuqCreated }, { gov: PET, stats: statsPetCreated }].map(({ gov, stats }) => (
                  <div key={gov.id} className="flex-1 rounded-lg p-3 bg-slate-800/40" style={{ borderLeft: `2px solid ${gov.color}` }}>
                    <p className="text-xs text-slate-500 mb-1">{gov.president.split(' ').slice(0, 2).join(' ')}</p>
                    <p className="text-xl font-bold text-white">
                      {stats.mean !== null ? `${(stats.mean / 1000).toFixed(0)}k` : '—'}
                    </p>
                    {stats.change !== null && (
                      <p className={`text-xs mt-1 ${getChangeColor(stats.change, true)}`}>
                        {stats.change > 0 ? '+' : ''}{formatK(stats.change)} en el periodo
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Balance neto */}
            <div className="glass-card rounded-xl p-4">
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">Balance neto acumulado</p>
              <div className="flex gap-3">
                {[{ gov: DUQ, cr: duqCreated, ca: duqCancelled }, { gov: PET, cr: petCreated, ca: petCancelled }].map(({ gov, cr, ca }) => {
                  const net = cr - ca;
                  return (
                    <div key={gov.id} className="flex-1 rounded-lg p-3 bg-slate-800/40" style={{ borderLeft: `2px solid ${gov.color}` }}>
                      <p className="text-xs text-slate-500 mb-1">{gov.president.split(' ').slice(0, 2).join(' ')}</p>
                      <p className={`text-xl font-bold ${net >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {net >= 0 ? '+' : ''}{formatK(net)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{formatK(cr)} cread. · {formatK(ca)} cancel.</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Supervivencia */}
            <div className="glass-card rounded-xl p-4">
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">Supervivencia empresarial (5 años)</p>
              <div className="flex gap-3">
                {[{ gov: DUQ, stats: statsDuqSurvival }, { gov: PET, stats: statsPetSurvival }].map(({ gov, stats }) => (
                  <div key={gov.id} className="flex-1 rounded-lg p-3 bg-slate-800/40" style={{ borderLeft: `2px solid ${gov.color}` }}>
                    <p className="text-xs text-slate-500 mb-1">{gov.president.split(' ').slice(0, 2).join(' ')}</p>
                    <p className="text-xl font-bold text-white">
                      {stats.mean !== null ? `${stats.mean.toFixed(1)}%` : '—'}
                    </p>
                    {stats.change !== null && (
                      <p className={`text-xs mt-1 ${getChangeColor(stats.change, true)}`}>
                        {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)}pp en el periodo
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gráfico flujo: constituidas vs canceladas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-8"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <h2 className="text-white font-bold text-lg">Flujo empresarial: creación vs cancelación</h2>
              <p className="text-slate-400 text-sm">Número de empresas constituidas y canceladas por año. El área entre las líneas es el balance neto.</p>
            </div>
            <MethodologyBadge level="media" showLabel />
          </div>
          <p className="text-slate-500 text-xs mb-4">Fuente: Confecámaras — Dinámica Empresarial anual</p>

          <LineChart
            data={flowData}
            lines={[
              { key: 'constituidas', color: '#22c55e', name: 'Constituidas', strokeWidth: 2 },
              { key: 'canceladas', color: '#ef4444', name: 'Canceladas', strokeWidth: 2 },
            ]}
            referenceBands={govBands}
            yLabel="empresas/año"
            height={300}
            formatY={(v) => `${(v / 1000).toFixed(0)}k`}
            formatTooltip={(v) => `${v.toLocaleString('es-CO')}`}
            sourceLabel="Confecámaras"
          />

          <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-amber-400 text-xs">
              <strong>⚠️ 2020 (COVID):</strong> Las cancelaciones bajaron paradójicamente porque los trámites administrativos se paralizaron.
              No refleja que menos empresas cerraron. La caída en constituciones (194k) sí refleja el shock económico real.
            </p>
          </div>
        </motion.div>

        {/* Per cápita chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-8"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <h2 className="text-white font-bold text-lg">Empresas formales por 1.000 habitantes</h2>
              <p className="text-slate-400 text-sm">Densidad del tejido productivo formal normalizada por población. Calculado: stock / población DANE × 1.000.</p>
            </div>
            <MethodologyBadge level="media" showLabel />
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            {[{ gov: DUQ, stats: statsDuqPerCapita }, { gov: PET, stats: statsPetPerCapita }].map(({ gov, stats }) => (
              <div key={gov.id} className="glass-card rounded-lg p-3" style={{ borderLeft: `2px solid ${gov.color}` }}>
                <p className="text-xs text-slate-500 mb-1">{gov.president.split(' ').slice(0, 2).join(' ')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">{stats.mean?.toFixed(1) ?? '—'}</span>
                  <span className="text-slate-400 text-xs">por 1.000 hab.</span>
                </div>
                {stats.change !== null && (
                  <p className={`text-xs mt-1 font-medium ${getChangeColor(stats.change, true)}`}>
                    {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)} en el periodo
                  </p>
                )}
              </div>
            ))}
          </div>

          <LineChart
            data={perCapitaData}
            lines={[{ key: 'value', color: COLOR, name: 'Empresas / 1.000 hab.', strokeWidth: 2 }]}
            referenceBands={govBands}
            yLabel="por 1.000 hab."
            height={250}
            formatY={(v) => v.toFixed(1)}
            sourceLabel="Confecámaras + DANE"
          />
        </motion.div>

        {/* Supervivencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-8"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-white font-bold text-lg">Tasa de supervivencia empresarial a 5 años</h2>
              <p className="text-slate-400 text-sm">
                De cada 100 empresas creadas, cuántas siguen activas 5 años después. Nota: el dato de 2023 mide la cohorte de 2018.
              </p>
            </div>
            <MethodologyBadge level="media" showLabel />
          </div>

          <LineChart
            data={survivalData}
            lines={[{ key: 'value', color: '#a78bfa', name: 'Supervivencia a 5 años', strokeWidth: 2 }]}
            referenceBands={govBands}
            yLabel="%"
            height={240}
            formatY={(v) => `${v.toFixed(1)}%`}
            sourceLabel="Confecámaras"
          />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
            <div className="glass-card rounded-lg p-3">
              <p className="text-slate-500 mb-1">Colombia promedio histórico</p>
              <p className="text-white font-bold text-base">~29-31%</p>
              <p className="text-slate-500">Solo 1 de cada 3 empresas sobrevive 5 años</p>
            </div>
            <div className="glass-card rounded-lg p-3">
              <p className="text-slate-500 mb-1">OCDE promedio</p>
              <p className="text-white font-bold text-base">~45-50%</p>
              <p className="text-slate-500">Con marcos legales más robustos y menor informalidad</p>
            </div>
            <div className="glass-card rounded-lg p-3">
              <p className="text-slate-500 mb-1">Principal causa de cierre</p>
              <p className="text-white font-bold text-base">Flujo de caja</p>
              <p className="text-slate-500">Acceso al crédito + carga tributaria en PyMES pequeñas</p>
            </div>
          </div>
        </motion.div>

        {/* Comparación internacional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-8"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <h2 className="text-white font-bold text-lg mb-1">Colombia vs América Latina y el mundo</h2>
          <p className="text-slate-400 text-sm mb-2">
            Empresas formales por 1.000 habitantes. Ordenado por densidad empresarial.
          </p>
          <WarningBox type="info" title="Comparabilidad limitada">
            Las metodologías de registro empresarial varían por país. Algunos incluyen solo personas jurídicas; otros también
            autónomos y microempresarios. El factor más determinante es la <strong>tasa de formalidad</strong>, no la política
            gubernamental del momento. Usar como referencia de orden de magnitud, no para comparación exacta.
          </WarningBox>

          <div className="mt-6 space-y-3">
            {intlSorted.map((d) => {
              const isCol = d.country === 'Colombia';
              const barWidth = (d.value / maxVal) * 100;
              return (
                <div key={d.country} className={`rounded-lg p-3 ${isCol ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-slate-800/30'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <p className={`text-sm font-semibold w-32 shrink-0 ${isCol ? 'text-orange-300' : 'text-slate-200'}`}>
                      {d.country} {isCol && '🇨🇴'}
                    </p>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: isCol ? COLOR : '#64748b',
                        }}
                      />
                    </div>
                    <p className={`text-sm font-bold w-16 text-right shrink-0 ${isCol ? 'text-orange-300' : 'text-slate-300'}`}>
                      {d.value.toFixed(1)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pl-36">
                    <span>Formalidad: <span className="text-slate-400">{d.formalityRate}%</span></span>
                    <span>PIB p.c.: <span className="text-slate-400">${d.gdpPerCapita.toLocaleString()}</span></span>
                    <span className="hidden sm:inline">{d.notes}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-blue-300 text-sm font-semibold mb-2">Lectura correcta de estos datos</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Colombia (37.1/1k) está <strong>por encima de México (24.8) y Perú (31.5)</strong>, países con nivel de
              informalidad similar. Está por debajo de Chile (48.2), Uruguay (52.3) y España (62.1), que tienen economías
              significativamente más formalizadas. Comparar con la OCDE (71.4) sin ajuste de formalidad es engañoso:
              refleja diferencia estructural de décadas, no resultado de ningún gobierno en particular.
            </p>
          </div>
        </motion.div>

        {/* Factores de contexto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-8"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Factores de contexto que afectan el tejido empresarial</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                year: '2019–2022',
                factor: 'Migración venezolana',
                desc: 'Más de 1.8M de venezolanos llegaron a Colombia. Algunos crearon microempresas, pero muchos entraron al sector informal, presionando competencia con empresas formales pequeñas.',
                impact: 'neutro',
              },
              {
                year: '2020',
                factor: 'COVID-19',
                desc: 'Parálisis de trámites + cierre forzado de comercios. El dato de empresas creadas cae 37%. Las cancelaciones bajan paradójicamente por parálisis administrativa, no porque menos empresas cerraran realmente.',
                impact: 'negativo',
              },
              {
                year: '2022–2023',
                factor: 'Altas tasas Banrep (hasta 13.25%)',
                desc: 'El crédito de capital de trabajo se encareció significativamente. Impacto directo en PyMES. Correlaciona con la caída de constituciones en 2023 y el pico de cancelaciones.',
                impact: 'negativo',
              },
              {
                year: '2022–2024',
                factor: 'Reforma tributaria (Ley 2277/2022)',
                desc: 'Aumento del impuesto de renta a personas jurídicas. Efecto mixto: puede incentivar permanencia en informalidad y desincentivar inversión. El dato aún es corto para medir efectos estructurales.',
                impact: 'incierto',
              },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.impact === 'negativo' ? '#ef4444' : item.impact === 'neutro' ? '#94a3b8' : '#f59e0b' }} />
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">{item.year}</p>
                    <p className="text-white text-sm font-semibold mb-1">{item.factor}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Limitaciones metodológicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-8"
          style={{ borderTop: `2px solid ${COLOR}30` }}
        >
          <h2 className="text-white font-bold text-base mb-4">Advertencias metodológicas de este módulo</h2>
          <ul className="space-y-2">
            {[
              'Los datos reflejan el registro formal; el 56% de informalidad laboral implica que la mayoría de la actividad económica no aparece.',
              'Las cancelaciones tienen rezago respecto al cierre real: una empresa puede dejar de operar meses antes de cancelar su matrícula.',
              'El pico de 2022 (418k empresas creadas) coincide con economía en boom post-COVID + cambio de gobierno; no es atribuible a un solo factor.',
              'Los datos 2024 son estimados provisionales de Confecámaras; sujetos a revisión cuando publiquen el informe anual definitivo.',
              'La comparación entre gobiernos en "nuevas empresas" debe ajustar por el ciclo económico y las tasas de interés, no solo imputar al presidente.',
            ].map((lim, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400">
                <span className="text-amber-400 shrink-0 mt-0.5">⚠</span>
                {lim}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex justify-end">
          <Link
            href="/comparador?indicator=empresas-percapita"
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            Comparar empresas per cápita en el comparador →
          </Link>
        </div>
      </div>
    </div>
  );
}
