# Nivel Radar multilingüe: blueprint de escalamiento

Estado: contrato operativo para futuras implementaciones

Fecha base: 2026-09-27

Implementación de referencia: inglés, `welearn-english-placement-v2`

## Propósito

Este documento define cómo convertir el Nivel Radar de inglés en una familia de diagnósticos
comparables para los demás idiomas de WeLearn sin traducir mecánicamente preguntas ni publicar
niveles que todavía no estén sustentados. El motor, la experiencia, la seguridad y el embudo de
leads se reutilizan; el constructo lingüístico, el banco, los audios y la calibración se producen y
validan por idioma.

La implementación de un idioma nuevo no se considera una certificación oficial. Es un diagnóstico
orientativo de WeLearn y debe comunicar explícitamente qué habilidades midió, cuánta evidencia
obtuvo y qué incertidumbre conserva.

## Contrato no negociable del producto

Cada idioma debe cumplir lo siguiente antes de habilitarse públicamente:

- Evaluar por separado lectura, escucha, construcción del discurso escrito mediante tareas
  cerradas, gramática y vocabulario.
- No afirmar que se evaluó producción escrita libre ni expresión oral mientras esas habilidades no
  tengan un instrumento y una validación propios.
- Aplicar un localizador de 15 decisiones y una fase de precisión de 20 a 30 decisiones. Un intento
  válido contiene por tanto entre 35 y 45 decisiones calificables.
- Incluir evidencia de escucha real dentro del intento. Si la persona usa una adaptación sin audio,
  escucha queda como `sin evidencia`; no se estima ni se reemplaza con otra habilidad.
- Reportar perfil por habilidad, nivel global, intervalo o incertidumbre y siguiente paso. Un nivel
  global nunca debe ocultar una habilidad sin evidencia.
- Mantener claves y reglas de scoring en el servidor. El cliente recibe contenido presentable, no
  respuestas correctas ni parámetros que permitan reconstruirlas.
- Bloquear el lanzamiento si falta una puerta lingüística, de medición, audio, seguridad,
  privacidad u operación. La ausencia de evidencia nunca equivale a aprobación.
- Versionar blueprint, banco, audio, algoritmo, consentimiento y criterios de interpretación. Un
  cambio material invalida la aprobación de la combinación anterior.

El mínimo de 35 decisiones es un piso de cobertura, no una prueba de validez. La confiabilidad se
demuestra con evidencia del piloto y seguimiento posterior, no con el número de preguntas por sí
solo.

## Qué se reutiliza y qué se reconstruye

| Componente | Reutilizable | Específico del idioma |
| --- | --- | --- |
| Sesión y API | Creación, reanudación, expiración, rate limit, idempotencia y cierre | Mensajes localizados y política de disponibilidad |
| Adaptación | Localizador, rutas, fase de precisión, terminación y estados sin evidencia | Niveles, fronteras, dificultad y reglas de selección validadas |
| Experiencia | Progreso, reproductor, accesibilidad, resultado, PDF y CTA | Tipografía, dirección, teclado, romanización y convenciones locales |
| Medición | Formato del reporte, trazabilidad y pipeline de piloto | Constructo, descriptores, parámetros, puntos de corte e interpretación |
| Contenido | Esquema de ítems, revisiones, auditorías y control de versiones | Textos, consignas, opciones, distractores, racionales y metadatos |
| Audio | Almacenamiento privado, URL firmada, hashes y controles técnicos | Guiones, voces, acentos, velocidad, pronunciación y QA lingüístico |
| Leads | Consentimiento, UTM, atribución, deduplicación y panel administrativo | Idioma diagnosticado, campaña, copy y recomendación comercial |
| SEO | Arquitectura de landing, schema, analítica y enlaces internos | Intención de búsqueda, metadatos, FAQ y contenido visible por mercado |

Regla central: se puede reutilizar el motor; nunca se considera que un banco traducido conserva la
dificultad, la discriminación o la equivalencia de nivel del original.

## Contrato del paquete de idioma

Cada implementación debe declarar un paquete versionado equivalente a este contrato conceptual:

