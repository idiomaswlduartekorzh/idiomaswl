#!/usr/bin/env python3
"""Validate every Korean grammar delivery file and its production manifest."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

import librosa
import numpy as np
import pyloudnorm as pyln


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'tmp' / 'korean-grammar-audio' / 'tracks.json'
AUDIO_ROOT = ROOT / 'public' / 'audio' / 'coreano'


def afinfo(path: Path) -> str:
    return subprocess.run(['/usr/bin/afinfo', str(path)], check=True, capture_output=True, text=True).stdout


def main() -> None:
    lessons = json.loads(DATA.read_text(encoding='utf-8'))['lessons']
    expected = [
        AUDIO_ROOT / lesson['level'] / 'grammar' / lesson['slug'] / f"{track['id']}.m4a"
        for lesson in lessons for track in lesson['tracks']
    ]
    expected.extend(sorted((AUDIO_ROOT / 'a1' / 'grammar' / 'hangul-basico').glob('*.m4a')))
    if len(expected) != 181:
        raise RuntimeError(f'Se esperaban 181 pistas y el manifiesto describe {len(expected)}.')

    durations = []
    loudness_values = []
    peaks = []
    for index, path in enumerate(expected, 1):
        if not path.is_file() or path.stat().st_size < 20_000:
            raise RuntimeError(f'Archivo ausente o demasiado pequeño: {path}')
        metadata = afinfo(path)
        if '44100 Hz, aac' not in metadata or '1 ch' not in metadata:
            raise RuntimeError(f'Formato inesperado: {path}')
        audio, sample_rate = librosa.load(path, sr=None, mono=True)
        duration = len(audio) / sample_rate
        loudness = pyln.Meter(sample_rate).integrated_loudness(audio)
        peak = 20 * np.log10(max(float(np.max(np.abs(audio))), 1e-12))
        if not 1.5 <= duration <= 60:
            raise RuntimeError(f'Duración fuera de rango ({duration:.2f}s): {path}')
        is_approved_hangul = 'hangul-basico' in path.parts
        loudness_floor = -19.2 if is_approved_hangul else -18.35
        peak_ceiling = -1.8 if is_approved_hangul else -2.15
        if not loudness_floor <= loudness <= -17.65:
            raise RuntimeError(f'Sonoridad fuera de rango ({loudness:.2f} LUFS): {path}')
        if peak > peak_ceiling:
            raise RuntimeError(f'Pico sobre el límite ({peak:.2f} dBFS): {path}')
        durations.append(duration)
        loudness_values.append(loudness)
        peaks.append(peak)
        if index % 25 == 0:
            print(f'VALIDADAS {index}/{len(expected)}', flush=True)

    lesson_manifests = [
        AUDIO_ROOT / lesson['level'] / 'grammar' / lesson['slug'] / 'manifest.json'
        for lesson in lessons
    ]
    lesson_manifests.append(AUDIO_ROOT / 'a1' / 'grammar' / 'hangul-basico' / 'manifest.json')
    for manifest_path in lesson_manifests:
        manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
        if manifest['status'] != 'production' or manifest['voice']['language'] != 'ko':
            raise RuntimeError(f'Manifiesto incompleto: {manifest_path}')

    print(json.dumps({
        'tracks': len(expected),
        'manifests': len(lesson_manifests),
        'duration_total_minutes': round(sum(durations) / 60, 2),
        'duration_range_seconds': [round(min(durations), 2), round(max(durations), 2)],
        'loudness_range_lufs': [round(min(loudness_values), 2), round(max(loudness_values), 2)],
        'highest_peak_dbfs': round(max(peaks), 2),
    }, indent=2))


if __name__ == '__main__':
    main()
