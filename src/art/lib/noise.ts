import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise';

const noise2D = createNoise2D();
const noise3D = createNoise3D();
const noise4D = createNoise4D();

export const noise = {
  get2D: (x: number, y: number) => noise2D(x, y),
  get3D: (x: number, y: number, z: number) => noise3D(x, y, z),
  get4D: (x: number, y: number, z: number, w: number) => noise4D(x, y, z, w),
};

export const fbm = (
  x: number,
  y: number,
  octaves: number = 4,
  persistence: number = 0.5
) => {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += noise.get2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  return total / maxValue;
};

export const turbulence = (x: number, y: number, size: number) => {
  let value = 0;
  let initialSize = size;

  while (size >= 1) {
    value += Math.abs(noise.get2D(x / size, y / size)) * size;
    size /= 2;
  }

  return value / initialSize;
};
