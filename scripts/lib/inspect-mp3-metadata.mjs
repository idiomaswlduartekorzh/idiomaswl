import fs from 'node:fs';

const BITRATES_KBPS = {
  1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
  2.5: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
};

const SAMPLE_RATES_HZ = {
  1: [44_100, 48_000, 32_000],
  2: [22_050, 24_000, 16_000],
  2.5: [11_025, 12_000, 8_000],
};

export class Mp3MetadataError extends Error {
  constructor(code, message, options) {
    super(message, options);
    this.name = 'Mp3MetadataError';
    this.code = code;
  }
}

function fail(code, message, options) {
  throw new Mp3MetadataError(code, message, options);
}

function parseSyncSafeInteger(bytes, label) {
  if (bytes.length !== 4 || bytes.some((byte) => (byte & 0x80) !== 0)) {
    fail('INVALID_ID3V2', `${label} is not a valid four-byte sync-safe integer.`);
  }
  return ((bytes[0] << 21) | (bytes[1] << 14) | (bytes[2] << 7) | bytes[3]) >>> 0;
}

function id3v2EndOffset(buffer) {
  if (buffer.length < 3 || buffer.toString('ascii', 0, 3) !== 'ID3') return 0;
  if (buffer.length < 10) fail('TRUNCATED_ID3V2', 'The ID3v2 header is truncated.');

  const majorVersion = buffer[3];
  const revision = buffer[4];
  const flags = buffer[5];
  if (majorVersion < 2 || majorVersion > 4 || revision === 0xff) {
    fail('INVALID_ID3V2', `Unsupported ID3v2 version 2.${majorVersion}.${revision}.`);
  }

  const allowedFlags = majorVersion === 2 ? 0xc0 : majorVersion === 3 ? 0xe0 : 0xf0;
  if ((flags & ~allowedFlags) !== 0) {
    fail('INVALID_ID3V2', `ID3v2.${majorVersion} contains reserved header flags.`);
  }

  const declaredSize = parseSyncSafeInteger([...buffer.subarray(6, 10)], 'ID3v2 size');
  const nominalEnd = 10 + declaredSize;
  if (nominalEnd > buffer.length) {
    fail('TRUNCATED_ID3V2', 'The ID3v2 tag extends beyond the available data.');
  }

  const footerPresent = majorVersion === 4 && (flags & 0x10) !== 0;
  if (!footerPresent) return nominalEnd;

  // Encoders in the wild disagree on whether the footer is included in the
  // sync-safe size. Accept the two specified/common layouts, but require the
  // actual reversed signature so arbitrary bytes are never skipped as audio.
  if (declaredSize >= 10 && buffer.toString('ascii', nominalEnd - 10, nominalEnd - 7) === '3DI') {
    return nominalEnd;
  }
  if (
    nominalEnd + 10 <= buffer.length
    && buffer.toString('ascii', nominalEnd, nominalEnd + 3) === '3DI'
  ) {
    return nominalEnd + 10;
  }
  fail('INVALID_ID3V2', 'ID3v2 declares a footer but no valid footer is present.');
}

function audioEndOffset(buffer) {
  if (buffer.length >= 128 && buffer.toString('ascii', buffer.length - 128, buffer.length - 125) === 'TAG') {
    return buffer.length - 128;
  }
  return buffer.length;
}

