# HANDOFF — Sección de resultados con certificados reales

Para Codex. La home está **revertida a como la dejaste** (commit `05c4288`). Nada de lo
que sigue está aplicado: es material y aprendizajes para que no repitas los callejones.

---

## 1. Qué quiere José David

Al final de la tercera secuencia de scroll (`#evidencia-en-movimiento`) aparece un
documento con barras rojas y un hilo. La idea:

> "que ese cuadro donde estaba en rojo se convierta en los reportes, y después se abran
> los reportes para que la gente al pasarle el cursor pueda verlos"

Un solo gesto continuo. **Lo que rechazó explícitamente** fue mi primer intento: un
video y, debajo, una rejilla de tarjetas que aparecía de la nada. Sus palabras:
"eso queda al integrado… lo que salga de la nada, el del culo".

Lo único que sí le gustó: **el hover** (la hoja se levanta y muestra el recuadro del
puntaje ampliado). Eso conviene conservarlo.

---

## 2. Dónde está el trabajo

**Stasheado en el worktree** `.claude/worktrees/codex-home-story-v1`:

```
git stash list          # stash@{0}: seccion-resultados-abanico
git stash show -p stash@{0}
git stash pop stash@{0} # si quieres recuperarlo
```

Contiene: `ResultsStage.tsx`, `resultsStageMotion.ts`, los cambios de `page.tsx`,
`home-content.ts` y `Home.module.css`, el clip `evidence-to-results-*` y una copia de
las imágenes.

**Vivo en el repo principal** (no stasheado, sirve tal cual):

| Ruta | Qué es |
|---|---|
| `scripts/certificados.py` | Convierte escaneos en piezas publicables |
| `scripts/verificar-relevo.mts` | Comprueba la animación sin navegador |
| `work/certificados-escaneados/` | 38 páginas del PDF de CamScanner |
| `work/certificados-originales/` | 39 fotos originales (inservibles, ver §4) |
| `work/certificados-config.json` | Mapeo página → plantilla → slug |
| `public/images/resultados/` | 11 hojas + 11 recuadros de puntaje, ya tachados |
| `docs/GOAL-resultados.md` | El encargo, en 4.000 caracteres |
| `~/Downloads/hf_20260730_210745_*.mp4` | Clip fuente 834×1112, 193 cuadros |

---

## 3. El material: qué hay y qué vale

Del archivo de certificados salieron **39 hojas de 33 personas**: 12 TOEFL, 10 IELTS,
12 Goethe, 5 Celpe-Bras.

**Lo más valioso no son los puntajes altos, son tres progresiones:**

- **Germán** — TOEFL `73 → 87 → 92` en cinco meses, mismo centro. Cruza el 90 que piden
  las universidades. El salto grande está en Listening (+7) y Speaking (+4).
- **Lina** — IELTS `5.0/B1 → 6.0/B2` en doce meses, con **Speaking de 4.0 a 6.0**: dos
  bandas completas en la habilidad que todo el mundo da por perdida.
- **María Paula** — 4 hojas. En 2023: Goethe A1 (92/100) → Goethe B1 **en Göttingen**, y
  en paralelo IELTS 7.5/C1 **en el British Council de Berlín**.

Un puntaje alto dice que alguien era bueno. Una progresión dice que el método funciona.

Además: dos de los testimonios que ya están en la web (Karen, Goethe · Daniel,
Celpe-Bras) tienen su certificado en el archivo.

---

## 4. Callejones sin salida (no los repitas)

### 4.1 Las fotos originales no sirven

Las 39 fotos de `work/certificados-originales/` son hojas **dentro de micas brillantes,
sobre carpeta blanca, en mesa clara**. El papel y su entorno tienen el mismo brillo: no
hay borde detectable. Probados y descartados:

- caja delimitadora por umbral de brillo
- perfiles de fila y columna con cierre morfológico
- Canny, y Canny con umbrales automáticos por mediana
- contornos sobre umbral de Otsu
- umbral adaptativo + corrección de perspectiva por homografía (OpenCV)

Todos agarran el marco entero de la foto o un sub-rectángulo al azar. **Se resolvió de
entrada, no con código:** José David reescaneó con CamScanner. Usa
`work/certificados-escaneados/`.

### 4.2 Normalizar por alto no funciona

En unos escaneos CamScanner conservó el pie con los logos y en otros lo cortó. Si
normalizas la hoja por su alto, esa diferencia corre todas las coordenadas y el recuadro
del puntaje cae sobre otra fila. **Normaliza por ANCHO** — el formulario impreso siempre
tiene el mismo ancho. Las coordenadas de las plantillas son fracciones del ancho **en los
dos ejes**.

### 4.3 El fundido entre el documento y un certificado NO puede ser invisible

Mi segundo intento igualaba el rectángulo al píxel y fundía el documento del video con el
primer certificado. Sigue viéndose. Razón: el documento es abstracto (crema, barras
rojas) y un reporte TOEFL tiene cabecera verde y formulario denso. **No se parecen en
nada.** Un fundido entre dos imágenes distintas se percibe siempre, coincidan o no en
sitio y tamaño. No hay curva de animación que lo arregle.

La salida es **quitar el fundido**: que las hojas reales salgan de detrás del documento
y lo vayan tapando. Nunca una cosa se convierte en otra.

### 4.4 El pixelado NO era la resolución

Medido a DPR 2 sobre la página real:

