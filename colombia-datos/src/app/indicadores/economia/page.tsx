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
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

export default function EconomiaPage() {
  const SAMPER   = GOVERNMENTS.find(g => g.id === 'samper')!;
  const PASTRANA = GOVERNMENTS.find(g => g.id === 'pastrana')!;
  const URIBE1   = GOVERNMENTS.find(g => g.id === 'uribe1')!;
  const URIBE2   = GOVERNMENTS.find(g => g.id === 'uribe2')!;
  const SANTOS1  = GOVERNMENTS.find(g => g.id === 'santos1')!;
  const SANTOS2  = GOVERNMENTS.find(g => g.id === 'santos2')!;
  const DUQ      = GOVERNMENTS.find(g => g.id === 'duque')!;
  const PET      = GOVERNMENTS.find(g => g.id === 'petro')!;

  const gdpObs      = useMemo(() => getObservations('pib-crecimiento').filter(o => !o.department), []);
  const inflObs     = useMemo(() => getObservations('inflacion').filter(o => !o.department), []);
  const debtObs     = useMemo(() => getObservations('deuda-pib').filter(o => !o.department), []);
  const deficitObs  = useMemo(() => getObservations('deficit-fiscal').filter(o => !o.department), []);
  const iedObs      = useMemo(() => getObservations('ied').filter(o => !o.department), []);

  const allGovBands = useMemo(() => GOVERNMENTS.map(gov => ({
    startYear: gov.startYear,
    endYear: gov.endYear,
    label: gov.president.split(' ')[0],
    color: gov.color,
  })), []);

  const gdpStats = useMemo(() => ({
    samper:   computeGovStats(gdpObs, SAMPER),
    pastrana: computeGovStats(gdpObs, PASTRANA),
    uribe1:   computeGovStats(gdpObs, URIBE1),
    uribe2:   computeGovStats(gdpObs, URIBE2),
    santos1:  computeGovStats(gdpObs, SANTOS1),
    santos2:  computeGovStats(gdpObs, SANTOS2),
    duque:    computeGovStats(gdpObs, DUQ),
    petro:    computeGovStats(gdpObs, PET),
  }), [gdpObs, SAMPER, PASTRANA, URIBE1, URIBE2, SANTOS1, SANTOS2, DUQ, PET]);

  const inflStats = useMemo(() => ({
    samper:   computeGovStats(inflObs, SAMPER),
    pastrana: computeGovStats(inflObs, PASTRANA),
    uribe1:   computeGovStats(inflObs, URIBE1),
    uribe2:   computeGovStats(inflObs, URIBE2),
    santos1:  computeGovStats(inflObs, SANTOS1),
    santos2:  computeGovStats(inflObs, SANTOS2),
    duque:    computeGovStats(inflObs, DUQ),
    petro:    computeGovStats(inflObs, PET),
  }), [inflObs, SAMPER, PASTRANA, URIBE1, URIBE2, SANTOS1, SANTOS2, DUQ, PET]);

  const debtStats = useMemo(() => ({
    samper:   computeGovStats(debtObs, SAMPER),
    pastrana: computeGovStats(debtObs, PASTRANA),
    uribe1:   computeGovStats(debtObs, URIBE1),
    uribe2:   computeGovStats(debtObs, URIBE2),
    santos1:  computeGovStats(debtObs, SANTOS1),
    santos2:  computeGovStats(debtObs, SANTOS2),
    duque:    computeGovStats(debtObs, DUQ),
    petro:    computeGovStats(debtObs, PET),
  }), [debtObs, SAMPER, PASTRANA, URIBE1, URIBE2, SANTOS1, SANTOS2, DUQ, PET]);

  const oilObs = useMemo(() => getObservations('precio-petroleo').filter(o => !o.department), []);

  const govs = [
    { label: 'Samper', gov: SAMPER },
    { label: 'Pastrana', gov: PASTRANA },
    { label: 'Uribe I', gov: URIBE1 },
    { label: 'Uribe II', gov: URIBE2 },
    { label: 'Santos I', gov: SANTOS1 },
    { label: 'Santos II', gov: SANTOS2 },
    { label: 'Duque', gov: DUQ },
    { label: 'Petro', gov: PET },
  ];

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
            <span className="text-3xl">📊</span>
            <h1 className="text-3xl font-bold text-white">Economía</h1>
          </div>
          <p className="text-slate-400 mb-8 max-w-3xl">
            PIB, inflación, deuda pública, déficit fiscal e inversión extranjera. Treinta años de ciclos económicos colombianos: booms minero-energéticos, crisis internacionales, pandemia y el reto fiscal del presente.
          </p>
        </motion.div>

        <WarningBox type="warning" title="Tres advertencias clave para interpretar la economía colombiana">
          <ul className="space-y-1.5 text-sm">
            <li><strong className="text-slate-200">El petróleo distorsiona todo:</strong> Colombia depende del sector minero-energético para ~30% de sus exportaciones y ~20% de sus ingresos fiscales. Los booms (2004–2013) y las caídas (2014–2016) no fueron mérito ni culpa de ningún gobierno: los precios los fija el mercado global.</li>
            <li><strong className="text-slate-200">El rebote de 2021 no es crecimiento:</strong> El PIB cayó −7% en 2020 (COVID). El +10.6% de 2021 es un efecto estadístico de base baja. Comparar 2021 con otros años es metodológicamente engañoso.</li>
            <li><strong className="text-slate-200">Herencia fiscal:</strong> El presidente que asume hereda la trayectoria de deuda, déficit e inflación del gobierno anterior. La causalidad entre política y resultado tarda 12–24 meses.</li>
          </ul>
        </WarningBox>

        {/* ===== PIB CRECIMIENTO ===== */}
        <section className="mt-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Crecimiento del PIB Real</h2>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            Colombia creció a un promedio de 3.8% anual entre 1994 y 2024. El mayor crecimiento sostenido ocurrió bajo Uribe II (6.9% en 2007) impulsado por el boom minero-energético. La mayor caída: COVID-19 en 2020 (−7%).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {govs.map(({ label, gov }) => {
              const stats = gdpStats[gov.id as keyof typeof gdpStats];
              return (
                <div key={label} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${gov.color}` }}>
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-2xl font-bold text-white">{stats.mean?.toFixed(1) ?? '—'}%</p>
                  <p className="text-xs text-slate-400">prom. anual</p>
                  {stats.mean !== null && (
                    <p className={`text-xs font-semibold mt-1 ${getChangeColor(stats.mean, true)}`}>
                      {stats.min?.toFixed(1)}% – {stats.max?.toFixed(1)}%
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="glass rounded-2xl p-6 mb-4">
            <p className="text-white font-semibold text-sm mb-1">Crecimiento del PIB Real — serie 1994–2024</p>
            <p className="text-slate-500 text-xs mb-4">Las bandas de color corresponden a cada gobierno. Línea punteada = 0%</p>
            <LineChart
              data={gdpObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#10b981', name: 'PIB %', strokeWidth: 2.5 }]}
              referenceBands={allGovBands}
              yLabel="% anual"
              height={320}
              formatY={v => `${v.toFixed(1)}%`}
              sourceLabel="Fuente: DANE / Banco Mundial (Cuentas Nacionales, año base 2015)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                label: 'Crisis 1999 — Pastrana',
                value: '−4.2%',
                note: 'Peor recesión del siglo XX colombiano. Crisis UPAC (hipotecas), contagio crisis Tequila/Asia, colapso del crédito.',
                sub: 'Contexto: choque externo (Asia), colapso del sistema UPAC heredado de gobiernos anteriores. Pastrana no generó la crisis; la recibió.',
                color: PASTRANA.color,
              },
              {
                label: 'Boom Uribe II — 2007',
                value: '+6.9%',
                note: 'Mayor crecimiento en décadas. Boom commodities, IED récord, confianza inversionista, seguridad mejorada.',
                sub: 'Advertencia: el boom coincide con precios del petróleo a $90–$100/barril. Parte del crecimiento fue exógeno al gobierno.',
                color: URIBE2.color,
              },
              {
                label: 'COVID-19 — Duque 2020',
                value: '−7.0%',
                note: 'La mayor caída del PIB colombiano moderno. Cuarentena estricta (mar–sept 2020), 21.4% de desempleo en mayo.',
                sub: 'El rebote de 2021 (+10.6%) es espejo estadístico: base de comparación muy baja. No indica crecimiento estructural.',
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
                <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                <p className="text-slate-300 text-xs mb-2 leading-relaxed">{item.note}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== INFLACIÓN ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Inflación (IPC)</h2>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            Colombia pasó de inflaciones de 20%+ en los 90 (Samper) a rangos del 2–4% entre 2010 y 2021, gracias al esquema de inflación objetivo del Banco de la República (meta: 3%). El pico de 2022 (13.1%) fue el mayor en 25 años, impulsado por la guerra en Ucrania y la demanda reprimida post-COVID.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {govs.map(({ label, gov }) => {
              const stats = inflStats[gov.id as keyof typeof inflStats];
              return (
                <div key={label} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${gov.color}` }}>
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-2xl font-bold text-white">{stats.mean?.toFixed(1) ?? '—'}%</p>
                  <p className="text-xs text-slate-400">prom. anual</p>
                  {stats.mean !== null && (
                    <p className="text-xs text-slate-500 mt-1">pico: {stats.max?.toFixed(1)}%</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={inflObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#f97316', name: 'IPC %', strokeWidth: 2 }]}
              referenceBands={allGovBands}
              yLabel="% anual"
              height={280}
              formatY={v => `${v.toFixed(1)}%`}
              sourceLabel="Fuente: DANE / Banco de la República (IPC diciembre-diciembre)"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Samper promedio', value: `${inflStats.samper.mean?.toFixed(1)}%`, note: 'Inflación persistente de dos dígitos. Meta: reducirla. Resultado: bajó de 22.6% a 16.7%.', color: SAMPER.color },
              { label: 'Uribe-Santos (mínimo)', value: '1.9%', note: '2013: mínimo histórico moderno. Inflación objetivo operando a plena capacidad.', color: SANTOS1.color },
              { label: 'Petro 2022 (pico)', value: '13.1%', note: 'Máximo desde 1998. Guerra Ucrania, dólar caro, demanda reprimida. El Banrep subió tasa a 13.25%.', color: PET.color },
              { label: 'Petro 2024', value: '5.2%', note: 'Convergiendo a la meta del 3%. Aún sobre el rango objetivo pero tendencia bajista clara.', color: PET.color },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${item.color}` }}>
                <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DEUDA / PIB ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Deuda Pública / PIB</h2>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            La deuda pasó de 18% del PIB (1994) al 68.1% (2021), el mayor nivel histórico, impulsada por COVID. Desde 2022 bajó a 57.9% (2024). La regla fiscal vigente desde 2012 estableció metas de reducción, suspendidas durante la pandemia.
          </p>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={debtObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#f59e0b', name: 'Deuda/PIB', strokeWidth: 2 }]}
              referenceBands={allGovBands}
              yLabel="% del PIB"
              height={280}
              formatY={v => `${v.toFixed(1)}%`}
              sourceLabel="Fuente: MHCP — Marco Fiscal de Mediano Plazo (GNC)"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {govs.map(({ label, gov }) => {
              const stats = debtStats[gov.id as keyof typeof debtStats];
              const change = stats.change;
              return (
                <div key={label} className="glass-card rounded-xl p-4" style={{ borderLeft: `3px solid ${gov.color}` }}>
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-white">{stats.start?.toFixed(1)}% → {stats.end?.toFixed(1)}%</p>
                  {change !== null && (
                    <p className={`text-xs font-semibold mt-1 ${getChangeColor(change, false)}`}>
                      {change > 0 ? '+' : ''}{change.toFixed(1)}pp
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-200 text-xs leading-relaxed">
              <strong>ℹ️ Cómo leer la deuda:</strong> La deuda puede subir por dos razones muy distintas: (1) mayor gasto público sin ingresos equivalentes (caso COVID 2020), o (2) inversión que genera retornos futuros. El ratio Deuda/PIB también sube cuando el PIB cae aunque la deuda no cambie (efecto denominador, visible en 1999 y 2020). El FMI considera sostenible para Colombia un ratio cercano al 55–60%.
            </p>
          </div>
        </section>

        {/* ===== DÉFICIT FISCAL ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-white">Déficit Fiscal / PIB</h2>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-4 max-w-3xl">
            El balance fiscal del Gobierno Nacional Central (GNC) ha sido negativo (déficit) en todos los años desde 1994. El menor déficit ocurrió bajo Uribe II (−0.8% en 2006). El mayor: −8.2% en 2020 por COVID, con la regla fiscal suspendida.
          </p>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={deficitObs.map(o => ({ year: o.year, value: o.value }))}
              lines={[{ key: 'value', color: '#f43f5e', name: 'Déficit/PIB', strokeWidth: 2 }]}
              referenceBands={allGovBands}
              yLabel="% del PIB"
              height={280}
              formatY={v => `${v.toFixed(1)}%`}
              sourceLabel="Fuente: MHCP — Marco Fiscal de Mediano Plazo (GNC)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                label: 'Pastrana 1999',
                value: '−6.5%',
                note: 'El mayor déficit hasta el COVID: la recesión redujo el recaudo mientras el gasto de emergencia subía.',
                sub: 'No fue irresponsabilidad fiscal: fue el efecto automático de la peor recesión del siglo XX en Colombia.',
                color: PASTRANA.color,
              },
              {
                label: 'Uribe II 2006',
                value: '−0.8%',
                note: 'Mejor resultado fiscal de la era moderna. El boom económico disparó el recaudo y redujo el déficit.',
                sub: 'Contexto favorable: PIB creció 6.7%, petróleo a $65/barril, IED en alza. El buen número tiene causas mixtas.',
                color: URIBE2.color,
              },
              {
                label: 'Petro 2024',
                value: '−5.5%',
                note: 'Deterioro respecto a 2023 (−4.2%). El FMI alertó sobre el incumplimiento de la regla fiscal. Recorte de $23 billones.',
                sub: 'La reforma tributaria de 2022 fue insuficiente para cerrar la brecha. Debate activo sobre sostenibilidad.',
                color: PET.color,
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
                <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                <p className="text-slate-300 text-xs mb-2 leading-relaxed">{item.note}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== IED ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Inversión Extranjera Directa</h2>
            <MethodologyBadge level="alta" showLabel />
          </div>
          <p className="text-slate-400 text-sm mb-4 max-w-3xl">
            La IED colombiana pasó de $2.4 mil millones USD (2000) a un pico de $17.2 mil millones (2022). El sector minero-energético domina históricamente el 40–50% del total. La caída post-2022 refleja incertidumbre sobre reformas, tasas altas globales y menor exploración de petróleo.
          </p>

          <div className="glass rounded-2xl p-6 mb-4">
            <LineChart
              data={iedObs.map(o => ({ year: o.year, value: o.value / 1000 }))}
              lines={[{ key: 'value', color: '#3b82f6', name: 'IED (miles millones USD)', strokeWidth: 2 }]}
              referenceBands={allGovBands.filter(b => b.startYear >= 2000)}
              yLabel="miles de mill. USD"
              height={260}
              formatY={v => `$${v.toFixed(1)}B`}
              sourceLabel="Fuente: Banco de la República — Balanza de Pagos"
            />
          </div>

          <div className="glass-card rounded-xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Notas de interpretación</p>
            <div className="space-y-2">
              {[
                { year: '2005', note: 'Pico artificial (+$10.3B): incluye venta de Bavaria a SABMiller. Transacción puntual, no flujo recurrente de inversión productiva.' },
                { year: '2013', note: 'Pico estructural ($16.8B): boom minero-energético. Petróleo a $108/barril. El 60% fue al sector de hidrocarburos.' },
                { year: '2020', note: 'Colapso COVID (-42%): empresas suspendieron proyectos globalmente. Fenómeno internacional, no solo colombiano.' },
                { year: '2022', note: 'Nuevo pico ($17.2B): precios altos de petróleo post-COVID. Parte es la transición Duque→Petro; solo el segundo semestre es Petro.' },
                { year: '2023–24', note: 'Caída (-37%): tasas de interés globales altas, incertidumbre por reformas Petro (salud, pensional, laboral), menor exploración petrolera.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <span className="text-blue-400 font-bold shrink-0 w-10">{item.year}</span>
                  <span className="text-slate-400 leading-relaxed">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTEXTO EXTERNO ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">El factor externo que todo lo condiciona: el petróleo</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            El precio del petróleo explica una parte sustancial de las variaciones en el PIB, el déficit fiscal y la IED de Colombia. Ningún gobierno controla el Brent.
          </p>

          {oilObs.length > 0 && (
            <div className="glass rounded-2xl p-6 mb-6">
              <p className="text-white font-semibold text-sm mb-1">Precio del Petróleo Brent (USD/barril)</p>
              <p className="text-slate-500 text-xs mb-4">Variable exógena: el Brent determina ingresos fiscales, IED y tipo de cambio</p>
              <LineChart
                data={oilObs.map(o => ({ year: o.year, value: o.value }))}
                lines={[{ key: 'value', color: '#84cc16', name: 'Brent USD/barril', strokeWidth: 2 }]}
                referenceBands={allGovBands.filter(b => b.startYear >= 2000)}
                yLabel="USD/barril"
                height={240}
                formatY={v => `$${v.toFixed(0)}`}
                sourceLabel="Fuente: Bloomberg/EIA compilado por Banco de la República"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: '📈 Cuando el petróleo sube — el "milagro" económico',
                points: [
                  'PIB crece impulsado por hidrocarburos y mayor gasto público.',
                  'IED aumenta: exploración y explotación atraen capital extranjero.',
                  'El peso se aprecia (peso fuerte), lo que encarece exportaciones no petroleras.',
                  'El Estado recibe más ingresos de Ecopetrol y regalías.',
                ],
                color: '#10b981',
              },
              {
                title: '📉 Cuando el petróleo cae — la "crisis" económica',
                points: [
                  'Ingresos fiscales caen bruscamente; el déficit aumenta automáticamente.',
                  'IED se retrae: proyectos de exploración se cancelan.',
                  'El peso se deválua, encareciendo importaciones y la deuda externa.',
                  'El PIB desacelera por efecto directo (producción) e indirecto (gasto público).',
                ],
                color: '#ef4444',
              },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-5 border-l-4" style={{ borderColor: item.color }}>
                <h3 className="text-white font-semibold mb-3 text-sm">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((pt, j) => (
                    <li key={j} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-slate-600 shrink-0 mt-0.5">→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <WarningBox type="info" title="Nota metodológica de atribución económica">
          <p>
            Los indicadores económicos tienen múltiples causas simultáneas: ciclos globales, precios de commodities,
            decisiones del Banco de la República (independiente del gobierno), herencia fiscal del gobierno anterior,
            y decisiones de política propias. Al comparar gobiernos, la plataforma muestra el <em>contexto heredado</em> y
            los <em>factores exógenos verificables</em> junto con los datos, para evitar atribuir a una sola administración
            resultados que son estructurales o internacionales.
          </p>
        </WarningBox>

      </div>
    </div>
  );
}
