import type {
  IeltsListeningSectionPractice,
  PublicIeltsListeningQuestion,
} from '@/data/ielts/sectional-listening-adapter';
import { ieltsQuestionNumber } from '@/data/ielts/question-number';
import { createBrandedDoc, GRAY, INK, NAVY, SOFT } from '@/lib/pdf/brandedDoc';
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards';

function printableTemplate(template: string): string[] {
  return template.split('\n').map(line => line.replace(/\{\{(\d+)\}\}/g, (_marker, number) => `${number}. ____________________`));
}

export async function generateIeltsListeningWorksheetPdf(practice: IeltsListeningSectionPractice) {
  const setLabel = practice.sourceMockId.replace('set-', 'Set ');
  const sourceUrl = `${WELEARN_PDF_BASE_URL}/practica/ielts/listening/simulacros/practica/${practice.sourceMockId}`;
  const api = await createBrandedDoc({
    levelLabel: 'IELTS Academic',
    skillLabel: 'Listening',
    title: `${practice.title} — Student worksheet`,
    subject: 'Four-part IELTS Listening practice worksheet with 40 questions and a blank answer sheet.',
    keywords: ['IELTS', 'Listening', 'practice', 'student worksheet', setLabel],
    sourceUrl,
  });
  const { doc, state, title, heading, paragraph, callout, ensure, tableMargin, familia, save } = api;
  const autoTable = (await import('jspdf-autotable')).default;

  title(`${practice.title}`, 'Student worksheet · Questions 1–40');
  paragraph('Student: ____________________________________    Date: ____________________', { size: 9.5, color: INK, gap: 3 });
  callout('How to use this worksheet', 'Open the live practice page to play the audio. In practice mode you may pause, replay, rewind and move freely between all four parts. Write your answers here or on the answer sheet at the end.', [239, 249, 251], [15, 95, 115]);
  paragraph('This student copy contains no transcript or answer key.', { size: 8.8, color: GRAY, gap: 5 });

  const renderQuestion = (question: PublicIeltsListeningQuestion) => {
    if (question.type === 'formgroup') {
      heading(`Questions ${question.qRange[0]}–${question.qRange[1]}`, { size: 11, gapTop: 5 });
      question.groupLabel.split('\n').forEach(line => paragraph(line, { size: 9.2, gap: 1.4 }));
      if (question.title) paragraph(question.title, { size: 10, style: 'bold', color: NAVY, gap: 2 });
      if (question.example) paragraph(`Example: ${question.example}`, { size: 8.8, color: GRAY, gap: 2 });
      printableTemplate(question.template).forEach(line => {
        if (line.trim()) paragraph(line, { size: 9.6, indent: line.startsWith('•') ? 4 : 0, gap: 1.4 });
        else state.y += 2;
      });
      return;
    }
    if (question.type === 'tablegroup') {
      heading(`Questions ${question.qRange[0]}–${question.qRange[1]}`, { size: 11, gapTop: 5 });
      question.groupLabel.split('\n').forEach(line => paragraph(line, { size: 9.2, gap: 1.4 }));
      autoTable(doc, {
        startY: state.y,
        head: [question.headers],
        body: question.rows.map(row => row.map(cell => typeof cell === 'string' ? cell : `${cell.num}. __________________`)),
        margin: tableMargin,
        styles: { font: familia, fontSize: 8.2, cellPadding: 2, textColor: INK, lineColor: SOFT, lineWidth: .1, overflow: 'linebreak' },
        headStyles: { font: familia, fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 249, 252] },
      });
      state.y = (doc.lastAutoTable?.finalY ?? state.y) + 5;
      return;
    }
    if (question.type === 'multiselect') {
      heading(`Questions ${question.qRange[0]}–${question.qRange[1]}`, { size: 11, gapTop: 5 });
      paragraph(question.text, { size: 9.6, gap: 1.8 });
      paragraph(`Choose ${question.selectCount} letters.`, { size: 8.8, color: GRAY, gap: 1.5 });
      question.options.forEach(option => paragraph(`□  ${option.letter}   ${option.text}`, { size: 9.2, indent: 4, gap: 1.1 }));
      return;
    }
    if (question.type === 'matching') {
      heading(`Questions ${question.qRange[0]}–${question.qRange[1]}`, { size: 11, gapTop: 5 });
      question.groupLabel?.split('\n').forEach(line => paragraph(line, { size: 9.2, gap: 1.4 }));
      paragraph('Options', { size: 9, style: 'bold', color: NAVY, gap: 1 });
      question.endings.forEach(ending => paragraph(`${ending.letter}   ${ending.text}`, { size: 9, indent: 4, gap: 1 }));
      paragraph('Answers', { size: 9, style: 'bold', color: NAVY, gap: 1.5 });
      question.items.forEach(item => paragraph(`${item.num}.   ${item.stem}    ______`, { size: 9.2, indent: 4, gap: 1.3 }));
      return;
    }
    const number = ieltsQuestionNumber(question.id);
    ensure(22);
    heading(`Question ${number}`, { size: 11, gapTop: 5 });
    paragraph(question.text, { size: 9.6, gap: 1.8 });
    question.options.forEach((option, index) => paragraph(`○  ${String.fromCharCode(65 + index)}   ${option}`, { size: 9.2, indent: 4, gap: 1.1 }));
  };

  for (const [sectionIndex, section] of practice.sections.entries()) {
    if (sectionIndex > 0) api.addPage();
    const numbers = section.questions.flatMap(question => {
      if (question.type === 'formgroup') return question.blanks.map(blank => blank.num);
      if (question.type === 'tablegroup') return question.rows.flatMap(row => row.flatMap(cell => typeof cell === 'string' ? [] : [cell.num]));
      if (question.type === 'multiselect' || question.type === 'matching') return Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange[0] + index);
      return [ieltsQuestionNumber(question.id)];
    }).sort((a, b) => a - b);
    heading(`Part ${section.part} · Questions ${numbers[0]}–${numbers.at(-1)}`, { size: 15 });
    paragraph(section.title.replace(/^Listening\s*[—-]\s*/i, ''), { size: 11, style: 'bold', color: NAVY, gap: 2 });
    paragraph(section.instructions, { size: 9.2, color: GRAY, gap: 4 });
    section.questions.forEach(renderQuestion);
  }

  api.addPage();
  heading('Blank answer sheet', { size: 15 });
  paragraph('Write one final response for every question. For multiple-selection questions, write both letters in the same numbered space.', { size: 9.2, color: GRAY, gap: 4 });
  const answerRows = Array.from({ length: 10 }, (_, row) => Array.from({ length: 4 }, (_, column) => `${column * 10 + row + 1}. __________________`));
  autoTable(doc, {
    startY: state.y,
    head: [['Questions 1–10', 'Questions 11–20', 'Questions 21–30', 'Questions 31–40']],
    body: answerRows,
    margin: tableMargin,
    styles: { font: familia, fontSize: 9.2, minCellHeight: 10, cellPadding: 2.2, textColor: INK, lineColor: SOFT, lineWidth: .1 },
    headStyles: { font: familia, fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 249, 252] },
  });
  state.y = (doc.lastAutoTable?.finalY ?? state.y) + 6;
  paragraph('Teacher / class notes:', { size: 9.2, style: 'bold', color: NAVY, gap: 2 });
  for (let index = 0; index < 5; index += 1) {
    ensure(8); doc.setDrawColor(...SOFT).setLineWidth(.25).line(18, state.y, 192, state.y); state.y += 8;
  }

  save(`ielts-listening-${practice.sourceMockId}-student-worksheet-welearn.pdf`);
}
