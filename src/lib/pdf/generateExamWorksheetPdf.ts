import type { MockExam, MockSection } from '@/data/mocks/types';
import { createBrandedDoc, GRAY, INK, NAVY, RED, SOFT, type BrandedDoc } from '@/lib/pdf/brandedDoc';
import { goetheReadingGroups, worksheetForMock } from '@/lib/pdf/examWorksheetContent';
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards';
import type { ListeningOrderVersion } from '@/data/toefl/listening-option-order';
import type { WorksheetQuestion, WorksheetSection } from '@/lib/pdf/examWorksheetContent';

type WorksheetScope = { sections?: readonly MockSection[]; label?: string; sourcePath?: string; listeningOrderVersion?: ListeningOrderVersion };

const GOETHE_LISTENING_IMAGES: Record<string, string[]> = {
  'a1-1': ['jacke', 'uhrzeit', 'essen', 'flaschen', 'bibliothek', 'reise'],
  'a1-2': ['rucksack', 'uhrzeit', 'getraenk', 'postkarten', 'apotheke', 'flughafen'],
};
const GOETHE_READING_IMAGES: Record<string, string[]> = {
  'a1-1': ['fahrrad', 'deutschkurs', 'fruehstueck', 'tickets', 'apotheke'],
  'a1-2': ['feierraum', 'flughafen', 'deutschkurs', 'reise', 'hund'],
};

function goetheListeningImage(mockId: string, number: number): string {
  const suffix = GOETHE_LISTENING_IMAGES[mockId]?.[number - 1];
  return `/images/goethe/${mockId}/hoeren-teil1-${String(number).padStart(2, '0')}${suffix ? `-${suffix}` : ''}.png`;
}

function goetheReadingImage(mockId: string, number: number): string {
  const suffix = GOETHE_READING_IMAGES[mockId]?.[number - 6];
  return `/images/goethe/${mockId}/lesen-teil2-${String(number).padStart(2, '0')}${suffix ? `-${suffix}` : ''}.png`;
}

async function imageData(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    if (blob.type.includes('svg') || url.toLowerCase().endsWith('.svg')) {
      const objectUrl = URL.createObjectURL(blob);
      try {
        const image = new Image();
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error(`Could not load ${url}`));
          image.src = objectUrl;
        });
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth || 1200;
        canvas.height = image.naturalHeight || 800;
        const context = canvas.getContext('2d');
        if (!context) return null;
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/png');
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    }
    return await new Promise<string | null>(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch { return null; }
}

async function printImage(api: BrandedDoc, url: string, caption: string, maxHeight = 88): Promise<boolean> {
  const image = await imageData(url);
  if (!image) return false;
  try {
    const size = api.doc.getImageProperties(image);
    const ratio = size.width / size.height;
    const width = Math.min(api.contentW, maxHeight * ratio);
    const height = width / ratio;
    api.ensure(height + 13);
    api.doc.addImage(image, 'PNG', api.M + (api.contentW - width) / 2, api.state.y, width, height, undefined, 'FAST');
    api.state.y += height + 2;
    api.paragraph(caption, { size: 8, color: GRAY, gap: 3 });
    return true;
  } catch { return false; }
}

function printLines(api: BrandedDoc, lines: string[]) {
  for (const line of lines) for (const part of line.split('\n')) {
    if (!part.trim()) { api.state.y += 2; continue; }
    api.paragraph(part, { size: 9.2, indent: /^[A-Z]\.\s/.test(part) ? 4 : 0, gap: 1.5 });
  }
}

