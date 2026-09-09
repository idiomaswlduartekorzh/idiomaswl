# Checklist de expansión de mock propio ICFES

## Identidad

- [ ] `mockId`:
- [ ] Rama y commit base:
- [ ] Responsable de autoría:
- [ ] `contentVersion`:
- [ ] Ruta propuesta:
- [ ] Fuera de catálogo mientras esté en `draft` o `in-review`:

## Procedencia

- [ ] `provenance.kind = welearn-original`:
- [ ] Titularidad y derechos documentados:
- [ ] Expediente de autoría:
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

## Seguridad y experiencia

- [ ] Clave y explicación ausentes del payload público previo al envío:
- [ ] Calificación resuelta en servidor:
- [ ] Resultado básico disponible sin email ni cuenta:
- [ ] Oferta paga controlada por flag apagado por defecto:
- [ ] Analítica sin email, nombre, respuestas libres ni identificadores de pago:
- [ ] Teclado, foco, labels y contraste verificados:
- [ ] Escritorio y móvil verificados:

## Evidencia obligatoria

- [ ] `npm run check:icfes-expansion`:
- [ ] `npm run check:icfes-superhub`:
- [ ] `npm run test:icfes`:
- [ ] TypeScript:
- [ ] Lint relevante:
- [ ] Build Webpack:
- [ ] Capturas/E2E:
- [ ] Decisión de release y responsable:
