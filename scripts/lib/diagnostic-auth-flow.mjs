import { createHash, randomUUID } from 'node:crypto';

export const DIAGNOSTIC_AUTH_FLOW_CONFIRMATION_PREFIX =
  'DELETE_ALL_DIAGNOSTIC_DATA_FOR_DEDICATED_FIXTURE:';
export const DIAGNOSTIC_AUTH_FLOW_CONSENT_VERSION = 'diagnostic-pilot-2026-09-24';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SHA256 = /^[a-f0-9]{64}$/u;
const COMMIT_SHA = /^[a-f0-9]{40}$/u;
const WRITING_CRITERIA = [
  'task-fulfilment', 'organisation', 'grammar-control', 'vocabulary-control',
];

function safeBaseUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error('DIAGNOSTIC_VERIFY_APP_URL is not a valid URL.');
  }
  const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (parsed.protocol !== 'https:' && !local) throw new Error('Remote application verification requires HTTPS.');
  if (parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error('DIAGNOSTIC_VERIFY_APP_URL must be an origin without path, query or fragment.');
  }
  return parsed.origin;
}

function safeCookie(value, label) {
  if (!value || value.length > 16_384 || /[\r\n]/u.test(value) || /^cookie\s*:/iu.test(value)) {
    throw new Error(`${label} must contain only the Cookie header value.`);
  }
  return value;
}

async function responsePayload(response) {
  return response.json().catch(() => null);
}

async function requestJson(fetchImpl, baseUrl, path, cookie, options = {}) {
  const response = await fetchImpl(`${baseUrl}${path}`, {
    method: options.method ?? 'GET',
    redirect: 'error',
    headers: {
      Cookie: cookie,
      Origin: baseUrl,
      ...(options.body === undefined ? {} : { 'content-type': 'application/json' }),
      ...(options.headers ?? {}),
    },
    ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
  });
  return { response, payload: await responsePayload(response) };
}

function assertResponse(result, expectedStatus, label) {
  if (result.response.status !== expectedStatus) {
    const code = typeof result.payload?.code === 'string' ? result.payload.code : 'NO_CODE';
    throw new Error(`${label} failed (${result.response.status}/${code})`);
  }
  return result.payload;
}

function omittedResponse(item) {
  if (item.response?.kind === 'single-choice') return { kind: 'single-choice', optionId: null };
  if (item.response?.kind === 'multiple-choice') return { kind: 'multiple-choice', optionIds: [] };
  if (item.response?.kind === 'short-text') return { kind: 'short-text', value: '' };
  throw new Error('Delivered objective item has an unsupported response contract.');
}

function objectiveSubmission(delivery) {
  if (!Array.isArray(delivery?.items) || delivery.items.length < 1) {
    throw new Error('Objective delivery has no items.');
  }
  return {
    attemptVersion: delivery.attemptVersion,
    responses: delivery.items.map(item => ({
      itemId: item.id,
      contentVersion: item.contentVersion,
      response: omittedResponse(item),
      responseMs: 1_000,
      audioPlayCount: item.stimulus?.kind === 'audio' ? 1 : null,
    })),
  };
}

function fixtureWriting(prompt) {
  if (!Number.isInteger(prompt?.minimumWords) || !Number.isInteger(prompt?.maximumWords)
    || prompt.minimumWords < 1 || prompt.minimumWords > prompt.maximumWords) {
    throw new Error('Writing prompt has an invalid word range.');
  }
  const vocabulary = [
    'I', 'am', 'writing', 'this', 'dedicated', 'verification', 'response', 'to', 'exercise',
    'the', 'complete', 'diagnostic', 'workflow', 'safely', 'with', 'clear', 'connected', 'sentences',
  ];
  return Array.from({ length: prompt.minimumWords }, (_, index) => vocabulary[index % vocabulary.length]).join(' ');
}

