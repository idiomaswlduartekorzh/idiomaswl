# Auditoría experta final — ecosistema ICFES Inglés

Fecha: 2026-09-09T02:13:38.543Z

## Veredicto

**APROBADO** para revisión humana de integración. No se desplegó, publicó, hizo push ni merge.

## Cobertura demostrada

- 34 recursos inventariados: 23 mocks propios, 7 muestras Saber 11, 3 recursos de otras evaluaciones y un entrenamiento guiado autónomo.
- 1.235 preguntas servidas en experiencias guiadas: 1.035 de mocks propios, 55 del recorrido vigente y 145 de cinco muestras históricas elegibles.
- Dos muestras excluidas del guiado porque faltan seis estímulos; sus rutas guiadas responden 404 en vez de inventar contenido.
- 100 estudiantes sintéticos en siete cohortes y 33 rutas únicas; 48 rutas públicas aprobaron el smoke exhaustivo.
- 30/30 controles SEO/producto y cero hallazgos críticos o altos abiertos.

## Evidencia de navegador

- desktop 1440×1000: resultado gratuito visible, cero errores de consola y cero claves sensibles de scoring.
- mobile 390×844: resultado gratuito visible, cero errores de consola y cero claves sensibles de scoring.

## Juicio experto ICFES

La arquitectura distingue con claridad el formato estándar 2026-2, las prácticas propias abreviadas, los bancos históricos atribuidos y Saber 9/10/TyT. La atribución no se presenta como procedencia verificada ni como afiliación. El motor ya no entrega feedback intercambiable: muestra significado o regla, evidencia localizada, razón por alternativa, microlección y transferencia. La Parte 1 conserva el recorrido visual aprobado y el patrón se escala mediante un contrato común sin borrar la identidad de cada tarea.

## Límites que no deben convertirse en promesas

- La cohorte de 100 es sintética: valida rutas, contenido expuesto y oportunidad pedagógica, no memoria, motivación ni aprendizaje observado en estudiantes reales.
- La indexabilidad técnica no garantiza posiciones en Google. Rendimiento orgánico requiere publicación autorizada, rastreo y datos posteriores de Search Console.
- Las dos muestras con avisos faltantes permanecen deliberadamente sin guiado; incorporar la fuente completa exige una nueva revisión editorial.
- No se predice puntaje oficial ni se presenta una muestra histórica o práctica propia como equivalente a la aplicación estándar 2026-2.

## Observaciones informativas



## Compuerta de regresión

Ejecutar `npm run check:icfes-superhub`. Para verificación renderizada, levantar el servidor de auditoría y ejecutar `npm run audit:icfes-runtime` y `npm run audit:icfes-100-users:runtime`.
