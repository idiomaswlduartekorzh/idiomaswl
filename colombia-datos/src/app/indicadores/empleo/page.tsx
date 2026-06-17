'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { GOVERNMENTS } from '@/data/governments';
import { UNEMPLOYMENT, INFORMALITY, OCCUPATION_BREAKDOWN } from '@/data/observations/employment';
import { computeGovStats, getChangeColor } from '@/lib/utils';
import LineChart from '@/components/charts/LineChart';
import WarningBox from '@/components/WarningBox';
import MethodologyBadge from '@/components/MethodologyBadge';
import { ArrowLeft, Briefcase, Users } from 'lucide-react';

const COLOR = '#8b5cf6';

const DUQ = GOVERNMENTS.find((g) => g.id === 'duque')!;
const PET = GOVERNMENTS.find((g) => g.id === 'petro')!;

const govBands = [
  { startYear: DUQ.startYear, endYear: DUQ.endYear, label: 'Duque', color: DUQ.color },
  { startYear: PET.startYear, endYear: PET.endYear, label: 'Petro', color: PET.color },
];

const OCCUPATION_SEGMENTS = [
  { key: 'particular' as const, label: 'Empleado privado', color: '#3b82f6', desc: 'Asalariado de empresa o persona particular' },
  { key: 'cuentaPropia' as const, label: 'Cuenta propia', color: '#f59e0b', desc: 'Independiente sin empleados a cargo' },
  { key: 'jornalero' as const, label: 'Jornalero / ocasional', color: '#ef4444', desc: 'Trabajo diario o por contrato sin continuidad' },
  { key: 'gobierno' as const, label: 'Empleado público', color: '#10b981', desc: 'Asalariado del sector gobierno' },
  { key: 'patron' as const, label: 'Empleador / patrón', color: '#6366f1', desc: 'Tiene empleados a cargo en su negocio' },
  { key: 'domestico' as const, label: 'Empleado doméstico', color: '#ec4899', desc: 'Trabajo remunerado del hogar' },
  { key: 'sinRemuneracion' as const, label: 'Sin remuneración', color: '#64748b', desc: 'Ayuda familiar no pagada' },
];

