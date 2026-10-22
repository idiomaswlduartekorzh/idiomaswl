#!/usr/bin/env python3
"""Generate IELTS guided Speaking references for Sets 1–20 with Chatterbox.

Generation and approval are separate gates. Rendering records a complete pair
as generated but never UI-ready. A later, independently supplied human acoustic
review receipt must bind both WAV and content hashes before either player is exposed.
"""

from __future__ import annotations

import argparse
import ast
import hashlib
import json
import os
import random
import re
import shutil
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = PROJECT_ROOT / "config/ielts-guided-speaking-audio.json"
STATUS_PATH = PROJECT_ROOT / "src/data/ielts/guided-speaking-audio.generated.ts"
STATUS_PREFIX = """/** Updated atomically by scripts/generate-ielts-guided-speaking-audio.py. */
export const IELTS_GUIDED_SPEAKING_AUDIO_STATUS = """
STATUS_SUFFIX = " as const;\n"
EXPECTED_SETS = set(range(1, 21))
EXPECTED_BANDS = {"5.5", "9.0"}


def parse_args() -> argparse.Namespace:
    voice_prompt_from_env = os.environ.get("CHATTERBOX_VOICE_PROMPT")
    parser = argparse.ArgumentParser(
        description="Generate and validate IELTS guided Speaking WAV files with Chatterbox."
    )
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument(
        "--voice-prompt",
        type=Path,
        default=Path(voice_prompt_from_env) if voice_prompt_from_env else None,
        help="Clean English reference recording. Can also be set with CHATTERBOX_VOICE_PROMPT.",
    )
    parser.add_argument("--device", choices=("auto", "cuda", "mps", "cpu"), default="auto")
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument(
        "--sets",
        default="1-20",
        help="Set numbers to generate/check, for example 1,3,7-10. Defaults to 1-20.",
    )
    parser.add_argument(
        "--confirm-voice-rights",
        action="store_true",
        default=os.environ.get("CHATTERBOX_VOICE_RIGHTS_CONFIRMED") == "1",
        help="Confirm that WeLearn has permission to clone/use the reference voice.",
    )
    action = parser.add_mutually_exclusive_group()
    action.add_argument(
        "--check",
        action="store_true",
        help="Validate the production plan/status without loading Chatterbox or generating audio.",
    )
    action.add_argument(
        "--apply-human-review",
        type=Path,
        help="Validate and apply an external human acoustic-review receipt for one generated pair.",
    )
    return parser.parse_args()


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_status() -> dict[str, Any]:
    source = STATUS_PATH.read_text(encoding="utf-8")
    if not source.startswith(STATUS_PREFIX) or not source.endswith(STATUS_SUFFIX):
        raise ValueError(f"Generated status has an unexpected format: {STATUS_PATH}")
    return json.loads(source[len(STATUS_PREFIX) : -len(STATUS_SUFFIX)])


def parse_set_selection(value: str) -> list[int]:
    selected: set[int] = set()
    for token in value.split(","):
        token = token.strip()
        if not token:
            continue
        if "-" in token:
            start_text, end_text = token.split("-", 1)
            start, end = int(start_text), int(end_text)
            if end < start:
                raise ValueError(f"Invalid descending set range: {token}")
            selected.update(range(start, end + 1))
        else:
            selected.add(int(token))
    if not selected or not selected.issubset(EXPECTED_SETS):
        raise ValueError("--sets must select one or more IELTS sets from 1 to 20.")
    return sorted(selected)


