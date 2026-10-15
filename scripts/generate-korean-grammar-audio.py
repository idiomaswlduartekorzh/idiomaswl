#!/usr/bin/env python3
"""Generate Korean A1-B1 grammar audio with the approved Chatterbox V3 voice."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import random
import shutil
import subprocess
import sys
from pathlib import Path

import librosa
import numpy as np
import pyloudnorm as pyln
import torch
import torchaudio


ROOT = Path(__file__).resolve().parents[1]
ENGINE_ROOT = Path('/Users/ddev/Documents/Codex/2026-10-02/pu')
ENGINE = ENGINE_ROOT / 'work' / 'chatterbox-engine'
APP = ENGINE_ROOT / 'outputs' / 'chatterbox-local'
SOURCE_AUDIO = ROOT / 'public' / 'audio' / 'coreano' / 'a1' / 'listening-01.mp3'
DATA = ROOT / 'tmp' / 'korean-grammar-audio' / 'tracks.json'
TMP = ROOT / 'tmp' / 'korean-grammar-audio' / 'renders'
REFERENCE = TMP / 'korean-standard-female-reference.flac'

os.environ.setdefault('HF_HOME', str(ENGINE / 'hf-cache'))
os.environ.setdefault('TORCH_HOME', str(ENGINE / 'torch-cache'))
os.environ.setdefault('PKUSEG_HOME', str(ENGINE / 'pkuseg-cache'))
os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')
os.environ.setdefault('TOKENIZERS_PARALLELISM', 'false')
sys.path.insert(0, str(APP))

from core import get_model  # noqa: E402


SETTINGS = {
    'language_id': 'ko',
    't3_model': 'v3',
    'exaggeration': 0.36,
    'cfg_weight': 0.34,
    'temperature': 0.68,
    'repetition_penalty': 1.25,
    'min_p': 0.05,
    'top_p': 0.95,
    'target_lufs': -18.0,
    'true_peak_ceiling_dbfs': -2.2,
    'encoding_peak_safety_margin_db': 0.5,
    'output_sample_rate': 44100,
    'delivery_bitrate': 128000,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument('--level', choices=['a1', 'a2', 'b1'])
    parser.add_argument('--slug')
    parser.add_argument('--limit', type=int)
    parser.add_argument('--force', action='store_true')
    return parser.parse_args()


def fade_edges(wav: torch.Tensor, sample_rate: int, milliseconds: int = 8) -> torch.Tensor:
    frames = min(int(sample_rate * milliseconds / 1000), wav.shape[-1] // 2)
    if frames:
        wav[..., :frames] *= torch.linspace(0, 1, frames)
        wav[..., -frames:] *= torch.linspace(1, 0, frames)
    return wav


def normalize(wav: torch.Tensor, sample_rate: int) -> torch.Tensor:
    audio = wav.squeeze(0).numpy().astype(np.float64)
    ceiling_dbfs = SETTINGS['true_peak_ceiling_dbfs'] - SETTINGS['encoding_peak_safety_margin_db']
    ceiling = 10 ** (ceiling_dbfs / 20)
    meter = pyln.Meter(sample_rate)
    for _ in range(4):
        measured = meter.integrated_loudness(audio)
        if np.isfinite(measured):
            audio = pyln.normalize.loudness(audio, measured, SETTINGS['target_lufs'])
        audio = np.clip(audio, -ceiling, ceiling)
    return torch.from_numpy(audio.astype(np.float32)).unsqueeze(0)


def build_reference() -> None:
    if REFERENCE.is_file():
        return
    audio, sample_rate = librosa.load(SOURCE_AUDIO, sr=24000, mono=True)
    first = audio[int(0.00 * sample_rate):int(3.90 * sample_rate)]
    second = audio[int(19.75 * sample_rate):int(23.95 * sample_rate)]
    silence = np.zeros(int(0.22 * sample_rate), dtype=np.float32)
    joined = np.concatenate([first, silence, second]).astype(np.float32)
    joined /= max(1.0, float(np.max(np.abs(joined))) / 0.88)
    torchaudio.save(str(REFERENCE), torch.from_numpy(joined).unsqueeze(0), sample_rate)


def encode_delivery(wav_path: Path, delivery_path: Path) -> None:
    delivery_path.unlink(missing_ok=True)
    subprocess.run([
        '/usr/bin/afconvert', str(wav_path), str(delivery_path),
        '-f', 'm4af', '-d', 'aac', '-b', str(SETTINGS['delivery_bitrate']),
        '-q', '127', '-s', '0', '-c', '1',
    ], check=True)


def stable_seed(level: str, slug: str, track_id: str) -> int:
    digest = hashlib.sha256(f'{level}/{slug}/{track_id}'.encode()).digest()
    return int.from_bytes(digest[:4], 'big') & 0x7FFFFFFF


def main() -> None:
    args = parse_args()
    if not DATA.is_file():
        raise FileNotFoundError(f'Primero exporta el manifiesto: {DATA}')
    if not SOURCE_AUDIO.is_file() or not APP.is_dir() or not ENGINE.is_dir():
        raise FileNotFoundError('No se encontró la fuente o la instalación local aprobada de Chatterbox.')

    lessons = json.loads(DATA.read_text(encoding='utf-8'))['lessons']
    if args.level:
        lessons = [lesson for lesson in lessons if lesson['level'] == args.level]
    if args.slug:
        lessons = [lesson for lesson in lessons if lesson['slug'] == args.slug]
    jobs = [(lesson, track) for lesson in lessons for track in lesson['tracks']]
    if args.limit:
        jobs = jobs[:args.limit]
    if not jobs:
        raise RuntimeError('No hay pistas que coincidan con el filtro.')

    TMP.mkdir(parents=True, exist_ok=True)
    build_reference()
    pending = []
    for lesson, track in jobs:
        delivery = ROOT / 'public' / 'audio' / 'coreano' / lesson['level'] / 'grammar' / lesson['slug'] / f"{track['id']}.m4a"
        if args.force or not delivery.is_file() or delivery.stat().st_size < 20_000:
            pending.append((lesson, track, delivery))
    print(f'TOTAL {len(jobs)} · PENDIENTES {len(pending)}', flush=True)

    if pending:
        model = get_model(print)
        model.prepare_conditionals(str(REFERENCE), exaggeration=SETTINGS['exaggeration'])
        conditioned_voice = model.conds
        for index, (lesson, track, delivery_path) in enumerate(pending, 1):
            seed = stable_seed(lesson['level'], lesson['slug'], track['id'])
            random.seed(seed)
            np.random.seed(seed)
            torch.manual_seed(seed)
            model.conds = conditioned_voice
            delivery_path.parent.mkdir(parents=True, exist_ok=True)
            wav_path = TMP / f"{lesson['level']}-{lesson['slug']}-{track['id']}.wav"
            print(f"RENDER {index}/{len(pending)} {lesson['level'].upper()} {lesson['slug']} · {track['title']}: {track['text']}", flush=True)
            wav = model.generate(
                track['text'],
                language_id=SETTINGS['language_id'],
                exaggeration=SETTINGS['exaggeration'],
                cfg_weight=SETTINGS['cfg_weight'],
                temperature=SETTINGS['temperature'],
                repetition_penalty=SETTINGS['repetition_penalty'],
                min_p=SETTINGS['min_p'],
                top_p=SETTINGS['top_p'],
            ).detach().cpu()
            if wav.ndim == 1:
                wav = wav.unsqueeze(0)
            wav = fade_edges(wav, model.sr)
            wav = torchaudio.functional.resample(wav, model.sr, SETTINGS['output_sample_rate'])
            wav = normalize(wav, SETTINGS['output_sample_rate'])
            duration = wav.shape[-1] / SETTINGS['output_sample_rate']
            if not 1.5 <= duration <= 60:
                raise RuntimeError(f'Duración anómala ({duration:.2f}s): {lesson["slug"]}/{track["id"]}')
            torchaudio.save(str(wav_path), wav, SETTINGS['output_sample_rate'], encoding='PCM_S', bits_per_sample=16)
            encode_delivery(wav_path, delivery_path)
            wav_path.unlink(missing_ok=True)
            if torch.backends.mps.is_available():
                torch.mps.empty_cache()

    for lesson in lessons:
        out = ROOT / 'public' / 'audio' / 'coreano' / lesson['level'] / 'grammar' / lesson['slug']
        if not out.is_dir():
            continue
        tracks = []
        for track in lesson['tracks']:
            delivery = out / f"{track['id']}.m4a"
            if delivery.is_file():
                tracks.append({**track, 'file': delivery.name, 'bytes': delivery.stat().st_size})
        manifest = {
            'status': 'production' if len(tracks) == len(lesson['tracks']) else 'partial',
            'engine': 'Chatterbox Multilingual V3',
            'voice': {
                'language': 'ko',
                'profile': 'adult female, clear standard Korean, classroom pacing',
                'reference_source': str(SOURCE_AUDIO.relative_to(ROOT)),
                'reference_segments_seconds': [[0.0, 3.9], [19.75, 23.95]],
            },
            'settings': SETTINGS,
            'codec': 'AAC in M4A, mono, 44.1 kHz, 128 kbps',
            'tracks': tracks,
        }
        (out / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    shutil.rmtree(TMP / '__pycache__', ignore_errors=True)
    print(f'LISTO {len(jobs) - len(pending)} existentes + {len(pending)} generadas', flush=True)


if __name__ == '__main__':
    main()
