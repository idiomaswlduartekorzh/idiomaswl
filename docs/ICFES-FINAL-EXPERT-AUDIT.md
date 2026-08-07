# Auditoría experta final — ecosistema ICFES Inglés

Fecha: 2026-08-07T23:45:05.572Z

## Veredicto

**APROBADO** para revisión humana de integración. No se desplegó, publicó, hizo push ni merge.

## Cobertura demostrada

- 34 recursos inventariados: 23 mocks propios, 7 muestras Saber 11, 3 recursos de otras evaluaciones y un entrenamiento guiado autónomo.
- 1.235 preguntas servidas en experiencias guiadas: 1.035 de mocks propios, 55 del recorrido vigente y 145 de cinco muestras históricas elegibles.
- Dos muestras excluidas del guiado porque faltan seis estímulos; sus rutas guiadas responden 404 en vez de inventar contenido.
- 100 estudiantes sintéticos en siete cohortes y 33 rutas únicas; 48 rutas públicas aprobaron el smoke exhaustivo.
- 21/21 controles SEO/producto y cero hallazgos críticos o altos abiertos.

## Evidencia de navegador

- ArrowRight movió foco y selección de Lugares a Personas y oficios; tabpanel actualizó aria-labelledby.
- Al elegir ankle, explicó tobillo, contrastó la definición y justificó throat como garganta.
- El intento mock-03:p1q1 quedó en localStorage y apareció en repaso con selección, correcta, evidencia y microlección.
- icfes-2022-g11 renderizó 25 preguntas, partes históricas, fuente y explicación editorial separadas.
- Viewport 390×844: documentWidth 390, sin desbordamiento horizontal y CTA principales presentes.

## Juicio experto ICFES

La arquitectura distingue con claridad el formato estándar 2026-2, las prácticas propias abreviadas, las muestras históricas divulgadas y Saber 9/10/TyT. El motor ya no entrega feedback intercambiable: muestra significado o regla, evidencia localizada, razón por alternativa, microlección y transferencia. La Parte 1 conserva el recorrido visual aprobado y el patrón se escala mediante un contrato común sin borrar la identidad de cada tarea.

## Límites que no deben convertirse en promesas

- La cohorte de 100 es sintética: valida rutas, contenido expuesto y oportunidad pedagógica, no memoria, motivación ni aprendizaje observado en estudiantes reales.
- La indexabilidad técnica no garantiza posiciones en Google. Rendimiento orgánico requiere publicación autorizada, rastreo y datos posteriores de Search Console.
- Las dos muestras con avisos faltantes permanecen deliberadamente sin guiado; incorporar la fuente completa exige una nueva revisión editorial.
- No se predice puntaje oficial ni se presenta una muestra histórica o práctica propia como equivalente a la aplicación estándar 2026-2.

## Observaciones informativas

- GTM intentó cargar un script de unpkg bloqueado por la CSP global. No afectó navegación, práctica, persistencia ni feedback ICFES; revisar aparte con el responsable de analítica.
- Turbopack no admite el symlink de node_modules del worktree /tmp. La validación se ejecutó con Webpack, soportado por Next.js 16.2.6, y produjo manifiestos finales.

## Compuerta de regresión

Ejecutar `npm run check:icfes-superhub`. Para verificación renderizada, levantar el servidor de auditoría y ejecutar `npm run audit:icfes-runtime` y `npm run audit:icfes-100-users:runtime`.
