import { Observation } from '@/types';

// Gasto Público en Educación como % del PIB — MEN / MHCP / OCDE
export const GASTO_EDUCACION: Observation[] = [
  { indicatorId: 'gasto-educacion', year: 2000, value: 3.4, unit: '% PIB', sourceId: 'mhcp', notes: 'Pastrana; base presupuestal' },
  { indicatorId: 'gasto-educacion', year: 2002, value: 3.6, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe I' },
  { indicatorId: 'gasto-educacion', year: 2004, value: 3.8, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-educacion', year: 2006, value: 4.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe II; gratuidad básica primaria' },
  { indicatorId: 'gasto-educacion', year: 2008, value: 4.1, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-educacion', year: 2010, value: 4.5, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos I; "Colombia la Más Educada" — meta 6% PIB' },
  { indicatorId: 'gasto-educacion', year: 2012, value: 4.7, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-educacion', year: 2014, value: 4.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos II; jornada única y calidad como ejes' },
  { indicatorId: 'gasto-educacion', year: 2016, value: 4.9, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-educacion', year: 2018, value: 4.9, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Duque; acuerdo con FECODE; bono docente' },
  { indicatorId: 'gasto-educacion', year: 2019, value: 4.9, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-educacion', year: 2020, value: 5.3, unit: '% PIB', sourceId: 'mhcp', notes: '⚠️ COVID: PIB cayó, gasto educación subió como % (numerador estable, denominador cayó)' },
  { indicatorId: 'gasto-educacion', year: 2021, value: 5.0, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-educacion', year: 2022, value: 4.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Petro; reforma educativa anunciada' },
  { indicatorId: 'gasto-educacion', year: 2023, value: 4.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Petro: matrícula cero universidades públicas; sin aumento real del gasto total' },
  { indicatorId: 'gasto-educacion', year: 2024, value: 4.9, unit: '% PIB', sourceId: 'mhcp', notes: 'Petro: recortes presupuestales afectaron ejecución en algunos niveles' },
  { indicatorId: 'gasto-educacion', year: 2025, value: 5.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Preliminar' },
];

// Gasto Público en Salud como % del PIB — MINSALUD / MHCP / OMS
export const GASTO_SALUD: Observation[] = [
  { indicatorId: 'gasto-salud', year: 2000, value: 3.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Pastrana; SGSSS en consolidación post-Ley 100' },
  { indicatorId: 'gasto-salud', year: 2002, value: 3.5, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe I' },
  { indicatorId: 'gasto-salud', year: 2004, value: 3.8, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-salud', year: 2006, value: 4.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe II; ampliación régimen subsidiado' },
  { indicatorId: 'gasto-salud', year: 2008, value: 4.4, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-salud', year: 2010, value: 4.6, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos I; reforma estructural SGSSS (Ley 1438)' },
  { indicatorId: 'gasto-salud', year: 2012, value: 5.0, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-salud', year: 2014, value: 5.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos II; crisis de las EPS en debate' },
  { indicatorId: 'gasto-salud', year: 2016, value: 5.3, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-salud', year: 2018, value: 5.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Duque' },
  { indicatorId: 'gasto-salud', year: 2019, value: 5.3, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-salud', year: 2020, value: 6.3, unit: '% PIB', sourceId: 'mhcp', notes: '⚠️ COVID: gasto extraordinario en UCI, vacunas, oxígeno; denominador (PIB) cayó' },
  { indicatorId: 'gasto-salud', year: 2021, value: 5.8, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-salud', year: 2022, value: 5.5, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Petro; reforma estructural salud anunciada (eliminar EPS)' },
  { indicatorId: 'gasto-salud', year: 2023, value: 5.6, unit: '% PIB', sourceId: 'mhcp', notes: 'Petro: reforma salud bloqueada en Congreso; EPS en intervención' },
  { indicatorId: 'gasto-salud', year: 2024, value: 5.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Crisis ADRES; billones adeudados a prestadores de salud' },
  { indicatorId: 'gasto-salud', year: 2025, value: 5.9, unit: '% PIB', sourceId: 'mhcp', notes: 'Preliminar' },
];

// Gasto en Defensa y Seguridad como % del PIB — Ministerio de Defensa / MHCP
export const GASTO_DEFENSA: Observation[] = [
  { indicatorId: 'gasto-defensa', year: 2000, value: 3.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Pastrana; FARC en expansión máxima' },
  { indicatorId: 'gasto-defensa', year: 2002, value: 3.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe I; impuesto al patrimonio de seguridad democrática' },
  { indicatorId: 'gasto-defensa', year: 2004, value: 4.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Pico Uribe I; Plan Patriota, Plan Colombia' },
  { indicatorId: 'gasto-defensa', year: 2006, value: 3.9, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe II; FFMM en máximos de personal' },
  { indicatorId: 'gasto-defensa', year: 2008, value: 3.7, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-defensa', year: 2010, value: 3.4, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos I; inicio de reducción relativa' },
  { indicatorId: 'gasto-defensa', year: 2012, value: 3.3, unit: '% PIB', sourceId: 'mhcp', notes: 'Diálogos La Habana; tensión entre gasto militar y proceso de paz' },
  { indicatorId: 'gasto-defensa', year: 2014, value: 3.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos II' },
  { indicatorId: 'gasto-defensa', year: 2016, value: 3.1, unit: '% PIB', sourceId: 'mhcp', notes: 'Acuerdo Paz firmado; reducción gradual planificada' },
  { indicatorId: 'gasto-defensa', year: 2018, value: 3.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Duque; reconfiguración grupos armados forzó mantener gasto' },
  { indicatorId: 'gasto-defensa', year: 2019, value: 3.1, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-defensa', year: 2020, value: 2.9, unit: '% PIB', sourceId: 'mhcp', notes: 'COVID: PIB cayó; defensa como % sube si se mide sobre PIB real' },
  { indicatorId: 'gasto-defensa', year: 2021, value: 3.0, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'gasto-defensa', year: 2022, value: 3.1, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Petro; "Paz Total" pero mantuvo presupuesto defensa' },
  { indicatorId: 'gasto-defensa', year: 2023, value: 3.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Petro: recorte real en equipos pero no en nómina; debate sobre "desmilitarización"' },
  { indicatorId: 'gasto-defensa', year: 2024, value: 2.9, unit: '% PIB', sourceId: 'mhcp', notes: 'Recortes presupuestales; Ministerio Defensa entre los más afectados' },
  { indicatorId: 'gasto-defensa', year: 2025, value: 2.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Preliminar; tendencia bajista bajo Petro' },
];

// Gasto en Protección Social como % del PIB — DNP / MHCP / DANE
export const GASTO_PROTECCION_SOCIAL: Observation[] = [
  { indicatorId: 'gasto-proteccion-social', year: 2000, value: 4.0, unit: '% PIB', sourceId: 'dnp', notes: 'Pastrana; sistema pensional en crisis' },
  { indicatorId: 'gasto-proteccion-social', year: 2002, value: 4.8, unit: '% PIB', sourceId: 'dnp', notes: 'Inicio Uribe I; Familias en Acción creado' },
  { indicatorId: 'gasto-proteccion-social', year: 2004, value: 5.0, unit: '% PIB', sourceId: 'dnp' },
  { indicatorId: 'gasto-proteccion-social', year: 2006, value: 5.2, unit: '% PIB', sourceId: 'dnp', notes: 'Inicio Uribe II; expansión Familias en Acción' },
  { indicatorId: 'gasto-proteccion-social', year: 2008, value: 5.4, unit: '% PIB', sourceId: 'dnp' },
  { indicatorId: 'gasto-proteccion-social', year: 2010, value: 5.8, unit: '% PIB', sourceId: 'dnp', notes: 'Inicio Santos I; Colpensiones creada; Sistema de Protección Social reformado' },
  { indicatorId: 'gasto-proteccion-social', year: 2012, value: 6.2, unit: '% PIB', sourceId: 'dnp' },
  { indicatorId: 'gasto-proteccion-social', year: 2014, value: 6.5, unit: '% PIB', sourceId: 'dnp', notes: 'Inicio Santos II; Colombia Mayor, Jóvenes en Acción' },
  { indicatorId: 'gasto-proteccion-social', year: 2016, value: 6.7, unit: '% PIB', sourceId: 'dnp' },
  { indicatorId: 'gasto-proteccion-social', year: 2018, value: 6.9, unit: '% PIB', sourceId: 'dnp', notes: 'Inicio Duque; Colombia Mayor ampliado; pensiones en debate' },
  { indicatorId: 'gasto-proteccion-social', year: 2019, value: 7.1, unit: '% PIB', sourceId: 'dnp' },
  { indicatorId: 'gasto-proteccion-social', year: 2020, value: 9.2, unit: '% PIB', sourceId: 'dnp', notes: '⚠️ COVID: +$35 billones en transferencias de emergencia (Ingreso Solidario); PIB cayó' },
  { indicatorId: 'gasto-proteccion-social', year: 2021, value: 8.0, unit: '% PIB', sourceId: 'dnp', notes: 'Retiro parcial de subsidios emergencia' },
  { indicatorId: 'gasto-proteccion-social', year: 2022, value: 7.5, unit: '% PIB', sourceId: 'dnp', notes: 'Inicio Petro; Renta Ciudadana reemplaza subsidios previos' },
  { indicatorId: 'gasto-proteccion-social', year: 2023, value: 7.8, unit: '% PIB', sourceId: 'dnp', notes: 'Petro: Renta Ciudadana ampliada; reforma pensional en debate' },
  { indicatorId: 'gasto-proteccion-social', year: 2024, value: 8.0, unit: '% PIB', sourceId: 'dnp', notes: 'Reforma pensional aprobada (jun 2023); transición hacia Colpensiones' },
  { indicatorId: 'gasto-proteccion-social', year: 2025, value: 8.2, unit: '% PIB', sourceId: 'dnp', notes: 'Preliminar; reforma pensional en implementación' },
];
