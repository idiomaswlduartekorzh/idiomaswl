'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { signOut } from '@/lib/actions/signOut'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts'

export interface DashboardStats {
  simulacros: number
  mejorScore: number
  diasActivo: number
}

export interface RecentExam {
  name: string
  subtitle: string
  pct: number
  color: string
  slug: string
}

export interface KoreanLesson {
  day: number
  title: string
  sub: string
  done: boolean
}

export type StudentPlan = 'autodidacta' | 'preparacion' | 'intensivo'

const PLAN_LABELS: Record<StudentPlan, string> = {
  autodidacta: 'Autodidacta',
  preparacion: 'Preparación',
  intensivo:   'Intensivo',
}
const PLAN_COLORS: Record<StudentPlan, string> = {
  autodidacta: '#6b7280',
  preparacion: '#1a2ecc',
  intensivo:   '#c8202e',
}

interface Props {
  name: string
  plan: StudentPlan
  streak: number
  stats?: DashboardStats
  recentExams?: RecentExam[]
  koreanLessons?: KoreanLesson[]
}

/* ── SVG icon map ───────────────────────────────────────────────────────────── */
const IC = {
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  clipboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <path d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  ),
  trendingUp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  award: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  bookOpen: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  logIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
  sparkles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 19l.5 1.5L21 21l-1.5.5L19 23l-.5-1.5L17 21l1.5-.5z" />
      <path d="M4 4l.5 1.5L6 6l-1.5.5L4 8l-.5-1.5L2 6l1.5-.5z" />
    </svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  flag: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  messageCircle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  graduationCap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 10 12 5 2 10 12 15 22 10" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  helpCircle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  clipboard2: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <path d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  pencil: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  trophy: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 19.75 7 21.23 7 23" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 19.75 17 21.23 17 23" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  ),
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  ),
} satisfies Record<string, ReactNode>

/* ── Data ──────────────────────────────────────────────────────────────────── */
const NAV: { group: string; items: { label: string; href: string; icon: ReactNode; active: boolean }[] }[] = [
  {
    group: 'Menú',
    items: [
      { label: 'Inicio',          href: '/dashboard/student', icon: IC.grid,        active: true  },
      { label: 'Mis exámenes',    href: '/examenes',          icon: IC.clipboard,   active: false },
      { label: 'Mi progreso',     href: '/dashboard/student/progreso', icon: IC.trendingUp, active: false },
    ],
  },
  {
    group: 'Aprender coreano',
    items: [
      { label: 'Lecciones',       href: '/leccion',                    icon: IC.bookOpen,  active: false },
      { label: 'Práctica oral',   href: '/practica/korean-speaking-1', icon: IC.flag,       active: false },
      { label: 'Blog',            href: '/blog',                       icon: IC.sparkles,   active: false },
    ],
  },
  {
    group: 'Practicar exámenes',
    items: [
      { label: 'IELTS / TOEFL',  href: '/examenes/ielts',     icon: IC.globe, active: false },
      { label: 'ICFES',           href: '/examenes/icfes',     icon: IC.globe, active: false },
      { label: 'TOPIK',           href: '/clases-de-coreano',  icon: IC.globe, active: false },
    ],
  },
  {
    group: 'Cuenta',
    items: [
      { label: 'Mi perfil',      href: '/dashboard/student/perfil', icon: IC.user,     active: false },
      { label: 'Soporte WA',     href: 'https://wa.me/573005004253?text=Hola%2C%20necesito%20ayuda%20con%20mi%20cuenta%20en%20WeLearn.', icon: IC.helpCircle, active: false },
    ],
  },
]

const IN_PROGRESS = [
  { name: 'IELTS Academic', subtitle: 'Set 3 · Listening', pct: 65, color: '#c8202e',    slug: 'ielts',     mockId: 'set-3' },
  { name: 'Goethe B1',      subtitle: 'Set 1 · Lesen',     pct: 40, color: '#1a2ecc',    slug: 'goethe',    mockId: 'set-1' },
  { name: 'ICFES',          subtitle: 'Mock 5 · Inglés',   pct: 80, color: '#0f7c3e',    slug: 'icfes',     mockId: 'mock-05' },
]

const RECOMMENDED = [
  { name: 'TOEFL iBT',  lang: 'Inglés · Academic', badge: 'ACADEMIC',        color: '#1a6e3c', slug: 'toefl',      mocks: '1 simulacro' },
  { name: 'DELF B1',    lang: 'Francés · B1',      badge: 'OFFICIEL',        color: '#1a2ecc', slug: 'delf-dalf',  mocks: '1 simulacro' },
  { name: 'CILS B1',    lang: 'Italiano · B1',     badge: 'CERTIFICAZIONE',  color: '#b45309', slug: 'cils-celi',  mocks: '1 simulacro' },
  { name: 'CELPE-BRAS', lang: 'Portugués',          badge: 'BRASIL',          color: '#166534', slug: 'celpe-bras', mocks: '1 simulacro' },
]

const RESOURCES: { label: string; icon: ReactNode; href: string }[] = [
  { label: 'Exámenes',       icon: IC.bookOpen,      href: '/examenes' },
  { label: 'Lecciones',      icon: IC.logIn,         href: '/leccion' },
  { label: 'Método WeLearn', icon: IC.sparkles,      href: '/metodo' },
  { label: 'Blog',           icon: IC.messageCircle, href: '/blog' },
  { label: 'Precios',        icon: IC.graduationCap, href: '/precios' },
  { label: 'Pedir ayuda',    icon: IC.helpCircle,    href: 'https://wa.me/573005004253?text=Hola%2C%20necesito%20ayuda%20con%20mi%20cuenta%20en%20WeLearn.' },
]