export default function EmpleoPage() {
  const unemployData = UNEMPLOYMENT.filter((o) => o.year >= 2007).map((o) => ({ year: o.year, value: o.value }));
  const informalData = INFORMALITY.map((o) => ({ year: o.year, value: o.value }));

  const statsDuqUnemp = computeGovStats(UNEMPLOYMENT, DUQ);
  const statsPetUnemp = computeGovStats(UNEMPLOYMENT, PET);
  const statsDuqInformal = computeGovStats(INFORMALITY, DUQ);
  const statsPetInformal = computeGovStats(INFORMALITY, PET);

  const latest = OCCUPATION_BREAKDOWN[OCCUPATION_BREAKDOWN.length - 1];
  const firstRecord = OCCUPATION_BREAKDOWN[0];

  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <Link href="/indicadores" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Todos los indicadores
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLOR + '20', border: `1px solid ${COLOR}40` }}>
              <Briefcase className="w-5 h-5" style={{ color: COLOR }} />
            </div>
            <h1 className="text-3xl font-bold text-white">Mercado Laboral</h1>
          </div>
          <p className="text-slate-400 mb-2 max-w-3xl">
            Desempleo, informalidad y composición del empleo por tipo de ocupación. Fuente: DANE — Gran Encuesta Integrada de Hogares (GEIH).
          </p>
          <p className="text-slate-500 text-sm mb-10">3 indicadores · Datos 2007–2024 · Desglose por posición ocupacional</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 mb-10" style={{ borderTop: `2px solid ${COLOR}30` }}>
          <h2 className="text-white font-bold text-lg mb-1">Resumen por gobierno (Duque vs Petro)</h2>
          <p className="text-slate-500 text-sm mb-6">Los datos de desempleo son anuales. Nota: el año 2020 fue atípico por COVID-19.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { gov: DUQ, unemp: statsDuqUnemp, informal: statsDuqInformal },
              { gov: PET, unemp: statsPetUnemp, informal: statsPetInformal },
            ].map(({ gov, unemp, informal }) => (
              <div key={gov.id} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${gov.color}` }}>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">{gov.president}</p>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-500 text-xs">Desempleo al inicio</span><span className="text-white text-sm font-bold">{unemp.start?.toFixed(1) ?? '—'}%</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 text-xs">Desempleo al final</span><span className="text-white text-sm font-bold">{unemp.end?.toFixed(1) ?? '—'}%</span></div>
                  <div className="flex justify-between border-t border-slate-700/50 pt-2">
                    <span className="text-slate-500 text-xs">Cambio en desempleo</span>
                    <span className={`text-sm font-bold ${getChangeColor(unemp.change ?? 0, false)}`}>
                      {unemp.change !== null ? `${unemp.change > 0 ? '+' : ''}${unemp.change.toFixed(1)}pp` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="text-slate-500 text-xs">Informalidad promedio</span><span className="text-slate-300 text-sm">{informal.mean?.toFixed(1) ?? '—'}%</span></div>
                </div>
              </div>
            ))}
          </div>
          <WarningBox type="warning" title="2020: distorsión COVID">
            La pandemia llevó el desempleo a 15.9% en 2020 (pico mensual: 21.4% en mayo). Este shock externo
            afecta el promedio del periodo Duque. Las comparaciones que incluyen 2020 deben interpretarse
            con cautela: no reflejan resultados de política laboral sino el impacto de la pandemia global.
          </WarningBox>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 mb-8" style={{ borderTop: `2px solid ${COLOR}30` }}>
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <h2 className="text-white font-bold text-lg">Tasa de desempleo anual</h2>
              <p className="text-slate-400 text-sm">% de la población económicamente activa (PEA) que no tiene empleo y lo busca activamente.</p>
            </div>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-500 text-xs mb-4">DANE GEIH 2007–2024 · Datos anteriores a 2007 en ENH (no comparables)</p>
          <LineChart data={unemployData} lines={[{ key: 'value', color: COLOR, name: 'Desempleo (%)', strokeWidth: 2.5 }]} referenceBands={govBands} yLabel="%" height={280} formatY={(v) => `${v.toFixed(1)}%`} formatTooltip={(v) => `${v.toFixed(1)}%`} sourceLabel="DANE GEIH" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 mb-8" style={{ borderTop: `2px solid ${COLOR}30` }}>
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <h2 className="text-white font-bold text-lg">Informalidad laboral</h2>
              <p className="text-slate-400 text-sm">% de ocupados sin contrato formal, prestaciones ni seguridad social. Medición: 13 ciudades principales.</p>
            </div>
            <MethodologyBadge level="media" showLabel />
          </div>
          <LineChart data={informalData} lines={[{ key: 'value', color: '#f97316', name: 'Informalidad (%)', strokeWidth: 2.5 }]} referenceBands={govBands} yLabel="%" height={240} formatY={(v) => `${v.toFixed(1)}%`} formatTooltip={(v) => `${v.toFixed(1)}%`} sourceLabel="DANE GEIH (13 ciudades)" />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="glass-card rounded-lg p-3"><p className="text-slate-500 mb-1">Meta Plan Nacional</p><p className="text-white font-bold text-base">30%</p><p className="text-slate-500">Nunca ha bajado de 55%.</p></div>
            <div className="glass-card rounded-lg p-3"><p className="text-slate-500 mb-1">Colombia vs AL</p><p className="text-white font-bold text-base">~56% vs 46%</p><p className="text-slate-500">Por encima del promedio OIT Latinoamérica</p></div>
            <div className="glass-card rounded-lg p-3"><p className="text-slate-500 mb-1">Principal causa</p><p className="text-white font-bold text-base">Costos no salariales</p><p className="text-slate-500">Parafiscales ~30% del salario desincentivan formalización</p></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 mb-8" style={{ borderTop: `2px solid ${COLOR}30` }}>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h2 className="text-white font-bold text-lg flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" />¿Qué tipo de trabajo tienen los ocupados?</h2>
              <p className="text-slate-400 text-sm mt-1">Desglose del total de ocupados por posición ocupacional. Fuente: DANE GEIH — Boletines técnicos anuales.</p>
            </div>
            <MethodologyBadge level="media" showLabel />
          </div>

          <WarningBox type="info" title="Cómo leer estos datos">
            "Ocupados" = personas que trabajaron al menos 1 hora en la semana de referencia.
            La tasa de desempleo (9-16%) mide los que NO están aquí. Este gráfico muestra CÓMO trabajan
            los que SÍ están ocupados. El dato más relevante: <strong>más del 40% trabaja por cuenta propia</strong> —
            la mayoría sin seguridad social completa, lo que alimenta la informalidad.
          </WarningBox>

          <div className="mt-6">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">Composición {latest.year} — Total ocupados = 100%</p>
            <div className="space-y-3">
              {OCCUPATION_SEGMENTS.map((seg) => {
                const val = latest[seg.key];
                const prev = firstRecord[seg.key];
                const delta = val - prev;
                return (
                  <div key={seg.key}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-slate-300 text-sm">{seg.label}</span>
                        <span className="text-slate-500 text-xs hidden sm:inline">— {seg.desc}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-xs ${delta > 0.3 ? 'text-emerald-400' : delta < -0.3 ? 'text-red-400' : 'text-slate-500'}`}>
                          {delta > 0 ? '+' : ''}{delta.toFixed(1)}pp vs {firstRecord.year}
                        </span>
                        <span className="text-white font-bold text-sm w-12 text-right">{val.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(val / 50) * 100}%`, backgroundColor: seg.color }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <p className="text-slate-500 text-xs mb-2">Vista apilada</p>
              <div className="flex h-10 rounded-lg overflow-hidden gap-0.5">
                {OCCUPATION_SEGMENTS.map((seg) => (
                  <div key={seg.key} className="flex items-center justify-center overflow-hidden" style={{ width: `${latest[seg.key]}%`, backgroundColor: seg.color + 'cc' }} title={`${seg.label}: ${latest[seg.key].toFixed(1)}%`}>
                    {latest[seg.key] > 5 && <span className="text-white text-[9px] font-bold truncate px-1">{latest[seg.key].toFixed(0)}%</span>}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {OCCUPATION_SEGMENTS.map((seg) => (
                  <div key={seg.key} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
                    <span className="text-slate-400 text-xs">{seg.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Evolución histórica — % sobre total ocupados</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-slate-500 pb-2 pr-4 font-normal">Año</th>
                  {OCCUPATION_SEGMENTS.map((seg) => (
                    <th key={seg.key} className="text-right text-slate-500 pb-2 px-2 font-normal whitespace-nowrap">
                      <span className="flex items-center justify-end gap-1">
                        <span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: seg.color }} />
                        {seg.label.split(' ')[0]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OCCUPATION_BREAKDOWN.map((row, i) => {
                  const isDuque = row.year >= DUQ.startYear && row.year <= DUQ.endYear;
                  const isPetro = row.year >= PET.startYear && row.year <= PET.endYear;
                  return (
                    <tr key={row.year} className={`border-b border-slate-800/40 ${isDuque ? 'bg-purple-500/5' : isPetro ? 'bg-cyan-500/5' : ''}`}>
                      <td className="py-2 pr-4 text-slate-400 font-mono">
                        {row.year}
                        {isDuque && <span className="ml-1 text-purple-400 text-[10px]">D</span>}
                        {isPetro && <span className="ml-1 text-cyan-400 text-[10px]">P</span>}
                        {row.notes?.includes('COVID') && <span className="ml-1 text-amber-400 text-[10px]">⚠</span>}
                      </td>
                      {OCCUPATION_SEGMENTS.map((seg) => {
                        const val = row[seg.key];
                        const prevVal = i > 0 ? OCCUPATION_BREAKDOWN[i - 1][seg.key] : val;
                        const delta = val - prevVal;
                        return (
                          <td key={seg.key} className="py-2 px-2 text-right">
                            <span className="text-slate-200">{val.toFixed(1)}</span>
                            {i > 0 && Math.abs(delta) >= 0.5 && (
                              <span className={`ml-0.5 text-[9px] ${delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{delta > 0 ? '▲' : '▼'}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-slate-600 text-[10px] mt-2">D = Duque · P = Petro · ⚠ = año COVID · Fuente: DANE GEIH — Boletines técnicos anuales</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 mb-8" style={{ borderTop: `2px solid ${COLOR}30` }}>
          <h2 className="text-white font-bold text-lg mb-4">¿Qué dice cada categoría?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { seg: OCCUPATION_SEGMENTS[1], insight: 'El ~43% de cuenta propia es la señal más fuerte de la estructura laboral colombiana. La mayoría son informales (vendedores, transportistas, microempresarios sin empleados). No es emprendimiento dinámico sino refugio ante la falta de empleo asalariado.', alert: true },
              { seg: OCCUPATION_SEGMENTS[0], insight: 'El empleo privado formal (35%) es el más deseable: tiene seguridad social, cesantías y contrato. Su aumento lento refleja los altos costos no salariales (parafiscales ~30% del salario), que desincentivan la formalización de pequeñas empresas.', alert: false },
              { seg: OCCUPATION_SEGMENTS[2], insight: 'Los jornaleros y trabajadores ocasionales (6-9%) son el segmento más precario. Sin contrato, sin seguridad social. En 2020 (COVID) subieron al 9.4% cuando muchos perdieron empleos formales y recurrieron al trabajo diario.', alert: true },
              { seg: OCCUPATION_SEGMENTS[3], insight: 'El empleo público (4-5%) es relativamente estable. Bajo Petro subió de 4.7% (2022) a 5.1% (2024), correlacionando con expansión del gasto público y contratación estatal.', alert: false },
              { seg: OCCUPATION_SEGMENTS[5], insight: 'El trabajo doméstico remunerado (3-3.7%) es mayoritariamente femenino. COVID-19 lo golpeó especialmente (cayó a 2.7% en 2020) por restricciones de movilidad y cierre de hogares.', alert: false },
              { seg: OCCUPATION_SEGMENTS[6], insight: 'Trabajadores familiares sin remuneración (3.5-4.8%) son en su mayoría mujeres rurales. Su tendencia decreciente es señal positiva de formalización laboral femenina.', alert: false },
            ].map(({ seg, insight, alert }) => (
              <div key={seg.key} className={`rounded-xl p-4 border ${alert ? 'border-amber-500/20 bg-amber-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <p className="text-white text-sm font-semibold">{seg.label}</p>
                  <span className="text-white font-bold text-sm ml-auto">{latest[seg.key].toFixed(1)}%</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="glass-card rounded-xl p-4 text-xs text-slate-500">
          <p className="font-semibold text-slate-400 mb-1">Fuentes</p>
          <ul className="space-y-1">
            <li>• <strong className="text-slate-400">DANE GEIH</strong> — Tasa de desempleo e informalidad: dane.gov.co — Mercado laboral</li>
            <li>• <strong className="text-slate-400">Posición ocupacional</strong> — DANE GEIH Boletines Técnicos anuales "Empleo informal y seguridad social"</li>
          </ul>
        </div>

        <div className="flex justify-end mt-4">
          <Link href="/comparador?indicator=desempleo" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Comparar desempleo entre gobiernos →
          </Link>
        </div>
      </div>
    </div>
  );
}
