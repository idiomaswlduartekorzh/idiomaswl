'use client';

import { useEffect, useState } from 'react';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from 'recharts';
import { saveExamResult } from '@/lib/actions/saveExamResult';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SkillResult {
  skill: string;        // "Listening", "Reading", etc.
  raw?: string;         // "32/40" for auto-graded
  score: number;        // 0–max
  max: number;          // e.g. 9 for IELTS, 30 for TOEFL
  label?: string;       // "Band 7.5" or "26/30"
  color?: string;
}

export interface ExamReportData {
  examName: string;
  examSlug: string;
  mockTitle: string;
  totalScore: number;
  totalMax: number;
  totalLabel: string;   // "Overall Band 7.0" | "Total 98/120"
  skills: SkillResult[];
  date?: string;
  accentColor?: string;
}

// ── Exam-specific adapters (called by each practice client) ───────────────────

// Palette per score range (0–1 normalized)
function scoreColor(pct: number, accent = '#c8202e'): string {
  if (pct >= 0.85) return '#16a34a';   // green — excellent
  if (pct >= 0.7)  return '#2563eb';   // blue  — good
  if (pct >= 0.5)  return accent;      // brand — average
  return '#dc2626';                    // red   — needs work
}

// ── Animated score counter ────────────────────────────────────────────────────

function ScoreRing({ score, max, accent }: { score: number; max: number; accent: string }) {
  const pct = max > 0 ? score / max : 0;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <svg width={130} height={130} className="exam-report__ring">
      <circle cx={65} cy={65} r={r} fill="none" stroke="var(--border)" strokeWidth={10} />
      <circle
        cx={65} cy={65} r={r} fill="none"
        stroke={scoreColor(pct, accent)}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}  /* start at top */
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.22,1,0.36,1)' }}
      />
      <text x={65} y={58} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--fg)">{score}</text>
      <text x={65} y={76} textAnchor="middle" fontSize={12} fill="var(--muted)">/{max}</text>
    </svg>
  );
}

// ── Skill bar with color coding ───────────────────────────────────────────────

