# TOEFL iBT 2026 — auditoría factual, editorial y de derechos de Complete the Words

> `artifact_id`: `toefl-2026-ctw-factual-rights-audit`
>
> `artifact_version`: `2026-08-09.v1`
>
> `grain`: un registro por texto académico fuente
>
> `population`: 20 bloques académicos, 95 oraciones
>
> `source_snapshot`: `58c2fb0c84f955b1c249708b0fbd1bf0dbb14e43`
>
> `verified_at`: 9 de agosto de 2026
>
> `status`: auditoría documental completa; 20/20 bloqueados para release

Este informe profundiza T12 sin modificar código, contenido fuente, scoring,
persistencia ni audio. La matriz canónica por bloque está en
`docs/toefl-2026-complete-the-words-factual-rights-audit-2026-08-09.tsv`.

## Resumen técnico

- Se revisaron las 95 oraciones de los 20 textos académicos contra fuentes primarias
  gubernamentales, intergubernamentales o de investigación. Sólo 6/20 pasan como
  explicaciones generales: reciclaje, corazón, ríos, islas volcánicas, glaciares y
  ojo humano. El pase factual no implica pase de derechos ni preparación TOEFL.
- 14/20 requieren reparación factual o editorial antes de derivar una variante:
  10 presentan absolutos, definiciones o alcance científico incorrectos; tres
  requieren además mejor calificación de evidencia; uno combina error factual y
  gramática no natural.
- La búsqueda externa de una frase distintiva por bloque encontró dos oraciones
  exactas preexistentes: hormigas y glaciares. Encontró además tres familias de
  redacción stock o cercana: rainforests, arañas y energía renovable. Esto no prueba
  copia, pero obliga a reescritura independiente antes de reutilizar esos textos.
- Los 20 bloques siguen bloqueados para release. Git recupera origen interno, autor,
  fecha y un claim de contenido original, pero no sustituye attestation del owner,
  revisión exhaustiva de similitud, licencia ni aprobación independiente.
- El candidato del Set 1 se corrige documentalmente como `t1-r-cw2-v3`: cambia
  `hot gas` por `plasma` y limita `anything to live` a `most forms of life on Earth
  could not survive`. Queda en 76 palabras y conserva exactamente las diez posiciones y
  respuestas de la máscara ya adjudicada.

## Hallazgos principales

| Resultado | Bloques | Decisión |
|---|---:|---|
| Pase factual general | 6 | Conservar; resolver longitud/tokenización/derechos antes de derivar. |
| Reparación factual/editorial | 14 | Crear versión nueva trazable; nunca sobrescribir la fuente. |
| Coincidencia exacta preexistente | 2 | Reescritura independiente obligatoria en hormigas y glaciares. |
| Redacción stock/cercana | 3 | Reescribir y repetir contraste en rainforests, arañas y renovables. |
| Derechos listos para release | 0 | Attestation, revisión ampliada y segunda aprobación siguen pendientes. |

La severidad no mide dificultad TOEFL. Indica cuánto riesgo introduce reutilizar el
hecho o la redacción sin reparación.

## Alcance y definiciones

La población son los objetos `t1-r-cw2` a `t20-r-cw2`. Se excluyen los 20 mensajes
personales porque no son estímulos académicos CTW; su calidad y reclasificación ya
están registradas en la auditoría del banco. Se revisaron todas las 95 oraciones,
pero sólo una frase distintiva por bloque en la búsqueda externa.

- `fact_pass_general_scope`: afirmaciones adecuadas para una explicación educativa
  breve, con las salvedades registradas;
- `needs_*`: al menos una afirmación necesita precisión, fuente, definición o
  limitación de alcance antes de derivar;
- `exact_sentence_match_preexisting_*`: la misma oración aparece en una publicación
  indexada anterior al commit fuente;
- `near_stock_phrase_overlap_*`: formulación convencional o cercana que amerita
  reescritura, sin afirmar copia;
- clase B: conservar el original y crear una reparación versionada;
- clase C: derivar máscara/actividad sólo después de pasar gates editoriales y de
  derechos.

## Dictamen fila por fila