function parseFrameHeader(buffer, offset) {
  if (offset < 0 || offset + 4 > buffer.length) {
    fail('TRUNCATED_FRAME', `MPEG frame header is truncated at byte ${offset}.`);
  }

  const first = buffer[offset];
  const second = buffer[offset + 1];
  const third = buffer[offset + 2];
  const fourth = buffer[offset + 3];
  if (first !== 0xff || (second & 0xe0) !== 0xe0) {
    fail('INVALID_FRAME_SYNC', `Invalid MPEG frame sync at byte ${offset}.`);
  }

  const versionBits = (second >> 3) & 0x03;
  const layerBits = (second >> 1) & 0x03;
  const version = versionBits === 0x03 ? 1 : versionBits === 0x02 ? 2 : versionBits === 0x00 ? 2.5 : null;
  if (version === null) fail('INVALID_MPEG_VERSION', `Reserved MPEG version at byte ${offset}.`);
  if (layerBits !== 0x01) fail('INVALID_MPEG_LAYER', `MPEG frame at byte ${offset} is not Layer III.`);

  const bitrateIndex = (third >> 4) & 0x0f;
  const sampleRateIndex = (third >> 2) & 0x03;
  if (bitrateIndex === 0) fail('UNSUPPORTED_FREE_BITRATE', `Free-format MP3 frame at byte ${offset} is unsupported.`);
  if (bitrateIndex === 0x0f) fail('INVALID_BITRATE', `Invalid MPEG bitrate index at byte ${offset}.`);
  if (sampleRateIndex === 0x03) fail('INVALID_SAMPLE_RATE', `Invalid MPEG sample-rate index at byte ${offset}.`);
  if ((fourth & 0x03) === 0x02) fail('INVALID_EMPHASIS', `Reserved MPEG emphasis value at byte ${offset}.`);

  const bitrateKbps = BITRATES_KBPS[version][bitrateIndex];
  const sampleRateHz = SAMPLE_RATES_HZ[version][sampleRateIndex];
  const padding = (third >> 1) & 0x01;
  const samplesPerFrame = version === 1 ? 1_152 : 576;
  const frameLength = Math.floor(
    (version === 1 ? 144_000 : 72_000) * bitrateKbps / sampleRateHz,
  ) + padding;
  const channelMode = (fourth >> 6) & 0x03;
  const channels = channelMode === 0x03 ? 1 : 2;
  const hasCrc = (second & 0x01) === 0;
  const sideInfoBytes = version === 1
    ? (channels === 1 ? 17 : 32)
    : (channels === 1 ? 9 : 17);
  const minimumFrameLength = 4 + (hasCrc ? 2 : 0) + sideInfoBytes;
  if (!Number.isInteger(frameLength) || frameLength <= minimumFrameLength) {
    fail('INVALID_FRAME_LENGTH', `Invalid MPEG frame length at byte ${offset}.`);
  }

  return {
    version,
    bitrateBps: bitrateKbps * 1_000,
    sampleRateHz,
    samplesPerFrame,
    frameLength,
    channels,
    hasCrc,
    sideInfoBytes,
  };
}

function readUInt32WithinFrame(buffer, offset, frameEnd, label) {
  if (offset < 0 || offset + 4 > frameEnd) {
    fail('TRUNCATED_XING', `${label} extends beyond the first MPEG frame.`);
  }
  return buffer.readUInt32BE(offset);
}

function parseGaplessSamples(buffer, encoderOffset, frameEnd, totalSamples) {
  if (encoderOffset + 24 > frameEnd) return { encoderDelaySamples: 0, encoderPaddingSamples: 0 };
  const encoder = buffer.toString('latin1', encoderOffset, encoderOffset + 9).replace(/\0+$/, '');
  if (!/^(?:LAME|Lavc|Lavf|GOGO)/.test(encoder)) {
    return { encoderDelaySamples: 0, encoderPaddingSamples: 0 };
  }

  const first = buffer[encoderOffset + 21];
  const second = buffer[encoderOffset + 22];
  const third = buffer[encoderOffset + 23];
  const encoderDelaySamples = (first << 4) | (second >> 4);
  const encoderPaddingSamples = ((second & 0x0f) << 8) | third;
  if (encoderDelaySamples + encoderPaddingSamples >= totalSamples) {
    fail('INVALID_GAPLESS_DATA', 'Encoder delay and padding consume the complete MPEG stream.');
  }
  return { encoderDelaySamples, encoderPaddingSamples };
}

function parseXingInfo(buffer, frameOffset, header) {
  const frameEnd = frameOffset + header.frameLength;
  const markerOffset = frameOffset + 4 + (header.hasCrc ? 2 : 0) + header.sideInfoBytes;
  if (markerOffset + 4 > frameEnd) return null;
  const marker = buffer.toString('ascii', markerOffset, markerOffset + 4);
  if (marker !== 'Xing' && marker !== 'Info') return null;

  const flags = readUInt32WithinFrame(buffer, markerOffset + 4, frameEnd, `${marker} flags`);
  if ((flags & ~0x0f) !== 0) fail('INVALID_XING', `${marker} header contains reserved flags.`);
  let cursor = markerOffset + 8;
  let frameCount = null;
  let byteCount = null;
  if ((flags & 0x01) !== 0) {
    frameCount = readUInt32WithinFrame(buffer, cursor, frameEnd, `${marker} frame count`);
    cursor += 4;
    if (frameCount === 0) fail('INVALID_XING', `${marker} frame count is zero.`);
  }
  if ((flags & 0x02) !== 0) {
    byteCount = readUInt32WithinFrame(buffer, cursor, frameEnd, `${marker} byte count`);
    cursor += 4;
    if (byteCount === 0) fail('INVALID_XING', `${marker} byte count is zero.`);
  }
  if ((flags & 0x04) !== 0) {
    if (cursor + 100 > frameEnd) fail('TRUNCATED_XING', `${marker} table of contents is truncated.`);
    cursor += 100;
  }
  if ((flags & 0x08) !== 0) {
    readUInt32WithinFrame(buffer, cursor, frameEnd, `${marker} quality value`);
    cursor += 4;
  }

  const totalSamples = frameCount === null ? 0 : frameCount * header.samplesPerFrame;
  const gapless = frameCount === null
    ? { encoderDelaySamples: 0, encoderPaddingSamples: 0 }
    : parseGaplessSamples(buffer, cursor, frameEnd, totalSamples);
  return { marker, frameCount, byteCount, ...gapless };
}

