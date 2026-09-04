#!/usr/bin/env python3
"""Offline, private Whisper evidence. Never promotes a candidate or edits its manifest."""

import argparse
import contextlib
from datetime import datetime, timezone
import hashlib
import importlib.metadata
import io
import json
import math
import os
from pathlib import Path
import re
import shutil
import stat
import sys
import tempfile
from urllib.parse import urlparse

OPTIONS = {"device": "cpu", "threads": 2, "fp16": False, "language": "en",
           "task": "transcribe", "temperature": 0, "verbose": False}


def no_symlinks(path):
    """Inspect the lexical path, not a resolved path that hides links."""
    path = Path(os.path.abspath(path))
    for item in (*reversed(path.parents), path):
        try:
            if stat.S_ISLNK(item.lstat().st_mode):
                raise ValueError("SYMLINK_NOT_ALLOWED")
        except FileNotFoundError:
            pass
    return path


def file_bytes(path):
    path = no_symlinks(path)
    with os.fdopen(os.open(path, os.O_RDONLY | os.O_NOFOLLOW), "rb") as handle:
        if not stat.S_ISREG(os.fstat(handle.fileno()).st_mode):
            raise ValueError("REGULAR_FILE_REQUIRED")
        return handle.read()


def fingerprint(path):
    path = no_symlinks(path)
    digest, size = hashlib.sha256(), 0
    with os.fdopen(os.open(path, os.O_RDONLY | os.O_NOFOLLOW), "rb") as handle:
        if not stat.S_ISREG(os.fstat(handle.fileno()).st_mode):
            raise ValueError("REGULAR_FILE_REQUIRED")
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
            size += len(chunk)
    return {"sha256": digest.hexdigest(), "bytes": size}


def write_new(path, data):
    no_symlinks(path)
    with open(path, "xb") as handle:
        handle.write(data)


def private_runtime(run_dir):
    for name in ("temp", "cache", "pycache", "numba"):
        (run_dir / name).mkdir(mode=0o700)
    locations = {"TMPDIR": "temp", "TMP": "temp", "TEMP": "temp",
                 "XDG_CACHE_HOME": "cache", "PYTHONPYCACHEPREFIX": "pycache",
                 "NUMBA_CACHE_DIR": "numba"}
    os.environ.update({key: str(run_dir / value) for key, value in locations.items()})
    os.environ.update({"OMP_NUM_THREADS": "2", "MKL_NUM_THREADS": "2",
                       "OPENBLAS_NUM_THREADS": "2", "HF_HUB_OFFLINE": "1"})
    sys.pycache_prefix = str(run_dir / "pycache")
    tempfile.tempdir = str(run_dir / "temp")


def whisper_backend(model_path, run_dir):
    # Imports happen only after temp/compiler caches have been redirected to the USB.
    import torch
    import whisper
    import numpy

    model_url = urlparse(whisper._MODELS["small"])
    expected_hash = model_url.path.split("/")[-2]
    if model_url.scheme != "https" or not re.fullmatch(r"[a-f0-9]{64}", expected_hash):
        raise ValueError("OFFICIAL_MODEL_DIGEST_INVALID")
    torch.set_num_threads(2)
    ffmpeg_command = shutil.which("ffmpeg")
    if not ffmpeg_command:
        raise ValueError("FFMPEG_UNAVAILABLE")
    # Homebrew's command is normally a symlink: identify its real binary explicitly.
    ffmpeg_binary = Path(ffmpeg_command).resolve(strict=True)
    runtime = {"python": sys.version.split()[0], "implementation": sys.implementation.name,
               "torch": str(torch.__version__), "numpy": numpy.__version__,
               "ffmpeg": {"binaryPath": str(ffmpeg_binary), **fingerprint(ffmpeg_binary)}}

    def transcribe(snapshot, options):
        # A validated absolute local filename bypasses Whisper's model downloader.
        model = whisper.load_model(str(model_path), device="cpu",
                                   download_root=str(run_dir / "cache" / "models"))
        return model.transcribe(str(snapshot), **{
            key: value for key, value in options.items() if key not in ("device", "threads")
        })

    return expected_hash, importlib.metadata.version("openai-whisper"), transcribe, runtime


