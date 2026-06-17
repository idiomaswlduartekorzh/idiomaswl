export type PromiseVerdict = 'cumplido' | 'parcial' | 'incumplido' | 'sin-datos';

export interface PresidentPromise {
  title: string;
  detail: string;
  source: string;
  indicatorId?: string;
  verdict: PromiseVerdict;
  verdictContext: string;
}

export interface GovernmentPromises {
  govId: string;
  slogan: string;
  planName: string;
  promises: PresidentPromise[];
}

export const GOVERNMENTS_PROMISES: GovernmentPromises[] = [
  {
    govId: 'samper',
    slogan: 'El Salto Social',
    planName: 'Plan de Desarrollo "El Salto Social" 1994-1998',
    promises: [
      {
        title: 'Cobertura universal en salud',
        detail: 'Ampliar el SISBEN y la cobertura del Sistema General de Seguridad Social en Salud (Ley 100 de 1993) a los sectores más vulnerables.',
        source: 'Plan de Gobierno "El Salto Social", 1994',
        indicatorId: 'mortalidad-infantil',
        verdict: 'cumplido',
        verdictContext: 'La cobertura en salud pasó del 20% al 57% de la población durante el periodo. El SISBEN se implementó y alcanzó millones de colombianos. La mortalidad infantil continuó descendiendo. La Ley 100 se consolidó como pilar del sistema.',
      },
      {
        title: 'Reducción de pobreza ("Salto Social")',
        detail: 'Reducir la pobreza del 53% al 40% para 1998 mediante gasto social focalizado en educación, salud y empleo.',
        source: 'Plan de Gobierno "El Salto Social", 1994',
        indicatorId: 'pobreza-monetaria',
        verdict: 'parcial',
        verdictContext: 'La pobreza bajó de ~60.9% (1994) a ~56.8% (1998), insuficiente frente a la meta del 40%. La crisis de 1999 heredada del UPAC borró parte de los avances sociales. El gasto social aumentó pero los resultados fueron modestos ante la crisis fiscal creciente.',
      },
      {
        title: 'Proceso de paz con grupos armados',
        detail: 'Iniciar diálogos con las FARC y el ELN para lograr un acuerdo de paz que pusiera fin al conflicto armado.',
        source: 'Discurso de posesión, agosto 1994',
        verdict: 'incumplido',
        verdictContext: 'Los diálogos no prosperaron. El gobierno quedó deslegitimado por el escándalo del "proceso 8000" (financiación narco de la campaña), lo que limitó su capacidad negociadora. Los secuestros y homicidios permanecieron en niveles muy altos durante todo el periodo.',
      },
      {
        title: 'Generación de empleo productivo',
        detail: 'Crear 1.5 millones de empleos formales y reducir el desempleo a cifras de un dígito mediante inversión pública y confianza empresarial.',
        source: 'Plan de Gobierno "El Salto Social", 1994',
        indicatorId: 'desempleo',
        verdict: 'incumplido',
        verdictContext: 'El desempleo subió de ~8.6% (1993) al 15.3% (1998) y alcanzaría el 19.4% en 1999. La recesión de 1999 fue la mayor desde el siglo XX. El proceso 8000 generó incertidumbre y fuga de capital. La crisis hipotecaria del UPAC destruyó empleo en construcción y banca.',
      },
    ],
  },
  {
    govId: 'pastrana',
    slogan: 'Cambio para construir la paz',
    planName: 'Plan de Desarrollo "Cambio para construir la paz" 1998-2002',
    promises: [
      {
        title: 'Acuerdo de Paz con las FARC ("El Caguán")',
        detail: 'Negociar un acuerdo definitivo de paz con las FARC mediante diálogos en una zona de distensión de 42,000 km² en el Caguán.',
        source: 'Plan de Gobierno y discurso de posesión, agosto 1998',
        verdict: 'incumplido',
        verdictContext: 'Los diálogos del Caguán fracasaron en febrero de 2002 tras tres años de negociación. Las FARC los usaron para reagruparse y la violencia no disminuyó. El proceso dejó una profunda desconfianza social hacia los diálogos de paz, lo que marcó el debate político por décadas.',
      },
      {
        title: 'Plan Colombia (cooperación antidrogas con EE.UU.)',
        detail: 'Implementar un plan integral con EE.UU. que combinara erradicación de cultivos, desarrollo alternativo y fortalecimiento institucional.',
        source: 'Plan Colombia, firmado con Clinton en 2000',
        indicatorId: 'coca-hectareas',
        verdict: 'parcial',
        verdictContext: 'El Plan Colombia fue firmado en 2000 y se implementó con $7.500 millones USD. Las fumigaciones aéreas se intensificaron pero la coca aumentó de 79,500 ha (1998) a 102,000 ha (2002). El componente social y de desarrollo alternativo fue el más débil. El plan sentó bases que Uribe aprovechó.',
      },
      {
        title: 'Recuperación económica post-recesión',
        detail: 'Sacar a Colombia de la recesión heredada del fin del UPAC y recuperar el crecimiento económico sostenido.',
        source: 'Plan de Gobierno 1998, sección económica',
        indicatorId: 'pib-crecimiento',
        verdict: 'parcial',
        verdictContext: 'Colombia salió de la recesión (-4.2% en 1999) y creció 2.5% en 2002, pero el crecimiento fue débil (promedio ~0.8% anual en el periodo). La recesión de 1999 fue la peor del siglo XX y en parte fue producto de la crisis global (Tequila/Asia) y del colapso del UPAC que Pastrana heredó. El desempleo llegó al 20.5%.',
      },
      {
        title: 'Erradicación de cultivos ilícitos',
        detail: 'Reducir drásticamente los cultivos de coca y la producción de cocaína mediante fumigaciones y sustitución.',
        source: 'Plan Colombia, 2000',
        indicatorId: 'coca-hectareas',
        verdict: 'incumplido',
        verdictContext: 'La coca pasó de 79,500 ha (1998) a 102,000 ha (2002), un aumento del 28%. Las fumigaciones generaron desplazamiento de cultivos (efecto "globo") sin erradicar el fenómeno estructural. Colombia se consolidó como principal productor de cocaína del mundo durante este periodo.',
      },
    ],
  },
  {
    govId: 'uribe1',
    slogan: 'Mano Firme, Corazón Grande',
    planName: 'Plan de Desarrollo "Hacia un Estado Comunitario" 2002-2006',
    promises: [
      {
        title: 'Política de Seguridad Democrática',
        detail: 'Recuperar el control territorial del Estado, reducir los homicidios, los secuestros y la presencia guerrillera mediante más pie de fuerza y presencia institucional.',
        source: 'Programa de gobierno "Mano Firme, Corazón Grande", 2002',
        indicatorId: 'homicidios-tasa',
        verdict: 'cumplido',
        verdictContext: 'Los homicidios bajaron de 65.8 a 37.3 por 100,000 habitantes (−43%). Los secuestros cayeron de ~3,500 anuales a menos de 700. La presencia de la fuerza pública se extendió a todos los municipios del país. El Plan Patriota y otras operaciones militares debilitaron significativamente a las FARC.',
      },
      {
        title: 'Confianza inversionista y crecimiento',
        detail: 'Crear condiciones de seguridad y estabilidad jurídica para atraer inversión extranjera y crecer al 5% anual.',
        source: 'Plan "Hacia un Estado Comunitario", 2002',
        indicatorId: 'ied',
        verdict: 'cumplido',
        verdictContext: 'La IED creció de USD 2,134 millones (2002) a USD 6,656 millones (2006). El PIB promedió 4.5% anual 2003-2006. Los "Conpes de Seguridad Jurídica" y la Política de Confianza Inversionista generaron boom económico. Colombia pasó a ser destino atractivo para inversores regionales.',
      },
      {
        title: 'Reducción del desempleo',
        detail: 'Bajar el desempleo desde niveles históricamente altos mediante generación de empleo formal asociado al crecimiento económico.',
        source: 'Plan "Hacia un Estado Comunitario", 2002',
        indicatorId: 'desempleo',
        verdict: 'parcial',
        verdictContext: 'El desempleo bajó de 17.8% (2002) a 12.0% (2006), una mejora significativa aunque sin llegar al dígito simple. La informalidad siguió siendo alta. El boom económico generó empleo pero principalmente en sectores extractivos y de construcción, no en industria formal con alta remuneración.',
      },
      {
        title: '"Colombia libre de coca"',
        detail: 'Erradicar los cultivos de coca y reducir drásticamente la producción de cocaína mediante fumigación aérea con glifosato intensiva.',
        source: 'Plan "Hacia un Estado Comunitario" + Plan Colombia, 2002',
        indicatorId: 'coca-hectareas',
        verdict: 'incumplido',
        verdictContext: 'A pesar de las fumigaciones masivas (más de 130,000 ha/año), la coca pasó de 102,000 ha (2002) a 86,000 ha (2006): reducción de solo el 16%, lejos de la erradicación prometida. El efecto "globo" trasladó cultivos y el negocio del narcotráfico continuó.',
      },
    ],
  },
  {
    govId: 'uribe2',
    slogan: 'Estado Comunitario: Desarrollo para Todos',
    planName: 'Plan de Desarrollo "Estado Comunitario: Desarrollo para Todos" 2006-2010',
    promises: [
      {
        title: 'Continuar y consolidar la Seguridad Democrática',
        detail: 'Profundizar los logros de seguridad del primer periodo, incluyendo operaciones contra la cúpula de las FARC.',
        source: 'Plan de Desarrollo 2006-2010',
        indicatorId: 'homicidios-tasa',
        verdict: 'cumplido',
        verdictContext: 'Los homicidios siguieron bajando a 33.4/100k en 2010. Operación Jaque (rescate de Betancourt, 2008), muerte de Raúl Reyes, Mono Jojoy e Iván Ríos. Las FARC fueron reducidas a su mínima capacidad operativa histórica. El Estado recuperó municipios antes sin presencia.',
      },
      {
        title: 'Desmovilización paramilitar (Ley de Justicia y Paz)',
        detail: 'Completar la desmovilización de las AUC y aplicar la Ley 975 (Justicia y Paz) para la reconciliación y reparación de víctimas.',
        source: 'Ley 975 de 2005, promovida en el gobierno Uribe 1',
        verdict: 'parcial',
        verdictContext: '~30,000 paramilitares se desmovilizaron, pero surgieron las "bacrim" (BACRIM/Clan del Golfo) como sucesoras. Los procesos judiciales fueron lentos y las reparaciones a víctimas limitadas. El fenómeno paramilitar mutó pero no desapareció. Las masacres bajaron pero no se eliminaron.',
      },
      {
        title: 'Crecimiento económico sostenido (meta 6-7%)',
        detail: 'Mantener el boom económico del primer periodo y crecer al 6-7% anual impulsado por commodities e inversión.',
        source: 'Plan de Desarrollo 2006-2010',
        indicatorId: 'pib-crecimiento',
        verdict: 'parcial',
        verdictContext: 'El periodo empezó bien (6.7% en 2006, 6.9% en 2007) pero la crisis financiera global de 2008-2009 redujo el crecimiento a 1.7% en 2009. El promedio fue 4.2%, menor a la meta. Colombia fue relativamente más resiliente que otras economías emergentes, pero el shock externo fue determinante.',
      },
      {
        title: 'Reducción de la pobreza',
        detail: 'Continuar el descenso de la pobreza con enfoque en "cohesión social" y transferencias condicionadas (Familias en Acción).',
        source: 'Plan de Desarrollo "Estado Comunitario: Desarrollo para Todos" 2006',
        indicatorId: 'pobreza-monetaria',
        verdict: 'cumplido',
        verdictContext: 'La pobreza monetaria bajó de 45.1% (2006) a 37.2% (2010). El programa Familias en Acción se expandió. El crecimiento económico y la seguridad contribuyeron a la reducción. La pobreza extrema también descendió, aunque siguió siendo alta en regiones como La Guajira y el Chocó.',
      },
    ],
  },
  {
    govId: 'santos1',
    slogan: 'Prosperidad para Todos',
    planName: 'Plan de Desarrollo "Prosperidad para Todos" 2010-2014',
    promises: [
      {
        title: 'Crear 2.5 millones de empleos formales',
        detail: 'Generar 2.5 millones de puestos de trabajo formales en cuatro años mediante las "locomotoras" de la economía.',
        source: 'Plan de Desarrollo "Prosperidad para Todos", 2010',
        indicatorId: 'desempleo',
        verdict: 'parcial',
        verdictContext: 'El desempleo bajó de 11.8% (2010) a 9.1% (2014), la primera vez bajo dos dígitos en 15 años. Sin embargo, la informalidad siguió al 67% de los ocupados. La meta formal de 2.5M empleos no fue verificada con precisión. El boom minero-energético impulsó el empleo pero con desigualdad regional.',
      },
      {
        title: '100,000 Viviendas Gratis para los más pobres',
        detail: 'Construir y entregar 100,000 viviendas gratuitas para familias en situación de extrema pobreza, desplazados y víctimas del conflicto.',
        source: 'Programa "100,000 Viviendas Gratis", Ley 1537 de 2012',
        indicatorId: 'viviendas-iniciadas',
        verdict: 'cumplido',
        verdictContext: 'El programa se ejecutó y más de 100,000 familias recibieron vivienda. Se entregaron unidades en más de 280 municipios. Es considerado el mayor programa de vivienda social gratuita en la historia colombiana. La gestión fue elogiada internacionalmente como modelo de política habitacional.',
      },
      {
        title: 'Locomotoras económicas (infraestructura 4G)',
        detail: 'Impulsar cinco "locomotoras" de desarrollo: infraestructura, minería, vivienda, agro e innovación. Arrancar el programa de vías 4G.',
        source: 'Plan de Desarrollo "Prosperidad para Todos", 2010',
        indicatorId: 'pib-crecimiento',
        verdict: 'parcial',
        verdictContext: 'El boom minero-energético funcionó (PIB 6.6% en 2011), pero la infraestructura 4G tuvo retrasos en contratos y financiación. La locomotora agrícola fue la más débil. La caída del petróleo en 2014 evidenció la dependencia del modelo en commodities. Aun así, el crecimiento promedio fue 4.7%, el más alto de los 2000s.',
      },
      {
        title: 'Iniciar el proceso de paz con las FARC',
        detail: 'Explorar y abrir negociaciones de paz con las FARC para poner fin a medio siglo de conflicto armado.',
        source: 'Discurso de posesión agosto 2010; marco legal para la paz',
        verdict: 'cumplido',
        verdictContext: 'En agosto de 2012 Santos anunció los diálogos explorados en Oslo. La Mesa de Conversaciones de La Habana comenzó en noviembre de 2012. El Marco Jurídico para la Paz (Acto Legislativo 01/2012) creó el marco constitucional. Se consideró un avance histórico en el proceso, completado en el segundo periodo.',
      },
    ],
  },
  {
    govId: 'santos2',
    slogan: 'Unidos por un Nuevo País',
    planName: 'Plan de Desarrollo "Todos por un Nuevo País" 2014-2018',
    promises: [
      {
        title: 'Firmar el Acuerdo de Paz con las FARC',
        detail: 'Llegar a un acuerdo definitivo con las FARC sobre los seis puntos de la Agenda de La Habana: tierras, participación política, fin del conflicto, drogas, víctimas y refrendación.',
        source: 'Programa de reelección Santos, 2014; Mesa de La Habana',
        verdict: 'cumplido',
        verdictContext: 'El Acuerdo Final se firmó en Cartagena en septiembre de 2016 (y refrendado parlamentariamente tras el plebiscito). Santos recibió el Premio Nobel de Paz 2016. Las FARC entregaron armas a la ONU y se convirtieron en partido político. El acuerdo es el más completo entre un Estado y una guerrilla en la historia de América Latina.',
      },
      {
        title: '"Colombia, la más educada de América Latina para 2025"',
        detail: 'Posicionar a Colombia como el país más educado de Latinoamérica en 2025 en cobertura, calidad e innovación educativa.',
        source: 'Discurso de posesión, agosto 2014; Plan "Todos por un Nuevo País"',
        indicatorId: 'pisa-lectura',
        verdict: 'incumplido',
        verdictContext: 'Colombia mejoró en PISA (de 403 a 412 en lectura 2012-2018) pero continúa entre los puntajes más bajos de la OCDE. En cobertura superior avanzó al 52%. Para 2025, Colombia no es la más educada de LATAM: Chile, Uruguay, Costa Rica y Argentina mantienen puntajes superiores. La meta fue una aspiración sin indicadores precisos.',
      },
      {
        title: 'Reducir la pobreza extrema a cero',
        detail: 'Erradicar la pobreza extrema con enfoque territorial y transferencias condicionadas reforzadas.',
        source: 'Plan de Desarrollo "Todos por un Nuevo País", 2014',
        indicatorId: 'pobreza-extrema',
        verdict: 'parcial',
        verdictContext: 'La pobreza extrema bajó de 8.9% (2014) a 7.2% (2018). No llegó a cero. La caída del petróleo (2014-2016) limitó el espacio fiscal para gasto social. Regiones como La Guajira, Chocó y Amazonas mantuvieron pobreza extrema de dos dígitos. La implementación del Acuerdo de Paz generó nuevas necesidades de gasto.',
      },
      {
        title: 'Implementación del Acuerdo de Paz',
        detail: 'Iniciar la implementación de los seis puntos del Acuerdo: reforma rural integral, sustitución de cultivos, reintegración de excombatientes.',
        source: 'Acuerdo Final de Paz, nov. 2016',
        verdict: 'parcial',
        verdictContext: 'La implementación fue parcial y desigual. Las FARC se desmovilizaron pero surgieron disidencias. Los cultivos de coca explotaron tras la suspensión de la aspersión aérea: de 96k ha (2015) a 171k ha (2017). La reforma rural avanzó lentamente. El gobierno de Duque llegó con una posición crítica al acuerdo.',
      },
    ],
  },
  {
    govId: 'duque',
    slogan: 'Colombia, el futuro es de todos',
    planName: 'Plan de Desarrollo "Pacto por Colombia, Pacto por la Equidad" 2018-2022',
    promises: [
      {
        title: '"Colombia libre de coca" / reducir cultivos ilícitos',
        detail: 'Reducir los cultivos de coca al menos un 50% en cuatro años, retomando la aspersión aérea con glifosato y reforzando la erradicación manual forzosa.',
        source: 'Plan de gobierno Duque, 2018; Plan Nacional de Desarrollo',
        indicatorId: 'coca-hectareas',
        verdict: 'incumplido',
        verdictContext: 'Los cultivos de coca batieron el récord histórico en 2020: 245,000 ha. A fin de su gobierno (2022) había 204,000 ha. La aspersión aérea con glifosato no se reactivó (la CIDH y la Corte bloquearon). La erradicación forzosa aumentó pero no fue suficiente. Colombia superó a todos los países como productor de cocaína.',
      },
      {
        title: 'Crear 1.6 millones de empleos formales',
        detail: 'Generar 1.6 millones de nuevos empleos formales mediante incentivos tributarios a empresas, economía naranja y atracción de inversión.',
        source: 'Plan de Gobierno Duque, 2018',
        indicatorId: 'desempleo',
        verdict: 'incumplido',
        verdictContext: 'La pandemia de COVID-19 (2020) destruyó más de 5 millones de empleos; el desempleo llegó al 21.4% en mayo 2020. La recuperación fue gradual: 11.2% en 2022 al terminar su mandato. El contexto externo hace difícil atribuir el resultado únicamente a la política, pero la meta de 1.6M empleos formales no se verificó.',
      },
      {
        title: 'Economía Naranja y emprendimiento',
        detail: 'Crear el ecosistema de la "economía naranja" (industrias creativas y culturales) como motor de crecimiento y empleo.',
        source: 'Libro "La economía naranja" (Duque y Buitrago, 2013); Plan de Gobierno 2018',
        verdict: 'parcial',
        verdictContext: 'Se creó el Ministerio de las Culturas y la Ley de Emprendimiento (2020). El Fondo Emprender se reforzó. Sin embargo, el impacto macroeconómico fue modesto: la economía naranja representa menos del 3% del PIB. COVID-19 fue devastador para el sector cultural. La política fue de las pocas implementadas sistemáticamente.',
      },
      {
        title: 'Legalidad: cinco compromisos anticorrupción',
        detail: 'Aprobar el Estatuto Anticorrupción, eliminar la "corrupción hormiga", fortalecer la Contraloría y aumentar condenas efectivas.',
        source: 'Plan de Gobierno Duque, "Legalidad", 2018',
        indicatorId: 'cpi-transparencia',
        verdict: 'parcial',
        verdictContext: 'El Índice de Percepción de Corrupción (Transparencia Internacional) bajó de 36/100 en 2018 a 39/100 en 2022 — leve mejora. El escándalo de la "Ñeñepolítica" y los "Centros Poblados" (contrato educativo de $1.07 billones COP fraudulento) marcaron el periodo. La reforma a la Contraloría se aprobó pero los resultados concretos fueron lentos.',
      },
    ],
  },
  {
    govId: 'petro',
    slogan: 'Colombia Potencia Mundial de la Vida',
    planName: 'Plan de Desarrollo "Colombia Potencia Mundial de la Vida" 2022-2026',
    promises: [
      {
        title: '"Paz Total" con todos los grupos armados',
        detail: 'Lograr acuerdos de paz simultáneos con el ELN, las disidencias FARC, el Clan del Golfo y otros grupos armados mediante diálogos regionales.',
        source: 'Programa de gobierno Petro 2022; Ley de Paz Total (Ley 2272 de 2022)',
        verdict: 'parcial',
        verdictContext: 'Se inició la Paz Total con múltiples actores. La negociación con el ELN fue la más avanzada, con varios ceses al fuego, pero sin acuerdo definitivo. Las disidencias FARC (Estado Mayor Central) iniciaron pero se rompieron. Los homicidios y el desplazamiento no bajaron significativamente. El ELN ha atacado infraestructura durante el proceso.',
      },
      {
        title: 'Transición energética: no más concesiones petróleo',
        detail: 'No otorgar nuevos contratos de exploración petrolera y avanzar hacia una economía basada en energías renovables.',
        source: 'Discurso de posesión agosto 2022; Plan de Desarrollo 2022-2026',
        indicatorId: 'produccion-petroleo',
        verdict: 'parcial',
        verdictContext: 'Petro no firmó nuevos contratos de exploración en áreas no exploradas, pero los contratos existentes continuaron y la producción de petróleo se mantuvo. La producción cayó de ~750 a ~730 kbpd en 2025, pero por factores de madurez de campos, no solo política. Las renovables avanzaron (subastas de energía solar/eólica) pero el petróleo sigue siendo el eje fiscal.',
      },
      {
        title: 'Reforma a la salud (eliminar EPS)',
        detail: 'Transformar el sistema de salud eliminando las EPS como intermediarios y creando un sistema público de Centros de Atención Primaria (CAPS).',
        source: 'Proyecto de Ley de Reforma a la Salud, radicado 2023',
        verdict: 'incumplido',
        verdictContext: 'El Proyecto de Ley de Reforma a la Salud fue archivado por el Congreso en 2024 sin aprobarse. El Gobierno intervino algunas EPS (Sanitas, Sura) por crisis financieras. La ADRES acumuló deudas con hospitales y EPS. El sistema continuó funcionando bajo el esquema de la Ley 100 de 1993, con las mismas tensiones estructurales.',
      },
      {
        title: 'Reforma pensional (Colombia Mayor universal)',
        detail: 'Crear un sistema pensional de pilares que garantice renta básica a todos los adultos mayores y amplíe la cobertura del sistema público.',
        source: 'Proyecto de Ley de Reforma Pensional, 2023',
        verdict: 'cumplido',
        verdictContext: 'La Reforma Pensional (Ley 2381 de 2024) fue aprobada por el Congreso en junio de 2024. Crea un sistema de pilares: pilar solidario (adultos mayores pobres), pilar semicontributivo y contributivo. Colpensiones maneja los aportes hasta 3 SMMLV. Es la primera reforma pensional estructural en décadas; su impacto fiscal y de cobertura se verá en el largo plazo.',
      },
      {
        title: 'Gratuidad en educación superior pública',
        detail: 'Garantizar la gratuidad total en universidades públicas para todos los estudiantes de estrato 1, 2 y 3.',
        source: 'Decreto 1330 de 2022; ampliaciones 2023-2024',
        indicatorId: 'cobertura-superior',
        verdict: 'cumplido',
        verdictContext: 'La gratuidad en universidades públicas se implementó desde 2023 para estratos 1-3, llegando a más de 700,000 estudiantes. La cobertura de educación superior pasó del 51.2% (2022) al 53.2% (2025). Es una de las reformas sociales más significativas y con mayor impacto en acceso. El debate es sobre su sostenibilidad fiscal.',
      },
      {
        title: 'Reforma agraria: 3 millones de hectáreas para campesinos',
        detail: 'Distribuir 3 millones de hectáreas a familias campesinas sin tierra o con tierra insuficiente en cuatro años.',
        source: 'Programa de gobierno Petro 2022; Plan de Desarrollo 2022-2026',
        verdict: 'incumplido',
        verdictContext: 'A mediados de 2026, el avance es inferior al 15% de la meta. Los obstáculos incluyen disputas legales sobre predios, corrupción en el proceso de compra de tierras, falta de presupuesto y ausencia del Estado en zonas rurales. La Agencia Nacional de Tierras (ANT) registró avances lentos. La reforma agraria estructural sigue pendiente como tarea histórica del país.',
      },
    ],
  },
];
