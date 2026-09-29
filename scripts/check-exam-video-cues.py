#!/usr/bin/env python3
"""Verify Goethe's audible three-tone cues against the video timeline (stdlib only)."""
import array
import json
import math
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
rate, window = 8000, 800


def tone_power(frame, frequency):
    k = round(frequency * window / rate)
    coefficient = 2 * math.cos(2 * math.pi * k / window)
    a = b = 0
    for sample in frame:
        value = sample + coefficient * a - b
        b, a = a, value
    return a * a + b * b - coefficient * a * b


for number in range(1, 8):
    config = json.loads((ROOT / f'config/exam-videos/goethe-a1-{number}.json').read_text())
    raw = subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(ROOT / config['audio']),
        '-ar', '8000', '-ac', '1', '-f', 's16le', '-'
    ])
    samples = array.array('h')
    samples.frombytes(raw)
    hits = []
    for position in range(0, len(samples) - window, window):
        frame = samples[position:position + window]
        energy = sum(sample * sample for sample in frame)
        if energy < 10_000_000:
            continue
        strengths = [2 * tone_power(frame, frequency) / energy / window for frequency in (990, 831, 698)]
        if max(strengths) > 0.35:
            hits.append(position / rate)

    detected = []
    for timestamp in hits:
        if not detected or timestamp - detected[-1][-1] > 0.25:
            detected.append([])
        detected[-1].append(timestamp)
    detected = [group[0] for group in detected if len(group) >= 15]
    expected = config['cues']
    assert len(detected) == len(expected) == 28, f'Set {number}: {len(detected)} vs {len(expected)} cues'
    for index, (actual, planned) in enumerate(zip(detected, expected), 1):
        assert abs(actual - planned) <= 0.15, f'Set {number} cue {index}: {actual:.2f}s vs {planned:.2f}s'
    assert set(map(int, config['firstCueByQuestion'])) == set(range(1, 16))
    assert config['parts'][1] < config['firstCueByQuestion']['7']
    assert config['parts'][2] < config['firstCueByQuestion']['11']
    print(f'A1 Set {number}: 28 cues and 15 question transitions verified.')
