'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/data/indicators';
import { CATEGORY_COLORS } from '@/lib/utils';

const CATEGORIES = Object.keys(CATEGORY_LABELS);

export default function IndicadoresPage() {
  return (
    <div className="min-h-screen bg-[#080d1a] bg-grid-dark">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Indicadores</h1>
          <p className="text-slate-400 mb-10">Explora los indicadores por categoría temática.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/indicadores/${cat}`}
                className="block glass-card rounded-xl p-6 hover:border-slate-600 transition-all group"
                style={{ borderLeft: `3px solid ${CATEGORY_COLORS[cat] || '#3b82f6'}` }}
              >
                <div className="text-2xl mb-3">{CATEGORY_ICONS[cat]}</div>
                <h2 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <p className="text-slate-500 text-sm">Ver indicadores disponibles →</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