def validate_manifest(manifest: dict[str, Any]) -> None:
    if manifest.get("engine") != "ResembleAI/chatterbox":
        raise ValueError("The manifest must target ResembleAI/chatterbox.")
    if manifest.get("model") != "ChatterboxTTS" or manifest.get("language") != "en":
        raise ValueError("This batch must use the English ChatterboxTTS model.")
    if manifest.get("schemaVersion") != 3 or manifest.get("setCount") != 20:
        raise ValueError("The manifest must use schemaVersion 3 and declare 20 sets.")
    approval_policy = manifest.get("audioApprovalPolicy", {})
    required_acoustic_checks = {
        "identityStable",
        "noArtifacts",
        "intelligible",
        "naturalPauses",
        "transcriptMatch",
        "durationAppropriate",
    }
    if (
        approval_policy.get("generationDoesNotApprove") is not True
        or approval_policy.get("pairApprovalRequired") is not True
        or approval_policy.get("independentHumanReviewerRequired") is not True
        or approval_policy.get("receiptKind") != "ielts-guided-speaking-acoustic-review"
        or approval_policy.get("receiptSchemaVersion") != 1
        or set(approval_policy.get("requiredBindingsPerBand", [])) != {"sha256", "contentSha256"}
        or set(approval_policy.get("requiredChecks", [])) != required_acoustic_checks
    ):
        raise ValueError("The manifest must preserve the independent pair-level acoustic approval gate.")
    feedback_fields = {"verdict", "fluency", "lexical", "grammar", "pronunciation"}
    for band, field in (("5.5", "band55FeedbackBySet"), ("9.0", "band9FeedbackBySet")):
        feedback = manifest.get(field)
        if not isinstance(feedback, dict) or set(feedback) != {str(number) for number in EXPECTED_SETS}:
            raise ValueError(f"Tailored band {band} feedback must cover IELTS Sets 1–20.")
        for set_number, notes in feedback.items():
            if not isinstance(notes, dict) or set(notes) != feedback_fields:
                raise ValueError(f"Set {set_number} band {band} feedback must contain all four criteria and a verdict.")
            if any(not str(value).strip() for value in notes.values()):
                raise ValueError(f"Set {set_number} band {band} feedback contains an empty note.")

    corrections = manifest.get("editorialCorrections")
    if not isinstance(corrections, list):
        raise ValueError("editorialCorrections must be an array, even when empty.")
    correction_by_set: dict[int, dict[str, Any]] = {}
    for correction in corrections:
        set_number = correction.get("setNumber")
        if set_number in correction_by_set:
            raise ValueError(f"Duplicate editorial correction for Set {set_number}.")
        if set_number not in EXPECTED_SETS or correction.get("sourceQuestionId") != "sp2":
            raise ValueError(f"Invalid editorial correction binding for Set {set_number}.")
        required = ("sourceCueCard", "displayCueCard", "editorialCorrectionReason")
        if any(not str(correction.get(field, "")).strip() for field in required):
            raise ValueError(f"Incomplete editorial correction for Set {set_number}.")
        if correction["sourceCueCard"] == correction["displayCueCard"]:
            raise ValueError(f"Set {set_number} correction does not change the displayed cue card.")
        correction_by_set[set_number] = correction
    items = manifest.get("items")
    if not isinstance(items, list) or len(items) != 40:
        raise ValueError("The manifest must contain 40 examples: two bands for each of 20 sets.")
    ids: set[str] = set()
    pairs: dict[int, set[str]] = {}
    for item in items:
        set_number = item.get("setNumber")
        band = item.get("band")
        if not isinstance(set_number, int) or set_number not in EXPECTED_SETS:
            raise ValueError(f"Invalid set number: {set_number}")
        if band not in EXPECTED_BANDS:
            raise ValueError(f"Invalid target band in Set {set_number}: {band}")
        pairs.setdefault(set_number, set()).add(band)
        item_id = str(item.get("id", ""))
        if not item_id or item_id in ids:
            raise ValueError(f"Missing or duplicate item id: {item_id}")
        ids.add(item_id)
        expected_source = f"src/data/mocks/ielts-set-{set_number}.ts"
        if item.get("sourceMockFile") != expected_source or item.get("sourceQuestionId") != "sp2":
            raise ValueError(f"{item_id} is not bound to the canonical Set {set_number} sp2 source.")
        source_cue_card = read_source_cue_card(PROJECT_ROOT / expected_source, "sp2")
        if item.get("cueCard") != source_cue_card:
            raise ValueError(f"{item_id} cue card differs from its canonical source question.")
        correction = correction_by_set.get(set_number)
        if correction and correction["sourceCueCard"] != source_cue_card:
            raise ValueError(f"Set {set_number} editorial correction is not bound to the canonical source cue card.")
        output = str(item.get("output", ""))
        resolved_output = (PROJECT_ROOT / output).resolve()
        approved_directory = (PROJECT_ROOT / "public/audio/ielts").resolve()
        if approved_directory not in resolved_output.parents or not output.endswith(".wav"):
            raise ValueError(f"Unsafe or unsupported output path: {output}")
        expected_url = "/" + output.removeprefix("public/")
        if item.get("publicUrl") != expected_url:
            raise ValueError(f"Public URL does not match output for {item_id}")
        if not str(item.get("cueCard", "")).strip():
            raise ValueError(f"Missing Part 2 cue card for {item_id}")
        if item.get("minimumDurationSeconds") != 55 or item.get("maximumDurationSeconds") != 120:
            raise ValueError(f"{item_id} must use the approved 55–120 second Part 2 duration window.")
        text = str(item.get("text", "")).strip()
        minimum_words = 95 if band == "5.5" else 160
        if len(text.split()) < minimum_words:
            raise ValueError(f"{item_id} is too short for its pedagogical target ({minimum_words} words).")
    if set(pairs) != EXPECTED_SETS or any(bands != EXPECTED_BANDS for bands in pairs.values()):
        raise ValueError("Every IELTS set must contain exactly the 5.5 and 9.0 pair.")