async function printQuestion(api: BrandedDoc, question: WorksheetQuestion, section: WorksheetSection, exam: MockExam['examSlug'], mockId: string, index: number) {
  const isGoetheA1 = exam === 'goethe' && mockId.startsWith('a1-');
  const hasA1Illustration = isGoetheA1 && (
    section.skill === 'reading' && section.part === 5
    || section.skill === 'listening' && section.part === 1 && index < 6
    || section.skill === 'speaking' && section.part === 11
  );
  const hasIllustration = !!question.imageUrl || !!question.imageUrls?.length || hasA1Illustration;
  api.ensure(exam === 'goethe' && section.part === 5 ? 145 : hasIllustration ? 112 : 24);
  api.heading(question.label, { size: 10.5, gapTop: 5, rule: false });
  let stimulusShown = false;
  if (exam === 'goethe' && section.part === 5 && question.stimulusLabel) {
    api.paragraph(question.stimulusLabel, { size: 9.3, style: 'bold', gap: 2 });
  }
  if (isGoetheA1 && section.skill === 'listening' && section.part === 1 && index < 6) {
    await printImage(api, goetheListeningImage(mockId, index + 1), 'Bildoptionen A–C · Hören Teil 1');
  }
  if (isGoetheA1 && section.skill === 'reading' && section.part === 5 && index < 5) {
    await printImage(api, goetheReadingImage(mockId, index + 6), 'Anzeigen A und B · Lesen Teil 2', 68);
  }
  if (isGoetheA1 && section.skill === 'speaking' && section.part === 11) {
    for (let sheet = 1; sheet <= 2; sheet += 1) {
      await printImage(api, `/images/goethe/${mockId}/sprechen-teil3-karten-0${sheet}.png`, `Bildkarten · Sprechen Teil 3 · Blatt ${sheet}`);
    }
  }
  if (question.imageUrl) await printImage(api, question.imageUrl, exam === 'ielts' ? 'Question diagram or chart' : 'Material de la pregunta');
  for (const [imageIndex, imageUrl] of (question.imageUrls ?? []).entries()) {
    await printImage(api, imageUrl, exam === 'goethe' ? `Bildkarte ${imageIndex + 1}` : `Prompt image ${imageIndex + 1}`);
  }
  if (question.stimulus && section.part === 5 && exam === 'goethe') {
    for (const ad of question.stimulus.split(/\n\n(?=[AB]\s*[—-])/)) {
      const match = ad.match(/^([AB])\s*[—-]\s*([\s\S]*)$/);
      api.callout(match ? `Anzeige ${match[1]}` : 'Anzeige', match ? match[2] : ad, [246, 248, 252], [34, 58, 107]);
    }
    stimulusShown = true;
  } else if (question.stimulus && section.part === 6 && exam === 'goethe') {
    api.callout(question.stimulusLabel ?? 'Hinweis', question.stimulus.replace(/\n/g, ' · '), [255, 250, 234], [153, 112, 21]);
    stimulusShown = true;
  } else if (question.stimulus && !stimulusShown && section.part !== 4) {
    api.callout(question.stimulusLabel ?? 'Material', question.stimulus.replace(/\n\n/g, '  |  ').replace(/\n/g, ' · '), [246, 248, 252], [34, 58, 107]);
    stimulusShown = true;
  }
  printLines(api, question.lines.filter(line =>
    !(stimulusShown && (line === question.stimulus || line === question.stimulusLabel))
    && !(exam === 'goethe' && section.part === 4 && line === question.stimulusLabel)
  ));
  if (question.response === 'choice') {
    api.paragraph('Answer: __________', { size: 9, color: GRAY, gap: 2 });
  } else if (question.response === 'short') {
    api.ensure(8); api.doc.setDrawColor(...SOFT).line(22, api.state.y, 188, api.state.y); api.state.y += 8;
  } else {
    const count = question.response === 'writing' ? (exam === 'goethe' ? 10 : 17) : 3;
    api.paragraph(question.response === 'writing' ? 'Your response:' : 'Speaking notes:', { size: 8.8, color: GRAY, gap: 2 });
    for (let line = 0; line < count; line += 1) {
      api.ensure(8); api.doc.setDrawColor(...SOFT).line(22, api.state.y, 188, api.state.y); api.state.y += 8;
    }
  }
}

