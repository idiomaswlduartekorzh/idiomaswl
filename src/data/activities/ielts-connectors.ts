export interface ConnectorItem {
  id: string;
  text: string;
  isDistractor: boolean;
  distractorReason?: string;
}

export interface SentenceCard {
  id: string;
  body: string;
  correctPosition: number;
}

export interface ConnectorSlot {
  afterPosition: number;
  acceptedConnectorIds: string[];
  noneOk: boolean;
  noneReason?: string;
}

export interface ConnectorsActivity {
  id: string;
  title: string;
  difficulty: string;
  chartTitle: string;
  chartUnit: string;
  chartCategories: string[];
  chartValues: number[];
  taskPrompt: string;
  sentences: SentenceCard[];
  connectorBank: ConnectorItem[];
  connectorSlots: ConnectorSlot[];
  tips: string[];
}

export const connectorsActivity01: ConnectorsActivity = {
  id: 'wt1-connectors-01',
  title: 'Conectores en Writing Task 1 — Práctica 1',
  difficulty: 'Band 6.0 – 7.0',
  chartTitle: 'Percentage of adults who used the internet by age group, UK, 2023',
  chartUnit: '%',
  chartCategories: ['16–24', '25–34', '35–44', '45–54', '55–64', '65+'],
  chartValues: [99, 98, 96, 88, 75, 52],
  taskPrompt:
    'The bar chart below shows the percentage of adults who used the internet across six age groups in the UK in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
  sentences: [
    {
      id: 'a',
      body: 'the 16–24 and 25–34 age groups recorded the highest usage rates, at 99% and 98% respectively, indicating near-universal internet access among younger adults.',
      correctPosition: 3,
    },
    {
      id: 'b',
      body: 'the 45–54 age group experienced a more notable decline, falling to 88%, an 8 percentage point drop compared to the previous cohort.',
      correctPosition: 5,
    },
    {
      id: 'c',
      body: 'The bar chart illustrates the percentage of UK adults across six age groups who used the internet in 2023.',
      correctPosition: 1,
    },
    {
      id: 'd',
      body: 'the 65+ group recorded the lowest figure at just 52%, with almost half of this cohort not accessing the internet at all.',
      correctPosition: 7,
    },
    {
      id: 'e',
      body: 'the 35–44 cohort maintained a high rate of 96%, only marginally lower than the two youngest groups.',
      correctPosition: 4,
    },
    {
      id: 'f',
      body: 'usage continued to fall among the 55–64 age group, reaching 75%, suggesting a widening generational divide in digital adoption.',
      correctPosition: 6,
    },
    {
      id: 'g',
      body: 'internet usage declined progressively with age, with younger cohorts approaching universal access and the eldest group recording the lowest proportion.',
      correctPosition: 2,
    },
  ],
  connectorBank: [
    { id: 'overall', text: 'Overall,', isDistractor: false },
    { id: 'in-contrast', text: 'In contrast,', isDistractor: false },
    { id: 'furthermore', text: 'Furthermore,', isDistractor: false },
    { id: 'finally', text: 'Finally,', isDistractor: false },
    { id: 'additionally', text: 'Additionally,', isDistractor: false },
    { id: 'moreover', text: 'Moreover,', isDistractor: false },
    { id: 'however', text: 'However,', isDistractor: false },
    { id: 'in-addition', text: 'In addition,', isDistractor: false },
    {
      id: 'in-my-opinion',
      text: 'In my opinion,',
      isDistractor: true,
      distractorReason: '¡Trampa clásica! Writing Task 1 es 100% descriptivo — NUNCA expreses opinión personal.',
    },
    {
      id: 'to-conclude',
      text: 'To conclude,',
      isDistractor: true,
      distractorReason: '"To conclude" se usa en essays de opinión (Task 2). En Task 1 usa "Overall," al inicio o no uses conclusión.',
    },
    {
      id: 'as-a-result',
      text: 'As a result,',
      isDistractor: true,
      distractorReason: '"As a result" implica causa-efecto. Las gráficas muestran datos, no causas — no asumas relaciones causales.',
    },
    {
      id: 'despite-this',
      text: 'Despite this,',
      isDistractor: true,
      distractorReason: '"Despite this" introduce contraste concesivo. Para datos de una gráfica usa "In contrast," o "However,".',
    },
    {
      id: 'therefore',
      text: 'Therefore,',
      isDistractor: true,
      distractorReason: '"Therefore" indica consecuencia lógica. Al describir datos estadísticos no inferimos consecuencias.',
    },
  ],
  connectorSlots: [
    {
      afterPosition: 1,
      acceptedConnectorIds: ['overall'],
      noneOk: false,
    },
    {
      afterPosition: 2,
      acceptedConnectorIds: [],
      noneOk: true,
      noneReason: 'La oración 3 comienza un nuevo detalle — no siempre se necesita conector si la secuencia es clara.',
    },
    {
      afterPosition: 3,
      acceptedConnectorIds: ['furthermore', 'additionally', 'moreover', 'in-addition'],
      noneOk: false,
    },
    {
      afterPosition: 4,
      acceptedConnectorIds: ['in-contrast', 'however'],
      noneOk: false,
    },
    {
      afterPosition: 5,
      acceptedConnectorIds: ['furthermore', 'moreover', 'additionally', 'in-addition'],
      noneOk: false,
    },
    {
      afterPosition: 6,
      acceptedConnectorIds: ['finally'],
      noneOk: false,
    },
  ],
  tips: [
    'El overview (oración 2) siempre va JUSTO después de la introducción y empieza con "Overall,".',
    'Usa "In contrast," o "However," cuando el siguiente dato es claramente diferente o opuesto.',
    '"In my opinion" NUNCA aparece en Writing Task 1 — es la trampa más común del examen.',
    '"Finally," se reserva para el último elemento de la secuencia.',
    'La oración de introducción no lleva conector antes — empieza directamente con "The chart/graph/table...".',
    '"As a result" y "Therefore" implican causalidad — en gráficas solo describes datos, no causas.',
  ],
};
