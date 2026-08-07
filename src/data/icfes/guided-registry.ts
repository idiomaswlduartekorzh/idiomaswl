/** Lightweight source of truth for guided ICFES routes and catalogue CTAs. */
export const GUIDED_MOCK_IDS = [
  'mock-01', 'mock-02', 'mock-03', 'mock-04', 'mock-05', 'mock-06',
  'mock-07', 'mock-08', 'mock-09', 'mock-10', 'mock-11', 'mock-12',
  'mock-13', 'mock-14', 'mock-15', 'mock-16', 'mock-17', 'mock-18',
  'mock-19', 'mock-20', 'mock-21', 'mock-22', 'mock-23',
] as const;

export const GUIDED_WORKBOOK_IDS = [
  'icfes-2023-g11',
  'icfes-2022-g11',
  'icfes-2019-ex1',
  'icfes-2021-ex1',
  'icfes-2012',
] as const;

export const GUIDED_WORKBOOK_EXCLUSIONS = {
  'icfes-2021-ex2': 'Faltan los estímulos de los avisos 4–6 en el banco digital; no se infieren desde la clave.',
  'icfes-2016': 'Faltan los estímulos de los avisos 1–3 en el banco digital; no se infieren desde la clave.',
} as const;

export function hasGuidedMock(mockId: string): boolean {
  return GUIDED_MOCK_IDS.includes(mockId as typeof GUIDED_MOCK_IDS[number]);
}

export function hasGuidedWorkbook(examId: string): boolean {
  return GUIDED_WORKBOOK_IDS.includes(examId as typeof GUIDED_WORKBOOK_IDS[number]);
}
