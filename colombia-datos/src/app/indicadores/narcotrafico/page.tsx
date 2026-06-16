'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { GOVERNMENTS } from '@/data/governments';
import { getObservations } from '@/data/index';
import { computeGovStats } from '@/lib/utils';
import GradientAreaChart from '@/components/charts/GradientAreaChart';
import WarningBox from '@/components/WarningBox';
import MethodologyBadge from '@/components/MethodologyBadge';
import { ArrowLeft, Leaf, AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import type { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' },
  }),
};

function fmt(n: number | null | undefined): string {
  if (n == null) return '—';
  return n.toLocaleString('es-CO');
}

function GovernmentBar({
  gov,
  value,
  max,
  unit = 'ha',
  lowerIsBetter = true,
}: {
  gov: { president: string; color: string; startYear: number; endYear: number };
  value: number | null;
  max: number;
  unit?: string;
  lowerIsBetter?: boolean;
}) {
  if (value == null) return null;
  const pct = Math.min(100, (value / max) * 100);
  const isBest = lowerIsBetter ? value === max * 0 : false;
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <span className="text-xs font-semibold text-slate-200" style={{ color: gov.color }}>
            {gov.president.split(' ')[0]}
          </span>
          <span className="text-xs text-slate-500 ml-1.5">
            {gov.startYear}–{gov.endYear}
          </span>
        </div>
        <span className="text-xs font-bold metric-number text-slate-300">
          {fmt(value)} {unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(30,41,59,0.8)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: gov.color, opacity: 0.8 }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function NarcotráficoPage() {
  const SAMPER   = GOVERNMENTS.find(g => g.id === 'samper')!;
  const PASTRANA = GOVERNMENTS.find(g => g.id === 'pastrana')!;
  const URIBE1   = GOVERNMENTS.find(g => g.id === 'uribe1')!;
  const URIBE2   = GOVERNMENTS.find(g => g.id === 'uribe2')!;
  const SANTOS1  = GOVERNMENTS.find(g => g.id === 'santos1')!;
  const SANTOS2  = GOVERNMENTS.find(g => g.id === 'santos2')!;
  const DUQ      = GOVERNMENTS.find(g => g.id === 'duque')!;
  const PET      = GOVERNMENTS.find(g => g.id === 'petro')!;

  const cocaObs     = useMemo(() => getObservations('coca-hectareas'), []);
  const prodObs     = useMemo(() => getObservations('coca-produccion'), []);
  const eradObs     = useMemo(() => getObservations('coca-erradicacion'), []);

  const cocaStats = useMemo(() => ({
    samper:   computeGovStats(cocaObs, SAMPER),
    pastrana: computeGovStats(cocaObs, PASTRANA),
    uribe1:   computeGovStats(cocaObs, URIBE1),
    uribe2:   computeGovStats(cocaObs, URIBE2),
    santos1:  computeGovStats(cocaObs, SANTOS1),
    santos2:  computeGovStats(cocaObs, SANTOS2),
    duque:    computeGovStats(cocaObs, DUQ),
    petro:    computeGovStats(cocaObs, PET),
  }), [cocaObs, SAMPER, PASTRANA, URIBE1, URIBE2, SANTOS1, SANTOS2, DUQ, PET]);

  const eradStats = useMemo(() => ({
    duque: computeGovStats(eradObs, DUQ),
    petro: computeGovStats(eradObs, PET),
  }), [eradObs, DUQ, PET]);

  const allGovBands = useMemo(() => GOVERNMENTS.map(gov => ({
    startYear: gov.startYear,
    endYear:   gov.endYear,
    label:     gov.president.split(' ')[0],
    color:     gov.color,
  })), []);

  const cocaChartData = useMemo(() =>
    cocaObs.map(o => ({ year: o.year, coca: o.value })),
  [cocaObs]);

  const prodChartData = useMemo(() =>
    prodObs.map(o => ({ year: o.year, produccion: o.value })),
  [prodObs]);

  const paradoxData = useMemo(() => {
    const years = Array.from(new Set([...eradObs, ...cocaObs].map(o => o.year)))
      .filter(y => y >= 2014)
      .sort((a, b) => a - b);
    return years.map(year => {
      const coca = cocaObs.find(o => o.year === year)?.value ?? undefined;
      const erad = eradObs.find(o => o.year === year)?.value ?? undefined;
      return { year, coca, erradicacion: erad };
    });
  }, [cocaObs, eradObs]);

  const govList = [
    { gov: SAMPER,   stats: cocaStats.samper },
    { gov: PASTRANA, stats: cocaStats.pastrana },
    { gov: URIBE1,   stats: cocaStats.uribe1 },
    { gov: URIBE2,   stats: cocaStats.uribe2 },
    { gov: SANTOS1,  stats: cocaStats.santos1 },
    { gov: SANTOS2,  stats: cocaStats.santos2 },
    { gov: DUQ,      stats: cocaStats.duque },
    { gov: PET,      stats: cocaStats.petro },
  ];

  const maxCoca = Math.max(...govList.map(g => g.stats?.max ?? 0));

  return (
    <div className="min-h-screen bg-[#060b17] bg-grid-dark">
      <NavBar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-amber pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
          <Link
            href="/indicadores"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Indicadores
          </Link>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center liquid-glass shadow-glow-amber">
                <Leaf size={18} className="text-amber-400" />
              </div>
              <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase">
                Narcotráfico
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight tracking-tight"
            >
              Colombia y la coca
              <span className="block text-gradient-colombia">1994 — 2024</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed"
            >
              Treinta años de política antinarcóticos: cultivos, producción de cocaína, erradicación y
              los contextos que explican por qué Colombia sigue siendo el mayor productor mundial.
            </motion.p>
          </motion.div>

          {/* Hero metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              {
                label: 'Hectáreas de coca · 2023',
                value: '253.000',
                unit: 'ha',
                note: 'Máximo histórico absoluto. UNODC 2024.',
                glow: 'shadow-glow-red',
                color: 'text-red-400',
                icon: <AlertTriangle size={15} className="text-red-400" />,
                delay: 0,
              },
              {
                label: 'Producción cocaína · 2023',
                value: '2.664',
                unit: 'TM',
                note: 'Récord global. Colombia ≈ 80% producción mundial.',
                glow: 'shadow-glow-red',
                color: 'text-orange-400',
                icon: <TrendingUp size={15} className="text-orange-400" />,
                delay: 1,
              },
              {
                label: 'Erradicación récord · 2020',
                value: '130.000',
                unit: 'ha',
                note: 'Duque bate récord de erradicación. Coca siguió subiendo igual.',
                glow: 'shadow-glow-amber',
                color: 'text-amber-400',
                icon: <TrendingDown size={15} className="text-amber-400" />,
                delay: 2,
              },
            ].map((card) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={card.delay + 3}
                className={`liquid-glass rounded-2xl p-5 ${card.glow} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {card.icon}
                  <span className="text-xs text-slate-400 font-medium leading-tight">{card.label}</span>
                </div>
                <div className={`text-3xl font-bold metric-number ${card.color}`}>
                  {card.value}
                  <span className="text-base font-semibold text-slate-400 ml-1.5">{card.unit}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-16">

        {/* Warning box */}
        <WarningBox type="info" title="Lectura sin sesgo">
          <ul className="space-y-1 list-disc list-inside">
            <li>Los cultivos de coca responden a múltiples factores simultáneos: precio internacional, capacidad del Estado, conflicto armado, política de paz, acuerdos de sustitución, y demanda global. Ningún presidente tiene control total sobre estas variables.</li>
            <li>La paradoja de erradicación es documentada y aceptada por UNODC: erradicar más hectáreas no siempre reduce la extensión total (efecto globo, resiembra, expansión a nuevas zonas).</li>
            <li>Los datos de 2024 son estimaciones preliminares. El informe definitivo UNODC se espera en 2025.</li>
          </ul>
        </WarningBox>

        {/* ── Sección 1: Coca hectáreas ─── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Cultivos de coca</h2>
              <span className="text-sm text-slate-500">Hectáreas · 1994–2024</span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-3xl">
              Desde 44.700 ha en 1994 hasta 253.000 en 2023. El pico Pastrana (163k, zona de despeje),
              la reducción Uribe (mínimos 57k), la explosión Santos II (suspensión glifosato + acuerdo de paz)
              y el récord histórico bajo Petro.
            </p>
          </motion.div>

          <div className="liquid-glass rounded-2xl p-6 mb-6">
            <GradientAreaChart
              data={cocaChartData}
              areas={[{ key: 'coca', color: '#f59e0b', name: 'Ha de coca' }]}
              height={340}
              referenceBands={allGovBands}
              formatY={(v) => `${(v / 1000).toFixed(0)}k`}
              formatTooltip={(v) => `${v.toLocaleString('es-CO')} ha`}
              sourceLabel="UNODC / SIMCI 2024"
            />
          </div>

          {/* Gov comparison bars */}
          <div className="liquid-glass-light rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-5 uppercase tracking-widest">
              Pico de cultivos por gobierno
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {govList.map(({ gov, stats }) => (
                <GovernmentBar
                  key={gov.id}
                  gov={gov}
                  value={stats?.max ?? null}
                  max={maxCoca}
                  unit="ha (pico)"
                />
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-5 leading-relaxed">
              * Se muestra el pico máximo registrado durante cada mandato. El presidente puede heredar niveles altos o bajos del gobierno anterior.
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* ── Sección 2: La Paradoja de Erradicación ─── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={18} className="text-amber-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">La paradoja de la erradicación</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-3xl">
              Duque batió el récord histórico de erradicación en 2020 (130.000 ha). Al mismo tiempo, la
              superficie total de coca siguió en máximos históricos. Este fenómeno —documentado por UNODC—
              refleja que la resiembra y la expansión territorial superan a la erradicación forzada.
            </p>
          </motion.div>

          <div className="liquid-glass rounded-2xl p-6 mb-6">
            <GradientAreaChart
              data={paradoxData}
              areas={[
                { key: 'coca',         color: '#f59e0b', name: 'Ha de coca (total)',        strokeWidth: 2.5 },
                { key: 'erradicacion', color: '#34d399', name: 'Ha erradicadas', strokeWidth: 2 },
              ]}
              height={300}
              formatY={(v) => `${(v / 1000).toFixed(0)}k`}
              formatTooltip={(v) => `${v.toLocaleString('es-CO')} ha`}
              sourceLabel="UNODC / SIMCI 2024"
            />
          </div>

          {/* Paradox insight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                year: '2020',
                title: 'Récord de erradicación',
                value: '130.000 ha',
                detail: 'Duque erradica más que cualquier gobierno en la historia de Colombia.',
                color: '#34d399',
                glow: 'shadow-glow-green',
              },
              {
                year: '2020',
                title: 'Coca simultánea',
                value: '143.000 ha',
                detail: 'A pesar del récord, Colombia aún tiene 143k ha de coca ese mismo año.',
                color: '#f59e0b',
                glow: 'shadow-glow-amber',
              },
              {
                year: '2021',
                title: 'Rebote inmediato',
                value: '+61.000 ha en un año',
                detail: 'En 2021, con erradicación bajando a 103k, la coca sube a 204k ha. El efecto resiembra supera la capacidad de control.',
                color: '#f87171',
                glow: 'shadow-glow-red',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className={`liquid-glass rounded-xl p-5 ${card.glow}`}
              >
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: card.color }}>
                  {card.year}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">{card.title}</div>
                <div className="text-xl font-bold metric-number text-white mb-2">{card.value}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{card.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Sección 3: Producción de cocaína ─── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Producción de cocaína</h2>
              <span className="text-sm text-slate-500">Toneladas métricas · 2010–2023</span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-3xl">
              La producción potencial multiplicó por 9× entre 2012 (mínimo histórico: 309 TM) y 2023
              (récord global: 2.664 TM). Los factores: más coca, mejoras en el rendimiento por hectárea
              y tecnificación de laboratorios. Colombia genera aproximadamente el 80% de la cocaína mundial.
            </p>
          </motion.div>

          <div className="liquid-glass rounded-2xl p-6 mb-6">
            <GradientAreaChart
              data={prodChartData}
              areas={[{ key: 'produccion', color: '#ef4444', name: 'Cocaína (TM)' }]}
              height={300}
              formatY={(v) => `${v} TM`}
              formatTooltip={(v) => `${v.toLocaleString('es-CO')} TM`}
              sourceLabel="UNODC World Drug Report 2024"
            />
          </div>

          {/* Key milestones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { year: 2012, value: '309 TM', label: 'Mínimo Santos I', color: '#22c55e' },
              { year: 2019, value: '951 TM', label: 'Pico Duque', color: '#f59e0b' },
              { year: 2022, value: '1.738 TM', label: 'Récord histórico', color: '#f87171' },
              { year: 2023, value: '2.664 TM', label: 'Récord global absoluto', color: '#ef4444' },
            ].map((m) => (
              <div key={m.year} className="liquid-glass-light rounded-xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">{m.year}</div>
                <div className="text-lg font-bold metric-number" style={{ color: m.color }}>{m.value}</div>
                <div className="text-xs text-slate-400 mt-1 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Sección 4: Timeline de políticas ─── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Info size={18} className="text-blue-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Políticas antinarcóticos</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-3xl">
              Los grandes puntos de inflexión en la política colombiana frente al narcotráfico y su impacto medible en los cultivos.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                period: '2000–2015',
                title: 'Plan Colombia + aspersión aérea con glifosato',
                gov: 'Pastrana / Uribe / Santos I',
                govColor: '#1d4ed8',
                impact: 'Redujo de 163k ha (2000) a 48k ha (2012). La aspersión aérea fue el instrumento más efectivo en cobertura.',
                result: '▼ −115k ha en 12 años',
                resultColor: '#22c55e',
              },
              {
                period: '2015',
                title: 'Suspensión de aspersión aérea (glifosato)',
                gov: 'Santos I',
                govColor: '#059669',
                impact: 'La ANLA y el Ministerio de Salud suspenden fumigaciones tras la clasificación de glifosato como "probable carcinógeno" por la OMS/IARC. Coca explota desde 48k a 146k en dos años.',
                result: '▲ +98k ha en 2 años',
                resultColor: '#ef4444',
              },
              {
                period: '2016–2018',
                title: 'Acuerdo de Paz con FARC (PNIS - sustitución voluntaria)',
                gov: 'Santos II',
                govColor: '#059669',
                impact: 'El PNIS promete sustitución voluntaria para familias cocaleras. La expectativa dispara registros de quienes quieren el beneficio → coca sube a 171k (2017). Implementación lenta.',
                result: '▲ Pico histórico en 2017',
                resultColor: '#f59e0b',
              },
              {
                period: '2018–2022',
                title: 'Erradicación forzada masiva + intento reasperción',
                gov: 'Duque',
                govColor: '#d97706',
                impact: 'Duque bate todos los récords de erradicación forzada (130k ha en 2020) y busca reactivar aspersión aérea. Corte Constitucional bloquea glifosato sin garantías ambientales/salud. El efecto resiembra y territorial supera la erradicación.',
                result: '▲ 169k → 230k ha (+61k en 2021)',
                resultColor: '#ef4444',
              },
              {
                period: '2022–2024',
                title: '"Paz Total" — reducción de erradicación forzada',
                gov: 'Petro',
                govColor: '#7c3aed',
                impact: 'Petro reduce erradicación forzada a 57k ha (2023) y apuesta por negociaciones con grupos armados y desarrollo alternativo. Coca alcanza máximo histórico absoluto (253k ha). Debate político abierto sobre resultados.',
                result: '253k ha (2023) · primer dato posible descenso en 2024',
                resultColor: '#f59e0b',
              },
            ].map((policy, i) => (
              <motion.div
                key={policy.period + policy.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="liquid-glass-light rounded-xl p-5 flex gap-5"
              >
                <div className="shrink-0 pt-0.5">
                  <div
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: policy.govColor, boxShadow: `0 0 0 2px #060b17, 0 0 0 4px ${policy.govColor}55` }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: policy.govColor }}>
                      {policy.period}
                    </span>
                    <span className="text-xs text-slate-500">{policy.gov}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100 mb-2">{policy.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">{policy.impact}</p>
                  <div className="text-xs font-bold" style={{ color: policy.resultColor }}>
                    {policy.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── Contexto internacional ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Colombia en el contexto global</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                stat: '≈ 80%',
                label: 'de la cocaína mundial',
                detail: 'Colombia produce la mayoría de la cocaína consumida en EE.UU., Europa y el resto del mundo. UNODC 2024.',
                color: '#ef4444',
              },
              {
                stat: '2,6M',
                label: 'familias rurales vinculadas',
                detail: 'La economía cocalera involucra directa o indirectamente a millones de familias en zonas donde no hay alternativas económicas viables. UNODC/DNP.',
                color: '#f59e0b',
              },
              {
                stat: '$700M',
                label: 'USD / año en ayuda antidrogas EE.UU.',
                detail: 'Colombia ha recibido más de $12.000 millones desde el año 2000 en cooperación antidrogas de EE.UU. (Plan Colombia y sucesores). CRS / GAO.',
                color: '#60a5fa',
              },
            ].map((item) => (
              <div key={item.stat} className="liquid-glass-light rounded-xl p-5">
                <div className="text-3xl font-bold metric-number mb-1" style={{ color: item.color }}>
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-2">{item.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Attribution ─── */}
        <div className="liquid-glass-light rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-widest">
            Fuentes y metodología
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
            <div>
              <p className="font-semibold text-slate-300 mb-1">Cultivos y producción</p>
              <p>UNODC — Informe Mundial sobre las Drogas (2024) / SIMCI Colombia. Series anuales verificadas.
              Cifras 2024 son estimadas preliminares.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">Erradicación</p>
              <p>UNODC / Observatorio de Drogas de Colombia (ODC) / DNP. Incluye erradicación forzada
              (manual + aspersión cuando estuvo activa). No incluye sustitución voluntaria PNIS por separado.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">Notas interpretativas</p>
              <p>Los datos de producción potencial de cocaína son estimaciones basadas en rendimiento por
              hectárea y eficiencia de laboratorios. No representan incautaciones sino producción estimada total.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">Limitaciones</p>
              <p>Años de transición presidencial (1998, 2002, 2006, 2010, 2014, 2018, 2022) comparten datos
              anuales entre dos gobiernos. Los contextos heredados son determinantes.</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-3">
            <MethodologyBadge level="alta" />
            <MethodologyBadge level="alta" showLabel={false} />
          </div>
        </div>

        {/* Nav entre módulos */}
        <div className="flex flex-wrap gap-4 justify-between items-center pt-4">
          <Link
            href="/indicadores/seguridad"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors liquid-glass-light px-4 py-2.5 rounded-xl"
          >
            <ArrowLeft size={14} />
            Seguridad
          </Link>
          <Link
            href="/indicadores"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors liquid-glass px-4 py-2.5 rounded-xl shadow-glow-blue"
          >
            Ver todos los indicadores →
          </Link>
        </div>
      </div>
    </div>
  );
}
