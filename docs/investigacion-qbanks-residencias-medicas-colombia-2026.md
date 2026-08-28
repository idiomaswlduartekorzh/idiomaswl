# Investigación competitiva: Qbanks para admisión a residencias médicas en Colombia

- **Fecha de corte:** 28 de agosto de 2026
- **Alcance:** productos web y móviles para médicos que preparan procesos de admisión a especialidades médico-quirúrgicas en Colombia; referentes internacionales de Qbanks médicos; huella técnica pública; oportunidades aplicables a Idiomas WeLearn.
- **Rama:** `codex/investigacion-qbanks-medicina-colombia`
- **Estado:** investigación inicial profunda, lista para convertirse en blueprint de producto. No incluye implementación.

## Resumen ejecutivo

El mercado colombiano ya tiene oferta abundante, pero todavía no tiene un ganador incuestionable en calidad verificable. Hay cuatro tipos de competidor:

1. **Cursos consolidados con plataforma:** Futuros Residentes y Cursos TOC venden acompañamiento, clases, materiales y práctica. Su ventaja es la confianza, comunidad y preparación de etapas no académicas.
2. **Qbanks digitales de volumen:** SoyResidente, ResiLab, R3XAMEN, EstuResidencia y Simulacro Residencia Médica compiten con cifras entre 3.000 y 45.118 preguntas, simulacros, flashcards y analítica.
3. **Propuestas adaptativas recientes:** ResiLab, Método Q, MediPrep y MedSteps se diferencian con IA, repetición espaciada, planes diarios, gamificación o predicción de resultado.
4. **Escuelas internacionales:** AMIR y CTO aportan manuales, audiovisual y metodología de curso. AMBOSS, UWorld, PassMedicine, Pastest y El Preguntero son mejores referentes para diseñar el producto y el proceso editorial, aunque no estén adaptados a Colombia.

La oportunidad no consiste en publicar “más preguntas”. Las cifras más grandes del mercado son declaraciones del proveedor y rara vez vienen acompañadas de una muestra estadísticamente representativa, fecha de revisión, bibliografía granular o datos de calibración. La oportunidad defendible es construir el **Qbank colombiano más trazable y medible**:

- preguntas originales, no reconstrucciones de exámenes protegidos;
- explicación de la respuesta correcta **y de cada distractor**;
- fuente, versión de guía y fecha de revisión visibles;
- blueprints versionados por universidad, programa y convocatoria;
- modo estudio, modo examen y banco de errores;
- repetición espaciada basada en FSRS;
- dificultad y discriminación calculadas con respuestas reales, no asignadas solo por intuición;
- preparación complementaria para inglés, entrevista y hoja de vida cuando el proceso lo requiera;
- predicción de resultado únicamente después de contar con una cohorte y una validación suficientes.

Idiomas WeLearn ya posee gran parte de la base técnica necesaria: Next.js 16.2.6, React 19, Supabase SSR, Recharts, Zustand, Lucide, Framer Motion, Tailwind y Playwright. No conviene copiar la arquitectura SPA de un competidor ni cambiar de framework. Conviene reutilizar la infraestructura de exámenes existente y sumar un modelo editorial médico, un programador FSRS y observabilidad.

## Cómo se investigó

Se combinaron cuatro niveles de evidencia:

- **Fuentes oficiales de universidades:** convocatorias, reglamentos y páginas institucionales.
- **Fuentes primarias de proveedores:** páginas de producto, precios, términos, tiendas de apps y documentación de soporte.
- **Inspección de flujo público:** demos sin registro y tours interactivos, sin usar credenciales, saltar paywalls ni acceder a contenido privado.
- **Huella técnica pública:** HTML, encabezados HTTP y bundles JavaScript entregados públicamente al navegador. Esto permite reconocer frameworks y librerías, pero no revela el código fuente privado ni la arquitectura completa del backend.

La evidencia se etiqueta así:

- **Verificado:** observable en una fuente primaria o en un flujo público.
- **Declarado:** afirmación del proveedor que no fue auditada contra su base de datos.
- **Inferido:** conclusión técnica razonable a partir de assets o encabezados públicos.
- **No verificable:** la página no expone suficiente información o no fue accesible.

No existe una fuente pública fiable de participación de mercado. Por eso “líder” en este documento significa fortaleza pública observable —antigüedad, alcance declarado, oferta, comunidad o madurez del producto— y no market share certificado.

## Lo que realmente exigen las universidades

El error más importante sería diseñar un solo “examen colombiano”. Colombia no tiene un examen nacional único de residencia; cada universidad y, en ocasiones, cada programa define su proceso.

### Universidad de Antioquia