```ts
interface DiagnosticLanguagePack {
  language: string;
  locale: string;
  framework: {
    id: string;
    levels: readonly string[];
    mappingEvidenceVersion: string;
  };
  blueprintVersion: string;
  bankVersion: string;
  scoringVersion: string;
  consentVersion: string;
  dimensions: readonly {
    skill: 'reading' | 'listening' | 'written-discourse' | 'grammar' | 'vocabulary';
    construct: string;
    subdomains: readonly string[];
    minimumDecisions: number;
    minimumDistinctStimuli: number;
  }[];
  routes: readonly {
    id: string;
    levels: readonly string[];
  }[];
  audioPolicy: {
    required: true;
    accentCoverage: readonly string[];
    noAudioOutcome: 'withhold-listening';
  };
  availability: 'draft' | 'internal' | 'pilot' | 'public' | 'retired';
}
```

El contrato se implementará generalizando `src/lib/diagnostic/blueprint.ts`, que hoy fija
`language: 'en'`, y separando los descriptores de nivel por paquete. No se duplicará el runner ni
se crearán APIs paralelas por idioma: la identidad completa de un intento incluirá idioma y todas
las versiones anteriores.

## Marcos de referencia

Para alemán, francés, italiano, portugués y ruso se puede usar el MCER como marco principal, pero
los descriptores y tareas deben revisarse para cada lengua. Que dos exámenes usen las etiquetas
A1–C2 no demuestra por sí solo que sus resultados sean equivalentes.

Para japonés y coreano no se debe presentar una conversión automática JLPT/TOPIK ↔ MCER. El
paquete puede producir primero un perfil dentro del marco propio y mostrar una referencia externa
solo cuando exista un estudio de mapeo documentado. Si no existe, la interfaz debe decirlo y evitar
una falsa equivalencia.

## Diseño mínimo de cada intento

La forma de referencia conserva la arquitectura del diagnóstico de inglés:

| Etapa | Decisiones | Función |
| --- | ---: | --- |
| Localizador | 15 | Tres decisiones por cada una de las cinco habilidades para elegir rutas iniciales |
| Precisión | 20–30 | Profundizar cerca de la frontera estimada y alcanzar pisos de evidencia |
| Total | 35–45 | Terminar cuando se cumplan cobertura y precisión, o aplicar el máximo |

La distribución exacta no se hereda a ciegas. Cada blueprint debe definir sus pisos por habilidad y
por estímulo, pero no puede reducir la cobertura mínima del producto. Los ítems vinculados a un
mismo texto o audio no deben contarse como evidencia totalmente independiente.

El banco necesita más ítems que los que ve una persona para permitir rutas alternativas,
exposición controlada, retiro de ítems y nuevas formas. La suficiencia del banco se decide mediante
el reporte por celdas de habilidad × nivel × subdominio; no mediante un total agregado que oculte
huecos.

## Tipos de tarea permitidos

- Lectura: idea principal, detalle, inferencia, propósito, estructura y significado en contexto.
- Escucha: idea principal, detalle, intención, inferencia y seguimiento del discurso; el estímulo es
  audio, no una transcripción visible.
- Discurso escrito: ordenar segmentos, ubicar conectores, resolver referencias, reconocer relación
  retórica, registro, propósito y revisión de coherencia.
- Gramática: selección contextualizada de forma, estructura, tiempo/aspecto, concordancia y
  cohesión. Evitar series de frases aisladas como única evidencia.
- Vocabulario: significado, colocación, paráfrasis, formación de palabras y registro en contexto.

Las tareas cerradas de discurso escrito aportan evidencia de organización y cohesión; no sustituyen
la evaluación de escritura libre. El nombre visible debe ser “construcción del discurso escrito” y
no “escritura” cuando no existe producción abierta.

## Producción y recuperación de audio

Antes de grabar, se genera un inventario de audios existentes con origen, derechos, idioma,
variedad, voz, duración, calidad y correspondencia con un ítem. Un audio retirado de otro producto
solo puede reciclarse cuando:

1. su uso está autorizado;
2. el guion y el archivo coinciden;
3. representa el constructo y nivel del nuevo ítem;
4. supera revisión lingüística y técnica;
5. su hash y metadatos quedan ligados a la versión del banco.

Cada forma debe combinar voces y situaciones pertinentes sin convertir el acento en un distractor
irrelevante. La revisión técnica valida existencia, decodificación, duración, canal, volumen y hash;
la revisión lingüística valida pronunciación, naturalidad, velocidad, variedad y correspondencia
con el nivel. Son aprobaciones distintas.

## Auditoría obligatoria de sesgo de ítems

Antes del piloto y en cada nueva versión se ejecutan auditorías sobre:

