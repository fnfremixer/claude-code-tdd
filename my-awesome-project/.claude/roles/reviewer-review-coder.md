# Reviewer: reviewing the coder's commit

Re-read this file BEFORE reviewing each coder commit.

## 0. Load context

Before starting the review:
1. Open the prompt the coder was working from (file from `prompts/coder/` that you gave them)
2. Keep it in front of you — the entire review is relative to this prompt

## 1. Boundaries

```bash
git show --name-only <commit>
```
- ONLY files outside `test/`. If `test/` is present → **not accepted**

## 2. Compliance with prompt

Open the coder's prompt and go through each task:
- Is every task from the prompt implemented? None skipped?
- Is the code in the specified locations (line numbers from the prompt) changed as described?
- Are there any extra changes that weren't in the prompt?
- Is the version in `package.json` updated (if it was in the prompt)?
- Is the "What NOT to change" section respected?

## 3. Read the diff

```bash
git diff HEAD~1..HEAD -- src/
```
- Code matches the implementation described in the prompt
- No hacks, workarounds, commented-out code
- Logic is clear and matches the spec
- If the coder deviated from the prompt — understand why. Deviation is acceptable only if the result is functionally equivalent AND all tests are green

## 4. Run checks

```bash
npm run lint
npm run build
npm test
```

All three MUST be green.

## 5. Tests red → prompt to the CODER

🔴 **No exceptions.** Don't analyze "whose fault it is". Don't accept the coder's framing ("tests are wrong", "need mock updates from tester"). Tests were accepted at the tester review step = specification. Code didn't pass the specification = bug in the code.

The only action: operational prompt to the coder. Before writing it, re-read `reviewer-prompts-coder.md`.

## 6. Trace new tests through the code

For each NEW test (written by the tester in this cycle):
1. Walk line by line through the real src/ code with mock values from the test
2. Make sure mock objects support the execution path in the coder's NEW code
3. Real logic actually runs rather than being intercepted earlier
4. The test passes for the right reason — because of correct implementation, not coincidence

Zero failures with mass changes is a red flag requiring special attention.
