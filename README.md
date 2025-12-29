# Copyright (c) 2025 BEDLAM520 Development

---

## NexArt Design Studio

---

 > Personal creative coding environment for NexArt art piece development with Canvas2D, combining the power of Next.js, TypeScript, and the NexArt Protocol.

---

## Quick Start

---

### Installation

---

#### Prerequisites

---

 > Ensure You Have The Following Installed:
   - **Node.js** ^22.x (package set to '22.x')
   - **pnpm** ^10.x or (package set to '10.26.2')
     -- IF NEEDED RUN: 

       ```bash
       npm install -g pnpm
       ```

       **OR**

       ```bash
       corepack enable
       corepack use pnpm@10.26.2
       ```

   - **Git**

---

#### Setup

---

 > Clone The Repository

```bash
git clone https://github.com/bedlam520dev/nexart-design-studio.git
```

 > Navigate To Project Directory

```bash
cd nexart-design-studio
```

 > Install Dependencies

```bash
pnpm install
```

 > Generate NexArt Capabilities Reference File

```bash
pnpm capabilities
```

---

## Development

---

 > Start Development Server
   - Navigate to 'http://localhost:3000/runner.html' to see your art!

```bash
pnpm dev
```

 > Build For Production

```bash
pnpm build
```

 > Start Production Server

```bash
pnpm start
```

---

### Code Quality (with logs)

---

 > Type Check → '_devlogs/typecheck-*.log'

```bash
pnpm check-types
```

 > Lint Code → '_devlogs/lint-*.log'

```bash
pnpm lint
```

 > Fix Lint Issues → '_devlogs/lint-fix-*.log'

```bash
pnpm lint:fix
```

 > Format Code → '_devlogs/format-*.log'

```bash
pnpm format
```

 > Check Formatting → '_devlogs/format-check-*.log'

```bash
pnpm format:check
```

---

### All-in-one validation

---

 > Runs All Checks With Logs

```bash
pnpm validate
```

---

### Prepare for NexArt publishing

---

 > Export Sketch To NexArt Compliant Snippet

```bash
pnpm export:nexart src/art/pieces/[name]/sketch.ts
```

---

## Project Structure

---

```tree
src/
  art/
    pieces/              # Individual art pieces
      flowing-particles/
        sketch.ts        # Development sketch
        nexart-export.md # NexArt deployment code
      generative-waves/
      nexart-template/   # Clean template for new pieces
    lib/
      canvas.ts          # Canvas utilities
      colors.ts          # Color manipulation (chroma-js)
      noise.ts           # Noise functions (simplex-noise)
      math.ts            # Math helpers
      nexart-capabilities.ts  # Auto-generated NexArt reference
    types.ts             # TypeScript types
  components/            # React components (when ready)
  app/                   # Next.js app (future frontend)

scripts/
  export-nexart.ts       # Export sketch to NexArt format
  generate-capabilities.ts  # Generate capability reference

public/
  runner.html            # Standalone art runner
```

---

## Creating New Art Pieces

---

### Create a New Sketch

---

 > Copy The Template

```bash
cp -r src/art/pieces/nexart-template src/art/pieces/[name]
```

 > Edit Your Sketch

```ts
/* src/art/pieces/[name]/sketch.ts */

import type { NexArtSketch } from '@/art/types';

export const metadata = {
  title: '{Art Title [name]}',
  author: '{Author Name}',
  date: new Date().toISOString(),
  description: '{Description Of Art Piece}',
  genre: '{NexArt Specific Genre Of Art Piece **STRICT**},
};

// Required: runs once on start (for ALL art)
const setup = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  // Initialize canvas, set background, create initial state
  // Store state on canvas object: (canvas as any).__myState = {}
};

// Optional: runs every frame (for animated art)
const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, frame: number) => {
  // Your animation logic here
  // All calculations inline - NO helper functions
  // All state from setup or declared here - NO global variables
};

export const sketch: NexArtSketch = { setup, draw };
```

