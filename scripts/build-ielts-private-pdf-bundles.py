#!/usr/bin/env python3
"""Build private IELTS Sets 21-40 candidate and staff PDF bundles.

The tool consumes the hash-bound sources recorded by the mock-factory batch and
assembly manifests.  It never writes below ``public/``.  Candidate packets are
constructed from an explicit display allowlist; answer keys and Listening
scripts are rendered only into the separately named ``PRIVATE-STAFF`` packet.

The default output is a staging directory outside the web repository.  A
``--plan-only`` run performs source/hash/projection/leak validation without
loading ReportLab or producing PDFs, which makes it safe to run while the local
TTS process is active.
"""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable


MODULES = ("listening", "reading", "writing", "speaking")
DEFAULT_WORKSPACE = Path("/Users/ddev/Documents/Codex/2026-10-02/pu")
DEFAULT_BATCH = DEFAULT_WORKSPACE / "outputs/ielts-production/mock-factory/batch-21-40.json"
DEFAULT_OUTPUT = DEFAULT_WORKSPACE / "outputs/ielts-production/staging/pdf-bundles-21-40-v1.0.0"

# Only these top-level candidate surfaces are admitted.  The order is also the
# display order in the workbook.
CANDIDATE_ROOT_KEYS = (
    "projectedCandidate", "candidateSurface", "candidateInstructions", "instructions",
    "notice", "title", "durationMinutes", "timeMinutes", "timeAllowed", "parts",
    "passages", "items", "questions", "questionGroups", "candidateSurfaces", "tasks", "task1",
    "task2", "part1", "part2", "part3", "administeredSequence", "expectedDuration",
    "recordingNotice", "content",
)

# These names are private even if an upstream object accidentally places them
# inside a candidate projection.  Matching is normalized and fail-closed.
FORBIDDEN_CANDIDATE_KEYS = {
    "answer", "answers", "answerkey", "answerkeys", "accepted", "acceptedvariant",
    "acceptedvariants", "canonical", "canonicalanswer", "correct", "correctanswer",
    "correctoption", "correctoptionid", "distractor", "distractors", "distractormechanic",
    "evidence", "answerevidence", "answerevidenceledger", "rationale", "rationales",
    "explanation", "explanations", "solution", "solutions", "locator", "scoringkey",
    "normalizationcontract", "answernormalizationcontract", "script", "scripts",
    "transcript", "transcripts", "spokenscript", "recordings", "blindstimulusfixture",
    "speakerMap", "audioplan", "playbackschedule", "timelinecues", "teacheronly",
    "editorialnotes", "markingscheme", "markscheme", "targetresponse", "responsetarget",
    "examinerdelivered", "examineronlycontrols",
}

# Production metadata does not belong in a learner worksheet.  This is not a
# security list (that is FORBIDDEN_CANDIDATE_KEYS); it keeps the PDF readable.
NON_DISPLAY_KEYS = {
    "schemaversion", "artifactversion", "unitid", "id", "questionid", "sourceid",
    "sha256", "hash", "path", "publicpath", "assetid", "mimetype", "bytes",
    "integrity", "geometry", "svgmarkup", "renderer", "coordinates", "x", "y",
    "status", "projectionstatus", "orderpolicy", "family", "subtype",
    # Visual implementation contracts are represented by the approved image
    # embedded separately in the workbook. Rendering these dictionaries would
    # expose coordinates, style tokens and SVG implementation metadata to
    # candidates instead of the actual Task 1 figure.
    "figure", "visualspec", "visualcontract", "visualmanifest", "responsefield",
    "accessiblealternative", "visualreference", "figurereference", "alternativereference",
}


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def sha256_json(value: Any) -> str:
    raw = (json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False) + "\n").encode()
    return hashlib.sha256(raw).hexdigest()


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as stream:
        return json.load(stream)


def load_content(path: Path, module: str) -> dict[str, Any]:
    if path.suffix.lower() == ".json":
        value = load_json(path)
        if not isinstance(value, dict):
            raise ValueError(f"{path}: expected a JSON object")
        return value
    if path.suffix.lower() in {".md", ".txt"}:
        return {"candidateSurface": {f"{module}Material": path.read_text(encoding="utf-8")}}
    raise ValueError(f"Unsupported canonical source type: {path}")


def norm_key(key: str) -> str:
    return re.sub(r"[^a-z0-9]", "", key.lower())


def version_key(path: Path) -> tuple[int, ...]:
    match = re.search(r"-v(\d+(?:\.\d+)*)", path.name)
    return tuple(int(part) for part in match.group(1).split(".")) if match else (0,)


def is_private_key(key: str) -> bool:
    normalized = norm_key(key)
    if normalized in {norm_key(item) for item in FORBIDDEN_CANDIDATE_KEYS}:
        return True
    return bool(re.search(r"(^|private)(answer|solution|transcript|script|evidence|rationale)", normalized))


def candidate_clean(value: Any, *, path: tuple[str, ...] = ()) -> Any:
    """Recursively remove private and non-display fields from a candidate surface."""
    if isinstance(value, list):
        return [candidate_clean(item, path=path + (str(index),)) for index, item in enumerate(value)]
    if not isinstance(value, dict):
        return value
    result: dict[str, Any] = {}
    for key, item in value.items():
        normalized = norm_key(key)
        if is_private_key(key):
            continue
        # Question numbers and option labels are candidate-visible even when
        # upstream schemas happen to call them ``id``. Other implementation
        # IDs remain suppressed.
        visible_id_context = normalized == "id" and any(
            norm_key(segment) in {
                "items", "questions", "headings", "options", "choices", "passages", "questiongroups"
            }
            for segment in path
        )
        # A question-group assetId is an internal rendering join key, not
        # learner-facing metadata.  Retain it through projection cleaning so
        # an approved diagram can be inserted at the bound range; the generic
        # renderer never emits this value as text.  Asset IDs elsewhere remain
        # stripped from candidate projections.
        visual_asset_context = normalized == "assetid" and any(
            norm_key(segment) == "questiongroups" for segment in path
        )
        if (normalized in NON_DISPLAY_KEYS and not (visible_id_context or visual_asset_context)) or normalized.endswith("sha256"):
            continue
        result[key] = candidate_clean(item, path=path + (key,))
    return result


def leak_paths(value: Any, *, path: tuple[str, ...] = ()) -> list[str]:
    hits: list[str] = []
    if isinstance(value, list):
        for index, item in enumerate(value):
            hits.extend(leak_paths(item, path=path + (str(index),)))
    elif isinstance(value, dict):
        for key, item in value.items():
            if is_private_key(key):
                hits.append("/" + "/".join(path + (key,)))
            hits.extend(leak_paths(item, path=path + (key,)))
    return hits


def project_candidate(source: dict[str, Any], module: str) -> dict[str, Any]:
    roots: list[Any] = []
    for key in ("candidateProjection", "candidateOnlyProjection"):
        if isinstance(source.get(key), dict):
            roots.append(source[key])
    roots.extend(source[key] for key in ("candidateSurface",) if isinstance(source.get(key), dict))

    if roots:
        root = roots[0]
        # Set 21 Writing wraps the real candidate under projectedCandidate.
        if isinstance(root.get("projectedCandidate"), dict):
            root = root["projectedCandidate"]
        # Newer Speaking delivery projections deliberately keep candidate,
        # spoken-examiner and control partitions in one hash-bound artifact.
        # Only the explicitly candidate-visible partition belongs in the
        # candidate workbook.
        if module == "speaking" and isinstance(root.get("candidateVisible"), dict):
            root = root["candidateVisible"]
        picked = {key: copy.deepcopy(root[key]) for key in CANDIDATE_ROOT_KEYS if key in root}
        if not picked and root:
            picked = copy.deepcopy(root)
    else:
        picked = {key: copy.deepcopy(source[key]) for key in CANDIDATE_ROOT_KEYS if key in source}

    # Older Speaking packages expose Parts 1-3 directly.
    if module == "speaking" and not any(key in picked for key in ("part1", "part2", "part3", "administeredSequence")):
        for key in ("part1", "part2", "part3"):
            if key in source:
                picked[key] = copy.deepcopy(source[key])

    # Listening/Reading older packages keep the approved display fields at the
    # root but no candidateProjection object.
    if module in {"listening", "reading"}:
        for key in ("candidateInstructions", "instructions", "passages", "items", "questions", "questionGroups", "candidateSurfaces"):
            if key not in picked and key in source:
                picked[key] = copy.deepcopy(source[key])

    if module == "writing" and not any(key in picked for key in ("tasks", "task1", "task2")):
        if isinstance(source.get("tasks"), (list, dict)):
            picked["tasks"] = copy.deepcopy(source["tasks"])

    cleaned = candidate_clean(picked)
    hits = leak_paths(cleaned)
    if hits:
        raise ValueError(f"{module}: candidate projection contains private keys after cleaning: {hits[:8]}")
    if not cleaned:
        raise ValueError(f"{module}: no candidate-facing surface found")
    return cleaned


def private_projection(source: dict[str, Any], module: str) -> dict[str, Any]:
    result: dict[str, Any] = {}
    if module in {"listening", "reading"} and isinstance(source.get("answerKey"), list):
        result["answerKey"] = copy.deepcopy(source["answerKey"])
    if module == "listening":
        for key in ("scripts", "transcript", "transcripts"):
            if key in source:
                result[key] = copy.deepcopy(source[key])
    if module == "speaking":
        root = source.get("candidateProjection")
        if isinstance(root, dict):
            for key in ("examinerDelivered", "examinerOnlyControls"):
                if isinstance(root.get(key), dict):
                    result[key] = copy.deepcopy(root[key])
    return result


def deep_get(value: Any, dotted: str) -> Any:
    current = value
    for key in dotted.split("."):
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


