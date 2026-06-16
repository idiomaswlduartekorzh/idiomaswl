import { Observation } from '@/types';

// METADATOS MACROECONÓMICOS POR GOBIERNO
// Fuente: Banco de la República, Ministerio de Hacienda, Bloomberg (precio WTI/Brent), FMI
// Estos datos permiten contextualizar por qué ciertos indicadores se movieron en cada gobierno.

// Precio promedio del petróleo (Brent) por año - Bloomberg/EIA
// Colombia exporta un crudo similar al Brent; es el referente para ingresos fiscales
export const OIL_PRICE_BRENT: Observation[] = [
  { indicatorId: 'precio-petroleo', year: 1994, value: 16.0, unit: 'USD/barril', sourceId: 'banrep', notes: 'Samper; petróleo barato' },
  { indicatorId: 'precio-petroleo', year: 1995, value: 17.1, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 1996, value: 21.4, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 1997, value: 19.1, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 1998, value: 13.0, unit: 'USD/barril', sourceId: 'banrep', notes: 'Pastrana hereda caída de precios; crisis financiera Asia/Rusia' },
  { indicatorId: 'precio-petroleo', year: 1999, value: 17.5, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2000, value: 28.7, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2001, value: 24.5, unit: 'USD/barril', sourceId: 'banrep', notes: 'Post-11S' },
  { indicatorId: 'precio-petroleo', year: 2002, value: 25.0, unit: 'USD/barril', sourceId: 'banrep', notes: 'Inicio Uribe I' },
  { indicatorId: 'precio-petroleo', year: 2003, value: 28.9, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2004, value: 38.3, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2005, value: 54.4, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2006, value: 64.3, unit: 'USD/barril', sourceId: 'banrep', notes: 'Inicio Uribe II; boom commodities' },
  { indicatorId: 'precio-petroleo', year: 2007, value: 72.1, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2008, value: 96.9, unit: 'USD/barril', sourceId: 'banrep', notes: 'Pico $147 en julio 2008; luego colapso en crisis' },
  { indicatorId: 'precio-petroleo', year: 2009, value: 61.5, unit: 'USD/barril', sourceId: 'banrep', notes: 'Caída por crisis global' },
  { indicatorId: 'precio-petroleo', year: 2010, value: 79.6, unit: 'USD/barril', sourceId: 'banrep', notes: 'Inicio Santos I; recuperación' },
  { indicatorId: 'precio-petroleo', year: 2011, value: 111.0, unit: 'USD/barril', sourceId: 'banrep', notes: 'Boom: Primavera árabe y alta demanda China' },
  { indicatorId: 'precio-petroleo', year: 2012, value: 111.7, unit: 'USD/barril', sourceId: 'banrep', notes: 'Máximo prolongado' },
  { indicatorId: 'precio-petroleo', year: 2013, value: 108.7, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2014, value: 98.9, unit: 'USD/barril', sourceId: 'banrep', notes: 'Inicio Santos II; inicio caída' },
  { indicatorId: 'precio-petroleo', year: 2015, value: 52.4, unit: 'USD/barril', sourceId: 'banrep', notes: '⚠️ Colapso: -47% en un año; golpe fiscal brutal para Colombia' },
  { indicatorId: 'precio-petroleo', year: 2016, value: 44.1, unit: 'USD/barril', sourceId: 'banrep', notes: 'Mínimo en décadas; déficit fiscal forzó reforma tributaria' },
  { indicatorId: 'precio-petroleo', year: 2017, value: 54.3, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2018, value: 71.5, unit: 'USD/barril', sourceId: 'banrep', notes: 'Inicio Duque; recuperación moderada' },
  { indicatorId: 'precio-petroleo', year: 2019, value: 64.3, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2020, value: 41.7, unit: 'USD/barril', sourceId: 'banrep', notes: '⚠️ COVID: precio negativo en abril 2020 (WTI); Brent cayó a $10-15' },
  { indicatorId: 'precio-petroleo', year: 2021, value: 70.5, unit: 'USD/barril', sourceId: 'banrep' },
  { indicatorId: 'precio-petroleo', year: 2022, value: 99.0, unit: 'USD/barril', sourceId: 'banrep', notes: 'Guerra Rusia-Ucrania; Petro llegó con petróleo a $100' },
  { indicatorId: 'precio-petroleo', year: 2023, value: 82.5, unit: 'USD/barril', sourceId: 'banrep', notes: 'Petro: baja vs 2022; pero aún alto. Petro anuncia no más exploración' },
  { indicatorId: 'precio-petroleo', year: 2024, value: 80.2, unit: 'USD/barril', sourceId: 'banrep', notes: 'Estimado; desaceleración China reduce demanda' },
];

