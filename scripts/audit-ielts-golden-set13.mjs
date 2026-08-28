#!/usr/bin/env node

import set13 from '../src/data/mocks/ielts-set-13.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set13,
  set: 13,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set13-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'The story of modern migration is continuous with this prehistoric movement, driven by the same fundamental forces',
    'most internet encryption relies on the computational difficulty of this task',
    'theoretically unbreakable communication channels',
    'placebo response rates are frequently between thirty and forty-five percent',
    'Some people argue that immigration has a largely positive effect',
  ],
  task1Tokens: ['Europe', 'Asia and the Pacific', 'Americas', 'Middle East', 'Africa', '2010', '2023', 'millions'],
  speakingPattern: /travel|culture|migration|migrant|region|country/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1Truth = reading.find((item) => item.id === 'r1-tfng');
    const r1Sent = reading.find((item) => item.id === 'r1-sent');
    const r2Sum = reading.find((item) => item.id === 'r2-sum');
    const r3Claims = reading.find((item) => item.id === 'r3-ynng');
    const r3Sent = reading.find((item) => item.id === 'r3-sent');
    return [
      { condition: l4?.blanks.find((item) => item.num === 40)?.answers[0] === 'levels', message: 'Listening Q40 closes the Antarctic lecture in evidence order.' },
      { condition: /signed in 1959 and entered into force in 1961/i.test(skills.listening[3]?.transcript ?? ''), message: 'Antarctic lecture distinguishes treaty signature from entry into force.' },
      { condition: /primary producers such as microscopic algae/i.test(skills.listening[3]?.transcript ?? ''), message: 'Antarctic lecture does not misclassify krill as a primary producer.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 3)?.answers[0] === 'TRUE', message: 'Migration Q3 reflects the end-2025 refugee and internal-displacement totals.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 10)?.answers[0] === 'climate', message: 'Migration Q10 preserves the legal terminology distinction.' },
      { condition: /41\.6 million refugees.+68\.7 million people internally displaced/is.test(skills.reading[0]?.passage ?? ''), message: 'Migration passage carries the June 2026 UNHCR figures with categories intact.' },
      { condition: r2Sum?.blanks.find((item) => item.num === 26)?.answers[0] === 'post-quantum', message: 'Quantum Q26 uses the standard migration terminology.' },
      { condition: /one key-encapsulation mechanism and two digital-signature schemes/i.test(skills.reading[1]?.passage ?? ''), message: 'Quantum passage describes the three 2024 NIST standards by function.' },
      { condition: /more precise than saying.+tries every answer at once/i.test(skills.reading[1]?.passage ?? ''), message: 'Quantum passage explicitly rejects the misleading parallel-search shortcut.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 31)?.answers[0] === 'NO', message: 'Placebo Q31 distinguishes response from effect.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 35)?.answers[0] === 'NO', message: 'Placebo Q35 rejects open-label placebo as established replacement care.' },
      { condition: r3Sent?.blanks.find((item) => item.num === 40)?.answers[0] === 'nocebo education', message: 'Placebo Q40 closes on honest risk communication.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of distinctive revised Reading sentences and the new regional-residence Writing prompt returned no exact match. The inherited generic immigration prompt was replaced because close variants are common across practice sites.',
    phrasesChecked: [
      'Modern migration occurs under different institutions, borders and transport systems',
      'A useful algorithm controls interference so that amplitudes for desired outcomes are strengthened',
      'A placebo response is the change observed in a placebo group',
      'qualified migrants a faster route to permanent residence if they live and work for several years',
    ],
  },
  factualSources: [
    'https://worldmigrationreport.iom.int/sites/g/files/tmzbdl1691/files/documents/2024-05/wmr2024-key-findings-ch2-en.pdf',
    'https://www.unhcr.org/uk/global-trends',
    'https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography',
    'https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards',
    'https://www.nccih.nih.gov/health/placebo-effect',
    'https://pubmed.ncbi.nlm.nih.gov/33594150/',
    'https://pubmed.ncbi.nlm.nih.gov/41062244/',
    'https://www.ats.aq/e/antarctictreaty.html',
    'https://www.unwto.org/tourism-data/global-and-regional-tourism-performance',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing five-region Task 1 SVG and the Writing/Speaking component architecture.',
    'Travel, culture and migration Speaking theme, expanded to complete interview density.',
  ],
  replacedOrCorrected: [
    'Replaced generic Listening density inserts with four scenario-specific scripts while preserving evidence order.',
    'Updated IOM and June 2026 UNHCR migration figures and separated stock, flow, legal category and multi-causal environmental movement.',
    'Corrected qubit, decoherence, benchmark, cryptography and application overclaims against current NIST terminology.',
    'Rebuilt the placebo passage to distinguish response, effect, natural history, open-label evidence and nocebo communication.',
    'Replaced a common generic immigration essay with an original regional-residence policy conflict.',
    'Updated the five-region tourist-arrival visual and added accessible title, description, categories, years, values and units.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA'],
});
