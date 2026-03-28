# Reviewer: reviewing the tester's commit

Re-read this file BEFORE reviewing each tester commit.

## 0. Load context

Before starting the review:
1. Open the prompt the tester was working from (file from `prompts/tester/` that you gave them)
2. Keep it in front of you — the entire review is relative to this prompt

## 1. Boundaries

```bash
git show --name-only <commit>
```
- ONLY files in `test/`. If anything outside `test/` is present → **not accepted**
- Modified ONLY tests explicitly specified in the prompt. Modified an unspecified test → **not accepted**
- Existing tests are NOT modified (unless the prompt explicitly instructed changes)

## 2. Compliance with prompt

Open the prompt and go through each test case:
- Is every test from the prompt implemented? None skipped?
- Do test names match those specified in the prompt?
- Does the setup of each test match what's described in the prompt (mocks, DB data, initial state)?
- Do asserts check exactly what's specified in the prompt (values, call counts, message contents)?

If the tester added tests that were NOT in the prompt — verify they don't break logic and don't conflict with existing tests.

## 3. Quality of each test

For each new test (not "glanced through", but actually read the code):
1. **Scenario** — which exact scenario from the prompt is covered?
2. **Setup** — realistic state? All records/relations that would exist in production by this point?
3. **Mocks** — mock values match those described in the prompt? External services mocked ONLY at the HTTP call boundary, internal logic — without mocks?
4. **Asserts** — check real values? Not just "not null" / "didn't crash"? Check exactly the behavior described in the prompt?
5. **Reason for passing** — the test passes for the right reason, not accidentally?

## 4. Mocks don't cut short the code path

Mentally trace each test through the future code (described in the coder's prompt):
- Does the mock intercept the call earlier than needed?
- Does the execution path reach the logic being tested?
- If the mock uses `mockResolvedValueOnce` — is the call order correct?

## 5. Compatibility with existing tests

Consider: can the coder write code that passes both the new tests AND all existing ones? If the new test's mocks conflict with patterns from existing tests — fix now with a prompt to the tester, not after the coder.

## 6. Coverage completeness

After reading ALL tests, cross-reference with the prompt:
- Are all test cases from the prompt implemented?
- Are edge cases from the prompt covered?
- Is there a critical scenario that's missing? If so — prompt to the tester for additional work
