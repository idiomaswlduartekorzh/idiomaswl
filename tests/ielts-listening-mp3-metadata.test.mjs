import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  Mp3MetadataError,
  inspectMp3Buffer,
  inspectMp3File,
  inspectMp3Metadata,
} from '../scripts/lib/inspect-mp3-metadata.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function syncSafe(value) {
  return Buffer.from([
    (value >> 21) & 0x7f,
    (value >> 14) & 0x7f,
    (value >> 7) & 0x7f,
    value & 0x7f,
  ]);
}

function id3v2Tag(payload = Buffer.from('test')) {
  return Buffer.concat([
    Buffer.from([0x49, 0x44, 0x33, 0x04, 0x00, 0x00]),
    syncSafe(payload.length),
    payload,
  ]);
}

function mpeg1Layer3Header({ bitrateIndex = 9, sampleRateIndex = 0, mono = true } = {}) {
  return Buffer.from([
    0xff,
    0xfb,
    (bitrateIndex << 4) | (sampleRateIndex << 2),
    mono ? 0xc0 : 0x00,
  ]);
}

function frameLength({ bitrateKbps = 128, sampleRateHz = 44_100, padding = 0 } = {}) {
  return Math.floor(144_000 * bitrateKbps / sampleRateHz) + padding;
}

function audioFrame(options = {}) {
  const length = options.length ?? frameLength(options);
  const frame = Buffer.alloc(length);
  mpeg1Layer3Header(options).copy(frame);
  return frame;
}

function syntheticFrameScanMp3({ frameCount = 4, id3 = true, id3v1 = false } = {}) {
  const frames = Array.from({ length: frameCount }, () => audioFrame());
  const trailingTag = id3v1
    ? Buffer.concat([Buffer.from('TAG'), Buffer.alloc(125)])
    : Buffer.alloc(0);
  return Buffer.concat([id3 ? id3v2Tag() : Buffer.alloc(0), ...frames, trailingTag]);
}

function syntheticInfoMp3({
  audioFrameCount = 3,
  declaredFrameCount = audioFrameCount,
  declaredByteCount,
  encoderDelaySamples = 576,
  encoderPaddingSamples = 288,
  marker = 'Info',
} = {}) {
  const physicalFrameCount = audioFrameCount + 1;
  const frames = Array.from({ length: physicalFrameCount }, () => audioFrame());
  const infoFrame = frames[0];
  const infoOffset = 4 + 17; // MPEG-1 Layer III mono side information.
  infoFrame.write(marker, infoOffset, 4, 'ascii');
  infoFrame.writeUInt32BE(0x03, infoOffset + 4); // frame and byte counts.
  infoFrame.writeUInt32BE(declaredFrameCount, infoOffset + 8);
  infoFrame.writeUInt32BE(
    declaredByteCount ?? frames.reduce((total, frame) => total + frame.length, 0),
    infoOffset + 12,
  );
  const encoderOffset = infoOffset + 16;
  infoFrame.write('Lavc-test', encoderOffset, 9, 'ascii');
  infoFrame[encoderOffset + 21] = encoderDelaySamples >> 4;
  infoFrame[encoderOffset + 22] = ((encoderDelaySamples & 0x0f) << 4) | (encoderPaddingSamples >> 8);
  infoFrame[encoderOffset + 23] = encoderPaddingSamples & 0xff;
  return Buffer.concat(frames);
}

function assertMetadataError(callback, code) {
  assert.throws(callback, (error) => error instanceof Mp3MetadataError && error.code === code);
}

test('reads the real Part 1 and private Part 2 MP3 metadata without ffprobe', () => {
  const releases = [
    {
      manifest: JSON.parse(fs.readFileSync(path.join(root, 'docs/ielts-superhub/originality/welearn-listening-part-1-001.json'), 'utf8')),
      path: path.join(root, 'public/audio/ielts/listening/welearn-listening-part-1-001.mp3'),
    },
    {
      manifest: JSON.parse(fs.readFileSync(path.join(root, 'docs/ielts-superhub/originality/welearn-listening-part-2-001.json'), 'utf8')),
      path: path.join(root, 'docs/ielts-superhub/candidates/welearn-listening-part-2-001/welearn-listening-part-2-001.mp3'),
    },
  ];

  for (const release of releases) {
    const fromPath = inspectMp3File(release.path);
    const fromBuffer = inspectMp3Metadata(fs.readFileSync(release.path));
    assert.deepEqual(fromBuffer, fromPath);
    assert.equal(fromPath.format, 'MPEG Audio Layer III');
    assert.equal(fromPath.mpegVersion, 1);
    assert.equal(fromPath.layer, 3);
    assert.equal(fromPath.sampleRateHz, release.manifest.audio.sampleRateHz);
    assert.equal(fromPath.channels, release.manifest.audio.channels);
    const documentedBitrate = release.manifest.audio.targetBitRate ?? release.manifest.audio.bitRate;
    assert.ok(Math.abs(fromPath.bitrateBps - documentedBitrate) < 100);
    assert.ok(Math.abs(fromPath.durationSeconds - release.manifest.audio.durationSeconds) < 0.000_001);
    assert.equal(fromPath.durationSource, 'info');
    assert.equal(fromPath.encoderDelaySamples, 576);
    assert.ok(fromPath.encoderPaddingSamples > 0);
    assert.ok(fromPath.frameCount > 2);
    assert.ok(fromPath.id3v2Bytes >= 10);
    assert.equal(fromPath.trailingTagBytes, 0);
    assert.equal(Object.isFrozen(fromPath), true);
  }
});

