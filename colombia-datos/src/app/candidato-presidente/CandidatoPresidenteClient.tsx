'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import WarningBox from '@/components/WarningBox';
import { GOVERNMENTS_PROMISES, type PromiseVerdict } from '@/data/promises';
import { GOVERNMENTS } from '@/data/governments';
import { CheckCircle2, AlertCircle, XCircle, HelpCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const VERDICT_CONFIG: Record<PromiseVerdict, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ElementType;
}> = {
  cumplido: {
    label: 'Cumplido',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    icon: CheckCircle2,
  },
  parcial: {
    label: 'Parcialmente',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    icon: AlertCircle,
  },
  incumplido: {
    label: 'Incumplido',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
    icon: XCircle,
  },
  'sin-datos': {
    label: 'Sin datos',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/25',
    icon: HelpCircle,
  },
};

const GOV_SHORT: Record<string, string> = {
  samper: 'Samper',
  pastrana: 'Pastrana',
  uribe1: 'Uribe I',
  uribe2: 'Uribe II',
  santos1: 'Santos I',
  santos2: 'Santos II',
  duque: 'Duque',
  petro: 'Petro',
};

export default function CandidatoPresidenteClient() {
  const [selected, setSelected] = useState('petro');

  const govData = GOVERNMENTS.find((g) => g.id === selected)!;
  const promisesData = GOVERNMENTS_PROMISES.find((g) => g.govId === selected);

  const verdictCounts = promisesData
    ? {
        cumplido: promisesData.promises.filter((p) => p.verdict === 'cumplido').length,
        parcial: promisesData.promises.filter((p) => p.verdict === 'parcial').length,
        incumplido: promisesData.promises.filter((p) => p.verdict === 'incumplido').length,
        'sin-datos': promisesData.promises.filter((p) => p.verdict === 'sin-datos').length,
      }
    : null;

  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Candidato vs. Presidente</h1>
          <p className="text-slate-400 max-w-2xl">
            Promesas de campaña de cada gobierno frente a los resultados reales,
            medidos con datos verificables y contexto histórico.
          </p>
        </motion.div>

        {/* Government timeline selector */}
        <div className="glass rounded-2xl p-4 mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {GOVERNMENTS.map((gov, i) => (
              <motion.button
                key={gov.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(gov.id)}
                className={`flex flex-col items-center px-4 py-3 rounded-xl text-xs font-medium transition-all border ${
                  selected === gov.id
                    ? 'text-white'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                style={
                  selected === gov.id
                    ? {
                        backgroundColor: gov.color + '22',
                        borderColor: gov.color + '80',
                      }
                    : {}
                }
              >
                <span
                  className="font-bold text-sm mb-0.5"
                  style={{ color: selected === gov.id ? gov.color : undefined }}
                >
                  {GOV_SHORT[gov.id]}
                </span>
                <span className="text-slate-500 text-[10px]">
                  {gov.startYear}–{gov.endYear}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {promisesData && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {/* Campaign overview card */}
              <div
                className="glass rounded-2xl p-6 mb-6 border-l-4"
                style={{ borderLeftColor: govData.color }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">
                      {govData.party} · {govData.startYear}–{govData.endYear}
                    </p>
                    <h2 className="text-2xl font-bold text-white mb-1.5">{govData.president}</h2>
                    <p className="text-slate-300 text-base italic mb-1">
                      &ldquo;{promisesData.slogan}&rdquo;
                    </p>
                    <p className="text-slate-500 text-xs">{promisesData.planName}</p>
                  </div>

                  {/* Verdict summary pills */}
                  {verdictCounts && (
                    <div className="flex gap-2 flex-wrap">
                      {(
                        [
                          ['cumplido', verdictCounts.cumplido],
                          ['parcial', verdictCounts.parcial],
                          ['incumplido', verdictCounts.incumplido],
                        ] as [PromiseVerdict, number][]
                      ).map(([v, count]) => {
                        const cfg = VERDICT_CONFIG[v];
                        return (
                          <div
                            key={v}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${cfg.bg} ${cfg.border}`}
                          >
                            <span className={`text-2xl font-bold tabular-nums ${cfg.color}`}>{count}</span>
                            <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Promises grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {promisesData.promises.map((promise, i) => {
                  const cfg = VERDICT_CONFIG[promise.verdict];
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`glass-card rounded-xl p-5 flex flex-col border ${cfg.border}`}
                    >
                      {/* Promise header */}
                      <div className="flex items-start gap-3 mb-3">
                        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.color}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 flex-wrap mb-0.5">
                            <h3 className="text-white font-semibold text-sm leading-snug">
                              {promise.title}
                            </h3>
                          </div>
                          <p className="text-slate-500 text-[10px] uppercase tracking-wider">
                            {promise.source}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      {/* Commitment */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">
                        {promise.detail}
                      </p>

                      {/* Outcome */}
                      <div
                        className={`rounded-lg p-3 border mt-auto ${cfg.bg} ${cfg.border}`}
                      >
                        <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5">
                          Resultado real
                        </p>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {promise.verdictContext}
                        </p>
                      </div>

                      {/* Link to comparador */}
                      {promise.indicatorId && (
                        <Link
                          href="/comparador"
                          className={`mt-3 flex items-center gap-1.5 text-xs transition-colors ${cfg.color} opacity-70 hover:opacity-100`}
                        >
                          <TrendingUp className="w-3 h-3" />
                          Ver datos históricos en el Comparador
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Inherited context */}
              {govData.inheritedContext && (
                <div className="glass-card rounded-xl p-5 mb-6">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">
                    Contexto heredado por {govData.president.split(' ')[0]}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {govData.inheritedContext.notes}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Desempleo heredado', val: govData.inheritedContext.unemploymentRate + '%' },
                      { label: 'Inflación heredada', val: govData.inheritedContext.inflationRate + '%' },
                      { label: 'Deuda/PIB heredada', val: govData.inheritedContext.debtGdpRatio + '%' },
                      { label: 'Crecimiento año previo', val: govData.inheritedContext.gdpGrowthPrev + '%' },
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-800/30 rounded-lg p-3">
                        <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                        <p className="text-white text-lg font-bold tabular-nums">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <WarningBox type="info" title="Metodología y limitaciones">
          <p>
            Las promesas provienen de planes de gobierno presentados al CNE, discursos de posesión
            y propuestas de campaña documentadas públicamente. El análisis es <strong>descriptivo</strong>,
            no prescriptivo: muestra datos reales y contexto relevante. Los resultados de un gobierno
            son influenciados por herencias del gobierno anterior, choques externos (petróleo, pandemias,
            guerras), ciclos económicos globales y rezagos en la implementación de políticas.
            Esta herramienta busca informar, no emitir veredictos políticos.
          </p>
        </WarningBox>
      </div>
    </div>
  );
}