async function printGoetheReadingTexts(api: BrandedDoc, section: WorksheetSection, mockId: string) {
  const { groups, unmatched } = goetheReadingGroups(section);
  for (const group of groups) {
    api.heading(group.title, { size: 10.5, gapTop: 6 });
    printLines(api, group.body.split('\n\n'));
    for (const question of group.questions) {
      await printQuestion(api, question, section, 'goethe', mockId, section.questions.indexOf(question));
    }
  }
  for (const question of unmatched) {
    await printQuestion(api, question, section, 'goethe', mockId, section.questions.indexOf(question));
  }
}

type GoetheAnswerRow = {
  number: number;
  options: string[];
  teil: string;
  startsTeil: boolean;
};

function goetheOptionLabels(question: WorksheetQuestion): string[] {
  return [...new Set(question.lines.flatMap(line => line.split('\n')).flatMap(line => {
    const match = line.trim().match(/^([A-Z0])\.\s/u);
    return match ? [match[1]] : [];
  }))];
}

function goetheAnswerRows(sections: WorksheetSection[]): GoetheAnswerRow[] {
  const rows: GoetheAnswerRow[] = [];
  for (const section of sections) {
    const teil = section.title.match(/(?:Teil|Aufgabe)\s*(\d+)/iu)?.[1] ?? String(section.part);
    let first = true;
    for (const question of section.questions) {
      if (!question.answerNumbers?.length) continue;
      const options = goetheOptionLabels(question);
      for (const number of question.answerNumbers) {
        rows.push({ number, options, teil, startsTeil: first });
        first = false;
      }
    }
  }
  return rows;
}

function printGoetheAntwortbogen(api: BrandedDoc, sections: WorksheetSection[]) {
  const rows = goetheAnswerRows(sections);
  if (!rows.length) return;
  const chunks = Array.from({ length: Math.ceil(rows.length / 36) }, (_, index) => rows.slice(index * 36, index * 36 + 36));
  for (const [pageIndex, pageRows] of chunks.entries()) {
    api.addPage();
    api.heading('Antwortbogen', { size: 16 });
    api.paragraph(pageIndex === 0
      ? 'Übertragen Sie hier Ihre endgültigen Antworten. Kreuzen Sie bei Auswahlaufgaben genau ein Feld an.'
      : 'Fortsetzung des Antwortbogens.', { size: 9.2, color: GRAY, gap: 4 });
    api.paragraph('Name: ____________________________________    Datum: ____________________', { size: 9.4, gap: 5 });

    const columns = pageRows.length > 12 ? 2 : 1;
    const gap = 8;
    const columnWidth = (api.contentW - gap * (columns - 1)) / columns;
    const rowsPerColumn = Math.ceil(pageRows.length / columns);
    const startY = api.state.y;
    let deepestY = startY;
    for (let column = 0; column < columns; column += 1) {
      const columnRows = pageRows.slice(column * rowsPerColumn, (column + 1) * rowsPerColumn);
      const x = api.M + column * (columnWidth + gap);
      let y = startY;
      for (const row of columnRows) {
        const height = 8.5;
        api.doc.setDrawColor(...SOFT).setLineWidth(0.35);
        api.doc.rect(x, y, columnWidth, height, 'S');
        api.doc.line(x + 12, y, x + 12, y + height);
        api.F('bold').setFontSize(8.4).setTextColor(...NAVY);
        api.doc.text(String(row.number), x + 6, y + 5.7, { align: 'center' });
        api.F('normal').setFontSize(6.3).setTextColor(...GRAY);
        api.doc.text(row.startsTeil ? `T${row.teil}` : '', x + 1.5, y + 2.3);
        if (row.options.length) {
          const optionWidth = Math.min(12, (columnWidth - 15) / row.options.length);
          let optionX = x + 15;
          for (const option of row.options) {
            api.doc.roundedRect(optionX, y + 1.25, optionWidth - 1.2, 6, 1, 1, 'S');
            api.F('bold').setFontSize(row.options.length > 6 ? 6.5 : 7.5).setTextColor(...INK);
            api.doc.text(option, optionX + (optionWidth - 1.2) / 2, y + 5.35, { align: 'center' });
            optionX += optionWidth;
          }
        } else {
          api.doc.setDrawColor(...GRAY).setLineWidth(0.25);
          api.doc.line(x + 18, y + 5.8, x + columnWidth - 4, y + 5.8);
        }
        y += height + 1.4;
      }
      deepestY = Math.max(deepestY, y);
    }
    api.state.y = deepestY + 2;
  }
}

