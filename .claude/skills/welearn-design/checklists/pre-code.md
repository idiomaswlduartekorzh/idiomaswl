# PRE-CODE CHECKLIST

**Tiempo:** 30 min (validar antes de escribir una línea de código)

**Propósito:** Asegurar que el diseño es válido antes de implementación.

---

## TIPOGRAFÍA (8 items)

- [ ] ¿Usá escala modular 1.125x? (11, 13, 16, 18, 20, 24, 28, 32)
- [ ] ¿Body es mínimo 16px en mobile?
- [ ] ¿Leading es correcto? (1.2x títulos, 1.5x body, 1.8x instrucciones)
- [ ] ¿H1-H3 jerarquía es evidente sin color?
- [ ] ¿Máximo 3 pesos tipográficos? (300, 400, 600)
- [ ] ¿Máximo 2 familias? (Geist + Fira Code)
- [ ] ¿Largo de línea es 50-75 caracteres?
- [ ] ¿Énfasis usa weight/size, no solo color?

**Status:** ✓ Pass or ❌ Fix before coding

---

## COLOR (10 items)

- [ ] ¿Usá tokens OKLCH?
- [ ] ¿Contraste texto >= 4.5:1?
- [ ] ¿Monochrome base coherente (sin matiz extra)?
- [ ] ¿Máximo 5 colores activos?
- [ ] ¿1 color brillante por pantalla? (excepto charts)
- [ ] ¿Color NUNCA es único indicador?
- [ ] ¿Dark mode es verdadera inversión?
- [ ] ¿Focus indicators tienen contraste 3:1?
- [ ] ¿Color-blind safe? (no rojo/verde solo)
- [ ] ¿Opacity guidelines claros?

**Status:** ✓ Pass or ❌ Fix before coding

---

## LAYOUT (8 items)

- [ ] ¿Grid base es 4px?
- [ ] ¿Spacing es múltiplo de 4?
- [ ] ¿Mínimo 16px padding en márgenes (mobile)?
- [ ] ¿Espaciado refuerza agrupación mental?
- [ ] ¿Content no toca bordes?
- [ ] ¿Breakpoints correctos? (320, 640, 1024, 1280)
- [ ] ¿Responsive es realmente mobile-first?
- [ ] ¿Touch targets >= 44x44px?

**Status:** ✓ Pass or ❌ Fix before coding

---

## MOTION (5 items, si aplica)

- [ ] ¿Todo movimiento tiene propósito pedagógico?
- [ ] ¿Easing correcto? (ease-out entrada, ease-in-out ciclo)
- [ ] ¿Duration correcto? (150-300ms micro, 400-600ms transición)
- [ ] ¿Se anima transform, no width/height?
- [ ] ¿Respetar prefers-reduced-motion?

**Status:** ✓ Pass or ❌ Fix before coding

---

## PEDAGOGÍA (7 items)

- [ ] ¿Progreso siempre visible? ("Step X of 17")
- [ ] ¿Paso actual es evidentemente diferenciado?
- [ ] ¿Feedback es inmediato (< 500ms)?
- [ ] ¿Feedback es específico, no genérico?
- [ ] ¿Próximo paso es obvio?
- [ ] ¿Máximo 5 opciones visibles?
- [ ] ¿Máximo 3 conceptos nuevos por pantalla?

**Status:** ✓ Pass or ❌ Fix before coding

---

## ACCESIBILIDAD (8 items)

- [ ] ¿Focus indicator: 2px, contraste 3:1?
- [ ] ¿Touch targets >= 44x44px?
- [ ] ¿Semantic HTML? (button, input, label, main, etc.)
- [ ] ¿Aria labels donde falta etiqueta visual?
- [ ] ¿Heading structure correcta? (H1 → H2 → H3)
- [ ] ¿Formularios: label explícito?
- [ ] ¿Error copy clara y accionable?
- [ ] ¿Imagen tiene alt text?

**Status:** ✓ Pass or ❌ Fix before coding

---

## PERFORMANCE (4 items)

- [ ] ¿Performance budget considerado?
- [ ] ¿Imágenes serán optimizadas (AVIF + WebP)?
- [ ] ¿Lazy loading strategy definida?
- [ ] ¿Bundle size considerado?

**Status:** ✓ Pass or ❌ Fix before coding

---

## FINAL APPROVAL

**Revisó:** _______________  
**Fecha:** _______________  
**Decisión:**  
- ✓ APROBADO → Proceder a código  
- ❌ CAMBIOS REQUERIDOS → Regresa a diseño  

**Comentarios:**  
```
(si requiere cambios, detallar aquí)
```

---

**Si algún item está ❌, NO procedes a código. Arreglalo en diseño primero.**

Este checklist no es ceremonial. Cada item representa una decisión basada en UX research, accesibilidad, pedagogía o performance.

