import {
  IELTS_TABLE_COMPLETION_PASSAGES,
  type TableCompletionPassage,
// Node's native type-stripping tests require the explicit extension; Next resolves it too.
// @ts-expect-error TS5097 — the runtime import intentionally includes the source extension.
} from './seo-catalog.ts';

type TableBlank = Extract<
  TableCompletionPassage['rows'][number]['cells'][number],
  { type: 'blank' }
>;

function remediateBlank(
  passage: TableCompletionPassage,
  rowId: string,
  cellIndex: number,
  replacement: TableBlank,
) {
  return {
    ...passage,
    rows: passage.rows.map((row) => row.id !== rowId ? row : {
      ...row,
      cells: row.cells.map((cell, index) => index === cellIndex ? replacement : cell),
    }),
  };
}

function remediateCooling(passage: TableCompletionPassage) {
  const direction: TableBlank = {
    type: 'blank',
    before: 'Openings should face the correct ',
    after: ' for effective airflow.',
    answer: 'direction',
    explanation:
      'The passage warns that openings facing the wrong direction leave a room still and humid.',
    hint: 'Find the noun that follows “wrong” in the final sentence of the cross-ventilation paragraph.',
  };
  const glass: TableBlank = {
    type: 'blank',
    before: 'External shade stops heat before it enters window ',
    after: '.',
    answer: 'glass',
    explanation:
      'Paragraph 4 explains that external shade stops heat before it enters the glass.',
    hint: 'Look for the comparison between external shade and curtains.',
  };

  return remediateBlank(
    remediateBlank(passage, 'table-cooling-01', 2, direction),
    'table-cooling-03',
    1,
    glass,
  );
}

function remediateMuseum(passage: TableCompletionPassage) {
  const matters: TableBlank = {
    type: 'blank',
    before: "Records explain an object's identity, origin and why it ",
    after: '.',
    answer: 'matters',
    explanation:
      'Paragraph 1 says records explain what each object is, where it came from and why it matters.',
    hint: 'Find the verb after “why it” in the final sentence of paragraph 1.',
  };
  const withUniquePhotoNoun = {
    ...passage,
    passage: passage.passage.replace(
      'old tools, letters or photographs',
      'old tools, letters or postcards',
    ),
  };

  return remediateBlank(withUniquePhotoNoun, 'table-museum-inventory-01', 1, matters);
}

export const IELTS_TABLE_COMPLETION_REMEDIATED_PASSAGES: TableCompletionPassage[] =
  IELTS_TABLE_COMPLETION_PASSAGES.map((passage) => {
    const versioned = { ...passage, id: `${passage.id}-v2` };
    if (passage.id === 'table-cooling-buildings') return remediateCooling(versioned);
    if (passage.id === 'table-museum-inventory') return remediateMuseum(versioned);
    return versioned;
  });
