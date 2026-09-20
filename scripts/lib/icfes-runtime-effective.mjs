import { CURRENT_PART_SEVEN } from '../../src/data/mocks/icfes-current-part-seven.ts';

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

const OFFICIAL_PART_BY_STYLE = { 'matching-grid': 1, 'notices-grid': 2 };
const OFFICIAL_TITLE = {
  1: 'Parte 1 — Descripciones y palabras',
  2: 'Parte 2 — Avisos, propósito y lugar',
};

function remapInstruction(instructions, officialPart) {
  if (officialPart === 1) {
    return instructions
      .replace(/6\s*(?:to|–|-)\s*10/gi, '1 to 5')
      .replace(/questions 6\s*(?:to|–|-)\s*10/gi, 'questions 1 to 5');
  }
  return instructions
    .replace(/1\s*(?:to|–|-)\s*5/gi, '6 to 10')
    .replace(/questions 1\s*(?:to|–|-)\s*5/gi, 'questions 6 to 10');
}

/** Mirrors the registry-boundary transform without importing the whole app registry. */
export function buildEffectiveIcfesMock(mock) {
  const currentPartSeven = CURRENT_PART_SEVEN[mock.id];
  const sourceSections = currentPartSeven
    ? mock.sections.map((section) => section.part === 7 ? currentPartSeven : section)
    : mock.sections;
  const sections = sourceSections.map((section) => {
    const officialPart = section.sectionStyle ? OFFICIAL_PART_BY_STYLE[section.sectionStyle] : undefined;
    if (!officialPart) return section;
    return {
      ...section,
      part: officialPart,
      title: OFFICIAL_TITLE[officialPart],
      instructions: remapInstruction(section.instructions, officialPart),
      questions: section.questions.map((question) => ({
        ...question,
        id: question.id.replace(/^p[12]/, `p${officialPart}`),
        part: officialPart,
      })),
    };
  }).sort((left, right) => left.part - right.part);
  return { ...mock, subtitle: 'Práctica propia abreviada · 45 preguntas · 60 minutos', sections };
}
