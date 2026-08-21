# Blueprint de entregas y revisión TOEFL 2026

Los 20 sets comparten una sola tubería de corrección. Cada intento conserva resultados
objetivos, los dos textos y 11 grabaciones privadas sin fabricar una banda de sección.

## Flujo

1. El runner conserva cada grabación mientras avanza por Speaking. No permite pasar al
   siguiente ítem sin una respuesta oral real.
2. Al finalizar, Reading, Listening y Build a Sentence se recalifican en el servidor con
   claves privadas. El navegador no entrega puntajes confiables.
3. El endpoint crea una fila `exam_submissions`, devuelve un comprobante HMAC de corta
   duración y 11 capacidades de subida de un solo uso.
4. El navegador sube directamente al bucket privado `toefl-speaking-audio`. El servidor
   confirma que están los 11 archivos y que cada tamaño coincide antes de cerrar la ficha.
5. La pantalla de resultados usa el mismo comprobante para corregir Write an Email y
   Academic Discussion. El servidor exige coincidencia exacta con los textos guardados y
   persiste cada reporte por separado.
6. El panel administrador muestra resultados brutos, textos, reportes automáticos y
   enlaces temporales de audio. El profesor escucha toda la evidencia, asigna un entero
   0–5 a Listen and Repeat y otro a Take an Interview, deja observaciones y cierra la
   revisión.

## Alcance de los puntajes

- Reading, Listening y Build: aciertos brutos de esta práctica fija.
- Writing: estimación pedagógica entera 0–5 por tarea, con guías separadas.
- Speaking: estimación humana entera 0–5 por familia, basada en los audios.
- No existe conversión local a 1–6, overall ETS ni equivalencia `/120`.

Fuente pública de guías de tarea: [ETS TOEFL iBT Test Overview](https://www.ets.org/pdfs/toefl/toefl-ibt-test-overview.pdf), páginas 23–28. El contenido de WeLearn es original y no está afiliado, aprobado ni certificado por ETS.

## Seguridad y operación

- El bucket es privado, limita cada archivo a 10 MB y no tiene políticas públicas.
- El navegador solo recibe rutas y tokens firmados para el intento exacto.
- La clave de servicio vive en módulos `server-only`.
- El comprobante liga UUID y familia TOEFL, y vence a las 2 horas.
- Los límites de entrega usan el RPC durable compartido con IELTS.
- El texto debe superar 150 caracteres para producir feedback útil. Es un control técnico,
  no un mínimo oficial de ETS.
- Una recarga durante Speaking reinicia ese bloque porque los `Blob` del micrófono no
  pueden serializarse de forma segura en `localStorage`; evita fingir grabaciones perdidas.

## Verificación

```bash
npm run check:toefl-review-blueprint
npm run test:toefl-review
npm run check:toefl-audio-release
npm run check:toefl-fixed-preview -- https://www.idiomaswl.com
```

El guardián de revisión forma parte de `prebuild`, por lo que un set nuevo no puede entrar
sin blueprint, persistencia, scoring de servidor y contrato de audio privado.
