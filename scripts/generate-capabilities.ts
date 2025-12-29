import {
  getCapabilities,
  getPrimitiveTypes,
  getMotionSources,
  getBackgroundTextures,
  type PrimitiveCapability,
} from '@nexart/ui-renderer';
import { writeFileSync } from 'fs';
import { join } from 'path';

const caps = getCapabilities();
const primitiveTypes = getPrimitiveTypes();
const motionSources = getMotionSources();
const backgroundTextures = getBackgroundTextures();

const generateTypesFile = () => {
  const content = `// Auto-generated from NexArt capabilities
// Last updated: ${new Date().toISOString()}

export const capabilities = ${JSON.stringify(caps, null, 2)} as const;

export type ElementType = ${primitiveTypes.map((type) => `'${type}'`).join(' | ')};
export type BackgroundTexture = ${backgroundTextures.map((t) => `'${t}'`).join(' | ')};
export type MotionSource = ${motionSources.map((s) => `'${s}'`).join(' | ')};

export const elementHelpers = {
${caps.primitives.map((el: PrimitiveCapability) => `  ${el.type}: ${JSON.stringify(el)}`).join(',\n')}
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

## Primitives

${caps.primitives
  .map(
    (el: PrimitiveCapability) => `### ${el.type}
- **Parameters**: ${Object.keys(el.parameters || {}).join(', ')}
- **Description**: ${el.description || 'N/A'}
`
  )
  .join('\n')}

## Backgrounds

**Textures**: ${backgroundTextures.join(', ')}

## Motion

**Sources**: ${motionSources.join(', ')}
`;

  writeFileSync(join(process.cwd(), 'docs/nexart-reference.md'), markdown);

  console.log('✅ Generated nexart-reference.md');
};

generateTypesFile();
generateDocsFile();