def speaking_part1_direct_questions(part: dict[str, Any]) -> list[str]:
    """Return direct administered Part 1 questions when no grouped bank is used."""
    groups = part.get("topicGroups") or part.get("topics") or []
    if groups:
        return []
    questions = part.get("questions")
    if not isinstance(questions, list):
        return []
    return [str(question).strip() for question in questions if str(question).strip()]


def latest_assembly(set_dir: Path, set_number: int) -> Path | None:
    files = sorted(set_dir.glob(f"set{set_number}-full-set-assembly-manifest-v*.json"), key=version_key)
    return files[-1] if files else None


def source_from_assembly(assembly: dict[str, Any], module: str) -> Path | None:
    candidates = (
        f"inputBindings.modules.{module}.path",
        f"inputBindings.modules.{module}.contentPath",
        f"inputBindings.moduleContentAndG3.{module}.contentPath",
    )
    for dotted in candidates:
        value = deep_get(assembly, dotted)
        if isinstance(value, str) and Path(value).is_file():
            return Path(value)
    return None


def expected_hash_from_assembly(assembly: dict[str, Any], module: str) -> str | None:
    candidates = (
        f"inputBindings.modules.{module}.wholeFileSha256",
        f"inputBindings.modules.{module}.contentWholeFileSha256",
        f"inputBindings.moduleContentAndG3.{module}.contentRawWholeFileSha256",
        f"inputBindings.modules.{module}.questionSourceSha256",
    )
    for dotted in candidates:
        value = deep_get(assembly, dotted)
        if isinstance(value, str) and re.fullmatch(r"[0-9a-f]{64}", value):
            return value
    return None


@dataclass
class SourceBinding:
    module: str
    path: Path
    sha256: str
    expected_sha256: str | None
    provenance: str


def resolve_sources(workspace: Path, batch: dict[str, Any], set_number: int) -> tuple[dict[str, SourceBinding], Path | None]:
    set_dir = workspace / f"outputs/ielts-production/set-{set_number}"
    batch_set = next((item for item in batch.get("sets", []) if item.get("set") == set_number), None)
    if not batch_set:
        raise ValueError(f"Set {set_number}: missing from batch manifest")
    assembly_path = latest_assembly(set_dir, set_number)
    assembly = load_json(assembly_path) if assembly_path else {}
    bindings: dict[str, SourceBinding] = {}

    for module in MODULES:
        receipt = deep_get(batch_set, f"modules.{module}.provenanceReceipt") or {}
        raw_source = receipt.get("source") if isinstance(receipt, dict) else None
        source: Path | None = None
        provenance = ""
        if isinstance(raw_source, str):
            candidate = Path(raw_source)
            if not candidate.is_absolute():
                candidate = workspace / candidate
            if candidate.is_file():
                source, provenance = candidate, "batch.provenanceReceipt.source"
        if source is None:
            source = source_from_assembly(assembly, module)
            if source:
                provenance = "assembly.inputBindings"
        if source is None and set_number == 21 and module == "listening":
            candidate = set_dir / "listening/questions-source.md"
            if candidate.is_file():
                source, provenance = candidate, "set21-preserved-question-source"
        if source is None:
            candidates = sorted((set_dir / module).glob(f"set{set_number}-{module}-content-v*.json"), key=version_key)
            if candidates:
                source, provenance = candidates[-1], "versioned-content-fallback"
        if source is None or not source.is_file():
            raise ValueError(f"Set {set_number} {module}: no canonical source file")

        actual = sha256_file(source)
        assembly_expected = expected_hash_from_assembly(assembly, module)
        expected = assembly_expected
        if expected is None and isinstance(receipt, dict):
            for key in ("rawWholeFileSha256", "artifactHash"):
                value = receipt.get(key)
                if isinstance(value, str) and re.fullmatch(r"[0-9a-f]{64}", value):
                    expected = value
                    break
        expected = expected or assembly_expected
        if expected and actual != expected:
            raise ValueError(
                f"Set {set_number} {module}: source hash mismatch; expected {expected}, observed {actual}"
            )
        bindings[module] = SourceBinding(module, source, actual, expected, provenance)
    return bindings, assembly_path


def resolve_writing_visual(workspace: Path, set_number: int) -> Path | None:
    root = workspace / f"outputs/ielts-production/set-{set_number}/writing"
    preferences = (
        "**/*candidate-visual*-page.png",
        "**/*desktop-1600x1000*.png", "**/*desktop-1600x1100*.png",
        "**/*desktop*.png",
        "**/*high-resolution-3200x2000*.png", "**/*source-desktop*.png",
        "**/*desktop-browser-1600css-100pct*.png", "**/*browser-desktop-100*.png",
    )
    for pattern in preferences:
        matches = sorted(root.glob(pattern), key=version_key)
        if matches:
            return matches[-1]
    return None


def referenced_assets(value: Any, workspace: Path, suffixes: set[str]) -> list[Path]:
    found: list[Path] = []
    if isinstance(value, list):
        for item in value:
            found.extend(referenced_assets(item, workspace, suffixes))
    elif isinstance(value, dict):
        for item in value.values():
            found.extend(referenced_assets(item, workspace, suffixes))
    elif isinstance(value, str) and Path(value).suffix.lower() in suffixes:
        candidate = Path(value)
        if not candidate.is_absolute():
            candidate = workspace / candidate
        if candidate.is_file():
            found.append(candidate.resolve())
    return list(dict.fromkeys(found))


def resolve_listening_visual(workspace: Path, set_number: int, source: dict[str, Any]) -> Path | None:
    referenced = referenced_assets(source, workspace, {".svg", ".png", ".jpg", ".jpeg"})
    map_like = [path for path in referenced if re.search(r"(map|plan|diagram)", path.name, re.I)]
    if map_like:
        return sorted(map_like, key=version_key)[-1]
    root = workspace / f"outputs/ielts-production/set-{set_number}/listening"
    fallbacks = [path for path in root.glob("*.svg") if re.search(r"(map|plan|diagram)", path.name, re.I)]
    return sorted(fallbacks, key=version_key)[-1] if fallbacks else None


def resolve_reading_visual(workspace: Path, set_number: int, source: dict[str, Any]) -> Path | None:
    candidate_root = next(
        (source.get(key) for key in ("candidateProjection", "candidateOnlyProjection", "candidateSurface")
         if isinstance(source.get(key), dict)),
        source,
    )
    referenced = referenced_assets(candidate_root, workspace, {".svg", ".png", ".jpg", ".jpeg"})
    diagram_like = [path for path in referenced if re.search(r"(map|plan|diagram)", path.name, re.I)]
    if diagram_like:
        return sorted(diagram_like, key=version_key)[-1]
    root = workspace / f"outputs/ielts-production/set-{set_number}/reading"
    fallbacks = [path for path in root.glob("*")
                 if path.suffix.lower() in {".svg", ".png", ".jpg", ".jpeg"}
                 and re.search(r"(map|plan|diagram)", path.name, re.I)]
    return sorted(fallbacks, key=version_key)[-1] if fallbacks else None