- posición de la respuesta correcta por habilidad, nivel, tipo de tarea y forma;
- longitud de cada opción y diferencia entre la correcta y sus distractores;
- patrones de puntuación, mayúsculas, especificidad y concordancia que revelen la clave;
- distractores absurdos, solapados, parcialmente correctos o dependientes de conocimiento externo;
- exposición cultural, género, edad, región, nivel socioeconómico y situaciones sensibles;
- dependencia innecesaria de alfabeto, romanización, formato de fecha o interfaz;
- funcionamiento diferencial por subgrupos cuando el tamaño del piloto permita analizarlo.

No basta con que A, B, C y D aparezcan la misma cantidad de veces en el banco. El balance se
comprueba por cada ruta posible y el orden puede aleatorizarse solo si la tarea no depende de él.
Los hallazgos bloqueantes retiran el ítem; no se compensan ajustando el puntaje.

## Puertas de lanzamiento

### 0. Inventario y decisión de marco

Entregables: inventario de contenido/audio, marco elegido, población objetivo, caso de uso,
adaptaciones y mapa de riesgos. Se detiene si los derechos o el marco no están claros.

### 1. Blueprint lingüístico

Entregables: constructos, subdominios, niveles, rutas, pisos de evidencia, especificaciones de
ítems y lenguaje de resultados. Deben aprobarlo de forma independiente una persona especialista en
la lengua y una persona especialista en evaluación.

### 2. Banco candidato

Entregables: ítems, estímulos, claves privadas, racionales, metadatos y formas alternativas. Debe
pasar validaciones de esquema, cardinalidad, cobertura, duplicados, exposición y señales de clave.

### 3. Revisión lingüística y de medición

Cada lote obtiene dos recibos independientes: uno lingüístico y otro de evaluación. La misma
persona no firma ambos roles. Se revisa el ítem completo, no solo la respuesta correcta.

### 4. Audio y accesibilidad

Entregables: archivos finales, hashes, guiones, metadatos, revisión técnica, revisión lingüística y
recorrido sin audio. Un fallo de audio impide calificar escucha, pero no debe destruir un intento
válido de las otras cuatro dimensiones.

### 5. Simulación

Se recorren todas las ramas alcanzables para verificar terminación, monotonía, pisos, límites,
reanudación y ausencia de claves en el cliente. También se simulan perfiles desiguales; el motor no
debe forzar todas las habilidades al mismo nivel.

### 6. Piloto controlado

Se estima dificultad, discriminación, funcionamiento de distractores, confiabilidad por habilidad,
estabilidad de ruta, acuerdo con una medida externa independiente, error de clasificación y
posibles diferencias por subgrupo. Los criterios de aceptación se fijan antes de analizar el piloto
y quedan versionados; no se cambian para hacer pasar resultados desfavorables.

### 7. Lanzamiento y vigilancia

Después de aprobar privacidad, interpretación y operación, se activa progresivamente. Se monitorizan
abandono por etapa, fallos de audio, latencia, distribución de niveles, exposición de ítems, cambios
de dificultad y conversión del embudo. Una anomalía puede pausar el idioma sin afectar a los demás.

## Orden recomendado de expansión

El orden final se decide con un score de preparación: contenido existente con derechos claros,
audio utilizable, especialistas disponibles, demanda comprobable y marco de interpretación. Como
secuencia técnica inicial:

1. Alemán, francés, italiano y portugués: comparten MCER y permiten validar primero la fábrica
   multilingüe con escrituras latinas.
2. Ruso: añade cirílico y obliga a validar tipografía, entrada y segmentación sin cambiar todavía el
   marco principal.
3. Coreano y japonés: requieren tratamiento explícito de escritura, tokenización, romanización y
   marcos TOPIK/JLPT sin equivalencias MCER inventadas.

Dentro de cada grupo se inicia solo el idioma con mejor score real de preparación. Tener contenido
educativo en el repositorio es una señal para inventariar, no prueba de que ese material sea apto
para medición.

## SEO, leads y panel administrativo

Cada idioma tendrá una landing indexable propia, por ejemplo `/nivel-radar/aleman`, con canonical,
metadatos, texto visible, FAQ y enlaces internos coherentes con la intención de búsqueda local. No
se generarán páginas casi idénticas cambiando únicamente el nombre del idioma.

La captura posterior al resultado conserva el principio actual: el resultado no se secuestra. El
lead agrega dentro de `profile_data`:

- `diagnostic_language` y `diagnostic_locale`;
- versiones de blueprint, banco y scoring;
- nivel global, rango y perfil por habilidad;
- habilidades sin evidencia;
- fuente, medio, campaña y landing;
- consentimiento y fecha.

