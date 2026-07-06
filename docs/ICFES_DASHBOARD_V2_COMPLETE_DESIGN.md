# 🎨 ICFES Dashboard V2 — Complete Design & Architecture

## 🎯 Mission
Transform current dashboard from **analytics-only** to **complete learning platform** that takes students from L0→L100.

---

## 📐 Architecture Overview

```
Dashboard V2 = Current Dashboard + 5 New Systems

CURRENT (Analytics):
├─ KPI Cards
├─ Skills Heatmap
├─ Recent Mocks
├─ Daily Challenge
└─ Roadmap Calendar

+ NEW (Learning):
├─ Onboarding Flow
├─ Diagnostic System
├─ Learning Path Engine
├─ Vocabulary Platform
├─ Content Hub
├─ Error Analysis
├─ Adaptive Recommendations
└─ Progress Visualization (enhanced)
```

---

## 🏗️ SYSTEM 1: ONBOARDING FLOW

### **Purpose:** Personalize dashboard in 2 minutes

### **Flow:**

```
Screen 1: Welcome
┌────────────────────────────────────┐
│ 👋 Bienvenido a ICFES Training     │
│                                    │
│ Necesitamos conocerte para         │
│ personalizar tu plan de estudio    │
│                                    │
│ ¿Cuál es tu nivel actual?          │
│ ○ No tengo idea (0%)              │
│ ○ Sé algunos verbos (20%)         │
│ ○ Puedo hacer frases simples (40%)│
│ ○ Entiendo conversaciones (60%)   │
│ ○ Casi listo para ICFES (80%)     │
│                                    │
│           [Siguiente →]            │
└────────────────────────────────────┘

Screen 2: Time
┌────────────────────────────────────┐
│ ⏱️ ¿Cuánto tiempo tienes?          │
│                                    │
│ Min/día:  [30] [60] [90] [120+]    │
│                                    │
│ Esto afecta tu plan (ritmo)        │
│                                    │
│           [Siguiente →]            │
└────────────────────────────────────┘

Screen 3: Goal
┌────────────────────────────────────┐
│ 🎯 ¿Cuál es tu objetivo?           │
│                                    │
│ ○ Solo aprobar (50%)               │
│ ○ Banda A (75%)                   │
│ ○ Banda A+ (90%+)                 │
│                                    │
│           [Siguiente →]            │
└────────────────────────────────────┘

Screen 4: Timeline
┌────────────────────────────────────┐
│ 📅 ¿Cuándo es tu examen?           │
│                                    │
│ Examen en:  [5] [8] [12] [16+ sem] │
│                                    │
│           [Siguiente →]            │
└────────────────────────────────────┘

Screen 5: Summary
┌────────────────────────────────────┐
│ ✅ Tu perfil                       │
│                                    │
│ Nivel: Básico (40%)               │
│ Tiempo: 60 min/día                │
│ Objetivo: Banda A (75%)           │
│ Semanas: 8                         │
│                                    │
│ Plan recomendado:                  │
│ - Semana 1-2: Vocab + Conectores  │
│ - Semana 3-4: Paráfrasis + Idea   │
│ - Semana 5-6: Cloze + Matching    │
│ - Semana 7-8: Full Mocks          │
│                                    │
│ Tiempo/día recomendado:            │
│ - 20 min vocab                     │
│ - 20 min practice                  │
│ - 20 min simulacro                 │
│                                    │
│   [¡Empezar!]                      │
└────────────────────────────────────┘
```

### **Data Structure:**

```typescript
interface OnboardingProfile {
  userId: string
  level: 0 | 20 | 40 | 60 | 80 | 100  // Current level %
  minPerDay: 30 | 60 | 90 | 120
  goal: 'pass' | 'bandA' | 'bandAPlus'
  examDate: Date
  weeksAvailable: number
  customizationDate: Date
  
  // Derived
  recommendedPath: LearningPath
  recommendedPace: 'slow' | 'normal' | 'fast'
}

interface LearningPath {
  weeks: Week[]
  dailySchedule: DailySchedule
}

interface Week {
  number: 1-8
  focus: string[]  // e.g., ["vocab", "connectors"]
  skillsToStudy: IcfesSkill[]
  estimatedHours: number
  milestones: Milestone[]
}

interface DailySchedule {
  vocabMinutes: number     // 15-30
  practiceMinutes: number  // 15-30
  mockMinutes: number      // 0-60 (some days)
}
```