def read_source_cue_card(path: Path, question_id: str) -> str:
    """Read a literal cueCard from the canonical TS mock without executing it."""
    resolved = path.resolve()
    mocks_directory = (PROJECT_ROOT / "src/data/mocks").resolve()
    if mocks_directory not in resolved.parents or not resolved.is_file():
        raise ValueError(f"Unsafe or missing source mock: {path}")
    source = resolved.read_text(encoding="utf-8")
    question_pattern = re.compile(
        rf"id:\s*(['\"]){re.escape(question_id)}\1(?P<body>.{{0,1200}}?)cueCard:\s*(?P<literal>'(?:\\.|[^'])*'|\"(?:\\.|[^\"])*\"|`(?:\\.|[^`])*`)",
        re.DOTALL,
    )
    match = question_pattern.search(source)
    if not match:
        raise ValueError(f"Could not locate {question_id} cueCard in {path}")
    literal = match.group("literal")
    try:
        if literal.startswith("`"):
            inner = literal[1:-1]
            if "${" in inner:
                raise ValueError("template interpolation is not supported")
            cue_card = (
                inner.replace(r"\`", "`")
                .replace(r"\n", "\n")
                .replace(r"\'", "'")
                .replace(r'\"', '"')
                .replace(r"\\", "\\")
            )
        else:
            cue_card = ast.literal_eval(literal)
    except (SyntaxError, ValueError) as error:
        raise ValueError(f"Unsupported cueCard literal in {path}") from error
    if not isinstance(cue_card, str) or not cue_card.strip():
        raise ValueError(f"Empty cueCard for {question_id} in {path}")
    return cue_card


def split_text(text: str, maximum: int) -> list[str]:
    paragraphs = [part.strip() for part in text.split("\n\n") if part.strip()]
    chunks: list[str] = []
    for paragraph in paragraphs:
        sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", paragraph) if part.strip()]
        current = ""
        for sentence in sentences:
            if len(sentence) > maximum:
                raise ValueError(f"Sentence exceeds {maximum} characters: {sentence[:80]}…")
            candidate = f"{current} {sentence}".strip()
            if current and len(candidate) > maximum:
                chunks.append(current)
                current = sentence
            else:
                current = candidate
        if current:
            chunks.append(current)
    return chunks


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def resolve_device(requested: str, torch: Any) -> str:
    if requested != "auto":
        return requested
    if torch.cuda.is_available():
        return "cuda"
    if torch.backends.mps.is_available():
        return "mps"
    return "cpu"


