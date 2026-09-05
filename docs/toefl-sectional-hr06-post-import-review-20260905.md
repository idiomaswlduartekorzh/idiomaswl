# HR-06 — revisión final después de importar las opciones

Estado: **PENDIENTE DE PRODUCTO Y ACADÉMICO**. Runtime importado y validado el 5 de septiembre de 2026.

## Abrir la muestra

El preview local está en <http://127.0.0.1:3027/practica/toefl/listening/simulacros>. Revisar estos sets en orden:

1. <http://127.0.0.1:3027/practica/toefl/listening/simulacros/practica/set-1>
2. <http://127.0.0.1:3027/practica/toefl/listening/simulacros/practica/set-5>
3. <http://127.0.0.1:3027/practica/toefl/listening/simulacros/practica/set-10>
4. <http://127.0.0.1:3027/practica/toefl/listening/simulacros/practica/set-15>
5. <http://127.0.0.1:3027/practica/toefl/listening/simulacros/practica/set-20>
6. <http://127.0.0.1:3027/practica/toefl/listening/simulacros/practica/set-9>

Set 9 es la muestra aleatoria bloqueada antes de la revisión y no puede sustituirse.

## Producto debe comprobar

- Que la biblioteca y cada set sean claros y visualmente coherentes con Idiomas WeLearn.
- Que iniciar, continuar, terminar, repetir y volver sea intuitivo.
- Que audio, opciones, progreso y resultado respondan correctamente.
- Que recargar conserve el intento y que los sets no compartan respuestas.
- Que móvil, teclado y foco visible funcionen sin controles tapados.

## Académico debe comprobar

- Que los audios correspondan a preguntas y opciones.
- Que la opción correcta lo sea y los distractores sean plausibles pero incorrectos.
- Que las cuatro familias de tareas mantengan instrucciones coherentes.
- Que el resultado bruto corresponda a las respuestas realizadas.
- Que se entienda que es práctica fija, no adaptativa y sin puntuación oficial TOEFL.

## Evidencia exacta

- Commit importado: `9efd3c3bf2e3d11eabcd0f1934fbab4d3018c852`.
- Contrato aprobado: SHA-256 `5943893930224895b1d0878abbb075a61460030442a2888ffa3bb8eddaf6a820`.
- Evidencia: `docs/toefl-listening-options-applied-20260905.json`.
- Resultado técnico: 680/680 listas iguales a los candidatos; 14/14 pruebas; 400/400 audios; TypeScript y build de producción pasan; los 20 sets cumplen las cuatro métricas con límite 45 %.

## Decisiones requeridas para cerrar HR-06

Producto:

> David Duarte aprueba producto de HR-06 para la muestra Set 1/5/10/15/20/9 del runtime `9efd3c3b`, sin observaciones.

Académico:

> Zhanna Korzh aprueba académicamente HR-06 para la muestra Set 1/5/10/15/20/9 del runtime `9efd3c3b`, sin observaciones.

C09 continúa bloqueado. Estas decisiones no autorizan todavía integración en `main` ni despliegue.
