import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function diagnosticReleaseSourcePaths(root) {
  return execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: root, encoding: 'utf8' })
    .trim().split('\n').filter(Boolean)
    .filter(path => path === '.env.example'
      || path === 'package.json'
      || path === 'playwright.config.ts'
      || (path.startsWith('config/diagnostic/')
        && !['config/diagnostic/release-evidence.json', 'config/diagnostic/release-certificate.json'].includes(path))
      || path === 'docs/diagnostic-bank-readiness.json'
      || (path.startsWith('scripts/') && path.includes('diagnostic-'))
      || path.startsWith('src/lib/diagnostic/')
      || path.startsWith('src/server/diagnostic/')
      || path.startsWith('src/app/api/diagnostic/')
      || path.startsWith('src/app/api/admin/diagnostic/')
      || path.includes('/nivel-radar/')
      || (path.startsWith('supabase/migrations/') && path.includes('diagnostic'))
      || path.startsWith('tests/diagnostic-')
      || path === 'tests/e2e/diagnostic-adaptive.spec.ts'
      || path === 'tests/e2e/consola-ajena.ts')
    .sort();
}

export function diagnosticReleaseSourceSha256(root) {
  const sourceHash = createHash('sha256');
  for (const path of diagnosticReleaseSourcePaths(root)) {
    sourceHash.update(path).update('\0').update(readFileSync(join(root, path))).update('\0');
  }
  return sourceHash.digest('hex');
}
