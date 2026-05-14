#!/usr/bin/env node
// Inventario de Supabase Storage + conteo de filas en tablas conocidas.
// Lee credenciales desde .env.local (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).
// Uso: node --env-file=.env.local scripts/list-storage.mjs

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.');
  console.error('Corre con: node --env-file=.env.local scripts/list-storage.mjs');
  process.exit(1);
}

const sb = createClient(url, key);

async function walk(bucket, prefix = '', depth = 0, maxDepth = 3) {
  const { data, error } = await sb.storage.from(bucket).list(prefix, { limit: 500 });
  if (error) { console.error(error); return; }
  for (const f of data) {
    const path = prefix ? `${prefix}/${f.name}` : f.name;
    const isFolder = !f.id;
    console.log(`${'  '.repeat(depth)}${isFolder ? '[' + f.name + '/]' : f.name}`);
    if (isFolder && depth < maxDepth) await walk(bucket, path, depth + 1, maxDepth);
  }
}

const { data: buckets, error: be } = await sb.storage.listBuckets();
if (be) { console.error(be); process.exit(1); }

console.log('=== BUCKETS ===');
for (const b of buckets) {
  console.log(`\n# ${b.name} (public=${b.public})`);
  await walk(b.name);
}

console.log('\n=== TABLES (row counts) ===');
const tables = [
  'languages', 'lessons',
  'courses', 'modules', 'lesson_steps', 'lesson_stages',
  'activities', 'questions', 'options', 'assets',
];
for (const t of tables) {
  const { count, error } = await sb.from(t).select('*', { count: 'exact', head: true });
  console.log(`${t.padEnd(16)} ${error ? 'ERR ' + error.message : count + ' rows'}`);
}
