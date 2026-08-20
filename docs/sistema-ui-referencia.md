# `wlp-*` — referencia de las primitivas

Vive en **`src/styles/practica-ui.css`**. Se carga desde
`src/app/(site)/practica/layout.tsx`, así que **solo está disponible bajo `/practica`** —
salvo que quien lo use lo importe por su cuenta.

> **El nombre se quedó corto.** Nació para práctica y al día siguiente lo consumían 13
> archivos, de los cuales 6 son de práctica: el resto son `/herramientas` y la página de
> precios. Antes de renombrar el archivo o moverlo, avisar: hay consumidores fuera.

Escrito el 16 de agosto de 2026, después de auditar el sistema. El encargo que lo originó
está en [`sistema-visual-practica.md`](sistema-visual-practica.md).

---

## Las dos reglas

1. **Ningún color escrito a mano fuera del bloque de acentos.** Superficies, texto y filetes
   se piden a `--wl-*`, que ya se da la vuelta solo en oscuro.
2. **Ninguna regla toca el puente heredado** `--wl-panel-*` / `--wl-on-panel-*`. Ese puente
   solo existe en oscuro y `globals.css` pide jubilarlo.

Si una regla nueva necesita un `[data-theme="dark"]`, está mal construida: quiere decir que
escribió un color en vez de pedirlo. El único bloque oscuro legítimo es el de acentos.

---

## Variables

### Escala

| Variable | Valor | Para |
|---|---|---|
| `--wlp-r-sm` | 4px | Chapas, etiquetas, campos pequeños |
| `--wlp-r` | 6px | **Por defecto**: tarjetas, opciones, botones |
| `--wlp-r-lg` | 8px | Contenedores grandes |
| `--wlp-r-pill` | 999px | Barras de progreso, píldoras |
| `--wlp-shell` | 1180px | El único ancho de página |
| `--wlp-h1` | clamp(2.25rem, 6vw, 4.6rem) | Titular de hub |
| `--wlp-h1-compact` | clamp(1.9rem, 4.5vw, 3rem) | Titular de página de ejercicio |
| `--wlp-h2` | clamp(1.7rem, 4vw, 2.65rem) | Titular de sección |

**No hay escala de espaciado.** Es el hueco conocido del sistema: conviven 34 valores en
`rem` escritos a mano. Ver «Huecos» más abajo.

### Acentos

Un acento por destreza, con par claro y oscuro. Los valores viven **en dos sitios que hay que
cambiar juntos**: este archivo y `src/data/practica/skill-accents.ts`.

| Destreza | Claro | Oscuro | Contraste sobre tarjeta |
|---|---|---|---|
| Lectura | `#1c4b9c` | `#86b4ff` | 7,54 / 7,27 |
| Gramática | `#6941a5` | `#b79bea` | 6,59 / 6,47 |
| Escritura | `#18794e` | `#45c88a` | 4,92 / 7,19 |
| Habla | `#a84f08` | `#f2b65a` | 5,05 / 8,45 |
| Vocabulario | `#b42332` | `#ff8f99` | 5,92 / 7,01 |
| Escucha | `#176b87` | `#6fd0e8` | 5,48 / 8,63 |
| Historias | `#9d2d6b` | `#f19ac6` | 6,33 / 7,41 |

Los catorce pasan AA para texto pequeño (4,5:1). **Si añades un acento, mídelo**: el
antetítulo es de 0,72 rem, así que cuenta como texto pequeño.

### Roles y superficies

`--wlp-ok` `--wlp-alert` `--wlp-info` son **corrección**, no destrezas: significan
«acertaste», «no» y «esto no se ha corregido». Que compartan matiz con escritura o
vocabulario es coincidencia.

Sus tintes de fondo (`--wlp-tint-ok`, `--wlp-tint-alert`, `--wlp-tint-info`) se construyen
con `color-mix` sobre la superficie, **no** con un gris fijo. Es deliberado: en Task 2 el
recuadro de acierto y el de error piden ambos `--wl-panel-raised`, que en oscuro es el mismo
gris, y las dos cajas salen idénticas. Aquí conservan su matiz en los dos modos.

`--wlp-ink` `--wlp-muted` `--wlp-line` `--wlp-surface` `--wlp-raised` las declara
`.wlp-page`. Fuera de `.wlp-page` no existen.

---

## Cómo se compone

Toda pantalla empieza igual. El acento se declara una vez, en el lienzo:

```tsx
import { SKILL_ACCENT } from '@/data/practica/skill-accents'

<div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.lectura.var } as React.CSSProperties}>
  <div className="wlp-shell">
    <nav className="wlp-breadcrumb" aria-label="Migas de pan">…</nav>
    <header className="wlp-hero wlp-hero--compact">
      <p className="wlp-eyebrow">…</p>
      <h1>…</h1>
      <p className="wlp-hero-lead">…</p>
    </header>
    …
  </div>
</div>
```