// Tasa de cambio COP/USD (promedio anual) - Banco de la República
export const EXCHANGE_RATE: Observation[] = [
  { indicatorId: 'tasa-cambio', year: 1994, value: 844, unit: 'COP/USD', sourceId: 'banrep' },
  { indicatorId: 'tasa-cambio', year: 1998, value: 1428, unit: 'COP/USD', sourceId: 'banrep', notes: 'Devaluación por crisis; Pastrana flotó el peso' },
  { indicatorId: 'tasa-cambio', year: 1999, value: 1757, unit: 'COP/USD', sourceId: 'banrep', notes: 'Flotación libre del peso; devaluación fuerte' },
  { indicatorId: 'tasa-cambio', year: 2000, value: 2087, unit: 'COP/USD', sourceId: 'banrep' },
  { indicatorId: 'tasa-cambio', year: 2002, value: 2504, unit: 'COP/USD', sourceId: 'banrep', notes: 'Inicio Uribe; peso muy devaluado' },
  { indicatorId: 'tasa-cambio', year: 2006, value: 2358, unit: 'COP/USD', sourceId: 'banrep', notes: 'Inicio Uribe II; apreciación' },
  { indicatorId: 'tasa-cambio', year: 2008, value: 1967, unit: 'COP/USD', sourceId: 'banrep', notes: 'Pico apreciación; petróleo alto' },
  { indicatorId: 'tasa-cambio', year: 2010, value: 1898, unit: 'COP/USD', sourceId: 'banrep', notes: 'Inicio Santos; peso fuerte (enfermedad holandesa)' },
  { indicatorId: 'tasa-cambio', year: 2014, value: 2000, unit: 'COP/USD', sourceId: 'banrep', notes: 'Inicio Santos II; inicio devaluación' },
  { indicatorId: 'tasa-cambio', year: 2015, value: 2744, unit: 'COP/USD', sourceId: 'banrep', notes: 'Fuerte devaluación por caída del petróleo' },
  { indicatorId: 'tasa-cambio', year: 2016, value: 3053, unit: 'COP/USD', sourceId: 'banrep', notes: 'Máximo Santos; peso muy débil' },
  { indicatorId: 'tasa-cambio', year: 2017, value: 2951, unit: 'COP/USD', sourceId: 'banrep' },
  { indicatorId: 'tasa-cambio', year: 2018, value: 2956, unit: 'COP/USD', sourceId: 'banrep', notes: 'Inicio Duque' },
  { indicatorId: 'tasa-cambio', year: 2019, value: 3281, unit: 'COP/USD', sourceId: 'banrep' },
  { indicatorId: 'tasa-cambio', year: 2020, value: 3694, unit: 'COP/USD', sourceId: 'banrep', notes: '⚠️ COVID: devaluación fuerte' },
  { indicatorId: 'tasa-cambio', year: 2021, value: 3744, unit: 'COP/USD', sourceId: 'banrep' },
  { indicatorId: 'tasa-cambio', year: 2022, value: 4256, unit: 'COP/USD', sourceId: 'banrep', notes: 'Transición; Petro llegó con peso debilitado; luego subió a $5.000 en oct 2022' },
  { indicatorId: 'tasa-cambio', year: 2023, value: 4325, unit: 'COP/USD', sourceId: 'banrep', notes: 'Petro: incertidumbre reformas mantuvo peso débil' },
  { indicatorId: 'tasa-cambio', year: 2024, value: 4175, unit: 'COP/USD', sourceId: 'banrep', notes: 'Estimado; leve apreciación' },
];

