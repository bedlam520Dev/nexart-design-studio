# Copyright (c) 2025 BEDLAM520 Development

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

interface ExportOptions {
  sketchPath: string;
}

const extractNexArtCode = (options: ExportOptions) => {
  const { sketchPath } = options;
  
  const content = readFileSync(sketchPath, 'utf-8');
  
  const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
  const title = titleMatch ? titleMatch[1] : 'Untitled';
  
  const genreMatch = content.match(/genre:\s*['"](.+?)['"]/);
  const genre = genreMatch ? genreMatch[1] : 'GENERATIVE';
  
  const setupMatch = content.match(/const setup = \(.*?\) => \{([\s\S]*?)\n\};/);
  const setupBody = setupMatch ? setupMatch[1].trim() : '';
  
  const drawMatch = content.match(/const draw = \(.*?\) => \{([\s\S]*?)\n\};/);
  const drawBody = drawMatch ? drawMatch[1].trim() : '';
  
  const cleanSetup = cleanCode(setupBody);
  const cleanDraw = cleanCode(drawBody);
  
  const nexartCode = `\`\`\`nexart
TITLE: ${title}
// GENRE: ${genre}
function setup() {
${cleanSetup ? indentCode(cleanSetup, 2) : '  // Setup logic here'}
}

function draw() {
${cleanDraw ? indentCode(cleanDraw, 2) : '  // Animation logic here'}
}
\`\`\``;

  const outputPath = join(dirname(sketchPath), 'nexart-export.md');
  writeFileSync(outputPath, nexartCode);
  
  console.log(`✅ Exported NexArt code to: ${outputPath}`);
  console.log(`   Title: ${title}`);
  console.log(`   Genre: ${genre}`);
  
  return outputPath;
};

const cleanCode = (code: string): string => {
  let cleaned = code
    .replace(/from '@\/art\/lib\/\w+'/g, '')
    .replace(/import \{[^}]+\} from/g, '');
  
  return cleaned.trim();
};

const indentCode = (code: string, spaces: number): string => {
  const indent = ' '.repeat(spaces);
  return code.split('\n').map(line => indent + line).join('\n');
};

const sketchPath = process.argv[2];

if (!sketchPath) {
  console.error('Usage: pnpm export:nexart <path-to-sketch.ts>');
  console.error('Example: pnpm export:nexart src/art/pieces/generative-waves/sketch.ts');
  process.exit(1);
}

extractNexArtCode({ sketchPath });