Cualquier hijo puede pisar el acento declarando `--wlp-accent` en su propio `style`. Así lo
hacen las tarjetas de habilidad: la página lleva el color del idioma y cada tarjeta el de su
destreza.

Usa **`.var`**, no `.light`. Los literales de `skill-accents.ts` están para donde el CSS no
llega —las imágenes OG, que se generan en servidor—. Si te encuentras escribiendo
`SKILL_ACCENT.x.light` dentro de un componente, casi seguro querías `.var`.

---

## Primitivas

| Clase | Qué es | Variantes |
|---|---|---|
| `.wlp-page` | Lienzo. Declara las variables de superficie | — |
| `.wlp-shell` | Contenedor centrado de 1180 px | — |
| `.wlp-breadcrumb` | Migajero. Acepta `<a>` y `<button>` | — |
| `.wlp-hero` | Encabezado con filete inferior | `--compact` (titular menor) |
| `.wlp-hero-lead` | Párrafo de entrada | — |
| `.wlp-eyebrow` | Antetítulo mono, mayúsculas, en el acento | `--card` (menor, sin aire abajo) |
| `.wlp-section` | Ritmo vertical de sección | — |
| `.wlp-section-heading` | Título y bajada de sección | — |
| `.wlp-card` | Tarjeta base | `--path` (filete superior de 4 px en el acento) |
| `.wlp-option` + `.wlp-option-grid` | Opción de respuesta con bolita numerada | `--selected` `--ok` `--alert` |
| `.wlp-feedback` | Recuadro de corrección | `--ok` `--alert` `--neutral` |
| `.wlp-btn` | Botón | `--secondary` `--icon` (42×42) |
| `.wlp-actions` | Fila de botones al pie | — |
| `.wlp-tabs` | Pestañas o filtros con desplazamiento | — |
| `.wlp-level-btn` | Selector de nivel, alto mínimo 62 px | `--selected` `--done` |
| `.wlp-meter` | Barra de progreso. Lleva `<span>` dentro con el `width` | — |
| `.wlp-next` | Rejilla de enlaces salientes al pie | — |

### Estados

| Estado | Cómo se declara |
|---|---|
| hover | Automático en `.wlp-card`, `.wlp-option`, `.wlp-btn`, `.wlp-next a`, `.wlp-breadcrumb` |
| seleccionado | `aria-pressed="true"` o `aria-selected="true"` en `.wlp-tabs button`; clase `--selected` en el resto |
| desactivado | `:disabled` en botones. En un enlace no hay `:disabled`: usa `aria-disabled` **y** quita el `href` |
| foco | **Global, no de aquí.** Ver abajo |

---

## Accesibilidad

**El foco de teclado lo pone `globals.css`**, no este archivo: una regla para
`:where(a, button, input, textarea, select, [tabindex]):focus-visible` en todo el ámbito
editorial. No escribas anillos de foco propios; si necesitas uno distinto, cámbialo allí
para todos.

Ese anillo se corrigió el 16 ago 2026: era amarillo puro y daba **1,61:1 sobre blanco**
cuando el mínimo es 3:1 — invisible de día, perfecto de noche. Ahora lleva un filete oscuro
pegado al elemento que hace el trabajo en claro.

Otras dos cosas que el sistema espera de quien lo usa:

- **`aria-pressed` en filtros, `aria-selected` en pestañas de verdad.** El CSS reacciona a
  los dos, pero significan cosas distintas: un filtro es un interruptor, una pestaña cambia
  de panel.
- **No declares `lang` si no lo sabes.** `lang="und"` no es «no digo nada», es decirle al
  lector de pantalla que se dé por vencido.

---

## Huecos conocidos

1. **No hay escala de espaciado.** 34 valores distintos entre `0.08rem` y `6rem`. Es la
   misma enfermedad que el sistema vino a curar, en otra dimensión. Propuesta al adoptarla:
   cuatro o cinco pasos derivados de los valores que ya dominan (`0.5` `0.75` `1` `1.5`
   `2.5` rem), aplicados según se toque cada módulo — no en una pasada.
2. **32 hubs pasan `accent="#…"` a mano.** Es el color del idioma, el último literal que
   queda en la sección.
3. **Escritura no tiene acento.** Su tarjeta promete verde y esa pantalla se pinta con los
   neutros del sitio. Dárselo es diseño nuevo, no una corrección.
4. **`--wlp-h`** aparece en el volcado de variables pero no existe: es el prefijo común de
   `--wlp-h1`, `--wlp-h1-compact` y `--wlp-h2`. No lo uses.

## Retiradas en curso

| Clase | Estado | Quién la usa |
|---|---|---|
| `.wlp-btn-row` | Alias de `.wlp-actions`. Se retira cuando migre su consumidor | `src/components/fonetica/Transcriptor.tsx` |

**Renombrar dejó de ser gratis.** El sistema tiene consumidores fuera de práctica que nadie
coordinó: si cambias un nombre, busca primero con `grep -rl "wlp-" src/` y deja alias.
