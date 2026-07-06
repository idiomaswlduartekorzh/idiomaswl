# 📋 STUDENT SIMULATION L0→L100: Full Journey Report

## 🎯 Objetivo
Simular estudiante **nivel 0** (sin conocimiento ICFES) llegando a **nivel 100** (máximo). 
Reportar **limitaciones, necesidades y oportunidades** desde 3 perspectivas:
1. **Estudiante** (user experience)
2. **Tutor/Experto ICFES** (metodología)
3. **Developer** (qué herramientas faltan)

---

## 📍 FASE 1: NIVEL 0 (Semana 1) — ESTUDIANTE ENTRA POR PRIMERA VEZ

### **Día 1.1 — Exploración Inicial**

**Contexto estudiante:**
- Nombre: María (17 años, Grado 11)
- Nivel inglés: Básico (no sabe qué es ICFES)
- Motivación: Necesita pasar ICFES para entrar a universidad
- Tiempo disponible: 1h/día

**Actions:**
1. ✅ Entra a `/dashboard/student/icfes`
2. ✅ Ve dashboard con **Banda A, 68%, 8 simulacros, racha 12 días**
3. ❌ **PROBLEMA 1**: ¿Quién es María? Dashboard muestra datos ajenos
   - No hay onboarding
   - No hay "empezar desde cero"
   - Asume que ya hizo 8 simulacros

**REPORTE ESTUDIANTE:**
```
❌ PROBLEMA 1.1: No hay "New Student" flow
   - Debería decirme: "¡Hola! ¿Cuál es tu nivel actual?"
   - Opciones: Ninguno / Básico / Intermedio / Avanzado
   - No mostrarme datos de otra persona

❌ PROBLEMA 1.2: Dashboard asume conocimiento ICFES
   - ¿Qué es "Banda A"? 
   - ¿Qué significa 68%?
   - ¿Cuántas preguntas tiene ICFES?
   - No hay tooltips o help

❌ PROBLEMA 1.3: No hay "Guía rápida"
   - ICFES tiene estructura específica
   - ¿Cuál es el componente de inglés?
   - ¿Cuánto tiempo tengo?
   - ¿Qué tipo de preguntas?
```

---

### **Día 1.2 — Intentar Reto Diario**

**Action:** María clickea en tab "Reto Hoy"

**Encuentra:** 5 preguntas de "Paráfrasis"

❌ **PROBLEMA 2**: No sabe qué es "Paráfrasis"
```
Q1: "The government enacted strict legislation..."
Opciones: [A, B, C, D]

María: "¿Qué significa 'enacted'? ¿Cuál elijo?"
```

**REPORTE ESTUDIANTE:**
```
❌ PROBLEMA 2.1: Sin diccionario/soporte en el reto
   - No puedo ver significado de palabras
   - No hay ejemplo de qué es "paráfrasis"
   - Solo me da 5 preguntas sin contexto

❌ PROBLEMA 2.2: Sin estrategia pedagógica
   - ¿Por qué empezar por paráfrasis?
   - ¿No debería empezar por vocab básico?
   - ¿Hay nivel de dificultad?

❌ PROBLEMA 2.3: Sin feedback después
   - Respondo, me dice "correcto/incorrecto"
   - Veo explicación 1 vez
   - ¿Dónde guardo esto para repasarlo?
   - ¿Cómo me aseguro de que aprendí?
```

---

### **Día 1.3 — Intentar "Ver todas las habilidades"**

**Action:** María va a tab "Skills"

**Encuentra:** Heatmap con 16 skills (colores rojo/verde)

❌ **PROBLEMA 3**: Sin contexto

```
Grid 4x4:
- vocabulary_context: 61% (rojo)
- paraphrase: 52% (rojo)
- main_idea: 75% (amarillo)
- ...

María: "¿Qué hago con esto?"
```

**REPORTE ESTUDIANTE:**
```
❌ PROBLEMA 3.1: Heatmap sin acción
   - Veo colores, pero no sé qué hacer
   - ¿Debo clickear?
   - ¿Hay cursos para cada skill?
   - ¿Cuál practico primero?

❌ PROBLEMA 3.2: Sin learning path
   - 16 skills es abrumador
   - ¿Hay una secuencia recomendada?
   - ¿Vocabulario primero? ¿Conectores?
   - ¿Hay un "diagnóstico inicial"?

❌ PROBLEMA 3.3: Sin "por qué" 
   - ¿Por qué 16 skills?
   - ¿Cuáles son las más importante?
   - ¿Cuál toma más tiempo aprender?
```

---

