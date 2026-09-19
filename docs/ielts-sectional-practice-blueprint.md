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

La prueba también coteja los rangos que ve el estudiante en las instrucciones con los números reales de cada parte. El único erratum registrado es Set 4, Listening Part 3: la fuente académica aprobada dice 21–30, pero las siete preguntas son 21–27. `displayIeltsSectionInstructions` corrige esa frase en el mock completo, la práctica y el PDF estudiantil sin modificar la fuente ligada por hash a la aprobación humana. La prueba enumera esta excepción exacta; cualquier otro desajuste visible rompe el gate. La hoja de respuestas del PDF conserva sus columnas globales 1–10, 11–20, 21–30 y 31–40 para las 40 respuestas.

## Escalado

Para Sets 21–40 se registra primero el mock completo mediante el blueprint de fábrica. Cuando el set supera sus auditorías de Listening, Reading, Writing, Speaking, claves, UX y evidencia, se añade el identificador al catálogo seccional. La práctica y el PDF aparecen desde la misma fuente; no se copian preguntas ni se crea una segunda clave.

## Reading, Writing y Speaking

La portada `/practica/ielts#destrezas` separa las cuatro habilidades. Cada biblioteca de Reading, Writing y Speaking muestra `set-1` a `set-20` y abre el mock canónico con `mode=practice&skill=...`; el mock completo conserva su ruta sin parámetros y su cronómetro. La práctica enfocada navega libremente entre los tres pasajes de Reading, las dos tareas de Writing o las tres partes de Speaking. Usa claves de borrador distintas del examen completo y no obliga a enviar una entrega integral para terminar la habilidad.

Reading presenta una banda estimada a partir de sus 40 respuestas y un desglose por pasaje. Writing muestra los dos borradores y sus extensiones; Speaking permite grabar y reproducir durante la sesión. Ninguna de estas dos últimas habilidades presenta una banda automática ni afirma que la práctica se haya enviado al profesor. Las grabaciones de Speaking no se guardan en `localStorage` y desaparecen al cerrar la sesión.

`test:ielts-focused-practice` comprueba para los 20 sets los tres pasajes y 40 respuestas de Reading con una ruta 40/40, las dos tareas de Writing con el visual existente de Task 1 y los tres prompts de Speaking. Se ejecuta dentro de `check:ielts-sectional-listening`, que ya forma parte de `check:ielts-harness`.

La ampliación editorial futura seguirá el principio de fuente única: auditar primero el set completo y después exponerlo en las bibliotecas. Listening mantiene además su contrato reforzado de scoring privado y PDF estudiantil. Para los otros módulos, si se necesita descarga de hojas o corrección privada al estilo Listening, se añadirá un adaptador específico antes de habilitar esas funciones; el modo actual no promete esas prestaciones.
