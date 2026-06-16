'use client';

import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: number | null;
  unit: string;
  change?: number;
  changePercent?: number;
  higherIsBetter: boolean;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
  note?: string;
  sourceLabel?: string;
}

function formatValue(value: number): string {
  if (Math.abs(value) >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
  if (Math.abs(value) >= 1_000) return (value / 1_000).toFixed(1) + 'K';
  if (Math.abs(value) < 10) return value.toFixed(2);
  if (Math.abs(value) < 100) return value.toFixed(1);
  return value.toFixed(0);
}

export default function IndicatorCard({
  label,
  value,
  unit,
  change,
  changePercent,
  higherIsBetter,
  trend,
  color = '#3b82f6',
  note,
  sourceLabel,
}: Props) {
  const hasChange = change != null && !isNaN(change);

  let isPositive = false;
  if (hasChange) {
    const improved = higherIsBetter ? (change ?? 0) > 0 : (change ?? 0) < 0;
    isPositive = improved;
  }

  const arrow =
    trend === 'up' ? '↑' : trend === 'down' ? '↓' : trend === 'stable' ? '→' : null;

  const changeColor = isPositive ? '#22c55e' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-card rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
        style={{ background: color }}
      />

      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider leading-tight">
        {label}
      </p>

      {value == null ? (
        <p className="text-2xl font-bold text-slate-600">N/D</p>
      ) : (
        <div className="flex items-end gap-1.5">
          <span className="text-3xl font-bold text-slate-100 leading-none">
            {formatValue(value)}
          </span>
          <span className="text-sm text-slate-400 mb-0.5">{unit}</span>
        </div>
      )}

      {hasChange && (
        <div className="flex items-center gap-1.5">
          <span className="text-lg leading-none font-bold" style={{ color: changeColor }}>
            {arrow}
          </span>
          <span className="text-sm font-semibold" style={{ color: changeColor }}>
            {(change ?? 0) > 0 ? '+' : ''}
            {formatValue(change ?? 0)} {unit}
          </span>
          {changePercent != null && (
            <span className="text-xs text-slate-500">
              ({changePercent > 0 ? '+' : ''}
              {changePercent.toFixed(1)}%)
            </span>
          )}
        </div>
      )}

      {note && (
        <p className="text-[11px] text-slate-500 leading-tight border-t border-slate-700/50 pt-2 mt-1">
          {note}
        </p>
      )}

      {sourceLabel && (
        <p className="text-[10px] text-slate-600 mt-auto">Fuente: {sourceLabel}</p>
      )}
    </motion.div>
  );
}