---

##### Run Your Sketch

---

 > Edit 'public/runner.html' at line 24:

```ts
const { sketch } = await import('/src/art/pieces/[name]/sketch.ts');
```

 > Then View At 'http://localhost:3000/runner.html'

---

## NexArt Deployment Rules

---

 > _**CRITICAL**_: NexArt has **STRICT** requirements:

   > ✅ Allowed:
     - setup() function (optional)
     - draw() function (required)
     - All logic inline in these functions
     - Math, canvas 2D API, basic JS


   > ❌ NOT Allowed:
     - Helper functions
     - Global variables
     - External libraries in deployment
     - let/const outside functions

---

### Exporting to NexArt Format

---

 >  Export Your Sketch (EXAMPLE)

```bash
pnpm export:nexart src/art/pieces/generative-waves/sketch.ts
```

 > Output example (src/art/pieces/generative-waves/nexart-export.md):

```nexart
TITLE: Generative Waves
// GENRE: TEMPORAL ACCUMULATION
function setup() {
  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);
  
  ctx.fillStyle = '#0a0e27';
  ctx.fillRect(0, 0, width, height);
}

function draw() {
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
}
```

---

### Using NexArt UI Renderer

---

 > The '@nexart/ui-renderer' package provides a declarative system for creating art.

---

#### Basic Usage

---

 > Edit 'public/runner.html' and set 'useUIRenderer = true':

```ts
import { createSystem, previewSystem } from '@nexart/ui-renderer';

const system = createSystem({
  seed: 29445825,
  background: { color: 'blue', texture: 'noise' },
  elements: [
    { type: 'waves', axis: 'x', amplitude: 0.4, frequency: 0.7 },
    { type: 'dots', distribution: 'radial', count: 400 }
  ],
  motion: { source: 'time', speed: 0.2 }
});

previewSystem(system, canvas, { mode: 'loop' }).start();
```

---

#### Available Capabilities

---

 > Run The Capabilities Generator To Get IntelliSense:

```bash
pnpm tsx scripts/generate-capabilities.ts
```

 > This creates:
   - 'src/art/lib/nexart-capabilities.ts' - TypeScript types & helpers
   - 'docs/nexart-reference.md' - Human-readable reference

---

#### Utility Libraries

---

 > Canvas (src/art/lib/canvas.ts)

```ts
import { setupCanvas, clear, centerCanvas, saveFrame } from '@/art/lib/canvas';

const ctx = setupCanvas(canvas);
clear(ctx, '#000000');
const { x, y, width, height } = centerCanvas(ctx);
saveFrame(canvas, 'my-art-frame');
```

 > Colors (src/art/lib/colors.ts)

```ts
import { palette, interpolateColor, colorScale, withAlpha } from '@/art/lib/colors';

const color = palette.neon[0];
const mixed = interpolateColor('#ff0000', '#0000ff', 0.5);
const scale = colorScale(['#000', '#fff'], 10);
const transparent = withAlpha('#ff0000', 0.5);
```

 > Noise (src/art/lib/noise.ts)

```ts
import { noise, fbm, turbulence } from '@/art/lib/noise';

const value = noise.get2D(x * 0.01, y * 0.01);
const fractal = fbm(x, y, 4, 0.5);
const turb = turbulence(x, y, 64);
Math (src/art/lib/math.ts)
import { lerp, map, clamp, dist, randomRange } from '@/art/lib/math';

const interpolated = lerp(0, 100, 0.5); // 50
const mapped = map(50, 0, 100, -1, 1); // 0
const clamped = clamp(150, 0, 100); // 100
const distance = dist(0, 0, 3, 4); // 5
const random = randomRange(10, 20);
```

 > Capabilities (src/lib/nexart-capabilities.ts)

_**AUTO-GENERATED WHEN 'pnpm capabilities' IS RAN**_