const RADAR_DATA = [
  { skill: 'Listening', value: 72 },
  { skill: 'Reading',   value: 80 },
  { skill: 'Writing',   value: 58 },
  { skill: 'Speaking',  value: 65 },
  { skill: 'Vocab',     value: 74 },
]

/* ── Tips del día (rotación diaria) ─────────────────────────────────────── */
const DAILY_TIPS = [
  { emoji: '🎧', tag: 'Listening', text: 'Escucha 10 minutos de inglés nativo hoy sin subtítulos. Tu cerebro empieza a ajustarse a la velocidad real del idioma.' },
  { emoji: '📝', tag: 'Writing', text: 'Antes de escribir un essay, dedica 2 minutos a esquematizar: tesis + 2 argumentos + ejemplo cada uno. Ahorras tiempo y escribes más claro.' },
  { emoji: '🗣️', tag: 'Speaking', text: 'Practica "shadowing": repite en voz alta justo después de escuchar al hablante nativo, imitando entonación y ritmo.' },
  { emoji: '📖', tag: 'Reading', text: 'Lee el párrafo introductorio y las primeras frases de cada sección antes de responder. El contexto global mejora tu comprensión.' },
  { emoji: '🧠', tag: 'Vocabulario', text: 'Aprende 5 palabras nuevas en contexto (en oraciones reales), no aisladas. El contexto activa la memoria a largo plazo.' },
  { emoji: '⏱️', tag: 'IELTS', text: 'En IELTS Writing Task 2, dedica exactamente 40 minutos: 5 planear + 30 escribir + 5 revisar. La estructura vale más que la extensión.' },
  { emoji: '🔊', tag: 'Pronunciación', text: 'Grábate hablando durante 1 minuto y escúchate. Identificar tus errores propios es más eficaz que cualquier corrección externa.' },
  { emoji: '🇰🇷', tag: 'Coreano', text: '한글 (Hangeul) se aprende en 2 horas si lo abordas como bloques de sílabas, no letras individuales. Empieza por las 14 consonantes básicas.' },
  { emoji: '💡', tag: 'Método', text: 'La repetición espaciada es la herramienta #1 para memorizar vocabulario. Revisa lo aprendido a las 24h, 3 días y 7 días.' },
  { emoji: '🎯', tag: 'TOEFL', text: 'En TOEFL Integrated Writing, no copies el texto: parafrasea. Los graders penalizan el copy-paste aunque sea correcto gramaticalmente.' },
  { emoji: '📱', tag: 'Inmersión', text: 'Cambia el idioma de tu teléfono al idioma que estás aprendiendo. Usas el celular decenas de veces al día — eso es práctica gratis.' },
  { emoji: '✍️', tag: 'ICFES', text: 'En inglés ICFES, las preguntas de "idea principal" siempre están en el título o el primer párrafo. No leas todo el texto primero.' },
  { emoji: '🌱', tag: 'Constancia', text: '15 minutos diarios superan a 3 horas los sábados. El idioma se aprende en acumulación, no en explosiones. Practica hoy.' },
  { emoji: '🇩🇪', tag: 'Alemán', text: 'Para el Goethe, el vocabulario temático es clave: viajes, trabajo, hogar, salud. Aprende los sustantivos siempre con su artículo (der/die/das).' },
  // Tips 15–28
  { emoji: '🔍', tag: 'IELTS Reading', text: 'Para True/False/Not Given: si el texto no menciona la información, la respuesta es "Not Given" — nunca uses lógica externa ni suposiciones.' },
  { emoji: '🎤', tag: 'IELTS Speaking', text: 'En la Part 2 (cue card), usa los 1 minuto de preparación para escribir 3 palabras clave — no oraciones completas. Habla desde esas anclas.' },
  { emoji: '🇰🇷', tag: 'TOPIK', text: 'Para el TOPIK I, el vocabulario de los textos tipo "aviso" y "anuncio" se repite mucho. Estudia señales de transporte, menús y carteles.' },
  { emoji: '🇫🇷', tag: 'DELF', text: 'En la producción escrita del DELF, el corrector evalúa respeto del tipo de texto (carta, artículo, forum). Asegúrate de usar la forma correcta desde la primera línea.' },
  { emoji: '💬', tag: 'Output', text: 'Forzarte a producir en el idioma (hablar, escribir) consolida más que solo consumir (leer, escuchar). Cada semana escribe al menos 1 párrafo en el idioma que aprendes.' },
  { emoji: '🏛️', tag: 'Memoria', text: 'Usa el "palacio de la memoria": asocia palabras nuevas con lugares que conoces. Cuando repases el recorrido mental, las palabras vuelven solas.' },
  { emoji: '🔗', tag: 'Phrasal Verbs', text: 'Los phrasal verbs se aprenden en bloques temáticos: "look up/look into/look out/look for" juntos. El cerebro retiene mejor cuando hay patrón.' },
  { emoji: '📚', tag: 'Academic', text: 'El Academic Word List (AWL) tiene 570 familias de palabras que cubren el 10% del vocabulario académico. Dominar 200 de ellas sube tu IELTS Reading un nivel.' },
  { emoji: '🔄', tag: 'Gramática', text: 'No memores reglas gramaticales: memoriza patrones en oraciones reales. "I should have studied" vs "I would have studied" — aprende los contextos, no las fórmulas.' },
  { emoji: '🇮🇹', tag: 'Italiano', text: 'Para el CILS, el italiano comparte el 80% del léxico con el español. Aprovecha eso, pero cuidado con los "falsos amigos": "burro" en italiano es mantequilla, no burro.' },
  { emoji: '🎙️', tag: 'Podcasts', text: 'Escucha el mismo episodio de podcast dos veces: la primera vez para el mensaje general, la segunda identificando conectores (however, therefore, in contrast). Doblas el aprendizaje.' },
  { emoji: '📓', tag: 'Errores', text: 'Lleva un "diario de errores": cada vez que te corrijan, escribe la versión incorrecta y la correcta. Releerlo cada semana evita cometer el mismo error dos veces.' },
  { emoji: '🇧🇷', tag: 'Celpe-Bras', text: 'El Celpe-Bras evalúa portugués en situaciones reales (describir un gráfico, dar instrucciones). Practica con textos auténticos, no con gramática aislada.' },
  { emoji: '🗓️', tag: 'Planificación', text: 'Divide tu preparación en semanas: 1–4 vocabulario, 5–8 habilidades débiles, 9–12 simulacros cronometrados. Un plan escrito triplica las probabilidades de alcanzar el objetivo.' },
]

