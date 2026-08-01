import Image from 'next/image';
import s from './FoundersBand.module.css';

export type FoundersBandProps = {
  /** Color de acento de la landing (el mismo que usa su .accent / .eyebrow). */
  accent: string;
  /** Título de la banda. Debe hablar del idioma concreto. */
  title: string;
  /** Frase corta de contexto bajo el título. */
  intro: string;
  /** Qué relación tiene David con ESTE idioma. */
  davidLine: string;
  /** Qué relación tiene Zhanna con ESTE idioma. */
  zhannaLine: string;
  davidTags?: string[];
  zhannaTags?: string[];
  eyebrow?: string;
};

const DEFAULT_DAVID_TAGS = ['Políglota · 8 idiomas', 'Co-fundador de WeLearn'];
const DEFAULT_ZHANNA_TAGS = ['Co-fundadora · Directora académica', 'Formada en Francia e Inglaterra'];

export default function FoundersBand({
  accent,
  title,
  intro,
  davidLine,
  zhannaLine,
  davidTags = DEFAULT_DAVID_TAGS,
  zhannaTags = DEFAULT_ZHANNA_TAGS,
  eyebrow = 'Quiénes te enseñan',
}: FoundersBandProps) {
  return (
    <section className={s.band}>
      <div className={s.wrap}>
        <p className={s.eyebrow} style={{ color: accent }}>{eyebrow}</p>
        <h2 className={s.title}>{title}</h2>
        <p className={s.intro}>{intro}</p>

        <div className={s.grid}>
          <div className={s.card}>
            <div className={s.photoWrap}>
              <Image
                src="/images/david-duarte.jpg"
                alt="José David Duarte Silva, políglota y co-fundador de Idiomas WeLearn"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="92px"
              />
            </div>
            <div>
              <p className={s.name}>José David Duarte Silva</p>
              <p className={s.role} style={{ color: accent }}>Co-fundador · Políglota</p>
              <p className={s.line}>{davidLine}</p>
              <div className={s.tags}>
                {davidTags.map(t => <span key={t} className={s.tag}>{t}</span>)}
              </div>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.photoWrap}>
              <Image
                src="/images/team-zhanna-korzh.png"
                alt="Zhanna Korzh, directora académica de Idiomas WeLearn"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="92px"
              />
            </div>
            <div>
              <p className={s.name}>Zhanna Korzh</p>
              <p className={s.role} style={{ color: accent }}>Co-fundadora · Directora académica</p>
              <p className={s.line}>{zhannaLine}</p>
              <div className={s.tags}>
                {zhannaTags.map(t => <span key={t} className={s.tag}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
