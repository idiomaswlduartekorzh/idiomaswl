// ─── Hub de Historias ─────────────────────────────────────────────────────────
// La misma página para los ocho idiomas: lista las historias del idioma y marca
// cuáles ya tienen audio y cuáles están todavía en grabación. Es un componente
// de servidor: no hay estado, solo enlaces.
//
// Cada historia trae su propio color en los datos (`h.color`) y se respeta: aquí
// el color identifica la historia, como la portada identifica un libro, no una
// destreza. Lo que se unifica es la geometría —filete, radio, chapa—, que es lo
// que hacía que esta página pareciera de otro sitio.

import Link from 'next/link';
import type { HistoriaLang } from '@/data/practica/historias/types';
import { hasAudio, totalQuestions } from '@/data/practica/historias/types';
import { HISTORIA_LANGS, getHistorias } from '@/data/practica/historias';
import lh from './LanguageHub.module.css';
import s from './HistoriasHub.module.css';

const CRUCES = [
  'Lectura', 'Escucha', 'Vocabulario en contexto',
  'Inferencia', 'Tono y registro', 'Pensamiento crítico',
];

export default function HistoriasHub({ lang }: { lang: HistoriaLang }) {
  const meta = HISTORIA_LANGS[lang];
  const historias = getHistorias(lang);
  const base = `/practica/${lang}`;

  return (
    <div
      className="wlp-page wl-stories-hub"
      style={{ '--wlp-accent': meta.color } as React.CSSProperties}
    >
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href={base}>{meta.flag} {meta.label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Historias</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">{meta.flag} {meta.hubTitle}</p>
          <h1>Historias</h1>
          <p className="wlp-hero-lead">
            Un conflicto real contado por las dos personas que lo vivieron. Lees al narrador,
            escuchas las dos notas de voz y decides tú quién tiene razón. Lectura, escucha,
            vocabulario en contexto e inferencia en un mismo ejercicio.
          </p>
        </header>

        <ul className={s.tags}>
          {CRUCES.map((t) => <li key={t} className={s.tag}>{t}</li>)}
        </ul>

        <ul className={lh.list}>
          {historias.map((h) => {
            const ready = hasAudio(h);
            return (
              <li key={h.slug}>
                <Link
                  href={`${base}/historias/${h.slug}`}
                  className="wlp-card wlp-card--path"
                  style={{ '--wlp-accent': h.color } as React.CSSProperties}
                >
                  <div className={lh.row}>
                    <span className={lh.badge} aria-hidden="true">{h.level}</span>
                    <div className={lh.body}>
                      <div className={lh.titleRow}>
                        <span className={lh.name}>{h.title}</span>
                        <span className={`${lh.tag} wl-story-level-chip`}>{h.level}</span>
                        {ready ? null : <span className={s.pending}>AUDIO EN GRABACIÓN</span>}
                      </div>
                      <p className={lh.desc}>{h.tagline}</p>
                      <p className={lh.count}>
                        {ready ? '2 audios' : '2 audios en producción'} · {totalQuestions(h)} preguntas · transcripción interactiva
                      </p>
                    </div>
                    <span className={lh.arrow} aria-hidden="true">→</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className={s.note}>
          Las historias marcadas como <strong>audio en grabación</strong> se pueden hacer
          completas por escrito: narrador, transcripción con clic para traducir y las preguntas.
          Cuando la grabación esté lista aparece en esta misma página, sin cambiar de enlace.
        </p>

        <div className={s.back}>
          <Link href={base} className="wlp-btn wlp-btn--secondary">← {meta.flag} {meta.label}</Link>
        </div>
      </div>
    </div>
  );
}
