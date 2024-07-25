import { LabelingUtil } from '@/utils';

export function decode(encoding: number[]): number[] {
  const decoded: number[] = [];

  for (let i = 0; i < encoding.length; i += 2) {
    const value = encoding[i];
    const count = encoding[i + 1];

    for (let j = 0; j < count; j++) {
      decoded.push(value);
    }
  }

  return decoded;
}

export function decodeMaskData(decoded: number[], encoded: number[], maskData?: number) {
  let count = 0;

  for (let i = 0; i < encoded.length; i += 2) {
    let value = encoded[i];
    count += encoded[i + 1];

    if (!value) {
      continue;
    }

    if (maskData) {
      value = maskData;
    }

    const decodedIndex = count - encoded[i + 1];

    for (let j = 0; j < encoded[i + 1]; j++) {
      decoded[decodedIndex + j] = value;
    }
  }
}

export function decodeImageData(
  data: Uint8ClampedArray,
  encoded: number[],
  color: string,
  alphaScale: number
) {
  let counting = 0;
  const alpha = 255 * alphaScale;

  for (let i = 0; i < encoded.length; i += 2) {
    const value = encoded[i];
    counting += encoded[i + 1];

    if (!value) {
      continue;
    }

    const decodedIndex = (counting - encoded[i + 1]) * 4;
    const rgb = LabelingUtil.convertHexToRgb(color);

    for (let j = 0; j < encoded[i + 1]; j++) {
      data[decodedIndex + 4 * j + 0] = rgb[0];
      data[decodedIndex + 4 * j + 1] = rgb[1];
      data[decodedIndex + 4 * j + 2] = rgb[2];
      data[decodedIndex + 4 * j + 3] = alpha;
    }
  }
}

export function getDecodedMaskData(maskData: number[], width: number, height: number) {
  const decodedMaskData: number[] = Array(width * height).fill(0);

  decodeMaskData(decodedMaskData, maskData);

  return decodedMaskData;
}
