import chroma from 'chroma-js';

export const palette = {
  space: ['#0a0e27', '#1a1d3e', '#2d3561', '#4a5899', '#6b7bc2'],
  neon: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'],
  earth: ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#b6ad90'],
  ocean: ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8'],
};

export const randomColor = (colors: string[]) =>
  colors[Math.floor(Math.random() * colors.length)];

export const interpolateColor = (color1: string, color2: string, t: number) =>
  chroma.mix(color1, color2, t, 'lab').hex();

export const colorScale = (colors: string[], steps: number) =>
  chroma.scale(colors).mode('lab').colors(steps);

export const withAlpha = (color: string, alpha: number) =>
  chroma(color).alpha(alpha).css();

export const complementary = (color: string) =>
  chroma(color).set('hsl.h', '+180').hex();

export const analogous = (color: string, angle: number = 30) => [
  chroma(color).set('hsl.h', `-${angle}`).hex(),
  color,
  chroma(color).set('hsl.h', `+${angle}`).hex(),
];
