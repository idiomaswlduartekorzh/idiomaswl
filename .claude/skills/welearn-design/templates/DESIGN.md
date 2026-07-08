# DESIGN.md - Sistema Visual de Tu Producto

**Instrucciones:** Copiar este archivo a la raíz de tu proyecto y customizar los tokens.

---

## 1. PALETA CROMÁTICA

### Monochrome Base (OKLCH)
```
Fondo:           oklch(98% 0 0)      #FAFAF8
Superficie:      oklch(95% 0 0)      #F0F0ED
Subtle:          oklch(85% 0 0)      #E5E5E0
Border:          oklch(75% 0 0)      #D1D1CB
Text Tertiary:   oklch(55% 0 0)      #8B8B83
Text Secondary:  oklch(40% 0 0)      #5A5A52
Text Primary:    oklch(20% 0 0)      #0A0A08
```

### Colores Funcionales (Semantic)
```
Primary:    oklch(60% 0.15 260)  #6D28D9 (educativo)
Success:    oklch(55% 0.12 140)  #22C55E (validación)
Warning:    oklch(60% 0.12 50)   #F59E0B (atención)
Error:      oklch(50% 0.15 10)   #DC2626 (crítico)
Info:       oklch(58% 0.14 240)  #3B82F6 (información)
```

### Reglas de Uso
- **1 color brillante por pantalla** (excepto charts)
- **Monochrome solo para backgrounds** (no text)
- **Color siempre + icon + text** (nunca solo color)
- **Dark mode:** Inversión semántica (fondo → oklch(15% 0 0))

---

## 2. TIPOGRAFÍA

### Escala Base (Modular 1.125x)
```
Tiny:    11px   (helper, label secondary)
Small:   13px   (captions, meta)
Base:    16px   (body, párrafos)
Large:   18px   (section header)
XL:      20px   (page header, h3)
XXL:     24px   (main header, h2)
XXXL:    28px   (hero, h1)
```

### Leading (Line Height)
```
Headings:       1.2x    (títulos apretados)
Body:           1.5x    (cómodo para leer)
Instructions:   1.8x    (espacio generoso para instrucciones pedagógicas)
Code:           1.6x    (monospace)
```

### Weight System
```
Light:      300     (labels, secondary)
Regular:    400     (body, default)
Semibold:   600     (emphasis, strong, buttons)
// NO Bold (700), NO Extra Bold
```

### Familias
```
Display:    "Geist" (sans-serif, neutral, educativo)
Mono:       "Fira Code" (monospace, código)
// MAX 2 familias totales
```

---

## 3. ESPACIADO

### Base 4px Grid
```
xs:     4px
sm:     8px
md:     16px
lg:     24px
xl:     32px
xxl:    48px
```

### Ratios Componentes
```
Padding interior:   1:1.5 ratio (horizontal : vertical)
Espaciado bloques:  Relacionados ≤ 8px | No relacionados ≥ 24px
Márgenes (page):    16px (mobile), 24px (tablet), 32px (desktop)
```

---

## 4. COMPONENTES CORE

### Botón Primario
```css
padding:            16px 8px   /* md vertical, sm horizontal */
border-radius:      6px
font-size:          16px (base)
font-weight:        600 (semibold)
background:         oklch(60% 0.15 260)
color:              white
transition:         background 150ms ease-out
cursor:             pointer

:hover              oklch(50% 0.15 260) /* darker */
:focus              outline 2px solid + offset 2px
:disabled           oklch(85% 0 0) + cursor not-allowed
:active             oklch(45% 0.15 260) /* darkest */
```

### Input Estándar
```css
padding:            8px 16px
border:             1px oklch(75% 0 0)
border-radius:      4px
font-size:          16px
font-family:        Geist
background:         oklch(98% 0 0)
color:              oklch(20% 0 0)

:focus              border-color oklch(60% 0.15 260) + outline none
:invalid/:error     border-color oklch(50% 0.15 10)
::placeholder       oklch(55% 0 0) (secondary text color)
```

### Card Educativa
```css
padding:            24px
border-radius:      8px
background:         oklch(95% 0 0)
box-shadow:         0 1px 3px rgba(0,0,0,0.12)
margin-bottom:      24px (entre cards)
```

---

## 5. CONTRASTE Y ACCESIBILIDAD

