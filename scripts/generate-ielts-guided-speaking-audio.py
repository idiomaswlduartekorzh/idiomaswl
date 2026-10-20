#!/usr/bin/env python3
"""Generate the two IELTS guided Speaking references with Chatterbox.

The committed generated-status file stays false until both WAV files have been
created and validated. This keeps the UI from exposing incomplete audio.
"""

from __future__ import annotations

import argparse
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
        "--confirm-voice-rights",
        action="store_true",
        default=os.environ.get("CHATTERBOX_VOICE_RIGHTS_CONFIRMED") == "1",
        help="Confirm that WeLearn has permission to clone/use the reference voice.",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Validate the production plan/status without loading Chatterbox or generating audio.",
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


def validate_manifest(manifest: dict[str, Any]) -> None:
    if manifest.get("engine") != "ResembleAI/chatterbox":
        raise ValueError("The manifest must target ResembleAI/chatterbox.")
    if manifest.get("model") != "ChatterboxTTS" or manifest.get("language") != "en":
        raise ValueError("This batch must use the English ChatterboxTTS model.")
    items = manifest.get("items")
    if not isinstance(items, list) or {item.get("band") for item in items} != {"5.5", "9.0"}:
        raise ValueError("The manifest must contain exactly the 5.5 and 9.0 examples.")
    for item in items:
        output = str(item.get("output", ""))
        resolved_output = (PROJECT_ROOT / output).resolve()
        approved_directory = (PROJECT_ROOT / "public/audio/ielts").resolve()
        if approved_directory not in resolved_output.parents or not output.endswith(".wav"):
            raise ValueError(f"Unsafe or unsupported output path: {output}")
        if not str(item.get("text", "")).strip():
            raise ValueError(f"Missing text for band {item.get('band')}")


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


def validate_status() -> None:
    status = load_status()
    if not status.get("ready"):
        manifest = load_json(DEFAULT_MANIFEST)
        orphaned = [
            PROJECT_ROOT / item["output"]
            for item in manifest["items"]
            if (PROJECT_ROOT / item["output"]).exists()
        ]
        if orphaned:
            raise ValueError(
                "Audio files exist while the generated status is pending: "
                + ", ".join(str(path) for path in orphaned)
            )
        print("Plan valid. Audio is intentionally pending Chatterbox generation.")
        return
    for band, details in status["files"].items():
        path = PROJECT_ROOT / str(details["url"]).lstrip("/")
        if not details.get("ready") or not path.is_file() or path.stat().st_size < 44:
            raise ValueError(f"Status marks band {band} ready but the WAV is missing or empty: {path}")
    print("Plan and generated audio status are valid.")


def main() -> int:
    args = parse_args()
    manifest_path = args.manifest.resolve()
    manifest = load_json(manifest_path)
    validate_manifest(manifest)

    defaults = manifest["generationDefaults"]
    for item in manifest["items"]:
        chunks = split_text(item["text"], int(defaults["chunkMaxCharacters"]))
        print(f"Band {item['band']}: {len(chunks)} chunks, {len(item['text'])} characters")

    if args.check:
        validate_status()
        return 0

    if not args.voice_prompt:
        raise ValueError("Provide --voice-prompt or CHATTERBOX_VOICE_PROMPT.")
    voice_prompt = args.voice_prompt.expanduser().resolve()
    if not voice_prompt.is_file():
        raise FileNotFoundError(f"Reference voice not found: {voice_prompt}")
    if not args.confirm_voice_rights:
        raise PermissionError("Pass --confirm-voice-rights after confirming permission to use the voice.")

    destinations = [PROJECT_ROOT / item["output"] for item in manifest["items"]]
    existing = [path for path in destinations if path.exists()]
    if existing and not args.overwrite:
        raise FileExistsError(
            "Refusing to overwrite existing audio. Review it first or rerun with --overwrite: "
            + ", ".join(str(path) for path in existing)
        )

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
        for item in manifest["items"]:
            random.seed(int(defaults["seed"]))
            torch.manual_seed(int(defaults["seed"]))
            if torch.cuda.is_available():
                torch.cuda.manual_seed_all(int(defaults["seed"]))

            chunks = split_text(item["text"], int(defaults["chunkMaxCharacters"]))
            rendered = []
            for index, chunk in enumerate(chunks):
                print(f"  Band {item['band']} · chunk {index + 1}/{len(chunks)}")
                wav = model.generate(
                    chunk,
                    audio_prompt_path=str(voice_prompt) if index == 0 else None,
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
                raise ValueError(f"Band {item['band']} produced silent or invalid samples.")
            duration = final_wav.shape[1] / model.sr
            if not float(item["minimumDurationSeconds"]) <= duration <= float(item["maximumDurationSeconds"]):
                raise ValueError(
                    f"Band {item['band']} duration {duration:.1f}s is outside the approved range "
                    f"{item['minimumDurationSeconds']}–{item['maximumDurationSeconds']}s."
                )

            temp_output = temp_dir / Path(item["output"]).name
            ta.save(str(temp_output), final_wav, model.sr)
            staged.append((item, temp_output, duration))

        status_files: dict[str, Any] = {}
        for item, temp_output, duration in staged:
            destination = PROJECT_ROOT / item["output"]
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(temp_output, destination)
            status_files[item["band"]] = {
                "ready": True,
                "url": item["publicUrl"],
                "durationSeconds": round(duration, 2),
                "sampleRate": model.sr,
                "sha256": sha256(destination),
            }

    status = {
        "schemaVersion": 1,
        "ready": True,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "engine": manifest["engine"],
        "files": status_files,
    }
    STATUS_PATH.write_text(
        STATUS_PREFIX + json.dumps(status, indent=2, ensure_ascii=False) + STATUS_SUFFIX,
        encoding="utf-8",
    )
    print("Both WAV files passed duration checks; the guided UI is now audio-ready.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (FileNotFoundError, PermissionError, RuntimeError, ValueError) as error:
        print(f"Error: {error}", file=sys.stderr)
        raise SystemExit(1)
