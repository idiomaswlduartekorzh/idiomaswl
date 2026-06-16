'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
} from 'recharts';

export interface AreaConfig {
  key: string;
  color: string;
  name: string;
  strokeWidth?: number;
}

interface ReferenceBand {
  startYear: number;
  endYear: number;
  label: string;
  color: string;
}

interface Props {
  data: Array<{ year: number; [key: string]: number | string | undefined }>;
  areas: AreaConfig[];
  yLabel?: string;
  height?: number;
  referenceBands?: ReferenceBand[];
  formatY?: (val: number) => string;
  formatTooltip?: (val: number) => string;
  sourceLabel?: string;
}

function PremiumTooltip({
  active,
  payload,
  label,
  formatTooltip,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string | number;
  formatTooltip?: (val: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(10, 17, 32, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        minWidth: 160,
      }}
    >
      <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
          <span style={{ color: '#94a3b8', fontSize: 12, flex: 1 }}>{entry.name}</span>
          <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
            {formatTooltip ? formatTooltip(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GradientAreaChart({
  data,
  areas,
  yLabel,
  height = 320,
  referenceBands = [],
  formatY,
  formatTooltip,
  sourceLabel,
}: Props) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 12, left: yLabel ? 8 : -8, bottom: 4 }}>
          <defs>
            {areas.map((area) => (
              <linearGradient key={area.key} id={`grad-${area.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={area.color} stopOpacity={0.28} />
                <stop offset="60%" stopColor={area.color} stopOpacity={0.06} />
                <stop offset="100%" stopColor={area.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          {referenceBands.map((band) => (
            <ReferenceArea
              key={`${band.startYear}-${band.label}`}
              x1={band.startYear}
              x2={band.endYear}
              fill={band.color}
              fillOpacity={0.07}
              label={{
                value: band.label,
                position: 'insideTop',
                fill: band.color,
                fontSize: 10,
                fontWeight: 700,
                opacity: 0.75,
              }}
            />
          ))}

          <CartesianGrid strokeDasharray="2 4" stroke="rgba(30,41,59,0.8)" vertical={false} />

          <XAxis
            dataKey="year"
            tick={{ fill: '#475569', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(30,41,59,0.6)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatY}
            tick={{ fill: '#475569', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            label={
              yLabel
                ? { value: yLabel, angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 10, dx: -2 }
                : undefined
            }
          />
          <Tooltip
            content={<PremiumTooltip formatTooltip={formatTooltip} />}
            cursor={{ stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1.5 }}
          />
          {areas.length > 1 && (
            <Legend wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 8 }} />
          )}

          {areas.map((area) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              name={area.name}
              stroke={area.color}
              strokeWidth={area.strokeWidth ?? 2.5}
              fill={`url(#grad-${area.key})`}
              dot={false}
              activeDot={{ r: 5, fill: area.color, stroke: '#060b17', strokeWidth: 2.5 }}
              connectNulls={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      {sourceLabel && (
        <p className="text-[11px] text-slate-500 mt-1.5 text-right pr-2">
          Fuente: {sourceLabel}
        </p>
      )}
    </div>
  );
}
