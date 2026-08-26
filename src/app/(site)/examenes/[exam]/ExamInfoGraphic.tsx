import type { CSSProperties } from 'react';
import type { Exam } from '@/data/exams';

function SectionArc({ pct, color, size = 72 }: { pct: number; color: string; size?: number }) {
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={5} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - pct)} />
    </svg>
  );
}

function examVocabulary(exam: Exam) {
  const isSat = exam.slug === 'sat';
  const isIcfes = exam.slug === 'icfes';
  const isToefl = exam.slug === 'toefl';
  return {
    title: isToefl
      ? 'Simulacros TOEFL iBT 2026'
      : isSat
        ? 'SAT digital: guía y simulacro adaptativo'
        : isIcfes
          ? 'ICFES Saber 11: Inglés'
          : exam.name,
    sectionLabel: isIcfes ? 'Partes' : isSat ? 'Módulos' : 'Secciones',
    questionLabel: isToefl ? 'Ítems base' : exam.slug === 'celpe-bras' ? 'Tareas' : 'Preguntas',
    durationLabel: isIcfes ? 'Sesión completa' : 'Duración',
  };
}

export default function ExamInfoGraphic({ exam, hasPodcast = false }: { exam: Exam; hasPodcast?: boolean }) {
  const vocabulary = examVocabulary(exam);
  const totalMins = exam.sections.reduce((total, section) => {
    const minutes = Number.parseInt(String(section.time), 10);
    return total + (Number.isNaN(minutes) ? 0 : minutes);
  }, 0);
  const [scoreMin = '0', scoreMaxPart = exam.scoreRange] = exam.scoreRange.split('–');
  const scoreMax = scoreMaxPart.trim().match(/^[\d.]+/)?.[0] ?? scoreMaxPart.trim();
  const levelDenominator = Math.max((exam.levels?.length ?? 1) - 1, 1);
  const stats = [
    { label: vocabulary.sectionLabel, value: String(exam.sections.length) },
    { label: vocabulary.questionLabel, value: exam.slug === 'toefl' ? String(exam.totalQuestions).replace(/\s*ítems base$/i, '') : String(exam.totalQuestions) },
    { label: vocabulary.durationLabel, value: exam.totalTime },
    { label: 'Puntaje', value: exam.scoreRange },
  ];

  return (
    <div className="wl-exam-info-graphic">
      <section id="resumen" className="wl-exam-hero" aria-labelledby="exam-title">
        <div className="wrap">
          <p className="wl-exam-hero__eyebrow"><span aria-hidden="true">{exam.flag}</span> {exam.language}</p>
          <h1 id="exam-title" className="wl-exam-hero__title">{vocabulary.title}</h1>
          <p className="wl-exam-hero__sub">{exam.tagline}</p>
          <p className="wl-exam-hero__desc">{exam.description}</p>

          <div className="wl-exam-hero__actions">
            <a href="#practica" className="btn">Ver prácticas <span aria-hidden="true">→</span></a>
            {hasPodcast ? <a href="#podcasts-del-examen" className="btn btn-ghost">Escuchar guía</a> : null}
          </div>

          <dl className="wl-exam-hero__pills" aria-label={`Datos principales de ${exam.name}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="wl-exam-hero__pill">
                <dd className="wl-exam-hero__pill-val">{stat.value}</dd>
                <dt className="wl-exam-hero__pill-lbl">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="estructura" className="wl-section wl-exam-structure" aria-labelledby="exam-structure-title">
        <div className="wrap">
          <p className="eyebrow wl-exam-readable-accent"><span className="ink-line" aria-hidden="true" />Mapa del examen</p>
          <h2 id="exam-structure-title">{exam.sections.length} {vocabulary.sectionLabel.toLocaleLowerCase('es')} · {exam.totalTime} · {exam.scoreRange} {exam.scoreName}</h2>

          <div className="wl-section-grid">
            {exam.sections.map((section) => {
              const minutes = Number.parseInt(String(section.time), 10);
              const pct = totalMins > 0 && !Number.isNaN(minutes) ? minutes / totalMins : 0.25;
              return (
                <article key={section.name} className="wl-section-card">
                  <div className="wl-section-card__top">
                    <div className="wl-section-card__arc">
                      <SectionArc pct={Math.min(Math.max(pct, 0.15), 1)} color={section.color} size={64} />
                      <span className="wl-section-card__icon" aria-hidden="true">{section.icon}</span>
                    </div>
                    <div className="wl-section-card__copy">
                      <h3 className="wl-section-card__name">{section.name}</h3>
                      <div className="wl-section-card__meta">
                        <span>{section.time}</span><span aria-hidden="true">·</span>
                        <span>{section.questions} {exam.slug === 'toefl' ? 'ítems base' : typeof section.questions === 'number' && section.questions > 2 ? 'preguntas' : 'tareas'}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="wl-section-card__types">
                    {section.types.map((type) => <li key={type} style={{ borderLeftColor: section.color }}>{type}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="puntaje" className="wl-section wl-exam-score" aria-labelledby="exam-score-title">
        <div className="wrap">
          <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Escala de puntuación</p>
          <h2 id="exam-score-title">{exam.scoreName}: {exam.scoreRange}</h2>
          <div className="wl-score-bar-wrap">
            <div className="wl-score-bar" aria-hidden="true"><div className="wl-score-bar__fill" /></div>
            <div className="wl-score-bar__labels">
              <span>{scoreMin.trim()}</span>
              {exam.passing ? <span className="wl-exam-readable-accent">{exam.slug === 'toefl' ? 'Requisito: ' : 'Referencia: '}{exam.passing}</span> : null}
              <span>{scoreMax}</span>
            </div>
          </div>

          {exam.levels ? (
            <div className="wl-levels-row" aria-label="Niveles reportados">
              {exam.levels.map((level, index) => (
                <span key={level} className="wl-level-chip" style={{ '--level-strength': `${Math.round(24 + (index / levelDenominator) * 70)}%` } as CSSProperties}>{level}</span>
              ))}
            </div>
          ) : null}

          <div className="wl-recognized">
            <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Dónde se utiliza</p>
            {exam.recognized.map((item) => <div key={item} className="wl-recognized__item"><span aria-hidden="true">✓</span>{item}</div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
