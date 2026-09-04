# HR-06 — Listening Sets 1–20

Estado: **EN_VALIDACION · pendiente de revisión humana de producto y académica**.

Preparado: 4 de septiembre de 2026. No es una aprobación ni un release.

## Versión que se revisa

- Rama: `codex/toefl-sectional-seo-harness-20260831`.
- Commit de implementación: `10b0e8c02c51f4440e09fd64108349fc8ea983b7`.
- Base `origin/main` verificada: `8350ddf1a5a5a4e4f6345da2717a7bb7e0f1e4d3`; sin commits remotos de main pendientes al retomar.
- Entrada aprobada: HR-05, registrada en `docs/toefl-sectional-review-log.json`. Su aprobación corresponde al piloto anterior y no aprueba automáticamente esta expansión.
- Responsable de preparación: Codex. Revisores humanos de HR-06: **pendientes**, no se presume la firma de revisores anteriores.
- Compartidos: `package.json` (solo ruta del test seccional). Sin migraciones, secretos nuevos ni cambios de autenticación/pagos.

## Qué cambió

La biblioteca `/practica/toefl/listening/simulacros` presenta 20 recorridos WeLearn mediante una lista compartida de IDs. Una sola ruta dinámica y un solo adaptador reutilizan los mocks normalizados existentes: no se copiaron bancos, claves ni audios.

Las etiquetas del runner, resultados y reintento identifican el set correspondiente. La instancia React está identificada por el ID del recorrido para no conservar estado de otro set ante una navegación cliente.

Los runners conservan `noindex, follow` y no aparecen en el sitemap. Los IDs fuera del catálogo se rechazan. El antiguo test `toefl-sectional-listening-set1.test.mjs` se amplió y pasó a llamarse `toefl-sectional-listening.test.mjs`; la versión previa es recuperable en Git.

**C09 continúa bloqueado.** Los 20 recorridos son inventario de WeLearn. Los contadores de bloques, preguntas o audio describen material propio, no tiempos ni conteos oficiales del TOEFL. No hay puntuación ETS, equivalencia de admisión ni adaptación oficial.

## Evidencia y límites

- `docs/toefl-sectional-hr06-evidence.json`: hashes de código, pruebas y capturas, junto con resultados y límites.
- `docs/toefl-sectional-hr06-runtime-evidence.json`: 20 filas con hash de paridad de todos los campos del subconjunto canónico, HTTP y scoring.
- TypeScript final: sin errores.
- Pruebas seccionales: 4/4; pruebas fixed Listening: 3/3.
- Rutas: 20/20 responden `200` y declaran `noindex, follow`; cuatro IDs inválidos responden `404`.
- Scoring local: 20/20 peticiones con respuestas vacías conservan IDs/orden y denominador esperado; payload inválido devuelve `400`. No se almacenaron intentos ni se llamó a producción.
- Guardianes de audio, catálogo TOEFL, editorial, práctica, baseline y SEO: aprobados automáticamente.
- D9: `check:exam-practice-content` sigue fallando con los mismos 12 hallazgos conocidos. No se cambió ningún control o umbral.
- Navegador: biblioteca escritorio/móvil sin desbordamiento; un H1 y un main. Inicio de los sets 1/5/9/10/15/20 con etiqueta correcta. En Set 1 se reprodujo el primer audio real, se habilitaron opciones al finalizar y se avanzó tras seleccionar respuesta. Set 9 se inició por teclado sin respuestas seleccionadas.
- El primer arranque frío del runner produjo un timeout de navegación durante la compilación local; al calentarse la ruta se pudo navegar. No se presenta este preview USB como una medición de rendimiento de producción.
- **No se recorrió automáticamente cada audio de cada muestra**, ni se certificaron contraste/axe, Core Web Vitals o una build de release. La revisión humana debe cubrir el recorrido completo y la calidad académica.
- Build global: no ejecutada en este ciclo; sigue siendo obligatoria antes de integrar. La deuda documentada en HR-05 no se convierte en un resultado aprobado.

## Capturas

| Vista | Archivo |
|---|---|
| Biblioteca completa, escritorio | `docs/prototypes/screenshots/hr06-library-desktop.png` |
| Tarjetas de biblioteca, móvil | `docs/prototypes/screenshots/hr06-library-mobile.png` |
| Primer paso Set 1, móvil | `docs/prototypes/screenshots/hr06-runner-set1-mobile.png` |
| Introducción Set 20, escritorio | `docs/prototypes/screenshots/hr06-runner-set20-desktop.png` |

## Muestra humana obligatoria

Muestra fija: **1, 5, 10, 15 y 20**. Muestra aleatoria adicional: **9**, elegida mediante un único sorteo `crypto.randomInt` entre los otros 15 sets y fijada antes de evaluarla. No sustituirla por una muestra que resulte más conveniente.

Producto:

- [ ] Es claro qué contiene la biblioteca y cómo empezar cualquier set.
- [ ] Completar los recorridos de muestra, revisando selección, audio, reanudación, resultados y retorno.
- [ ] Revisar móvil y teclado; confirmar que los controles no quedan tapados y el foco es visible.
- [ ] Confirmar que el progreso y las respuestas de un set no se confunden con los de otro.

Académico:

- [ ] Escuchar la muestra completa y contrastar instrucciones, opciones y corrección con el material canónico.
- [ ] Confirmar las cuatro familias y la coherencia de resultados brutos por set.
- [ ] Confirmar que las advertencias fijo/no adaptativo/no score oficial son claras.
- [ ] Mantener C09 bloqueado; no inferir tiempos, conteos ni puntuaciones oficiales del inventario WeLearn.

Cada decisión debe identificar nombre, rol, fecha, commit, alcance y muestra efectivamente revisada. Si una persona cubre más de un rol, se registra la falta de independencia. Si falta alguna comprobación, registrar cambios solicitados o el alcance pendiente en lugar de aprobar por defecto.

**Stop obligatorio:** no avanzar a HR-07 ni interpretar silencio como aprobación. Tampoco integrar en main, desplegar, publicar o ejecutar la limpieza HR-08.

## Reabrir el preview sin duplicar dependencias

El servidor y el navegador de pruebas quedaron cerrados. Se eliminaron los 122 MiB de caché `.next` generados por este ciclo y el enlace temporal `node_modules`; las dependencias originales se conservaron intactas. La USB vuelve a 2,1 GiB de worktree y 73 GiB libres.

Para una nueva revisión, comprobar primero que la USB está montada y que no existe `node_modules` en este worktree. Reutilizar mediante enlace simbólico las dependencias instaladas de `/Users/josedavidduartesilva/Developer/idiomaswl/node_modules` y ejecutar desde la rama USB:

```bash
node --max-old-space-size=3072 node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 3026
```

La auditoría reproducible se ejecuta contra ese preview local, nunca contra producción:

```bash
node --experimental-strip-types --no-warnings --experimental-loader ./tests/ts-paths-loader.mjs scripts/check-toefl-sectional-listening-runtime.mjs http://127.0.0.1:3026
```

Siguiente acción exacta: reabrir el preview para la muestra humana y registrar decisiones HR-06 vinculadas al commit y al digest de evidencia. Esta rama no está integrada ni desplegada.