El panel administrativo debe filtrar por idioma, nivel, campaña, fecha y estado de contacto. Las
métricas mínimas por idioma son inicio, finalización, lead posterior al resultado, contacto útil y
matrícula atribuida. La comparación entre idiomas debe mostrar también mezcla de tráfico y no
interpretar una tasa bruta como diferencia de calidad.

## Arquitectura de implementación

Puntos de extensión que deben mantenerse únicos y configurables:

- `src/lib/diagnostic/blueprint.ts`: mover la definición inglesa a un registro de paquetes.
- `src/app/api/diagnostic/`: recibir y validar `languagePackId`; conservar una sola familia de
  endpoints.
- `src/server/diagnostic/`: resolver banco, scoring, release gate y observabilidad por paquete.
- `src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx`: cargar textos y convenciones del
  paquete sin bifurcar el runner.
- `src/app/(site)/nivel-radar/NivelRadarLeadCapture.tsx`: adjuntar idioma y versiones al lead.
- `config/diagnostic/`: separar evidencia y certificados por idioma/versiones.
- `supabase/migrations/`: ampliar contratos compartidos; evitar tablas paralelas por lengua salvo
  una necesidad de seguridad o retención demostrada.

Los nombres hoy prefijados con `english-` deben generalizarse antes del segundo idioma, manteniendo
compatibilidad de lectura con intentos históricos. Una migración nunca debe reinterpretar ni
reescribir el nivel de un intento ya cerrado.

## Automatización y evidencia

La nueva lengua debe quedar cubierta por los equivalentes parametrizados de:

```bash
pnpm run check:diagnostic-foundation
pnpm run check:diagnostic-bank-readiness
pnpm run audit:diagnostic-item-cues
pnpm run check:diagnostic-release-readiness
pnpm run check:diagnostic-production-rollout
pnpm run test:diagnostic-e2e
```

Los scripts deben aceptar el paquete como entrada y producir artefactos separados. Un test que solo
ejecuta inglés no autoriza otro idioma. La evidencia privada de revisores y piloto permanece fuera
de Git; el repositorio guarda únicamente manifiestos, hashes, criterios y resultados agregados que
no expongan claves ni datos personales.

## Definición de terminado por idioma

Un idioma puede pasar a `public` únicamente si:

- el paquete y todas sus versiones están fijados;
- las cinco dimensiones y cada ruta cumplen pisos de evidencia;
- el intento entrega entre 35 y 45 decisiones válidas;
- los audios y sus revisiones están completos;
- la auditoría de señales de clave y sesgos no tiene bloqueantes;
- las dos revisiones independientes del banco están aprobadas;
- la simulación adaptativa, seguridad, accesibilidad y E2E pasan;
- el piloto satisface criterios predefinidos de medición y equidad;
- privacidad, retención, eliminación y consentimiento están aprobados;
- resultado, PDF, landing, SEO, lead y panel administrativo están probados de extremo a extremo;
- existe runbook de activación, pausa, rollback y retiro de ítems;
- el release gate del idioma está en `public` y falla cerrado ante una evidencia faltante.

Si una condición falta, la implementación puede permanecer en `draft`, `internal` o `pilot`, pero
no puede presentarse como un diagnóstico público confiable.

## Checklist para abrir el siguiente idioma

1. Crear el registro de iniciativa con responsable, idioma, población y marco.
2. Ejecutar inventario de contenido y audio; documentar derechos y huecos.
3. Aprobar blueprint, descriptores, tipos de tarea y lenguaje de resultados.
4. Crear el paquete y generalizar el código compartido sin duplicar el runner.
5. Producir banco y audio; ejecutar revisiones independientes y auditorías de sesgo.
6. Simular todas las rutas y completar seguridad, accesibilidad y E2E.
7. Ejecutar piloto, analizar medición/equidad y congelar parámetros aprobados.
8. Crear landing, SEO, lead, filtros administrativos y analítica por idioma.
9. Activar internamente, luego piloto y finalmente público con monitoreo y rollback.

## Documentos de referencia

- `docs/nivel-radar-adaptativo-goal-plan.md`: historia, alcance y decisiones de la implementación
  inglesa.
- `docs/diagnostic-release-readiness.md`: evidencias y puertas que autorizan un release.
- `docs/diagnostic-release-operations-runbook.md`: activación, vigilancia y rollback.
- `docs/diagnostic-interpretation-guide.md`: lenguaje permitido para comunicar resultados.
- `docs/nivel-radar-seo-lead-strategy-2026-09-27.md`: estrategia SEO y captura posterior al
  resultado.