---

### Development Workflow

---

#### Standard Workflow

 > Create Sketch In 'src/art/pieces/[name]/sketch.ts'
   - Use helper libraries during development
   - Test in runner.html
   - Export to NexArt format when ready
   - Deploy exported code to NexArt Protocol

---

#### Quick Testing

---

 > Start Dev Server

```bash
pnpm dev
```

 > Edit Sketch File

 > Refresh Browser To See Changes

 > Use Cmd/Ctrl+S To Save Frame (**If Implemented In Sketch**)

---

### Configuration Files

---

 > Prettier (prettier.config.mjs)
   - Auto-sorts Tailwind classes
   - Enforces consistent formatting
   - Configured for minimal noise

 > ESLint (eslint.config.mjs)
   - Next.js + TypeScript rules
   - React hooks linting
   - Import organization
   - Accessibility checks

 > TypeScript (tsconfig.json)
   - Strict mode enabled
   - Path aliases (@/* → src/*)
   - Next.js optimization

---

### Tips for ADHD-Friendly Development

---

 > ✅ Do:
   - Focus on one sketch at a time
   - Use the template for consistency
   - Let Prettier handle formatting
   - Test frequently in runner.html
   - Export early, export often

 > ❌ Avoid:
   - Over-engineering during creative flow
   - Premature optimization
   - Too many files open at once
   - Skipping the export step

---

### Package Management

---

 > This project uses:
   - pnpm - Fast, efficient package manager
   - Next.js 16 - React framework
   - TypeScript - Type safety
   - Tailwind CSS v4 - Utility-first CSS
   - ESLint - Code quality
   - Prettier - Code readability and consistency

---

### Resources

---

 > NexArt Protocol - [Protocol](https://nexart.io)

 > NexArt Builders Guide - [Builders](https://nexart.io/builders)

 > Code Mode Reference - [Quick Reference](https://nexart.io/code-mode-quick-reference)

 > Execution Details - [Code Mode Execution](https://nexart.io/code-mode-execution)

 > NexArt Platform - [NexArt App](https://nexart.xyz)

 > NexArt Static Builder App - [NexArt Static Builder App](https://buildwithnexartprotocol.xyz)

 > NexArt Canonical SDK Source Code - [Code Mode SDK Source Code](https://github.com/artnames/nexart-codemode-sdk)

 > NexArt UI Renderer SDK Source Code - [UI Renderer SDK Source Code](https://github.com/artnames/nexart-ui-renderer)

---

### Future Plans

---

[ ] React frontend for sketch gallery
[ ] Live parameter controls
[ ] Sketch versioning system
[ ] Automated deployment to NexArt
[ ] Real-time collaboration features

---

## License

---

 > MIT License - _**See LICENSE File**_

---

## Contributing

---

 > We Welcome Any And All Potential And Appropriate Contributions - _**See CONTRIBUTING.md File**_

---

## Contact

---

 > For Questions, Concerns, Or Otherwise Regarding This Project Contact _**BEDLAM520 Development**_ At:
   - E-Mail - [E-Mail](mailto://bedlam520@gmail.com)
   - Farcaster - [Farcaster](https://farcaster.xyz/bedlam520.eth)
   - BaseApp - [BaseApp](https://base.app/profile/bedlam520.eth)
   - X (Twitter) - [X](https://x.com/bedlam520)
   - GitHub - [GitHub](https://github.com/bedlam520dev)

 > For Anything Specifically Regarding The NexArt Platform Or Protocol Contact _**NexArt Team**_ At:
   - E-Mail - [E-Mail](mailto://contact@artnames.io)
   - Farcaster - [Farcaster](https://farcaster.xyz/nexart.eth)
   - BaseApp - [BaseApp](https://base.app/profile/arrotu)
   - X (Twitter) - [X](https://x.com/ArtNames_io)
   - GitHub - [GitHub](https://github.com/artnames)

---
