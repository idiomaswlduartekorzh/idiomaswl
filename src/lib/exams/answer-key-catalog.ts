import { EXAMS } from '@/data/exams';
import { getMock, getRegisteredMockKeys } from '@/data/mocks';
import type { MockExam, MockSection, Question } from '@/data/mocks/types';
import { TOEFL_CTW_SCORING_BY_OBJECT_ID } from '@/server/toefl/complete-words-registry';
import { TOEFL_READING_SCORING_BY_OBJECT_ID } from '@/server/toefl/reading-registry';
import { TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID } from '@/server/toefl/listening-registry';
import { TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID } from '@/server/toefl/build-sentence-registry';

export type KeyRow = {
  id: string;
  number: string;
  prompt: string;
  detail?: string;
  answer: string;
  type: string;
  options?: { letter: string; text: string; correct: boolean }[];
  alternatives?: string[];
  issues: string[];
  mode: 'automatic' | 'reference' | 'open';
};

export type KeySection = {
  title: string;
  skill: string;
  instructions: string;
  context?: string;
  audioUrl?: string;
  rows: KeyRow[];
  issues: string[];
};

export type KeyAudit = {
  sections: KeySection[];
  automatic: number;
  reference: number;
  open: number;
  issues: number;
};

export type KeyCatalogItem = {
  key: string;
  examSlug: string;
  mockId: string;
  title: string;
  issues: number;
  automatic: number;
  reference: number;
  open: number;
};

const letter = (index: number) => String.fromCharCode(65 + index);
const cleanOption = (value: string) => value.replace(/^[A-H][\s.)\-]+/, '').trim();
const sameItems = (left: string[], right: string[]) => {
  const sortedRight = [...right].sort();
  return left.length === right.length && [...left].sort().every((value, index) => value === sortedRight[index]);
};

function numberedRow(id: string, number: number | string, prompt: string, answer: string,
  type: string, mode: KeyRow['mode'], issues: string[] = []): KeyRow {
  return { id, number: String(number), prompt, answer, type, mode, issues };
}

