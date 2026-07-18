'use client';

import type { ReactElement } from 'react';

type ChartKind = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';

export function IELTSLineGraphVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    {
      title: 'Internet access in three regions, 2000-2020',
      years: [2000, 2005, 2010, 2015, 2020],
      yMax: 100,
      unit: '%',
      series: [
        { label: 'Region A', color: '#0f3d8c', values: [30, 48, 61, 77, 88] },
        { label: 'Region B', color: '#059669', values: [12, 26, 45, 63, 79] },
        { label: 'Region C', color: '#d97706', values: [6, 10, 22, 38, 57] },
      ],
    },
    {
      title: 'Public transport trips, 2010-2025',
      years: [2010, 2013, 2016, 2019, 2022, 2025],
      yMax: 90,
      unit: 'm',
      series: [
        { label: 'Metro', color: '#0f3d8c', values: [40, 46, 53, 61, 58, 74] },
        { label: 'Bus', color: '#059669', values: [70, 68, 65, 59, 52, 48] },
        { label: 'Tram', color: '#7c3aed', values: [15, 22, 34, 45, 49, 60] },
      ],
    },
    {
      title: 'Urban cycling in three districts, 2008-2023',
      years: [2008, 2012, 2016, 2020, 2023],
      yMax: 60,
      unit: '%',
      series: [
        { label: 'North', color: '#0f3d8c', values: [12, 18, 29, 41, 55] },
        { label: 'Central', color: '#059669', values: [45, 43, 40, 38, 36] },
        { label: 'South', color: '#7c3aed', values: [20, 25, 24, 32, 46] },
      ],
    },
    {
      title: 'Weekly library visits by group, 2012-2022',
      years: [2012, 2014, 2016, 2018, 2020, 2022],
      yMax: 90,
      unit: 'k',
      series: [
        { label: 'Students', color: '#0f3d8c', values: [80, 78, 76, 75, 75, 74] },
        { label: 'Families', color: '#059669', values: [30, 36, 44, 53, 58, 62] },
        { label: 'Retirees', color: '#d97706', values: [55, 52, 48, 44, 42, 40] },
      ],
    },
    {
      title: 'Renewable energy share in three regions, 2005-2025',
      years: [2005, 2010, 2015, 2020, 2025],
      yMax: 60,
      unit: '%',
      series: [
        { label: 'Region A', color: '#0f3d8c', values: [18, 24, 31, 40, 52] },
        { label: 'Region B', color: '#059669', values: [42, 39, 36, 30, 25] },
        { label: 'Region C', color: '#dc2626', values: [12, 13, 18, 27, 39] },
      ],
    },
  ];
  const data = datasets[variant % datasets.length];
  const W = 560, H = 270;
  const pad = { top: 36, right: 22, bottom: 42, left: 48 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const x = (i: number) => pad.left + (cw / (data.years.length - 1)) * i;
  const y = (v: number) => pad.top + ch - (v / data.yMax) * ch;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }} role="img" aria-label={data.title} focusable="false">
      <desc>{data.title}. {data.series.map((serie) => `${serie.label} moves from ${serie.values[0]}${data.unit} to ${serie.values[serie.values.length - 1]}${data.unit}`).join('; ')}.</desc>
      <text x={pad.left} y="18" fontSize="13" fontWeight="800" fill="var(--ink)">{data.title}</text>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line x1={pad.left} x2={W - pad.right} y1={y(f * data.yMax)} y2={y(f * data.yMax)} stroke="var(--line-soft)" />
          <text x={pad.left - 8} y={y(f * data.yMax) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{Math.round(f * data.yMax)}{data.unit}</text>
        </g>
      ))}
      {data.years.map((year, i) => <text key={year} x={x(i)} y={H - 12} textAnchor="middle" fontSize="10" fill="var(--muted)">{year}</text>)}
      {data.series.map((serie) => {
        const points = serie.values.map((value, i) => `${x(i)},${y(value)}`).join(' ');
        return (
          <g key={serie.label}>
            <polyline points={points} fill="none" stroke={serie.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {serie.values.map((value, i) => <circle key={i} cx={x(i)} cy={y(value)} r="4" fill={serie.color} />)}
          </g>
        );
      })}
      <line x1={pad.left} x2={pad.left} y1={pad.top} y2={H - pad.bottom + 2} stroke="var(--ink-2)" />
      <line x1={pad.left} x2={W - pad.right} y1={H - pad.bottom + 2} y2={H - pad.bottom + 2} stroke="var(--ink-2)" />
      {data.series.map((serie, i) => (
        <g key={serie.label}>
          <rect x={pad.left + i * 110} y="238" width="16" height="4" fill={serie.color} rx="2" />
          <text x={pad.left + 22 + i * 110} y="244" fontSize="10" fill="var(--muted)">{serie.label}</text>
        </g>
      ))}
    </svg>
  );
}

