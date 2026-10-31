# IELTS Mock 1 gratuito: prueba local de Writing

Estado: `PRUEBA_LOCAL`. Sin integración en `main` ni despliegue. `IELTS_MOCK1_FREE_ENABLED=1` solo funciona con `NODE_ENV=development`; producción permanece cerrada aunque se configure la variable.

## Recorrido

- IELTS Academic Set 1 completo abre sin cuenta ni suscripción. Los demás sets conservan su acceso actual.
- Al entregar se piden nombre, correo y consentimiento académico. Esta prueba no pide WhatsApp ni crea un lead comercial. La entrega sigue validando las dos tareas de Writing y los audios obligatorios de Speaking y se guarda en Supabase como antes.
- Después de entregar aparece el resultado detallado. Writing solo se envía a OpenAI cuando el estudiante pulsa «Revisar mis textos». El aviso enumera lo que se envía. Los audios se suben al almacenamiento privado existente del examen, pero **no** se envían a OpenAI ni se transcriben en esta prueba.
- La API recibe cada texto junto con su consigna real, rúbrica IELTS y, para Task 1, la gráfica. El texto del estudiante se trata como datos, nunca como instrucciones. La respuesta es una estimación pedagógica; Speaking sigue pendiente.

## Controles

- La clave solo existe en el servidor como `OPENAI_API_KEY`; la llamada usa `store: false`. No se escribe en el repositorio, navegador, respuesta ni logs.
- Cada tarea exige un comprobante firmado de entrega y que el texto coincida con el guardado. Máximo 5.000 caracteres por ensayo, 4.000 por consigna, 1 MB para la gráfica, 3.600 tokens de salida y 32 KB de respuesta. El JSON se valida antes de mostrarlo o guardarlo.
- Cuota duradera y atómica mediante la RPC Supabase existente: 2 intentos por tarea y entrega, 4 por correo, 6 por IP y 30 globales cada 24 horas. El registro guarda solo hashes de identificadores. Un fallo de la cuota cierra la llamada. El informe exitoso se guarda y los pedidos repetidos usan la copia sin gastar cuota.
- Errores, saldo agotado y límites se muestran sin borrar el examen. No hay respaldo de pago ni recarga automática.

Tarifa estándar consultada el 31 de octubre de 2026 para GPT-6 Luna: USD 0,10 por millón de tokens de entrada y USD 0,50 por millón de salida. Con unas 2.000–10.000 unidades de entrada (incluida la imagen de Task 1) y 1.500–3.600 de salida, el orden de magnitud es USD 0,001–0,003 por tarea o USD 0,002–0,006 por Mock 1. La imagen y las respuestas reales pueden cambiar el consumo. No se hizo una segunda llamada real: la única llamada real de bajo costo de este trabajo fue la prueba sintética de lectura A1, documentada aparte.

## Prueba local

Desde el worktree de esta rama, con las variables Supabase ya configuradas y la clave local ignorada por Git:

```bash
IELTS_MOCK1_FREE_ENABLED=1 npm run dev:audit -- --hostname 127.0.0.1 --port 3123
```

Abrir `http://127.0.0.1:3123/examenes/ielts/practica/set-1`. Completar los textos (mínimo 150 y 250 palabras), los tres audios y la entrega con nombre/correo. El botón de revisión aparece en resultados. La prueba automatizada sin gasto es:

```bash
node --experimental-strip-types --no-warnings --experimental-loader ./tests/ts-paths-loader.mjs --test tests/ielts-mock-one-openai.test.mjs
```

## Antes de publicar

Decidir presupuesto mensual y cuota pública, revisar con una docente la calidad y calibración de bandas, aprobar el aviso de privacidad y definir retención/borrado de entregas y audios. La experiencia gratis local aún requiere grabar Speaking; decidir si el producto público mantendrá ese requisito. Ninguna ruta de esta rama se publica sin una decisión posterior.
