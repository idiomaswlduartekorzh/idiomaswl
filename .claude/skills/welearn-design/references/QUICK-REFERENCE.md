# WeLearn Frontend Intelligence - Quick Reference Card

**Imprime esto o úsalo como referencia rápida.**

---

## 🎯 EL WORKFLOW (5 FASES)

```
1. /welearn-context       → Capturar qué, quién, por qué, restricciones
2. /welearn-design        → Propuesta: wireframe + tokens + jerarquía
3. /welearn-audit         → Score: X/60 reglas + violations
4. /welearn-improve       → Cambios: antes → después → razón
5. CODE + CHECKLISTS      → Implementación + validación final
```

---

## 📏 REGLAS CRÍTICAS (NUNCA BREAKS)

### Tipografía
- Escala 1.125x: 11, 13, 16, 18, 20, 24, 28, 32px
- Body >= 16px (mobile)
- Leading: 1.2x títulos, 1.5x body, 1.8x instrucciones
- Largo línea: 50-75 caracteres

### Color
- Contraste texto >= 4.5:1 (WCAG AA)
- Máximo 5 colores activos
- Monochrome OKLCH base
- 1 color brillante por pantalla

### Layout
- Grid 4px (múltiplos de 4)
- Min 16px padding márgenes
- Touch targets 44x44px
- Breakpoints: 320, 640, 1024, 1280

### Pedagogía
- ✓ Progreso visible ("Step X of 17")
- ✓ Feedback inmediato + específico
- ✓ Máximo 5 opciones visibles
- ✓ Máximo 3 conceptos nuevos/pantalla

### Accesibilidad
- Focus 2px outline, contraste 3:1
- Semantic HTML (button, input, label, main)
- Aria labels donde falta visual label
- WCAG 2.1 AA mínimo

---

## 🚫 ANTI-PATTERNS (NUNCA HAGAS)

### Visual
❌ Gradientes cian / glassmorphism  
❌ Iconos cuadrados + borders  
❌ 10+ colores en página  

### Tipografía
❌ Tamaños random (14, 17, 19px)  
❌ Múltiples familias decorativas  
❌ Líneas < 45 o > 75 chars  

### Pedagogía
❌ Sin indicador progreso  
❌ Feedback genérico ("Incorrecto")  
❌ Más de 5 opciones visibles  

### Accesibilidad
❌ outline: none  
❌ Touch < 44x44px  
❌ Color como único indicador  

---

## ✅ CHECKLISTS (POR FASE)

### PRE-DESIGN (30 min)
- [ ] Audiencia identificada
- [ ] Objetivo pedagógico claro
- [ ] Restricciones documentadas
- [ ] Modelo mental explícito

### PRE-CODE (2-4 horas)
- [ ] Tipografía 1.125x escala
- [ ] Color OKLCH tokens
- [ ] Layout 4px grid
- [ ] Pedagogía integrada
- [ ] A11y WCAG AA
- [ ] Responsiveness mobile-first

### PRE-REVIEW (45 min)
- [ ] Coherencia visual
- [ ] Interacción clara
- [ ] Pedagogía + A11y
- [ ] Performance

### PRE-SHIP (1 hora)
- [ ] QA (Chrome, Safari, Firefox)
- [ ] Tested mobile/tablet/desktop
- [ ] Lighthouse > 85
- [ ] Monitoring configured

---

## 🎯 COMANDOS (QUICK LAUNCH)

```bash
# Core
/welearn-context      # Capturar pedagogía
/welearn-design       # Generar propuesta
/welearn-audit        # 60+ reglas
/welearn-improve      # Sugerencias

# Especializados
/welearn-pedagogy     # ¿Enseña?
/welearn-a11y         # WCAG AA/AAA
/welearn-page-audit   # Auditoría integral

# Review
/welearn-review       # Checklist pre-merge
/welearn-ship         # Pre-deploy checklist
```

---

## 🎨 TOKENS (COPY-PASTE)

```css
/* Colores */
--color-bg: oklch(98% 0 0);
--color-primary: oklch(60% 0.15 260);
--color-error: oklch(50% 0.15 10);
--color-text: oklch(20% 0 0);

/* Tipografía */
--font-size-base: 16px;
--line-height-body: 1.5;
--font-family-sans: "Geist", system-ui, sans-serif;

/* Espaciado */
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;

/* Motion */
--duration-fast: 150ms;
--easing-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📊 SCORING

```
Score: X/60 reglas

✓ 60/60 = EXCELENTE
✓ 55+/60 = BUENO
⚠️  50-54/60 = ACEPTABLE (revisa violations)
❌ < 50/60 = REQUIERE CAMBIOS

Severidad:
- CRITICAL = Bloquea deploy
- MAJOR = Requiere fix antes de merge
- MINOR = Nice-to-have
```

---

## 🚀 EL PRINCIPIO

**No automatizamos. Amplificamos criterio humano.**

- ✓ 60+ reglas determinísticas (no opiniones)
- ✓ Pedagógicamente integrado (no overlay)
- ✓ Modular (15 módulos independientes)
- ✓ Reutilizable (WeLearn + EasyVisa + futuros)

---

## 📚 DONDE ENCONTRAR TODO

```
.claude/skills/welearn-design/
├── index.md              ← Punto de entrada (leer primero)
├── references/
│   ├── framework.md      ← Arquitectura completa
│   ├── implementation.md ← Guía práctica
│   └── README.md         ← Índice de docs
├── templates/
│   ├── PRODUCT.md        ← Copiar y llenar
│   └── DESIGN.md         ← Copiar y customizar
└── checklists/           ← 7 checklists ejecutables
```

---

## 💡 NEXT STEP

1. **Leer** `index.md` (5 min)
2. **Llenar** `PRODUCT.md` + `DESIGN.md` (1 hora)
3. **Ejecutar** `/welearn-context`
4. **Comenzar** workflow

---

**Versión:** 1.0 Quick Reference  
**Fecha:** 2026-07-08  
**Imprimir / Bookmark esta página** ✨