function humanEvaluation(prompt, responseText, now) {
  const excerpt = responseText.split(/\s+/u).slice(0, 8).join(' ');
  const responseSha256 = createHash('sha256').update(responseText.normalize('NFC')).digest('hex');
  return {
    evaluator: 'human',
    reviewerId: 'server-bound-reviewer',
    rubricVersion: 'welearn-cefr-writing-rubric-en-v2',
    promptId: prompt.id,
    promptContentVersion: prompt.contentVersion,
    responseSha256,
    criteria: WRITING_CRITERIA.map(criterion => ({
      criterion,
      level: prompt.levelCandidate,
      confidence: 0.6,
      evidence: [excerpt],
      rationale: 'Dedicated end-to-end fixture evidence for the authenticated release verification flow.',
    })),
    responseQuality: {
      taskRelevance: 'on-task',
      authorship: 'no-concern',
      rationale: 'The dedicated fixture directly answers the task and has no authorship concern.',
    },
    decision: 'accept',
    evaluatedAt: now,
  };
}

function cleanReceipt() {
  return {
    receiptVersion: 'diagnostic-authenticated-flow-v1',
    decision: 'HOLD',
    startedAt: null,
    completedAt: null,
    accessMode: null,
    target: { applicationHost: null, supabaseProject: null },
    releaseBinding: null,
    checks: {
      releaseBinding: false,
      enrollment: false,
      start: false,
      resume: false,
      privateAudio: false,
      objectiveStages: 0,
      writing: false,
      humanFinalization: false,
      fiveSkillResult: false,
      deletion: false,
      postDeletionNotFound: false,
    },
    failure: null,
    safeguards: {
      dedicatedFixtureConfirmed: true,
      answerKeysUsed: false,
      participantContentIncluded: false,
      cookiesIncluded: false,
      cleanupAttempted: false,
    },
  };
}

