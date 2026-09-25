export function buildDiagnosticPilotRecruitmentPlan({
  criteria,
  blueprint,
  bankReadiness,
  simulation,
}) {
  const objectiveItems = bankReadiness?.summary?.requiredObjectiveDecisions;
  if (!Number.isInteger(objectiveItems) || objectiveItems < 1) {
    throw new Error('pilot recruitment requires a positive objective item count');
  }
  if (!Number.isInteger(criteria?.minimumResponsesPerItem) || criteria.minimumResponsesPerItem < 1) {
    throw new Error('pilot recruitment requires minimumResponsesPerItem');
  }
  if (!(criteria.minimumCompletionRate > 0 && criteria.minimumCompletionRate <= 1)) {
    throw new Error('pilot recruitment requires a bounded positive completion rate');
  }
  const routeCount = blueprint?.routes?.length;
  if (!Number.isInteger(routeCount) || routeCount < 1 || objectiveItems % routeCount !== 0) {
    throw new Error('objective capacity must divide evenly across diagnostic routes');
  }
  const minimumObjectiveDecisions = blueprint.locator.decisions + blueprint.precision.minimumDecisions;
  const maximumObjectiveDecisions = blueprint.locator.decisions + blueprint.precision.maximumDecisions;
  if (!(minimumObjectiveDecisions > 0 && maximumObjectiveDecisions >= minimumObjectiveDecisions)) {
    throw new Error('diagnostic form decision bounds are invalid');
  }
  const cohorts = simulation?.cohorts ?? [];
  const simulatedParticipants = cohorts.reduce((sum, cohort) => sum + cohort.sampleSize, 0);
  if (!simulatedParticipants || cohorts.some(cohort => !(cohort.confirmationRate >= 0 && cohort.confirmationRate <= 1))) {
    throw new Error('pilot recruitment requires a valid route simulation');
  }
  const weightedConfirmationRate = cohorts.reduce((sum, cohort) =>
    sum + cohort.confirmationRate * cohort.sampleSize, 0) / simulatedParticipants;
  const expectedObjectiveDecisions = minimumObjectiveDecisions
    + weightedConfirmationRate * (maximumObjectiveDecisions - minimumObjectiveDecisions);
  const requiredItemResponses = objectiveItems * criteria.minimumResponsesPerItem;
  const startedFor = completed => Math.ceil(completed / criteria.minimumCompletionRate);
  const completionsFor = decisions => Math.ceil(requiredItemResponses / decisions);

  const routeItems = objectiveItems / routeCount;
  const requiredResponsesPerRoute = routeItems * criteria.minimumResponsesPerItem;
  const routeBestCaseCompleted = Math.ceil(requiredResponsesPerRoute / blueprint.precision.maximumDecisions);
  const expectedRouteDecisions = blueprint.precision.minimumDecisions
    + weightedConfirmationRate * (blueprint.precision.maximumDecisions - blueprint.precision.minimumDecisions);
  const routeSimulationExpectedCompleted = Math.ceil(requiredResponsesPerRoute / expectedRouteDecisions);
  const routeWithoutConfirmationCompleted = Math.ceil(requiredResponsesPerRoute / blueprint.precision.minimumDecisions);
  const referenceCoverageMinimum = Math.max(
    criteria.minimumIndependentReferencePairs,
    criteria.minimumReferencesPerCefrLevel * blueprint.levels.length,
  );

  return {
    planVersion: 'diagnostic-pilot-recruitment-plan-v1',
    criteriaVersion: criteria.criteriaVersion,
    blueprintVersion: blueprint.id,
    simulationVersion: simulation.simulationVersion,
    status: 'planning-floor-not-publication-decision',
    assumptions: {
      objectiveItems,
      minimumResponsesPerItem: criteria.minimumResponsesPerItem,
      requiredItemResponses,
      minimumCompletionRate: criteria.minimumCompletionRate,
      minimumObjectiveDecisionsPerCompletedAttempt: minimumObjectiveDecisions,
      maximumObjectiveDecisionsPerCompletedAttempt: maximumObjectiveDecisions,
      simulatedWeightedConfirmationRate: Number(weightedConfirmationRate.toFixed(6)),
      simulatedExpectedObjectiveDecisionsPerCompletedAttempt: Number(expectedObjectiveDecisions.toFixed(3)),
    },
    itemCalibrationLowerBounds: {
      absoluteBestCase: {
        completedAttempts: completionsFor(maximumObjectiveDecisions),
        startedAttempts: startedFor(completionsFor(maximumObjectiveDecisions)),
        interpretation: 'Every completed attempt would need the maximum objective form length and perfectly useful exposure.',
      },
      simulationExpectedFormLength: {
        completedAttempts: completionsFor(expectedObjectiveDecisions),
        startedAttempts: startedFor(completionsFor(expectedObjectiveDecisions)),
        interpretation: 'Uses the current balanced-cohort routing simulation only; adaptive exposure imbalance can require more.',
      },
      withoutConfirmation: {
        completedAttempts: completionsFor(minimumObjectiveDecisions),
        startedAttempts: startedFor(completionsFor(minimumObjectiveDecisions)),
        interpretation: 'Assumes every completed attempt receives only locator plus the minimum precision module.',
      },
    },
    routeExposureLowerBounds: {
      routes: routeCount,
      objectiveItemsPerRoute: routeItems,
      requiredItemResponsesPerRoute: requiredResponsesPerRoute,
      bestCaseCompletedPerRoute: routeBestCaseCompleted,
      bestCaseCompletedAcrossRoutes: routeBestCaseCompleted * routeCount,
      bestCaseStartedAcrossRoutes: startedFor(routeBestCaseCompleted * routeCount),
      simulatedExpectedRouteDecisionsPerCompletedAttempt: Number(expectedRouteDecisions.toFixed(3)),
      simulationExpectedCompletedPerRoute: routeSimulationExpectedCompleted,
      simulationExpectedCompletedAcrossRoutes: routeSimulationExpectedCompleted * routeCount,
      simulationExpectedStartedAcrossRoutes: startedFor(routeSimulationExpectedCompleted * routeCount),
      withoutConfirmationCompletedPerRoute: routeWithoutConfirmationCompleted,
      withoutConfirmationCompletedAcrossRoutes: routeWithoutConfirmationCompleted * routeCount,
      withoutConfirmationStartedAcrossRoutes: startedFor(routeWithoutConfirmationCompleted * routeCount),
      configuredMinimumCompletedPerRoute: criteria.minimumCompletedPerRoute,
    },
    specialistEvidenceFloors: {
      writingPairs: criteria.minimumWritingPairs,
      independentReferencePairsWithLevelCoverage: referenceCoverageMinimum,
      adaptiveReliabilitySamplePerObjectiveSkill: criteria.minimumAdaptiveReliabilitySamplePerSkill,
      classificationConsistencySample: criteria.minimumClassificationConsistencySample,
      stabilityPairsPerSkill: criteria.minimumStabilityPairsPerSkill,
      fairnessParticipantsAtMinimumGroupCount: criteria.minimumFairnessGroups * criteria.minimumFairnessGroupSample,
      standardSettingPanelists: criteria.minimumStandardSettingPanelists,
    },
    warnings: [
      'minimumStartedAttempts is an entry gate, not a sufficient recruitment target for item calibration.',
      'These are mathematical lower bounds, not guarantees; routing, attrition and unequal item exposure can only increase recruitment needs.',
      'Publication remains governed by observed per-item, route, level, reliability, stability, fairness and standard-setting evidence.',
    ],
  };
}