function printGoetheWritingAnswerSheets(api: BrandedDoc, sections: WorksheetSection[], mockId: string) {
  const tasks = sections.flatMap(section => section.questions
    .filter(question => question.response === 'writing')
    .map(question => ({ section, question })));
  for (const { section, question } of tasks) {
    api.addPage();
    api.heading('Antwortbogen Schreiben', { size: 16 });
    api.paragraph(section.title, { size: 10.5, style: 'bold', color: NAVY, gap: 2 });
    api.paragraph(question.label, { size: 9, color: GRAY, gap: 4 });
    api.paragraph('Name: ____________________________________    Datum: ____________________', { size: 9.4, gap: 5 });
    const lineCount = mockId.startsWith('b1-') ? (section.title.match(/(?:Aufgabe|Teil)\s*3/iu) ? 18 : 24) : mockId.startsWith('a2-') ? 18 : 15;
    for (let line = 0; line < lineCount; line += 1) {
      api.ensure(7.2);
      api.doc.setDrawColor(...SOFT).setLineWidth(0.3).line(api.M, api.state.y, api.M + api.contentW, api.state.y);
      api.state.y += 7.2;
    }
  }
}

function printGoetheSpeakingNotes(api: BrandedDoc, sections: WorksheetSection[]) {
  if (!sections.some(section => section.questions.some(question => question.response === 'speaking'))) return;
  api.addPage();
  api.heading('Notizblatt Sprechen', { size: 16 });
  api.paragraph('Nutzen Sie dieses Blatt nur für Ihre Vorbereitung. Schreiben Sie keine vollständigen Antworten vor.', { size: 9.2, color: GRAY, gap: 4 });
  api.paragraph('Name: ____________________________________    Datum: ____________________', { size: 9.4, gap: 4 });
  for (const section of sections) {
    if (!section.questions.some(question => question.response === 'speaking')) continue;
    api.heading(section.title, { size: 10.5, gapTop: 3, rule: false });
    for (let line = 0; line < 5; line += 1) {
      api.ensure(7);
      api.doc.setDrawColor(...SOFT).setLineWidth(0.3).line(api.M, api.state.y, api.M + api.contentW, api.state.y);
      api.state.y += 7;
    }
  }
}

