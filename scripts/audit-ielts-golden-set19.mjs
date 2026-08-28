#!/usr/bin/env node

import set19 from '../src/data/mocks/ielts-set-19.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set19,
  set: 19,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set19-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'can only be explained if galaxies contain far more mass',
    'the most direct evidence that dark matter is a real physical substance rather than a modification',
    'The leading candidate is a class of as-yet-undiscovered particles called WIMPs',
    'global e-commerce sales were estimated at approximately $5.8 trillion',
    'Amazon dominates the North American market',
    'injury rates that exceed the retail industry average',
    'over 1,100 sites across 167 countries',
    'including the Great Barrier Reef',
    'authenticity, reversibility of interventions',
    'conditions that are now widely regarded as exploitative or illegal',
    'providing a form of preservation that survives physical destruction',
  ],
  task1Tokens: ['U.S.', 'fourth quarter', '2019', '2024', 'seasonally adjusted', 'not adjusted', '11.4', '14.0', '12.9', '14.7', '15.6', '16.4', '12.8', '15.7', '14.5', '16.0', '17.1', '17.9'],
  speakingPattern: /historical|heritage|monument|artefact|original site|tourism/i,
  extraChecks: ({ skills }) => {
    const reading = skills.reading.flatMap((section) => section.questions);
    const darkSummary = reading.find((item) => item.id === 'r1-sent');
    const heritagePrinciple = reading.find((item) => item.id === 'r3-q29');
    const heritageClaims = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: /evidence to interpret rather than a photograph/i.test(skills.reading[0]?.passage ?? '') && /still involves a physical model/i.test(skills.reading[0]?.passage ?? ''), message: 'Dark-matter passage distinguishes converging inference from direct observation.' },
      { condition: /no universally accepted direct detection/i.test(skills.reading[0]?.passage ?? '') && /rather than disproving every possible WIMP/i.test(skills.reading[0]?.passage ?? ''), message: 'WIMP passage reports null results without treating the candidate class as disproved.' },
      { condition: darkSummary?.blanks.find((item) => item.num === 10)?.answers[0] === 'WIMPs' && /long-studied class/i.test(darkSummary?.template ?? ''), message: 'Dark-matter Q10 avoids calling WIMPs the settled leading candidate.' },
      { condition: /single global total often depends on estimation/i.test(skills.reading[1]?.passage ?? '') && /calling one company the universal market leader obscures local competition/i.test(skills.reading[1]?.passage ?? ''), message: 'E-commerce passage qualifies global totals and platform dominance.' },
      { condition: /1,273 properties in 173 States Parties/i.test(skills.reading[2]?.passage ?? '') && /not currently on the danger list/i.test(skills.reading[2]?.passage ?? ''), message: 'Heritage passage uses the current UNESCO count and correct Great Barrier Reef status.' },
      { condition: /term does not appear in the Charter itself/i.test(skills.reading[2]?.passage ?? '') && /different periods should be respected/i.test(heritagePrinciple?.options[heritagePrinciple.answer] ?? ''), message: 'Venice Charter coverage removes the false reversibility attribution.' },
      { condition: heritageClaims?.blanks.find((item) => item.num === 33)?.answers[0] === 'NO' && heritageClaims?.blanks.find((item) => item.num === 34)?.answers[0] === 'NOT GIVEN', message: 'Heritage claims distinguish an explicit contradiction from an unresolved repatriation position.' },
      { condition: /object-level provenance/i.test(skills.reading[2]?.passage ?? ''), message: 'Repatriation discussion requires object-level provenance rather than a blanket legal claim.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of three distinctive revised passages and the original online-shopping Writing prompt returned no exact match.',
    phrasesChecked: [
      'a rotation curve is evidence to interpret rather than a photograph of invisible matter',
      'Monitoring a threatened listed site and formally inscribing it as in danger are distinct decisions',
      'a defensible decision requires object-level provenance',
      'Some people believe the growth of online shopping benefits society through convenience, choice and lower costs',
    ],
  },
  factualSources: [
    'https://science.nasa.gov/dark-matter/',
    'https://science.nasa.gov/universe/glossary/',
    'https://whc.unesco.org/en/list',
    'https://whc.unesco.org/en/86',
    'https://whc.unesco.org/en/decisions/9108',
    'https://www.icomos.org/charters-and-doctrinal-texts/',
    'https://civvih.icomos.org/wp-content/uploads/2022/03/Charter-of-Venice_1964.pdf',
    'https://unctad.org/publication/business-e-commerce-sales-and-role-online-platforms',
    'https://www.ilo.org/algorithmic-management-workplace',
    'https://www2.census.gov/retail/releases/historical/ecomm/19q4.pdf',
    'https://www2.census.gov/retail/releases/historical/ecomm/20q4.pdf',
    'https://www2.census.gov/retail/releases/historical/ecomm/21q4.pdf',
    'https://www2.census.gov/retail/releases/historical/ecomm/22q4.pdf',
    'https://www2.census.gov/retail/releases/historical/ecomm/23q4.pdf',
    'https://www2.census.gov/retail/releases/historical/ecomm/24q4.pdf',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening settings, all objective response positions, the three Reading themes and existing IELTS interaction components.',
    'E-commerce line-chart concept, rebuilt with a coherent U.S. Census series instead of unsupported multinational values.',
    'Historical-place cue card and heritage discussion, expanded into a complete Speaking interview.',
  ],
  replacedOrCorrected: [
    'Replaced generic transcript padding with scenario-specific policies, distractors, consent safeguards and analytical signposting.',
    'Expanded the storage lecture with duration, round-trip efficiency, life-cycle assessment and technology-fit trade-offs.',
    'Qualified galaxy rotation, lensing, Bullet Cluster interpretation, WIMP status and the meaning of direct detection.',
    'Removed unsupported global-sales forecasts and universal platform-leadership, retail-causality and injury-rate claims.',
    'Updated World Heritage counts and corrected the Great Barrier Reef danger-list claim using UNESCO 2026 evidence.',
    'Corrected the Venice Charter by removing the false reversibility attribution and identifying its actual principles.',
    'Reframed repatriation around object-level provenance and digital heritage around documentation limits.',
    'Rebuilt Task 1 from U.S. Census Q4 releases with a zero baseline, exact labels, source, title and description.',
    'Reframed Task 2 as an original discuss-both-views social-impact conflict.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