def status_template(manifest: dict[str, Any]) -> dict[str, Any]:
    sets: dict[str, Any] = {}
    for set_number in sorted(EXPECTED_SETS):
        files = {}
        for item in manifest["items"]:
            if item["setNumber"] == set_number:
                files[item["band"]] = {
                    "generated": False,
                    "approved": False,
                    "ready": False,
                    "url": item["publicUrl"],
                    "durationSeconds": None,
                    "sampleRate": None,
                    "sha256": None,
                    "contentSha256": None,
                }
        sets[str(set_number)] = {
            "generated": False,
            "approved": False,
            "ready": False,
            "generatedAt": None,
            "approvedAt": None,
            "humanReview": None,
            "files": files,
        }
    return {
        "schemaVersion": 4,
        "generated": False,
        "approved": False,
        "ready": False,
        "generatedAt": None,
        "approvedAt": None,
        "engine": manifest["engine"],
        "sets": sets,
    }


def item_content_sha256(item: dict[str, Any], manifest: dict[str, Any]) -> str:
    correction = next(
        (
            entry
            for entry in manifest.get("editorialCorrections", [])
            if entry["setNumber"] == item["setNumber"]
        ),
        None,
    )
    payload = json.dumps(
        {
            "setNumber": item["setNumber"],
            "band": item["band"],
            "sourceMockFile": item["sourceMockFile"],
            "sourceQuestionId": item["sourceQuestionId"],
            "sourceCueCard": item["cueCard"],
            "displayCueCard": correction["displayCueCard"] if correction else item["cueCard"],
            "editorialCorrectionReason": correction["editorialCorrectionReason"] if correction else None,
            "text": item["text"],
        },
        sort_keys=True,
        ensure_ascii=False,
    ).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def write_status(status: dict[str, Any]) -> None:
    source = STATUS_PREFIX + json.dumps(status, indent=2, ensure_ascii=False) + STATUS_SUFFIX
    temporary = STATUS_PATH.with_suffix(".tmp")
    temporary.write_text(source, encoding="utf-8")
    os.replace(temporary, STATUS_PATH)


def update_status_rollups(status: dict[str, Any]) -> None:
    for set_number in EXPECTED_SETS:
        set_status = status["sets"][str(set_number)]
        files = set_status["files"]
        set_status["generated"] = all(bool(files[band].get("generated")) for band in EXPECTED_BANDS)
        set_status["approved"] = bool(set_status.get("humanReview")) and all(
            bool(files[band].get("approved")) for band in EXPECTED_BANDS
        )
        set_status["ready"] = set_status["generated"] and set_status["approved"] and all(
            bool(files[band].get("ready")) for band in EXPECTED_BANDS
        )
    status["generated"] = all(status["sets"][str(number)]["generated"] for number in EXPECTED_SETS)
    status["approved"] = all(status["sets"][str(number)]["approved"] for number in EXPECTED_SETS)
    status["ready"] = status["generated"] and status["approved"] and all(
        status["sets"][str(number)]["ready"] for number in EXPECTED_SETS
    )


def invalidate_selected_sets_for_generation(
    status: dict[str, Any],
    manifest: dict[str, Any],
    selected_sets: list[int],
) -> None:
    """Persist a closed gate before Chatterbox or any public-file replacement."""
    item_by_pair = {(item["setNumber"], item["band"]): item for item in manifest["items"]}
    for set_number in selected_sets:
        set_status = status["sets"][str(set_number)]
        set_status["generated"] = False
        set_status["approved"] = False
        set_status["ready"] = False
        set_status["generatedAt"] = None
        set_status["approvedAt"] = None
        set_status["humanReview"] = None
        for band in EXPECTED_BANDS:
            item = item_by_pair[(set_number, band)]
            set_status["files"][band] = {
                "generated": False,
                "approved": False,
                "ready": False,
                "url": item["publicUrl"],
                "durationSeconds": None,
                "sampleRate": None,
                "sha256": None,
                "contentSha256": None,
            }
    update_status_rollups(status)
    status["generatedAt"] = None
    status["approvedAt"] = None
    # This write is intentionally inside the gate function. If it fails, main
    # stops before model loading, synthesis, or touching a public WAV.
    write_status(status)


