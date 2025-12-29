# Copyright (c) 2025 BEDLAM520 Development

---

## Contributing to NexArt Design Studio

---

> Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

---

## Table of Contents

---

1. [Copyright (c) 2025 BEDLAM520 Development](#copyright-c-2025-bedlam520-development)
   1. [Contributing to NexArt Design Studio](#contributing-to-nexart-design-studio)
   2. [Table of Contents](#table-of-contents)
   3. [Code of Conduct](#code-of-conduct)
      1. [Our Standards](#our-standards)
   4. [Getting Started](#getting-started)
      1. [Prerequisites](#prerequisites)
      2. [Initial Setup](#initial-setup)
   5. [Development Workflow](#development-workflow)
      1. [Creating a Branch](#creating-a-branch)
      2. [Branch Naming Convention](#branch-naming-convention)
      3. [Development Process](#development-process)
   6. [Coding Standards](#coding-standards)
   7. [Commit Guidelines](#commit-guidelines)
   8. [Pull Request Process](#pull-request-process)
   9. [Issue Reporting](#issue-reporting)
   10. [NexArt-Specific Guidelines](#nexart-specific-guidelines)
   11. [Footnotes](#footnotes)

---

## Code of Conduct

---

> This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful, inclusive, and constructive in all interactions.

---

### Our Standards

---

- **Be Respectful**: Treat all contributors with respect and kindness
- **Be Inclusive**: Welcome diverse perspectives and experiences
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Remember that everyone is learning

---

## Getting Started

---

### Prerequisites

---

- **Node.js** ^22.x (package set to '22.x')
- **pnpm** ^10.x (package set to '10.26.2')
- **Git**
- **Code Editor** (VS Code recommended)

---

### Initial Setup

---

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/your-username/nexart-design-studio.git
   ```

3. **Navigate to project directory** locally:

   ```bash
   cd nexart-design-studio
   ```

4. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/original-owner/nexart-design-studio.git
   ```

5. **Install dependencies**:

   ```bash
   pnpm install
   ```

6. **Generate capabilities**:

   ```bash
   pnpm capabilities
   ```

7. **Verify setup**:

   ```bash
   pnpm validate
   ```

---

## Development Workflow

---

### Creating a Branch

---

> Always create a new branch for your work:

```bash
git checkout main
git pull upstream main
```

> Create feature branch

```bash
git checkout -b feature/your-feature-name
```

- _**or**_

```bash
git checkout -b fix/bug-description
```

---

### Branch Naming Convention

---

> Branch Names:

- **feature/** - New features or enhancements
- **fix/** - Bug fixes
- **docs/** - Documentation updates
- **refactor/** - Code refactoring
- **test/** - Adding or updating tests
- **chore/** - Maintenance tasks

> Examples:

- **'feature/add-particle-system'**
- **'fix/noise-calculation-overflow'**
- **'docs/update-readme-examples'**

---

### Development Process

---

> Make your changes following our coding standards

1. **Test your changes**:

   ```bash
   pnpm dev
   ```

   - Navigate to '<http://localhost:3000/runner.html>'

2. **Run validation**:

   ```bash
   pnpm validate
   ```

3. **Commit your changes** (see Commit Guidelines)
4. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

---

## Coding Standards

---

> **TypeScript**

- **Strict mode enabled** - All code must pass TypeScript strict checks
- **Explicit types** - For function parameters and return values
- **Interfaces** - Over types for object shapes
- **Use const and let** - _**NEVER**_ use var
  > **Code Style**
- This project uses **Prettier** and **ESLint** for consistent formatting:
  - **Format code**:

    ```bash
    pnpm format
    ```

  - **Check formatting**:

    ```bash
    pnpm format:check
    ```

  - **Lint code**:

    ```bash
    pnpm lint
    ```

  - **Fix lint issues**:

    ```bash
    pnpm lint:fix
    ```

- _**Important**_: Code **MUST** pass both linting and formatting checks before submission.
  > **Comments**
- **Following project maintainer preferences**:
  - **Minimal inline comments** - Code should be self-documenting
  - **Comment only when necessary** - Explain why, not what
- _**EXAMPLES**_: - **Good**:
  `ts
// Compensate for canvas device pixel ratio to prevent blur
const dpr = window.devicePixelRatio || 1;
` - **Avoid**:
  `ts
// Set x to 10
const x = 10;
`
  > **File Structure Example**

```ts
// Imports (grouped and sorted)
import type { ... } from '...';
import { ... } from '...';

// Constants
export const CONFIG = { ... };

// Types/Interfaces
export interface MyInterface { ... }

// Implementation
export const myFunction = (...) => { ... };
```

> **NexArt Sketches**

- **All sketch files \_**BEFORE EXPORT**\_ must follow this structure**:

  ```ts
  import type { NexArtSketch } from '@/art/types';

  export const metadata = {
    title: 'Sketch Title',
    author: 'Your Name',
    date: new Date().toISOString(),
    description: 'Brief description',
    genre: 'NexArt STRICT genre',
  };

  const setup = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // REQUIRED setup logic
  };

  const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    frame: number
  ) => {
    // OPTIONAL but required animation logic
  };

  export const sketch: NexArtSketch = { setup, draw };
  ```

---

## Commit Guidelines

---

> **Commit Message Format**

```commit
type(scope): subject

body (optional)

footer (optional)
```

> **Types**

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
  > **Scope**
- **Optional** - Indicates what part of the codebase is affected: - **sketch**: Art piece sketches - **lib**: Utility libraries - **runner**: Runner system - **scripts**: Build/utility scripts - **config**: Configuration files
  > **Examples**

```commit
feat(sketch): add lorenz attractor visualization
```

```commit
fix(lib): correct noise calculation overflow
```

```commit
docs(readme): update installation instructions
```

```commit
refactor(runner): simplify canvas initialization
```

```commit
chore(deps): update nexart packages to v2.1
```

> **Best Practices**

- **Use present tense**: "add feature" not "added feature"
- **Be concise**: Keep subject line under 72 characters
- **Reference issues**: Include issue numbers when applicable, example as follows:

  ```commit
  fix(sketch): resolve particle boundary wrapping (#42)
  ```

---

## Pull Request Process

---

> **Before Submitting**

- **Ensure all tests pass**:
  `bash
   pnpm validate
   ` - **Update documentation if needed**: - README.md for user-facing changes - Code comments for implementation details - CONTRIBUTING.md for process changes - **Test your changes thoroughly**: - Test in runner.html - Export to NexArt format if applicable - Verify on different screen sizes

> **Submitting a Pull Request**

- **Push your branch to your fork**:
- Open a Pull Request against the main branch
- Fill out the PR template completely: - **Clear description of changes** - **Reference related issues** - **Include screenshots/videos for visual changes** - **Note any breaking changes** - **Respond to feedback promptly and professionally** - **PR Title Format**: - Follow the same format as commit messages:
  `commit
         feat(sketch): add quantum flow visualization
         `
  `commit
         fix(lib): correct color interpolation
         `
  `commit
         docs: update contribution guidelines
         `

> **Review Process**

- **PRs require at least one approval before merging**:
- **Address all review comments**
- **Keep discussions focused and constructive**
- **Maintainers may request changes or additional tests**

---

## Issue Reporting

---

> **Before Creating an Issue**

- **Search existing issues to avoid duplicates** - **Verify the issue is reproducible** - **Gather relevant information**: - Operating system and version - Browser and version (for visual issues) - Steps to reproduce - Expected vs actual behavior

> **Issue Types**

- **Bug Reports**: - **Description** - Clear description of the bug - **Steps to Reproduce**: 1. Step one 2. Step two 3. ... - **Expected Behavior** - What should happen - **Actual Behavior** - What actually happens - **Environment**: - OS: [e.g., macOS 14.1, Windows 11] - Browser: [e.g., Chrome 120] - Node.js: [e.g., 20.10.0] - pnpm: [e.g., 8.15.0] - **Screenshots/Logs** - If applicable, add screenshots or relevant logs - **Feature Requests**: - **Problem Statement** - What problem does this feature solve? - **Proposed Solution** - How should this feature work? - **Alternatives Considered** - What other approaches did you consider? - **Additional Context** - Any other relevant information

---

## NexArt-Specific Guidelines

---

> **Creating New Sketches**

- **Use the template**:

  ```bash
  cp -r src/art/pieces/nexart-template src/art/pieces/your-sketch-name
  ```

- **Follow NexArt rules**:
  - ✅ Only setup() and draw() functions
  - ✅ All logic inline in these functions
  - ❌ No helper functions
  - ❌ No global variables
  - ❌ No external libraries in final export
- **Test export early**:
  `bash
pnpm export:nexart src/art/pieces/your-sketch-name/sketch.ts "Genre"
`
  > **Utility Libraries**
- **When adding to src/art/lib/**: - Keep functions pure - No side effects - Document parameters - Clear JSDoc comments - Add TypeScript types - Full type coverage - Consider performance - These run every frame - Write examples - Show usage in comments
  > **Capabilities Updates**
- **If NexArt adds new capabilities**:
  - Update @nexart/ui-renderer package
  - Run pnpm capabilities to regenerate references
  - Update documentation with new features
  - Add example usage in templates

---

## Footnotes

---

> Questions?:

- **Documentation**: Check the README
- **Issues**: Search or create an issue
- **Discussions**: Use GitHub Discussions for questions

---

**Thank you for contributing!** 🎨✨