function getDailyTip() {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
}

/* ── Reto semanal (rotación semanal) ────────────────────────────────────── */
interface Challenge {
  week: number
  tag: string
  question: string
  options: string[]
  correct: number // 0-indexed
  explanation: string
}

const WEEKLY_CHALLENGES: Challenge[] = [
  {
    week: 1, tag: 'IELTS',
    question: 'En IELTS Writing Task 2, ¿cuántas palabras mínimas se requieren?',
    options: ['150 palabras', '200 palabras', '250 palabras', '300 palabras'],
    correct: 2,
    explanation: 'Task 2 requiere mínimo 250 palabras. Task 1 requiere 150. Respuestas más cortas reciben penalización automática.',
  },
  {
    week: 2, tag: 'Coreano',
    question: '¿Cómo se dice "Hola" (saludo formal) en coreano?',
    options: ['안녕 (Annyeong)', '안녕하세요 (Annyeonghaseyo)', '감사합니다 (Gamsahamnida)', '미안해요 (Mianhaeyo)'],
    correct: 1,
    explanation: '안녕하세요 es el saludo formal estándar. 안녕 es informal entre amigos. 감사합니다 significa "gracias" y 미안해요 es "lo siento".',
  },
  {
    week: 3, tag: 'TOEFL',
    question: '¿Cuánto tiempo dura la sección de Reading del TOEFL iBT?',
    options: ['30 minutos', '45 minutos', '54 minutos', '72 minutos'],
    correct: 2,
    explanation: 'La sección de Reading del TOEFL iBT tiene 2 pasajes con 10 preguntas cada uno y dura 54 minutos.',
  },
  {
    week: 4, tag: 'Gramática',
    question: 'Elige la oración gramaticalmente correcta:',
    options: [
      'She has been study English for 3 years.',
      'She has been studying English for 3 years.',
      'She have been studying English for 3 years.',
      'She have study English for 3 years.',
    ],
    correct: 1,
    explanation: 'Se usa Present Perfect Continuous (have/has + been + V-ing) para acciones que empezaron en el pasado y continúan. "She" usa "has".',
  },
  {
    week: 5, tag: 'ICFES',
    question: '¿Cuántas preguntas de inglés tiene el ICFES Saber 11?',
    options: ['30 preguntas', '45 preguntas', '55 preguntas', '60 preguntas'],
    correct: 1,
    explanation: 'La prueba de Inglés del ICFES Saber 11 tiene 45 preguntas. Evalúa habilidades de Reading y escucha con 90 minutos.',
  },
  {
    week: 6, tag: 'Vocabulario',
    question: '¿Cuál es el sinónimo más preciso de "substantial"?',
    options: ['Small', 'Considerable', 'Beautiful', 'Quick'],
    correct: 1,
    explanation: '"Substantial" significa "considerable" o "significativo". Dominar sinónimos formales es clave para IELTS Band 7+.',
  },
  {
    week: 7, tag: 'Coreano',
    question: '¿Cuántas vocales básicas tiene el alfabeto coreano (한글)?',
    options: ['8', '10', '14', '21'],
    correct: 1,
    explanation: 'Hangeul tiene 10 vocales básicas y 14 consonantes básicas. Las vocales adicionales son combinaciones de estas.',
  },
  {
    week: 8, tag: 'IELTS',
    question: '¿Cuántos módulos evalúa el IELTS Academic?',
    options: ['2', '3', '4', '5'],
    correct: 2,
    explanation: 'IELTS evalúa 4 módulos: Listening, Reading, Writing y Speaking. La duración total es aproximadamente 2 horas y 45 minutos.',
  },
  {
    week: 9, tag: 'Coreano',
    question: '¿Qué partícula coreana se usa para marcar el objeto directo de un verbo?',
    options: ['이/가 (i/ga)', '은/는 (eun/neun)', '을/를 (eul/reul)', '에서 (eseo)'],
    correct: 2,
    explanation: '을/를 marca el objeto directo: "사과를 먹어요" (como manzana). 이/가 es el sujeto, 은/는 es el tema, y 에서 indica lugar donde ocurre la acción.',
  },
  {
    week: 10, tag: 'IELTS Reading',
    question: 'En IELTS Reading, ¿qué significa la respuesta "Not Given"?',
    options: [
      'La información en el texto es falsa.',
      'La pregunta está mal formulada.',
      'El texto no menciona esa información.',
      'La respuesta es correcta pero incompleta.',
    ],
    correct: 2,
    explanation: '"Not Given" significa que el texto simplemente no incluye esa información — ni la confirma ni la contradice. No uses conocimiento externo para decidir.',
  },
  {
    week: 11, tag: 'ICFES',
    question: '¿Qué puntaje de inglés en el ICFES corresponde al nivel B+ (nivel 4)?',
    options: ['Menos de 50 puntos', '50–69 puntos', '70–84 puntos', '85–100 puntos'],
    correct: 2,
    explanation: 'En el ICFES, el nivel B+ (nivel 4) corresponde a puntajes entre 70 y 84. Nivel A- (1) es 0–30, A (2) es 31–49, A+ (3) es 50–69, B+ (4) es 70–84, B+ alto (5) es 85–100.',
  },
  {
    week: 12, tag: 'DELF',
    question: '¿En qué nivel del DELF se exige producción oral y escrita autónoma en francés?',
    options: ['DELF A1', 'DELF A2', 'DELF B1', 'DELF B2'],
    correct: 3,
    explanation: 'El DELF B2 exige expresión oral y escrita verdaderamente autónoma: argumentación desarrollada, comprensión de textos complejos y discurso coherente sin apoyo.',
  },
]

