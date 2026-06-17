'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const COUNTRIES = ['Colombia', 'Chile', 'Brasil', 'México', 'LAC'] as const;
type Country = (typeof COUNTRIES)[number];

const COLORS: Record<Country, string> = {
  Colombia: '#f59e0b',
  Chile: '#3b82f6',
  Brasil: '#22c55e',
  México: '#ef4444',
  LAC: '#8b5cf6',
};

interface DatasetEntry {
  year: number;
  Colombia: number;
  Chile: number;
  Brasil: number;
  México: number;
  LAC: number;
}

// PIB per capita (USD corrientes, World Bank)
const PIB_PER_CAPITA: DatasetEntry[] = [
  { year: 2000, Colombia: 2474, Chile: 4835, Brasil: 3750, México: 5634, LAC: 3748 },
  { year: 2005, Colombia: 3401, Chile: 7612, Brasil: 4791, México: 7310, LAC: 4757 },
  { year: 2010, Colombia: 6251, Chile: 12785, Brasil: 11286, México: 8901, LAC: 8070 },
  { year: 2015, Colombia: 6050, Chile: 13574, Brasil: 8814, México: 9005, LAC: 7913 },
  { year: 2018, Colombia: 6651, Chile: 15920, Brasil: 8921, México: 9673, LAC: 8895 },
  { year: 2019, Colombia: 6426, Chile: 14898, Brasil: 8917, México: 9863, LAC: 8720 },
  { year: 2020, Colombia: 5333, Chile: 13230, Brasil: 7508, México: 8325, LAC: 7352 },
  { year: 2021, Colombia: 6104, Chile: 16790, Brasil: 7519, México: 9797, LAC: 8120 },
  { year: 2022, Colombia: 6650, Chile: 16000, Brasil: 9073, México: 10044, LAC: 9260 },
  { year: 2023, Colombia: 6680, Chile: 14800, Brasil: 10100, México: 10800, LAC: 9500 },
];

// Tasa de pobreza % (línea $6.85/día, World Bank PIP)
const POBREZA: DatasetEntry[] = [
  { year: 2002, Colombia: 55.0, Chile: 16.0, Brasil: 49.0, México: 51.0, LAC: 49.0 },
  { year: 2006, Colombia: 47.0, Chile: 12.0, Brasil: 41.0, México: 44.0, LAC: 42.0 },
  { year: 2010, Colombia: 40.0, Chile: 10.0, Brasil: 34.0, México: 42.0, LAC: 36.0 },
  { year: 2014, Colombia: 33.0, Chile: 8.0, Brasil: 25.0, México: 42.0, LAC: 32.0 },
  { year: 2016, Colombia: 32.0, Chile: 7.5, Brasil: 26.0, México: 41.0, LAC: 31.0 },
  { year: 2018, Colombia: 29.0, Chile: 7.0, Brasil: 23.0, México: 40.0, LAC: 30.0 },
  { year: 2019, Colombia: 37.0, Chile: 7.0, Brasil: 25.0, México: 43.0, LAC: 33.0 },
  { year: 2020, Colombia: 45.0, Chile: 8.5, Brasil: 33.0, México: 46.0, LAC: 38.0 },
  { year: 2021, Colombia: 40.0, Chile: 8.0, Brasil: 28.0, México: 43.0, LAC: 34.0 },
  { year: 2022, Colombia: 36.0, Chile: 7.8, Brasil: 26.0, México: 40.0, LAC: 31.0 },
  { year: 2023, Colombia: 33.5, Chile: 8.0, Brasil: 26.5, México: 40.0, LAC: 31.5 },
];

