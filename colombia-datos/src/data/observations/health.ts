import { Observation } from '@/types';

// Mortalidad infantil (por 1.000 nacidos vivos) - DANE/INS
// Nota: Datos con rezago de 2-3 años por certificación de defunciones
export const INFANT_MORTALITY: Observation[] = [
  { indicatorId: 'mortalidad-infantil', year: 1994, value: 31.5, unit: 'x1000 NV', sourceId: 'dane', notes: '⚠️ Estimado; subregistro histórico importante' },
  { indicatorId: 'mortalidad-infantil', year: 1998, value: 29.0, unit: 'x1000 NV', sourceId: 'dane', notes: '⚠️ Estimado' },
  { indicatorId: 'mortalidad-infantil', year: 2002, value: 24.0, unit: 'x1000 NV', sourceId: 'dane', notes: '⚠️ Estimado; descenso gradual' },
  { indicatorId: 'mortalidad-infantil', year: 2005, value: 19.8, unit: 'x1000 NV', sourceId: 'dane' },
  { indicatorId: 'mortalidad-infantil', year: 2008, value: 17.2, unit: 'x1000 NV', sourceId: 'dane' },
  { indicatorId: 'mortalidad-infantil', year: 2010, value: 16.6, unit: 'x1000 NV', sourceId: 'dane', notes: 'Inicio Santos' },
  { indicatorId: 'mortalidad-infantil', year: 2012, value: 15.8, unit: 'x1000 NV', sourceId: 'dane' },
  { indicatorId: 'mortalidad-infantil', year: 2014, value: 14.5, unit: 'x1000 NV', sourceId: 'dane', notes: 'Inicio Santos II' },
  { indicatorId: 'mortalidad-infantil', year: 2016, value: 12.9, unit: 'x1000 NV', sourceId: 'dane' },
  { indicatorId: 'mortalidad-infantil', year: 2018, value: 11.8, unit: 'x1000 NV', sourceId: 'dane', notes: 'Inicio Duque' },
  { indicatorId: 'mortalidad-infantil', year: 2019, value: 11.1, unit: 'x1000 NV', sourceId: 'dane' },
  { indicatorId: 'mortalidad-infantil', year: 2020, value: 10.9, unit: 'x1000 NV', sourceId: 'dane', notes: 'COVID afectó acceso a salud, especialmente en zonas rurales' },
  { indicatorId: 'mortalidad-infantil', year: 2021, value: 10.5, unit: 'x1000 NV', sourceId: 'dane' },
  { indicatorId: 'mortalidad-infantil', year: 2022, value: 10.1, unit: 'x1000 NV', sourceId: 'dane', notes: 'Transición' },
  { indicatorId: 'mortalidad-infantil', year: 2023, value: 9.8, unit: 'x1000 NV', sourceId: 'dane', notes: 'Petro: descenso continúa pero disparidades territoriales persisten' },
];

// Desnutrición aguda en menores de 5 años (%) - INS/SIVIGILA
// NOTA CRÍTICA: No hay encuesta ENSIN reciente (2015 es la última).
// Los datos anuales son del sistema de vigilancia (casos reportados, no prevalencia poblacional)
export const ACUTE_MALNUTRITION: Observation[] = [
  { indicatorId: 'desnutricion-aguda', year: 2016, value: 2.3, unit: '%', sourceId: 'ins', notes: '⚠️ % de menores con desnutrición aguda moderada+severa en sistema de vigilancia; no es prevalencia poblacional exacta' },
  { indicatorId: 'desnutricion-aguda', year: 2017, value: 2.4, unit: '%', sourceId: 'ins' },
  { indicatorId: 'desnutricion-aguda', year: 2018, value: 2.1, unit: '%', sourceId: 'ins', notes: 'Inicio Duque' },
  { indicatorId: 'desnutricion-aguda', year: 2019, value: 2.0, unit: '%', sourceId: 'ins', notes: 'Leve mejora bajo Duque' },
  { indicatorId: 'desnutricion-aguda', year: 2020, value: 2.3, unit: '%', sourceId: 'ins', notes: 'COVID: acceso salud deteriorado; aumento' },
  { indicatorId: 'desnutricion-aguda', year: 2021, value: 2.5, unit: '%', sourceId: 'ins', notes: 'Pico COVID; peor año Duque en este indicador' },
  { indicatorId: 'desnutricion-aguda', year: 2022, value: 2.2, unit: '%', sourceId: 'ins', notes: 'Transición Duque-Petro' },
  { indicatorId: 'desnutricion-aguda', year: 2023, value: 2.1, unit: '%', sourceId: 'ins', notes: 'Petro: sin mejora significativa; La Guajira sigue con tasas mucho más altas' },
  { indicatorId: 'desnutricion-aguda', year: 2024, value: 2.0, unit: '%', sourceId: 'ins', notes: 'Preliminar' },
];

// DATOS DEPARTAMENTALES - La Guajira (desnutrición aguda)
// Para ilustrar que el promedio nacional oculta crisis territoriales
export const MALNUTRITION_GUAJIRA: Observation[] = [
  { indicatorId: 'desnutricion-aguda', year: 2016, value: 8.2, unit: '%', sourceId: 'ins', department: 'La Guajira', notes: '3.5x el promedio nacional; crisis estructural indígena Wayuu' },
  { indicatorId: 'desnutricion-aguda', year: 2017, value: 9.1, unit: '%', sourceId: 'ins', department: 'La Guajira' },
  { indicatorId: 'desnutricion-aguda', year: 2018, value: 8.8, unit: '%', sourceId: 'ins', department: 'La Guajira', notes: 'Inicio Duque' },
  { indicatorId: 'desnutricion-aguda', year: 2019, value: 8.5, unit: '%', sourceId: 'ins', department: 'La Guajira' },
  { indicatorId: 'desnutricion-aguda', year: 2020, value: 9.3, unit: '%', sourceId: 'ins', department: 'La Guajira', notes: 'COVID agravó crisis; acceso humanitario interrumpido' },
  { indicatorId: 'desnutricion-aguda', year: 2021, value: 9.8, unit: '%', sourceId: 'ins', department: 'La Guajira', notes: '⚠️ Pico histórico; sentencia T-302 (Corte Constitucional) exige acción del Estado desde 2017' },
  { indicatorId: 'desnutricion-aguda', year: 2022, value: 9.1, unit: '%', sourceId: 'ins', department: 'La Guajira' },
  { indicatorId: 'desnutricion-aguda', year: 2023, value: 8.7, unit: '%', sourceId: 'ins', department: 'La Guajira', notes: 'Petro declaró emergencia alimentaria en Guajira 2023; mejoría marginal' },
  { indicatorId: 'desnutricion-aguda', year: 2024, value: 8.2, unit: '%', sourceId: 'ins', department: 'La Guajira', notes: 'Preliminar; sigue siendo crisis humanitaria no resuelta' },
];
