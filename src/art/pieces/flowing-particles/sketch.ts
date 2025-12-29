# Copyright (c) 2025 BEDLAM520 Development

import type { NexArtSketch } from '@/art/types';

export const metadata = {
  title: 'Flowing Particles',
  author: 'BEDLAM520 Development',
  date: new Date().toISOString(),
  description: 'Particles flowing through noise fields',
  genre: 'FILAMENT / FLOW',
};

const setup = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);
  
  const particles = [];
  const particleCount = 500;
  const colors = ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      life: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  
  (canvas as any).__particles = particles;
};

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, frame: number) => {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);
  const particles = (canvas as any).__particles || [];
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
  ctx.fillRect(0, 0, width, height);

  const noiseScale = 0.003;
  const flowStrength = 2;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    
    const noiseX = p.x * noiseScale;
    const noiseY = p.y * noiseScale + frame * 0.001;
    const angle = (Math.sin(noiseX * 10) * Math.cos(noiseY * 10)) * Math.PI * 2;
    
    p.vx = Math.cos(angle) * flowStrength;
    p.vy = Math.sin(angle) * flowStrength;
    
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

export const sketch: NexArtSketch = { setup, draw };
