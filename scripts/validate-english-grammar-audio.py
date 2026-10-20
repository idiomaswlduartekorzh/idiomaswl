#!/usr/bin/env python3
"""Validate English grammar delivery audio and manifests."""

import json
import subprocess
from pathlib import Path

import librosa
import numpy as np
import pyloudnorm as pyln

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'tmp' / 'english-grammar-audio' / 'tracks.json'
AUDIO_ROOT = ROOT / 'public' / 'audio' / 'ingles'


def main():
    lessons = json.loads(DATA.read_text(encoding='utf-8'))['lessons']
    expected = [AUDIO_ROOT / lesson['level'] / 'grammar' / lesson['slug'] / f"{track['id']}.m4a" for lesson in lessons for track in lesson['tracks']]
    if len(expected) != 222:
        raise RuntimeError(f'Se esperaban 222 pistas, no {len(expected)}.')
    durations, loudness_values, peaks = [], [], []
    for index, path in enumerate(expected, 1):
        if not path.is_file() or path.stat().st_size < 20000:
            raise RuntimeError(f'Archivo ausente o pequeño: {path}')
        metadata = subprocess.run(['/usr/bin/afinfo', str(path)], check=True, capture_output=True, text=True).stdout
        if '44100 Hz, aac' not in metadata or '1 ch' not in metadata:
            raise RuntimeError(f'Formato inesperado: {path}')
        audio, sample_rate = librosa.load(path, sr=None, mono=True)
        duration = len(audio) / sample_rate
        loudness = pyln.Meter(sample_rate).integrated_loudness(audio)
        peak = 20 * np.log10(max(float(np.max(np.abs(audio))), 1e-12))
        if not 1.0 <= duration <= 60 or not -18.35 <= loudness <= -17.65 or peak > -2.15:
            raise RuntimeError(f'Audio fuera de especificación: {path} ({duration:.2f}s, {loudness:.2f} LUFS, {peak:.2f} dBFS)')
        durations.append(duration)
        loudness_values.append(loudness)
        peaks.append(peak)
        if index % 25 == 0:
            print(f'VALIDADAS {index}/{len(expected)}', flush=True)
    manifests = [AUDIO_ROOT / lesson['level'] / 'grammar' / lesson['slug'] / 'manifest.json' for lesson in lessons]
    for path in manifests:
        manifest = json.loads(path.read_text(encoding='utf-8'))
        if manifest['status'] != 'production' or manifest['voice']['language'] != 'en':
            raise RuntimeError(f'Manifiesto incompleto: {path}')
    print(json.dumps({'tracks': len(expected), 'manifests': len(manifests), 'duration_total_minutes': round(sum(durations) / 60, 2), 'duration_range_seconds': [round(min(durations), 2), round(max(durations), 2)], 'loudness_range_lufs': [round(min(loudness_values), 2), round(max(loudness_values), 2)], 'highest_peak_dbfs': round(max(peaks), 2)}, indent=2))


if __name__ == '__main__':
    main()
