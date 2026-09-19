# Blueprint de práctica IELTS por secciones

La práctica por secciones reutiliza los mocks auditados; no mantiene un banco paralelo. La ruta de Listening proyecta las cuatro partes del set elegido, preserva el MP3, la numeración global y el orden de opciones que ya usa el examen completo, y elimina las claves y transcripciones antes de enviar los datos al navegador.

## Contrato de Listening

- El catálogo público contiene exactamente `set-1` a `set-20`.
- Cada set tiene cuatro partes, 40 respuestas numeradas del 1 al 40 y un solo MP3 compartido.
- El estudiante puede pausar, repetir, adelantar, retroceder y navegar entre partes sin cronómetro.
- El progreso se guarda localmente con la versión editorial del set. Un cambio de contenido invalida el borrador anterior.
- La corrección ocurre en el servidor. La petición solo acepta identificadores y campos que pertenecen al set; la respuesta devuelve aciertos, banda estimada y desglose por parte, nunca las claves.
- El PDF para estudiantes contiene instrucciones, las 40 preguntas y una hoja de respuestas en blanco. No contiene transcripción ni solucionario.

## Compuerta automática

`npm run test:ielts-sectional-listening` prueba el catálogo, la numeración, la ausencia de claves en el payload público, los 20 audios, la corrección perfecta 40/40 y los controles de práctica. `npm run check:ielts-sectional-listening` ejecuta una verificación rápida de las 20 proyecciones y archivos. Ambos forman parte de `check:ielts-harness`, de modo que un cambio futuro en un mock no puede dejar la práctica desalineada sin romper el build.

## Escalado

Para Sets 21–40 se registra primero el mock completo mediante el blueprint de fábrica. Cuando el set supera sus auditorías de Listening, Reading, Writing, Speaking, claves, UX y evidencia, se añade el identificador al catálogo seccional. La práctica y el PDF aparecen desde la misma fuente; no se copian preguntas ni se crea una segunda clave.

Reading, Writing y Speaking deben seguir el mismo patrón: adaptador público sin material de corrección, estado versionado, evaluación en servidor cuando aplique, PDF estudiantil y prueba de paridad contra el mock completo.
