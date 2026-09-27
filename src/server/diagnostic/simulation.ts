import { LOCATOR_OBJECTIVE_SKILLS, routeEnglishLocator, type LocatorScorecard } from '../../lib/diagnostic/mst.ts';
import { CEFR_LEVELS, type CefrLevel, type DiagnosticRouteId } from '../../lib/diagnostic/types.ts';

const LEVEL_THETA: Readonly<Record<CefrLevel, number>> = {
  A1: -2.5, A2: -1.5, B1: -0.5, B2: 0.5, C1: 1.5, C2: 2.5,
};

const LOCATOR_DIFFICULTIES = [-1.5, -0.5, 0.5] as const;

export interface SimulatedLocatorCohort {
  trueLevel: CefrLevel;
  sampleSize: number;
  meanCorrect: number;
  confirmationRate: number;
  routes: Readonly<Record<DiagnosticRouteId, number>>;
}

export interface DiagnosticMstSimulationReport {
  simulationVersion: 'diagnostic-mst-simulation-v2';
  seed: number;
  sampleSizePerLevel: number;
  cohorts: readonly SimulatedLocatorCohort[];
  scorecardProxies: {
    oneCorrectPerSkill: DiagnosticRouteId;
    advancedWithoutAudio: DiagnosticRouteId;
  };
}

function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

function probabilityCorrect(theta: number, difficulty: number): number {
  const knowledge = 1 / (1 + Math.exp(-1.35 * (theta - difficulty)));
  const chance = 1 / 3;
  return chance + (1 - chance) * knowledge;
}

export function simulateDiagnosticMst(seed = 20260924, sampleSizePerLevel = 1000): DiagnosticMstSimulationReport {
  if (!Number.isInteger(sampleSizePerLevel) || sampleSizePerLevel < 100) throw new Error('simulation sample must contain at least 100 candidates per level');
  const random = createRandom(seed);
  const cohorts = CEFR_LEVELS.map(trueLevel => {
    const routes: Record<DiagnosticRouteId, number> = { 'low-a1-a2': 0, 'mid-b1-b2': 0, 'high-c1-c2': 0 };
    let totalCorrect = 0;
    let confirmations = 0;
    for (let candidate = 0; candidate < sampleSizePerLevel; candidate += 1) {
      const scorecard = Object.fromEntries(LOCATOR_OBJECTIVE_SKILLS.map(skill => {
        // A small deterministic skill offset creates realistic uneven profiles without
        // changing their average latent level.
        const skillIndex = LOCATOR_OBJECTIVE_SKILLS.indexOf(skill);
        const skillOffset = (skillIndex - 1.5) * 0.08;
        const correct = LOCATOR_DIFFICULTIES.filter(difficulty =>
          random() < probabilityCorrect(LEVEL_THETA[trueLevel] + skillOffset, difficulty),
        ).length;
        return [skill, { correct, decisions: 3, omitted: 0 }];
      })) as LocatorScorecard;
      const decision = routeEnglishLocator(scorecard);
      routes[decision.routeId] += 1;
      totalCorrect += decision.totalCorrect;
      if (decision.requiresConfirmation) confirmations += 1;
    }
    return {
      trueLevel,
      sampleSize: sampleSizePerLevel,
      meanCorrect: Number((totalCorrect / sampleSizePerLevel).toFixed(3)),
      confirmationRate: Number((confirmations / sampleSizePerLevel).toFixed(3)),
      routes,
    };
  });

  const balancedGuess = Object.fromEntries(LOCATOR_OBJECTIVE_SKILLS.map(skill => [skill, {
    correct: 1, decisions: 3, omitted: 0,
  }])) as LocatorScorecard;
  const noAudio = Object.fromEntries(LOCATOR_OBJECTIVE_SKILLS.map(skill => [skill, {
    correct: skill === 'listening' ? 0 : 3,
    decisions: 3,
    omitted: skill === 'listening' ? 3 : 0,
  }])) as LocatorScorecard;
  return {
    simulationVersion: 'diagnostic-mst-simulation-v2', seed, sampleSizePerLevel, cohorts,
    scorecardProxies: {
      oneCorrectPerSkill: routeEnglishLocator(balancedGuess).routeId,
      advancedWithoutAudio: routeEnglishLocator(noAudio).routeId,
    },
  };
}