def chatterbox_running() -> bool:
    try:
        result = subprocess.run(
            ["ps", "-axo", "command="], check=True, capture_output=True, text=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return False
    needles = ("render-listening-set.py", "run-sequential-batch.py", "chatterbox")
    return any(any(needle in line.lower() for needle in needles) for line in result.stdout.splitlines())


def label(key: str) -> str:
    text = re.sub(r"([a-z0-9])([A-Z])", r"\1 \2", key).replace("_", " ").replace("-", " ")
    return text[:1].upper() + text[1:]


def scalar_text(value: Any) -> str:
    if isinstance(value, bool):
        return "Yes" if value else "No"
    if value is None:
        return ""
    return str(value)


def canonical_passage_body(passage: dict[str, Any]) -> tuple[str, Any]:
    """Select exactly one candidate-visible representation of a Reading passage.

    Some approved sources retain both a flattened ``text`` field and the same
    content split into labelled ``sections``.  Rendering both is a duplicate,
    not additional candidate material.  Prefer the most structured available
    representation and fall back to the flattened text only when necessary.
    """
    paragraphs = passage.get("paragraphs")
    if isinstance(paragraphs, list) and paragraphs:
        return "paragraphs", paragraphs
    sections = passage.get("sections")
    if isinstance(sections, list) and sections:
        return "sections", sections
    text = passage.get("text")
    if isinstance(text, str) and text.strip():
        return "text", text
    return "empty", None


def compact_question_group_can_stay_together(questions: list[dict[str, Any]]) -> bool:
    """Return whether a short option group is safe to keep on one PDF page."""
    if not 1 <= len(questions) <= 4:
        return False
    if not all(isinstance(item.get("options") or item.get("choices"), (list, dict)) for item in questions):
        return False
    serialized = json.dumps(questions, sort_keys=True, ensure_ascii=False)
    return len(serialized) <= 2600


def reading_question_group_plan(
    groups: list[dict[str, Any]],
    questions: list[dict[str, Any]],
    rendered_group_indexes: set[int] | None = None,
) -> list[tuple[int, str, Any]]:
    """Return remaining Reading groups and uncovered questions in number order.

    Some approved sources provide a partial ``questionGroups`` list only for a
    diagram or shared option bank.  Treating the mere presence of that list as
    proof that it covers every question silently drops the uncovered items.
    This plan reserves every declared group range and interleaves all remaining
    top-level questions around the groups, while respecting groups already
    rendered beside an explicitly bound passage.
    """
    rendered = rendered_group_indexes or set()
    covered: set[int] = set()
    units: list[tuple[int, str, Any]] = []
    for index, group in enumerate(groups):
        raw_range = group.get("range") or group.get("questionRange")
        numbers = [int(value) for value in re.findall(r"\d+", str(raw_range or ""))]
        bounds = (numbers[0], numbers[-1]) if numbers else None
        if bounds:
            covered.update(range(bounds[0], bounds[1] + 1))
        if index not in rendered:
            nested = group.get("questions") or group.get("items") or []
            nested_numbers = [int(item.get("number")) for item in nested
                              if isinstance(item, dict) and str(item.get("number", "")).isdigit()]
            start = bounds[0] if bounds else (min(nested_numbers) if nested_numbers else 10**9 + index)
            units.append((start, "group", (index, group)))
    for fallback, question in enumerate(questions, 1):
        if not isinstance(question, dict):
            continue
        raw_number = question.get("number", fallback)
        try:
            number = int(raw_number)
        except (TypeError, ValueError):
            number = fallback
        if number not in covered:
            units.append((number, "question", question))
    return sorted(units, key=lambda unit: (unit[0], 0 if unit[1] == "group" else 1))


def keep_passage_heading_with_lead(
    heading: Any,
    body: list[Any],
    keep_together_factory: Any,
) -> list[Any]:
    """Keep a Reading passage title with its first meaningful body block.

    ReportLab otherwise permits a heading to consume the final lines of a page
    while moving the passage body to the next page.  Grouping only the title
    and lead block is deliberately narrow: it prevents orphan headings without
    making the complete passage an unsplittable unit.
    """
    if not body:
        return [heading]
    return [keep_together_factory([heading, body[0]]), *body[1:]]


def render_pdf(
    output: Path,
    *,
    title: str,
    subtitle: str,
    set_number: int,
    modules: dict[str, Any],
    source_bindings: dict[str, SourceBinding],
    private: bool,
    writing_visual: Path | None = None,
    listening_visual: Path | None = None,
    reading_visual: Path | None = None,
) -> None:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import mm
    from reportlab.platypus import (
        BaseDocTemplate, Frame, Image, KeepTogether, PageBreak, PageTemplate,
        Paragraph, Spacer, Table, TableStyle, HRFlowable,
    )
    from xml.sax.saxutils import escape

    output.parent.mkdir(parents=True, exist_ok=True)
    navy = colors.HexColor("#14215c")
    red = colors.HexColor("#c8202e")
    ink = colors.HexColor("#22283c")
    gray = colors.HexColor("#6e768c")
    soft = colors.HexColor("#e8ecf4")
    paper = colors.HexColor("#fbfcff")
    pale_blue = colors.HexColor("#eef3fb")
    pale_red = colors.HexColor("#fff1f2")
    logo_path = Path(__file__).resolve().parents[1] / "public/images/welearn-pdf-mark.png"

    class WeLearnDoc(BaseDocTemplate):
        def __init__(self, filename: str):
            super().__init__(filename, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                             topMargin=40 * mm, bottomMargin=22 * mm, title=title,
                             author="Idiomas WeLearn", subject=subtitle)
            frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="body")
            self.addPageTemplates(PageTemplate(id="main", frames=[frame], onPage=self._page))

        def _page(self, canvas: Any, doc: Any) -> None:
            canvas.saveState()
            canvas.setFillColor(colors.white)
            canvas.rect(0, A4[1] - 36 * mm, A4[0], 36 * mm, fill=1, stroke=0)

            def triangle(points: list[tuple[float, float]], color: Any) -> None:
                path = canvas.beginPath()
                path.moveTo(*points[0])
                for point in points[1:]:
                    path.lineTo(*point)
                path.close()
                canvas.setFillColor(color)
                canvas.drawPath(path, fill=1, stroke=0)

            def pill(x1: float, y1: float, x2: float, y2: float, width: float, color: Any) -> None:
                canvas.setStrokeColor(color)
                canvas.setLineWidth(width)
                canvas.setLineCap(1)
                canvas.line(x1, y1, x2, y2)
                canvas.setLineCap(0)

            blue_logo = colors.HexColor("#0835a4")
            red_logo = colors.HexColor("#e3070c")
            # Same measured corner motif used by src/lib/pdf/brandedDoc.ts for
            # the downloadable PDFs in Sets 1-20.
            triangle([(0, A4[1]), (18.9 * mm, A4[1]), (0, A4[1] - 32.4 * mm)], blue_logo)
            pill(2.6 * mm, A4[1] - 11.6 * mm, 7.8 * mm, A4[1] - 6.4 * mm, 2.5 * mm, colors.white)
            pill(14.4 * mm, A4[1] - 12.7 * mm, 18.8 * mm, A4[1] - 8.3 * mm, 2.6 * mm, blue_logo)
            pill(21.5 * mm, A4[1] - 17.0 * mm, 24.5 * mm, A4[1] - 14.0 * mm, 2.2 * mm, blue_logo)

            triangle([(A4[0], 0), (A4[0] - 32.4 * mm, 0), (A4[0], 18.9 * mm)], red_logo)
            pill(A4[0] - 7.8 * mm, 6.4 * mm, A4[0] - 2.6 * mm, 11.6 * mm, 2.5 * mm, colors.white)
            pill(A4[0] - 18.8 * mm, 8.3 * mm, A4[0] - 14.4 * mm, 12.7 * mm, 2.6 * mm, red_logo)
            pill(A4[0] - 24.5 * mm, 14.0 * mm, A4[0] - 21.5 * mm, 17.0 * mm, 2.2 * mm, red_logo)

            logo_w = 38 * mm
            logo_h = logo_w / (760 / 251)
            if logo_path.is_file():
                canvas.drawImage(
                    str(logo_path), A4[0] - 18 * mm - logo_w, A4[1] - 12 * mm - logo_h,
                    width=logo_w, height=logo_h, preserveAspectRatio=True, mask="auto",
                )
            else:
                canvas.setFillColor(navy)
                canvas.setFont("Helvetica-Bold", 14)
                canvas.drawRightString(A4[0] - 18 * mm, A4[1] - 20 * mm, "Idiomas WeLearn")
            canvas.setFont("Helvetica-Bold", 7.5)
            canvas.setFillColor(red)
            canvas.drawRightString(
                A4[0] - 18 * mm,
                A4[1] - (12 * mm + logo_h + 4.5 * mm),
                f"IELTS ACADEMIC · {'STAFF MATERIAL' if private else 'STUDENT WORKSHEET'}",
            )
            canvas.setStrokeColor(navy)
            canvas.setLineWidth(0.5)
            canvas.line(18 * mm, A4[1] - 34 * mm, A4[0] - 18 * mm, A4[1] - 34 * mm)
            canvas.setStrokeColor(red)
            canvas.line(18 * mm, A4[1] - 34 * mm, 48 * mm, A4[1] - 34 * mm)

            canvas.setStrokeColor(soft)
            canvas.setLineWidth(0.35)
            canvas.line(18 * mm, 16 * mm, A4[0] - 18 * mm, 16 * mm)
            canvas.setFont("Helvetica-Bold", 7.5)
            canvas.setFillColor(navy)
            canvas.drawString(18 * mm, 11 * mm, "© 2026 Idiomas WeLearn. Todos los derechos reservados. · idiomaswl.com")
            canvas.setFont("Helvetica", 6.4)
            canvas.setFillColor(gray)
            canvas.drawString(18 * mm, 7 * mm, "Uso personal y educativo. Prohibida su reproducción, venta o distribución sin autorización escrita.")
            canvas.drawRightString(A4[0] - 18 * mm, 11 * mm, f"Página {doc.page}")
            canvas.restoreState()

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="LegacyTitle", parent=styles["Title"], fontName="Helvetica-Bold",
                              fontSize=20, leading=24, textColor=navy, alignment=TA_LEFT, spaceAfter=2 * mm))
    styles.add(ParagraphStyle(name="KickerX", parent=styles["Normal"], fontName="Helvetica-Bold",
                              fontSize=8, leading=10, textColor=red, spaceAfter=5.5 * mm))
    styles.add(ParagraphStyle(name="H1X", parent=styles["Heading1"], fontName="Helvetica-Bold",
                              fontSize=17, leading=21, textColor=navy, spaceBefore=3 * mm, spaceAfter=4 * mm))
    styles.add(ParagraphStyle(name="H2X", parent=styles["Heading2"], fontName="Helvetica-Bold",
                              fontSize=12, leading=15, textColor=navy, spaceBefore=3 * mm, spaceAfter=2 * mm))
    styles.add(ParagraphStyle(name="H3X", parent=styles["Heading3"], fontName="Helvetica-Bold",
                              fontSize=10, leading=13, textColor=ink, spaceBefore=2 * mm, spaceAfter=1 * mm))
    styles.add(ParagraphStyle(name="BodyX", parent=styles["BodyText"], fontName="Helvetica",
                              fontSize=8.8, leading=12.2, textColor=ink, spaceAfter=1.5 * mm))
    styles.add(ParagraphStyle(name="SmallX", parent=styles["BodyText"], fontName="Helvetica",
                              fontSize=7.2, leading=9.2, textColor=gray, spaceAfter=1 * mm))
    styles.add(ParagraphStyle(name="BulletX", parent=styles["BodyText"], fontName="Helvetica",
                              fontSize=8.8, leading=12.2, textColor=ink, leftIndent=5 * mm,
                              firstLineIndent=-3 * mm, bulletIndent=1 * mm, spaceAfter=1.2 * mm))

    story: list[Any] = [Spacer(1, 10 * mm),
                        Paragraph("IELTS ACADEMIC · STUDENT WORKSHEET" if not private else "IELTS ACADEMIC · RESTRICTED STAFF MATERIAL", styles["KickerX"]),
                        Paragraph(escape(title), styles["LegacyTitle"]),
                        Paragraph("All sections" if not private else escape(subtitle), styles["H2X"])]
    notice = ("RESTRICTED STAFF COPY. Contains answer keys and Listening transcripts. Do not distribute to candidates."
              if private else
              "Work through each IELTS part in order. Reading passages stay with their questions; charts and diagrams appear next to their tasks. Open the live practice page for Listening audio and Speaking recordings.")
    if not private:
        story.append(Paragraph("Name: ____________________________________    Date: ____________________", styles["BodyX"]))
    intro_label = "Restricted staff copy" if private else "How to use this worksheet"
    story.append(Table([[Paragraph(f"<font color='#{'c8202e' if private else '0f5f73'}'><b>{escape(intro_label.upper())}</b></font>", styles["SmallX"])],
                        [Paragraph(escape(notice), styles["BodyX"])]], colWidths=[165 * mm],
                       style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), pale_red if private else colors.HexColor("#eff9fb")),
                                         ("LINEBEFORE", (0, 0), (0, -1), 1.6 * mm, red if private else colors.HexColor("#0f5f73")),
                                         ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                                         ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm)])))
    story.extend([Spacer(1, 2.5 * mm), Paragraph(
        "Staff solutions and scripts are supplied separately." if not private else
        "Answer keys and Listening transcripts are restricted to staff.", styles["SmallX"]
    )])

    def inline_markup(text: str) -> str:
        safe = escape(text.replace("\u2014", " - ").replace("\u2013", "-").replace("\u2011", "-"))
        safe = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", safe)
        safe = re.sub(r"`(.+?)`", r"\1", safe)
        return safe

    def emit_markdown(text: str) -> list[Any]:
        """Render the limited Markdown used by preserved Set 21 sources."""
        result: list[Any] = []
        lines = text.replace("\r\n", "\n").split("\n")
        index = 0
        while index < len(lines):
            raw = lines[index].rstrip()
            stripped = raw.strip()
            if not stripped:
                index += 1
                continue
            if stripped.startswith("|") and index + 1 < len(lines) and re.match(r"^\s*\|?\s*:?-+", lines[index + 1]):
                table_lines = [stripped]
                index += 2  # skip the Markdown delimiter row
                while index < len(lines) and lines[index].strip().startswith("|"):
                    table_lines.append(lines[index].strip())
                    index += 1
                rows: list[list[Any]] = []
                for row_index, line in enumerate(table_lines):
                    cells = [cell.strip() for cell in line.strip("|").split("|")]
                    rows.append([Paragraph(inline_markup(cell), styles["BodyX"]) for cell in cells])
                column_count = max(len(row) for row in rows)
                for row in rows:
                    row.extend([Paragraph("", styles["BodyX"])] * (column_count - len(row)))
                table = Table(rows, colWidths=[160 * mm / column_count] * column_count, repeatRows=1)
                table.setStyle(TableStyle([
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("GRID", (0, 0), (-1, -1), 0.35, soft),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2f9")),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
                ]))
                result.extend([table, Spacer(1, 2 * mm)])
                continue
            heading = re.match(r"^(#{1,4})\s+(.+)$", stripped)
            if heading:
                level = len(heading.group(1))
                style = styles["H1X"] if level == 1 else styles["H2X"] if level == 2 else styles["H3X"]
                result.append(Paragraph(inline_markup(heading.group(2)), style))
            elif re.match(r"^[-*]\s+", stripped):
                result.append(Paragraph(inline_markup(re.sub(r"^[-*]\s+", "", stripped)), styles["BulletX"], bulletText="•"))
            elif stripped == "↓":
                result.append(Paragraph("<b>↓</b>", styles["H2X"]))
            else:
                result.append(Paragraph(inline_markup(stripped), styles["BodyX"]))
            index += 1
        return result

    def emit(value: Any, depth: int = 0, key_hint: str = "") -> list[Any]:
        result: list[Any] = []
        if isinstance(value, dict):
            scalar_rows: list[list[Any]] = []
            for key, item in value.items():
                if isinstance(item, (dict, list)):
                    if item in ({}, []):
                        continue
                    heading_style = styles["H2X"] if depth <= 1 else styles["H3X"]
                    result.append(Paragraph(escape(label(key)), heading_style))
                    result.extend(emit(item, depth + 1, key))
                else:
                    text = scalar_text(item).strip()
                    if not text:
                        continue
                    if "\n" in text or re.search(r"(^|\n)#{1,4}\s", text):
                        if scalar_rows:
                            table = Table(scalar_rows, colWidths=[35 * mm, 125 * mm], repeatRows=0)
                            table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, soft),
                                                       ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f6f8fc")),
                                                       ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                                                       ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm)]))
                            result.append(table); result.append(Spacer(1, 2 * mm)); scalar_rows = []
                        result.extend(emit_markdown(text))
                    elif len(text) > 170:
                        if scalar_rows:
                            table = Table(scalar_rows, colWidths=[35 * mm, 125 * mm], repeatRows=0)
                            table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, soft),
                                                       ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f6f8fc")),
                                                       ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                                                       ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm)]))
                            result.append(table); result.append(Spacer(1, 2 * mm)); scalar_rows = []
                        result.append(Paragraph(f"<b>{escape(label(key))}:</b> {escape(text)}", styles["BodyX"]))
                    else:
                        scalar_rows.append([Paragraph(f"<b>{escape(label(key))}</b>", styles["SmallX"]),
                                            Paragraph(escape(text), styles["BodyX"])])
            if scalar_rows:
                table = Table(scalar_rows, colWidths=[35 * mm, 125 * mm], repeatRows=0)
                table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, soft),
                                           ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f6f8fc")),
                                           ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                                           ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm)]))
                result.append(table); result.append(Spacer(1, 2 * mm))
            return result
        if isinstance(value, list):
            for index, item in enumerate(value):
                if isinstance(item, dict):
                    identifier = next((item.get(k) for k in ("title", "heading", "label", "number", "part", "passage") if item.get(k) is not None), index + 1)
                    result.append(Paragraph(escape(f"{label(key_hint) or 'Item'} {identifier}"), styles["H3X"]))
                    result.extend(emit(item, depth + 1, key_hint))
                else:
                    text = scalar_text(item).strip()
                    if text:
                        result.append(Paragraph(f"- {escape(text)}", styles["BodyX"]))
            return result
        text = scalar_text(value).strip()
        if text:
            result.extend(emit_markdown(text) if "\n" in text or re.search(r"(^|\n)#{1,4}\s", text)
                          else [Paragraph(inline_markup(text), styles["BodyX"])])
        return result

    def visual_flowable(path: Path, max_width: float = 165 * mm, max_height: float = 105 * mm) -> Any:
        if path.suffix.lower() == ".svg":
            # Rasterise the approved vector at its authored resolution before
            # embedding it. svglib can paint outside a Flowable's declared
            # bounds for SVGs that use viewBox scaling/filters, which can cover
            # the branded page header on map and chart pages.
            raster_path = Path(tempfile.gettempdir()) / f"ielts-svg-raster-v2-{sha256_file(path)}.png"
            if not raster_path.is_file():
                try:
                    subprocess.run(
                        ["sips", "-s", "format", "png", str(path), "--out", str(raster_path)],
                        check=True, capture_output=True, text=True,
                    )
                except (OSError, subprocess.CalledProcessError):
                    raster_path = Path()
            if raster_path.is_file():
                image = Image(str(raster_path))
                image._restrictSize(max_width, max_height)
                return image
            try:
                from svglib.svglib import svg2rlg
            except ModuleNotFoundError:
                raster_path = Path(tempfile.gettempdir()) / f"ielts-svg-{sha256_file(path)}.png"
                if not raster_path.is_file():
                    try:
                        subprocess.run(
                            ["sips", "-s", "format", "png", str(path), "--out", str(raster_path)],
                            check=True, capture_output=True, text=True,
                        )
                    except (OSError, subprocess.CalledProcessError) as exc:
                        raise RuntimeError(
                            f"SVG rendering requires svglib or the macOS sips converter: {path}"
                        ) from exc
                image = Image(str(raster_path))
                image._restrictSize(max_width, max_height)
                return image
            else:
                drawing = svg2rlg(str(path))
                if drawing is None or not drawing.width or not drawing.height:
                    raise ValueError(f"Could not parse SVG visual: {path}")
                scale = min(max_width / drawing.width, max_height / drawing.height, 1.0)
                drawing.width *= scale
                drawing.height *= scale
                drawing.scale(scale, scale)
                return drawing
        image = Image(str(path))
        image._restrictSize(max_width, max_height)
        return image

    def render_instructions(value: Any) -> list[Any]:
        result: list[Any] = []
        if isinstance(value, str):
            return emit_markdown(value)
        if isinstance(value, list):
            for item in value:
                if isinstance(item, str) and item.strip():
                    result.append(Paragraph(inline_markup(item.strip()), styles["BulletX"], bulletText="•"))
            return result
        if isinstance(value, dict):
            for key, item in value.items():
                if norm_key(key) in {
                    "practiceproductmode", "attemptmode", "projectionstatus", "projectionkind",
                    "forbiddenfieldscan", "candidatesurfacepackaging", "createdat",
                    "containstranscriptorscript", "containskeyevidencerationaleoranswers",
                    "questionrange",
                }:
                    continue
                if isinstance(item, str) and item.strip():
                    result.append(Paragraph(inline_markup(item.strip()), styles["BodyX"]))
                elif isinstance(item, list):
                    result.extend(render_instructions(item))
            return result
        return result

    def question_number(item: dict[str, Any], fallback: int) -> str:
        for key in ("number", "q", "id", "itemId", "question"):
            if item.get(key) not in (None, ""):
                return str(item[key])
        return str(fallback)

    def render_question(item: dict[str, Any], fallback: int, *, show_options: bool = True) -> list[Any]:
        number = question_number(item, fallback)
        prompt = next((item.get(key) for key in ("prompt", "question", "text", "statement", "stem", "instruction")
                       if isinstance(item.get(key), str) and item.get(key).strip()), "")
        if not prompt and item.get("paragraph") not in (None, ""):
            prompt = f"Paragraph {item['paragraph']}"
        prompt = re.sub(rf"^\s*{re.escape(number)}\s*[.)]?\s+", "", prompt, count=1)
        question_block = [Paragraph(f"<b>{escape(number)}.</b> {inline_markup(prompt)}", styles["BodyX"])]
        options = (item.get("options") or item.get("choices")) if show_options else None
        if isinstance(options, dict):
            options = [{"label": key, "text": value} for key, value in options.items()]
        if isinstance(options, list):
            for index, option in enumerate(options):
                if isinstance(option, dict):
                    marker = str(option.get("id") or option.get("label") or chr(65 + index))
                    text = str(option.get("text") or option.get("option") or option.get("label") or "")
                else:
                    raw_option = str(option).strip()
                    prefixed = re.match(r"^([A-Z]|[ivxlcdm]+)[.)]?\s+(.+)$", raw_option, re.I)
                    if prefixed:
                        marker, text = prefixed.group(1), prefixed.group(2)
                    elif re.fullmatch(r"[A-Z]", raw_option):
                        continue
                    else:
                        marker, text = chr(65 + index), raw_option
                if norm_key(str(text)) == norm_key(str(marker)):
                    question_block.append(Paragraph(f"<b>{escape(marker)}</b>", styles["BulletX"]))
                else:
                    question_block.append(Paragraph(f"<b>{escape(marker)}</b> &nbsp; {inline_markup(text)}", styles["BulletX"]))
        # A multiple-choice stem and all visible options are one response unit.
        # Keeping the unit together prevents late-page stems from orphaning
        # most of their options on the next page (Set 31 Q40 regression).
        return [KeepTogether(question_block)] if len(question_block) > 1 else question_block

    def range_bounds(value: Any) -> tuple[int, int] | None:
        numbers = [int(item) for item in re.findall(r"\d+", str(value or ""))]
        if not numbers:
            return None
        return numbers[0], numbers[-1]

    reading_visual_used = False

    def render_question_group(
        group: dict[str, Any],
        questions: list[dict[str, Any]],
        *,
        keep_compact: bool = False,
    ) -> list[Any]:
        nonlocal reading_visual_used
        result: list[Any] = []
        bounds = range_bounds(group.get("range") or group.get("questionRange"))
        if bounds:
            result.append(Paragraph(f"Questions {bounds[0]}-{bounds[1]}", styles["H2X"]))
        instruction = group.get("instruction") or group.get("instructions")
        result.extend(render_instructions(instruction))
        diagram = group.get("diagram")
        if (not isinstance(diagram, dict) and reading_visual and reading_visual.is_file()
                and group.get("assetId")):
            diagram = {"title": "Diagram"}
        diagram_rendered = False
        if isinstance(diagram, dict):
            diagram_title = diagram.get("title") or "Diagram"
            diagram_description = diagram.get("description") or diagram.get("longDescription")
            if reading_visual and reading_visual.is_file() and not reading_visual_used:
                result.extend([
                    Paragraph(inline_markup(str(diagram_title)), styles["H3X"]),
                    visual_flowable(reading_visual, 160 * mm, 95 * mm),
                    Spacer(1, 2 * mm),
                ])
                reading_visual_used = True
                diagram_rendered = True
            elif isinstance(diagram_description, str) and diagram_description.strip():
                diagram_box = Table(
                    [[Paragraph(f"<b>{inline_markup(str(diagram_title))}</b>", styles["BodyX"])],
                     [Paragraph(inline_markup(diagram_description.strip()), styles["BodyX"])]],
                    colWidths=[160 * mm],
                )
                diagram_box.setStyle(TableStyle([
                    ("BOX", (0, 0), (-1, -1), 0.7, navy),
                    ("LINEBELOW", (0, 0), (-1, 0), 0.4, soft),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2fb")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
                ]))
                result.extend([diagram_box, Spacer(1, 2 * mm)])
                diagram_rendered = True
        headings = (group.get("headings") or group.get("paragraphOptions") or group.get("options")
                    or group.get("optionBank"))
        if isinstance(headings, dict):
            headings = [{"id": key, "text": text} for key, text in headings.items()]
        if isinstance(headings, list):
            rows: list[list[Any]] = []
            for index, heading in enumerate(headings):
                if isinstance(heading, dict):
                    marker = heading.get("id") or heading.get("label") or index + 1
                    text = heading.get("text") or heading.get("heading") or heading.get("label") or ""
                else:
                    marker, text = index + 1, heading
                rows.append([Paragraph(f"<b>{escape(str(marker))}</b>", styles["BodyX"]),
                             Paragraph(inline_markup(str(text)), styles["BodyX"])])
            if rows:
                table = Table(rows, colWidths=[14 * mm, 146 * mm])
                table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                                           ("GRID", (0, 0), (-1, -1), 0.25, soft),
                                           ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f6f8fc")),
                                           ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
                                           ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                                           ("TOPPADDING", (0, 0), (-1, -1), 1.3 * mm),
                                           ("BOTTOMPADDING", (0, 0), (-1, -1), 1.3 * mm)]))
                result.extend([table, Spacer(1, 2 * mm)])
        selected: list[dict[str, Any]] = []
        for index, item in enumerate(questions, 1):
            if not isinstance(item, dict):
                continue
            try:
                number = int(question_number(item, index))
            except ValueError:
                number = index
            if not bounds or bounds[0] <= number <= bounds[1]:
                selected.append(item)
        prior_options_signature = ""
        for index, item in enumerate(selected, 1):
            visible_prompt = next(
                (item.get(key) for key in ("prompt", "question", "text", "statement", "stem", "instruction")
                 if isinstance(item.get(key), str) and item.get(key).strip()),
                "",
            )
            if (diagram_rendered and not visible_prompt and item.get("paragraph") in (None, "")
                    and not (item.get("options") or item.get("choices"))):
                continue
            options_signature = json.dumps(
                item.get("options") or item.get("choices"), sort_keys=True, ensure_ascii=False
            )
            show_options = not options_signature or options_signature != prior_options_signature
            result.extend(render_question(item, index, show_options=show_options))
            if options_signature:
                prior_options_signature = options_signature
        # Short multiple-choice groups are normally perceived and answered as
        # one block.  Keeping the whole compact group together avoids leaving
        # its last question alone on an otherwise empty continuation page.
        if (keep_compact and not diagram_rendered and not headings
                and compact_question_group_can_stay_together(selected)):
            return [KeepTogether(result)]
        return result

    def render_passage(passage: dict[str, Any], index: int) -> list[Any]:
        title_text = passage.get("title") or f"Reading Passage {passage.get('passage') or index}"
        title = Paragraph(inline_markup(str(title_text)), styles["H2X"])
        body_flowables: list[Any] = []
        body_kind, body = canonical_passage_body(passage)
        if body_kind == "paragraphs":
            for paragraph in body:
                if isinstance(paragraph, dict):
                    marker = paragraph.get("label") or paragraph.get("section") or ""
                    text = paragraph.get("text") or paragraph.get("content") or ""
                    prefix = f"<b>{escape(str(marker))}</b> &nbsp; " if marker else ""
                    body_flowables.append(Paragraph(prefix + inline_markup(str(text)), styles["BodyX"]))
                elif isinstance(paragraph, str):
                    body_flowables.append(Paragraph(inline_markup(paragraph), styles["BodyX"]))
        elif body_kind == "sections":
            for section in body:
                if isinstance(section, dict):
                    marker = section.get("label") or section.get("heading") or ""
                    text = section.get("text") or section.get("content") or ""
                    body_flowables.append(Paragraph(
                        (f"<b>{escape(str(marker))}</b> &nbsp; " if marker else "") +
                        inline_markup(str(text)), styles["BodyX"],
                    ))
                elif isinstance(section, str):
                    body_flowables.append(Paragraph(inline_markup(section), styles["BodyX"]))
        elif body_kind == "text":
            body_flowables.extend(emit_markdown(body))
        return keep_passage_heading_with_lead(title, body_flowables, KeepTogether)

    def candidate_module_flow(module: str, value: dict[str, Any]) -> list[Any]:
        result: list[Any] = []
        if module == "writing":
            for key in ("title", "header", "timeAllowed", "totalTimeText", "scoringNotice"):
                if isinstance(value.get(key), str):
                    result.append(Paragraph(inline_markup(value[key]), styles["BodyX"]))
            tasks = value.get("tasks")
            if isinstance(tasks, dict):
                task_values = list(tasks.values())
            elif isinstance(tasks, list):
                task_values = tasks
            else:
                task_values = [value.get("task1"), value.get("task2")]
            for index, task in enumerate(task_values, 1):
                if not isinstance(task, dict):
                    continue
                heading = task.get("heading") or task.get("title") or task.get("task") or f"Writing Task {index}"
                result.append(Paragraph(inline_markup(str(heading)), styles["H2X"]))
                result.extend(render_instructions(task.get("instructions") or task.get("instruction")))
                prompt = task.get("prompt") or task.get("finalPrompt")
                if isinstance(prompt, str):
                    result.extend(emit_markdown(prompt))
                if index == 1 and writing_visual and writing_visual.is_file():
                    result.extend([Spacer(1, 2 * mm), visual_flowable(writing_visual, 165 * mm, 96 * mm), Spacer(1, 3 * mm)])
            return result
        if module == "reading":
            result.extend(render_instructions(value.get("candidateInstructions") or value.get("instructions")))
            passages = value.get("passages") if isinstance(value.get("passages"), list) else []
            questions = value.get("items") or value.get("questions") or []
            groups = value.get("questionGroups") or []
            rendered_group_indexes: set[int] = set()
            for index, passage in enumerate(passages, 1):
                if isinstance(passage, dict):
                    result.extend(render_passage(passage, index))
                    nested_questions = passage.get("questions")
                    if isinstance(nested_questions, list):
                        prior_options_signature = ""
                        for q_index, item in enumerate(nested_questions, 1):
                            if isinstance(item, dict):
                                options_signature = json.dumps(item.get("options"), sort_keys=True, ensure_ascii=False)
                                show_options = not options_signature or options_signature != prior_options_signature
                                result.extend(render_question(item, q_index, show_options=show_options))
                                if options_signature:
                                    prior_options_signature = options_signature
                    nested_groups = passage.get("questionGroups")
                    if isinstance(nested_groups, list):
                        nested_items = [item for group in nested_groups if isinstance(group, dict)
                                        for item in (group.get("questions") or group.get("items") or [])
                                        if isinstance(item, dict)]
                        for group in nested_groups:
                            if isinstance(group, dict):
                                result.extend(render_question_group(group, nested_items))
                    passage_id = passage.get("id") or passage.get("passageId") or passage.get("passage")
                    if passage_id and isinstance(groups, list):
                        for group_index, group in enumerate(groups):
                            if (isinstance(group, dict) and
                                    str(group.get("passageId") or group.get("passage") or "") == str(passage_id)):
                                result.extend(render_question_group(
                                    group, questions if isinstance(questions, list) else []
                                ))
                                rendered_group_indexes.add(group_index)
            if isinstance(groups, list) and groups:
                typed_groups = [group for group in groups if isinstance(group, dict)]
                typed_questions = questions if isinstance(questions, list) else []
                for _, kind, payload in reading_question_group_plan(
                    typed_groups, typed_questions, rendered_group_indexes
                ):
                    if kind == "group":
                        _, group = payload
                        result.extend(render_question_group(group, typed_questions))
                    else:
                        result.extend(render_question(payload, int(payload.get("number", 1))))
            elif isinstance(questions, list):
                for index, item in enumerate(questions, 1):
                    if isinstance(item, dict):
                        result.extend(render_question(item, index))
            return result
        if module == "speaking":
            if isinstance(value.get("title"), str):
                result.append(Paragraph(inline_markup(value["title"]), styles["BodyX"]))
            visible = value.get("candidateVisible") if isinstance(value.get("candidateVisible"), dict) else value
            cue_card = visible.get("part2CueCard") if isinstance(visible, dict) else None
            if isinstance(cue_card, dict):
                result.append(Paragraph("Part 2", styles["H2X"]))
                card_title = cue_card.get("title") or "Cue card"
                result.append(Paragraph(inline_markup(str(card_title)), styles["H3X"]))
                result.extend(render_instructions(cue_card.get("instruction")))
                result.extend(render_instructions(cue_card.get("bullets") or cue_card.get("points")))
                result.extend(render_instructions(cue_card.get("finalPrompt") or cue_card.get("explain")))
                accommodation = visible.get("approvedAccessibilityAccommodation")
                if isinstance(accommodation, str):
                    result.append(Spacer(1, 2 * mm))
                    result.append(Paragraph(f"<b>Approved accommodation:</b> {inline_markup(accommodation)}", styles["SmallX"]))
                return result
            speaking_root = value.get("administeredSequence") if isinstance(value.get("administeredSequence"), dict) else value
            for part_number in (1, 2, 3):
                part = speaking_root.get(f"part{part_number}") if isinstance(speaking_root, dict) else None
                if not isinstance(part, dict):
                    continue
                result.append(Paragraph(f"Part {part_number}", styles["H2X"]))
                for key in ("opening", "openingExaminerTurn", "openingExaminerTurns"):
                    result.extend(render_instructions(part.get(key)))
                if part_number == 1:
                    groups = part.get("topicGroups") or part.get("topics") or []
                    if isinstance(groups, dict):
                        groups = list(groups.values())
                    for index, group in enumerate(groups, 1) if isinstance(groups, list) else []:
                        if not isinstance(group, dict):
                            continue
                        topic = group.get("topic") or group.get("title") or f"Topic {index}"
                        result.append(Paragraph(inline_markup(str(topic)), styles["H3X"]))
                        result.extend(render_instructions(group.get("topicTransition")))
                        result.extend(render_instructions(group.get("questions")))
                    result.extend(render_instructions(speaking_part1_direct_questions(part)))
                elif part_number == 2:
                    card = part.get("cueCard") or part.get("candidateCueCard") or part
                    if isinstance(card, dict):
                        card_title = card.get("title") or "Cue card"
                        result.append(Paragraph(inline_markup(str(card_title)), styles["H3X"]))
                        result.extend(render_instructions(card.get("instruction")))
                        if isinstance(card.get("prompt"), str):
                            result.append(Paragraph(f"<b>{inline_markup(card['prompt'])}</b>", styles["BodyX"]))
                        result.extend(render_instructions(card.get("bullets") or card.get("points")))
                        result.extend(render_instructions(card.get("explain") or card.get("finalPrompt")))
                    elif isinstance(card, list):
                        lines = [str(item).strip() for item in card if str(item).strip()]
                        if lines:
                            result.append(Paragraph(inline_markup(lines[0]), styles["H3X"]))
                        if len(lines) > 1:
                            result.append(Paragraph(inline_markup(lines[1]), styles["BodyX"]))
                        if len(lines) > 2:
                            result.extend(render_instructions(lines[2:]))
                    result.extend(render_instructions(part.get("roundingQuestions")))
                else:
                    if isinstance(part.get("topic"), str):
                        result.append(Paragraph(inline_markup(part["topic"]), styles["H3X"]))
                    result.extend(render_instructions(part.get("coreQuestions") or part.get("questions")))
                for key in ("closingExaminerTurn", "closing"):
                    result.extend(render_instructions(part.get(key)))
            if result:
                return result
        if module == "listening":
            if isinstance(value.get("listeningMaterial"), str):
                return emit_markdown(value["listeningMaterial"])
            result.extend(render_instructions(value.get("candidateInstructions") or value.get("instructions")))
            questions = value.get("questions") if isinstance(value.get("questions"), list) else []
            groups = value.get("questionGroups") if isinstance(value.get("questionGroups"), list) else []
            parts = {str(part.get("part")): part for part in value.get("parts", []) if isinstance(part, dict)}
            active_part = None
            rendered_map_parts: set[str] = set()
            listening_visual_used = False
            for group_index, group in enumerate(groups):
                if not isinstance(group, dict):
                    continue
                part_number = str(group.get("part") or "")
                part = parts.get(part_number, {})
                if part_number and part_number != active_part:
                    title_text = part.get("title") or part.get("label") or ""
                    base_heading = f"Part {part_number}"
                    heading = base_heading
                    if title_text and norm_key(str(title_text)) != norm_key(base_heading):
                        heading += f" - {title_text}"
                    result.append(Paragraph(inline_markup(heading), styles["H2X"]))
                    if isinstance(part.get("context"), str):
                        result.append(Paragraph(inline_markup(part["context"]), styles["BodyX"]))
                    active_part = part_number
                map_value = part.get("map")
                bounds = range_bounds(group.get("range"))
                # IELTS Listening maps and plans belong to Part 2. Some older
                # source projections omit the visual join key after candidate
                # sanitisation, so Part 2 is the fail-safe semantic anchor.
                has_bound_visual = (
                    bool(group.get("assetId"))
                    or isinstance(map_value, dict)
                    or (part_number == "2" and bounds is not None and bounds[0] >= 11)
                )
                if (has_bound_visual and listening_visual and listening_visual.is_file()
                        and not listening_visual_used):
                    result.extend([
                        Paragraph(inline_markup(str(
                            map_value.get("title") if isinstance(map_value, dict) else "Candidate map / plan"
                        )), styles["H3X"]),
                        visual_flowable(listening_visual, 165 * mm, 105 * mm),
                        Spacer(1, 3 * mm),
                    ])
                    listening_visual_used = True
                    rendered_map_parts.add(part_number)
                elif (isinstance(map_value, dict) and part_number not in rendered_map_parts and
                        bounds and bounds[0] >= 15):
                    result.append(Paragraph(inline_markup(str(map_value.get("title") or "Map")), styles["H3X"]))
                    if isinstance(map_value.get("asciiNotToScale"), str):
                        ascii_text = escape(map_value["asciiNotToScale"]).replace(" ", "&nbsp;").replace("\n", "<br/>")
                        result.append(Paragraph(f"<font name='Courier'>{ascii_text}</font>", styles["BodyX"]))
                    if isinstance(map_value.get("longDescription"), str):
                        result.append(Paragraph(inline_markup(map_value["longDescription"]), styles["SmallX"]))
                    rendered_map_parts.add(part_number)
                result.extend(render_question_group(
                    group,
                    questions,
                    keep_compact=group_index == len(groups) - 1,
                ))
            if not groups:
                for index, item in enumerate(questions, 1):
                    if isinstance(item, dict):
                        result.extend(render_question(item, index))
            return result
        return emit(value, 0, module)

    def answer_key_table(value: Any) -> list[Any]:
        if isinstance(value, str):
            return emit_markdown(value)
        if not isinstance(value, list):
            return emit(value, 0, "answerKey")
        rows: list[list[Any]] = [[Paragraph("<b>Question</b>", styles["BodyX"]),
                                  Paragraph("<b>Answer</b>", styles["BodyX"]),
                                  Paragraph("<b>Accepted variants</b>", styles["BodyX"])]]
        for index, item in enumerate(value, 1):
            if not isinstance(item, dict):
                continue
            number = question_number(item, index)
            answer = (item.get("answer") or item.get("correctAnswer") or item.get("correctOption") or
                      item.get("displayAnswer") or item.get("canonicalAnswer") or
                      item.get("normalizedAnswer") or item.get("canonical") or
                      item.get("value") or "")
            variants = item.get("acceptedVariants") or item.get("accepted") or []
            if isinstance(variants, list):
                answer_normalized = str(answer).strip().casefold()
                variants_text = ", ".join(
                    str(entry) for entry in variants
                    if str(entry).strip().casefold() != answer_normalized
                )
            else:
                variants_text = str(variants)
            rows.append([Paragraph(escape(str(number)), styles["BodyX"]),
                         Paragraph(inline_markup(str(answer)), styles["BodyX"]),
                         Paragraph(inline_markup(variants_text), styles["BodyX"])])
        table = Table(rows, colWidths=[22 * mm, 65 * mm, 73 * mm], repeatRows=1)
        table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                                   ("GRID", (0, 0), (-1, -1), 0.3, soft),
                                   ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2f9")),
                                   ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
                                   ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                                   ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
                                   ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm)]))
        return [table]

    def transcript_flow(value: Any) -> list[Any]:
        """Render only candidate-relevant dialogue from approved script structures."""
        if isinstance(value, str):
            return emit_markdown(value)

        result: list[Any] = []

        def dialogue_table(entries: list[Any]) -> None:
            rows: list[list[Any]] = []
            for entry in entries:
                if not isinstance(entry, dict):
                    continue
                speaker = entry.get("speaker") or entry.get("role") or entry.get("voice") or ""
                text = entry.get("text") or entry.get("utterance") or entry.get("line") or ""
                if not str(text).strip():
                    continue
                rows.append([
                    Paragraph(f"<b>{inline_markup(str(speaker))}</b>", styles["BodyX"]),
                    Paragraph(inline_markup(str(text)), styles["BodyX"]),
                ])
            if not rows:
                return
            table = Table(rows, colWidths=[27 * mm, 133 * mm], repeatRows=0)
            table.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.2, soft),
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f6f8fc")),
                ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 1.4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.4 * mm),
            ]))
            result.extend([table, Spacer(1, 2 * mm)])

        def walk(node: Any, fallback_part: int | None = None) -> None:
            if isinstance(node, list):
                if node and all(isinstance(item, dict) and
                                any(key in item for key in ("text", "utterance", "line")) for item in node):
                    dialogue_table(node)
                    return
                for index, item in enumerate(node, 1):
                    walk(item, index)
                return
            if not isinstance(node, dict):
                return

            entries = node.get("entries") or node.get("turns") or node.get("dialogue") or node.get("lines")
            if isinstance(entries, list):
                part = node.get("part") or node.get("section") or fallback_part
                context = node.get("context") or node.get("title") or node.get("label") or ""
                heading = f"Part {part}" if part not in (None, "") else "Transcript section"
                if context:
                    heading += f" - {context}"
                result.append(Paragraph(inline_markup(heading), styles["H3X"]))
                dialogue_table(entries)
                return

            if any(key in node for key in ("text", "utterance", "line")):
                dialogue_table([node])
                return

            for key in ("parts", "sections", "scripts", "transcripts", "transcript"):
                if key in node:
                    walk(node[key], fallback_part)

        walk(value)
        return result if result else emit(value, 0, "transcript")

    def private_module_flow(module: str, value: dict[str, Any]) -> list[Any]:
        result: list[Any] = []
        if "answerKey" in value:
            result.extend(answer_key_table(value["answerKey"]))
        for key in ("transcript", "transcripts", "scripts"):
            if key in value:
                result.extend([Spacer(1, 3 * mm), Paragraph("Listening transcript", styles["H2X"])])
                result.extend(transcript_flow(value[key]))
        if module == "speaking" and isinstance(value.get("examinerDelivered"), dict):
            result.extend([Paragraph("Examiner-delivered Speaking script", styles["H2X"])])
            result.extend(emit(value["examinerDelivered"], 0, "speaking"))
        if module == "speaking" and isinstance(value.get("examinerOnlyControls"), dict):
            result.extend([Spacer(1, 3 * mm), Paragraph("Examiner-only controls", styles["H2X"])])
            controls = value["examinerOnlyControls"]
            exact_repeat = controls.get("exactRepeatRule")
            if isinstance(exact_repeat, str):
                result.append(Paragraph(
                    f"<b>Exact repeat rule:</b> {inline_markup(exact_repeat)}", styles["BodyX"]
                ))
            result.extend(emit(
                {key: item for key, item in controls.items()
                 if key not in {"exactRepeatRule", "stopRules"}},
                0,
                "speaking",
            ))
            stop_rules = controls.get("stopRules")
            if isinstance(stop_rules, dict) and stop_rules:
                result.extend([PageBreak(), Paragraph("Stop rules", styles["H2X"])])
                for part, rule in stop_rules.items():
                    if isinstance(rule, str):
                        result.append(Paragraph(
                            f"<b>{inline_markup(label(str(part)))}:</b> {inline_markup(rule)}",
                            styles["BodyX"],
                        ))
        return result

    def section_heading(text: str) -> list[Any]:
        """Match the unboxed section treatment used by the Sets 1-20 PDF."""
        return [
            Paragraph(escape(text), styles["H1X"]),
            HRFlowable(
                width=14 * mm,
                thickness=1.4,
                color=red,
                spaceBefore=-2.5 * mm,
                spaceAfter=3 * mm,
                hAlign="LEFT",
            ),
        ]

    rendered_modules = 0
    for module in MODULES:
        if module not in modules or not modules[module]:
            continue
        # The historical worksheet starts Listening on page one, directly
        # below the usage note. Later modules begin on a clean page.
        if rendered_modules:
            story.append(PageBreak())
        story.extend(section_heading(module.title()))
        if not private and module == "listening":
            story.append(Paragraph("Use the separately supplied audio. Write one response for each question.", styles["BodyX"]))
        if private:
            story.extend(private_module_flow(module, modules[module]))
        else:
            story.extend(candidate_module_flow(module, modules[module]))
        rendered_modules += 1

    if not private:
        story.append(PageBreak())
        story.extend(section_heading("Objective answer sheets"))
        for module in ("Listening", "Reading"):
            story.append(Paragraph(module, styles["H2X"]))
            rows = []
            for left in range(1, 21):
                right = left + 20
                rows.append([
                    Paragraph(f"<b>{left}</b>", styles["SmallX"]), "",
                    Paragraph(f"<b>{right}</b>", styles["SmallX"]), "",
                ])
            table = Table(rows, colWidths=[10 * mm, 67 * mm, 10 * mm, 67 * mm], rowHeights=[8 * mm] * 20)
            table.setStyle(TableStyle([
                ("GRID", (0, 0), (1, -1), 0.35, soft),
                ("GRID", (2, 0), (3, -1), 0.35, soft),
                ("BACKGROUND", (0, 0), (0, -1), pale_blue),
                ("BACKGROUND", (2, 0), (2, -1), pale_blue),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
            ]))
            story.append(table)
            if module == "Listening":
                story.append(PageBreak())
        story.append(PageBreak())
        story.extend(section_heading("Writing response paper"))
        for task, pages in ((1, 2), (2, 3)):
            for page in range(pages):
                story.append(Paragraph(f"Task {task} - response page {page + 1} of {pages}", styles["H2X"]))
                lines = [[""] for _ in range(28)]
                table = Table(lines, colWidths=[165 * mm], rowHeights=[7 * mm] * 28)
                table.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 0.3, soft)]))
                story.append(table)
                if not (task == 2 and page == pages - 1):
                    story.append(PageBreak())
        story.append(PageBreak())
        story.extend(section_heading("Speaking notes"))
        story.append(Paragraph("Use notes only for the permitted preparation time.", styles["BodyX"]))
        table = Table([[""] for _ in range(30)], colWidths=[165 * mm], rowHeights=[7 * mm] * 30)
        table.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 0.3, soft)]))
        story.append(table)

    doc = WeLearnDoc(str(output))
    doc.build(story)