def assert_generation_gate_revoked(status: dict[str, Any], selected_sets: list[int]) -> None:
    """Refuse public promotion unless the persisted status hides every selected pair."""
    for set_number in selected_sets:
        set_status = status["sets"][str(set_number)]
        if set_status.get("generated") or set_status.get("approved") or set_status.get("ready"):
            raise RuntimeError(f"Set {set_number} generation gate was not revoked before promotion.")
        if set_status.get("humanReview") is not None:
            raise RuntimeError(f"Set {set_number} still has a human receipt before promotion.")
        for band in EXPECTED_BANDS:
            details = set_status["files"][band]
            if details.get("generated") or details.get("approved") or details.get("ready"):
                raise RuntimeError(f"Set {set_number} band {band} is still exposable before promotion.")


def promote_staged_audio(staged: list[tuple[dict[str, Any], Path, float]], selected_sets: list[int]) -> None:
    """Copy to same-filesystem temporary paths, then replace only behind a persisted closed gate."""
    persisted_status = load_status()
    assert_generation_gate_revoked(persisted_status, selected_sets)
    pending: list[tuple[Path, Path]] = []
    try:
        for item, temp_output, _duration in staged:
            destination = PROJECT_ROOT / item["output"]
            destination.parent.mkdir(parents=True, exist_ok=True)
            with tempfile.NamedTemporaryFile(
                prefix=f".{destination.name}.",
                suffix=".pending",
                dir=destination.parent,
                delete=False,
            ) as handle:
                pending_path = Path(handle.name)
            shutil.copy2(temp_output, pending_path)
            pending.append((pending_path, destination))
        for pending_path, destination in pending:
            os.replace(pending_path, destination)
    finally:
        for pending_path, _destination in pending:
            if pending_path.exists():
                pending_path.unlink()


def validate_review_receipt(receipt: dict[str, Any], status: dict[str, Any]) -> tuple[int, str, str]:
    if receipt.get("schemaVersion") != 1 or receipt.get("kind") != "ielts-guided-speaking-acoustic-review":
        raise ValueError("Human review receipt must use the supported schema and kind.")
    set_number = receipt.get("setNumber")
    if not isinstance(set_number, int) or set_number not in EXPECTED_SETS:
        raise ValueError("Human review receipt has an invalid setNumber.")
    if receipt.get("decision") != "APPROVED":
        raise ValueError("Only an explicit APPROVED human decision can unlock audio.")
    reviewer = str(receipt.get("reviewer", "")).strip()
    notes = str(receipt.get("notes", "")).strip()
    reviewed_at = str(receipt.get("reviewedAt", "")).strip()
    if len(reviewer) < 3 or len(notes) < 10 or not reviewed_at:
        raise ValueError("Receipt requires reviewer, reviewedAt and substantive notes.")
    try:
        timestamp = datetime.fromisoformat(reviewed_at.replace("Z", "+00:00"))
    except ValueError as error:
        raise ValueError("Receipt reviewedAt must be an ISO-8601 timestamp.") from error
    if timestamp.tzinfo is None:
        raise ValueError("Receipt reviewedAt must include a timezone.")
    required_checks = {
        "identityStable",
        "noArtifacts",
        "intelligible",
        "naturalPauses",
        "transcriptMatch",
        "durationAppropriate",
    }
    checks = receipt.get("checks")
    if (
        not isinstance(checks, dict)
        or set(checks) != required_checks
        or not all(value is True for value in checks.values())
    ):
        raise ValueError("Every required human acoustic check must be explicitly true.")

    set_status = status["sets"][str(set_number)]
    if set_status.get("approved") or set_status.get("humanReview"):
        raise ValueError(f"Set {set_number} already has a human approval; regenerate to invalidate it first.")
    receipt_files = receipt.get("files")
    if not isinstance(receipt_files, dict) or set(receipt_files) != EXPECTED_BANDS:
        raise ValueError("Receipt must bind both 5.5 and 9.0 files.")
    for band in EXPECTED_BANDS:
        details = set_status["files"][band]
        binding = receipt_files[band]
        if not details.get("generated"):
            raise ValueError(f"Set {set_number} band {band} has not been generated.")
        if not isinstance(binding, dict) or set(binding) != {"sha256", "contentSha256"}:
            raise ValueError(f"Set {set_number} band {band} receipt binding is incomplete.")
        if binding["sha256"] != details.get("sha256") or binding["contentSha256"] != details.get("contentSha256"):
            raise ValueError(f"Set {set_number} band {band} receipt hashes do not match current artifacts.")
    return set_number, reviewer, reviewed_at


