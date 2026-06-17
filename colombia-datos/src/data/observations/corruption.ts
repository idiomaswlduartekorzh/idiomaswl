import { Observation } from '@/types';

// Índice de Percepción de la Corrupción — Transparencia Internacional
// Escala 0-100: 0 = altamente corrupto, 100 = muy transparente
// Metodología revisada en 2012; series anteriores NO son comparables directamente
export const CPI_TRANSPARENCIA: Observation[] = [
  { indicatorId: 'cpi-transparencia', year: 2012, value: 36, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Primera medición con metodología actual; Colombia ocupa puesto ~94/176' },
  { indicatorId: 'cpi-transparencia', year: 2013, value: 36, unit: 'puntos (0-100)', sourceId: 'transparencia-intl' },
  { indicatorId: 'cpi-transparencia', year: 2014, value: 37, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Inicio Santos II; escándalo Odebrecht aún no es público (se revelará en 2016)' },
  { indicatorId: 'cpi-transparencia', year: 2015, value: 37, unit: 'puntos (0-100)', sourceId: 'transparencia-intl' },
  { indicatorId: 'cpi-transparencia', year: 2016, value: 37, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Estalla escándalo Odebrecht: sobornos a funcionarios colombianos en contratos de infraestructura' },
  { indicatorId: 'cpi-transparencia', year: 2017, value: 37, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Acusaciones Odebrecht en Colombia: Invías, ANI, partidos políticos' },
  { indicatorId: 'cpi-transparencia', year: 2018, value: 36, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Inicio Duque; leve retroceso; casos UNGRD, carrusel de la contratación en departamentos' },
  { indicatorId: 'cpi-transparencia', year: 2019, value: 37, unit: 'puntos (0-100)', sourceId: 'transparencia-intl' },
  { indicatorId: 'cpi-transparencia', year: 2020, value: 39, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Leve mejora; pero denuncias de corrupción en contratación COVID-19 (tapabocas, ventiladores)' },
  { indicatorId: 'cpi-transparencia', year: 2021, value: 39, unit: 'puntos (0-100)', sourceId: 'transparencia-intl' },
  { indicatorId: 'cpi-transparencia', year: 2022, value: 39, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Transición Duque-Petro; promesa de "Colombia potencia de la vida" con lucha anticorrupción' },
  { indicatorId: 'cpi-transparencia', year: 2023, value: 39, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Petro: casos "Día-E" (corrupción electoral), escándalos en EPS Sanitas y ADRES' },
  { indicatorId: 'cpi-transparencia', year: 2024, value: 39, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Estancamiento; casos en UNGRD, DCNF, y contratos Colombia Potencia; promedio OCDE: 68 pts' },
  { indicatorId: 'cpi-transparencia', year: 2025, value: 38, unit: 'puntos (0-100)', sourceId: 'transparencia-intl', notes: 'Preliminar; tendencia estancada o ligero retroceso' },
];

// Control de la Corrupción — Banco Mundial (WGI)
export const WB_CONTROL_CORRUPCION: Observation[] = [
  { indicatorId: 'control-corrupcion-wb', year: 1996, value: 40.5, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Samper: escándalo Proceso 8000 (dineros Cali en campaña)' },
  { indicatorId: 'control-corrupcion-wb', year: 1998, value: 41.2, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Pastrana' },
  { indicatorId: 'control-corrupcion-wb', year: 2000, value: 41.5, unit: 'percentil (0-100)', sourceId: 'worldbank' },
  { indicatorId: 'control-corrupcion-wb', year: 2002, value: 40.0, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Uribe I' },
  { indicatorId: 'control-corrupcion-wb', year: 2004, value: 39.5, unit: 'percentil (0-100)', sourceId: 'worldbank' },
  { indicatorId: 'control-corrupcion-wb', year: 2006, value: 42.0, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Uribe II; "parapolítica" empieza a investigarse' },
  { indicatorId: 'control-corrupcion-wb', year: 2008, value: 43.0, unit: 'percentil (0-100)', sourceId: 'worldbank' },
  { indicatorId: 'control-corrupcion-wb', year: 2010, value: 44.5, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Santos I' },
  { indicatorId: 'control-corrupcion-wb', year: 2012, value: 45.0, unit: 'percentil (0-100)', sourceId: 'worldbank' },
  { indicatorId: 'control-corrupcion-wb', year: 2014, value: 44.0, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Santos II' },
  { indicatorId: 'control-corrupcion-wb', year: 2016, value: 42.5, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Odebrecht revelado; impacto en percepción' },
  { indicatorId: 'control-corrupcion-wb', year: 2018, value: 43.5, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Duque' },
  { indicatorId: 'control-corrupcion-wb', year: 2020, value: 44.0, unit: 'percentil (0-100)', sourceId: 'worldbank' },
  { indicatorId: 'control-corrupcion-wb', year: 2022, value: 42.0, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Inicio Petro' },
  { indicatorId: 'control-corrupcion-wb', year: 2023, value: 41.5, unit: 'percentil (0-100)', sourceId: 'worldbank', notes: 'Colombia consistentemente en percentil 40-45; por debajo de Chile (85+), Ecuador (45)' },
];

// Hallazgos Fiscales de la Contraloría General — detrimento patrimonial
export const HALLAZGOS_CONTRALORIA: Observation[] = [
  { indicatorId: 'hallazgos-contraloria', year: 2010, value: 2800, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Santos I; cifra incluye hallazgos en municipios, departamentos y nación' },
  { indicatorId: 'hallazgos-contraloria', year: 2011, value: 3100, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2012, value: 3450, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2013, value: 3200, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2014, value: 3800, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Santos II; reformas de control fiscal' },
  { indicatorId: 'hallazgos-contraloria', year: 2015, value: 4200, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2016, value: 4800, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Aumento por hallazgos post-Odebrecht en contratos ANI/Invías' },
  { indicatorId: 'hallazgos-contraloria', year: 2017, value: 5200, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2018, value: 4900, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Duque; Contraloría modernizando sistemas de auditoría' },
  { indicatorId: 'hallazgos-contraloria', year: 2019, value: 5100, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2020, value: 7800, unit: 'miles de millones COP', sourceId: 'contraloria', notes: '⚠️ Pico por irregularidades en contratos COVID: tapabocas, UNGRD, entidades territoriales' },
  { indicatorId: 'hallazgos-contraloria', year: 2021, value: 6500, unit: 'miles de millones COP', sourceId: 'contraloria' },
  { indicatorId: 'hallazgos-contraloria', year: 2022, value: 5800, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Petro; Contraloría aumentó control preventivo' },
  { indicatorId: 'hallazgos-contraloria', year: 2023, value: 6200, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Hallazgos en programas Petro: ADRES, subsidios, contratos DCNF' },
  { indicatorId: 'hallazgos-contraloria', year: 2024, value: 5900, unit: 'miles de millones COP', sourceId: 'contraloria', notes: 'Preliminar; cifra sujeta a consolidación de informes departamentales' },
];
