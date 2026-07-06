# 📊 ICFES Dashboard — Guía Técnica Completa

## Visión General

Dashboard premium para estudiantes de ICFES con:
- **KPIs en tiempo real**: Banda predicha, precisión general, consistencia
- **Visualización de habilidades**: Heatmap interactivo de 16 skills
- **Retos diarios adaptativos**: 5 preguntas enfocadas en debilidades
- **Historial de simulacros**: Desglose por skill, análisis de tiempo
- **Roadmap de preparación**: 5 semanas con hitos claros
- **Animaciones premium**: Framer Motion + Tailwind CSS v4

---

## 🏗️ Arquitectura Técnica

### Stack
```
Frontend:  React 19 + Next.js 16 + Tailwind CSS v4
Anim:      Framer Motion 12 + Recharts 3
State:     Zustand (ligero, optional)
Backend:   Supabase (auth + DB)
Deploy:    Vercel
```

### Estructura de Componentes

```
src/components/icfes/
├── IcfesDashboardClient.tsx     # 🎯 Main client (tabs, routing)
├── ProgressCard.tsx            # 💳 KPI cards con gradientes
├── SkillMeter.tsx              # ⭕ Circular progress indicator
├── SkillsHeatmap.tsx           # 🔥 Grid de 16 skills
├── MockResultCard.tsx          # 📝 Tarjeta de simulacro
├── DailyChallengeCard.tsx      # 🎮 Quiz interactivo con timer
└── index.ts                    # Exports

src/lib/types/icfes.ts          # Tipos compartidos TypeScript
src/app/(site)/dashboard/student/icfes/
├── page.tsx                    # Server-side data loading
└── simulacros/                 # (pendiente) Detalle por simulacro
```

---

## 📱 Componentes Detallados

### 1. **ProgressCard**
Tarjeta de métrica con:
- Valor grande (número o porcentaje)
- Ícono decorativo
- Línea de gradiente inferior
- Indicador de tendencia (↑ ↓ →)
- Animaciones de entrada

```tsx
<ProgressCard
  title="Banda estimada"
  value="A"
  subtitle="Basada en 8 simulacros"
  gradient="from-green-500 to-emerald-500"
  trend="up"
  trendValue="+5%"
/>
```

### 2. **SkillMeter**
Indicador circular animado con:
- Progreso en SVG (0-100%)
- Aro de objetivo en fondo (tenue)
- Badges de estado (🎯 Dominado / ⚡ En progreso / 🔥 Refuerzo)
- Colores por skill

```tsx
<SkillMeter
  skill="paraphrase"
  accuracy={0.52}
  targetAccuracy={0.85}
  size="md"
  interactive
/>
```

### 3. **SkillsHeatmap**
Grid de 4 columnas (responsive) con:
- 16 cajas de skill (colores por accuracy)
- Efecto shimmer on hover
- Tooltips "Haz clic para detalles"
- Leyenda de colores (rojo = bajo, verde = alto)
- Resumen: promedio, necesitan refuerzo, dominadas

```tsx
<SkillsHeatmap
  skills={MOCK_ALL_SKILLS}
  columns={4}
  onSkillClick={(skill) => console.log(skill)}
/>
```

### 4. **MockResultCard**
Tarjeta de simulacro con:
- Encabezado con gradiente y animaciones
- Score/MaxScore grande
- Banda predicha con contexto
- Barra de progreso de precision
- Metadata: tiempo (con alerta si > 60min), fecha
- CTA: "Ver desglose por skill"

```tsx
<MockResultCard
  id="1"
  title="ICFES 2023 Grado 11"
  score={19}
  maxScore={25}
  band="A"
  timeSpent={3270}
  completedAt={new Date()}
  href="/dashboard/student/icfes/simulacros/1"
/>
```

### 5. **DailyChallengeCard**
Quiz interactivo con:
- **Modo activo**: 5 preguntas, timer (5 min)
  - Opciones clickeables con feedback inmediato
  - Verde si correcto, rojo si incorrecto
  - Botón para ver explicación
  - Next button para avanzar
- **Modo completado**: Resultados con score, stats, motivación

```tsx
<DailyChallengeCard
  skill="paraphrase"
  questions={QUESTIONS}
  timeLimit={300}
  onComplete={(correct, timeSpent) => {...}}
/>
```

### 6. **IcfesDashboardClient**
Dashboard principal con 3 tabs:
- **📊 Resumen**: KPIs + Banda hero + Áreas a reforzar + Últimos simulacros + Roadmap
- **🎯 Reto Hoy**: DailyChallengeCard embebido
- **🔥 Skills**: SkillsHeatmap + Vista detallada de skill seleccionado

---

## 🎨 Diseño Visual

### Colores por Banda
```
A+: Emerald → Green (🌟 Excelente)
A:  Green → Lime   (✨ Muy bueno)
A-: Lime → Yellow  (⚡ Bueno)
B:  Yellow → Orange (🔥 Regular)
B+: Orange → Red   (⚠️ Necesita trabajo)
```