// Tasa de homicidios (x100k, UNODC)
const HOMICIDIOS: DatasetEntry[] = [
  { year: 2000, Colombia: 63.3, Chile: 2.0, Brasil: 26.0, México: 11.0, LAC: 20.0 },
  { year: 2005, Colombia: 40.3, Chile: 2.2, Brasil: 24.0, México: 11.0, LAC: 18.0 },
  { year: 2010, Colombia: 34.5, Chile: 3.0, Brasil: 22.0, México: 18.0, LAC: 20.0 },
  { year: 2015, Colombia: 26.1, Chile: 4.4, Brasil: 28.0, México: 16.0, LAC: 22.0 },
  { year: 2016, Colombia: 25.0, Chile: 4.0, Brasil: 29.0, México: 19.0, LAC: 22.0 },
  { year: 2017, Colombia: 24.4, Chile: 3.9, Brasil: 31.0, México: 22.0, LAC: 22.0 },
  { year: 2018, Colombia: 25.0, Chile: 4.0, Brasil: 27.0, México: 26.0, LAC: 23.0 },
  { year: 2019, Colombia: 25.7, Chile: 4.2, Brasil: 23.0, México: 29.0, LAC: 22.0 },
  { year: 2020, Colombia: 23.9, Chile: 4.1, Brasil: 23.0, México: 29.0, LAC: 21.0 },
  { year: 2021, Colombia: 26.5, Chile: 4.5, Brasil: 22.0, México: 28.0, LAC: 21.0 },
  { year: 2022, Colombia: 26.1, Chile: 4.6, Brasil: 23.0, México: 28.0, LAC: 21.5 },
  { year: 2023, Colombia: 27.2, Chile: 4.8, Brasil: 23.5, México: 27.5, LAC: 22.0 },
];

// Desempleo % (World Bank ILO)
const DESEMPLEO: DatasetEntry[] = [
  { year: 2000, Colombia: 17.2, Chile: 9.7, Brasil: 7.8, México: 2.6, LAC: 10.5 },
  { year: 2005, Colombia: 12.6, Chile: 7.9, Brasil: 9.8, México: 3.5, LAC: 8.8 },
  { year: 2010, Colombia: 11.8, Chile: 8.1, Brasil: 6.7, México: 5.4, LAC: 7.5 },
  { year: 2015, Colombia: 8.9, Chile: 6.3, Brasil: 8.4, México: 4.4, LAC: 7.4 },
  { year: 2016, Colombia: 9.2, Chile: 6.5, Brasil: 11.5, México: 3.9, LAC: 8.0 },
  { year: 2017, Colombia: 9.4, Chile: 6.7, Brasil: 12.8, México: 3.4, LAC: 8.3 },
  { year: 2018, Colombia: 9.7, Chile: 7.4, Brasil: 12.3, México: 3.3, LAC: 8.2 },
  { year: 2019, Colombia: 10.5, Chile: 7.2, Brasil: 11.9, México: 3.5, LAC: 8.3 },
  { year: 2020, Colombia: 15.9, Chile: 11.5, Brasil: 13.7, México: 4.4, LAC: 11.0 },
  { year: 2021, Colombia: 13.7, Chile: 9.1, Brasil: 13.2, México: 4.1, LAC: 9.5 },
  { year: 2022, Colombia: 11.2, Chile: 7.9, Brasil: 9.3, México: 3.3, LAC: 7.8 },
  { year: 2023, Colombia: 10.2, Chile: 9.0, Brasil: 7.8, México: 3.0, LAC: 8.2 },
];

// Gini (World Bank)
const GINI: DatasetEntry[] = [
  { year: 2002, Colombia: 0.574, Chile: 0.514, Brasil: 0.586, México: 0.481, LAC: 0.543 },
  { year: 2006, Colombia: 0.553, Chile: 0.498, Brasil: 0.566, México: 0.476, LAC: 0.520 },
  { year: 2010, Colombia: 0.548, Chile: 0.503, Brasil: 0.537, México: 0.483, LAC: 0.503 },
  { year: 2014, Colombia: 0.538, Chile: 0.455, Brasil: 0.526, México: 0.469, LAC: 0.483 },
  { year: 2016, Colombia: 0.517, Chile: 0.460, Brasil: 0.536, México: 0.459, LAC: 0.469 },
  { year: 2018, Colombia: 0.517, Chile: 0.448, Brasil: 0.534, México: 0.454, LAC: 0.461 },
  { year: 2019, Colombia: 0.526, Chile: 0.447, Brasil: 0.543, México: 0.455, LAC: 0.462 },
  { year: 2020, Colombia: 0.544, Chile: 0.446, Brasil: 0.553, México: 0.459, LAC: 0.469 },
  { year: 2021, Colombia: 0.530, Chile: 0.445, Brasil: 0.533, México: 0.457, LAC: 0.451 },
  { year: 2022, Colombia: 0.521, Chile: 0.443, Brasil: 0.528, México: 0.454, LAC: 0.449 },
  { year: 2023, Colombia: 0.519, Chile: 0.442, Brasil: 0.527, México: 0.453, LAC: 0.447 },
];

