# Documentación WeLearn Frontend Intelligence

**Aquí están TODOS los documentos del framework.**

---

## 📚 DOCUMENTOS PRINCIPALES

### 1. INDEX (Punto de Entrada)
**Archivo:** `../index.md` (5 min read)
- Qué es el skill
- Quick start
- Comandos disponibles
- Filosofía

### 2. FRAMEWORK COMPLETO (Referencia Técnica)
**Archivo:** `framework.md` (8,000 líneas)
- Filosofía central: "Amplified Craft"
- Arquitectura de 3 capas
- 15 módulos independientes (01-15)
- 60+ reglas determinísticas
- Patrones de reutilización
- Anti-patterns críticos
- Estructura de carpetas

**Cuándo leerlo:**
- Antes de agregar nuevas reglas
- Para entender principios fundamentales
- Para especializar a nuevo producto (EasyVisa)

### 3. GUÍA DE IMPLEMENTACIÓN (Práctica)
**Archivo:** `implementation.md` (200 líneas)
- Quick start 30 minutos
- Workflow típico (3 días)
- Casos de uso específicos
- Integración con CLAUDE.md
- Anti-patterns a evitar

**Cuándo leerlo:**
- Antes de usar el skill por primera vez
- Para aprender workflows
- Para referencia rápida

### 4. RESUMEN EJECUTIVO (Decisiones)
**Archivo:** `executive-summary.md` (400 líneas)
- Síntesis completa
- Qué es, qué no es
- Principios fundamentales
- Diferencias vs competencia
- Métricas esperadas

**Cuándo leerlo:**
- Para aprobaciones de stakeholders
- Para entender visión completa
- Para justificar decisiones

---

## 🛠️ DOCUMENTOS TÉCNICOS

### 5. DETECTOR ENGINE (TypeScript)
**Archivo:** `../detector/engine.ts` (500 líneas)
- Interfaz `DesignRule`
- 60+ reglas concretas
- `DesignRuleEngine` que ejecuta todas
- Generación de violations
- Reportes

**Cuándo usarlo:**
- Para integrar en CI/CD
- Para crear nuevas reglas
- Para entender lógica de validación

### 6. COMMAND PROMPTS (Corazón del Skill)
**Archivo:** `../commands/` (15+ archivos)
- `/welearn-context`
- `/welearn-design`
- `/welearn-audit`
- `/welearn-improve`
- `/welearn-pedagogy`
- `/welearn-a11y`
- `/welearn-page-audit`
- ... y más

**Cuándo usarlos:**
- Cada vez que necesites validar/mejorar interfaz
- Según fase del proyecto

---

## 📋 TEMPLATES (Copy & Customize)

### 7. PRODUCT.md Template
**Archivo:** `../templates/PRODUCT.md` (200 líneas)
**Instrucciones:** Copiar a raíz de proyecto, llenar cada sección

Secciones:
- Quién (audience, edad, nivel, contexto)
- Qué (dominio, método, modelo mental)
- Por qué (misión, diferenciadores, valores)
- Restricciones (cognitivas, técnicas, pedagógicas)
- Tone of voice
- Éxito definido
- Anti-patterns a evitar

### 8. DESIGN.md Template
**Archivo:** `../templates/DESIGN.md` (300 líneas)
**Instrucciones:** Copiar a raíz de proyecto, customizar tokens

Secciones:
- Paleta cromática OKLCH
- Tipografía (escala, leading, weights)
- Espaciado (4px grid)
- Componentes core
- Contraste + accesibilidad
- Dark mode
- Motion (easing, duration)
- Responsive (breakpoints)
- Performance budget
- CSS variables (copy-paste ready)

---

## ✅ CHECKLISTS EJECUTABLES

### 9. Pre-Design (30 min)
**Archivo:** `../checklists/pre-design.md`
- Captura de contexto
- Alineación de producto
- Decisiones UX clave

### 10. Pre-Code (2-4 horas)
**Archivo:** `../checklists/pre-code.md`
- Tipografía (8 items)
- Color (10 items)
- Layout (8 items)
- Motion (5 items)
- Pedagogía (7 items)
- Accesibilidad (8 items)
- Performance (4 items)

### 11. Pre-Review (45 min)
**Archivo:** `../checklists/pre-review.md`
- Visual consistency
- Interacción
- Pedagogía
- Accesibilidad
- Performance

