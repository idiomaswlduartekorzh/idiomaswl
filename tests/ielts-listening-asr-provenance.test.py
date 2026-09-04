"""Stdlib-only provenance mutation tests; all fixtures stay on the USB workspace."""

import contextlib
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).absolute().parent.parent
spec = importlib.util.spec_from_file_location("private_asr", ROOT / "scripts/transcribe-ielts-listening-candidate.py")
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)
RESULT = {"language": "en", "text": "Private test transcript.",
          "segments": [{"id": 0, "start": 0.0, "end": 1.0, "text": "Private test transcript."}]}
RUNTIME = {"python": "test", "implementation": "fake", "torch": "fake", "numpy": "fake",
           "ffmpeg": {"binaryPath": "fake", "sha256": "f" * 64, "bytes": 1}}


class ProvenanceTest(unittest.TestCase):
    def setUp(self):
        fixture_root = ROOT / "tmp/ielts-asr-tests"
        fixture_root.mkdir(parents=True, exist_ok=True)
        self.fixture = tempfile.TemporaryDirectory(dir=fixture_root)
        self.root = Path(self.fixture.name)
        self.candidate_id = "welearn-listening-part-2-001"
        self.source = self.root / "docs/ielts-superhub/candidates" / self.candidate_id / f"{self.candidate_id}.mp3"
        self.source.parent.mkdir(parents=True)
        self.source.write_bytes(b"original-test-audio")
        self.model = self.root / "small.pt"
        self.model.write_bytes(b"fake-local-model")
        self.model_hash = hashlib.sha256(self.model.read_bytes()).hexdigest()
        self.old_pycache, self.old_temp = sys.pycache_prefix, tempfile.tempdir
        self.environment = patch.dict(os.environ)
        self.environment.start()

    def tearDown(self):
        self.environment.stop()
        sys.pycache_prefix, tempfile.tempdir = self.old_pycache, self.old_temp
        self.fixture.cleanup()

    def backend(self, change=None, digest=None):
        def factory(model, run):
            self.assertEqual(model, self.model)
            def transcribe(snapshot, options):
                self.assertEqual(snapshot.read_bytes(), b"original-test-audio")
                self.assertEqual(options, runner.OPTIONS)
                if change:
                    change(snapshot)
                return RESULT
            return digest or self.model_hash, "fake-test-only", transcribe, RUNTIME
        return factory

    def run_candidate(self, backend=None):
        return runner.transcribe_candidate(self.root, 2, self.model, backend or self.backend())

    def test_binds_input_output_model_and_options_without_approval(self):
        run, provenance = self.run_candidate()
        self.assertEqual(provenance["inputAudioSha256"], hashlib.sha256(self.source.read_bytes()).hexdigest())
        self.assertEqual(provenance["input"]["sha256"], provenance["inputAudioSha256"])
        self.assertEqual((run / "input.mp3").read_bytes(), self.source.read_bytes())
        self.assertEqual(provenance["output"], {"path": "asr.json", **runner.fingerprint(run / "asr.json")})
        self.assertEqual(provenance["engine"]["modelSha256"], self.model_hash)
        self.assertEqual(provenance["script"], {"path": "scripts/transcribe-ielts-listening-candidate.py",
                                               **runner.fingerprint(Path(runner.__file__))})
        self.assertEqual(provenance["options"], runner.OPTIONS)
        self.assertEqual(provenance["runtime"], RUNTIME)
        self.assertIsNone(provenance["review"]["humanApproval"])
        self.assertEqual(provenance["review"]["publicationDecision"], "BLOCK")
        self.assertEqual(json.loads((run / "asr.json").read_text()), RESULT)
        self.assertEqual(json.loads((run / "provenance.json").read_text()), provenance)
        for name in ("TMPDIR", "XDG_CACHE_HOME", "NUMBA_CACHE_DIR", "PYTHONPYCACHEPREFIX"):
            self.assertTrue(Path(os.environ[name]).is_relative_to(run))

    def test_changed_source_snapshot_and_model_never_complete(self):
        for target, code in ((self.source, "INPUT_CHANGED"), (None, "SNAPSHOT_CHANGED"), (self.model, "MODEL_CHANGED")):
            with self.subTest(code=code):
                self.source.write_bytes(b"original-test-audio")
                self.model.write_bytes(b"fake-local-model")
                with self.assertRaisesRegex(ValueError, code):
                    self.run_candidate(self.backend(change=lambda snapshot: (target or snapshot).write_bytes(b"changed")))
        self.assertEqual(list((self.root / "tmp/ielts-asr-runs").glob("*/provenance.json")), [])

    def test_wrong_model_digest_rejected_before_transcribing(self):
        with self.assertRaisesRegex(ValueError, "MODEL_SHA256_MISMATCH"):
            self.run_candidate(self.backend(change=lambda _: self.fail("must not transcribe"), digest="0" * 64))

    def test_file_and_parent_symlinks_rejected(self):
        for target in (self.source, self.source.parent, self.model):
            with self.subTest(target=target):
                original = target.with_name(target.name + "-original")
                target.rename(original)
                target.symlink_to(original, target_is_directory=original.is_dir())
                try:
                    with self.assertRaisesRegex(ValueError, "SYMLINK_NOT_ALLOWED"):
                        self.run_candidate()
                finally:
                    target.unlink()
                    original.rename(target)

    def test_output_root_symlink_rejected(self):
        outside = self.root / "elsewhere"
        outside.mkdir()
        (self.root / "tmp").symlink_to(outside, target_is_directory=True)
        with self.assertRaisesRegex(ValueError, "SYMLINK_NOT_ALLOWED"):
            self.run_candidate()
        self.assertEqual(list(outside.iterdir()), [])

    def test_each_run_is_new_and_existing_files_cannot_be_overwritten(self):
        first, _ = self.run_candidate()
        old_bytes = (first / "provenance.json").read_bytes()
        second, _ = self.run_candidate()
        self.assertNotEqual(first, second)
        self.assertEqual((first / "provenance.json").read_bytes(), old_bytes)
        with self.assertRaises(FileExistsError):
            runner.write_new(first / "asr.json", b"replacement")

    def test_backend_streams_are_suppressed_in_success_and_failure(self):
        for failure in (False, True):
            with self.subTest(failure=failure):
                output, errors = io.StringIO(), io.StringIO()
                def emit(_):
                    print("private transcript")
                    print("private transcript", file=sys.stderr)
                    if failure:
                        raise RuntimeError("private exception")
                with contextlib.redirect_stdout(output), contextlib.redirect_stderr(errors):
                    if failure:
                        with self.assertRaises(RuntimeError):
                            self.run_candidate(self.backend(change=emit))
                    else:
                        self.run_candidate(self.backend(change=emit))
                self.assertEqual(output.getvalue(), "")
                self.assertEqual(errors.getvalue(), "")

    def test_invalid_parts_and_invalid_asr_fail_closed(self):
        for part in (1, 5, True, "2"):
            with self.assertRaisesRegex(ValueError, "PRIVATE_PART_REQUIRED"):
                runner.transcribe_candidate(self.root, part, self.model, self.backend())
        for bad in ({}, {**RESULT, "language": "fr"}, {**RESULT, "segments": []},
                    {**RESULT, "segments": [{"text": "bad", "start": 2, "end": 1}]},
                    {**RESULT, "segments": [{"text": "bad", "start": float("nan"), "end": 1}]}):
            with self.assertRaises(ValueError):
                runner.checked_asr(bad)


if __name__ == "__main__":
    unittest.main()
