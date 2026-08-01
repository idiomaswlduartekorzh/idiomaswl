import { SEDE, HAS_MAP, WA_NUMBER } from './localBusiness';
import s from './LocalBand.module.css';

export type LocalBandProps = {
  /** Color de acento de la landing. */
  accent: string;
  /** Nombre del idioma en minúscula, tal como va en la frase. Ej: "italiano". */
  idioma: string;
  /** Frase de contexto bajo el H2 — puede mencionar el examen o el uso local del idioma. */
  intro: string;
  /** Qué gana el estudiante presencial en ESTE idioma. */
  presencial: string;
  /** Texto del mensaje de WhatsApp para la consulta local. */
  waText: string;
};

export default function LocalBand({ accent, idioma, intro, presencial, waText }: LocalBandProps) {
  return (
    <section className={s.band} style={{ ['--lb-accent' as string]: accent }}>
      <div className={s.wrap}>
        <p className={s.eyebrow}>Bucaramanga y área metropolitana</p>
        <h2 className={s.title}>Clases de {idioma} en Bucaramanga: presencial u online</h2>
        <p className={s.sub}>{intro}</p>

        <div className={s.grid}>
          <div className={s.card}>
            <span className={s.tag}>Presencial</span>
            <p className={s.cardTitle}>Bucaramanga, Floridablanca, Girón y Piedecuesta</p>
            <p className={s.cardDesc}>{presencial}</p>
          </div>
          <div className={s.card}>
            <span className={s.tag}>Online</span>
            <p className={s.cardTitle}>Desde cualquier ciudad de Colombia o del mundo</p>
            <p className={s.cardDesc}>
              Bogotá, Medellín, Cali, Barranquilla o el exterior. Videollamada con tutor asignado,
              plan personalizado y todo el material de práctica de la plataforma incluido.
            </p>
          </div>
          <div className={s.card}>
            <span className={s.tag}>Mixto</span>
            <p className={s.cardTitle}>Cambia de formato cuando lo necesites</p>
            <p className={s.cardDesc}>
              No tienes que elegir de por vida. Muchos estudiantes de Bucaramanga alternan:
              presencial cuando pueden, online cuando la semana se complica. El plan y el progreso
              son los mismos.
            </p>
          </div>
        </div>

        <div className={s.nap}>
          <p className={s.napLine}>
            <span className={s.napStrong}>Idiomas WeLearn</span> · {SEDE.streetAddress}
            <br />
            {SEDE.addressLocality}, {SEDE.addressRegion}
            {' · '}
            <a className={s.napLink} href={HAS_MAP} target="_blank" rel="noopener noreferrer">
              Ver en el mapa
            </a>
            <br />
            Lunes a viernes 7:00 a.m. – 9:00 p.m. · Sábados 8:00 a.m. – 6:00 p.m.
          </p>
        </div>

        <div className={s.cta}>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank" rel="noopener noreferrer"
            className={s.napLink}
          >
            Preguntar por clases en Bucaramanga por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
