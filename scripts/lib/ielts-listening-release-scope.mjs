function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function assertListeningReleaseMarkerStructure(contents) {
  const tokenPattern = /ielts-listening-release:(welearn-listening-part-[1-4]-\d{3,}):(start|end)/g;
  let open = null;
  for (const match of contents.matchAll(tokenPattern)) {
    const [, practiceId, boundary] = match;
    if (boundary === 'start') {
      if (open) throw new Error(`Nested or crossed IELTS Listening release marker: ${practiceId}.`);
      open = { practiceId, contentStart: match.index + match[0].length };
      continue;
    }
    if (!open) throw new Error(`Orphan IELTS Listening release end marker: ${practiceId}.`);
    if (open.practiceId !== practiceId) {
      throw new Error(`Crossed IELTS Listening release markers: ${open.practiceId} and ${practiceId}.`);
    }
    if (!contents.slice(open.contentStart, match.index).trim()) {
      throw new Error(`Empty IELTS Listening release block: ${practiceId}.`);
    }
    open = null;
  }
  if (open) throw new Error(`Orphan IELTS Listening release start marker: ${open.practiceId}.`);
}

export function extractListeningReleaseBlocks(contents, practiceId) {
  assertListeningReleaseMarkerStructure(contents);
  const id = escapeRegExp(practiceId);
  const pattern = new RegExp(
    `ielts-listening-release:${id}:start([\\s\\S]*?)ielts-listening-release:${id}:end`,
    'g',
  );
  return [...contents.matchAll(pattern)].map((match) => match[1]);
}
