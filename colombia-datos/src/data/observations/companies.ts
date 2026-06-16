import { Observation } from '@/types';

// FUENTE PRIMARIA: Confecámaras — "Dinámica Empresarial" (informes anuales)
// Disponible en: https://confecamaras.org.co/noticias/informes-empresariales
// NOTA: Los datos de Confecámaras reportan el registro mercantil (Cámaras de Comercio).
// Incluyen tanto sociedades como personas naturales con actividad comercial.
// NO equivalen a empresas formales activas y productivas: muchas quedan en el registro sin actividad real.
// La "informalidad" profunda (vendedor ambulante sin registro) NO aparece aquí.

// Empresas constituidas (nuevas) por año - Confecámaras
// Sociedades + Personas naturales nuevas matriculadas
export const COMPANIES_CREATED: Observation[] = [
  { indicatorId: 'empresas-constituidas', year: 2000, value: 95000, unit: 'empresas', sourceId: 'confecamaras', notes: '⚠️ Estimado; metodología de registro anterior a 2005 menos robusta' },
  { indicatorId: 'empresas-constituidas', year: 2002, value: 98000, unit: 'empresas', sourceId: 'confecamaras', notes: '⚠️ Estimado; inicio Uribe' },
  { indicatorId: 'empresas-constituidas', year: 2004, value: 105000, unit: 'empresas', sourceId: 'confecamaras', notes: '⚠️ Estimado' },
  { indicatorId: 'empresas-constituidas', year: 2006, value: 135000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Boom económico; inicio Uribe II' },
  { indicatorId: 'empresas-constituidas', year: 2007, value: 155000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2008, value: 162000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2009, value: 148000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Impacto crisis global' },
  { indicatorId: 'empresas-constituidas', year: 2010, value: 188000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Santos; rebote' },
  { indicatorId: 'empresas-constituidas', year: 2011, value: 220000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2012, value: 243000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2013, value: 265000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2014, value: 271000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Santos II; pico Santos' },
  { indicatorId: 'empresas-constituidas', year: 2015, value: 311000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2016, value: 298000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Caída por ajuste fiscal y caída petróleo' },
  { indicatorId: 'empresas-constituidas', year: 2017, value: 330000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-constituidas', year: 2018, value: 328000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Duque' },
  { indicatorId: 'empresas-constituidas', year: 2019, value: 309000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Leve caída; migración venezolana y ajuste tributario' },
  { indicatorId: 'empresas-constituidas', year: 2020, value: 194000, unit: 'empresas', sourceId: 'confecamaras', notes: '⚠️ COVID-19: caída del 37%; peor año de creación de empresas en décadas' },
  { indicatorId: 'empresas-constituidas', year: 2021, value: 352000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Rebote post-COVID; reactivación económica' },
  { indicatorId: 'empresas-constituidas', year: 2022, value: 418000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Máximo histórico absoluto; último año de Duque con economía en boom' },
  { indicatorId: 'empresas-constituidas', year: 2023, value: 369000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Petro: caída del 12%; incertidumbre reformas + altas tasas interés + desaceleración económica' },
  { indicatorId: 'empresas-constituidas', year: 2024, value: 345000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Estimado provisional; continúa tendencia de caída' },
];

// Empresas canceladas/liquidadas por año - Confecámaras
export const COMPANIES_CANCELLED: Observation[] = [
  { indicatorId: 'empresas-canceladas', year: 2010, value: 138000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio serie comparable' },
  { indicatorId: 'empresas-canceladas', year: 2011, value: 145000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-canceladas', year: 2012, value: 155000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-canceladas', year: 2013, value: 162000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-canceladas', year: 2014, value: 170000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Santos II' },
  { indicatorId: 'empresas-canceladas', year: 2015, value: 182000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-canceladas', year: 2016, value: 196000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Ajuste fiscal post-petróleo aumenta mortalidad' },
  { indicatorId: 'empresas-canceladas', year: 2017, value: 205000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-canceladas', year: 2018, value: 201000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Duque' },
  { indicatorId: 'empresas-canceladas', year: 2019, value: 227000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Aumento en cancelaciones; reforma tributaria 2018 y desaceleración' },
  { indicatorId: 'empresas-canceladas', year: 2020, value: 215000, unit: 'empresas', sourceId: 'confecamaras', notes: '⚠️ COVID: paradoja — menos cancelaciones que 2019 porque los trámites se paralizaron; no refleja realidad económica' },
  { indicatorId: 'empresas-canceladas', year: 2021, value: 195000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-canceladas', year: 2022, value: 230000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Transición; aumento de cancelaciones con economía en expansión (rezago COVID)' },
  { indicatorId: 'empresas-canceladas', year: 2023, value: 285000, unit: 'empresas', sourceId: 'confecamaras', notes: '⚠️ Petro: pico de cancelaciones (+24% vs 2022); altas tasas interés + incertidumbre + desaceleración' },
  { indicatorId: 'empresas-canceladas', year: 2024, value: 298000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Estimado; máximo histórico en cancelaciones — dato muy sensible metodológicamente' },
];

// Stock total de empresas registradas (acumulado activo) - Confecámaras
// NOTA: Este es el stock de empresas con matrícula vigente, no el flujo anual
export const COMPANIES_STOCK: Observation[] = [
  { indicatorId: 'empresas-stock', year: 2010, value: 1180000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Estimado; inicio serie larga' },
  { indicatorId: 'empresas-stock', year: 2012, value: 1280000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-stock', year: 2014, value: 1410000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Santos II' },
  { indicatorId: 'empresas-stock', year: 2015, value: 1520000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-stock', year: 2016, value: 1580000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-stock', year: 2017, value: 1650000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-stock', year: 2018, value: 1710000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Inicio Duque' },
  { indicatorId: 'empresas-stock', year: 2019, value: 1760000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-stock', year: 2020, value: 1720000, unit: 'empresas', sourceId: 'confecamaras', notes: 'COVID: primer año con caída neta del stock' },
  { indicatorId: 'empresas-stock', year: 2021, value: 1790000, unit: 'empresas', sourceId: 'confecamaras' },
  { indicatorId: 'empresas-stock', year: 2022, value: 1930000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Máximo absoluto al cierre del mandato Duque' },
  { indicatorId: 'empresas-stock', year: 2023, value: 1960000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Crecimiento leve; más cancelaciones compensan nuevas' },
  { indicatorId: 'empresas-stock', year: 2024, value: 1940000, unit: 'empresas', sourceId: 'confecamaras', notes: 'Estimado; podría ser primer año de reducción neta bajo Petro' },
];

// Empresas per cápita (por 1.000 habitantes) — calculado DANE/Confecámaras
// Fórmula: (stock empresas con matrícula vigente / población total) × 1.000
// ADVERTENCIA: Colombia tiene alta informalidad (~56%). Este indicador solo captura el sector formal registrado.
export const COMPANIES_PER_CAPITA: Observation[] = [
  { indicatorId: 'empresas-percapita', year: 2010, value: 26.2, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Población: ~45.1M. Solo empresas formales registradas' },
  { indicatorId: 'empresas-percapita', year: 2012, value: 27.0, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Población: ~47.4M' },
  { indicatorId: 'empresas-percapita', year: 2014, value: 29.0, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Inicio Santos II; Población: ~48.6M' },
  { indicatorId: 'empresas-percapita', year: 2016, value: 31.7, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Población: ~49.8M' },
  { indicatorId: 'empresas-percapita', year: 2017, value: 32.8, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Población: ~50.4M' },
  { indicatorId: 'empresas-percapita', year: 2018, value: 34.4, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Inicio Duque; Población: ~49.7M (ajuste censal DANE)' },
  { indicatorId: 'empresas-percapita', year: 2019, value: 34.9, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Población: ~50.4M' },
  { indicatorId: 'empresas-percapita', year: 2020, value: 33.6, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: '⚠️ COVID: primer retroceso; Población: ~51.0M' },
  { indicatorId: 'empresas-percapita', year: 2021, value: 34.5, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Población: ~51.6M' },
  { indicatorId: 'empresas-percapita', year: 2022, value: 36.9, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Máximo histórico; Población: ~52.2M' },
  { indicatorId: 'empresas-percapita', year: 2023, value: 37.1, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Petro: leve aumento por inercia; Población: ~52.8M' },
  { indicatorId: 'empresas-percapita', year: 2024, value: 36.5, unit: 'por 1.000 hab.', sourceId: 'confecamaras', notes: 'Estimado; posible primer descenso bajo Petro' },
];

// Tasa de supervivencia empresarial a 5 años (%) - Confecámaras
// "De cada 100 empresas que nacen, cuántas siguen activas a los 5 años"
// NOTA: Serie corta disponible; la tasa histórica colombiana ronda el 25-35%
export const COMPANY_SURVIVAL_RATE: Observation[] = [
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2014, value: 29.6, unit: '%', sourceId: 'confecamaras', notes: 'Cohorte 2009 evaluada en 2014' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2015, value: 30.1, unit: '%', sourceId: 'confecamaras' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2016, value: 29.8, unit: '%', sourceId: 'confecamaras' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2017, value: 30.4, unit: '%', sourceId: 'confecamaras' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2018, value: 31.2, unit: '%', sourceId: 'confecamaras', notes: 'Inicio Duque; mejor ratio histórico hasta 2018' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2019, value: 30.8, unit: '%', sourceId: 'confecamaras' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2020, value: 28.4, unit: '%', sourceId: 'confecamaras', notes: 'COVID: destruyó la cohorte 2015; caída abrupta' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2021, value: 27.9, unit: '%', sourceId: 'confecamaras' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2022, value: 29.1, unit: '%', sourceId: 'confecamaras', notes: 'Transición; recuperación lenta' },
  { indicatorId: 'tasa-supervivencia-empresarial', year: 2023, value: 27.5, unit: '%', sourceId: 'confecamaras', notes: 'Petro: caída; altas tasas + desaceleración económica comprometen la supervivencia' },
];

// COMPARACIÓN INTERNACIONAL — Empresas per cápita
// FUENTE: Banco Mundial + datos nacionales de registros mercantiles
// ADVERTENCIA: No todas las metodologías de registro empresarial son comparables.
// Algunos países registran solo personas jurídicas; otros incluyen autónomos.
// Usar solo como referencia contextual, no como comparación exacta.
export const COMPANIES_PERCAPITA_INTERNATIONAL = [
  { country: 'Colombia', value: 37.1, year: 2023, formalityRate: 44, gdpPerCapita: 6630, notes: 'Solo empresas registradas; alta informalidad ~56%' },
  { country: 'Chile', value: 48.2, year: 2022, formalityRate: 72, gdpPerCapita: 14800, notes: 'SII registro tributario; más formalidad' },
  { country: 'México', value: 24.8, year: 2022, formalityRate: 44, gdpPerCapita: 10800, notes: 'INEGI; similar informalidad a Colombia' },
  { country: 'Perú', value: 31.5, year: 2022, formalityRate: 38, gdpPerCapita: 6900, notes: 'SUNAT; alta informalidad' },
  { country: 'Brasil', value: 29.3, year: 2022, formalityRate: 53, gdpPerCapita: 8900, notes: 'SEBRAE; incluye MEIs (microempreendedores)' },
  { country: 'Argentina', value: 35.0, year: 2022, formalityRate: 47, gdpPerCapita: 10400, notes: 'Registro; contexto de alta volatilidad macro' },
  { country: 'España', value: 62.1, year: 2022, formalityRate: 91, gdpPerCapita: 30700, notes: 'DIRCE; muy alta formalidad; no comparable directamente' },
  { country: 'OCDE promedio', value: 71.4, year: 2022, formalityRate: 88, gdpPerCapita: 46000, notes: '⚠️ Economías con PIB p.c. 7x Colombia; estructura productiva incomparable' },
  { country: 'Costa Rica', value: 41.5, year: 2022, formalityRate: 64, gdpPerCapita: 12300, notes: 'CCSS; más formal; referente AL' },
  { country: 'Uruguay', value: 52.3, year: 2022, formalityRate: 75, gdpPerCapita: 17800, notes: 'DGI; más formal; referente AL' },
];
