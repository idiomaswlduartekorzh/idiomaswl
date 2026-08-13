# TOEFL iBT 2026 — preparación de auditoría humana de audio T08

Fecha de corte: 2026-08-09
Unidad: T08 — Auditoría humana estratificada de audio
Estado: diferida por decisión del owner; no cerrada, 0 escuchas adjudicadas
Libro de revisión: `outputs/toefl-t08-human-review-2026-08-09/toefl-2026-audio-human-review.xlsx`

## 1. Decisión de alcance

T08 no puede cerrarse con ASR, FFmpeg, métricas acústicas ni una revisión de texto.
El contrato del loop exige que una persona escuche la muestra y el 100 % de los casos
severos, registre el canon pronunciado, califique la experiencia audible y justifique
la clase A/B/C/D del activo existente.

La línea base real al iniciar esta rebanada es:

- 260/260 audios con `human_status` pendiente;
- 0/260 escuchas humanas registradas;
- 0/260 transcripciones canónicas adjudicadas;
- 170 P1 y 24 P2 que requieren revisión al 100 %;
- 66 P3 fijados por T07 como muestra estratificada conservadora;
- 260/260 con `release_status=blocked_not_validated`.

La política de esta rebanada no reduce el alcance: se escuchan los 260 assets. La
duración de señal es 94,355 minutos. Los 20 de calibración tienen doble revisión y
añaden como mínimo otros 8,411 minutos; el piso auditivo es por tanto 102,766 minutos,
sin contar replays, escritura del canon ni adjudicación.

## 2. Artefacto preparado

Se creó un libro editable con cinco hojas:

| Hoja | Propósito |
|---|---|
| `Resumen` | Cobertura, avance vivo, gate T08, hashes y restricciones |
| `Calibración` | Vista de los 20 assets del primer lote; no duplica campos editables |
| `Cola humana` | Fuente única de verdad: 260 filas × 53 columnas |
| `Reglas` | 20 reglas HUM-001–HUM-020 de escucha, severidad, stop y clase |
| `Listas` | Valores permitidos para validaciones de datos |

El libro empieza honestamente en cero: 0 escuchados, 0 filas completas, 0 canones y
0 segundas revisiones registradas. El gate muestra `PENDIENTE_HUMANO`; no puede cambiar
a `T08_GATE_READY_FOR_FINAL_AUDIT` hasta que las 260 filas estén completas, cada una
tenga canon y toda adjudicación esté resuelta.

Los campos humanos son amarillos y tienen validación de datos. Las columnas derivadas
son fórmulas visibles: `second_review_required`, `row_complete` y
`validation_errors`. `release_status` permanece bloqueado y no es editable como una
aprobación de publicación.

Las rutas de `Audio local` conservan el MP3 original absoluto. Para abrirlas sin
depender de fórmulas o macros, el libro indica copiar la ruta, usar `⌘⇧G` en Finder,
pegarla y pulsar Enter. Esta operación sólo reproduce el archivo; no lo modifica.

Hash SHA-256 del libro:
`b78c9ddb73a9f77b1abc78b5fbb2525108bc262bc124d1b90d79018023c5e9c6`.

## 3. Lote de calibración CAL-01

CAL-01 contiene 20 assets y debe completarse antes de abrir el resto del lote. Cubre:

- 14 P1, 1 P2 y 5 P3;
- 8 Choose Response;
- 2 Conversations;
- 1 Announcement;
- 2 Academic Talks;
- 7 Listen and Repeat;
- los 13 audios del Set 1 como rebanada vertical completa;
- 7 riesgos dirigidos fuera del Set 1.

Los siete riesgos dirigidos son:

| Asset | Razón de inclusión |
|---|---|
| `set-5/repeat-5` | Pico +0,29 dBTP y cinco muestras recortadas en T06 |
| `set-7/choose-2` | Hipótesis ASR incierta “a hank” |
| `set-18/choose-2` | Hipótesis ASR gramaticalmente incierta |
| `set-15/choose-1` | Prompt plural y clave singular |
| `set-2/academic-talk` | Señal ASR de baja confianza |
| `set-11/conversation` | Baja confianza y señal alta de no-habla al final |
| `set-14/repeat-1` | Coincidencia textual exacta con señal ASR baja |

Todos los CAL-01 exigen dos revisores y adjudicación. La hoja `Calibración` sólo es una
vista; los revisores editan la misma fila autoritativa en `Cola humana`.

## 4. Protocolo de escucha

1. Usar audífonos y velocidad 1×.
2. Escuchar antes de tomar la hipótesis ASR como cierta.
3. Registrar número de escuchas; QA puede repetir, aunque la experiencia de examen no.
4. Adjudicar el texto realmente pronunciado. Mantener etiquetas de hablante cuando
   haya varios roles.
5. Calificar claridad, naturalidad, prosodia, pronunciación, velocidad/pausas,
   coherencia de voces, artefactos, corte semántico, dificultad, idoneidad de tarea,
   inteligibilidad del acento, sesgo y observación de derechos.
6. Usar `none` en `human_finding_ids` cuando no haya hallazgo; el vacío no cuenta como
   evidencia.
7. Firmar la attestation, identidad/rol del revisor y fecha.
8. Resolver segunda revisión y adjudicación cuando la fórmula lo exija.

ASR, texto fuente, pregunta, clave y métricas técnicas están precargados como ayudas
diagnósticas. No rellenan por sí solos ningún campo humano.

## 5. Severidad y decisiones

| Rating | Interpretación |
|---|---|
| `pass` | Apto en esa dimensión |
| `minor` | Defecto perceptible que no altera contenido ni idoneidad |
| `major` | Afecta naturalidad, comprensión, fidelidad o uso responsable |
| `blocker` | Contradicción, corte, ininteligibilidad, daño o riesgo que impide avanzar |
| `not_applicable` | Dimensión legítimamente no aplicable, con justificación global |

Cualquier `major`/`blocker`, canon corregido o decisión B/C/D exige segundo revisor.
También lo exigen los 20 CAL-01 aunque parezcan limpios. Tres fallos major/blocker del
mismo patrón detienen la familia para revisar regla y causa; no se continúa procesando
el lote a ciegas.

Las decisiones permitidas son:

- A / `approve`: conservar sólo si canon y escucha pasan y no hay fallo técnico T06
  accionable sin resolver;
- B / `repair`: conservar original y definir una variante reparada trazable;
- C / `segment`: conservar original y decidir el derivado en T15;
- D / `replace`: fallo material no reparable, con segunda revisión;
- `block`: evidencia insuficiente, disputa o riesgo de derechos.

E no clasifica un asset existente: una brecha de generación sólo puede aparecer en
T20 y requiere aprobación humana real en T21.

## 6. Reglas de aceptación del lote

T08 sólo puede aspirar a cierre cuando:

- CAL-01 tiene 20/20 revisiones primarias, 20/20 secundarias y 0 disputas abiertas;
- P1 tiene 170/170 completos;
- P2 tiene 24/24 completos;
- P3 tiene 66/66 completos, sin reducir la muestra fijada;
- los 260 canones están adjudicados o el asset queda explícitamente bloqueado;
- toda fila tiene ratings, findings, clase, decisión, justificación, revisor, rol,
  attestation y fecha;
- todo caso que exige segunda revisión la tiene;
- no queda `pending`, `needs_second_review` ni `disputed`;
- el cruce T06 + T07 + T08 sustenta la clase sin convertir un pase parcial en release;
- los 260 originales conservan sus hashes y ninguna reparación los sobrescribe.

Completar el libro tampoco publica el lote. Antes de cerrar T08 se deben repetir las
siete auditorías y registrar los resultados consolidados en el loop.

## 7. Siete auditorías de esta rebanada