export function IELTSBarChartVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    { title: 'Household expenditure by category, 2024 (%)', labels: ['Housing', 'Food', 'Transport', 'Leisure', 'Health'], values: [32, 18, 16, 21, 13], max: 36, ticks: [0, 10, 20, 30], unit: '%' },
    { title: 'Students choosing university facilities, 2018 (%)', labels: ['Library', 'Gym', 'Cafeteria', 'Labs', 'Clubs'], values: [74, 61, 48, 39, 28], max: 80, ticks: [0, 20, 40, 60, 80], unit: '%' },
    { title: 'Average daily screen time by age group, 2023 (hours)', labels: ['16-24', '25-34', '35-44', '45-54', '55+'], values: [5.8, 4.9, 3.8, 2.9, 2.1], max: 6, ticks: [0, 2, 4, 6], unit: 'h' },
    { title: 'Annual visitors to four museums, 2010 (millions)', labels: ['Museum A', 'Museum B', 'Museum C', 'Museum D'], values: [2.4, 1.8, 1.2, 0.7], max: 3, ticks: [0, 1, 2, 3], unit: 'm' },
    { title: 'Water use in five sectors, 2005 (billion litres)', labels: ['Agriculture', 'Industry', 'Homes', 'Energy', 'Other'], values: [46, 31, 18, 14, 9], max: 50, ticks: [0, 10, 20, 30, 40, 50], unit: 'bn L' },
  ];
  const data = datasets[variant % datasets.length];
  const labels = data.labels;
  const values = data.values;
  const colors = ['#0f3d8c', '#059669', '#7c3aed', '#d97706', '#dc2626'];
  const max = data.max;
  const y = (v: number) => 220 - (v / max) * 160;
  return (
    <svg viewBox="0 0 560 270" style={{ width: '100%', display: 'block' }} role="img" aria-label={data.title} focusable="false">
      <desc>{data.title}. The values are {data.labels.map((label, index) => `${label}: ${data.values[index]}${data.unit}`).join(', ')}.</desc>
      <text x="50" y="20" fontSize="13" fontWeight="800" fill="var(--ink)">{data.title}</text>
      {data.ticks.map((tick) => (
        <g key={tick}>
          <line x1="52" x2="520" y1={y(tick)} y2={y(tick)} stroke="var(--line-soft)" />
          <text x="44" y={y(tick) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{tick}{data.unit}</text>
        </g>
      ))}
      {values.map((value, i) => (
        <g key={labels[i]}>
          <rect x={76 + i * 90} y={y(value)} width="52" height={220 - y(value)} fill={colors[i]} rx="5" opacity="0.88" />
          <text x={102 + i * 90} y={y(value) - 7} textAnchor="middle" fontSize="10" fontWeight="800" fill={colors[i]}>{value}{data.unit}</text>
          <text x={102 + i * 90} y="243" textAnchor="middle" fontSize="10" fill="var(--muted)">{labels[i]}</text>
        </g>
      ))}
      <line x1="52" x2="52" y1="60" y2="222" stroke="var(--ink-2)" />
      <line x1="52" x2="522" y1="222" y2="222" stroke="var(--ink-2)" />
    </svg>
  );
}

export function IELTSPieChartVisual({ variant = 0 }: { variant?: number }) {
  type PieData = [string, number][];
  const datasets = [
    { title: 'Energy production by source, 2025', charts: [{ label: '2025', data: [['Solar', 34], ['Wind', 28], ['Hydro', 22], ['Other', 16]] as PieData }] },
    { title: 'Household spending by category, 2000 and 2020', charts: [{ label: '2000', data: [['Housing', 22], ['Food', 31], ['Transport', 17], ['Other', 30]] as PieData }, { label: '2020', data: [['Housing', 31], ['Food', 24], ['Transport', 19], ['Other', 26]] as PieData }] },
    { title: 'Reasons for choosing online courses, 2024', data: [['Flexibility', 42], ['Cost', 27], ['Access', 18], ['Other', 13]] },
    { title: 'Visitors to a national park by season', data: [['Summer', 28], ['Spring', 25], ['Autumn', 24], ['Winter', 23]] },
    { title: 'Electricity generation in two countries', charts: [{ label: 'Country A', data: [['Gas', 36], ['Coal', 24], ['Nuclear', 22], ['Renewables', 18]] as PieData }, { label: 'Country B', data: [['Gas', 18], ['Coal', 40], ['Nuclear', 16], ['Renewables', 26]] as PieData }] },
  ];
  const selected = datasets[variant % datasets.length];
  const charts = 'charts' in selected && selected.charts ? selected.charts : [{ label: '', data: selected.data as PieData }];
  const colors = ['#0f3d8c', '#059669', '#7c3aed', '#d97706'];
  const piePath = (value: number, start: number, cx: number, cy: number) => {
    const sweep = value * 3.6;
    const end = start + sweep;
    const r = 82;
    const p = (deg: number) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy + r * Math.sin((deg * Math.PI) / 180) });
    const a = p(start), b = p(end);
    return { d: `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${b.x} ${b.y} Z`, end };
  };
  return (
    <svg viewBox="0 0 720 300" style={{ width: '100%', maxWidth: 720, display: 'block' }} role="img" aria-label={selected.title} focusable="false">
      <desc>{selected.title}. {charts.map((chart) => `${chart.label || 'The chart'} shows ${chart.data.map(([label, value]) => `${label} at ${value}%`).join(', ')}`).join('. ')}.</desc>
      <text x="36" y="22" fontSize="13" fontWeight="800" fill="var(--ink)">{selected.title}</text>
      {charts.map((chart, chartIndex) => {
        let angle = -90;
        const cx = charts.length > 1 ? 165 + chartIndex * 240 : 165;
        const entries = chart.data.map(([label, value], i) => ({ label, value, color: colors[i] }));
        return <g key={chart.label || chartIndex}><text x={cx} y="55" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--ink-2)">{chart.label}</text>{entries.map((d) => { const segment = piePath(d.value, angle, cx, 148); angle = segment.end; return <path key={d.label} d={segment.d} fill={d.color} opacity="0.88" />; })}</g>;
      })}
      <g transform="translate(510 60)">{charts[0].data.map(([label, value], i) => <g key={label}><rect y={i * 30} width="12" height="12" fill={colors[i]} rx="2" /><text x="20" y={i * 30 + 10} fontSize="12" fill="var(--ink-2)">{label}: {value}%</text></g>)}</g>
    </svg>
  );
}

