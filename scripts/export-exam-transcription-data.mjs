import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { getMock } from '../src/data/mocks/index.ts';
import { TOEFL_FIXED_LISTENING_BY_SET } from '../src/data/toefl/listening-fixed-registry.ts';
import { TOEFL_FIXED_REPEAT_BY_SET } from '../src/data/toefl/speaking-fixed-repeat.ts';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const outputPath = path.resolve(process.argv[2] ?? path.join(root, 'tmp/pdfs/exam-transcriptions/source-data.json'));
const asrDir = path.resolve(process.argv[3] ?? path.join(root, 'tmp/pdfs/exam-transcriptions/asr-json'));

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function asr(prefix) {
  const data = readJson(path.join(asrDir, `${prefix}.json`));
  return String(data.text ?? '').replace(/\s+/g, ' ').trim();
}

function cleanUrl(url) {
  return String(url ?? '').split('?')[0];
}

function fileName(url) {
  return path.posix.basename(cleanUrl(url));
}

const output = {
  generatedAt: new Date().toISOString(),
  scope: {
    ielts: 20,
    goethe: 7,
    fce: 10,
    toefl: 20,
    totalPdfs: 57,
  },
  exams: { ielts: [], goethe: [], fce: [], toefl: [] },
};

for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const mock = getMock('ielts', `set-${setNumber}`);
  if (!mock) throw new Error(`Missing IELTS Set ${setNumber}`);
  const entries = mock.sections
    .filter((section) => section.skill === 'listening')
    .map((section, index) => ({
      order: index + 1,
      title: section.title,
      audioFiles: [fileName(section.audioUrl)],
      transcript: section.transcript?.trim() ?? '',
      sourceType: 'editorial-script',
    }));
  if (entries.length !== 4 || entries.some((entry) => !entry.transcript)) {
    throw new Error(`Incomplete IELTS transcript for Set ${setNumber}`);
  }
  output.exams.ielts.push({
    setNumber,
    title: mock.title,
    subtitle: mock.subtitle,
    activeAudioFiles: [...new Set(entries.flatMap((entry) => entry.audioFiles))],
    entries,
  });
}

for (let setNumber = 1; setNumber <= 7; setNumber += 1) {
  const mock = getMock('goethe', `a1-${setNumber}`);
  if (!mock) throw new Error(`Missing Goethe A1 Set ${setNumber}`);
  const script = setNumber <= 2
    ? readJson(path.join(root, `src/data/mocks/goethe-a1-set-${setNumber}-audio.json`))
    : (await import(pathToFileURL(path.join(root, `src/data/mocks/goethe-a1-set-${setNumber}.ts`)).href)).audioManifest;
  const manifest = readJson(path.join(root, `public/audio/goethe/a1-${setNumber}/manifest.json`));
  const entries = script.parts.map((part) => ({
    order: part.id,
    title: `Hören - Teil ${part.id}`,
    audioFiles: [
      `hoeren-teil${part.id}.mp3`,
      ...part.items.map((item) => `item-${String(item.number).padStart(2, '0')}.mp3`),
    ],
    plays: part.plays,
    intro: part.intro,
    example: part.example?.turns ?? [],
    items: part.items,
    outro: part.outro ?? '',
    sourceType: 'production-script',
  }));
  const activeAudioFiles = (manifest.outputs ?? []).map((item) => path.basename(item.file));
  output.exams.goethe.push({
    setNumber,
    level: 'A1',
    title: mock.title,
    subtitle: mock.subtitle,
    activeAudioFiles,
    entries,
  });
}

for (let setNumber = 1; setNumber <= 10; setNumber += 1) {
  const mock = getMock('cambridge-b2', `set-${setNumber}`);
  if (!mock) throw new Error(`Missing Cambridge B2 Set ${setNumber}`);
  const sections = mock.sections.filter((section) => section.skill === 'listening');
  const entries = sections.map((section, index) => {
    const audio = fileName(section.audioUrl);
    return {
      order: index + 1,
      title: section.title,
      audioFiles: [audio],
      transcript: asr(`fce-set-${String(setNumber).padStart(2, '0')}-${path.parse(audio).name}`),
      sourceType: 'local-asr',
    };
  });
  if (entries.length !== 4 || entries.some((entry) => !entry.transcript)) {
    throw new Error(`Incomplete FCE transcript for Set ${setNumber}`);
  }
  output.exams.fce.push({
    setNumber,
    title: mock.title,
    subtitle: mock.subtitle,
    activeAudioFiles: entries.flatMap((entry) => entry.audioFiles),
    entries,
  });
}

