// Commercial selection only. Never use this browser summary as payment authority.
// Wompi's legacy catalog and previously sold offers are intentionally independent.
export const CATALOG_VERSION = 'classes-4w-20260906';
export const PLANS = [
  { id: 'esencial', name: 'Esencial', weekly: 1, price: 320000, description: 'Un espacio semanal para tu idioma.' },
  { id: 'constancia', name: 'Constancia', weekly: 2, price: 540000, description: 'Un ritmo que puedes sostener.' },
  { id: 'impulso', name: 'Impulso', weekly: 3, price: 760000, description: 'Más encuentros para avanzar.' },
  { id: 'intensivo', name: 'Intensivo', weekly: 4, price: 960000, description: 'El idioma dentro de tu rutina.' },
  { id: 'diario', name: 'Diario', weekly: 5, price: 1160000, description: 'Una clase cada día entre semana.' },
] as const;
export type CoursePlanId = (typeof PLANS)[number]['id'];

// These are interests to discuss, not verified teacher availability or exam registration.
export const LANGUAGES = [
  { id: 'ingles', name: 'Inglés', exams: ['IELTS Academic', 'IELTS General Training', 'TOEFL iBT', 'ICFES inglés', 'SAT Reading and Writing'] },
  { id: 'coreano', name: 'Coreano', exams: ['TOPIK I', 'TOPIK II'] },
  { id: 'frances', name: 'Francés', exams: ['DELF', 'DALF'] },
  { id: 'aleman', name: 'Alemán', exams: ['Goethe'] },
  { id: 'italiano', name: 'Italiano', exams: ['CILS', 'CELI'] },
  { id: 'portugues', name: 'Portugués', exams: ['CELPE-Bras'] },
  { id: 'japones', name: 'Japonés', exams: ['JLPT'] },
  { id: 'ruso', name: 'Ruso', exams: ['TORFL / TRKI'] },
] as const;
export const LEVELS = ['No sé mi nivel', 'Empiezo desde cero', 'Básico', 'Intermedio', 'Avanzado'] as const;
export type Selection = { language: string; objective: string; plan: string; level: string };
export type Query = Record<string, string | string[] | undefined>;
export const DEFAULT_SELECTION: Selection = { language: 'ingles', objective: 'general', plan: 'constancia', level: LEVELS[0] };
export function objectivesFor(languageId: string): string[] {
  const language = LANGUAGES.find(l => l.id === languageId);
  return ['general', ...(language?.exams ?? [])];
}
export function objectiveLabel(objective: string) {
  return objective === 'general' ? 'Idioma general' : objective;
}
export function parseSelection(query: Query): { selection: Selection; corrected: boolean } {
  const selection = { ...DEFAULT_SELECTION };
  let corrected = false;
  const fields = { idioma: 'language', objetivo: 'objective', plan: 'plan', nivel: 'level' } as const;
  for (const [key, field] of Object.entries(fields)) {
    const value = query[key];
    if (value === undefined) continue;
    const allowed: readonly string[] = field === 'language' ? LANGUAGES.map(l => l.id)
      : field === 'objective' ? objectivesFor(selection.language)
      : field === 'plan' ? PLANS.map(p => p.id) : LEVELS;
    if (typeof value === 'string' && allowed.includes(value)) selection[field] = value;
    else corrected = true;
  }
  return { selection, corrected };
}
export function selectionDetails(selection: Selection) {
  const language = LANGUAGES.find(l => l.id === selection.language);
  const plan = PLANS.find(p => p.id === selection.plan);
  if (!language || !plan || !objectivesFor(language.id).includes(selection.objective) || !(LEVELS as readonly string[]).includes(selection.level)) {
    throw new Error('Selección de curso inválida');
  }
  return { language, plan, classes: plan.weekly * 4, sessions: plan.weekly * 8 };
}
export function formatCOP(amount: number) { return '$' + amount.toLocaleString('es-CO'); }
export function selectionPath(selection: Selection) {
  selectionDetails(selection);
  return '/precios?' + new URLSearchParams({ idioma: selection.language, objetivo: selection.objective, plan: selection.plan, nivel: selection.level }).toString();
}
export function selectionSummary(selection: Selection) {
  const { language, plan, classes, sessions } = selectionDetails(selection);
  return [
    'Hola, esta es mi selección de clases en WeLearn:',
    `Idioma: ${language.name}`, `Objetivo: ${objectiveLabel(selection.objective)}`,
    `Nivel declarado: ${selection.level}`, `Plan: ${plan.name}`,
    `${plan.weekly} ${plan.weekly === 1 ? 'clase' : 'clases'} por semana · ${classes} clases en cuatro semanas`,
    `Cada clase: 100 minutos (2 sesiones de 50 minutos). Total: ${sessions} sesiones.`,
    `Precio del ciclo: ${formatCOP(plan.price)} COP. Sin renovación automática.`,
    'Quiero orientación para continuar con este curso.',
  ].join('\n');
}
export function whatsappLink(selection: Selection) {
  return 'https://wa.me/573005004253?text=' + encodeURIComponent(selectionSummary(selection));
}
