#!/usr/bin/env python3
"""Render an ordered JSON list of IELTS dialogue turns with one loaded Piper voice."""

import argparse
import json
import wave
from pathlib import Path
import sys

from piper import PiperVoice, SynthesisConfig


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--config", required=True)
    parser.add_argument("--output-dir", required=True)
    args = parser.parse_args()

    payload = json.load(sys.stdin)
    turns = payload.get("turns")
    if not isinstance(turns, list) or not turns:
        raise ValueError("Expected a non-empty turns list on stdin")

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    voice = PiperVoice.load(args.model, config_path=args.config)

    for index, turn in enumerate(turns, start=1):
        if not isinstance(turn, dict) or not isinstance(turn.get("text"), str):
            raise ValueError(f"Invalid turn at position {index}")
        speaker_id = turn.get("speakerId")
        length_scale = turn.get("lengthScale")
        if not isinstance(speaker_id, int) or not isinstance(length_scale, (int, float)):
            raise ValueError(f"Invalid synthesis configuration at position {index}")

        output_path = output_dir / f"turn-{index:02d}.wav"
        with wave.open(str(output_path), "wb") as wav_file:
            voice.synthesize_wav(
                turn["text"],
                wav_file,
                SynthesisConfig(
                    speaker_id=speaker_id,
                    length_scale=float(length_scale),
                ),
            )


if __name__ == "__main__":
    main()