### 12. Pre-Shipping (1 hora)
**Archivo:** `../checklists/pre-shipping.md`
- QA (navegadores, responsive, themes)
- Seguridad
- Performance (Lighthouse)
- Documentación
- Deploy checklist

---

## 🎯 CÓMO NAVEGAR

### "Quiero diseñar una nueva interfaz"
1. Leer `index.md` (5 min)
2. Llenar `PRODUCT.md` + `DESIGN.md` (1 hora)
3. Ejecutar `/welearn-context`
4. Ejecutar `/welearn-design`
5. Ejecutar `/welearn-audit`
6. Leer `pre-code.md` checklist

### "Quiero entender los principios"
1. Leer `implementation.md` (15 min)
2. Leer `executive-summary.md` (30 min)
3. Leer secciones relevantes de `framework.md`

### "Quiero agregar una nueva regla"
1. Leer sección de arquitectura en `framework.md`
2. Leer `engine.ts` para entender estructura
3. Agregar nueva regla a array correspondiente
4. Documentar en `framework.md`

### "Quiero especializar a EasyVisa"
1. Copiar `framework.md` como base
2. Leer contexto de EasyVisa (visa immigration)
3. Adaptar `PRODUCT.md` y `DESIGN.md`
4. Agregar módulos especializados si necesario
5. Documentar diferencias vs WeLearn

---

## 📊 ESTRUCTURA FINAL

```
.claude/skills/welearn-design/
├── index.md (PUNTO DE ENTRADA - leer primero)
├── commands/ (prompts para cada comando)
├── detector/ (TypeScript engine)
├── templates/ (PRODUCT.md + DESIGN.md para copiar)
├── checklists/ (ejecutables por fase)
└── references/ (este README + documentación completa)
    ├── framework.md (8000+ líneas - arquitectura)
    ├── implementation.md (guía práctica)
    ├── executive-summary.md (decisiones)
    └── README.md (este archivo - índice)
```

---

## 🚀 PRÓXIMAS FASES

### Corto Plazo (Esta Semana)
- [x] Framework arquitectónico ✓
- [x] Skill creado ✓
- [x] CLAUDE.md integrado ✓
- [ ] Testing en 3 landing pages

### Mediano Plazo (Este Mes)
- [ ] Aplicación a lecciones (17 pasos)
- [ ] Validación dashboard (estudiante + admin)
- [ ] Documentación de anti-patterns encontrados
- [ ] Entrenar team en checklists

### Largo Plazo (3 Meses)
- [ ] Extensión a EasyVisa
- [ ] Component library con design system
- [ ] Automatizar audits en CI/CD
- [ ] Publicar como skill comercial (opcional)

---

## 📞 PREGUNTAS FRECUENTES

### "¿Por dónde empiezo?"
→ Lee `index.md` (5 min), luego usa `/welearn-context`

### "¿Es realmente 60+ reglas?"
→ Sí. Ver `framework.md` sección "Reglas Clave" + `engine.ts`

### "¿Puedo ignorar algún checklist?"
→ No. Cada item representa UX research, accesibilidad, pedagogía o performance.

### "¿Qué pasa si no cumplo una regla?"
→ `/welearn-improve` te da sugerencia específica. Eval si aplica a tu contexto.

### "¿Cómo agrego una regla nueva?"
→ Lee "Agregar nueva regla" en sección "Cómo navegar" arriba.

### "¿Se puede usar para EasyVisa?"
→ Sí. Copiar framework, adaptar PRODUCT.md/DESIGN.md, especializar reglas.

---

## 📊 MÉTRICAS

### Antes del Framework
- Landing pages: 30-40 horas
- A11y violations: 5-10 por página
- Lighthouse: 72 promedio
- Bugs post-deploy: 3-5 por feature

### Objetivo (3 meses)
- Landing pages: 20-25 horas (-20%)
- A11y violations: 0-1 por página (-90%)
- Lighthouse: 90+ (+25%)
- Bugs post-deploy: 0-1 por feature (-80%)

---

## ✨ FILOSOFÍA

No automatizamos diseño. **Amplificamos criterio humano.**

Cada regla, cada checklist, cada comando existe porque:
- ✓ Está basado en research (Nielsen, Baymard, WCAG, Learning Sciences)
- ✓ Ha sido probado en productos reales
- ✓ Prioriza aprendizaje, no decoración

---

**Versión:** 1.0 Operacional  
**Última actualización:** 2026-07-08  
**Mantener:** WeLearn Team  

¿Preguntas? Consulta el framework. La respuesta está ahí. ✨

