export * from './governments';
export * from './indicators';
export * from './sources';
export * from './observations/economy';
export * from './observations/employment';
export * from './observations/poverty';
export * from './observations/security';
export * from './observations/narcotics';
export * from './observations/environment';
export * from './observations/health';

import { Observation } from '@/types';
import { GDP_GROWTH, INFLATION, DEBT_GDP, FDI } from './observations/economy';
import { UNEMPLOYMENT, INFORMALITY } from './observations/employment';
import { MONETARY_POVERTY, EXTREME_POVERTY, GINI } from './observations/poverty';
import { HOMICIDE_RATE, KIDNAPPINGS, MASSACRES, SOCIAL_LEADERS_KILLED } from './observations/security';
import { COCA_HECTARES, COCAINE_PRODUCTION, COCA_ERADICATION } from './observations/narcotics';
import { DEFORESTATION, OIL_PRODUCTION } from './observations/environment';
import { INFANT_MORTALITY, ACUTE_MALNUTRITION, MALNUTRITION_GUAJIRA } from './observations/health';

export const ALL_OBSERVATIONS: Observation[] = [
  ...GDP_GROWTH,
  ...INFLATION,
  ...DEBT_GDP,
  ...FDI,
  ...UNEMPLOYMENT,
  ...INFORMALITY,
  ...MONETARY_POVERTY,
  ...EXTREME_POVERTY,
  ...GINI,
  ...HOMICIDE_RATE,
  ...KIDNAPPINGS,
  ...MASSACRES,
  ...SOCIAL_LEADERS_KILLED,
  ...COCA_HECTARES,
  ...COCAINE_PRODUCTION,
  ...COCA_ERADICATION,
  ...DEFORESTATION,
  ...OIL_PRODUCTION,
  ...INFANT_MORTALITY,
  ...ACUTE_MALNUTRITION,
  ...MALNUTRITION_GUAJIRA,
];

export function getObservations(
  indicatorId: string,
  options?: { department?: string; yearStart?: number; yearEnd?: number }
): Observation[] {
  return ALL_OBSERVATIONS.filter((o) => {
    if (o.indicatorId !== indicatorId) return false;
    if (options?.department && o.department !== options.department) return false;
    if (options?.yearStart && o.year < options.yearStart) return false;
    if (options?.yearEnd && o.year > options.yearEnd) return false;
    return true;
  }).sort((a, b) => a.year - b.year);
}

export function getObservationsForGovernment(
  indicatorId: string,
  governmentId: string,
  options?: { department?: string }
): Observation[] {
  const { GOVERNMENTS } = require('./governments');
  const gov = GOVERNMENTS.find((g: { id: string }) => g.id === governmentId);
  if (!gov) return [];
  return getObservations(indicatorId, {
    yearStart: gov.startYear,
    yearEnd: gov.endYear,
    department: options?.department,
  });
}

export function getValueForYear(
  indicatorId: string,
  year: number,
  department?: string
): number | null {
  const obs = ALL_OBSERVATIONS.find(
    (o) =>
      o.indicatorId === indicatorId &&
      o.year === year &&
      (department ? o.department === department : !o.department)
  );
  return obs?.value ?? null;
}

import { ContextEvent } from '@/types';