def extract_pdf_text(path: Path) -> str:
    from pypdf import PdfReader
    return "\n".join(page.extract_text() or "" for page in PdfReader(str(path)).pages)


def build_set(
    workspace: Path,
    batch: dict[str, Any],
    output_root: Path,
    set_number: int,
    *,
    plan_only: bool,
    visual_root: Path | None = None,
) -> dict[str, Any]:
    bindings, assembly_path = resolve_sources(workspace, batch, set_number)
    sources = {module: load_content(binding.path, module) for module, binding in bindings.items()}
    candidate = {module: project_candidate(sources[module], module) for module in MODULES}
    private = {module: private_projection(sources[module], module) for module in MODULES}

    if set_number == 21:
        listening_dir = workspace / "outputs/ielts-production/set-21/listening"
        key_path = listening_dir / "answer-key-source.md"
        transcript_path = listening_dir / "transcript.md"
        if key_path.is_file():
            private["listening"]["answerKey"] = key_path.read_text(encoding="utf-8")
        if transcript_path.is_file():
            private["listening"]["transcript"] = transcript_path.read_text(encoding="utf-8")

    for module, projection in candidate.items():
        hits = leak_paths(projection)
        if hits:
            raise ValueError(f"Set {set_number} {module}: candidate leak paths: {hits[:8]}")
    if not private["listening"].get("answerKey") or not any(k in private["listening"] for k in ("scripts", "transcript", "transcripts")):
        raise ValueError(f"Set {set_number}: private Listening packet lacks answer key or transcript/scripts")
    if not private["reading"].get("answerKey"):
        raise ValueError(f"Set {set_number}: private Reading packet lacks answer key")

    set_output = output_root / f"set-{set_number:02d}"
    candidate_pdf = set_output / f"ielts-academic-set-{set_number:02d}-candidate-workbook.pdf"
    private_pdf = set_output / f"ielts-academic-set-{set_number:02d}-PRIVATE-STAFF-key-transcript.pdf"
    visual = resolve_writing_visual(workspace, set_number)
    listening_visual = resolve_listening_visual(workspace, set_number, sources["listening"])
    reading_visual = resolve_reading_visual(workspace, set_number, sources["reading"])
    if visual_root:
        writing_override_png = visual_root / "charts" / f"set{set_number}-task1.png"
        writing_override = visual_root / "charts" / f"set{set_number}-task1.svg"
        listening_override = visual_root / "listening" / f"set{set_number}-part2-map.svg"
        # A browser-rasterised companion is preferred when an SVG embeds a
        # font that the PDF rasteriser cannot interpret faithfully (Set 21).
        if writing_override_png.is_file():
            visual = writing_override_png
        elif writing_override.is_file():
            visual = writing_override
        if listening_override.is_file():
            listening_visual = listening_override

    result: dict[str, Any] = {
        "set": set_number,
        "status": "PLAN_VALIDATED" if plan_only else "STAGED_PRIVATE_PDFS",
        "assemblyManifest": ({"path": str(assembly_path), "sha256": sha256_file(assembly_path)} if assembly_path else None),
        "sources": {
            module: {
                "path": str(binding.path), "sha256": binding.sha256,
                "expectedSha256": binding.expected_sha256, "provenance": binding.provenance,
                "candidateProjectionSha256": sha256_json(candidate[module]),
                "privateProjectionSha256": sha256_json(private[module]),
            }
            for module, binding in bindings.items()
        },
        "writingVisual": ({"path": str(visual), "sha256": sha256_file(visual)} if visual else None),
        "listeningVisual": ({"path": str(listening_visual), "sha256": sha256_file(listening_visual)} if listening_visual else None),
        "readingVisual": ({"path": str(reading_visual), "sha256": sha256_file(reading_visual)} if reading_visual else None),
        "antiLeak": {"status": "PASS", "candidateForbiddenPaths": []},
        "artifacts": {
            "candidatePdf": {"path": str(candidate_pdf), "status": "PLANNED"},
            "privateStaffPdf": {"path": str(private_pdf), "status": "PLANNED"},
        },
    }

    if not plan_only:
        render_pdf(candidate_pdf, title=f"IELTS Academic Set {set_number}", subtitle="Candidate workbook",
                   set_number=set_number, modules=candidate, source_bindings=bindings, private=False,
                   writing_visual=visual, listening_visual=listening_visual, reading_visual=reading_visual)
        render_pdf(private_pdf, title=f"IELTS Academic Set {set_number}", subtitle="PRIVATE STAFF answer key and Listening transcript",
                   set_number=set_number, modules=private, source_bindings=bindings, private=True)
        candidate_text = extract_pdf_text(candidate_pdf)
        private_text = extract_pdf_text(private_pdf)
        # "Choose the correct answer" is legitimate candidate-facing IELTS
        # instruction copy, so the generic words "Correct answer" cannot be
        # treated as staff-data leakage. Structural private-field checks above
        # still fail closed on actual answer payloads.
        forbidden_labels = ("Answer key", "Listening transcript", "Accepted variants")
        leaks = [token for token in forbidden_labels if token.lower() in candidate_text.lower()]
        if leaks:
            candidate_pdf.unlink(missing_ok=True)
            private_pdf.unlink(missing_ok=True)
            raise ValueError(f"Set {set_number}: extracted candidate PDF contains private labels: {leaks}")
        for required in (f"IELTS Academic Set {set_number}", "Listening", "Reading", "Writing", "Speaking"):
            if required.lower() not in candidate_text.lower():
                raise ValueError(f"Set {set_number}: candidate PDF missing extracted text {required!r}")
        if "answer key" not in private_text.lower() or "transcript" not in private_text.lower():
            raise ValueError(f"Set {set_number}: private PDF is missing key/transcript labeling")
        result["artifacts"] = {
            "candidatePdf": {"path": str(candidate_pdf), "sha256": sha256_file(candidate_pdf), "bytes": candidate_pdf.stat().st_size, "status": "STAGED"},
            "privateStaffPdf": {"path": str(private_pdf), "sha256": sha256_file(private_pdf), "bytes": private_pdf.stat().st_size, "status": "STAGED"},
        }
        result["extractedTextChecks"] = {"candidate": "PASS", "privateStaff": "PASS"}

    set_output.mkdir(parents=True, exist_ok=True)
    manifest_path = set_output / "package-manifest.json"
    manifest_path.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    result["packageManifest"] = {"path": str(manifest_path), "sha256": sha256_file(manifest_path)}
    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", type=Path, default=DEFAULT_WORKSPACE)
    parser.add_argument("--batch", type=Path, default=DEFAULT_BATCH)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--first", type=int, default=21)
    parser.add_argument("--last", type=int, default=40)
    parser.add_argument("--plan-only", action="store_true")
    parser.add_argument("--aggregate-existing", action="store_true", help="Validate 20 completed set packages and write the final batch manifest")
    parser.add_argument("--visual-root", type=Path, help="Optional approved public asset root containing charts/ and listening/")
    parser.add_argument("--ignore-audio-process", action="store_true", help="Emergency override; not for the 16 GB production host")
    return parser.parse_args()


