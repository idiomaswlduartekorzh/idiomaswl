#!/usr/bin/env python3
"""Verify Goethe's audible three-tone cues against the video timeline (stdlib only)."""
import array
import json
import math
import pathlib
import subprocess
import sys

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


for number in map(int, sys.argv[1:] or [8]):
    config = json.loads((ROOT / f'config/exam-videos/goethe-a1-{number}.json').read_text())
    audio_dir = (ROOT / config['audio']).parent
    part_lengths = [float(subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        str(audio_dir / f'hoeren-teil{part}.mp3')
    ])) for part in (1, 2, 3)]
    assert abs(config['parts'][1] - (part_lengths[0] + 2)) <= 0.05
    assert abs(config['parts'][2] - (part_lengths[0] + part_lengths[1] + 4)) <= 0.05
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
    timeline_path = ROOT / f'output/youtube/goethe-a1-{number}-listening/timeline.json'
    if timeline_path.exists():
        timeline = json.loads(timeline_path.read_text())
        scenes = timeline['scenes']
        assert [(scene['start'], scene['end']) for scene in scenes[:2]] == [(0, 3), (3, 8)]
        assert all(abs(a['end'] - b['start']) < 0.001 for a, b in zip(scenes, scenes[1:]))
        pages = [scene for scene in scenes if scene['name'].startswith('page-')]
        assert len(pages) == 19
        assert abs(pages[1]['start'] - (8 + config['cues'][0])) < 0.001
        for question in range(1, 16):
            index = question + (1 if question <= 6 else 2 if question <= 10 else 3)
            assert abs(pages[index]['start'] - (8 + config['firstCueByQuestion'][str(question)])) < 0.001
        assert abs(pages[8]['start'] - (8 + config['parts'][1])) < 0.001
        assert abs(pages[13]['start'] - (8 + config['parts'][2])) < 0.001
        assert [len(part['answers']) for part in timeline['answerKey']] == [6, 4, 5]
    print(f'A1 Set {number}: 28 cues and 15 question transitions verified.')
