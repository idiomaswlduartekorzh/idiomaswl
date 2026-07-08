# WeLearn Frontend Intelligence Skill

**Versión:** 1.0  
**Estado:** Operacional  
**Propósito:** Amplified craft para interfaces educativas (no automatización)

---

## 🎯 QUICK START (5 min)

### 1. Establecer Contexto
```bash
/welearn-context

→ Captura: quién (estudiante A1 edad 25), qué (presente perfecto), 
            dónde (paso 3/17), restricciones (max 5 opciones, 10 min sesión)
```

### 2. Generar Diseño
```bash
/welearn-design

→ Propuesta: wireframe + tokens + tipografía + color + layout + pedagogía
```

### 3. Auditar (60+ reglas)
```bash
/welearn-audit

→ Score: X/60 reglas + violations críticas/major/minor + sugerencias
```

### 4. Mejorar
```bash
/welearn-improve

→ Cambios específicos: antes → después → razón
```

### 5. Código
```
PRE-CODE CHECKLIST
✓ Tipografía 1.125x escala
✓ Color OKLCH tokens
✓ Layout 4px grid
✓ Focus states visible
→ Code
```

---

## 📚 DOCUMENTACIÓN COMPLETA

### Framework
- **`WELEARN_FRONTEND_INTELLIGENCE_FRAMEWORK.md`** (8,000 líneas)
  - Filosofía + arquitectura + 15 módulos + 60+ reglas + anti-patterns

### Implementación
- **`00-README-IMPLEMENTATION.md`** (200 líneas)
  - Guía de uso + workflows + casos de uso

### Ejecutivo
- **`EXECUTIVE-SUMMARY.md`** (400 líneas)
  - Resumen ejecutivo + métricas + diferencias vs competencia

---

## 🎮 COMANDOS DISPONIBLES

### Core
- `/welearn-context` - Capturar contexto pedagógico
- `/welearn-design` - Generar propuesta coherente
- `/welearn-audit` - 60+ reglas determinísticas
- `/welearn-improve` - Sugerencias específicas

### Disciplinas
- `/welearn-typography` - Validar tipografía
- `/welearn-color` - Validar color + contraste
- `/welearn-layout` - Validar grid + spacing
- `/welearn-pedagogy` - Validar que enseña
- `/welearn-a11y` - WCAG 2.1 AA/AAA
- `/welearn-performance` - LCP, FID, CLS

### Auditorías
- `/welearn-page-audit` - Auditoría integral de página
- `/welearn-component-audit` - Validar componente reutilizable
- `/welearn-form-audit` - Validar formulario
- `/welearn-seo-optimize` - Preparar para SEO

### Revisión
- `/welearn-review` - Checklist pre-merge
- `/welearn-ship` - Checklist pre-deploy

---

## 📋 CHECKLISTS EJECUTABLES

### Pre-Design (30 min)
✓ Audiencia identificada  
✓ Objetivo pedagógico claro  
✓ Restricciones documentadas  
✓ Modelo mental explícito  

### Pre-Code (2-4 horas)
✓ Tipografía modular 1.125x  
✓ Color OKLCH tokens  
✓ Layout 4px grid  
✓ Focus states visible  
✓ Pedagogía integrada  
✓ Accesibilidad WCAG AA  

### Pre-Review (45 min)
✓ Coherencia visual  
✓ Interacción clara  
✓ Pedagogía integrada  
✓ Accesibilidad validada  

### Pre-Shipping (1 hora)
✓ QA en navegadores  
✓ Lighthouse > 85  
✓ Monitoring configured  
✓ Deploy ready  

---

## 🔧 ARQUITECTURA

### Capa 1: Contexto
```
PRODUCT.md   → quién, qué, por qué, restricciones
DESIGN.md    → tokens, sistema visual, reglas
```

### Capa 2: Detector (60+ reglas)
```
Tipografía (8)     Color (10)       Layout (8)
Motion (5)         Pedagogía (7)    Accesibilidad (8)
Performance (4)    SEO (4)
```

### Capa 3: Interfaz (14+ comandos)
```
/context → /design → /audit → /improve → /ship
```

---

## 📊 REGLAS CLAVE

### Tipografía
- Escala modular 1.125x (11, 13, 16, 18, 20, 24, 28, 32px)
- Body >= 16px (mobile)
- Leading: 1.2x (títulos), 1.5x (body), 1.8x (instrucciones)
- Máximo 3 pesos (300, 400, 600)
- H1-H3 jerarquía evidente sin color

### Color
- Contraste texto >= 4.5:1 (WCAG AA)
- Máximo 5 colores activos
- Monochrome base coherente (OKLCH)
- 1 color brillante por pantalla
- Color NUNCA es único indicador

### Layout
- Grid base 4px (nunca 8px)
- Spacing múltiplo de 4
- Mínimo 16px padding en márgenes (mobile)
- Espaciado refuerza agrupación mental
- Touch targets 44x44px mínimo

### Pedagogía
- Progreso siempre visible
- Paso actual diferenciado
- Feedback inmediato (< 500ms)
- Feedback específico, no genérico
- Máximo 5 opciones visibles
- Máximo 3 conceptos nuevos/pantalla

### Accesibilidad
- Focus indicator 2px, contraste 3:1
- Semantic HTML
- Aria labels donde falta visual label
- WCAG 2.1 AA mínimo (AAA ideal)

