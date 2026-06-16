import { Observation } from '@/types';

// Hectáreas de cultivos de coca - UNODC/SIMCI
export const COCA_HECTARES: Observation[] = [
  { indicatorId: 'coca-hectareas', year: 1994, value: 44700, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 1995, value: 50900, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 1996, value: 67200, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 1997, value: 79500, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 1998, value: 101800, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Pastrana; expansión masiva' },
  { indicatorId: 'coca-hectareas', year: 1999, value: 160119, unit: 'ha', sourceId: 'unodc', notes: 'Zona de Despeje: FARC expande coca' },
  { indicatorId: 'coca-hectareas', year: 2000, value: 163289, unit: 'ha', sourceId: 'unodc', notes: 'Pico Pastrana; inicio Plan Colombia' },
  { indicatorId: 'coca-hectareas', year: 2001, value: 144807, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2002, value: 102071, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Uribe; Plan Colombia + aspersión aérea masiva' },
  { indicatorId: 'coca-hectareas', year: 2003, value: 86340, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2004, value: 80350, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2005, value: 85750, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2006, value: 77870, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Uribe II' },
  { indicatorId: 'coca-hectareas', year: 2007, value: 98900, unit: 'ha', sourceId: 'unodc', notes: 'Aumento; efecto globo de Perú/Bolivia' },
  { indicatorId: 'coca-hectareas', year: 2008, value: 80900, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2009, value: 68000, unit: 'ha', sourceId: 'unodc', notes: 'Mínimo Uribe II' },
  { indicatorId: 'coca-hectareas', year: 2010, value: 57000, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Santos; mínimo histórico en décadas' },
  { indicatorId: 'coca-hectareas', year: 2011, value: 64000, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2012, value: 48000, unit: 'ha', sourceId: 'unodc', notes: 'Mínimo histórico UNODC; inicio diálogos La Habana' },
  { indicatorId: 'coca-hectareas', year: 2013, value: 48000, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-hectareas', year: 2014, value: 69000, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Santos II; aumento acelerado' },
  { indicatorId: 'coca-hectareas', year: 2015, value: 96000, unit: 'ha', sourceId: 'unodc', notes: 'Suspensión aspersión aérea (resolución ANLA)' },
  { indicatorId: 'coca-hectareas', year: 2016, value: 146000, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Boom anticipando el Acuerdo de Paz y expectativa de sustitución; sube 52%' },
  { indicatorId: 'coca-hectareas', year: 2017, value: 171000, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Máximo histórico al final del Santos; Santos hereda contexto a Duque' },
  { indicatorId: 'coca-hectareas', year: 2018, value: 169000, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Duque; hereda máximos históricos absolutos' },
  { indicatorId: 'coca-hectareas', year: 2019, value: 154000, unit: 'ha', sourceId: 'unodc', notes: 'Leve caída; erradicación forzada aumenta' },
  { indicatorId: 'coca-hectareas', year: 2020, value: 143000, unit: 'ha', sourceId: 'unodc', notes: 'COVID: erradicación limitada pero coca sigue alta' },
  { indicatorId: 'coca-hectareas', year: 2021, value: 204000, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Salto histórico: +43% en un año bajo Duque; mínimo control territorial' },
  { indicatorId: 'coca-hectareas', year: 2022, value: 230000, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Nuevo máximo histórico absoluto; transición Duque-Petro; Petro cambia estrategia' },
  { indicatorId: 'coca-hectareas', year: 2023, value: 253000, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Máximo histórico absoluto bajo Petro; "Paz Total" debate: negociaciones vs reducción de cultivos' },
  { indicatorId: 'coca-hectareas', year: 2024, value: 235000, unit: 'ha', sourceId: 'unodc', notes: 'Estimado; primer dato de Petro que podría mostrar descenso. Pendiente informe UNODC 2025.' },
];

// Producción potencial de cocaína (TM) - UNODC
export const COCAINE_PRODUCTION: Observation[] = [
  { indicatorId: 'coca-produccion', year: 2010, value: 290, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2011, value: 345, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2012, value: 309, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2013, value: 290, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2014, value: 420, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2015, value: 646, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2016, value: 866, unit: 'TM', sourceId: 'unodc' },
  { indicatorId: 'coca-produccion', year: 2017, value: 921, unit: 'TM', sourceId: 'unodc', notes: 'Máximo en mandato Santos al final' },
  { indicatorId: 'coca-produccion', year: 2018, value: 893, unit: 'TM', sourceId: 'unodc', notes: 'Inicio Duque' },
  { indicatorId: 'coca-produccion', year: 2019, value: 951, unit: 'TM', sourceId: 'unodc', notes: 'Pico Duque' },
  { indicatorId: 'coca-produccion', year: 2020, value: 1009, unit: 'TM', sourceId: 'unodc', notes: 'COVID: laboratorios funcionando; demanda global no paró' },
  { indicatorId: 'coca-produccion', year: 2021, value: 1400, unit: 'TM', sourceId: 'unodc', notes: '⚠️ Salto masivo: más hectáreas + mejor rendimiento por hectárea' },
  { indicatorId: 'coca-produccion', year: 2022, value: 1738, unit: 'TM', sourceId: 'unodc', notes: '⚠️ Máximo histórico absoluto; Colombia supera su propio récord' },
  { indicatorId: 'coca-produccion', year: 2023, value: 2664, unit: 'TM', sourceId: 'unodc', notes: '⚠️ Máximo global: Colombia produce más cocaína que nunca en la historia' },
];

// Erradicación de cultivos (ha) - UNODC / DNP
export const COCA_ERADICATION: Observation[] = [
  { indicatorId: 'coca-erradicacion', year: 2014, value: 11819, unit: 'ha', sourceId: 'unodc', notes: 'Santos II; mix erradicación manual y aspersión aérea' },
  { indicatorId: 'coca-erradicacion', year: 2015, value: 19797, unit: 'ha', sourceId: 'unodc', notes: 'Suspensión aspersión aérea por ANLA en junio 2015' },
  { indicatorId: 'coca-erradicacion', year: 2016, value: 17642, unit: 'ha', sourceId: 'unodc' },
  { indicatorId: 'coca-erradicacion', year: 2017, value: 50405, unit: 'ha', sourceId: 'unodc', notes: 'Aumento erradicación manual; PNIS (sustitución) inicia' },
  { indicatorId: 'coca-erradicacion', year: 2018, value: 72990, unit: 'ha', sourceId: 'unodc', notes: 'Inicio Duque; record erradicación forzada' },
  { indicatorId: 'coca-erradicacion', year: 2019, value: 94649, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Record histórico de erradicación Duque: 94.649 ha. Paradoja: coca también subió a 154k ha.' },
  { indicatorId: 'coca-erradicacion', year: 2020, value: 130000, unit: 'ha', sourceId: 'unodc', notes: '⚠️ Nuevo record: 130k ha erradicadas. Coca bajó a 143k. Primer resultado visible.' },
  { indicatorId: 'coca-erradicacion', year: 2021, value: 103302, unit: 'ha', sourceId: 'unodc', notes: 'Baja en erradicación; coca sube de nuevo a 204k' },
  { indicatorId: 'coca-erradicacion', year: 2022, value: 99302, unit: 'ha', sourceId: 'unodc', notes: 'Transición Duque-Petro; Petro cambia enfoque a sustitución y desarrollo alternativo' },
  { indicatorId: 'coca-erradicacion', year: 2023, value: 57000, unit: 'ha', sourceId: 'unodc', notes: 'Petro: erradicación forzada cae significativamente; crítica: coca sigue subiendo' },
  { indicatorId: 'coca-erradicacion', year: 2024, value: 65000, unit: 'ha', sourceId: 'unodc', notes: 'Estimado; debate político intenso sobre resultados de "Paz Total"' },
];
