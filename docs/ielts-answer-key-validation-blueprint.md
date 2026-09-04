# Blueprint de validación del motor IELTS

Fecha: 2026-09-04. Responsable operativo: Codex para José David.
Estado de validación del código: LISTO_PARA_INTEGRAR (2026-09-04).
Rama: codex/ielts-live-key-20260904. Base: origin/main en 8350ddf1.
Alcance compartido reservado: package.json, motor objetivo IELTS, submission,
review-blueprint y sus guardianes. Sin migraciones ni nuevas variables.

## Incidente y alcance

La auditoría del PDF había corregido la clave en un worktree sin integrar.
La página pública seguía sirviendo la clave antigua (Q1 Poppyfield, Q7 1260, Q9 685).
Había además dos calculadores independientes, selección doble todo-o-nada
y un contador visual de 39 preguntas por destreza.

Esta corrección conecta resultados y persistencia al mismo calculador,
recupera la clave aprobada del Set 1 y registra ielts-set-1-v2.
El cálculo por punto y los contadores son compartidos por todos los sets;
las claves de los demás sets no se modifican ni se dan por auditadas.
Los datos históricos v1 no se sobrescriben ni se etiquetan como v2.
Writing/Speaking v1 sigue siendo revisable porque sus consignas no cambiaron.
Una pestaña antigua del Set 1 no puede enviar silenciosamente bajo v2: recibe 409.
Las bandas son estimaciones diagnósticas de práctica, no resultados oficiales IELTS.

## Fuentes y límites de la aprobación

- Fuente operativa: src/data/mocks/ielts-set-1-answer-template.ts.
- Evidencia congelada independiente del código nuevo: tests/fixtures/ielts/set-1-approved.json,
  copia exacta del banco aprobado para los informes de Zhanna.
- SHA-256: d0df0d94e2e39bdf4af4ec8281bee039f5219db261b73a3dcc9cd9a90b069f1e.
- El contentVersion v1 dentro de esa evidencia identifica el lote histórico de informes,
  NO la versión publicada corregida. El registro del guardián asocia explícitamente
  esa clave auditada con el motor publicado v2.
- Sets 2–20: NO_AUDITADOS a nivel de respuestas. Su registro administrativo y
  las pruebas de infraestructura no constituyen aprobación académica.
- El PDF histórico y su blueprint personal conservan su contrato v1; antes de
  generar informes con entregas v2 hay que aprobar una migración explícita del
  contrato del informe. No cambiar hashes ni versiones para forzar aprobación.

## Fases pequeñas y guardianes obligatorios

| Fase | Trabajo | Condición de salida |
|---|---|---|
| 0. Identidad | Confirmar repositorio, main, set, Academic/General y versión; aislar cambios | Base actual, rama respaldada y alcance registrado |
| 1. Evidencia | Leer textos, consignas, audio y clave autorizada del set solicitado | Cada respuesta justificada; conflictos bloquean |
| 2. Mapeo | Fijar número visible, responseKey, opciones, variantes y peso | Q1–Q40 por destreza, sin saltos ni duplicados |
| 3. Clave | Crear fixture revisado separado del código operativo; registrar hash y aprobación | Comparación exacta contra el mock servido |
| 4. Cálculo | Probar omisiones, variantes, errores, multiselección y bandas | Perfecto 40/40; selección parcial por punto; todas las bandas probadas |
| 5. Integración | Un mismo scorer en navegador y servidor, versión en envío y almacenamiento | Pruebas de consumidor y rechazo de pestañas obsoletas |
| 6. Experiencia | Revisar consignas, numeración, resultados y formato en navegador | Pantalla coherente con los datos y sin errores nuevos |
| 7. Publicación | Catálogo, tipos, build; commit en main; despliegue identificable | READY del SHA correcto, no solo push o preview |
| 8. Producción | Extraer el mock servido y compararlo con la evidencia; smoke | 80 puntos coincidentes y rutas protegidas sanas |

Si falla una fase, corregir solo su causa y repetirla junto con las dependientes.
No continuar por una excepción silenciosa, ni prometer certeza absoluta.
La auditoría de un documento no demuestra que la web esté desplegada.

## Comandos reproducibles

```bash
npm run check:ielts-review-blueprint
npm run test:ielts-review
npm run check:practica-catalog
npx tsc --noEmit --pretty false
npm run build
npm run check:ielts-answer-keys -- --set=1 --url=https://www.idiomaswl.com/examenes/ielts/practica/set-1
npm run smoke:production
```

