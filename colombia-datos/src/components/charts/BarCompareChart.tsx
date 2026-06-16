'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

interface DataPoint {
  label: string;
  govA: number;
  govB: number;
}

interface Props {
  data: DataPoint[];
  govAName: string;
  govBName: string;
  govAColor: string;
  govBColor: string;
  title?: string;
  yLabel?: string;
  formatY?: (val: number) => string;
  height?: number;
  sourceLabel?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
  formatY,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
  formatY?: (val: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 shadow-xl text-sm min-w-[160px]">
      <p className="text-slate-400 text-xs mb-1 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2.5 h-2.5 rounded-sm shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 truncate text-xs">{entry.name}</span>
          <span className="ml-auto font-semibold text-white pl-2">
            {formatY ? formatY(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BarCompareChart({
  data,
  govAName,
  govBName,
  govAColor,
  govBColor,
  title,
  yLabel,
  formatY,
  height = 300,
  sourceLabel,
}: Props) {
  return (
    <div className="w-full">
      {title && (
        <p className="text-sm font-semibold text-slate-200 mb-3">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, left: yLabel ? 16 : 0, bottom: 8 }}
          barCategoryGap="28%"
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#1e293b' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatY}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            label={
              yLabel
                ? {
                    value: yLabel,
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#64748b',
                    fontSize: 10,
                    dx: -4,
                  }
                : undefined
            }
          />
          <Tooltip
            content={<CustomTooltip formatY={formatY} />}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 8 }}
          />
          <Bar dataKey="govA" name={govAName} fill={govAColor} radius={[3, 3, 0, 0]} />
          <Bar dataKey="govB" name={govBName} fill={govBColor} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      {sourceLabel && (
        <p className="text-[11px] text-slate-500 mt-1 text-right pr-2">
          Fuente: {sourceLabel}
        </p>
      )}
    </div>
  );
}