| Bloque | Tema | Dictamen factual/editorial | Similitud externa | Acción mínima |
|---|---|---|---|---|
| `t1-r-cw2` | Sol | Reparar: el Sol es plasma y `anything to live` es absoluto. | Sin match exacto en la consulta. | `v3`: dos cambios factuales; conservar máscara. |
| `t2-r-cw2` | Pingüinos | Precisar: el huddling es específico de ciertas especies, especialmente emperador. | Sin match exacto. | Limitar especie y efectos climáticos. |
| `t3-r-cw2` | Cerebro | `known universe` es un superlativo no verificable. | Sin match exacto. | Sustituir por `human body`. |
| `t4-r-cw2` | Hormigas | `queen lays all eggs` es demasiado absoluto. | Oración exacta en [Animal Start, actualizado en 2025](https://animalstart.com/fascinating-social-behaviors-of-ant-colonies-formicidae-and-their-complex-roles/). | Precisar reproducción y reescribir frase de feromonas. |
| `t5-r-cw2` | Sueño | La eliminación de residuos en humanos es evidencia emergente; ranking de rutina sin sustento. | Sin match exacto. | Calificar evidencia y eliminar jerarquía. |
| `t6-r-cw2` | Abejas | Globaliza declive entre especies silvestres y manejadas. | Sin match exacto. | Acotar región/especie y causas múltiples. |
| `t7-r-cw2` | Reciclaje | Pase factual general; reglas locales varían. | Sin match exacto. | Conservar con contexto local. |
| `t8-r-cw2` | Volcanes | `reaches onto` no es natural; monitoreo no garantiza aviso. | Sin match exacto. | Reparar gramática y alcance de pronóstico. |
| `t9-r-cw2` | Corazón | Pase factual general; 58 palabras no alcanzan el rango CTW. | Sin match exacto. | Extender con contexto respaldado. |
| `t10-r-cw2` | Ríos | Pase factual general; ya usa `often`. | Sin match exacto. | Conservar sin volver universal la ruta. |
| `t11-r-cw2` | Desiertos | Definición de desertificación incorrecta/simplificada. | Sin match exacto. | Usar definición UNCCD de degradación en tierras secas. |
| `t12-r-cw2` | Luna | `no atmosphere` es falso: existe exosfera extremadamente tenue. | Sin match exacto. | Precisar exosfera y agua líquida. |
| `t13-r-cw2` | Rainforests | `more than half` necesita estimación y alcance tropical. | Redacción cercana/stock. | Acotar, estimar y reescribir. |
| `t14-r-cw2` | Islas volcánicas | Pase factual general; `water's` requiere adjudicación de token. | Sin match exacto. | Conservar; resolver token sin inventar regla ETS. |
| `t15-r-cw2` | Vehículos eléctricos | Confunde cero emisiones de escape con ciclo de vida. | Sin match exacto. | Precisar BEV, tailpipe, generación y fabricación. |
| `t16-r-cw2` | Glaciares | Hechos generales pasan; texto corto. | Oración sustancialmente exacta en [National Geographic Education](https://education.nationalgeographic.org/resource/glacier-moving-rivers-ice/). | Reescribir velocidad y extender con fuente. |
| `t17-r-cw2` | Arañas | No todas/la mayoría construyen redes de captura; acero exige nombrar propiedad. | Comparación stock muy extendida. | Precisar conducta y propiedad material. |
| `t18-r-cw2` | Ciclo del agua | `fresh water that all living things need` excluye vida marina. | Sin match exacto. | Describir redistribución y reposición de reservas. |
| `t19-r-cw2` | Ojo humano | Pase factual general dentro del nivel educativo. | Sin match exacto. | Conservar; no universalizar causas de lentes. |
| `t20-r-cw2` | Renovables | Absolutos de disponibilidad/contaminación y tendencia sin periodo; texto corto. | Redacción cercana/stock. | Reparar ciclo de vida, periodo, similitud y longitud. |

## Reparación mínima del Set 1

El texto fuente se conserva intacto en `t1-r-cw2`. La variante documental nueva
`t1-r-cw2-v3` introduce sólo estos cambios:

- `a giant ball of hot gas` → `a giant ball of plasma`;
- `far too cold for anything to live` → `most forms of life on Earth could not survive`.

Texto candidato:

> The sun is a giant ball of plasma at the center of our solar system. It provides
> the light and heat that make life on Earth possible. Deep inside the sun, a process
> called nuclear fusion releases enormous amounts of energy. This energy travels
> through space and reaches Earth in about eight minutes. Without the sun, our planet
> most forms of life on Earth could not survive. Scientists study the sun to understand
> how it affects our climate.

La versión tiene 76 palabras. La primera oración continúa intacta; los primeros 20
tokens posteriores no cambian. Por tanto conserva objetivos
`provides/light/heat/make/on/possible/inside/sun/process/nuclear` y respuestas
`ides/ght/at/ke/n/ible/ide/un/cess/lear`. `v2` queda preservada como candidata
documental superada, no como contenido aprobado.

## Registro de fuentes primarias

- Sol: [NASA Sun Facts](https://science.nasa.gov/sun/facts/),
  [NASA — luz y fusión](https://svs.gsfc.nasa.gov/11084/) y
  [NOAA — chemosynthesis](https://oceanexplorer.noaa.gov/ocean-fact/photochemo/).
- Pingüinos: [British Antarctic Survey — respuestas al clima](https://www.bas.ac.uk/data/our-data/publication/penguin-responses-to-climate-change-in-the-southern-ocean/)
  y [BAS — guía de pingüinos](https://www.bas.ac.uk/wp-content/uploads/2015/05/Public-information-leaflet_PENGUINS_2017.pdf).
- Cerebro: [NIH/NCBI — The Brain](https://www.ncbi.nlm.nih.gov/books/NBK20367/?report=classic).
- Hormigas: [USDA — pheromone research](https://www.ars.usda.gov/ARSUserFiles/60360510/docs/electstim.pdf)
  y [revisión sobre reproducción de obreras](https://pmc.ncbi.nlm.nih.gov/articles/PMC11139587/).
- Sueño: [NHLBI — cuánto dormir](https://www.nhlbi.nih.gov/health/sleep/how-much-sleep)
  y [NIH — eliminación de residuos en humanos](https://www.nih.gov/news-events/nih-research-matters/brain-waste-clearance-system-shown-people-first-time).
- Abejas: [USDA Climate Hubs — pollinators](https://www.climatehubs.usda.gov/hubs/midwest/topic/pollinators)
  y [USDA — cultivos y polinizadores](https://www.usda.gov/sites/default/files/documents/Attractiveness-of-Agriculture-Crops-to-Pollinating-Bees-Report-FINAL-Web-Version-Jan-3-2018.pdf).
- Reciclaje: [EPA — preguntas frecuentes](https://www.epa.gov/recycle/frequent-questions-recycling).
- Volcanes: [USGS — monitoring volcanoes](https://pubs.usgs.gov/gip/monitor/intro.html).
- Corazón: [NHLBI Heart Manual](https://www.nhlbi.nih.gov/sites/default/files/publications/Heart%20Manual_InsidePages_Final_10.19.20.pdf)
  y [NHLBI — smoking and heart](https://www.nhlbi.nih.gov/health/heart/smoking).
- Ríos: [USGS Water Science School](https://www.usgs.gov/water-science-school/science/rivers-streams-and-creeks)
  y [EPA — contaminación agrícola](https://www.epa.gov/nps/nonpoint-source-agriculture).
- Desiertos: [USGS — Deserts](https://pubs.usgs.gov/gip/7000004/report.pdf)
  y [UNCCD Article 1](https://www.unccd.int/article-1-use-terms).
- Luna: [NASA Moon Facts](https://science.nasa.gov/moon/facts/) y
  [NASA Lunar Atmosphere](https://science.nasa.gov/moon/lunar-atmosphere/).
- Rainforests: [NASA Earth Observatory](https://science.nasa.gov/earth/earth-observatory/tropical-deforestation/).
- Islas volcánicas: [USGS — Ecology of Hawai‘i Volcanoes](https://www.usgs.gov/geology-and-ecology-of-national-parks/ecology-hawaii-volcanoes-national-park)
  y [USGS — forest birds and succession](https://www.usgs.gov/news/volcano-watch-forest-birds-hawaiian-islands).
- Vehículos eléctricos: [EPA — EVs](https://www.epa.gov/greenvehicles/electric-plug-hybrid-electric-vehicles)
  y [EPA — EV myths](https://www.epa.gov/greenvehicles/electric-vehicle-myths).
- Glaciares: [NSIDC — science of glaciers](https://nsidc.org/learn/parts-cryosphere/glaciers/science-glaciers)
  y [NSIDC — why glaciers matter](https://nsidc.org/learn/parts-cryosphere/glaciers/why-glaciers-matter).
- Arañas: [NPS — Mojave insects and spiders](https://www.nps.gov/moja/learn/nature/insects.htm)
  y [revisión de propiedades de seda](https://pmc.ncbi.nlm.nih.gov/articles/PMC2658765/).
- Ciclo del agua: [USGS — water cycle](https://www.usgs.gov/faqs/what-earths-water-cycle)
  y [USGS glossary](https://www.usgs.gov/glossary/glossary-water-cycle-terms).
- Ojo humano: [NEI — cómo funcionan los ojos](https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work)
  y [NEI — refractive errors](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/refractive-errors/eyeglasses-refractive-errors).
- Renovables: [DOE — renewable energy](https://www.energy.gov/edf/renewable-energy),
  [DOE — lifecycle wind](https://www.energy.gov/cmei/systems/articles/how-wind-can-help-us-breathe-easier)
  e [IRENA — costos 2024](https://www.irena.org/Publications/2025/Jun/Renewable-Power-Generation-Costs-in-2024).

## Método y robustez

1. Se reconstruyeron los 20 textos desde los objetos fuente, se contaron tokens por
   espacios y se segmentaron 95 oraciones.
2. Cada claim sustantivo se contrastó con al menos una fuente primaria apropiada. Se
   prefirieron NASA, NOAA, NIH, USDA, EPA, DOE, USGS, NPS, NEI, NSIDC, BAS, UNCCD e
   IRENA; no se usó una página secundaria para aprobar hechos.
3. Para similitud se buscó una oración distintiva exacta por bloque. Coincidencias y
   frases cercanas se trataron como señal de revisión, no como veredicto de copia.
4. Se contrastó fecha indexada con el commit fuente y se recuperó procedencia mediante
   historial Git. El claim interno de originalidad no se convirtió en prueba legal.
5. Toda incertidumbre falla cerrado: ningún bloque con derechos pendientes se marca
   listo para release.

No se incluyó un gráfico. Los resultados son decisiones nominales por bloque —qué
frase reparar, qué fuente la respalda y qué gate sigue abierto—; una tabla y el TSV
conservan esa trazabilidad mejor que un resumen visual.

## Limitaciones

- Una consulta por bloque no es una búsqueda exhaustiva en web, libros, bases de datos
  educativas ni corpus comerciales. `no exact match` no prueba originalidad.
- Las fuentes primarias sostienen o corrigen claims, pero no validan nivel de lectura,
  dificultad C-test, discriminación o equivalencia entre formas.
- No hay datos de estudiantes, análisis DIF ni segunda persona revisora.
- Esta auditoría no resuelve reglas ETS no publicadas para tokens de una letra,
  apóstrofos, guiones o numerales.
- No se modificó runtime; la UI y el scorer siguen fallando el gate T12.

## Próximos pasos recomendados

1. Adoptar `t1-r-cw2-v3` como única candidata documental del piloto y preservar `v2`
   como supersedida.
2. Obtener attestation del owner y revisión independiente de hechos, redacción,
   máscara y derechos del Set 1.
3. Reparar en versiones nuevas los otros 13 textos factualmente deficientes; empezar
   por hormigas, glaciares, Luna, desiertos, arañas y renovables.
4. Repetir búsqueda de similitud ampliada después de cada reescritura y antes de
   cualquier release.
5. Sólo cuando se autorice código, implementar la rebanada Set 1 y validar interacción
   y scoring. Los audios permanecen al final por decisión del owner.

## Preguntas abiertas

- ¿Quién firmará la attestation de creación/derechos por objeto?
- ¿Qué segunda persona aprobará hechos y redacción después de las reparaciones?
- ¿Qué corpus/licencias formarán la revisión ampliada de similitud?
- ¿Cómo se documentará el cambio de fuente a variante sin perder la trazabilidad de
  los textos originales?

T12 continúa `[ ]`: la fase factual está documentada, pero interacción, scoring,
derechos y revisión independiente no han pasado. Complete the Words no usa audio; no
se abrió, transcribió, generó ni modificó ningún MP3.
