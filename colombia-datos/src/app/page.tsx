'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GOVERNMENTS } from '@/data/governments';
import NavBar from '@/components/NavBar';
import { TrendingUp, Shield, Leaf, Baby, Scale, Search, ChevronRight, AlertTriangle, BookOpen, BarChart3, Globe } from 'lucide-react';

const MODULES = [
  { id: 'economia', label: 'Economía', icon: TrendingUp, color: '#3b82f6', desc: 'PIB, inflación, deuda, inversión, déficit fiscal' },
  { id: 'empleo', label: 'Empleo', icon: BarChart3, color: '#8b5cf6', desc: 'Desempleo, informalidad, salario real' },
  { id: 'pobreza', label: 'Pobreza', icon: Scale, color: '#f59e0b', desc: 'Pobreza monetaria, extrema, Gini, desigualdad' },
  { id: 'seguridad', label: 'Seguridad', icon: Shield, color: '#ef4444', desc: 'Homicidios, secuestros, masacres, líderes sociales' },
  { id: 'narcotrafico', label: 'Narcotráfico', icon: Search, color: '#10b981', desc: 'Coca, producción cocaína, erradicación' },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf, color: '#22c55e', desc: 'Deforestación, petróleo, transición energética' },
  { id: 'infancia', label: 'Infancia', icon: Baby, color: '#f43f5e', desc: 'Desnutrición, mortalidad infantil, salud' },
  { id: 'internacional', label: 'Colombia vs Mundo', icon: Globe, color: '#06b6d4', desc: 'Comparación contextualizada con referentes internacionales', badge: 'Próximamente' },
];

const PRINCIPLES = [
  { title: 'Fuentes primarias', desc: 'DANE, Banco de la República, UNODC, Medicina Legal, IDEAM y otros entes oficiales verificables' },
  { title: 'Sin cherry-picking', desc: 'Se muestran todos los indicadores del periodo, no solo los convenientes políticamente' },
  { title: 'Contexto obligatorio', desc: 'Cada dato viene con contexto heredado, factores externos y advertencias metodológicas' },
  { title: 'Datos normalizados', desc: 'Tasas, porcentajes del PIB, per cápita. Nunca cifras brutas engañosas sin normalizar' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Plataforma de análisis político independiente · Beta
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Colombia en Datos
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed">
              Compara los gobiernos de Colombia con datos reales, verificables y en contexto.
            </p>

            <p className="text-base text-slate-500 mb-10 max-w-2xl mx-auto">
              Sin propaganda. Sin ideología. Solo indicadores medibles, fuentes oficiales y advertencias
              metodológicas honestas. Para que los datos incomoden a cualquiera cuando sea necesario.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/comparador"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-lg shadow-lg shadow-blue-600/25"
              >
                Ir al Comparador
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/metodologia"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors text-lg border border-slate-700"
              >
                <BookOpen className="w-5 h-5" />
                Metodología
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advertencia de neutralidad */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 border-l-4 border-amber-500"
        >
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 font-semibold text-sm mb-1">Principio editorial</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Esta plataforma no hace propaganda política. Si un gobierno mejoró un indicador, se muestra. Si lo empeoró, también.
                Si el dato no permite atribución clara, se dice. Si no hay fuente confiable, se marca como{' '}
                <span className="text-slate-300 font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">sin dato disponible</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Módulos */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Módulos de análisis</h2>
          <p className="text-slate-400">7 dimensiones de gobernanza. Más de 300 datos históricos con fuentes trazables.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={mod.badge ? '#' : `/indicadores/${mod.id}`}
                  className={`block glass-card rounded-xl p-5 hover:border-slate-600 transition-all group ${mod.badge ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: mod.color + '20', border: `1px solid ${mod.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm">{mod.label}</h3>
                    {mod.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">{mod.badge}</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{mod.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Presidentes */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Presidentes en la base de datos</h2>
          <p className="text-slate-400">Desde 1994. Series históricas continuas con fuentes primarias oficiales.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GOVERNMENTS.map((gov, i) => (
            <motion.div
              key={gov.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4"
              style={{ borderLeft: `3px solid ${gov.color}` }}
            >
              <p className="text-white font-semibold text-sm leading-tight mb-1">{gov.president}</p>
              <p className="text-slate-500 text-xs mb-2">{gov.startYear}–{gov.endYear}</p>
              <p className="text-slate-600 text-xs">{gov.party}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principios */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Principios metodológicos</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <span className="text-blue-400 text-sm font-bold">{i + 1}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{p.title}</h3>
                <p className="text-slate-400 text-sm">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Empieza a explorar</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Selecciona dos gobiernos, elige un indicador y compara. Los datos hablan por sí mismos.
            El contexto explica por qué.
          </p>
          <Link
            href="/comparador"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
          >
            Abrir el Comparador
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-white font-semibold mb-2">🇨🇴 Colombia en Datos</p>
              <p className="text-slate-500 text-sm">Plataforma independiente de análisis comparativo de gobiernos. Sin financiación política. Sin afiliación partidista.</p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold text-sm mb-3">Fuentes primarias</p>
              <ul className="space-y-1 text-slate-500 text-sm">
                <li>DANE — Estadísticas nacionales</li>
                <li>Banco de la República</li>
                <li>UNODC — Cultivos ilícitos</li>
                <li>Medicina Legal — Seguridad</li>
                <li>IDEAM — Medio ambiente</li>
              </ul>
            </div>
            <div>
              <p className="text-slate-300 font-semibold text-sm mb-3">Navegación</p>
              <ul className="space-y-2">
                {[['Comparador', '/comparador'], ['Indicadores', '/indicadores'], ['Metodología', '/metodologia']].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/60 pt-6">
            <p className="text-slate-600 text-xs text-center">
              Datos de fuentes oficiales colombianas e internacionales. Sin afiliación política.
              Los datos aproximados o estimados están claramente marcados con ⚠️.
              Última actualización de datos: junio 2026.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