---

## 🎯 SYSTEM 2: DIAGNOSTIC TEST

### **Purpose:** Assess real level, find initial weaknesses

### **Flow:**

```
20 Questions, ~30 minutes
Adaptive difficulty (starts medium, adjusts based on answers)

Question 1 (Medium):
  "Which word means 'to make a law'?"
  A) cancel  B) enact  C) ignore  D) study
  
  → If correct: Next Q is harder
  → If wrong: Next Q is easier

After 20 Qs:
  Result: Level 25%, Weaknesses: [vocab, paraphrase]
  
  "Based on this, we recommend:
   - Focus: Vocabulary & Paraphrase
   - Start with: Vocab 101 (50 basic words)
   - Daily: 10 vocab cards + 5 paraphrase Qs
   - Target: 65% in 2 weeks"
```

### **Data Structure:**

```typescript
interface DiagnosticTest {
  testId: string
  userId: string
  questions: DiagnosticQuestion[]
  answers: DiagnosticAnswer[]
  completedAt: Date
  result: DiagnosticResult
}

interface DiagnosticQuestion {
  id: string
  skill: IcfesSkill
  difficulty: 1-5
  text: string
  options: string[]
  correctAnswer: string
}

interface DiagnosticResult {
  overallLevel: 0-100
  skillLevels: Record<IcfesSkill, number>
  topWeaknesses: IcfesSkill[]
  recommendations: string[]
  suggestedStartingContent: ContentId[]
}
```

---

## 📚 SYSTEM 3: LEARNING PATH ENGINE

### **Purpose:** Create personalized weekly + daily schedule

### **Logic:**

```
IF level = 0-30
  THEN Weeks 1-2: Foundation (vocab + basics)
  THEN Weeks 3-4: Building blocks (connectors, grammar)
  THEN Weeks 5-8: Practice & Consolidation

IF goal = 'bandA' AND weeks = 8
  THEN pace = 'aggressive' → more daily content
  THEN early mocks (week 4-5 instead of week 7)
  
IF weeklyAccuracy < 50%
  THEN automatic review of previous week
  THEN adjust pace (slow down)
  
IF weeklyAccuracy > 85%
  THEN accelerate to harder content
  THEN skip ahead optional
```

### **Dashboard Display:**

```
┌─ Your Learning Path ──────────────────┐
│                                        │
│ Week 1 (Current)                       │
│ ├─ Mon: ✅ Vocab 1-10                │
│ ├─ Tue: ○ Vocab 11-20                │
│ ├─ Wed: ○ Matching basics             │
│ ├─ Thu: ○ Cloze intro                │
│ ├─ Fri: ○ Mini mock (5Qs)            │
│ ├─ Sat: ○ Review errors              │
│ └─ Sun: ○ Rest / Extra practice      │
│                                        │
│ Progress: 2/7 done (29%)              │
│ On track: ✅                          │
│ Estimated finish: Sat 2pm             │
│                                        │
│ Week 2 Preview:                        │
│ > Vocab 21-30 + Connectors (and/but)  │
│ > Full understanding                   │
│ > Difficulty: ▮▮○○○ (30%)            │
│                                        │
│ Week 3-8:  [View →]                  │
│                                        │
│ Can I change my pace?  [Yes →]        │
└─────────────────────────────────────────┘
```

---

## 📖 SYSTEM 4: VOCABULARY PLATFORM

### **Purpose:** Master 300 essential words + context

### **Structure:**

```
300 Words divided by:
- Frequency (most common first)
- Difficulty (1-5)
- Skill (vocabulary_basic vs contextual)

WORD CARD EXAMPLE:

Front:
┌──────────────────────────────┐
│ enact                        │
│ (verb)                       │
│                              │
│ "The government ___ a law"   │
│ ┌─ Show answer?              │
└──────────────────────────────┘

Back (reveal):
┌──────────────────────────────┐
│ enact = to make official law │
│ = promulgar (Spanish)        │
│                              │
│ Synonyms: pass, establish    │
│ Antonyms: repeal, cancel     │
│                              │
│ ICFES appears in: 23 mocks   │
│                              │
│ Your status:                 │
│ ○ Never seen                 │
│ ○ Learning (2/4 correct)     │
│ ✅ Mastered (4/4 correct)    │
│                              │
│ [Easy] [Good] [Hard] [Master]│
└──────────────────────────────┘
```