function inspectBuffer(buffer) {
  if (!Buffer.isBuffer(buffer)) fail('INVALID_INPUT', 'MP3 input must be a Buffer or filesystem path.');
  if (buffer.length < 8) fail('TRUNCATED_FILE', 'MP3 data is too short to contain a complete frame.');

  const audioStart = id3v2EndOffset(buffer);
  const audioEnd = audioEndOffset(buffer);
  if (audioEnd <= audioStart) fail('NO_AUDIO', 'MP3 contains tags but no MPEG audio frames.');

  const firstHeader = parseFrameHeader(buffer, audioStart);
  const xing = parseXingInfo(buffer, audioStart, firstHeader);
  let offset = audioStart;
  let frameCount = 0;
  let totalSamples = 0;
  let weightedBitrate = 0;
  const bitrateValues = new Set();

  while (offset < audioEnd) {
    const header = parseFrameHeader(buffer, offset);
    if (
      header.version !== firstHeader.version
      || header.sampleRateHz !== firstHeader.sampleRateHz
      || header.channels !== firstHeader.channels
      || header.samplesPerFrame !== firstHeader.samplesPerFrame
    ) {
      fail('INCONSISTENT_STREAM', `MPEG stream parameters change at byte ${offset}.`);
    }
    if (offset + header.frameLength > audioEnd) {
      fail('TRUNCATED_FRAME', `MPEG frame at byte ${offset} extends beyond the audio data.`);
    }

    frameCount += 1;
    totalSamples += header.samplesPerFrame;
    weightedBitrate += header.bitrateBps * header.samplesPerFrame;
    bitrateValues.add(header.bitrateBps);
    offset += header.frameLength;
  }

  if (frameCount < 2) fail('INSUFFICIENT_FRAMES', 'MP3 needs at least two complete MPEG Layer III frames.');
  const audioBytes = audioEnd - audioStart;
  if (
    xing?.frameCount !== null
    && xing?.frameCount !== undefined
    && xing.frameCount !== frameCount
    && xing.frameCount + 1 !== frameCount
  ) {
    fail('XING_FRAME_MISMATCH', `${xing.marker} declares ${xing.frameCount} frames but ${frameCount} complete frames were found.`);
  }
  if (xing?.byteCount !== null && xing?.byteCount !== undefined && xing.byteCount !== audioBytes) {
    fail('XING_BYTE_MISMATCH', `${xing.marker} declares ${xing.byteCount} bytes but the MPEG stream contains ${audioBytes}.`);
  }

  const durationUsesXing = xing?.frameCount !== null && xing?.frameCount !== undefined;
  const durationFrameCount = durationUsesXing ? xing.frameCount : frameCount;
  const rawSamples = durationFrameCount * firstHeader.samplesPerFrame;
  const encoderDelaySamples = durationUsesXing ? xing.encoderDelaySamples : 0;
  const encoderPaddingSamples = durationUsesXing ? xing.encoderPaddingSamples : 0;
  const playableSamples = rawSamples - encoderDelaySamples - encoderPaddingSamples;
  if (playableSamples <= 0) fail('INVALID_DURATION', 'MP3 has no playable audio samples.');

  return Object.freeze({
    format: 'MPEG Audio Layer III',
    mpegVersion: firstHeader.version,
    layer: 3,
    sampleRateHz: firstHeader.sampleRateHz,
    channels: firstHeader.channels,
    bitrateBps: Math.round(weightedBitrate / totalSamples),
    variableBitrate: xing?.marker === 'Xing' || bitrateValues.size > 1,
    durationSeconds: playableSamples / firstHeader.sampleRateHz,
    rawDurationSeconds: rawSamples / firstHeader.sampleRateHz,
    durationSource: durationUsesXing ? xing.marker.toLowerCase() : 'frame-scan',
    frameCount,
    encoderDelaySamples,
    encoderPaddingSamples,
    id3v2Bytes: audioStart,
    audioBytes,
    trailingTagBytes: buffer.length - audioEnd,
  });
}

export function inspectMp3Buffer(buffer) {
  return inspectBuffer(buffer);
}

export function inspectMp3File(filePath) {
  if (typeof filePath !== 'string' && !(filePath instanceof URL)) {
    fail('INVALID_INPUT', 'MP3 filesystem path must be a string or URL.');
  }
  try {
    return inspectBuffer(fs.readFileSync(filePath));
  } catch (error) {
    if (error instanceof Mp3MetadataError) throw error;
    fail('READ_FAILED', `Unable to read MP3 file: ${String(filePath)}.`, { cause: error });
  }
}

export function inspectMp3Metadata(input) {
  return Buffer.isBuffer(input) ? inspectMp3Buffer(input) : inspectMp3File(input);
}