function rowsForQuestion(question: Question): KeyRow[] {
  const q = question;
  if (q.type === 'mcq' || q.type === 'dialog') {
    const issues: string[] = [];
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
      issues.push('La posición de la clave no existe entre las opciones.');
    }
    if (q.options.length < 2 || q.options.some(option => !option.trim())) {
      issues.push('Faltan opciones o alguna está vacía.');
    }
    // Punctuation is tested deliberately in SAT questions; keep it significant here.
    const normalized = q.options.map(option => cleanOption(option).trim().toLowerCase().replace(/\s+/g, ' '));
    if (new Set(normalized).size !== normalized.length) {
      issues.push('Hay opciones equivalentes; podrían generar una corrección injusta.');
    }
    const row = numberedRow(q.id, q.text.match(/\((\d+)\)/)?.[1] ?? q.id,
      q.text, q.options[q.answer] ? cleanOption(q.options[q.answer]) : 'Sin clave válida',
      q.type === 'dialog' ? 'Diálogo' : 'Opción múltiple', 'automatic', issues);
    row.options = q.options.map((option, index) => ({ letter: letter(index), text: cleanOption(option), correct: index === q.answer }));
    row.detail = [q.stimulusLabel, q.stimulus].filter(Boolean).join('\n') || undefined;
    return [row];
  }
  if (q.type === 'formgroup') {
    return q.blanks.map(blank => {
      const issues: string[] = [];
      if (!q.template.includes(`{{${blank.num}}}`)) issues.push('El espacio no aparece en el texto.');
      if (!blank.answers.length || blank.answers.some(answer => !answer.trim())) issues.push('Falta una respuesta aceptada.');
      const row = numberedRow(`${q.id}:${blank.num}`, blank.num, q.title ?? q.groupLabel,
        blank.answers.join(' / ') || 'Sin clave', 'Completar', 'automatic', issues);
      row.alternatives = blank.answers;
      const unorderedGroup = q.unorderedAnswerGroups?.find(group => group.includes(blank.num));
      if (unorderedGroup) row.detail = `Intercambiable entre los espacios ${unorderedGroup.join(' y ')}. Cada respuesta se cuenta una sola vez.`;
      return row;
    });
  }
  if (q.type === 'matching') {
    const labels = q.endings.map(ending => ending.letter.toUpperCase());
    return q.items.map(item => {
      const issues = labels.includes(item.answer.toUpperCase()) ? [] : ['La letra clave no existe en las opciones.'];
      const target = q.endings.find(ending => ending.letter.toUpperCase() === item.answer.toUpperCase());
      return numberedRow(`${q.id}:${item.num}`, item.num, item.stem,
        `${item.answer.toUpperCase()}${target ? ` · ${target.text}` : ''}`,
        'Emparejar', 'automatic', issues);
    });
  }
  if (q.type === 'multiselect') {
    const labels = q.options.map(option => option.letter.toUpperCase());
    const issues: string[] = [];
    if (q.answers.length !== q.selectCount || new Set(q.answers.map(answer => answer.toUpperCase())).size !== q.answers.length) {
      issues.push('La cantidad de claves no coincide con la selección requerida.');
    }
    if (q.answers.some(answer => !labels.includes(answer.toUpperCase()))) issues.push('Una clave no existe en las opciones.');
    const row = numberedRow(q.id, `${q.qRange[0]}–${q.qRange[1]}`, q.text,
      q.answers.join(' + '), 'Selección múltiple', 'automatic', issues);
    row.options = q.options.map(option => ({ letter: option.letter, text: option.text,
      correct: q.answers.some(answer => answer.toUpperCase() === option.letter.toUpperCase()) }));
    return [row];
  }
  if (q.type === 'fill') {
    const issues = q.answers.length && q.answers.every(answer => answer.trim()) ? [] : ['Falta una respuesta aceptada.'];
    const row = numberedRow(q.id, q.id, q.text, q.answers.join(' / ') || 'Sin clave', 'Completar', 'reference', issues);
    row.detail = [q.stimulusLabel, q.stimulus].filter(Boolean).join('\n') || undefined;
    return [row];
  }
  if (q.type === 'tablegroup') {
    return q.rows.flatMap((cells, rowIndex) => cells.flatMap((cell, cellIndex) => {
      if (typeof cell === 'string') return [];
      const issues = cell.answers.length && cell.answers.every(answer => answer.trim()) ? [] : ['Falta una respuesta aceptada.'];
      return [numberedRow(`${q.id}:${cell.num}`, cell.num,
        `Fila ${rowIndex + 1} · ${q.headers[cellIndex] ?? 'Columna ' + (cellIndex + 1)}`,
        cell.answers.join(' / ') || 'Sin clave', 'Tabla', 'reference', issues)];
    }));
  }
  if (q.type === 'wordcomplete') {
    const serverBlanks = q.objectId ? TOEFL_CTW_SCORING_BY_OBJECT_ID[q.objectId] : undefined;
    return q.blanks.map(blank => {
      const serverBlank = serverBlanks?.find(item => item.id === blank.id);
      const missing = serverBlank?.expectedMissing;
      const answer = missing ? `${blank.prefix ?? ''}${missing}${blank.suffix ?? ''}` : blank.answer;
      const issues: string[] = [];
      if (!answer?.trim() || !q.template.includes(`{{${blank.num}}}`)) issues.push('Falta la clave o el espacio en el texto.');
      if (serverBlank && (serverBlank.missingLength !== missing?.length || serverBlank.prefix !== blank.prefix)) {
        issues.push('La clave del servidor no coincide con las letras visibles.');
      }
      const row = numberedRow(`${q.id}:${blank.num}`, blank.num,
        `Completa ${blank.prefix ?? ''}…${blank.suffix ?? ''}`, answer ?? 'Sin clave',
        'Palabra', q.serverScoring ? 'automatic' : 'reference', issues);
      if (missing) row.detail = `Letras que se escriben: ${missing}`;
      return row;
    });
  }
  if (q.type === 'toefl-reading-single' || q.type === 'toefl-reading-multi') {
    const scoring = TOEFL_READING_SCORING_BY_OBJECT_ID[q.objectId]?.items.find(item => item.itemId === q.id);
    const correctIds = scoring?.correctOptionIds ?? [];
    const issues = !scoring || correctIds.length !== (q.type === 'toefl-reading-single' ? 1 : q.selectCount)
      ? ['No hay una clave válida en el registro de corrección TOEFL.'] : [];
    const row = numberedRow(q.id, q.id, q.text,
      q.options.filter(option => correctIds.includes(option.id)).map(option => option.label).join(' + ') || 'Sin clave',
      q.type === 'toefl-reading-single' ? 'TOEFL Reading' : 'TOEFL Reading múltiple', 'automatic', issues);
    row.options = q.options.map(option => ({ letter: option.label, text: option.text, correct: correctIds.includes(option.id) }));
    return [row];
  }
  if (q.type === 'toefl-listening-single') {
    const scoring = TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID[q.objectId]?.items.find(item => item.itemId === q.id);
    const correctId = scoring?.correctOptionId;
    const issues = !correctId || !q.options.some(option => option.id === correctId)
      ? ['No hay una clave válida en el registro de corrección TOEFL.'] : [];
    const row = numberedRow(q.id, q.id, q.text,
      q.options.find(option => option.id === correctId)?.label ?? 'Sin clave',
      'TOEFL Listening', 'automatic', issues);
    row.options = q.options.map(option => ({ letter: option.label, text: option.text, correct: option.id === correctId }));
    row.detail = q.mediaStatus === 'script-ready-audio-blocked' ? 'Audio pendiente de producción.' : undefined;
    return [row];
  }
  if (q.type === 'toefl-build-sentence') {
    const scoring = TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID[q.objectId]?.items.find(item => item.itemId === q.id);
    const tileText = new Map(q.tiles.map(tile => [tile.id, tile.text]));
    const accepted = scoring?.acceptedOrders.map(order => `${q.replyPrefix} ${order.map(id => tileText.get(id) ?? '[fragmento desconocido]').join(' ')} ${q.replySuffix}`.replace(/\s+([.,!?])/g, '$1').trim()) ?? [];
    const issues = !scoring || scoring.acceptedOrders.some(order => order.some(id => !tileText.has(id)))
      ? ['No hay una clave válida en el registro de corrección TOEFL.'] : [];
    return [numberedRow(q.id, q.id, q.context, accepted.join('\n') || 'Sin clave',
      'TOEFL Ordenar frase', 'automatic', issues)];
  }
  if (q.type === 'sentencebuild') {
    return [numberedRow(q.id, q.id, q.prompt ?? 'Ordena los fragmentos', q.answer.join(' '),
      'Ordenar frase', 'reference', sameItems(q.tiles, q.answer) ? [] : ['La solución no usa exactamente los fragmentos disponibles.'])];
  }
  if (q.type === 'repeat') {
    return [numberedRow(q.id, q.itemNumber, 'Repite la frase', q.targetSentence,
      'Pronunciación', 'reference')];
  }
  if (q.type === 'write') {
    const row = numberedRow(q.id, q.taskNumber, q.text, 'Evaluación con rúbrica; no hay respuesta única.', 'Writing', 'open');
    row.detail = q.stimulus;
    return [row];
  }
  if (q.type !== 'speak') return [numberedRow(q.id, q.id, 'Tipo de pregunta sin extractor de clave',
    'Revisar configuración', q.type, 'reference', ['El hub no pudo leer esta clave.'])];
  const row = numberedRow(q.id, q.partNumber, q.text, 'Evaluación oral; no hay respuesta única.', 'Speaking', 'open');
  row.detail = [q.cueCard, q.followUp?.join('\n')].filter(Boolean).join('\n\n') || undefined;
  return [row];
}

