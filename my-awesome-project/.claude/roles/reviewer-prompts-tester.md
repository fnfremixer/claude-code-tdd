# Reviewer: prompt for the tester

Re-read this file BEFORE writing each prompt for the tester.

## Scenario coverage

### Scenario matrix

Before writing a test prompt, build the matrix. List ALL combinations, not just happy path + one edge case.

**Dimensions:**
1. **Storage**: empty (first run), with data, corrupted data
2. **Time**: in the past (long ago / recently), now, in the future, boundary values (midnight, DST)
3. **Configuration**: valid, invalid, partial, missing
4. **External services**: available, timeout, failure, wrong credentials, partial failure
5. **Lifecycle**: first tick, N-th tick, restart, restart after long downtime
6. **Data**: empty, normal, boundary (null, empty strings), large volumes
7. **States**: transitions between states, artifacts at each stage, "quiet" intervals

**Process:**
1. List dimensions relevant to the current step
2. Build the scenario table
3. Mark those covered by existing tests
4. Prompt to the tester — ONLY uncovered scenarios
5. Don't send the prompt until the matrix is complete

### Testing levels

1. **Unit tests** — individual functions. Mocks are acceptable
2. **Integration tests** — chain from entry point to exit point, no mocks on internal modules
3. **At every level of abstraction** — if a feature passes through multiple layers (scheduler → logic → formatting → sending), each layer separately AND the entire chain. Only the lowest layer — 🔴 Blocker
4. **Fault tolerance** — restart, service unavailability, timeouts. Service continues working or provides clear errors and logs
5. **Observability** — correct logging of errors, metrics, states
6. **Lifecycle** — multi-step scenarios with sequential calls and state changes between them

External services (Discord, Linear, OpenAI) are mocked only at the boundary — at the HTTP call point. All internal logic up to that point — without mocks.

Self-check: "If the coder implements the feature in the wrong layer, will the test catch it?" If not — tests are insufficient.

### Mandatory scenarios

**Lifecycle (for components with scheduler/loop):**
- Fresh start → first tick → no data → data appears → next tick → result
- Working system → restart → catch up on missed items → normal operation
- External service failure → retry → recovery → success
- First tick created result → second doesn't duplicate (idempotency)

**Startup (for services with scheduler):**
- Fresh DB (first run), Non-fresh DB (restart), restart after long downtime
- Different start moments relative to slots: before, exactly at, right after, far after
- Configuration change between restarts

**Config:**
- Empty (defaults), invalid, partial, change on restart

**Boundary values:**
For each numeric condition (`>`, `>=`, `<`, `<=`): value exactly at the boundary, 1 unit inside, 1 unit outside.
For time windows — same, with second/millisecond precision.

**DST (for logic with CET/CEST):**
- Normal day
- CET→CEST transition (02:00→03:00, interval doesn't exist)
- CEST→CET transition (03:00→02:00, interval is traversed twice)
- Slot in non-existent interval — service doesn't crash

**State machine (components with state automaton):**

The scenario matrix covers individual states. Bugs live in **transitions**.

1. List ALL states and transitions between them
2. Test on EVERY transition: setup = state BEFORE with all artifacts that would exist in production → action → assert = state AFTER
3. Setup MUST be realistic — include all records/relations accumulated by this point in the lifecycle. Incomplete setup for a late state is useless
4. For transitions with delay — test the "quiet" interval: tick right after transition, tick in the middle. Assert: nothing happened

Self-check: "If the coder processes an entity in the wrong state, which test will catch it?"

## Quality rules

### 🔴 Study the real API BEFORE writing the prompt (not at acceptance!)

This is done BEFORE creating the tester prompt, not after. If a mock is written from memory and turns out to be wrong — an entire iteration is wasted (tester + coder + fix).

Verify real types, signatures, fields through SDK, documentation, or direct endpoint call. Make sure ALL fields you specify in the mock actually exist in the API. Don't make up the structure from memory. Unsafe casts (`as any`, `as Record<string, unknown>`) in the final code = red flag that types were not verified.

### Trace the code before mocking

Trace the function entirely with the proposed mock values. Verify that the mock doesn't cut short the code path that the test should be checking.

### Full scope when fixing regressions

Found a regression in one test — find ALL tests with a similar pattern (grep by function name, values, mocks). The prompt covers all affected tests, not just the first one found.

### 🔴 Grep all call sites before writing a fix prompt

Fixing a call to function X → `grep X` across the entire codebase. Every call site is potentially the same bug. The prompt MUST cover ALL call sites, not just the one the owner found. A prompt without a full grep = incomplete prompt = repeated bug report from the owner = reviewer failure.

Checklist before sending the prompt:
1. `grep -n <function_name> src/` — list all calls
2. For each call site: is the same bug applicable? → include in prompt
3. Explicitly list ALL locations with line numbers in the prompt

### Comprehensive coverage from the first prompt

Build the COMPLETE scenario matrix IMMEDIATELY. Reactive approach (bug → fix → new bug → fix) is FORBIDDEN. Proactive (matrix → full coverage → acceptance) is MANDATORY.

### Optional dependencies

If a function accepts an optional parameter — test the path WITHOUT it. Side effects (email, logs) may not trigger — this should be explicitly verified.

## Tester prompt format

Specific test cases:
1. What to test — module, function (REQ reference)
2. Scenarios — table: input → expected result
3. Edge cases
4. Regressions — which existing tests to run

## Mandatory section in every prompt

```
## ⚠️ Before starting
1. Read `.claude/roles/<role>.md` — this is your role
2. When done: git add <files> && git commit -m "[tester] ..."
```

Without this section the prompt is not sent.

## Prompt naming

Format: `<type>-<short-name>-<P>-<role>.md`
- `<type>` — `func` (functional) or `op` (operational)
- `<short-name>` — task summary with hyphens
- `<P>` — prompt sequence number in the cycle (1 = tester, 2 = coder, ...)
- `<role>` — `tests` or `code`

Examples:
- `func-stale-suppression-1-tests.md` — functional, tests
- `op-fix-mock-setup-1-tests.md` — operational, tests

The prefix forces you to classify the prompt BEFORE writing it. If you can't confidently use `op-` — use `func-`.