// Gasto educación % PIB (UNESCO/OCDE)
const GASTO_EDUCACION: DatasetEntry[] = [
  { year: 2000, Colombia: 3.4, Chile: 3.8, Brasil: 3.5, México: 4.4, LAC: 3.7 },
  { year: 2005, Colombia: 4.0, Chile: 3.6, Brasil: 4.5, México: 5.3, LAC: 4.2 },
  { year: 2010, Colombia: 4.5, Chile: 4.1, Brasil: 5.6, México: 5.2, LAC: 5.0 },
  { year: 2015, Colombia: 4.9, Chile: 5.0, Brasil: 6.0, México: 5.2, LAC: 5.3 },
  { year: 2018, Colombia: 4.9, Chile: 5.4, Brasil: 6.1, México: 4.9, LAC: 5.2 },
  { year: 2019, Colombia: 4.9, Chile: 5.5, Brasil: 6.1, México: 4.9, LAC: 5.2 },
  { year: 2020, Colombia: 5.3, Chile: 5.6, Brasil: 6.5, México: 5.0, LAC: 5.5 },
  { year: 2021, Colombia: 5.0, Chile: 5.5, Brasil: 6.2, México: 4.8, LAC: 5.3 },
  { year: 2022, Colombia: 4.8, Chile: 5.4, Brasil: 6.0, México: 4.5, LAC: 5.1 },
  { year: 2023, Colombia: 4.8, Chile: 5.4, Brasil: 6.0, México: 4.6, LAC: 5.1 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Indicator config
// ─────────────────────────────────────────────────────────────────────────────

interface IndicatorConfig {
  id: string;
  label: string;
  unit: string;
  data: DatasetEntry[];
  decimals?: number;
  description: string;
}

const INDICATORS: IndicatorConfig[] = [
  {
    id: 'pib',
    label: 'PIB per cápita',
    unit: 'USD corrientes',
    data: PIB_PER_CAPITA,
    decimals: 0,
    description: 'PIB per cápita en dólares corrientes (World Bank). Colombia creció significativamente 2000–2014 pero sigue por debajo del promedio de Chile y México.',
  },
  {
    id: 'pobreza',
    label: 'Pobreza ($6.85/día)',
    unit: '% población',
    data: POBREZA,
    decimals: 1,
    description: 'Porcentaje de la población bajo la línea de $6.85/día (World Bank PIP). Colombia tuvo una caída importante 2002–2018, pero el COVID-19 revirtió parte del progreso.',
  },
  {
    id: 'homicidios',
    label: 'Tasa de homicidios',
    unit: 'x100.000 hab.',
    data: HOMICIDIOS,
    decimals: 1,
    description: 'Homicidios por 100.000 habitantes (UNODC). Colombia bajó de ~63 en 2000 a ~25 en 2023, pero sigue siendo la más alta del grupo. Chile es el referente regional.',
  },
  {
    id: 'desempleo',
    label: 'Desempleo',
    unit: '% PEA',
    data: DESEMPLEO,
    decimals: 1,
    description: 'Tasa de desempleo (OIT/World Bank). Colombia históricamente la más alta del grupo; México la más baja por estructura del mercado laboral informal.',
  },
  {
    id: 'gini',
    label: 'Coeficiente de Gini',
    unit: 'índice (0-1)',
    data: GINI,
    decimals: 3,
    description: 'Desigualdad de ingresos (World Bank). Colombia es consistentemente el país más desigual del grupo. Chile mejoró significativamente desde 2000.',
  },
  {
    id: 'gasto-educacion',
    label: 'Gasto en educación',
    unit: '% del PIB',
    data: GASTO_EDUCACION,
    decimals: 1,
    description: 'Gasto público en educación (UNESCO/OCDE). Brasil lidera el grupo (~6% PIB). Colombia ha convergido hacia el promedio regional (~5% PIB).',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Latest values table
// ─────────────────────────────────────────────────────────────────────────────

function getLatestValues(data: DatasetEntry[]): DatasetEntry {
  return data[data.length - 1];
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ComparacionRegionalClient() {
  const [selectedId, setSelectedId] = useState<string>('pib');

  const selected = INDICATORS.find((i) => i.id === selectedId)!;
  const latest = getLatestValues(selected.data);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm text-slate-500 mb-2 uppercase tracking-widest">Comparación regional</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Colombia vs. América Latina
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Comparación de indicadores clave con Chile, Brasil, México y el promedio regional.
            Datos de fuentes primarias internacionales (World Bank, UNODC, UNESCO).
          </p>
        </div>

        {/* Country legend */}
        <div className="flex flex-wrap gap-4 mb-10">
          {COUNTRIES.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: COLORS[c] }}
              />
              <span className="text-slate-300 text-sm font-medium">{c}</span>
            </div>
          ))}
        </div>

        {/* Indicator selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {INDICATORS.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedId(ind.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedId === ind.id
                  ? 'bg-amber-500 text-black'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <p className="text-slate-300 text-sm leading-relaxed">{selected.description}</p>
        </div>

        {/* Chart */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-1">
            {selected.label}
          </h2>
          <p className="text-slate-500 text-xs mb-6">{selected.unit}</p>
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={selected.data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="year"
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: 13,
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: 4 }}
                formatter={(value: unknown, name: unknown) => [
                  `${(value as number).toFixed(selected.decimals ?? 1)} ${selected.unit}`,
                  String(name),
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: 13, paddingTop: 16 }}
                formatter={(value) => (
                  <span style={{ color: COLORS[value as Country] ?? '#94a3b8' }}>{value}</span>
                )}
              />
              {COUNTRIES.map((country) => (
                <Line
                  key={country}
                  type="monotone"
                  dataKey={country}
                  stroke={COLORS[country]}
                  strokeWidth={country === 'Colombia' ? 3 : 1.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Latest values table */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-semibold">
              Últimos valores disponibles ({latest.year})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-6 py-3 text-slate-400 text-xs font-medium uppercase tracking-wider">
                    País
                  </th>
                  <th className="text-right px-6 py-3 text-slate-400 text-xs font-medium uppercase tracking-wider">
                    {selected.label}
                  </th>
                  <th className="text-right px-6 py-3 text-slate-400 text-xs font-medium uppercase tracking-wider hidden md:table-cell">
                    Unidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {COUNTRIES.map((country) => {
                  const value = latest[country];
                  const isCol = country === 'Colombia';
                  return (
                    <tr
                      key={country}
                      className={`border-b border-slate-800/50 transition-colors ${
                        isCol ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: COLORS[country] }}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isCol ? 'text-amber-400' : 'text-slate-200'
                            }`}
                          >
                            {country}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-sm font-mono ${
                            isCol ? 'text-amber-400 font-semibold' : 'text-slate-200'
                          }`}
                        >
                          {value.toFixed(selected.decimals ?? 1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right hidden md:table-cell">
                        <span className="text-slate-500 text-xs">{selected.unit}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-slate-600 text-xs text-center mt-8">
          Fuentes: World Bank Open Data, UNODC, UNESCO Institute for Statistics, OIT/ILO. Los datos son estimaciones que pueden diferir levemente según la metodología utilizada.
        </p>
      </div>
    </div>
  );
}