function sectionContext(section: MockSection): string | undefined {
  const pieces = [section.sectionNote, section.passage, section.transcript];
  for (const q of section.questions) {
    if (q.type === 'formgroup' || q.type === 'wordcomplete') pieces.push(q.template);
    if (q.type === 'matching') pieces.push(q.endings.map(e => `${e.letter}. ${e.text}`).join('\n'));
    if (q.type === 'tablegroup') pieces.push([q.headers.join(' | '), ...q.rows.map(row =>
      row.map(cell => typeof cell === 'string' ? cell : `{{${cell.num}}}`).join(' | '))].join('\n'));
  }
  return pieces.filter(Boolean).join('\n\n') || undefined;
}

export function auditMockKey(mock: MockExam): KeyAudit {
  const seenIds = new Set<string>();
  const sections = mock.sections.map(section => {
    const issues: string[] = [];
    if (!section.questions.length && !section.comingSoon) issues.push('Sección sin preguntas.');
    for (const q of section.questions) {
      if (seenIds.has(q.id)) issues.push(`ID repetido: ${q.id}`);
      seenIds.add(q.id);
    }
    return {
      title: section.title,
      skill: section.skill ?? 'general',
      instructions: section.instructions,
      context: sectionContext(section),
      audioUrl: section.audioUrl,
      rows: section.questions.flatMap(rowsForQuestion),
      issues,
    };
  });
  const rows = sections.flatMap(section => section.rows);
  return {
    sections,
    automatic: rows.filter(row => row.mode === 'automatic').length,
    reference: rows.filter(row => row.mode === 'reference').length,
    open: rows.filter(row => row.mode === 'open').length,
    issues: sections.reduce((sum, section) => sum + section.issues.length +
      section.rows.reduce((count, row) => count + row.issues.length, 0), 0),
  };
}

export function getAnswerKeyCatalog(): KeyCatalogItem[] {
  return getRegisteredMockKeys().map(key => {
    const [examSlug, mockId] = key.split(':');
    const mock = getMock(examSlug, mockId)!;
    const audit = auditMockKey(mock);
    return { key, examSlug, mockId, title: mock.title,
      issues: audit.issues, automatic: audit.automatic, reference: audit.reference, open: audit.open };
  }).sort((a, b) => {
    const examOrder = Object.keys(EXAMS);
    return examOrder.indexOf(a.examSlug) - examOrder.indexOf(b.examSlug) ||
      a.mockId.localeCompare(b.mockId, undefined, { numeric: true });
  });
}
