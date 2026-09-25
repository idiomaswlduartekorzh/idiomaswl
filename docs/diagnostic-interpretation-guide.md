# Nivel Radar — guía de interpretación y comunicación

Esta guía es para tutores, soporte, Producto y cualquier persona que converse con un estudiante
sobre su resultado. Debe usarse junto con la pantalla o el PDF del intento exacto. No autoriza
inferir datos ausentes, sustituir una revisión humana ni presentar Nivel Radar como certificación.

## Qué responde el diagnóstico

Nivel Radar estima por separado lectura, escucha, escritura, gramática y vocabulario. El nivel
global, cuando existe, resume el centro del perfil; nunca reemplaza las cinco estimaciones. Su uso
permitido es orientar una ruta de aprendizaje WeLearn y decidir qué habilidad trabajar primero.

No debe usarse para admisión, inmigración, contratación, certificación oficial ni equivalencia
automática con IELTS, TOEFL, Cambridge u otro examen. Tampoco permite afirmar que una persona
“domina X % del inglés”.

## Cómo leer cada campo

| Campo | Interpretación correcta | Interpretación incorrecta |
|---|---|---|
| Nivel estimado | Banda MCER que mejor resume la evidencia observada en esa habilidad | Nivel definitivo de toda la persona |
| Rango plausible | Niveles compatibles con la incertidumbre de la medición | Margen que puede ignorarse para vender una precisión exacta |
| Confianza técnica | Precisión relativa de la estimación con la evidencia disponible | Porcentaje de dominio o probabilidad de que el nivel sea correcto |
| Provisional | Estimación con parámetros y cortes aún pendientes de calibración real completa | Resultado ya validado porque el software funciona |
| Calibrada | Estimación producida con la política validada y parámetros que cumplen su muestra | Certificación externa u oficial |
| No estimada | No hubo evidencia suficiente o la muestra fue excluida legítimamente | Nivel cero, fracaso o ausencia de conocimiento |
| Vigencia orientativa | Fecha a partir de la cual conviene repetir para planificar aprendizaje | Caducidad de una certificación |

Una confianza más alta no vuelve “mejor” el nivel: solo indica una estimación más precisa. Un A2
con mayor confianza no supera a un B1 con menor confianza. Para decisiones de estudio se mira
primero el rango, luego el estado y finalmente la confianza.

## Protocolo de conversación del tutor

1. Confirmar que el intento y el PDF corresponden a la misma fecha y que el resultado sigue
   dentro de su vigencia orientativa.
2. Leer las cinco habilidades antes del nivel global. Identificar fortalezas, brechas y campos no
   estimados sin convertirlos en un promedio casero.
3. Explicar el rango plausible con lenguaje de incertidumbre: “la evidencia es compatible con
   A2–B1”, no “eres exactamente B1”.
4. Si el perfil difiere por dos o más niveles, tratar cada habilidad por separado y evitar una
   etiqueta única. Seguir las prioridades que muestra el resultado.
5. Acordar una acción observable por habilidad prioritaria y usar los enlaces de práctica/curso
   incluidos. No prescribir una ruta que contradiga la evidencia mostrada.
6. Registrar dudas o incidencias operativas sin copiar respuestas, texto escrito, IDs de ítem ni
   audio reservado en sistemas no aprobados.

## Mensajes que sí puede recibir el estudiante

Perfil completo provisional:

> Tu resultado orienta qué practicar primero. Cada habilidad tiene su propio nivel y rango; la
> confianza técnica indica precisión de estimación, no porcentaje de dominio. No es una
> certificación oficial.

Perfil desigual:

> Tus habilidades no están todas en la misma banda. Eso es útil: trabajaremos la brecha concreta
> sin reducir tu perfil a un solo promedio.

Habilidad no estimada:

> Aquí no hubo evidencia suficiente para publicar una estimación responsable. No significa nivel
> cero. Conservamos las demás habilidades y te indicaremos si corresponde repetir esa parte.

Escritura excluida tras revisión:

> La muestra no permitió estimar escritura bajo las reglas del diagnóstico. No asignaremos un
> nivel inventado; revisaremos la causa indicada y el siguiente paso apropiado.

## Cuándo escalar

El tutor no modifica un nivel. Debe escalar a Operaciones o Medición cuando haya audio que no
reproduce, un intento vencido que aparece activo, un resultado que no coincide entre pantalla y
PDF, una advertencia desconocida, un rango imposible, una habilidad duplicada/ausente, o una
discrepancia de más de un nivel frente a una referencia independiente vigente.

Una sospecha sobre contenido, sesgo o deriva de ítem se registra sin revelar la pregunta al
estudiante y sigue el procedimiento de `docs/diagnostic-release-operations-runbook.md`. Ninguna
alerta recalibra o retira un ítem automáticamente.

## Estado de esta guía

El vocabulario debe coincidir con `src/lib/diagnostic/result-language.ts`, la pantalla y el PDF.
Cualquier cambio en significado, usos permitidos o manejo de incertidumbre modifica el snapshot
de gobierno de entrega y requiere una nueva revisión académica y de Producto.
