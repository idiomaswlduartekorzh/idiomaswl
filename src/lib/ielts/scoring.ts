export interface IeltsBandSet {
  listening?: number | null;
  reading?: number | null;
  writing?: number | null;
  speaking?: number | null;
}

export interface IeltsSkillScore {
  skill: 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  score: number;
  max: 9;
  label: string;
}

const SKILLS: { key: keyof IeltsBandSet; label: IeltsSkillScore['skill'] }[] = [
  { key: 'listening', label: 'Listening' },
  { key: 'reading', label: 'Reading' },
  { key: 'writing', label: 'Writing' },
  { key: 'speaking', label: 'Speaking' },
];

export function normalizeIeltsBand(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 9) return null;
  const rounded = Math.round(value * 2) / 2;
  return Math.abs(value - rounded) < 0.000001 ? rounded : null;
}

export function calculateIeltsWritingBand(task1Band: number, task2Band: number): number {
  return Math.round(((task1Band + task2Band * 2) / 3) * 2) / 2;
}

export function calculateIeltsOverall(bands: number[]): number | null {
  if (bands.length !== 4) return null;
  return Math.round((bands.reduce((sum, band) => sum + band, 0) / bands.length) * 2) / 2;
}

export function buildIeltsScoreSummary(bands: IeltsBandSet): {
  skills: IeltsSkillScore[];
  totalScore: number | null;
  totalLabel: string | null;
} {
  const skills = SKILLS.flatMap(({ key, label }) => {
    const score = normalizeIeltsBand(bands[key]);
    return score == null ? [] : [{ skill: label, score, max: 9 as const, label: `Band ${score}` }];
  });

  return {
    skills,
    totalScore: skills.length === 4 ? calculateIeltsOverall(skills.map(skill => skill.score)) : null,
    totalLabel: skills.length > 0
      ? skills.map(skill => `${skill.skill} Band ${skill.score}`).join(' · ')
      : null,
  };
}
