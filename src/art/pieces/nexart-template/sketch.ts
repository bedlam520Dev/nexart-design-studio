import type { NexArtSketch } from '@/art/types';

export const metadata = {
  title: 'NexArt Pure Template',
  author: 'BEDLAM520 Development',
  date: new Date().toISOString(),
  description: 'Template following strict NexArt rules',
  genre: 'GENERATIVE',
};

const setup = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
};

const draw = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  frame: number
) => {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);
  const centerX = width / 2;
  const centerY = height / 2;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  const radius = 50 + Math.sin(frame * 0.05) * 30;
  const x = centerX + Math.cos(frame * 0.02) * 100;
  const y = centerY + Math.sin(frame * 0.02) * 100;
  const hue = (frame * 2) % 360;

  ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

export const sketch: NexArtSketch = { setup, draw };
