import { Observation } from '@/types';

// Colombia participó por primera vez en PISA en 2006.
// El promedio OCDE en lectura y matemáticas ronda los 487-489 puntos.
// Los datos tienen frecuencia trienal (ciclo PISA).

// PISA Lectura — OCDE
export const PISA_LECTURA: Observation[] = [
  { indicatorId: 'pisa-lectura', year: 2006, value: 385, unit: 'puntos', sourceId: 'ocde', notes: 'Primera participación Colombia en PISA' },
  { indicatorId: 'pisa-lectura', year: 2009, value: 413, unit: 'puntos', sourceId: 'ocde' },
  { indicatorId: 'pisa-lectura', year: 2012, value: 403, unit: 'puntos', sourceId: 'ocde' },
  { indicatorId: 'pisa-lectura', year: 2015, value: 425, unit: 'puntos', sourceId: 'ocde', notes: 'Máximo histórico Colombia en PISA Lectura' },
  { indicatorId: 'pisa-lectura', year: 2018, value: 412, unit: 'puntos', sourceId: 'ocde', notes: 'Promedio OCDE 2018: 487 pts' },
  { indicatorId: 'pisa-lectura', year: 2022, value: 409, unit: 'puntos', sourceId: 'ocde', notes: '⚠️ Pandemia afectó aprendizajes globalmente; promedio OCDE cayó 10pp' },
];

// PISA Matemáticas — OCDE
export const PISA_MATEMATICAS: Observation[] = [
  { indicatorId: 'pisa-matematicas', year: 2006, value: 370, unit: 'puntos', sourceId: 'ocde' },
  { indicatorId: 'pisa-matematicas', year: 2009, value: 381, unit: 'puntos', sourceId: 'ocde' },
  { indicatorId: 'pisa-matematicas', year: 2012, value: 376, unit: 'puntos', sourceId: 'ocde' },
  { indicatorId: 'pisa-matematicas', year: 2015, value: 390, unit: 'puntos', sourceId: 'ocde' },
  { indicatorId: 'pisa-matematicas', year: 2018, value: 391, unit: 'puntos', sourceId: 'ocde', notes: 'Máximo histórico Colombia en PISA Matemáticas; Promedio OCDE 2018: 487 pts' },
  { indicatorId: 'pisa-matematicas', year: 2022, value: 383, unit: 'puntos', sourceId: 'ocde', notes: '⚠️ Caída post-pandemia; mayor impacto en matemáticas que en lectura' },
];

// Tasa de Deserción Escolar Intra-Anual — MEN / SIMAT
export const DESERCION_ESCOLAR: Observation[] = [
  { indicatorId: 'desercion-escolar', year: 2005, value: 6.9, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2006, value: 6.5, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2007, value: 6.1, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2008, value: 5.9, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2009, value: 5.6, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2010, value: 5.2, unit: '%', sourceId: 'men', notes: 'Inicio Santos I; descenso sostenido desde 2002' },
  { indicatorId: 'desercion-escolar', year: 2011, value: 4.9, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2012, value: 4.7, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2013, value: 4.5, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2014, value: 4.3, unit: '%', sourceId: 'men', notes: 'Inicio Santos II' },
  { indicatorId: 'desercion-escolar', year: 2015, value: 4.0, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2016, value: 3.7, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2017, value: 3.6, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2018, value: 3.4, unit: '%', sourceId: 'men', notes: 'Inicio Duque; mínimo histórico' },
  { indicatorId: 'desercion-escolar', year: 2019, value: 3.5, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2020, value: 3.9, unit: '%', sourceId: 'men', notes: '⚠️ COVID: cierre de colegios aumentó deserción; rural superó 8%' },
  { indicatorId: 'desercion-escolar', year: 2021, value: 3.8, unit: '%', sourceId: 'men', notes: 'Recuperación parcial; brecha urbana-rural aún amplia' },
  { indicatorId: 'desercion-escolar', year: 2022, value: 3.5, unit: '%', sourceId: 'men' },
  { indicatorId: 'desercion-escolar', year: 2023, value: 3.3, unit: '%', sourceId: 'men', notes: 'Preliminar; retorno post-COVID sostenido' },
];

// Cobertura Bruta Educación Superior — MEN / SNIES
// Fuente: MEN - Sistema Nacional de Información de la Educación Superior (SNIES)
export const COBERTURA_SUPERIOR: Observation[] = [
  { indicatorId: 'cobertura-superior', year: 2002, value: 22.5, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2005, value: 25.6, unit: '%', sourceId: 'men', notes: 'Inicio segundo mandato Uribe; plan de ampliación cobertura' },
  { indicatorId: 'cobertura-superior', year: 2006, value: 27.1, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2007, value: 29.3, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2008, value: 31.0, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2009, value: 33.0, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2010, value: 37.1, unit: '%', sourceId: 'men', notes: 'Inicio Santos I; política "Colombia la Más Educada"' },
  { indicatorId: 'cobertura-superior', year: 2011, value: 40.4, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2012, value: 42.4, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2013, value: 45.5, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2014, value: 47.8, unit: '%', sourceId: 'men', notes: 'Inicio Santos II' },
  { indicatorId: 'cobertura-superior', year: 2015, value: 49.4, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2016, value: 51.5, unit: '%', sourceId: 'men', notes: 'Hito: supera el 50% por primera vez en la historia' },
  { indicatorId: 'cobertura-superior', year: 2017, value: 52.2, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2018, value: 52.8, unit: '%', sourceId: 'men', notes: 'Inicio Duque' },
  { indicatorId: 'cobertura-superior', year: 2019, value: 53.8, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2020, value: 54.9, unit: '%', sourceId: 'men', notes: '⚠️ Pandemia: cifra inflada por virtualización masiva sin garantía de calidad' },
  { indicatorId: 'cobertura-superior', year: 2021, value: 51.3, unit: '%', sourceId: 'men', notes: 'Ajuste post-pandemia: deserción universitaria aumentó significativamente' },
  { indicatorId: 'cobertura-superior', year: 2022, value: 51.9, unit: '%', sourceId: 'men' },
  { indicatorId: 'cobertura-superior', year: 2023, value: 52.2, unit: '%', sourceId: 'men', notes: 'Petro: matrícula cero en IES públicas busca revertir tendencia; impacto 2024+' },
];
