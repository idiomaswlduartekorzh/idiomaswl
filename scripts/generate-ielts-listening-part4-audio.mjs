import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(
  repoRoot,
  'docs/ielts-superhub/candidates/welearn-listening-part-4-001/welearn-listening-part-4-001.mp3',
);
const rendererPath = path.join(repoRoot, 'scripts/lib/render-ielts-piper-segments.py');
const tempParent = process.env.IELTS_AUDIO_TEMP_ROOT || path.join(repoRoot, 'tmp/ielts-audio');
fs.mkdirSync(tempParent, { recursive: true });
const tempRoot = fs.mkdtempSync(path.join(tempParent, 'welearn-ielts-listening-part4-'));

const segments = [
  `Today we will examine why the number of visible fabric pills can rise and then fall during repeated wear. A simple count cannot by itself show how readily pills form, because older pills may also disappear.`,
  `Let us begin with the first stage. Many woven and knitted fabrics use staple-fibre yarns, so some fibre ends lie near the yarn exterior. During ordinary use, rubbing loosens some of those ends without removing them. It draws them above the fabric surface and produces a fine exposed layer called fuzz. The ends remain part of the yarn, although they now project from it.`,
  `Once fuzz is present, further friction moves the raised ends in several directions. That force can act during washing; it also occurs when a sleeve rubs against a desk or a bag moves across a coat. Heat is not required for neighbouring ends to meet and cross.`,
  `As those ends cross, they catch one another. Continued movement tightens the loose material into a small ball. The new cluster is visible, although untangled fuzz may still surround it, and it can tighten further as rubbing continues.`,
  `The new pill does not simply sit on top of the cloth. Several fibres usually remain unbroken and run back into the yarn. These anchor fibres keep the pill attached to the material. This connection allows the cluster to survive further wear even after the surrounding loose fuzz has disappeared.`,
  `That connection does not always last. Continued rubbing may pull an anchor out or cause it to break. When the remaining anchors fail, the pill can detach from the cloth. Fewer visible pills after prolonged wear do not therefore prove that no new ones formed; some may have appeared earlier and already worn away.`,
  `We can now see why two materials may look different even when they initially produce similar amounts of fuzz. Fibre strength affects the time for which a pill remains visible. Strong anchors resist breaking, so a cluster can stay on the cloth for longer, while weak anchors may release it sooner. Pill persistence and initial fuzz production are therefore separate properties.`,
  `Next, consider how researchers rate the samples. Counting the pills seems objective, and the count is useful, but it is not sufficient by itself. Ten tiny pills that are close in colour to the cloth may be less noticeable than ten large, pale pills on a dark sample. A simple count ignores both size and colour contrast. These visual properties can strongly influence the grade an observer gives.`,
  `Photography helps researchers keep a record, but only when the conditions are controlled. Every sample should be photographed with the same lighting. A lamp placed too low can create deep shadows around the pills and make the surface look more severely damaged, while moving the lamp can flatten those shadows. Controlled photography prevents that artificial change in appearance.`,
  `Distance and camera angle should also remain fixed so images from different days can be compared fairly. Magnified images may support a separate analysis, but they are not part of this study’s standard visual record.`,
  `Suppose students want to compare two finishing treatments. They should begin with equivalent specimens cut from the same batch of fabric. For this trial, every specimen must pass through the same washing procedure before it is rated. One group cannot be washed gently while another is exposed to hotter water or a longer wash, because that would mix the effect of treatment with the effect of washing.`,
  `Students should not remove existing pills before rating, and specimen dimensions and fabric construction must remain consistent. Otherwise the result may reflect uncontrolled sample differences rather than the finishing treatment.`,
  `A visual grade records appearance at one moment; it neither predicts garment life nor proves that washing caused the damage.`,
  `The main conclusion is that visible pilling reflects a balance. On one side, loose fibres are exposed and gathered into new pills. On the other, older pills lose their anchors and disappear through wear-off. A material can look badly pilled because formation is rapid, because wear-off is slow, or because both processes occur together. Understanding these two rates is essential before we compare treatments or judge the quality of a fabric.`,
];

const piperPython = process.env.PIPER_PYTHON;
const piperModel = process.env.PIPER_MODEL;
const piperConfig = process.env.PIPER_CONFIG || (piperModel ? `${piperModel}.json` : '');
const expectedPiperVersion = '1.7.0';
const expectedPiperModelSha256 = '4e9fc85ab9009385319fc6bae7f55577f8a2d7ee77fd9159a5500eb6531f41e6';
const expectedPiperConfigSha256 = '7f85e6391ed0f7f46e4abd19345929a16be931a0c9945086f96692dce2087fa8';
const expectedRendererSha256 = '7445edddb7193c1178a9d794b85385583e05aadd76cac06a140e05ec22e3a0a0';
const lecturerSpeakerId = 74;
const lecturerLengthScale = 1.2;

if (!piperPython || !piperModel) {
  throw new Error('Set PIPER_PYTHON and PIPER_MODEL to the audited local Piper installation and voice model.');
}
for (const requiredPath of [piperPython, piperModel, piperConfig, rendererPath]) {
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
    'anullsrc=r=22050:cl=mono', '-t', '0.48', '-c:a', 'pcm_s16le', silencePath,
  ]);

  run(piperPython, [
    rendererPath,
    '--model', piperModel,
    '--config', piperConfig,
    '--output-dir', tempRoot,
  ], {
    input: JSON.stringify({
      turns: segments.map((text) => ({
        text,
        speakerId: lecturerSpeakerId,
        lengthScale: lecturerLengthScale,
      })),
    }),
  });

  const concatEntries = [];
  segments.forEach((_, index) => {
    const segmentPath = path.join(tempRoot, `turn-${String(index + 1).padStart(2, '0')}.wav`);
    concatEntries.push(segmentPath, silencePath);
  });

  const listPath = path.join(tempRoot, 'concat.txt');
  fs.writeFileSync(listPath, concatEntries.map((entry) => `file '${entry.replaceAll("'", "'\\''")}'`).join('\n'));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listPath,
    '-af', 'aresample=44100', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '96k',
    '-metadata', 'title=From Fuzz to Wear-Off: Understanding Fabric Pilling',
    '-metadata', 'artist=Idiomas WeLearn',
    '-metadata', 'comment=Draft original WeLearn candidate. One voice generated with Piper VCTK (CC BY 4.0); not official IELTS material and not approved for publication.',
    outputPath,
  ]);
  process.stdout.write(`${outputPath}\n`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
