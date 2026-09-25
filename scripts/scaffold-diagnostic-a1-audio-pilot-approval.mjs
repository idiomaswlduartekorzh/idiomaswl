import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import {
  DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS,
  buildDiagnosticA1AudioPilotApprovalPacket,
} from './lib/diagnostic-a1-audio-pilot.mjs';
import { diagnosticListeningAudioInvoice } from './generate-diagnostic-listening-audio.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const outputArgument = process.argv.find(argument => argument.startsWith('--output='))
  ?.slice('--output='.length) ?? '.diagnostic-private/listening-pilot-a1/owner-approval.json';
const outputPath = resolve(root, outputArgument);
const privateRelative = relative(privateRoot, outputPath);
if (outputArgument.startsWith('/') || !privateRelative || privateRelative === '..'
  || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('A1 audio pilot approval packet must stay below .diagnostic-private/.');
}
if (existsSync(outputPath)) throw new Error(`Refusing to overwrite existing owner review: ${outputArgument}`);
const casting = JSON.parse(readFileSync(resolve(root, 'config/diagnostic/english-listening-voice-casting.json'), 'utf8'));
const briefs = ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS
  .filter(brief => DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS.includes(brief.id));
const invoice = diagnosticListeningAudioInvoice(briefs);
const packet = buildDiagnosticA1AudioPilotApprovalPacket({
  casting, invoice, generatedAt: new Date().toISOString(),
});
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(packet, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify({
  outputPath: relative(root, outputPath),
  scopeVersion: packet.scopeVersion,
  proposalSha256: packet.proposalSha256,
  voices: packet.proposal.profiles.map(profile => profile.voiceName),
  decision: packet.decision,
  publicationAuthorized: false,
}, null, 2)}\n`);
