import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import set32 from "../src/data/mocks/ielts-set-32.ts";

const stagingRoot = join(
  process.cwd(),
  "staging/ielts-guided-listening-alignment-23-40",
);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function normalized(value) {
  return String(value ?? "")
    .toLowerCase()
    .replaceAll("’", "'")
    .match(/[a-z0-9]+/g)
    ?.join(" ") ?? "";
}

function artifact(setNumber) {
  return readJson(
    join(stagingRoot, `set-${String(setNumber).padStart(2, "0")}-phrase-alignment-staging.json`),
  );
}

test("Sets 23-40 remain fail-closed with 40 bounded chronological windows", () => {
  const manifest = readJson(join(stagingRoot, "manifest.json"));
  assert.equal(manifest.status, "PENDING_INDEPENDENT_REVIEW");
  assert.equal(manifest.releaseAuthorized, false);
  assert.equal(manifest.runtimeIntegration.connected, false);
  assert.deepEqual(
    manifest.sets.map((entry) => entry.set),
    Array.from({ length: 18 }, (_, index) => index + 23),
  );

  for (let setNumber = 23; setNumber <= 40; setNumber += 1) {
    const setArtifact = artifact(setNumber);
    assert.equal(setArtifact.status, "PENDING_INDEPENDENT_REVIEW");
    assert.equal(setArtifact.releaseAuthorized, false);
    assert.equal(setArtifact.runtimeIntegration.connected, false);
    assert.equal(setArtifact.windowCount, 40);
    assert.deepEqual(
      setArtifact.windows.map((window) => window.question),
      Array.from({ length: 40 }, (_, index) => index + 1),
    );
    for (const window of setArtifact.windows) {
      assert.ok(window.timecode.durationSeconds > 0);
      assert.ok(window.timecode.durationSeconds <= 60);
    }
    for (let index = 1; index < setArtifact.windows.length; index += 1) {
      assert.ok(
        setArtifact.windows[index - 1].timecode.startFrame
          <= setArtifact.windows[index].timecode.startFrame,
        `Set ${setNumber} Q${index} must not start after Q${index + 1}`,
      );
    }
  }
});

test("review failures have full phrase coverage and answer-bearing tails", () => {
  const set26q25 = artifact(26).windows[24];
  assert.equal(set26q25.alignmentEvidence.mappedWordCount, 35);
  assert.equal(set26q25.alignmentEvidence.targetExpectedWordCount, 35);
  const set26Phrase = normalized(set26q25.recognizedPhrase);
  assert.match(set26Phrase, /closing trail/);
  assert.match(set26Phrase, /booking is not confirmed/);
  assert.match(set26Phrase, /program topic/);
  assert.match(set26Phrase, /delete the whole trail/);

  const set36q14 = artifact(36).windows[13];
  assert.equal(set36q14.alignmentEvidence.mappedWordCount, 13);
  assert.equal(set36q14.alignmentEvidence.targetExpectedWordCount, 13);
  const set36Phrase = normalized(set36q14.recognizedPhrase);
  assert.match(set36Phrase, /marks the nesting exclusion zone/);
  assert.match(set36Phrase, /do not pass between those buoys and shore/);
});

test("Set 32 corrected answer order follows the rendered audio without leakage", () => {
  const part4 = set32.sections.find((section) => section.skill === "listening" && section.part === 4);
  const canonical39 = part4.questions.find((question) => question.id === "l-q39");
  const canonical40 = part4.questions.find((question) => question.id === "l-q40");
  assert.deepEqual(canonical39.answers, ["new growth"]);
  assert.deepEqual(canonical40.answers, ["water transport"]);

  const windows = artifact(32).windows;
  assert.ok(windows[31].timecode.startFrame <= windows[32].timecode.startFrame);
  assert.ok(windows[38].timecode.startFrame <= windows[39].timecode.startFrame);
  assert.match(normalized(windows[31].recognizedPhrase), /embolism/);
  assert.match(normalized(windows[32].recognizedPhrase), /pit membranes/);
  assert.equal(windows[38].sourceLedgerQuestion, 40);
  assert.equal(windows[39].sourceLedgerQuestion, 39);
  assert.match(normalized(windows[38].recognizedPhrase), /new growth/);
  assert.doesNotMatch(normalized(windows[38].recognizedPhrase), /water transport/);
  assert.match(normalized(windows[39].recognizedPhrase), /water transport/);
});