// Tasa de política monetaria Banco de la República (tasa de repo) - fin de año
export const POLICY_RATE: Observation[] = [
  { indicatorId: 'tasa-banrep', year: 2002, value: 5.25, unit: '%', sourceId: 'banrep', notes: 'Inicio Uribe; tasas en descenso post-crisis' },
  { indicatorId: 'tasa-banrep', year: 2004, value: 6.5, unit: '%', sourceId: 'banrep' },
  { indicatorId: 'tasa-banrep', year: 2006, value: 6.0, unit: '%', sourceId: 'banrep', notes: 'Inicio Uribe II' },
  { indicatorId: 'tasa-banrep', year: 2008, value: 9.5, unit: '%', sourceId: 'banrep', notes: 'Alza por inflación de commodities' },
  { indicatorId: 'tasa-banrep', year: 2009, value: 3.5, unit: '%', sourceId: 'banrep', notes: 'Caída drástica por crisis global; Banrep reaccionó rápido' },
  { indicatorId: 'tasa-banrep', year: 2010, value: 3.0, unit: '%', sourceId: 'banrep', notes: 'Inicio Santos; mínimo histórico de esa época' },
  { indicatorId: 'tasa-banrep', year: 2011, value: 4.75, unit: '%', sourceId: 'banrep' },
  { indicatorId: 'tasa-banrep', year: 2013, value: 3.25, unit: '%', sourceId: 'banrep' },
  { indicatorId: 'tasa-banrep', year: 2015, value: 5.75, unit: '%', sourceId: 'banrep', notes: 'Inicio Santos II; alza por inflación' },
  { indicatorId: 'tasa-banrep', year: 2016, value: 7.75, unit: '%', sourceId: 'banrep', notes: 'Máximo Santos; inflación 5.7%' },
  { indicatorId: 'tasa-banrep', year: 2017, value: 4.75, unit: '%', sourceId: 'banrep' },
  { indicatorId: 'tasa-banrep', year: 2018, value: 4.25, unit: '%', sourceId: 'banrep', notes: 'Inicio Duque; tasas bajas' },
  { indicatorId: 'tasa-banrep', year: 2019, value: 4.25, unit: '%', sourceId: 'banrep' },
  { indicatorId: 'tasa-banrep', year: 2020, value: 1.75, unit: '%', sourceId: 'banrep', notes: '⚠️ COVID: Banrep bajó a mínimo histórico para estimular economía' },
  { indicatorId: 'tasa-banrep', year: 2021, value: 3.0, unit: '%', sourceId: 'banrep' },
  { indicatorId: 'tasa-banrep', year: 2022, value: 12.0, unit: '%', sourceId: 'banrep', notes: '⚠️ Petro llega con tasas disparándose: Banrep subió 10.25pp en 12 meses; mayor ciclo de alza en historia del Banrep' },
  { indicatorId: 'tasa-banrep', year: 2023, value: 13.25, unit: '%', sourceId: 'banrep', notes: 'Máximo histórico absoluto; crédito muy caro; frena inversión y consumo' },
  { indicatorId: 'tasa-banrep', year: 2024, value: 9.75, unit: '%', sourceId: 'banrep', notes: 'Descenso gradual; inflación bajando' },
];

