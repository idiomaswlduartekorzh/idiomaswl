import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(repoRoot, 'public/audio/ielts/listening/welearn-listening-part-1-001.mp3');
const rendererPath = path.join(repoRoot, 'scripts/lib/render-ielts-piper-segments.py');
const tempParent = process.env.IELTS_AUDIO_TEMP_ROOT || os.tmpdir();
fs.mkdirSync(tempParent, { recursive: true });
const tempRoot = fs.mkdtempSync(path.join(tempParent, 'welearn-ielts-listening-'));

const turns = [
  ['host', 'Good afternoon, Harbour City Photo Studio. Leo speaking. How can I help?'],
  ['customer', "Hi. I'd like to book one of your weekend photography walks. I saw a short description, but I need a few more details."],
  ['host', "Of course. I'll take your booking first. What's your name?"],
  ['customer', 'Maya Benton. Maya is M, A, Y, A, and Benton is B, E, N, T, O, N.'],
  ['host', 'Thank you. And your address?'],
  ['customer', "It's 14 Bridge Street."],
  ['host', 'Did you say Bay Street?'],
  ['customer', 'No, Bridge Street — like the structure you cross. Number 14.'],
  ['host', 'Got it. How did you hear about the walks? Was it through a friend?'],
  ['customer', 'A friend follows your classes, but I actually found the walk in your newsletter.'],
  ['host', 'Right. We have places on the fifteenth and the sixteenth of October.'],
  ['customer', "The fifteenth is difficult because I'm working in the morning. Please put me down for 16 October."],
  ['host', 'Certainly. How would you describe your photography experience?'],
  ['customer', "I use my phone a lot, but I've only just bought a proper camera. So I'm definitely a beginner."],
  ['host', "That's absolutely fine. What would you most like to photograph? We cover street portraits, boats, and architecture."],
  ['customer', "I take portraits quite often already. The old buildings are the reason I'm coming, so architecture is my main interest."],
  ['host', "Perfect. Now I'll compare the two walks. The Old Quarter walk lasts two and a half hours. It usually finishes at twelve thirty, although the group meets at nine forty-five for a ten o'clock start."],
  ['customer', 'And how much is that one?'],
  ['host', 'Thirty-eight pounds. That includes a hot drink. Most people choose coffee, but tea is available too.'],
  ['customer', 'Coffee for me, please. What about the Riverside walk?'],
  ['host', 'That one is longer: three hours. It costs forty-four pounds. We used to charge forty-two, but the boat operator raised its fee this summer.'],
  ['customer', 'Does the price include lunch?'],
  ['host', 'No, but it includes the ferry across the harbour. You can buy lunch at the market after the walk.'],
  ['customer', 'I think the Riverside route sounds better.'],
  ['host', "Good choice. Bring your camera and a charged battery. We can lend you a tripod if you need one, so don't carry extra equipment unnecessarily."],
  ['customer', 'Great. Thanks for your help.'],
  ['host', "You're welcome. I'll email the booking confirmation this afternoon."],
];

const piperPython = process.env.PIPER_PYTHON;
const piperModel = process.env.PIPER_MODEL;
const piperConfig = process.env.PIPER_CONFIG || (piperModel ? `${piperModel}.json` : '');
const speakerByRole = {
  host: process.env.PIPER_HOST_SPEAKER || '95', // VCTK p226
  customer: process.env.PIPER_CUSTOMER_SPEAKER || '107', // VCTK p225
};

if (!piperPython || !piperModel) {
  throw new Error('Set PIPER_PYTHON and PIPER_MODEL to a licensed local Piper installation and voice model.');
}
for (const requiredPath of [piperPython, piperModel, piperConfig]) {
  if (!fs.existsSync(requiredPath)) throw new Error(`Missing Piper dependency: ${requiredPath}`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  if (result.status !== 0) {
    throw new Error(`${command} failed: ${result.stderr || result.stdout}`);
  }
}

try {
  const silencePath = path.join(tempRoot, 'silence.wav');
  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i',
    'anullsrc=r=22050:cl=mono', '-t', '0.58', '-c:a', 'pcm_s16le', silencePath,
  ]);

  const concatEntries = [];
  run(piperPython, [
    rendererPath,
    '--model', piperModel,
    '--config', piperConfig,
    '--output-dir', tempRoot,
  ], {
    input: JSON.stringify({
      turns: turns.map(([role, text]) => ({
        text,
        speakerId: Number(speakerByRole[role]),
        lengthScale: role === 'host' ? 1.28 : 1.32,
      })),
    }),
  });

  turns.forEach((_, index) => {
    const segmentPath = path.join(tempRoot, `turn-${String(index + 1).padStart(2, '0')}.wav`);
    concatEntries.push(segmentPath, silencePath);
  });

  const listPath = path.join(tempRoot, 'concat.txt');
  fs.writeFileSync(listPath, concatEntries.map((entry) => `file '${entry.replaceAll("'", "'\\''")}'`).join('\n'));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listPath,
    '-af', 'aresample=44100', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '96k',
    '-metadata', 'title=Harbour City Photography Walk',
    '-metadata', 'artist=Idiomas WeLearn',
    '-metadata', 'comment=Original independent WeLearn practice audio. Voices generated with Piper VCTK (CC BY 4.0); not official IELTS material.',
    outputPath,
  ]);
  process.stdout.write(`${outputPath}\n`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