function SkillBar({ s, accent }: { s: SkillResult; accent: string }) {
  const pct = s.max > 0 ? s.score / s.max : 0;
  const color = scoreColor(pct, accent);
  return (
    <div className="exam-report__skill-row">
      <div className="exam-report__skill-meta">
        <span className="exam-report__skill-name">{s.skill}</span>
        <span className="exam-report__skill-val" style={{ color }}>{s.label ?? `${s.score}/${s.max}`}</span>
      </div>
      {s.raw && <span className="exam-report__skill-raw">{s.raw} correct</span>}
      <div className="exam-report__skill-track">
        <div
          className="exam-report__skill-fill"
          style={{ width: `${pct * 100}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ── Radar chart data ──────────────────────────────────────────────────────────

function SkillRadar({ skills, accent }: { skills: SkillResult[]; accent: string }) {
  const data = skills.map(s => ({
    skill: s.skill,
    value: s.max > 0 ? Math.round((s.score / s.max) * 100) : 0,
    fullMark: 100,
  }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
        <Radar
          name="Score"
          dataKey="value"
          stroke={accent}
          fill={accent}
          fillOpacity={0.18}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ── Bar chart (skill breakdown) ───────────────────────────────────────────────

function SkillBars({ skills, accent }: { skills: SkillResult[]; accent: string }) {
  const data = skills.map(s => ({
    name: s.skill,
    score: s.score,
    pct: s.max > 0 ? Math.round((s.score / s.max) * 100) : 0,
  }));
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barSize={32} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: 'var(--border)', opacity: 0.4 }}
          contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
          formatter={(v) => [`${v}%`, 'Score']}
        />
        <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={scoreColor(d.pct / 100, accent)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Interpretation text ───────────────────────────────────────────────────────

function interpretScore(slug: string, pct: number): { level: string; desc: string } {
  if (slug === 'ielts') {
    if (pct >= 0.89) return { level: 'Expert user', desc: 'Band 8–9. Full operational command.' };
    if (pct >= 0.72) return { level: 'Good user', desc: 'Band 6.5–7.5. Effective command with occasional inaccuracies.' };
    if (pct >= 0.56) return { level: 'Competent user', desc: 'Band 5.5–6. Generally effective command despite inaccuracies.' };
    return { level: 'Limited user', desc: 'Band 5 or below. Partial command in familiar situations.' };
  }
  if (slug === 'toefl') {
    if (pct >= 0.83) return { level: 'Advanced', desc: 'Score 100+. Ready for top-tier university admission.' };
    if (pct >= 0.67) return { level: 'High Intermediate', desc: 'Score 80–99. Meets most university requirements.' };
    if (pct >= 0.5)  return { level: 'Intermediate', desc: 'Score 60–79. May need preparation for academic admission.' };
    return { level: 'Below proficiency', desc: 'Score below 60. Significant preparation recommended.' };
  }
  if (slug === 'icfes') {
    if (pct >= 0.8) return { level: 'Nivel B2', desc: 'Desempeño superior. Comunicación fluida en contextos académicos.' };
    if (pct >= 0.6) return { level: 'Nivel B1', desc: 'Desempeño satisfactorio. Comprensión de textos moderadamente complejos.' };
    return { level: 'Nivel A2', desc: 'Desempeño básico. Comprensión limitada a textos simples y familiares.' };
  }
  if (pct >= 0.8) return { level: 'Excellent', desc: 'Outstanding performance across all measured areas.' };
  if (pct >= 0.6) return { level: 'Good', desc: 'Solid performance with room to grow.' };
  return { level: 'Developing', desc: 'Focused preparation will significantly improve results.' };
}

// ── Main component ────────────────────────────────────────────────────────────

export function ExamReport({ data, onRetry, backHref, skipSave }: {
  data: ExamReportData;
  onRetry?: () => void;
  backHref?: string;
  skipSave?: boolean;
}) {
  const [showLead, setShowLead] = useState(false);

  useEffect(() => {
    if (skipSave) return;
    saveExamResult(data).catch(() => {/* silently ignore save failures */});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipSave]);

  // Show lead capture modal after 2s — skip if already captured this session
  useEffect(() => {
    try { if (localStorage.getItem('wl_lead_captured')) return; } catch {}
    const t = setTimeout(() => setShowLead(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const accent = data.accentColor ?? '#c8202e';
  const pct = data.totalMax > 0 ? data.totalScore / data.totalMax : 0;
  const { level, desc } = interpretScore(data.examSlug, pct);

  return (
    <>
    {showLead && (
      <LeadCaptureModal
        examSlug={data.examSlug}
        examScore={data.totalLabel}
        examName={data.examName}
        onClose={() => setShowLead(false)}
      />
    )}
    <div className="exam-report">
      {/* Header */}
      <div className="exam-report__header">
        <div>
          <p className="exam-report__eyebrow">{data.examName} · {data.mockTitle}</p>
          <h2 className="exam-report__title">Performance Report</h2>
          {data.date && <p className="exam-report__date">{data.date}</p>}
          <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.35rem', maxWidth: '32rem', lineHeight: 1.4 }}>
            Este es tu puntaje estimado por WeLearn — no es un resultado oficial certificado de {data.examName} ni sustituye el examen real.
          </p>
        </div>
      </div>

      {/* Overall score + level */}
      <div className="exam-report__overall-row">
        <ScoreRing score={data.totalScore} max={data.totalMax} accent={accent} />
        <div className="exam-report__overall-info">
          <p className="exam-report__total-label">{data.totalLabel}</p>
          <p className="exam-report__level" style={{ color: scoreColor(pct, accent) }}>{level}</p>
          <p className="exam-report__level-desc">{desc}</p>
        </div>
      </div>

      {/* Charts grid */}
      <div className="exam-report__charts">
        <div className="exam-report__chart-card">
          <p className="exam-report__chart-title">Skill breakdown</p>
          <SkillBars skills={data.skills} accent={accent} />
        </div>
        {data.skills.length >= 3 && (
          <div className="exam-report__chart-card">
            <p className="exam-report__chart-title">Skill profile</p>
            <SkillRadar skills={data.skills} accent={accent} />
          </div>
        )}
      </div>

      {/* Per-skill detail */}
      <div className="exam-report__skills">
        <p className="exam-report__section-heading">Skill detail</p>
        {data.skills.map(s => <SkillBar key={s.skill} s={s} accent={accent} />)}
      </div>

      {/* Actions */}
      <div className="exam-report__actions">
        {onRetry && <button className="btn" onClick={onRetry}>Retry exam</button>}
        {backHref && <a className="btn btn-ghost" href={backHref}>Back to exam</a>}
      </div>
    </div>
    </>
  );
}