export async function generateExamWorksheetPdf(mock: MockExam, scope: WorksheetScope = {}) {
  const exam = mock.examSlug;
  if (exam !== 'goethe' && exam !== 'toefl' && exam !== 'ielts') throw new Error('Unsupported worksheet exam');
  const sections = scope.sections ?? mock.sections;
  const content = worksheetForMock(mock, sections, scope.listeningOrderVersion);
  const name = exam === 'goethe'
    ? `Goethe-Zertifikat ${mock.id.startsWith('b1-') ? 'B1' : mock.id.startsWith('a2-') ? 'A2' : 'A1'}`
    : exam === 'ielts'
      ? 'IELTS Academic'
      : 'TOEFL iBT 2026';
  const sourcePath = scope.sourcePath ?? `/examenes/${exam}/practica/${mock.id}`;
  const scopeSkill = scope.label?.split('·')[0]?.trim();
  const worksheetTitle = scope.label && !(scopeSkill && mock.title.toLowerCase().endsWith(scopeSkill.toLowerCase()))
    ? `${mock.title} · ${scope.label}`
    : mock.title;
  const api = await createBrandedDoc({
    levelLabel: name,
    skillLabel: scope.label ?? 'Student worksheet',
    title: worksheetTitle,
    subject: 'Printable student questions and blank response spaces, without answer keys or transcripts.',
    keywords: [name, 'student worksheet', mock.id],
    sourceUrl: `${WELEARN_PDF_BASE_URL}${sourcePath}`,
  });
  const { title, heading, paragraph, callout, save } = api;

  api.state.y += 10;
  paragraph(`${name} · Student worksheet`.toUpperCase(), { size: 8, style: 'bold', color: RED, gap: 5.5 });
  title(mock.title);
  paragraph(scope.label ?? 'All sections', { size: 11, style: 'bold', color: NAVY });
  paragraph('Name: ____________________________________    Date: ____________________', { size: 9.4, gap: 4 });
  callout('How to use this worksheet', exam === 'goethe'
    ? `${mock.id.startsWith('b1-') ? 'Follow the B1 module and Teil order shown here.' : 'Follow each Goethe Teil in order.'} Read each text with its questions and use the speaking cards as prompts. Hören is not included unless approved audio is available in the live practice page.`
    : exam === 'ielts'
      ? 'Work through each IELTS part in order. Reading passages stay with their questions; charts and diagrams appear next to their tasks. Open the live practice page for Listening audio and Speaking recordings.'
      : 'Follow the fixed WeLearn TOEFL 2026 module order. Open the live practice page for Listening and Speaking audio. This worksheet does not reproduce adaptive routing or an official score.', [239, 249, 251], [15, 95, 115]);
  paragraph('Student copy · no answer key or audio transcript.', { size: 8.7, color: GRAY, gap: 3 });

  for (const [sectionIndex, section] of content.entries()) {
    if (sectionIndex > 0) api.addPage();
    heading(section.title, { size: 14, color: exam === 'goethe' ? INK : NAVY });
    paragraph(section.instructions, { size: 9.3, gap: 3 });
    if (section.audio) paragraph('Audio: open the linked live practice page to listen.', { size: 8.6, color: GRAY, gap: 3 });
    if (exam === 'goethe' && mock.id.startsWith('a1-') && section.part === 4 && section.passage) {
      await printGoetheReadingTexts(api, section, mock.id);
      continue;
    }
    if (section.passage) {
      heading('Reading text', { size: 10.5, gapTop: 2 });
      printLines(api, section.passage.split(/\n\n/));
    }
    for (const [questionIndex, question] of section.questions.entries()) await printQuestion(api, question, section, exam, mock.id, questionIndex);
  }

  const answerSections = content.filter(section => section.questions.some(question => question.response !== 'writing' && question.response !== 'speaking'));
  if (exam === 'goethe') {
    printGoetheAntwortbogen(api, answerSections);
    printGoetheWritingAnswerSheets(api, content, mock.id);
    printGoetheSpeakingNotes(api, content);
  } else if (answerSections.length > 0) {
    api.addPage();
    heading('Blank answer sheet', { size: 15 });
    paragraph('Transfer your final objective answers here. Keep the written responses and speaking notes in their sections.', { size: 9.2, color: GRAY, gap: 5 });
    for (const section of answerSections) {
      heading(section.title, { size: 10.5, gapTop: 4, rule: false });
      for (const question of section.questions) {
        if (question.answerNumbers?.length) {
          for (const number of question.answerNumbers) paragraph(`${number}. ____________________________________`, { size: 9, gap: 2 });
          continue;
        }
        paragraph(`${question.label}: ____________________________________`, { size: 9, gap: 2 });
        if (question.label === 'Complete the Words') for (const match of question.lines.join(' ').matchAll(/\[(\d+)\]/g)) paragraph(`Blank ${match[1]}: ____________________`, { size: 8.8, indent: 5, gap: 1 });
      }
    }
  }
  paragraph('This PDF is original WeLearn practice material, not an official exam paper.', { size: 8.3, color: GRAY });
  save(`${exam}-${mock.id}-${scope.label ? scope.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'full'}-student-worksheet-welearn.pdf`);
}