---

## 🚫 ANTI-PATTERNS A EVITAR

### Visual
❌ Gradientes cian / glassmorphism  
❌ Iconos cuadrados con borders complejos  
❌ Paletas de 10+ colores  
❌ Múltiples sombras decorativas  

### Tipografía
❌ Tamaños arbitrarios (14, 17, 19px)  
❌ Múltiples familias decorativas  
❌ Líneas < 45 o > 75 caracteres  

### Pedagogía
❌ Sin indicador de progreso  
❌ Feedback genérico ("Incorrecto")  
❌ Más de 5 opciones visibles  
❌ Sin oportunidad de reintentar  

### Accesibilidad
❌ outline: none  
❌ Touch targets < 44x44px  
❌ Color como único indicador  

---

## 📖 TEMPLATES

### PRODUCT.md
Copiar y llenar en tu proyecto:
```markdown
# Contexto de Producto

## 1. QUIÉN
- Edad: ?
- Nivel: ?
- Tiempo sesión: ?

## 2. QUÉ
- Dominio: ?
- Método: ?
- Modelo mental: ?

## 3. POR QUÉ
- Misión: ?
- Diferenciadores: ?
- Valores: ?

## 4. RESTRICCIONES
- Cognitivas: ?
- Técnicas: ?
- Pedagógicas: ?
```

### DESIGN.md
Copiar y customizar:
```css
:root {
  /* Colores OKLCH */
  --color-bg: oklch(98% 0 0);
  --color-primary: oklch(60% 0.15 260);
  
  /* Tipografía */
  --font-size-base: 16px;
  --line-height-body: 1.5;
  
  /* Espaciado 4px grid */
  --space-xs: 4px;
  --space-md: 16px;
  --space-lg: 24px;
}
```

---

## 🔍 EJEMPLOS DE USO

### Diseñar Lección (Método 17 Pasos)
```bash
/welearn-context
  → Paso 5: Conversación, A1, 25 min, mobile-first

/welearn-design
  → Audio player + transcripción + práctica

/welearn-pedagogy
  → Feedback específico, progreso visible

/welearn-audit
  → Score: 57/60 (excelente)
```

### Auditar Landing Page Existente
```bash
/welearn-page-audit https://welearn.com/clases-de-ingles
  → Score: 82/100
  → Critical: 0 ✓
  → Major: 2 (contrast, touch target)
  → Minor: 4 (performance, SEO)
```

### Revisar Componente
```bash
/welearn-component-audit Button
  → Variantes: default, hover, focus, disabled, loading
  → Focus states: ✓ visible
  → Aria labels: ✓ correcto
  → Status: APROBADO
```

---

## 🎯 PRINCIPIOS

### 1. Context First
Siempre capturar contexto antes de diseñar.

### 2. Amplified Craft
Amplificar criterio humano, no automatizar.

### 3. Determinístico
60+ reglas exactas, no opiniones.

### 4. Pedagógico
Interfaz que enseña, no solo informa.

### 5. Modular
15 módulos independientes, reutilizables.

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
.claude/skills/welearn-design/
├── index.md (este archivo)
├── commands/
│   ├── context.prompt.md
│   ├── design.prompt.md
│   ├── audit.prompt.md
│   └── ... (14+ más)
├── detector/
│   └── engine.ts (60+ reglas en TypeScript)
├── templates/
│   ├── PRODUCT.md.template
│   └── DESIGN.md.template
├── checklists/
│   ├── pre-design.md
│   ├── pre-code.md
│   ├── pre-review.md
│   └── pre-shipping.md
└── references/
    ├── framework.md (8000+ líneas)
    ├── implementation.md
    └── executive-summary.md
```

---

## 🚀 PRÓXIMOS PASOS

### Ya disponible
✓ Framework arquitectónico completo  
✓ Detector engine TypeScript  
✓ Templates (PRODUCT.md, DESIGN.md)  
✓ Checklists ejecutables  
✓ Skill CLI  

### En progreso (esta semana)
□ Integración en CLAUDE.md  
□ Testing en landing pages WeLearn  
□ Documentación de anti-patterns encontrados  

### Planeado (próximas 4 semanas)
□ Aplicación a lecciones (17 pasos)  
□ Validación dashboard (estudiante + admin)  
□ Extensión a EasyVisa (visa immigration context)  

---

## 📞 SOPORTE

### Para usar el skill:
1. Leer este archivo (5 min)
2. Llenar `PRODUCT.md` y `DESIGN.md` (1 hora)
3. Ejecutar comandos según fase

### Para entender el framework:
- Ver `references/framework.md` (8000+ líneas)
- Ver `references/implementation.md` (guía práctica)

### Para agregar reglas nuevas:
- Editar `detector/engine.ts`
- Agregar a array correspondiente
- Documentar en referencia

---

## ✨ FILOSOFÍA

No automatizamos diseño. **Amplificamos criterio humano.**

La interfaz no es bonita por algoritmo. Es clara, pedagógica y accesible porque cumple 60+ reglas determinísticas que priorizan **aprendizaje, no decoración**.

---

**Versión:** 1.0 Operacional  
**Mantener:** WeLearn Team  
**Estado:** Listo para producción  

Usa este skill para toda interfaz en WeLearn. Asegura calidad, accesibilidad y coherencia pedagógica. ✨

