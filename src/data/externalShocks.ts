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
    economia: 'Herencia inflación 13.1% al inicio (2022); descenso posterior liderado por Banco de la República',
    pobreza: 'Herencia post-COVID + inflación; mejoras parcialmente apoyadas por Renta Ciudadana (costo fiscal)',
    narcotrafico: 'Herencia: 230k ha coca y 1.738 TM producción al asumir (2022) — ya récords históricos',
    seguridad: 'Herencia: 94 masacres/año y 27,0 homicidios x100k al inicio del mandato',
  },
};