def checked_asr(result):
    if not isinstance(result, dict) or result.get("language") != "en":
        raise ValueError("ASR_LANGUAGE_INVALID")
    if not isinstance(result.get("text"), str) or not result["text"].strip():
        raise ValueError("ASR_TEXT_INVALID")
    segments = result.get("segments")
    if not isinstance(segments, list) or not segments:
        raise ValueError("ASR_SEGMENTS_INVALID")
    for segment in segments:
        if not isinstance(segment, dict) or not isinstance(segment.get("text"), str):
            raise ValueError("ASR_SEGMENT_INVALID")
        times = [segment.get("start"), segment.get("end")]
        if any(type(value) not in (int, float) or not math.isfinite(value) for value in times):
            raise ValueError("ASR_TIMING_INVALID")
        if not 0 <= times[0] <= times[1]:
            raise ValueError("ASR_TIMING_INVALID")
    return {"language": "en", "text": result["text"], "segments": segments}


def json_bytes(value):
    return (json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n").encode()


def utc_now():
    return datetime.now(timezone.utc).isoformat()


def transcribe_candidate(root, part, model_path, backend_factory=whisper_backend):
    if type(part) is not int or part not in (2, 3, 4):
        raise ValueError("PRIVATE_PART_REQUIRED")
    root, model_path = no_symlinks(root), no_symlinks(model_path)
    candidate_id = f"welearn-listening-part-{part}-001"
    source = root / "docs/ielts-superhub/candidates" / candidate_id / f"{candidate_id}.mp3"
    source_bytes = file_bytes(source)
    if not source_bytes:
        raise ValueError("EMPTY_INPUT")
    source_fingerprint = {"sha256": hashlib.sha256(source_bytes).hexdigest(), "bytes": len(source_bytes)}
    model_fingerprint = fingerprint(model_path)
    script_fingerprint = fingerprint(Path(__file__))
    run_root = no_symlinks(root / "tmp/ielts-asr-runs")
    run_root.mkdir(parents=True, exist_ok=True, mode=0o700)
    no_symlinks(run_root)
    run_dir = Path(tempfile.mkdtemp(prefix=f"part-{part}-", dir=run_root))
    private_runtime(run_dir)
    snapshot = run_dir / "input.mp3"
    write_new(snapshot, source_bytes)
    started_at = utc_now()
    # Model imports, progress and failure paths must not expose private transcript.
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
        expected_hash, engine_version, transcriber, runtime = backend_factory(model_path, run_dir)
        if not re.fullmatch(r"[a-f0-9]{64}", expected_hash) or model_fingerprint["sha256"] != expected_hash:
            raise ValueError("MODEL_SHA256_MISMATCH")
        result = transcriber(snapshot, dict(OPTIONS))
    if fingerprint(source) != source_fingerprint:
        raise ValueError("INPUT_CHANGED_DURING_TRANSCRIPTION")
    if fingerprint(snapshot) != source_fingerprint:
        raise ValueError("SNAPSHOT_CHANGED_DURING_TRANSCRIPTION")
    if fingerprint(model_path) != model_fingerprint:
        raise ValueError("MODEL_CHANGED_DURING_TRANSCRIPTION")
    asr_path = run_dir / "asr.json"
    write_new(asr_path, json_bytes(checked_asr(result)))
    provenance = {
        "schemaVersion": 1, "candidateId": candidate_id,
        "startedAt": started_at, "completedAt": utc_now(),
        "engine": {"name": "openai-whisper", "version": engine_version,
                   "model": "small", "modelSha256": model_fingerprint["sha256"],
                   "modelBytes": model_fingerprint["bytes"]},
        "runtime": runtime,
        "script": {"path": "scripts/transcribe-ielts-listening-candidate.py", **script_fingerprint},
        "input": {"sourcePath": source.relative_to(root).as_posix(), "snapshotPath": "input.mp3",
                  **source_fingerprint},
        "inputAudioSha256": source_fingerprint["sha256"], "options": OPTIONS,
        "output": {"path": "asr.json", **fingerprint(asr_path)},
        "review": {"humanApproval": None, "publicationDecision": "BLOCK",
                   "limitation": "Machine transcription evidence only; not an accuracy or release approval."},
    }
    write_new(run_dir / "provenance.json", json_bytes(provenance))
    return run_dir, provenance


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--part", type=int, choices=(2, 3, 4), required=True)
    parser.add_argument("--model-path", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).absolute().parent.parent
    try:
        run_dir, provenance = transcribe_candidate(root, args.part, args.model_path)
    except Exception:
        # Library exception messages may contain transcript/input details. Fail closed.
        print(json.dumps({"status": "FAILED", "code": "PRIVATE_ASR_RUN_FAILED"}), file=sys.stderr)
        return 1
    print(json.dumps({"status": "COMPLETE", "runPath": str(run_dir.relative_to(root)),
                      "inputAudioSha256": provenance["inputAudioSha256"],
                      "publicationDecision": "BLOCK"}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
