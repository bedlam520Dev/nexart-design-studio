# Copyright (c) 2025 BEDLAM520 Development

import type { NexArtSketch } from '@/art/types';

export const metadata = {
  title: 'Generative Waves',
  author: 'BEDLAM520 Development',
  date: new Date().toISOString(),
  description: 'Layered sine waves with noise modulation',
  genre: 'TEMPORAL ACCUMULATION',
};

const setup = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);
  
  ctx.fillStyle = '#0a0e27';
  ctx.fillRect(0, 0, width, height);
};

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, frame: number) => {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);
  const centerX = width / 2;
  const centerY = height / 2;
  
  ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
  ctx.fillRect(0, 0, width, height);
  
  const waveCount = 8;
  const resolution = 200;
  const amplitude = 80;
  const frequency = 0.005;
  const noiseInfluence = 0.3;
  
  const colors = ['#023e8a', '#0077b6', '#00b4d8'];
  
  for (let w = 0; w < waveCount; w++) {
    const colorIndex = Math.floor((w / waveCount) * colors.length);
    ctx.strokeStyle = colors[Math.min(colorIndex, colors.length - 1)];
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const yOffset = ((w / waveCount) - 0.5) * height * 0.6;
    
    for (let i = 0; i <= resolution; i++) {
      const x = (i / resolution) * width;
      const t = frame * 0.01 + w * 0.5;
      
      let y = Math.sin(x * frequency + t) * amplitude;
      
      const noiseValue = Math.sin(x * 0.002 * 10 + t * 0.1) * Math.cos(w * 5);
      y += noiseValue * amplitude * noiseInfluence;
      
      y += centerY + yOffset;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  }
};

export const sketch: NexArtSketch = { setup, draw };

