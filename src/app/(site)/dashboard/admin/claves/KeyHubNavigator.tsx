'use client';

import { useMemo, useState } from 'react';
import type { KeyCatalogItem } from '@/lib/exams/answer-key-catalog';
import styles from './key-hub.module.css';

export default function KeyHubNavigator({ catalog, selectedKey, examNames }: {
  catalog: KeyCatalogItem[];
  selectedKey: string;
  examNames: Record<string, string>;
}) {
  const [query, setQuery] = useState('');
  const groups = useMemo(() => {
    const filtered = catalog.filter(item => `${examNames[item.examSlug]} ${item.title} ${item.mockId}`.toLowerCase().includes(query.trim().toLowerCase()));
    return Object.entries(filtered.reduce<Record<string, KeyCatalogItem[]>>((acc, item) => {
      (acc[item.examSlug] ??= []).push(item);
      return acc;
    }, {}));
  }, [catalog, examNames, query]);

  return <aside className={styles.sidebar} aria-label="Buscar claves">
    <div className={styles.sidebarHead}>
      <strong>Catálogo</strong><span>{catalog.length} sets</span>
    </div>
    <label className={styles.searchLabel} htmlFor="key-search">Buscar examen o set</label>
    <input id="key-search" type="search" value={query} onChange={event => setQuery(event.target.value)}
      placeholder="IELTS, Cambridge, set 3…" className={styles.search} />
    <div className={styles.groupList}>
      {groups.length === 0 && <p className={styles.empty}>No hay claves con ese nombre.</p>}
      {groups.map(([slug, items]) => <details key={slug} open={Boolean(query) || items?.some(item => item.key === selectedKey)} className={styles.group}>
        <summary><span>{examNames[slug] ?? slug}</span><small>{items?.length}</small></summary>
        <div className={styles.mockList}>{items?.map(item =>
          <a href={`/dashboard/admin/claves?key=${encodeURIComponent(item.key)}`}
            className={item.key === selectedKey ? styles.mockActive : styles.mock} aria-current={item.key === selectedKey ? 'page' : undefined} key={item.key}>
            <span>{item.title.replace(/^.*?[-–·]\s*/, '')}</span>
            <small className={item.issues ? styles.itemIssue : styles.itemClear}>{item.issues ? `${item.issues} alertas` : 'Sin alertas'}</small>
          </a>)}</div>
      </details>)}
    </div>
  </aside>;
}
