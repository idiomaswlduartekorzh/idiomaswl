export function validateListeningReleaseApproval({
  release,
  editorialState,
  publicFiles,
  forbiddenApprovedLabels,
  releaseMode,
}) {
  const failures = [];
  const status = release?.status;

  if (releaseMode && status !== 'approved') {
    failures.push(`Release approval is ${status ?? 'missing'}: ${release?.blocker ?? 'No blocker was documented.'}`);
  }

  if (status === 'approved') {
    if (typeof release.approvedBy !== 'string' || !release.approvedBy.trim()) {
      failures.push('Approved release has no named human reviewer.');
    }
    if (typeof release.approvedAt !== 'string' || Number.isNaN(Date.parse(release.approvedAt))) {
      failures.push('Approved release has no valid approval timestamp.');
    }

    const labels = Array.isArray(forbiddenApprovedLabels) ? forbiddenApprovedLabels : [];
    const lingeringPilotLabels = publicFiles
      .filter(({ contents }) =>
        /\bpilot\b|release-gated/i.test(contents)
        || labels.some((label) => contents.includes(label)))
      .map(({ path }) => path);
    if (lingeringPilotLabels.length) {
      failures.push(`Approved release still exposes pilot labels in: ${lingeringPilotLabels.join(', ')}.`);
    }
  }

  const expectedEditorialState = status === 'approved' ? 'published' : status;
  if (editorialState !== expectedEditorialState) {
    failures.push(
      `Harness editorial state ${editorialState ?? 'missing'} does not match manifest release state ${status ?? 'missing'}.`,
    );
  }

  return failures;
}
