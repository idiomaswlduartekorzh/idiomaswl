// ─── Tarjeta de Historias para el hub de cada idioma ──────────────────────────
// Va encima de la lista de niveles A1/A2/B1… porque las historias no son un
// nivel: son un formato aparte que cruza lectura y escucha. La misma tarjeta en
// los ocho idiomas, para que se reconozca al cambiar de idioma.
//
// Comparte forma con las filas de nivel de LanguageHub —chapa, texto, flecha—
// para que la excepción no parezca un pegote. Lo que la distingue es su acento
// propio, no una geometría distinta.

import Link from 'next/link';
import type { HistoriaLang } from '@/data/practica/historias/types';
import { hasAudio } from '@/data/practica/historias/types';
import { getHistorias } from '@/data/practica/historias';
import s from './LanguageHub.module.css';

/** El rosa de Historias. Es el único formato que no es una destreza, y se le nota. */
const ACENTO = 'var(--wlp-accent-historias)';

export default function HistoriasCard({ lang }: { lang: HistoriaLang }) {
  const historias = getHistorias(lang);
  if (historias.length === 0) return null;

  const conAudio = historias.filter(hasAudio).length;
  const nivel = historias[0].level;
  const meta =
    conAudio === historias.length
      ? `${historias.length} historias · ${historias.length * 2} audios · transcripción interactiva`
      : conAudio > 0
        ? `${historias.length} historias · ${conAudio} con audio, el resto en grabación`
        : `${historias.length} historias · texto completo · audios en grabación`;

  return (
    <Link
      href={`/practica/${lang}/historias`}
      className="wlp-card wlp-card--path"
      style={{ '--wlp-accent': ACENTO } as React.CSSProperties}
    >
      <div className={s.row}>
        <span className={s.badge} aria-hidden="true">{nivel}</span>
        <div className={s.body}>
          <div className={s.titleRow}>
            <span className={s.name}>Historias</span>
            <span className={s.tag}>FORMATO</span>
          </div>
          <p className={s.desc}>
            Un conflicto real contado por las dos personas que lo vivieron. Lees, escuchas las dos
            notas de voz y decides tú quién tiene razón.
          </p>
          <p className={s.count}>{meta}</p>
        </div>
        <span className={s.arrow} aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
