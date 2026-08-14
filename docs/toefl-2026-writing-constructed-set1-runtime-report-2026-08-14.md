# TOEFL iBT 2026 — informe runtime T17 Email y Discussion Set 1

Fecha de corte: **2026-08-14**
Objeto: **`object:toefl-writing-constructed-set1-v2`**
Estado: **implementación automática completa; VoiceOver humano pendiente; T17 `[~]`**

## Resultado

El Set 1 ya tenía una tarea Email y una Academic Discussion, pero la experiencia no
aplicaba límites de intento, inventaba 80–120 palabras para Email, ofrecía corrector
ortográfico y terminaba pidiendo al estudiante una banda numérica 1–6 que luego se
trataba como resultado de Writing.

El piloto T17 preserva los dos prompts originales y los separa del workbench pedagógico
anterior. Email dura 420 segundos y no declara un mínimo oficial inexistente. Academic
Discussion dura 600 segundos y conserva la recomendación de al menos 100 palabras. El
reloj nace de un deadline de pared persistente: recargar o suspender el equipo no lo
reinicia. Enviar o llegar a cero sella el texto. Las respuestas se guardan sólo en el
navegador y cierran como `not_evaluated`; la rúbrica WeLearn no produce banda ni score
ETS.

El simulacro completo ya no pide la banda inventada para estas dos respuestas ni las
incluye en un total local. Muestra los límites de referencia y conserva los textos como
`not_evaluated`. La composición de esos dos relojes dentro de la sesión completa sigue
reservada para T23; T17 valida el piloto de tarea individual, no afirma que el runner
completo ya sea una réplica cronometrada.

Fuentes oficiales revalidadas:

- `https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html`
- `https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf`
- `https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-lesson-plan-writing.pdf`

## Evidencia

| Control | Resultado |
|---|---|
| Checker T17 | PASS |
| Unit T17 | PASS 7/7 |
| Regresión T12 + T13 + T16 | PASS 21/21 unit y 3/3 checker |
| ESLint dirigido | PASS, 0 errores/advertencias |
| TypeScript sobre `main` actual | PASS |
| Chromium T17 | PASS 4/4 en 3,8 min |
| Guardianes prebuild | PASS |
| Build producción | PASS, Turbopack + 1.363/1.363 páginas |
| Chromium producción T12 + T13 + T16 + T17 | PASS 19/19 en 16,5 s |
| Audio | Cero cambios |
| VoiceOver T17 | Pendiente humano |

Chromium cubrió inicio explícito, 7/10 minutos, ausencia de mínimo inventado en Email,
recomendación de 100 en Discussion, `spellcheck=false`, persistencia de texto, foco e
identidad, deadline estable después de recargar, expiración manipulada irreversible,
bloqueo después de enviar, seis criterios locales, reflow a 320 px y cierre del Set 1
sin banda numérica de Writing.

El primer build local no podía resolver `fonts.googleapis.com` dentro del sandbox y
Turbopack quedaba esperando sin mensaje útil. Webpack expuso el `ENOTFOUND`; al repetir
el comando oficial `npm run build` con red autorizada, Turbopack compiló en 95 s,
TypeScript interno en 70 s y generó 1.363/1.363 páginas. No se cambió la configuración
de build ni se rebajó un guardián.

## Checklist corto de VoiceOver T17

1. Abrir `/practica/toefl/writing/write-an-email` y activar VoiceOver.
2. Llegar a “Piloto Set 1 · Write an Email”. Debe oírse “Límite, 07:00” y el botón
   “Empezar tarea de 7 minutos”; el textarea todavía no debe existir.
3. Activar el botón. El foco debe llegar a “Tu respuesta”, el reloj debe mostrar tiempo
   restante y la ayuda debe indicar que ETS no publica mínimo para Email.
4. Escribir una frase y activar “Enviar y sellar respuesta”. El textarea debe quedar
   deshabilitado y anunciarse que el outcome local es `not_evaluated`.
5. Navegar por los seis checkboxes de “Rúbrica de revisión WeLearn”. Deben tener nombre
   y descripción comprensibles; no debe anunciarse banda ni score ETS.
6. Abrir `/practica/toefl/writing/academic-discussion`, iniciar y confirmar “10:00” y
   “mínimo recomendado 100”.

Para cerrar el gate basta registrar **“VoiceOver T17 aprobado”** o indicar el primer
anuncio/control que no coincida. T16 mantiene su propio VoiceOver pendiente. Audio
continúa diferido.
