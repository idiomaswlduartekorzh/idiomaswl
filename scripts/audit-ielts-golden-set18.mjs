#!/usr/bin/env node

import set18 from '../src/data/mocks/ielts-set-18.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set18,
  set: 18,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set18-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'a cheap, precise, and widely accessible tool for editing DNA in virtually any organism',
    'some patients appearing functionally cured after a single treatment',
    'limited field trials have demonstrated the technical feasibility of gene drives',
    'uses data aggregated from multiple sources—financial records, social media, CCTV footage—to assign scores',
    'bilingual children acquire both languages at a normal pace',
    'mixing of languages in early speech reflects an active strategy rather than confusion',
    'without any language-specific innate mechanism',
  ],
  task1Tokens: ['collection', 'sorting', 'resin type', 'shredding', 'washing', 'melting', 'extrusion', 'pellets', 'purity', 'manufacture', 'new products', 'contaminated', 'landfill'],
  speakingPattern: /invention|technology|device|repair/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const geneSummary = reading.find((item) => item.id === 'r1-sent');
    const socialControl = reading.find((item) => item.id === 'r2-match');
    const bilingualMixing = reading.find((item) => item.id === 'r3-q30');
    const languageClaims = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: /commonly described as the last native speaker/i.test(skills.listening[2]?.transcript ?? '') && /revival as a process/i.test(skills.listening[2]?.transcript ?? ''), message: 'Manx script qualifies the last-speaker label and treats revival as a process.' },
      { condition: /Rainfall alone does not determine/i.test(skills.listening[3]?.transcript ?? '') && /environmental assessment/i.test(skills.listening[3]?.transcript ?? ''), message: 'Desert lecture qualifies the definition and the solar-energy trade-off.' },
      { condition: geneSummary?.blanks.find((item) => item.num === 12)?.answers[0] === 'inheritance', message: 'Gene-drive completion tests contained evidence rather than claiming a field release.' },
      { condition: /not the same as establishing that an environmental release would be safe/i.test(skills.reading[0]?.passage ?? ''), message: 'Gene-drive passage separates contained inheritance bias from environmental safety.' },
      { condition: /single nationwide score.+misleading/i.test(skills.reading[1]?.passage ?? ''), message: 'Smart-city passage rejects the universal Chinese citizen-score myth.' },
      { condition: /enable social control/i.test(socialControl?.items.find((item) => item.num === 18)?.stem ?? ''), message: 'Smart-city Q18 assesses the qualified governance warning.' },
      { condition: /not, by itself, evidence/i.test(bilingualMixing?.options[bilingualMixing.answer] ?? ''), message: 'Bilingual Q30 avoids treating language mixing as either confusion or a universal strategy.' },
      { condition: languageClaims?.blanks.find((item) => item.num === 32)?.answers[0] === 'YES' && /make some linguistic cues more noticeable/i.test(languageClaims?.template ?? ''), message: 'Language Q32 matches the qualified child-directed-speech evidence.' },
      { condition: listening.find((item) => item.id === 'l3-form')?.blanks.find((item) => item.num === 30)?.answers[0] === 'rehearse', message: 'Listening Q30 accepts only the verb that is actually spoken.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of three distinctive revised passages and the original medical-genetics Writing prompt returned no exact match.',
    phrasesChecked: [
      'Precision here does not mean infallibility',
      'Court judgment-defaulter lists, sector-specific regulation and local trials',
      'population averages cannot diagnose an individual child',
      'Some people believe the potential of genetic technologies to treat serious inherited diseases outweighs concerns',
    ],
  },
  factualSources: [
    'https://www.nobelprize.org/prizes/chemistry/2020/press-release/',
    'https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapies-treat-patients-sickle-cell-disease',
    'https://www.nidcd.nih.gov/health/statistics/quick-statistics-voice-speech-language',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking',
  ],
  reusedAndImproved: [
    'Four Listening settings, all objective response positions, the three Reading themes and existing IELTS interaction components.',
    'Plastic-recycling Task 1 concept and process structure, rebuilt for accessible delivery.',
    'Existing technology cue card, expanded into a complete and thematically linked Speaking interview.',
  ],
  replacedOrCorrected: [
    'Replaced generic transcript padding with scenario-specific distractors, signposting, evidence evaluation and natural turn-taking.',
    'Qualified the Manx last-speaker narrative, uncertain speaker counts and the role of funding in language revival.',
    'Expanded the desert lecture with long-term climate interpretation, diverse adaptations and environmental trade-offs.',
    'Corrected CRISPR precision, treatment outcomes, Casgevy approval and the distinction between somatic and heritable editing.',
    'Removed the unsupported gene-drive field-trial claim and aligned Question 12 with contained inheritance evidence.',
    'Corrected the single-score account of Chinese social-credit initiatives while preserving the governance issue.',
    'Qualified computational-learning, child-directed-speech, bilingual vocabulary and executive-function claims.',
    'Reframed Task 2 as an original discuss-both-views medical-governance conflict.',
    'Added a semantic SVG title/description and a complete text alternative for the plastic-recycling process.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