def apply_human_review(receipt_path: Path, status: dict[str, Any]) -> None:
    resolved = receipt_path.expanduser().resolve()
    if not resolved.is_file():
        raise FileNotFoundError(f"Human review receipt not found: {resolved}")
    receipt = load_json(resolved)
    set_number, reviewer, reviewed_at = validate_review_receipt(receipt, status)
    set_status = status["sets"][str(set_number)]
    for band in EXPECTED_BANDS:
        set_status["files"][band]["approved"] = True
        set_status["files"][band]["ready"] = True
    set_status["approvedAt"] = reviewed_at
    set_status["humanReview"] = {
        "decision": "APPROVED",
        "reviewer": reviewer,
        "reviewedAt": reviewed_at,
        "receiptSha256": sha256(resolved),
        "files": receipt["files"],
    }
    update_status_rollups(status)
    if status["approved"]:
        status["approvedAt"] = reviewed_at
    write_status(status)
    print(f"Set {set_number} human acoustic review applied; the complete pair is now ready.")


def validate_status(manifest: dict[str, Any], selected_sets: list[int]) -> None:
    status = load_status()
    if status.get("schemaVersion") != 4 or set(status.get("sets", {})) != {str(n) for n in EXPECTED_SETS}:
        raise ValueError("Generated status does not cover IELTS Sets 1–20.")
    item_by_pair = {(item["setNumber"], item["band"]): item for item in manifest["items"]}
    pending = 0
    for set_number in selected_sets:
        set_status = status["sets"][str(set_number)]
        file_states = set_status.get("files", {})
        if set(file_states) != EXPECTED_BANDS:
            raise ValueError(f"Set {set_number} status does not contain both target bands.")
        expected_generated = all(bool(file_states[band].get("generated")) for band in EXPECTED_BANDS)
        expected_approved = bool(set_status.get("humanReview")) and all(
            bool(file_states[band].get("approved")) for band in EXPECTED_BANDS
        )
        expected_ready = expected_generated and expected_approved and all(
            bool(file_states[band].get("ready")) for band in EXPECTED_BANDS
        )
        if set_status.get("generated") != expected_generated:
            raise ValueError(f"Set {set_number} generated rollup disagrees with its file states.")
        if set_status.get("approved") != expected_approved:
            raise ValueError(f"Set {set_number} approval rollup disagrees with its receipt/files.")
        if set_status.get("ready") != expected_ready:
            raise ValueError(f"Set {set_number} readiness disagrees with generation and human approval.")
        human_review = set_status.get("humanReview")
        if human_review:
            if human_review.get("decision") != "APPROVED" or set(human_review.get("files", {})) != EXPECTED_BANDS:
                raise ValueError(f"Set {set_number} human review receipt binding is incomplete.")
            for band in EXPECTED_BANDS:
                receipt_binding = human_review["files"][band]
                if receipt_binding.get("sha256") != file_states[band].get("sha256"):
                    raise ValueError(f"Set {set_number} band {band} approved WAV hash drifted from its receipt.")
                if receipt_binding.get("contentSha256") != file_states[band].get("contentSha256"):
                    raise ValueError(f"Set {set_number} band {band} approved content hash drifted from its receipt.")
        for band, details in file_states.items():
            item = item_by_pair[(set_number, band)]
            path = PROJECT_ROOT / item["output"]
            if details.get("url") != item["publicUrl"]:
                raise ValueError(f"Set {set_number} band {band} URL is out of sync with the manifest.")
            generated = bool(details.get("generated"))
            approved = bool(details.get("approved"))
            ready = bool(details.get("ready"))
            if approved and not generated:
                raise ValueError(f"Set {set_number} band {band} is approved without a generated WAV.")
            if ready != (generated and approved and set_status.get("ready")):
                raise ValueError(f"Set {set_number} band {band} ready state bypasses the pair gate.")
            if generated:
                if not path.is_file() or path.stat().st_size < 44:
                    raise ValueError(f"Status marks Set {set_number} band {band} generated but WAV is missing: {path}")
                if details.get("sha256") != sha256(path):
                    raise ValueError(f"Set {set_number} band {band} WAV hash has changed.")
                if details.get("contentSha256") != item_content_sha256(item, manifest):
                    raise ValueError(f"Set {set_number} band {band} transcript/prompt changed after generation.")
            else:
                pending += 1
                if path.exists():
                    raise ValueError(f"Pending Set {set_number} band {band} has an orphaned WAV: {path}")
    generated_sets = sum(bool(status["sets"][str(n)].get("generated")) for n in selected_sets)
    ready_sets = sum(bool(status["sets"][str(n)].get("ready")) for n in selected_sets)
    expected_batch_generated = all(status["sets"][str(number)].get("generated") for number in EXPECTED_SETS)
    expected_batch_approved = all(status["sets"][str(number)].get("approved") for number in EXPECTED_SETS)
    expected_batch_ready = expected_batch_generated and expected_batch_approved and all(
        status["sets"][str(number)].get("ready") for number in EXPECTED_SETS
    )
    if status.get("generated") != expected_batch_generated:
        raise ValueError("Batch generated rollup disagrees with its set states.")
    if status.get("approved") != expected_batch_approved:
        raise ValueError("Batch approval rollup disagrees with its set states.")
    if status.get("ready") != expected_batch_ready:
        raise ValueError("Batch readiness bypasses generation or human approval.")
    print(
        f"Plan/status valid: {generated_sets}/{len(selected_sets)} generated; "
        f"{ready_sets}/{len(selected_sets)} human-approved and ready; {pending} WAV files pending."
    )


