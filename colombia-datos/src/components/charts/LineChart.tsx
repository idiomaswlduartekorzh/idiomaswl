'use client';

import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';

interface LineConfig {
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
  fillOpacity?: number;
  labelOpacity?: number;
}

interface Props {
  data: Array<{ year: number; [key: string]: number | string | undefined }>;
  lines: LineConfig[];
  yLabel?: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  referenceBands?: ReferenceBand[];
  formatY?: (val: number) => string;
  formatTooltip?: (val: number) => string;
  sourceLabel?: string;
  xDomain?: [number, number];
}

function CustomTooltip({
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
    <div className="glass rounded-lg px-3 py-2 shadow-xl text-sm min-w-[140px]">
      <p className="text-slate-400 text-xs mb-1 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 truncate">{entry.name}</span>
          <span className="ml-auto font-semibold text-white pl-2">
            {formatTooltip ? formatTooltip(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CustomDot({
  cx,
  cy,
  fill,
  r = 4,
}: {
  cx?: number;
  cy?: number;
  fill?: string;
  r?: number;
}) {
  if (cx == null || cy == null) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke="#080d1a"
      strokeWidth={2}
    />
  );
}

export default function LineChart({
  data,
  lines,
  yLabel,
  title,
  height = 340,
  showGrid = true,
  referenceBands = [],
  formatY,
  formatTooltip,
  sourceLabel,
  xDomain,
}: Props) {
  return (
    <div className="w-full">
      {title && (
        <p className="text-sm font-semibold text-slate-200 mb-3">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart
          data={data}
          margin={{ top: 8, right: 16, left: yLabel ? 16 : 0, bottom: 8 }}
        >
          {referenceBands.map((band) => (
            <ReferenceArea
              key={`${band.startYear}-${band.label}`}
              x1={band.startYear}
              x2={band.endYear}
              fill={band.color}
              fillOpacity={band.fillOpacity ?? 0.12}
              label={{
                value: band.label,
                position: 'insideTop',
                fill: band.color,
                fontSize: 10,
                fontWeight: 600,
                opacity: band.labelOpacity ?? 0.85,
              }}
            />
          ))}

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
          )}

          <XAxis
            dataKey="year"
            type="number"
            domain={xDomain ?? ['dataMin', 'dataMax']}
            allowDecimals={false}
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
            content={<CustomTooltip formatTooltip={formatTooltip} />}
            cursor={{ stroke: '#334155', strokeWidth: 1 }}
          />
          {lines.length > 1 && (
            <Legend
              wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 8 }}
            />
          )}

          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color}
              strokeWidth={line.strokeWidth ?? 2}
              dot={<CustomDot fill={line.color} />}
              activeDot={{ r: 5, fill: line.color, stroke: '#080d1a', strokeWidth: 2 }}
              connectNulls={false}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
      {sourceLabel && (
        <p className="text-[11px] text-slate-500 mt-1 text-right pr-2">
          Fuente: {sourceLabel}
        </p>
      )}
    </div>
  );
}
