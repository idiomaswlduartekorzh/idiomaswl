#!/usr/bin/env python3
"""Stage reproducible phrase-level Listening alignments for IELTS Sets 23-40.

This script is deliberately fail-closed.  It never edits runtime data and never
changes a release state.  It verifies the final/public MP3 binding, transcribes
the exact WAV chunks used by the ElevenLabs v4 master with local MLX Whisper
word timestamps, aligns the immutable spoken script to those words, and writes
review-only evidence below ``staging/``.
"""

from __future__ import annotations

import argparse
import contextlib
import hashlib
import importlib.metadata
import io
import json
import os
import re
import sys
import wave
from pathlib import Path
from typing import Any

import mlx_whisper


CANONICAL_ROOT = Path("/Users/ddev/Documents/Codex/2026-10-02/pu")
REPO_ROOT = Path(__file__).resolve().parents[1]
MODEL = Path(
    "/Users/ddev/.cache/huggingface/hub/"
    "models--mlx-community--whisper-small-mlx/snapshots/"
    "45f3915923c7a79a5a5b5a7d909d39aeb0e5630e"
)
FFMPEG = Path(
    "/Users/ddev/Library/Python/3.9/lib/python/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
OUTPUT_ROOT = REPO_ROOT / "staging/ielts-guided-listening-alignment-23-40"
SAMPLE_RATE = 44_100
CONTEXT_SECONDS = 0.35
MAX_WINDOW_SECONDS = 60.0
TOKEN_RE = re.compile(r"[a-z0-9]+")
CONCAT_RE = re.compile(r"^file '(.+)'$")

# These are narrow, review-driven remediations.  They intentionally do not
# change any already-passing set.  Every alternative remains derived from the
# same hash-bound rendered WAV and timestamped local ASR pass.
FULL_COVERAGE_CONDITIONED_RETRY = {(26, 25), (36, 14)}
FIRST_ANSWER_OCCURRENCE = {(32, 32)}
# The Set 32 production ledger was numbered before the candidate-facing key was
# corrected.  Keep the immutable ledger row/hash as provenance, but project its
# two final rows onto the corrected chronological question order.
GUIDED_QUESTION_REMAP = {(32, 39): 40, (32, 40): 39}
REVIEW_FOCUS_PHRASES = {
    # The unconditioned pass ended before this answer-bearing tail.  Target the
    # exact tail itself so phrase coverage is measurable without treating
    # spoken "northeast" as two separate words for scripted "north-east".
    (36, 14): (
        "marks the nesting exclusion zone. Do not pass between those buoys and shore."
    ),
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def stable_json_sha(value: Any) -> str:
    encoded = json.dumps(
        value, ensure_ascii=False, sort_keys=True, separators=(",", ":")
    ).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def tokens(text: Any) -> list[str]:
    return TOKEN_RE.findall(str(text or "").lower().replace("’", "'"))


def wav_frames(path: Path) -> int:
    with wave.open(str(path), "rb") as source:
        assert source.getframerate() == SAMPLE_RATE, (
            f"{path}: expected {SAMPLE_RATE} Hz, got {source.getframerate()}"
        )
        assert source.getnchannels() == 1, f"{path}: expected mono"
        assert source.getsampwidth() == 2, f"{path}: expected 16-bit PCM"
        return source.getnframes()


def parse_sets(value: str) -> list[int]:
    selected: set[int] = set()
    for item in value.split(","):
        item = item.strip()
        if not item:
            continue
        if "-" in item:
            first, last = (int(part) for part in item.split("-", 1))
            selected.update(range(first, last + 1))
        else:
            selected.add(int(item))
    result = sorted(selected)
    assert result and all(23 <= item <= 40 for item in result), (
        "--sets must select only IELTS Sets 23-40"
    )
    return result


def exact_subsequence(
    haystack: list[str], needle: list[str], occurrence: str = "last"
) -> tuple[int, int] | None:
    if not needle:
        return None
    matches = [
        (start, start + len(needle))
        for start in range(0, len(haystack) - len(needle) + 1)
        if haystack[start : start + len(needle)] == needle
    ]
    assert occurrence in {"first", "last"}
    if not matches:
        return None
    return matches[0] if occurrence == "first" else matches[-1]


def ledger_value(row: dict[str, Any], keys: tuple[str, ...]) -> Any:
    return next((row.get(key) for key in keys if row.get(key) is not None), None)


def question_number(row: dict[str, Any]) -> int:
    value = row.get("number", row.get("question"))
    assert value is not None, f"Evidence row has no question number: {row}"
    return int(value)


def guided_question_number(set_number: int, row: dict[str, Any]) -> int:
    source_number = question_number(row)
    return GUIDED_QUESTION_REMAP.get((set_number, source_number), source_number)


def resolve_segment(
    row: dict[str, Any], plan_segments: list[dict[str, Any]]
) -> dict[str, Any]:
    segment_by_id = {item["segment_id"]: item for item in plan_segments}
    declared = ledger_value(row, ("turnId", "segmentId", "evidenceEntry"))
    if declared in segment_by_id:
        return segment_by_id[str(declared)]
    number = question_number(row)
    anchored = [
        item
        for item in plan_segments
        if number in (item.get("question_anchor") or [])
    ]
    assert len(anchored) == 1, (
        f"Question {number}: declared segment {declared!r} is absent and "
        f"question_anchor resolved {len(anchored)} segments"
    )
    return anchored[0]


def choose_focus(
    row: dict[str, Any], segment_text: str, answer_occurrence: str = "last"
) -> tuple[str, str, tuple[int, int]]:
    segment_tokens = tokens(segment_text)
    answer = ledger_value(
        row,
        ("answerAnchor", "canonical", "answer", "anchor", "answerBearingSpan"),
    )
    answer_tokens = tokens(answer)
    # A-H are usually option/map labels and are not spoken answer text.
    option_label = len(answer_tokens) == 1 and answer_tokens[0] in set("abcdefgh")
    if answer_tokens and not option_label:
        answer_range = exact_subsequence(
            segment_tokens, answer_tokens, occurrence=answer_occurrence
        )
        if answer_range:
            return str(answer), "ANSWER_ANCHOR_EXACT_IN_RENDERED_TURN", answer_range

    evidence = ledger_value(
        row,
        ("evidenceText", "evidence", "quote", "answerBearingSpan"),
    )
    evidence_tokens = tokens(evidence)
    evidence_range = exact_subsequence(segment_tokens, evidence_tokens)
    if evidence_range:
        return str(evidence), "LEDGER_EVIDENCE_EXACT_IN_RENDERED_TURN", evidence_range

    # The production plan is the exact text sent to ElevenLabs.  This fallback
    # is preferable to carrying forward stale pre-remediation ledger wording.
    assert segment_tokens, f"Question {question_number(row)} resolved an empty turn"
    return (
        segment_text,
        "RENDERED_PLAN_TURN_EXACT_LEDGER_BINDING",
        (0, len(segment_tokens)),
    )


def align_expected_to_recognized(
    expected: list[str], recognized: list[str]
) -> tuple[dict[int, int], int]:
    """Return a deterministic Levenshtein backtrace mapping expected words."""
    rows = len(expected) + 1
    cols = len(recognized) + 1
    costs = [[0] * cols for _ in range(rows)]
    moves = [[""] * cols for _ in range(rows)]
    for i in range(1, rows):
        costs[i][0] = i
        moves[i][0] = "up"
    for j in range(1, cols):
        costs[0][j] = j
        moves[0][j] = "left"
    for i in range(1, rows):
        for j in range(1, cols):
            diagonal = costs[i - 1][j - 1] + (expected[i - 1] != recognized[j - 1])
            up = costs[i - 1][j] + 1
            left = costs[i][j - 1] + 1
            # Prefer a diagonal on ties so a spoken substitution retains its
            # timestamp rather than becoming an ungrounded deletion.
            choice = min((diagonal, 0, "diag"), (up, 1, "up"), (left, 2, "left"))
            costs[i][j] = choice[0]
            moves[i][j] = choice[2]
    mapping: dict[int, int] = {}
    i, j = len(expected), len(recognized)
    while i or j:
        move = moves[i][j]
        if move == "diag":
            mapping[i - 1] = j - 1
            i -= 1
            j -= 1
        elif move == "up":
            i -= 1
        elif move == "left":
            j -= 1
        else:
            raise AssertionError(f"Invalid alignment backtrace at {i},{j}")
    return mapping, costs[-1][-1]


def transcribe_chunk(
    audio_path: Path,
    cache_path: Path,
    chunk_id: str,
    expected_text: str,
    condition_on_previous_text: bool = False,
) -> dict[str, Any]:
    audio_sha = sha256(audio_path)
    if cache_path.exists():
        cached = json.loads(cache_path.read_text(encoding="utf-8"))
        assert cached["audio"]["sha256"] == audio_sha, (
            f"{cache_path}: cached ASR is bound to a different audio hash"
        )
        assert cached["model"]["snapshot"] == MODEL.name
        assert (
            cached["decodeOptions"]["conditionOnPreviousText"]
            is condition_on_previous_text
        )
        return cached

    os.environ["PATH"] = f"/tmp:{os.environ.get('PATH', '')}"
    with contextlib.redirect_stderr(io.StringIO()):
        result = mlx_whisper.transcribe(
            str(audio_path),
            path_or_hf_repo=str(MODEL),
            language="en",
            task="transcribe",
            verbose=False,
            condition_on_previous_text=condition_on_previous_text,
            word_timestamps=True,
            temperature=0.0,
        )
    recognized_words = []
    for segment in result.get("segments") or []:
        for word in segment.get("words") or []:
            text = str(word.get("word") or "").strip()
            normalized = tokens(text)
            if not normalized:
                continue
            # Whisper normally emits one lexical word per row.  Split rows are
            # retained with the same acoustic interval and fail later if they
            # make a requested window ambiguous.
            for normalized_word in normalized:
                recognized_words.append(
                    {
                        "word": text,
                        "normalized": normalized_word,
                        "startSeconds": round(float(word.get("start") or 0.0), 6),
                        "endSeconds": round(float(word.get("end") or 0.0), 6),
                        "probability": round(float(word.get("probability") or 0.0), 6),
                    }
                )
    assert recognized_words, f"{audio_path}: ASR produced no timestamped words"
    payload = {
        "schemaVersion": 1,
        "artifactType": "IELTS_V4_CHUNK_WORD_TIMESTAMP_ASR_STAGING",
        "status": "PENDING_INDEPENDENT_REVIEW",
        "releaseAuthorized": False,
        "chunkId": chunk_id,
        "audio": {
            "path": str(audio_path),
            "sha256": audio_sha,
            "frames": wav_frames(audio_path),
            "sampleRateHz": SAMPLE_RATE,
        },
        "model": {
            "engine": "mlx-whisper",
            "packageVersion": importlib.metadata.version("mlx-whisper"),
            "snapshot": MODEL.name,
            "weightsSha256": sha256(MODEL / "weights.npz"),
        },
        "decodeOptions": {
            "language": "en",
            "task": "transcribe",
            "conditionOnPreviousText": condition_on_previous_text,
            "wordTimestamps": True,
            "temperature": 0.0,
        },
        "expectedTextSha256": hashlib.sha256(expected_text.encode("utf-8")).hexdigest(),
        "transcript": str(result.get("text") or "").strip(),
        "words": recognized_words,
    }
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return payload


def concat_layout(concat_path: Path) -> tuple[list[dict[str, Any]], int]:
    entries = []
    cursor = 0
    for raw_line in concat_path.read_text(encoding="utf-8").splitlines():
        match = CONCAT_RE.match(raw_line.strip())
        assert match, f"{concat_path}: unsupported concat line {raw_line!r}"
        item_path = Path(match.group(1))
        frames = wav_frames(item_path)
        entries.append(
            {
                "path": item_path,
                "sha256": sha256(item_path),
                "startFrame": cursor,
                "endFrame": cursor + frames,
                "frames": frames,
            }
        )
        cursor += frames
    return entries, cursor


def build_set(set_number: int, force_asr: bool) -> dict[str, Any]:
    output_dir = (
        CANONICAL_ROOT
        / f"outputs/ielts-production/set-{set_number}/listening/elevenlabs-v4"
    )
    manifest_path = output_dir / f"set{set_number}-eleven-v4-manifest.json"
    qa_path = output_dir / f"set{set_number}-eleven-v4-qa.json"
    concat_path = output_dir / f"set{set_number}-concat.txt"
    master_wav = output_dir / f"ielts-set-{set_number}-listening-eleven-v4-master.wav"
    source_mp3 = output_dir / f"ielts-set-{set_number}-listening-eleven-v4.mp3"
    public_mp3 = REPO_ROOT / f"public/audio/ielts/ielts-listening-set-{set_number}.mp3"
    for required in (
        manifest_path,
        qa_path,
        concat_path,
        master_wav,
        source_mp3,
        public_mp3,
    ):
        assert required.exists(), f"Set {set_number}: missing {required}"

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    qa = json.loads(qa_path.read_text(encoding="utf-8"))
    plan_path = Path(manifest["sourcePlan"]["path"])
    assert sha256(plan_path) == manifest["sourcePlan"]["sha256"]
    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    content_path = Path(plan["source"]["path"])
    assert sha256(content_path) == plan["source"]["sha256"]
    content = json.loads(content_path.read_text(encoding="utf-8"))

    source_mp3_sha = sha256(source_mp3)
    public_mp3_sha = sha256(public_mp3)
    assert source_mp3_sha == qa["audio"]["mp3Sha256"]
    assert public_mp3_sha == source_mp3_sha, (
        f"Set {set_number}: public MP3 differs from the QA-bound ElevenLabs v4 MP3"
    )
    assert sha256(master_wav) == qa["audio"]["wavSha256"]
    assert qa["gates"]["technicalQa"] == "PASS"
    assert qa["gates"]["asr"] == "PASS"
    assert qa["gates"]["release"] != "APPROVED"

    layout, concat_frames = concat_layout(concat_path)
    master_frames = wav_frames(master_wav)
    assert concat_frames == master_frames, (
        f"Set {set_number}: concat has {concat_frames} frames, master has {master_frames}"
    )
    layout_by_name = {entry["path"].name: entry for entry in layout}
    chunk_by_segment = {
        item["segmentId"]: chunk
        for chunk in manifest["chunks"]
        for item in chunk["inputs"]
    }
    manifest_input = {
        item["segmentId"]: item
        for chunk in manifest["chunks"]
        for item in chunk["inputs"]
    }

    resolved = [
        (row, resolve_segment(row, plan["segments"]))
        for row in content["answerEvidenceLedger"]
    ]
    assert len(resolved) == 40
    needed_chunks = sorted(
        {chunk_by_segment[segment["segment_id"]]["id"] for _, segment in resolved}
    )
    chunk_results: dict[str, dict[str, Any]] = {}
    chunk_alignment: dict[str, dict[str, Any]] = {}

    for chunk_id in needed_chunks:
        chunk = next(item for item in manifest["chunks"] if item["id"] == chunk_id)
        paced_name = f"{chunk_id}-paced.wav"
        regular_name = f"{chunk_id}.wav"
        layout_entry = layout_by_name.get(paced_name) or layout_by_name.get(regular_name)
        assert layout_entry, f"Set {set_number} {chunk_id}: chunk is absent from concat"
        expected_text = " ".join(item["text"] for item in chunk["inputs"])
        cache_path = (
            OUTPUT_ROOT
            / "raw-asr"
            / f"set-{set_number:02d}"
            / f"{chunk_id}.json"
        )
        if force_asr and cache_path.exists():
            cache_path.unlink()
        raw = transcribe_chunk(
            layout_entry["path"], cache_path, chunk_id, expected_text
        )
        expected_words: list[str] = []
        segment_ranges: dict[str, tuple[int, int]] = {}
        for item in chunk["inputs"]:
            start = len(expected_words)
            expected_words.extend(tokens(item["text"]))
            segment_ranges[item["segmentId"]] = (start, len(expected_words))
        recognized = [item["normalized"] for item in raw["words"]]
        mapping, distance = align_expected_to_recognized(expected_words, recognized)
        chunk_results[chunk_id] = raw
        chunk_alignment[chunk_id] = {
            "layout": layout_entry,
            "expectedWords": expected_words,
            "segmentRanges": segment_ranges,
            "mapping": mapping,
            "editDistance": distance,
            "wordErrorRate": round(distance / max(1, len(expected_words)), 6),
            "rawPath": cache_path,
        }

    windows = []
    for row, segment in sorted(
        resolved, key=lambda item: guided_question_number(set_number, item[0])
    ):
        source_number = question_number(row)
        number = guided_question_number(set_number, row)
        regression_key = (set_number, number)
        segment_id = segment["segment_id"]
        chunk = chunk_by_segment[segment_id]
        chunk_id = chunk["id"]
        state = chunk_alignment[chunk_id]
        raw = chunk_results[chunk_id]
        segment_start, segment_end = state["segmentRanges"][segment_id]
        answer_occurrence = (
            "first" if regression_key in FIRST_ANSWER_OCCURRENCE else "last"
        )
        focus_text, focus_basis, (focus_lo, focus_hi) = choose_focus(
            row, segment["text"], answer_occurrence=answer_occurrence
        )
        if regression_key in REVIEW_FOCUS_PHRASES:
            focus_text = REVIEW_FOCUS_PHRASES[regression_key]
            focus_range = exact_subsequence(tokens(segment["text"]), tokens(focus_text))
            assert focus_range, (
                f"Set {set_number} Q{number}: review focus is absent from rendered turn"
            )
            focus_lo, focus_hi = focus_range
            focus_basis = "INDEPENDENT_REVIEW_ANSWER_BEARING_TAIL_EXACT_IN_AUDIO"
        expected_indices = list(
            range(segment_start + focus_lo, segment_start + focus_hi)
        )
        mapped = [state["mapping"].get(index) for index in expected_indices]
        recognized_indices = [index for index in mapped if index is not None]
        needs_full_coverage = regression_key in FULL_COVERAGE_CONDITIONED_RETRY
        if not recognized_indices or (
            needs_full_coverage and len(recognized_indices) < len(expected_indices)
        ):
            # MLX Whisper's word-timestamp pass can occasionally truncate the
            # tail of a long dialogue only when previous-text conditioning is
            # disabled. Re-run the same hash-bound WAV with the QA-compatible
            # conditioning mode and retain that independent raw evidence.
            retry_path = (
                OUTPUT_ROOT
                / "raw-asr"
                / f"set-{set_number:02d}"
                / f"{chunk_id}-conditioned.json"
            )
            retry = transcribe_chunk(
                state["layout"]["path"],
                retry_path,
                chunk_id,
                " ".join(item["text"] for item in chunk["inputs"]),
                condition_on_previous_text=True,
            )
            retry_recognized = [item["normalized"] for item in retry["words"]]
            retry_mapping, retry_distance = align_expected_to_recognized(
                state["expectedWords"], retry_recognized
            )
            state["mapping"] = retry_mapping
            state["editDistance"] = retry_distance
            state["wordErrorRate"] = round(
                retry_distance / max(1, len(state["expectedWords"])), 6
            )
            state["rawPath"] = retry_path
            raw = retry
            chunk_results[chunk_id] = retry
            mapped = [state["mapping"].get(index) for index in expected_indices]
            recognized_indices = [index for index in mapped if index is not None]
        if needs_full_coverage:
            assert len(recognized_indices) == len(expected_indices), (
                f"Set {set_number} Q{number}: conditioned ASR covers "
                f"{len(recognized_indices)}/{len(expected_indices)} focus words"
            )
        if not recognized_indices:
            # A single answer word can occasionally be deleted by ASR even
            # though the independently QA'd rendered turn is present. Never
            # guess that word's time: widen to the exact, hash-bound turn and
            # use only timestamped words that align to that turn.
            focus_text = segment["text"]
            focus_basis = "RENDERED_PLAN_TURN_EXACT_ASR_TARGET_DELETION_FALLBACK"
            expected_indices = list(range(segment_start, segment_end))
            mapped = [state["mapping"].get(index) for index in expected_indices]
            recognized_indices = [index for index in mapped if index is not None]
        assert recognized_indices, (
            f"Set {set_number} Q{number}: no timestamped ASR word maps to the "
            "focus phrase or its exact rendered turn"
        )
        first_word = raw["words"][min(recognized_indices)]
        last_word = raw["words"][max(recognized_indices)]
        local_start = max(0.0, first_word["startSeconds"] - CONTEXT_SECONDS)
        chunk_duration = state["layout"]["frames"] / SAMPLE_RATE
        local_end = min(chunk_duration, last_word["endSeconds"] + CONTEXT_SECONDS)
        start_frame = state["layout"]["startFrame"] + round(local_start * SAMPLE_RATE)
        end_frame = state["layout"]["startFrame"] + round(local_end * SAMPLE_RATE)
        duration = (end_frame - start_frame) / SAMPLE_RATE
        assert 0 < duration <= MAX_WINDOW_SECONDS, (
            f"Set {set_number} Q{number}: phrase window is {duration:.3f}s"
        )
        assert 0 <= start_frame < end_frame <= master_frames
        recognized_slice = raw["words"][
            min(recognized_indices) : max(recognized_indices) + 1
        ]
        windows.append(
            {
                "question": number,
                **(
                    {
                        "sourceLedgerQuestion": source_number,
                        "questionCorrection": (
                            "SET_32_Q39_Q40_CANONICAL_ORDER_CORRECTION"
                        ),
                    }
                    if source_number != number
                    else {}
                ),
                "status": "PENDING_INDEPENDENT_REVIEW",
                "evidenceSegment": segment_id,
                "renderedChunk": chunk_id,
                "focusPhrase": focus_text,
                "focusPhraseBasis": focus_basis,
                "recognizedPhrase": " ".join(
                    item["word"] for item in recognized_slice
                ).strip(),
                "timecode": {
                    "startFrame": start_frame,
                    "endFrame": end_frame,
                    "sampleRateHz": SAMPLE_RATE,
                    "startSeconds": round(start_frame / SAMPLE_RATE, 6),
                    "endSeconds": round(end_frame / SAMPLE_RATE, 6),
                    "durationSeconds": round(duration, 6),
                    "basis": (
                        "LOCAL_MLX_WHISPER_WORD_TIMESTAMPS_ALIGNED_TO_"
                        "HASH_BOUND_ELEVENLABS_V4_RENDERED_SCRIPT"
                    ),
                    "contextPaddingSeconds": CONTEXT_SECONDS,
                },
                "alignmentEvidence": {
                    "targetExpectedWordCount": len(expected_indices),
                    "mappedWordCount": len(recognized_indices),
                    "firstRecognizedWordProbability": first_word["probability"],
                    "lastRecognizedWordProbability": last_word["probability"],
                    "chunkWordErrorRate": state["wordErrorRate"],
                    "rawAsrPath": str(state["rawPath"]),
                    "rawAsrSha256": sha256(state["rawPath"]),
                },
                "ledgerRowSha256": stable_json_sha(row),
                "planSegmentTextSha256": manifest_input[segment_id]["textSha256"],
            }
        )

    assert [item["question"] for item in windows] == list(range(1, 41))
    for previous, current in zip(windows, windows[1:]):
        assert (
            previous["timecode"]["startFrame"]
            <= current["timecode"]["startFrame"]
        ), (
            f"Set {set_number}: Q{previous['question']} starts after "
            f"Q{current['question']}"
        )
    artifact = {
        "schemaVersion": 1,
        "artifactType": "IELTS_GUIDED_LISTENING_PHRASE_ALIGNMENT_STAGING",
        "set": set_number,
        "status": "PENDING_INDEPENDENT_REVIEW",
        "releaseAuthorized": False,
        "runtimeIntegration": {"connected": False},
        "audioBinding": {
            "publicUrl": f"/audio/ielts/ielts-listening-set-{set_number}.mp3",
            "publicPath": str(public_mp3),
            "publicMp3Sha256": public_mp3_sha,
            "elevenLabsV4Mp3Path": str(source_mp3),
            "elevenLabsV4Mp3Sha256": source_mp3_sha,
            "masterWavPath": str(master_wav),
            "masterWavSha256": sha256(master_wav),
            "durationFrames": master_frames,
            "sampleRateHz": SAMPLE_RATE,
        },
        "sourceBindings": {
            "manifest": {"path": str(manifest_path), "sha256": sha256(manifest_path)},
            "qa": {"path": str(qa_path), "sha256": sha256(qa_path)},
            "concat": {"path": str(concat_path), "sha256": sha256(concat_path)},
            "productionPlan": {"path": str(plan_path), "sha256": sha256(plan_path)},
            "content": {"path": str(content_path), "sha256": sha256(content_path)},
            "generator": {"path": str(Path(__file__).resolve()), "sha256": sha256(Path(__file__).resolve())},
        },
        "method": {
            "engine": "mlx-whisper",
            "modelSnapshot": MODEL.name,
            "modelWeightsSha256": sha256(MODEL / "weights.npz"),
            "ffmpegSha256": sha256(FFMPEG),
            "alignment": "deterministic minimum-edit-distance backtrace over normalized words",
            "questionNumberProjection": (
                "immutable source-ledger rows retained by hash; Set 32 source "
                "rows 39/40 project to corrected questions 40/39"
            ),
            "contextPaddingSeconds": CONTEXT_SECONDS,
            "maximumWindowSeconds": MAX_WINDOW_SECONDS,
        },
        "windowCount": len(windows),
        "windows": windows,
        "gates": {
            "publicMp3HashMatchesQaBoundV4": "PASS",
            "exactly40Windows": "PASS",
            "allWindowsPositiveAndAtMost60Seconds": "PASS",
            "allQuestionWindowStartsChronological": "PASS",
            "independentReview": "PENDING",
            "humanListening": "PENDING",
            "release": "NOT_APPROVED",
        },
    }
    destination = OUTPUT_ROOT / f"set-{set_number:02d}-phrase-alignment-staging.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(
        json.dumps(artifact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return {
        "set": set_number,
        "artifact": str(destination),
        "sha256": sha256(destination),
        "windows": len(windows),
        "maximumWindowSeconds": max(
            item["timecode"]["durationSeconds"] for item in windows
        ),
        "status": "PENDING_INDEPENDENT_REVIEW",
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sets", default="23-40")
    parser.add_argument("--force-asr", action="store_true")
    args = parser.parse_args()
    selected = parse_sets(args.sets)
    results = []
    for index, set_number in enumerate(selected, start=1):
        print(f"[{index:02d}/{len(selected):02d}] Set {set_number}: staging", flush=True)
        results.append(build_set(set_number, args.force_asr))
        print(
            f"Set {set_number}: 40 windows; max "
            f"{results[-1]['maximumWindowSeconds']:.3f}s",
            flush=True,
        )
    manifest_path = OUTPUT_ROOT / "manifest.json"
    existing_results = {}
    if manifest_path.exists():
        existing_manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        existing_results = {
            int(item["set"]): item for item in existing_manifest.get("sets", [])
        }
    merged_results = dict(existing_results)
    merged_results.update({int(item["set"]): item for item in results})
    assert set(merged_results) == set(range(23, 41)), (
        "Staging manifest must retain all 18 Sets 23-40"
    )
    manifest = {
        "schemaVersion": 1,
        "artifactType": "IELTS_GUIDED_LISTENING_PHRASE_ALIGNMENT_STAGING_MANIFEST",
        "status": "PENDING_INDEPENDENT_REVIEW",
        "releaseAuthorized": False,
        "runtimeIntegration": {"connected": False},
        "sets": [merged_results[number] for number in range(23, 41)],
    }
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"FAIL: {error}", file=sys.stderr)
        raise