export async function verifyDiagnosticAuthenticatedFlow({
  appUrl,
  userCookie,
  adminCookie,
  fixtureUserId,
  destructiveConfirmation,
  expectedSourceSha256,
  expectedBankSnapshotSha256,
  expectedCommitSha,
  accessMode = 'pilot',
  cohortId = 'e2e-release-verification',
  fetchImpl = fetch,
  now = () => new Date(),
  newId = randomUUID,
}) {
  const baseUrl = safeBaseUrl(appUrl);
  const userSession = safeCookie(userCookie, 'DIAGNOSTIC_VERIFY_USER_COOKIE');
  const adminSession = safeCookie(adminCookie, 'DIAGNOSTIC_VERIFY_ADMIN_COOKIE');
  if (!UUID.test(fixtureUserId)) throw new Error('DIAGNOSTIC_VERIFY_USER_ID must be a valid UUID.');
  if (!SHA256.test(expectedSourceSha256 ?? '')) {
    throw new Error('Expected diagnostic source SHA-256 is invalid.');
  }
  if (!SHA256.test(expectedBankSnapshotSha256 ?? '')) {
    throw new Error('Expected diagnostic bank SHA-256 is invalid.');
  }
  if (!COMMIT_SHA.test(expectedCommitSha ?? '')) {
    throw new Error('Expected diagnostic commit SHA is invalid.');
  }
  if (destructiveConfirmation !== `${DIAGNOSTIC_AUTH_FLOW_CONFIRMATION_PREFIX}${fixtureUserId}`) {
    throw new Error('Dedicated fixture deletion confirmation does not match the user UUID.');
  }
  if (accessMode !== 'pilot' && accessMode !== 'production') {
    throw new Error('DIAGNOSTIC_VERIFY_ACCESS_MODE must be pilot or production.');
  }
  if (!/^[a-z0-9][a-z0-9._-]{2,99}$/u.test(cohortId)) throw new Error('Diagnostic verification cohort is invalid.');

  const receipt = cleanReceipt();
  receipt.startedAt = now().toISOString();
  receipt.accessMode = accessMode;
  receipt.target.applicationHost = new URL(baseUrl).hostname;
  receipt.checks.enrollment = accessMode === 'production';
  let attemptId = null;
  let deleted = false;

  async function deleteFixture() {
    receipt.safeguards.cleanupAttempted = true;
    const result = await requestJson(fetchImpl, baseUrl, '/api/diagnostic/attempts', userSession, {
      method: 'DELETE',
      body: { confirmation: 'DELETE_DIAGNOSTIC_DATA' },
    });
    const payload = assertResponse(result, 200, 'fixture deletion');
    if (payload?.receipt?.remainingAttempts !== 0) throw new Error('Fixture deletion was not verified.');
    receipt.checks.deletion = true;
    deleted = true;
  }

  try {
    const bindingResult = await requestJson(
      fetchImpl, baseUrl, '/api/admin/diagnostic/release-binding', adminSession,
    );
    const bindingPayload = assertResponse(bindingResult, 200, 'release binding');
    const binding = bindingPayload?.binding;
    if (binding?.bindingVersion !== 'diagnostic-live-release-binding-v1'
      || binding.ready !== true
      || binding.accessMode !== accessMode
      || binding.sourceSha256 !== expectedSourceSha256
      || binding.bankSnapshotSha256 !== expectedBankSnapshotSha256
      || binding.commitSha !== expectedCommitSha
      || typeof binding.supabaseProject !== 'string'
      || binding.supabaseProject.length < 1) {
      throw new Error('Running application does not match the expected diagnostic release binding.');
    }
    receipt.target.supabaseProject = binding.supabaseProject;
    receipt.releaseBinding = {
      bindingVersion: binding.bindingVersion,
      accessMode: binding.accessMode,
      sourceSha256: binding.sourceSha256,
      bankSnapshotSha256: binding.bankSnapshotSha256,
      commitSha: binding.commitSha,
      releaseId: typeof binding.releaseId === 'string' ? binding.releaseId : null,
    };
    receipt.checks.releaseBinding = true;

    if (accessMode === 'pilot') {
      const invite = await requestJson(fetchImpl, baseUrl, '/api/admin/diagnostic/pilot-enrollments', adminSession, {
        method: 'POST',
        body: { userId: fixtureUserId, cohortId, action: 'invited' },
      });
      assertResponse(invite, 201, 'pilot invitation');
      const consent = await requestJson(fetchImpl, baseUrl, '/api/admin/diagnostic/pilot-enrollments', adminSession, {
        method: 'POST',
        body: {
          userId: fixtureUserId,
          cohortId,
          action: 'consented',
          consentConfirmed: true,
          consentedAt: now().toISOString(),
          consentReference: `e2e:${newId()}`,
        },
      });
      assertResponse(consent, 201, 'pilot consent');
      receipt.checks.enrollment = true;
    }

    const start = await requestJson(fetchImpl, baseUrl, '/api/diagnostic/attempts', userSession, {
      method: 'POST',
      body: {
        language: 'en',
        audioCheckPassed: true,
        listeningAccommodation: false,
        consentVersion: DIAGNOSTIC_AUTH_FLOW_CONSENT_VERSION,
      },
    });
    const startPayload = assertResponse(start, 201, 'diagnostic start');
    let delivery = startPayload?.delivery;
    if (!UUID.test(delivery?.attemptId) || delivery?.stage?.kind !== 'locator') {
      throw new Error('Diagnostic start returned an invalid locator delivery.');
    }
    attemptId = delivery.attemptId;
    receipt.checks.start = true;

    const firstResume = await requestJson(
      fetchImpl, baseUrl, `/api/diagnostic/attempts/${encodeURIComponent(attemptId)}`, userSession,
    );
    const resumePayload = assertResponse(firstResume, 200, 'diagnostic resume');
    if (resumePayload?.resume?.kind !== 'objective-stage'
      || resumePayload.resume.delivery.stage.stageId !== delivery.stage.stageId) {
      throw new Error('Diagnostic resume did not return the active locator.');
    }
    receipt.checks.resume = true;

    const audioItem = delivery.items.find(item => item.stimulus?.kind === 'audio');
    if (!audioItem) throw new Error('Locator did not include listening evidence.');
    const audio = await fetchImpl(`${baseUrl}${audioItem.stimulus.src}`, {
      method: 'HEAD',
      redirect: 'error',
      headers: { Cookie: userSession, Range: 'bytes=0-0' },
    });
    if (![200, 206].includes(audio.status)
      || audio.headers.get('content-type') !== 'audio/mpeg'
      || audio.headers.get('cache-control') !== 'private, no-store, max-age=0') {
      throw new Error(`Private diagnostic audio failed (${audio.status}).`);
    }
    receipt.checks.privateAudio = true;

    for (let stageCount = 0; stageCount < 3 && delivery?.stage?.kind !== 'writing'; stageCount += 1) {
      const stageId = delivery.stage.stageId;
      const submission = await requestJson(
        fetchImpl,
        baseUrl,
        `/api/diagnostic/attempts/${encodeURIComponent(attemptId)}/stages/${encodeURIComponent(stageId)}`,
        userSession,
        { method: 'POST', body: objectiveSubmission(delivery) },
      );
      const submissionPayload = assertResponse(submission, 200, `${delivery.stage.kind} submission`);
      delivery = submissionPayload?.delivery;
      receipt.checks.objectiveStages += 1;
    }
    if (delivery?.stage?.kind !== 'writing' || !delivery.prompt) {
      throw new Error('Objective flow did not terminate in writing.');
    }

    const responseText = fixtureWriting(delivery.prompt);
    const writing = await requestJson(
      fetchImpl,
      baseUrl,
      `/api/diagnostic/attempts/${encodeURIComponent(attemptId)}/stages/${encodeURIComponent(delivery.stage.stageId)}`,
      userSession,
      { method: 'POST', body: { attemptVersion: delivery.attemptVersion, responseText } },
    );
    assertResponse(writing, 202, 'writing submission');
    receipt.checks.writing = true;

    const processing = await requestJson(
      fetchImpl, baseUrl, `/api/diagnostic/attempts/${encodeURIComponent(attemptId)}`, userSession,
    );
    const processingPayload = assertResponse(processing, 200, 'processing resume');
    if (processingPayload?.resume?.kind !== 'processing') throw new Error('Writing did not enter processing.');

    const finalizedAt = now().toISOString();
    const finalization = await requestJson(
      fetchImpl,
      baseUrl,
      `/api/admin/diagnostic/attempts/${encodeURIComponent(attemptId)}/finalize`,
      adminSession,
      { method: 'POST', body: { human: humanEvaluation(delivery.prompt, responseText, finalizedAt) } },
    );
    assertResponse(finalization, 200, 'human finalization');
    receipt.checks.humanFinalization = true;

    const result = await requestJson(
      fetchImpl, baseUrl, `/api/diagnostic/attempts/${encodeURIComponent(attemptId)}`, userSession,
    );
    const resultPayload = assertResponse(result, 200, 'result resume');
    if (resultPayload?.resume?.kind !== 'result'
      || !Array.isArray(resultPayload.resume.resultProfile?.skills)
      || resultPayload.resume.resultProfile.skills.length !== 5) {
      throw new Error('Final result does not contain five skill profiles.');
    }
    receipt.checks.fiveSkillResult = true;

    await deleteFixture();
    const afterDeletion = await requestJson(
      fetchImpl, baseUrl, `/api/diagnostic/attempts/${encodeURIComponent(attemptId)}`, userSession,
    );
    receipt.checks.postDeletionNotFound = afterDeletion.response.status === 404;
    if (!receipt.checks.postDeletionNotFound) throw new Error('Deleted fixture attempt is still reachable.');

    receipt.completedAt = now().toISOString();
    receipt.decision = 'PASS';
  } catch (cause) {
    receipt.failure = cause instanceof Error ? cause.message : 'Unknown authenticated flow failure.';
  } finally {
    if (!deleted) {
      try {
        await deleteFixture();
      } catch (cleanupCause) {
        const cleanupMessage = cleanupCause instanceof Error ? cleanupCause.message : 'unknown cleanup failure';
        receipt.failure = receipt.failure
          ? `${receipt.failure}; cleanup: ${cleanupMessage}`
          : `cleanup: ${cleanupMessage}`;
      }
    }
  }

  if (!receipt.completedAt) receipt.completedAt = now().toISOString();
  if (receipt.decision === 'PASS' && !Object.entries(receipt.checks)
    .every(([key, value]) => key === 'objectiveStages' ? value >= 2 && value <= 3 : value === true)) {
    receipt.decision = 'HOLD';
    receipt.failure = 'Authenticated flow receipt is incomplete.';
  }
  return receipt;
}