### Mínimos Obligatorios
```
Texto sobre fondo:  4.5:1 WCAG AA (target)
Objetivo:           7:1 WCAG AAA (ideal)
UI components:      3:1 (focus, borders)
```

### Ejemplos Reales
```
✓ oklch(20% 0 0) sobre oklch(95% 0 0)     → 7.2:1 ✨
✗ oklch(55% 0 0) sobre oklch(85% 0 0)     → 1.8:1 ❌
✓ oklch(60% 0.15 260) sobre oklch(98% 0 0) → 4.6:1 ✓
```

---

## 6. DARK MODE

```css
:root[data-theme="dark"] {
  --color-bg:         oklch(15% 0 0)      #1A1A18
  --color-surface:    oklch(20% 0 0)      #252523
  --color-text-primary: oklch(95% 0 0)    #F0F0ED
  
  /* Funcionales: NO cambiar (same en dark mode) */
  --color-primary:    oklch(60% 0.15 260)
  --color-success:    oklch(55% 0.12 140)
  --color-error:      oklch(50% 0.15 10)
}
```

---

## 7. MOTION

### Easing
```
ease-out:       Entrada (atrae atención)
ease-in-out:    Ciclos (retorna a posición)
ease-in:        Salida (natural)
// NUNCA: cubic-bezier(0.68, -0.55, 0.265, 1.55) bounce sin razón
```

### Duration
```
Feedback:       50-100ms    (respuesta al click)
Micro:          150-300ms   (button hover, fade)
Transition:     400-600ms   (cambio de página)
// Máximo 600ms (usuario se aburre)
```

### Reglas Críticas
```
✓ Animar: opacity, transform (scale, translate)
✗ NUNCA: width, height, padding (causa jank)
✓ Siempre: respetar prefers-reduced-motion
```

---

## 8. RESPONSIVE

### Breakpoints
```
Mobile:     320px   (min)
Tablet:     640px
Desktop:    1024px
Large:      1280px
```

### Principios
```
Mobile-first:   Codificar para 320px, luego agregar
Fluid:          Reflows, no desaparece
Touch:          Min 44x44px
Legibilidad:    50-75 chars, min 16px en mobile
```

---

## 9. PERFORMANCE BUDGET

```
LCP:    < 2.5s    (primer meaningful content)
FID:    < 100ms   (input delay)
CLS:    < 0.1     (visual stability)

Assets:
  JS:   < 150kB   (minified + gzipped)
  CSS:  < 30kB
  Images: < 100kB (optimized AVIF + WebP)
```

---

## 10. CSS VARIABLES (Copy-paste)

```css
:root {
  /* Colors */
  --color-bg: oklch(98% 0 0);
  --color-surface: oklch(95% 0 0);
  --color-text: oklch(20% 0 0);
  --color-text-secondary: oklch(40% 0 0);
  --color-border: oklch(75% 0 0);
  --color-primary: oklch(60% 0.15 260);
  --color-success: oklch(55% 0.12 140);
  --color-warning: oklch(60% 0.12 50);
  --color-error: oklch(50% 0.15 10);
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  
  /* Typography */
  --font-size-tiny: 11px;
  --font-size-small: 13px;
  --font-size-base: 16px;
  --font-size-large: 18px;
  --font-size-xl: 20px;
  --font-size-xxl: 24px;
  --font-size-xxxl: 28px;
  
  --line-height-title: 1.2;
  --line-height-body: 1.5;
  --line-height-instruction: 1.8;
  
  --font-family-sans: "Geist", system-ui, sans-serif;
  --font-family-mono: "Fira Code", monospace;
  
  /* Motion */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --easing-out: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-in-out: cubic-bezier(0.4, 0, 0.6, 1);
  --easing-in: cubic-bezier(0.4, 0, 1, 1);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CHECKLIST DE CUSTOMIZACIÓN

Antes de usar este DESIGN.md:

- [ ] ¿Cambié colores OKLCH a los de tu brand?
- [ ] ¿Ajusté tipografía a tus familias?
- [ ] ¿Verifiqué contraste (min 4.5:1)?
- [ ] ¿Probé dark mode?
- [ ] ¿Validé performance budget?
- [ ] ¿Documenté excepciones?

---

**Este DESIGN.md es la verdad visual. Consultarlo antes de cada componente.**

