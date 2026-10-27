#!/usr/bin/env python3
"""Audit the staged IELTS 21-40 PDFs, public bindings and visual assets."""

from __future__ import annotations

import argparse
import hashlib
import json
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def pdf_text(path: Path) -> tuple[str, list[int]]:
    reader = PdfReader(str(path))
    pages = [page.extract_text() or "" for page in reader.pages]
    near_blank = [index + 1 for index, text in enumerate(pages) if len("".join(text.split())) < 40]
    return "\n".join(pages), near_blank


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf-root", type=Path, required=True)
    parser.add_argument("--public-root", type=Path, required=True)
    parser.add_argument("--adapter-report", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument(
        "--independent-visual-review",
        choices=("PENDING", "PASS", "FAIL"),
        default="PENDING",
        help="Record the separately completed human/agent visual gate.",
    )
    args = parser.parse_args()

    adapter = json.loads(args.adapter_report.read_text(encoding="utf-8"))
    adapter_sets = {int(item["set"]): item for item in adapter["sets"]}
    aggregate = json.loads((args.pdf_root / "batch-package-manifest.json").read_text(encoding="utf-8"))
    failures: list[str] = []
    sets: list[dict[str, object]] = []

    for number in range(21, 41):
        package_path = args.pdf_root / f"set-{number:02d}" / "package-manifest.json"
        package = json.loads(package_path.read_text(encoding="utf-8"))
        candidate = Path(package["artifacts"]["candidatePdf"]["path"])
        staff = Path(package["artifacts"]["privateStaffPdf"]["path"])
        public_candidate = args.public_root / "downloads" / "ielts" / candidate.name
        audio = args.public_root / "audio" / "ielts" / f"ielts-listening-set-{number}.mp3"

        candidate_text, candidate_blank = pdf_text(candidate)
        staff_text, staff_blank = pdf_text(staff)
        required_candidate = (
            f"IELTS Academic Set {number}", "Listening", "Reading", "Writing", "Speaking",
            "Objective answer sheets", "Writing response paper", "Speaking notes",
        )
        missing_candidate = [token for token in required_candidate if token.lower() not in candidate_text.lower()]
        leaks = [token for token in ("PRIVATE STAFF", "Answer key", "Listening transcript") if token.lower() in candidate_text.lower()]
        missing_staff = [token for token in ("PRIVATE STAFF", "Answer key", "Listening transcript") if token.lower() not in staff_text.lower()]

        adapter_item = adapter_sets[number]
        parity_pass = all(
            value in {"40/40 -> 40/40", "3/3 -> 3/3", "2/2 -> 2/2"}
            for key, value in adapter_item["parity"].items()
            if key in {"listeningKeys", "listeningQuestions", "readingKeys", "readingQuestions", "speakingParts", "writingTasks"}
        )
        assets: list[dict[str, object]] = []
        for asset in adapter_item.get("assets", []):
            public_asset = args.public_root / asset["publicPath"].lstrip("/")
            try:
                ET.parse(public_asset)
                svg_status = "PASS"
            except (OSError, ET.ParseError):
                svg_status = "FAIL"
            assets.append({"role": asset["role"], "path": str(public_asset), "svg": svg_status})

        candidate_hash = sha256_file(candidate)
        staff_hash = sha256_file(staff)
        checks = {
            "candidateOpens": candidate.is_file(),
            "staffOpens": staff.is_file(),
            "candidateManifestHash": candidate_hash == package["artifacts"]["candidatePdf"]["sha256"],
            "staffManifestHash": staff_hash == package["artifacts"]["privateStaffPdf"]["sha256"],
            "publicCandidateHash": public_candidate.is_file() and sha256_file(public_candidate) == candidate_hash,
            "audioPresent": audio.is_file() and audio.stat().st_size > 0,
            "candidateRequiredSections": not missing_candidate,
            "candidateAntiLeak": not leaks,
            "staffRequiredSections": not missing_staff,
            "candidateNoNearBlankPages": not candidate_blank,
            "staffNoNearBlankPages": not staff_blank,
            "adapterParity": parity_pass,
            "assetsParse": all(asset["svg"] == "PASS" for asset in assets),
        }
        if not all(checks.values()):
            failures.append(f"Set {number}: " + ", ".join(key for key, passed in checks.items() if not passed))
        sets.append({
            "set": number,
            "status": "PASS" if all(checks.values()) else "FAIL",
            "checks": checks,
            "candidate": {"path": str(candidate), "sha256": candidate_hash, "pages": len(PdfReader(str(candidate)).pages)},
            "privateStaff": {"path": str(staff), "sha256": staff_hash, "pages": len(PdfReader(str(staff)).pages)},
            "audio": {"path": str(audio), "bytes": audio.stat().st_size if audio.is_file() else 0},
            "assets": assets,
            "diagnostics": {
                "candidateMissing": missing_candidate,
                "candidateLeaks": leaks,
                "staffMissing": missing_staff,
                "candidateNearBlankPages": candidate_blank,
                "staffNearBlankPages": staff_blank,
            },
        })

    report = {
        "schemaVersion": "1.0.0",
        "createdAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "status": "PASS" if not failures else "FAIL",
        "publicationAuthorized": False,
        "range": [21, 40],
        "pdfCount": aggregate.get("pdfCount"),
        "candidatePdfCount": 20,
        "privateStaffPdfCount": 20,
        "visualAssetCount": sum(len(item["assets"]) for item in sets),
        "failures": failures,
        "sets": sets,
        "gates": {
            "automatedTechnicalAndStructural": "PASS" if not failures else "FAIL",
            "independentVisualReview": args.independent_visual_review,
            "humanListeningAndEditorialQA": "PENDING",
            "release": "PENDING_HUMAN",
        },
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{report['status']}: audited {len(sets)} sets, {report['pdfCount']} PDFs and {report['visualAssetCount']} visual assets")
    print(args.output)
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())
