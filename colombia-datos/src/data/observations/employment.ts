import { Observation } from '@/types';

// Tasa de desempleo nacional anual - DANE GEIH
// Nota: Datos anteriores a 2007 usan metodología ENH (Encuesta Nacional de Hogares), no directamente comparables
export const UNEMPLOYMENT: Observation[] = [
  { indicatorId: 'desempleo', year: 1996, value: 11.2, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH; no comparable con GEIH post-2007' },
  { indicatorId: 'desempleo', year: 1997, value: 12.0, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH' },
  { indicatorId: 'desempleo', year: 1998, value: 15.3, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH; inicio crisis' },
  { indicatorId: 'desempleo', year: 1999, value: 19.4, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH; pico crisis' },
  { indicatorId: 'desempleo', year: 2000, value: 20.5, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH; máximo histórico' },
  { indicatorId: 'desempleo', year: 2001, value: 18.2, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH' },
  { indicatorId: 'desempleo', year: 2002, value: 17.8, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH; inicio Uribe' },
  { indicatorId: 'desempleo', year: 2003, value: 16.7, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH' },
  { indicatorId: 'desempleo', year: 2004, value: 15.4, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH' },
  { indicatorId: 'desempleo', year: 2005, value: 14.1, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Metodología ENH' },
  { indicatorId: 'desempleo', year: 2006, value: 12.0, unit: '%', sourceId: 'dane-geih', notes: '⚠️ Transición metodológica ENH→GEIH; periodo de empalme' },
  { indicatorId: 'desempleo', year: 2007, value: 11.4, unit: '%', sourceId: 'dane-geih', notes: 'Primera medición completa con GEIH' },
  { indicatorId: 'desempleo', year: 2008, value: 11.3, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2009, value: 12.0, unit: '%', sourceId: 'dane-geih', notes: 'Impacto crisis global; aumento leve' },
  { indicatorId: 'desempleo', year: 2010, value: 11.8, unit: '%', sourceId: 'dane-geih', notes: 'Inicio Santos; herencia alta de Uribe 2' },
  { indicatorId: 'desempleo', year: 2011, value: 10.8, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2012, value: 10.4, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2013, value: 9.7, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2014, value: 9.1, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2015, value: 8.9, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2016, value: 9.2, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2017, value: 9.4, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'desempleo', year: 2018, value: 9.7, unit: '%', sourceId: 'dane-geih', notes: 'Inicio Duque; ligero aumento vs 2017' },
  { indicatorId: 'desempleo', year: 2019, value: 10.5, unit: '%', sourceId: 'dane-geih', notes: 'Aumento por migración venezolana y contracción del empleo formal' },
  { indicatorId: 'desempleo', year: 2020, value: 15.9, unit: '%', sourceId: 'dane-geih', notes: '⚠️ COVID-19: cuarentenas masivas. Pico mensual: 21.4% (mayo 2020). Dato peor crisis laboral en 20 años.' },
  { indicatorId: 'desempleo', year: 2021, value: 13.7, unit: '%', sourceId: 'dane-geih', notes: 'Recuperación parcial; persistencia de empleo informal y pérdida de empleos formales' },
  { indicatorId: 'desempleo', year: 2022, value: 11.2, unit: '%', sourceId: 'dane-geih', notes: 'Recuperación; transición Duque-Petro (ago 2022)' },
  { indicatorId: 'desempleo', year: 2023, value: 10.2, unit: '%', sourceId: 'dane-geih', notes: 'Descenso continuo bajo Petro' },
  { indicatorId: 'desempleo', year: 2024, value: 9.8, unit: '%', sourceId: 'dane-geih', notes: 'Mínimo del periodo Petro; dato preliminar' },
  { indicatorId: 'desempleo', year: 2025, value: 9.5, unit: '%', sourceId: 'dane-geih', notes: 'Preliminar; mejora gradual; reforma laboral en implementación' },
];

// Posición ocupacional — % sobre total de ocupados nacionales
export interface OccupationBreakdown {
  year: number;
  particular: number;
  gobierno: number;
  domestico: number;
  cuentaPropia: number;
  patron: number;
  sinRemuneracion: number;
  jornalero: number;
  sourceId: 'dane-geih';
  notes?: string;
}

export const OCCUPATION_BREAKDOWN: OccupationBreakdown[] = [
  { year: 2010, particular: 33.9, gobierno: 4.4, domestico: 3.7, cuentaPropia: 42.7, patron: 4.1, sinRemuneracion: 4.8, jornalero: 6.4, sourceId: 'dane-geih', notes: 'Inicio serie GEIH nacional completa comparable' },
  { year: 2012, particular: 33.4, gobierno: 4.6, domestico: 3.6, cuentaPropia: 43.2, patron: 4.2, sinRemuneracion: 4.5, jornalero: 6.5, sourceId: 'dane-geih' },
  { year: 2014, particular: 33.1, gobierno: 4.5, domestico: 3.7, cuentaPropia: 43.5, patron: 4.3, sinRemuneracion: 4.3, jornalero: 6.6, sourceId: 'dane-geih', notes: 'Inicio Santos II; mínimo histórico desempleo hasta esa fecha' },
  { year: 2016, particular: 33.5, gobierno: 4.4, domestico: 3.5, cuentaPropia: 43.7, patron: 4.3, sinRemuneracion: 4.2, jornalero: 6.4, sourceId: 'dane-geih' },
  { year: 2018, particular: 34.2, gobierno: 4.4, domestico: 3.4, cuentaPropia: 43.6, patron: 4.1, sinRemuneracion: 3.9, jornalero: 6.4, sourceId: 'dane-geih', notes: 'Inicio Duque' },
  { year: 2019, particular: 33.6, gobierno: 4.3, domestico: 3.3, cuentaPropia: 43.8, patron: 3.9, sinRemuneracion: 3.8, jornalero: 7.3, sourceId: 'dane-geih', notes: 'Aumento jornaleros; efecto migración venezolana en empleo precario' },
  { year: 2020, particular: 32.1, gobierno: 5.0, domestico: 2.7, cuentaPropia: 43.2, patron: 3.5, sinRemuneracion: 4.1, jornalero: 9.4, sourceId: 'dane-geih', notes: '⚠️ COVID-19: empleo particular cae; doméstico el más golpeado; jornaleros aumentan por refugio en precario' },
  { year: 2021, particular: 32.8, gobierno: 4.8, domestico: 3.0, cuentaPropia: 43.6, patron: 3.7, sinRemuneracion: 4.0, jornalero: 8.1, sourceId: 'dane-geih', notes: 'Recuperación: particular sube; jornalero baja desde pico COVID' },
  { year: 2022, particular: 34.4, gobierno: 4.7, domestico: 3.2, cuentaPropia: 43.3, patron: 3.9, sinRemuneracion: 3.7, jornalero: 6.8, sourceId: 'dane-geih', notes: 'Transición Duque-Petro; empleo particular recuperado' },
  { year: 2023, particular: 34.7, gobierno: 5.0, domestico: 3.3, cuentaPropia: 43.0, patron: 3.9, sinRemuneracion: 3.6, jornalero: 6.5, sourceId: 'dane-geih', notes: 'Gobierno aumenta participación bajo Petro (gasto público); cuenta propia estable' },
  { year: 2024, particular: 35.0, gobierno: 5.1, domestico: 3.2, cuentaPropia: 42.8, patron: 3.8, sinRemuneracion: 3.5, jornalero: 6.6, sourceId: 'dane-geih', notes: 'Preliminar; tendencia de moderado aumento empleo formal privado' },
];

// Informalidad laboral - DANE GEIH (% sobre ocupados, 13 ciudades)
export const INFORMALITY: Observation[] = [
  { indicatorId: 'informalidad', year: 2009, value: 58.6, unit: '%', sourceId: 'dane-geih', notes: 'Primera medición GEIH disponible para série larga' },
  { indicatorId: 'informalidad', year: 2010, value: 58.5, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2011, value: 57.7, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2012, value: 57.0, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2013, value: 56.1, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2014, value: 55.5, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2015, value: 55.0, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2016, value: 55.7, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2017, value: 56.1, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2018, value: 56.3, unit: '%', sourceId: 'dane-geih', notes: 'Inicio Duque' },
  { indicatorId: 'informalidad', year: 2019, value: 56.8, unit: '%', sourceId: 'dane-geih', notes: 'Ligero aumento; migración venezolana aumenta informalidad' },
  { indicatorId: 'informalidad', year: 2020, value: 58.4, unit: '%', sourceId: 'dane-geih', notes: 'COVID: empleo informal más resiliente al regreso; formal más destruido' },
  { indicatorId: 'informalidad', year: 2021, value: 57.9, unit: '%', sourceId: 'dane-geih' },
  { indicatorId: 'informalidad', year: 2022, value: 57.5, unit: '%', sourceId: 'dane-geih', notes: 'Transición Duque-Petro' },
  { indicatorId: 'informalidad', year: 2023, value: 56.8, unit: '%', sourceId: 'dane-geih', notes: 'Petro: ligera mejora; reforma laboral en debate' },
  { indicatorId: 'informalidad', year: 2024, value: 56.2, unit: '%', sourceId: 'dane-geih', notes: 'Preliminar' },
  { indicatorId: 'informalidad', year: 2025, value: 55.8, unit: '%', sourceId: 'dane-geih', notes: 'Preliminar; descenso lento; reforma laboral busca formalizar empleados' },
];
