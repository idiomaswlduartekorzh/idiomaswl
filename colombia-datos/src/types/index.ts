export interface Government {
  id: string;
  president: string;
  party: string;
  startYear: number;
  endYear: number;
  color: string;
  colorLight: string;
  photo?: string;
  vicepresident?: string;
  notes?: string;
  inheritedContext?: InheritedContext;
}

export interface InheritedContext {
  gdpGrowthPrev: number;
  unemploymentRate: number;
  povertyRate: number;
  inflationRate: number;
  debtGdpRatio: number;
  cocaHectares: number;
  homicideRate: number;
  oilPrice: number;
  notes: string;
}

export type IndicatorCategory =
  | 'economia'
  | 'empleo'
  | 'pobreza'
  | 'seguridad'
  | 'narcotrafico'
  | 'ambiente'
  | 'infancia'
  | 'empresas'
  | 'educacion'
  | 'salud'
  | 'corrupcion'
  | 'vivienda';

export type ComparabilityLevel = 'alta' | 'media' | 'baja' | 'no-comparable';
export type ReliabilityLevel = 'alta' | 'media' | 'baja';

export interface Source {
  id: string;
  name: string;
  institution: string;
  url?: string;
  reliabilityLevel: ReliabilityLevel;
  notes?: string;
}

export interface Indicator {
  id: string;
  name: string;
  shortName: string;
  category: IndicatorCategory;
  definition: string;
  unit: string;
  frequency: 'anual' | 'trimestral' | 'mensual' | 'trienal';
  sourceIds: string[];
  comparabilityLevel: ComparabilityLevel;
  limitations: string[];
  higherIsBetter: boolean; // false = lower is better (e.g. unemployment, poverty)
  methodologyNotes?: string;
}

export interface Observation {
  indicatorId: string;
  year: number;
  quarter?: number;
  month?: number;
  value: number;
  valueNormalized?: number;
  unit: string;
  sourceId: string;
  methodologyVersion?: string;
  confidenceScore?: number; // 0-1
  notes?: string;
  department?: string;
}

export interface GovernmentPeriodSummary {
  governmentId: string;
  indicatorId: string;
  valueStart: number;
  valueEnd: number;
  valueMin: number;
  valueMax: number;
  valueMean: number;
  changeAbsolute: number;
  changePercent: number;
  changeAnnualized: number;
  trend: 'mejora' | 'deterioro' | 'estable' | 'mixto';
  contextNotes?: string;
}

export interface ContextEvent {
  year: number;
  month?: number;
  name: string;
  category: 'economico' | 'seguridad' | 'social' | 'internacional' | 'ambiental' | 'politico';
  description: string;
  affectedIndicators: string[];
  impact: 'alto' | 'medio' | 'bajo';
}

export type DataQuality = 'confirmado' | 'estimado' | 'sin-dato' | 'rezago';

export interface ChartDataPoint {
  year: number;
  [key: string]: number | string | undefined;
}
