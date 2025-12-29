export const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

export const map = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const dist = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const randomInt = (min: number, max: number) =>
  Math.floor(randomRange(min, max + 1));
