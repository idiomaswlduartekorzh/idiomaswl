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
    pobreza: 'Herencia post-COVID + inflación; mejoras en pobreza monetaria, pero Gini empeoró (0.548→0.553 en 2023); Renta Ciudadana tiene alto costo fiscal',
    narcotrafico: 'Herencia: 230k ha coca y 1.738 TM producción al asumir (2022) — ya récords históricos',
    seguridad: 'Herencia: 94 masacres/año y 27,0 homicidios x100k al inicio del mandato',
    salud: 'Sistema EPS heredado en crisis estructural: varias EPS con desequilibrios financieros previos; Ley 100 de 1993 acumuló pasivos. Bajo Petro: ADRES acumuló deuda billonaria a prestadores; Nueva EPS y otras intervenidas; reforma salud fracasó en Congreso (2024)',
  },
};
