import type { IndicatorCategory } from '@/types';

// Per-government external events that significantly influenced an indicator
// independent of the government's direct policy. Shown as ⚡ on heatmap cells.
export const EXTERNAL_SHOCKS: Partial<
  Record<string, Partial<Record<IndicatorCategory, string>>>
> = {
  pastrana: {
    economia: 'Recesión 1999 (PIB −4.2%)',
    empleo: 'Recesión 1999',
    pobreza: 'Recesión 1999',
  },
  uribe2: {
    economia: 'Crisis financiera global 2008–09',
    empleo: 'Crisis financiera global 2008–09',
    empresas: 'Crisis financiera global 2008–09',
  },
  santos2: {
    economia: 'Caída precio petróleo 2014–16',
    vivienda: 'Caída precio petróleo 2014–16',
    corrupcion: 'Escándalo Odebrecht 2016',
  },
  duque: {
    economia: 'COVID-19 2020 (PIB −7%)',
    empleo: 'COVID-19 2020 (desempleo +7 pp)',
    pobreza: 'COVID-19 2020 (+6 pp pobreza)',
    salud: 'COVID-19 2020',
    empresas: 'COVID-19 2020',
    infancia: 'COVID-19 2020',
  },
  petro: {
    economia: 'Herencia inflación 13.1% al inicio (2022)',
    pobreza: 'Herencia post-COVID + inflación',
    narcotrafico: 'Herencia acumulada: 253 k ha coca al asumir',
    seguridad: 'Herencia: 94 masacres/año al inicio del mandato',
  },
};