1. **Full-stack/datos/repositorio:** pasa la preparación. El libro une 260 IDs únicos
   con T06/T07, conserva 170/24/66 y no toca cambios ajenos ni fuentes de producto.
2. **TOEFL vigente:** pasa como protocolo. Se evalúa idoneidad para L-001–L-004/S-001,
   sin atribuir WER, ratings o clase local a ETS ni prometer examen completo.
3. **Editorial/pedagógica:** pasa como rúbrica. Canon, pregunta/clave, naturalidad,
   dificultad y tarea tienen campos separados; la evaluación efectiva sigue pendiente.
4. **Audio técnico/lingüístico/humano:** abierta. La cola y reglas existen, pero 0/260
   audios han sido escuchados por una persona; no se finge aprobación.
5. **Multiperspectiva/anti-sesgo/derechos:** pasa como contrato de observación y stop.
   Acento, estereotipo y derechos siguen sin resolver hasta la escucha y documentación.
6. **UI/UX/accesibilidad:** pasa para el libro: resumen visible, filtros, filas/columnas
   congeladas, validaciones, colores con texto redundante y campos editables claros.
   No certifica el runner TOEFL, que no cambió.
7. **Playwright:** no aplicable. No cambió ninguna UI web ni runtime; el XLSX se
   verificó mediante render visual de sus cinco hojas e importación posterior.

## 8. Validaciones ejecutadas

- 260 filas, 53 columnas y 260 IDs únicos;
- 20 CAL-01 exactos;
- prioridades 170 P1 / 24 P2 / 66 P3;
- cinco hojas exportadas e importadas correctamente;
- 0 valores humanos precargados como evidencia;
- 0 errores `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?` o `#N/A`;
- seis renders inspeccionados: resumen, calibración, dos vistas de cola, reglas y
  listas;
- paquete XLSX válido con `unzip -t` sin errores;
- hashes T06/T07 fijados dentro del libro.

Durante la construcción se corrigieron dos defectos antes de entregar: celdas vacías
que el primer resumen contaba como canon/segunda revisión y una regla de color que
interpretaba `incomplete` como si contuviera un estado completo válido. La versión
final parte de cero y muestra los incompletos en rojo.

En la segunda verificación se comprobó otra vez que el archivo seguía sin edición
humana: mismo estado de 0 escuchas, 0 filas completas, 0 canones y 0 segundas
revisiones. Se probó una fórmula `HYPERLINK` para reducir fricción, pero el motor de
exportación guardó un valor de caché no implementado; se retiró antes de entregar y se
adoptó la instrucción Finder reproducible, preservando las rutas originales. El libro
final volvió a pasar reimportación, búsqueda de errores, seis renders y `unzip -t`.

La tercera verificación reimportó el mismo hash y contó directamente las 260 filas:
0 `reviewed`, 0 conteos de escucha, 0 canones, 0 ratings, 0 findings, 0 clases, 0
decisiones, 0 justificaciones, 0 identidades/roles/attestations/fechas, 0 segundos
revisores y 0 adjudicaciones. No existe evidencia que permita completar CAL-01 ni
corregir el bloqueo mediante otra operación automática.

## 9. Gate actual y siguiente acción

T08 no está cerrada ni aprobada: queda diferida por decisión explícita del owner para
completar primero las unidades no dependientes de escucha humana. El gate, la muestra,
las reglas y el libro permanecen intactos; no se convierte ASR en aprobación ni se
reduce la cobertura.

La secuencia autorizada es completar T09–T13 y T16–T17, y después reabrir T08. En ese
momento dos revisores deben completar CAL-01 en este mismo libro antes de cerrar T08 y
de abordar T14, T15, T18, T19 y el manifiesto/producción de medios T20–T22. La próxima
unidad elegible del tablero maestro es T09.

No se leyó `.env.local`, no se consultaron secretos, no se llamó ElevenLabs, no se
generó audio, no se modificaron MP3 y no se hizo commit, push, deploy, merge, rebase ni
cambio de remotos.