export function IELTSTableVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    { caption: 'Daily social media use by age group, 2023', headers: ['Age group', 'USA', 'Canada', 'Australia'], rows: [['18-24', '92%', '84%', '73%'], ['25-34', '86%', '78%', '66%'], ['35-44', '71%', '62%', '51%'], ['45+', '48%', '39%', '32%']] },
    { caption: 'International students by subject, 2015 and 2025', headers: ['Subject', '2015', '2020', '2025'], rows: [['Business', '420', '510', '690'], ['Engineering', '310', '390', '560'], ['Arts', '260', '275', '310'], ['Science', '180', '240', '380']] },
    { caption: 'Average commuting time in four cities (minutes)', headers: ['City', 'Car', 'Bus', 'Train'], rows: [['Bristol', '38', '52', '45'], ['Leeds', '35', '48', '41'], ['Oxford', '29', '44', '37'], ['York', '27', '39', '34']] },
    { caption: 'Tourist satisfaction ratings by facility, 2024', headers: ['Facility', 'Excellent', 'Good', 'Poor'], rows: [['Accommodation', '62%', '29%', '9%'], ['Transport', '41%', '38%', '21%'], ['Food', '55%', '34%', '11%'], ['Guides', '68%', '25%', '7%']] },
    { caption: 'Household recycling rates by material, 2010 and 2020', headers: ['Material', '2010', '2015', '2020'], rows: [['Paper', '52%', '64%', '73%'], ['Glass', '38%', '49%', '61%'], ['Plastic', '18%', '31%', '46%'], ['Metal', '44%', '55%', '67%']] },
  ];
  const selected = datasets[variant % datasets.length];
  const rows = selected.rows;
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--line-soft)', borderRadius: 8 }}>
      <table aria-label={selected.caption} style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420, background: 'var(--bg)' }}>
        <caption style={{ textAlign: 'left', padding: '0.7rem 0.8rem', fontWeight: 800, color: 'var(--ink)' }}>
          {selected.caption}
        </caption>
        <thead>
          <tr>{selected.headers.map((h) => <th key={h} style={{ padding: '0.65rem', color: '#0f3d8c', textAlign: 'left', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell} style={{ padding: '0.65rem', borderBottom: '1px solid var(--line-soft)', color: 'var(--ink-2)' }}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function SvgLines({ x, y, lines, size = 11, color = 'var(--muted)', weight = 500, lineHeight = 14 }: { x: number; y: number; lines: string[]; size?: number; color?: string; weight?: number; lineHeight?: number }) {
  return <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color}>{lines.map((line, index) => <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : lineHeight}>{line}</tspan>)}</text>;
}

function ProcessIcon({ variant, x, y, color }: { variant: number; x: number; y: number; color: string }) {
  if (variant === 1) return <g transform={`translate(${x} ${y})`}><circle cx="16" cy="17" r="12" fill="#b45309" /><circle cx="29" cy="12" r="9" fill="#d97706" /><path d="M8 29 C18 24, 31 28, 38 36" fill="none" stroke="#166534" strokeWidth="4" strokeLinecap="round" /><path d="M12 35 H37" stroke="#a16207" strokeWidth="3" /></g>;
  if (variant === 2) return <g transform={`translate(${x} ${y})`}><path d="M22 3 C22 3, 8 18, 8 27 A14 14 0 0 0 36 27 C36 18, 22 3, 22 3Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" /><path d="M16 27 C20 31, 27 31, 31 26" fill="none" stroke="#e0f2fe" strokeWidth="2" /></g>;
  if (variant === 3) return <g transform={`translate(${x} ${y})`}><path d="M5 15 H38 V36 H5Z" fill="#c2410c" stroke="#9a3412" strokeWidth="2" /><path d="M5 15 L12 8 H45 L38 15Z" fill="#f97316" stroke="#9a3412" strokeWidth="2" /><path d="M17 15 V36 M29 15 V36 M5 25 H38" stroke="#fed7aa" strokeWidth="2" /></g>;
  if (variant === 4) return <g transform={`translate(${x} ${y})`}><ellipse cx="23" cy="22" rx="14" ry="11" fill="#facc15" stroke="#a16207" strokeWidth="2" /><path d="M15 14 L9 4 C17 2, 21 8, 21 14 M28 13 L35 4 C40 10, 36 16, 31 18" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" /><path d="M16 14 V31 M24 12 V33 M32 16 V29" stroke="#713f12" strokeWidth="3" /><circle cx="37" cy="22" r="2" fill="#1f2937" /></g>;
  return <g transform={`translate(${x} ${y})`}><path d="M13 7 H30 L34 13 V37 H9 V13Z" fill="#bfdbfe" stroke={color} strokeWidth="2" /><path d="M17 7 V14 H31" fill="none" stroke={color} strokeWidth="2" /><path d="M15 23 H29 M15 29 H29" stroke={color} strokeWidth="2" /></g>;
}

export function IELTSProcessDiagramVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    { title: 'How plastic bottles are recycled', steps: [['Collection', 'Used bottles are collected from public bins.'], ['Sorting', 'Plastic is separated at a recycling centre.'], ['Washing', 'Bottles are cleaned before being cut into flakes.'], ['Melting', 'The flakes are heated into plastic pellets.'], ['Manufacturing', 'The pellets become new products.']] },
    { title: 'How coffee is prepared for sale', steps: [['Harvesting', 'Ripe cherries are picked from coffee plants.'], ['Drying', 'The cherries are spread out in the sun.'], ['Removing skins', 'The outer layers are removed from the fruit.'], ['Roasting', 'The beans are heated to the desired colour.'], ['Packaging', 'The beans are ground and packed for sale.']] },
    { title: 'How bottled water is produced', steps: [['Extraction', 'Water is taken from an underground spring.'], ['Filtering', 'Unwanted particles are removed from the water.'], ['Purification', 'The water is treated to make it safe.'], ['Bottling', 'Clean water is poured into bottles.'], ['Distribution', 'The bottles are labelled and sent to shops.']] },
    { title: 'How bricks are manufactured', steps: [['Digging', 'Clay is removed from the ground.'], ['Crushing', 'The clay is broken into smaller pieces.'], ['Moulding', 'The material is shaped into bricks.'], ['Drying', 'The bricks are left in a drying chamber.'], ['Firing', 'They are heated in a kiln before delivery.']] },
    { title: 'Honey bee life cycle', steps: [['Egg', 'The queen lays eggs inside hive cells.'], ['Larva', 'The eggs hatch and become larvae.'], ['Pupa', 'The larvae develop inside sealed cells.'], ['Adult', 'Fully grown bees emerge from the cells.'], ['Colony', 'Adults feed the young and maintain the hive.']] },
  ];
  const data = datasets[variant % datasets.length];
  const palette = ['#0f3d8c', '#059669', '#7c3aed', '#d97706', '#dc2626'];
  const positions = [[34, 132], [245, 132], [456, 132], [456, 352], [245, 352]];
  const lines = data.steps.map(([, text]) => text.match(/.{1,34}(?:\s|$)/g)?.map(line => line.trim()).slice(0, 2) ?? [text]);
  return (
    <div style={{ width: '100%' }}>
      <style>{`.task1-visual-mobile{display:none}@media(max-width:640px){.task1-visual-wide{display:none!important}.task1-visual-mobile{display:block!important}}`}</style>
    <svg className="task1-visual-wide" viewBox="0 0 720 570" style={{ width: '100%', minWidth: 640, display: 'block' }} role="img" aria-label={data.title} focusable="false">
      <desc>{data.title}. A five-stage {variant === 4 ? 'cyclical life cycle' : 'process'} from {data.steps[0][0]} to {data.steps[4][0]}.</desc>
      <defs><marker id={`arrow-task1-process-${variant}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#0f3d8c" /></marker></defs>
      <rect x="10" y="10" width="700" height="550" rx="18" fill="var(--bg)" stroke="var(--line-soft)" />
      <rect x="10" y="10" width="700" height="70" rx="18" fill="rgba(15,61,140,0.07)" />
      <text x="32" y="43" fontSize="17" fontWeight="900" fill="var(--ink)">{data.title}</text>
      <text x="32" y="64" fontSize="10" fontWeight="800" letterSpacing="1.3" fill="var(--muted)">{variant === 4 ? 'CYCLICAL LIFE CYCLE' : 'LINEAR SEQUENCE OF STAGES'} · IELTS ACADEMIC TASK 1 VISUAL</text>
      {data.steps.map((step, i) => { const [x, y] = positions[i]; const color = palette[i]; return <g key={step[0]}>
        <rect x={x} y={y} width="180" height="146" rx="15" fill="var(--bg)" stroke="var(--line-soft)" />
        <rect x={x} y={y} width="180" height="8" rx="4" fill={color} />
        <circle cx={x + 27} cy={y + 35} r="17" fill={color} /><text x={x + 27} y={y + 40} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">{i + 1}</text>
        <ProcessIcon variant={variant} x={x + 112} y={y + 12} color={color} />
        <SvgLines x={x + 18} y={y + 77} lines={step[0].match(/.{1,22}(?:\s|$)/g)?.map(line => line.trim()).slice(0, 2) ?? [step[0]]} size={13} color="var(--ink)" weight={900} lineHeight={15} />
        <SvgLines x={x + 18} y={y + 111} lines={lines[i]} size={10} color="var(--muted)" lineHeight={13} />
      </g>; })}
      <line x1="214" y1="205" x2="238" y2="205" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-process-${variant})`} />
      <line x1="425" y1="205" x2="449" y2="205" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-process-${variant})`} />
      <path d="M546 278 V334" fill="none" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-process-${variant})`} />
      <line x1="449" y1="425" x2="425" y2="425" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-process-${variant})`} />
      {variant === 4 && <path d="M245 425 C145 510, 90 300, 126 275" fill="none" stroke="#059669" strokeWidth="2.5" strokeDasharray="7 6" markerEnd={`url(#arrow-task1-process-${variant})`} />}
      <text x="32" y="535" fontSize="10" fill="var(--muted)">Describe the stages in order; do not add causes or opinions that the visual does not show.</text>
    </svg>
    <svg className="task1-visual-mobile" viewBox="0 0 360 850" style={{ width: '100%', display: 'none' }} role="img" aria-label={`${data.title}, mobile process view`} focusable="false">
      <desc>{data.title}. The five stages are shown in a vertical sequence for narrow screens.</desc>
      <defs><marker id={`arrow-task1-process-mobile-${variant}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#0f3d8c" /></marker></defs>
      <rect x="8" y="8" width="344" height="834" rx="16" fill="var(--bg)" stroke="var(--line-soft)" />
      <rect x="8" y="8" width="344" height="74" rx="16" fill="rgba(15,61,140,0.07)" />
      <SvgLines x={24} y={38} lines={data.title.match(/.{1,30}(?:\s|$)/g)?.map(line => line.trim()).slice(0, 2) ?? [data.title]} size={15} color="var(--ink)" weight={900} lineHeight={18} />
      <text x="24" y="70" fontSize="9" fontWeight="800" letterSpacing="1" fill="var(--muted)">{variant === 4 ? 'CYCLICAL LIFE CYCLE' : 'LINEAR PROCESS'} · IELTS TASK 1</text>
      {data.steps.map((step, i) => { const y = 104 + i * 143; const color = palette[i]; return <g key={step[0]}>
        <rect x="24" y={y} width="312" height="118" rx="14" fill="var(--bg)" stroke="var(--line-soft)" />
        <rect x="24" y={y} width="312" height="7" rx="4" fill={color} />
        <circle cx="49" cy={y + 32} r="16" fill={color} /><text x="49" y={y + 37} textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">{i + 1}</text>
        <ProcessIcon variant={variant} x={267} y={y + 10} color={color} />
        <SvgLines x={76} y={y + 39} lines={step[0].match(/.{1,25}(?:\s|$)/g)?.map(line => line.trim()).slice(0, 2) ?? [step[0]]} size={13} color="var(--ink)" weight={900} lineHeight={15} />
        <SvgLines x={40} y={y + 76} lines={step[1].match(/.{1,43}(?:\s|$)/g)?.map(line => line.trim()).slice(0, 2) ?? [step[1]]} size={10} color="var(--muted)" lineHeight={13} />
        {i < 4 && <line x1="180" y1={y + 119} x2="180" y2={y + 138} stroke="#0f3d8c" strokeWidth="2.5" markerEnd={`url(#arrow-task1-process-mobile-${variant})`} />}
      </g>; })}
      {variant === 4 && <path d="M32 786 C8 820, 10 98, 44 96" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="6 5" markerEnd={`url(#arrow-task1-process-mobile-${variant})`} />}
      <text x="24" y="830" fontSize="9" fill="var(--muted)">Report the stages in order; do not add unsupported causes.</text>
    </svg>
    </div>
  );
}

