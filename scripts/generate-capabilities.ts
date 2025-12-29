import { getCapabilities } from '@nexart/ui-renderer';
import { writeFileSync } from 'fs';
import { join } from 'path';

const caps = getCapabilities();

const generateTypesFile = () => {
  const content = `// Auto-generated from NexArt capabilities
// Last updated: ${new Date().toISOString()}

export const capabilities = ${JSON.stringify(caps, null, 2)} as const;

export type ElementType = ${caps.elements.map((e: any) => `'${e.type}'`).join(' | ')};
export type BackgroundTexture = ${caps.backgrounds.textures.map((t: string) => `'${t}'`).join(' | ')};
export type MotionSource = ${caps.motion.sources.map((s: string) => `'${s}'`).join(' | ')};

export const elementHelpers = {
${caps.elements.map((el: any) => `  ${el.type}: ${JSON.stringify(el)}`).join(',\n')}
};
`;

  writeFileSync(
    join(process.cwd(), 'src/art/lib/nexart-capabilities.ts'),
    content
  );
  
  console.log('✅ Generated nexart-capabilities.ts');
};

const generateDocsFile = () => {
  const markdown = `# NexArt Capabilities Reference

Generated: ${new Date().toISOString()}

## Elements

${caps.elements.map((el: any) => `### ${el.type}
- **Properties**: ${Object.keys(el.properties || {}).join(', ')}
- **Description**: ${el.description || 'N/A'}
`).join('\n')}

## Backgrounds

**Textures**: ${caps.backgrounds.textures.join(', ')}

## Motion

**Sources**: ${caps.motion.sources.join(', ')}
`;

  writeFileSync(
    join(process.cwd(), 'docs/nexart-reference.md'),
    markdown
  );
  
  console.log('✅ Generated nexart-reference.md');
};

generateTypesFile();
generateDocsFile();