def aggregate_existing(output: Path, batch_path: Path, first: int, last: int) -> dict[str, Any]:
    results: list[dict[str, Any]] = []
    pdfs: list[dict[str, Any]] = []
    for set_number in range(first, last + 1):
        manifest_path = output / f"set-{set_number:02d}/package-manifest.json"
        if not manifest_path.is_file():
            raise ValueError(f"Set {set_number}: package manifest is missing")
        item = load_json(manifest_path)
        if item.get("status") != "STAGED_PRIVATE_PDFS":
            raise ValueError(f"Set {set_number}: package status is not STAGED_PRIVATE_PDFS")
        for role in ("candidatePdf", "privateStaffPdf"):
            artifact = item.get("artifacts", {}).get(role, {})
            path = Path(artifact.get("path", ""))
            if not path.is_file():
                raise ValueError(f"Set {set_number} {role}: PDF is missing")
            observed = sha256_file(path)
            if observed != artifact.get("sha256"):
                raise ValueError(f"Set {set_number} {role}: PDF hash mismatch")
            pdfs.append({"set": set_number, "role": role, "path": str(path), "sha256": observed, "bytes": path.stat().st_size})
        results.append(item)
    expected_count = (last - first + 1) * 2
    if len(pdfs) != expected_count:
        raise ValueError(f"Expected {expected_count} PDFs, observed {len(pdfs)}")
    return {
        "schemaVersion": "1.0.0",
        "artifactType": "ielts-private-pdf-staging-batch",
        "createdAt": utc_now(),
        "status": "STAGED_PRIVATE_PDFS",
        "publicationAuthorized": False,
        "outputRoot": str(output),
        "batchSource": {"path": str(batch_path.resolve()), "sha256": sha256_file(batch_path)},
        "range": [first, last],
        "pdfCount": len(pdfs),
        "pdfs": pdfs,
        "sets": results,
        "gate": {
            "sourceHashes": "PASS",
            "candidatePrivateSeparation": "PASS",
            "candidateAntiLeak": "PASS",
            "pdfOpenAndExtract": "PASS",
            "visualPixelReview": "PENDING_INDEPENDENT_REVIEW",
            "release": "PENDING_HUMAN",
        },
    }


