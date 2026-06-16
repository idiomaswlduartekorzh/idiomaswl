'use client';

import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { SOURCES } from '@/data/sources';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

const PRINCIPLES = [
  {
    title: 'Fuentes primarias, siempre',
    desc: 'Se priorizan siempre los datos directamente publicados por el ente productor del dato (DANE, Banco de la República, UNODC, Medicina Legal, IDEAM, etc.). Las fuentes secundarias se usan para series largas o comparaciones internacionales, y siempre se indica la fuente original.',
    icon: CheckCircle2,
    color: '#22c55e',
  },
  {
    title: 'Datos normalizados, no absolutos',
    desc: 'No se comparan cifras absolutas cuando existen indicadores más apropiados. Se usa: tasas por 100.000 habitantes, porcentajes del PIB, cifras per cápita, variaciones reales deflactadas.',
    icon: CheckCircle2,
    color: '#22c55e',
  },
  {
    title: 'Contexto obligatorio',
    desc: 'Todo gobierno recibe una ficha de contexto heredado. Esto permite separar lo que el gobierno hizo de lo que el gobierno recibió.',
    icon: CheckCircle2,
    color: '#22c55e',
  },
  {
    title: 'Advertencias metodológicas visibles',
    desc: 'Cuando hay cambios de metodología en una serie, cuando el COVID distorsiona un año, cuando una cifra es estimada o tiene rezago, se marca explícitamente con ⚠️.',
    icon: AlertTriangle,
    color: '#f59e0b',
  },
  {
    title: 'Sin cherry-picking',
    desc: 'Se muestran todos los indicadores del periodo, incluyendo los que no favorecen al gobierno. No se omite el año más desfavorable de un mandato sin justificación metodológica.',
    icon: CheckCircle2,
    color: '#22c55e',
  },
  {
    title: 'Separación dato objetivo / percepción',
    desc: 'Indicadores como percepción de seguridad o corrupción se muestran separados de los datos objetivos y claramente etiquetados como percepciones.',
    icon: CheckCircle2,
    color: '#22c55e',
  },
  {
    title: 'No atribución directa irresponsable',
    desc: 'Un indicador que mejoró durante un gobierno no implica que el gobierno lo causó. Pueden intervenir ciclos económicos internacionales, acuerdos de gobiernos anteriores, choques exógenos, rezagos de política.',
    icon: AlertTriangle,
    color: '#f59e0b',
  },
  {
    title: 'Datos inventados: cero tolerancia',
    desc: 'Si no hay dato disponible para un indicador en un periodo, se marca sin dato disponible. No se interpolará ni estimará sin indicarlo explícitamente.',
    icon: XCircle,
    color: '#ef4444',
  },
];

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Metodología</h1>
          <p className="text-slate-400 mb-12">Cómo se recopilan, validan, presentan e interpretan los datos en esta plataforma.</p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">Principios editoriales</h2>
          <div className="space-y-4">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-5 flex gap-4"
                >
                  <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: p.color }} />
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{p.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">Fuentes de datos</h2>
          <div className="space-y-3">
            {SOURCES.map((src) => (
              <div key={src.id} className="glass-card rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold text-sm">{src.name}</p>
                    <p className="text-slate-500 text-xs">{src.institution}</p>
                    {src.notes && <p className="text-slate-400 text-xs mt-1">{src.notes}</p>}
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: src.reliabilityLevel === 'alta' ? '#22c55e20' : src.reliabilityLevel === 'media' ? '#f59e0b20' : '#ef444420',
                      color: src.reliabilityLevel === 'alta' ? '#22c55e' : src.reliabilityLevel === 'media' ? '#f59e0b' : '#ef4444',
                    }}
                  >
                    Confiabilidad {src.reliabilityLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <h2 className="text-white font-semibold">Sobre la atribución de resultados a gobiernos</h2>
          </div>
          <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
            <p>Esta plataforma no afirma automáticamente que los cambios en un indicador durante un gobierno sean causados por ese gobierno.</p>
            <p>Factores que pueden explicar resultados independientemente de la política gubernamental:</p>
            <ul className="space-y-1 ml-2">
              {[
                'Precio internacional del petróleo (Colombia depende ~40% de ingresos fiscales del sector extractivo)',
                'Pandemia COVID-19 (2020): afectó a todos los gobiernos de forma similar a nivel global',
                'Tasas de interés de la FED de EE.UU. (afectan flujos de capital y devaluación del peso)',
                'Guerra Rusia-Ucrania (2022): disparó inflación alimentaria y energética global',
                'Rezagos de política: una política puede mostrar resultados 2-4 años después',
                'Ciclos demográficos: cambios en la PEA afectan la tasa de desempleo independientemente del empleo creado',
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-400 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