Para la convocatoria 2026, la UdeA publicó una prueba de conocimientos médicos de 8:00 a 10:30 y una prueba de competencia lectora en inglés de 11:00 a 12:30. La propia Universidad informó que cerca de **3.700 médicos** asistieron al proceso y que ofrece **46 especializaciones**. Su comunicado describe una prueba orientada a análisis, interpretación y juicio clínico, con controles estrictos de confidencialidad y seguridad. Fuentes: [convocatoria y guía 2026 de la Facultad de Medicina](https://www.udea.edu.co/wps/portal/udea/web/inicio/unidades-academicas/medicina/estudiar-facultad/posgrados/) y [comunicado institucional sobre admisión 2026](https://www.udea.edu.co/wps/portal/udea/web/inicio/udea-noticias/udea-noticia/Contenido/asNoticias/Academia/admision-medica-2026).

Implicación de producto: se necesita razonamiento clínico bajo tiempo y un módulo separado de lectura médica en inglés. No basta un banco de hechos aislados.

### Universidad Nacional de Colombia

La convocatoria masiva 2026 muestra **pruebas iniciales** y luego fases de hoja de vida y entrevista. Las ponderaciones pueden variar por programa y acuerdo de facultad; por tanto, no debe existir una configuración global llamada simplemente “UNAL”. La estructura debe versionarse como `universidad + programa + convocatoria + acuerdo`. Fuente: [calendario oficial de especialidades médico-quirúrgicas 2026-2](https://medicina.bogota.unal.edu.co/images/posgrados_2026-1/2026-2/2._calendario_de_actividades_especialidades_m%C3%A9dico_quir%C3%BArgicas_-_convocatoria_masiva_2026-2_1ed12.pdf).

Implicación de producto: además del bloque de conocimientos/aptitudes, una ruta UNAL debería incluir checklist documental, preparación de hoja de vida y entrevista. Cualquier simulacro debe indicar exactamente qué convocatoria y programa intenta modelar.

### Universidad del Valle

El reglamento de posgrados clínicos permite que el examen de primera especialización cubra medicina general, ciencias básicas y clínicas, normas sobre el ejercicio médico en Colombia, cultura general o asuntos de interés nacional y características psicológicas o de personalidad. Para segundas especializaciones puede sumar contenido de la primera especialidad. Fuentes: [reglamento de posgrados clínicos](https://admisiones.univalle.edu.co/new/_new/posgrados/reglamentos/RVA-374-19122024-Modficaci%C3%B3n-Reglamento-Posgrados-Clinicos%20Resoluci%C3%B3n%2014%20de%2029-01-2018.pdf) y [manual de Ciencias Clínicas](https://admisiones.univalle.edu.co/new/_clinica/manualCieCli.php).

Implicación de producto: una taxonomía puramente clínica deja huecos. Deben existir dominios para ética/normativa, actualidad o interés nacional y, cuando sea lícito y apropiado, familiarización con formatos psicométricos sin afirmar que se reproducen pruebas oficiales.

### Universidad de Caldas

La convocatoria 2026 asignó, con salvedades por programa, **60% al examen de conocimientos, 30% a la entrevista y 10% a la hoja de vida**. Ofreció programas como anestesiología, cirugía, dermatología, medicina interna, urgencias, ginecología, pediatría y psiquiatría, entre otros. Fuente: [convocatoria oficial 2026](https://viceacademica.ucaldas.edu.co/wp-content/uploads/2025/04/Convocatoria-ECQ-2026.pdf).

Implicación de producto: el Qbank es central, pero un tercio del resultado puede depender de la entrevista. El dashboard debería mostrar preparación integral, no solo porcentaje de aciertos.

### Caribe y “Universidad del Atlántico”

Los competidores suelen agrupar la oferta del Caribe alrededor de Universidad del Norte, Universidad Libre de Barranquilla, Universidad Simón Bolívar, Universidad Metropolitana, Universidad de Cartagena y Universidad del Sinú. La Universidad del Atlántico tiene información institucional relacionada con especializaciones médico-quirúrgicas, pero no debe asumirse que cada convocatoria, programa o prueba está abierta sin validar la fuente oficial vigente. Fuente contextual: [Guía Interactiva SNIES de la Universidad del Atlántico](https://www.uniatlantico.edu.co/oficina-de-planeacion/planeacion-y-gestion/guia-interactiva-snies/).

Implicación de producto: crear un segmento “Caribe” para adquisición es útil, pero los blueprints deben ser por institución y convocatoria, nunca por región de forma indiferenciada.

## Mapa competitivo colombiano

### 1. Futuros Residentes — fortaleza en acompañamiento y proceso completo

**Posicionamiento.** Es uno de los actores con mayor huella pública. Declara más de 12.000 médicos impactados y más de 4.904 aprobados; publica porcentajes de admitidos que habrían sido alumnos suyos en UdeA, UPB, Unisanitas, Caldas y CES. Son cifras del proveedor, no auditadas de manera independiente. [Sitio oficial](https://cursofuturosresidentes.com/).

**Materiales y organización verificados/declarados.**

- clases grabadas de 8 a 30 minutos y clases en vivo;
- material descargable;
- tarjetas tipo Anki;
- simulacro diario de 5 preguntas;
- generador IAura de hasta 100 preguntas diarias, configurable por área y tiempo;
- retroalimentación con respaldo bibliográfico;
- cronograma adaptado a disponibilidad, fecha y, en algunos casos, universidad;
- asesoría de entrevista, hoja de vida, psicometría, motivación y gestión emocional;
- preparación declarada para más de 30 universidades.

**Qué hace bien.** Entiende que la admisión no termina en el examen. El cronograma y la mentoría atacan desorientación y procrastinación, dolores que un Qbank puro no resuelve.

**Debilidades/oportunidades.** No publica una cifra total clara del banco ni precio directo de la preparación principal; la compra depende de asesoría. La mayor parte de la evidencia de resultados es autorreportada.

**Lección adoptable.** Integrar un “expediente de candidatura” con entrevista, CV y calendario, pero mantener autoservicio y precios transparentes para el Qbank.

### 2. Cursos TOC — fortaleza en catálogo y paquete multimedia

**Posicionamiento.** Declara más de 10.000 usuarios, más de 300 temas, más de 20 universidades y más de 50.000 simulacros creados. [Sitio oficial](https://cursostoc.com/).

**Materiales y organización.**

- la portada anuncia más de 15.000 preguntas; algunos planes anuncian más de 20.000, una inconsistencia que debe tratarse como cifra comercial no auditada;
- retroalimentación, simulacros ilimitados, cronómetro y panel de progreso;
- organización por áreas clínicas, ciencias básicas y universidades;
- repetición espaciada;
- curso de 120 temas fundamentales;
- más de 13 cursos por especialidad y actualizaciones de guías;
- PDF, videos y podcast;
- app y plataforma web;
- curso gratuito de cinco temas y prueba de 24 horas.

**Precio observado al corte.** COP 2.250.000 por el plan anual integral y COP 1.288.000 por seis meses de curso + banco. El precio del banco aislado depende del plazo seleccionado y no quedó visible en la versión rastreada.

**Qué hace bien.** Ofrece variedad de formato y una entrada gratuita clara. El paquete anual transmite profundidad y continuidad.

**Debilidades/oportunidades.** La inconsistencia 15.000/20.000 resta confianza. No es visible públicamente la profundidad de citas por pregunta ni la calibración del banco.

**Lección adoptable.** Combinar una capa gratuita útil con una oferta progresiva, pero publicar un inventario único y auditable del contenido.

### 3. SoyResidente — competidor digital con oferta más completa en la landing

**Posicionamiento.** Declara más de 15.000 preguntas y presenta app + curso, simulacros por universidad, flashcards, tutor IA, semáforo, biblioteca, rankings y dashboard. [Sitio oficial](https://soyresidente.com/).

**Materiales y organización.**

- Qbank clínico y básico;
- simulacros de 10, 20, 40 u 80 preguntas;
- selección de una, tres o todas las universidades según plan;
- flashcards con repetición espaciada;
- repetición de errores;
- recomendaciones y cronograma;
- guías high-yield, biblioteca y clases en vivo en planes de curso;
- analítica y ranking por universidad.

**Precio observado.** App Lite COP 49.900/mes, Pro COP 74.900/mes y Master COP 99.900/mes. Cursos de 6, 9 y 12 meses a COP 600.000, 750.000 y 950.000 en la promoción visible.

**Verificación de la demo pública.** La pregunta de muestra sí permitió responder y mostró corrección, explicación, descarte breve de distractores y etiquetas temáticas. La explicación era pedagógicamente útil, pero la etiqueta `#Guía Tokio` no enlazaba una edición o referencia concreta. Las pestañas de “QBank Libre”, flashcards, simulacros y dashboard cambian la narrativa del tour, pero no exponen públicamente un constructor funcional ni permiten verificar el tamaño del banco.

**Huella técnica pública.** React + Vite; Supabase; componentes Radix; Lucide; Zod; Cloudflare. Confianza alta porque estas firmas aparecen en los bundles públicos.

**Lección adoptable.** La retroalimentación inmediata y el semáforo son una buena experiencia de entrada. Mejorarlos con citas granulares y objetivos verificables produciría una ventaja clara.

### 4. Simulacro Residencia Médica — volumen y precio agresivos

**Posicionamiento.** Declara 45.118 preguntas totales, de las cuales más de 4.200 serían exámenes previos de universidades colombianas, además de bancos por especialidad y ENARM. [Sitio oficial](https://simulacroresidenciamedica.com/).

**Materiales y organización declarados.**

- simulacros ilimitados y configurables;
- 4.269 preguntas de “exámenes previos”;
- 28.215 preguntas de GPC ENARM;
- bancos de alrededor de 1.000 preguntas para múltiples especialidades;
- simulador ENARM por casos sobre 193 temas;
- test de ECG;
- 22 GB de material descargable;
- cronómetro y acceso con Google.

**Precio observado.** COP 97.000 por 30 días y COP 247.000 por 12 meses.

**Qué hace bien.** Propuesta de precio/volumen extremadamente clara y actividad editorial fechada.

**Riesgos.** “Exámenes previos”, “reconstruidos” y 22 GB de descargas abren preguntas de autoría, licencias, actualidad y control de calidad. La cantidad de preguntas agregadas en pocos días no demuestra revisión clínica. En agosto de 2026 el dominio no resolvió desde la auditoría técnica local y el rastreador web devolvió intermitencias; el stack no pudo verificarse.

**Lección adoptable.** Publicar un changelog de contenido es valioso. No adoptar el modelo de material masivo sin procedencia y licencia comprobables.

### 5. ResiLab — gamificación y stack de producto más observable

**Posicionamiento.** Declara más de 35.000 preguntas, 30 universidades y 23 especialidades, con Arena PvP, XP, ranking, repetición espaciada y predicción. [Banco de preguntas](https://resilab.co/banco-preguntas/) y [sitio principal](https://resilab.co/).

**Materiales y organización.**

- filtros por universidad, especialidad, dificultad y cantidad;
- quizzes rápidos y simulacros;
- “exámenes históricos”;
- explicaciones de correcta e incorrectas;
- mazos públicos y Smart Review;
- algoritmo Leitner de seis niveles con intervalos 1, 2, 4, 8, 16 y 30 días;
- modo batalla, rankings, XP y energía;
- modo offline declarado;
- preguntas originales con asistencia de IA, según su propio aviso editorial.

**Precio observado.** Gratis; Código Amarillo COP 39.000/mes; Código Rojo COP 99.000/mes.

**Riesgos de confianza.** Declara una tasa de aprobación del 94% entre ciertos usuarios y un aumento promedio del 35%, pero no publica metodología, tamaño de muestra, definición de “aprobación” ni intervalo de confianza. Etiquetas como “UdeA 2024” pueden confundirse con procedencia oficial pese al aviso de no afiliación.

**Huella técnica pública.** Landing en Astro con Umami y Google Analytics. App separada en React/Vite, con TanStack Query, Recharts, Zod, Sentry, PostHog y Cloudflare Turnstile; Cloudflare delante de ambos dominios. Confianza alta para frontend/observabilidad, no para backend.

**Lección adoptable.** Separar adquisición SEO de la app es razonable, pero en este repositorio Next.js puede cubrir ambas. Sí conviene adoptar la instrumentación de eventos, validación de esquemas, monitoreo y un error bank; no es prioritario copiar PvP o energía antes de validar aprendizaje.

### 6. EstuResidencia — catálogo pequeño y discurso de curaduría

**Posicionamiento.** Declara más de 3.000 preguntas curadas, simulacros, flashcards y estadísticas. [Sitio](https://esturesidencia.com/) y [métodos](https://esturesidencia.com/methods).

**Materiales y organización.** Filtros por institución o tema, simulacros personalizados y por institución, repetición espaciada, estadísticas y plan de estudio.

**Verificación de la demo pública.** La página titulada “Simulacro Gratis Universidad CES 2025” mostró cinco preguntas y radios seleccionables, pero no mostró botón de entrega, puntaje ni explicaciones después de seleccionar una opción. Es una muestra de preguntas, no un simulacro funcional completo. Algunas preguntas visibles dependen de recomendaciones médicas sensibles al año; no mostraban fuente ni fecha clínica en la demo.

**Huella técnica pública.** SvelteKit, manifest PWA, estilos de utilidades compatibles con Tailwind, Google Ads/Tag Manager y Cloudflare. Confianza alta.

**Lección adoptable.** “Calidad sobre cantidad” es una posición diferenciadora válida solo si se demuestra con bibliografía, revisión y estadísticas por ítem.

### 7. R3XAMEN — hábito corto y cuatro modos de práctica

**Posicionamiento.** Declara más de 10.000 preguntas, 20 preguntas gratis al día y plan Pro a COP 49.900/mes. [Sitio oficial](https://www.r3xamen.com/).

**Materiales y organización.** Quizzes, simulacros, tarjetas/parejas, trivia, XP, rachas y estadísticas por área; declara una mezcla de 60% casos clínicos y 40% básicas. Aclara que son ítems originales de práctica y no preguntas oficiales.

**Fortaleza.** Convierte una jornada fragmentada en sesiones cortas y presenta límites gratuitos comprensibles.

**Limitación.** No expone una muestra amplia de explicaciones ni trazabilidad editorial. El certificado/dominio presentó errores en la auditoría técnica local, de modo que no se asigna stack.

### 8. MedSteps — producto móvil y aprendizaje adaptativo regional

**Posicionamiento.** Declara 5.000 preguntas, 14.000 estudiantes y 80% de éxito, con apps iOS/Android y acceso gratuito. [Página Colombia](https://medsteps.app/cursos/examen-residencia-colombia).

**Materiales y organización.** Casos clínicos colombianos, plan adaptativo por universidad, hábito de 10 minutos, simulacros y estadísticas; cobertura declarada de 20 áreas/especialidades.

**Huella técnica pública.** Angular en frontend, animaciones AOS, servidor Express y señales de despliegue en DigitalOcean App Platform, con Cloudflare al frente. Confianza alta para la huella web.

**Riesgo.** Las cifras de éxito y calificación no muestran metodología pública. La promesa “gratis para siempre” debe evaluarse junto con su sostenibilidad y posibles límites dentro de las apps.

**Lección adoptable.** Mobile-first y hábito de 10 minutos sí; migrar a Angular o crear apps nativas desde el inicio no.

### 9. Método Q — servicio premium con señales de MVP

**Posicionamiento.** Diagnóstico adaptativo, microaprendizaje, plan personalizado, simulacros y mentoría. [Sitio oficial](https://metodoq.pro/).

**Precio observado.** Prueba de siete días; Básico COP 500.000 total, Pro COP 1.000.000 y Residente COP 2.000.000 para el selector visible de tres meses.

**Huella técnica pública.** Next.js desplegado en Vercel, con assets Turbopack y Stripe mencionado en la interfaz.

**Señales de cautela.** No publica tamaño del banco; usa avatares de `pravatar.cc`, cifras de dashboard demostrativas y un teléfono `+57 300 123 4567`, típico placeholder. Debe tratarse como propuesta en validación, no como referente de escala probada.

**Lección adoptable.** El diagnóstico de diez minutos es una excelente entrada. No mostrar probabilidades ficticias como 82%/89% hasta que exista un modelo calibrado.

### 10. AMIR Colombia — referente de curso, no de Qbank colombiano puro

Ofrece manuales —la página indica actualización hasta 2022—, audiolibros, clases en video, autoevaluaciones, simulacros, tutor y componente científico. Modalidad online de seis meses a COP 3.300.000. [Página oficial](https://amirlatam.com/bol/producto/residencias-medicas-colombia/).

Su ventaja es la marca y la profundidad de curso. Su debilidad para este caso es que el material visible no demuestra adaptación granular y vigente a cada convocatoria colombiana; manuales hasta 2022 requieren una auditoría fuerte de actualidad clínica.

### Vigilancia: MediPrep y otros lanzamientos recientes

MediPrep declara más de 10.000 preguntas, más de 30 especialidades, más de 10 universidades, ranking, reto diario y SM-2, con costo anunciado de cero. [Sitio](https://mediprep.co/). Durante la auditoría técnica no fue posible obtener una respuesta estable, así que se clasifica como **watchlist**, no como competidor validado. Lo mismo aplica a productos con landing reciente, datos de contacto genéricos o afirmaciones de IA/predicción sin demostración.

## Referentes internacionales y regionales que sí conviene estudiar

### AMBOSS

Es el referente más completo de integración entre Qbank y biblioteca. Declara 13.000+ preguntas en su catálogo amplio, 1.400+ artículos, dificultad de 1 a 5 “martillos”, planes, modo high-yield, comparaciones con pares, predictor, notas, integración con Anki y explicaciones enlazadas a la biblioteca. [Características oficiales](https://www.amboss.com/us/features) y [guía de plataforma](https://support.amboss.com/hc/en-us/articles/360034825692-Platform-overview).

Patrones adoptables:

- alternar **Study Mode** y **Exam Mode**;
- abrir la teoría relevante al lado de la explicación;
- subrayar conceptos fallados en lecturas posteriores;
- diferenciar dificultad empírica de relevancia para el examen;
- recomendaciones que llevan a una acción concreta, no solo a una gráfica.

### UWorld

Su Qbank clínico internacional tiene 2.250+ preguntas basadas en escenarios, explicaciones visuales, estadísticas de selección por opción, reportes por tema/sistema, SmartCards y sincronización móvil. [Características oficiales](https://medical.uworld.com/international/clinical-qbank/features/).

Patrones adoptables:

- mostrar qué porcentaje escogió cada distractor;
- explicación visual y transferible a notas;
- historial de bloques reanudables;
- análisis macro y por tema, sistema y sesión.

### PassMedicine

Lleva más de 15 años preparando exámenes médicos del Reino Unido. Para MSRA ofrece más de 3.600 preguntas clínicas, más de 300 dilemas profesionales, tres mocks, dos niveles de textbook, comparación con cohorte, modo revisión/examen y notas docentes. [Producto MSRA](https://passmedicine.com/gpst/index.php). Su PWA permite preguntas, tutor y textbook offline. [App/PWA](https://passmedicine.com/app_login.html).

Patrones adoptables:

- textbook high-yield separado de la biblioteca extendida;
- precio accesible y demo sin fricción;
- PWA antes que apps nativas;
- acumular automáticamente “key points” de preguntas completadas.

### Pastest

Combina Qbank alineado a syllabus, past papers, biblioteca, multimedia, analítica y tutor contextual. En MRCS Part A publica 3.151 preguntas, 516 temas y 225 piezas multimedia. [Producto MRCS](https://www.pastest.com/mrcs-part-a/online-revision/).

Patrón adoptable: el tutor debe estar anclado al contenido editorial del proveedor y a la pregunta actual, no funcionar como chat médico genérico.

### El Preguntero

Es un buen referente latinoamericano de transparencia editorial: declara más de 47.000 preguntas, organización por materia/tema/tipo de examen, 4.000 alumnos y un equipo de más de 150 médicos. Afirma justificar cada pregunta con la bibliografía recomendada. [Sitio oficial](https://elpreguntero.com/home).

Patrón adoptable: hacer que la procedencia bibliográfica y el equipo editorial sean parte visible del valor del producto.

## Matriz comparativa resumida

| Producto | Volumen declarado | Organización visible | Aprendizaje | Material adicional | Precio visible al corte | Confianza de evidencia |
|---|---:|---|---|---|---:|---|
| Futuros Residentes | No publica total | área, tiempo, universidad, cronograma | feedback, tarjetas, plan | clases, descargables, mentoría, CV/entrevista | asesoría | alta en oferta; cifras autorreportadas |
| Cursos TOC | 15k–20k, inconsistente | clínicas, básicas, universidad | feedback, simulacro, repetición | PDF, video, podcast, cursos | 1,288M/6m; 2,25M/año integral | alta en oferta |
| SoyResidente | 15k | universidad, especialidad, modo | error bank, flashcards, semáforo, IA | biblioteca, curso, clases | 49,9k–99,9k/mes | media-alta; demo parcial funcional |
| Simulacro Residencia | 45.118; 4.269 Colombia | especialidad/banco | simulacro | ECG, 22 GB | 97k/mes; 247k/año | media-baja; procedencia sensible |
| ResiLab | 35k | universidad, especialidad, dificultad | Leitner, error bank, PvP, predictor | mazos públicos | 0/39k/99k mes | media; stack verificable, métricas no |
| EstuResidencia | 3k | institución, tema | flashcards, stats | plan de estudio | no verificado | media; demo no entrega resultados |
| R3XAMEN | 10k | áreas y modos | quizzes, trivia, tarjetas, XP | — | 0/49,9k mes | media-baja |
| MedSteps | 5k | especialidad, contexto país | adaptativo, casos, racha | apps | gratis declarado | media; métricas no auditadas |
| Método Q | No publica | universidad/tema | diagnóstico y plan | mentoría | 500k–2M/3m | baja-media; señales de MVP |
| AMIR Colombia | No publica | asignaturas/curso | autoevaluación, simulacro | manual, audio, video, tutor | 3,3M/6m | alta en oferta; contenido visible 2022 |
| El Preguntero | 47k | materia, tema, examen | tracking | biblioteca | prueba + pago | alta como referente regional |
| AMBOSS | 13k+ catálogo amplio | examen, sistema, disciplina, dificultad, estado | recomendaciones, predictor, Anki | biblioteca 1.400+ | USD | alta |
| UWorld Clinical | 2.250+ | tema/sistema/sesión | peer stats, SmartCards | biblioteca/notas | USD | alta |

## Huella tecnológica pública

Esta tabla no equivale a una auditoría de seguridad ni a una lista completa de dependencias.

| Producto | Huella observable | Confianza | Qué significa para nosotros |
|---|---|---|---|
| ResiLab landing | Astro, Umami, Google Analytics, Cloudflare | alta | buena separación SEO/marketing, pero no necesitamos otro frontend |
| ResiLab app | React, Vite, TanStack Query, Recharts, Zod, Sentry, PostHog, Turnstile | alta | valida la utilidad de esquema, observabilidad, eventos y gráficas |
| SoyResidente | React, Vite, Supabase, Radix, Lucide, Zod, Cloudflare | alta | stack rápido para MVP; casi todo ya existe o tiene equivalente en WeLearn |
| EstuResidencia | SvelteKit, PWA manifest, Cloudflare, Google tags | alta | PWA interesante; no justifica abandonar Next.js |
| Futuros Residentes | React/React Router con build Vite, Strapi, S3/CloudFront, Vimeo, HubSpot, Render, Cloudflare | alta | headless CMS y video externo sirven a una operación editorial grande |
| Método Q | Next.js/Turbopack, Vercel, Stripe declarado | alta frontend | es el stack más cercano a WeLearn |
| MedSteps | Angular, AOS, Express, DigitalOcean App Platform, Cloudflare | alta | evidencia de producto app-first; migrar de stack no aporta ventaja |
| Cursos TOC | Cloudflare; app web/móvil declarada | baja | la protección impidió atribuir framework |
| Simulacro / R3XAMEN / MediPrep | no verificable de forma estable | baja | no tomar decisiones técnicas basadas en conjeturas |

## Qué librerías y patrones conviene adoptar

### Ya están en el repositorio: reutilizar

El `package.json` de `origin/main` ya incluye:

- Next.js 16.2.6 y React 19.2.4;
- Supabase SSR y Supabase JS;
- Recharts;
- Zustand;
- Lucide React;
- Framer Motion;
- Tailwind 4;
- Playwright.

Por tanto:

- usar **Supabase** para auth, catálogo, intentos, eventos de respuesta y permisos editoriales;
- usar **Recharts** para dominio/sistema, tendencia y calibración;
- usar **Zustand** únicamente para estado efímero de sesión de examen, no como fuente de verdad;
- usar **Lucide** y el sistema visual actual para consistencia;
- usar **Playwright** para verificar navegación, temporizador, recuperación de sesión y revisión;
- conservar **Next App Router** para SEO, server rendering y rutas protegidas.

### Añadir con prioridad alta

1. **`ts-fsrs`**: programador FSRS en TypeScript, licencia MIT, Node 20+. Es preferible a implementar un Leitner rígido o SM-2 desde cero porque mantiene estado de dificultad, estabilidad y recuperabilidad y permite evolucionar a optimización por cohorte. [Repositorio oficial](https://github.com/open-spaced-repetition/ts-fsrs).
2. **`zod`**: validación de contratos de pregunta, importaciones, respuestas de IA y Server Actions. Está visible en ResiLab y SoyResidente, pero la razón para adoptarlo es reducir contenido inválido en producción, no imitar al competidor.
3. **Sentry o equivalente OpenTelemetry**: errores de guardado, cronómetro, pagos, reanudación y Server Actions deben ser observables. ResiLab ya muestra Sentry en su bundle. La integración de Sentry para Next 15+ contempla errores de servidor mediante `instrumentation.ts`. [Guía oficial](https://www.sentry.help/en/articles/13965191-next-js-why-am-i-not-receiving-server-errors).

### Añadir solo si el caso lo exige

- **PostHog:** útil para funnels y feature flags, con eventos anónimos como `session_started`, `answer_submitted`, `rationale_opened`, `review_completed`. Debe configurarse sin textos clínicos libres ni información sensible. ResiLab lo usa públicamente, pero WeLearn podría resolver una primera fase con eventos propios en Supabase.
- **TanStack Query:** valioso si la interfaz se convierte en una SPA densa con prefetch de bloques, reanudación en tiempo real y cola offline. En un App Router server-first puede añadir complejidad innecesaria; la propia documentación exige cuidado con hidratación y caché. [Documentación oficial](https://tanstack.com/query/latest/docs/framework/react/guides/ssr).
- **Radix UI:** añadir componentes individuales cuando resuelvan accesibilidad compleja —diálogo, tooltip, tabs—, no reemplazar el sistema visual completo.
- **Serwist/Workbox + IndexedDB/Dexie:** explorar en fase posterior para modo offline. PassMedicine prueba el valor de una PWA, pero la sincronización de intentos y conflictos debe diseñarse antes.

### No adoptar

- Angular, SvelteKit o Astro solo porque aparecen en competidores;
- Stripe o MercadoPago mientras Wompi cubra el negocio colombiano y el flujo actual;
- código minificado, assets o preguntas descargados de competidores;
- un predictor de “probabilidad de aprobación” sin calibración;
- sistemas PvP/energía antes de probar que mejoran retención y no incentivan velocidad superficial;
- IA que escriba y publique preguntas sin revisión médica y control de fuentes.

## Arquitectura de contenido recomendada

El activo defensible será el modelo editorial, no el componente de opción múltiple.

### Taxonomía

Cada ítem debería mapearse, como mínimo, a:

```text
exam_program
└── blueprint_version
    ├── university
    ├── program_or_track
    ├── admission_cycle
    ├── domain
    │   ├── ciencias_basicas
    │   ├── medicina_interna
    │   ├── cirugia
    │   ├── pediatria
    │   ├── ginecologia_obstetricia
    │   ├── salud_publica
    │   ├── etica_normativa
    │   ├── cultura_interes_nacional
    │   └── ingles_medico
    └── weights_and_constraints
```

Debajo de dominio: sistema, especialidad, tema, subtema, competencia cognitiva, tipo de ítem, dificultad, población y contexto.

### Contrato mínimo de una pregunta

- identificador estable y versión;
- enunciado y contexto clínico;
- opciones con identificador, no solo posición A/B/C/D;
- respuesta correcta;
- explicación de la correcta;
- explicación específica de cada distractor;
- perla clínica y objetivo de aprendizaje;
- fuentes con título, institución, versión/año, URL o DOI y localizador;
- fecha de revisión clínica y próxima revisión;
- autor, revisor médico y estado editorial;
- declaración de originalidad;
- licencia y alt text de cada imagen;
- mapeo a uno o varios blueprints con pesos;
- dificultad editorial inicial;
- dificultad, discriminación, tiempo mediano y selección por distractor calculados;
- historial de cambios y motivo de retiro.

### Flujo editorial

```text
borrador → revisión clínica → revisión de fuente → revisión psicométrica
→ QA de interfaz → piloto → publicado → monitoreo → actualizar/retirar
```

La IA puede ayudar a proponer distractores, normalizar estilo, detectar duplicados y resumir fuentes. No debe aprobar el contenido. Cada publicación médica requiere responsable humano identificable.

### Modos de uso

1. **Diagnóstico:** 30–50 preguntas estratificadas; resultado por dominio y plan inicial. No prometer probabilidad de admisión.
2. **Estudio:** feedback inmediato, fuente, distractores, notas, enlaces al microresumen.
3. **Examen:** bloque cerrado, cronómetro, marcado, navegación y feedback al final.
4. **Error bank:** fallos, aciertos inseguros y preguntas marcadas.
5. **Smart Review:** cola FSRS con límite diario y explicación breve.
6. **Simulacro de convocatoria:** blueprint y reglas versionadas, con aviso de independencia/no afiliación.
7. **Preparación integral:** checklist, inglés, CV y entrevista según universidad.

## Diferenciación recomendada para WeLearn

### Promesa de producto

> Entrena con preguntas médicas originales, revisadas y citadas; practica el formato de tu convocatoria y sabe exactamente por qué fallaste y qué repasar después.

Es más creíble y defendible que “35.000 preguntas” o “94% de aprobación”.

### MVP recomendado

No empezar con 10.000 preguntas. Empezar con **400–600 ítems excelentes**:

- 60–70% casos clínicos y el resto ciencias básicas/aplicadas, ajustable por blueprint;
- cuatro dominios clínicos troncales más salud pública/ética;
- pilotos para UdeA, UNAL, Univalle y Caldas;
- una ruta Caribe basada en una institución concreta, no en una etiqueta regional;
- fuentes visibles y revisión médica;
- diagnóstico gratuito;
- bloques de 10, 20 y 40;
- estudio/examen;
- explicación por distractor;
- error bank + FSRS;
- dashboard de dominio, tiempo y confianza;
- módulo de lectura médica en inglés aprovechando la fortaleza existente de WeLearn.

### Fase de expansión

Con 2.000–3.000 ítems revisados:

- blueprints adicionales y por programa;
- imágenes de ECG, radiología, dermatología y patología con licencias claras;
- simulacros de longitud completa;
- comparación anónima por cohorte solo con n suficiente;
- métricas psicométricas y retiro automático por anomalías;
- CV/entrevista y calendario de convocatorias;
- plan diario adaptativo.

Solo después:

- predictor calibrado con resultados reales y consentimiento;
- tutor IA anclado a fuentes y contenido aprobado;
- offline PWA;
- herramientas sociales o retos.

## Modelo comercial observable

El mercado de Qbank autoservicio se concentra aproximadamente entre **COP 39.000 y 99.900 al mes**. Los paquetes de curso/acompañamiento van desde COP 600.000 hasta COP 3.300.000 o más. Simulacro Residencia rompe la curva con COP 247.000/año, mientras TOC y AMIR cobran por profundidad y acompañamiento.

Hipótesis para validar, no decisión final:

- Gratis: diagnóstico + 10–20 preguntas/día + una revisión FSRS limitada.
- Pro: COP 49.900–69.900/mes; Qbank completo, exámenes, error bank, FSRS y analítica.
- Convocatoria: pase de 90 días por universidad/programa.
- Integral: preparación de inglés, CV e entrevista con servicio humano.

No bloquear la bibliografía o la explicación básica detrás del plan más caro. La confianza clínica debe ser parte del producto, no un upsell.

## Métricas que sí importan

- finalización de bloque y abandono por pregunta;
- tiempo por ítem y por dominio;
- cambio de respuesta y nivel de confianza;
- apertura/lectura de explicación;
- retención a 7, 21 y 45 días;
- error recurrente por concepto;
- dificultad (`p-value`) y discriminación por ítem;
- funcionamiento de distractores;
- cobertura real del blueprint;
- porcentaje de contenido dentro de fecha de revisión;
- concordancia entre revisores;
- diferencia entre simulacro y resultado real, cuando el usuario consienta reportarlo;
- accesibilidad, recuperación de sesión y tasa de errores técnicos.

XP, rachas y rankings son métricas de motivación secundarias; no sustituyen aprendizaje ni calibración.

## Riesgos y guardrails

### Autoría y universidades

- No copiar, comprar ni publicar bancos reconstruidos de exámenes oficiales.
- No llamar “oficial” a un simulacro propio.
- No usar logos de universidad como si existiera afiliación.
- Etiquetar “estilo UdeA” solo junto con convocatoria, metodología y descargo visible.
- Mantener evidencia de originalidad y procedencia de cada ítem.

La alerta no es teórica: la UdeA reportó más de 40 irregularidades en su examen 2026 y enfatizó la confidencialidad de las preguntas. La plataforma debe posicionarse del lado de la preparación ética, no de la filtración.

### Seguridad clínica

- Toda recomendación sensible debe indicar fuente y vigencia.
- Las preguntas retiradas por cambio de guía no deben seguir apareciendo en repaso offline.
- No mezclar material educativo con consejo médico a pacientes.
- El tutor IA debe limitarse al corpus aprobado y mostrar incertidumbre/fuentes.

### Datos y predicción

- No recolectar historia clínica ni datos de pacientes.
- Separar identidad, respuestas y analítica cuando sea posible.
- Ranking opt-in y seudónimo.
- No mostrar “probabilidad de pasar” basada en porcentajes arbitrarios de acierto.
- Publicar metodología, n, fecha y error del predictor cuando exista.

## Decisión recomendada

Construir sí tiene sentido, pero no como clon de ResiLab/TOC ni como repositorio de PDFs. La ventaja de WeLearn puede ser la combinación de:

1. motor de examen ya probado en SAT/IELTS/TOEFL/ICFES;
2. experiencia fuerte en inglés, útil para UdeA y lectura científica;
3. arquitectura server-first y Supabase ya instalados;
4. trazabilidad editorial y psicometría que los competidores locales no muestran públicamente;
5. rutas de admisión completas, no solo un contador de preguntas.

El siguiente entregable debería ser un **blueprint funcional y de datos** con:

- esquema SQL y estados editoriales;
- contrato TypeScript/Zod de pregunta;
- blueprint inicial de cuatro universidades;
- wireflow de diagnóstico, estudio, examen y revisión;
- plan de producción/revisión de los primeros 500 ítems;
- política de fuentes, originalidad, IA y licencias;
- criterios de éxito del piloto.

## Fuentes principales

### Universidades

- [Universidad de Antioquia — Posgrados Medicina y convocatoria 2026](https://www.udea.edu.co/wps/portal/udea/web/inicio/unidades-academicas/medicina/estudiar-facultad/posgrados/)
- [UdeA — comunicado de admisión a especialidades 2026](https://www.udea.edu.co/wps/portal/udea/web/inicio/udea-noticias/udea-noticia/Contenido/asNoticias/Academia/admision-medica-2026)
- [Universidad Nacional — calendario masivo 2026-2](https://medicina.bogota.unal.edu.co/images/posgrados_2026-1/2026-2/2._calendario_de_actividades_especialidades_m%C3%A9dico_quir%C3%BArgicas_-_convocatoria_masiva_2026-2_1ed12.pdf)
- [Universidad del Valle — reglamento de posgrados clínicos](https://admisiones.univalle.edu.co/new/_new/posgrados/reglamentos/RVA-374-19122024-Modficaci%C3%B3n-Reglamento-Posgrados-Clinicos%20Resoluci%C3%B3n%2014%20de%2029-01-2018.pdf)
- [Universidad de Caldas — convocatoria clínico-quirúrgica 2026](https://viceacademica.ucaldas.edu.co/wp-content/uploads/2025/04/Convocatoria-ECQ-2026.pdf)

### Colombia

- [Futuros Residentes](https://cursofuturosresidentes.com/)
- [Cursos TOC](https://cursostoc.com/)
- [SoyResidente](https://soyresidente.com/)
- [Simulacro Residencia Médica](https://simulacroresidenciamedica.com/)
- [ResiLab](https://resilab.co/)
- [EstuResidencia](https://esturesidencia.com/)
- [R3XAMEN](https://www.r3xamen.com/)
- [MedSteps Colombia](https://medsteps.app/cursos/examen-residencia-colombia)
- [Método Q](https://metodoq.pro/)
- [AMIR Colombia](https://amirlatam.com/bol/producto/residencias-medicas-colombia/)
- [MediPrep](https://mediprep.co/)

### Referentes y tecnología

- [AMBOSS — características](https://www.amboss.com/us/features)
- [UWorld — Clinical QBank](https://medical.uworld.com/international/clinical-qbank/features/)
- [PassMedicine — MSRA](https://passmedicine.com/gpst/index.php)
- [Pastest — MRCS Part A](https://www.pastest.com/mrcs-part-a/online-revision/)
- [El Preguntero](https://elpreguntero.com/home)
- [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)
- [TanStack Query — SSR](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- [Sentry — captura de errores en Next.js 15+](https://www.sentry.help/en/articles/13965191-next-js-why-am-i-not-receiving-server-errors)