### **Algorithm:**

```
Spaced Repetition (SRS):
- Day 1: Review word (if fails → reset)
- Day 3: Review again
- Day 7: Review again
- Day 14: Review again
- Day 30: Final review → "Mastered" ✅

Goal: 300 words → 4-5 months at pace of 15/week
OR: 300 words → 8 weeks at 40/week (accelerated)

Dashboard shows:
- "20/300 words mastered"
- "Progress this week: +5"
- "Review queue: 8 cards"
- "New to learn: 10 cards"
```

---

## 🔍 SYSTEM 5: CONTENT HUB

### **Purpose:** Teach the "why" behind each skill

### **Content Types:**

```
FOR SKILL: vocabulary_context

LESSON 1: Understanding context clues (Video, 5 min)
  "How to guess word meaning without dictionary"
  - Example: "The ancient artifact..."
  - Techniques: synonym, opposite, definition
  
EXERCISE 1: Identify context (Practice, 10 min)
  5 paragraphs, guess 5 words from context
  Feedback: "✅ You found 'artifact' = old object"
  
EXAMPLE SET: Real ICFES questions (Examples, 8 min)
  "In real ICFES, context looks like this..."
  Annotated: "(Here they're hinting about the word)"
  
MINI-TEST: Quiz (Assessment, 5 min)
  10 Qs testing context skills
  Result: "85% - Good! Ready for next lesson"
```

### **Navigation:**

```
Content Hub (by skill level):

LEVEL 1: FOUNDATIONS (if <40%)
├─ Vocab 101: 100 essential words
├─ Grammar 101: Present/Past simple
├─ Matching basics: How to match headings
└─ Estimation: Guess before knowing

LEVEL 2: BUILDING (40-60%)
├─ Vocab contextual: 100 contextual words
├─ Connectors: and/but/because/however
├─ Paraphrase intro: What does paraphrase mean?
├─ Cloze strategy: How to fill gaps
└─ MCQ tips: How to eliminate answers

LEVEL 3: ADVANCED (60-80%)
├─ Vocab advanced: 100 advanced words
├─ Inference: Reading between lines
├─ Tone & purpose: Author's intent
├─ Speed reading: ICFES pace tricks
└─ Full mock strategy: 60-min game plan

LEVEL 4: ELITE (80%+)
├─ Advanced scenarios
├─ Test anxiety management
├─ Last-minute review
└─ Performance optimization
```

---

## 📊 SYSTEM 6: ERROR ANALYSIS

### **After each simulacro:**

```
Your Mock Results: ICFES 2023, 19/25 (76%)

═══════════════════════════════════════════

ERROR BREAKDOWN:

❌ Error 1: Q7 (Paraphrase)
   You answered: C
   Correct: B
   
   Why you missed:
   "You don't know 'enact' (verb)"
   
   Learning opportunity:
   👉 Add to: Vocabulary review
   👉 Suggested lesson: "Vocabulary_Context_101"
   👉 Mini-test: 5 questions on this type
   
   This is a COMMON ERROR:
   "92% of students miss 'enact'"
   "Most confuse with: cancel, study"

───────────────────────────────────────

❌ Error 2: Q14 (Matching)
   Your error: Chose wrong heading
   
   Analysis:
   "You read too fast, missed key word"
   "Pattern: You miss when paragraphs are long"
   
   Strategy recommendation:
   👉 Always underline the topic sentence first
   👉 Practice: 10 matching questions (slow)
   
───────────────────────────────────────

✅ Strong areas:
   ✓ Multiple choice (90%)
   ✓ Main idea (85%)
   ✓ Time management (finished in 54 min)

═══════════════════════════════════════════

NEXT STEPS:
→ [Focus on Vocabulary] (10 min/day for 1 week)
→ [Practice Matching] (5 matching Qs daily)
→ [Retest with ICFES 2022] (when ready)

Confidence: 📈 You're improving!
Projection: If you focus on vocab... → 82% in 1 week
```

---

## 🤖 SYSTEM 7: ADAPTIVE RECOMMENDATIONS

### **Real-time adjustments:**