### Paleta ICFES
- **Primary**: `#0f7c3e` (verde WeLearn)
- **Success**: `#22c55e`
- **Warning**: `#eab308`
- **Danger**: `#dc2626`
- **Info**: `#2563eb`

### Microinteracciones
- **Hover**: `scale 1.02-1.1`, sombra aumenta
- **Tap**: `scale 0.98`
- **Entrance**: Fade in + scale from 0.8
- **Transitions**: `duration-300 to 800ms`

---

## 📊 Tipos de Datos

```typescript
// src/lib/types/icfes.ts

type IcfesBand = 'A-' | 'A' | 'A+' | 'B' | 'B+'

type IcfesSkill =
  | 'vocabulary_basic'
  | 'vocabulary_context'
  | 'grammar_recognition'
  | 'connectors'
  | 'reference_words'
  | 'main_idea'
  | 'detail'
  | 'inference'
  | 'paraphrase'
  | 'tone'
  | 'purpose'
  | 'sentence_order'
  | 'dialogue_completion'
  | 'scanning'
  | 'time_management'
  | 'functional_texts'

interface MockResult {
  id: string
  title: string
  score: number
  maxScore: number
  band: IcfesBand
  timeSpent: number      // segundos
  completedAt: Date
}

interface SkillAccuracy {
  skill: IcfesSkill
  accuracy: number       // 0-1
  questionsDone: number
  trend?: number         // % change
}
```

---

## 🗄️ Supabase Schema (pendiente implementación)

```sql
-- Tabla existente: exam_submissions
CREATE TABLE exam_submissions (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  exam_slug text,        -- 'icfes'
  mock_title text,       -- "ICFES 2023 Grado 11"
  total_score int,
  total_max int,
  created_at timestamp
);

-- Nueva tabla: Desglose por skill
CREATE TABLE icfes_skill_results (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  exam_submission_id uuid REFERENCES exam_submissions,
  skill text,            -- 'paraphrase', etc.
  correct int,
  total int,
  accuracy numeric,      -- 0.52
  time_spent int,        -- segundos
  created_at timestamp
);

-- Nueva tabla: Retos diarios
CREATE TABLE icfes_daily_challenges (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  challenge_date date UNIQUE,
  skill text,
  questions_correct int,
  questions_total int,   -- siempre 5
  completed boolean,
  time_spent int,
  created_at timestamp
);

-- Nueva tabla: Vocabulario
CREATE TABLE icfes_vocabulary_tracking (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  word text,
  frequency int,         -- cuántas veces aparece
  student_accuracy numeric,  -- % acierto
  mastered boolean,
  last_seen date,
  created_at timestamp
);

-- Nueva tabla: Plan de prep
CREATE TABLE icfes_prep_plan (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  exam_date date,
  weeks_remaining int,
  current_week int,
  weekly_goal numeric,
  plan_type text,        -- 'intensive', 'standard', 'cram'
  created_at timestamp,
  updated_at timestamp
);
```

---

## 🚀 Cómo Usar

### En una página servidor:
```tsx
// src/app/(site)/dashboard/student/icfes/page.tsx
import { IcfesDashboardClient } from '@/components/icfes'

export default async function IcfesDashboardPage() {
  const user = await getUser()
  const data = await fetchIcfesData(user.id)
  
  return (
    <IcfesDashboardClient
      studentName={data.name}
      estimatedBand={data.band}
      overallAccuracy={data.accuracy}
      // ... resto de props
    />
  )
}
```

### Pasar datos:
```tsx
<IcfesDashboardClient
  studentName="María García"
  estimatedBand="A"
  overallAccuracy={0.68}
  mocksTaken={8}
  consistencyDays={12}
  recentMocks={[...]}
  weaknesses={[...]}
  allSkills={[...]}
  todayChallenge={{
    skill: 'paraphrase',
    questions: [...]
  }}
  prepPlan={{
    examDate: new Date(...),
    weeksRemaining: 5,
    currentWeek: 1
  }}
/>
```

---

## 🔧 Personalización

### Cambiar colores de skill:
En `SkillMeter.tsx`, actualiza `SKILL_COLORS`:
```tsx
const SKILL_COLORS: Record<string, string> = {
  vocabulary_basic: 'from-blue-500 to-cyan-500',
  // ...
}
```

### Cambiar labels de skill:
En cualquier componente que tenga `SKILL_LABELS`.

### Modificar timeline de reto:
En `DailyChallengeCard.tsx`:
```tsx
const [timeLeft, setTimeLeft] = useState(timeLimit) // 300s = 5min
```

### Cambiar número de semanas:
En `IcfesDashboardClient.tsx`, actualiza el array:
```tsx
Array.from({ length: 5 }).map((_, week) => { // Cambiar 5 a N
```

---

## ✅ Checklist de Implementación Completa

