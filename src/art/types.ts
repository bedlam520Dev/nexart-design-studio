export interface NexArtSketch {
  setup?: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
  draw: (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    frame: number
  ) => void;
  cleanup?: () => void;
}

export interface SketchMetadata {
  title: string;
  author: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface Point {
  x: number;
  y: number;
}

export interface Particle extends Point {
  vx: number;
  vy: number;
  life: number;
  color?: string;
}

export type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  time: number
) => void;