check:ielts-review-blueprint está incluido en prebuild y ejecuta los guardianes
de clave y las pruebas objetivo. CI ejecuta el build completo.
El control público lee únicamente HTML/RSC y no crea entregas de estudiantes.
Para una captura guardada: --html=/ruta/absoluta/pagina.html, sin --url.
Un set no registrado (por ejemplo --set=2) falla con NOT_AUDITED.

## Guardián visual de campos de respuesta

La clave correcta no garantiza que la interfaz sea legible. Después de cambios de
CSS, comprobar también los campos `.ielts-form__input` en formulario y tabla:

- Abrir Listening y Reading sin enviar el examen; esperar `document.fonts.ready`.
- Probar anchuras de 320, 390 y 1280 px. En Set 1 deben inspeccionarse 33 campos
  de texto de Listening y 21 de Reading; las otras respuestas usan otros controles.
- Medir `Answer…` con canvas usando fontStyle, fontWeight, fontSize y fontFamily
  de `getComputedStyle(input, '::placeholder')`. No basta con leer el atributo.
- Exigir que `clientWidth - paddingLeft - paddingRight` sea mayor o igual que
  el ancho medido. Las columnas deben caber y las tablas anchas tener scroll interno.
- Revisar capturas reales: en móvil el pasaje no debe tapar las respuestas al
  desplazarse. No usar estilos inyectados para la verificación final.
- Repetir sobre producción después de READY; registrar viewport, cantidad,
  medidas, captura y cualquier defecto preexistente fuera del alcance.

El mínimo del campo incluye el padding; no reducir la fuente ni cambiar el texto,
la clave o el motor de calificación para solucionar un recorte visual.

## Ampliación a otro set

1. Abrir alcance para UN set, sin copiar la clave del Set 1.
2. Reunir evidencia de Reading y Listening, incluyendo audio real y límites de palabras.
3. Hacer revisión respuesta por respuesta y resolver diferencias antes de editar el motor.
4. Crear tests/fixtures/ielts/set-N-approved.json con el mismo esquema de evidencia.
5. Incorporar versión y hash al registro de scripts/check-ielts-answer-keys.mjs.
6. Adaptar mapeos si los IDs difieren; nunca inferir números ambiguos.
7. Añadir pruebas de regresión específicas y ejecutar las ocho fases.
8. Si cambian consignas o clave, incrementar contentVersion y extender el rechazo
   de versiones antiguas; revisar explícitamente compatibilidad de W/S.
9. Documentar evidencia, commit, deployment, fecha y limitaciones.

## Entregas anteriores y privacidad

No recalcular en masa resultados almacenados ni reenviar informes sin autorización
para el lote exacto. Conservar respuestas originales y procedencia de cada versión.
Una reevaluación histórica debe quedar identificada como tal, con clave usada y
diferencias respecto al resultado original. Nunca incluir PII en fixtures, Git o logs.
Enviar a Zhanna requiere autorización vigente para los archivos concretos y
confirmación del registro de envío; esta reparación web no envía correos.

## Evidencia anterior a la publicación

Revisión de código: 2fbf78aa15c4eb07dd7e1a757aaba25e01cba86a.
El registro de publicación debe distinguir esta revisión de un deployment realmente READY.

- Guardianes de clave: 78 bloques, 80 puntos, opciones y numeración exactas.
- Pruebas objetivo: 8/8; cada variante, todos los resultados crudos 0–40,
  omisiones, multiselección y regresiones intencionales.
- Pruebas de revisión: 11/11; registro administrativo: 20/20 (no aprobación de sus claves).
- Baseline y catálogo protegidos: aprobados, sin reducir umbrales.
- TypeScript explícito: aprobado; build completo con todos los prebuild: aprobado,
  Node 24, 4 GB de heap, Webpack, 2.515 páginas generadas.
- El intento local con Turbopack no avanzó; Webpack con el límite predeterminado
  de 2 GB agotó memoria. La repetición limpia con 4 GB terminó con exit 0.
  No se cambió la configuración de producción para sortear estas limitaciones locales.
- Navegador local: Reading y Listening sobre 40, navegación y captura visual verificadas;
  cero errores de consola, avisos de precarga de fuente existentes.
- Página local extraída por HTTP: coincide con el fixture completo.
- Endpoint local: v1 devuelve 409; v2 incompleto devuelve 400 por datos faltantes,
  no por versión. No se crearon registros de estudiantes.
- Captura pública anterior: rechazada por el guardián; --set=2: NOT_AUDITED.
- Blueprint personal: validación de formato y BLUEPRINT_APPROVED, assets v1 intactos.

Esta sección registra validación, NO demuestra despliegue. Para declarar DESPLEGADO,
conservar además SHA final de main, deployment ID/URL y smoke posterior en el
registro de entrega de la tarea. Siempre verificar producción de nuevo en futuras auditorías.
