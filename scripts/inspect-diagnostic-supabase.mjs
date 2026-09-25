import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { inspectDiagnosticSupabase } from './lib/diagnostic-supabase-inspection.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const diagnosticMigrations = readdirSync(resolve(root, 'supabase/migrations'))
  .filter(name => name.includes('diagnostic') && name.endsWith('.sql'))
  .sort();
const expectedMigration = diagnosticMigrations.at(-1);
if (!expectedMigration) throw new Error('No diagnostic migrations found.');

const execute = process.argv.includes('--execute');
const outputArgument = process.argv.find(argument => argument.startsWith('--output='));
if (!execute) {
  process.stdout.write(`Diagnostic Supabase inspection is ready for ${expectedMigration}.\n`);
  process.stdout.write('Dry run only. Add --execute with URL, server key and public key in the environment.\n');
  process.stdout.write('The receipt never marks the authenticated application flow as verified.\n');
  process.exit(0);
}

const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
const adminKey = (process.env.SUPABASE_SECRET_KEY
  ?? process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim() ?? '';
const publicKey = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ?? process.env.SUPABASE_PUBLISHABLE_KEY)?.trim() ?? '';
const userAccessToken = process.env.DIAGNOSTIC_VERIFY_USER_ACCESS_TOKEN?.trim() || null;

const receipt = await inspectDiagnosticSupabase({
  endpoint,
  adminKey,
  publicKey,
  expectedMigration,
  userAccessToken,
});

if (outputArgument) {
  const outputPath = resolve(root, outputArgument.slice('--output='.length));
  const privateRoot = resolve(root, '.diagnostic-private');
  const relativeOutput = relative(privateRoot, outputPath);
  if (!relativeOutput || relativeOutput === '..' || relativeOutput.startsWith(`..${sep}`)) {
    throw new Error('Inspection receipts may only be written below .diagnostic-private/.');
  }
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
  if (!existsSync(outputPath)) throw new Error('Inspection receipt was not written.');
}

process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
if (receipt.decision !== 'PASS') process.exitCode = 1;