## 🎯 FASE 2: NIVEL 20 (Semana 2-3) — ESTUDIANTE INTENTA PROGRESAR

### **Semana 2.1 — Vocabulario Básico**

**María decide:** "Voy a aprender vocabulario primero"

**Busca en dashboard:** No hay sección "Vocabulario"

**Va a:** `/practica/` → ve opciones pero ninguna es "Vocab ICFES"

❌ **PROBLEMA 4**: Fragmentación

```
REPORTE ESTUDIANTE:
❌ PROBLEMA 4.1: Dónde están las herramientas?
   - Dashboard muestra reto del día
   - Pero ¿dónde hago flashcards?
   - ¿Dónde practico vocabulario?
   - ¿Dónde veo lecciones?

❌ PROBLEMA 4.2: Sin "learning progression"
   - ¿Cuáles son los 100 palabras más importantes?
   - ¿Hay lecciones progresivas?
   - ¿Qué palabras necesito HOY?

❌ PROBLEMA 4.3: Sin test de vocabulario
   - ¿Domino estas palabras?
   - ¿Qué debo repasar?
   - ¿Hay mini-test?
```

---

### **Semana 2.2 — Intenta Simulacro**

**Action:** María va a `/examenes/icfes` → ve 10+ simulacros

**Elige:** "ICFES 2023 Grado 11"

**Entra al simulacro:** 25 preguntas, 60 min

❌ **PROBLEMA 5**: Sin scaffolding

```
DURANTE EL SIMULACRO:
- P1: "What is the main idea of the text?"
  María: ¿Texto? No veo texto. ¿Dónde está?
  
- P5: Dice "[CLOZE: The government ___]"
  María: ¿Qué es "cloze"?
  
- P10: Timer dice "45:30" 
  María: ¿Tengo que terminar en 60 min? ¿Llevo bien el tiempo?

REPORTE ESTUDIANTE:
❌ PROBLEMA 5.1: Sin explicación de formato
   - ¿Qué es un "cloze"?
   - ¿Qué es "matching"?
   - ¿Cuál es la estructura del examen?

❌ PROBLEMA 5.2: Sin estrategia de tiempo
   - ¿Cuánto tiempo por pregunta?
   - ¿Debo leer rápido?
   - ¿Hay una metodología?

❌ PROBLEMA 5.3: Sin ayudas durante simulacro
   - ¿Puedo saltar preguntas?
   - ¿Hay pista?
   - ¿Puedo marcar para revisar?
```

---

## 👨‍🏫 FASE 3: TUTOR REVIEW — EXPERTO ICFES ANALIZA

### **Lo que Tutor observa:**

**Fortalezas encontradas:**
✅ Dashboard ICFES es visualmente claro
✅ Heatmap de 16 skills es una buena idea pedagógica
✅ Reto diario de 5 preguntas es realista (15 min)
✅ Mock data es variada (2023, 2022, 2021, etc.)

**Debilidades críticas:**
❌ **Sin onboarding → estudiante pierde 30 min explorando**
❌ **Sin "diagnóstico inicial" → no sabe su nivel real**
❌ **Sin "learning path" → no sabe qué estudiar**
❌ **Herramientas dispersas → confusión**
❌ **Sin explicación de ICFES → asume conocimiento**
❌ **Sin estrategia de tiempo → simulacro es caótico**
❌ **Sin "cuerpo de contenido"** (lecciones, explicaciones)
❌ **Sin "revisión de errores" → no hay feedback profundo**

### **Tutor propone (para crear después):**

```
HERRAMIENTAS QUE FALTAN:

1. ONBOARDING (10 min)
   - "¿Cuál es tu nivel?"
   - "¿Cuánto tiempo tienes?"
   - "¿Cuál es tu objetivo?" (pasar / banda A+ / etc)
   - → Crea perfil personalizado

2. DIAGNOSTIC TEST (30 min)
   - 20 preguntas quick
   - Asigna nivel 0-5
   - Identifica weaknesses principales
   - Genera "learning plan" customizado

3. LEARNING HUB (contenido)
   - Lecciones por skill
   - Videos explicativos
   - Ejemplos anotados
   - Ejercicios progresivos

4. VOCABULARY ENGINE
   - 300 palabras ICFES
   - Flashcards
   - Spaced repetition
   - Mini-test semanal
   - "Palabras del día"

5. STRATEGY GUIDES
   - "Cómo responder MCQ"
   - "Cómo hacer matching"
   - "Cómo hacer cloze"
   - Time management
   - Test-taking tips

6. ERROR ANALYSIS
   - Después del simulacro
   - "Erraste en paráfrasis"
   - "Causa: no conocías 'enact'"
   - "Solución: repasa vocab contextual"
   - Propone mini-lecciones

7. PROGRESS TRACKING (mejor)
   - Gráficos de mejora
   - "Hace 1 semana: 40%, Ahora: 65%"
   - Skills mejorando vs. deteriorando
   - Proyección de banda
   - Ritmo de mejora realista

8. ADAPTIVE CONTENT
   - Si cometes error en "paráfrasis" 3 veces
   - Automáticamente incluye lecciones de paráfrasis
   - Próximo reto enfatiza paráfrasis
   - Flashcards son paráfrasis

9. SOCIAL/COMPETICIÓN
   - Ver progreso vs. otros estudiantes
   - Retos semanales
   - Leaderboard
   - Motivación
```

