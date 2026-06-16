'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { GOVERNMENTS } from '@/data/governments';
import { getObservations } from '@/data/index';
import { computeGovStats, getChangeColor } from '@/lib/utils';
import LineChart from '@/components/charts/LineChart';
import WarningBox from '@/components/WarningBox';
import MethodologyBadge from '@/components/MethodologyBadge';
import { ArrowLeft, Shield } from 'lucide-react';

export default function SeguridadPage() {
  const SAMPER   = GOVERNMENTS.find(g => g.id === 'samper')!;
  const PASTRANA = GOVERNMENTS.find(g => g.id === 'pastrana')!;
  const URIBE1   = GOVERNMENTS.find(g => g.id === 'uribe1')!;
  const URIBE2   = GOVERNMENTS.find(g => g.id === 'uribe2')!;
  const SANTOS1  = GOVERNMENTS.find(g => g.id === 'santos1')!;
  const SANTOS2  = GOVERNMENTS.find(g => g.id === 'santos2')!;
  const DUQ      = GOVERNMENTS.find(g => g.id === 'duque')!;
  const PET      = GOVERNMENTS.find(g => g.id === 'petro')!;

  const homicideObs     = useMemo(() => getObservations('homicidios-tasa').filter(o => !o.department), []);
  const kidnappingObs   = useMemo(() => getObservations('secuestros').filter(o => !o.department), []);
  const massacreObs     = useMemo(() => getObservations('masacres').filter(o => !o.department), []);
  const leadersObs      = useMemo(() => getObservations('lideres-sociales').filter(o => !o.department), []);
  const displacementObs = useMemo(() => getObservations('desplazamiento').filter(o => !o.department), []);

  const homStats = useMemo(() => ({
    samper:   computeGovStats(homicideObs, SAMPER),
    pastrana: computeGovStats(homicideObs, PASTRANA),
    uribe1:   computeGovStats(homicideObs, URIBE1),
    uribe2:   computeGovStats(homicideObs, URIBE2),
    santos1:  computeGovStats(homicideObs, SANTOS1),
    santos2:  computeGovStats(homicideObs, SANTOS2),
    duque:    computeGovStats(homicideObs, DUQ),
    petro:    computeGovStats(homicideObs, PET),
  }), [homicideObs, SAMPER, PASTRANA, URIBE1, URIBE2, SANTOS1, SANTOS2, DUQ, PET]);

  const masStats = useMemo(() => ({
    santos2: computeGovStats(massacreObs, SANTOS2),
    duque:   computeGovStats(massacreObs, DUQ),
    petro:   computeGovStats(massacreObs, PET),
  }), [massacreObs, SANTOS2, DUQ, PET]);

  const dispStats = useMemo(() => ({
    uribe1: computeGovStats(displacementObs, URIBE1),
    duque:  computeGovStats(displacementObs, DUQ),
    petro:  computeGovStats(displacementObs, PET),
  }), [displacementObs, URIBE1, DUQ, PET]);

  const allGovBands = useMemo(() => GOVERNMENTS.map(gov => ({
    startYear: gov.startYear,
    endYear: gov.endYear,
    label: gov.president.split(' ')[0],
    color: gov.color,
  })), []);

  const recentBands = useMemo(() => [SANTOS2, DUQ, PET].map(gov => ({
    startYear: gov.startYear,
    endYear: gov.endYear,
    label: gov.president.split(' ')[0],
    color: gov.color,
  })), [SANTOS2, DUQ, PET]);

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
            <span className="text-3xl">🔒</span>
            <h1 className="text-3xl font-bold text-white">Seguridad</h1>
          </div>
          <p className="text-slate-400 mb-8 max-w-3xl">
            Homicidios, secuestros, masacres, líderes sociales y desplazamiento. Colombia pasó de ser el país más violento del mundo a una situación transformada, pero compleja. La historia completa, sin propaganda.
          </p>
        </motion.div>

        <WarningBox type="warning" title="Tres advertencias críticas de interpretación">
          <ul className="space-y-1.5 text-sm">
            <li><strong className="text-slate-200">Atribución compleja:</strong> La violencia colombiana tiene causas estructurales —narcotráfico, pobreza, geografía, historia— que trascienden cualquier gobierno. Las políticas influyen en el margen; no "crean" ni "eliminan" la violencia.</li>
            <li><strong className="text-slate-200">Fuentes distintas por indicador:</strong> Medicina Legal (forense, más confiable) para homicidios. Indepaz (ONG) para masacres y líderes sociales; sus cifras difieren de las de la Fiscalía y el ACNUDH en un 10–40%.</li>
            <li><strong className="text-slate-200">Rezago de política:</strong> Los efectos de políticas de seguridad se miden con 1–3 años de desfase. El Acuerdo de Paz de 2016 transformó el conflicto para todos los gobiernos siguientes.</li>
          </ul>
        </WarningBox>

        {/* ===== HOMICIDIOS ===== */}
        <section className="mt-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-bold text-white">Tasa de Homicidios: La gran historia</h2>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            Colombia alcanzó 81.8 homicidios por 100.000 habitantes en 1991, la mayor tasa del mundo. La reducción a ~27 (2024) es uno de los mayores descensos de violencia documentados en democracia. Sin embargo, Colombia sigue duplicando el promedio de América Latina.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Samper', gov: SAMPER, stats: homStats.samper },
              { label: 'Pastrana', gov: PASTRANA, stats: homStats.pastrana },
              { label: 'Uribe I', gov: URIBE1, stats: homStats.uribe1 },
              { label: 'Uribe II', gov: URIBE2, stats: homStats.uribe2 },
              { label: 'Santos I', gov: SANTOS1, stats: homStats.santos1 },
              { label: 'Santos II', gov: SANTOS2, stats: homStats.santos2 },
              { label: 'Duque', gov: DUQ, stats: homStats.duque },
              { label: 'Petro', gov: PET, stats: homStats.petro },
            ].map(({ label, gov, stats }) => (
              <div key={label} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${gov.color}` }}>
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-2xl font-bold text-white">{stats.mean?.toFixed(1) ?? '—'}</p>
                <p className="text-xs text-slate-400">prom / 100k</p>
                {stats.change !== null && (
                  <p className={`text-xs font-semibold mt-1 ${getChangeColor(stats.change, false)}`}>
                    {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)} en el periodo
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 mb-4">
            <p className="text-white font-semibold text-sm mb-1">Homicidios por 100.000 hab. — serie histórica (1990–2024)</p>
            <p className="text-slate-500 text-xs mb-4">Las bandas de color corresponden a cada gobierno</p>
            <LineChart
              data={homicideObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#ef4444', name: 'Hom./100k', strokeWidth: 2.5 }]}
              referenceBands={allGovBands}
              yLabel="por 100.000 hab."
              height={320}
              formatY={v => v.toFixed(1)}
              sourceLabel="Fuente: INML — Forensis (Instituto Nacional de Medicina Legal)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                label: 'Uribe 2002–2010',
                value: '−31.3 pts',
                pct: '−48%',
                note: 'De 65.8 (2002) a 34.5 (2010). Mayor reducción sostenida de violencia en democracia del hemisferio occidental.',
                sub: 'Contexto: Plan Colombia + Seguridad Democrática. Costo: 6.402 "falsos positivos" (Comisión de la Verdad, 2022).',
                color: URIBE1.color,
              },
              {
                label: 'Santos 2010–2018',
                value: '−9.5 pts',
                pct: '−28%',
                note: 'De 34.5 (2010) a 25.0 (2018). Mínimo histórico: 24.4 en 2017. El Acuerdo de Paz profundizó la caída.',
                sub: 'Contexto: diálogos La Habana (2012–2016) + cese unilateral FARC (dic 2014). Premio Nobel de Paz 2016.',
                color: SANTOS1.color,
              },
              {
                label: 'Duque–Petro 2018–2024',
                value: '+1.8 pts',
                pct: '+7%',
                note: 'De 25.0 (2018) a ~26.8 (2024). Estancamiento y leve repunte. El mínimo fue 23.9 en 2020 (COVID).',
                sub: 'Contexto: rearme de disidencias FARC, ELN y Clan del Golfo llenando vacíos territoriales.',
                color: DUQ.color,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-4 border-l-2"
                style={{ borderColor: item.color }}
              >
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <span className="text-sm text-slate-400">({item.pct})</span>
                </div>
                <p className="text-slate-300 text-xs mb-2 leading-relaxed">{item.note}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== SECUESTROS ===== */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-2">Secuestros: de la capital mundial a niveles mínimos</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            En 2000, Colombia registró 3.706 secuestros — más que cualquier otro país del mundo. La reducción sostenida durante la era Uribe es uno de los mayores logros de seguridad documentados en América Latina.
          </p>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={kidnappingObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#f97316', name: 'Secuestros', strokeWidth: 2 }]}
              referenceBands={allGovBands.filter(b => b.startYear >= 1996)}
              yLabel="casos"
              height={260}
              formatY={v => v.toFixed(0)}
              sourceLabel="Fuente: Policía Nacional / Fondelibertad"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Pico histórico (2000)', value: '3.706', note: 'Pastrana — Colombia = #1 mundial', color: PASTRANA.color },
              { label: 'Fin Uribe (2010)', value: '282', note: '−92% desde el pico de 2000', color: URIBE2.color },
              { label: 'Fin Santos (2018)', value: '207', note: 'FARC ya no secuestra; ELN persiste', color: SANTOS2.color },
              { label: '2024 (preliminar)', value: '~172', note: 'Nivel históricamente bajo; ELN y FARC disidentes', color: PET.color },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${item.color}` }}>
                <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-slate-400 text-xs mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MASACRES ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-white">Masacres (3+ víctimas): el indicador alarmante</h2>
            <MethodologyBadge level="media" showLabel />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-amber-200 text-xs leading-relaxed">
              ⚠️ <strong>Limitación crítica:</strong> La serie de Indepaz con metodología homogénea cubre desde 2014. No existen datos comparables para Uribe o Pastrana bajo la misma definición; bajo los paramilitares (1996–2006) las masacres eran masivas pero no sistematizadas igual. El pico COVID-2020 (91 masacres) coincide con el aislamiento territorial del Estado, no solo con política de seguridad.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={massacreObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#dc2626', name: 'Masacres', strokeWidth: 2 }]}
              referenceBands={recentBands}
              yLabel="eventos"
              height={250}
              formatY={v => v.toFixed(0)}
              sourceLabel="Fuente: Indepaz — definición: 3+ víctimas en mismo lugar y circunstancias"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: 'Santos II promedio',
                value: masStats.santos2.mean?.toFixed(0) ?? '—',
                note: `Mínimo: ${masStats.santos2.min?.toFixed(0) ?? '—'} masacres (2015). Acuerdo de Paz redujo el conflicto.`,
                gov: SANTOS2,
              },
              {
                label: 'Duque promedio',
                value: masStats.duque.mean?.toFixed(0) ?? '—',
                note: `Pico: ${masStats.duque.max?.toFixed(0) ?? '—'} masacres (2021). COVID + vacío de FARC.`,
                gov: DUQ,
              },
              {
                label: 'Petro prom. (hasta 2024)',
                value: masStats.petro.mean?.toFixed(0) ?? '—',
                note: `Tendencia: bajista pero aún muy alta. Paz Total no redujo masacres a corto plazo.`,
                gov: PET,
              },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${item.gov.color}` }}>
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-slate-400">masacres/año promedio</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DESPLAZAMIENTO ===== */}
        {displacementObs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-2">Desplazamiento Forzado: ~9 millones de víctimas acumuladas</h2>
            <p className="text-slate-400 text-sm mb-4 max-w-3xl">
              Colombia tiene la segunda mayor crisis de desplazamiento interno del mundo. El Registro Único de Víctimas (RUV) acumula ~9 millones de personas. El flujo anual cayó dramáticamente con el Acuerdo de Paz y rebotó con la reconfiguración de grupos armados.
            </p>

            <div className="glass rounded-2xl p-6 mb-4">
              <LineChart
                data={displacementObs.map(o => ({ year: o.year, value: o.value / 1000 }))}
                lines={[{ key: 'value', color: '#8b5cf6', name: 'Desplazados (miles)', strokeWidth: 2 }]}
                referenceBands={allGovBands.filter(b => b.startYear >= 1996)}
                yLabel="miles de personas"
                height={260}
                formatY={v => `${v.toFixed(0)}k`}
                sourceLabel="Fuente: UARIV — declaraciones recibidas y registradas en el año"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Pico (2002)', value: '413.000', note: 'Uribe hereda crisis; ofensiva FARC–AUC en territorio', color: URIBE1.color },
                { label: 'Valle histórico (2015)', value: '67.000', note: 'Cese fuego unilateral FARC. Mínimo moderno.', color: SANTOS2.color },
                { label: 'Duque promedio', value: dispStats.duque.mean !== null ? `${Math.round(dispStats.duque.mean / 1000)}k` : '—', note: 'Rearme de disidencias FARC y ELN', color: DUQ.color },
                { label: 'Petro (2022–2024)', value: dispStats.petro.mean !== null ? `${Math.round(dispStats.petro.mean / 1000)}k` : '—', note: 'Paz Total: ceses fallidos; conflicto continúa', color: PET.color },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${item.color}` }}>
                  <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="text-slate-400 text-xs mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== LÍDERES SOCIALES ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-white">Asesinatos de Líderes Sociales</h2>
            <MethodologyBadge level="baja" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-4 max-w-3xl">
            No existe serie histórica comparable antes de 2016. El seguimiento sistemático inicia con el Acuerdo de Paz. Indepaz, ACNUDH y Fiscalía dan cifras distintas según la definición de "líder social".
          </p>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={leadersObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#ec4899', name: 'Líderes asesinados', strokeWidth: 2 }]}
              referenceBands={recentBands}
              yLabel="personas"
              height={250}
              formatY={v => v.toFixed(0)}
              sourceLabel="Fuente: Indepaz (líderes sociales + excombatientes en proceso de reincorporación)"
            />
          </div>

          <div className="glass-card rounded-xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Lectura contextualizada</p>
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="text-slate-400"><span className="text-slate-200 font-medium">Duque (2018–2022):</span> Máximo absoluto en 2021 (315 personas). El aislamiento por COVID facilitó la acción de grupos en territorios sin presencia estatal. Duque fue objeto de condenas internacionales por ACNUDH y CIDH.</p>
              <p className="text-slate-400"><span className="text-slate-200 font-medium">Petro (2022–2024):</span> Tendencia bajista (223 → 186 → 142). Parcialmente atribuible a mayor atención política, negociaciones de Paz Total y trabajo con organizaciones de base. Sin embargo, cualquier cifra sigue siendo inaceptablemente alta.</p>
              <p className="text-amber-300 text-xs">⚠️ Advertencia: parte de la reducción puede reflejar cambios en el seguimiento o la definición, no solo mejoras reales en protección.</p>
            </div>
          </div>
        </section>

        {/* ===== CONTEXTO ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Los tres momentos que transformaron la seguridad</h2>
          <div className="space-y-4">
            {[
              {
                title: '🛡️ Seguridad Democrática — Uribe (2002–2010)',
                color: URIBE1.color,
                points: [
                  'Resultado medible: homicidios −48% (65.8 → 34.5), secuestros −92% (2.882 → 282), masacres en descenso sostenido.',
                  'Mecanismos: ofensiva militar, Plan Colombia (ayuda EE.UU.), desmovilización AUC (Ley de Justicia y Paz), Plan Patriota.',
                  'Costo documentado: "falsos positivos" — 6.402 civiles presentados como bajas en combate según la Comisión de la Verdad (2022). Casos ante la JEP.',
                  'Herencia negativa: la AUC se reconfiguró en BACRIM (Clan del Golfo, Urabeños); solución parcial y militarizada del problema armado estructural.',
                ],
              },
              {
                title: '🕊️ Acuerdo de Paz con las FARC — Santos (2016)',
                color: SANTOS1.color,
                points: [
                  'Resultado medible: mínimo histórico de homicidios (24.4 en 2017), colapso del secuestro extorsivo de las FARC, reducción de masacres.',
                  'Implementación parcial: ~30% de los compromisos del Acuerdo con cumplimiento pleno a 2024, según el Instituto Kroc de la Universidad Notre Dame.',
                  'Efecto no previsto: el vacío territorial de las FARC generó competencia entre ELN, disidencias y Clan del Golfo → masacres 2018+ se dispararon.',
                  'El Acuerdo no terminó el conflicto: lo transformó y fragmentó en múltiples actores más difusos y más difíciles de negociar colectivamente.',
                ],
              },
              {
                title: '☮️ Paz Total — Petro (2022–presente)',
                color: PET.color,
                points: [
                  'Objetivo: negociar simultáneamente con ELN, Clan del Golfo, Estado Mayor Central (disidencias FARC) y otras estructuras armadas.',
                  'Resultados mixtos: varios ceses al fuego parciales fracasaron; masacres y desplazamiento continuaron durante las negociaciones.',
                  'Logro parcial verificable: reducción de líderes sociales asesinados (315 en 2021 → 142 en 2024). Tendencia real, aunque lenta.',
                  'Crítica neutral: negociar con todos simultáneamente puede dar tiempo a grupos para rearmarse mientras la violencia persiste en territorios.',
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 border-l-4"
                style={{ borderColor: item.color }}
              >
                <h3 className="text-white font-semibold mb-3 text-sm">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((pt, j) => (
                    <li key={j} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-slate-600 shrink-0 mt-0.5">→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <WarningBox type="info" title="Nota de atribución">
          <p>
            Ningún presidente colombiano "creó" ni "eliminó" la violencia. La violencia tiene causas estructurales
            que van décadas atrás. Los datos muestran tendencias durante cada mandato, pero la causalidad es multicausal:
            el narcotráfico, los precios de commodities, los acuerdos de gobiernos anteriores y la presencia
            diferencial del Estado en el territorio son factores permanentes. Se muestra el contexto heredado en cada caso.
          </p>
        </WarningBox>

      </div>
    </div>
  );
}