// PIB per cápita en USD constantes (año 2015) - Banco Mundial
export const GDP_PER_CAPITA: Observation[] = [
  { indicatorId: 'pib-percapita', year: 1994, value: 3380, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Samper' },
  { indicatorId: 'pib-percapita', year: 1998, value: 3620, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Pastrana' },
  { indicatorId: 'pib-percapita', year: 1999, value: 3420, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Crisis: caída real del ingreso por habitante' },
  { indicatorId: 'pib-percapita', year: 2002, value: 3510, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Uribe I' },
  { indicatorId: 'pib-percapita', year: 2005, value: 3970, unit: 'USD 2015', sourceId: 'worldbank' },
  { indicatorId: 'pib-percapita', year: 2006, value: 4230, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Uribe II; boom' },
  { indicatorId: 'pib-percapita', year: 2008, value: 4630, unit: 'USD 2015', sourceId: 'worldbank' },
  { indicatorId: 'pib-percapita', year: 2010, value: 4800, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Santos I' },
  { indicatorId: 'pib-percapita', year: 2013, value: 5620, unit: 'USD 2015', sourceId: 'worldbank' },
  { indicatorId: 'pib-percapita', year: 2014, value: 5830, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Santos II; pico antes de caída del petróleo' },
  { indicatorId: 'pib-percapita', year: 2016, value: 5740, unit: 'USD 2015', sourceId: 'worldbank' },
  { indicatorId: 'pib-percapita', year: 2017, value: 5760, unit: 'USD 2015', sourceId: 'worldbank' },
  { indicatorId: 'pib-percapita', year: 2018, value: 5960, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Inicio Duque' },
  { indicatorId: 'pib-percapita', year: 2019, value: 6120, unit: 'USD 2015', sourceId: 'worldbank' },
  { indicatorId: 'pib-percapita', year: 2020, value: 5670, unit: 'USD 2015', sourceId: 'worldbank', notes: '⚠️ COVID: mayor caída absoluta en décadas' },
  { indicatorId: 'pib-percapita', year: 2021, value: 6200, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Rebote; aún no recupera nivel 2019' },
  { indicatorId: 'pib-percapita', year: 2022, value: 6630, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Nuevo máximo histórico; transición Duque-Petro' },
  { indicatorId: 'pib-percapita', year: 2023, value: 6640, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Petro: estancamiento; desaceleración +0.6%' },
  { indicatorId: 'pib-percapita', year: 2024, value: 6750, unit: 'USD 2015', sourceId: 'worldbank', notes: 'Estimado; recuperación lenta' },
];

// CONTEXTO INTERNACIONAL — Crecimiento global (PIB mundial) - FMI WEO
// Para entender si Colombia creció más o menos que el mundo
export const WORLD_GDP_GROWTH: Observation[] = [
  { indicatorId: 'crecimiento-mundial', year: 1994, value: 3.6, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 1998, value: 2.6, unit: '%', sourceId: 'imf', notes: 'Crisis Asia' },
  { indicatorId: 'crecimiento-mundial', year: 1999, value: 3.5, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2001, value: 2.5, unit: '%', sourceId: 'imf', notes: 'Post-11S; recesión técnica EE.UU.' },
  { indicatorId: 'crecimiento-mundial', year: 2002, value: 3.0, unit: '%', sourceId: 'imf', notes: 'Inicio Uribe' },
  { indicatorId: 'crecimiento-mundial', year: 2004, value: 5.1, unit: '%', sourceId: 'imf', notes: 'Boom China; mejor año del ciclo 2000s' },
  { indicatorId: 'crecimiento-mundial', year: 2005, value: 4.8, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2006, value: 5.2, unit: '%', sourceId: 'imf', notes: 'Inicio Uribe II' },
  { indicatorId: 'crecimiento-mundial', year: 2007, value: 5.4, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2008, value: 3.1, unit: '%', sourceId: 'imf', notes: 'Crisis financiera global' },
  { indicatorId: 'crecimiento-mundial', year: 2009, value: -0.1, unit: '%', sourceId: 'imf', notes: 'Recesión global; único año negativo moderno (hasta COVID)' },
  { indicatorId: 'crecimiento-mundial', year: 2010, value: 5.4, unit: '%', sourceId: 'imf', notes: 'Inicio Santos; fuerte rebote global' },
  { indicatorId: 'crecimiento-mundial', year: 2011, value: 4.3, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2012, value: 3.5, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2013, value: 3.5, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2014, value: 3.6, unit: '%', sourceId: 'imf', notes: 'Inicio Santos II' },
  { indicatorId: 'crecimiento-mundial', year: 2015, value: 3.5, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2016, value: 3.3, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2017, value: 3.9, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2018, value: 3.6, unit: '%', sourceId: 'imf', notes: 'Inicio Duque' },
  { indicatorId: 'crecimiento-mundial', year: 2019, value: 2.9, unit: '%', sourceId: 'imf' },
  { indicatorId: 'crecimiento-mundial', year: 2020, value: -3.1, unit: '%', sourceId: 'imf', notes: '⚠️ COVID: peor año global desde Gran Depresión' },
  { indicatorId: 'crecimiento-mundial', year: 2021, value: 6.2, unit: '%', sourceId: 'imf', notes: 'Rebote global; Colombia creció más (10.6%) que el mundo (6.2%)' },
  { indicatorId: 'crecimiento-mundial', year: 2022, value: 3.5, unit: '%', sourceId: 'imf', notes: 'Colombia creció 7.5% vs mundo 3.5%; excepcional pero irrepetible' },
  { indicatorId: 'crecimiento-mundial', year: 2023, value: 3.3, unit: '%', sourceId: 'imf', notes: 'Petro: Colombia creció 0.6% vs mundo 3.3%; Colombia rezagada' },
  { indicatorId: 'crecimiento-mundial', year: 2024, value: 3.2, unit: '%', sourceId: 'imf', notes: 'Colombia proyectada 1.8%; debajo del mundo' },
];

// Recaudo tributario como % del PIB - DIAN / Ministerio de Hacienda
// Para entender la "capacidad fiscal" de Colombia en el contexto de sus políticas sociales
export const TAX_REVENUE: Observation[] = [
  { indicatorId: 'recaudo-tributario', year: 2000, value: 12.5, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2002, value: 13.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe; impuesto al patrimonio de seguridad' },
  { indicatorId: 'recaudo-tributario', year: 2004, value: 14.1, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2006, value: 14.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Uribe II' },
  { indicatorId: 'recaudo-tributario', year: 2008, value: 14.5, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2010, value: 13.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos; reducción por caída inversión' },
  { indicatorId: 'recaudo-tributario', year: 2012, value: 14.7, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2014, value: 14.5, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Santos II' },
  { indicatorId: 'recaudo-tributario', year: 2015, value: 14.6, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2016, value: 14.3, unit: '% PIB', sourceId: 'mhcp', notes: 'Reforma tributaria 2016' },
  { indicatorId: 'recaudo-tributario', year: 2017, value: 14.8, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2018, value: 15.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Inicio Duque; reforma Ley de Financiamiento' },
  { indicatorId: 'recaudo-tributario', year: 2019, value: 14.6, unit: '% PIB', sourceId: 'mhcp' },
  { indicatorId: 'recaudo-tributario', year: 2020, value: 13.6, unit: '% PIB', sourceId: 'mhcp', notes: 'COVID: economía cayó, recaudo cayó más' },
  { indicatorId: 'recaudo-tributario', year: 2021, value: 15.0, unit: '% PIB', sourceId: 'mhcp', notes: 'Reactivación; reforma fiscal aplazada' },
  { indicatorId: 'recaudo-tributario', year: 2022, value: 16.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Reforma tributaria Petro (2022): +$20 billones; IVA, impuesto a ganancias súbitas, renta' },
  { indicatorId: 'recaudo-tributario', year: 2023, value: 16.2, unit: '% PIB', sourceId: 'mhcp', notes: 'Petro: ligera caída; economía desacelerada reduce base tributaria' },
  { indicatorId: 'recaudo-tributario', year: 2024, value: 15.8, unit: '% PIB', sourceId: 'mhcp', notes: 'Estimado; debate sobre incumplimiento metas de recaudo' },
];

// COMPARACIÓN PRESIÓN TRIBUTARIA INTERNACIONAL (% del PIB) - OCDE/Banco Mundial
// Para contextualizar cuando se habla de "Colombia puede entregar más subsidios"
export const TAX_REVENUE_INTERNATIONAL = [
  { country: 'Colombia', value: 16.2, year: 2023, gdpPerCapita: 6640, informality: 56, notes: 'Post-reforma Petro; excluye regalías petróleo' },
  { country: 'Chile', value: 20.8, year: 2023, gdpPerCapita: 14800, informality: 28, notes: 'Más alta por menor informalidad y PIB pc más alto' },
  { country: 'México', value: 17.2, year: 2023, gdpPerCapita: 10800, informality: 56, notes: 'Similar informalidad pero incluye Pemex' },
  { country: 'Perú', value: 16.1, year: 2023, gdpPerCapita: 6900, informality: 70, notes: 'Similar a Colombia; alta informalidad' },
  { country: 'Brasil', value: 31.4, year: 2023, gdpPerCapita: 8900, informality: 40, notes: '⚠️ Alta presión fiscal pero también más servicios y gasto social' },
  { country: 'Argentina', value: 29.1, year: 2023, gdpPerCapita: 10400, informality: 44, notes: 'Alta presión y alta deuda; crisis fiscal crónica' },
  { country: 'Uruguay', value: 27.0, year: 2023, gdpPerCapita: 17800, informality: 23, notes: 'Referente regional; menor informalidad' },
  { country: 'Costa Rica', value: 24.6, year: 2023, gdpPerCapita: 12300, informality: 35, notes: 'Referente AL en gasto social y educación' },
  { country: 'Promedio AL', value: 21.9, year: 2023, gdpPerCapita: 9200, informality: 50, notes: 'CEPAL 2023' },
  { country: 'Promedio OCDE', value: 34.0, year: 2023, gdpPerCapita: 46000, informality: 12, notes: '⚠️ Economías 7x Colombia en PIB per cápita; formalidad casi total' },
  { country: 'Dinamarca', value: 46.9, year: 2023, gdpPerCapita: 68000, informality: 8, notes: 'Estado de bienestar máximo; PIB 10x Colombia' },
  { country: 'España', value: 38.3, year: 2023, gdpPerCapita: 30700, informality: 15, notes: 'Comparable solo superficialmente con Colombia' },
];
