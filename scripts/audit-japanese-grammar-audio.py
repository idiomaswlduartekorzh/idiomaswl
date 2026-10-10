#!/usr/bin/env python3
"""Transcribe all A2/B1 grammar clips locally and report Japanese similarity."""

import difflib
import json
import re
import subprocess
import tempfile
from pathlib import Path

import mlx_whisper
import numpy as np
from scipy.io import wavfile

ROOT = Path(__file__).resolve().parents[1]
MODEL = 'mlx-community/whisper-small-mlx'


def audio_text(model: str) -> str:
    clean = re.sub(r'\([^)]*[A-Za-zÁ-ÿ][^)]*\)', '', model)
    clean = re.sub(r'\s*=.*$', '', clean)
    return re.split(r'\s+/\s+|\s+—\s+', clean)[0].strip() or model


def normalize(text: str) -> str:
    return re.sub(r'[^ぁ-んァ-ヶ一-龯々ー]', '', text)


def transcribe(path: Path, temp: Path) -> str:
    wav_path = temp / f'{path.stem}.wav'
    subprocess.run(['/usr/bin/afconvert', str(path), str(wav_path), '-f', 'WAVE', '-d', 'LEI16@16000', '-c', '1'], check=True, capture_output=True)
    _, raw = wavfile.read(wav_path)
    audio = raw.astype(np.float32) / 32768
    return mlx_whisper.transcribe(audio, path_or_hf_repo=MODEL, language='ja', task='transcribe', temperature=0.0)['text'].strip()


rows = []
with tempfile.TemporaryDirectory(prefix='idiomaswl-ja-asr-') as directory:
    temp = Path(directory)
    for level in ('a2', 'b1'):
        topics = json.loads((ROOT / 'tmp' / f'japanese-grammar-{level}' / 'topics.json').read_text(encoding='utf-8'))
        for topic in topics:
            expected = audio_text(topic['guide']['model'])
            base = ROOT / 'public' / 'audio' / 'japones' / level / 'grammar' / topic['slug']
            path = base.with_suffix('.mp3') if base.with_suffix('.mp3').exists() else base.with_suffix('.m4a')
            heard = transcribe(path, temp)
            score = difflib.SequenceMatcher(None, normalize(expected), normalize(heard)).ratio()
            rows.append({'level': level, 'slug': topic['slug'], 'expected': expected, 'heard': heard, 'score': round(score, 3), 'provider': 'ElevenLabs' if path.suffix == '.mp3' else 'macOS Kyoko'})
            print(f"{level.upper()} {topic['slug']}: {score:.0%} · {heard}")

report = {'model': MODEL, 'count': len(rows), 'passed': sum(row['score'] >= .72 for row in rows), 'threshold': .72, 'rows': rows}
target = ROOT / 'tmp' / 'japanese-grammar-audio-audit.json'
target.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({key: report[key] for key in ('count', 'passed', 'threshold')}, ensure_ascii=False))