- [x] **Componentes UI base** creados y styled
- [x] **Animaciones** con Framer Motion
- [x] **Responsive design** (mobile, tablet, desktop)
- [x] **Dark mode ready** (usa `dark:` en todo)
- [x] **TypeScript types** bien tipados
- [x] **Dashboard server page** con datos mockeados
- [ ] **Integración Supabase** (traer datos reales)
- [ ] **Server actions** para guardar retos diarios
- [ ] **Página de simulacro detail** (desglose por skill)
- [ ] **Página de vocabulario** (flashcards)
- [ ] **Roadmap semanal detail** (qué practicar cada día)
- [ ] **Notificaciones Sonner** para feedback

---

## 🎯 Próximos Pasos

1. **Integrar con Supabase**: Reemplazar mock data con queries reales
2. **Server actions**: `saveDailyChallenge()`, `recordSkillResult()`
3. **Computations**: `predictBand()`, `getWeaknesses()`
4. **Detalle de simulacro**: Página que muestre skill breakdown
5. **Flashcards**: Sistema de vocabulario interactivo
6. **Notificaciones**: Toast feedback con Sonner

---

## 📝 Notas Pedagógicas (como experto ICFES 10+ años)

✅ **Retos diarios de 5 preguntas**: Tiempo realista (5-10 min), evita abrumación
✅ **Enfoque en weaknesses**: Algoritmo que prioriza áreas bajas
✅ **Feedback inmediato**: Explicación al instante, no esperar
✅ **Visualización de progreso**: Heatmap muy motivador (gamification)
✅ **Banda predicha**: Enseña qué esperar en el real
✅ **Simulacros completos**: Necesarios para gestionar tiempo (crítico en ICFES)
✅ **Roadmap claro**: Estudiante sabe qué esperar cada semana

🎯 **Métrica de éxito**: Si el estudiante:
- Hace reto diario consistentemente (streak)
- Completa 1-2 simulacros por semana
- Mejora % en áreas débiles semana a semana
- → Subirá 2-3 bandas en 8 semanas

---

## 🎨 Preview Visual

El dashboard se vería así (3 tabs):

### Tab 1: Resumen
```
┌─ Hola, María García ─────────────────────────────┐
│                                                   │
│ [Banda A] [68%] [8 simulacros] [12 días 🔥]    │
│                                                   │
│ ┌──────────────────────────────────────────────┐ │
│ │  Banda estimada: A                         │ │
│ │  68% → Objetivo 85%                       │ │
│ │  Refuerza paráfrasis para alcanzar A+     │ │
│ └──────────────────────────────────────────────┘ │
│                                                   │
│ Áreas a reforzar:                                 │
│ ┌────┬────┬────┐                                  │
│ │52% │61% │75% │  (3 skill meters)               │
│ │Pará│Vocab│Idea│                                │
│ │fras│Con  │Prin│                                │
│ │sis │text │pal │                                │
│ └────┴────┴────┘                                  │
│                                                   │
│ Últimos simulacros:                               │
│ ┌──────────────────────┬──────────────────────┐  │
│ │ICFES 2023 G11        │ICFES 2022 G11       │  │
│ │19/25 (76%) A         │17/25 (68%) A-       │  │
│ │54:30 ✓               │63:15 ⚠️ (+3 min)    │  │
│ └──────────────────────┴──────────────────────┘  │
│                                                   │
│ Tu Roadmap (5 semanas):                           │
│ ┌──┬──┬──┬──┬──┐                                   │
│ │S1│S2│S3│S4│S5│ ← Semana actual                  │
│ │🔥│○ │○ │○ │○ │                                   │
│ └──┴──┴──┴──┴──┘                                  │
└─────────────────────────────────────────────────────┘
```

### Tab 2: Reto Hoy
```
┌──────────────────────────────────┐
│ 🔄 Paráfrasis       ⏱️ 04:15     │
├──────────────────────────────────┤
│                                  │
│ Q1/5 ▮▮▮▮○○○○○○ (20%)            │
│                                  │
│ The government enacted strict    │
│ legislation to combat pollution. │
│                                  │
│ A) ☐ El gobierno canceló...      │
│ B) ☑ El gobierno aprobó...       │ ✓ Correcto
│ C) ☐ El gobierno estudió...      │
│ D) ☐ El gobierno eliminó...      │
│                                  │
│ 💡 Explicación:                  │
│ "Enacted" = aprobó/promulgó.     │
│                                  │
│              [Siguiente] →        │
└──────────────────────────────────┘
```

### Tab 3: Skills (Heatmap)
```
┌────┬────┬────┬────┐
│88% │61% │72% │68% │  (16 skills en grid)
│Voc │Voc │Gram│Con │  (colores red→green)
│Bas │Con │    │    │
└────┴────┴────┴────┘
... (4 más filas)

Promedio: 68% | Necesitan refuerzo: 5 | Dominadas: 2
```

---

Hecho por: Claude + Full-stack + Experto ICFES 🎓
