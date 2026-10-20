#!/usr/bin/env python3
"""Generate English A1-B1 grammar audio with Chatterbox Multilingual V3."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import random
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
SOURCE_AUDIO = ROOT / 'public' / 'audio' / 'historias' / 'ingles' / 'the-interpreter' / 'b.mp3'
DATA = ROOT / 'tmp' / 'english-grammar-audio' / 'tracks.json'
CHANGED = ROOT / 'tmp' / 'english-grammar-audio' / 'changed-tracks.json'
TMP = ROOT / 'tmp' / 'english-grammar-audio' / 'renders'
REFERENCE = TMP / 'english-standard-female-reference.flac'

os.environ.setdefault('HF_HOME', str(ENGINE / 'hf-cache'))
os.environ.setdefault('TORCH_HOME', str(ENGINE / 'torch-cache'))
os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')
os.environ.setdefault('TOKENIZERS_PARALLELISM', 'false')
sys.path.insert(0, str(APP))

from core import get_model  # noqa: E402

SETTINGS = {
    'language_id': 'en',
    't3_model': 'v3',
    'exaggeration': 0.32,
    'cfg_weight': 0.38,
    'temperature': 0.66,
    'repetition_penalty': 1.25,
    'min_p': 0.05,
    'top_p': 0.95,
    'target_lufs': -18.0,
    'true_peak_ceiling_dbfs': -2.2,
    'encoding_peak_safety_margin_db': 0.5,
    'output_sample_rate': 44100,
    'delivery_bitrate': 128000,
}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--level', choices=['a1', 'a2', 'b1'])
    parser.add_argument('--slug')
    parser.add_argument('--track', choices=['modelo-estructura', 'contraste-guiado', 'practica-contexto'])
    parser.add_argument('--changed', action='store_true')
    parser.add_argument('--limit', type=int)
    parser.add_argument('--force', action='store_true')
    return parser.parse_args()


def fade_edges(wav, sample_rate, milliseconds=8):
    frames = min(int(sample_rate * milliseconds / 1000), wav.shape[-1] // 2)
    if frames:
        wav[..., :frames] *= torch.linspace(0, 1, frames)
        wav[..., -frames:] *= torch.linspace(1, 0, frames)
    return wav


def normalize(wav, sample_rate):
    audio = wav.squeeze(0).numpy().astype(np.float64)
    ceiling = 10 ** ((SETTINGS['true_peak_ceiling_dbfs'] - SETTINGS['encoding_peak_safety_margin_db']) / 20)
    meter = pyln.Meter(sample_rate)
    for _ in range(4):
        measured = meter.integrated_loudness(audio)
        if np.isfinite(measured):
            audio = pyln.normalize.loudness(audio, measured, SETTINGS['target_lufs'])
        audio = np.clip(audio, -ceiling, ceiling)
    return torch.from_numpy(audio.astype(np.float32)).unsqueeze(0)


def build_reference():
    if REFERENCE.is_file():
        return
    audio, sample_rate = librosa.load(SOURCE_AUDIO, sr=24000, mono=True)
    first = audio[int(.25 * sample_rate):int(4.5 * sample_rate)]
    second = audio[int(6.0 * sample_rate):int(10.0 * sample_rate)]
    silence = np.zeros(int(.2 * sample_rate), dtype=np.float32)
    joined = np.concatenate([first, silence, second]).astype(np.float32)
    joined /= max(1.0, float(np.max(np.abs(joined))) / .88)
    torchaudio.save(str(REFERENCE), torch.from_numpy(joined).unsqueeze(0), sample_rate)


def encode_delivery(wav_path, delivery_path):
    delivery_path.unlink(missing_ok=True)
    subprocess.run(['/usr/bin/afconvert', str(wav_path), str(delivery_path), '-f', 'm4af', '-d', 'aac', '-b', str(SETTINGS['delivery_bitrate']), '-q', '127', '-s', '0', '-c', '1'], check=True)


def stable_seed(level, slug, track_id):
    return int.from_bytes(hashlib.sha256(f'{level}/{slug}/{track_id}'.encode()).digest()[:4], 'big') & 0x7FFFFFFF


def main():
    args = parse_args()
    if not DATA.is_file() or not SOURCE_AUDIO.is_file() or not APP.is_dir():
        raise FileNotFoundError('Falta el manifiesto, la voz de referencia o Chatterbox.')
    lessons = json.loads(DATA.read_text(encoding='utf-8'))['lessons']
    if args.level:
        lessons = [lesson for lesson in lessons if lesson['level'] == args.level]
    if args.slug:
        lessons = [lesson for lesson in lessons if lesson['slug'] == args.slug]
    jobs = [(lesson, track) for lesson in lessons for track in lesson['tracks']]
    if args.changed:
        changed = json.loads(CHANGED.read_text(encoding='utf-8'))
        changed_keys = {(item['level'], item['slug'], item['track']) for item in changed}
        jobs = [(lesson, track) for lesson, track in jobs if (lesson['level'], lesson['slug'], track['id']) in changed_keys]
    if args.track:
        jobs = [(lesson, track) for lesson, track in jobs if track['id'] == args.track]
    if args.limit:
        jobs = jobs[:args.limit]
    if not jobs:
        raise RuntimeError('No hay pistas para este filtro.')
    TMP.mkdir(parents=True, exist_ok=True)
    build_reference()
    pending = []
    for lesson, track in jobs:
        delivery = ROOT / 'public' / 'audio' / 'ingles' / lesson['level'] / 'grammar' / lesson['slug'] / f"{track['id']}.m4a"
        if args.force or not delivery.is_file() or delivery.stat().st_size < 20000:
            pending.append((lesson, track, delivery))
    print(f'TOTAL {len(jobs)} · PENDIENTES {len(pending)}', flush=True)
    if pending:
        model = get_model(print)
        model.prepare_conditionals(str(REFERENCE), exaggeration=SETTINGS['exaggeration'])
        conditioned_voice = model.conds
        for index, (lesson, track, delivery) in enumerate(pending, 1):
            seed = stable_seed(lesson['level'], lesson['slug'], track['id'])
            random.seed(seed)
            np.random.seed(seed)
            torch.manual_seed(seed)
            model.conds = conditioned_voice
            delivery.parent.mkdir(parents=True, exist_ok=True)
            wav_path = TMP / f"{lesson['level']}-{lesson['slug']}-{track['id']}.wav"
            print(f"RENDER {index}/{len(pending)} {lesson['level'].upper()} {lesson['slug']} · {track['title']}: {track['text']}", flush=True)
            wav = model.generate(track['text'], language_id=SETTINGS['language_id'], exaggeration=SETTINGS['exaggeration'], cfg_weight=SETTINGS['cfg_weight'], temperature=SETTINGS['temperature'], repetition_penalty=SETTINGS['repetition_penalty'], min_p=SETTINGS['min_p'], top_p=SETTINGS['top_p']).detach().cpu()
            if wav.ndim == 1:
                wav = wav.unsqueeze(0)
            wav = torchaudio.functional.resample(fade_edges(wav, model.sr), model.sr, SETTINGS['output_sample_rate'])
            wav = normalize(wav, SETTINGS['output_sample_rate'])
            duration = wav.shape[-1] / SETTINGS['output_sample_rate']
            if not 1.0 <= duration <= 60:
                raise RuntimeError(f'Duración anómala ({duration:.2f}s): {lesson["slug"]}/{track["id"]}')
            torchaudio.save(str(wav_path), wav, SETTINGS['output_sample_rate'], encoding='PCM_S', bits_per_sample=16)
            encode_delivery(wav_path, delivery)
            wav_path.unlink(missing_ok=True)
            if torch.backends.mps.is_available():
                torch.mps.empty_cache()
    for lesson in lessons:
        out = ROOT / 'public' / 'audio' / 'ingles' / lesson['level'] / 'grammar' / lesson['slug']
        if not out.is_dir():
            continue
        tracks = []
        for track in lesson['tracks']:
            delivery = out / f"{track['id']}.m4a"
            if delivery.is_file():
                tracks.append({**track, 'file': delivery.name, 'bytes': delivery.stat().st_size})
        manifest = {'status': 'production' if len(tracks) == len(lesson['tracks']) else 'partial', 'engine': 'Chatterbox Multilingual V3', 'voice': {'language': 'en', 'profile': 'adult female, clear native English, classroom pacing', 'reference_source': str(SOURCE_AUDIO.relative_to(ROOT)), 'reference_segments_seconds': [[.25, 4.5], [6.0, 10.0]]}, 'settings': SETTINGS, 'codec': 'AAC in M4A, mono, 44.1 kHz, 128 kbps', 'tracks': tracks}
        (out / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'LISTO {len(jobs) - len(pending)} existentes + {len(pending)} generadas', flush=True)


if __name__ == '__main__':
    main()