---

## 👨‍💻 FASE 4: DEVELOPER PERSPECTIVE

### **Requisitos técnicos derivados:**

```sql
-- TABLAS NECESARIAS NUEVAS:

1. icfes_onboarding
   - user_id
   - level_assessment (0-5)
   - time_available (min/día)
   - goal (pass / band_a / band_a_plus)
   - created_at

2. icfes_vocabulary_catalog
   - word_id
   - word (english)
   - translation (spanish)
   - skill (vocabulary_basic, vocabulary_context, etc)
   - frequency (cuántas veces aparece en ICFES)
   - difficulty (1-5)
   - example_sentence
   - example_icfes_context

3. icfes_learning_content
   - content_id
   - skill
   - content_type (video, text, exercise, example)
   - title, description, body
   - difficulty_level (0-5)
   - estimated_time (minutos)
   - order (secuencia)

4. icfes_error_log
   - submission_id
   - question_id
   - student_id
   - skill (qué skill era)
   - error_type (vocab, comprehension, time_management, etc)
   - is_common_mistake (boolean)
   - solution_content_id (apunta a content que explica)

5. icfes_adaptive_state
   - user_id
   - next_focus_skill (cuál trabajar)
   - reason (based on errors)
   - intensity (cuánto contenido agregar)
   - updated_at
```

### **APIs/Server Actions necesarias:**

```typescript
// src/lib/actions/icfes.ts

// 1. Onboarding
await saveOnboarding(userId, level, timeAvailable, goal)

// 2. Vocabulary
getVocabularyBySkill(skill: IcfesSkill) // 300 words
addVocabularyToReview(userId, wordIds)
reviewVocabularyCard(userId, wordId, correct: boolean)

// 3. Content
getContentForSkill(skill, difficulty)
getContentForError(errorType)
completeContent(userId, contentId)

// 4. Analysis
analyzeSimulacroErrors(userId, submissionId) // → logs
getRecommendations(userId) // → next focus

// 5. Adaptive
getAdaptiveNextChallenge(userId) // smart picking
calculateProjectedBand(userId) // predicción

// 6. Progress
getProgressGraph(userId, days: 7|30|90)
getSkillTrend(userId, skill)
```

### **Frontend Components needed:**

```
src/components/icfes/
├── OnboardingFlow.tsx          (5-step wizard)
├── DiagnosticTest.tsx          (20 Qs, ~30 min)
├── LearningHub.tsx             (content viewer)
├── VocabularyEngine.tsx        (flashcards + spaced rep)
├── StrategyGuide.tsx           (howto por tipo Q)
├── ErrorAnalysis.tsx           (post-mock analysis)
├── ProgressDashboard.tsx       (graphs + trends)
├── AdaptiveRecommendation.tsx  (next step)
└── TimeManagementCoach.tsx     (durante simulacro)
```

---

## 📊 LOGS CONSOLIDADOS — QUÉ FALTA

### **CRÍTICO (Debe existir antes de pasar L0→L20):**

| Herramienta | Razón | Impacto |
|---|---|---|
| **Onboarding** | Sin él, 30% tiempo perdido | Decisivo |
| **Diagnostic** | Sin saber nivel, no puedo personalizar | Decisivo |
| **Learning Path** | Sin él, estudiante no sabe qué hacer | Decisivo |
| **Vocabulary Engine** | 40% de ICFES es vocab | Alto |
| **Error Analysis** | Sin feedback, no aprenden de errores | Alto |

### **ALTO (Mejora experiencia significativamente):**

| Herramienta | Razón | Impacto |
|---|---|---|
| **Content Hub** | Necesitan explicaciones, no solo Q&A | Alto |
| **Time Management** | ICFES = carrera contra el tiempo | Alto |
| **Adaptive Next** | Content muy genérico actualmente | Alto |
| **Progress Graphs** | Motivación = visual proof of progress | Medio-Alto |

### **MEDIO (Nice to have):**

| Herramienta | Razón | Impacto |
|---|---|---|
| **Strategy Guides** | Ayuda a responder, no es esencial | Medio |
| **Leaderboard** | Gamification, motivación | Medio |
| **Social** | Community, pero secondary | Bajo |

---

## 🎯 FASE 5: NEW DASHBOARD DESIGN (Developer view)

### **Información que dashboard debe mostrar (para cada componente):**

```
ESTUDIANTE NIVEL 0 ENTRA:

┌─ ICFES Dashboard L0→L100 ─────────────────────┐
│                                                 │
│ 1️⃣ ONBOARDING BANNER                           │
│   "¿Cuál es tu nivel?" [WIZARD]               │
│   "Necesitamos 2 min para personalizarte"     │
│                                                 │
│ 2️⃣ LEARNING PATH (después de onboarding)      │
│   📚 Semana 1: Vocab básico (100 palabras)    │
│   📚 Semana 2: Conectores (20 words)          │
│   📚 Semana 3: Paráfrasis (strategy + 50Qs)   │
│   📚 Semana 4: Cloze (practice)                │
│   📚 Semana 5: Simulacro completo             │
│   (es ADAPTIVA basada en progreso)             │
│                                                 │
│ 3️⃣ HOY                                         │
│   ✅ Vocabulario: 10 flashcards (5 min)       │
│   🎯 Reto: Paráfrasis (5 Qs, 15 min)          │
│   📖 Estrategia: Cómo responder MCQ (video)   │
│   ⏱️ Tiempo: 25 min disponibles de 60 hoy     │
│                                                 │
│ 4️⃣ PROGRESS THIS WEEK                         │
│   Vocab mastered: 23/100 (23%)                │
│   Skill improvement: +5% (paráfrasis)         │
│   Consistency: 5/7 días ✅                    │
│   Projected band: C (necesitas banda B)       │
│                                                 │
│ 5️⃣ NEXT FOCUS (adaptivo)                      │
│   ⚠️ Errores en "paráfrasis" (3/5 mal)        │
│   ✅ Solución: Lección "Paráfrasis Explicada" │
│   ✅ Agenda: 2 flashcard sets + mini-test     │
│                                                 │
│ 6️⃣ SIMULACROS (cuando listo)                  │
│   [Start Full Mock]  [Practice Section]        │
│   Recomendación: Prueba semana 4              │
│                                                 │
└──────────────────────────────────────────────┘
```

---

## 📋 MASTER REQUIREMENTS (Para Developer)

### **Build Priority:**

```
SPRINT 1 (Crítico):
- [ ] Onboarding wizard (5 steps, 2 min)
- [ ] Diagnostic test (20 Qs, 30 min)
- [ ] Database: icfes_onboarding, icfes_vocabulary_catalog
- [ ] Learning path generator (basado en onboarding)

SPRINT 2 (Alto):
- [ ] Vocabulary engine (flashcards + spaced rep)
- [ ] Content hub (lecciones por skill)
- [ ] Error analysis (post-simulacro)
- [ ] Adaptive next challenge picker

SPRINT 3 (Medio):
- [ ] Progress graphs (mejora visual)
- [ ] Time management coach (durante simulacro)
- [ ] Strategy guides (howto)
- [ ] Error log + recommendation engine

SPRINT 4 (Nice):
- [ ] Leaderboard
- [ ] Social features
- [ ] Advanced analytics (tutor view)
```

---

## 🔄 ITERATION PLAN (3 perspectives)

### **ITERATION 1: STUDENT PERSPECTIVE**
1. Onboarding → Student enters, gets personalized path
2. Test: Can they reach L20 in 1 week using tools?
3. Report: What frustrated them?
4. Fix: Improve UX, content, timing

### **ITERATION 2: TUTOR PERSPECTIVE**
1. Review student's journey
2. Analyze: "Did path work?" "Were errors predictable?"
3. Check: "Do explanations help?" "Is pace right?"
4. Propose: Pedagogy improvements

### **ITERATION 3: DEVELOPER PERSPECTIVE**
1. Consolidate all logs + feedback
2. Prioritize features
3. Build the missing tools
4. Test with real students

---

## 📝 SUMMARY: ROADMAP

**Week 1:** Build Onboarding + Diagnostic  
**Week 2:** Build Vocabulary Engine + Content Hub  
**Week 3:** Build Error Analysis + Adaptive Logic  
**Week 4:** Polish, iterate, launch  
**Week 5-8:** Tutor feedback → improve pedagogy  

---

**Status:** ✅ Framework created | ⏳ Execution pending | 🚀 Ready to build

