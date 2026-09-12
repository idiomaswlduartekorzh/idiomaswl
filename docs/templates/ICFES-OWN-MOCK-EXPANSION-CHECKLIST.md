# Checklist de expansión de mock propio ICFES

## Identidad

- [ ] `mockId`:
- [ ] Rama y commit base:
- [ ] Responsable de autoría:
- [ ] `contentVersion`:
- [ ] `contentHash` coincide con el módulo congelado:
- [ ] `candidateDigest` recalculado después de fijar contenido y procedencia:
- [ ] Ruta propuesta:
- [ ] Fuera de catálogo mientras esté en `draft` o `in-review`:

## Procedencia

- [ ] `provenance.kind = welearn-original`:
- [ ] Titularidad y derechos documentados:
- [ ] Expediente de autoría:
- [ ] Evidencia de procedencia y derechos para los 45 `itemId`:
- [ ] No copia ni se presenta como cuadernillo oficial:
- [ ] Claims de alineación limitados al formato:

## Revisión pregunta por pregunta

- [ ] Inglés: gramática y naturalidad:
- [ ] Correspondencia exacta entre pregunta y clave:
- [ ] Una sola opción defendible:
- [ ] Distractores plausibles y no triviales:
- [ ] Formato y habilidad de la parte correctos:
- [ ] Revisor de inglés:
- [ ] Revisor de formato ICFES:
- [ ] Adjudicador editorial:
- [ ] Los tres reportes están ligados al mismo `candidateDigest`:
- [ ] Roles y revisores son distintos según la policy:
- [ ] Hallazgos y remediación guardados:
- [ ] Estado editorial final:

## Contrato técnico

- [ ] 45 preguntas:
- [ ] Partes 1–7 en orden:
- [ ] `itemId` únicos dentro del mock:
- [ ] `answer` entero y dentro del rango de opciones:
- [ ] Opciones únicas por pregunta:
- [ ] Sin duplicado exacto en otros mocks:
- [ ] Similitudes semánticas revisadas manualmente:
- [ ] Hash calculado solo después de aprobación:
- [ ] Manifiesto, catálogo y registros coherentes:
- [ ] `release-candidate` no habilita premium ni indexación del runner:

## Seguridad y experiencia

- [ ] Clave y explicación ausentes del payload público previo al envío:
- [ ] Calificación resuelta en servidor:
- [ ] Resultado básico disponible sin email ni cuenta:
- [ ] Oferta paga controlada por flag apagado por defecto:
- [ ] Analítica sin email, nombre, respuestas libres ni identificadores de pago:
- [ ] Teclado, foco, labels y contraste verificados:
- [ ] Escritorio y móvil verificados:

## SEO y GEO/AEO/IA

- [ ] Runner, resultado, checkout y feedback privado conservan `noindex` y no aparecen en sitemap:
- [ ] Ninguna respuesta, clave o rationale se serializa al visitante anónimo:
- [ ] La landing pública ofrece un resumen directo, visible y coherente:
- [ ] Autoría, procedencia, método y límites se muestran en la página:
- [ ] Metadata, FAQ y datos estructurados coinciden con el contenido visible:
- [ ] No se promete ranking, indexación, citación ni inclusión en respuestas de IA:
- [ ] Toda medición de descubrimiento conserva fuente, ventana y fecha:

## Evidencia obligatoria

- [ ] `npm run check:icfes-expansion`:
- [ ] `npm run check:icfes-superhub`:
- [ ] `npm run test:icfes`:
- [ ] TypeScript:
- [ ] Lint relevante:
- [ ] Build Webpack:
- [ ] Capturas/E2E:
- [ ] Evidencia de despliegue y smoke ligada al digest antes de `published`:
- [ ] Decisión de release y responsable:
