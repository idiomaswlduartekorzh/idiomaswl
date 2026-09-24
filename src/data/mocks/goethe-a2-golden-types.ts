export type GoetheA2Choice = {
  id: string;
  prompt: string;
  options: [string, string, string];
  answer: 0 | 1 | 2;
  rationale: string;
  distractorRationales: [string, string, string];
  visualAsset?: string;
  visualAlt?: string;
};

export type GoetheA2Turn = {
  speaker: string;
  text: string;
};

export type GoetheA2AudioItem = GoetheA2Choice & {
  turns: GoetheA2Turn[];
};

export type GoetheA2GoldenSet = {
  schemaVersion: 1;
  id: 'a2-1';
  status: 'AUDIO_BLOCKED';
  title: string;
  authorship: {
    owner: 'WeLearn';
    original: true;
    officialSourcesUsedForArchitectureOnly: true;
  };
  levelProfile: {
    audience: 'adults-16-plus';
    register: 'everyday-personal-and-semi-official';
    targetLevel: 'A2';
    grammarEnvelope: string[];
    lexicalDomains: string[];
  };
  reading: {
    minutes: 30;
    parts: [
      { part: 1; family: 'continuous-media-text'; title: string; text: string; items: GoetheA2Choice[] },
      { part: 2; family: 'directory-program-board'; title: string; text: string; items: GoetheA2Choice[] },
      { part: 3; family: 'correspondence'; title: string; text: string; items: GoetheA2Choice[] },
      {
        part: 4;
        family: 'needs-to-six-ads';
        title: string;
        example: { profile: string; answer: string };
        profiles: { id: string; text: string; answer: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'X'; rationale: string }[];
        adverts: { letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'; heading: string; text: string }[];
      },
    ];
  };
  listening: {
    minutesApprox: 30;
    masterTrack: { status: 'script-ready-audio-blocked'; path: string; targetMinutes: [22, 25]; includesTransferWindow: true };
    parts: [
      { part: 1; family: 'five-short-public-or-private-messages'; plays: 2; items: GoetheA2AudioItem[] },
      {
        part: 2;
        family: 'one-continuous-conversation';
        plays: 1;
        visualAsset: string;
        visualAlt: string;
        options: { letter: string; label: string }[];
        turns: GoetheA2Turn[];
        items: { id: string; prompt: string; answer: string; rationale: string }[];
      },
      { part: 3; family: 'five-short-conversations'; plays: 1; items: GoetheA2AudioItem[] },
      {
        part: 4;
        family: 'radio-interview';
        plays: 2;
        turns: GoetheA2Turn[];
        items: { id: string; statement: string; answer: boolean; rationale: string }[];
      },
    ];
  };
  writing: {
    minutes: 30;
    tasks: [
      { part: 1; family: 'personal-message'; situation: string; functions: [string, string, string]; minWords: 20; maxWords: 30; modelAnswer: string },
      { part: 2; family: 'semi-official-email'; situation: string; addressee: string; functions: [string, string, string]; minWords: 30; maxWords: 40; modelAnswer: string },
    ];
  };
  speaking: {
    pairMinutes: 15;
    preparationMinutes: 0;
    tasks: [
      {
        part: 1;
        family: 'personal-information-exchange';
        candidateA: [string, string, string, string];
        candidateB: [string, string, string, string];
        examples: string[];
      },
      { part: 2; family: 'guided-personal-monologue'; prompt: string; cues: [string, string, string, string]; followUps: [string, string] },
      {
        part: 3;
        family: 'pair-planning-negotiation';
        situation: string;
        candidateAAsset: string;
        candidateBAsset: string;
        candidateAAlt: string;
        candidateBAlt: string;
        requiredOutcome: string;
      },
    ];
  };
  scoring: {
    reading: { rawMaximum: 20; multiplier: 1.25; resultMaximum: 25 };
    listening: { rawMaximum: 20; multiplier: 1.25; resultMaximum: 25 };
    writing: {
      rawMaximum: 20;
      multiplier: 1.25;
      resultMaximum: 25;
      rubric: {
        bands: ['A', 'B', 'C', 'D', 'E'];
        pointsPerCriterion: [5, 3.5, 2, 0.5, 0];
        criteriaPerTask: ['task-fulfilment-and-register', 'language-range-and-control'];
        zeroRule: string;
      };
    };
    speaking: {
      resultMaximum: 25;
      rubric: {
        bands: ['A', 'B', 'C', 'D', 'E'];
        part1PointsPerCriterion: [2, 1.5, 1, 0.5, 0];
        part2PointsPerCriterion: [4, 3, 2, 1, 0];
        part3PointsPerCriterion: [4, 3, 2, 1, 0];
        pronunciationPoints: [5, 3.5, 2, 0.5, 0];
        taskCriteria: ['language-function', 'interaction', 'register'];
        languageCriteria: ['range', 'control'];
        pronunciationCriteria: ['intonation', 'word-stress', 'individual-sounds'];
        zeroRule: string;
      };
    };
    pass: { totalMinimum: 60; writtenMinimum: 45; writtenMaximum: 75; oralMinimum: 15; oralMaximum: 25 };
  };
  media: {
    style: 'functional-exam-editorial';
    photography: 'none';
    assets: { id: string; path: string; purpose: string; alt: string }[];
  };
};
