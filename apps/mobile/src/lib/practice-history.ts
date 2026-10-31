import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { LanguageSlug } from '@/data/quick-practice';

export type PracticeAttempt = {
  id: string;
  language: LanguageSlug;
  correct: number;
  total: number;
  completedAt: string;
};

const keyFor = (userId: string) => `welearn:quick-practice:v1:${userId}`;

export async function loadPracticeHistory(userId: string): Promise<PracticeAttempt[]> {
  const raw = await AsyncStorage.getItem(keyFor(userId));
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is PracticeAttempt =>
      item && typeof item.id === 'string' && typeof item.language === 'string' &&
      typeof item.correct === 'number' && typeof item.total === 'number' &&
      typeof item.completedAt === 'string').slice(0, 30);
  } catch { return []; }
}

export async function savePracticeAttempt(userId: string, attempt: PracticeAttempt): Promise<PracticeAttempt[]> {
  const history = [attempt, ...(await loadPracticeHistory(userId))].slice(0, 30);
  await AsyncStorage.setItem(keyFor(userId), JSON.stringify(history));
  return history;
}

export async function recordPracticeDay(db: SupabaseClient, userId: string): Promise<void> {
  const today = new Date().toLocaleDateString('en-CA');
  const { error } = await db.from('daily_activity').insert({ user_id: userId, activity_date: today });
  if (error && error.code !== '23505') throw error;
}