```
MONDAY 9AM: Student opens dashboard

System checks:
- "Last 3 mocks: 68%, 71%, 76% (improving!)"
- "Errors: 70% are vocabulary, 20% paraphrase, 10% timing"
- "This week: 3 days vocab studied, 1 day missed"
- "Vocab progress: 45/300 mastered"

Adaptive recommendation:
"🎯 Focus on vocabulary THIS WEEK
- You're weak in: 'contextual vocabulary'
- You're strong in: 'basic verbs' ✅
- Recommendation: Skip vocab_basic, focus vocab_context
- Time investment: 30 min/day (instead of 20)
- Your goal: 60 vocab words by Saturday
- Current pace: 10/week → need 15/week

[Accept Plan] [Adjust] [Help me choose]"

WEDNESDAY 6PM: Student completed vocab

"Great! You've done 8 vocab cards + 1 mini-mock
You're at 45/300 (15%)
At this pace, you'll master 300 in... 4 months
But goal is 8 weeks → need to accelerate slightly
Recommendation: Add 5 cards/day starting tomorrow
(Still only 35 min/day, totally doable)"

FRIDAY EVENING: Error analysis after simulacro

"Completed ICFES 2023 (76%)
2 errors in paraphrase (both missing 'enact')
That word keeps tripping you up!
Add to: Daily flashcard rotation
Mini-lesson: Context clues for verbs
Next 5 Qs you do will include this type
(System automatically loads more paraphrase Qs)"
```

---

## 📈 SYSTEM 8: ENHANCED PROGRESS DASHBOARD

### **Before (Current):**
```
"Precisión: 68%"
"Banda: A"
```

