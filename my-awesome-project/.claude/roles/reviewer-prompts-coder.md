# Reviewer: prompt for the coder

Re-read this file BEFORE writing each prompt for the coder.

## Coder prompt format

Self-contained task spec:
1. Context — why (references to REQ from spec.md)
2. Tasks — numbered list
3. Acceptance criteria

Don't include test descriptions — tests are written by the tester. Don't pull scope from another step. Discrepancy with spec → report to the owner, wait for confirmation.

## 🔴 Grep all call sites before writing a fix prompt

Fixing a call to function X → `grep X` across the entire codebase. Every call site is potentially the same bug. The prompt MUST cover ALL call sites, not just the one the owner found. A prompt without a full grep = incomplete prompt = repeated bug report from the owner = reviewer failure.

Checklist before sending the prompt:
1. `grep -n <function_name> src/` — list all calls
2. For each call site: is the same bug applicable? → include in prompt
3. Explicitly list ALL locations with line numbers in the prompt

## 🔴 Trace existing tests before writing a coder prompt

Before writing a prompt for the coder to change function X:
1. `grep X test/` — find ALL tests that mock or call X
2. Read their setup/mock — how they configure calls to X
3. Make sure the proposed implementation will NOT break these mocks
4. If it will break them — adjust the implementation in the prompt BEFORE sending

A coder prompt that breaks accepted tests = poor quality prompt = extra iteration = wasted time.

## 🔴 Accepted tests are untouchable

If tests were accepted at the tester review step, and the coder's code breaks them:
- Prompt to the **CODER** to fix the code — ALWAYS
- Prompt to the **tester** to fix the tests — NEVER

An accepted test = behavior specification. The coder must write code that passes ALL existing tests. The reviewer has no right to "renegotiate" tests after acceptance.

## Failing test = regression until proven otherwise

- **Spec did NOT change** → test is correct, code is broken → prompt to the CODER. Do NOT touch the test
- **Spec changed** (confirmed by owner) → prompt to the TESTER to update specific tests + new test for new behavior. In this case: change setup (mocks, data), NOT expectations (asserts), if behavior remained the same

Never turn `expect(rows).toHaveLength(1)` into `toHaveLength(0)` without checking: did the spec change?

## Mandatory section in every prompt

```
## ⚠️ Before starting
1. Read `.claude/roles/<role>.md` — this is your role
2. When done: git add <files> && git commit -m "[coder] ..."
```

Without this section the prompt is not sent.

## Prompt naming

Format: `<type>-<short-name>-<P>-<role>.md`
- `<type>` — `func` (functional) or `op` (operational)
- `<short-name>` — task summary with hyphens
- `<P>` — prompt sequence number in the cycle (1 = tester, 2 = coder, ...)
- `<role>` — `tests` or `code`

Examples:
- `func-stale-suppression-2-code.md` — functional, code
- `op-fix-lint-error-1-code.md` — operational, code

The prefix forces you to classify the prompt BEFORE writing it. If you can't confidently use `op-` — use `func-`.