export function IELTSMapDiagramVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    { title: 'Town centre changes, 1990-2020', beforeLabel: '1990', afterLabel: '2020', before: ['Park', 'Factory', 'Small road', 'Car park'], after: ['Housing estate', 'School', 'Dual carriageway', 'Shopping centre'] },
    { title: 'University campus development, 1995-2025', beforeLabel: '1995', afterLabel: '2025', before: ['Lecture hall', 'Garden', 'Car park', 'Sports field'], after: ['Library', 'Student flats', 'Cycle path', 'Sports centre'] },
    { title: 'Coastal village changes, 2000-2025', beforeLabel: '2000', afterLabel: '2025', before: ['Fishing harbour', 'Fields', 'Narrow road', 'Cottages'], after: ['Marina', 'Holiday resort', 'Main road', 'Apartments'] },
    { title: 'Park changes, 1980-2020', beforeLabel: '1980', afterLabel: '2020', before: ['Woodland', 'Pond', 'Footpath', 'Rose garden'], after: ['Playground', 'Cafe', 'Cycle track', 'Open-air stage'] },
    { title: 'Shopping centre redevelopment', beforeLabel: 'Before', afterLabel: 'After', before: ['Small shops', 'Bus stop', 'Market', 'Car park'], after: ['Department store', 'Taxi rank', 'Food court', 'Multi-storey car park'] },
  ];
  const data = datasets[variant % datasets.length];
  const cellsBefore = data.before.map((label, i) => [label, ['#dcfce7', '#fee2e2', '#e5e7eb', '#dbeafe'][i]]);
  const cellsAfter = data.after.map((label, i) => [label, ['#fef3c7', '#dbeafe', '#e5e7eb', '#ede9fe'][i]]);
  const Feature = ({ label, x, y, after }: { label: string; x: number; y: number; after: boolean }) => {
    const lower = label.toLowerCase();
    const lines = label.match(/.{1,17}(?:\s|$)/g)?.map(line => line.trim()).slice(0, 2) ?? [label];
    const tone = after ? '#0f3d8c' : '#64748b';
    const isGreen = /park|garden|woodland|fields|pond/.test(lower);
    const isRoad = /road|path|carriageway/.test(lower);
    const isWater = /harbour|marina/.test(lower);
    return <g>
      <rect x={x} y={y} width="144" height="92" rx="12" fill={after ? '#f8fbff' : '#fff'} stroke={after ? 'rgba(15,61,140,0.35)' : 'var(--line-soft)'} />
      {isGreen ? <path d={`M${x + 17} ${y + 25} C${x + 35} ${y + 8}, ${x + 55} ${y + 15}, ${x + 68} ${y + 30} C${x + 56} ${y + 52}, ${x + 31} ${y + 55}, ${x + 17} ${y + 25}`} fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" /> : isRoad ? <g><path d={`M${x + 15} ${y + 30} H${x + 75}`} stroke="#94a3b8" strokeWidth="14" /><path d={`M${x + 15} ${y + 30} H${x + 75}`} stroke="#fff" strokeWidth="2" strokeDasharray="7 5" /></g> : isWater ? <path d={`M${x + 14} ${y + 34} C${x + 28} ${y + 22}, ${x + 42} ${y + 46}, ${x + 56} ${y + 34} S${x + 84} ${y + 22}, ${x + 104} ${y + 34}`} fill="none" stroke="#0284c7" strokeWidth="10" /> : <g><rect x={x + 18} y={y + 18} width="58" height="37" rx="4" fill={after ? '#bfdbfe' : '#e2e8f0'} stroke={tone} strokeWidth="1.5" /><path d={`M${x + 14} ${y + 18} L${x + 47} ${y + 5} L${x + 80} ${y + 18}`} fill={after ? '#93c5fd' : '#cbd5e1'} stroke={tone} strokeWidth="1.5" /><rect x={x + 42} y={y + 39} width="10" height="16" fill="#fff" stroke={tone} /></g>}
      <SvgLines x={x + 82} y={y + 28} lines={lines} size={10} color="var(--ink-2)" weight={800} lineHeight={12} />
    </g>;
  };
  const MapGrid = ({ title, cells, side }: { title: string; cells: string[][]; side: 'left' | 'right' }) => {
    const baseX = side === 'left' ? 34 : 514;
    return <g>
      <text x={baseX + 12} y="84" fontSize="16" fontWeight="900" fill="var(--ink)">{title}</text>
      <rect x={baseX} y="98" width="432" height="326" rx="16" fill={side === 'left' ? 'rgba(100,116,139,0.035)' : 'rgba(15,61,140,0.035)'} stroke="var(--line-soft)" />
      <path d={`M${baseX + 12} 260 H${baseX + 420} M${baseX + 216} 110 V412`} stroke="#cbd5e1" strokeWidth="24" />
      <path d={`M${baseX + 12} 260 H${baseX + 420} M${baseX + 216} 110 V412`} stroke="var(--bg)" strokeWidth="2" strokeDasharray="9 7" />
      <path d={`M${baseX + 48} 120 V400 M${baseX + 384} 120 V400`} stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 7" />
      {cells.map((cell, i) => <Feature key={cell[0]} label={cell[0]} x={baseX + 22 + (i % 2) * 198} y={126 + Math.floor(i / 2) * 138} after={side === 'right'} />)}
      <g transform={`translate(${baseX + 376} 112)`}><text x="0" y="0" fontSize="11" fontWeight="900" fill="#0f3d8c">N</text><path d="M5 7 V34" stroke="#0f3d8c" strokeWidth="2" markerEnd={`url(#arrow-task1-map-${variant})`} /></g>
    </g>;
  };
  return (
    <div style={{ width: '100%' }}>
      <style>{`.task1-map-mobile{display:none}@media(max-width:640px){.task1-map-wide{display:none!important}.task1-map-mobile{display:block!important}}`}</style>
    <svg className="task1-map-wide" viewBox="0 0 980 520" style={{ width: '100%', minWidth: 900, display: 'block' }} role="img" aria-label={data.title} focusable="false">
      <desc>{data.title}. The map compares {data.beforeLabel} with {data.afterLabel}; the labelled land uses and transport features are shown in the two panels.</desc>
      <defs>
        <marker id={`arrow-task1-map-${variant}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#0f3d8c" />
        </marker>
      </defs>
      <rect x="16" y="16" width="948" height="488" rx="18" fill="var(--bg)" stroke="var(--line-soft)" />
      <rect x="16" y="16" width="948" height="58" rx="18" fill="rgba(15,61,140,0.07)" />
      <text x="40" y="48" fontSize="17" fontWeight="900" fill="var(--ink)">{data.title}</text>
      <text x="40" y="66" fontSize="10" fontWeight="800" letterSpacing="1.2" fill="var(--muted)">BEFORE / AFTER MAP · LOCATION, CHANGE AND COMPARISON</text>
      <MapGrid title={data.beforeLabel} side="left" cells={cellsBefore} />
      <MapGrid title={data.afterLabel} side="right" cells={cellsAfter} />
      <path d="M 470 260 L 505 260" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-map-${variant})`} />
      <g transform="translate(42 454)"><rect x="0" y="0" width="14" height="14" rx="3" fill="#e2e8f0" stroke="#64748b" /><text x="22" y="11" fontSize="10" fill="var(--muted)">earlier feature</text><rect x="154" y="0" width="14" height="14" rx="3" fill="#dbeafe" stroke="#0f3d8c" /><text x="176" y="11" fontSize="10" fill="var(--muted)">later feature</text><rect x="304" y="0" width="14" height="14" rx="3" fill="#cbd5e1" stroke="#64748b" /><text x="326" y="11" fontSize="10" fill="var(--muted)">road or context</text></g>
      <text x="42" y="492" fontSize="10" fill="var(--muted)">Use location, direction and change language; report only features supported by the maps.</text>
    </svg>
    <svg className="task1-map-mobile" viewBox="0 0 360 900" style={{ width: '100%', display: 'none' }} role="img" aria-label={`${data.title}, mobile before and after map`} focusable="false">
      <desc>{data.title}. The before and after panels are stacked vertically for narrow screens.</desc>
      <defs><marker id={`arrow-task1-map-mobile-${variant}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#0f3d8c" /></marker></defs>
      <rect x="8" y="8" width="344" height="884" rx="16" fill="var(--bg)" stroke="var(--line-soft)" />
      <text x="24" y="38" fontSize="15" fontWeight="900" fill="var(--ink)">{data.title}</text>
      <text x="24" y="58" fontSize="9" fontWeight="800" letterSpacing="1" fill="var(--muted)">BEFORE / AFTER MAP · IELTS TASK 1</text>
      <rect x="20" y="82" width="320" height="320" rx="15" fill="rgba(100,116,139,0.035)" stroke="var(--line-soft)" />
      <text x="32" y="108" fontSize="15" fontWeight="900" fill="var(--ink)">{data.beforeLabel}</text>
      <path d="M28 242 H332 M180 92 V392" stroke="#cbd5e1" strokeWidth="22" /><path d="M28 242 H332 M180 92 V392" stroke="var(--bg)" strokeWidth="2" strokeDasharray="9 7" />
      {cellsBefore.map((cell, i) => <Feature key={cell[0]} label={cell[0]} x={30 + (i % 2) * 154} y={132 + Math.floor(i / 2) * 124} after={false} />)}
      <path d="M180 416 V478" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-map-mobile-${variant})`} />
      <rect x="20" y="500" width="320" height="320" rx="15" fill="rgba(15,61,140,0.035)" stroke="var(--line-soft)" />
      <text x="32" y="526" fontSize="15" fontWeight="900" fill="var(--ink)">{data.afterLabel}</text>
      <path d="M28 660 H332 M180 510 V810" stroke="#cbd5e1" strokeWidth="22" /><path d="M28 660 H332 M180 510 V810" stroke="var(--bg)" strokeWidth="2" strokeDasharray="9 7" />
      {cellsAfter.map((cell, i) => <Feature key={cell[0]} label={cell[0]} x={30 + (i % 2) * 154} y={550 + Math.floor(i / 2) * 124} after />)}
      <text x="24" y="852" fontSize="9" fill="var(--muted)">Compare location, direction and change. Report only supported features.</text>
    </svg>
    </div>
  );
}