### **After (V2):**
```
┌─ Progress Dashboard ───────────────────────────┐
│                                                 │
│ YOUR JOURNEY: L0 → L100                        │
│ ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░  │
│ 42% complete (5 weeks in, 3 weeks left)        │
│                                                 │
│ Projected Band:                                │
│ Today: A- (68%)                                │
│ In 2 weeks: A (75%)                            │
│ In 4 weeks: A+ (82%)                           │
│ Goal: A+ ✅ (Achievable!)                      │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Weekly Progress:                               │
│ Week 1: 40% → 52% (+12%) ▮▮▮░░░               │
│ Week 2: 52% → 61% (+9%)  ▮▮░░░                │
│ Week 3: 61% → 68% (+7%)  ▮▮░░░                │
│ Week 4 (current): 68% → ... (projected 75%)   │
│                                                 │
│ Consistency: ████░░░░░░ (4/7 days this week)  │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Skill Progress (last 2 weeks):                 │
│ Vocabulary:      40% → 62% ↑ +22 ✅ GREAT     │
│ Connectors:      55% → 71% ↑ +16 ✅ GOOD     │
│ Paraphrase:      52% → 54% ↑ +2  ⚠️ SLOW    │
│ Main Idea:       75% → 78% ↑ +3  ✅ GOOD     │
│ Cloze:           48% → 61% ↑ +13 ✅ GOOD     │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Time Breakdown (last week):                    │
│ Vocabulary:   90 min (30%)  [Target: 30%] ✅  │
│ Practice:     140 min (46%) [Target: 40%]     │
│ Simulacros:   75 min (25%)  [Target: 30%]     │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Mock History:                                  │
│ ICFES 2023 (offic): 76% (54 min) ✅           │
│ ICFES 2022 (offic): 68% (62 min) ⚠️ slow    │
│ ICFES 2021 Ex1: 71% (59 min) ✅              │
│                                                 │
│ Trend: Improving + Getting faster!             │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ 🎯 Next Milestone:                             │
│ Target: 75% (Band A) by Week 6                 │
│ Current rate: +7% per week                     │
│ Prediction: ✅ Will achieve (Week 6.2)        │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🗂️ DASHBOARD LAYOUT (V2)

```
┌─── ICFES Dashboard V2 ───────────────────────────────────┐
│                                                           │
│ Tabs: [📊 Resumen] [🎯 Hoy] [📚 Contenido] [📈 Progreso]│
│                                                           │
├─ RESUMEN TAB ─────────────────────────────────────────── │
│  ┌─ Onboarding (if new user) ────────────────────┐      │
│  │ "Necesitamos conocerte..." → 5-step wizard    │      │
│  └───────────────────────────────────────────────┘      │
│                                                           │
│  ┌─ Learning Path (Week 1 of 8) ─────────────────────┐ │
│  │ Mon: ✅ Vocab 1-10                               │ │
│  │ Tue: ○ Vocab 11-20   ← You are here              │ │
│  │ Wed: ○ Matching      (in progress, 40%)          │ │
│  │ Thu: ○ Cloze intro                               │ │
│  │ Fri: ○ Mini mock                                 │ │
│  │ Sat: ○ Review errors                             │ │
│  │ Sun: ○ Rest / extra                              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                           │
│  ┌─ KPI Cards (4 cols) ──────────────────────────────┐  │
│  │ Banda A |  68% acc. | 5/300 vocab | 4 days streak│  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌─ Adaptive Recommendation ─────────────────────────┐  │
│  │ 🎯 Focus on: Paraphrase                         │  │
│  │ Reason: 3 errors in last mock                    │  │
│  │ Action: 10 paraphrase Qs daily for 1 week      │  │
│  │ [Accept] [Customize] [Dismiss]                  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌─ Recent Mocks (3 cols) ────────────────────────────┐ │
│  │ [ICFES 23: 76%] [ICFES 22: 68%] [ICFES 21: 71%] │ │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
├─ HOY TAB ─────────────────────────────────────────────── │
│  ┌─ Today's Schedule ────────────────────────────────┐  │
│  │ ✅ Vocab: 10 cards (5 min)                      │  │
│  │ ◐ Practice: Paraphrase 5 Qs (15 min) ← Next    │  │
│  │ ○ Mock: ICFES 2022 (60 min) (optional)         │  │
│  │ ○ Review: Error analysis (10 min)              │  │
│  │                                                  │  │
│  │ Time invested: 20/60 min (33%)                  │  │
│  │ Time left: 40 min                               │  │
│  │ [Start Next Activity]                           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌─ Daily Challenge: Paraphrase ───────────────────┐   │
│  │ (Interactive quiz component - same as V1)       │   │
│  │ Q1/5 ... [timer, options, feedback]             │   │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
├─ CONTENIDO TAB ───────────────────────────────────────── │
│  ┌─ Content Hub ─────────────────────────────────────┐  │
│  │ Your level: Intermedio (40-60%)                  │  │
│  │                                                  │  │
│  │ Recommended lessons:                             │  │
│  │ 🎥 Video: Paraphrase explained (5 min)          │  │
│  │ 📝 Exercises: 10 paraphrase Qs (10 min)         │  │
│  │ 📚 Examples: Real ICFES paraphrases (8 min)     │  │
│  │ ✅ Quiz: Test your paraphrase skill (5 min)    │  │
│  │                                                  │  │
│  │ All content:                                     │  │
│  │ [Vocabulary] [Connectors] [Paraphrase]...       │  │
│  │                                                  │  │
│  │ + Vocabulary Browser:                            │  │
│  │ [Mastered 45] [Learning 12] [To Learn 243]      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
├─ PROGRESO TAB ────────────────────────────────────────── │
│  ┌─ Full Progress Dashboard ──────────────────────────┐ │
│  │ (Complex graphs, trends, projections - see above)│  │
│  │                                                  │  │
│  │ [Weekly view] [Monthly] [By skill] [By mock]    │  │
│  │                                                  │  │
│  │ Proyection: A+ in 3 weeks ✅                     │  │
│  │ Consistency: Great! 5/7 days                     │  │
│  │ Pace: On track for your goal                     │  │
│  │                                                  │  │
│  │ [View mock history] [Error analysis] [Details]  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 💾 DATABASE SCHEMA (NEW TABLES)

