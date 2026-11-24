export const AGENDA_PATH = '/dashboard/admin/agenda';
export const BOGOTA = 'America/Bogota';
export const TEACHERS = { jose: 'José David', zhanna: 'Zhanna' } as const;
export type Teacher = keyof typeof TEACHERS;

const DAY = 86_400_000;
const WEEK = 7 * DAY;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type Lesson = {
  id: string;
  title: string;
  participant: string;
  teacher: Teacher;
  starts_at: string;
  ends_at: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  updated_at: string;
};

export function isRecordId(value: string): boolean {
  return UUID.test(value);
}

export function parseDay(value: string): Date | null {
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(value)) return null;
  const day = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(day.getTime()) && day.toISOString().startsWith(value) ? day : null;
}

export function bogotaDay(now = new Date()): string {
  return new Date(now.getTime() - 5 * 3_600_000).toISOString().slice(0, 10);
}

export function dayAtOffset(day: string, offset: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + offset * DAY).toISOString().slice(0, 10);
}

export function weekOf(day: string) {
  const parsed = parseDay(day) ?? parseDay(bogotaDay())!;
  const date = parsed.toISOString().slice(0, 10);
  const first = dayAtOffset(date, -((parsed.getUTCDay() + 6) % 7));
  return { first, next: dayAtOffset(first, 7), days: Array.from({ length: 7 }, (_, index) => dayAtOffset(first, index)) };
}

export function bogotaDateTime(value: string): string {
  return new Date(Date.parse(value) - 5 * 3_600_000).toISOString().slice(0, 16);
}

export function googleCalendarDraft(lesson: Pick<Lesson, 'starts_at' | 'ends_at'>): string {
  const compact = (value: string) => new Date(value).toISOString().replace(/[-:]|\.\d+/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Clase · Idiomas WeLearn',
    dates: `${compact(lesson.starts_at)}/${compact(lesson.ends_at)}`,
    ctz: BOGOTA,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function parseLessonForm(form: FormData) {
  const title = String(form.get('title') ?? '').trim();
  const participant = String(form.get('participant') ?? '').trim();
  const teacher = String(form.get('teacher') ?? '');
  const localStart = String(form.get('startsAt') ?? '');
  const duration = Number(form.get('duration'));
  const weeks = Number(form.get('weeks') ?? 1);
  if (!title || title.length > 120 || !participant || participant.length > 150) {
    return { error: 'Escribe un título y el nombre del estudiante o grupo.' } as const;
  }
  if (teacher !== 'jose' && teacher !== 'zhanna') {
    return { error: 'Selecciona un profesor.' } as const;
  }
  if (!/^20\d{2}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/.test(localStart) || !parseDay(localStart.slice(0, 10))) {
    return { error: 'Escribe una fecha y una hora válidas.' } as const;
  }
  if (!Number.isInteger(duration) || duration < 15 || duration > 240 || !Number.isInteger(weeks) || weeks < 1 || weeks > 16) {
    return { error: 'Indica entre 15 y 240 minutos y entre 1 y 16 semanas.' } as const;
  }

  // Bogotá has used UTC−05:00 throughout the years accepted by the form.
  const localMinutes = Number(localStart.slice(11, 13)) * 60 + Number(localStart.slice(14, 16));
  if (localMinutes + duration > 1440) return { error: 'La clase debe terminar antes de que empiece el día siguiente.' } as const;
  const first = Date.parse(`${localStart}:00-05:00`);

  return {
    lessons: Array.from({ length: weeks }, (_, occurrence) => {
      const start = first + WEEK * occurrence;
      return {
        title,
        participant,
        teacher,
        starts_at: new Date(start).toISOString(),
        ends_at: new Date(start + duration * 60_000).toISOString(),
        occurrence,
      };
    }),
  } as const;
}