export function IELTSMixedVisual({ variant = 0 }: { variant?: number }) {
  return (
    <div
      role="img"
      aria-label="Mixed IELTS Academic Writing Task 1 visual combining a line graph and a bar chart"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', alignItems: 'start' }}
    >
      <div style={{ minWidth: 0 }}><IELTSLineGraphVisual variant={variant} /></div>
      <div style={{ minWidth: 0 }}><IELTSBarChartVisual variant={variant} /></div>
    </div>
  );
}

export function IELTSVocabularyTrendVisual({
  subject,
  from,
  to,
  unit,
  yearFrom,
  yearTo,
}: {
  subject: string;
  from: number;
  to: number;
  unit: string;
  yearFrom: number;
  yearTo: number;
}) {
  const W = 560;
  const H = 250;
  const pad = { top: 40, right: 30, bottom: 48, left: 58 };
  const max = Math.max(from, to, 1) * 1.18;
  const chartHeight = 132;
  const y = (value: number) => pad.top + chartHeight - (value / max) * chartHeight;
  const points = [{ year: yearFrom, value: from }, { year: yearTo, value: to }];
  const increase = to > from;
  const stable = Math.abs(to - from) / Math.max(from, 1) < 0.05;
  const color = stable ? '#0f3d8c' : increase ? '#059669' : '#dc2626';
  const valueLabel = (value: number) => `${unit === '£' ? '£' : ''}${value.toLocaleString('en-GB')}${unit === '£' ? '' : ` ${unit}`}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }} role="img" aria-label={`${subject} from ${yearFrom} to ${yearTo}`} focusable="false">
      <desc>{subject} changes from {valueLabel(from)} in {yearFrom} to {valueLabel(to)} in {yearTo}.</desc>
      <text x={pad.left} y="20" fontSize="13" fontWeight="800" fill="var(--ink)">{subject}</text>
      <text x={pad.left} y="34" fontSize="10" fill="var(--muted)">Vocabulary focus: direction and intensity</text>
      {[0, 0.5, 1].map((fraction) => (
        <g key={fraction}>
          <line x1={pad.left} x2={W - pad.right} y1={y(max * fraction)} y2={y(max * fraction)} stroke="var(--line-soft)" />
          <text x={pad.left - 8} y={y(max * fraction) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{valueLabel(Math.round(max * fraction))}</text>
        </g>
      ))}
      <polyline points={`${pad.left},${y(from)} ${W - pad.right},${y(to)}`} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {points.map((point, index) => (
        <g key={point.year}>
          <circle cx={index === 0 ? pad.left : W - pad.right} cy={y(point.value)} r="6" fill={color} />
          <text x={index === 0 ? pad.left : W - pad.right} y={y(point.value) - 12} textAnchor="middle" fontSize="11" fontWeight="800" fill={color}>{valueLabel(point.value)}</text>
          <text x={index === 0 ? pad.left : W - pad.right} y={H - 18} textAnchor="middle" fontSize="10" fill="var(--muted)">{point.year}</text>
        </g>
      ))}
      <line x1={pad.left} x2={pad.left} y1={pad.top} y2={H - pad.bottom} stroke="var(--ink-2)" />
      <line x1={pad.left} x2={W - pad.right} y1={H - pad.bottom} y2={H - pad.bottom} stroke="var(--ink-2)" />
      <text x={W - pad.right} y={H - 3} textAnchor="end" fontSize="10" fontWeight="800" fill={color}>{stable ? 'stable' : increase ? 'increase' : 'decrease'}</text>
    </svg>
  );
}

export const TASK1_VISUALS: Record<ChartKind, { label: string; component: (props?: any) => ReactElement }> = {
  line: { label: 'Line graph', component: IELTSLineGraphVisual },
  bar: { label: 'Bar chart', component: IELTSBarChartVisual },
  pie: { label: 'Pie charts', component: IELTSPieChartVisual },
  table: { label: 'Table', component: IELTSTableVisual },
  process: { label: 'Process diagram', component: IELTSProcessDiagramVisual },
  map: { label: 'Map', component: IELTSMapDiagramVisual },
};
