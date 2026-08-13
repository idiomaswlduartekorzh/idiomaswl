// ─── Tarjeta de Historias para el hub de cada idioma ──────────────────────────
// Va encima de la lista de niveles A1/A2/B1… porque las historias no son un
// nivel: son un formato aparte que cruza lectura y escucha. La misma tarjeta en
// los ocho idiomas, para que se reconozca al cambiar de idioma.

import Link from 'next/link';
import type { HistoriaLang } from '@/data/practica/historias/types';
import { hasAudio } from '@/data/practica/historias/types';
import { getHistorias } from '@/data/practica/historias';

const COLOR = '#be185d';

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
    <Link href={`/practica/${lang}/historias`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.25rem',
        padding: '1.2rem 1.5rem',
        border: `1.5px solid ${COLOR}47`,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${COLOR}0f 0%, transparent 100%)`,
      }}>
        <div style={{
          width: 58, height: 58, borderRadius: 14, flexShrink: 0,
          background: COLOR, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
        }}>🎧</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>Historias</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, background: COLOR, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>{nivel}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            Un conflicto real contado por las dos personas que lo vivieron. Lees, escuchas las dos
            notas de voz y decides tú quién tiene razón.
          </p>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.73rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{meta}</p>
        </div>
        <span style={{ fontSize: '1.2rem', color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
      </div>
    </Link>
  );
}