```typescript
// ONBOARDING
CREATE TABLE icfes_onboarding (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  initial_level 0-100,
  min_per_day INT,
  goal 'pass' | 'bandA' | 'bandAPlus',
  exam_date DATE,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
)

// VOCABULARY CATALOG
CREATE TABLE icfes_vocabulary (
  id UUID PRIMARY KEY,
  word TEXT UNIQUE,
  translation TEXT,
  skill IcfesSkill,
  frequency_icfes INT,
  difficulty 1-5,
  example_sentence TEXT,
  example_source VARCHAR
)

// STUDENT VOCABULARY PROGRESS
CREATE TABLE icfes_vocabulary_progress (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  vocab_id UUID REFERENCES icfes_vocabulary,
  status 'new' | 'learning' | 'review' | 'mastered',
  attempts INT,
  correct INT,
  last_reviewed DATE,
  next_review DATE,
  created_at TIMESTAMP
)

// LEARNING CONTENT
CREATE TABLE icfes_content (
  id UUID PRIMARY KEY,
  skill IcfesSkill,
  content_type 'video' | 'text' | 'exercise' | 'example' | 'quiz',
  title TEXT,
  description TEXT,
  body TEXT,
  duration_minutes INT,
  difficulty 1-5,
  sequence_order INT,
  created_at TIMESTAMP
)

// DIAGNOSTIC TEST
CREATE TABLE icfes_diagnostic (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  questions JSON[],
  answers JSON[],
  result JSON {
    overall_level: 0-100,
    skill_levels: Record<IcfesSkill, number>,
    weaknesses: IcfesSkill[],
    recommendations: string[]
  },
  completed_at TIMESTAMP
)

// LEARNING PATH (generated from onboarding)
CREATE TABLE icfes_learning_path (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  path JSON {
    weeks: Week[],
    daily_schedule: DailySchedule,
    weekly_goals: string[]
  },
  current_week INT,
  status 'active' | 'completed' | 'paused',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

// ERROR LOGS (post-mock)
CREATE TABLE icfes_error_log (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  mock_submission_id UUID,
  question_id INT,
  skill IcfesSkill,
  error_type VARCHAR,
  student_answer VARCHAR,
  correct_answer VARCHAR,
  root_cause VARCHAR,
  recommendation_content_id UUID,
  created_at TIMESTAMP
)

// ADAPTIVE STATE (real-time recommendations)
CREATE TABLE icfes_adaptive_state (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  focus_skill IcfesSkill,
  focus_reason VARCHAR,
  intensity 'light' | 'normal' | 'heavy',
  next_recommended_content_id UUID,
  updated_at TIMESTAMP
)

// STUDENT LEARNING PROGRESS (aggregate)
CREATE TABLE icfes_student_progress (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  week_number INT,
  skill IcfesSkill,
  weekly_accuracy DECIMAL,
  improvement_vs_last_week DECIMAL,
  status 'on_track' | 'needs_help' | 'accelerating',
  updated_at TIMESTAMP
)
```

---

## 🚀 IMPLEMENTATION ROADMAP

### **SPRINT 1 (Week 1-2): Foundation**
```
- [ ] Onboarding wizard UI + flow
- [ ] Diagnostic test (20Qs engine)
- [ ] Database tables (onboarding, vocabulary, content)
- [ ] Learning path generator
- [ ] Basic content seeding (50 content items)
```

### **SPRINT 2 (Week 3-4): Core Engines**
```
- [ ] Vocabulary platform (flashcard UI)
- [ ] Spaced repetition algorithm
- [ ] Content hub (rendering + navigation)
- [ ] Error log system (post-mock capture)
- [ ] Basic analysis (what errors, what content to recommend)
```

### **SPRINT 3 (Week 5-6): Intelligence**
```
- [ ] Adaptive recommendation engine
- [ ] Progress graphs + visualizations
- [ ] Learning path adjustments (based on performance)
- [ ] Time management coach (during mock)
- [ ] Projection algorithm (banda estimate)
```

### **SPRINT 4 (Week 7): Polish & Launch**
```
- [ ] UI refinements
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] A/B testing (onboarding variants)
- [ ] Go live with beta group (10-20 students)
```

---

## 🎯 SUCCESS METRICS

```
STUDENT OUTCOME:
✓ Can go from L0 → L60+ in 4 weeks
✓ Know exactly what to study (learning path)
✓ Understand why they're failing (error analysis)
✓ See visual proof of progress (graphs)
✓ Stay motivated (projections, consistency)

LEARNING METRICS:
✓ 90% of students master 300 vocabulary words in 8 weeks
✓ 85% improve by 20+ percentage points in 6 weeks
✓ Avg time to L75 (Band A): 6-8 weeks
✓ Consistency: 70% complete their daily schedule

BUSINESS METRICS:
✓ Increase student retention: 80% complete program
✓ Reduce dropout: <10% after week 2
✓ Improve outcomes: 70% achieve their goal band
✓ Enable self-service: 60% don't need tutoring
```

---

**Status:** ✅ Design complete | 🏗️ Ready to build | 📊 Specs documented

