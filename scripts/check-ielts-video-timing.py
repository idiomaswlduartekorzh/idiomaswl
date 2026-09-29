#!/usr/bin/env python3
"""Check that every configured IELTS card switch sits on a real audio pause."""
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
configs = sorted((ROOT / 'config/exam-videos').glob('ielts-set-*.json'))
assert len(configs) == 17, f'Expected 17 reviewed IELTS timelines, found {len(configs)}'
for file in configs:
    config = json.loads(file.read_text())
    audio = ROOT / config['audio']
    threshold = 20 if config['set'] == 'set-7' else 35
    result = subprocess.run([
        'ffmpeg', '-hide_banner', '-i', str(audio), '-af',
        f'silencedetect=noise=-35dB:d={threshold}', '-f', 'null', '-'
    ], capture_output=True, text=True, check=True)
    starts = [float(value) for value in re.findall(r'silence_start: ([\d.]+)', result.stderr)]
    ends = [float(value) for value in re.findall(r'silence_end: ([\d.]+)', result.stderr)]
    assert len(starts) == len(ends) == 11, f'{file.name}: {len(starts)} long pauses'
    actual = [0, starts[1], ends[2], starts[4], ends[5], starts[7], ends[8], starts[10]]
    planned = [page['at'] for page in config['pages']]
    assert len(planned) == 8
    for index, (found, target) in enumerate(zip(actual, planned), 1):
        assert abs(found - target) <= 0.03, f'{file.name} page {index}: {found:.3f}s vs {target:.3f}s'
    assert [page['part'] for page in config['pages']] == [1, 1, 2, 2, 3, 3, 4, 4]
    print(f'{config["set"]}: 8 pages matched to 11 audio pauses')
