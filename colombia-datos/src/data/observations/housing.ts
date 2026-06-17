import { Observation } from '@/types';

// Fuente: DANE CENAC / Estadísticas de Edificaciones (licencias y metros cuadrados)
// y DANE Encuesta de Calidad de Vida (ECV) para déficit habitacional.

// Déficit Habitacional Cuantitativo — DANE / ECV
// Porcentaje de hogares sin vivienda propia o en vivienda irrecuperable
export const DEFICIT_HABITACIONAL: Observation[] = [
  { indicatorId: 'deficit-habitacional', year: 2005, value: 12.4, unit: '% hogares', sourceId: 'dane', notes: 'Censo 2005: 12.4% déficit cuantitativo nacional' },
  { indicatorId: 'deficit-habitacional', year: 2008, value: 11.2, unit: '% hogares', sourceId: 'dane' },
  { indicatorId: 'deficit-habitacional', year: 2010, value: 10.5, unit: '% hogares', sourceId: 'dane', notes: 'Inicio Santos I' },
  { indicatorId: 'deficit-habitacional', year: 2012, value: 9.8, unit: '% hogares', sourceId: 'dane' },
  { indicatorId: 'deficit-habitacional', year: 2014, value: 8.8, unit: '% hogares', sourceId: 'dane', notes: 'Inicio Santos II; programas VIS aceleran reducción' },
  { indicatorId: 'deficit-habitacional', year: 2016, value: 8.2, unit: '% hogares', sourceId: 'dane' },
  { indicatorId: 'deficit-habitacional', year: 2018, value: 7.9, unit: '% hogares', sourceId: 'dane', notes: 'Inicio Duque' },
  { indicatorId: 'deficit-habitacional', year: 2019, value: 7.6, unit: '% hogares', sourceId: 'dane' },
  { indicatorId: 'deficit-habitacional', year: 2020, value: 8.1, unit: '% hogares', sourceId: 'dane', notes: '⚠️ COVID: reversión temporal por desempleo y pérdida de ingresos' },
  { indicatorId: 'deficit-habitacional', year: 2021, value: 7.8, unit: '% hogares', sourceId: 'dane' },
  { indicatorId: 'deficit-habitacional', year: 2022, value: 7.5, unit: '% hogares', sourceId: 'dane' },
  { indicatorId: 'deficit-habitacional', year: 2023, value: 7.2, unit: '% hogares', sourceId: 'dane', notes: 'Preliminar; tendencia de reducción lenta pero sostenida' },
  { indicatorId: 'deficit-habitacional', year: 2024, value: 6.9, unit: '% hogares', sourceId: 'dane', notes: 'Preliminar; tasas hipotecarias altas frenan acceso a vivienda' },
  { indicatorId: 'deficit-habitacional', year: 2025, value: 6.7, unit: '% hogares', sourceId: 'dane', notes: 'Preliminar; leve mejora' },
];

// Viviendas Nuevas Iniciadas — DANE CENAC / Estadísticas de Edificaciones
export const VIVIENDAS_INICIADAS: Observation[] = [
  { indicatorId: 'viviendas-iniciadas', year: 2005, value: 142000, unit: 'unidades', sourceId: 'dane', notes: 'Uribe II: boom de construcción' },
  { indicatorId: 'viviendas-iniciadas', year: 2006, value: 151000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2007, value: 162000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2008, value: 148000, unit: 'unidades', sourceId: 'dane', notes: 'Desaceleración por crisis global' },
  { indicatorId: 'viviendas-iniciadas', year: 2009, value: 145000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2010, value: 155000, unit: 'unidades', sourceId: 'dane', notes: 'Inicio Santos I' },
  { indicatorId: 'viviendas-iniciadas', year: 2011, value: 163000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2012, value: 170000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2013, value: 175000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2014, value: 176000, unit: 'unidades', sourceId: 'dane', notes: 'Inicio Santos II; pico de construcción' },
  { indicatorId: 'viviendas-iniciadas', year: 2015, value: 172000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2016, value: 173000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2017, value: 185000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2018, value: 192000, unit: 'unidades', sourceId: 'dane', notes: 'Inicio Duque; cifra más alta hasta ese momento' },
  { indicatorId: 'viviendas-iniciadas', year: 2019, value: 184000, unit: 'unidades', sourceId: 'dane' },
  { indicatorId: 'viviendas-iniciadas', year: 2020, value: 143000, unit: 'unidades', sourceId: 'dane', notes: '⚠️ COVID: parálisis de obras; primer trimestre prácticamente nulo' },
  { indicatorId: 'viviendas-iniciadas', year: 2021, value: 177000, unit: 'unidades', sourceId: 'dane', notes: 'Rebote fuerte; subsidios Mi Casa Ya impulsan demanda' },
  { indicatorId: 'viviendas-iniciadas', year: 2022, value: 154000, unit: 'unidades', sourceId: 'dane', notes: 'Inicio Petro; tasas de interés altas frenan construcción' },
  { indicatorId: 'viviendas-iniciadas', year: 2023, value: 143000, unit: 'unidades', sourceId: 'dane', notes: 'Mínimo reciente; tasas hipotecarias en máximos históricos (15%+); fin del ciclo expansivo' },
  { indicatorId: 'viviendas-iniciadas', year: 2024, value: 128000, unit: 'unidades', sourceId: 'dane', notes: 'Mínimo reciente por tasas hipotecarias altas; sector constructor en contracción' },
  { indicatorId: 'viviendas-iniciadas', year: 2025, value: 142000, unit: 'unidades', sourceId: 'dane', notes: 'Preliminar; rebote moderado; Banrep bajando tasas reactiva construcción' },
];
