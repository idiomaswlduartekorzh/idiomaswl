import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(
  repoRoot,
  'docs/ielts-superhub/candidates/welearn-listening-part-3-001/welearn-listening-part-3-001.mp3',
);
const rendererPath = path.join(repoRoot, 'scripts/lib/render-ielts-piper-segments.py');
const tempParent = process.env.IELTS_AUDIO_TEMP_ROOT || os.tmpdir();
fs.mkdirSync(tempParent, { recursive: true });
const tempRoot = fs.mkdtempSync(path.join(tempParent, 'welearn-ielts-listening-part3-'));

const turns = [
  ['tutor', `Thanks for coming, Lara and Jonah. I read your notes from the Mereford first-year ensemble session. Let’s review what happened before we plan the second trial.`],
  ['lara', `We tested the rehearsal feedback cards with twenty-four students. After listening to a short performance, each student chose one of three headings and wrote a brief observation.`],
  ['jonah', `The headings were timing, balance and entries. We explained that balance meant whether every musical part could be heard clearly, while an entry was the moment a player began after a pause.`],
  ['tutor', `And what did you expect the cards to produce?`],
  ['lara', `We expected comments to be spread fairly evenly across all three headings.`],
  ['jonah', `But eighteen of the twenty-four cards only said that a section should play louder or more quietly. Volume was simply the easiest feature for listeners to notice.`],
  ['lara', `It wasn’t a timing problem. Everyone finished within the minute we allowed, and the students wrote the comments themselves rather than relying on the tutor.`],
  ['tutor', `So the trial showed that the original cards encouraged attention to one obvious feature instead of a wider range of musical details.`],
  ['tutor', `How did the colour system work?`],
  ['lara', `We printed timing on blue cards, balance on green cards and entries on amber cards.`],
  ['jonah', `The print stayed clear under the rehearsal-room lights, and the card bundles were easy to find on every table.`],
  ['lara', `The difficulty was the meaning students gave the colours. Several treated green as a compliment and amber as a warning, as if the cards were judging whether the performance was good or bad.`],
  ['tutor', `Then remove the colours. Use plain black headings and add a one-line question under each heading so that students focus on the topic rather than inventing a rating system.`],
  ['tutor', `When do you intend to collect the next set of comments?`],
  ['jonah', `My first thought was an online form completed the following day.`],
  ['lara', `I wondered whether we should collect everything at the end of the full rehearsal, which lasts about fifty minutes.`],
  ['tutor', `Both options leave too much time between listening and responding. After each four-minute performance, allow ninety seconds for students to complete one card. Collect the cards before anyone discusses the performance.`],
  ['jonah', `That should keep the comments connected to what they have just heard.`],
  ['tutor', `What exactly will you compare in the second trial?`],
  ['lara', `We considered comparing comments from different groups of instruments.`],
  ['jonah', `Another possibility was to compare anonymous cards with cards carrying the writer’s name.`],
  ['tutor', `Either choice would introduce a new variable. Have the ensemble perform the same short passage twice. Discuss the first set of cards between performances, then compare whether the same musical issue is still present in the second performance.`],
  ['lara', `So the comparison is between the first and second versions of one passage, not between different students or instruments.`],
  ['tutor', `Exactly. What evidence should be central to your report?`],
  ['lara', `The total number of cards returned will be easy to count.`],
  ['jonah', `We also planned one question asking whether students enjoyed the activity.`],
  ['tutor', `Keep those as supporting information. Your main evidence should show whether the problem identified after the first performance is reduced in the repeated performance.`],
  ['jonah', `For example, if several cards say that players begin at different moments, we should check whether they begin more closely together the second time.`],
  ['tutor', `Correct. Now let’s assign the remaining work. First, the category headings need simpler wording.`],
  ['jonah', `I can shorten them, although Lara has already tried a few alternatives.`],
  ['lara', `I drafted questions such as “Do the players begin together?” and “Can every part be heard?” I’m happy to finish that work.`],
  ['tutor', `Given that preparation, Lara should take the headings forward and turn those drafts into the final set.`],
  ['tutor', `Next, we need two short passages that can each be performed twice without taking too much rehearsal time.`],
  ['lara', `I don’t have the complete rehearsal score.`],
  ['jonah', `I do, and I marked three possible passages yesterday. I can select two and time them before Friday.`],
  ['tutor', `Then Jonah, bring me two timed extracts by Friday.`],
  ['tutor', `The consent wording also needs checking because the students’ comments will be used in your course report.`],
  ['jonah', `Can one of us approve that?`],
  ['tutor', `No. It has to be checked by the course tutor. I’ll review the wording and confirm that no student names are collected.`],
  ['lara', `So that remains your task, Dr Harlow.`],
  ['tutor', `Yes. Who will manage the cards during the next rehearsal?`],
  ['lara', `I’ll be playing in the demonstration group, so I can’t move around collecting them.`],
  ['jonah', `I’m not performing in that session. I can put the cards on the tables, collect them after each performance and keep the two sets separate.`],
  ['tutor', `Jonah, you’ll handle the rehearsal materials and keep both rounds apart.`],
  ['tutor', `Finally, we need one summary visual for the report.`],
  ['jonah', `I’ll already be timing the passages and organising the cards.`],
  ['lara', `I can design the visual. I’ll show the first and second performances side by side, using the same categories for both.`],
  ['tutor', `Excellent. Lara, take responsibility for presenting that comparison visually. Bring the revised cards and passages to me on Friday, and we’ll confirm whether everything is ready.`],
];

