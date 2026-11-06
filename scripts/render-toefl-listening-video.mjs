#!/usr/bin/env node
/** Render an original, fixed-form TOEFL Listening practice set. Run with the TS path loader. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const set = Number(process.argv[process.argv.indexOf('--set') + 1]);
if (!Number.isInteger(set) || set < 1 || set > 20) throw new Error('Use --set 1..20');
const render = process.argv.includes('--render');
const out = path.join(root, `output/youtube/toefl-set-${set}-listening`);
await fs.mkdir(out, { recursive: true });
const raw = (await import(path.join(root, `src/data/mocks/toefl-set-${set}.ts`))).default;
const { withToefl2026FixedListening } = await import(path.join(root, 'src/data/mocks/toefl-fixed-form.ts'));
const { TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID } = await import(path.join(root, 'src/server/toefl/listening-registry.ts'));
const sections = withToefl2026FixedListening(raw).sections.filter(s => s.skill === 'listening');
const questions = sections.flatMap(s => s.questions);
if (sections.length !== 8 || questions.length !== 34) throw new Error(`Set ${set}: expected 8 sections and 34 questions`);
const scoring = TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID[questions[0].objectId];
if (!scoring || scoring.items.length !== 34) throw new Error(`Set ${set}: missing scoring key`);
const answerById = new Map(scoring.items.map(item => [item.itemId, item.correctOptionId]));
const answers = questions.map((q, index) => {
  const option = q.options.find(o => o.id === answerById.get(q.id));
  if (!option || q.options.length !== 4) throw new Error(`Set ${set}: invalid answer for ${q.id}`);
  return { number: index + 1, answer: option.label, id: q.id };
});
const probe = file => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' }).trim());
const media = url => {
  if (!url?.startsWith('/audio/toefl/')) throw new Error(`Set ${set}: missing audio ${url}`);
  return path.join(root, 'public', url);
};
for (const s of sections) {
  if (s.audioUrl) await fs.access(media(s.audioUrl));
  else for (const q of s.questions) await fs.access(media(q.audioUrl));
}

const W = 1920, H = 1080;
const esc = s => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const wrap = (value, max = 65) => {
  const words = String(value).replace(/\s+/g, ' ').trim().split(' ');
  const lines = []; let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
};
const text = (x, y, value, size = 30, color = '#112853', weight = 600) => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
const lines = (x, y, value, size, gap, max, color = '#112853', weight = 600) => wrap(value, max).map((line, i) => text(x, y + i * gap, line, size, color, weight)).join('');
const chrome = () => `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07163A"/><stop offset=".52" stop-color="#073FB0"/><stop offset="1" stop-color="#061536"/></linearGradient>
  <radialGradient id="orb"><stop stop-color="#B9DAFF" stop-opacity=".42"/><stop offset="1" stop-color="#B9DAFF" stop-opacity="0"/></radialGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFFFFF" stop-opacity=".88"/><stop offset=".48" stop-color="#D6EAFF" stop-opacity=".50"/><stop offset="1" stop-color="#FFFFFF" stop-opacity=".72"/></linearGradient>
  <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFFFFF" stop-opacity=".98"/><stop offset="1" stop-color="#EAF3FF" stop-opacity=".96"/></linearGradient>
  <filter id="shadow" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="15"/></filter>
  </defs><rect width="1920" height="1080" fill="url(#bg)"/><circle cx="450" cy="90" r="650" fill="url(#orb)"/><circle cx="1660" cy="850" r="600" fill="url(#orb)"/>
  <path d="M0 785 C560 610 1060 1070 1920 685" fill="none" stroke="#FFD426" stroke-opacity=".65" stroke-width="94"/>
  <rect x="69" y="43" width="425" height="86" rx="43" fill="#021334" opacity=".45" filter="url(#shadow)"/><rect x="64" y="37" width="425" height="86" rx="43" fill="url(#glass)" stroke="#FFFFFF" stroke-width="2" stroke-opacity=".84"/><path d="M91 52 Q260 31 456 53" fill="none" stroke="white" stroke-width="3" stroke-opacity=".8"/>${text(96, 92, `TOEFL  ·  SET ${set}`, 28, '#0A2862', 800)}
  <rect x="1370" y="964" width="486" height="74" rx="37" fill="#00143A" opacity=".45" filter="url(#shadow)"/><rect x="1364" y="959" width="486" height="74" rx="37" fill="url(#glass)" stroke="#FFFFFF" stroke-width="2" stroke-opacity=".84"/><path d="M1390 973 Q1600 952 1821 974" fill="none" stroke="white" stroke-width="3" stroke-opacity=".8"/>${text(1401, 1006, 'WELEARN  ·  ORIGINAL PRACTICE', 23, '#0A2862', 800)}`;
const panel = (title, eyebrow, body) => `<rect x="82" y="169" width="1756" height="750" rx="40" fill="#000C2C" opacity=".35" filter="url(#shadow)"/><rect x="76" y="162" width="1756" height="750" rx="40" fill="url(#panel)" stroke="#FFFFFF" stroke-width="3"/><rect x="124" y="208" width="12" height="91" rx="6" fill="#FFD426"/>${text(160, 233, eyebrow.toUpperCase(), 25, '#C58100', 800)}${text(160, 288, title, 48, '#092659', 800)}<line x1="160" y1="318" x2="1750" y2="318" stroke="#C4D7ED" stroke-width="2"/>${body}`;
const brand = path.join(root, 'public/images/welearn-wordmark-transparent-v2.png');
const logoRaw = await sharp(brand).resize({ width: 295 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < logoRaw.data.length; i += 4) if (logoRaw.data[i + 2] > logoRaw.data[i] * 1.2) logoRaw.data[i] = logoRaw.data[i + 1] = logoRaw.data[i + 2] = 255;
const logo = await sharp(logoRaw.data, { raw: logoRaw.info }).png().toBuffer();
const heroLogo = await sharp(brand).resize({ width: 520 }).png().toBuffer();
const scenes = [], audioFiles = [];
let clock = 0;
const draw = async (name, body, duration, hero = false) => {
  if (duration <= 0) throw new Error(`Bad duration ${name}`);
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${chrome()}${body}</svg>`);
  const file = path.join(out, `${name}.png`);
  const layers = [{ input: logo, left: 1510, top: 33 }];
  if (hero) layers.push({ input: heroLogo, left: 160, top: 595 });
  await sharp(svg).composite(layers).png().toFile(file);
  scenes.push({ name, start: clock, end: clock + duration, file }); clock += duration;
};
const silence = {};
for (const seconds of [3, 5, 8, 9, 10, 14]) {
  const file = path.join(out, `silence-${seconds}.mp3`);
  try { await fs.access(file); } catch { execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(seconds), '-c:a', 'libmp3lame', '-b:a', '128k', file]); }
  silence[seconds] = { file, duration: probe(file) };
}
const addSilence = seconds => { audioFiles.push(silence[seconds].file); return silence[seconds].duration; };
const addAudio = url => { const file = media(url); audioFiles.push(file); return probe(file); };
const displayTitle = s => s.title.replace(/^Listening Módulo \d — /, '');
const questionCard = (q, n, module) => {
  const qLines = wrap(q.text, 74);
  const top = 396 + (qLines.length - 1) * 42;
  const options = q.options.map((o, i) => {
    const y = top + 50 + i * 105;
    const parts = wrap(o.text, 79);
    if (parts.length > 2) throw new Error(`Set ${set}: option overflow ${q.id}`);
    return `<rect x="170" y="${y - 38}" width="1510" height="87" rx="18" fill="#E4EFFD"/><circle cx="220" cy="${y + 4}" r="28" fill="#FFD426"/>${text(203, y + 15, o.label, 32, '#07163A', 800)}${lines(278, y + (parts.length === 1 ? 13 : -3), o.text, 30, 33, 79, '#193E79')}`;
  }).join('');
  if (top + 50 + 3 * 105 + 49 > 895) throw new Error(`Set ${set}: question card overflow ${q.id}`);
  return panel('Question ' + n, `Module ${module}  ·  ${q.task.replaceAll('-', ' ')}`, `${lines(170, 390, q.text, 39, 42, 74, '#103369', 700)}${options}`);
};

await draw('00-intro', panel('TOEFL LISTENING', 'WeLearn', `${text(160, 468, `PRACTICE SET ${set}  ·  2 MODULES`, 51, '#15458B', 800)}${text(160, 550, '34 questions  ·  answers at the end', 38, '#3D6191')}${text(160, 864, 'Original WeLearn practice · fixed format', 29, '#607AA0')}`), addSilence(5), true);
await draw('01-instructions', panel('Instructions', 'TOEFL Listening', `${lines(160, 434, 'Listen once. Read each question and choose A, B, C or D. Pause the video if you need more time.', 43, 62, 72, '#173864')}${text(160, 735, 'This is independent, fixed-format practice.', 31, '#52749E')}`), addSilence(8));
let number = 0;
const chapters = [{ time: 0, label: 'TOEFL Listening — Introduction' }];
for (const section of sections) {
  const module = section.moduleId === 'listening-1' ? 1 : 2;
  const type = displayTitle(section);
  chapters.push({ time: clock, label: `Module ${module} — ${type}` });
  if (section.audioUrl) {
    await draw(`section-${String(number + 1).padStart(2, '0')}-listen`, panel(type, `Module ${module}  ·  Questions ${number + 1}–${number + section.questions.length}`, `${lines(160, 445, 'Listen carefully. The questions will appear after the audio.', 43, 62, 70, '#173864')}${text(160, 735, 'You may take notes.', 32, '#52749E')}`), addAudio(section.audioUrl));
    for (const q of section.questions) {
      number++;
      await draw(`question-${String(number).padStart(2, '0')}`, questionCard(q, number, module), addSilence(10));
    }
  } else {
    for (const q of section.questions) {
      number++;
      const clipDuration = addAudio(q.audioUrl);
      const pauseDuration = addSilence(8);
      await draw(`question-${String(number).padStart(2, '0')}`, questionCard(q, number, module), clipDuration + pauseDuration);
    }
  }
}
if (number !== 34) throw new Error('Question numbering changed');
chapters.push({ time: clock, label: 'Answer key follows' });
await draw('90-answer-intro', panel('Answer key next', 'Check your work', `${lines(160, 470, 'Pause here if you need more time. Then score your answers out of 34.', 44, 66, 67, '#173864')}`), addSilence(9));
for (const [module, part] of [[1, answers.slice(0, 18)], [2, answers.slice(18)]]) {
  chapters.push({ time: clock, label: `Answers Module ${module}` });
  const entries = part.map((a, i) => {
    const x = i < 9 ? 165 : 1010;
    const y = 380 + (i % 9) * 52;
    return `<rect x="${x}" y="${y - 33}" width="700" height="44" rx="12" fill="#E4EFFD"/>${text(x + 18, y, `${String(a.number).padStart(2, '0')}  ${a.answer}`, 27, '#153261', 800)}`;
  }).join('');
  await draw(`91-answers-module-${module}`, panel('Answer key', `Module ${module}`, `${entries}${text(165, 869, 'Check the same set on idiomaswl.com', 26, '#52749E')}`), addSilence(14));
}
await draw('99-finish', panel('Practice complete', 'WeLearn', `${lines(160, 480, 'Review every answer and keep practicing at idiomaswl.com', 44, 66, 70, '#173864')}`), addSilence(8));

const headphone = `<g transform="translate(1250 205)"><path d="M90 350V265C90 104 218 0 355 0s265 104 265 265v85" fill="none" stroke="#FFFFFF" stroke-width="77" stroke-linecap="round"/><path d="M90 350V265C90 104 218 0 355 0s265 104 265 265v85" fill="none" stroke="#FFD426" stroke-width="45" stroke-linecap="round"/><rect x="12" y="293" width="165" height="276" rx="74" fill="#EAF4FF" stroke="#072C79" stroke-width="23"/><rect x="533" y="293" width="165" height="276" rx="74" fill="#EAF4FF" stroke="#072C79" stroke-width="23"/><rect x="57" y="332" width="80" height="200" rx="38" fill="#FFD426"/><rect x="573" y="332" width="80" height="200" rx="38" fill="#FFD426"/><path d="M250 335v100m70-150v200m70-245v290m70-190v100" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/></g>`;
const thumb = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${chrome()}${text(100, 345, 'TOEFL', 126, '#FFFFFF', 800)}<rect x="78" y="413" width="1100" height="208" rx="43" fill="#FFD426"/>${text(116, 557, 'LISTENING TEST', 106, '#071A4B', 800)}${text(100, 692, '34 QUESTIONS + ANSWERS', 64, '#FFFFFF', 800)}${headphone}</svg>`;
await sharp(Buffer.from(thumb)).composite([{ input: logo, left: 1510, top: 33 }]).png().toFile(path.join(out, 'thumbnail.png'));
const sourceUrl = `https://www.idiomaswl.com/practica/toefl/listening/simulacros/practica/set-${set}`;
const stamp = seconds => `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds % 3600 / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`.replace(/^00:/, '');
const chapterLines = chapters.map(c => `${stamp(c.time)} ${c.label}`);
const answerLines = [`Module 1: ${answers.slice(0, 18).map(a => `${a.number} ${a.answer}`).join(' · ')}`, `Module 2: ${answers.slice(18).map(a => `${a.number} ${a.answer}`).join(' · ')}`];
const metadata = {
  exam: 'toefl', set: `set-${set}`,
  title: `TOEFL iBT Listening Practice Set ${set} | 34 Questions + Answers | WeLearn`,
  description: `TOEFL iBT Listening practice set ${set}: 34 original questions in two fixed modules, with audio, on-screen options and answers at the end. Pause the video when you need more time.\n\nPractice this WeLearn set and check your answers: ${sourceUrl}\n\nCHAPTERS\n${chapterLines.join('\n')}\n\nANSWER KEY — SPOILERS\n${answerLines.join('\n')}\n\nIndependent fixed-format practice by WeLearn. This is not a full official TOEFL iBT test, adaptive delivery or an ETS score. Not affiliated with or endorsed by ETS.\n\n#TOEFLListening #TOEFLPractice #WeLearn`,
  url: sourceUrl,
  video: `output/youtube/toefl-set-${set}-listening/welearn-toefl-set-${set}-full-listening.mp4`,
  thumbnail: `output/youtube/toefl-set-${set}-listening/thumbnail.png`,
  chapters: chapterLines,
  answers: answerLines,
};
await fs.writeFile(path.join(out, 'metadata.json'), JSON.stringify(metadata, null, 2) + '\n');
await fs.writeFile(path.join(out, 'timeline.json'), JSON.stringify({ set, videoDuration: clock, answers, scenes: scenes.map(({ name, start, end }) => ({ name, start, end })) }, null, 2) + '\n');
const quote = file => `'${file.replaceAll("'", "'\\''")}'`;
await fs.writeFile(path.join(out, 'frames.ffconcat'), `ffconcat version 1.0\n${scenes.map(s => `file ${quote(s.file)}\nduration ${(s.end - s.start).toFixed(6)}\n`).join('')}file ${quote(scenes.at(-1).file)}\n`);
await fs.writeFile(path.join(out, 'audio.ffconcat'), `ffconcat version 1.0\n${audioFiles.map(file => `file ${quote(file)}\n`).join('')}`);
console.log(`Set ${set}: ${scenes.length} cards, ${stamp(clock)}, 34 verified answers`);
if (render) {
  const destination = path.join(out, `welearn-toefl-set-${set}-full-listening.mp4`);
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-safe', '0', '-f', 'concat', '-i', path.join(out, 'frames.ffconcat'), '-safe', '0', '-f', 'concat', '-i', path.join(out, 'audio.ffconcat'), '-map', '0:v:0', '-map', '1:a:0', '-r', '5', '-t', String(clock), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', destination], { stdio: 'inherit' });
  if (Math.abs(probe(destination) - clock) > 0.3) throw new Error(`Set ${set}: rendered duration mismatch`);
  console.log(`Rendered ${destination}`);
}
