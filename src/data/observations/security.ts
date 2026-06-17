import { Observation } from '@/types';

// Tasa de homicidios por 100.000 hab - Medicina Legal / Policía Nacional
export const HOMICIDE_RATE: Observation[] = [
  { indicatorId: 'homicidios-tasa', year: 1990, value: 79.3, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Pico histórico: carteles Medellín y Cali, guerra total' },
  { indicatorId: 'homicidios-tasa', year: 1991, value: 81.8, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Máximo histórico absoluto' },
  { indicatorId: 'homicidios-tasa', year: 1992, value: 79.7, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 1993, value: 73.9, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Muerte de Pablo Escobar (dic 1993)' },
  { indicatorId: 'homicidios-tasa', year: 1994, value: 71.3, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Samper' },
  { indicatorId: 'homicidios-tasa', year: 1995, value: 65.3, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 1996, value: 63.1, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 1997, value: 60.8, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 1998, value: 57.2, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Pastrana; expansión FARC y AUC en confrontación' },
  { indicatorId: 'homicidios-tasa', year: 1999, value: 60.5, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Zona de Despeje; paradoja: más violencia con diálogos' },
  { indicatorId: 'homicidios-tasa', year: 2000, value: 63.3, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Pico durante Pastrana; FARC y AUC en confrontación territorial' },
  { indicatorId: 'homicidios-tasa', year: 2001, value: 65.8, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Máximo en mandato de Pastrana' },
  { indicatorId: 'homicidios-tasa', year: 2002, value: 65.8, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Uribe I; cifra hereda contexto de violencia extrema' },
  { indicatorId: 'homicidios-tasa', year: 2003, value: 52.9, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Primera caída significativa; Seguridad Democrática y ofensiva militar' },
  { indicatorId: 'homicidios-tasa', year: 2004, value: 44.7, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 2005, value: 40.3, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Desmovilización AUC en proceso' },
  { indicatorId: 'homicidios-tasa', year: 2006, value: 38.3, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Uribe II' },
  { indicatorId: 'homicidios-tasa', year: 2007, value: 37.4, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 2008, value: 35.9, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 2009, value: 35.5, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 2010, value: 34.5, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Santos I' },
  { indicatorId: 'homicidios-tasa', year: 2011, value: 34.5, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 2012, value: 32.4, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio diálogos La Habana (oct 2012)' },
  { indicatorId: 'homicidios-tasa', year: 2013, value: 31.5, unit: 'x100k', sourceId: 'medicina-legal' },
  { indicatorId: 'homicidios-tasa', year: 2014, value: 28.5, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Santos II' },
  { indicatorId: 'homicidios-tasa', year: 2015, value: 26.1, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Cese al fuego unilateral FARC; caída significativa' },
  { indicatorId: 'homicidios-tasa', year: 2016, value: 25.0, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Firma Acuerdo de Paz; mínimo histórico' },
  { indicatorId: 'homicidios-tasa', year: 2017, value: 24.4, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Mínimo histórico moderno' },
  { indicatorId: 'homicidios-tasa', year: 2018, value: 25.0, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Inicio Duque; leve aumento; reconfiguración grupos armados' },
  { indicatorId: 'homicidios-tasa', year: 2019, value: 25.7, unit: 'x100k', sourceId: 'medicina-legal', notes: 'ELN y disidencias FARC llenan vacíos' },
  { indicatorId: 'homicidios-tasa', year: 2020, value: 23.9, unit: 'x100k', sourceId: 'medicina-legal', notes: 'COVID: movilidad reducida afectó temporalmente estadísticas' },
  { indicatorId: 'homicidios-tasa', year: 2021, value: 26.5, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Aumento post-pandemia; masacres múltiples; paro nacional' },
  { indicatorId: 'homicidios-tasa', year: 2022, value: 27.0, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Forensis 2022 Medicina Legal: 13.939 casos = ~26.97 x100k. Transición Duque-Petro; Petro anuncia "Paz Total". Dato ajustado de 26.1 a 27.0.' },
  { indicatorId: 'homicidios-tasa', year: 2023, value: 27.2, unit: 'x100k', sourceId: 'medicina-legal', notes: '⚠️ Aumento vs 2022; grupos armados reconfigurados; negociaciones "Paz Total" lentas. Total trienio Petro (ago 2022–ago 2025): 40.663 homicidios = +7.6% vs trienio equivalente de Duque (37.795), según U. Externado / Medicina Legal.' },
  { indicatorId: 'homicidios-tasa', year: 2024, value: 26.8, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Preliminar; leve descenso vs 2023 pero nivel aún mayor al inicio de Petro. Violencia concentrada en Caribe, Catatumbo y Cauca.' },
  { indicatorId: 'homicidios-tasa', year: 2025, value: 25.4, unit: 'x100k', sourceId: 'medicina-legal', notes: 'Preliminar; leve mejora; Catatumbo y Cauca siguen siendo focos' },
];

// Secuestros (casos totales) - Policía Nacional / Fondelibertad
export const KIDNAPPINGS: Observation[] = [
  { indicatorId: 'secuestros', year: 1996, value: 1938, unit: 'casos', sourceId: 'policia', notes: 'Samper; era de las FARC como fuerza de secuestro masivo' },
  { indicatorId: 'secuestros', year: 1997, value: 2121, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 1998, value: 2860, unit: 'casos', sourceId: 'policia', notes: 'Inicio Pastrana; pico en construcción' },
  { indicatorId: 'secuestros', year: 1999, value: 3004, unit: 'casos', sourceId: 'policia', notes: 'Zona de Despeje paradoja: más secuestros con negociaciones' },
  { indicatorId: 'secuestros', year: 2000, value: 3706, unit: 'casos', sourceId: 'policia', notes: 'Máximo histórico absoluto' },
  { indicatorId: 'secuestros', year: 2001, value: 3041, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2002, value: 2882, unit: 'casos', sourceId: 'policia', notes: 'Inicio Uribe; aún altísimo' },
  { indicatorId: 'secuestros', year: 2003, value: 2121, unit: 'casos', sourceId: 'policia', notes: 'Caída marcada; Seguridad Democrática' },
  { indicatorId: 'secuestros', year: 2004, value: 1441, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2005, value: 800, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2006, value: 687, unit: 'casos', sourceId: 'policia', notes: 'Inicio Uribe II' },
  { indicatorId: 'secuestros', year: 2007, value: 521, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2008, value: 437, unit: 'casos', sourceId: 'policia', notes: 'Rescate Ingrid Betancourt (operación Jaque)' },
  { indicatorId: 'secuestros', year: 2009, value: 213, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2010, value: 282, unit: 'casos', sourceId: 'policia', notes: 'Inicio Santos' },
  { indicatorId: 'secuestros', year: 2011, value: 305, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2012, value: 305, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2013, value: 299, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2014, value: 213, unit: 'casos', sourceId: 'policia', notes: 'Inicio Santos II' },
  { indicatorId: 'secuestros', year: 2015, value: 188, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2016, value: 154, unit: 'casos', sourceId: 'policia', notes: 'Acuerdo de Paz: mínimo histórico durante Santos' },
  { indicatorId: 'secuestros', year: 2017, value: 176, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2018, value: 207, unit: 'casos', sourceId: 'policia', notes: 'Inicio Duque; leve aumento' },
  { indicatorId: 'secuestros', year: 2019, value: 193, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2020, value: 148, unit: 'casos', sourceId: 'policia', notes: 'COVID: movilidad reducida' },
  { indicatorId: 'secuestros', year: 2021, value: 169, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'secuestros', year: 2022, value: 193, unit: 'casos', sourceId: 'policia', notes: 'Transición; fin Duque' },
  { indicatorId: 'secuestros', year: 2023, value: 188, unit: 'casos', sourceId: 'policia', notes: 'Petro: debate sobre si Paz Total reduce o no el secuestro' },
  { indicatorId: 'secuestros', year: 2024, value: 172, unit: 'casos', sourceId: 'policia', notes: 'Preliminar' },
  { indicatorId: 'secuestros', year: 2025, value: 158, unit: 'casos', sourceId: 'policia', notes: 'Preliminar' },
];

// Masacres (3+ víctimas mismo lugar) - Indepaz (más completo) / Medicina Legal
// NOTA: Valores 2018 y 2019 corregidos en auditoría jun-2025 contra Indepaz primario.
// Fuente verificada: indepaz.org.co + ColombiaCheck cross-verificación.
export const MASSACRES: Observation[] = [
  { indicatorId: 'masacres', year: 2014, value: 15, unit: 'eventos', sourceId: 'indepaz', notes: 'Inicio Santos II; datos Indepaz; inicio de serie comparable' },
  { indicatorId: 'masacres', year: 2015, value: 12, unit: 'eventos', sourceId: 'indepaz' },
  { indicatorId: 'masacres', year: 2016, value: 14, unit: 'eventos', sourceId: 'indepaz', notes: 'Acuerdo de Paz firmado' },
  { indicatorId: 'masacres', year: 2017, value: 19, unit: 'eventos', sourceId: 'indepaz' },
  { indicatorId: 'masacres', year: 2018, value: 36, unit: 'eventos', sourceId: 'indepaz', notes: 'Año completo 2018; desde el 7-ago (inicio Duque) = ~17 eventos; grupos armados llenan vacíos FARC. Dato corregido de 23 a 36 (fuente: Indepaz informe anual / ColombiaCheck).' },
  { indicatorId: 'masacres', year: 2019, value: 51, unit: 'eventos', sourceId: 'indepaz', notes: '⚠️ Aumento acelerado; ELN y disidencias FARC en expansión territorial. Dato corregido de 36 a 51 (fuente: Indepaz, múltiples fuentes verificadas).' },
  { indicatorId: 'masacres', year: 2020, value: 91, unit: 'eventos', sourceId: 'indepaz', notes: '⚠️ Pico histórico Duque: 91 masacres en un año; cuarentena aisló territorios del Estado' },
  { indicatorId: 'masacres', year: 2021, value: 96, unit: 'eventos', sourceId: 'indepaz', notes: '⚠️ Máximo absoluto bajo metodología Indepaz; 33 departamentos afectados' },
  { indicatorId: 'masacres', year: 2022, value: 94, unit: 'eventos', sourceId: 'indepaz', notes: 'Transición Duque-Petro; cifras aún muy altas; nivel prácticamente igual al máximo Duque' },
  { indicatorId: 'masacres', year: 2023, value: 94, unit: 'eventos', sourceId: 'indepaz', notes: 'Petro: 94 masacres según Indepaz — igual que 2022; "Paz Total" no redujo masacres en 2023. Dato corregido de 89 a 94.' },
  { indicatorId: 'masacres', year: 2024, value: 76, unit: 'eventos', sourceId: 'indepaz', notes: 'Primer descenso real (-19%) bajo Petro; pero nivel sigue siendo 2x el de 2017. Fuente: Indepaz + Infobae ene-2025.' },
  { indicatorId: 'masacres', year: 2025, value: 68, unit: 'eventos', sourceId: 'indepaz', notes: 'Preliminar; descenso continúa' },
];

// Desplazamiento forzado (declaraciones recibidas) - UARIV / RUV
export const DISPLACEMENT: Observation[] = [
  { indicatorId: 'desplazamiento', year: 1996, value: 181000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio del desplazamiento masivo moderno; FARC y AUC en expansión territorial' },
  { indicatorId: 'desplazamiento', year: 1997, value: 257000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Masacres AUC en Urabá, sur de Bolívar; desplazamiento como arma de guerra' },
  { indicatorId: 'desplazamiento', year: 1998, value: 308000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio Pastrana; conflicto recrudece en zonas rurales' },
  { indicatorId: 'desplazamiento', year: 1999, value: 288000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Zona de Despeje (Caguán); la negociación no detiene el desplazamiento' },
  { indicatorId: 'desplazamiento', year: 2000, value: 321000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Pico bajo Pastrana; violencia rural en máximos históricos' },
  { indicatorId: 'desplazamiento', year: 2001, value: 343000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2002, value: 413000, unit: 'personas', sourceId: 'unidad-victimas', notes: '⚠️ Pico absoluto: ofensiva FARC-AUC; inicio Uribe con la peor crisis humanitaria de desplazamiento' },
  { indicatorId: 'desplazamiento', year: 2003, value: 221000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Seguridad Democrática recupera territorios; primera caída significativa' },
  { indicatorId: 'desplazamiento', year: 2004, value: 287000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2005, value: 310000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Desmovilización AUC incompleta; BACRIM ocupan espacios dejados' },
  { indicatorId: 'desplazamiento', year: 2006, value: 221000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio Uribe II' },
  { indicatorId: 'desplazamiento', year: 2007, value: 305000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2008, value: 380000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Pico bajo Uribe II; ofensivas militares generan desplazamiento colateral' },
  { indicatorId: 'desplazamiento', year: 2009, value: 286000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2010, value: 280000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio Santos I' },
  { indicatorId: 'desplazamiento', year: 2011, value: 259000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2012, value: 223000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio diálogos La Habana; tendencia bajista consistente' },
  { indicatorId: 'desplazamiento', year: 2013, value: 196000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2014, value: 137000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio Santos II; acercamiento de paz reduce violencia rural' },
  { indicatorId: 'desplazamiento', year: 2015, value: 67000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Cese unilateral FARC (dic 2014); caída dramática; mínimo histórico moderno' },
  { indicatorId: 'desplazamiento', year: 2016, value: 75000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Firma del Acuerdo de Paz; vacíos territoriales FARC crean nuevos desplazamientos locales' },
  { indicatorId: 'desplazamiento', year: 2017, value: 71000, unit: 'personas', sourceId: 'unidad-victimas' },
  { indicatorId: 'desplazamiento', year: 2018, value: 145000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio Duque; rearme de disidencias FARC y expansión del ELN llenan vacíos' },
  { indicatorId: 'desplazamiento', year: 2019, value: 184000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Aumento preocupante; territorios rurales sin presencia estatal efectiva' },
  { indicatorId: 'desplazamiento', year: 2020, value: 79000, unit: 'personas', sourceId: 'unidad-victimas', notes: '⚠️ COVID: reducción aparente por confinamientos y limitaciones al registro, no refleja mejora real' },
  { indicatorId: 'desplazamiento', year: 2021, value: 105000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Recuperación post-COVID; conflictos activos en Cauca, Chocó, Catatumbo' },
  { indicatorId: 'desplazamiento', year: 2022, value: 120000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Inicio Petro; "Paz Total" no detiene desplazamiento a corto plazo' },
  { indicatorId: 'desplazamiento', year: 2023, value: 158000, unit: 'personas', sourceId: 'unidad-victimas', notes: '⚠️ Aumento significativo; fracasos en ceses al fuego con varios grupos; dato preliminar' },
  { indicatorId: 'desplazamiento', year: 2024, value: 142000, unit: 'personas', sourceId: 'unidad-victimas', notes: '⚠️ Preliminar; datos en consolidación en el RUV' },
  { indicatorId: 'desplazamiento', year: 2025, value: 125000, unit: 'personas', sourceId: 'unidad-victimas', notes: 'Preliminar' },
];

// Líderes sociales y defensores de DDHH asesinados - Indepaz
// METODOLOGÍA CRÍTICA: Indepaz publica DOS series SEPARADAS:
//   (1) Líderes sociales y defensores de DDHH (esta serie)
//   (2) Firmantes del Acuerdo de Paz / Excombatientes FARC (categoría distinta)
// Esta serie es SOLO líderes sociales. Para excombatientes, ver notas.
// Auditoría jun-2025 corrigió 2021 (315→171) contra informe primario Indepaz.
// Total Indepaz bajo Duque (ago 2018–ago 2022): 957 líderes sociales.
// Total Petro (primeros 3 años): ~549 líderes sociales (189+187+173).
export const SOCIAL_LEADERS_KILLED: Observation[] = [
  { indicatorId: 'lideres-sociales', year: 2016, value: 133, unit: 'personas', sourceId: 'indepaz', notes: 'Inicio seguimiento sistemático post-Acuerdo de Paz' },
  { indicatorId: 'lideres-sociales', year: 2017, value: 208, unit: 'personas', sourceId: 'indepaz' },
  { indicatorId: 'lideres-sociales', year: 2018, value: 172, unit: 'personas', sourceId: 'indepaz', notes: '⚠️ Dato pendiente de verificación final: Indepaz informe jul-2019 reporta 282 para año completo 2018; 172 podría corresponder al periodo Duque desde ago-7. Fuentes divergen.' },
  { indicatorId: 'lideres-sociales', year: 2019, value: 194, unit: 'personas', sourceId: 'indepaz', notes: 'Estimado: calculado a partir del total Indepaz gobierno Duque (957) menos los años con datos directos. Verificar contra informe Indepaz 2019.' },
  { indicatorId: 'lideres-sociales', year: 2020, value: 310, unit: 'personas', sourceId: 'indepaz', notes: 'COVID: territorios aislados sin presencia del Estado; máximo anual en la serie. Indepaz informe 2020 verificado.' },
  { indicatorId: 'lideres-sociales', year: 2021, value: 171, unit: 'personas', sourceId: 'indepaz', notes: '⚠️ Corregido de 315 a 171: Indepaz informe oficial 2021 = 171 líderes sociales + 43 firmantes FARC (separados). La cifra 315 era incorrecta. (Firmantes no incluidos en esta serie.)' },
  { indicatorId: 'lideres-sociales', year: 2022, value: 189, unit: 'personas', sourceId: 'indepaz', notes: 'Indepaz informe anual 2022: 189 líderes sociales + 42 firmantes FARC (categoría aparte). Transición Duque-Petro.' },
  { indicatorId: 'lideres-sociales', year: 2023, value: 187, unit: 'personas', sourceId: 'indepaz', notes: 'Indepaz informe anual 2023: 187 líderes sociales + 44 firmantes FARC (aparte). Petro: nivel aún alarmante bajo "Paz Total".' },
  { indicatorId: 'lideres-sociales', year: 2024, value: 173, unit: 'personas', sourceId: 'indepaz', notes: 'Indepaz informe anual 2024: 173 líderes sociales + 31 firmantes (aparte). Descenso leve respecto a 2022-2023 pero nivel aún inaceptable.' },
  { indicatorId: 'lideres-sociales', year: 2025, value: 124, unit: 'personas', sourceId: 'indepaz', notes: 'Preliminar; tendencia de descenso pero nivel aún alto' },
];

// Extorsión (casos reportados) - Policía Nacional / SIEDCO
// ⚠️ Subregistro extremo: se estima que solo el 5-10% de los casos son denunciados
export const EXTORSION: Observation[] = [
  { indicatorId: 'extorsion', year: 2010, value: 1118, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2011, value: 1456, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2012, value: 1890, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2013, value: 2210, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2014, value: 2412, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2015, value: 2876, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2016, value: 3147, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2017, value: 3420, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2018, value: 3587, unit: 'casos', sourceId: 'policia', notes: 'Inicio Duque; BACRIM y ELN como principales extorsionadores' },
  { indicatorId: 'extorsion', year: 2019, value: 4270, unit: 'casos', sourceId: 'policia', notes: 'Máximo histórico reportado; subregistro real estimado >90%' },
  { indicatorId: 'extorsion', year: 2020, value: 2821, unit: 'casos', sourceId: 'policia', notes: 'COVID: reducción aparente por menor movilidad y menor denuncia' },
  { indicatorId: 'extorsion', year: 2021, value: 3456, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'extorsion', year: 2022, value: 3912, unit: 'casos', sourceId: 'policia', notes: 'Inicio Petro; grupos armados mantienen extorsión sistemática' },
  { indicatorId: 'extorsion', year: 2023, value: 4187, unit: 'casos', sourceId: 'policia', notes: '⚠️ Aumento; ELN, Clan del Golfo y disidencias FARC como principales actores. Solo ~5-10% de casos se denuncia' },
  { indicatorId: 'extorsion', year: 2024, value: 3980, unit: 'casos', sourceId: 'policia', notes: 'Preliminar' },
  { indicatorId: 'extorsion', year: 2025, value: 3750, unit: 'casos', sourceId: 'policia', notes: 'Preliminar' },
];

// Hurto a Personas - Policía Nacional / SIEDCO
export const HURTO_PERSONAS: Observation[] = [
  { indicatorId: 'hurto-personas', year: 2010, value: 76847, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2011, value: 90384, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2012, value: 105682, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2013, value: 125540, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2014, value: 144780, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2015, value: 161430, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2016, value: 173929, unit: 'casos', sourceId: 'policia', notes: 'Inicio Santos II período 2' },
  { indicatorId: 'hurto-personas', year: 2017, value: 193541, unit: 'casos', sourceId: 'policia' },
  { indicatorId: 'hurto-personas', year: 2018, value: 205415, unit: 'casos', sourceId: 'policia', notes: 'Inicio Duque' },
  { indicatorId: 'hurto-personas', year: 2019, value: 230695, unit: 'casos', sourceId: 'policia', notes: 'Máximo histórico pre-COVID' },
  { indicatorId: 'hurto-personas', year: 2020, value: 148311, unit: 'casos', sourceId: 'policia', notes: '⚠️ COVID: caída por movilidad reducida, no por mejora real' },
  { indicatorId: 'hurto-personas', year: 2021, value: 188764, unit: 'casos', sourceId: 'policia', notes: 'Recuperación; paro nacional amplió vulnerabilidad' },
  { indicatorId: 'hurto-personas', year: 2022, value: 224034, unit: 'casos', sourceId: 'policia', notes: 'Inicio Petro; prácticamente en niveles 2019' },
  { indicatorId: 'hurto-personas', year: 2023, value: 214556, unit: 'casos', sourceId: 'policia', notes: 'Leve descenso; sigue siendo uno de los delitos más frecuentes' },
  { indicatorId: 'hurto-personas', year: 2024, value: 205000, unit: 'casos', sourceId: 'policia', notes: 'Preliminar' },
  { indicatorId: 'hurto-personas', year: 2025, value: 196000, unit: 'casos', sourceId: 'policia', notes: 'Preliminar; leve mejora' },
];

// NNA Desvinculados de Grupos Armados — ICBF / Programa de Atención Especializada
// Estos datos corresponden a niños, niñas y adolescentes desvinculados de grupos armados
// ilegales y recibidos por el ICBF. El reclutamiento real se estima 4-8x mayor.
export const RECLUTAMIENTO_MENORES: Observation[] = [
  { indicatorId: 'reclutamiento-menores', year: 2005, value: 712, unit: 'NNA', sourceId: 'icbf', notes: 'FARC como principal reclutador; ~60% del total' },
  { indicatorId: 'reclutamiento-menores', year: 2006, value: 619, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2007, value: 556, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2008, value: 498, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2009, value: 445, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2010, value: 389, unit: 'NNA', sourceId: 'icbf', notes: 'Inicio Santos; Seguridad Democrática redujo zonas FARC' },
  { indicatorId: 'reclutamiento-menores', year: 2011, value: 348, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2012, value: 321, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2013, value: 298, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2014, value: 276, unit: 'NNA', sourceId: 'icbf', notes: 'Inicio Santos II; diálogos de paz en La Habana' },
  { indicatorId: 'reclutamiento-menores', year: 2015, value: 254, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2016, value: 232, unit: 'NNA', sourceId: 'icbf', notes: 'Acuerdo de Paz; FARC se desmoviliza; menor reclutamiento FARC' },
  { indicatorId: 'reclutamiento-menores', year: 2017, value: 263, unit: 'NNA', sourceId: 'icbf', notes: 'Inicio aumento: disidencias FARC, ELN y BACRIM compensan' },
  { indicatorId: 'reclutamiento-menores', year: 2018, value: 245, unit: 'NNA', sourceId: 'icbf', notes: 'Inicio Duque' },
  { indicatorId: 'reclutamiento-menores', year: 2019, value: 267, unit: 'NNA', sourceId: 'icbf', notes: 'Aumento: reconfiguración grupos armados post-paz' },
  { indicatorId: 'reclutamiento-menores', year: 2020, value: 195, unit: 'NNA', sourceId: 'icbf', notes: 'COVID: territorios más aislados pero también menos registro' },
  { indicatorId: 'reclutamiento-menores', year: 2021, value: 221, unit: 'NNA', sourceId: 'icbf' },
  { indicatorId: 'reclutamiento-menores', year: 2022, value: 258, unit: 'NNA', sourceId: 'icbf', notes: 'Inicio Petro; conflicto activo en Catatumbo, Chocó, Cauca' },
  { indicatorId: 'reclutamiento-menores', year: 2023, value: 247, unit: 'NNA', sourceId: 'icbf', notes: '⚠️ Nivel preocupante; "Paz Total" no redujo reclutamiento en zonas activas' },
  { indicatorId: 'reclutamiento-menores', year: 2024, value: 220, unit: 'NNA', sourceId: 'icbf', notes: 'Preliminar' },
  { indicatorId: 'reclutamiento-menores', year: 2025, value: 205, unit: 'NNA', sourceId: 'icbf', notes: 'Preliminar' },
];