const piperPython = process.env.PIPER_PYTHON;
const piperModel = process.env.PIPER_MODEL;
const piperConfig = process.env.PIPER_CONFIG || (piperModel ? `${piperModel}.json` : '');
const expectedPiperVersion = '1.7.0';
const expectedPiperModelSha256 = '4e9fc85ab9009385319fc6bae7f55577f8a2d7ee77fd9159a5500eb6531f41e6';
const expectedPiperConfigSha256 = '7f85e6391ed0f7f46e4abd19345929a16be931a0c9945086f96692dce2087fa8';
const expectedRendererSha256 = '7445edddb7193c1178a9d794b85385583e05aadd76cac06a140e05ec22e3a0a0';
const speakerByRole = {
  tutor: 74,
  lara: 107,
  jonah: 95,
};
const lengthScaleByRole = {
  tutor: 1.22,
  lara: 1.28,
  jonah: 1.26,
};

if (!piperPython || !piperModel) {
  throw new Error('Set PIPER_PYTHON and PIPER_MODEL to a licensed local Piper installation and voice model.');
}
for (const requiredPath of [piperPython, piperModel, piperConfig]) {
  if (!fs.existsSync(requiredPath)) throw new Error(`Missing Piper dependency: ${requiredPath}`);
}

function fileSha256(filePath) {
  return createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

if (fileSha256(piperModel) !== expectedPiperModelSha256) {
  throw new Error('PIPER_MODEL does not match the audited en_GB-vctk-medium model checksum.');
}
if (fileSha256(piperConfig) !== expectedPiperConfigSha256) {
  throw new Error('PIPER_CONFIG does not match the audited en_GB-vctk-medium configuration checksum.');
}
if (fileSha256(rendererPath) !== expectedRendererSha256) {
  throw new Error('The Piper segment renderer does not match its audited checksum.');
}
const piperVersionResult = spawnSync(
  piperPython,
  ['-c', "from importlib.metadata import version; print(version('piper-tts'))"],
  { encoding: 'utf8' },
);
if (piperVersionResult.status !== 0 || piperVersionResult.stdout.trim() !== expectedPiperVersion) {
  throw new Error(`PIPER_PYTHON must provide piper-tts ${expectedPiperVersion}.`);
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
    'anullsrc=r=22050:cl=mono', '-t', '0.42', '-c:a', 'pcm_s16le', silencePath,
  ]);

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
        lengthScale: lengthScaleByRole[role],
      })),
    }),
  });

  const concatEntries = [];
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
    '-metadata', 'title=Mereford Ensemble Feedback Trial',
    '-metadata', 'artist=Idiomas WeLearn',
    '-metadata', 'comment=Draft original WeLearn candidate. Three voices generated with Piper VCTK (CC BY 4.0); not official IELTS material and not approved for publication.',
    outputPath,
  ]);
  process.stdout.write(`${outputPath}\n`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
