export const setupCanvas = (
  canvas: HTMLCanvasElement,
  width?: number,
  height?: number,
  dpr: number = window.devicePixelRatio || 1
): CanvasRenderingContext2D => {
  const w = width || window.innerWidth;
  const h = height || window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);

  return ctx;
};

export const clear = (
  ctx: CanvasRenderingContext2D,
  color: string = '#000000'
) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const centerCanvas = (ctx: CanvasRenderingContext2D) => {
  const w = ctx.canvas.width / (window.devicePixelRatio || 1);
  const h = ctx.canvas.height / (window.devicePixelRatio || 1);
  return { x: w / 2, y: h / 2, width: w, height: h };
};

export const saveFrame = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL();
  link.click();
};
