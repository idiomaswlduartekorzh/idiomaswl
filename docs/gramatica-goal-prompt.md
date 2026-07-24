# Goal prompt — enriquecimiento de gramática (pegar en cada sesión hasta terminar)

Copia TODO el bloque de abajo y pégalo como primer mensaje de una sesión nueva (o úsalo con
`/loop` para que itere solo). Es autocontenido: se retoma en frío desde el tracker.

---

MISIÓN: enriquecer al molde v2 TODOS los temas de gramática de `src/data/grammar/**` (465 temas,
8 idiomas × A1/A2/B1) hasta que estén completos. No es un turno: trabaja por bloques y deja el
tracker actualizado para que la próxima sesión continúe sin perder ni repetir nada.

LEE PRIMERO (fuente de verdad):
1. `docs/gramatica-enriquecimiento-progreso.md` — tracker: qué está hecho y cuál es el siguiente bloque.
2. `docs/gramatica-content-spec.md` — el molde v2 (qué tabla lleva cada tipo de tema, reglas de prosa, método SEO).
3. Ejemplar de referencia (calidad objetivo): `src/data/grammar/italiano/a1/verbi-irregolari.ts` y el resto de `italiano/a1/`.

ORDEN DE ATAQUE: termina italiano (A2 → B1) → inglés → portugués → francés → alemán
(cada uno A1 → A2 → B1) → coreano / japonés / ruso (al final; ver regla Zhanna).

PROCEDIMIENTO por tema:
1. Toma el siguiente tema no marcado en el tracker, en el orden de ataque.
2. Lee el archivo del tema.
3. TABLAS: añade a las secciones `seo[]` la(s) tabla(s) de referencia que pida el tipo de tema
   (verbos → paradigma de las 6 personas; preposiciones → usos + contracciones; artículos →
   matriz género/número/inicial; pronombres → formas + posición; tiempos → formación + participios;
   etc.). Máximo 4 columnas por tabla (móvil). Paradigmas verbales = 6 personas.
4. PROSA pedagógica sin carreta: cada párrafo enseña algo accionable. Abre con la REGLA, contrasta
   con el español y marca la TRAMPA del hispanohablante. Borra el relleno genérico tipo "practica
   en contexto" o "este tema es muy importante".
5. FAQ/SEO: al menos 3 `heading` de `seo[]` en formato pregunta real de búsqueda ("¿cómo se
   conjuga…?", "¿cuál es la diferencia entre…?"). Se emiten como FAQPage (rich snippet).
6. metaTitle + description: targetiza la keyword primaria + un gancho (tabla/conjugación/ejercicios).
   Si la keyword/intención no es obvia, haz 1 WebSearch del tema para ver el SERP y las consultas
   relacionadas antes de escribir.
7. SOLO editas estos campos: `metaTitle`, `description`, `lead`, `outcomes`, `guide`, `seo`, `visual`.
   NO toques el motor, el CSS, ni el array `practice` (los ejercicios).
8. Nombres de ejemplo: usa el pool neutral; NO reintroduzcas David/Zhanna en el contenido.

REGLAS DURAS:
- Al editar `seo[]`, asegúrate de que el array siga cerrando con `],` antes de `visual:`
  (comerse ese `],` rompió 2 archivos en A1). Escapa apóstrofos en strings con comilla simple
  (`l\'italiano`, `c\'è`).
- Coreano/japonés/ruso: monta las tablas factuales, pero añade en el tema una marca de
  "⚠️ revisar (Zhanna)" y anótalo en el tracker; NO se dan por cerrados sin su validación.
- NUNCA abras el preview del navegador (PC de 8 GB, crashea). Verifica solo con los comandos de abajo.
- No hagas commit/push ni deploy salvo que el usuario lo pida.

VERIFICA por lote (cada pocos temas):
- `NODE_OPTIONS='--max-old-space-size=3600' npx tsc --noEmit -p tsconfig.json` → 0 errores
  (ignora el error pre-existente de `src/data/mocks/delf-b2-set-1.ts`, no es de este trabajo).
- `node scripts/check-grammar-exercises.mjs` → "0 fallos que rompan el motor".
- `node scripts/_verify-engine.mjs <idioma>` → 0 bloqueos, 0 espejeo.
  (Para transpilar/inspeccionar un tema en Node: `ts.transpileModule` con módulo CommonJS.)

AL CERRAR cada nivel/idioma:
- Actualiza `docs/gramatica-enriquecimiento-progreso.md` (marca conteos/estado).
- Reporta una línea de progreso (temas hechos, tablas, FAQ; qué sigue).

DEFINICIÓN DE TERMINADO: todos los temas marcados en el tracker; validador y harness en verde en
los 8 idiomas; coreano/japonés/ruso con su marca de revisión Zhanna. Cuando no quede ningún tema
pendiente, avísalo y detente.

CADA SESIÓN: no intentes hacer los 465 de golpe. Avanza el máximo con calidad, verifica, deja el
tracker al día, y termina el turno indicando el siguiente tema pendiente.

---

## Cómo usarlo
- **Manual:** pega el bloque al empezar cada sesión; di "sigue" para continuar el bloque.
- **Autopilotado:** `/loop` + el bloque, para que itere solo por lotes (revisa el tracker entre
  iteraciones). Puedes parar cuando quieras.
- Cambiar el molde: edita `docs/gramatica-content-spec.md`; el goal prompt siempre lo lee, así que
  el cambio se propaga a todas las sesiones siguientes.