for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const rawModule = await import(pathToFileURL(path.join(root, `src/data/mocks/toefl-set-${setNumber}.ts`)).href);
  const raw = rawModule.default;
  const expansion = TOEFL_FIXED_LISTENING_BY_SET[setNumber];
  const entries = [];
  const legacyListening = raw.sections.filter((section) => section.skill === 'listening');
  const legacyChoose = legacyListening[0]?.questions.filter((question) => question.audioUrl) ?? [];

  for (const [index, question] of legacyChoose.slice(0, 5).entries()) {
    entries.push({
      order: entries.length + 1,
      group: 'Listening Module 1 - Choose a Response',
      title: `Choose a Response ${index + 1}`,
      audioFiles: [fileName(question.audioUrl)],
      transcript: asr(`toefl-set-${String(setNumber).padStart(2, '0')}-listen-choose-${index + 1}`),
      sourceType: 'local-asr',
    });
  }

  for (const entry of expansion.module1ChooseAdditions) {
    entries.push({
      order: entries.length + 1,
      group: 'Listening Module 1 - Choose a Response',
      title: `Choose a Response ${path.parse(entry.plannedAudioUrl).name.match(/(\d+)$/)?.[1] ?? ''}`,
      audioFiles: [fileName(entry.plannedAudioUrl)],
      transcript: entry.script.trim(),
      sourceType: 'production-script',
    });
  }

  for (const section of legacyListening.slice(1, 4)) {
    entries.push({
      order: entries.length + 1,
      group: 'Listening Module 1 - Extended Audio',
      title: section.title,
      audioFiles: [fileName(section.audioUrl)],
      transcript: section.transcript?.trim() ?? '',
      sourceType: 'editorial-script',
    });
  }

  for (const entry of expansion.module2.choose) {
    entries.push({
      order: entries.length + 1,
      group: 'Listening Module 2 - Choose a Response',
      title: `Choose a Response ${path.parse(entry.plannedAudioUrl).name.match(/(\d+)$/)?.[1] ?? ''}`,
      audioFiles: [fileName(entry.plannedAudioUrl)],
      transcript: entry.script.trim(),
      sourceType: 'production-script',
    });
  }

  for (const entry of [expansion.module2.conversation, expansion.module2.announcement, expansion.module2.academic]) {
    entries.push({
      order: entries.length + 1,
      group: 'Listening Module 2 - Extended Audio',
      title: entry.title,
      audioFiles: [fileName(entry.plannedAudioUrl)],
      transcript: entry.script.trim(),
      sourceType: 'production-script',
    });
  }

  const speakingSections = raw.sections.filter((section) => section.skill === 'speaking');
  const rawQuestions = speakingSections.flatMap((section) => section.questions);
  const repeats = rawQuestions.filter((question) => question.type === 'repeat').slice(0, 5);
  for (const question of repeats) {
    entries.push({
      order: entries.length + 1,
      group: 'Speaking - Listen and Repeat',
      title: `Repeat ${question.itemNumber}`,
      audioFiles: [fileName(question.audioUrl)],
      transcript: question.targetSentence.trim(),
      sourceType: 'production-script',
    });
  }
  for (const repeat of TOEFL_FIXED_REPEAT_BY_SET[setNumber] ?? []) {
    entries.push({
      order: entries.length + 1,
      group: 'Speaking - Listen and Repeat',
      title: `Repeat ${repeat.itemNumber}`,
      audioFiles: [fileName(repeat.plannedAudioUrl)],
      transcript: repeat.targetSentence.trim(),
      sourceType: 'production-script',
    });
  }

  const interviews = rawQuestions
    .filter((question) => question.type === 'speak')
    .sort((a, b) => a.partNumber - b.partNumber);
  for (const question of interviews) {
    entries.push({
      order: entries.length + 1,
      group: 'Speaking - Take an Interview',
      title: `Interview ${question.partNumber}`,
      audioFiles: [`interview-${question.partNumber}.mp3`],
      transcript: question.text.replace(/^Interviewer:\s*/i, '').trim(),
      sourceType: 'production-script',
    });
  }

  if (entries.length !== 33 || entries.some((entry) => !entry.transcript || entry.audioFiles.length !== 1)) {
    throw new Error(`Incomplete TOEFL transcript inventory for Set ${setNumber}: ${entries.length}`);
  }
  output.exams.toefl.push({
    setNumber,
    title: raw.title,
    subtitle: raw.subtitle,
    activeAudioFiles: entries.flatMap((entry) => entry.audioFiles),
    entries,
  });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, scope: output.scope }, null, 2));
