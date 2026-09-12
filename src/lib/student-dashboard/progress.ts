import type { StudentAttempt, StudentProgressSummary, StudentSkillScore } from './types';

type SkillSource = Readonly<{ skill?: unknown; name?: unknown; score?: unknown; max?: unknown }>;

export function parseSkillScores(value: unknown): StudentSkillScore[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return [];
    const source = entry as SkillSource;
    const name = typeof source.skill === 'string' ? source.skill.trim() : typeof source.name === 'string' ? source.name.trim() : '';
    const score = Number(source.score);
    const maximum = Number(source.max);
    if (!name || !Number.isFinite(score) || !Number.isFinite(maximum) || maximum <= 0) return [];
    const percentage = Math.max(0, Math.min(100, Math.round((score / maximum) * 100)));
    return [{ name, score, maximum, percentage }];
  });
}

function activitySummary(activityDates: readonly string[], now: Date) {
  const unique = [...new Set(activityDates.filter(Boolean).map((date) => date.slice(0, 10)))].sort().reverse();
  const todayKey = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
  const today = new Date(`${todayKey}T12:00:00.000Z`);
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 29);
  const activeDaysLast30 = unique.filter((date) => {
    const value = new Date(`${date}T12:00:00.000Z`);
    return value >= start && value <= today;
  }).length;
  const active = new Set(unique);
  const cursor = new Date(today);
  if (!active.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let currentStreak = 0;
  while (active.has(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return { activeDaysLast30, currentStreak, lastActiveAt: unique[0] ? `${unique[0]}T12:00:00.000Z` : null };
}

export function buildStudentProgress(
  attempts: readonly StudentAttempt[],
  preferredExamSlug?: string | null,
  activityDates: readonly string[] = [],
  now = new Date(),
): StudentProgressSummary {
  const latest = attempts[0];
  const examSlug = preferredExamSlug && attempts.some((attempt) => attempt.examSlug === preferredExamSlug)
    ? preferredExamSlug
    : latest?.examSlug ?? preferredExamSlug ?? null;
  const scoped = attempts.filter((attempt) => !examSlug || attempt.examSlug === examSlug);
  const scored = scoped.filter((attempt): attempt is StudentAttempt & { score: number } => attempt.score !== null)
    .slice().sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  const points = scored.map((attempt) => ({ id: attempt.id, title: attempt.title, createdAt: attempt.createdAt, score: attempt.score }));
  const averageScore = points.length ? Math.round(points.reduce((sum, point) => sum + point.score, 0) / points.length) : null;
  const trendPoints = points.length > 1 ? points.at(-1)!.score - points[0].score : null;

  const skills = new Map<string, { total: number; measurements: number }>();
  for (const attempt of scoped) {
    for (const skill of attempt.skills) {
      const current = skills.get(skill.name) ?? { total: 0, measurements: 0 };
      current.total += skill.percentage;
      current.measurements += 1;
      skills.set(skill.name, current);
    }
  }
  const ranked = [...skills.entries()].map(([name, value]) => ({
    name,
    percentage: Math.round(value.total / value.measurements),
    measurements: value.measurements,
  }));
  const strengths = ranked.slice().sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name)).slice(0, 2);
  const strengthNames = new Set(strengths.map((item) => item.name));
  const improvements = ranked.slice().sort((a, b) => a.percentage - b.percentage || a.name.localeCompare(b.name))
    .filter((item) => !strengthNames.has(item.name) || ranked.length <= 2).slice(0, 2);
  const activity = activitySummary(activityDates, now);

  return {
    examSlug,
    examName: scoped[0]?.examName ?? null,
    points,
    averageScore,
    trendPoints,
    strengths,
    improvements,
    ...activity,
  };
}