def main() -> int:
    args = parse_args()
    if not (21 <= args.first <= args.last <= 40):
        raise SystemExit("Range must be inside Sets 21-40")
    if not args.batch.is_file():
        raise SystemExit(f"Batch manifest not found: {args.batch}")
    output = args.output.resolve()
    public_root = (Path(__file__).resolve().parents[1] / "public").resolve()
    if output == public_root or public_root in output.parents:
        raise SystemExit("Refusing to write private packages under public/")
    if args.aggregate_existing:
        output.mkdir(parents=True, exist_ok=True)
        manifest = aggregate_existing(output, args.batch, args.first, args.last)
        manifest_path = output / "batch-package-manifest.json"
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Aggregated {manifest['pdfCount']} PDFs: {manifest_path}")
        return 0
    if not args.plan_only and chatterbox_running() and not args.ignore_audio_process:
        raise SystemExit("Chatterbox/audio rendering is active; PDF generation is deferred to protect the 16 GB host")

    batch = load_json(args.batch)
    output.mkdir(parents=True, exist_ok=True)
    results = []
    for set_number in range(args.first, args.last + 1):
        results.append(build_set(
            args.workspace.resolve(), batch, output, set_number,
            plan_only=args.plan_only,
            visual_root=args.visual_root.resolve() if args.visual_root else None,
        ))
        print(f"Set {set_number}: {results[-1]['status']}", flush=True)

    batch_manifest = {
        "schemaVersion": "1.0.0",
        "artifactType": "ielts-private-pdf-staging-batch",
        "createdAt": utc_now(),
        "status": "PLAN_VALIDATED" if args.plan_only else "STAGED_PRIVATE_PDFS",
        "publicationAuthorized": False,
        "outputRoot": str(output),
        "batchSource": {"path": str(args.batch.resolve()), "sha256": sha256_file(args.batch)},
        "range": [args.first, args.last],
        "pdfCount": 0 if args.plan_only else len(results) * 2,
        "sets": results,
        "gate": {
            "sourceHashes": "PASS",
            "candidatePrivateSeparation": "PASS",
            "candidateAntiLeak": "PASS",
            "pdfOpenAndExtract": "NOT_RUN_PLAN_ONLY" if args.plan_only else "PASS",
            "visualPixelReview": "PENDING_INDEPENDENT_REVIEW",
            "release": "PENDING_HUMAN",
        },
    }
    manifest_name = "batch-plan-manifest.json" if args.plan_only else f"batch-package-manifest-{args.first:02d}-{args.last:02d}.json"
    manifest_path = output / manifest_name
    manifest_path.write_text(json.dumps(batch_manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Manifest: {manifest_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
