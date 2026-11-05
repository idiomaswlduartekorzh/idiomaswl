# Revisión opcional de producción escrita

Estado: integrada solo en la rama de trabajo; endpoint apagado por defecto y sin despliegue.

La revisión aparece después de ejercicios de escritura de lecturas, gramática,
práctica IELTS/TOEFL, exámenes de idiomas y asignaciones del panel personal.
Solo se envía contenido al pulsar «Revisar mi texto». La solicitud incluye el
borrador y el contexto visible de la asignación. En la lectura de alemán A1 se
exigen 5–7 frases y 25–60 palabras. La respuesta da hasta dos errores
prioritarios, una versión corregida y una invitación a reescribir; no es una
calificación oficial. La revisión de escritura no envía grabaciones de audio.

## Límites y modelo

- El endpoint requiere `OPENAI_WRITING_FEEDBACK_ENABLED=1` y `OPENAI_API_KEY` en
  el entorno del servidor. La clave no se lee en el cliente ni se devuelve.
- IELTS Mock 1 conserva un interruptor separado: `IELTS_MOCK1_FREE_ENABLED=1`
  habilita el simulacro gratuito y `OPENAI_WRITING_FEEDBACK_ENABLED=1`
  habilita además su corrección. Ambos quedan apagados por defecto.
- GPT-6 Luna usa `store: false`, instrucciones fijas y formato JSON estructurado.
  El borrador y el contexto se envían como datos, nunca como instrucciones.
- Máximo 8.000 bytes de texto, 8.000 bytes de contexto, 22.000 bytes por cuerpo
  y 1.400 tokens de salida para la revisión breve.
- Cuota duradera: 8 solicitudes por navegador al día, 100 por IP al día y un
  tope común de 150 solicitudes por día UTC para la revisión general y el
  IELTS Mock 1. El RPC existente admite ventanas de hasta 24 horas; cada día
  usa una clave distinta y la reserva se cierra si Supabase falla. En un mes
  de 31 días son como máximo 4.650; se reserva margen para periodos de cobro
  que crucen 32 fechas UTC, con un máximo de 4.800 solicitudes.
- La ruta de exámenes limita el cuerpo entrante a 32 KB, la imagen de la
  consigna a 1 MB y la respuesta del proveedor a 32 KB. La ruta general limita
  el cuerpo a 22 KB y la respuesta a 20 KB; los streams se leen con tope.
- El botón de IELTS Mock 1 también requiere entregar el examen y aceptar el
  aviso previo. Su evaluación detallada conserva su formato existente.

## Estimación de costo

La tarifa estándar publicada para GPT-6 Luna al 5 de noviembre de 2026 es
USD 0,10 por millón de tokens de entrada y USD 0,50 por millón de salida.
Como estimación orientativa, una corrección breve típica ronda USD 0,0002; con
los máximos de texto y respuesta, la revisión general queda por debajo de
USD 0,004. IELTS Mock 1 puede usar hasta 3.600 tokens de salida; su gráfica
Task 1 publicada mide 936 × 460 px. Aun reservando conservadoramente USD 0,01
por solicitud, el máximo de 150 al día durante 32 fechas UTC equivale a USD 48.
El límite de la aplicación es por cantidad, no es un tope de facturación de
OpenAI ni cubre otros usos del mismo proyecto. Antes de producción hay que
configurar también el presupuesto/alerta del proyecto y comparar con el
consumo real.

Fuentes: [modelo GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna),
[tarifas de API](https://developers.openai.com/api/docs/pricing) y
[reglas de imágenes](https://developers.openai.com/api/docs/guides/images-vision).

## Prueba local

```bash
npm run test:writing-feedback
```

Las pruebas usan una respuesta simulada y no consumen saldo. Para comprobar la
interfaz y el estado de error local sin enviar texto al proveedor, inicia Next
con una clave ficticia que sustituya cualquier valor local:

```bash
OPENAI_API_KEY=local-test-only OPENAI_WRITING_FEEDBACK_ENABLED=1 npm run dev
```

Para mostrar localmente el piloto gratuito de IELTS Mock 1 con la API todavía
fingida, añade `IELTS_MOCK1_FREE_ENABLED=1` al mismo comando. El flujo requiere
que el entorno de Supabase usado sea local o de pruebas.

La prueba de éxito usa respuestas simuladas. No se ha validado ni usado una
clave para una llamada real; esta queda pendiente de configurar una clave
dedicada mediante el gestor seguro y confirmar saldo. El endpoint responde
`404` cuando la bandera está apagada y muestra mensajes no sensibles cuando
faltan saldo, cuota o servicio. No se ha consumido saldo en esta rama.

## Aprobaciones previas a producción

1. Revisar ejemplos de feedback en alemán A1 y en cada familia de examen.
2. Aprobar el aviso de envío al proveedor y su texto de privacidad.
3. Aplicar el presupuesto autorizado de USD 50 mediante límites/alertas del
   proyecto OpenAI además de la cuota duradera por solicitudes.
4. Guardar la clave como secreto del entorno de producción y habilitar la
   bandera solo después de resolver los puntos anteriores.

No se hizo ninguna llamada real ni se desplegó el cambio.