def main() -> int:
    args = parse_args()
    selected_sets = parse_set_selection(args.sets)
    manifest_path = args.manifest.resolve()
    manifest = load_json(manifest_path)
    validate_manifest(manifest)

    if args.apply_human_review:
        status = load_status()
        validate_status(manifest, sorted(EXPECTED_SETS))
        apply_human_review(args.apply_human_review, status)
        return 0

    selected_items = [item for item in manifest["items"] if item["setNumber"] in selected_sets]

    defaults = manifest["generationDefaults"]
    for item in selected_items:
        chunks = split_text(item["text"], int(defaults["chunkMaxCharacters"]))
        print(
            f"Set {item['setNumber']:02d} · band {item['band']}: "
            f"{len(chunks)} chunks, {len(item['text'].split())} words"
        )

    if args.check:
        validate_status(manifest, selected_sets)
        return 0

    if not args.voice_prompt:
        raise ValueError("Provide --voice-prompt or CHATTERBOX_VOICE_PROMPT.")
    voice_prompt = args.voice_prompt.expanduser().resolve()
    if not voice_prompt.is_file():
        raise FileNotFoundError(f"Reference voice not found: {voice_prompt}")
    if not args.confirm_voice_rights:
        raise PermissionError("Pass --confirm-voice-rights after confirming permission to use the voice.")

    destinations = [PROJECT_ROOT / item["output"] for item in selected_items]
    existing = [path for path in destinations if path.exists()]
    if existing and not args.overwrite:
        raise FileExistsError(
            "Refusing to overwrite existing audio. Review it first or rerun with --overwrite: "
            + ", ".join(str(path) for path in existing)
        )

    # Revoke any previous generation/approval on disk before loading the model,
    # synthesising, or replacing a public file. This is the fail-closed boundary.
    status = load_status()
    invalidate_selected_sets_for_generation(status, manifest, selected_sets)

    try:
        import torch
        import torchaudio as ta
        from chatterbox.tts import ChatterboxTTS
    except ImportError as error:
        raise RuntimeError(
            "Chatterbox is not installed. Create a Python 3.11 environment and run "
            "`pip install chatterbox-tts`."
        ) from error

    device = resolve_device(args.device, torch)
    print(f"Loading ChatterboxTTS on {device}…")
    model = ChatterboxTTS.from_pretrained(device=device)
    pause_frames = round(model.sr * int(defaults["pauseMilliseconds"]) / 1000)
    silence = torch.zeros((1, pause_frames), dtype=torch.float32)
    staged: list[tuple[dict[str, Any], Path, float]] = []

    with tempfile.TemporaryDirectory(prefix="ielts-guided-speaking-") as temporary:
        temp_dir = Path(temporary)
        for item in selected_items:
            random.seed(int(defaults["seed"]))
            torch.manual_seed(int(defaults["seed"]))
            if torch.cuda.is_available():
                torch.cuda.manual_seed_all(int(defaults["seed"]))

            chunks = split_text(item["text"], int(defaults["chunkMaxCharacters"]))
            rendered = []
            for index, chunk in enumerate(chunks):
                print(
                    f"  Set {item['setNumber']:02d} · band {item['band']} · "
                    f"chunk {index + 1}/{len(chunks)}"
                )
                wav = model.generate(
                    chunk,
                    audio_prompt_path=str(voice_prompt),
                    exaggeration=float(defaults["exaggeration"]),
                    cfg_weight=float(defaults["cfgWeight"]),
                    temperature=float(defaults["temperature"]),
                    min_p=float(defaults["minP"]),
                    top_p=float(defaults["topP"]),
                    repetition_penalty=float(defaults["repetitionPenalty"]),
                ).detach().cpu()
                if wav.ndim == 1:
                    wav = wav.unsqueeze(0)
                rendered.append(wav)

            joined_parts = []
            for index, wav in enumerate(rendered):
                if index:
                    joined_parts.append(silence)
                joined_parts.append(wav)
            final_wav = torch.cat(joined_parts, dim=1)
            if not torch.isfinite(final_wav).all() or float(final_wav.abs().max()) < 0.001:
                raise ValueError(
                    f"Set {item['setNumber']} band {item['band']} produced silent or invalid samples."
                )
            duration = final_wav.shape[1] / model.sr
            if not float(item["minimumDurationSeconds"]) <= duration <= float(item["maximumDurationSeconds"]):
                raise ValueError(
                    f"Set {item['setNumber']} band {item['band']} duration {duration:.1f}s "
                    "is outside the approved range "
                    f"{item['minimumDurationSeconds']}–{item['maximumDurationSeconds']}s."
                )

            # The public filenames repeat across sets. Stage by globally unique
            # manifest id so later renders cannot overwrite earlier set pairs.
            temp_output = temp_dir / f"{item['id']}.wav"
            ta.save(str(temp_output), final_wav, model.sr)
            staged.append((item, temp_output, duration))

        promote_staged_audio(staged, selected_sets)
        status = load_status()
        assert_generation_gate_revoked(status, selected_sets)
        generated_at = datetime.now(timezone.utc).isoformat()
        for item, temp_output, duration in staged:
            destination = PROJECT_ROOT / item["output"]
            set_status = status["sets"][str(item["setNumber"])]
            set_status["files"][item["band"]] = {
                "generated": True,
                "approved": False,
                "ready": False,
                "url": item["publicUrl"],
                "durationSeconds": round(duration, 2),
                "sampleRate": model.sr,
                "sha256": sha256(destination),
                "contentSha256": item_content_sha256(item, manifest),
            }
            set_status["generatedAt"] = generated_at
        update_status_rollups(status)
        status["generatedAt"] = generated_at if status["generated"] else None
        status["approvedAt"] = None
        write_status(status)

    print(
        f"{len(selected_sets)} set(s) passed duration checks; "
        "each selected 5.5/9.0 pair is generated but remains hidden pending human acoustic review."
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (FileNotFoundError, PermissionError, RuntimeError, ValueError) as error:
        print(f"Error: {error}", file=sys.stderr)
        raise SystemExit(1)