test('falls back to a complete sequential frame scan and skips supported tags', () => {
  const buffer = syntheticFrameScanMp3({ frameCount: 4, id3: true, id3v1: true });
  const metadata = inspectMp3Buffer(buffer);
  assert.equal(metadata.durationSource, 'frame-scan');
  assert.equal(metadata.frameCount, 4);
  assert.equal(metadata.sampleRateHz, 44_100);
  assert.equal(metadata.channels, 1);
  assert.equal(metadata.bitrateBps, 128_000);
  assert.equal(metadata.durationSeconds, 4 * 1_152 / 44_100);
  assert.equal(metadata.id3v2Bytes, 14);
  assert.equal(metadata.trailingTagBytes, 128);
});

test('prefers Info frame counts and applies encoder delay and padding', () => {
  const buffer = syntheticInfoMp3();
  const metadata = inspectMp3Metadata(buffer);
  assert.equal(metadata.durationSource, 'info');
  assert.equal(metadata.frameCount, 4);
  assert.equal(metadata.encoderDelaySamples, 576);
  assert.equal(metadata.encoderPaddingSamples, 288);
  assert.equal(metadata.rawDurationSeconds, 3 * 1_152 / 44_100);
  assert.equal(metadata.durationSeconds, (3 * 1_152 - 576 - 288) / 44_100);

  const xingMetadata = inspectMp3Buffer(syntheticInfoMp3({ marker: 'Xing' }));
  assert.equal(xingMetadata.durationSource, 'xing');
  assert.equal(xingMetadata.variableBitrate, true);
});

test('fails closed on malformed MPEG headers and inconsistent streams', () => {
  const invalidLayer = syntheticFrameScanMp3({ id3: false });
  invalidLayer[1] = 0xfd; // MPEG-1 Layer II.
  assertMetadataError(() => inspectMp3Buffer(invalidLayer), 'INVALID_MPEG_LAYER');

  const freeBitrate = syntheticFrameScanMp3({ id3: false });
  freeBitrate[2] &= 0x0f;
  assertMetadataError(() => inspectMp3Buffer(freeBitrate), 'UNSUPPORTED_FREE_BITRATE');

  const invalidSampleRate = syntheticFrameScanMp3({ id3: false });
  invalidSampleRate[2] |= 0x0c;
  assertMetadataError(() => inspectMp3Buffer(invalidSampleRate), 'INVALID_SAMPLE_RATE');

  const first = audioFrame();
  const changedSampleRate = audioFrame({
    sampleRateIndex: 1,
    sampleRateHz: 48_000,
    length: frameLength({ sampleRateHz: 48_000 }),
  });
  assertMetadataError(
    () => inspectMp3Buffer(Buffer.concat([first, changedSampleRate, changedSampleRate])),
    'INCONSISTENT_STREAM',
  );
});

test('fails closed on truncated tags, frames, unexpected trailing bytes and false Xing counts', () => {
  const truncatedId3 = Buffer.concat([
    Buffer.from([0x49, 0x44, 0x33, 0x04, 0x00, 0x00]),
    syncSafe(100),
    Buffer.alloc(4),
  ]);
  assertMetadataError(() => inspectMp3Buffer(truncatedId3), 'TRUNCATED_ID3V2');

  const complete = syntheticFrameScanMp3({ id3: false });
  assertMetadataError(() => inspectMp3Buffer(complete.subarray(0, complete.length - 1)), 'TRUNCATED_FRAME');
  assertMetadataError(() => inspectMp3Buffer(Buffer.concat([complete, Buffer.from([0x00])])), 'TRUNCATED_FRAME');

  assertMetadataError(
    () => inspectMp3Buffer(syntheticInfoMp3({ declaredFrameCount: 9 })),
    'XING_FRAME_MISMATCH',
  );
  assertMetadataError(
    () => inspectMp3Buffer(syntheticInfoMp3({ declaredByteCount: 123 })),
    'XING_BYTE_MISMATCH',
  );
});

test('rejects invalid input and a real-file truncation', () => {
  assertMetadataError(() => inspectMp3Metadata({}), 'INVALID_INPUT');
  const realPath = path.join(root, 'public/audio/ielts/listening/welearn-listening-part-1-001.mp3');
  const truncated = fs.readFileSync(realPath).subarray(0, fs.statSync(realPath).size - 17);
  assertMetadataError(() => inspectMp3Buffer(truncated), 'TRUNCATED_FRAME');
});