function getWeeklyChallenge(): Challenge {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const weekNumber = Math.floor((now.getTime() - startOfYear.getTime()) / (7 * 86400000))
  return WEEKLY_CHALLENGES[weekNumber % WEEKLY_CHALLENGES.length]
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function StudentDashboardClient({ name, plan, streak, stats, recentExams, koreanLessons }: Props) {
  const [sideOpen, setSideOpen] = useState(false)
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null)
  const initial = name[0]?.toUpperCase() ?? 'E'
  const dailyTip = getDailyTip()
  const weeklyChallenge = getWeeklyChallenge()

  const STATS: { num: string; label: string; icon: ReactNode }[] = [
    { num: String(stats?.simulacros ?? 0),   label: 'Simulacros',  icon: IC.clipboard2 },
    { num: stats?.mejorScore ? `${stats.mejorScore}%` : '—', label: 'Mejor score', icon: IC.trophy },
    { num: String(stats?.diasActivo ?? 0),   label: 'Días activo', icon: IC.flame      },
    { num: recentExams?.length ? String(recentExams.length) : '—', label: 'Recientes', icon: IC.pencil },
  ]

  // Use real exam data when available, fall back to placeholder list
  const examProgress: typeof IN_PROGRESS = recentExams && recentExams.length > 0
    ? recentExams.map(e => ({ ...e, mockId: '' }))
    : IN_PROGRESS

  return (
    <div className="std-shell">

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className={`std-sidebar${sideOpen ? ' std-sidebar--open' : ''}`}>
        <div className="std-sidebar__brand">
          <div className="std-sidebar__brand-pill">WeLearn</div>
        </div>

        <nav className="std-sidebar__nav">
          {NAV.map(({ group, items }) => (
            <div key={group} className="std-nav-group">
              <p className="std-nav-group__label">{group}</p>
              {items.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`std-nav-item${item.active ? ' std-nav-item--active' : ''}`}
                >
                  <span className="std-nav-item__icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="std-sidebar__footer">
          <div className="std-sidebar__user">
            <div className="std-sidebar__avatar">{initial}</div>
            <div className="std-sidebar__user-info">
              <p className="std-sidebar__user-name">{name}</p>
              <p className="std-sidebar__user-role">Estudiante</p>
            </div>
          </div>
          <form action={signOut} style={{ marginTop: 10 }}>
            <button type="submit" style={{
              width: '100%', padding: '7px 0', borderRadius: 8,
              border: '1px solid rgba(200,32,46,0.2)',
              background: 'rgba(200,32,46,0.06)', color: '#c8202e',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.15s',
            }}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────────────────────────── */}
      <main className="std-main">

        {/* Mobile topbar */}
        <div className="std-topbar">
          <button className="std-topbar__toggle" onClick={() => setSideOpen(o => !o)} aria-label="Menú">
            <span /><span /><span />
          </button>
          <span className="std-topbar__title">WeLearn</span>
          <div className="std-topbar__avatar">{initial}</div>
        </div>

        <div className="std-content">

          {/* ── Greeting ── */}
          <div className="std-greeting">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <h1 className="std-greeting__h1" style={{ margin: 0 }}>Bienvenido/a, {name}</h1>
                <span style={{
                  fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em',
                  padding: '3px 9px', borderRadius: 100,
                  background: PLAN_COLORS[plan] + '18',
                  color: PLAN_COLORS[plan],
                  border: `1px solid ${PLAN_COLORS[plan]}44`,
                  whiteSpace: 'nowrap',
                }}>
                  {PLAN_LABELS[plan]}
                </span>
              </div>
              <p className="std-greeting__sub">
                {stats?.simulacros
                  ? `${stats.simulacros} simulacro${stats.simulacros !== 1 ? 's' : ''} completado${stats.simulacros !== 1 ? 's' : ''} · Sigue practicando`
                  : 'Bienvenido/a · Empieza tu primer simulacro'}
              </p>
            </div>
            <Link href="/examenes" className="btn btn-sm std-greeting__cta">
              + Nuevo examen
            </Link>
          </div>

          {/* ── KPI strip ── */}
          <div className="std-kpi-row">
            {STATS.map(s => (
              <div key={s.label} className="std-kpi-card">
                <span className="std-kpi-card__icon">{s.icon}</span>
                <p className="std-kpi-card__num">{s.num}</p>
                <p className="std-kpi-card__label">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Two-column layout ── */}
          <div className="std-body-grid">

            {/* LEFT COLUMN */}
            <div className="std-col-main">

              {/* Korean lessons quick access */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">🇰🇷 Lecciones de coreano</h2>
                  <Link href="/leccion" className="std-section__link">Ver todas →</Link>
                </div>
                <div className="std-korean-grid">
                  {(koreanLessons ?? [
                    { day: 1, title: 'Annyeonghaseyo', sub: 'Saludos básicos', done: false },
                    { day: 2, title: 'Café I', sub: 'Pedir bebidas', done: false },
                    { day: 3, title: 'Café II', sub: 'Vocabulario extendido', done: false },
                    { day: 4, title: 'Café III', sub: 'Demostrativos + números', done: false },
                    { day: 6, title: 'Mercado', sub: 'Compras y precios', done: false },
                    { day: 7, title: 'Transporte', sub: 'Cómo pedir taxi', done: false },
                  ]).map(lesson => (
                    <Link
                      key={lesson.day}
                      href={`/courses/korean/step/${lesson.day}`}
                      className={`std-kr-card${lesson.done ? ' std-kr-card--done' : ''}`}
                    >
                      <div className="std-kr-card__day">Día {lesson.day}</div>
                      <div className="std-kr-card__title">{lesson.title}</div>
                      <div className="std-kr-card__sub">{lesson.sub}</div>
                      {lesson.done && <div className="std-kr-card__check">✓</div>}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Continue practicing */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">
                    {recentExams && recentExams.length > 0 ? 'Tus últimos simulacros' : 'Continúa practicando'}
                  </h2>
                  <Link href="/examenes" className="std-section__link">Ver todos →</Link>
                </div>
                <div className="std-progress-list">
                  {examProgress.map(ex => (
                    <Link
                      key={`${ex.name}-${ex.subtitle}`}
                      href={`/examenes/${ex.slug}`}
                      className="std-progress-card"
                    >
                      <div className="std-progress-card__top">
                        <div>
                          <p className="std-progress-card__name">{ex.name}</p>
                          <p className="std-progress-card__sub">{ex.subtitle}</p>
                        </div>
                        <span className="std-progress-card__pct" style={{ color: ex.color }}>
                          {ex.pct}%
                        </span>
                      </div>
                      <div className="std-progress-track">
                        <div
                          className="std-progress-fill"
                          style={{ width: `${ex.pct}%`, background: ex.color }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recommended */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">Recomendado para ti</h2>
                </div>
                <div className="std-rec-grid">
                  {RECOMMENDED.map(ex => (
                    <Link key={ex.name} href={`/examenes/${ex.slug}`} className="std-rec-card">
                      <span className="std-rec-card__badge" style={{ color: ex.color, borderColor: ex.color }}>
                        {ex.badge}
                      </span>
                      <p className="std-rec-card__name">{ex.name}</p>
                      <p className="std-rec-card__lang">{ex.lang}</p>
                      <p className="std-rec-card__mocks">{ex.mocks} disponible</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Reto semanal */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">🏆 Reto de la semana</h2>
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', padding: '3px 8px', borderRadius: 20 }}>
                    {weeklyChallenge.tag}
                  </span>
                </div>
                <div className="std-challenge-card">
                  <p className="std-challenge-q">{weeklyChallenge.question}</p>
                  <div className="std-challenge-opts">
                    {weeklyChallenge.options.map((opt, i) => {
                      let optClass = 'std-challenge-opt'
                      if (challengeAnswer !== null) {
                        if (i === weeklyChallenge.correct) optClass += ' std-challenge-opt--correct'
                        else if (i === challengeAnswer && i !== weeklyChallenge.correct) optClass += ' std-challenge-opt--wrong'
                        else optClass += ' std-challenge-opt--dim'
                      }
                      return (
                        <button
                          key={i}
                          className={optClass}
                          onClick={() => { if (challengeAnswer === null) setChallengeAnswer(i) }}
                          disabled={challengeAnswer !== null}
                        >
                          <span className="std-challenge-opt__letter">{['A','B','C','D'][i]}</span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {challengeAnswer !== null && (
                    <div className={`std-challenge-exp${challengeAnswer === weeklyChallenge.correct ? ' std-challenge-exp--correct' : ' std-challenge-exp--wrong'}`}>
                      <strong>{challengeAnswer === weeklyChallenge.correct ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong>
                      <span> — {weeklyChallenge.explanation}</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Resources */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">Recursos</h2>
                </div>
                <div className="std-resources-grid">
                  {RESOURCES.map(r => (
                    <Link key={r.label} href={r.href} className="std-resource-card">
                      <span className="std-resource-card__icon">{r.icon}</span>
                      <span className="std-resource-card__label">{r.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="std-col-side">

              {/* Tip del día */}
              <div className="std-widget std-tip-widget">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{dailyTip.emoji}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#1a2ecc' }}>Tip del día</p>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{dailyTip.tag}</p>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ink)', lineHeight: 1.55 }}>{dailyTip.text}</p>
              </div>

              {/* Streak */}
              <div className="std-widget std-streak">
                <div className="std-streak__header">
                  <span className="std-streak__fire">{IC.flame}</span>
                  <div>
                    <p className="std-streak__num">{streak > 0 ? `${streak} día${streak !== 1 ? 's' : ''}` : '0 días'}</p>
                    <p className="std-streak__label">racha activa</p>
                  </div>
                </div>
                <p className="std-streak__hint">
                  {streak >= 7
                    ? `¡Increíble! ${streak} días seguidos. ¡No la pierdas!`
                    : streak > 0
                    ? '¡Practica hoy para seguir tu racha!'
                    : 'Empieza hoy y construye tu racha.'}
                </p>
                <div className="std-streak__days">
                  {['L','M','M','J','V','S','D'].map((d, i) => {
                    // Mark last `streak` days as done (simplified visual)
                    const today = new Date().getDay() // 0=Sun,1=Mon...
                    const dayIndex = [1,2,3,4,5,6,0][i] // Mon=0 → index 1
                    const diff = (today - dayIndex + 7) % 7
                    const done = diff < streak
                    return (
                      <div key={i} className={`std-streak__day${done ? ' std-streak__day--done' : ''}`}>
                        <div className="std-streak__day-dot" />
                        <span>{d}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Plan-gated: Feedback (Preparación+) */}
              {plan === 'autodidacta' ? (
                <div className="std-widget std-lock-card">
                  <p className="std-lock-card__eyebrow">🔒 Plan Preparación</p>
                  <p className="std-lock-card__title">Feedback de tu tutor</p>
                  <p className="std-lock-card__desc">
                    Con Preparación recibes correcciones escritas de cada simulacro y acceso directo a tu tutor.
                  </p>
                  <a
                    href="https://wa.me/573005004253?text=Hola%2C%20quiero%20conocer%20el%20plan%20Preparaci%C3%B3n%20de%20WeLearn."
                    target="_blank" rel="noopener noreferrer"
                    className="std-upgrade__btn"
                    style={{ display: 'inline-block', marginTop: 4 }}
                  >
                    Ver plan Preparación →
                  </a>
                </div>
              ) : (
                <div className="std-widget">
                  <p className="std-widget__title">Feedback pendiente</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
                    Tu tutor revisará tus próximos simulacros y dejará comentarios aquí.
                  </p>
                  <a
                    href="https://wa.me/573005004253?text=Hola%2C%20tengo%20preguntas%20sobre%20mi%20simulacro%20reciente%20en%20WeLearn."
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginTop: 10, fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    Preguntar al tutor →
                  </a>
                </div>
              )}

              {/* Plan-gated: Sesiones en vivo (Intensivo) */}
              {plan !== 'intensivo' ? (
                <div className="std-widget std-lock-card">
                  <p className="std-lock-card__eyebrow">🔒 Plan Intensivo</p>
                  <p className="std-lock-card__title">Sesiones en vivo</p>
                  <p className="std-lock-card__desc">
                    Clases 1:1 con tutor asignado, plan de estudio personalizado y evaluación mensual.
                  </p>
                  <a
                    href="https://wa.me/573005004253?text=Hola%2C%20quiero%20conocer%20el%20plan%20Intensivo%20de%20WeLearn."
                    target="_blank" rel="noopener noreferrer"
                    className="std-upgrade__btn"
                    style={{ display: 'inline-block', marginTop: 4 }}
                  >
                    Ver plan Intensivo →
                  </a>
                </div>
              ) : (
                <div className="std-widget" style={{ background: 'linear-gradient(135deg, #0f7c3e 0%, #1a6e3c 100%)', border: 'none' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', margin: '0 0 6px' }}>Plan Intensivo</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Sesiones en vivo</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '0 0 12px', lineHeight: 1.5 }}>
                    Agenda tu próxima sesión con tu tutor.
                  </p>
                  <a
                    href="https://wa.me/573005004253?text=Hola%2C%20quiero%20agendar%20mi%20pr%C3%B3xima%20sesi%C3%B3n%20en%20vivo%20con%20WeLearn."
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '7px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
                  >
                    Agendar sesión →
                  </a>
                </div>
              )}

              {/* Skills radar */}
              <div className="std-widget">
                <p className="std-widget__title">Habilidades</p>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={RADAR_DATA} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
                    <PolarGrid stroke="var(--line-soft)" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: 'var(--mono)' }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Habilidad"
                      dataKey="value"
                      stroke="#c8202e"
                      fill="#c8202e"
                      fillOpacity={0.18}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg)',
                        border: '1px solid var(--line-soft)',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Upgrade CTA */}
              <div className="std-widget std-upgrade">
                <p className="std-upgrade__eyebrow">¿Quieres más?</p>
                <p className="std-upgrade__title">Plan con tutor asignado</p>
                <p className="std-upgrade__desc">
                  Sesiones en vivo, plan personalizado y corrección real de tus respuestas.
                </p>
                <a
                  href="https://wa.me/573005004253?text=Hola%2C%20quiero%20conocer%20los%20planes%20con%20tutor%20de%20WeLearn."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="std-upgrade__btn"
                >
                  Hablar con un tutor →
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <style>{`
        /* Shell */
        .std-shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg-2);
        }

        /* ── Sidebar ── */
        .std-sidebar {
          width: 220px;
          min-width: 220px;
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border-right: 1px solid rgba(20,33,92,0.10);
          box-shadow: 2px 0 24px rgba(20,33,92,0.06);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 40;
        }
        .std-sidebar__brand {
          display: flex;
          align-items: center;
          padding: 16px 14px 14px;
          border-bottom: 1px solid rgba(20,33,92,0.08);
        }
        .std-sidebar__brand-pill {
          background: linear-gradient(135deg, #14215c 0%, #1e3080 100%);
          color: #fff;
          border-radius: 14px;
          padding: 12px 16px;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: -0.02em;
          width: 100%;
          text-align: center;
        }
        .std-sidebar__nav {
          flex: 1;
          padding: 12px 10px;
          overflow-y: auto;
        }
        .std-nav-group {
          margin-bottom: 20px;
        }
        .std-nav-group__label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          padding: 0 8px;
          margin: 0 0 6px;
        }
        .std-nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--muted);
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
          margin-bottom: 2px;
        }
        .std-nav-item:hover {
          background: var(--bg-2);
          color: var(--ink);
        }
        .std-nav-item--active {
          background: #fff0f0;
          color: #c8202e;
          font-weight: 600;
        }
        @media (prefers-color-scheme: dark) {
          .std-nav-item--active { background: rgba(200,32,46,0.12); }
        }
        .std-nav-item__icon { font-size: 14px; width: 18px; text-align: center; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .std-sidebar__footer {
          padding: 14px 14px 18px;
          border-top: 1px solid var(--line-soft);
        }
        .std-sidebar__user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .std-sidebar__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #c8202e;
          color: #fff;
          font-weight: 800;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .std-sidebar__user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 130px;
        }
        .std-sidebar__user-role {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }

        /* ── Main ── */
        .std-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .std-topbar {
          display: none;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: var(--bg);
          border-bottom: 1px solid var(--line-soft);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .std-topbar__toggle {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
        }
        .std-topbar__toggle span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--ink);
          border-radius: 1px;
        }
        .std-topbar__title {
          font-weight: 700;
          font-size: 15px;
          color: var(--ink);
          flex: 1;
        }
        .std-topbar__avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #c8202e;
          color: #fff;
          font-weight: 800;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .std-content {
          padding: 28px 28px 48px;
          max-width: 1100px;
          width: 100%;
        }

        /* ── Greeting ── */
        .std-greeting {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .std-greeting__h1 {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .std-greeting__sub {
          font-size: 13px;
          color: var(--muted);
          margin: 0;
        }
        .std-greeting__cta {
          white-space: nowrap;
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }

        /* ── KPI strip ── */
        .std-kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .std-kpi-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(20,33,92,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .std-kpi-card__icon { font-size: 18px; margin-bottom: 4px; display: flex; align-items: center; color: var(--muted); }
        .std-kpi-card__num {
          font-size: 24px;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1;
        }
        .std-kpi-card__label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }

        /* ── Body grid ── */
        .std-body-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          align-items: start;
        }

        /* ── Sections ── */
        .std-section { margin-bottom: 24px; }
        .std-section__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .std-section__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .std-section__link {
          font-size: 12px;
          color: var(--muted);
          font-weight: 500;
        }

        /* ── Korean lessons grid ── */
        .std-korean-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .std-kr-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 14px;
          padding: 14px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 3px;
          position: relative;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .std-kr-card:hover {
          box-shadow: 0 8px 28px rgba(20,33,92,0.13), inset 0 1px 0 rgba(255,255,255,0.9);
          border-color: rgba(200,32,46,0.35);
          transform: translateY(-2px);
        }
        .std-kr-card--done {
          background: rgba(200,32,46,0.04);
          border-color: rgba(200,32,46,0.2);
        }
        .std-kr-card__day {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
          font-family: var(--mono);
        }
        .std-kr-card__title {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          margin-top: 2px;
        }
        .std-kr-card__sub {
          font-size: 11px;
          color: var(--muted);
        }
        .std-kr-card__check {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #22c55e;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .std-korean-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .std-korean-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Progress cards ── */
        .std-progress-list { display: flex; flex-direction: column; gap: 10px; }
        .std-progress-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(20,33,92,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
          padding: 16px 18px;
          text-decoration: none;
          display: block;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .std-progress-card:hover {
          box-shadow: 0 8px 28px rgba(20,33,92,0.13), inset 0 1px 0 rgba(255,255,255,0.9);
          border-color: rgba(200,32,46,0.35);
          transform: translateY(-2px);
        }
        .std-progress-card__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .std-progress-card__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 2px;
        }
        .std-progress-card__sub {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }
        .std-progress-card__pct {
          font-size: 13px;
          font-weight: 700;
          font-family: var(--mono);
        }
        .std-progress-track {
          height: 5px;
          background: var(--line-soft);
          border-radius: 3px;
          overflow: hidden;
        }
        .std-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s ease;
        }

        /* ── Recommended grid ── */
        .std-rec-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .std-rec-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(20,33,92,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
          padding: 16px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .std-rec-card:hover {
          box-shadow: 0 8px 28px rgba(20,33,92,0.13), inset 0 1px 0 rgba(255,255,255,0.9);
          border-color: rgba(200,32,46,0.35);
          transform: translateY(-2px);
        }
        .std-rec-card__badge {
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border: 1px solid;
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 6px;
        }
        .std-rec-card__name {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .std-rec-card__lang {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }
        .std-rec-card__mocks {
          font-size: 11px;
          color: var(--muted);
          margin: 4px 0 0;
          font-family: var(--mono);
        }

        /* ── Resources ── */
        .std-resources-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .std-resource-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(20,33,92,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .std-resource-card:hover {
          box-shadow: 0 8px 28px rgba(20,33,92,0.13), inset 0 1px 0 rgba(255,255,255,0.9);
          border-color: rgba(20,33,92,0.18);
          transform: translateY(-2px);
        }
        .std-resource-card__icon { font-size: 20px; display: flex; align-items: center; justify-content: center; color: var(--muted); }
        .std-resource-card__label {
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          text-align: center;
        }

        /* ── Widgets (right column) ── */
        .std-col-side { display: flex; flex-direction: column; gap: 14px; }
        .std-widget {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(20,33,92,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
          padding: 18px;
        }
        .std-widget__title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          margin: 0 0 12px;
        }

        /* Streak widget */
        .std-streak__header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .std-streak__fire { display: flex; align-items: center; width: 28px; height: 28px; color: #f97316; flex-shrink: 0; }
        .std-streak__fire svg { width: 28px; height: 28px; }
        .std-streak__num {
          font-size: 20px;
          font-weight: 800;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.03em;
        }
        .std-streak__label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }
        .std-streak__hint {
          font-size: 12px;
          color: var(--muted);
          margin: 0 0 14px;
          line-height: 1.4;
        }
        .std-streak__days {
          display: flex;
          justify-content: space-between;
        }
        .std-streak__day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: var(--muted);
          font-family: var(--mono);
          font-weight: 600;
        }
        .std-streak__day-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--line-soft);
        }
        .std-streak__day--done .std-streak__day-dot {
          background: #f97316;
        }
        .std-streak__day--done {
          color: #f97316;
        }

        /* Rank widget */
        .std-rank__header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .std-rank__badge { display: flex; align-items: center; width: 24px; height: 24px; color: #f59e0b; flex-shrink: 0; }
        .std-rank__badge svg { width: 24px; height: 24px; }
        .std-rank__label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }
        .std-rank__num {
          font-size: 16px;
          font-weight: 800;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .std-rank__bar-track {
          height: 6px;
          background: var(--line-soft);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .std-rank__bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #1a2ecc, #c8202e);
          border-radius: 3px;
        }
        .std-rank__hint {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }

        /* Tip del día */
        .std-tip-widget {
          background: linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%);
          border: 1px solid rgba(26,46,204,0.15);
        }

        /* Reto semanal */
        .std-challenge-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px solid rgba(20,33,92,0.10);
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(20,33,92,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
          padding: 20px;
        }
        .std-challenge-q {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 16px;
          line-height: 1.5;
          letter-spacing: -0.01em;
        }
        .std-challenge-opts {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
        }
        .std-challenge-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid var(--line-soft);
          background: var(--bg);
          text-align: left;
          font-size: 13px;
          color: var(--ink);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          font-weight: 500;
        }
        .std-challenge-opt:hover:not(:disabled) {
          border-color: rgba(26,46,204,0.4);
          background: #f0f3ff;
        }
        .std-challenge-opt--correct {
          border-color: #16a34a !important;
          background: #f0fdf4 !important;
          color: #15803d;
          font-weight: 600;
        }
        .std-challenge-opt--wrong {
          border-color: #dc2626 !important;
          background: #fef2f2 !important;
          color: #b91c1c;
        }
        .std-challenge-opt--dim {
          opacity: 0.45;
        }
        .std-challenge-opt__letter {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: var(--bg-2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          font-family: var(--mono);
          color: var(--muted);
          flex-shrink: 0;
        }
        .std-challenge-exp {
          font-size: 12px;
          line-height: 1.5;
          border-radius: 8px;
          padding: 10px 12px;
          margin-top: 4px;
        }
        .std-challenge-exp--correct {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }
        .std-challenge-exp--wrong {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        /* Lock card (plan gate) */
        .std-lock-card {
          background: rgba(248,247,255,0.72);
          backdrop-filter: blur(28px) saturate(2);
          -webkit-backdrop-filter: blur(28px) saturate(2);
          border: 1px dashed rgba(20,33,92,0.18);
        }
        .std-lock-card__eyebrow {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
          margin: 0 0 6px;
        }
        .std-lock-card__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .std-lock-card__desc {
          font-size: 12px;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }

        /* Upgrade widget */
        .std-upgrade {
          background: linear-gradient(135deg, #14215c 0%, #1a2ecc 100%);
          border: none;
          color: #fff;
        }
        .std-upgrade__eyebrow {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.6);
          margin: 0 0 6px;
        }
        .std-upgrade__title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .std-upgrade__desc {
          font-size: 12px;
          color: rgba(255,255,255,0.72);
          margin: 0 0 16px;
          line-height: 1.5;
        }
        .std-upgrade__btn {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s;
        }
        .std-upgrade__btn:hover { background: rgba(255,255,255,0.25); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .std-body-grid { grid-template-columns: 1fr; }
          .std-col-side {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .std-sidebar { display: none; }
          .std-sidebar--open {
            display: flex;
            position: fixed;
            top: 0; left: 0;
            height: 100vh;
            box-shadow: 4px 0 24px rgba(0,0,0,0.12);
          }
          .std-topbar { display: flex; }
          .std-content { padding: 16px 16px 40px; }
          .std-kpi-row { grid-template-columns: repeat(2, 1fr); }
          .std-rec-grid { grid-template-columns: 1fr; }
          .std-col-side { grid-template-columns: 1fr; }
          .std-resources-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .std-kpi-row { grid-template-columns: repeat(2, 1fr); }
          .std-resources-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  )
}
