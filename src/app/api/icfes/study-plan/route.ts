import { NextResponse } from 'next/server';
import { ICFES_PARTS } from '@/data/icfes/parts';
import { createClient } from '@/lib/supabase/server';

const VALID_WEEKS = new Set([2, 4, 8, 12]);
const VALID_MINUTES = new Set([20, 40, 60]);
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  let body: { weeks?: unknown; minutes?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: 'invalid_json' }, { status: 400 });
  }

  const weeks = Number(body.weeks);
  const minutes = Number(body.minutes);
  if (!VALID_WEEKS.has(weeks) || !VALID_MINUTES.has(minutes)) {
    return NextResponse.json({ code: 'invalid_plan' }, { status: 400 });
  }

  if (!SUPABASE_CONFIGURED) return NextResponse.json({ saved: false, anonymous: true }, { status: 202 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ saved: false, anonymous: true }, { status: 202 });

  const weeklySchedule = Array.from({ length: weeks }, (_, index) => {
    const primary = ICFES_PARTS[(index * 2) % ICFES_PARTS.length];
    const secondary = ICFES_PARTS[(index * 2 + 1) % ICFES_PARTS.length];
    return {
      week: index + 1,
      primaryPart: primary.part,
      secondaryPart: secondary.part,
      review: (index + 1) % 4 === 0 || index === weeks - 1,
    };
  });
  const completion = new Date();
  completion.setDate(completion.getDate() + weeks * 7);

  const { error } = await supabase.from('icfes_learning_path').upsert({
    user_id: user.id,
    current_week: 1,
    current_day: 1,
    weekly_schedule: weeklySchedule,
    daily_schedule: {
      minutes,
      practiceMinutes: Math.round(minutes * 0.55),
      vocabularyMinutes: Math.round(minutes * 0.2),
      reviewMinutes: minutes - Math.round(minutes * 0.55) - Math.round(minutes * 0.2),
    },
    weekly_focus_skills: weeklySchedule.map((week) => [`parte-${week.primaryPart}`, `parte-${week.secondaryPart}`]),
    weeks_completed: 0,
    estimated_completion_date: completion.toISOString().slice(0, 10),
    status: 'active',
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  if (error) return NextResponse.json({ code: 'plan_write_failed' }, { status: 503 });
  return NextResponse.json({ saved: true });
}