| Clip | Escalado | `mask-image` | Opacidad | `object-fit` |
|---|---|---|---|---|
| Tus tres clips | **2.79×** | sí | 0.92–0.98 | contain |
| El mío | **1.91×** | **no** | **1** | **cover** |

Los tuyos están **más** escalados y se ven bien. La diferencia es el tratamiento: sin
`mask-image` se ve el rectángulo duro del video y el escalado salta en cada borde. Y el
contenido importa: tus clips son escenas oscuras y suaves; el del documento tiene líneas
de 1 px sobre fondo claro, que es lo peor para escalar.

**Casi le hago gastar una generación en 4K por un diagnóstico equivocado.** No hace
falta: recodifica desde el original a `834 × 1112` (nativo) y copia máscara, opacidad y
`object-fit` de tus tres clips.

### 4.5 El resorte y el arco tenían tirones

`verificar-relevo.mts` cazó dos defectos que a ojo no se ven pero se sienten:

- Un resorte exponencial (`1 - 2^-9t · cos …`) **arranca a 6,3 veces su velocidad
  media**. La hoja pega un latigazo al salir. Se corrige con la respuesta de un sistema
  amortiguado, normalizada para que valga 1 al final.
- Un arco `sin(tπ)` **tiene pendiente en los extremos**, así que la hoja entra y sale con
  un tirón vertical. `sin²(tπ)` entra y sale con pendiente cero.

---

## 5. Privacidad: esto no es negociable

Son datos de personas reales, publicados con su permiso para mostrar **el resultado**, no
su identidad.

- Los bloques negros se **queman en el píxel** (`scripts/certificados.py`). No son una
  capa de CSS ni un desenfoque: un desenfoque se puede revertir.
- **Hay que revisar cada hoja a ojo, a tamaño completo, antes de publicar.** No se puede
  automatizar. Al pasar de 280 px a 640 px aparecieron fugas que antes no eran legibles:
  los últimos dígitos del Registration Number en las cuatro TOEFL, trozos de dirección,
  el `ID No.` entero en una hoja, y la **fecha de nacimiento** en dos IELTS.
  Por eso cada familia usa ahora **un bloque grande** en vez de recuadros por campo.
- El script tiene un **seguro**: una plantilla sin zonas de tachado ya no exporta. Se puso
  porque `build --all` corrió sobre familias sin calibrar y dejó 5 hojas **sin tapar** en
  `public/`. Se borraron.
- En IELTS, el **número de TRF lleva las iniciales del apellido dentro**
  (`18CO003945PARS001A` → PARra Silvia) y permite verificar el resultado online. Va
  tapado junto con la firma.
- Las plantillas calibradas y verificadas son **solo TOEFL 2015 e IELTS**. Goethe A1/B1,
  Celpe-Bras, TOEFL MyBest y TOEFL 2023 **están vacías**: si las calibras, verifica una
  por una.

### Pendientes de permiso

José David dijo que ya tenía autorización para mostrar resultados **anónimos**. Eligió
además usar **nombre de pila** en las progresiones (Germán, Lina, María Paula). **Eso es
un paso más y hay que confirmarlo por escrito con esos tres antes de publicar.**

### Escaneos a repetir

- `pag-14` (IELTS 7.5 de María Paula) — cortado por la derecha, y con la marca de agua
  grande de CamScanner a media página. Es una de las tres piezas centrales.
- `pag-29` (Goethe de Karen) — casi ilegible, moiré fuerte.
- `pag-10` (TOEFL 72) — recortado por la izquierda.
- `pag-12` es duplicado exacto de `pag-11`.

---

## 6. Cómo verificar sin navegador

El panel de navegador del entorno de Claude Code **no sirve para movimiento**: es una
pestaña oculta (`document.visibilityState === 'hidden'`), no ejecuta ni un
`requestAnimationFrame`, no recibe eventos de scroll y las capturas salen en negro.

Lo que sí se puede hacer desde ahí: geometría, resolución, HTML del servidor y tipos.

Y lo que aprendí tarde: **los criterios de "se ve un salto" son matemáticos, no
estéticos**. Si sacas la geometría a un módulo puro, se comprueban de verdad.
`scripts/verificar-relevo.mts` muestrea 4 pantallas × 2000 puntos del recorrido y afirma:
continuidad sin picos de aceleración, arranque y frenada desde el reposo, que la sombra
cambie siempre que la hoja se mueva, y que ida y vuelta sean idénticas. Encontró los dos
defectos de §4.5. Comprobado que caza regresiones.

Un detalle aparte: `useReducedMotion` solo resuelve en el cliente, así que un `<video
preload="auto">` en el HTML del servidor **ya se descargó** antes de que React lo quite.
Ponlo en `preload="none"` y actívalo desde el efecto.

---

## 7. Lo que queda abierto

- La sección entera. Está revertida; el intento está en `stash@{0}` por si sirve de base.
- Plantillas de tachado para Goethe A1, Goethe B1 y Celpe-Bras (son dos sub-variantes
  distintas: orla horizontal en `pag-34`, oficio MEC vertical en `pag-37`).
- `SearchScrollVideo.tsx` usa `window.addEventListener('scroll')`, que el piso de calidad
  del proyecto prohíbe. Mueve las otras tres secuencias, así que tocarlo es arriesgado
  sin poder mirarlas.
- Confirmar el permiso de nombre de pila.
