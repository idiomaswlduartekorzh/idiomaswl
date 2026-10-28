#!/usr/bin/env python3
"""Fail-closed regression checks for staged IELTS Listening alignments."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
STAGING = ROOT / "staging/ielts-guided-listening-alignment-23-40"
GENERATOR = ROOT / "scripts/stage-ielts-v4-phrase-alignments-23-40.py"
TOKEN_RE = re.compile(r"[a-z0-9]+")


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def normalized(value: object) -> str:
    return " ".join(TOKEN_RE.findall(str(value or "").lower().replace("’", "'")))


def require_phrase(value: object, phrase: str, label: str) -> None:
    assert phrase in normalized(value), f"{label}: missing {phrase!r}"


def main() -> None:
    manifest = read_json(STAGING / "manifest.json")
    assert manifest["status"] == "PENDING_INDEPENDENT_REVIEW"
    assert manifest["releaseAuthorized"] is False
    assert manifest["runtimeIntegration"]["connected"] is False
    assert [item["set"] for item in manifest["sets"]] == list(range(23, 41))

    artifacts: dict[int, dict] = {}
    for manifest_row in manifest["sets"]:
        set_number = int(manifest_row["set"])
        path = STAGING / f"set-{set_number:02d}-phrase-alignment-staging.json"
        assert manifest_row["sha256"] == sha256(path), (
            f"Set {set_number}: manifest hash does not match artifact"
        )
        artifact = read_json(path)
        artifacts[set_number] = artifact
        assert artifact["status"] == "PENDING_INDEPENDENT_REVIEW"
        assert artifact["releaseAuthorized"] is False
        assert artifact["runtimeIntegration"]["connected"] is False
        assert artifact["windowCount"] == 40
        assert artifact["sourceBindings"]["generator"]["sha256"] == sha256(GENERATOR), (
            f"Set {set_number}: artifact was not regenerated with the current generator"
        )
        windows = artifact["windows"]
        assert [item["question"] for item in windows] == list(range(1, 41))
        for window in windows:
            duration = window["timecode"]["durationSeconds"]
            assert 0 < duration <= 60, (
                f"Set {set_number} Q{window['question']}: invalid duration {duration}"
            )
        for previous, current in zip(windows, windows[1:]):
            assert previous["timecode"]["startFrame"] <= current["timecode"]["startFrame"], (
                f"Set {set_number}: Q{previous['question']} starts after "
                f"Q{current['question']}"
            )

    q25 = artifacts[26]["windows"][24]
    assert q25["alignmentEvidence"]["targetExpectedWordCount"] == 35
    assert q25["alignmentEvidence"]["mappedWordCount"] == 35
    for phrase in (
        "closing trail",
        "booking is not confirmed",
        "program topic",
        "delete the whole trail",
    ):
        require_phrase(q25["recognizedPhrase"], phrase, "Set 26 Q25")

    q14 = artifacts[36]["windows"][13]
    assert q14["alignmentEvidence"]["targetExpectedWordCount"] == 13
    assert q14["alignmentEvidence"]["mappedWordCount"] == 13
    require_phrase(q14["recognizedPhrase"], "marks the nesting exclusion zone", "Set 36 Q14")
    require_phrase(q14["recognizedPhrase"], "do not pass between those buoys and shore", "Set 36 Q14")

    windows32 = artifacts[32]["windows"]
    assert windows32[31]["timecode"]["startFrame"] <= windows32[32]["timecode"]["startFrame"]
    assert windows32[38]["timecode"]["startFrame"] <= windows32[39]["timecode"]["startFrame"]
    for index, phrase in ((31, "embolism"), (32, "pit membranes"), (38, "new growth"), (39, "water transport")):
        require_phrase(windows32[index]["recognizedPhrase"], phrase, f"Set 32 Q{index + 1}")
    assert windows32[38]["sourceLedgerQuestion"] == 40
    assert windows32[39]["sourceLedgerQuestion"] == 39
    assert "water transport" not in normalized(windows32[38]["recognizedPhrase"]), (
        "Set 32 Q39 leaks the later Q40 answer"
    )

    print("PASS: 18/18 sets; 720/720 bounded chronological windows")
    print("PASS: Set26 Q25 and Set36 Q14 exact answer-bearing phrase coverage")
    print("PASS: Set32 Q32/Q33 and corrected Q39/Q40 chronological answer windows")


if __name__ == "__main__":
    main()
