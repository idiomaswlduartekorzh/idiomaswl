import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(
  repoRoot,
  'docs/ielts-superhub/candidates/welearn-listening-part-2-001/welearn-listening-part-2-001.mp3',
);
const rendererPath = path.join(repoRoot, 'scripts/lib/render-ielts-piper-segments.py');
const tempParent = process.env.IELTS_AUDIO_TEMP_ROOT || os.tmpdir();
fs.mkdirSync(tempParent, { recursive: true });
const tempRoot = fs.mkdtempSync(path.join(tempParent, 'welearn-ielts-listening-part2-'));

const segments = [
  `Good morning, everyone, and welcome to the Larkspur Repair House. My name is Amira Cole, and I coordinate our Saturday Fix and Share Day. Before you choose a work table, I’ll explain how the morning runs, what your booking covers, and where the main rooms are.`,
  `The front doors open at nine o’clock, which gives you time to put away coats and check the noticeboard. I’ll give a short welcome at quarter past nine. The practical tables themselves open at half past nine, once the volunteer repairers have completed their safety checks. Please don’t begin taking anything apart while the tables are still being prepared.`,
  `If this is your first visit, you don’t need to show photo identification. Your booking code already contains the registration details we need. You also don’t need to bring a box of tools, because every table has its own checked equipment. What you should bring is one small, portable household item that you want to work on. A lamp, a torn bag or a small wooden stool is fine. Large kitchen appliances and anything leaking liquid must stay at home.`,
  `You may have noticed the bicycle station under the awning outside. We haven’t moved it there because we are confident about the weather. The forecast is actually rather uncertain. Nor is the indoor space being kept free for a delivery; the delivery van leaves before visitors arrive. The real reason is that six bicycle stands need considerably more working room than we can provide inside. The awning will keep the mechanics and bikes covered if it rains.`,
  `Families are welcome. Children under twelve can use the low family table and take part in simple jobs such as sewing on a button or sanding a wooden toy. They don’t need a separate booking. They can join the activity instead of simply watching. However, their accompanying adult must stay beside them throughout the activity.`,
  `Your six-pound booking fee covers the small materials that most repairs use: ordinary thread, sandpaper, glue sticks and standard inner-tube patches. If your repair needs a new cable, zip, switch or another replacement component, a volunteer will tell you its price before using it. Tea, fruit and cake are available, but those are supported by a separate donation box rather than the booking fee.`,
  `Let me now explain the building layout. Keep the floor plan in front of you. North is at the top, and we are standing at the entrance in the centre of the south wall.`,
  `The first place most visitors need is the Welcome Desk. As you come through the entrance, turn immediately to your right. The desk occupies the room beside the entrance on that side. There is also a counter on the left, but that is only for coat lockers, so don’t queue there with a booking question.`,
  `Next is the Tool Library. From the entrance, turn left, pass the coat lockers and continue into the large room in the far south-west corner. Last month, we temporarily kept some tools in the smaller room beside the west side of the courtyard. That room is now the materials shop, so all borrowed tools must be collected from the larger corner room.`,
  `For the Textile Studio, continue north along the western corridor. You’ll pass the courtyard on your right and eventually reach the toilets in the upper-left corner. The Textile Studio is the room immediately to the right of the toilets. The room farther along the same northern corridor is used for group meetings, not sewing.`,
  `The Testing Bench is on the other side of the building. Return to the courtyard and cross to its eastern side. The glass-fronted room directly opposite the courtyard’s western materials shop contains the testing equipment. This is where a volunteer checks repaired lamps and other low-power electrical items before they leave the building.`,
  `Finally, the Community Kitchen is farther north along that eastern corridor. Continue past the Testing Bench towards the top-right corner. You’ll see the Emergency Exit marked on the outer wall. The kitchen is the large room immediately to the left of that exit. Please keep the exit itself clear, even when refreshments are being served.`,
  `That completes the orientation. You may now leave coats in the lockers, take booking questions to the Welcome Desk and wait for the practical tables to open at half past nine.`,
];

const piperPython = process.env.PIPER_PYTHON;
const piperModel = process.env.PIPER_MODEL;
const piperConfig = process.env.PIPER_CONFIG || (piperModel ? `${piperModel}.json` : '');
const narratorSpeaker = process.env.PIPER_NARRATOR_SPEAKER || '95'; // VCTK p226

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
    'anullsrc=r=22050:cl=mono', '-t', '0.62', '-c:a', 'pcm_s16le', silencePath,
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
        speakerId: Number(narratorSpeaker),
        lengthScale: 1.27,
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
    '-metadata', 'title=Larkspur Fix & Share Day',
    '-metadata', 'artist=Idiomas WeLearn',
    '-metadata', 'comment=Draft original WeLearn candidate. Single voice generated with Piper VCTK (CC BY 4.0); not official IELTS material and not approved for publication.',
    outputPath,
  ]);
  process.stdout.write(`${outputPath}\n`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
