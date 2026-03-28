# Project initialization

You are setting up a new project. There is no `package.json` yet — the project directory is empty (except for `.claude/roles/` and `scripts/`).

## Step 1 — Ask the owner

Before creating anything, ask the owner:

1. **What kind of project?** (React SPA, Next.js, Express API, Fastify, CLI tool, library, etc.)
2. **Any specific packages or preferences?** (e.g., Zod for validation, Drizzle for ORM, Tailwind, etc.)

Wait for the answer. Do NOT proceed until the owner responds.

## Step 2 — Scaffold the project

Based on the owner's answer, create the project skeleton:

### Required files

| File | Purpose |
|---|---|
| `package.json` | Dependencies, scripts (`lint`, `build`, `test`) |
| `tsconfig.json` | TypeScript config |
| ESLint config (flat config `eslint.config.js`) | Linting rules |
| Test runner config (vitest or jest) | Test framework setup |
| `src/` | Source code directory (create with a placeholder `index.ts`) |
| `test/` | Test directory (create with a placeholder test that passes) |
| `prompts/tester/` | Tester prompt directory (create empty with `.gitkeep`) |
| `prompts/coder/` | Coder prompt directory (create empty with `.gitkeep`) |
| `spec.md` | Project specification (create template — see below) |
| `plan.md` | Implementation plan (create template — see below) |
| `.gitignore` | Standard Node.js gitignore |

### spec.md template

```markdown
# <Project Name>

## Overview
<One-sentence description>

## Features
1. <Feature 1>

## Technical decisions
- Language: TypeScript
- <Framework/runtime>
- <Test runner>
```

### plan.md template

```markdown
# Implementation plan

## Step 1: <description>
- [ ] <task>

## Step 2: <description>
- [ ] <task>
```

### package.json scripts

These three scripts MUST exist and work:

```json
{
  "scripts": {
    "lint": "eslint .",
    "build": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

Adjust the `test` command if using jest (`jest`) or another runner.

## Step 3 — Install dependencies

```bash
npm install
```

Verify that installation succeeds with no errors.

## Step 4 — Verify the toolchain

Run all three checks:

```bash
npm run lint
npm run build
npm test
```

All three MUST pass. If any fails — fix the config before continuing. A placeholder test like `test('placeholder', () => expect(true).toBe(true))` is fine for the initial run.

## Step 5 — Initialize git and commit

```bash
git init
git add .
git commit -m "initial project scaffold"
```

## Done

After the initial commit, report to the owner:
- What was created
- Which dependencies were installed
- That all three checks pass

Then return to `reviewer.md` and proceed with the normal workflow.
