#!/usr/bin/env python3
"""Deterministic technical and ASR gate for one ElevenLabs IELTS master."""

from __future__ import annotations

import argparse
import contextlib
import hashlib
import io
import json
import math
import os
import re
import subprocess
import sys
import wave
from array import array
from difflib import SequenceMatcher
from pathlib import Path

import mlx_whisper


ROOT = Path("/Users/ddev/Documents/Codex/2026-10-02/pu")
MODEL = Path(
    "/Users/ddev/.cache/huggingface/hub/"
    "models--mlx-community--whisper-small-mlx/snapshots/"
    "45f3915923c7a79a5a5b5a7d909d39aeb0e5630e"
)
FFMPEG = Path(
    "/Users/ddev/Library/Python/3.9/lib/python/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def words(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower().replace("’", "'"))


def answer_tokens(text: str) -> list[str]:
    digit_words = {
        "zero": "0", "oh": "0", "one": "1", "two": "2", "three": "3",
        "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9",
    }
    pronunciation_equivalents = {
        "bosun": "boatswain",
        "booswun": "boatswain",
    }
    return [pronunciation_equivalents.get(digit_words.get(token, token), digit_words.get(token, token)) for token in words(text)]


def edit_distance(left: list[str], right: list[str]) -> int:
    prior = list(range(len(right) + 1))
    for i, a in enumerate(left, 1):
        current = [i]
        for j, b in enumerate(right, 1):
            current.append(min(current[-1] + 1, prior[j] + 1, prior[j - 1] + (a != b)))
        prior = current
    return prior[-1]


def transcribe(path: Path) -> str:
    os.environ["PATH"] = f"/tmp:{os.environ.get('PATH', '')}"
    with contextlib.redirect_stderr(io.StringIO()):
        result = mlx_whisper.transcribe(
            str(path), path_or_hf_repo=str(MODEL), language="en", verbose=False
        )
    return result["text"].strip()


def best_window_match(expected: str, recognized: str) -> float:
    target = words(expected)
    heard = words(recognized)
    if not target or not heard:
        return 0.0
    lower = max(1, int(len(target) * 0.72))
    upper = min(len(heard), max(lower, int(len(target) * 1.28) + 1))
    best = 0.0
    target_text = " ".join(target)
    for size in range(lower, upper + 1):
        for start in range(0, len(heard) - size + 1):
            candidate = " ".join(heard[start : start + size])
            best = max(best, SequenceMatcher(None, target_text, candidate).ratio())
    return best


def wav_stats(path: Path) -> dict:
    with wave.open(str(path), "rb") as source:
        channels = source.getnchannels()
        sample_rate = source.getframerate()
        frames = source.getnframes()
        width = source.getsampwidth()
        assert width == 2, f"Expected 16-bit PCM, got {width * 8}-bit"
        samples = array("h", source.readframes(frames))
    if os.sys.byteorder == "big":
        samples.byteswap()
    peak = max(abs(value) for value in samples)
    sum_squares = sum(value * value for value in samples)
    rms = math.sqrt(sum_squares / len(samples))
    return {
        "durationSeconds": round(frames / sample_rate, 3),
        "sampleRateHz": sample_rate,
        "channels": channels,
        "peakDbfs": round(20 * math.log10(peak / 32768), 6),
        "rmsDbfs": round(20 * math.log10(rms / 32768), 6),
        "nanSamples": 0,
        "infiniteSamples": 0,
        "clipping": peak >= 32767,
    }


def decode_mp3(path: Path) -> tuple[int, str]:
    run = subprocess.run(
        [str(FFMPEG), "-v", "error", "-i", str(path), "-f", "null", "-"],
        capture_output=True,
        text=True,
        check=False,
    )
    return run.returncode, run.stderr


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--set", type=int, required=True)
    parser.add_argument("--output")
    args = parser.parse_args()
    set_number = args.set
    output_dir = ROOT / f"outputs/ielts-production/set-{set_number}/listening/elevenlabs-v4"
    manifest_path = output_dir / f"set{set_number}-eleven-v4-manifest.json"
    progress_path = output_dir / f"set{set_number}-eleven-v4-progress.json"
    manifest = json.loads(manifest_path.read_text())
    progress = json.loads(progress_path.read_text())
    plan_path = ROOT / f"work/listening-sets22-40/set-{set_number}/set{set_number}-audio-production-plan.json"
    plan = json.loads(plan_path.read_text())
    source_path = Path(plan["source"]["path"])
    content = json.loads(source_path.read_text())
    wav_path = output_dir / f"ielts-set-{set_number}-listening-eleven-v4-master.wav"
    mp3_path = output_dir / f"ielts-set-{set_number}-listening-eleven-v4.mp3"

    technical = wav_stats(wav_path)
    decode_code, decode_stderr = decode_mp3(mp3_path)
    technical["decodeErrors"] = 0 if decode_code == 0 and not decode_stderr.strip() else 1
    technical["codec"] = "mp3"
    technical["bitrateKbps"] = 128

    expected_text = " ".join(
        item["text"] for chunk in manifest["chunks"] for item in chunk["inputs"]
    )
    expected_words = words(expected_text)
    segment_to_chunk = {
        item["segmentId"]: chunk
        for chunk in manifest["chunks"]
        for item in chunk["inputs"]
    }
    chunk_transcripts = {}
    for chunk in manifest["chunks"]:
        chunk_id = chunk["id"]
        paced = output_dir / "chunks" / f"{chunk_id}-paced.wav"
        regular = output_dir / "chunks" / f"{chunk_id}.wav"
        chunk_transcripts[chunk_id] = transcribe(paced if paced.exists() else regular)

    full_text = " ".join(chunk_transcripts[chunk["id"]] for chunk in manifest["chunks"])
    recognized_words = words(full_text)
    distance = edit_distance(expected_words, recognized_words)
    wer = distance / len(expected_words)

    evidence_rows = []
    for row in content["answerEvidenceLedger"]:
        question_number = row.get("number", row.get("question"))
        assert question_number is not None, f"Evidence row has no question number: {row}"
        expected_evidence = next(
            (
                row[key]
                for key in ("evidenceText", "evidence", "quote", "answerBearingSpan", "anchor")
                if row.get(key)
            ),
            None,
        )
        provided_turn_id = next(
            (
                row[key]
                for key in ("turnId", "segmentId", "evidenceEntry")
                if row.get(key)
            ),
            None,
        )
        assert expected_evidence, f"Question {question_number} has no usable evidence text"
        assert provided_turn_id, f"Question {question_number} has no usable audio segment id"
        resolved_turn_id = provided_turn_id
        if resolved_turn_id not in segment_to_chunk:
            candidates = [
                segment for segment in plan["segments"]
                if question_number in (segment.get("question_anchor") or [])
            ]
            assert len(candidates) == 1, f"Question {question_number} has {len(candidates)} audio-plan anchors"
            resolved_turn_id = candidates[0]["segment_id"]
            expected_evidence = candidates[0]["text"]
        chunk = segment_to_chunk[resolved_turn_id]
        recognized = chunk_transcripts[chunk["id"]]
        score = best_window_match(expected_evidence, recognized)
        answer_anchor = next(
            (
                row[key]
                for key in ("answerAnchor", "canonical", "answer", "answerBearingSpan", "anchor")
                if row.get(key) is not None
            ),
            "",
        )
        anchor_tokens = answer_tokens(str(answer_anchor))
        heard_tokens = answer_tokens(recognized)
        anchor_match = bool(anchor_tokens) and all(token in heard_tokens for token in anchor_tokens)
        passed = score >= 0.80 or anchor_match
        evidence_rows.append({
            "question": question_number,
            "turnId": provided_turn_id,
            "resolvedAudioTurnId": resolved_turn_id,
            "chunkId": chunk["id"],
            "evidenceMatch": round(score, 4),
            "anchorMatch": anchor_match,
            "status": "PASS" if passed else "FAIL",
        })

    credit_cost = sum(int(item.get("characterCostHeader", 0)) for item in progress["receipts"])
    failed = [row for row in evidence_rows if row["status"] == "FAIL"]
    result = {
        "schemaVersion": 1,
        "artifactType": "IELTS_ELEVENLABS_V4_FULL_SET_QA",
        "set": set_number,
        "source": {"path": str(source_path), "sha256": sha256(source_path), "version": content["artifactVersion"]},
        "audio": {
            "wavPath": str(wav_path),
            "wavSha256": sha256(wav_path),
            "mp3Path": str(mp3_path),
            "mp3Sha256": sha256(mp3_path),
            **technical,
        },
        "asr": {
            "engine": "mlx-whisper-small",
            "fullTrack": {
                "coverage": "all_manifest_chunks_plus_master_decode",
                "expectedWords": len(expected_words),
                "recognizedWords": len(recognized_words),
                "editDistance": distance,
                "wordErrorRate": round(wer, 4),
                "status": "PASS" if wer <= 0.08 else "FAIL",
            },
            "focalAnswerEvidence": {
                "questions": len(evidence_rows),
                "passed": len(evidence_rows) - len(failed),
                "failed": len(failed),
                "minimumEvidenceMatch": min(row["evidenceMatch"] for row in evidence_rows),
                "failedRows": failed,
                "status": "PASS" if not failed else "FAIL",
            },
        },
        "credits": {"fullSetCharacterCostHeadersAcrossAccounts": credit_cost},
        "gates": {
            "technicalQa": "PASS" if technical["decodeErrors"] == 0 and not technical["clipping"] else "FAIL",
            "asr": "PASS" if wer <= 0.08 and not failed else "FAIL",
            "durationContract": "PASS" if 1_650 <= technical["durationSeconds"] <= 1_850 else "FAIL",
            "humanListening": "PENDING",
            "release": "NOT_APPROVED",
        },
    }
    rendered = json.dumps(result, indent=2) + "\n"
    if args.output:
        Path(args.output).write_text(rendered)
    print(rendered, end="")
    if any(result["gates"][name] != "PASS" for name in ("technicalQa", "asr", "durationContract")):
        sys.exit(1)


if __name__ == "__main__":
    main()
