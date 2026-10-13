#!/usr/bin/env python3
"""Generate the final Hangeul A1 pronunciation pack with Chatterbox V3."""

from __future__ import annotations

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
SOURCE_AUDIO = ROOT / 'public' / 'audio' / 'coreano' / 'a1' / 'listening-01.mp3'
OUT = ROOT / 'public' / 'audio' / 'coreano' / 'a1' / 'grammar' / 'hangul-basico'
TMP = ROOT / 'tmp' / 'korean-hangul-audio'
REFERENCE = TMP / 'korean-standard-female-reference.flac'

os.environ.setdefault('HF_HOME', str(ENGINE / 'hf-cache'))
os.environ.setdefault('TORCH_HOME', str(ENGINE / 'torch-cache'))
os.environ.setdefault('PKUSEG_HOME', str(ENGINE / 'pkuseg-cache'))
os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')
os.environ.setdefault('TOKENIZERS_PARALLELISM', 'false')
sys.path.insert(0, str(APP))

from core import get_model  # noqa: E402


TRACKS = [
    {
        'id': 'modelo-silabas',
        'title': 'Modelo de sílabas',
        'text': '가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하.',
        'translation': 'Serie básica para escuchar el patrón consonante más vocal.',
        'seed': 5101,
    },
    {
        'id': 'vocales-basicas',
        'title': 'Vocales básicas',
        'text': '아, 어, 오, 우, 으, 이.',
        'translation': 'a, eo, o, u, eu, i',
        'seed': 5102,
    },
    {
        'id': 'palabras-basicas',
        'title': 'Palabras para leer',
        'text': '아이. 어디. 오늘. 우리. 이름. 한글.',
        'translation': 'niño; dónde; hoy; nosotros; nombre; hangeúl',
        'seed': 5103,
    },
    {
        'id': 'frases-iniciales',
        'title': 'Primeras frases',
        'text': '안녕하세요. 감사합니다. 저는 한국어를 공부해요.',
        'translation': 'Hola. Gracias. Estudio coreano.',
        'seed': 5104,
    },
]

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
    'output_sample_rate': 44100,
    'delivery_bitrate': 128000,
}


def fade_edges(wav: torch.Tensor, sample_rate: int, milliseconds: int = 8) -> torch.Tensor:
    frames = min(int(sample_rate * milliseconds / 1000), wav.shape[-1] // 2)
    if frames:
        wav[..., :frames] *= torch.linspace(0, 1, frames)
        wav[..., -frames:] *= torch.linspace(1, 0, frames)
    return wav


def normalize(wav: torch.Tensor, sample_rate: int) -> torch.Tensor:
    audio = wav.squeeze(0).numpy().astype(np.float64)
    measured = pyln.Meter(sample_rate).integrated_loudness(audio)
    if np.isfinite(measured):
        audio = pyln.normalize.loudness(audio, measured, SETTINGS['target_lufs'])
    ceiling = 10 ** (SETTINGS['true_peak_ceiling_dbfs'] / 20)
    peak = float(np.max(np.abs(audio)))
    if peak > ceiling:
        audio *= ceiling / peak
    return torch.from_numpy(audio.astype(np.float32)).unsqueeze(0)


def build_reference() -> None:
    audio, sample_rate = librosa.load(SOURCE_AUDIO, sr=24000, mono=True)
    first = audio[int(0.00 * sample_rate):int(3.90 * sample_rate)]
    second = audio[int(19.75 * sample_rate):int(23.95 * sample_rate)]
    silence = np.zeros(int(0.22 * sample_rate), dtype=np.float32)
    joined = np.concatenate([first, silence, second]).astype(np.float32)
    joined /= max(1.0, float(np.max(np.abs(joined))) / 0.88)
    torchaudio.save(str(REFERENCE), torch.from_numpy(joined).unsqueeze(0), sample_rate)


def encode_delivery(wav_path: Path, delivery_path: Path) -> None:
    subprocess.run(
        [
            '/usr/bin/afconvert', str(wav_path), str(delivery_path),
            '-f', 'm4af', '-d', 'aac', '-b', str(SETTINGS['delivery_bitrate']),
            '-q', '127', '-s', '0', '-c', '1',
        ],
        check=True,
    )


def main() -> None:
    if not SOURCE_AUDIO.is_file():
        raise FileNotFoundError(SOURCE_AUDIO)
    if not APP.is_dir() or not ENGINE.is_dir():
        raise FileNotFoundError('No se encontró la instalación local aprobada de Chatterbox.')

    OUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    build_reference()

    model = get_model(print)
    model.prepare_conditionals(str(REFERENCE), exaggeration=SETTINGS['exaggeration'])
    conditioned_voice = model.conds
    rendered = []

    for index, track in enumerate(TRACKS, 1):
        random.seed(track['seed'])
        np.random.seed(track['seed'])
        torch.manual_seed(track['seed'])
        model.conds = conditioned_voice
        wav_path = TMP / f"{track['id']}.wav"
        delivery_path = OUT / f"{track['id']}.m4a"
        print(f"RENDER {index}/{len(TRACKS)} {track['title']}: {track['text']}", flush=True)
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
        wav = normalize(fade_edges(wav, model.sr), model.sr)
        wav = torchaudio.functional.resample(wav, model.sr, SETTINGS['output_sample_rate'])
        torchaudio.save(str(wav_path), wav, SETTINGS['output_sample_rate'], encoding='PCM_S', bits_per_sample=16)
        encode_delivery(wav_path, delivery_path)
        rendered.append({
            **track,
            'file': delivery_path.name,
            'duration_seconds': round(wav.shape[-1] / SETTINGS['output_sample_rate'], 3),
            'bytes': delivery_path.stat().st_size,
        })
        if torch.backends.mps.is_available():
            torch.mps.empty_cache()

    manifest = {
        'status': 'production',
        'engine': 'Chatterbox Multilingual V3',
        'voice': {
            'language': 'ko',
            'profile': 'adult female, clear standard Korean, classroom pacing',
            'reference_source': str(SOURCE_AUDIO.relative_to(ROOT)),
            'reference_segments_seconds': [[0.0, 3.9], [19.75, 23.95]],
        },
        'settings': SETTINGS,
        'codec': 'AAC in M4A, mono, 44.1 kHz, 128 kbps',
        'tracks': rendered,
    }
    (OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(manifest, ensure_ascii=False, indent=2), flush=True)


if __name__ == '__main__':
    main()