export const CONTEXT_EVENTS: ContextEvent[] = [
  {
    year: 1999,
    name: 'Crisis económica / UPAC',
    category: 'economico',
    description: 'La peor recesión del siglo XX: PIB -4.2%, desempleo >19%, quiebra masiva del sistema UPAC (hipotecas). Coincide con crisis Tequila y Asia.',
    affectedIndicators: ['pib-crecimiento', 'desempleo', 'pobreza-monetaria', 'deuda-pib'],
    impact: 'alto',
  },
  {
    year: 2000,
    name: 'Plan Colombia',
    category: 'seguridad',
    description: 'Acuerdo bilateral Colombia-EE.UU. para combatir narcotráfico y guerrillas. Incluye fumigaciones aéreas masivas, ayuda militar y desarrollo alternativo.',
    affectedIndicators: ['coca-hectareas', 'coca-erradicacion', 'homicidios-tasa'],
    impact: 'alto',
  },
  {
    year: 2003,
    name: 'Inicio Seguridad Democrática (Uribe)',
    category: 'seguridad',
    description: 'Política de recuperación territorial del Estado: más tropa, más presencia, Plan Patriota, negociación con AUC. Caída dramática de homicidios y secuestros.',
    affectedIndicators: ['homicidios-tasa', 'secuestros', 'masacres', 'coca-hectareas'],
    impact: 'alto',
  },
  {
    year: 2005,
    name: 'Desmovilización AUC (Ley Justicia y Paz)',
    category: 'seguridad',
    description: 'Aproximadamente 30.000 paramilitares desmovilizados. Surgimiento de "bandas criminales" (BACRIM/Clan del Golfo) como sucesores.',
    affectedIndicators: ['homicidios-tasa', 'masacres', 'desplazamiento'],
    impact: 'alto',
  },
  {
    year: 2008,
    name: 'Crisis Financiera Global',
    category: 'internacional',
    description: 'Quiebra Lehman Brothers; crisis hipotecaria EE.UU. Colombia relativamente protegida vs. países vecinos por solidez bancaria y marco fiscal.',
    affectedIndicators: ['pib-crecimiento', 'ied', 'desempleo'],
    impact: 'medio',
  },
  {
    year: 2012,
    name: 'Diálogos de Paz La Habana',
    category: 'politico',
    description: 'Colombia y FARC inician negociaciones secretas en Oslo/La Habana. Cese al fuego parcial. Primer impacto positivo en violencia desde 2013.',
    affectedIndicators: ['homicidios-tasa', 'secuestros', 'desplazamiento'],
    impact: 'alto',
  },
  {
    year: 2014,
    name: 'Caída precio del petróleo',
    category: 'economico',
    description: 'El precio del crudo cae de $108 a $50 USD/barril. Colombia recibe golpe fiscal duro: ingresos de Ecopetrol y regalías caen. Ajuste fiscal 2015-2016.',
    affectedIndicators: ['pib-crecimiento', 'deficit-fiscal', 'deuda-pib', 'ied'],
    impact: 'alto',
  },
  {
    year: 2015,
    name: 'Suspensión aspersión aérea glifosato',
    category: 'ambiental',
    description: 'La ANLA y el Ministerio de Salud suspenden fumigaciones aéreas tras clasificación de glifosato como "probable carcinógeno" por IARC/OMS. La coca explota.',
    affectedIndicators: ['coca-hectareas', 'coca-erradicacion'],
    impact: 'alto',
  },
  {
    year: 2016,
    name: 'Acuerdo de Paz con FARC',
    category: 'politico',
    description: 'Firma del Acuerdo Final en Cartagena (sept). Premio Nobel de Paz para Santos. Refrendación parlamentaria tras plebiscito fallido. Las FARC se convierten en partido político.',
    affectedIndicators: ['homicidios-tasa', 'secuestros', 'desplazamiento', 'deforestacion', 'coca-hectareas'],
    impact: 'alto',
  },
  {
    year: 2020,
    name: 'Pandemia COVID-19',
    category: 'economico',
    description: 'Cuarentenas estrictas marzo-sept 2020. PIB -7%, desempleo pico 21.4% (mayo), pobreza sube 6.8pp. Gasto extraordinario de $35 billones. Deuda/PIB sube a 67%.',
    affectedIndicators: ['pib-crecimiento', 'desempleo', 'pobreza-monetaria', 'pobreza-extrema', 'gini', 'deuda-pib', 'informalidad'],
    impact: 'alto',
  },
  {
    year: 2021,
    name: 'Paro Nacional / Estallido Social',
    category: 'social',
    description: 'Protestas masivas desde abril 2021 contra reforma tributaria de Duque. Violencia policial documentada (46+ muertos según CIDH). Reforma retirada. Contexto político previo a elecciones 2022.',
    affectedIndicators: ['pib-crecimiento', 'ied', 'homicidios-tasa'],
    impact: 'medio',
  },
  {
    year: 2022,
    name: 'Guerra Rusia-Ucrania / inflación global',
    category: 'internacional',
    description: 'Invasión rusa de Ucrania (feb 2022) dispara precios energía y alimentos. Inflación colombiana llega a 13.1%. FED sube tasas agresivamente; Banrep sube a 13.25%.',
    affectedIndicators: ['inflacion', 'pib-crecimiento', 'pobreza-monetaria', 'desempleo'],
    impact: 'alto',
  },
  {
    year: 2022,
    name: 'Elección de Gustavo Petro',
    category: 'politico',
    description: 'Primer presidente de izquierda en la historia de Colombia. Agenda: reforma tributaria (aprobada dic 2022), "Paz Total", transición energética, reforma agraria.',
    affectedIndicators: ['ied', 'produccion-petroleo', 'deforestacion'],
    impact: 'medio',
  },
  {
    year: 2023,
    name: 'Tasas altas Banco de la República',
    category: 'economico',
    description: 'Banrep mantiene tasa en 13.25% (enero-abr 2023) para controlar inflación. Crédito caro, consumo cae, crecimiento se frena a 0.6% anual.',
    affectedIndicators: ['pib-crecimiento', 'desempleo', 'ied'],
    impact: 'alto',
  },
];
