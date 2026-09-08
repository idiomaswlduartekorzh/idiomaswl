import Link from 'next/link';
import type { CSSProperties } from 'react';

import { TOEFL_SEO_CLUSTER_GROUPS } from '@/data/toefl/seo-cluster';

const stats = [
  ['20', 'simulacros completos'],
  ['12', 'familias de tareas'],
  ['4', 'secciones practicables'],
  ['9', 'guías TOEFL'],
] as const;

export default function ToeflCluster({ accent }: { accent: string }) {
  return (
    <section
      id="ruta-toefl"
      className="wl-exam-cluster"
      style={{ '--cluster-accent': accent } as CSSProperties}
      aria-labelledby="toefl-cluster-title"
    >
      <div className="wrap wl-hub-panel">
        <header className="wl-hub-heading">
          <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Ruta de preparación TOEFL</p>
          <h2 id="toefl-cluster-title">Todo para preparar el TOEFL iBT 2026</h2>
          <p>Entiende el formato actual, practica cada sección y comprueba costos y requisitos desde un solo lugar.</p>
        </header>

        <div className="wl-exam-cluster__stats" aria-label="Recursos TOEFL disponibles">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {TOEFL_SEO_CLUSTER_GROUPS.map((group) => (
          <section key={group.id} className="wl-exam-cluster__group">
            <h3>{group.label}</h3>
            <p>{group.description}</p>
            <div>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <strong>{link.title}</strong>
                  <span>{link.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <p className="wl-exam-cluster__mark">
          Prácticas y simulacros originales de WeLearn. No son preguntas oficiales ni reproducen el motor adaptativo de ETS.
        </p>
      </div>
    </section>
  );
}
