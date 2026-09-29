#!/usr/bin/env node
/** Full-length listening videos. Run `node scripts/render-exam-video.mjs --exam ielts|goethe --render`. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exam = process.argv.includes('--exam') ? process.argv[process.argv.indexOf('--exam') + 1] : '';
if (!['ielts', 'goethe'].includes(exam)) throw new Error('Use --exam ielts or --exam goethe');
const set = process.argv.includes('--set') ? process.argv[process.argv.indexOf('--set') + 1] : exam === 'ielts' ? 'set-2' : 'a1-1';
const render = process.argv.includes('--render');
const configFile = `${exam}-${set}.json`;
const config = JSON.parse(await fs.readFile(path.join(root, 'config/exam-videos', configFile), 'utf8'));
async function loadMock() {
  if (exam === 'goethe' && Number(set.split('-')[1]) >= 3) {
    const { getGoetheA1SetContent } = await import(path.join(root, 'src/data/mocks/goethe-a1-sets-3-10-content.ts'));
    const content = getGoetheA1SetContent(Number(set.split('-')[1]));
    return { sections: [
      { part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche', instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.', questions: content.listening1.map(q => ({ type: 'mcq', text: q.question, options: q.options })) },
      { part: 2, skill: 'listening', title: 'Hören – Teil 2: Ansagen', instructions: 'Kreuzen Sie an: Richtig oder Falsch. Sie hören jeden Text einmal.', questions: content.listening2.map(q => ({ type: 'mcq', text: q.question, options: ['Richtig', 'Falsch'] })) },
      { part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonische Nachrichten', instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.', questions: content.listening3.map(q => ({ type: 'mcq', text: q.question, options: q.options })) },
    ] };
  }
  const mockFile = exam === 'ielts' ? `ielts-${set}` : `goethe-a1-set-${set.split('-')[1]}`;
  return (await import(path.join(root, 'src/data/mocks', `${mockFile}.ts`))).default;
}
const mock = await loadMock();
const out = path.join(root, 'output/youtube', `${exam}-${config.set}-listening`);
await fs.mkdir(out, { recursive: true });
const audio = path.join(root, config.audio);
const brand = path.join(root, 'public/images/welearn-wordmark-transparent-v2.png');
const W = 1920, H = 1080, lead = 20, tail = 8;
const esc = (s) => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const probe = (file) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' }).trim());
const duration = probe(audio);
if (Math.abs(duration - config.duration) > 0.15) throw new Error(`Audio changed: expected ${config.duration}s, got ${duration}s. Re-audit timing before rendering.`);
const logoRaw = await sharp(brand).resize({ width: 295 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < logoRaw.data.length; i += 4) {
  if (logoRaw.data[i + 2] > logoRaw.data[i] * 1.2) logoRaw.data[i] = logoRaw.data[i + 1] = logoRaw.data[i + 2] = 255;
}
const logo = await sharp(logoRaw.data, { raw: logoRaw.info }).png().toBuffer();
const heroLogo = await sharp(brand).resize({ width: 520 }).png().toBuffer();

function wrap(text, max = 68) {
  const words = String(text).replace(/\s+/g, ' ').trim().split(' ');
  const lines = []; let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function label(x, y, value, size = 28, color = '#112853', weight = 600) {
  return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
}

function lines(x, y, value, size = 30, gap = 39, max = 75, color = '#112853', weight = 500) {
  return wrap(value, max).map((part, i) => label(x, y + i * gap, part, size, color, weight)).join('');
}

function chrome() {
  const top = exam === 'ielts' ? `IELTS  ·  SET ${set.split('-')[1]}` : `GOETHE  ·  A1  ·  SET ${set.split('-')[1]}`;
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07163A"/><stop offset=".52" stop-color="#12327B"/><stop offset="1" stop-color="#061536"/></linearGradient>
      <radialGradient id="orb"><stop stop-color="#B9DAFF" stop-opacity=".42"/><stop offset="1" stop-color="#B9DAFF" stop-opacity="0"/></radialGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFFFFF" stop-opacity=".88"/><stop offset=".48" stop-color="#D6EAFF" stop-opacity=".50"/><stop offset="1" stop-color="#FFFFFF" stop-opacity=".72"/></linearGradient>
      <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFFFFF" stop-opacity=".98"/><stop offset="1" stop-color="#EAF3FF" stop-opacity=".96"/></linearGradient>
      <filter id="shadow" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="15"/></filter>
    </defs>
    <rect width="1920" height="1080" fill="url(#bg)"/>
    <circle cx="450" cy="90" r="650" fill="url(#orb)"/>
    <circle cx="1660" cy="850" r="600" fill="url(#orb)"/>
    <path d="M0 700 C450 510 890 1050 1920 610" fill="none" stroke="#9AC9FF" stroke-opacity=".13" stroke-width="110"/>
    <rect x="69" y="43" width="425" height="86" rx="43" fill="#021334" opacity=".45" filter="url(#shadow)"/>
    <rect x="64" y="37" width="425" height="86" rx="43" fill="url(#glass)" stroke="#FFFFFF" stroke-width="2" stroke-opacity=".84"/>
    <path d="M91 52 Q260 31 456 53" fill="none" stroke="white" stroke-width="3" stroke-opacity=".8"/>
    ${label(96, 92, top, 28, '#0A2862', 800)}
    <rect x="1370" y="964" width="486" height="74" rx="37" fill="#00143A" opacity=".45" filter="url(#shadow)"/>
    <rect x="1364" y="959" width="486" height="74" rx="37" fill="url(#glass)" stroke="#FFFFFF" stroke-width="2" stroke-opacity=".84"/>
    <path d="M1390 973 Q1600 952 1821 974" fill="none" stroke="white" stroke-width="3" stroke-opacity=".8"/>
    ${label(1401, 1006, 'WELEARN  ·  ORIGINAL PRACTICE', 23, '#0A2862', 800)}
  `;
}

async function card(name, inside, hero = false) {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${chrome()}${inside}</svg>`);
  const file = path.join(out, `${name}.png`);
  const layers = [{ input: logo, left: 1510, top: 33 }];
  if (hero) layers.push({ input: heroLogo, left: 160, top: 595 });
  await sharp(svg).composite(layers).png().toFile(file);
  return file;
}

function panel(title, eyebrow, body) {
  return `<rect x="82" y="169" width="1756" height="750" rx="40" fill="#000C2C" opacity=".35" filter="url(#shadow)"/>
    <rect x="76" y="162" width="1756" height="750" rx="40" fill="url(#panel)" stroke="#FFFFFF" stroke-width="3"/>
    <rect x="124" y="208" width="12" height="91" rx="6" fill="#E3070C"/>
    ${label(160, 233, eyebrow.toUpperCase(), 25, '#E3070C', 800)}
    ${label(160, 288, title, 48, '#092659', 800)}
    <line x1="160" y1="318" x2="1750" y2="318" stroke="#C4D7ED" stroke-width="2"/>
    ${body}`;
}

function questionRows(question, from, to) {
  if (question.type === 'formgroup') {
    return question.template.split('\n').filter(Boolean).flatMap(raw => {
      const nums = [...raw.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1]));
      if (!nums.some(n => n >= from && n <= to)) return [];
      return [{ number: nums.find(n => n >= from && n <= to), text: raw.replace(/\{\{\d+\}\}/g, '__________').replace(/^[•\s]+/, '') }];
    });
  }
  if (question.type === 'tablegroup') {
    return question.rows.flatMap(row => row.flatMap((cell, c) => typeof cell === 'object' && cell.num >= from && cell.num <= to ? [{ number: cell.num, text: `${row[0]} · ${question.headers[c]}: __________` }] : []));
  }
  if (question.type === 'multiselect') return question.qRange[0] >= from && question.qRange[1] <= to ? [{ number: `${from}–${to}`, text: question.text, options: question.options.map(o => `${o.letter}  ${o.text}`) }] : [];
  if (question.type === 'mcq') {
    const n = Number(question.id.match(/(\d+)$/)?.[1]);
    return n >= from && n <= to ? [{ number: n, text: question.text, options: question.options.map((o, i) => `${'ABC'[i]}  ${o}`) }] : [];
  }
  return [];
}

function ieltsContent(page) {
  const section = mock.sections.find(s => s.skill === 'listening' && s.part === page.part);
  const [from, to] = page.questions;
  const rows = section.questions.flatMap(q => questionRows(q, from, to));
  if (rows.length !== to - from + 1 && !(from === 11 && to === 12 && rows.length === 1)) throw new Error(`Missing IELTS question prompts ${from}–${to}`);
  let y = 382; const blocks = [];
  const manyMcq = rows.some(r => r.options && rows.length > 2);
  if (rows.length === 1 && rows[0].options) {
    const row = rows[0];
    blocks.push(`${label(160, 403, row.text, 37, '#153261', 700)}`);
    row.options.forEach((option, i) => blocks.push(`<rect x="160" y="${444 + i * 74}" width="1450" height="58" rx="16" fill="#E3EFFD"/>${label(192, 484 + i * 74, option, 30, '#244C87', 600)}`));
    return panel(section.title.replace(/^Listening — Section \d+: /, ''), `Part ${page.part}  ·  Questions ${from}–${to}`, blocks.join(''));
  }
  for (const row of rows) {
    const max = manyMcq ? 105 : 88;
    const wrapped = wrap(row.text, max);
    const lineH = manyMcq ? 31 : 40;
    const rowH = manyMcq ? 104 : rows.length >= 8 ? 66 : 76 + (wrapped.length - 1) * lineH;
    blocks.push(`<rect x="155" y="${y - 28}" width="74" height="53" rx="17" fill="#DCEBFF"/>${label(172, y + 8, row.number, 27, '#124493', 800)}`);
    blocks.push(lines(254, y + 5, row.text, manyMcq ? 25 : 31, lineH, max, '#153261', 600));
    if (row.options) blocks.push(lines(254, y + 43 + (wrapped.length - 1) * lineH, row.options.join('     ·     '), manyMcq ? 20 : 29, 27, manyMcq ? 155 : 85, '#46658E', 500));
    y += rowH;
  }
  if (y > 950) throw new Error(`IELTS page ${from}–${to} overflows (${y})`);
  const title = section.title.replace(/^Listening — Section \d+: /, '');
  return panel(title, `Part ${page.part}  ·  Questions ${from}–${to}`, blocks.join(''));
}

function goetheContent(part, number) {
  const section = mock.sections.find(s => s.skill === 'listening' && s.part === part);
  const title = section.title.replace(/^Hören – /, '');
  if (number === null) return panel(title, `Teil ${part}  ·  Anleitung`, `${lines(160, 430, section.instructions, 43, 64, 65, '#173864', 600)}${label(160, 725, 'Das Beispiel hören Sie vor den Aufgaben.', 32, '#52749E')}`);
  const offset = part === 1 ? 1 : part === 2 ? 7 : 11;
  const q = section.questions[number - offset];
  if (!q) throw new Error(`Missing Goethe question ${number}`);
  const stem = lines(180, 480, q.text, 53, 66, 57, '#0E2E66', 700);
  const opts = q.options.map((option, i) => `<rect x="180" y="${565 + i * 94}" width="1360" height="71" rx="20" fill="#E6F0FD" stroke="#C5D8F2"/>${label(212, 613 + i * 94, `${'ABC'[i]}   ${option}`, 34, '#193E79', 600)}`).join('');
  return panel(title, `Teil ${part}  ·  Aufgabe ${number}`, `${stem}${opts}`);
}

const scenes = [];
const add = async (name, start, end, content, hero = false) => {
  if (end <= start) throw new Error(`Invalid scene ${name}: ${start}–${end}`);
  scenes.push({ name, start, end, file: await card(name, content, hero) });
};
const title = exam === 'ielts' ? 'IELTS LISTENING' : 'GOETHE-ZERTIFIKAT A1';
const sub = exam === 'ielts' ? `FULL PRACTICE TEST · SET ${set.split('-')[1]}` : 'HÖREN · VOLLSTÄNDIGER ÜBUNGSTEST';
await add('00-intro', 0, 8, panel(title, 'WeLearn', `${label(160, 468, sub, 51, '#15458B', 800)}${label(160, 550, exam === 'ielts' ? '40 questions · 4 parts' : '15 Aufgaben · 3 Teile', 38, '#3D6191')}${label(160, 864, 'Original practice material by WeLearn', 29, '#607AA0')}`), true);
await add('01-instructions', 8, lead, panel(exam === 'ielts' ? 'Instructions' : 'Anleitung', title, `${lines(160, 434, exam === 'ielts' ? 'Listen once. Read the questions on screen and write your answers as you go.' : 'Lesen Sie die Aufgabe. Hören Sie zu und wählen Sie Ihre Antwort. Achten Sie auf den Signalton.', 44, 66, 70, '#173864', 600)}${label(160, 735, exam === 'ielts' ? 'Keep a pen and paper ready.' : 'Halten Sie Papier und Stift bereit.', 32, '#52749E')}`));

if (exam === 'ielts') {
  for (let i = 0; i < config.pages.length; i++) {
    const p = config.pages[i];
    await add(`page-${String(i + 1).padStart(2, '0')}`, lead + p.at, lead + (config.pages[i + 1]?.at ?? duration), ieltsContent(p));
  }
} else {
  if (config.cues.length !== 28 || Object.keys(config.firstCueByQuestion).length !== 15) throw new Error('Goethe cue count changed');
  const pageStarts = [
    { at: 0, part: 1, question: null },
    ...Object.entries(config.firstCueByQuestion).map(([question, at]) => ({ at, part: Number(question) <= 6 ? 1 : Number(question) <= 10 ? 2 : 3, question: Number(question) })),
    { at: config.parts[1], part: 2, question: null },
    { at: config.parts[2], part: 3, question: null },
  ].sort((a, b) => a.at - b.at);
  for (let i = 0; i < pageStarts.length; i++) {
    const p = pageStarts[i];
    await add(`page-${String(i + 1).padStart(2, '0')}`, lead + p.at, lead + (pageStarts[i + 1]?.at ?? duration), goetheContent(p.part, p.question));
  }
}
await add('99-finish', lead + duration, lead + duration + tail, panel(exam === 'ielts' ? 'Test complete' : 'Test beendet', title, `${lines(160, 480, exam === 'ielts' ? 'Review your answers and continue practicing at idiomaswl.com' : 'Überprüfen Sie Ihre Antworten und üben Sie weiter auf idiomaswl.com', 44, 66, 70, '#173864', 600)}`));
const total = lead + duration + tail;
await fs.writeFile(path.join(out, 'timeline.json'), JSON.stringify({ exam, set: config.set, audio: config.audio, audioDuration: duration, videoDuration: total, scenes: scenes.map(({ name, start, end }) => ({ name, start, end })) }, null, 2) + '\n');
const concat = 'ffconcat version 1.0\n' + scenes.map(s => `file '${s.file.replaceAll("'", "'\\''")}'\nduration ${(s.end - s.start).toFixed(6)}\n`).join('') + `file '${scenes.at(-1).file.replaceAll("'", "'\\''")}'\n`;
await fs.writeFile(path.join(out, 'frames.ffconcat'), concat);
console.log(`Created ${scenes.length} cards and timeline: ${out}`);

if (render) {
  const destination = path.join(out, `welearn-${exam}-${config.set}-full-listening.mp4`);
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-safe', '0', '-f', 'concat', '-i', path.join(out, 'frames.ffconcat'), '-i', audio, '-filter_complex', `[1:a]adelay=${lead * 1000}:all=1,apad[a]`, '-map', '0:v:0', '-map', '[a]', '-r', '5', '-t', String(total), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', destination], { stdio: 'inherit' });
  console.log(`Rendered ${destination} (${probe(destination).toFixed(2)}s)`);
}
