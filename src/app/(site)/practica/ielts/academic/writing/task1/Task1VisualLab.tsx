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
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }} role="img" aria-label={data.title}>
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
    <svg viewBox="0 0 560 270" style={{ width: '100%', display: 'block' }} role="img" aria-label={data.title}>
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
    { title: 'Electricity generation in two countries', charts: [{ label: 'Country A', data: [['Gas', 36], ['Coal', 24], ['Nuclear', 22], ['Renewables', 18]] as PieData }, { label: 'Country B', data: [['Gas', 18], ['Coal', 42], ['Nuclear', 16], ['Renewables', 26]] as PieData }] },
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
    <svg viewBox="0 0 720 300" style={{ width: '100%', maxWidth: 720, display: 'block' }} role="img" aria-label={selected.title}>
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
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420, background: 'var(--bg)' }}>
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

export function IELTSProcessDiagramVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    { title: 'The diagram below shows how plastic bottles are recycled.', steps: [['Collection', 'Used bottles are collected from public recycling bins.'], ['Sorting', 'Plastic is separated at a recycling centre.'], ['Washing', 'Bottles are cleaned before being cut into flakes.'], ['Melting', 'The flakes are heated into plastic pellets.'], ['Manufacturing', 'The pellets become new products.']] },
    { title: 'The diagram below shows how coffee is produced for sale.', steps: [['Harvesting', 'Ripe coffee cherries are picked from the plants.'], ['Drying', 'The cherries are spread out and dried in the sun.'], ['Removing skins', 'The outer layers are removed from the dried fruit.'], ['Roasting', 'The beans are heated until they reach the desired colour.'], ['Packaging', 'Roasted beans are ground and packed for sale.']] },
    { title: 'The diagram below shows the production of bottled water.', steps: [['Extraction', 'Water is taken from an underground spring.'], ['Filtering', 'Unwanted particles are removed from the water.'], ['Purification', 'The water is treated to make it safe to drink.'], ['Bottling', 'Clean water is poured into plastic bottles.'], ['Distribution', 'The bottles are labelled and sent to shops.']] },
    { title: 'The diagram below shows how bricks are manufactured.', steps: [['Digging', 'Clay is removed from the ground by an excavator.'], ['Crushing', 'The clay is broken into smaller pieces.'], ['Moulding', 'The material is shaped into rectangular bricks.'], ['Drying', 'The bricks are left in a drying chamber.'], ['Firing', 'They are heated in a kiln before delivery.']] },
    { title: 'The diagram below shows the life cycle of a honey bee.', steps: [['Egg', 'The queen lays eggs inside the cells of a hive.'], ['Larva', 'The eggs hatch and become small larvae.'], ['Pupa', 'The larvae are sealed inside cells to develop.'], ['Adult', 'Fully grown bees emerge from the cells.'], ['Colony', 'Adults feed the young and maintain the hive.']] },
  ];
  const data = datasets[variant % datasets.length];
  const steps = data.steps.map((step, i) => [String(i + 1), step[0], step[1]]);
  const palette = ['#0f3d8c', '#059669', '#7c3aed', '#d97706', '#dc2626'];
  return (
    <svg viewBox="0 0 800 410" style={{ width: '100%', display: 'block' }} role="img" aria-label={data.title}>
      <defs>
        <marker id={`arrow-task1-process-${variant}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#0f3d8c" />
        </marker>
      </defs>
      <rect x="16" y="16" width="768" height="378" rx="18" fill="var(--bg)" stroke="var(--line-soft)" />
      <rect x="16" y="16" width="768" height="58" rx="18" fill="rgba(15,61,140,0.07)" />
      <text x="40" y="51" fontSize="17" fontWeight="800" fill="var(--ink)">{data.title}</text>
      <text x="40" y="96" fontSize="11" fontWeight="800" letterSpacing="1.4" fill="var(--muted)">SEQUENCE OF STAGES</text>
      {steps.map((step, i) => {
        const x = 42 + (i % 3) * 246;
        const y = i < 3 ? 116 : 272;
        const color = palette[i];
        return (
          <g key={step[0]}>
            <rect x={x} y={y} width="210" height="112" rx="14" fill="var(--bg)" stroke="var(--line-soft)" />
            <rect x={x} y={y} width="210" height="8" rx="4" fill={color} />
            <circle cx={x + 28} cy={y + 32} r="18" fill={color} />
            <text x={x + 28} y={y + 38} textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">{step[0]}</text>
            <text x={x + 56} y={y + 37} fontSize="14" fontWeight="800" fill="var(--ink)">{step[1]}</text>
            <foreignObject x={x + 18} y={y + 58} width="174" height="44">
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 11, lineHeight: 1.3 }}>{step[2]}</p>
            </foreignObject>
          </g>
        );
      })}
      <line x1="252" y1="172" x2="284" y2="172" stroke="#0f3d8c" strokeWidth="2.5" markerEnd={`url(#arrow-task1-process-${variant})`} />
      <line x1="498" y1="172" x2="530" y2="172" stroke="#0f3d8c" strokeWidth="2.5" markerEnd={`url(#arrow-task1-process-${variant})`} />
      <path d="M 672 228 C 672 257, 568 260, 568 272" fill="none" stroke="#0f3d8c" strokeWidth="2.5" markerEnd={`url(#arrow-task1-process-${variant})`} />
      <line x1="288" y1="328" x2="254" y2="328" stroke="#0f3d8c" strokeWidth="2.5" markerEnd={`url(#arrow-task1-process-${variant})`} />
    </svg>
  );
}

export function IELTSMapDiagramVisual({ variant = 0 }: { variant?: number }) {
  const datasets = [
    { title: 'The maps below show changes in a town centre between 1990 and 2020.', beforeLabel: '1990', afterLabel: '2020', before: ['Park', 'Factory', 'Small road', 'Car park'], after: ['Housing estate', 'School', 'Dual carriageway', 'Shopping centre'] },
    { title: 'The maps below show the development of a university campus between 1995 and 2025.', beforeLabel: '1995', afterLabel: '2025', before: ['Lecture hall', 'Garden', 'Car park', 'Sports field'], after: ['Library', 'Student flats', 'Cycle path', 'Sports centre'] },
    { title: 'The maps below show changes to a coastal village between 2000 and 2025.', beforeLabel: '2000', afterLabel: '2025', before: ['Fishing harbour', 'Fields', 'Narrow road', 'Cottages'], after: ['Marina', 'Holiday resort', 'Main road', 'Apartments'] },
    { title: 'The maps below show how a park changed between 1980 and 2020.', beforeLabel: '1980', afterLabel: '2020', before: ['Woodland', 'Pond', 'Footpath', 'Rose garden'], after: ['Playground', 'Cafe', 'Cycle track', 'Open-air stage'] },
    { title: 'The maps below show a shopping centre before and after redevelopment.', beforeLabel: 'Before', afterLabel: 'After', before: ['Small shops', 'Bus stop', 'Market', 'Car park'], after: ['Department store', 'Taxi rank', 'Food court', 'Multi-storey car park'] },
  ];
  const data = datasets[variant % datasets.length];
  const cellsBefore = data.before.map((label, i) => [label, ['#dcfce7', '#fee2e2', '#e5e7eb', '#dbeafe'][i]]);
  const cellsAfter = data.after.map((label, i) => [label, ['#fef3c7', '#dbeafe', '#e5e7eb', '#ede9fe'][i]]);
  const MapGrid = ({ title, cells, side }: { title: string; cells: string[][]; side: 'left' | 'right' }) => (
    <g>
      <text x={side === 'left' ? 74 : 454} y="82" fontSize="16" fontWeight="900" fill="var(--ink)">{title}</text>
      <rect x={side === 'left' ? 52 : 432} y="96" width="330" height="252" rx="14" fill="rgba(15,61,140,0.035)" stroke="var(--line-soft)" />
      <path d={side === 'left' ? 'M62 220 H372 M212 106 V338' : 'M442 220 H752 M592 106 V338'} stroke="#cbd5e1" strokeWidth="18" />
      <path d={side === 'left' ? 'M62 220 H372 M212 106 V338' : 'M442 220 H752 M592 106 V338'} stroke="var(--bg)" strokeWidth="2" strokeDasharray="8 7" />
      {cells.map((cell, i) => {
        const baseX = side === 'left' ? 70 : 450;
        const x = baseX + (i % 2) * 150;
        const y = 110 + Math.floor(i / 2) * 112;
        return (
          <g key={cell[0]}>
            <rect x={x} y={y} width="132" height="82" rx="11" fill={cell[1]} stroke="var(--line-soft)" />
            <foreignObject x={x + 10} y={y + 25} width="112" height="38">
              <p style={{ margin: 0, textAlign: 'center', color: 'var(--ink-2)', fontWeight: 800, fontSize: 11, lineHeight: 1.2 }}>{cell[0]}</p>
            </foreignObject>
          </g>
        );
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 820 390" style={{ width: '100%', display: 'block' }} role="img" aria-label={data.title}>
      <defs>
        <marker id={`arrow-task1-map-${variant}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#0f3d8c" />
        </marker>
      </defs>
      <rect x="16" y="16" width="788" height="358" rx="18" fill="var(--bg)" stroke="var(--line-soft)" />
      <rect x="16" y="16" width="788" height="50" rx="18" fill="rgba(15,61,140,0.07)" />
      <text x="40" y="47" fontSize="15" fontWeight="800" fill="var(--ink)">{data.title}</text>
      <MapGrid title={data.beforeLabel} side="left" cells={cellsBefore} />
      <MapGrid title={data.afterLabel} side="right" cells={cellsAfter} />
      <path d="M 390 220 L 426 220" stroke="#0f3d8c" strokeWidth="3" markerEnd={`url(#arrow-task1-map-${variant})`} />
      <path d="M 738 88 L 738 116" stroke="#0f3d8c" strokeWidth="2" markerEnd={`url(#arrow-task1-map-${variant})`} />
      <text x="731" y="82" fontSize="11" fontWeight="900" fill="#0f3d8c">N</text>
      <text x="48" y="365" fontSize="10" fill="var(--muted)">Roads and land-use blocks are schematic, as in an IELTS Academic Task 1 map.</text>
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
